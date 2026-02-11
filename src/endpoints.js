export const ENDPOINT = {
  auth: {
    register: { method: "POST", path: "/auth/register" },
    login: { method: "POST", path: "/auth/login" },
    me: { method: "GET", path: "/auth/me" },
  },
  rag: {
    upload: { method: "POST", path: "/documents/upload" },
    process: { method: "POST", path: "/documents/process" },
    documents: { method: "GET", path: "/documents" },
    ask: { method: "POST", path: "/rag/query" },
    feedback: { method: "POST", path: "/feedback" },
  },
  chat: {
    create: { method: "POST", path: "/chat/create" },
    list: { method: "GET", path: "/chat" },
    detail: (chatId) => ({ method: "GET", path: `/chat/${chatId}` }),
    history: (chatId) => ({ method: "GET", path: `/chat/${chatId}/history` }),
    message: (chatId) => ({ method: "POST", path: `/chat/${chatId}/message` }),
  },
};
