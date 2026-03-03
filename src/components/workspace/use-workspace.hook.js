"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "@/common/utils/access-token.util";
import { fetchDocuments, uploadPdf } from "@/provider/features/documents/documents.slice";
// import { askQuestion, submitFeedback } from "@/provider/features/chat/chat.slice"; // Temporarily disabled

function isAllowedUploadFile(file) {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return Boolean(file && allowedTypes.includes(file.type));
}

export default function useWorkspace() {
  // State
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const { upload, list } = useSelector((state) => state.documents);
  // const { ask } = useSelector((state) => state.chat); // Temporarily disabled
  const ask = { isLoading: false }; // Placeholder

  const documents = list?.data?.documents || [];
  const hasDocuments = documents.length > 0;

  // Effects
  useEffect(() => {
    // Load documents once on mount
    dispatch(fetchDocuments({ successCallBack: () => {} }));
  }, [dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasToken =
      Boolean(window.localStorage.getItem("rag_access_token")) ||
      Boolean(getAccessToken());
    setIsSignedIn(hasToken);
  }, []);

  // Functions
  const loadDocuments = useCallback(() => {
    dispatch(fetchDocuments({ successCallBack: () => {} }));
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
        successCallBack: (response) => {
          // Store anonymous token if provided (for guest users)
          if (response.anonymous_token && typeof window !== "undefined") {
            window.localStorage.setItem("rag_access_token", response.anonymous_token);
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
  }

  async function handleAsk(q) {
    // Temporarily disabled - just show a placeholder message
    const text = (q || question).trim();
    if (!text || !hasDocuments) return;

    setQuestion("");
    setMessages((prev) => [
      ...prev, 
      { role: "user", content: text, citations: [] },
      { 
        role: "assistant", 
        content: "Chat functionality temporarily disabled while fixing production issues.", 
        citations: [] 
      }
    ]);
  }

  function handleFeedback(rating, lastUserMsg, lastAssistantMsg) {
    // Temporarily disabled
    console.log("Feedback temporarily disabled:", { rating, lastUserMsg, lastAssistantMsg });
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
    // State/refs
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
    // Setters
    setQuestion,
    setMobileSidebarOpen,
    // Handlers
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