import api from "@/common/utils/api";
import { ENDPOINT } from "@/endpoints";

const askQuestion = async (question) => {
  const response = await api().post(ENDPOINT.rag.ask.path, { question });
  return response.data;
};

const createChat = async (title = "New chat") => {
  const response = await api().post(ENDPOINT.chat.create.path, { title });
  return response.data;
};

const listChats = async () => {
  const response = await api().get(ENDPOINT.chat.list.path);
  return response.data;
};

const getChatHistory = async (chatId) => {
  const response = await api().get(ENDPOINT.chat.history(chatId).path);
  return response.data;
};

const sendChatMessage = async (chatId, content) => {
  const response = await api().post(ENDPOINT.chat.message(chatId).path, { content });
  return response.data;
};

const submitFeedback = async (payload) => {
  const response = await api().post(ENDPOINT.rag.feedback.path, payload);
  return response.data;
};

const chatService = {
  askQuestion,
  createChat,
  listChats,
  getChatHistory,
  sendChatMessage,
  submitFeedback,
};

export default chatService;
