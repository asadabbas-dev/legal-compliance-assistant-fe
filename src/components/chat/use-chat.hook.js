"use client";

import { askQuestion, submitFeedback } from "@/provider/features/chat/chat.slice";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useChat() {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const { ask } = useSelector((state) => state.chat);

  const handleAsk = useCallback(
    async (q) => {
      const text = (q || question).trim();
      if (!text) return;

      setQuestion("");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: text, citations: [] },
      ]);

      const response = await dispatch(
        askQuestion({
          question: text,
          successCallBack: (data) => {
            setMessages((prev) => [
              ...prev.slice(0, -1),
              { role: "user", content: text, citations: [] },
              {
                role: "assistant",
                content: data.answer,
                citations: data.citations || [],
              },
            ]);
          },
        })
      );

      if (response?.meta?.requestStatus === "rejected") {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            role: "assistant",
            content: "Sorry, I couldn't process your question. Please try again.",
            citations: [],
            error: true,
          },
        ]);
      }
    },
    [dispatch, question]
  );

  const handleFeedback = useCallback(
    (rating, lastUserMsg, lastAssistantMsg) => {
      if (!lastUserMsg || !lastAssistantMsg) return;
      dispatch(
        submitFeedback({
          payload: {
            question: lastUserMsg,
            answer: lastAssistantMsg,
            rating,
          },
        })
      );
    },
    [dispatch]
  );

  return {
    question,
    setQuestion,
    messages,
    handleAsk,
    handleFeedback,
    isLoading: ask.isLoading,
    error: ask.isError,
    errorMessage: ask.message,
  };
}
