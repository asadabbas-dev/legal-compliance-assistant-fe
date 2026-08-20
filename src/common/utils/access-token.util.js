"use client";

import { isJwtExpired } from "jwt-check-expiration";
import { ACCESS_TOKEN_KEY, getUser } from "./users.util";

export const getAccessToken = () => {
  if (typeof window === "object") {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY) || undefined;
  }
  return undefined;
};

export const setAccessToken = (token) => {
  if (typeof window === "object" && token) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

export const isLoginVerified = (data) => {
  const user = data ?? getUser();
  return Boolean(user?.id && user?.email);
};

export const getAccessTokenExpiry = () => {
  if (typeof window === "object") {
    const raw = window.localStorage.getItem("accessTokenExpiry");
    return raw ? JSON.parse(raw) : null;
  }
  return null;
};

export const checkForOldToken = async () => {
  if (typeof window === "object" && window.localStorage.getItem("user")) {
    localStorage.removeItem("user");
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return true;
  }
  return false;
};

export const checkExpiryDateOfToken = () => {
  const token = getAccessToken();
  if (!token) return null;
  try {
    return isJwtExpired(token) === false;
  } catch {
    return false;
  }
};
