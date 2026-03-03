import { ENDPOINT } from "@/endpoints";

const getAnonymousToken = async () => {
  // Use fetch directly to avoid circular dependency with api() needing token
  const baseURL = process.env.NEXT_PUBLIC_MAIN_URL || 
                 process.env.NEXT_PUBLIC_RAG_API_URL || 
                 "http://localhost:8000/api/v1";
  
  const response = await fetch(`${baseURL}${ENDPOINT.anonymous.token.path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const anonymousService = {
  getAnonymousToken,
};

export default anonymousService;