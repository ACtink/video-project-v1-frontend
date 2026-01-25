import { ArrowLeft } from "lucide-react";
import { useContext, useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { websocketContext } from "../../context/WebSocket";
import { useAuth } from "../../hooks/useAuth";

import { getChatMessages } from "../../utils/getMessages";
import { saveMessage } from "../../utils/saveMessage";

function ChatBox({ chat, onBack }) {
  const { user } = useAuth(); // ✅ current logged-in user
  const { sendSignal, messages, setMessages } = useContext(websocketContext);


  console.log("ChatBox render:", { chat, user });

  const [text, setText] = useState("");

  const myUserId = user._id;

  /* ======================================================
     FILTER MESSAGES FOR THIS CHAT
  ====================================================== */
  const chatMessages = useMemo(() => {
    return messages.filter(
      (m) =>
        (m.from === myUserId && m.to === chat._id) ||
        (m.from === chat._id && m.to === myUserId)
    );
  }, [messages, chat._id, myUserId]);

  /* ======================================================
     SEND MESSAGE
  ====================================================== */
  const handleSend = async() => {
    if (!text.trim()) return;

    const messageId = uuidv4();
    const createdAt = Date.now();

    // 1️⃣ Optimistic UI update
    setMessages((prev) => [
      ...prev,
      {
        messageId,
        from: myUserId,
        to: chat._id,
        text,
        status: "sending",
        createdAt,
      },
    ]);


         saveMessage({        
          type: "chat_message",
          message: {
            messageId,
            from: myUserId,
            to: chat._id,
            text,
            createdAt,
          },
        })  
      

    // 2️⃣ Send via WebSocket
    sendSignal({
      type: "chat_message",
      messageId,
      to: chat._id,
      text,
      createdAt,
    });

    setText("");
  };


  useEffect(() => {
    if (!chat?._id) return;

    const loadFromIndexedDB = async () => {
      const cachedMessages = await getChatMessages(myUserId, chat._id);

      console.log("Loaded messages from IndexedDB:", cachedMessages);

      setMessages((prev) => {
        const existingIds = new Set(prev.map((m) => m.messageId));
        const newOnes = cachedMessages.filter(
          (m) => !existingIds.has(m.messageId),
        );
        return [...prev, ...newOnes];
      });
    };

    loadFromIndexedDB();
  }, [chat._id, myUserId, setMessages]);


  useEffect(() => {
    if (!chat?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/chat/messages/${chat._id}`,
          {
            credentials: "include", // IMPORTANT (cookies)
          }
        );

        const data = await res.json();

        // Convert backend → frontend shape
        const fetchedMessages = data.map((msg) => ({
          messageId: msg._id,
          from: msg.senderId,
          to: msg.receiverId,
          text: msg.text,
          status: msg.status || "sent",
          createdAt: new Date(msg.createdAt).getTime(),
        }));

        // Merge without duplicates
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.messageId));
          const newOnes = fetchedMessages.filter(
            (m) => !existingIds.has(m.messageId)
          );
          return [...prev, ...newOnes];
        });
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();
  }, [chat._id, setMessages]);


  return (
    <>
      {/* HEADER */}
      <div className="px-4 py-4 border-b border-white/20 flex items-center gap-3 text-white">
        <button
          onClick={onBack}
          className="sm:hidden p-2 rounded-lg hover:bg-white/20 transition"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0">
          {chat.profilePicture ? (
            <img
              src={chat.profilePicture}
              alt={chat.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold">
              {chat.username?.[0]?.toUpperCase() || "U"}
            </span>
          )}
        </div>

        {/* Username */}
        <h3 className="font-semibold text-lg">{chat.username}</h3>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {chatMessages.length === 0 && (
          <div className="text-center text-white/60 text-sm">
            Start a conversation with {chat.username}
          </div>
        )}

        {chatMessages.map((msg) => {
          const isMe = msg.from === myUserId;

          return (
            <div
              key={msg.messageId}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm text-white
                  ${isMe ? "bg-indigo-600" : "bg-white/20"}
                `}
              >
                <p>{msg.text}</p>

                {isMe && (
                  <div className="mt-1 flex justify-end">
                    <div className="flex items-center gap-[1px]">
                      {/* First tick */}
                      <svg
                        className={`
                            w-2.5 h-2.5 sm:w-3 sm:h-3
                            ${msg.status === "delivered" ? "text-blue-400" : "text-white/60"}
                          `}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.2l-3.5-3.5L4 14.2l5 5L20 8.2l-1.4-1.4z" />
                      </svg>

                      {/* Second tick (only for delivered) */}
                      {msg.status === "sent" && (
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-400 -ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.2l-3.5-3.5L4 14.2l5 5L20 8.2l-1.4-1.4z" />
                        </svg>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <div className="px-4 py-4 border-t border-white/20">
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
