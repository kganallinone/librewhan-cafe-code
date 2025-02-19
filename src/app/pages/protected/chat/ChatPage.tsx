import React, { useState, useEffect } from "react";
import { chatService } from "../../../../api/services/realtimefdb/chatService";

// Define a type for chat messages fetched from the database.
interface ChatMessage {
  id: string;
  date: string;
  message: string;
  sender: string;
}

// Extend the display message type to include admin messages.
type DisplayMessage =
  | { type: "bot"; message: string }
  | { type: "user"; message: string }
  | { type: "admin"; message: string };

export const ChatPage: React.FC = () => {
  const [ipList, setIpList] = useState<string[]>([]);
  const [selectedIp, setSelectedIp] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<DisplayMessage[]>([]);
  const [adminMessage, setAdminMessage] = useState("");

  // Fetch the list of visitor IP addresses from the "chat" root
  useEffect(() => {
    chatService("chat")
      .getAll()
      .then((data: any[]) => {
        if (data && data.length > 0) {
          // Each conversation object has a "documentId" property with the sanitized IP
          const ips = data.map((conversation) =>
            conversation.documentId.replace(/_/g, ".")
          );
          setIpList(ips);
        }
      })
      .catch((err) => console.error("Error fetching IP list:", err));
  }, []);

  // Load chat history for the selected IP address
  const handleIpSelect = (ip: string) => {
    setSelectedIp(ip);
    const sanitizedIP = ip.replace(/\./g, "_");

    chatService("chat")
      .getAll()
      .then((data: any[]) => {
        // Find the conversation that matches the selected sanitized IP
        const conversation = data.find(
          (item) => item.documentId === sanitizedIP
        );
        if (conversation) {
          // Remove the "documentId" property to leave only the messages
          const messageKeys = Object.keys(conversation).filter(
            (key) => key !== "documentId"
          );
          const messagesArray: ChatMessage[] = messageKeys.map(
            (key) => conversation[key]
          );
          // Sort messages by date (oldest first)
          messagesArray.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          // Format messages for display with explicit type casting
          const formattedChats: DisplayMessage[] = messagesArray.map((msg) => ({
            type: msg.sender === "bot" ? ("bot" as const) : ("user" as const),
            message: msg.message,
          }));
          setChatHistory(formattedChats);
        } else {
          setChatHistory([]);
        }
      })
      .catch((err) => console.error("Error fetching chat history:", err));
  };

  // Handle sending a message as admin
  const handleAdminSend = () => {
    if (!adminMessage.trim() || !selectedIp) return;
    const sanitizedIP = selectedIp.replace(/\./g, "_");
    const messagePath = `chat/${sanitizedIP}`;
    const newMessage = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      message: adminMessage,
      sender: "admin",
    };

    // Send the message to the chat service (assuming chatService supports create)
    chatService(messagePath)
      .create(newMessage)
      .then(() => {
        // Update the chat history with the admin message
        setChatHistory((prev) => [
          ...prev,
          { type: "admin", message: adminMessage },
        ]);
        setAdminMessage("");
      })
      .catch((err) => console.error("Error sending admin message:", err));
  };

  return (
    <div className="admin-chat-page flex h-screen">
      {/* Left side: IP address list */}
      <div className="ip-list w-1/4 bg-gray-100 p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Visitor IP Addresses</h2>
        <ul>
          {ipList.map((ip) => (
            <li
              key={ip}
              onClick={() => handleIpSelect(ip)}
              className={`cursor-pointer p-2 hover:bg-gray-200 ${
                selectedIp === ip ? "bg-blue-100" : ""
              }`}
            >
              {ip}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Chat window for the selected IP */}
      <div className="chat-window flex-1 p-4 flex flex-col">
        {selectedIp ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Chat with IP: {selectedIp}
            </h2>
            <div className="messages flex-1 h-80 overflow-y-auto border p-4 mb-4">
              {chatHistory.map((entry, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    entry.type === "admin" ? "text-right" : "text-left"
                  }`}
                >
                  <p
                    className={`inline-block px-4 py-2 rounded-lg ${
                      entry.type === "admin"
                        ? "bg-blue-500 text-white"
                        : entry.type === "bot"
                        ? "bg-green-200 text-black"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {entry.message}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded"
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
              />
              <button
                onClick={handleAdminSend}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            Please select an IP address to view chat
          </div>
        )}
      </div>
    </div>
  );
};
