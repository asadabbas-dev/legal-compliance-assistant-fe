"use client";

import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { getAccessToken } from "./access-token.util";
import { removeUser } from "./users.util";

const api = (headers = null) => {
  const accessToken =
    (typeof window === "object" &&
      window.localStorage?.getItem("rag_access_token")) ||
    getAccessToken();

  const defaultHeaders = {
    Accept: "application/json",
  };

  const combinedHeaders = accessToken
    ? { ...defaultHeaders, ...headers, Authorization: `Bearer ${accessToken}` }
    : { ...defaultHeaders, ...headers };

  const apiInstance = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_MAIN_URL ||
      process.env.NEXT_PUBLIC_RAG_API_URL ||
      "http://localhost:8000/api/v1",
    headers: combinedHeaders,
  });

  // Request interceptor: auth + content-type handling
  apiInstance.interceptors.request.use((config) => {
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

      // Handle unauthorized
      if (status === 401 && typeof window !== "undefined") {
        removeUser();
        window.location.href = "/";
        return;
      }

      if (Array.isArray(detail)) {
        detail.forEach((item) =>
          enqueueSnackbar(item?.msg || String(item), { variant: "error" }),
        );
      } else if (
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
