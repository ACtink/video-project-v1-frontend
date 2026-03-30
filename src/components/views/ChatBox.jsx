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

//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const myUserId = user._id;

// const messagesContainerRef = useRef(null);
// const shouldAutoScrollRef = useRef(true);
//   const conversationId = chat._id.toString();

//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const receiverId = otherUser._id;

//   const [hasMore, setHasMore] = useState(true);

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

//       if (messagesArray.length < 50) {
//         setHasMore(false);
//       }

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
//   const el = messagesContainerRef.current;
//   if (!el) return;

//   const handleScroll = () => {
//     const threshold = 150;

//     const isNearBottom =
//       el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

//     shouldAutoScrollRef.current = isNearBottom;
//   };

//   el.addEventListener("scroll", handleScroll);

//   return () => el.removeEventListener("scroll", handleScroll);
// }, []);

//   useEffect(() => {
//     if (!conversationId) return;

//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });

//         const data = await res.json();

//         const messagesArray = Array.isArray(data) ? data : data.messages || [];

//         if (messagesArray.length < 50) {
//           setHasMore(false);
//         }

//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
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
//     const el = messagesContainerRef.current;

//     if (!el) return;

//     if (shouldAutoScrollRef.current) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages[conversationId]]);

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

//         <div className="w-4 h-4 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0">
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
//         ref={messagesContainerRef}
//         className="flex-1 w-screen sm:w-full overflow-y-auto px-4 py-4 space-y-3"
//       >
//         {hasMore &&
//           messages[conversationId] &&
//           messages[conversationId].length > 0 && (
//             <div className="flex justify-center mb-2">
//               <button
//                 onClick={loadOlderMessages}
//                 className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
//               >
//                 {loadingMore ? "Loading..." : "Load older messages"}
//               </button>
//             </div>
//           )}
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

// import { ArrowLeft, Send } from "lucide-react";
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
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const myUserId = user._id;
//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const conversationId = chat._id.toString();
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const receiverId = otherUser._id;
//   const [hasMore, setHasMore] = useState(true);

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

//     // reset textarea height after send
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
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
//       if (messagesArray.length < 50) setHasMore(false);
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
//       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const handleScroll = () => {
//       const threshold = 150;
//       const isNearBottom =
//         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//       shouldAutoScrollRef.current = isNearBottom;
//     };
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];
//         if (messagesArray.length < 50) setHasMore(false);
//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
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
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (shouldAutoScrollRef.current) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages[conversationId]]);

//   return (
//     <div
//       className="flex flex-col w-full"
//       style={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}
//     >
//       {/* HEADER */}
//       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//         >
//           <ArrowLeft size={18} />
//         </button>

//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>

//         <h3 className="font-semibold text-sm text-white truncate">
//           {otherUser.username}
//         </h3>
//       </div>

//       {/* MESSAGES */}
//       <div
//         ref={messagesContainerRef}
//         className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//         style={{
//           overscrollBehavior: "contain",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {hasMore &&
//           messages[conversationId] &&
//           messages[conversationId].length > 0 && (
//             <div className="flex justify-center mb-2">
//               <button
//                 onClick={loadOlderMessages}
//                 className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
//               >
//                 {loadingMore ? "Loading..." : "Load older messages"}
//               </button>
//             </div>
//           )}

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
//       {/* INPUT */}
//       {/* INPUT */}
//       <div
//         className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm"
//         style={{
//           paddingBottom: "calc(72px + env(safe-area-inset-bottom, 0px))",
//         }}
//       >
//         <div className="flex items-end gap-2">
//           <textarea
//             ref={textareaRef}
//             rows={1}
//             value={text}
//             onChange={(e) => {
//               setText(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height =
//                 Math.min(e.target.scrollHeight, 112) + "px";
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             placeholder="Type a message..."
//             className="
//               flex-1 resize-none overflow-y-auto
//               px-4 py-3
//               rounded-2xl
//               bg-white/10 text-white text-sm
//               placeholder-white/30
//               focus:outline-none focus:ring-1 focus:ring-white/20
//               leading-relaxed
//               min-h-[44px]
//             "
//             style={{ maxHeight: "112px" }}
//           />

//           <button
//             onClick={handleSend}
//             disabled={!text.trim()}
//             className="
//               flex-shrink-0 w-11 h-11 mb-0.5
//               rounded-full
//               bg-indigo-600 hover:bg-indigo-500
//               flex items-center justify-center
//               transition active:scale-90
//               disabled:opacity-30 disabled:cursor-not-allowed
//             "
//           >
//             <Send size={16} className="text-white ml-0.5" />
//           </button>
//         </div>
//         <p className="text-[10px] text-white/20 mt-1.5 pl-1">
//           Enter to send · Shift+Enter for new line
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ChatBox;

// import { ArrowLeft, Send } from "lucide-react";
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
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const myUserId = user._id;
//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const conversationId = chat._id.toString();
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const receiverId = otherUser._id;
//   const [hasMore, setHasMore] = useState(true);

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
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
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
//       if (messagesArray.length < 50) setHasMore(false);
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
//       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const handleScroll = () => {
//       const threshold = 150;
//       const isNearBottom =
//         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//       shouldAutoScrollRef.current = isNearBottom;
//     };
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];
//         if (messagesArray.length < 50) setHasMore(false);
//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
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
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (shouldAutoScrollRef.current) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages[conversationId]]);

//   return (
//     <div
//       className="flex flex-col w-full"
//       style={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}
//     >
//       {/* HEADER */}
//       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//         >
//           <ArrowLeft size={18} />
//         </button>

//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>

//         <h3 className="font-semibold text-sm text-white truncate">
//           {otherUser.username}
//         </h3>
//       </div>

//       {/* MESSAGES */}
//       <div
//         ref={messagesContainerRef}
//         className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//         style={{
//           overscrollBehavior: "contain",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {hasMore &&
//           messages[conversationId] &&
//           messages[conversationId].length > 0 && (
//             <div className="flex justify-center mb-2">
//               <button
//                 onClick={loadOlderMessages}
//                 className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
//               >
//                 {loadingMore ? "Loading..." : "Load older messages"}
//               </button>
//             </div>
//           )}

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

//         {/* ── FOOTER SPACER — keeps last message above the fixed footer ── */}
//         <div
//           style={{ height: "calc(72px + env(safe-area-inset-bottom, 0px))" }}
//         />
//       </div>

//       {/* INPUT */}
//       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm">
//         <div className="flex items-end gap-2">
//           <textarea
//             ref={textareaRef}
//             rows={1}
//             value={text}
//             onChange={(e) => {
//               setText(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height =
//                 Math.min(e.target.scrollHeight, 112) + "px";
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             placeholder="Type a message..."
//             className="
//               flex-1 resize-none overflow-y-auto
//               px-4 py-3
//               rounded-2xl
//               bg-white/10 text-white text-sm
//               placeholder-white/30
//               focus:outline-none focus:ring-1 focus:ring-white/20
//               leading-relaxed
//               min-h-[44px]
//             "
//             style={{ maxHeight: "112px" }}
//           />

//           <button
//             onClick={handleSend}
//             disabled={!text.trim()}
//             className="
//               flex-shrink-0 w-11 h-11 mb-0.5
//               rounded-full
//               bg-indigo-600 hover:bg-indigo-500
//               flex items-center justify-center
//               transition active:scale-90
//               disabled:opacity-30 disabled:cursor-not-allowed
//             "
//           >
//             <Send size={16} className="text-white ml-0.5" />
//           </button>
//         </div>
//         <p className="text-[10px] text-white/20 mt-1.5 pl-1">
//           Enter to send · Shift+Enter for new line
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ChatBox;

// import { ArrowLeft, Send } from "lucide-react";
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
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const myUserId = user._id;
//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const conversationId = chat._id.toString();
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const receiverId = otherUser._id;
//   const [hasMore, setHasMore] = useState(true);

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
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
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
//       if (messagesArray.length < 50) setHasMore(false);
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
//       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const handleScroll = () => {
//       const threshold = 150;
//       const isNearBottom =
//         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//       shouldAutoScrollRef.current = isNearBottom;
//     };
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];
//         if (messagesArray.length < 50) setHasMore(false);
//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
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
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (shouldAutoScrollRef.current) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages[conversationId]]);

//   return (
//     <div
//       className="flex flex-col w-full"
//       style={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}
//     >
//       {/* HEADER */}
//       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//         >
//           <ArrowLeft size={18} />
//         </button>

//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>

//         <h3 className="font-semibold text-sm text-white truncate">
//           {otherUser.username}
//         </h3>
//       </div>

//       {/* MESSAGES */}
//       <div
//         ref={messagesContainerRef}
//         className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//         style={{
//           overscrollBehavior: "contain",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {hasMore &&
//           messages[conversationId] &&
//           messages[conversationId].length > 0 && (
//             <div className="flex justify-center mb-2">
//               <button
//                 onClick={loadOlderMessages}
//                 className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
//               >
//                 {loadingMore ? "Loading..." : "Load older messages"}
//               </button>
//             </div>
//           )}

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

//         {/* spacer so last message isn't hidden behind input bar */}
//         <div className="h-10" />
//       </div>

//       {/* INPUT */}
//       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm">
//         <div className="flex items-end gap-2">
//           <textarea
//             ref={textareaRef}
//             rows={1}
//             value={text}
//             onChange={(e) => {
//               setText(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height =
//                 Math.min(e.target.scrollHeight, 112) + "px";
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             placeholder="Type a message..."
//             className="
//               flex-1 resize-none overflow-y-auto
//               px-4 py-3
//               rounded-2xl
//               bg-white/10 text-white text-sm
//               placeholder-white/30
//               focus:outline-none focus:ring-1 focus:ring-white/20
//               leading-relaxed
//               min-h-[44px]
//             "
//             style={{ maxHeight: "112px" }}
//           />

//           <button
//             onClick={handleSend}
//             disabled={!text.trim()}
//             className="
//               flex-shrink-0 w-11 h-11 mb-0.5
//               rounded-full
//               bg-indigo-600 hover:bg-indigo-500
//               flex items-center justify-center
//               transition active:scale-90
//               disabled:opacity-30 disabled:cursor-not-allowed
//             "
//           >
//             <Send size={16} className="text-white ml-0.5" />
//           </button>
//         </div>
//         <p className="text-[10px] text-white/20 mt-1.5 pl-1">
//           Enter to send · Shift+Enter for new line
//         </p>

//         {/* ── FOOTER SPACER — pushes input bar above fixed footer ── */}
//         <div
//           style={{ height: "calc(20vh + env(safe-area-inset-bottom, 0px))" }}
//         />
//       </div>
//     </div>
//   );
// }

// export default ChatBox;

// import { ArrowLeft, Send } from "lucide-react";
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
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [visible, setVisible] = useState(false); // ← fade trigger
//   const myUserId = user._id;
//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const conversationId = chat._id.toString();
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const receiverId = otherUser._id;
//   const [hasMore, setHasMore] = useState(true);

//   // ── reset on conversation change + trigger fade-in ──
// useEffect(() => {
//   setHasMore(true);
//   setCursor(null);
//   setVisible(false);
//   requestAnimationFrame(() => {
//     requestAnimationFrame(() => setVisible(true));
//   });
// }, [conversationId]);

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
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
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
//       if (messagesArray.length < 50) setHasMore(false);
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
//       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const handleScroll = () => {
//       const threshold = 150;
//       const isNearBottom =
//         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//       shouldAutoScrollRef.current = isNearBottom;
//     };
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];
//         if (messagesArray.length < 50) setHasMore(false);
//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
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
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (shouldAutoScrollRef.current) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages[conversationId]]);

//   return (
//     <div
//       className="flex flex-col w-full"
//       style={{
//         height: "100%",
//         maxHeight: "100%",
//         overflow: "hidden",
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0)" : "translateY(8px)",
//         transition: "opacity 0.25s ease, transform 0.25s ease",
//       }}
//     >
//       {/* HEADER */}
//       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//         >
//           <ArrowLeft size={18} />
//         </button>

//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>

//         <h3 className="font-semibold text-sm text-white truncate">
//           {otherUser.username}
//         </h3>
//       </div>

//       {/* MESSAGES */}
//       <div
//         ref={messagesContainerRef}
//         className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//         style={{
//           overscrollBehavior: "contain",
//           WebkitOverflowScrolling: "touch",
//           opacity: visible ? 1 : 0,
//           transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//         }}
//       >
//         {hasMore &&
//           messages[conversationId] &&
//           messages[conversationId].length > 0 && (
//             <div className="flex justify-center mb-2">
//               <button
//                 onClick={loadOlderMessages}
//                 className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
//               >
//                 {loadingMore ? "Loading..." : "Load older messages"}
//               </button>
//             </div>
//           )}

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

//         {/* spacer so last message isn't hidden behind input bar */}
//         <div className="h-10" />
//       </div>

//       {/* INPUT */}
//       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm">
//         <div className="flex items-end gap-2">
//           <textarea
//             ref={textareaRef}
//             rows={1}
//             value={text}
//             onChange={(e) => {
//               setText(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height =
//                 Math.min(e.target.scrollHeight, 112) + "px";
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             placeholder="Type a message..."
//             className="
//               flex-1 resize-none overflow-y-auto
//               px-4 py-3
//               rounded-2xl
//               bg-white/10 text-white text-sm
//               placeholder-white/30
//               focus:outline-none focus:ring-1 focus:ring-white/20
//               leading-relaxed
//               min-h-[44px]
//             "
//             style={{ maxHeight: "112px" }}
//           />

//           <button
//             onClick={handleSend}
//             disabled={!text.trim()}
//             className="
//               flex-shrink-0 w-11 h-11 mb-0.5
//               rounded-full
//               bg-indigo-600 hover:bg-indigo-500
//               flex items-center justify-center
//               transition active:scale-90
//               disabled:opacity-30 disabled:cursor-not-allowed
//             "
//           >
//             <Send size={16} className="text-white ml-0.5" />
//           </button>
//         </div>
//         <p className="text-[10px] text-white/20 mt-1.5 pl-1">
//           Enter to send · Shift+Enter for new line
//         </p>

//         {/* ── FOOTER SPACER ── */}
//         <div
//           style={{ height: "calc(20vh + env(safe-area-inset-bottom, 0px))" }}
//         />
//       </div>
//     </div>
//   );
// }

// export default ChatBox;

// import { ArrowLeft, Send } from "lucide-react";
// import { useContext, useState, useEffect, useRef } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";
// import { getChatMessages } from "../../utils/getMessages";
// import { saveMessage } from "../../utils/saveMessage";
// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";

// const normalizeMessageId = (m) => m.messageId;

// function MessageSkeleton() {
//   return (
//     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
//       {/* incoming */}
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       {/* outgoing */}
//       <div className="flex justify-end">
//         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       {/* incoming */}
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       {/* outgoing */}
//       <div className="flex justify-end">
//         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       {/* incoming */}
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       {/* outgoing */}
//       <div className="flex justify-end">
//         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       {/* incoming */}
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       {/* outgoing */}
//       <div className="flex justify-end">
//         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//     </div>
//   );
// }

// function ChatBox({ chat, onBack }) {
//   const { user } = useAuth();
//   const { sendSignal, messages, setMessages } = useContext(websocketContext);
//   const [text, setText] = useState("");
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [fetchingMessages, setFetchingMessages] = useState(true); // ← skeleton
//   const myUserId = user._id;
//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const conversationId = chat._id.toString();
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const isLoadingMoreRef = useRef(false); // ← add this ref

//   const receiverId = otherUser._id;
//   const [hasMore, setHasMore] = useState(true);

//   // reset on every conversation switch
//   useEffect(() => {
//     setHasMore(true);
//     setCursor(null);
//     setFetchingMessages(true);
//   }, [conversationId]);

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
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
//   };

//   const loadOlderMessages = async () => {
//     if (!cursor || loadingMore) return;
//     setLoadingMore(true);

//     const el = messagesContainerRef.current;
//     const scrollHeightBefore = el ? el.scrollHeight : 0;

//     try {
//       const res = await fetchData(
//         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
//         { credentials: "include" },
//       );
//       const data = await res.json();
//       const messagesArray = Array.isArray(data) ? data : data.messages || [];
//       if (messagesArray.length < 50) setHasMore(false);
//       const formatted = messagesArray.map((msg) => ({
//         messageId: msg.messageId,
//         conversationId,
//         from: msg.senderId,
//         to: msg.receiverId,
//         text: msg.text,
//         status: msg.status || "sent",
//         createdAt: new Date(msg.createdAt).getTime(),
//       }));

//       shouldAutoScrollRef.current = false; // ← block auto-scroll

//       setMessages((prev) => {
//         const existing = prev[conversationId] || [];
//         const ids = new Set(existing.map((m) => m.messageId));
//         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//         return { ...prev, [conversationId]: [...newMessages, ...existing] };
//       });

//       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);

//       setTimeout(() => {
//         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
//       }, 50);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }

//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const handleScroll = () => {
//       const threshold = 150;
//       const isNearBottom =
//         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//       shouldAutoScrollRef.current = isNearBottom;
//     };
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];
//         if (messagesArray.length < 50) setHasMore(false);
//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
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
//       } finally {
//         setFetchingMessages(false); // ← done loading
//       }
//     };
//     fetchMessages();
//   }, [conversationId]);

// useEffect(() => {
//   const el = messagesContainerRef.current;
//   if (!el) return;
//   if (shouldAutoScrollRef.current) {
//     el.scrollTop = el.scrollHeight;
//   }
// }, [messages[conversationId]]);

//   return (
//     <div
//       className="flex flex-col w-full"
//       style={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}
//     >
//       {/* HEADER */}
//       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//         >
//           <ArrowLeft size={18} />
//         </button>

//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>

//         <h3 className="font-semibold text-sm text-white truncate">
//           {otherUser.username}
//         </h3>
//       </div>

//       {/* MESSAGES — skeleton while fetching, real messages after */}
//       {fetchingMessages ? (
//         <div className="flex-1 overflow-hidden">
//           <MessageSkeleton />
//         </div>
//       ) : (
//         <div
//           ref={messagesContainerRef}
//           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//           style={{
//             overscrollBehavior: "contain",
//             WebkitOverflowScrolling: "touch",
//             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
//           }}
//         >
//           {hasMore &&
//             messages[conversationId] &&
//             messages[conversationId].length > 0 && (
//               <div className="flex justify-center mb-2">
//                 <button
//                   onClick={loadOlderMessages}
//                   className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
//                 >
//                   {loadingMore ? "Loading..." : "Load older messages"}
//                 </button>
//               </div>
//             )}

//           {(!messages[conversationId] ||
//             messages[conversationId].length === 0) && (
//             <div className="text-center text-white/60 text-sm">
//               Start a conversation with {otherUser.username}
//             </div>
//           )}

//           {(messages[conversationId] || []).map((msg) => {
//             const isMe = msg.from === myUserId;
//             return (
//               <MessageBubble
//                 key={msg.messageId}
//                 msg={msg}
//                 isMe={isMe}
//                 otherUser={otherUser}
//                 user={user}
//               />
//             );
//           })}

//           <div className="h-10" />
//         </div>
//       )}

//       {/* INPUT */}
//       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm">
//         <div className="flex items-end gap-2">
//           <textarea
//             ref={textareaRef}
//             rows={1}
//             value={text}
//             onChange={(e) => {
//               setText(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height =
//                 Math.min(e.target.scrollHeight, 112) + "px";
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             placeholder="Type a message..."
//             className="
//               flex-1 resize-none overflow-y-auto
//               px-4 py-3
//               rounded-2xl
//               bg-white/10 text-white text-sm
//               placeholder-white/30
//               focus:outline-none focus:ring-1 focus:ring-white/20
//               leading-relaxed
//               min-h-[44px]
//             "
//             style={{ maxHeight: "112px" }}
//           />

//           <button
//             onClick={handleSend}
//             disabled={!text.trim()}
//             className="
//               flex-shrink-0 w-11 h-11 mb-0.5
//               rounded-full
//               bg-indigo-600 hover:bg-indigo-500
//               flex items-center justify-center
//               transition active:scale-90
//               disabled:opacity-30 disabled:cursor-not-allowed
//             "
//           >
//             <Send size={16} className="text-white ml-0.5" />
//           </button>
//         </div>
//         <p className="text-[10px] text-white/20 mt-1.5 pl-1">
//           Enter to send · Shift+Enter for new line
//         </p>
//         <div
//           style={{ height: "calc(20vh + env(safe-area-inset-bottom, 0px))" }}
//         />
//       </div>

//       {/* keyframe for fade-in-up */}
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(10px); }
//           to   { opacity: 1; transform: translateY(0);    }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default ChatBox;

// import { ArrowLeft, Send, Smile } from "lucide-react";
// import { useContext, useState, useEffect, useRef } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";
// import { getChatMessages } from "../../utils/getMessages";
// import { saveMessage } from "../../utils/saveMessage";
// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";

// const normalizeMessageId = (m) => m.messageId;

// const EMOJI_LIST = [
//   "😀",
//   "😂",
//   "😍",
//   "🥰",
//   "😎",
//   "🤔",
//   "😭",
//   "😡",
//   "🥺",
//   "😴",
//   "👍",
//   "👎",
//   "❤️",
//   "🔥",
//   "✨",
//   "🎉",
//   "🙏",
//   "💯",
//   "😊",
//   "🤣",
//   "😘",
//   "🥳",
//   "😤",
//   "🤯",
//   "😇",
//   "🤗",
//   "😏",
//   "🙄",
//   "😬",
//   "🤝",
//   "👀",
//   "💀",
//   "🫡",
//   "🫠",
//   "🥹",
//   "😮",
//   "😱",
//   "🤌",
//   "💪",
//   "👏",
//   "🍕",
//   "🎮",
//   "🎵",
//   "⚡",
//   "🌙",
//   "☀️",
//   "🌈",
//   "💫",
//   "🚀",
//   "🎯",
// ];

// function MessageSkeleton() {
//   return (
//     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//     </div>
//   );
// }

// function ChatBox({ chat, onBack }) {
//   const { user } = useAuth();
//   const { sendSignal, messages, setMessages } = useContext(websocketContext);
//   const [text, setText] = useState("");
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [fetchingMessages, setFetchingMessages] = useState(true);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false); // ← emoji picker state
//   const myUserId = user._id;
//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const emojiPickerRef = useRef(null);
//   const conversationId = chat._id.toString();
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const receiverId = otherUser._id;
//   const [hasMore, setHasMore] = useState(true);

//   // close emoji picker on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(e.target)
//       ) {
//         setShowEmojiPicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // reset on every conversation switch
//   useEffect(() => {
//     setHasMore(true);
//     setCursor(null);
//     setFetchingMessages(true);
//     setShowEmojiPicker(false);
//   }, [conversationId]);

//   const insertEmoji = (emoji) => {
//     const ta = textareaRef.current;
//     if (!ta) {
//       setText((prev) => prev + emoji);
//       return;
//     }
//     const start = ta.selectionStart;
//     const end = ta.selectionEnd;
//     const newText = text.slice(0, start) + emoji + text.slice(end);
//     setText(newText);
//     // restore cursor after emoji
//     requestAnimationFrame(() => {
//       ta.focus();
//       ta.selectionStart = start + emoji.length;
//       ta.selectionEnd = start + emoji.length;
//       ta.style.height = "auto";
//       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
//     });
//   };

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
//     setShowEmojiPicker(false);
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
//   };

//   const loadOlderMessages = async () => {
//     if (!cursor || loadingMore) return;
//     setLoadingMore(true);
//     const el = messagesContainerRef.current;
//     const scrollHeightBefore = el ? el.scrollHeight : 0;
//     try {
//       const res = await fetchData(
//         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
//         { credentials: "include" },
//       );
//       const data = await res.json();
//       const messagesArray = Array.isArray(data) ? data : data.messages || [];
//       if (messagesArray.length < 50) setHasMore(false);
//       const formatted = messagesArray.map((msg) => ({
//         messageId: msg.messageId,
//         conversationId,
//         from: msg.senderId,
//         to: msg.receiverId,
//         text: msg.text,
//         status: msg.status || "sent",
//         createdAt: new Date(msg.createdAt).getTime(),
//       }));
//       shouldAutoScrollRef.current = false;
//       setMessages((prev) => {
//         const existing = prev[conversationId] || [];
//         const ids = new Set(existing.map((m) => m.messageId));
//         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//         return { ...prev, [conversationId]: [...newMessages, ...existing] };
//       });
//       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//       setTimeout(() => {
//         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
//       }, 50);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const handleScroll = () => {
//       const threshold = 150;
//       const isNearBottom =
//         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//       shouldAutoScrollRef.current = isNearBottom;
//     };
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];
//         if (messagesArray.length < 50) setHasMore(false);
//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//         setMessages((prev) => {
//           const existing = prev[conversationId] || [];
//           const ids = new Set(existing.map((m) => m.messageId));
//           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//           return { ...prev, [conversationId]: [...existing, ...newMessages] };
//         });
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       } finally {
//         setFetchingMessages(false);
//       }
//     };
//     fetchMessages();
//   }, [conversationId]);

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (shouldAutoScrollRef.current) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages[conversationId]]);

//   return (
//     <div
//       className="flex flex-col w-full"
//       style={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}
//     >
//       {/* HEADER */}
//       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//         >
//           <ArrowLeft size={18} />
//         </button>
//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>
//         <h3 className="font-semibold text-sm text-white truncate">
//           {otherUser.username}
//         </h3>
//       </div>

//       {/* MESSAGES */}
//       {fetchingMessages ? (
//         <div className="flex-1 overflow-hidden">
//           <MessageSkeleton />
//         </div>
//       ) : (
//         <div
//           ref={messagesContainerRef}
//           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//           style={{
//             overscrollBehavior: "contain",
//             WebkitOverflowScrolling: "touch",
//             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
//           }}
//         >
//           {hasMore &&
//             messages[conversationId] &&
//             messages[conversationId].length > 0 && (
//               <div className="flex justify-center mb-2">
//                 <button
//                   onClick={loadOlderMessages}
//                   className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
//                 >
//                   {loadingMore ? "Loading..." : "Load older messages"}
//                 </button>
//               </div>
//             )}

//           {(!messages[conversationId] ||
//             messages[conversationId].length === 0) && (
//             <div className="text-center text-white/60 text-sm">
//               Start a conversation with {otherUser.username}
//             </div>
//           )}

//           {(messages[conversationId] || []).map((msg) => {
//             const isMe = msg.from === myUserId;
//             return (
//               <MessageBubble
//                 key={msg.messageId}
//                 msg={msg}
//                 isMe={isMe}
//                 otherUser={otherUser}
//                 user={user}
//               />
//             );
//           })}

//           <div className="h-10" />
//         </div>
//       )}

//       {/* INPUT */}
//       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
//         {/* ── EMOJI PICKER — floats above, doesn't affect layout ── */}
//         {showEmojiPicker && (
//           <div
//             ref={emojiPickerRef}
//             className="
//       absolute bottom-full left-0 mx-3 mb-2
//       w-80 max-w-[calc(100%-24px)]
//       p-3 rounded-2xl
//       bg-[#1a1a1a] border border-white/10
//       shadow-2xl z-10
//     "
//           >
//             <div className="grid grid-cols-10 gap-1">
//               {EMOJI_LIST.map((emoji) => (
//                 <button
//                   key={emoji}
//                   onClick={() => insertEmoji(emoji)}
//                   className="
//             w-8 h-8 flex items-center justify-center
//             text-[18px] rounded-lg
//             hover:bg-white/10 active:scale-90
//             transition-all duration-100
//           "
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//         <div className="flex items-end gap-2">
//           {/* emoji toggle */}
//           <button
//             onClick={() => setShowEmojiPicker((prev) => !prev)}
//             className={`
//         flex-shrink-0 w-10 h-10 mb-0.5
//         rounded-full flex items-center justify-center
//         border transition-all duration-150 active:scale-90
//         ${
//           showEmojiPicker
//             ? "bg-indigo-600 border-indigo-500 text-white"
//             : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//         }
//       `}
//           >
//             <Smile size={17} />
//           </button>

//           <textarea
//             ref={textareaRef}
//             rows={1}
//             value={text}
//             onChange={(e) => {
//               setText(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height =
//                 Math.min(e.target.scrollHeight, 112) + "px";
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             placeholder="Type a message..."
//             className="
//         flex-1 resize-none overflow-y-auto
//         px-4 py-3 rounded-2xl
//         bg-white/10 text-white text-sm
//         placeholder-white/30
//         focus:outline-none focus:ring-1 focus:ring-white/20
//         leading-relaxed min-h-[44px]
//       "
//             style={{ maxHeight: "112px" }}
//           />

//           <button
//             onClick={handleSend}
//             disabled={!text.trim()}
//             className="
//         flex-shrink-0 w-11 h-11 mb-0.5
//         rounded-full
//         bg-indigo-600 hover:bg-indigo-500
//         flex items-center justify-center
//         transition active:scale-90
//         disabled:opacity-30 disabled:cursor-not-allowed
//       "
//           >
//             <Send size={16} className="text-white ml-0.5" />
//           </button>
//         </div>

//         <p className="text-[10px] text-white/20 mt-1.5 pl-1">
//           Enter to send · Shift+Enter for new line
//         </p>
//         <div
//           style={{ height: "calc(20vh + env(safe-area-inset-bottom, 0px))" }}
//         />
//       </div>
//     </div>
//   );
// }

// export default ChatBox;

// import { ArrowLeft, Send, Smile } from "lucide-react";
// import { useContext, useState, useEffect, useRef } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";
// import { getChatMessages } from "../../utils/getMessages";
// import { saveMessage } from "../../utils/saveMessage";
// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";

// const normalizeMessageId = (m) => m.messageId;

// const EMOJI_LIST = [
//   "😀",
//   "😂",
//   "😍",
//   "🥰",
//   "😎",
//   "🤔",
//   "😭",
//   "😡",
//   "🥺",
//   "😴",
//   "👍",
//   "👎",
//   "❤️",
//   "🔥",
//   "✨",
//   "🎉",
//   "🙏",
//   "💯",
//   "😊",
//   "🤣",
//   "😘",
//   "🥳",
//   "😤",
//   "🤯",
//   "😇",
//   "🤗",
//   "😏",
//   "🙄",
//   "😬",
//   "🤝",
//   "👀",
//   "💀",
//   "🫡",
//   "🫠",
//   "🥹",
//   "😮",
//   "😱",
//   "🤌",
//   "💪",
//   "👏",
//   "🍕",
//   "🎮",
//   "🎵",
//   "⚡",
//   "🌙",
//   "☀️",
//   "🌈",
//   "💫",
//   "🚀",
//   "🎯",
// ];

// function MessageSkeleton() {
//   return (
//     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//     </div>
//   );
// }

// function ChatBox({ chat, onBack }) {
//   const { user } = useAuth();
//   const { sendSignal, messages, setMessages } = useContext(websocketContext);
//   const [text, setText] = useState("");
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [fetchingMessages, setFetchingMessages] = useState(true);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const myUserId = user._id;
//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const emojiPickerRef = useRef(null);
//   const conversationId = chat._id.toString();
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const receiverId = otherUser._id;
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(e.target)
//       ) {
//         setShowEmojiPicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setHasMore(true);
//     setCursor(null);
//     setFetchingMessages(true);
//     setShowEmojiPicker(false);
//   }, [conversationId]);

//   const insertEmoji = (emoji) => {
//     const ta = textareaRef.current;
//     if (!ta) {
//       setText((prev) => prev + emoji);
//       return;
//     }
//     const start = ta.selectionStart;
//     const end = ta.selectionEnd;
//     const newText = text.slice(0, start) + emoji + text.slice(end);
//     setText(newText);
//     requestAnimationFrame(() => {
//       ta.focus();
//       ta.selectionStart = start + emoji.length;
//       ta.selectionEnd = start + emoji.length;
//       ta.style.height = "auto";
//       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
//     });
//   };

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
//     setShowEmojiPicker(false);
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
//   };

//   const loadOlderMessages = async () => {
//     if (!cursor || loadingMore) return;
//     setLoadingMore(true);
//     const el = messagesContainerRef.current;
//     const scrollHeightBefore = el ? el.scrollHeight : 0;
//     try {
//       const res = await fetchData(
//         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
//         { credentials: "include" },
//       );
//       const data = await res.json();
//       const messagesArray = Array.isArray(data) ? data : data.messages || [];
//       if (messagesArray.length < 50) setHasMore(false);
//       const formatted = messagesArray.map((msg) => ({
//         messageId: msg.messageId,
//         conversationId,
//         from: msg.senderId,
//         to: msg.receiverId,
//         text: msg.text,
//         status: msg.status || "sent",
//         createdAt: new Date(msg.createdAt).getTime(),
//       }));
//       shouldAutoScrollRef.current = false;
//       setMessages((prev) => {
//         const existing = prev[conversationId] || [];
//         const ids = new Set(existing.map((m) => m.messageId));
//         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//         return { ...prev, [conversationId]: [...newMessages, ...existing] };
//       });
//       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//       setTimeout(() => {
//         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
//       }, 50);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const handleScroll = () => {
//       const threshold = 150;
//       const isNearBottom =
//         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//       shouldAutoScrollRef.current = isNearBottom;
//     };
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];
//         if (messagesArray.length < 50) setHasMore(false);
//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//         setMessages((prev) => {
//           const existing = prev[conversationId] || [];
//           const ids = new Set(existing.map((m) => m.messageId));
//           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//           return { ...prev, [conversationId]: [...existing, ...newMessages] };
//         });
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       } finally {
//         setFetchingMessages(false);
//       }
//     };
//     fetchMessages();
//   }, [conversationId]);

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (shouldAutoScrollRef.current) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages[conversationId]]);

//   return (
//     // ✅ h-full + min-h-0 — fills parent (ChatView's flex-1), never overflows
//     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
//       {/* HEADER */}
//       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//         >
//           <ArrowLeft size={18} />
//         </button>
//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>
//         <h3 className="font-semibold text-sm text-white truncate">
//           {otherUser.username}
//         </h3>
//       </div>

//       {/* MESSAGES */}
//       {fetchingMessages ? (
//         <div className="flex-1 overflow-hidden">
//           <MessageSkeleton />
//         </div>
//       ) : (
//         <div
//           ref={messagesContainerRef}
//           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//           style={{
//             overscrollBehavior: "contain",
//             WebkitOverflowScrolling: "touch",
//             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
//           }}
//         >
//           {hasMore &&
//             messages[conversationId] &&
//             messages[conversationId].length > 0 && (
//               <div className="flex justify-center mb-2">
//                 <button
//                   onClick={loadOlderMessages}
//                   className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
//                 >
//                   {loadingMore ? "Loading..." : "Load older messages"}
//                 </button>
//               </div>
//             )}

//           {(!messages[conversationId] ||
//             messages[conversationId].length === 0) && (
//             <div className="text-center text-white/60 text-sm">
//               Start a conversation with {otherUser.username}
//             </div>
//           )}

//           {(messages[conversationId] || []).map((msg) => {
//             const isMe = msg.from === myUserId;
//             return (
//               <MessageBubble
//                 key={msg.messageId}
//                 msg={msg}
//                 isMe={isMe}
//                 otherUser={otherUser}
//                 user={user}
//               />
//             );
//           })}

//           {/* ✅ Small breathing room at bottom of message list — not a spacer hack */}
//           <div className="h-2" />
//         </div>
//       )}

//       {/* INPUT */}
//       {/* ✅ flex-shrink-0 — input bar never gets compressed */}
//       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
//         {/* EMOJI PICKER — floats above input, no layout impact */}
//         {showEmojiPicker && (
//           <div
//             ref={emojiPickerRef}
//             className="
//               absolute bottom-full left-0 mx-3 mb-2
//               w-80 max-w-[calc(100%-24px)]
//               p-3 rounded-2xl
//               bg-[#1a1a1a] border border-white/10
//               shadow-2xl z-10
//             "
//           >
//             <div className="grid grid-cols-10 gap-1">
//               {EMOJI_LIST.map((emoji) => (
//                 <button
//                   key={emoji}
//                   onClick={() => insertEmoji(emoji)}
//                   className="
//                     w-8 h-8 flex items-center justify-center
//                     text-[18px] rounded-lg
//                     hover:bg-white/10 active:scale-90
//                     transition-all duration-100
//                   "
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex items-end gap-2">
//           {/* Emoji toggle */}
//           <button
//             onClick={() => setShowEmojiPicker((prev) => !prev)}
//             className={`
//               flex-shrink-0 w-10 h-10 mb-0.5
//               rounded-full flex items-center justify-center
//               border transition-all duration-150 active:scale-90
//               ${
//                 showEmojiPicker
//                   ? "bg-indigo-600 border-indigo-500 text-white"
//                   : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//               }
//             `}
//           >
//             <Smile size={17} />
//           </button>

//           {/* ✅ font-size: 16px on textarea — prevents iOS zoom on focus */}
//           <textarea
//             ref={textareaRef}
//             rows={1}
//             value={text}
//             onChange={(e) => {
//               setText(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height =
//                 Math.min(e.target.scrollHeight, 112) + "px";
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             placeholder="Type a message..."
//             className="
//               flex-1 resize-none overflow-y-auto
//               px-4 py-3 rounded-2xl
//               bg-white/10 text-white
//               placeholder-white/30
//               focus:outline-none focus:ring-1 focus:ring-white/20
//               leading-relaxed min-h-[44px]
//             "
//             style={{ maxHeight: "112px", fontSize: "16px" }}
//           />
//           {/* ✅ fontSize 16px in style — overrides any global CSS, guarantees no iOS zoom */}

//           <button
//             onClick={handleSend}
//             disabled={!text.trim()}
//             className="
//               flex-shrink-0 w-11 h-11 mb-0.5
//               rounded-full
//               bg-indigo-600 hover:bg-indigo-500
//               flex items-center justify-center
//               transition active:scale-90
//               disabled:opacity-30 disabled:cursor-not-allowed
//             "
//           >
//             <Send size={16} className="text-white ml-0.5" />
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default ChatBox;

// import { ArrowLeft, Send, Smile } from "lucide-react";
// import { useContext, useState, useEffect, useRef } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";
// import { getChatMessages } from "../../utils/getMessages";
// import { saveMessage } from "../../utils/saveMessage";
// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";
// import ChatOptionsPopup from "../ChatOptionsPopup";

// const normalizeMessageId = (m) => m.messageId;

// const EMOJI_LIST = [
//   "😀",
//   "😂",
//   "😍",
//   "🥰",
//   "😎",
//   "🤔",
//   "😭",
//   "😡",
//   "🥺",
//   "😴",
//   "👍",
//   "👎",
//   "❤️",
//   "🔥",
//   "✨",
//   "🎉",
//   "🙏",
//   "💯",
//   "😊",
//   "🤣",
//   "😘",
//   "🥳",
//   "😤",
//   "🤯",
//   "😇",
//   "🤗",
//   "😏",
//   "🙄",
//   "😬",
//   "🤝",
//   "👀",
//   "💀",
//   "🫡",
//   "🫠",
//   "🥹",
//   "😮",
//   "😱",
//   "🤌",
//   "💪",
//   "👏",
//   "🍕",
//   "🎮",
//   "🎵",
//   "⚡",
//   "🌙",
//   "☀️",
//   "🌈",
//   "💫",
//   "🚀",
//   "🎯",
// ];

// function MessageSkeleton() {
//   return (
//     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//     </div>
//   );
// }

// function ChatBox({ chat, onBack }) {
//   const { user } = useAuth();
//   const { sendSignal, messages, setMessages } = useContext(websocketContext);
//   const [text, setText] = useState("");
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [fetchingMessages, setFetchingMessages] = useState(true);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showChatOptions, setShowChatOptions] = useState(false);
//   const [chatTheme, setChatTheme] = useState({
//     id: "default",
//     label: "Default",
//     bg: "#0a0a0a",
//   });
//   const myUserId = user._id;
//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const emojiPickerRef = useRef(null);
//   const chatOptionsRef = useRef(null);
//   const conversationId = chat._id.toString();
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const receiverId = otherUser._id;
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(e.target)
//       ) {
//         setShowEmojiPicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setHasMore(true);
//     setCursor(null);
//     setFetchingMessages(true);
//     setShowEmojiPicker(false);
//     setShowChatOptions(false);
//   }, [conversationId]);

//   const insertEmoji = (emoji) => {
//     const ta = textareaRef.current;
//     if (!ta) {
//       setText((prev) => prev + emoji);
//       return;
//     }
//     const start = ta.selectionStart;
//     const end = ta.selectionEnd;
//     const newText = text.slice(0, start) + emoji + text.slice(end);
//     setText(newText);
//     requestAnimationFrame(() => {
//       ta.focus();
//       ta.selectionStart = start + emoji.length;
//       ta.selectionEnd = start + emoji.length;
//       ta.style.height = "auto";
//       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
//     });
//   };

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
//     setShowEmojiPicker(false);
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
//   };

//   const loadOlderMessages = async () => {
//     if (!cursor || loadingMore) return;
//     setLoadingMore(true);
//     const el = messagesContainerRef.current;
//     const scrollHeightBefore = el ? el.scrollHeight : 0;
//     try {
//       const res = await fetchData(
//         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
//         { credentials: "include" },
//       );
//       const data = await res.json();
//       const messagesArray = Array.isArray(data) ? data : data.messages || [];
//       if (messagesArray.length < 50) setHasMore(false);
//       const formatted = messagesArray.map((msg) => ({
//         messageId: msg.messageId,
//         conversationId,
//         from: msg.senderId,
//         to: msg.receiverId,
//         text: msg.text,
//         status: msg.status || "sent",
//         createdAt: new Date(msg.createdAt).getTime(),
//       }));
//       shouldAutoScrollRef.current = false;
//       setMessages((prev) => {
//         const existing = prev[conversationId] || [];
//         const ids = new Set(existing.map((m) => m.messageId));
//         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//         return { ...prev, [conversationId]: [...newMessages, ...existing] };
//       });
//       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//       setTimeout(() => {
//         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
//       }, 50);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const handleScroll = () => {
//       const threshold = 150;
//       const isNearBottom =
//         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//       shouldAutoScrollRef.current = isNearBottom;
//     };
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];
//         if (messagesArray.length < 50) setHasMore(false);
//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//         setMessages((prev) => {
//           const existing = prev[conversationId] || [];
//           const ids = new Set(existing.map((m) => m.messageId));
//           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//           return { ...prev, [conversationId]: [...existing, ...newMessages] };
//         });
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       } finally {
//         setFetchingMessages(false);
//       }
//     };
//     fetchMessages();
//   }, [conversationId]);

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (shouldAutoScrollRef.current) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages[conversationId]]);

//   return (
//     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
//       {/* HEADER */}
//       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//         >
//           <ArrowLeft size={18} />
//         </button>
//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>
//         <h3 className="font-semibold text-sm text-white truncate flex-1">
//           {otherUser.username}
//         </h3>

//         {/* Three dots */}
//         <div ref={chatOptionsRef} className="relative flex-shrink-0">
//           <button
//             onClick={() => setShowChatOptions((v) => !v)}
//             className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
//           >
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <circle cx="12" cy="5" r="1" />
//               <circle cx="12" cy="12" r="1" />
//               <circle cx="12" cy="19" r="1" />
//             </svg>
//           </button>

//           {showChatOptions && (
//             <ChatOptionsPopup
//               onClose={() => setShowChatOptions(false)}
//               onClearChat={() => {
//                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
//               }}
//               onBlock={() => {
//                 // wire up block logic here
//               }}
//               onThemeChange={(theme) => setChatTheme(theme)}
//               currentTheme={chatTheme}
//               anchorRef={chatOptionsRef}
//             />
//           )}
//         </div>
//       </div>

//       {/* MESSAGES */}
//       {fetchingMessages ? (
//         <div className="flex-1 overflow-hidden">
//           <MessageSkeleton />
//         </div>
//       ) : (
//         <div
//           ref={messagesContainerRef}
//           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//           style={{
//             overscrollBehavior: "contain",
//             WebkitOverflowScrolling: "touch",
//             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
//             background: chatTheme.bg,
//             transition: "background 0.3s ease",
//           }}
//         >
//           {hasMore &&
//             messages[conversationId] &&
//             messages[conversationId].length > 0 && (
//               <div className="flex justify-center mb-2">
//                 <button
//                   onClick={loadOlderMessages}
//                   className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
//                 >
//                   {loadingMore ? "Loading..." : "Load older messages"}
//                 </button>
//               </div>
//             )}

//           {(!messages[conversationId] ||
//             messages[conversationId].length === 0) && (
//             <div className="text-center text-white/60 text-sm">
//               Start a conversation with {otherUser.username}
//             </div>
//           )}

//           {(messages[conversationId] || []).map((msg) => {
//             const isMe = msg.from === myUserId;
//             return (
//               <MessageBubble
//                 key={msg.messageId}
//                 msg={msg}
//                 isMe={isMe}
//                 otherUser={otherUser}
//                 user={user}
//               />
//             );
//           })}

//           <div className="h-2" />
//         </div>
//       )}

//       {/* INPUT */}
//       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
//         {showEmojiPicker && (
//           <div
//             ref={emojiPickerRef}
//             className="
//               absolute bottom-full left-0 mx-3 mb-2
//               w-80 max-w-[calc(100%-24px)]
//               p-3 rounded-2xl
//               bg-[#1a1a1a] border border-white/10
//               shadow-2xl z-10
//             "
//           >
//             <div className="grid grid-cols-10 gap-1">
//               {EMOJI_LIST.map((emoji) => (
//                 <button
//                   key={emoji}
//                   onClick={() => insertEmoji(emoji)}
//                   className="
//                     w-8 h-8 flex items-center justify-center
//                     text-[18px] rounded-lg
//                     hover:bg-white/10 active:scale-90
//                     transition-all duration-100
//                   "
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex items-end gap-2">
//           <button
//             onClick={() => setShowEmojiPicker((prev) => !prev)}
//             className={`
//               flex-shrink-0 w-10 h-10 mb-0.5
//               rounded-full flex items-center justify-center
//               border transition-all duration-150 active:scale-90
//               ${
//                 showEmojiPicker
//                   ? "bg-indigo-600 border-indigo-500 text-white"
//                   : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//               }
//             `}
//           >
//             <Smile size={17} />
//           </button>

//           <textarea
//             ref={textareaRef}
//             rows={1}
//             value={text}
//             onChange={(e) => {
//               setText(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height =
//                 Math.min(e.target.scrollHeight, 112) + "px";
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             placeholder="Type a message..."
//             className="
//               flex-1 resize-none overflow-y-auto
//               px-4 py-3 rounded-2xl
//               bg-white/10 text-white
//               placeholder-white/30
//               focus:outline-none focus:ring-1 focus:ring-white/20
//               leading-relaxed min-h-[44px]
//             "
//             style={{ maxHeight: "112px", fontSize: "16px" }}
//           />

//           <button
//             onClick={handleSend}
//             disabled={!text.trim()}
//             className="
//               flex-shrink-0 w-11 h-11 mb-0.5
//               rounded-full
//               bg-indigo-600 hover:bg-indigo-500
//               flex items-center justify-center
//               transition active:scale-90
//               disabled:opacity-30 disabled:cursor-not-allowed
//             "
//           >
//             <Send size={16} className="text-white ml-0.5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatBox;

// import { ArrowLeft, Send, Smile } from "lucide-react";
// import { useContext, useState, useEffect, useRef } from "react";
// import { createPortal } from "react-dom";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";

// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";
// import ChatOptionsPopup from "../ChatOptionsPopup";

// const normalizeMessageId = (m) => m.messageId;

// const EMOJI_LIST = [
//   "😀",
//   "😂",
//   "😍",
//   "🥰",
//   "😎",
//   "🤔",
//   "😭",
//   "😡",
//   "🥺",
//   "😴",
//   "👍",
//   "👎",
//   "❤️",
//   "🔥",
//   "✨",
//   "🎉",
//   "🙏",
//   "💯",
//   "😊",
//   "🤣",
//   "😘",
//   "🥳",
//   "😤",
//   "🤯",
//   "😇",
//   "🤗",
//   "😏",
//   "🙄",
//   "😬",
//   "🤝",
//   "👀",
//   "💀",
//   "🫡",
//   "🫠",
//   "🥹",
//   "😮",
//   "😱",
//   "🤌",
//   "💪",
//   "👏",
//   "🍕",
//   "🎮",
//   "🎵",
//   "⚡",
//   "🌙",
//   "☀️",
//   "🌈",
//   "💫",
//   "🚀",
//   "🎯",
// ];

// function MessageSkeleton() {
//   return (
//     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//     </div>
//   );
// }

// function ChatBox({ chat, onBack, onNewMessage }) {
//   const { user } = useAuth();
//   const { sendSignal, messages, setMessages } = useContext(websocketContext);
//   const [text, setText] = useState("");
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [fetchingMessages, setFetchingMessages] = useState(true);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showChatOptions, setShowChatOptions] = useState(false);
//   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
//   const [chatTheme, setChatTheme] = useState({
//     id: "default",
//     label: "Default",
//     bg: "#0a0a0a",
//   });
//   const myUserId = user._id;
//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const emojiPickerRef = useRef(null);
//   const chatOptionsRef = useRef(null);
//   const conversationId = chat._id.toString();
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const receiverId = otherUser._id;
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(e.target)
//       ) {
//         setShowEmojiPicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setHasMore(true);
//     setCursor(null);
//     setFetchingMessages(true);
//     setShowEmojiPicker(false);
//     setShowChatOptions(false);
//   }, [conversationId]);

//   const handleToggleChatOptions = () => {
//     if (!showChatOptions && chatOptionsRef.current) {
//       const rect = chatOptionsRef.current.getBoundingClientRect();
//       setPopupPos({
//         top: rect.bottom + 6,
//         right: window.innerWidth - rect.right,
//       });
//     }
//     setShowChatOptions((v) => !v);
//   };

//   const insertEmoji = (emoji) => {
//     const ta = textareaRef.current;
//     if (!ta) {
//       setText((prev) => prev + emoji);
//       return;
//     }
//     const start = ta.selectionStart;
//     const end = ta.selectionEnd;
//     const newText = text.slice(0, start) + emoji + text.slice(end);
//     setText(newText);
//     requestAnimationFrame(() => {
//       ta.focus();
//       ta.selectionStart = start + emoji.length;
//       ta.selectionEnd = start + emoji.length;
//       ta.style.height = "auto";
//       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
//     });
//   };

//   const handleSend = async () => {
//     if (!text.trim()) return;
//     const messageId = uuidv4();
//     const createdAt = Date.now();
//     const messageText = text; // ← capture before clearing

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
//             text: messageText,
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
//       text: messageText,
//       createdAt,
//     });

//     onNewMessage?.(conversationId, messageText); // ← add this

//     setText("");
//     setShowEmojiPicker(false);
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
//   };

//   const loadOlderMessages = async () => {
//     if (!cursor || loadingMore) return;
//     setLoadingMore(true);
//     const el = messagesContainerRef.current;
//     const scrollHeightBefore = el ? el.scrollHeight : 0;
//     try {
//       const res = await fetchData(
//         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
//         { credentials: "include" },
//       );
//       const data = await res.json();
//       const messagesArray = Array.isArray(data) ? data : data.messages || [];
//       if (messagesArray.length < 50) setHasMore(false);
//       const formatted = messagesArray.map((msg) => ({
//         messageId: msg.messageId,
//         conversationId,
//         from: msg.senderId,
//         to: msg.receiverId,
//         text: msg.text,
//         status: msg.status || "sent",
//         createdAt: new Date(msg.createdAt).getTime(),
//       }));
//       shouldAutoScrollRef.current = false;
//       setMessages((prev) => {
//         const existing = prev[conversationId] || [];
//         const ids = new Set(existing.map((m) => m.messageId));
//         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//         return { ...prev, [conversationId]: [...newMessages, ...existing] };
//       });
//       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//       setTimeout(() => {
//         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
//       }, 50);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const handleScroll = () => {
//       const threshold = 150;
//       const isNearBottom =
//         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//       shouldAutoScrollRef.current = isNearBottom;
//     };
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];
//         if (messagesArray.length < 50) setHasMore(false);
//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//         setMessages((prev) => {
//           const existing = prev[conversationId] || [];
//           const ids = new Set(existing.map((m) => m.messageId));
//           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//           return { ...prev, [conversationId]: [...existing, ...newMessages] };
//         });
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       } finally {
//         setFetchingMessages(false);
//       }
//     };
//     fetchMessages();
//   }, [conversationId]);

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (shouldAutoScrollRef.current) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages[conversationId]]);

//   return (
//     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
//       {/* HEADER */}
//       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//         >
//           <ArrowLeft size={18} />
//         </button>
//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>
//         <h3 className="font-semibold text-sm text-white truncate flex-1">
//           {otherUser.username}
//         </h3>

//         {/* Three dots */}
//         <div ref={chatOptionsRef} className="relative flex-shrink-0">
//           <button
//             onClick={handleToggleChatOptions}
//             className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
//           >
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             >
//               <circle cx="12" cy="5" r="1" />
//               <circle cx="12" cy="12" r="1" />
//               <circle cx="12" cy="19" r="1" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* MESSAGES */}
//       {fetchingMessages ? (
//         <div className="flex-1 overflow-hidden">
//           <MessageSkeleton />
//         </div>
//       ) : (
//         <div
//           ref={messagesContainerRef}
//           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//           style={{
//             overscrollBehavior: "contain",
//             WebkitOverflowScrolling: "touch",
//             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
//             background: chatTheme.bg,
//             transition: "background 0.3s ease",
//           }}
//         >
//           {hasMore &&
//             messages[conversationId] &&
//             messages[conversationId].length > 0 && (
//               <div className="flex justify-center mb-2">
//                 <button
//                   onClick={loadOlderMessages}
//                   className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
//                 >
//                   {loadingMore ? "Loading..." : "Load older messages"}
//                 </button>
//               </div>
//             )}

//           {(!messages[conversationId] ||
//             messages[conversationId].length === 0) && (
//             <div className="text-center text-white/60 text-sm">
//               Start a conversation with {otherUser.username}
//             </div>
//           )}

//           {(messages[conversationId] || []).map((msg) => {
//             const isMe = msg.from === myUserId;
//             return (
//               <MessageBubble
//                 key={msg.messageId}
//                 msg={msg}
//                 isMe={isMe}
//                 otherUser={otherUser}
//                 user={user}
//               />
//             );
//           })}

//           <div className="h-2" />
//         </div>
//       )}

//       {/* INPUT */}
//       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
//         {showEmojiPicker && (
//           <div
//             ref={emojiPickerRef}
//             className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
//           >
//             <div className="grid grid-cols-10 gap-1">
//               {EMOJI_LIST.map((emoji) => (
//                 <button
//                   key={emoji}
//                   onClick={() => insertEmoji(emoji)}
//                   className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex items-end gap-2">
//           <button
//             onClick={() => setShowEmojiPicker((prev) => !prev)}
//             className={`
//               flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center
//               border transition-all duration-150 active:scale-90
//               ${
//                 showEmojiPicker
//                   ? "bg-indigo-600 border-indigo-500 text-white"
//                   : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//               }
//             `}
//           >
//             <Smile size={17} />
//           </button>

//           <textarea
//             ref={textareaRef}
//             rows={1}
//             value={text}
//             onChange={(e) => {
//               setText(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height =
//                 Math.min(e.target.scrollHeight, 112) + "px";
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             placeholder="Type a message..."
//             className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
//             style={{ maxHeight: "112px", fontSize: "16px" }}
//           />

//           <button
//             onClick={handleSend}
//             disabled={!text.trim()}
//             className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
//           >
//             <Send size={16} className="text-white ml-0.5" />
//           </button>
//         </div>
//       </div>

//       {/* Chat options popup — portaled to body to escape stacking context */}
//       {showChatOptions &&
//         createPortal(
//           <div
//             style={{
//               position: "fixed",
//               top: popupPos.top,
//               right: popupPos.right,
//               zIndex: 99999,
//             }}
//           >
//             <ChatOptionsPopup
//               onClose={() => setShowChatOptions(false)}
//               onClearChat={() => {
//                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
//               }}
//               onBlock={() => {
//                 // wire up block logic here
//               }}
//               onThemeChange={(theme) => setChatTheme(theme)}
//               currentTheme={chatTheme}
//               anchorRef={chatOptionsRef}
//             />
//           </div>,
//           document.body,
//         )}
//     </div>
//   );
// }

// export default ChatBox;

// import { ArrowLeft, Send, Smile } from "lucide-react";
// import { useContext, useState, useEffect, useRef } from "react";
// import { createPortal } from "react-dom";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";
// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";
// import ChatOptionsPopup from "../ChatOptionsPopup";

// const EMOJI_LIST = [
//   "😀",
//   "😂",
//   "😍",
//   "🥰",
//   "😎",
//   "🤔",
//   "😭",
//   "😡",
//   "🥺",
//   "😴",
//   "👍",
//   "👎",
//   "❤️",
//   "🔥",
//   "✨",
//   "🎉",
//   "🙏",
//   "💯",
//   "😊",
//   "🤣",
//   "😘",
//   "🥳",
//   "😤",
//   "🤯",
//   "😇",
//   "🤗",
//   "😏",
//   "🙄",
//   "😬",
//   "🤝",
//   "👀",
//   "💀",
//   "🫡",
//   "🫠",
//   "🥹",
//   "😮",
//   "😱",
//   "🤌",
//   "💪",
//   "👏",
//   "🍕",
//   "🎮",
//   "🎵",
//   "⚡",
//   "🌙",
//   "☀️",
//   "🌈",
//   "💫",
//   "🚀",
//   "🎯",
// ];

// // ── MESSAGE STATUS TICKS ──────────────────────────────
// function MessageStatus({ status }) {
//   if (status === "sending") {
//     return (
//       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.2)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   if (status === "read") {
//     return (
//       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="#60a5fa"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M6 5l3 3 5-6"
//           stroke="#60a5fa"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   if (status === "delivered") {
//     return (
//       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.35)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M6 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.35)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   // sent
//   return (
//     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//       <path
//         d="M1 5l3 3 5-6"
//         stroke="rgba(255,255,255,0.35)"
//         strokeWidth="1.6"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }
// // ─────────────────────────────────────────────────────

// function MessageSkeleton() {
//   return (
//     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//     </div>
//   );
// }

// function ChatBox({ chat, onBack, onNewMessage }) {
//   const { user } = useAuth();

//   const [text, setText] = useState("");
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [fetchingMessages, setFetchingMessages] = useState(true);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showChatOptions, setShowChatOptions] = useState(false);
//   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
//   const [chatTheme, setChatTheme] = useState({
//     id: "default",
//     label: "Default",
//     bg: "#0a0a0a",
//   });

//   const myUserId = user._id;
//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const emojiPickerRef = useRef(null);
//   const chatOptionsRef = useRef(null);
//   const conversationId = chat._id.toString();
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const receiverId = otherUser._id;
//   const [hasMore, setHasMore] = useState(true);

//    const {
//      sendSignal,
//      messages,
//      setMessages,
//      markAsRead,
//      setCurrentConversation,
//    } = useContext(websocketContext);

//    useEffect(() => {
//      setCurrentConversation(conversationId);
//      return () => setCurrentConversation(null);
//    }, [conversationId]);
//   // ── MARK AS READ when new messages arrive while chat is open ──
//  useEffect(() => {
//    const convMessages = messages[conversationId] || [];
//    const hasUnread = convMessages.some(
//      (msg) => msg.from !== myUserId && msg.status !== "read",
//    );

//    if (!hasUnread) return;

//    // optimistically mark received messages as read in local state
//    setMessages((prev) => {
//      const existing = prev[conversationId] || [];
//      return {
//        ...prev,
//        [conversationId]: existing.map((msg) =>
//          msg.from !== myUserId && msg.status !== "read"
//            ? { ...msg, status: "read" }
//            : msg,
//        ),
//      };
//    });

//    markAsRead(conversationId);

//   fetchData(`/api/chat/conversations/${conversationId}/read`, {
//     // ← change here
//     method: "PATCH",
//     credentials: "include",
//   }).catch(() => {});
//  }, [messages[conversationId]]);
//   // ─────────────────────────────────────────────────────────────

//   // ── MARK AS READ when conversation opens ─────────────
//   useEffect(() => {
//     if (!conversationId) return;

//     markAsRead(conversationId);

// fetchData(`/api/chat/conversations/${conversationId}/read`, {
//   // ← change here
//   method: "PATCH",
//   credentials: "include",
// }).catch(() => {});
//   }, [conversationId]);
//   // ─────────────────────────────────────────────────────

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(e.target)
//       ) {
//         setShowEmojiPicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setHasMore(true);
//     setCursor(null);
//     setFetchingMessages(true);
//     setShowEmojiPicker(false);
//     setShowChatOptions(false);
//   }, [conversationId]);

//   const handleToggleChatOptions = () => {
//     if (!showChatOptions && chatOptionsRef.current) {
//       const rect = chatOptionsRef.current.getBoundingClientRect();
//       setPopupPos({
//         top: rect.bottom + 6,
//         right: window.innerWidth - rect.right,
//       });
//     }
//     setShowChatOptions((v) => !v);
//   };

//   const insertEmoji = (emoji) => {
//     const ta = textareaRef.current;
//     if (!ta) {
//       setText((prev) => prev + emoji);
//       return;
//     }
//     const start = ta.selectionStart;
//     const end = ta.selectionEnd;
//     const newText = text.slice(0, start) + emoji + text.slice(end);
//     setText(newText);
//     requestAnimationFrame(() => {
//       ta.focus();
//       ta.selectionStart = start + emoji.length;
//       ta.selectionEnd = start + emoji.length;
//       ta.style.height = "auto";
//       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
//     });
//   };

//   const handleSend = async () => {
//     if (!text.trim()) return;
//     const messageId = uuidv4();
//     const createdAt = Date.now();
//     const messageText = text;

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
//             text: messageText,
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
//       text: messageText,
//       createdAt,
//     });

//     onNewMessage?.(conversationId, messageText);

//     setText("");
//     setShowEmojiPicker(false);
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
//   };

//   const loadOlderMessages = async () => {
//     if (!cursor || loadingMore) return;
//     setLoadingMore(true);
//     const el = messagesContainerRef.current;
//     const scrollHeightBefore = el ? el.scrollHeight : 0;
//     try {
//       const res = await fetchData(
//         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
//         { credentials: "include" },
//       );
//       const data = await res.json();
//       const messagesArray = Array.isArray(data) ? data : data.messages || [];
//       if (messagesArray.length < 50) setHasMore(false);
//       const formatted = messagesArray.map((msg) => ({
//         messageId: msg.messageId,
//         conversationId,
//         from: msg.senderId,
//         to: msg.receiverId,
//         text: msg.text,
//         status: msg.status || "sent",
//         createdAt: new Date(msg.createdAt).getTime(),
//       }));
//       shouldAutoScrollRef.current = false;
//       setMessages((prev) => {
//         const existing = prev[conversationId] || [];
//         const ids = new Set(existing.map((m) => m.messageId));
//         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//         return { ...prev, [conversationId]: [...newMessages, ...existing] };
//       });
//       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//       setTimeout(() => {
//         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
//       }, 50);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const handleScroll = () => {
//       const threshold = 150;
//       const isNearBottom =
//         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//       shouldAutoScrollRef.current = isNearBottom;
//     };
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];
//         if (messagesArray.length < 50) setHasMore(false);
//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//         setMessages((prev) => {
//           const existing = prev[conversationId] || [];
//           const ids = new Set(existing.map((m) => m.messageId));
//           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//           return { ...prev, [conversationId]: [...existing, ...newMessages] };
//         });
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       } finally {
//         setFetchingMessages(false);
//       }
//     };
//     fetchMessages();
//   }, [conversationId]);

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (shouldAutoScrollRef.current) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages[conversationId]]);

//   return (
//     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
//       {/* HEADER */}
//       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//         >
//           <ArrowLeft size={18} />
//         </button>
//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>
//         <h3 className="font-semibold text-sm text-white truncate flex-1">
//           {otherUser.username}
//         </h3>
//         <div ref={chatOptionsRef} className="relative flex-shrink-0">
//           <button
//             onClick={handleToggleChatOptions}
//             className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
//           >
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             >
//               <circle cx="12" cy="5" r="1" />
//               <circle cx="12" cy="12" r="1" />
//               <circle cx="12" cy="19" r="1" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* MESSAGES */}
//       {fetchingMessages ? (
//         <div className="flex-1 overflow-hidden">
//           <MessageSkeleton />
//         </div>
//       ) : (
//         <div
//           ref={messagesContainerRef}
//           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//           style={{
//             overscrollBehavior: "contain",
//             WebkitOverflowScrolling: "touch",
//             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
//             background: chatTheme.bg,
//             transition: "background 0.3s ease",
//           }}
//         >
//           {hasMore && messages[conversationId]?.length > 0 && (
//             <div className="flex justify-center mb-2">
//               <button
//                 onClick={loadOlderMessages}
//                 className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
//               >
//                 {loadingMore ? "Loading..." : "Load older messages"}
//               </button>
//             </div>
//           )}

//           {(!messages[conversationId] ||
//             messages[conversationId].length === 0) && (
//             <div className="text-center text-white/60 text-sm">
//               Start a conversation with {otherUser.username}
//             </div>
//           )}

//           {(messages[conversationId] || []).map((msg) => {
//             const isMe = msg.from === myUserId;
//             return (
//               <div key={msg.messageId}>
//                 <MessageBubble
//                   msg={msg}
//                   isMe={isMe}
//                   otherUser={otherUser}
//                   user={user}
//                 />

//               </div>
//             );
//           })}

//           <div className="h-2" />
//         </div>
//       )}

//       {/* INPUT */}
//       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
//         {showEmojiPicker && (
//           <div
//             ref={emojiPickerRef}
//             className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
//           >
//             <div className="grid grid-cols-10 gap-1">
//               {EMOJI_LIST.map((emoji) => (
//                 <button
//                   key={emoji}
//                   onClick={() => insertEmoji(emoji)}
//                   className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex items-end gap-2">
//           <button
//             onClick={() => setShowEmojiPicker((prev) => !prev)}
//             className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
//               showEmojiPicker
//                 ? "bg-indigo-600 border-indigo-500 text-white"
//                 : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//             }`}
//           >
//             <Smile size={17} />
//           </button>

//           <textarea
//             ref={textareaRef}
//             rows={1}
//             value={text}
//             onChange={(e) => {
//               setText(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height =
//                 Math.min(e.target.scrollHeight, 112) + "px";
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             placeholder="Type a message..."
//             className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
//             style={{ maxHeight: "112px", fontSize: "16px" }}
//           />

//           <button
//             onClick={handleSend}
//             disabled={!text.trim()}
//             className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
//           >
//             <Send size={16} className="text-white ml-0.5" />
//           </button>
//         </div>
//       </div>

//       {showChatOptions &&
//         createPortal(
//           <div
//             style={{
//               position: "fixed",
//               top: popupPos.top,
//               right: popupPos.right,
//               zIndex: 99999,
//             }}
//           >
//             <ChatOptionsPopup
//               onClose={() => setShowChatOptions(false)}
//               onClearChat={() =>
//                 setMessages((prev) => ({ ...prev, [conversationId]: [] }))
//               }
//               onBlock={() => {}}
//               onThemeChange={(theme) => setChatTheme(theme)}
//               currentTheme={chatTheme}
//               anchorRef={chatOptionsRef}
//             />
//           </div>,
//           document.body,
//         )}
//     </div>
//   );
// }

// export default ChatBox;

// import { ArrowLeft, Send, Smile } from "lucide-react";
// import { useContext, useState, useEffect, useRef } from "react";
// import { createPortal } from "react-dom";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";
// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";
// import ChatOptionsPopup from "../ChatOptionsPopup";
// import { useNavigate } from "react-router-dom";

// const EMOJI_LIST = [
//   "😀",
//   "😂",
//   "😍",
//   "🥰",
//   "😎",
//   "🤔",
//   "😭",
//   "😡",
//   "🥺",
//   "😴",
//   "👍",
//   "👎",
//   "❤️",
//   "🔥",
//   "✨",
//   "🎉",
//   "🙏",
//   "💯",
//   "😊",
//   "🤣",
//   "😘",
//   "🥳",
//   "😤",
//   "🤯",
//   "😇",
//   "🤗",
//   "😏",
//   "🙄",
//   "😬",
//   "🤝",
//   "👀",
//   "💀",
//   "🫡",
//   "🫠",
//   "🥹",
//   "😮",
//   "😱",
//   "🤌",
//   "💪",
//   "👏",
//   "🍕",
//   "🎮",
//   "🎵",
//   "⚡",
//   "🌙",
//   "☀️",
//   "🌈",
//   "💫",
//   "🚀",
//   "🎯",
// ];

// function MessageStatus({ status }) {

//    if (status === "blocked") {
//      return (
//        <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>
//      );
//    }




//   if (status === "sending") {
//     return (
//       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.2)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   if (status === "read") {
//     return (
//       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="#60a5fa"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M6 5l3 3 5-6"
//           stroke="#60a5fa"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   if (status === "delivered") {
//     return (
//       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.35)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M6 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.35)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }
//   return (
//     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//       <path
//         d="M1 5l3 3 5-6"
//         stroke="rgba(255,255,255,0.35)"
//         strokeWidth="1.6"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function MessageSkeleton() {
//   return (
//     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//     </div>
//   );
// }

// function ChatBox({ chat, onBack, onNewMessage, onClearMessages }) {
//   const { user } = useAuth();

//   const [text, setText] = useState("");
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [fetchingMessages, setFetchingMessages] = useState(true);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showChatOptions, setShowChatOptions] = useState(false);
//   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
//   const [chatTheme, setChatTheme] = useState({
//     id: "default",
//     label: "Default",
//     bg: "#0a0a0a",
//   });
//   const [isBlocked, setIsBlocked] = useState(false);

//   const navigate = useNavigate();

//   const myUserId = user._id;
//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const emojiPickerRef = useRef(null);
//   const chatOptionsRef = useRef(null);
//   const conversationId = chat._id.toString();
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   if (!otherUser) return null;

//   const receiverId = otherUser._id;
//   const [hasMore, setHasMore] = useState(true);

//   const {
//     sendSignal,
//     messages,
//     setMessages,
//     markAsRead,
//     setCurrentConversation,
//   } = useContext(websocketContext);

//   // Add this useEffect after the other useEffects in ChatBox
//   useEffect(() => {
//     if (!receiverId) return;
//     const checkBlockStatus = async () => {
//       try {
//         const res = await fetchData(`/api/users/${receiverId}/block-status`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         setIsBlocked(data.isBlocked);
//       } catch (err) {
//         console.error("Failed to fetch block status", err);
//       }
//     };
//     checkBlockStatus();
//   }, [receiverId]);

//   useEffect(() => {
//     setCurrentConversation(conversationId);
//     return () => setCurrentConversation(null);
//   }, [conversationId]);

//   useEffect(() => {
//     const convMessages = messages[conversationId] || [];
//     const hasUnread = convMessages.some(
//       (msg) => msg.from !== myUserId && msg.status !== "read",
//     );
//     if (!hasUnread) return;
//     setMessages((prev) => {
//       const existing = prev[conversationId] || [];
//       return {
//         ...prev,
//         [conversationId]: existing.map((msg) =>
//           msg.from !== myUserId && msg.status !== "read"
//             ? { ...msg, status: "read" }
//             : msg,
//         ),
//       };
//     });
//     markAsRead(conversationId);
//     fetchData(`/api/chat/conversations/${conversationId}/read`, {
//       method: "PATCH",
//       credentials: "include",
//     }).catch(() => {});
//   }, [messages[conversationId]]);

//   useEffect(() => {
//     if (!conversationId) return;
//     markAsRead(conversationId);
//     fetchData(`/api/chat/conversations/${conversationId}/read`, {
//       method: "PATCH",
//       credentials: "include",
//     }).catch(() => {});
//   }, [conversationId]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(e.target)
//       ) {
//         setShowEmojiPicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setHasMore(true);
//     setCursor(null);
//     setFetchingMessages(true);
//     setShowEmojiPicker(false);
//     setShowChatOptions(false);
//     setIsBlocked(false);
//   }, [conversationId]);

//   const handleToggleChatOptions = () => {
//     if (!showChatOptions && chatOptionsRef.current) {
//       const rect = chatOptionsRef.current.getBoundingClientRect();
//       setPopupPos({
//         top: rect.bottom + 6,
//         right: window.innerWidth - rect.right,
//       });
//     }
//     setShowChatOptions((v) => !v);
//   };

//   const insertEmoji = (emoji) => {
//     const ta = textareaRef.current;
//     if (!ta) {
//       setText((prev) => prev + emoji);
//       return;
//     }
//     const start = ta.selectionStart;
//     const end = ta.selectionEnd;
//     const newText = text.slice(0, start) + emoji + text.slice(end);
//     setText(newText);
//     requestAnimationFrame(() => {
//       ta.focus();
//       ta.selectionStart = start + emoji.length;
//       ta.selectionEnd = start + emoji.length;
//       ta.style.height = "auto";
//       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
//     });
//   };

//   const handleSend = async () => {
//     if (!text.trim() || isBlocked) return;
//     const messageId = uuidv4();
//     const createdAt = Date.now();
//     const messageText = text;

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
//             text: messageText,
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
//       text: messageText,
//       createdAt,
//     });

//     onNewMessage?.(conversationId, messageText);
//     setText("");
//     setShowEmojiPicker(false);
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
//   };

//   const loadOlderMessages = async () => {
//     if (!cursor || loadingMore) return;
//     setLoadingMore(true);
//     const el = messagesContainerRef.current;
//     const scrollHeightBefore = el ? el.scrollHeight : 0;
//     try {
//       const res = await fetchData(
//         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
//         { credentials: "include" },
//       );
//       const data = await res.json();
//       const messagesArray = Array.isArray(data) ? data : data.messages || [];
//       if (messagesArray.length < 50) setHasMore(false);
//       const formatted = messagesArray.map((msg) => ({
//         messageId: msg.messageId,
//         conversationId,
//         from: msg.senderId,
//         to: msg.receiverId,
//         text: msg.text,
//         status: msg.status || "sent",
//         createdAt: new Date(msg.createdAt).getTime(),
//       }));
//       shouldAutoScrollRef.current = false;
//       setMessages((prev) => {
//         const existing = prev[conversationId] || [];
//         const ids = new Set(existing.map((m) => m.messageId));
//         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//         return { ...prev, [conversationId]: [...newMessages, ...existing] };
//       });
//       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//       setTimeout(() => {
//         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
//       }, 50);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   };

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const handleScroll = () => {
//       const threshold = 150;
//       const isNearBottom =
//         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//       shouldAutoScrollRef.current = isNearBottom;
//     };
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];
//         if (messagesArray.length < 50) setHasMore(false);
//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//         setMessages((prev) => {
//           const existing = prev[conversationId] || [];
//           const ids = new Set(existing.map((m) => m.messageId));
//           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//           return { ...prev, [conversationId]: [...existing, ...newMessages] };
//         });
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       } finally {
//         setFetchingMessages(false);
//       }
//     };
//     fetchMessages();
//   }, [conversationId]);

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (shouldAutoScrollRef.current) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages[conversationId]]);

//   return (
//     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
//       {/* HEADER */}
//       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//         >
//           <ArrowLeft size={18} />
//         </button>
//         <div
//           onClick={() => navigate(`/profile/${otherUser.username}`)}
//           className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 ... cursor-pointer hover:opacity-80 transition-opacity duration-150"
//         >
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>
//         <div className="flex flex-col flex-1 min-w-0">
//           <h3
//             onClick={() => navigate(`/profile/${otherUser.username}`)}
//             className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
//           >
//             {otherUser.username}
//           </h3>
//           {isBlocked && (
//             <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
//               Blocked
//             </span>
//           )}
//         </div>
//         <div ref={chatOptionsRef} className="relative flex-shrink-0">
//           <button
//             onClick={handleToggleChatOptions}
//             className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
//           >
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             >
//               <circle cx="12" cy="5" r="1" />
//               <circle cx="12" cy="12" r="1" />
//               <circle cx="12" cy="19" r="1" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* MESSAGES */}
//       {fetchingMessages ? (
//         <div className="flex-1 overflow-hidden">
//           <MessageSkeleton />
//         </div>
//       ) : (
//         <div
//           ref={messagesContainerRef}
//           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//           style={{
//             overscrollBehavior: "contain",
//             WebkitOverflowScrolling: "touch",
//             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
//             background: chatTheme.bg,
//             transition: "background 0.3s ease",
//           }}
//         >
//           {hasMore && messages[conversationId]?.length > 0 && (
//             <div className="flex justify-center mb-2">
//               <button
//                 onClick={loadOlderMessages}
//                 className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
//               >
//                 {loadingMore ? "Loading..." : "Load older messages"}
//               </button>
//             </div>
//           )}

//           {(!messages[conversationId] ||
//             messages[conversationId].length === 0) && (
//             <div className="text-center text-white/60 text-sm">
//               Start a conversation with {otherUser.username}
//             </div>
//           )}

//           {(messages[conversationId] || []).map((msg) => {
//             const isMe = msg.from === myUserId;
//             return (
//               <div key={msg.messageId}>
//                 <MessageBubble
//                   msg={msg}
//                   isMe={isMe}
//                   otherUser={otherUser}
//                   user={user}
//                 />
//               </div>
//             );
//           })}

//           <div className="h-2" />
//         </div>
//       )}

//       {/* BLOCKED BANNER — replaces input when user is blocked */}
//       {isBlocked ? (
//         <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="#f87171"
//             strokeWidth="1.8"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="12" cy="12" r="10" />
//             <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//           </svg>
//           <p className="text-sm text-white/40 text-center">
//             You have blocked{" "}
//             <span className="text-white/60 font-medium">
//               {otherUser.username}
//             </span>
//             . They can no longer message you.
//           </p>
//         </div>
//       ) : (
//         /* INPUT */
//         <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
//           {showEmojiPicker && (
//             <div
//               ref={emojiPickerRef}
//               className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
//             >
//               <div className="grid grid-cols-10 gap-1">
//                 {EMOJI_LIST.map((emoji) => (
//                   <button
//                     key={emoji}
//                     onClick={() => insertEmoji(emoji)}
//                     className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
//                   >
//                     {emoji}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="flex items-end gap-2">
//             <button
//               onClick={() => setShowEmojiPicker((prev) => !prev)}
//               className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
//                 showEmojiPicker
//                   ? "bg-indigo-600 border-indigo-500 text-white"
//                   : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//               }`}
//             >
//               <Smile size={17} />
//             </button>

//             <textarea
//               ref={textareaRef}
//               rows={1}
//               value={text}
//               onChange={(e) => {
//                 setText(e.target.value);
//                 e.target.style.height = "auto";
//                 e.target.style.height =
//                   Math.min(e.target.scrollHeight, 112) + "px";
//               }}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleSend();
//                 }
//               }}
//               placeholder="Type a message..."
//               className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
//               style={{ maxHeight: "112px", fontSize: "16px" }}
//             />

//             <button
//               onClick={handleSend}
//               disabled={!text.trim()}
//               className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
//             >
//               <Send size={16} className="text-white ml-0.5" />
//             </button>
//           </div>
//         </div>
//       )}

//       {showChatOptions &&
//         createPortal(
//           <div
//             style={{
//               position: "fixed",
//               top: popupPos.top,
//               right: popupPos.right,
//               zIndex: 99999,
//             }}
//           >
//             <ChatOptionsPopup
//               onClose={() => setShowChatOptions(false)}
//               onClearChat={() => {
//                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
//                 onClearMessages?.(conversationId); // ← add this
//               }}
//               onBlock={() => setIsBlocked(true)}
//               onThemeChange={(theme) => setChatTheme(theme)}
//               currentTheme={chatTheme}
//               anchorRef={chatOptionsRef}
//               conversationId={conversationId}
//               otherUserId={receiverId}
//               isBlocked={isBlocked} // ← add this
//               onUnblock={() => setIsBlocked(false)} // ← add this
//             />
//           </div>,
//           document.body,
//         )}
//     </div>
//   );
// }

// export default ChatBox;


// import { ArrowLeft, Send, Smile } from "lucide-react";
// import { useContext, useState, useEffect, useRef, useCallback } from "react";
// import { createPortal } from "react-dom";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";
// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";
// import ChatOptionsPopup from "../ChatOptionsPopup";
// import { useNavigate } from "react-router-dom";

// const EMOJI_LIST = [
//   "😀","😂","😍","🥰","😎","🤔","😭","😡","🥺","😴",
//   "👍","👎","❤️","🔥","✨","🎉","🙏","💯","😊","🤣",
//   "😘","🥳","😤","🤯","😇","🤗","😏","🙄","😬","🤝",
//   "👀","💀","🫡","🫠","🥹","😮","😱","🤌","💪","👏",
//   "🍕","🎮","🎵","⚡","🌙","☀️","🌈","💫","🚀","🎯",
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// // MessageStatus
// // Renders the correct tick icon based on the message status string.
// //
// // Status lifecycle (MY messages):
// //   "sending"   → single grey tick   (optimistic, not yet ACK'd by server)
// //   "sent"      → single grey tick   (server stored it, recipient hasn't received yet)
// //   "delivered" → double grey ticks  (recipient's device received it)
// //   "read"      → double blue ticks  (recipient opened the chat)
// //   "blocked"   → red "Not delivered" text
// //
// // Status lifecycle (THEIR messages):
// //   "sent" / "delivered" / "read" — we don't render a tick for incoming messages
// // ─────────────────────────────────────────────────────────────────────────────
// function MessageStatus({ status }) {
//   if (status === "blocked") {
//     return <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>;
//   }

//   // Single grey tick — message is in-flight or stored but not yet delivered
//   if (status === "sending" || status === "sent") {
//     return (
//       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//         <path
//           d="M1 5l3 3 5-6"
//           stroke="rgba(255,255,255,0.35)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   }

//   // Double blue ticks — recipient has read the message
//   if (status === "read") {
//     return (
//       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
//         <path d="M1 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M6 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     );
//   }

//   // Double grey ticks — delivered but not yet read
//   if (status === "delivered") {
//     return (
//       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
//         <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M6 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     );
//   }

//   // Fallback — single grey tick (shouldn't normally be hit)
//   return (
//     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//       <path
//         d="M1 5l3 3 5-6"
//         stroke="rgba(255,255,255,0.35)"
//         strokeWidth="1.6"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function MessageSkeleton() {
//   return (
//     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//       <div className="flex items-end gap-2">
//         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
//         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
//       </div>
//       <div className="flex justify-end">
//         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // ChatBox
// // ─────────────────────────────────────────────────────────────────────────────
// function ChatBox({ chat, onBack, onNewMessage, onClearMessages }) {
//   const { user } = useAuth();

//   const [text, setText] = useState("");
//   const [cursor, setCursor] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [fetchingMessages, setFetchingMessages] = useState(true);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showChatOptions, setShowChatOptions] = useState(false);
//   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
//   const [chatTheme, setChatTheme] = useState({
//     id: "default",
//     label: "Default",
//     bg: "#0a0a0a",
//   });
//   const [isBlocked, setIsBlocked] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const navigate = useNavigate();

//   const myUserId = user._id;
//   const messagesContainerRef = useRef(null);
//   // true  → scroll to bottom on next paint (new message or initial load)
//   // false → preserve scroll position (loading older messages)
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const emojiPickerRef = useRef(null);
//   const chatOptionsRef = useRef(null);
//   // Tracks whether we have already dispatched a read-mark for this conversation
//   // to avoid duplicate PATCH calls from competing useEffects.
//   const readMarkedRef = useRef(false);

//   const conversationId = chat._id.toString();
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   const {
//     sendSignal,
//     messages,
//     setMessages,
//     markAsRead,
//     setCurrentConversation,
//   } = useContext(websocketContext);

//   if (!otherUser) return null;
//   const receiverId = otherUser._id;

//   // ── Block status ────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!receiverId) return;
//     let cancelled = false;
//     const checkBlockStatus = async () => {
//       try {
//         const res = await fetchData(`/api/users/${receiverId}/block-status`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (!cancelled) setIsBlocked(data.isBlocked);
//       } catch (err) {
//         console.error("Failed to fetch block status", err);
//       }
//     };
//     checkBlockStatus();
//     return () => { cancelled = true; };
//   }, [receiverId]);

//   // ── Register current conversation with WS context ───────────────────────
//   useEffect(() => {
//     setCurrentConversation(conversationId);
//     return () => setCurrentConversation(null);
//   }, [conversationId, setCurrentConversation]);

//   // ── Reset all local state when switching conversations ──────────────────
//   useEffect(() => {
//     setHasMore(true);
//     setCursor(null);
//     setFetchingMessages(true);
//     setShowEmojiPicker(false);
//     setShowChatOptions(false);
//     setIsBlocked(false);
//     readMarkedRef.current = false;
//     shouldAutoScrollRef.current = true;
//   }, [conversationId]);

//   // ── Mark messages as read (single, deduplicated call per conversation) ──
//   //
//   // FIX: Previously there were TWO competing useEffects both calling markAsRead
//   // and the PATCH endpoint — one watching [conversationId] and one watching
//   // [messages[conversationId]]. This caused duplicate network requests and
//   // race conditions. Now we have ONE effect that fires when the conversation
//   // changes OR when new messages arrive, but only sends the network call once
//   // per conversation session via readMarkedRef.
//   const doMarkRead = useCallback(() => {
//     const convMessages = messages[conversationId] || [];
//     const hasUnread = convMessages.some(
//       (msg) => msg.from !== myUserId && msg.status !== "read",
//     );
//     if (!hasUnread) return;

//     // Optimistically flip statuses in state
//     setMessages((prev) => {
//       const existing = prev[conversationId] || [];
//       return {
//         ...prev,
//         [conversationId]: existing.map((msg) =>
//           msg.from !== myUserId && msg.status !== "read"
//             ? { ...msg, status: "read" }
//             : msg,
//         ),
//       };
//     });

//     markAsRead(conversationId);

//     if (!readMarkedRef.current) {
//       readMarkedRef.current = true;
//       fetchData(`/api/chat/conversations/${conversationId}/read`, {
//         method: "PATCH",
//         credentials: "include",
//       }).catch(() => {});
//     }
//   }, [conversationId, messages, myUserId, markAsRead, setMessages]);

//   // Fire on mount (conversation open) and whenever new messages land
//   useEffect(() => {
//     doMarkRead();
//     // Re-arm for the next batch of incoming messages
//     readMarkedRef.current = false;
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [conversationId, messages[conversationId]?.length]);

//   // ── Emoji picker close on outside click ────────────────────────────────
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
//         setShowEmojiPicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ── Chat options toggle ─────────────────────────────────────────────────
//   const handleToggleChatOptions = () => {
//     if (!showChatOptions && chatOptionsRef.current) {
//       const rect = chatOptionsRef.current.getBoundingClientRect();
//       setPopupPos({
//         top: rect.bottom + 6,
//         right: window.innerWidth - rect.right,
//       });
//     }
//     setShowChatOptions((v) => !v);
//   };

//   // ── Emoji insertion ─────────────────────────────────────────────────────
//   const insertEmoji = (emoji) => {
//     const ta = textareaRef.current;
//     if (!ta) {
//       setText((prev) => prev + emoji);
//       return;
//     }
//     const start = ta.selectionStart;
//     const end = ta.selectionEnd;
//     const newText = text.slice(0, start) + emoji + text.slice(end);
//     setText(newText);
//     requestAnimationFrame(() => {
//       ta.focus();
//       ta.selectionStart = start + emoji.length;
//       ta.selectionEnd = start + emoji.length;
//       ta.style.height = "auto";
//       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
//     });
//   };

//   // ── Send ────────────────────────────────────────────────────────────────
//   const handleSend = async () => {
//     if (!text.trim() || isBlocked) return;
//     const messageId = uuidv4();
//     const createdAt = Date.now();
//     const messageText = text;

//     // Optimistic message — starts as "sending"
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
//             text: messageText,
//             status: "sending",
//             createdAt,
//           },
//         ],
//       };
//     });

//     // Tell the WS context to emit the signal. Your WebSocket context should
//     // listen for an ACK from the server and call something like:
//     //
//     //   setMessages(prev => ({
//     //     ...prev,
//     //     [conversationId]: prev[conversationId].map(m =>
//     //       m.messageId === ack.messageId ? { ...m, status: "sent" } : m
//     //     )
//     //   }));
//     //
//     // That transitions "sending" → "sent" (single tick).
//     // The server then pushes "delivered" and "read" updates through the socket.
//     sendSignal({
//       type: "chat_message",
//       messageId,
//       conversationId,
//       to: receiverId,
//       text: messageText,
//       createdAt,
//     });

//     onNewMessage?.(conversationId, messageText);
//     setText("");
//     setShowEmojiPicker(false);
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }
//     // Ensure we scroll to the bottom for our own sent message
//     shouldAutoScrollRef.current = true;
//   };

//   // ── Load older messages ─────────────────────────────────────────────────
//   const loadOlderMessages = async () => {
//     if (!cursor || loadingMore) return;
//     setLoadingMore(true);
//     const el = messagesContainerRef.current;
//     const scrollHeightBefore = el ? el.scrollHeight : 0;
//     try {
//       const res = await fetchData(
//         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
//         { credentials: "include" },
//       );
//       const data = await res.json();
//       const messagesArray = Array.isArray(data) ? data : data.messages || [];
//       if (messagesArray.length < 50) setHasMore(false);
//       const formatted = messagesArray.map((msg) => ({
//         messageId: msg.messageId,
//         conversationId,
//         from: msg.senderId,
//         to: msg.receiverId,
//         text: msg.text,
//         status: msg.status || "sent",
//         createdAt: new Date(msg.createdAt).getTime(),
//       }));
//       // Do NOT auto-scroll — we want the viewport to stay where it was
//       shouldAutoScrollRef.current = false;
//       setMessages((prev) => {
//         const existing = prev[conversationId] || [];
//         const ids = new Set(existing.map((m) => m.messageId));
//         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//         return { ...prev, [conversationId]: [...newMessages, ...existing] };
//       });
//       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//       // Restore the scroll position after prepend
//       setTimeout(() => {
//         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
//       }, 50);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   };

//   // ── Track whether user is near the bottom ─────────────────────────────
//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const handleScroll = () => {
//       const threshold = 150;
//       shouldAutoScrollRef.current =
//         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//     };
//     el.addEventListener("scroll", handleScroll, { passive: true });
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ── Initial message fetch ───────────────────────────────────────────────
//   useEffect(() => {
//     if (!conversationId) return;
//     let cancelled = false;
//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const messagesArray = Array.isArray(data) ? data : data.messages || [];
//         if (messagesArray.length < 50) setHasMore(false);
//         const formatted = messagesArray.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
//         if (!cancelled) {
//           setMessages((prev) => {
//             const existing = prev[conversationId] || [];
//             const ids = new Set(existing.map((m) => m.messageId));
//             const newMessages = formatted.filter((m) => !ids.has(m.messageId));
//             return { ...prev, [conversationId]: [...existing, ...newMessages] };
//           });
//         }
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       } finally {
//         if (!cancelled) setFetchingMessages(false);
//       }
//     };
//     fetchMessages();
//     return () => { cancelled = true; };
//   }, [conversationId]);

//   // ── Auto-scroll to bottom when messages update ─────────────────────────
//   //
//   // FIX: The original code did `el.scrollTop = el.scrollHeight` synchronously
//   // after setMessages, i.e. before the DOM had repainted. The new message
//   // bubble hadn't been rendered yet so scrollHeight was stale, causing the
//   // list to scroll short by exactly one message height. We now defer to
//   // requestAnimationFrame so the browser has committed the paint first.
//   const convMessages = messages[conversationId];
//   useEffect(() => {
//     if (!shouldAutoScrollRef.current) return;
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     requestAnimationFrame(() => {
//       el.scrollTop = el.scrollHeight;
//     });
//   }, [convMessages]);

//   // ── Render ─────────────────────────────────────────────────────────────
//   return (
//     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
//       {/* HEADER */}
//       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//         >
//           <ArrowLeft size={18} />
//         </button>
//         <div
//           onClick={() => navigate(`/profile/${otherUser.username}`)}
//           className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 cursor-pointer hover:opacity-80 transition-opacity duration-150 flex items-center justify-center"
//         >
//           {otherUser.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </span>
//           )}
//         </div>
//         <div className="flex flex-col flex-1 min-w-0">
//           <h3
//             onClick={() => navigate(`/profile/${otherUser.username}`)}
//             className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
//           >
//             {otherUser.username}
//           </h3>
//           {isBlocked && (
//             <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
//               Blocked
//             </span>
//           )}
//         </div>
//         <div ref={chatOptionsRef} className="relative flex-shrink-0">
//           <button
//             onClick={handleToggleChatOptions}
//             className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
//           >
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             >
//               <circle cx="12" cy="5" r="1" />
//               <circle cx="12" cy="12" r="1" />
//               <circle cx="12" cy="19" r="1" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* MESSAGES */}
//       {fetchingMessages ? (
//         <div className="flex-1 overflow-hidden">
//           <MessageSkeleton />
//         </div>
//       ) : (
//         <div
//           ref={messagesContainerRef}
//           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//           style={{
//             overscrollBehavior: "contain",
//             WebkitOverflowScrolling: "touch",
//             background: chatTheme.bg,
//             transition: "background 0.3s ease",
//           }}
//         >
//           {hasMore && messages[conversationId]?.length > 0 && (
//             <div className="flex justify-center mb-2">
//               <button
//                 onClick={loadOlderMessages}
//                 disabled={loadingMore}
//                 className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide disabled:opacity-50"
//               >
//                 {loadingMore ? "Loading…" : "Load older messages"}
//               </button>
//             </div>
//           )}

//           {(!messages[conversationId] ||
//             messages[conversationId].length === 0) && (
//             <div className="text-center text-white/60 text-sm">
//               Start a conversation with {otherUser.username}
//             </div>
//           )}

//           {(messages[conversationId] || []).map((msg) => {
//             const isMe = msg.from === myUserId;
//             return (
//               <div key={msg.messageId}>
//                 <MessageBubble
//                   msg={msg}
//                   isMe={isMe}
//                   otherUser={otherUser}
//                   user={user}
//                   // Pass MessageStatus so MessageBubble can render ticks inline
//                   StatusComponent={isMe ? MessageStatus : null}
//                 />
//               </div>
//             );
//           })}

//           <div className="h-2" />
//         </div>
//       )}

//       {/* BLOCKED BANNER */}
//       {isBlocked ? (
//         <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="#f87171"
//             strokeWidth="1.8"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="12" cy="12" r="10" />
//             <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//           </svg>
//           <p className="text-sm text-white/40 text-center">
//             You have blocked{" "}
//             <span className="text-white/60 font-medium">
//               {otherUser.username}
//             </span>
//             . They can no longer message you.
//           </p>
//         </div>
//       ) : (
//         /* INPUT */
//         <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
//           {showEmojiPicker && (
//             <div
//               ref={emojiPickerRef}
//               className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
//             >
//               <div className="grid grid-cols-10 gap-1">
//                 {EMOJI_LIST.map((emoji) => (
//                   <button
//                     key={emoji}
//                     onClick={() => insertEmoji(emoji)}
//                     className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
//                   >
//                     {emoji}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="flex items-end gap-2">
//             <button
//               onClick={() => setShowEmojiPicker((prev) => !prev)}
//               className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
//                 showEmojiPicker
//                   ? "bg-indigo-600 border-indigo-500 text-white"
//                   : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//               }`}
//             >
//               <Smile size={17} />
//             </button>

//             <textarea
//               ref={textareaRef}
//               rows={1}
//               value={text}
//               onChange={(e) => {
//                 setText(e.target.value);
//                 e.target.style.height = "auto";
//                 e.target.style.height =
//                   Math.min(e.target.scrollHeight, 112) + "px";
//               }}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleSend();
//                 }
//               }}
//               placeholder="Type a message…"
//               className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
//               style={{ maxHeight: "112px", fontSize: "16px" }}
//             />

//             <button
//               onClick={handleSend}
//               disabled={!text.trim()}
//               className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
//             >
//               <Send size={16} className="text-white ml-0.5" />
//             </button>
//           </div>
//         </div>
//       )}

//       {showChatOptions &&
//         createPortal(
//           <div
//             style={{
//               position: "fixed",
//               top: popupPos.top,
//               right: popupPos.right,
//               zIndex: 99999,
//             }}
//           >
//             <ChatOptionsPopup
//               onClose={() => setShowChatOptions(false)}
//               onClearChat={() => {
//                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
//                 onClearMessages?.(conversationId);
//               }}
//               onBlock={() => setIsBlocked(true)}
//               onThemeChange={(theme) => setChatTheme(theme)}
//               currentTheme={chatTheme}
//               anchorRef={chatOptionsRef}
//               conversationId={conversationId}
//               otherUserId={receiverId}
//               isBlocked={isBlocked}
//               onUnblock={() => setIsBlocked(false)}
//             />
//           </div>,
//           document.body,
//         )}
//     </div>
//   );
// }

// export default ChatBox;

// // ─────────────────────────────────────────────────────────────────────────────
// // WEBSOCKET CONTEXT — what the server ACK handler should look like
// // (add this to your websocketContext provider, not in this file)
// // ─────────────────────────────────────────────────────────────────────────────
// //
// // ws.onmessage = (event) => {
// //   const signal = JSON.parse(event.data);
// //
// //   // Server ACK: message stored → "sending" → "sent" (single grey tick)
// //   if (signal.type === "message_ack") {
// //     setMessages(prev => ({
// //       ...prev,
// //       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
// //         m.messageId === signal.messageId ? { ...m, status: "sent" } : m
// //       ),
// //     }));
// //   }
// //
// //   // Recipient's device received it → "sent" → "delivered" (double grey ticks)
// //   if (signal.type === "message_delivered") {
// //     setMessages(prev => ({
// //       ...prev,
// //       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
// //         m.messageId === signal.messageId ? { ...m, status: "delivered" } : m
// //       ),
// //     }));
// //   }
// //
// //   // Recipient opened the chat → "delivered" → "read" (double blue ticks)
// //   if (signal.type === "message_read") {
// //     setMessages(prev => ({
// //       ...prev,
// //       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
// //         m.conversationId === signal.conversationId && m.status !== "read"
// //           ? { ...m, status: "read" }
// //           : m
// //       ),
// //     }));
// //   }
// // };


import { ArrowLeft, Send, Smile } from "lucide-react";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { websocketContext } from "../../context/WebSocket";
import { useAuth } from "../../hooks/useAuth";
import fetchData from "../../utils/fetchData";
import MessageBubble from "../MessageBubble";
import ChatOptionsPopup from "../ChatOptionsPopup";
import { useNavigate } from "react-router-dom";

const EMOJI_LIST = [
  "😀","😂","😍","🥰","😎","🤔","😭","😡","🥺","😴",
  "👍","👎","❤️","🔥","✨","🎉","🙏","💯","😊","🤣",
  "😘","🥳","😤","🤯","😇","🤗","😏","🙄","😬","🤝",
  "👀","💀","🫡","🫠","🥹","😮","😱","🤌","💪","👏",
  "🍕","🎮","🎵","⚡","🌙","☀️","🌈","💫","🚀","🎯",
];

// ─────────────────────────────────────────────────────────────────────────────
// MessageStatus
// Renders the correct tick icon based on the message status string.
//
// Status lifecycle (MY messages):
//   "sending"   → single grey tick   (optimistic, not yet ACK'd by server)
//   "sent"      → single grey tick   (server stored it, recipient hasn't received yet)
//   "delivered" → double grey ticks  (recipient's device received it)
//   "read"      → double blue ticks  (recipient opened the chat)
//   "blocked"   → red "Not delivered" text
//
// Status lifecycle (THEIR messages):
//   "sent" / "delivered" / "read" — we don't render a tick for incoming messages
// ─────────────────────────────────────────────────────────────────────────────
function MessageStatus({ status }) {
  if (status === "blocked") {
    return <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>;
  }

  // Single grey tick — message is in-flight or stored but not yet delivered
  if (status === "sending" || status === "sent") {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M1 5l3 3 5-6"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Double blue ticks — recipient has read the message
  if (status === "read") {
    return (
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
        <path d="M1 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Double grey ticks — delivered but not yet read
  if (status === "delivered") {
    return (
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
        <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Fallback — single grey tick (shouldn't normally be hit)
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M1 5l3 3 5-6"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageSkeleton() {
  return (
    <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
      <div className="flex items-end gap-2">
        <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
        <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
      </div>
      <div className="flex justify-end">
        <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
      </div>
      <div className="flex items-end gap-2">
        <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
        <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
      </div>
      <div className="flex justify-end">
        <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
      </div>
      <div className="flex items-end gap-2">
        <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
        <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
      </div>
      <div className="flex justify-end">
        <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
      </div>
      <div className="flex items-end gap-2">
        <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
        <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
      </div>
      <div className="flex justify-end">
        <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ChatBox
// ─────────────────────────────────────────────────────────────────────────────
function ChatBox({ chat, onBack, onNewMessage, onClearMessages }) {
  const { user } = useAuth();

  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fetchingMessages, setFetchingMessages] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
  const [chatTheme, setChatTheme] = useState({
    id: "default",
    label: "Default",
    bg: "#0a0a0a",
  });
  const [isBlocked, setIsBlocked] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const myUserId = user._id;
  const messagesContainerRef = useRef(null);
  // true  → scroll to bottom on next paint (new message or initial load)
  // false → preserve scroll position (loading older messages)
  const shouldAutoScrollRef = useRef(true);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const chatOptionsRef = useRef(null);
  // Tracks whether we have already dispatched a read-mark for this conversation
  // to avoid duplicate PATCH calls from competing useEffects.
  const readMarkedRef = useRef(false);

  const conversationId = chat._id.toString();
  const otherUser = chat.participants?.find((p) => p._id !== myUserId);

  const {
    sendSignal,
    messages,
    setMessages,
    markAsRead,
    setCurrentConversation,
  } = useContext(websocketContext);

  if (!otherUser) return null;
  const receiverId = otherUser._id;

  // ── Block status ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!receiverId) return;
    let cancelled = false;
    const checkBlockStatus = async () => {
      try {
        const res = await fetchData(`/api/users/${receiverId}/block-status`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!cancelled) setIsBlocked(data.isBlocked);
      } catch (err) {
        console.error("Failed to fetch block status", err);
      }
    };
    checkBlockStatus();
    return () => { cancelled = true; };
  }, [receiverId]);

  // ── Register current conversation with WS context ───────────────────────
  useEffect(() => {
    setCurrentConversation(conversationId);
    return () => setCurrentConversation(null);
  }, [conversationId, setCurrentConversation]);

  // ── Reset all local state when switching conversations ──────────────────
  useEffect(() => {
    setHasMore(true);
    setCursor(null);
    setFetchingMessages(true);
    setShowEmojiPicker(false);
    setShowChatOptions(false);
    setIsBlocked(false);
    readMarkedRef.current = false;
    shouldAutoScrollRef.current = true;
  }, [conversationId]);

  // ── Mark messages as read (single, deduplicated call per conversation) ──
  //
  // FIX: Previously there were TWO competing useEffects both calling markAsRead
  // and the PATCH endpoint — one watching [conversationId] and one watching
  // [messages[conversationId]]. This caused duplicate network requests and
  // race conditions. Now we have ONE effect that fires when the conversation
  // changes OR when new messages arrive, but only sends the network call once
  // per conversation session via readMarkedRef.
  const doMarkRead = useCallback(() => {
    const convMessages = messages[conversationId] || [];
    const hasUnread = convMessages.some(
      (msg) => msg.from !== myUserId && msg.status !== "read",
    );
    if (!hasUnread) return;

    // Optimistically flip statuses in state
    setMessages((prev) => {
      const existing = prev[conversationId] || [];
      return {
        ...prev,
        [conversationId]: existing.map((msg) =>
          msg.from !== myUserId && msg.status !== "read"
            ? { ...msg, status: "read" }
            : msg,
        ),
      };
    });

    markAsRead(conversationId);

    if (!readMarkedRef.current) {
      readMarkedRef.current = true;
      fetchData(`/api/chat/conversations/${conversationId}/read`, {
        method: "PATCH",
        credentials: "include",
      }).catch(() => {});
    }
  }, [conversationId, messages, myUserId, markAsRead, setMessages]);

  // Fire on mount (conversation open) and whenever new messages land
  useEffect(() => {
    doMarkRead();
    // Re-arm for the next batch of incoming messages
    readMarkedRef.current = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, messages[conversationId]?.length]);

  // ── Emoji picker close on outside click ────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Chat options toggle ─────────────────────────────────────────────────
  const handleToggleChatOptions = () => {
    if (!showChatOptions && chatOptionsRef.current) {
      const rect = chatOptionsRef.current.getBoundingClientRect();
      setPopupPos({
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      });
    }
    setShowChatOptions((v) => !v);
  };

  // ── Emoji insertion ─────────────────────────────────────────────────────
  const insertEmoji = (emoji) => {
    const ta = textareaRef.current;
    if (!ta) {
      setText((prev) => prev + emoji);
      return;
    }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const newText = text.slice(0, start) + emoji + text.slice(end);
    setText(newText);
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = start + emoji.length;
      ta.selectionEnd = start + emoji.length;
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
    });
  };

  // ── Send ────────────────────────────────────────────────────────────────
  const handleSend = async () => {
    if (!text.trim() || isBlocked) return;
    const messageId = uuidv4();
    const createdAt = Date.now();
    const messageText = text;

    // Optimistic message — starts as "sending"
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
            text: messageText,
            status: "sending",
            createdAt,
          },
        ],
      };
    });

    // Tell the WS context to emit the signal. Your WebSocket context should
    // listen for an ACK from the server and call something like:
    //
    //   setMessages(prev => ({
    //     ...prev,
    //     [conversationId]: prev[conversationId].map(m =>
    //       m.messageId === ack.messageId ? { ...m, status: "sent" } : m
    //     )
    //   }));
    //
    // That transitions "sending" → "sent" (single tick).
    // The server then pushes "delivered" and "read" updates through the socket.
    sendSignal({
      type: "chat_message",
      messageId,
      conversationId,
      to: receiverId,
      text: messageText,
      createdAt,
    });

    onNewMessage?.(conversationId, messageText);
    setText("");
    setShowEmojiPicker(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    // Ensure we scroll to the bottom for our own sent message
    shouldAutoScrollRef.current = true;
  };

  // ── Load older messages ─────────────────────────────────────────────────
  const loadOlderMessages = async () => {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    const el = messagesContainerRef.current;
    const scrollHeightBefore = el ? el.scrollHeight : 0;
    try {
      const res = await fetchData(
        `/api/chat/messages/${conversationId}?cursor=${cursor}`,
        { credentials: "include" },
      );
      const data = await res.json();
      const messagesArray = Array.isArray(data) ? data : data.messages || [];
      if (messagesArray.length < 50) setHasMore(false);
      const formatted = messagesArray.map((msg) => ({
        messageId: msg.messageId,
        conversationId,
        from: msg.senderId,
        to: msg.receiverId,
        text: msg.text,
        status: msg.status || "sent",
        createdAt: new Date(msg.createdAt).getTime(),
      }));
      // Do NOT auto-scroll — we want the viewport to stay where it was
      shouldAutoScrollRef.current = false;
      setMessages((prev) => {
        const existing = prev[conversationId] || [];
        const ids = new Set(existing.map((m) => m.messageId));
        const newMessages = formatted.filter((m) => !ids.has(m.messageId));
        return { ...prev, [conversationId]: [...newMessages, ...existing] };
      });
      if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
      // Restore the scroll position after prepend
      setTimeout(() => {
        if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
      }, 50);
    } catch (err) {
      console.error("Failed loading older messages", err);
    }
    setLoadingMore(false);
  };

  // ── Track whether user is near the bottom ─────────────────────────────
  // Updates shouldAutoScrollRef on every scroll event so we always know
  // whether the user is near the bottom before deciding to auto-scroll.
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const threshold = 150;
      shouldAutoScrollRef.current =
        el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Scroll to bottom helper ────────────────────────────────────────────
  // Deferred to rAF so the DOM has committed the new bubble before we
  // measure scrollHeight. Called from two places:
  //   1. After initial/conversation-switch fetch completes (always scroll)
  //   2. After a new message is added (only scroll if near bottom)
  const scrollToBottom = useCallback((force = false) => {
    const el = messagesContainerRef.current;
    if (!el) return;
    if (!force && !shouldAutoScrollRef.current) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, []);

  // ── Initial message fetch ───────────────────────────────────────────────
  // FIX (open conversation): After fetch completes we force-scroll to the
  // bottom regardless of shouldAutoScrollRef. This covers two cases:
  //   a) Fresh conversation — no messages in cache yet, obvious need to scroll.
  //   b) Cached conversation (already in WS messages map) — the convMessageCount
  //      effect below won't fire because the count hasn't changed, so without
  //      this force-scroll the list stays wherever it was from the last visit.
  useEffect(() => {
    if (!conversationId) return;
    let cancelled = false;
    const fetchMessages = async () => {
      try {
        const res = await fetchData(`/api/chat/messages/${conversationId}`, {
          credentials: "include",
        });
        const data = await res.json();
        const messagesArray = Array.isArray(data) ? data : data.messages || [];
        if (messagesArray.length < 50) setHasMore(false);
        const formatted = messagesArray.map((msg) => ({
          messageId: msg.messageId,
          conversationId,
          from: msg.senderId,
          to: msg.receiverId,
          text: msg.text,
          status: msg.status || "sent",
          createdAt: new Date(msg.createdAt).getTime(),
        }));
        if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
        if (!cancelled) {
          setMessages((prev) => {
            const existing = prev[conversationId] || [];
            const ids = new Set(existing.map((m) => m.messageId));
            const newMessages = formatted.filter((m) => !ids.has(m.messageId));
            return { ...prev, [conversationId]: [...existing, ...newMessages] };
          });
          // Force scroll after paint — covers both fresh and cached conversations
          requestAnimationFrame(() => {
            const el = messagesContainerRef.current;
            if (el) el.scrollTop = el.scrollHeight;
          });
        }
      } catch (err) {
        console.error("Failed to fetch messages", err);
      } finally {
        if (!cancelled) setFetchingMessages(false);
      }
    };
    fetchMessages();
    return () => { cancelled = true; };
  }, [conversationId]);

  // ── Auto-scroll when a new message arrives ────────────────────────────
  //
  // Depends on message COUNT not the array reference. The array is recreated
  // on every setMessages call including status-only updates ("sending"→"sent"),
  // which would scroll the user back to the bottom mid-history-read.
  //
  // Behaviour:
  //   - User is near the bottom (within 150px) → scroll down. They're clearly
  //     following the conversation actively.
  //   - User scrolled up to read history → don't scroll. They are reading
  //     something. This matches WhatsApp/Telegram/Instagram behaviour.
  const convMessageCount = messages[conversationId]?.length ?? 0;
  useEffect(() => {
    scrollToBottom(false); // respects shouldAutoScrollRef
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convMessageCount]);

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
      {/* HEADER */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
        >
          <ArrowLeft size={18} />
        </button>
        <div
          onClick={() => navigate(`/profile/${otherUser.username}`)}
          className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 cursor-pointer hover:opacity-80 transition-opacity duration-150 flex items-center justify-center"
        >
          {otherUser.profilePicture ? (
            <img
              src={otherUser.profilePicture}
              alt={otherUser.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-white">
              {otherUser.username?.[0]?.toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <h3
            onClick={() => navigate(`/profile/${otherUser.username}`)}
            className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
          >
            {otherUser.username}
          </h3>
          {isBlocked && (
            <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
              Blocked
            </span>
          )}
        </div>
        <div ref={chatOptionsRef} className="relative flex-shrink-0">
          <button
            onClick={handleToggleChatOptions}
            className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* MESSAGES */}
      {fetchingMessages ? (
        <div className="flex-1 overflow-hidden">
          <MessageSkeleton />
        </div>
      ) : (
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
          style={{
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            background: chatTheme.bg,
            transition: "background 0.3s ease",
            // No animation here — applying fadeInUp on the scroll container
            // re-triggers on every state change, causing the entire message
            // list to flash/fade whenever anything updates.
          }}
        >
          {hasMore && messages[conversationId]?.length > 0 && (
            <div className="flex justify-center mb-2">
              <button
                onClick={loadOlderMessages}
                disabled={loadingMore}
                className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide disabled:opacity-50"
              >
                {loadingMore ? "Loading…" : "Load older messages"}
              </button>
            </div>
          )}

          {(!messages[conversationId] ||
            messages[conversationId].length === 0) && (
            <div className="text-center text-white/60 text-sm">
              Start a conversation with {otherUser.username}
            </div>
          )}

          {(messages[conversationId] || []).map((msg) => (
            <MessageBubble
              key={msg.messageId}
              msg={msg}
              isMe={msg.from === myUserId}
              otherUser={otherUser}
              user={user}
            />
          ))}

          <div className="h-2" />
        </div>
      )}

      {/* BLOCKED BANNER */}
      {isBlocked ? (
        <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f87171"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
          <p className="text-sm text-white/40 text-center">
            You have blocked{" "}
            <span className="text-white/60 font-medium">
              {otherUser.username}
            </span>
            . They can no longer message you.
          </p>
        </div>
      ) : (
        /* INPUT */
        <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
            >
              <div className="grid grid-cols-10 gap-1">
                {EMOJI_LIST.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => insertEmoji(emoji)}
                    className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-end gap-2">
            <button
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
                showEmojiPicker
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
              }`}
            >
              <Smile size={17} />
            </button>

            <textarea
              ref={textareaRef}
              rows={1}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 112) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type a message…"
              className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
              style={{ maxHeight: "112px", fontSize: "16px" }}
            />

            <button
              onClick={handleSend}
              disabled={!text.trim()}
              className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send size={16} className="text-white ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {showChatOptions &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: popupPos.top,
              right: popupPos.right,
              zIndex: 99999,
            }}
          >
            <ChatOptionsPopup
              onClose={() => setShowChatOptions(false)}
              onClearChat={() => {
                setMessages((prev) => ({ ...prev, [conversationId]: [] }));
                onClearMessages?.(conversationId);
              }}
              onBlock={() => setIsBlocked(true)}
              onThemeChange={(theme) => setChatTheme(theme)}
              currentTheme={chatTheme}
              anchorRef={chatOptionsRef}
              conversationId={conversationId}
              otherUserId={receiverId}
              isBlocked={isBlocked}
              onUnblock={() => setIsBlocked(false)}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}

export default ChatBox;

// ─────────────────────────────────────────────────────────────────────────────
// WEBSOCKET CONTEXT — what the server ACK handler should look like
// (add this to your websocketContext provider, not in this file)
// ─────────────────────────────────────────────────────────────────────────────
//
// ws.onmessage = (event) => {
//   const signal = JSON.parse(event.data);
//
//   // Server ACK: message stored → "sending" → "sent" (single grey tick)
//   if (signal.type === "message_ack") {
//     setMessages(prev => ({
//       ...prev,
//       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
//         m.messageId === signal.messageId ? { ...m, status: "sent" } : m
//       ),
//     }));
//   }
//
//   // Recipient's device received it → "sent" → "delivered" (double grey ticks)
//   if (signal.type === "message_delivered") {
//     setMessages(prev => ({
//       ...prev,
//       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
//         m.messageId === signal.messageId ? { ...m, status: "delivered" } : m
//       ),
//     }));
//   }
//
//   // Recipient opened the chat → "delivered" → "read" (double blue ticks)
//   if (signal.type === "message_read") {
//     setMessages(prev => ({
//       ...prev,
//       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
//         m.conversationId === signal.conversationId && m.status !== "read"
//           ? { ...m, status: "read" }
//           : m
//       ),
//     }));
//   }
// };