import React, { useEffect, useState } from "react";
import { Smile, Paperclip, Mic } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateLastMessage } from "../redux/slices/conversationSlice";

const ChatMain = ({ activeChat }) => {
  // Placeholder data for the active chat
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  
  const [chatTitle, setChatTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchMessages();
  }, [activeChat]);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/v1/chats/${activeChat}`
      );
      if (response.data.status === "success") {
        setMessages(response.data.messages);
        setChatTitle(response.data.chat.title);
      }
    } catch (error) {
      console.error(`Error fetching messages for chat id ${activeChat}`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const content = newMessage.trim();
    if (!content || !activeChat || isLoading) return;

    try {
      setIsLoading(true);

      const response = await axios.post(
        `http://localhost:3000/api/v1/messages/create/${activeChat}`,
        { content }
      );

      if (response.data.status === "success") {
        setMessages((prev) => [
          ...prev,
          response.data.userMessage,
          response.data.aiMessage,
        ]);

        dispatch(
          updateLastMessage({
            chatId: activeChat,
            lastMessage: response.data.userMessage.content,
            lastMessageTime: response.data.userMessage.messageTime,
          })
        );
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-2/3 bg-white flex flex-col">
      {activeChat ? (
        <>
          {/* Chat header */}
          <div className="border-b border-neutral-300 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-white mr-3">
                {chatTitle.charAt(0)}
              </div>
              <div>
                <p className="font-urbanist font-medium">{chatTitle}</p>
                <p className="text-xs text-green-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  {"Active Now"}
                </p>
              </div>
            </div>
            <div>
              <button className="text-gray-500 hover:text-gray-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-grow p-6 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`mb-6 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-white mr-2">
                    {chatTitle.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col max-w-[70%]">
                  <div
                    className={`p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-stone-900 text-white rounded-tr-none"
                        : "bg-gray-100 text-black rounded-tl-none"
                    }`}
                  >
                    {message.content}
                  </div>
                  <div
                    className={`flex items-center text-xs text-gray-500 mt-1 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.messageTime}
                    {message.sender === "user" && message.read && (
                      <svg
                        className="w-4 h-4 ml-1 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white ml-2">
                    T
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="border-t border-neutral-300 p-4">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 mr-2"
              >
                {/* <Smile size={20} /> */}
              </button>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 mr-2"
              >
                {/* <Paperclip size={20} /> */}
              </button>
              <input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow py-2 px-4 border border-neutral-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
                disabled={isLoading}
              />
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 ml-2"
                disabled={isLoading || !newMessage.trim()}
              >
                {/* <Mic size={20} /> */}
              </button>
              <button
                type="submit"
                className="ml-2 bg-stone-900 text-white p-2 rounded-full hover:bg-stone-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M12 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        </>
      ) : (
        // Empty state when no chat is selected
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a conversation or create a new one
        </div>
      )}
    </div>
  );
};

export default ChatMain;
