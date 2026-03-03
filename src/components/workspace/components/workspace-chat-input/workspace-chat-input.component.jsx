"use client";

import CircularILoader from "@/common/components/circular-loader/circular-loader.component";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import { Paperclip, Send, X } from "lucide-react";

export default function WorkspaceChatInput({
  fileInputRef,
  selectedFile,
  upload,
  ask,
  question,
  setQuestion,
  hasDocuments,
  handleFileSelect,
  handleUploadClick,
  handleSubmitUpload,
  handleClearFile,
  handleFormSubmit,
  handleDragOver,
  handleDragLeave,
  handleDropFile,
}) {
  return (
    <div className="border-t border-white/10 bg-black/50 p-3 sm:p-4">
      {/* File Upload Section */}
      {selectedFile && (
        <div className="mb-3 flex items-center justify-between rounded-lg bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <Paperclip className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-white truncate">
              {selectedFile.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CustomButton
              onClick={handleSubmitUpload}
              disabled={upload.isLoading}
              text={upload.isLoading ? "Uploading..." : "Upload"}
              size="sm"
              variant="primary"
              startIcon={upload.isLoading ? <CircularILoader /> : undefined}
            />
            <button
              onClick={handleClearFile}
              className="rounded p-1 hover:bg-white/10"
              disabled={upload.isLoading}
            >
              <X className="h-4 w-4 text-white/70" />
            </button>
          </div>
        </div>
      )}

      {/* Chat Input with Inline Icons */}
      <form onSubmit={handleFormSubmit}>
        <div
          className="relative mx-auto max-w-3xl"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDropFile}
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={
              hasDocuments
                ? "Ask a question about your document"
                : "Upload documents first to start conversation"
            }
            disabled={!hasDocuments || ask.isLoading || upload.isLoading}
            rows={1}
            className="w-full resize-none rounded-lg border border-white/30 bg-white/10 px-4 py-3 pr-20 text-white placeholder-white/60 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 disabled:cursor-not-allowed disabled:opacity-50 min-h-[48px] font-medium"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleFormSubmit(e);
              }
            }}
            style={{
              height: "auto",
              minHeight: "48px",
              maxHeight: "120px",
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height =
                Math.min(e.target.scrollHeight, 120) + "px";
            }}
          />

          {/* Inline Icons */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              type="button"
              onClick={handleUploadClick}
              disabled={upload.isLoading}
              className="p-2 rounded-md hover:bg-white/10 transition-colors disabled:opacity-50"
              title="Upload file"
            >
              <Paperclip className="h-4 w-4 text-white/80 hover:text-amber-400" />
            </button>

            <button
              type="submit"
              disabled={
                !hasDocuments ||
                !question.trim() ||
                ask.isLoading ||
                upload.isLoading
              }
              className="p-2 rounded-md bg-amber-400 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Send message"
            >
              {ask.isLoading ? (
                <CircularILoader />
              ) : (
                <Send className="h-4 w-4 text-black" />
              )}
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </form>
    </div>
  );
}
