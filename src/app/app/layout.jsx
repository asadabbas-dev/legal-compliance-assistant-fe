"use client";

import WorkspaceHeader from "@/components/workspace/components/workspace-header/workspace-header.component.jsx";

export default function AppLayout({ children }) {
  return (
    // h-screen + overflow-hidden creates a fixed viewport box.
    // The header shrinks to its natural height, children get the rest via flex-1 + min-h-0.
    <div className="flex flex-col h-screen overflow-hidden bg-black">
      <WorkspaceHeader />
      {/* flex-1 min-h-0 = "take remaining height but don't overflow the parent" */}
      <div className="flex flex-1 min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
