"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import CircularILoader from "@/common/components/circular-loader/circular-loader.component";
import RagLayout from "@/common/components/rag-layout/rag-layout.component";
import useUpload from "./use-upload.hook";

const FileIcon = () => (
  <svg
    className="h-5 w-5 text-text-tertiary"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

export default function Upload() {
  const {
    fileInputRef,
    selectedFile,
    handleFileSelect,
    handleUploadClick,
    handleSubmit,
    handleClearFile,
    documents,
    uploadLoading,
    listLoading,
    uploadError,
    uploadMessage,
  } = useUpload();

  return (
    <RagLayout>
      <div className="section-spacing">
        <div>
          <h1 className="typography-section-title">Documents</h1>
          <p className="typography-helper">
            Upload PDF files to build your knowledge base. Documents are processed in the background.
          </p>
        </div>

        <div className="card rounded-xl">
          <div className="p-6">
            <div
              onClick={handleUploadClick}
              onDragOver={(e) => {
                e.preventDefault();
                if (!uploadLoading) e.currentTarget.classList.add("ring-2", "ring-primary-500");
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove("ring-2", "ring-primary-500");
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove("ring-2", "ring-primary-500");
                const file = e.dataTransfer.files?.[0];
                if (file?.type === "application/pdf") handleFileSelect({ target: { files: [file] } });
              }}
              className={`relative cursor-pointer rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-8 transition-all hover:border-neutral-300 ${uploadLoading ? "pointer-events-none opacity-60" : ""}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileSelect}
                className="sr-only"
              />
              {uploadLoading ? (
                <div className="form-spacing flex flex-col items-center">
                  <CircularILoader />
                  <p className="typography-body text-text-tertiary">Uploading and processing...</p>
                </div>
              ) : selectedFile ? (
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                      <FileIcon />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate typography-label">
                        {selectedFile.name}
                      </p>
                      <p className="typography-helper">PDF • Ready to upload</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <CustomButton
                      text="Clear"
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFile}
                    />
                    <CustomButton
                      text="Upload"
                      variant="primary"
                      size="sm"
                      onClick={handleSubmit}
                      loading={uploadLoading}
                      disabled={uploadLoading}
                    />
                  </div>
                </div>
              ) : (
                <div className="form-spacing flex flex-col items-center text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <svg
                      className="h-6 w-6 text-text-tertiary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="typography-label">
                    Upload PDF files
                  </p>
                  <p className="typography-helper">
                    Drag and drop or click to browse • PDF up to 50MB
                  </p>
                </div>
              )}
            </div>
            {uploadError && uploadMessage && (
              <p className="typography-body text-danger-600">{uploadMessage}</p>
            )}
          </div>
        </div>

        <div className="form-spacing">
          <h2 className="typography-section-title">Uploaded Documents</h2>
          {listLoading ? (
            <div className="card flex justify-center py-12">
              <CircularILoader />
            </div>
          ) : documents.length === 0 ? (
            <div className="form-spacing flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200">
                <FileIcon />
              </div>
              <p className="typography-label">No documents yet</p>
              <p className="typography-body max-w-sm text-text-tertiary">
                Upload your first PDF to start building your knowledge base.
              </p>
            </div>
          ) : (
            <div className="form-spacing">
              {documents.map((doc) => (
                <div key={doc.id} className="card">
                  <div className="table-cell flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                      <FileIcon />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate typography-label">
                        {doc.filename}
                      </p>
                      <p className="typography-helper">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="badge badge-success">Ready</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </RagLayout>
  );
}
