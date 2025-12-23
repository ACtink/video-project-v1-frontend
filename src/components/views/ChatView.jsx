import { useState } from "react";
import { MessageCircle, ArrowLeft } from "lucide-react";
import ChatBox from "./ChatBox";

const mockChats = [
  { id: 1, username: "alex", lastMessage: "Hey!" },
  { id: 2, username: "maria", lastMessage: "See you later" },
  { id: 3, username: "john", lastMessage: "Hello" },
];

function ChatView() {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="w-full h-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden flex">
      {/* CHAT LIST */}
      <div
        className={`
          w-full sm:w-72
          ${activeChat ? "hidden sm:block" : "block"}
          border-r border-white/20 bg-white/10
        `}
      >
        <div className="px-4 py-4 border-b border-white/20">
          <h2 className="text-white font-semibold text-lg">Chats</h2>
          <p className="text-white/60 text-sm">Your conversations</p>
        </div>

        <div className="overflow-y-auto">
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className="w-full text-left px-4 py-3 hover:bg-white/20 transition"
            >
              <p className="text-white font-medium">{chat.username}</p>
              <p className="text-white/60 text-sm truncate">
                {chat.lastMessage}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* CHAT PANEL */}
      <div
        className={`
          flex-1
          ${activeChat ? "block" : "hidden sm:flex"}
          flex flex-col
        `}
      >
        {!activeChat ? (
          <div className="flex-1 flex flex-col items-center justify-center text-white/70 text-center">
            <MessageCircle size={48} className="mb-4 opacity-60" />
            <p className="text-lg font-medium">
              Select a chat to start messaging
            </p>
          </div>
        ) : (
          <ChatBox chat={activeChat} onBack={() => setActiveChat(null)} />
        )}
      </div>
    </div>
  );
}

export default ChatView;
