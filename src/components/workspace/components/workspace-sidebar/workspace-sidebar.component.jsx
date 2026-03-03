"use client";

import CircularILoader from "@/common/components/circular-loader/circular-loader.component";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import { FileText, Plus, X, User, UserX, Trash2, RefreshCw } from "lucide-react";

export default function WorkspaceSidebar({
  mobileSidebarOpen,
  setMobileSidebarOpen,
  handleNewChat,
  isSignedIn,
  list,
  documents,
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

      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          {/* User Status */}
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            {isSignedIn ? (
              <>
                <User className="h-4 w-4 text-green-400" />
                <span className="text-xs font-medium text-green-400">
                  Signed In - History On
                </span>
              </>
            ) : (
              <>
                <UserX className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-medium text-amber-400">
                  Guest Mode - History Off
                </span>
              </>
            )}
          </div>

          {/* Documents */}
          <div>
            <div className="flex items-center justify-between mb-1.5 px-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:text-xs">
                Your files
              </h3>
              <button
                onClick={handleRefreshDocuments}
                className="p-1 rounded hover:bg-white/10 transition-colors"
                title="Refresh documents"
              >
                <RefreshCw className="h-3 w-3 text-white/60 hover:text-white/80" />
              </button>
            </div>
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
                    className="group relative flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-400/20">
                      <FileText className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white leading-tight mb-1" title={doc.filename}>
                        {doc.filename}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-white/60">
                          {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium flex items-center gap-1 ${
                            doc.status === 'processing' 
                              ? 'bg-blue-500/20 text-blue-400' 
                              : doc.status === 'failed'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {doc.status === 'processing' && (
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            )}
                            {doc.status === 'processing' ? 'Processing...' : doc.status === 'failed' ? 'Failed' : 'Ready'}
                          </span>
                          <button
                            onClick={() => handleDeleteDocument?.(doc.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 transition-all"
                            title="Delete document"
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