import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateLastMessage } from "../../redux/slices/conversationSlice";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";

const ChatMain = ({ activeChat }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [chatTitle, setChatTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    activeChat && fetchMessages();
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
          <ChatHeader chatTitle={chatTitle} />
          <ChatMessages messages={messages} chatTitle={chatTitle} />
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            activeChat={activeChat}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a conversation or create a new one
        </div>
      )}
    </div>
  );
};

export default ChatMain;
