"use client";

import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { getAccessToken } from "./access-token.util";
import {
  ACCESS_TOKEN_KEY,
  clearGuestToken,
  getGuestToken,
  isAuthenticated,
  removeUser,
} from "./users.util";

function getStoredAccessToken() {
  if (typeof window !== "object") return undefined;
  if (isAuthenticated()) {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY) || getAccessToken();
  }
  return getGuestToken();
}

const api = (headers = null) => {
  const defaultHeaders = {
    Accept: "application/json",
  };

  const combinedHeaders = { ...defaultHeaders, ...(headers || {}) };
  if (!combinedHeaders.Authorization) {
    const accessToken = getStoredAccessToken();
    if (accessToken) {
      combinedHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }

  const apiInstance = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://localhost:8000/api/v1",
    headers: combinedHeaders,
  });

  // Request interceptor: auth + content-type handling
  apiInstance.interceptors.request.use((config) => {
    const requestPath = `${config.baseURL || ""}${config.url || ""}`;
    const isPublicAuth =
      requestPath.includes("/auth/login") ||
      requestPath.includes("/auth/register");
    if (isPublicAuth && config.headers) {
      if (typeof config.headers.delete === "function") {
        config.headers.delete("Authorization");
      } else {
        delete config.headers.Authorization;
      }
    }

    // Keep multipart uploads valid (browser sets boundary automatically).
    if (typeof FormData !== "undefined" && config.data instanceof FormData) {
      if (config.headers && typeof config.headers.delete === "function") {
        config.headers.delete("Content-Type");
      } else if (config.headers) {
        delete config.headers["Content-Type"];
      }
    } else if (!config.headers?.["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Network issues
      if (error.message === "Network Error") {
        enqueueSnackbar(error.message, { variant: "error" });
        throw error;
      }

      const status = error.response?.status;
      const detail = error.response?.data?.detail;
      const message =
        error.response?.data?.message ||
        detail ||
        error.message ||
        error.toString();

      // Only clear the session for a bad/expired token — not for failed login.
      const silentAuthErrors = new Set([
        "Invalid token",
        "Not authenticated",
        "User not found",
      ]);
      if (
        status === 401 &&
        typeof window !== "undefined" &&
        (silentAuthErrors.has(detail) || silentAuthErrors.has(message))
      ) {
        removeUser();
        clearGuestToken();
      }

      const skipToast =
        status === 401 &&
        (silentAuthErrors.has(detail) || silentAuthErrors.has(message));

      if (!skipToast && Array.isArray(detail)) {
        detail.forEach((item) =>
          enqueueSnackbar(item?.msg || String(item), { variant: "error" }),
        );
      } else if (
        !skipToast &&
        typeof message === "string" &&
        message !== "Record Not Found"
      ) {
        enqueueSnackbar(message, { variant: "error" });
      }

      return Promise.reject(error);
    },
  );

  return apiInstance;
};

export default api;
