"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser, isAuthenticated } from "@/common/utils/users.util";

export default function useAuthSession() {
  const authUser = useSelector((state) => state.auth?.user);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = getUser() || authUser;
    const signedIn = isAuthenticated(user) || isAuthenticated();
    setIsSignedIn(signedIn);
    setEmail(user?.email || getUser()?.email || "");
    setReady(true);
  }, [authUser]);

  return { isSignedIn, email, ready, authUser };
}
