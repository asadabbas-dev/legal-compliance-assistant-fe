"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import RagLayout from "@/common/components/rag-layout/rag-layout.component";
import useChat from "./use-chat.hook";

export default function Chat() {
  const {
    question,
    setQuestion,
    messages,
    handleAsk,
    handleFeedback,
    isLoading,
  } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAsk();
  };

  const handleThumbsUp = (idx) => {
    const userMsg = messages[idx - 1];
    const assistantMsg = messages[idx];
    if (userMsg?.role === "user" && assistantMsg?.role === "assistant") {
      handleFeedback(1, userMsg.content, assistantMsg.content);
    }
  };

  const handleThumbsDown = (idx) => {
    const userMsg = messages[idx - 1];
    const assistantMsg = messages[idx];
    if (userMsg?.role === "user" && assistantMsg?.role === "assistant") {
      handleFeedback(-1, userMsg.content, assistantMsg.content);
    }
  };

  return (
    <RagLayout>
      <div className="flex h-[calc(100vh-10rem)] flex-col section-spacing">
        <div>
          <h1 className="typography-section-title">Ask Your Documents</h1>
          <p className="typography-helper">
            Get answers grounded in your uploaded content with source citations.
          </p>
        </div>

        <div className="card flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="form-spacing flex h-full min-h-[200px] flex-col items-center justify-center text-center">
                  <p className="typography-body text-text-tertiary">
                    Ask a question about your documents
                  </p>
                  <p className="typography-helper">
                    e.g. What is the vacation policy?
                  </p>
                </div>
              ) : (
                <div className="section-spacing mx-auto max-w-3xl">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl table-cell ${
                          msg.role === "user"
                            ? "bg-primary-600 text-white"
                            : "bg-neutral-100 text-text-primary"
                        }`}
                      >
                        <p className="typography-body whitespace-pre-wrap">
                          {msg.content}
                        </p>
                        {msg.role === "assistant" && msg.citations?.length > 0 && (
                          <div className="form-spacing border-t border-neutral-200 pt-3">
                            <p className="typography-helper font-medium">
                              Sources
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.citations.map((c, i) => (
                                <span key={i} className="badge badge-info">
                                  {c.document} (p. {c.page})
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {msg.role === "assistant" && !msg.error && (
                          <div className="form-spacing flex gap-1 pt-0">
                            <button
                              type="button"
                              onClick={() => handleThumbsUp(idx)}
                              className="rounded p-1 text-text-tertiary hover:bg-neutral-200 hover:text-success-600"
                              title="Helpful"
                            >
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 2 2 0 00-2 2v4H3.5a2 2 0 00-1.967 2.608l1.2 6A2 2 0 005.518 16H6v-5.667z" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleThumbsDown(idx)}
                              className="rounded p-1 text-text-tertiary hover:bg-neutral-200 hover:text-danger-600"
                              title="Not helpful"
                            >
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 9.5a1.5 1.5 0 11-3 0v6a1.5 1.5 0 013 0v-6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 2 2 0 002-2V4h2.5a2 2 0 011.967 2.608l-1.2 6A2 2 0 0014.482 18H14v-5.333z" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="table-cell flex items-center gap-2 rounded-xl bg-neutral-100">
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
                        <span className="typography-body text-text-tertiary">Searching...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-neutral-200 p-6"
            >
              <div className="mx-auto flex max-w-3xl gap-3">
                <div className="flex-1">
                  <CustomInput
                    name="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
                <CustomButton
                  type="submit"
                  text="Ask"
                  loading={isLoading}
                  disabled={!question.trim() || isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </RagLayout>
  );
}
