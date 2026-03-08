// import { ArrowLeft } from "lucide-react";
// import { useContext, useState, useMemo, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";

// import { getChatMessages } from "../../utils/getMessages";
// import { saveMessage } from "../../utils/saveMessage";
// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";

// const normalizeMessageId = (m) => m.messageId;

// function ChatBox({ chat, onBack }) {
//   const { user } = useAuth();

//   const { sendSignal, messages, setMessages } = useContext(websocketContext);

//   const [text, setText] = useState("");

//   const myUserId = user._id;

//   // console.log("user from auth", user);

//   // ✅ FIX: Always use string
//   const conversationId = chat._id.toString();

//   // ✅ Safe find
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   // ✅ Guard (prevents crash)
//   if (!otherUser) return null;

//   const receiverId = otherUser._id;

//   const handleSend = async () => {
//     if (!text.trim()) return;

//     const messageId = uuidv4();

//     const createdAt = Date.now();

//     setMessages((prev) => {
//       const existing = prev[conversationId] || [];

//       return {
//         ...prev,

//         [conversationId]: [
//           ...existing,

//           {
//             messageId,
//             conversationId,
//             from: myUserId,
//             to: receiverId,
//             text,
//             status: "sending",
//             createdAt,
//           },
//         ],
//       };
//     });

//     sendSignal({
//       type: "chat_message",
//       messageId,
//       conversationId,
//       to: receiverId,
//       text,
//       createdAt,
//     });

//     setText("");
//   };

//   useEffect(() => {
//     if (!conversationId) return;

//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });

//         const data = await res.json();

//         console.log("Fetched messages from backend:", data);

//         // ✅ VERY IMPORTANT: ensure it's array
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];

//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,

//           // ✅ ALWAYS use current conversationId (simple and safe)
//           conversationId: conversationId,

//           from: msg.senderId,

//           to: msg.receiverId,

//           text: msg.text,

//           status: msg.status || "sent",

//           createdAt: new Date(msg.createdAt).getTime(),
//         }));

//         // ✅ simple merge (no duplicates)
//         setMessages((prev) => {
//           const existing = prev[conversationId] || [];

//           const ids = new Set(existing.map((m) => m.messageId));

//           const newMessages = formatted.filter((m) => !ids.has(m.messageId));

//           return {
//             ...prev,

//             [conversationId]: [...existing, ...newMessages],
//           };
//         });
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       }
//     };

//     fetchMessages();
//   }, [conversationId]);

//   /* ===============================
//      UI
//   =============================== */

//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* HEADER */}

//       <div className="px-4 py-4 border-b border-white/20 flex items-center gap-3 text-white">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-lg hover:bg-white/20 transition"
//         >
//           <ArrowLeft size={20} />
//         </button>

//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0">
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>

//         <h3 className="font-semibold text-lg">{otherUser.username}</h3>
//       </div>

//       {/* MESSAGES */}

//       <div className="flex-1 w-screen sm:w-full overflow-y-auto px-4 py-4 space-y-3">
//         {(!messages[conversationId] ||
//           messages[conversationId].length === 0) && (
//           <div className="text-center text-white/60 text-sm">
//             Start a conversation with {otherUser.username}
//           </div>
//         )}

//         {(messages[conversationId] || []).map((msg) => {
//           const isMe = msg.from === myUserId;

//           return (
//             <MessageBubble
//               key={msg.messageId}
//               msg={msg}
//               isMe={isMe}
//               otherUser={otherUser}
//               user={user}
//             />
//           );
//         })}
//       </div>

//       {/* INPUT */}

//       <div className="px-4 py-4 border-t border-white/20 mb-5">
//         <div className="flex gap-3">
//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             placeholder="Type a message..."
//             className="flex-1 px-4 py-3 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <button
//             onClick={handleSend}
//             className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatBox;

// import { ArrowLeft } from "lucide-react";
// import { useContext, useState, useMemo, useEffect, useRef } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";

// import { getChatMessages } from "../../utils/getMessages";
// import { saveMessage } from "../../utils/saveMessage";
// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";

// const normalizeMessageId = (m) => m.messageId;

// function ChatBox({ chat, onBack }) {
//   const { user } = useAuth();

//   const { sendSignal, messages, setMessages } = useContext(websocketContext);

//   const [text, setText] = useState("");

//   const messagesRef = useRef(null);
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const myUserId = user._id;

//   const conversationId = chat._id.toString();

//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const receiverId = otherUser._id;

//   const handleSend = async () => {
//     if (!text.trim()) return;

//     const messageId = uuidv4();

//     const createdAt = Date.now();

//     setMessages((prev) => {
//       const existing = prev[conversationId] || [];

//       return {
//         ...prev,

//         [conversationId]: [
//           ...existing,

//           {
//             messageId,
//             conversationId,
//             from: myUserId,
//             to: receiverId,
//             text,
//             status: "sending",
//             createdAt,
//           },
//         ],
//       };
//     });

//     sendSignal({
//       type: "chat_message",
//       messageId,
//       conversationId,
//       to: receiverId,
//       text,
//       createdAt,
//     });

//     setText("");
//   };

//   const loadOlderMessages = async () => {
//     if (!cursor || loadingMore) return;

//     setLoadingMore(true);

//     try {
//       const res = await fetchData(
//         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
//         { credentials: "include" },
//       );

//       const data = await res.json();

//       const messagesArray = Array.isArray(data) ? data : data.messages || [];

//       const formatted = messagesArray.map((msg) => ({
//         messageId: msg.messageId,
//         conversationId,
//         from: msg.senderId,
//         to: msg.receiverId,
//         text: msg.text,
//         status: msg.status || "sent",
//         createdAt: new Date(msg.createdAt).getTime(),
//       }));

//       setMessages((prev) => {
//         const existing = prev[conversationId] || [];

//         const ids = new Set(existing.map((m) => m.messageId));

//         const newMessages = formatted.filter((m) => !ids.has(m.messageId));

//         return {
//           ...prev,
//           [conversationId]: [...newMessages, ...existing],
//         };
//       });

//       if (messagesArray.length > 0) {
//         setCursor(messagesArray[0].createdAt);
//       }
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }

//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     if (!conversationId) return;

//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });

//         const data = await res.json();

//         const messagesArray = Array.isArray(data) ? data : data.messages || [];

//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId: conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));

//         if (messagesArray.length > 0) {
//           setCursor(messagesArray[0].createdAt);
//         }

//         setMessages((prev) => {
//           const existing = prev[conversationId] || [];

//           const ids = new Set(existing.map((m) => m.messageId));

//           const newMessages = formatted.filter((m) => !ids.has(m.messageId));

//           return {
//             ...prev,
//             [conversationId]: [...existing, ...newMessages],
//           };
//         });
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       }
//     };

//     fetchMessages();
//   }, [conversationId]);

//   useEffect(() => {
//     const el = messagesRef.current;

//     if (!el) return;

//     const handleScroll = () => {
//       if (el.scrollTop === 0) {
//         loadOlderMessages();
//       }
//     };

//     el.addEventListener("scroll", handleScroll);

//     return () => {
//       el.removeEventListener("scroll", handleScroll);
//     };
//   }, [cursor]);

//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* HEADER */}

//       <div className="px-4 py-4 border-b border-white/20 flex items-center gap-3 text-white">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-lg hover:bg-white/20 transition"
//         >
//           <ArrowLeft size={20} />
//         </button>

//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0">
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>

//         <h3 className="font-semibold text-lg">{otherUser.username}</h3>
//       </div>

//       {/* MESSAGES */}

//       <div
//         ref={messagesRef}
//         className="flex-1 w-screen sm:w-full overflow-y-auto px-4 py-4 space-y-3"
//       >
//         {(!messages[conversationId] ||
//           messages[conversationId].length === 0) && (
//           <div className="text-center text-white/60 text-sm">
//             Start a conversation with {otherUser.username}
//           </div>
//         )}

//         {(messages[conversationId] || []).map((msg) => {
//           const isMe = msg.from === myUserId;

//           return (
//             <MessageBubble
//               key={msg.messageId}
//               msg={msg}
//               isMe={isMe}
//               otherUser={otherUser}
//               user={user}
//             />
//           );
//         })}
//       </div>

//       {/* INPUT */}

//       <div className="px-4 py-4 border-t border-white/20 mb-5">
//         <div className="flex gap-3">
//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             placeholder="Type a message..."
//             className="flex-1 px-4 py-3 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <button
//             onClick={handleSend}
//             className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatBox;

import { ArrowLeft } from "lucide-react";
import { useContext, useState, useMemo, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { websocketContext } from "../../context/WebSocket";
import { useAuth } from "../../hooks/useAuth";

import { getChatMessages } from "../../utils/getMessages";
import { saveMessage } from "../../utils/saveMessage";
import fetchData from "../../utils/fetchData";
import MessageBubble from "../MessageBubble";

const normalizeMessageId = (m) => m.messageId;

function ChatBox({ chat, onBack }) {
  const { user } = useAuth();

  const { sendSignal, messages, setMessages } = useContext(websocketContext);

  const [text, setText] = useState("");

  const [cursor, setCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const myUserId = user._id;

const messagesContainerRef = useRef(null);
const shouldAutoScrollRef = useRef(true);
  const conversationId = chat._id.toString();

  const otherUser = chat.participants?.find((p) => p._id !== myUserId);

  if (!otherUser) return null;

  const receiverId = otherUser._id;

  const [hasMore, setHasMore] = useState(true);

  const handleSend = async () => {
    if (!text.trim()) return;

    const messageId = uuidv4();
    const createdAt = Date.now();

    setMessages((prev) => {
      const existing = prev[conversationId] || [];

      return {
        ...prev,
        [conversationId]: [
          ...existing,
          {
            messageId,
            conversationId,
            from: myUserId,
            to: receiverId,
            text,
            status: "sending",
            createdAt,
          },
        ],
      };
    });

    sendSignal({
      type: "chat_message",
      messageId,
      conversationId,
      to: receiverId,
      text,
      createdAt,
    });

    setText("");
  };

  const loadOlderMessages = async () => {
    if (!cursor || loadingMore) return;

    setLoadingMore(true);

    try {
      const res = await fetchData(
        `/api/chat/messages/${conversationId}?cursor=${cursor}`,
        { credentials: "include" },
      );

      const data = await res.json();

      const messagesArray = Array.isArray(data) ? data : data.messages || [];

      if (messagesArray.length < 50) {
        setHasMore(false);
      }

      const formatted = messagesArray.map((msg) => ({
        messageId: msg.messageId,
        conversationId,
        from: msg.senderId,
        to: msg.receiverId,
        text: msg.text,
        status: msg.status || "sent",
        createdAt: new Date(msg.createdAt).getTime(),
      }));

      setMessages((prev) => {
        const existing = prev[conversationId] || [];

        const ids = new Set(existing.map((m) => m.messageId));

        const newMessages = formatted.filter((m) => !ids.has(m.messageId));

        return {
          ...prev,
          [conversationId]: [...newMessages, ...existing],
        };
      });

      if (messagesArray.length > 0) {
        setCursor(messagesArray[0].createdAt);
      }
    } catch (err) {
      console.error("Failed loading older messages", err);
    }

    setLoadingMore(false);
  };


  useEffect(() => {
  const el = messagesContainerRef.current;
  if (!el) return;

  const handleScroll = () => {
    const threshold = 150;

    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    shouldAutoScrollRef.current = isNearBottom;
  };

  el.addEventListener("scroll", handleScroll);

  return () => el.removeEventListener("scroll", handleScroll);
}, []);

  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetchData(`/api/chat/messages/${conversationId}`, {
          credentials: "include",
        });

        const data = await res.json();

        const messagesArray = Array.isArray(data) ? data : data.messages || [];

        if (messagesArray.length < 50) {
          setHasMore(false);
        }

        const formatted = messagesArray.map((msg) => ({
          messageId: msg.messageId,
          conversationId,
          from: msg.senderId,
          to: msg.receiverId,
          text: msg.text,
          status: msg.status || "sent",
          createdAt: new Date(msg.createdAt).getTime(),
        }));

        if (messagesArray.length > 0) {
          setCursor(messagesArray[0].createdAt);
        }

        setMessages((prev) => {
          const existing = prev[conversationId] || [];

          const ids = new Set(existing.map((m) => m.messageId));

          const newMessages = formatted.filter((m) => !ids.has(m.messageId));

          return {
            ...prev,
            [conversationId]: [...existing, ...newMessages],
          };
        });
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    const el = messagesContainerRef.current;

    if (!el) return;

    if (shouldAutoScrollRef.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages[conversationId]]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* HEADER */}

      <div className="px-4 py-4 border-b border-white/20 flex items-center gap-3 text-white">
        <button
          onClick={onBack}
          className="sm:hidden p-2 rounded-lg hover:bg-white/20 transition"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="w-4 h-4 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0">
          {otherUser.profilePicture ? (
            <img
              src={otherUser.profilePicture}
              alt={otherUser.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold">
              {otherUser.username?.[0]?.toUpperCase()}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-lg">{otherUser.username}</h3>
      </div>

      {/* MESSAGES */}

      <div
        ref={messagesContainerRef}
        className="flex-1 w-screen sm:w-full overflow-y-auto px-4 py-4 space-y-3"
      >
        {hasMore &&
          messages[conversationId] &&
          messages[conversationId].length > 0 && (
            <div className="flex justify-center mb-2">
              <button
                onClick={loadOlderMessages}
                className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
              >
                {loadingMore ? "Loading..." : "Load older messages"}
              </button>
            </div>
          )}
        {(!messages[conversationId] ||
          messages[conversationId].length === 0) && (
          <div className="text-center text-white/60 text-sm">
            Start a conversation with {otherUser.username}
          </div>
        )}
        {(messages[conversationId] || []).map((msg) => {
          const isMe = msg.from === myUserId;

          return (
            <MessageBubble
              key={msg.messageId}
              msg={msg}
              isMe={isMe}
              otherUser={otherUser}
              user={user}
            />
          );
        })}
      </div>

      {/* INPUT */}

      <div className="px-4 py-4 border-t border-white/20 mb-5">
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
    </div>
  );
}

export default ChatBox;