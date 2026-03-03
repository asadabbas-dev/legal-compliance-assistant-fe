"use client";

import CircularILoader from "@/common/components/circular-loader/circular-loader.component";
import CitationItem from "@/components/workspace/components/citation-item/citation-item.component";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function WorkspaceMessages({
  messages,
  ask,
  hasDocuments,
  handleFeedback,
  messagesEndRef,
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-xl mx-auto px-6">
              {/* Icon */}
              <div className="mb-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full flex items-center justify-center mb-4">
                  {hasDocuments ? (
                    <svg
                      className="w-10 h-10 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-10 h-10 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold whitespace-nowrap text-white sm:text-3xl mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {hasDocuments
                  ? "Ready to answer your questions"
                  : "Upload documents to get started"}
              </h2>

              {/* Description */}
              <p className="text-base text-white/60 sm:text-lg mb-8 leading-relaxed">
                {hasDocuments
                  ? "Ask me anything about your uploaded documents. I'll provide detailed answers with citations."
                  : "Upload PDF or DOCX files to begin chatting with your documents using AI-powered insights."}
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex flex-col items-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-2">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-white/70 font-medium">
                    Smart Analysis
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-2">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <span className="text-white/70 font-medium">
                    Source Citations
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-2">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-white/70 font-medium">
                    Instant Answers
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {messages.map((message, index) => (
              <div key={index} className="space-y-3">
                <div
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 sm:max-w-[75%] ${
                      message.role === "user"
                        ? "bg-amber-400"
                        : message.error
                          ? "bg-red-500/20"
                          : "bg-white/10"
                    }`}
                  >
                    <p className={`text-sm leading-relaxed sm:text-base ${
                      message.role === "user"
                        ? "text-black font-medium"
                        : message.error
                          ? "text-red-200"
                          : "text-white"
                    }`}>
                      {message.content}
                    </p>
                  </div>
                </div>

                {message.role === "assistant" && message.citations && (
                  <div className="ml-0 space-y-2 sm:ml-4">
                    {message.citations.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-white/70 sm:text-sm">
                          Sources:
                        </p>
                        {message.citations.map((citation, citationIndex) => (
                          <CitationItem
                            key={citationIndex}
                            citation={citation}
                          />
                        ))}
                      </div>
                    )}

                    {!message.error && (
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-white/50">
                          Was this helpful?
                        </p>
                        <button
                          onClick={() =>
                            handleFeedback(
                              "positive",
                              messages[index - 1]?.content,
                              message.content,
                            )
                          }
                          className="rounded p-1 hover:bg-white/10"
                        >
                          <ThumbsUp className="h-3 w-3 text-white/50 hover:text-yellow-400" />
                        </button>
                        <button
                          onClick={() =>
                            handleFeedback(
                              "negative",
                              messages[index - 1]?.content,
                              message.content,
                            )
                          }
                          className="rounded p-1 hover:bg-white/10"
                        >
                          <ThumbsDown className="h-3 w-3 text-white/50 hover:text-red-400" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {ask.isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-white">
                  <CircularILoader />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
