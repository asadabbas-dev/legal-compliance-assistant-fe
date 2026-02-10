"use client";

import axios from "axios";
import { enqueueSnackbar } from "notistack";

const baseURL = process.env.NEXT_PUBLIC_RAG_API_URL || "http://localhost:8000/api/v1";

const ragApi = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

ragApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const detail = error.response?.data?.detail;
    const message = error.response?.data?.message || error.message || "Something went wrong";
    if (Array.isArray(detail)) {
      detail.forEach((item) => enqueueSnackbar(item?.msg || String(item), { variant: "error" }));
    } else if (typeof (detail || message) === "string" && message !== "Record Not Found") {
      enqueueSnackbar(detail || message, { variant: "error" });
    }
    return Promise.reject(error);
  }
);

export default ragApi;
