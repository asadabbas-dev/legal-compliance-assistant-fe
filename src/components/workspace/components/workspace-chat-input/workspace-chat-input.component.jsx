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
              startIcon={
                upload.isLoading ? <CircularILoader /> : undefined
              }
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

      {/* Chat Input */}
      <form onSubmit={handleFormSubmit} className="space-y-3">
        <div
          className="relative"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDropFile}
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={
              hasDocuments
                ? "Ask a question about your documents..."
                : "Upload documents first to start chatting..."
            }
            disabled={!hasDocuments || ask.isLoading || upload.isLoading}
            rows={3}
            className="w-full resize-none rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 disabled:cursor-not-allowed disabled:opacity-50"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleFormSubmit(e);
              }
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <CustomButton
            type="button"
            onClick={handleUploadClick}
            disabled={upload.isLoading}
            text="Upload File"
            size="sm"
            variant="secondary"
            startIcon={<Paperclip className="h-4 w-4" />}
          />

          <CustomButton
            type="submit"
            disabled={
              !hasDocuments ||
              !question.trim() ||
              ask.isLoading ||
              upload.isLoading
            }
            text={ask.isLoading ? "Asking..." : "Send"}
            size="sm"
            variant="primary"
            endIcon={
              ask.isLoading ? (
                <CircularILoader />
              ) : (
                <Send className="h-4 w-4" />
              )
            }
          />
        </div>
      </form>
    </div>
  );
}