import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatBox from "./ChatBox";

function ChatView() {
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/chat/contacts", {
          credentials: "include",
        });

        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error("Failed to load chats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden flex">
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
          {loading && (
            <p className="p-4 text-white/60 text-sm">Loading chats…</p>
          )}

          {!loading && chats.length === 0 && (
            <p className="p-4 text-white/60 text-sm">No chats available</p>
          )}

          {!loading &&
            chats.map((chat) => (
              <button
                key={chat._id}
                onClick={() => setActiveChat(chat)}
                className="w-full text-left px-4 py-3 hover:bg-white/20 transition"
              >
                <p className="text-white font-medium">{chat.username}</p>
                <p className="text-white/60 text-sm truncate">
                  Start Chatting
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
