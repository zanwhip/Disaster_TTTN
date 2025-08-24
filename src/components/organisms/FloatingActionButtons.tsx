"use client";

import { useState, useEffect } from "react";
import { FiInbox, FiArrowUp, FiEdit } from "react-icons/fi";
import ChatBox from "@/components/atoms/Chatbox";
import Link from "next/link";
const FloatingActionButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
const [showChat, setShowChat] = useState(false);
  return (
    <div className="fixed bottom-8 right-4 flex w-20 bg-white rounded-lg shadow-lg border border-gray-200 flex-col z-50 overflow-hidden">
       <Link href="/post">
      <div
        className="flex flex-col items-center justify-center text-orange-400 p-3 hover:bg-gray-100 cursor-pointer transition"
        title="Report Disaster"
      >
        <FiEdit size={24} />
        <p className="text-xs mt-1 font-semibold">Report</p>
      </div>
    </Link>
      <div className="w-full h-[1px] bg-gray-300"></div>

      <div
        className="flex flex-col items-center justify-center p-3 hover:bg-gray-100 cursor-pointer transition"
        title="Inbox"
        onClick={() => setShowChat(true)}
      >
        <FiInbox size={24} />
        <p className="text-xs mt-1">Inbox</p>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {showScrollTop && (
        <>
          <div
            onClick={scrollToTop}
            className="flex flex-col items-center justify-center p-3 hover:bg-gray-100 cursor-pointer transition"
            title="Back to Top"
          >
            <FiArrowUp size={24} />
            <p className="text-xs mt-1">Top</p>
          </div>
        </>
      )}
       {showChat && (
        <ChatBox onClose={() => setShowChat(false)} />
      )}
    </div>
  );
};

export default FloatingActionButtons;
