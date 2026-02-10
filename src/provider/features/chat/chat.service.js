import ragApi from "@/common/utils/rag-api.util";
import { ENDPOINT } from "@/endpoints";

const askQuestion = async (question) => {
  const response = await ragApi.post(ENDPOINT.rag.ask.path, { question });
  return response.data;
};

const submitFeedback = async (payload) => {
  const response = await ragApi.post(ENDPOINT.rag.feedback.path, payload);
  return response.data;
};

const chatService = {
  askQuestion,
  submitFeedback,
};

export default chatService;
