"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import Landing from "@/components/landing/landing.component";

export default function Home() {
  return <Auth component={<Landing />} type={AUTH.PUBLIC} />;
}
