"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import LandingPage from "@/components/landing/landing-page.component";

export default function Home() {
  return <Auth component={<LandingPage />} type={AUTH.PUBLIC} />;
}
