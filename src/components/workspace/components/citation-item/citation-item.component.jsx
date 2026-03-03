"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function CitationItem({ citation }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-white">
            {citation.document}
            {citation.page && (
              <span className="ml-2 text-xs text-white/70">
                Page {citation.page}
              </span>
            )}
          </p>
          {citation.section && (
            <p className="text-xs text-white/60">{citation.section}</p>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 rounded p-1 hover:bg-white/10"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-white/70" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white/70" />
          )}
        </button>
      </div>
      {isExpanded && citation.snippet && (
        <div className="mt-2 border-t border-white/10 pt-2">
          <p className="text-sm text-white/80">{citation.snippet}</p>
        </div>
      )}
    </div>
  );
}