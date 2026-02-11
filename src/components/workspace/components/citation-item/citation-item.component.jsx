"use client";

export default function CitationItem({ document: docName, page, snippet = "" }) {
  const hasSnippet = snippet && snippet.trim().length > 0;

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3 sm:p-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-white">{docName}</p>
        <p className="text-xs text-white/85">Page {page}</p>
        {hasSnippet && (
          <details className="space-y-2 pt-0">
            <summary className="cursor-pointer text-xs font-medium text-amber-400 hover:text-amber-300">
              Show snippet
            </summary>
            <p className="rounded border border-white/10 bg-white/5 p-4 text-sm text-white">
              {snippet}
            </p>
          </details>
        )}
      </div>
    </div>
  );
}
