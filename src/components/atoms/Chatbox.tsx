"use client";

import { useState, useEffect, useRef } from "react";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import { useDisasters } from "@/hooks/useDisasters";
import { useChat } from "@/hooks/useChat";
import { TEXT } from "@/constants/messages";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface ChatBoxProps {
  onClose: () => void;
}

export default function ChatBox({ onClose }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [currentAddress, setCurrentAddress] =
    useState<string>("Đang xác định...");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: weatherData } = useWeatherForecast(
    coords?.lat || 0,
    coords?.lon || 0,
    1
  );
  const { data: disastersData } = useDisasters();
  const disasters = disastersData?.pages.flatMap((p) => p.events) || [];

  const chatMutation = useChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setCoords({ lat, lon });
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_NOMINATIM_BASE}/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await res.json();
          setCurrentAddress(data.display_name || TEXT.unknown);
        } catch {
          setCurrentAddress(TEXT.unknown);
        }
      },
      () => {
        setCurrentAddress(TEXT.cannotGet);
      }
    );
  } else {
    setCurrentAddress(TEXT.notSupported);
  }
}, []);


  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputValue("");

    const payload = {
      message: userMsg,
      location: currentAddress,
      weather: weatherData
        ? {
            temp: weatherData.hourly.temperature_2m?.[0],
            rain: weatherData.hourly.precipitation?.[0],
          }
        : null,
      disasters: disasters.map((d) => ({
        id: d.id,
        title: d.title,
        category: d.categories?.[0]?.title || "",
      })),
    };

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Đang trả lời..." },
    ]);

    chatMutation.mutate(payload, {
      onSuccess: (reply) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated.pop();
          return [...updated, { sender: "bot", text: reply }];
        });
      },
      onError: () => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Lỗi khi kết nối AI." },
        ]);
      },
    });
  };

  return (
    <div className="fixed bottom-4 right-24 z-50 w-96 bg-white shadow-xl rounded-lg border border-gray-300 flex flex-col">
      <div className="flex justify-between items-center p-3 bg-orange-600 text-white rounded-t-lg">
        <p className="font-semibold">Chatbot</p>
        <button onClick={onClose} className="hover:text-gray-200">
          ✕
        </button>
      </div>

      <div className="p-3 bg-gray-100 border-b text-xs text-gray-700">
        <p>
          <strong>📍 Địa điểm:</strong> {currentAddress}
        </p>
        {weatherData && (
          <p>
            <strong>🌤 Nhiệt độ:</strong>{" "}
            {weatherData.hourly.temperature_2m?.[0]}°C | <strong>🌧 Mưa:</strong>{" "}
            {weatherData.hourly.precipitation?.[0]} mm
          </p>
        )}
        {disasters.length > 0 && (
          <p>
            <strong>⚠ Thiên tai gần đây:</strong> {disasters[0].title} (
            {disasters.length} sự kiện)
          </p>
        )}
      </div>

      <div className="flex-1 min-h-[20rem] max-h-[20rem] overflow-y-auto p-3 bg-gray-50 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${
                msg.sender === "user"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="p-3 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500 text-sm font-semibold"
            disabled={chatMutation.isPending}
          >
            {chatMutation.isPending ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
