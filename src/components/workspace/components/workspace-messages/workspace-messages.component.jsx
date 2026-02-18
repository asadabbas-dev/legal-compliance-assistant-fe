"use client";

import { FileText, Paperclip, ThumbsDown, ThumbsUp } from "lucide-react";
import CitationItem from "@/components/workspace/components/citation-item/citation-item.component";

export default function WorkspaceMessages({
  messages,
  ask,
  hasDocuments,
  handleFeedback,
  messagesEndRef,
}) {
  return (
    <div className="px-3 py-4 sm:px-4 sm:py-6">
      <div className="mx-auto max-w-3xl">
        {messages.length === 0 && !ask.isLoading && !hasDocuments && (
          <div className="flex flex-col items-center justify-center py-8 text-center sm:py-12 md:py-16">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-400/10 ring-1 ring-amber-400/30 sm:mb-6 sm:h-20 sm:w-20 sm:rounded-2xl">
              <FileText className="h-7 w-7 text-amber-400 sm:h-10 sm:w-10" />
            </div>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Your compliance assistant awaits
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/80 sm:mt-3 sm:text-base">
              Upload policies, contracts, or HR documents below. Then ask
              questions in plain language and get answers with page-level
              citations. Upload policies, contracts, or HR documents below. Then
              ask questions in plain language and get answers with page-level
              citations. Upload policies, contracts, or HR documents below. Then
              ask questions in plain language and get answers with page-level
              citations. Upload policies, contracts, or HR documents below. Then
              ask questions in plain language and get answers with page-level
              citations. Upload policies, contracts, or HR documents below. Then
              ask questions in plain language and get answers with page-level
              citations. Upload policies, contracts, or HR documents below. Then
              ask questions in plain language and get answers with page-level
              citations. Upload policies, contracts, or HR documents below. Then
              ask questions in plain language and get answers with page-level
              citations. Upload policies, contracts, or HR documents below. Then
              ask questions in plain language and get answers with page-level
              citations. Upload policies, contracts, or HR documents below. Then
              ask questions in plain language and get answers with page-level
              citations. Upload policies, contracts, or HR documents below. Then
              ask questions in plain language and get answers with page-level
              citations. Upload policies, contracts, or HR documents below. Then
              ask questions in plain language and get answers with page-level
              citations. Upload policies, contracts, or HR documents below. Then
              ask questions in plain language and get answers with page-level
              citations. Upload policies, contracts, or HR documents below. Then
              ask questions in plain language and get answers with page-level
              citations.
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
              Use the attachment icon in the input to upload your first file
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
  );
}
