"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "@/common/utils/access-token.util";
import { fetchDocuments, uploadPdf } from "@/provider/features/documents/documents.slice";
import { askQuestion, submitFeedback } from "@/provider/features/chat/chat.slice";

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

  const { upload, list } = useSelector((state) => state.documents);
  const { ask } = useSelector((state) => state.chat);

  const documents = list?.data?.documents || [];
  const hasDocuments = documents.length > 0;

  // useEffect
  useEffect(() => {
    loadDocuments();
  }, []);

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
  function loadDocuments() {
    dispatch(fetchDocuments({ successCallBack: () => {} }));
  }

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

  function handleNewChat() {
    setMessages([]);
    setQuestion("");
  }

  async function handleAsk(q) {
    const text = (q || question).trim();
    if (!text || !hasDocuments) return;

    setQuestion("");
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
  };
}
