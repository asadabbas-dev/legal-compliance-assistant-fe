"use client";

import { FileText, Paperclip, Send, X } from "lucide-react";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import CircularILoader from "@/common/components/circular-loader/circular-loader.component";

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
    <div className="shrink-0 border-t border-white/10 bg-black p-3 sm:p-4">
      <div className="mx-auto max-w-3xl">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDropFile}
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
                    ? "Ask a question about your documents..."
                    : "Upload a document or ask a question..."
                }
                disabled={ask.isLoading}
                className="!border-0 !bg-transparent !py-2 !text-sm !text-white placeholder:!text-white/70 focus:!ring-0 sm:!py-2.5 sm:!text-base"
              />
            </div>
            <button
              type="submit"
              disabled={!question.trim() || !hasDocuments || ask.isLoading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-black transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-amber-400 sm:h-10 sm:w-10 sm:rounded-xl"
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
  );
}
