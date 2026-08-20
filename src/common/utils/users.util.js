"use client";

import ROLES from "../constants/role.constant";

export const ACCESS_TOKEN_KEY = "rag_access_token";
export const GUEST_TOKEN_KEY = "rag_guest_token";

function isBrowser() {
  return typeof window === "object" && Boolean(window.localStorage);
}

function isGuestEmail(email) {
  if (!email || typeof email !== "string") return true;
  const normalized = email.toLowerCase().trim();
  return (
    normalized === "anonymous@local" ||
    (normalized.startsWith("guest-") && normalized.endsWith("@anonymous.local"))
  );
}

export const getUser = () => {
  if (!isBrowser() || !window.localStorage.getItem("user")) return undefined;
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return undefined;
  }
};

export const setUser = (user) => {
  if (!isBrowser() || !user) return;
  localStorage.setItem("user", JSON.stringify(user));
};

export const isAuthenticated = (data) => {
  const user = data ?? getUser();
  return Boolean(user?.id && user?.email && !isGuestEmail(user.email));
};

export const getGuestToken = () => {
  if (typeof window !== "object") return undefined;
  try {
    return window.sessionStorage.getItem(GUEST_TOKEN_KEY) || undefined;
  } catch {
    return undefined;
  }
};

export const setGuestToken = (token) => {
  if (typeof window !== "object" || !token) return;
  try {
    window.sessionStorage.setItem(GUEST_TOKEN_KEY, token);
  } catch {
    // Ignore sessionStorage failures (private mode quotas, etc.)
  }
};

export const clearGuestToken = () => {
  if (typeof window !== "object") return;
  try {
    window.sessionStorage.removeItem(GUEST_TOKEN_KEY);
  } catch {
    // ignore
  }
};

export const removeUser = () => {
  if (!isBrowser()) return;
  localStorage.removeItem("user");
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem("isOtpVerify");
  localStorage.removeItem("userId");
  localStorage.removeItem("phone");
  localStorage.removeItem("userProfile");
};

export const isPhoneVerified = (data) => {
  if ((isBrowser() && window.localStorage.getItem("user")) || data) {
    const user = data ?? getUser();
    return user.isPhoneVerified;
  }
  return false;
};

export const isEmailVerified = (data) => {
  if ((isBrowser() && window.localStorage.getItem("user")) || data) {
    const user = data ?? getUser();
    return user.isEmailVerified;
  }
  return false;
};

export const isProfileCreated = (data) => {
  if ((isBrowser() && window.localStorage.getItem("user")) || data) {
    const user = data ?? getUser();
    return user.currentBusinessId;
  }
  return false;
};

export const is2FAEnabled = (data) => {
  if ((isBrowser() && window.localStorage.getItem("user")) || data) {
    const user = data ?? getUser();
    return user.isTwoFactorAuth;
  }
  return false;
};

export const isSuperAdmin = (data) => {
  if ((isBrowser() && window.localStorage.getItem("user")) || data) {
    const user = data ?? getUser();
    return user.role === ROLES.SUPER_ADMIN.toString();
  }
  return false;
};

export const getEmailForURL = (email) => {
  if (email?.includes("+")) return email.replace("+", "%2B");
  return email;
};
