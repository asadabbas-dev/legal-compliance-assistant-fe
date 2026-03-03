"use client";

import CircularILoader from "@/common/components/circular-loader/circular-loader.component";
import { ChevronDown, ChevronUp, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

function CitationItem({ citation }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-white">
            {citation.document}
            {citation.page && (
              <span className="ml-2 text-xs text-white/70">
                Page {citation.page}
              </span>
            )}
          </p>
          {citation.section && (
            <p className="text-xs text-white/60">{citation.section}</p>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 rounded p-1 hover:bg-white/10"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-white/70" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white/70" />
          )}
        </button>
      </div>
      {isExpanded && citation.snippet && (
        <div className="mt-2 border-t border-white/10 pt-2">
          <p className="text-sm text-white/80">{citation.snippet}</p>
        </div>
      )}
    </div>
  );
}

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
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                {hasDocuments
                  ? "Ready to answer your questions"
                  : "Upload documents to get started"}
              </h2>
              <p className="mt-2 text-sm text-white/70 sm:text-base">
                {hasDocuments
                  ? "Ask me anything about your uploaded documents."
                  : "Upload PDF or DOCX files to begin chatting with your documents."}
              </p>
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
                        ? "bg-amber-400 text-black"
                        : message.error
                        ? "bg-red-500/20 text-red-200"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    <p className="text-sm leading-relaxed sm:text-base">
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
                        <p className="text-xs text-white/50">Was this helpful?</p>
                        <button
                          onClick={() =>
                            handleFeedback(
                              "positive",
                              messages[index - 1]?.content,
                              message.content
                            )
                          }
                          className="rounded p-1 hover:bg-white/10"
                        >
                          <ThumbsUp className="h-3 w-3 text-white/50 hover:text-green-400" />
                        </button>
                        <button
                          onClick={() =>
                            handleFeedback(
                              "negative",
                              messages[index - 1]?.content,
                              message.content
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