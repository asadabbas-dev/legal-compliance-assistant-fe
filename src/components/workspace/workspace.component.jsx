"use client";

import { Menu } from "lucide-react";
import useWorkspace from "@/components/workspace/use-workspace.hook";
import WorkspaceSidebar from "@/components/workspace/components/workspace-sidebar/workspace-sidebar.component";
import WorkspaceMessages from "@/components/workspace/components/workspace-messages/workspace-messages.component";
import WorkspaceChatInput from "@/components/workspace/components/workspace-chat-input/workspace-chat-input.component";

export default function Workspace() {
  const {
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
    setQuestion,
    setMobileSidebarOpen,
    handleFileSelect,
    handleUploadClick,
    handleSubmitUpload,
    handleClearFile,
    handleNewChat,
    handleFeedback,
    handleFormSubmit,
    handleDropFile,
    handleDragOver,
    handleDragLeave,
  } = useWorkspace();

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
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

      <WorkspaceSidebar
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        handleNewChat={handleNewChat}
        isSignedIn={isSignedIn}
        list={list}
        documents={documents}
      />

      <main className="flex flex-1 flex-col overflow-hidden">
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

        <WorkspaceMessages
          messages={messages}
          ask={ask}
          hasDocuments={hasDocuments}
          handleFeedback={handleFeedback}
          messagesEndRef={messagesEndRef}
        />

        <WorkspaceChatInput
          fileInputRef={fileInputRef}
          selectedFile={selectedFile}
          upload={upload}
          ask={ask}
          question={question}
          setQuestion={setQuestion}
          hasDocuments={hasDocuments}
          handleFileSelect={handleFileSelect}
          handleUploadClick={handleUploadClick}
          handleSubmitUpload={handleSubmitUpload}
          handleClearFile={handleClearFile}
          handleFormSubmit={handleFormSubmit}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDropFile={handleDropFile}
        />
      </main>
    </div>
  );
}
