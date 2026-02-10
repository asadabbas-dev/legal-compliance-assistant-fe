"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  FileText,
  Plus,
  Send,
  X,
  Menu,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import CircularILoader from "@/common/components/circular-loader/circular-loader.component";
import {
  fetchDocuments,
  uploadPdf,
} from "@/provider/features/documents/documents.slice";
import {
  askQuestion,
  submitFeedback,
} from "@/provider/features/chat/chat.slice";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

function CitationItem({ document: docName, page, snippet = "" }) {
  const [expanded, setExpanded] = useState(false);
  const hasSnippet = snippet && snippet.trim().length > 0;

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3 sm:p-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-white">{docName}</p>
        <p className="text-xs text-white/85">Page {page}</p>
        {hasSnippet && (
          <div className="space-y-2 pt-0">
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="text-xs font-medium text-amber-400 hover:text-amber-300"
            >
              {expanded ? "Hide snippet" : "Show snippet"}
            </button>
            {expanded && (
              <p className="rounded border border-white/10 bg-white/5 p-4 text-sm text-white">
                {snippet}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Workspace() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { upload, list } = useSelector((state) => state.documents);
  const { ask } = useSelector((state) => state.chat);

  const documents = list?.data?.documents || [];
  const hasDocuments = documents.length > 0;

  const loadDocuments = useCallback(() => {
    dispatch(fetchDocuments({ successCallBack: () => {} }));
  }, [dispatch]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, ask.isLoading]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") setSelectedFile(file);
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleSubmitUpload = async () => {
    if (!selectedFile) return;
    await dispatch(
      uploadPdf({
        file: selectedFile,
        successCallBack: () => {
          enqueueSnackbar("Document uploaded. Processing in background.", {
            variant: "success",
          });
          setSelectedFile(null);
          fileInputRef.current.value = "";
          loadDocuments();
        },
      }),
    );
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleNewChat = () => {
    setMessages([]);
    setQuestion("");
  };

  const handleAsk = useCallback(
    async (q) => {
      const text = (q || question).trim();
      if (!text || !hasDocuments) return;

      setQuestion("");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: text, citations: [] },
      ]);

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
    },
    [dispatch, question, hasDocuments],
  );

  const handleFeedback = useCallback(
    (rating, lastUserMsg, lastAssistantMsg) => {
      if (!lastUserMsg || !lastAssistantMsg) return;
      dispatch(
        submitFeedback({
          payload: { question: lastUserMsg, answer: lastAssistantMsg, rating },
          successCallBack: () => {
            enqueueSnackbar("Thank you for your feedback.", {
              variant: "success",
            });
          },
        }),
      );
    },
    [dispatch],
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAsk();
  };

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Sidebar - ChatGPT style */}
        {/* Mobile overlay - closes sidebar when clicking outside */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileSidebarOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close sidebar"
          />
        )}

        {/* Sidebar - overlay on mobile, fixed on desktop */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[85vw] max-w-[320px] flex-col border-r border-white/10 bg-black transition-transform sm:w-64 lg:relative lg:inset-auto lg:z-auto lg:max-w-none ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex h-12 items-center justify-between border-b border-white/10 px-3 sm:h-14 sm:px-4">
            <button
              type="button"
              onClick={handleNewChat}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              New chat
            </button>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="rounded-lg p-2 text-white/90 hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:mb-2 sm:text-xs">
                  Your files
                </h3>
                <div className="max-h-40 space-y-1 overflow-y-auto sm:max-h-48">
                  {list.isLoading ? (
                    <div className="flex justify-center py-6">
                      <CircularILoader />
                    </div>
                  ) : list.isError ? (
                    <p className="px-2 py-4 text-sm text-white/80">
                      Could not load documents. Check if the backend is running.
                    </p>
                  ) : documents.length === 0 ? (
                    <p className="px-2 py-4 text-sm text-white/80">
                      No documents yet. Upload a PDF to get started.
                    </p>
                  ) : (
                    documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-amber-400/20">
                          <FileText className="h-4 w-4 text-amber-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-white">
                            {doc.filename}
                          </p>
                          <p className="text-xs text-white/80">
                            {new Date(doc.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-amber-400/20 px-2 py-0.5 text-xs font-medium text-amber-400">
                          Ready
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main chat area */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile sidebar toggle */}
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 sm:px-4 sm:py-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
              aria-label="Open documents"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              Documents
            </button>
          </div>
          {/* Messages area - scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl px-3 py-4 sm:px-4 sm:py-6">
              {messages.length === 0 && !ask.isLoading && !hasDocuments && (
                <div className="flex flex-col items-center justify-center py-8 text-center sm:py-12 md:py-16">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-400/10 ring-1 ring-amber-400/30 sm:mb-6 sm:h-20 sm:w-20 sm:rounded-2xl">
                    <FileText className="h-7 w-7 text-amber-400 sm:h-10 sm:w-10" />
                  </div>
                  <h2 className="text-xl font-semibold text-white sm:text-2xl">
                    Your compliance assistant awaits
                  </h2>
                  <p className="mt-2 max-w-md text-sm text-white/80 sm:mt-3 sm:text-base">
                    Upload policies, contracts, or HR documents below. Then ask questions in plain language and get answers with page-level citations.
                  </p>
                  <div className="mt-6 grid gap-2 text-left sm:mt-8 sm:grid-cols-2 sm:gap-3">
                    {[
                      "What is our PTO policy?",
                      "Find the termination clause",
                      "Summarize the NDA terms",
                      "What are the data retention rules?",
                    ].map((q, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white/70 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
                      >
                        <span className="text-amber-400/80">Example:</span> {q}
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 flex items-center justify-center gap-2 text-xs text-white/60 sm:mt-8 sm:text-sm">
                    <Paperclip className="h-4 w-4" />
                    Use the attachment icon in the input to upload your first PDF
                  </p>
                </div>
              )}

              {messages.length === 0 && !ask.isLoading && hasDocuments && (
                <div className="flex flex-col items-center justify-center py-12 text-center sm:py-20 md:py-24">
                  <p className="text-base font-medium text-white sm:text-lg">
                    Ask a question about your documents
                  </p>
                  <p className="mt-1.5 text-xs text-white/90 sm:mt-2 sm:text-sm">
                    Answers are generated only from your uploaded files.
                  </p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div key={idx} className="mb-4 sm:mb-6">
                  {msg.role === "user" && (
                    <div className="flex justify-end">
                      <div className="max-w-[90%] rounded-xl bg-white/10 px-3 py-2.5 sm:max-w-[85%] sm:rounded-2xl sm:px-4 sm:py-3">
                        <p className="text-xs text-white sm:text-sm">{msg.content}</p>
                      </div>
                    </div>
                  )}
                  {msg.role === "assistant" && (
                    <div className="flex justify-start">
                      <div className="max-w-[90%] rounded-xl bg-white/5 px-3 py-2.5 sm:max-w-[85%] sm:rounded-2xl sm:px-4 sm:py-3">
                        <p className="whitespace-pre-wrap text-xs text-white/90 sm:text-sm">
                          {msg.content}
                        </p>
                        {!msg.error && (
                          <div className="mt-3 flex gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                handleFeedback(
                                  1,
                                  messages[idx - 1]?.content,
                                  msg.content,
                                )
                              }
                              className="rounded p-1.5 text-white/70 hover:bg-amber-400/20 hover:text-amber-400"
                              title="Helpful"
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleFeedback(
                                  -1,
                                  messages[idx - 1]?.content,
                                  msg.content,
                                )
                              }
                              className="rounded p-1.5 text-white/70 hover:bg-red-500/20 hover:text-red-400"
                              title="Not helpful"
                            >
                              <ThumbsDown className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                        {msg.citations?.length > 0 && (
                          <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                            <p className="text-xs font-medium text-amber-400">
                              Sources used
                            </p>
                            <div className="space-y-2">
                              {msg.citations.map((c, i) => (
                                <CitationItem
                                  key={i}
                                  document={c.document}
                                  page={c.page}
                                  snippet={c.snippet || c.chunk_preview}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {ask.isLoading && (
                <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
                  <span className="text-sm text-white/90">
                    Searching your documents...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Bottom input - ChatGPT style with upload inside */}
          <div className="shrink-0 border-t border-white/10 bg-black p-3 sm:p-4">
            <div className="mx-auto max-w-3xl">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileSelect}
                className="sr-only"
              />
              {selectedFile && !upload.isLoading && (
                <div className="mb-2 flex flex-wrap items-center gap-2 rounded-lg bg-white/5 px-2 py-1.5 sm:px-3 sm:py-2">
                  <FileText className="h-4 w-4 shrink-0 text-white/80 sm:h-5 sm:w-5" />
                  <span className="min-w-0 flex-1 truncate text-xs text-white sm:text-sm">
                    {selectedFile.name}
                  </span>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={handleClearFile}
                      className="rounded p-1 text-white/80 hover:text-white"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <CustomButton
                      text="Upload"
                      variant="primary"
                      size="sm"
                      onClick={handleSubmitUpload}
                      loading={upload.isLoading}
                      disabled={upload.isLoading}
                      className="!bg-amber-400 !text-black hover:!bg-amber-300 focus:!ring-amber-500 !text-xs sm:!text-sm"
                    />
                  </div>
                </div>
              )}
              {upload.isLoading && (
                <div className="mb-2 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
                  <CircularILoader />
                  <span className="text-sm text-white/90">Uploading...</span>
                </div>
              )}
              {upload.isError && upload.message && (
                <p className="mb-2 text-xs text-red-400">{upload.message}</p>
              )}
              <form onSubmit={handleFormSubmit}>
                <div
                  className="flex items-end gap-1.5 rounded-xl border border-white/20 bg-white/5 px-2 py-1.5 transition-colors focus-within:border-amber-400/50 focus-within:bg-white/10 sm:gap-2 sm:rounded-2xl sm:px-3 sm:py-2"
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (!upload.isLoading)
                      e.currentTarget.classList.add("ring-2", "ring-amber-400");
                  }}
                  onDragLeave={(e) =>
                    e.currentTarget.classList.remove("ring-2", "ring-amber-400")
                  }
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("ring-2", "ring-amber-400");
                    const file = e.dataTransfer.files?.[0];
                    if (file?.type === "application/pdf")
                      handleFileSelect({ target: { files: [file] } });
                  }}
                >
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    disabled={upload.isLoading}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/85 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50 sm:h-10 sm:w-10"
                    aria-label="Upload document"
                  >
                    <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <CustomInput
                      name="question"
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder={
                        hasDocuments
                          ? "Ask a question about your documents…"
                          : "Upload a document or ask a question…"
                      }
                      disabled={ask.isLoading}
                      className="!border-0 !bg-transparent !py-2 !text-sm !text-white placeholder:!text-white/70 focus:!ring-0 sm:!py-2.5 sm:!text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={
                      !question.trim() || !hasDocuments || ask.isLoading
                    }
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-black transition-colors hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-400 sm:h-10 sm:w-10 sm:rounded-xl"
                  >
                    {ask.isLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent sm:h-5 sm:w-5" />
                    ) : (
                      <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </form>
              <p className="mt-1.5 text-center text-xs text-white/85 sm:mt-2 sm:text-sm">
                {hasDocuments
                  ? "AI answers are generated only from your uploaded files."
                  : "Upload at least one document to start asking questions."}
              </p>
            </div>
          </div>
        </main>
    </div>
  );
}
