"use client";

import WorkspaceHeader from "@/components/workspace/components/workspace-header/workspace-header.component.jsx";

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen min-h-0 flex-col overflow-hidden bg-black">
      <WorkspaceHeader />
      <div className="flex min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
