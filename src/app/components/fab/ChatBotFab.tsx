import React, { useEffect, useRef, useState } from "react";
import { Chat as Model } from "./../../../model/chatModel";
import { chatService } from "../../../api/services/realtimefdb/chatService";

// Bot Data for fallback
const botData = [
  {
    question: "How can I franchise a Librewhan Cafe?",
    answer:
      "To franchise a Librewhan Cafe, fill out our franchise application form on the website, and our team will get in touch with you to discuss the next steps.",
  },
  {
    question: "What are the requirements for franchising?",
    answer:
      "The requirements include a minimum investment amount, an appropriate location, and a commitment to follow our brand guidelines. Contact us for more detailed information.",
  },
  {
    question: "Can I visit your store locations before deciding to franchise?",
    answer:
      "Yes, we encourage you to visit our store locations to experience our atmosphere and services firsthand before making a decision.",
  },
  {
    question: "How long does the franchise approval process take?",
    answer:
      "The approval process typically takes 2-4 weeks, depending on the completeness of the application and the evaluation of your proposed location.",
  },
  {
    question: "Do you offer training for new franchisees?",
    answer:
      "Yes, we provide comprehensive training for all new franchisees, including operations, marketing, and staff management to ensure your success.",
  },
];

export const ChatBotFab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    { type: "bot" | "user"; message: string }[]
  >([]);
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [userIp, setUserIp] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const sanitizePath = (ip: string) => ip.replace(/\./g, "_");
  const sanitizedIP = sanitizePath(userIp);
  const messagePath = `chat/${sanitizedIP}`;

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setUserIp(data.ip));
  }, []);

  useEffect(() => {
    chatService(messagePath)
      .getAll()
      .then((chats) => {
        const filteredChats = chats.filter(
          (chat) => chat.sender === userIp || chat.sender === "bot"
        );
        const sortedChats = filteredChats.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        const formattedChats = sortedChats.map((chat) => ({
          type: chat.sender === "bot" ? ("bot" as const) : ("user" as const),
          message: chat.message,
        }));
        setChatHistory(formattedChats);
      });
  }, [userIp, messagePath]);

  const toggleChatBot = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setChatHistory([
        { type: "bot", message: "Hello! How can I help you today?" },
      ]);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && userIp) {
      const newMessage: Model = {
        id: Date.now(),
        message,
        sender: userIp,
        date: new Date().toISOString(),
      };
      chatService(messagePath).create(newMessage);
      setChatHistory((prev) => [...prev, { type: "user", message }]);
      setMessage("");

      const botResponse = botData.find((item) =>
        message.toLowerCase().includes(item.question.toLowerCase())
      );

      if (botResponse) {
        setTimeout(() => {
          const botMessage: Model = {
            id: Date.now() + 1,
            message: botResponse.answer,
            sender: "bot",
            date: new Date().toISOString(),
          };
          chatService(messagePath).create(botMessage);
          setChatHistory((prev) => [
            ...prev,
            { type: "bot", message: botResponse.answer },
          ]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      const shouldScroll =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 10;
      if (shouldScroll) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [chatHistory]);

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleChatBot}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Chat
      </button>
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg p-4 w-80 mt-2 border border-gray-200">
          <div className="h-64 overflow-y-auto" ref={chatContainerRef}>
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  entry.type === "bot" ? "text-left" : "text-right"
                }`}
              >
                <p
                  className={`inline-block px-4 py-2 rounded-lg ${
                    entry.type === "bot"
                      ? "bg-gray-200 text-black"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {entry.message}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <button
              onClick={() => setShowSuggestions((prev) => !prev)}
              className="bg-gray-100 hover:bg-gray-300 text-sm px-2 py-1 rounded mb-2"
            >
              {showSuggestions ? "Hide" : "Show"} Suggested Questions
            </button>
            {showSuggestions && (
              <>
                <p className="text-sm text-gray-600 mb-2">
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {botData.map((item, index) => (
                    <button
                      key={index}
                      className="bg-gray-100 hover:bg-gray-300 text-sm px-2 py-1 rounded"
                      onClick={() => setMessage(item.question)}
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg px-2 py-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-r-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
