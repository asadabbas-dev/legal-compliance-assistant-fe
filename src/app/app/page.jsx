"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import Workspace from "@/components/workspace/workspace.component.jsx";

export default function AppPage() {
  return <Auth component={<Workspace />} type={AUTH.PUBLIC} />;
}
