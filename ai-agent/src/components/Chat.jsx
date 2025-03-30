import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatMain from "./ChatMain";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);

  const handleSelectChat = (id) => {
    setActiveChat(id);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="border border-neutral-300 rounded-3xl my-10 h-[700px] mx-16 min-w-[1000px] w-full flex overflow-hidden">
        {/* Left Side Chat History And Create Chat */}
        <ChatSidebar 
          activeChat={activeChat} 
          onSelectChat={handleSelectChat} 
        />
        
        {/* Right Side Messages and send message */}
        <ChatMain 
          activeChat={activeChat} 
        />
      </div>
    </div>
  );
};

export default Chat;