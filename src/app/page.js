"use client";

import React, { useState, useRef, useEffect } from "react";
import geminiApiService from "@/pages/api/modelApiService";
import ChatBotHeader from "@/components/ChatBotHeader";
import ChatBotBody from "@/components/ChatBotBody";
import ChatBotInput from "@/components/ChatBotInput";




export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null); // Store the copied block index
  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    await geminiApiService(input, setLoading, setMessages, messages);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatBotHeader/>

      <ChatBotBody {...{
        chatContainerRef,
        messages,
        setCopied,
        copied,
        loading,
      }}/>

      {/* Chat Input */}
      <ChatBotInput {...{input, setInput, sendMessage}} />
    </div>
  );
}
