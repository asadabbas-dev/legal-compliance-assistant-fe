"use client";

import CircularILoader from "@/common/components/circular-loader/circular-loader.component";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import {
  FileText,
  Plus,
  X,
  User,
  UserX,
  Trash2,
  RefreshCw,
  MessageSquare,
} from "lucide-react";

export default function WorkspaceSidebar({
  mobileSidebarOpen,
  setMobileSidebarOpen,
  handleNewChat,
  isSignedIn,
  list,
  documents,
  chats = [],
  currentChatId,
  handleSelectChat,
  handleDeleteDocument,
  handleRefreshDocuments,
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-[85vw] max-w-[320px] flex-col border-r border-white/10 bg-black transition-transform sm:w-64 lg:relative lg:inset-auto lg:z-auto lg:max-w-none ${
        mobileSidebarOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex h-12 items-center justify-between border-b border-white/10 px-3 sm:h-14 sm:px-4">
        <CustomButton
          type="button"
          onClick={handleNewChat}
          text="New chat"
          size="sm"
          variant="primary"
          startIcon={<Plus className="h-4 w-4 sm:h-5 sm:w-5" />}
          className="w-full"
        />
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(false)}
          className="rounded-lg p-2 text-white/90 hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            {isSignedIn ? (
              <>
                <User className="h-4 w-4 text-green-400" />
                <span className="text-xs font-medium text-green-400">
                  Signed in — history saved
                </span>
              </>
            ) : (
              <>
                <UserX className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-medium text-amber-400">
                  Guest mode — no history
                </span>
              </>
            )}
          </div>

          {isSignedIn && (
            <div>
              <h3 className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:text-xs">
                Chats
              </h3>
              <div className="max-h-48 space-y-1 overflow-y-auto">
                {chats.length === 0 ? (
                  <p className="px-2 py-3 text-xs text-white/60">
                    No saved chats yet. Ask a question to start one.
                  </p>
                ) : (
                  chats.map((chat) => {
                    const active =
                      String(chat.id) === String(currentChatId);
                    return (
                      <button
                        key={chat.id}
                        type="button"
                        onClick={() => handleSelectChat?.(chat.id)}
                        className={`flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
                          active
                            ? "bg-amber-400/15 text-white"
                            : "text-white/80 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                        <span className="line-clamp-2 text-xs font-medium">
                          {chat.title || "New chat"}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          <div>
            <div className="mb-1.5 flex items-center justify-between px-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:text-xs">
                Your files
              </h3>
              <button
                onClick={handleRefreshDocuments}
                className="rounded p-1 transition-colors hover:bg-white/10"
                title="Refresh documents"
                type="button"
              >
                <RefreshCw className="h-3 w-3 text-white/60 hover:text-white/80" />
              </button>
            </div>
            {!isSignedIn && (
              <p className="mb-2 px-2 text-[11px] leading-snug text-white/45">
                Files stay for this tab only. Sign in to keep them.
              </p>
            )}
            <div className="max-h-40 space-y-1 overflow-y-auto sm:max-h-48">
              {list.isLoading ? (
                <div className="flex justify-center py-6">
                  <CircularILoader />
                </div>
              ) : list.isError ? (
                <p className="px-2 py-4 text-sm text-white/80">
                  Could not load documents. Check your internet connection or
                  try again later.
                </p>
              ) : documents.length === 0 ? (
                <p className="px-2 py-4 text-sm text-white/80">
                  No documents yet. Upload a file to get started.
                </p>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="group relative flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-white/5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-400/20">
                      <FileText className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="mb-1 max-w-[150px] truncate text-xs font-medium leading-tight text-white"
                        title={doc.filename}
                      >
                        {doc.filename}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-white/60">
                          {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-medium ${
                              doc.status === "processing"
                                ? "bg-blue-500/20 text-blue-400"
                                : doc.status === "failed"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {doc.status === "processing" && (
                              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400"></div>
                            )}
                            {doc.status === "processing"
                              ? "Processing..."
                              : doc.status === "failed"
                                ? "Failed"
                                : "Ready"}
                          </span>
                          <button
                            onClick={() => handleDeleteDocument?.(doc.id)}
                            className="rounded p-1 opacity-0 transition-all hover:bg-red-500/20 group-hover:opacity-100"
                            title="Delete document"
                            type="button"
                          >
                            <Trash2 className="h-3 w-3 text-red-400 hover:text-red-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
