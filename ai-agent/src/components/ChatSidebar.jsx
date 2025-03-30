import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setConversations, addConversation } from "../redux/slices/conversationSlice";
import ChatItem from "./ChatItem";
import CreateChatModal from "./CreateChatModal";

const ChatSidebar = ({ activeChat, onSelectChat }) => {
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.conversation);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchChats();
    return () => {
      dispatch(setConversations([]));
    };
  }, []);

  const fetchChats = async (search = "") => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/chats", {
        params: { search },
      });
      if (response.data.status === "success") {
        dispatch(setConversations(response.data.chats));
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchChats(query);
  };

  const handleNewChat = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const createChat = async (title) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/chats/create",
        { title }
      );

      if (response.data.status === "success") {
        dispatch(addConversation(response.data.chat));
        closeModal();
        onSelectChat(response.data.chat._id);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("Failed to create chat. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/3 border-r border-neutral-300 flex flex-col h-full">
      <div className="p-4 border-b border-neutral-300 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search agent"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full py-2 pl-3 pr-10 border border-neutral-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
        <button
          onClick={handleNewChat}
          className="ml-2 text-stone-800 hover:text-stone-600"
        >
          <PlusCircle size={24} />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto">
        {isLoading && conversations.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Loading chats...</p>
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-gray-500">
            <p>No chats yet</p>
            <button
              onClick={handleNewChat}
              className="mt-2 text-stone-800 hover:text-stone-600 flex items-center"
            >
              <PlusCircle size={18} className="mr-1" />
              <span>Create your first chat</span>
            </button>
          </div>
        ) : (
          conversations.map((chat) => (
            <ChatItem
              key={chat._id}
              title={chat.title}
              lastMessage={chat.lastMessage}
              lastMessageTime={chat.lastMessageTime}
              isActive={activeChat === chat._id}
              onClick={() => onSelectChat(chat._id)}
            />
          ))
        )}
      </div>

      <CreateChatModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={createChat}
      />
    </div>
  );
};

export default ChatSidebar;