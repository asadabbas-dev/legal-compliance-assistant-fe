"use client";

import CircularILoader from "@/common/components/circular-loader/circular-loader.component";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import { FileText, Plus, X } from "lucide-react";

export default function WorkspaceSidebar({
  mobileSidebarOpen,
  setMobileSidebarOpen,
  handleNewChat,
  list,
  documents,
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
          <div>
            <h3 className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:mb-2 sm:text-xs">
              Your files
            </h3>
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
                    className="flex items-start gap-2 rounded-lg px-3 py-2 hover:bg-white/5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-amber-400/20">
                      <FileText className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm leading-tight text-white truncate">
                        {doc.filename}
                      </p>
                      <p className="mt-1 text-xs text-white/80">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {/* <span className="mt-0.5 shrink-0 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-medium text-amber-400 sm:text-xs">
                      {doc.status || "Ready"}
                    </span> */}
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
