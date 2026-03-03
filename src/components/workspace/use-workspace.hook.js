"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "@/common/utils/access-token.util";
import { fetchDocuments, uploadPdf } from "@/provider/features/documents/documents.slice";
import { 
  askQuestion, 
  submitFeedback, 
  createChatSession, 
  fetchChats, 
  fetchChatHistory, 
  sendChatMessage 
} from "@/provider/features/chat/chat.slice";

function isAllowedUploadFile(file) {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return Boolean(file && allowedTypes.includes(file.type));
}

export default function useWorkspace() {
  // stats
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chats, setChats] = useState([]);

  const { upload, list } = useSelector((state) => state.documents);
  const { ask, create, history, message } = useSelector((state) => state.chat);

  const documents = list?.data?.documents || [];
  const hasDocuments = documents.length > 0;

  // useEffect
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  const initializeSession = useCallback(() => {
    // For now, just load documents and chats
    // Anonymous token will be handled by the upload endpoint when needed
    loadDocuments();
    loadChats();
  }, [loadDocuments, loadChats]);

  useEffect(() => {
    if (create.isSuccess && create.data?.chat?.id) {
      setCurrentChatId(create.data.chat.id);
      setMessages([]);
      loadChats(); // Refresh chat list
    }
  }, [create.isSuccess, create.data, loadChats]);

  useEffect(() => {
    if (history.isSuccess && history.data?.messages) {
      const chatMessages = history.data.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        citations: msg.metadata_json?.citations || []
      }));
      setMessages(chatMessages);
    }
  }, [history.isSuccess, history.data]);

  useEffect(() => {
    if (message.isSuccess && message.data) {
      // Chat message sent successfully, reload chat history
      if (currentChatId) {
        dispatch(fetchChatHistory({ 
          chatId: currentChatId, 
          successCallBack: () => {} 
        }));
      }
    }
  }, [message.isSuccess, message.data, currentChatId, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, ask.isLoading]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasToken =
      Boolean(window.localStorage.getItem("rag_access_token")) ||
      Boolean(getAccessToken());
    setIsSignedIn(hasToken);
  }, []);

  // functions
  const loadDocuments = useCallback(() => {
    dispatch(fetchDocuments({ successCallBack: () => {} }));
  }, [dispatch]);

  const loadChats = useCallback(() => {
    dispatch(fetchChats({ 
      successCallBack: (data) => {
        setChats(data.chats || []);
      } 
    }));
  }, [dispatch]);

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
        successCallBack: () => {
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

  async function handleNewChat() {
    if (isSignedIn) {
      // For authenticated users, create a new chat session
      await dispatch(createChatSession({ 
        title: "New chat",
        successCallBack: () => {} 
      }));
    } else {
      // For guests, just clear local messages
      setMessages([]);
      setQuestion("");
      setCurrentChatId(null);
    }
  }

  async function handleAsk(q) {
    const text = (q || question).trim();
    if (!text || !hasDocuments) return;

    setQuestion("");

    if (isSignedIn && currentChatId) {
      // For authenticated users with active chat, use chat API
      await dispatch(sendChatMessage({
        chatId: currentChatId,
        content: text,
        successCallBack: () => {}
      }));
    } else {
      // For guests or no active chat, use direct RAG
      setMessages((prev) => [...prev, { role: "user", content: text, citations: [] }]);

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
            content: "Sorry, I couldn't process your question. Please try again.",
            citations: [],
            error: true,
          },
        ]);
      }
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

  function handleSelectChat(chatId) {
    if (chatId === currentChatId) return;
    
    setCurrentChatId(chatId);
    setMessages([]);
    
    // Load chat history
    dispatch(fetchChatHistory({
      chatId,
      successCallBack: () => {}
    }));
  }

  return {
    // state/refs
    fileInputRef,
    messagesEndRef,
    selectedFile,
    question,
    messages,
    mobileSidebarOpen,
    isSignedIn,
    upload,
    list,
    ask,
    documents,
    hasDocuments,
    currentChatId,
    chats,
    // setters
    setQuestion,
    setMobileSidebarOpen,
    // handlers
    handleFileSelect,
    handleUploadClick,
    handleSubmitUpload,
    handleClearFile,
    handleNewChat,
    handleAsk,
    handleFeedback,
    handleFormSubmit,
    handleDropFile,
    handleDragOver,
    handleDragLeave,
    handleSelectChat,
  };
}
