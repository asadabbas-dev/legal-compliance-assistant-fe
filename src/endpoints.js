export const ENDPOINT = {
  auth: {
    register: { method: "POST", path: "/auth/register" },
    login: { method: "POST", path: "/auth/login" },
  },
  rag: {
    upload: { method: "POST", path: "/upload" },
    documents: { method: "GET", path: "/documents" },
    ask: { method: "POST", path: "/ask" },
    feedback: { method: "POST", path: "/feedback" },
  },
};
