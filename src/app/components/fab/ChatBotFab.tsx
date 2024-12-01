import React, { useEffect, useRef, useState } from "react";

interface BotData {
  question: string;
  answer: string;
}

const botData: BotData[] = [
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
  const [showQuestions, setShowQuestions] = useState(true);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const toggleChatBot = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      // Reset chat when opening
      setChatHistory([
        {
          type: "bot",
          message: "Hello! How can I help you today? Please choose a question.",
        },
      ]);
      setShowQuestions(true);
    }
  };

  const handleQuestionClick = (question: string, answer: string) => {
    setChatHistory((prev) => [
      ...prev,
      { type: "user", message: question },
      { type: "bot", message: answer },
      {
        type: "bot",
        message:
          "Do you have more questions? Choose one below or close the chat.",
      },
    ]);
    setShowQuestions(true);
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container when chatHistory updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
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
          {showQuestions && (
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Choose a question:</p>
              <ul className="space-y-2">
                {botData.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() =>
                        handleQuestionClick(item.question, item.answer)
                      }
                      className="block text-left text-xs w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
                    >
                      {item.question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
