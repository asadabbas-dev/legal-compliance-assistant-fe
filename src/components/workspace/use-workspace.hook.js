"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ACCESS_TOKEN_KEY,
  getGuestToken,
  setGuestToken,
} from "@/common/utils/users.util";
import useAuthSession from "@/common/hooks/use-auth-session.hook";
import {
  fetchDocuments,
  uploadPdf,
  deleteDocument,
  resetList as resetDocumentList,
} from "@/provider/features/documents/documents.slice";
import {
  askQuestion,
  submitFeedback,
  createChatSession,
  fetchChats,
  fetchChatHistory,
  sendChatMessage,
  resetChatData,
} from "@/provider/features/chat/chat.slice";

function isAllowedUploadFile(file) {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return Boolean(file && allowedTypes.includes(file.type));
}

function mapApiMessage(msg) {
  if (!msg) return null;
  return {
    id: msg.id,
    role: msg.role,
    content: msg.content,
    citations: msg.citations || [],
    error: false,
  };
}

function chatTitleFromQuestion(text) {
  const trimmed = (text || "").trim().replace(/\s+/g, " ");
  if (!trimmed) return "New chat";
  return trimmed.length > 72 ? `${trimmed.slice(0, 72)}...` : trimmed;
}

export default function useWorkspace() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const currentChatIdRef = useRef(null);
  const didInitChats = useRef(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);

  const { upload, list } = useSelector((state) => state.documents);
  const { isSignedIn, ready: authReady } = useAuthSession();
  const { ask, message: chatMessage, list: chatList } = useSelector(
    (state) => state.chat,
  );

  const documents = list?.data?.documents || [];
  const hasDocuments = documents.length > 0;
  const chats = Array.isArray(chatList?.data) ? chatList.data : [];
  const askState = {
    ...ask,
    isLoading: Boolean(ask?.isLoading || chatMessage?.isLoading),
  };

  const loadDocuments = useCallback(() => {
    dispatch(fetchDocuments({}));
  }, [dispatch]);

  const loadChat = useCallback(
    async (chatId) => {
      if (!chatId) return;
      setCurrentChatId(chatId);
      const result = await dispatch(fetchChatHistory({ chatId }));
      if (fetchChatHistory.fulfilled.match(result)) {
        const rows = result.payload?.messages || [];
        setMessages(rows.map(mapApiMessage).filter(Boolean));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    currentChatIdRef.current = currentChatId;
  }, [currentChatId]);

  useEffect(() => {
    if (!authReady || isSignedIn) return;
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  }, [authReady, isSignedIn]);

  useEffect(() => {
    if (!authReady) return;
    if (isSignedIn) {
      dispatch(fetchDocuments({}));
      dispatch(fetchChats({}));
      return;
    }

    dispatch(resetChatData());
    didInitChats.current = false;
    setCurrentChatId(null);
    setMessages([]);
    if (getGuestToken()) {
      dispatch(fetchDocuments({}));
    } else {
      dispatch(resetDocumentList());
    }
  }, [authReady, isSignedIn, dispatch]);

  useEffect(() => {
    if (!isSignedIn || didInitChats.current) return;
    if (!chatList?.isSuccess) return;
    didInitChats.current = true;
    if (chats[0]?.id) {
      loadChat(chats[0].id);
    }
  }, [isSignedIn, chatList?.isSuccess, chats, loadChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (isAllowedUploadFile(file)) setSelectedFile(file);
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  async function handleSubmitUpload() {
    if (!selectedFile) return;
    await dispatch(
      uploadPdf({
        file: selectedFile,
        successCallBack: (response) => {
          if (response.anonymous_token && !isSignedIn) {
            setGuestToken(response.anonymous_token);
          }
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          loadDocuments();
        },
      }),
    );
  }

  function handleClearFile() {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleNewChat() {
    setMessages([]);
    setQuestion("");
    setCurrentChatId(null);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSelectChat(chatId) {
    if (!chatId || String(chatId) === String(currentChatIdRef.current)) return;
    await loadChat(chatId);
    setMobileSidebarOpen(false);
  }

  async function handleAsk(q) {
    const text = (q || question).trim();
    if (!text || !hasDocuments) return;

    setQuestion("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text, citations: [] },
    ]);

    if (!isSignedIn) {
      const response = await dispatch(
        askQuestion({
          question: text,
          successCallBack: (data) => {
            setMessages((prev) => [
              ...prev.slice(0, -1),
              { role: "user", content: text, citations: [] },
              {
                role: "assistant",
                content: data.answer,
                citations: data.citations || [],
              },
            ]);
          },
        }),
      );
      if (response?.meta?.requestStatus === "rejected") {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            role: "assistant",
            content:
              "Sorry, I couldn't process your question. Please try again.",
            citations: [],
            error: true,
          },
        ]);
      }
      return;
    }

    let chatId = currentChatIdRef.current;
    if (!chatId) {
      const created = await dispatch(
        createChatSession({ title: chatTitleFromQuestion(text) }),
      );
      if (!createChatSession.fulfilled.match(created) || !created.payload?.id) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            role: "assistant",
            content: "Sorry, I couldn't start a saved chat. Please try again.",
            citations: [],
            error: true,
          },
        ]);
        return;
      }
      chatId = created.payload.id;
      setCurrentChatId(chatId);
    }

    const response = await dispatch(
      sendChatMessage({
        chatId,
        content: text,
        successCallBack: (data) => {
          const userMsg = mapApiMessage(data.user_message) || {
            role: "user",
            content: text,
            citations: [],
          };
          const assistantMsg = mapApiMessage(data.assistant_message) || {
            role: "assistant",
            content: "Sorry, I couldn't process your question.",
            citations: [],
            error: true,
          };
          setMessages((prev) => [...prev.slice(0, -1), userMsg, assistantMsg]);
        },
      }),
    );

    if (response?.meta?.requestStatus === "rejected") {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: "Sorry, I couldn't process your question. Please try again.",
          citations: [],
          error: true,
        },
      ]);
    }
  }

  function handleFeedback(rating, lastUserMsg, lastAssistantMsg) {
    if (!lastUserMsg || !lastAssistantMsg) return;
    dispatch(
      submitFeedback({
        payload: { question: lastUserMsg, answer: lastAssistantMsg, rating },
        successCallBack: () => {},
      }),
    );
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleAsk();
  }

  function handleDropFile(e) {
    e.preventDefault();
    e.currentTarget.classList.remove("ring-2", "ring-amber-400");
    const file = e.dataTransfer.files?.[0];
    if (isAllowedUploadFile(file)) {
      handleFileSelect({ target: { files: [file] } });
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    if (!upload.isLoading) {
      e.currentTarget.classList.add("ring-2", "ring-amber-400");
    }
  }

  function handleDragLeave(e) {
    e.currentTarget.classList.remove("ring-2", "ring-amber-400");
  }

  function handleDeleteDocument(documentId) {
    dispatch(
      deleteDocument({
        documentId,
        successCallBack: () => {},
      }),
    );
  }

  function handleRefreshDocuments() {
    loadDocuments();
  }

  return {
    fileInputRef,
    messagesEndRef,
    selectedFile,
    question,
    messages,
    mobileSidebarOpen,
    isSignedIn,
    upload,
    list,
    ask: askState,
    documents,
    hasDocuments,
    currentChatId,
    chats,
    setQuestion,
    setMobileSidebarOpen,
    handleFileSelect,
    handleUploadClick,
    handleSubmitUpload,
    handleClearFile,
    handleNewChat,
    handleSelectChat,
    handleAsk,
    handleFeedback,
    handleFormSubmit,
    handleDropFile,
    handleDragOver,
    handleDragLeave,
    handleDeleteDocument,
    handleRefreshDocuments,
  };
}
