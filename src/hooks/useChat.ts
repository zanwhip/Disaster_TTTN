"use client";

import { useMutation } from "@tanstack/react-query";

interface ChatPayload {
  message: string;
  location: string;
  weather: { temp: number; rain: number } | null;
  disasters: { id: string; title: string; category: string }[];
}

export const useChat = () => {
  return useMutation({
    mutationFn: async (payload: ChatPayload) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Chat API failed");
      }

      const data = await response.json();
      return data.reply;
    },
  });
};
