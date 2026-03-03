import axios from "axios";

/**
 * Isolated documents service that doesn't depend on the main api.js
 * to avoid any potential circular dependencies in production builds
 */

function getTokenDirect() {
  if (typeof window === "object") {
    // Check for RAG token first (for anonymous users)
    const ragToken = window.localStorage?.getItem("rag_access_token");
    if (ragToken) {
      return ragToken;
    }
    
    // Check for user token (for authenticated users)
    const userStr = window.localStorage?.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user?.loginVerifiedToken?.[0]?.token;
      } catch (e) {
        console.warn("Failed to parse user token:", e);
      }
    }
  }
  return null;
}

const createApiInstance = () => {
  const accessToken = getTokenDirect();

  const defaultHeaders = {
    Accept: "application/json",
  };

  const combinedHeaders = accessToken
    ? { ...defaultHeaders, Authorization: `Bearer ${accessToken}` }
    : defaultHeaders;

  return axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_MAIN_URL ||
      process.env.NEXT_PUBLIC_RAG_API_URL ||
      "http://localhost:8000/api/v1",
    headers: combinedHeaders,
  });
};

const uploadPdf = async (formData) => {
  const api = createApiInstance();
  
  // Handle FormData content-type
  if (formData instanceof FormData) {
    delete api.defaults.headers["Content-Type"];
  }
  
  const response = await api.post("/documents/upload", formData, {
    timeout: 60000,
  });
  return response.data;
};

const getDocuments = async () => {
  const api = createApiInstance();
  const response = await api.get("/documents");
  return response.data;
};

const documentsIsolatedService = {
  uploadPdf,
  getDocuments,
};

export default documentsIsolatedService;