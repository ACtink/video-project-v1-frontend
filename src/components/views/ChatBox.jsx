// // // import { ArrowLeft } from "lucide-react";
// // // import { useContext, useState, useMemo, useEffect } from "react";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";

// // // import { getChatMessages } from "../../utils/getMessages";
// // // import { saveMessage } from "../../utils/saveMessage";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";

// // // const normalizeMessageId = (m) => m.messageId;

// // // function ChatBox({ chat, onBack }) {
// // //   const { user } = useAuth();

// // //   const { sendSignal, messages, setMessages } = useContext(websocketContext);

// // //   const [text, setText] = useState("");

// // //   const myUserId = user._id;

// // //   // console.log("user from auth", user);

// // //   // ✅ FIX: Always use string
// // //   const conversationId = chat._id.toString();

// // //   // ✅ Safe find
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   // ✅ Guard (prevents crash)
// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;

// // //     const messageId = uuidv4();

// // //     const createdAt = Date.now();

// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];

// // //       return {
// // //         ...prev,

// // //         [conversationId]: [
// // //           ...existing,

// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });

// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text,
// // //       createdAt,
// // //     });

// // //     setText("");
// // //   };

// // //   useEffect(() => {
// // //     if (!conversationId) return;

// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });

// // //         const data = await res.json();

// // //         console.log("Fetched messages from backend:", data);

// // //         // ✅ VERY IMPORTANT: ensure it's array
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];

// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,

// // //           // ✅ ALWAYS use current conversationId (simple and safe)
// // //           conversationId: conversationId,

// // //           from: msg.senderId,

// // //           to: msg.receiverId,

// // //           text: msg.text,

// // //           status: msg.status || "sent",

// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));

// // //         // ✅ simple merge (no duplicates)
// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];

// // //           const ids = new Set(existing.map((m) => m.messageId));

// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));

// // //           return {
// // //             ...prev,

// // //             [conversationId]: [...existing, ...newMessages],
// // //           };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       }
// // //     };

// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   /* ===============================
// // //      UI
// // //   =============================== */

// // //   return (
// // //     <div className="flex flex-col h-full w-full">
// // //       {/* HEADER */}

// // //       <div className="px-4 py-4 border-b border-white/20 flex items-center gap-3 text-white">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-lg hover:bg-white/20 transition"
// // //         >
// // //           <ArrowLeft size={20} />
// // //         </button>

// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>

// // //         <h3 className="font-semibold text-lg">{otherUser.username}</h3>
// // //       </div>

// // //       {/* MESSAGES */}

// // //       <div className="flex-1 w-screen sm:w-full overflow-y-auto px-4 py-4 space-y-3">
// // //         {(!messages[conversationId] ||
// // //           messages[conversationId].length === 0) && (
// // //           <div className="text-center text-white/60 text-sm">
// // //             Start a conversation with {otherUser.username}
// // //           </div>
// // //         )}

// // //         {(messages[conversationId] || []).map((msg) => {
// // //           const isMe = msg.from === myUserId;

// // //           return (
// // //             <MessageBubble
// // //               key={msg.messageId}
// // //               msg={msg}
// // //               isMe={isMe}
// // //               otherUser={otherUser}
// // //               user={user}
// // //             />
// // //           );
// // //         })}
// // //       </div>

// // //       {/* INPUT */}

// // //       <div className="px-4 py-4 border-t border-white/20 mb-5">
// // //         <div className="flex gap-3">
// // //           <input
// // //             type="text"
// // //             value={text}
// // //             onChange={(e) => setText(e.target.value)}
// // //             onKeyDown={(e) => e.key === "Enter" && handleSend()}
// // //             placeholder="Type a message..."
// // //             className="flex-1 px-4 py-3 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //           />

// // //           <button
// // //             onClick={handleSend}
// // //             className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
// // //           >
// // //             Send
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft } from "lucide-react";
// // // import { useContext, useState, useMemo, useEffect, useRef } from "react";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";

// // // import { getChatMessages } from "../../utils/getMessages";
// // // import { saveMessage } from "../../utils/saveMessage";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";

// // // const normalizeMessageId = (m) => m.messageId;

// // // function ChatBox({ chat, onBack }) {
// // //   const { user } = useAuth();

// // //   const { sendSignal, messages, setMessages } = useContext(websocketContext);

// // //   const [text, setText] = useState("");

// // //   const messagesRef = useRef(null);
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);

// // //   const myUserId = user._id;

// // //   const conversationId = chat._id.toString();

// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;

// // //     const messageId = uuidv4();

// // //     const createdAt = Date.now();

// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];

// // //       return {
// // //         ...prev,

// // //         [conversationId]: [
// // //           ...existing,

// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });

// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text,
// // //       createdAt,
// // //     });

// // //     setText("");
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;

// // //     setLoadingMore(true);

// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );

// // //       const data = await res.json();

// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];

// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));

// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];

// // //         const ids = new Set(existing.map((m) => m.messageId));

// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));

// // //         return {
// // //           ...prev,
// // //           [conversationId]: [...newMessages, ...existing],
// // //         };
// // //       });

// // //       if (messagesArray.length > 0) {
// // //         setCursor(messagesArray[0].createdAt);
// // //       }
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }

// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //     if (!conversationId) return;

// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });

// // //         const data = await res.json();

// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];

// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId: conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));

// // //         if (messagesArray.length > 0) {
// // //           setCursor(messagesArray[0].createdAt);
// // //         }

// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];

// // //           const ids = new Set(existing.map((m) => m.messageId));

// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));

// // //           return {
// // //             ...prev,
// // //             [conversationId]: [...existing, ...newMessages],
// // //           };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       }
// // //     };

// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const el = messagesRef.current;

// // //     if (!el) return;

// // //     const handleScroll = () => {
// // //       if (el.scrollTop === 0) {
// // //         loadOlderMessages();
// // //       }
// // //     };

// // //     el.addEventListener("scroll", handleScroll);

// // //     return () => {
// // //       el.removeEventListener("scroll", handleScroll);
// // //     };
// // //   }, [cursor]);

// // //   return (
// // //     <div className="flex flex-col h-full w-full">
// // //       {/* HEADER */}

// // //       <div className="px-4 py-4 border-b border-white/20 flex items-center gap-3 text-white">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-lg hover:bg-white/20 transition"
// // //         >
// // //           <ArrowLeft size={20} />
// // //         </button>

// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>

// // //         <h3 className="font-semibold text-lg">{otherUser.username}</h3>
// // //       </div>

// // //       {/* MESSAGES */}

// // //       <div
// // //         ref={messagesRef}
// // //         className="flex-1 w-screen sm:w-full overflow-y-auto px-4 py-4 space-y-3"
// // //       >
// // //         {(!messages[conversationId] ||
// // //           messages[conversationId].length === 0) && (
// // //           <div className="text-center text-white/60 text-sm">
// // //             Start a conversation with {otherUser.username}
// // //           </div>
// // //         )}

// // //         {(messages[conversationId] || []).map((msg) => {
// // //           const isMe = msg.from === myUserId;

// // //           return (
// // //             <MessageBubble
// // //               key={msg.messageId}
// // //               msg={msg}
// // //               isMe={isMe}
// // //               otherUser={otherUser}
// // //               user={user}
// // //             />
// // //           );
// // //         })}
// // //       </div>

// // //       {/* INPUT */}

// // //       <div className="px-4 py-4 border-t border-white/20 mb-5">
// // //         <div className="flex gap-3">
// // //           <input
// // //             type="text"
// // //             value={text}
// // //             onChange={(e) => setText(e.target.value)}
// // //             onKeyDown={(e) => e.key === "Enter" && handleSend()}
// // //             placeholder="Type a message..."
// // //             className="flex-1 px-4 py-3 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //           />

// // //           <button
// // //             onClick={handleSend}
// // //             className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
// // //           >
// // //             Send
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft } from "lucide-react";
// // // import { useContext, useState, useMemo, useEffect, useRef } from "react";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";

// // // import { getChatMessages } from "../../utils/getMessages";
// // // import { saveMessage } from "../../utils/saveMessage";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";

// // // const normalizeMessageId = (m) => m.messageId;

// // // function ChatBox({ chat, onBack }) {
// // //   const { user } = useAuth();

// // //   const { sendSignal, messages, setMessages } = useContext(websocketContext);

// // //   const [text, setText] = useState("");

// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);

// // //   const myUserId = user._id;

// // // const messagesContainerRef = useRef(null);
// // // const shouldAutoScrollRef = useRef(true);
// // //   const conversationId = chat._id.toString();

// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;

// // //   const [hasMore, setHasMore] = useState(true);

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;

// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();

// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];

// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });

// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text,
// // //       createdAt,
// // //     });

// // //     setText("");
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;

// // //     setLoadingMore(true);

// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );

// // //       const data = await res.json();

// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];

// // //       if (messagesArray.length < 50) {
// // //         setHasMore(false);
// // //       }

// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));

// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];

// // //         const ids = new Set(existing.map((m) => m.messageId));

// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));

// // //         return {
// // //           ...prev,
// // //           [conversationId]: [...newMessages, ...existing],
// // //         };
// // //       });

// // //       if (messagesArray.length > 0) {
// // //         setCursor(messagesArray[0].createdAt);
// // //       }
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }

// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //   const el = messagesContainerRef.current;
// // //   if (!el) return;

// // //   const handleScroll = () => {
// // //     const threshold = 150;

// // //     const isNearBottom =
// // //       el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

// // //     shouldAutoScrollRef.current = isNearBottom;
// // //   };

// // //   el.addEventListener("scroll", handleScroll);

// // //   return () => el.removeEventListener("scroll", handleScroll);
// // // }, []);

// // //   useEffect(() => {
// // //     if (!conversationId) return;

// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });

// // //         const data = await res.json();

// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];

// // //         if (messagesArray.length < 50) {
// // //           setHasMore(false);
// // //         }

// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));

// // //         if (messagesArray.length > 0) {
// // //           setCursor(messagesArray[0].createdAt);
// // //         }

// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];

// // //           const ids = new Set(existing.map((m) => m.messageId));

// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));

// // //           return {
// // //             ...prev,
// // //             [conversationId]: [...existing, ...newMessages],
// // //           };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       }
// // //     };

// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;

// // //     if (!el) return;

// // //     if (shouldAutoScrollRef.current) {
// // //       el.scrollTop = el.scrollHeight;
// // //     }
// // //   }, [messages[conversationId]]);

// // //   return (
// // //     <div className="flex flex-col h-full w-full">
// // //       {/* HEADER */}

// // //       <div className="px-4 py-4 border-b border-white/20 flex items-center gap-3 text-white">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-lg hover:bg-white/20 transition"
// // //         >
// // //           <ArrowLeft size={20} />
// // //         </button>

// // //         <div className="w-4 h-4 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>

// // //         <h3 className="font-semibold text-lg">{otherUser.username}</h3>
// // //       </div>

// // //       {/* MESSAGES */}

// // //       <div
// // //         ref={messagesContainerRef}
// // //         className="flex-1 w-screen sm:w-full overflow-y-auto px-4 py-4 space-y-3"
// // //       >
// // //         {hasMore &&
// // //           messages[conversationId] &&
// // //           messages[conversationId].length > 0 && (
// // //             <div className="flex justify-center mb-2">
// // //               <button
// // //                 onClick={loadOlderMessages}
// // //                 className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
// // //               >
// // //                 {loadingMore ? "Loading..." : "Load older messages"}
// // //               </button>
// // //             </div>
// // //           )}
// // //         {(!messages[conversationId] ||
// // //           messages[conversationId].length === 0) && (
// // //           <div className="text-center text-white/60 text-sm">
// // //             Start a conversation with {otherUser.username}
// // //           </div>
// // //         )}
// // //         {(messages[conversationId] || []).map((msg) => {
// // //           const isMe = msg.from === myUserId;

// // //           return (
// // //             <MessageBubble
// // //               key={msg.messageId}
// // //               msg={msg}
// // //               isMe={isMe}
// // //               otherUser={otherUser}
// // //               user={user}
// // //             />
// // //           );
// // //         })}
// // //       </div>

// // //       {/* INPUT */}

// // //       <div className="px-4 py-4 border-t border-white/20 mb-5">
// // //         <div className="flex gap-3">
// // //           <input
// // //             type="text"
// // //             value={text}
// // //             onChange={(e) => setText(e.target.value)}
// // //             onKeyDown={(e) => e.key === "Enter" && handleSend()}
// // //             placeholder="Type a message..."
// // //             className="flex-1 px-4 py-3 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //           />

// // //           <button
// // //             onClick={handleSend}
// // //             className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
// // //           >
// // //             Send
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft, Send } from "lucide-react";
// // // import { useContext, useState, useMemo, useEffect, useRef } from "react";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";

// // // import { getChatMessages } from "../../utils/getMessages";
// // // import { saveMessage } from "../../utils/saveMessage";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";

// // // const normalizeMessageId = (m) => m.messageId;

// // // function ChatBox({ chat, onBack }) {
// // //   const { user } = useAuth();
// // //   const { sendSignal, messages, setMessages } = useContext(websocketContext);
// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;
// // //   const [hasMore, setHasMore] = useState(true);

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;

// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();

// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });

// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text,
// // //       createdAt,
// // //     });

// // //     setText("");

// // //     // reset textarea height after send
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return {
// // //           ...prev,
// // //           [conversationId]: [...newMessages, ...existing],
// // //         };
// // //       });
// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       const isNearBottom =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //       shouldAutoScrollRef.current = isNearBottom;
// // //     };
// // //     el.addEventListener("scroll", handleScroll);
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];
// // //           const ids = new Set(existing.map((m) => m.messageId));
// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //           return {
// // //             ...prev,
// // //             [conversationId]: [...existing, ...newMessages],
// // //           };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       }
// // //     };
// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (shouldAutoScrollRef.current) {
// // //       el.scrollTop = el.scrollHeight;
// // //     }
// // //   }, [messages[conversationId]]);

// // //   return (
// // //     <div
// // //       className="flex flex-col w-full"
// // //       style={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}
// // //     >
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>

// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>

// // //         <h3 className="font-semibold text-sm text-white truncate">
// // //           {otherUser.username}
// // //         </h3>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       <div
// // //         ref={messagesContainerRef}
// // //         className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //         style={{
// // //           overscrollBehavior: "contain",
// // //           WebkitOverflowScrolling: "touch",
// // //         }}
// // //       >
// // //         {hasMore &&
// // //           messages[conversationId] &&
// // //           messages[conversationId].length > 0 && (
// // //             <div className="flex justify-center mb-2">
// // //               <button
// // //                 onClick={loadOlderMessages}
// // //                 className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
// // //               >
// // //                 {loadingMore ? "Loading..." : "Load older messages"}
// // //               </button>
// // //             </div>
// // //           )}

// // //         {(!messages[conversationId] ||
// // //           messages[conversationId].length === 0) && (
// // //           <div className="text-center text-white/60 text-sm">
// // //             Start a conversation with {otherUser.username}
// // //           </div>
// // //         )}

// // //         {(messages[conversationId] || []).map((msg) => {
// // //           const isMe = msg.from === myUserId;
// // //           return (
// // //             <MessageBubble
// // //               key={msg.messageId}
// // //               msg={msg}
// // //               isMe={isMe}
// // //               otherUser={otherUser}
// // //               user={user}
// // //             />
// // //           );
// // //         })}
// // //       </div>

// // //       {/* INPUT */}
// // //       {/* INPUT */}
// // //       {/* INPUT */}
// // //       <div
// // //         className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm"
// // //         style={{
// // //           paddingBottom: "calc(72px + env(safe-area-inset-bottom, 0px))",
// // //         }}
// // //       >
// // //         <div className="flex items-end gap-2">
// // //           <textarea
// // //             ref={textareaRef}
// // //             rows={1}
// // //             value={text}
// // //             onChange={(e) => {
// // //               setText(e.target.value);
// // //               e.target.style.height = "auto";
// // //               e.target.style.height =
// // //                 Math.min(e.target.scrollHeight, 112) + "px";
// // //             }}
// // //             onKeyDown={(e) => {
// // //               if (e.key === "Enter" && !e.shiftKey) {
// // //                 e.preventDefault();
// // //                 handleSend();
// // //               }
// // //             }}
// // //             placeholder="Type a message..."
// // //             className="
// // //               flex-1 resize-none overflow-y-auto
// // //               px-4 py-3
// // //               rounded-2xl
// // //               bg-white/10 text-white text-sm
// // //               placeholder-white/30
// // //               focus:outline-none focus:ring-1 focus:ring-white/20
// // //               leading-relaxed
// // //               min-h-[44px]
// // //             "
// // //             style={{ maxHeight: "112px" }}
// // //           />

// // //           <button
// // //             onClick={handleSend}
// // //             disabled={!text.trim()}
// // //             className="
// // //               flex-shrink-0 w-11 h-11 mb-0.5
// // //               rounded-full
// // //               bg-indigo-600 hover:bg-indigo-500
// // //               flex items-center justify-center
// // //               transition active:scale-90
// // //               disabled:opacity-30 disabled:cursor-not-allowed
// // //             "
// // //           >
// // //             <Send size={16} className="text-white ml-0.5" />
// // //           </button>
// // //         </div>
// // //         <p className="text-[10px] text-white/20 mt-1.5 pl-1">
// // //           Enter to send · Shift+Enter for new line
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft, Send } from "lucide-react";
// // // import { useContext, useState, useMemo, useEffect, useRef } from "react";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";

// // // import { getChatMessages } from "../../utils/getMessages";
// // // import { saveMessage } from "../../utils/saveMessage";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";

// // // const normalizeMessageId = (m) => m.messageId;

// // // function ChatBox({ chat, onBack }) {
// // //   const { user } = useAuth();
// // //   const { sendSignal, messages, setMessages } = useContext(websocketContext);
// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;
// // //   const [hasMore, setHasMore] = useState(true);

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });
// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text,
// // //       createdAt,
// // //     });
// // //     setText("");
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return {
// // //           ...prev,
// // //           [conversationId]: [...newMessages, ...existing],
// // //         };
// // //       });
// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       const isNearBottom =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //       shouldAutoScrollRef.current = isNearBottom;
// // //     };
// // //     el.addEventListener("scroll", handleScroll);
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];
// // //           const ids = new Set(existing.map((m) => m.messageId));
// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //           return {
// // //             ...prev,
// // //             [conversationId]: [...existing, ...newMessages],
// // //           };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       }
// // //     };
// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (shouldAutoScrollRef.current) {
// // //       el.scrollTop = el.scrollHeight;
// // //     }
// // //   }, [messages[conversationId]]);

// // //   return (
// // //     <div
// // //       className="flex flex-col w-full"
// // //       style={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}
// // //     >
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>

// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>

// // //         <h3 className="font-semibold text-sm text-white truncate">
// // //           {otherUser.username}
// // //         </h3>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       <div
// // //         ref={messagesContainerRef}
// // //         className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //         style={{
// // //           overscrollBehavior: "contain",
// // //           WebkitOverflowScrolling: "touch",
// // //         }}
// // //       >
// // //         {hasMore &&
// // //           messages[conversationId] &&
// // //           messages[conversationId].length > 0 && (
// // //             <div className="flex justify-center mb-2">
// // //               <button
// // //                 onClick={loadOlderMessages}
// // //                 className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
// // //               >
// // //                 {loadingMore ? "Loading..." : "Load older messages"}
// // //               </button>
// // //             </div>
// // //           )}

// // //         {(!messages[conversationId] ||
// // //           messages[conversationId].length === 0) && (
// // //           <div className="text-center text-white/60 text-sm">
// // //             Start a conversation with {otherUser.username}
// // //           </div>
// // //         )}

// // //         {(messages[conversationId] || []).map((msg) => {
// // //           const isMe = msg.from === myUserId;
// // //           return (
// // //             <MessageBubble
// // //               key={msg.messageId}
// // //               msg={msg}
// // //               isMe={isMe}
// // //               otherUser={otherUser}
// // //               user={user}
// // //             />
// // //           );
// // //         })}

// // //         {/* ── FOOTER SPACER — keeps last message above the fixed footer ── */}
// // //         <div
// // //           style={{ height: "calc(72px + env(safe-area-inset-bottom, 0px))" }}
// // //         />
// // //       </div>

// // //       {/* INPUT */}
// // //       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm">
// // //         <div className="flex items-end gap-2">
// // //           <textarea
// // //             ref={textareaRef}
// // //             rows={1}
// // //             value={text}
// // //             onChange={(e) => {
// // //               setText(e.target.value);
// // //               e.target.style.height = "auto";
// // //               e.target.style.height =
// // //                 Math.min(e.target.scrollHeight, 112) + "px";
// // //             }}
// // //             onKeyDown={(e) => {
// // //               if (e.key === "Enter" && !e.shiftKey) {
// // //                 e.preventDefault();
// // //                 handleSend();
// // //               }
// // //             }}
// // //             placeholder="Type a message..."
// // //             className="
// // //               flex-1 resize-none overflow-y-auto
// // //               px-4 py-3
// // //               rounded-2xl
// // //               bg-white/10 text-white text-sm
// // //               placeholder-white/30
// // //               focus:outline-none focus:ring-1 focus:ring-white/20
// // //               leading-relaxed
// // //               min-h-[44px]
// // //             "
// // //             style={{ maxHeight: "112px" }}
// // //           />

// // //           <button
// // //             onClick={handleSend}
// // //             disabled={!text.trim()}
// // //             className="
// // //               flex-shrink-0 w-11 h-11 mb-0.5
// // //               rounded-full
// // //               bg-indigo-600 hover:bg-indigo-500
// // //               flex items-center justify-center
// // //               transition active:scale-90
// // //               disabled:opacity-30 disabled:cursor-not-allowed
// // //             "
// // //           >
// // //             <Send size={16} className="text-white ml-0.5" />
// // //           </button>
// // //         </div>
// // //         <p className="text-[10px] text-white/20 mt-1.5 pl-1">
// // //           Enter to send · Shift+Enter for new line
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft, Send } from "lucide-react";
// // // import { useContext, useState, useMemo, useEffect, useRef } from "react";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";

// // // import { getChatMessages } from "../../utils/getMessages";
// // // import { saveMessage } from "../../utils/saveMessage";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";

// // // const normalizeMessageId = (m) => m.messageId;

// // // function ChatBox({ chat, onBack }) {
// // //   const { user } = useAuth();
// // //   const { sendSignal, messages, setMessages } = useContext(websocketContext);
// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;
// // //   const [hasMore, setHasMore] = useState(true);

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });
// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text,
// // //       createdAt,
// // //     });
// // //     setText("");
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return {
// // //           ...prev,
// // //           [conversationId]: [...newMessages, ...existing],
// // //         };
// // //       });
// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       const isNearBottom =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //       shouldAutoScrollRef.current = isNearBottom;
// // //     };
// // //     el.addEventListener("scroll", handleScroll);
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];
// // //           const ids = new Set(existing.map((m) => m.messageId));
// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //           return {
// // //             ...prev,
// // //             [conversationId]: [...existing, ...newMessages],
// // //           };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       }
// // //     };
// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (shouldAutoScrollRef.current) {
// // //       el.scrollTop = el.scrollHeight;
// // //     }
// // //   }, [messages[conversationId]]);

// // //   return (
// // //     <div
// // //       className="flex flex-col w-full"
// // //       style={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}
// // //     >
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>

// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>

// // //         <h3 className="font-semibold text-sm text-white truncate">
// // //           {otherUser.username}
// // //         </h3>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       <div
// // //         ref={messagesContainerRef}
// // //         className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //         style={{
// // //           overscrollBehavior: "contain",
// // //           WebkitOverflowScrolling: "touch",
// // //         }}
// // //       >
// // //         {hasMore &&
// // //           messages[conversationId] &&
// // //           messages[conversationId].length > 0 && (
// // //             <div className="flex justify-center mb-2">
// // //               <button
// // //                 onClick={loadOlderMessages}
// // //                 className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
// // //               >
// // //                 {loadingMore ? "Loading..." : "Load older messages"}
// // //               </button>
// // //             </div>
// // //           )}

// // //         {(!messages[conversationId] ||
// // //           messages[conversationId].length === 0) && (
// // //           <div className="text-center text-white/60 text-sm">
// // //             Start a conversation with {otherUser.username}
// // //           </div>
// // //         )}

// // //         {(messages[conversationId] || []).map((msg) => {
// // //           const isMe = msg.from === myUserId;
// // //           return (
// // //             <MessageBubble
// // //               key={msg.messageId}
// // //               msg={msg}
// // //               isMe={isMe}
// // //               otherUser={otherUser}
// // //               user={user}
// // //             />
// // //           );
// // //         })}

// // //         {/* spacer so last message isn't hidden behind input bar */}
// // //         <div className="h-10" />
// // //       </div>

// // //       {/* INPUT */}
// // //       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm">
// // //         <div className="flex items-end gap-2">
// // //           <textarea
// // //             ref={textareaRef}
// // //             rows={1}
// // //             value={text}
// // //             onChange={(e) => {
// // //               setText(e.target.value);
// // //               e.target.style.height = "auto";
// // //               e.target.style.height =
// // //                 Math.min(e.target.scrollHeight, 112) + "px";
// // //             }}
// // //             onKeyDown={(e) => {
// // //               if (e.key === "Enter" && !e.shiftKey) {
// // //                 e.preventDefault();
// // //                 handleSend();
// // //               }
// // //             }}
// // //             placeholder="Type a message..."
// // //             className="
// // //               flex-1 resize-none overflow-y-auto
// // //               px-4 py-3
// // //               rounded-2xl
// // //               bg-white/10 text-white text-sm
// // //               placeholder-white/30
// // //               focus:outline-none focus:ring-1 focus:ring-white/20
// // //               leading-relaxed
// // //               min-h-[44px]
// // //             "
// // //             style={{ maxHeight: "112px" }}
// // //           />

// // //           <button
// // //             onClick={handleSend}
// // //             disabled={!text.trim()}
// // //             className="
// // //               flex-shrink-0 w-11 h-11 mb-0.5
// // //               rounded-full
// // //               bg-indigo-600 hover:bg-indigo-500
// // //               flex items-center justify-center
// // //               transition active:scale-90
// // //               disabled:opacity-30 disabled:cursor-not-allowed
// // //             "
// // //           >
// // //             <Send size={16} className="text-white ml-0.5" />
// // //           </button>
// // //         </div>
// // //         <p className="text-[10px] text-white/20 mt-1.5 pl-1">
// // //           Enter to send · Shift+Enter for new line
// // //         </p>

// // //         {/* ── FOOTER SPACER — pushes input bar above fixed footer ── */}
// // //         <div
// // //           style={{ height: "calc(20vh + env(safe-area-inset-bottom, 0px))" }}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft, Send } from "lucide-react";
// // // import { useContext, useState, useMemo, useEffect, useRef } from "react";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";

// // // import { getChatMessages } from "../../utils/getMessages";
// // // import { saveMessage } from "../../utils/saveMessage";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";

// // // const normalizeMessageId = (m) => m.messageId;

// // // function ChatBox({ chat, onBack }) {
// // //   const { user } = useAuth();
// // //   const { sendSignal, messages, setMessages } = useContext(websocketContext);
// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const [visible, setVisible] = useState(false); // ← fade trigger
// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;
// // //   const [hasMore, setHasMore] = useState(true);

// // //   // ── reset on conversation change + trigger fade-in ──
// // // useEffect(() => {
// // //   setHasMore(true);
// // //   setCursor(null);
// // //   setVisible(false);
// // //   requestAnimationFrame(() => {
// // //     requestAnimationFrame(() => setVisible(true));
// // //   });
// // // }, [conversationId]);

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });
// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text,
// // //       createdAt,
// // //     });
// // //     setText("");
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return {
// // //           ...prev,
// // //           [conversationId]: [...newMessages, ...existing],
// // //         };
// // //       });
// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       const isNearBottom =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //       shouldAutoScrollRef.current = isNearBottom;
// // //     };
// // //     el.addEventListener("scroll", handleScroll);
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];
// // //           const ids = new Set(existing.map((m) => m.messageId));
// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //           return {
// // //             ...prev,
// // //             [conversationId]: [...existing, ...newMessages],
// // //           };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       }
// // //     };
// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (shouldAutoScrollRef.current) {
// // //       el.scrollTop = el.scrollHeight;
// // //     }
// // //   }, [messages[conversationId]]);

// // //   return (
// // //     <div
// // //       className="flex flex-col w-full"
// // //       style={{
// // //         height: "100%",
// // //         maxHeight: "100%",
// // //         overflow: "hidden",
// // //         opacity: visible ? 1 : 0,
// // //         transform: visible ? "translateY(0)" : "translateY(8px)",
// // //         transition: "opacity 0.25s ease, transform 0.25s ease",
// // //       }}
// // //     >
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>

// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>

// // //         <h3 className="font-semibold text-sm text-white truncate">
// // //           {otherUser.username}
// // //         </h3>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       <div
// // //         ref={messagesContainerRef}
// // //         className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //         style={{
// // //           overscrollBehavior: "contain",
// // //           WebkitOverflowScrolling: "touch",
// // //           opacity: visible ? 1 : 0,
// // //           transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
// // //         }}
// // //       >
// // //         {hasMore &&
// // //           messages[conversationId] &&
// // //           messages[conversationId].length > 0 && (
// // //             <div className="flex justify-center mb-2">
// // //               <button
// // //                 onClick={loadOlderMessages}
// // //                 className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
// // //               >
// // //                 {loadingMore ? "Loading..." : "Load older messages"}
// // //               </button>
// // //             </div>
// // //           )}

// // //         {(!messages[conversationId] ||
// // //           messages[conversationId].length === 0) && (
// // //           <div className="text-center text-white/60 text-sm">
// // //             Start a conversation with {otherUser.username}
// // //           </div>
// // //         )}

// // //         {(messages[conversationId] || []).map((msg) => {
// // //           const isMe = msg.from === myUserId;
// // //           return (
// // //             <MessageBubble
// // //               key={msg.messageId}
// // //               msg={msg}
// // //               isMe={isMe}
// // //               otherUser={otherUser}
// // //               user={user}
// // //             />
// // //           );
// // //         })}

// // //         {/* spacer so last message isn't hidden behind input bar */}
// // //         <div className="h-10" />
// // //       </div>

// // //       {/* INPUT */}
// // //       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm">
// // //         <div className="flex items-end gap-2">
// // //           <textarea
// // //             ref={textareaRef}
// // //             rows={1}
// // //             value={text}
// // //             onChange={(e) => {
// // //               setText(e.target.value);
// // //               e.target.style.height = "auto";
// // //               e.target.style.height =
// // //                 Math.min(e.target.scrollHeight, 112) + "px";
// // //             }}
// // //             onKeyDown={(e) => {
// // //               if (e.key === "Enter" && !e.shiftKey) {
// // //                 e.preventDefault();
// // //                 handleSend();
// // //               }
// // //             }}
// // //             placeholder="Type a message..."
// // //             className="
// // //               flex-1 resize-none overflow-y-auto
// // //               px-4 py-3
// // //               rounded-2xl
// // //               bg-white/10 text-white text-sm
// // //               placeholder-white/30
// // //               focus:outline-none focus:ring-1 focus:ring-white/20
// // //               leading-relaxed
// // //               min-h-[44px]
// // //             "
// // //             style={{ maxHeight: "112px" }}
// // //           />

// // //           <button
// // //             onClick={handleSend}
// // //             disabled={!text.trim()}
// // //             className="
// // //               flex-shrink-0 w-11 h-11 mb-0.5
// // //               rounded-full
// // //               bg-indigo-600 hover:bg-indigo-500
// // //               flex items-center justify-center
// // //               transition active:scale-90
// // //               disabled:opacity-30 disabled:cursor-not-allowed
// // //             "
// // //           >
// // //             <Send size={16} className="text-white ml-0.5" />
// // //           </button>
// // //         </div>
// // //         <p className="text-[10px] text-white/20 mt-1.5 pl-1">
// // //           Enter to send · Shift+Enter for new line
// // //         </p>

// // //         {/* ── FOOTER SPACER ── */}
// // //         <div
// // //           style={{ height: "calc(20vh + env(safe-area-inset-bottom, 0px))" }}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft, Send } from "lucide-react";
// // // import { useContext, useState, useEffect, useRef } from "react";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";
// // // import { getChatMessages } from "../../utils/getMessages";
// // // import { saveMessage } from "../../utils/saveMessage";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";

// // // const normalizeMessageId = (m) => m.messageId;

// // // function MessageSkeleton() {
// // //   return (
// // //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// // //       {/* incoming */}
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       {/* outgoing */}
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       {/* incoming */}
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       {/* outgoing */}
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       {/* incoming */}
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       {/* outgoing */}
// // //       <div className="flex justify-end">
// // //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       {/* incoming */}
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       {/* outgoing */}
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function ChatBox({ chat, onBack }) {
// // //   const { user } = useAuth();
// // //   const { sendSignal, messages, setMessages } = useContext(websocketContext);
// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const [fetchingMessages, setFetchingMessages] = useState(true); // ← skeleton
// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const isLoadingMoreRef = useRef(false); // ← add this ref

// // //   const receiverId = otherUser._id;
// // //   const [hasMore, setHasMore] = useState(true);

// // //   // reset on every conversation switch
// // //   useEffect(() => {
// // //     setHasMore(true);
// // //     setCursor(null);
// // //     setFetchingMessages(true);
// // //   }, [conversationId]);

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });
// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text,
// // //       createdAt,
// // //     });
// // //     setText("");
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);

// // //     const el = messagesContainerRef.current;
// // //     const scrollHeightBefore = el ? el.scrollHeight : 0;

// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));

// // //       shouldAutoScrollRef.current = false; // ← block auto-scroll

// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return { ...prev, [conversationId]: [...newMessages, ...existing] };
// // //       });

// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);

// // //       setTimeout(() => {
// // //         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
// // //       }, 50);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }

// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       const isNearBottom =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //       shouldAutoScrollRef.current = isNearBottom;
// // //     };
// // //     el.addEventListener("scroll", handleScroll);
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];
// // //           const ids = new Set(existing.map((m) => m.messageId));
// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //           return {
// // //             ...prev,
// // //             [conversationId]: [...existing, ...newMessages],
// // //           };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       } finally {
// // //         setFetchingMessages(false); // ← done loading
// // //       }
// // //     };
// // //     fetchMessages();
// // //   }, [conversationId]);

// // // useEffect(() => {
// // //   const el = messagesContainerRef.current;
// // //   if (!el) return;
// // //   if (shouldAutoScrollRef.current) {
// // //     el.scrollTop = el.scrollHeight;
// // //   }
// // // }, [messages[conversationId]]);

// // //   return (
// // //     <div
// // //       className="flex flex-col w-full"
// // //       style={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}
// // //     >
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>

// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>

// // //         <h3 className="font-semibold text-sm text-white truncate">
// // //           {otherUser.username}
// // //         </h3>
// // //       </div>

// // //       {/* MESSAGES — skeleton while fetching, real messages after */}
// // //       {fetchingMessages ? (
// // //         <div className="flex-1 overflow-hidden">
// // //           <MessageSkeleton />
// // //         </div>
// // //       ) : (
// // //         <div
// // //           ref={messagesContainerRef}
// // //           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //           style={{
// // //             overscrollBehavior: "contain",
// // //             WebkitOverflowScrolling: "touch",
// // //             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
// // //           }}
// // //         >
// // //           {hasMore &&
// // //             messages[conversationId] &&
// // //             messages[conversationId].length > 0 && (
// // //               <div className="flex justify-center mb-2">
// // //                 <button
// // //                   onClick={loadOlderMessages}
// // //                   className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
// // //                 >
// // //                   {loadingMore ? "Loading..." : "Load older messages"}
// // //                 </button>
// // //               </div>
// // //             )}

// // //           {(!messages[conversationId] ||
// // //             messages[conversationId].length === 0) && (
// // //             <div className="text-center text-white/60 text-sm">
// // //               Start a conversation with {otherUser.username}
// // //             </div>
// // //           )}

// // //           {(messages[conversationId] || []).map((msg) => {
// // //             const isMe = msg.from === myUserId;
// // //             return (
// // //               <MessageBubble
// // //                 key={msg.messageId}
// // //                 msg={msg}
// // //                 isMe={isMe}
// // //                 otherUser={otherUser}
// // //                 user={user}
// // //               />
// // //             );
// // //           })}

// // //           <div className="h-10" />
// // //         </div>
// // //       )}

// // //       {/* INPUT */}
// // //       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm">
// // //         <div className="flex items-end gap-2">
// // //           <textarea
// // //             ref={textareaRef}
// // //             rows={1}
// // //             value={text}
// // //             onChange={(e) => {
// // //               setText(e.target.value);
// // //               e.target.style.height = "auto";
// // //               e.target.style.height =
// // //                 Math.min(e.target.scrollHeight, 112) + "px";
// // //             }}
// // //             onKeyDown={(e) => {
// // //               if (e.key === "Enter" && !e.shiftKey) {
// // //                 e.preventDefault();
// // //                 handleSend();
// // //               }
// // //             }}
// // //             placeholder="Type a message..."
// // //             className="
// // //               flex-1 resize-none overflow-y-auto
// // //               px-4 py-3
// // //               rounded-2xl
// // //               bg-white/10 text-white text-sm
// // //               placeholder-white/30
// // //               focus:outline-none focus:ring-1 focus:ring-white/20
// // //               leading-relaxed
// // //               min-h-[44px]
// // //             "
// // //             style={{ maxHeight: "112px" }}
// // //           />

// // //           <button
// // //             onClick={handleSend}
// // //             disabled={!text.trim()}
// // //             className="
// // //               flex-shrink-0 w-11 h-11 mb-0.5
// // //               rounded-full
// // //               bg-indigo-600 hover:bg-indigo-500
// // //               flex items-center justify-center
// // //               transition active:scale-90
// // //               disabled:opacity-30 disabled:cursor-not-allowed
// // //             "
// // //           >
// // //             <Send size={16} className="text-white ml-0.5" />
// // //           </button>
// // //         </div>
// // //         <p className="text-[10px] text-white/20 mt-1.5 pl-1">
// // //           Enter to send · Shift+Enter for new line
// // //         </p>
// // //         <div
// // //           style={{ height: "calc(20vh + env(safe-area-inset-bottom, 0px))" }}
// // //         />
// // //       </div>

// // //       {/* keyframe for fade-in-up */}
// // //       <style>{`
// // //         @keyframes fadeInUp {
// // //           from { opacity: 0; transform: translateY(10px); }
// // //           to   { opacity: 1; transform: translateY(0);    }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft, Send, Smile } from "lucide-react";
// // // import { useContext, useState, useEffect, useRef } from "react";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";
// // // import { getChatMessages } from "../../utils/getMessages";
// // // import { saveMessage } from "../../utils/saveMessage";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";

// // // const normalizeMessageId = (m) => m.messageId;

// // // const EMOJI_LIST = [
// // //   "😀",
// // //   "😂",
// // //   "😍",
// // //   "🥰",
// // //   "😎",
// // //   "🤔",
// // //   "😭",
// // //   "😡",
// // //   "🥺",
// // //   "😴",
// // //   "👍",
// // //   "👎",
// // //   "❤️",
// // //   "🔥",
// // //   "✨",
// // //   "🎉",
// // //   "🙏",
// // //   "💯",
// // //   "😊",
// // //   "🤣",
// // //   "😘",
// // //   "🥳",
// // //   "😤",
// // //   "🤯",
// // //   "😇",
// // //   "🤗",
// // //   "😏",
// // //   "🙄",
// // //   "😬",
// // //   "🤝",
// // //   "👀",
// // //   "💀",
// // //   "🫡",
// // //   "🫠",
// // //   "🥹",
// // //   "😮",
// // //   "😱",
// // //   "🤌",
// // //   "💪",
// // //   "👏",
// // //   "🍕",
// // //   "🎮",
// // //   "🎵",
// // //   "⚡",
// // //   "🌙",
// // //   "☀️",
// // //   "🌈",
// // //   "💫",
// // //   "🚀",
// // //   "🎯",
// // // ];

// // // function MessageSkeleton() {
// // //   return (
// // //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function ChatBox({ chat, onBack }) {
// // //   const { user } = useAuth();
// // //   const { sendSignal, messages, setMessages } = useContext(websocketContext);
// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const [fetchingMessages, setFetchingMessages] = useState(true);
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false); // ← emoji picker state
// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const emojiPickerRef = useRef(null);
// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;
// // //   const [hasMore, setHasMore] = useState(true);

// // //   // close emoji picker on outside click
// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (
// // //         emojiPickerRef.current &&
// // //         !emojiPickerRef.current.contains(e.target)
// // //       ) {
// // //         setShowEmojiPicker(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   // reset on every conversation switch
// // //   useEffect(() => {
// // //     setHasMore(true);
// // //     setCursor(null);
// // //     setFetchingMessages(true);
// // //     setShowEmojiPicker(false);
// // //   }, [conversationId]);

// // //   const insertEmoji = (emoji) => {
// // //     const ta = textareaRef.current;
// // //     if (!ta) {
// // //       setText((prev) => prev + emoji);
// // //       return;
// // //     }
// // //     const start = ta.selectionStart;
// // //     const end = ta.selectionEnd;
// // //     const newText = text.slice(0, start) + emoji + text.slice(end);
// // //     setText(newText);
// // //     // restore cursor after emoji
// // //     requestAnimationFrame(() => {
// // //       ta.focus();
// // //       ta.selectionStart = start + emoji.length;
// // //       ta.selectionEnd = start + emoji.length;
// // //       ta.style.height = "auto";
// // //       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
// // //     });
// // //   };

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });
// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text,
// // //       createdAt,
// // //     });
// // //     setText("");
// // //     setShowEmojiPicker(false);
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     const el = messagesContainerRef.current;
// // //     const scrollHeightBefore = el ? el.scrollHeight : 0;
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       shouldAutoScrollRef.current = false;
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return { ...prev, [conversationId]: [...newMessages, ...existing] };
// // //       });
// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //       setTimeout(() => {
// // //         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
// // //       }, 50);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       const isNearBottom =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //       shouldAutoScrollRef.current = isNearBottom;
// // //     };
// // //     el.addEventListener("scroll", handleScroll);
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];
// // //           const ids = new Set(existing.map((m) => m.messageId));
// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //           return { ...prev, [conversationId]: [...existing, ...newMessages] };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       } finally {
// // //         setFetchingMessages(false);
// // //       }
// // //     };
// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (shouldAutoScrollRef.current) {
// // //       el.scrollTop = el.scrollHeight;
// // //     }
// // //   }, [messages[conversationId]]);

// // //   return (
// // //     <div
// // //       className="flex flex-col w-full"
// // //       style={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}
// // //     >
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>
// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>
// // //         <h3 className="font-semibold text-sm text-white truncate">
// // //           {otherUser.username}
// // //         </h3>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       {fetchingMessages ? (
// // //         <div className="flex-1 overflow-hidden">
// // //           <MessageSkeleton />
// // //         </div>
// // //       ) : (
// // //         <div
// // //           ref={messagesContainerRef}
// // //           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //           style={{
// // //             overscrollBehavior: "contain",
// // //             WebkitOverflowScrolling: "touch",
// // //             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
// // //           }}
// // //         >
// // //           {hasMore &&
// // //             messages[conversationId] &&
// // //             messages[conversationId].length > 0 && (
// // //               <div className="flex justify-center mb-2">
// // //                 <button
// // //                   onClick={loadOlderMessages}
// // //                   className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
// // //                 >
// // //                   {loadingMore ? "Loading..." : "Load older messages"}
// // //                 </button>
// // //               </div>
// // //             )}

// // //           {(!messages[conversationId] ||
// // //             messages[conversationId].length === 0) && (
// // //             <div className="text-center text-white/60 text-sm">
// // //               Start a conversation with {otherUser.username}
// // //             </div>
// // //           )}

// // //           {(messages[conversationId] || []).map((msg) => {
// // //             const isMe = msg.from === myUserId;
// // //             return (
// // //               <MessageBubble
// // //                 key={msg.messageId}
// // //                 msg={msg}
// // //                 isMe={isMe}
// // //                 otherUser={otherUser}
// // //                 user={user}
// // //               />
// // //             );
// // //           })}

// // //           <div className="h-10" />
// // //         </div>
// // //       )}

// // //       {/* INPUT */}
// // //       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
// // //         {/* ── EMOJI PICKER — floats above, doesn't affect layout ── */}
// // //         {showEmojiPicker && (
// // //           <div
// // //             ref={emojiPickerRef}
// // //             className="
// // //       absolute bottom-full left-0 mx-3 mb-2
// // //       w-80 max-w-[calc(100%-24px)]
// // //       p-3 rounded-2xl
// // //       bg-[#1a1a1a] border border-white/10
// // //       shadow-2xl z-10
// // //     "
// // //           >
// // //             <div className="grid grid-cols-10 gap-1">
// // //               {EMOJI_LIST.map((emoji) => (
// // //                 <button
// // //                   key={emoji}
// // //                   onClick={() => insertEmoji(emoji)}
// // //                   className="
// // //             w-8 h-8 flex items-center justify-center
// // //             text-[18px] rounded-lg
// // //             hover:bg-white/10 active:scale-90
// // //             transition-all duration-100
// // //           "
// // //                 >
// // //                   {emoji}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}
// // //         <div className="flex items-end gap-2">
// // //           {/* emoji toggle */}
// // //           <button
// // //             onClick={() => setShowEmojiPicker((prev) => !prev)}
// // //             className={`
// // //         flex-shrink-0 w-10 h-10 mb-0.5
// // //         rounded-full flex items-center justify-center
// // //         border transition-all duration-150 active:scale-90
// // //         ${
// // //           showEmojiPicker
// // //             ? "bg-indigo-600 border-indigo-500 text-white"
// // //             : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// // //         }
// // //       `}
// // //           >
// // //             <Smile size={17} />
// // //           </button>

// // //           <textarea
// // //             ref={textareaRef}
// // //             rows={1}
// // //             value={text}
// // //             onChange={(e) => {
// // //               setText(e.target.value);
// // //               e.target.style.height = "auto";
// // //               e.target.style.height =
// // //                 Math.min(e.target.scrollHeight, 112) + "px";
// // //             }}
// // //             onKeyDown={(e) => {
// // //               if (e.key === "Enter" && !e.shiftKey) {
// // //                 e.preventDefault();
// // //                 handleSend();
// // //               }
// // //             }}
// // //             placeholder="Type a message..."
// // //             className="
// // //         flex-1 resize-none overflow-y-auto
// // //         px-4 py-3 rounded-2xl
// // //         bg-white/10 text-white text-sm
// // //         placeholder-white/30
// // //         focus:outline-none focus:ring-1 focus:ring-white/20
// // //         leading-relaxed min-h-[44px]
// // //       "
// // //             style={{ maxHeight: "112px" }}
// // //           />

// // //           <button
// // //             onClick={handleSend}
// // //             disabled={!text.trim()}
// // //             className="
// // //         flex-shrink-0 w-11 h-11 mb-0.5
// // //         rounded-full
// // //         bg-indigo-600 hover:bg-indigo-500
// // //         flex items-center justify-center
// // //         transition active:scale-90
// // //         disabled:opacity-30 disabled:cursor-not-allowed
// // //       "
// // //           >
// // //             <Send size={16} className="text-white ml-0.5" />
// // //           </button>
// // //         </div>

// // //         <p className="text-[10px] text-white/20 mt-1.5 pl-1">
// // //           Enter to send · Shift+Enter for new line
// // //         </p>
// // //         <div
// // //           style={{ height: "calc(20vh + env(safe-area-inset-bottom, 0px))" }}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft, Send, Smile } from "lucide-react";
// // // import { useContext, useState, useEffect, useRef } from "react";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";
// // // import { getChatMessages } from "../../utils/getMessages";
// // // import { saveMessage } from "../../utils/saveMessage";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";

// // // const normalizeMessageId = (m) => m.messageId;

// // // const EMOJI_LIST = [
// // //   "😀",
// // //   "😂",
// // //   "😍",
// // //   "🥰",
// // //   "😎",
// // //   "🤔",
// // //   "😭",
// // //   "😡",
// // //   "🥺",
// // //   "😴",
// // //   "👍",
// // //   "👎",
// // //   "❤️",
// // //   "🔥",
// // //   "✨",
// // //   "🎉",
// // //   "🙏",
// // //   "💯",
// // //   "😊",
// // //   "🤣",
// // //   "😘",
// // //   "🥳",
// // //   "😤",
// // //   "🤯",
// // //   "😇",
// // //   "🤗",
// // //   "😏",
// // //   "🙄",
// // //   "😬",
// // //   "🤝",
// // //   "👀",
// // //   "💀",
// // //   "🫡",
// // //   "🫠",
// // //   "🥹",
// // //   "😮",
// // //   "😱",
// // //   "🤌",
// // //   "💪",
// // //   "👏",
// // //   "🍕",
// // //   "🎮",
// // //   "🎵",
// // //   "⚡",
// // //   "🌙",
// // //   "☀️",
// // //   "🌈",
// // //   "💫",
// // //   "🚀",
// // //   "🎯",
// // // ];

// // // function MessageSkeleton() {
// // //   return (
// // //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function ChatBox({ chat, onBack }) {
// // //   const { user } = useAuth();
// // //   const { sendSignal, messages, setMessages } = useContext(websocketContext);
// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const [fetchingMessages, setFetchingMessages] = useState(true);
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const emojiPickerRef = useRef(null);
// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;
// // //   const [hasMore, setHasMore] = useState(true);

// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (
// // //         emojiPickerRef.current &&
// // //         !emojiPickerRef.current.contains(e.target)
// // //       ) {
// // //         setShowEmojiPicker(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   useEffect(() => {
// // //     setHasMore(true);
// // //     setCursor(null);
// // //     setFetchingMessages(true);
// // //     setShowEmojiPicker(false);
// // //   }, [conversationId]);

// // //   const insertEmoji = (emoji) => {
// // //     const ta = textareaRef.current;
// // //     if (!ta) {
// // //       setText((prev) => prev + emoji);
// // //       return;
// // //     }
// // //     const start = ta.selectionStart;
// // //     const end = ta.selectionEnd;
// // //     const newText = text.slice(0, start) + emoji + text.slice(end);
// // //     setText(newText);
// // //     requestAnimationFrame(() => {
// // //       ta.focus();
// // //       ta.selectionStart = start + emoji.length;
// // //       ta.selectionEnd = start + emoji.length;
// // //       ta.style.height = "auto";
// // //       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
// // //     });
// // //   };

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });
// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text,
// // //       createdAt,
// // //     });
// // //     setText("");
// // //     setShowEmojiPicker(false);
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     const el = messagesContainerRef.current;
// // //     const scrollHeightBefore = el ? el.scrollHeight : 0;
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       shouldAutoScrollRef.current = false;
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return { ...prev, [conversationId]: [...newMessages, ...existing] };
// // //       });
// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //       setTimeout(() => {
// // //         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
// // //       }, 50);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       const isNearBottom =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //       shouldAutoScrollRef.current = isNearBottom;
// // //     };
// // //     el.addEventListener("scroll", handleScroll);
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];
// // //           const ids = new Set(existing.map((m) => m.messageId));
// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //           return { ...prev, [conversationId]: [...existing, ...newMessages] };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       } finally {
// // //         setFetchingMessages(false);
// // //       }
// // //     };
// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (shouldAutoScrollRef.current) {
// // //       el.scrollTop = el.scrollHeight;
// // //     }
// // //   }, [messages[conversationId]]);

// // //   return (
// // //     // ✅ h-full + min-h-0 — fills parent (ChatView's flex-1), never overflows
// // //     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>
// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>
// // //         <h3 className="font-semibold text-sm text-white truncate">
// // //           {otherUser.username}
// // //         </h3>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       {fetchingMessages ? (
// // //         <div className="flex-1 overflow-hidden">
// // //           <MessageSkeleton />
// // //         </div>
// // //       ) : (
// // //         <div
// // //           ref={messagesContainerRef}
// // //           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //           style={{
// // //             overscrollBehavior: "contain",
// // //             WebkitOverflowScrolling: "touch",
// // //             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
// // //           }}
// // //         >
// // //           {hasMore &&
// // //             messages[conversationId] &&
// // //             messages[conversationId].length > 0 && (
// // //               <div className="flex justify-center mb-2">
// // //                 <button
// // //                   onClick={loadOlderMessages}
// // //                   className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
// // //                 >
// // //                   {loadingMore ? "Loading..." : "Load older messages"}
// // //                 </button>
// // //               </div>
// // //             )}

// // //           {(!messages[conversationId] ||
// // //             messages[conversationId].length === 0) && (
// // //             <div className="text-center text-white/60 text-sm">
// // //               Start a conversation with {otherUser.username}
// // //             </div>
// // //           )}

// // //           {(messages[conversationId] || []).map((msg) => {
// // //             const isMe = msg.from === myUserId;
// // //             return (
// // //               <MessageBubble
// // //                 key={msg.messageId}
// // //                 msg={msg}
// // //                 isMe={isMe}
// // //                 otherUser={otherUser}
// // //                 user={user}
// // //               />
// // //             );
// // //           })}

// // //           {/* ✅ Small breathing room at bottom of message list — not a spacer hack */}
// // //           <div className="h-2" />
// // //         </div>
// // //       )}

// // //       {/* INPUT */}
// // //       {/* ✅ flex-shrink-0 — input bar never gets compressed */}
// // //       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
// // //         {/* EMOJI PICKER — floats above input, no layout impact */}
// // //         {showEmojiPicker && (
// // //           <div
// // //             ref={emojiPickerRef}
// // //             className="
// // //               absolute bottom-full left-0 mx-3 mb-2
// // //               w-80 max-w-[calc(100%-24px)]
// // //               p-3 rounded-2xl
// // //               bg-[#1a1a1a] border border-white/10
// // //               shadow-2xl z-10
// // //             "
// // //           >
// // //             <div className="grid grid-cols-10 gap-1">
// // //               {EMOJI_LIST.map((emoji) => (
// // //                 <button
// // //                   key={emoji}
// // //                   onClick={() => insertEmoji(emoji)}
// // //                   className="
// // //                     w-8 h-8 flex items-center justify-center
// // //                     text-[18px] rounded-lg
// // //                     hover:bg-white/10 active:scale-90
// // //                     transition-all duration-100
// // //                   "
// // //                 >
// // //                   {emoji}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         <div className="flex items-end gap-2">
// // //           {/* Emoji toggle */}
// // //           <button
// // //             onClick={() => setShowEmojiPicker((prev) => !prev)}
// // //             className={`
// // //               flex-shrink-0 w-10 h-10 mb-0.5
// // //               rounded-full flex items-center justify-center
// // //               border transition-all duration-150 active:scale-90
// // //               ${
// // //                 showEmojiPicker
// // //                   ? "bg-indigo-600 border-indigo-500 text-white"
// // //                   : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// // //               }
// // //             `}
// // //           >
// // //             <Smile size={17} />
// // //           </button>

// // //           {/* ✅ font-size: 16px on textarea — prevents iOS zoom on focus */}
// // //           <textarea
// // //             ref={textareaRef}
// // //             rows={1}
// // //             value={text}
// // //             onChange={(e) => {
// // //               setText(e.target.value);
// // //               e.target.style.height = "auto";
// // //               e.target.style.height =
// // //                 Math.min(e.target.scrollHeight, 112) + "px";
// // //             }}
// // //             onKeyDown={(e) => {
// // //               if (e.key === "Enter" && !e.shiftKey) {
// // //                 e.preventDefault();
// // //                 handleSend();
// // //               }
// // //             }}
// // //             placeholder="Type a message..."
// // //             className="
// // //               flex-1 resize-none overflow-y-auto
// // //               px-4 py-3 rounded-2xl
// // //               bg-white/10 text-white
// // //               placeholder-white/30
// // //               focus:outline-none focus:ring-1 focus:ring-white/20
// // //               leading-relaxed min-h-[44px]
// // //             "
// // //             style={{ maxHeight: "112px", fontSize: "16px" }}
// // //           />
// // //           {/* ✅ fontSize 16px in style — overrides any global CSS, guarantees no iOS zoom */}

// // //           <button
// // //             onClick={handleSend}
// // //             disabled={!text.trim()}
// // //             className="
// // //               flex-shrink-0 w-11 h-11 mb-0.5
// // //               rounded-full
// // //               bg-indigo-600 hover:bg-indigo-500
// // //               flex items-center justify-center
// // //               transition active:scale-90
// // //               disabled:opacity-30 disabled:cursor-not-allowed
// // //             "
// // //           >
// // //             <Send size={16} className="text-white ml-0.5" />
// // //           </button>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft, Send, Smile } from "lucide-react";
// // // import { useContext, useState, useEffect, useRef } from "react";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";
// // // import { getChatMessages } from "../../utils/getMessages";
// // // import { saveMessage } from "../../utils/saveMessage";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";
// // // import ChatOptionsPopup from "../ChatOptionsPopup";

// // // const normalizeMessageId = (m) => m.messageId;

// // // const EMOJI_LIST = [
// // //   "😀",
// // //   "😂",
// // //   "😍",
// // //   "🥰",
// // //   "😎",
// // //   "🤔",
// // //   "😭",
// // //   "😡",
// // //   "🥺",
// // //   "😴",
// // //   "👍",
// // //   "👎",
// // //   "❤️",
// // //   "🔥",
// // //   "✨",
// // //   "🎉",
// // //   "🙏",
// // //   "💯",
// // //   "😊",
// // //   "🤣",
// // //   "😘",
// // //   "🥳",
// // //   "😤",
// // //   "🤯",
// // //   "😇",
// // //   "🤗",
// // //   "😏",
// // //   "🙄",
// // //   "😬",
// // //   "🤝",
// // //   "👀",
// // //   "💀",
// // //   "🫡",
// // //   "🫠",
// // //   "🥹",
// // //   "😮",
// // //   "😱",
// // //   "🤌",
// // //   "💪",
// // //   "👏",
// // //   "🍕",
// // //   "🎮",
// // //   "🎵",
// // //   "⚡",
// // //   "🌙",
// // //   "☀️",
// // //   "🌈",
// // //   "💫",
// // //   "🚀",
// // //   "🎯",
// // // ];

// // // function MessageSkeleton() {
// // //   return (
// // //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function ChatBox({ chat, onBack }) {
// // //   const { user } = useAuth();
// // //   const { sendSignal, messages, setMessages } = useContext(websocketContext);
// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const [fetchingMessages, setFetchingMessages] = useState(true);
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// // //   const [showChatOptions, setShowChatOptions] = useState(false);
// // //   const [chatTheme, setChatTheme] = useState({
// // //     id: "default",
// // //     label: "Default",
// // //     bg: "#0a0a0a",
// // //   });
// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const emojiPickerRef = useRef(null);
// // //   const chatOptionsRef = useRef(null);
// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;
// // //   const [hasMore, setHasMore] = useState(true);

// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (
// // //         emojiPickerRef.current &&
// // //         !emojiPickerRef.current.contains(e.target)
// // //       ) {
// // //         setShowEmojiPicker(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   useEffect(() => {
// // //     setHasMore(true);
// // //     setCursor(null);
// // //     setFetchingMessages(true);
// // //     setShowEmojiPicker(false);
// // //     setShowChatOptions(false);
// // //   }, [conversationId]);

// // //   const insertEmoji = (emoji) => {
// // //     const ta = textareaRef.current;
// // //     if (!ta) {
// // //       setText((prev) => prev + emoji);
// // //       return;
// // //     }
// // //     const start = ta.selectionStart;
// // //     const end = ta.selectionEnd;
// // //     const newText = text.slice(0, start) + emoji + text.slice(end);
// // //     setText(newText);
// // //     requestAnimationFrame(() => {
// // //       ta.focus();
// // //       ta.selectionStart = start + emoji.length;
// // //       ta.selectionEnd = start + emoji.length;
// // //       ta.style.height = "auto";
// // //       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
// // //     });
// // //   };

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });
// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text,
// // //       createdAt,
// // //     });
// // //     setText("");
// // //     setShowEmojiPicker(false);
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     const el = messagesContainerRef.current;
// // //     const scrollHeightBefore = el ? el.scrollHeight : 0;
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       shouldAutoScrollRef.current = false;
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return { ...prev, [conversationId]: [...newMessages, ...existing] };
// // //       });
// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //       setTimeout(() => {
// // //         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
// // //       }, 50);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       const isNearBottom =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //       shouldAutoScrollRef.current = isNearBottom;
// // //     };
// // //     el.addEventListener("scroll", handleScroll);
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];
// // //           const ids = new Set(existing.map((m) => m.messageId));
// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //           return { ...prev, [conversationId]: [...existing, ...newMessages] };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       } finally {
// // //         setFetchingMessages(false);
// // //       }
// // //     };
// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (shouldAutoScrollRef.current) {
// // //       el.scrollTop = el.scrollHeight;
// // //     }
// // //   }, [messages[conversationId]]);

// // //   return (
// // //     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>
// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>
// // //         <h3 className="font-semibold text-sm text-white truncate flex-1">
// // //           {otherUser.username}
// // //         </h3>

// // //         {/* Three dots */}
// // //         <div ref={chatOptionsRef} className="relative flex-shrink-0">
// // //           <button
// // //             onClick={() => setShowChatOptions((v) => !v)}
// // //             className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
// // //           >
// // //             <svg
// // //               width="16"
// // //               height="16"
// // //               viewBox="0 0 24 24"
// // //               fill="none"
// // //               stroke="currentColor"
// // //               strokeWidth="2"
// // //             >
// // //               <circle cx="12" cy="5" r="1" />
// // //               <circle cx="12" cy="12" r="1" />
// // //               <circle cx="12" cy="19" r="1" />
// // //             </svg>
// // //           </button>

// // //           {showChatOptions && (
// // //             <ChatOptionsPopup
// // //               onClose={() => setShowChatOptions(false)}
// // //               onClearChat={() => {
// // //                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
// // //               }}
// // //               onBlock={() => {
// // //                 // wire up block logic here
// // //               }}
// // //               onThemeChange={(theme) => setChatTheme(theme)}
// // //               currentTheme={chatTheme}
// // //               anchorRef={chatOptionsRef}
// // //             />
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       {fetchingMessages ? (
// // //         <div className="flex-1 overflow-hidden">
// // //           <MessageSkeleton />
// // //         </div>
// // //       ) : (
// // //         <div
// // //           ref={messagesContainerRef}
// // //           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //           style={{
// // //             overscrollBehavior: "contain",
// // //             WebkitOverflowScrolling: "touch",
// // //             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
// // //             background: chatTheme.bg,
// // //             transition: "background 0.3s ease",
// // //           }}
// // //         >
// // //           {hasMore &&
// // //             messages[conversationId] &&
// // //             messages[conversationId].length > 0 && (
// // //               <div className="flex justify-center mb-2">
// // //                 <button
// // //                   onClick={loadOlderMessages}
// // //                   className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
// // //                 >
// // //                   {loadingMore ? "Loading..." : "Load older messages"}
// // //                 </button>
// // //               </div>
// // //             )}

// // //           {(!messages[conversationId] ||
// // //             messages[conversationId].length === 0) && (
// // //             <div className="text-center text-white/60 text-sm">
// // //               Start a conversation with {otherUser.username}
// // //             </div>
// // //           )}

// // //           {(messages[conversationId] || []).map((msg) => {
// // //             const isMe = msg.from === myUserId;
// // //             return (
// // //               <MessageBubble
// // //                 key={msg.messageId}
// // //                 msg={msg}
// // //                 isMe={isMe}
// // //                 otherUser={otherUser}
// // //                 user={user}
// // //               />
// // //             );
// // //           })}

// // //           <div className="h-2" />
// // //         </div>
// // //       )}

// // //       {/* INPUT */}
// // //       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
// // //         {showEmojiPicker && (
// // //           <div
// // //             ref={emojiPickerRef}
// // //             className="
// // //               absolute bottom-full left-0 mx-3 mb-2
// // //               w-80 max-w-[calc(100%-24px)]
// // //               p-3 rounded-2xl
// // //               bg-[#1a1a1a] border border-white/10
// // //               shadow-2xl z-10
// // //             "
// // //           >
// // //             <div className="grid grid-cols-10 gap-1">
// // //               {EMOJI_LIST.map((emoji) => (
// // //                 <button
// // //                   key={emoji}
// // //                   onClick={() => insertEmoji(emoji)}
// // //                   className="
// // //                     w-8 h-8 flex items-center justify-center
// // //                     text-[18px] rounded-lg
// // //                     hover:bg-white/10 active:scale-90
// // //                     transition-all duration-100
// // //                   "
// // //                 >
// // //                   {emoji}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         <div className="flex items-end gap-2">
// // //           <button
// // //             onClick={() => setShowEmojiPicker((prev) => !prev)}
// // //             className={`
// // //               flex-shrink-0 w-10 h-10 mb-0.5
// // //               rounded-full flex items-center justify-center
// // //               border transition-all duration-150 active:scale-90
// // //               ${
// // //                 showEmojiPicker
// // //                   ? "bg-indigo-600 border-indigo-500 text-white"
// // //                   : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// // //               }
// // //             `}
// // //           >
// // //             <Smile size={17} />
// // //           </button>

// // //           <textarea
// // //             ref={textareaRef}
// // //             rows={1}
// // //             value={text}
// // //             onChange={(e) => {
// // //               setText(e.target.value);
// // //               e.target.style.height = "auto";
// // //               e.target.style.height =
// // //                 Math.min(e.target.scrollHeight, 112) + "px";
// // //             }}
// // //             onKeyDown={(e) => {
// // //               if (e.key === "Enter" && !e.shiftKey) {
// // //                 e.preventDefault();
// // //                 handleSend();
// // //               }
// // //             }}
// // //             placeholder="Type a message..."
// // //             className="
// // //               flex-1 resize-none overflow-y-auto
// // //               px-4 py-3 rounded-2xl
// // //               bg-white/10 text-white
// // //               placeholder-white/30
// // //               focus:outline-none focus:ring-1 focus:ring-white/20
// // //               leading-relaxed min-h-[44px]
// // //             "
// // //             style={{ maxHeight: "112px", fontSize: "16px" }}
// // //           />

// // //           <button
// // //             onClick={handleSend}
// // //             disabled={!text.trim()}
// // //             className="
// // //               flex-shrink-0 w-11 h-11 mb-0.5
// // //               rounded-full
// // //               bg-indigo-600 hover:bg-indigo-500
// // //               flex items-center justify-center
// // //               transition active:scale-90
// // //               disabled:opacity-30 disabled:cursor-not-allowed
// // //             "
// // //           >
// // //             <Send size={16} className="text-white ml-0.5" />
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft, Send, Smile } from "lucide-react";
// // // import { useContext, useState, useEffect, useRef } from "react";
// // // import { createPortal } from "react-dom";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";

// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";
// // // import ChatOptionsPopup from "../ChatOptionsPopup";

// // // const normalizeMessageId = (m) => m.messageId;

// // // const EMOJI_LIST = [
// // //   "😀",
// // //   "😂",
// // //   "😍",
// // //   "🥰",
// // //   "😎",
// // //   "🤔",
// // //   "😭",
// // //   "😡",
// // //   "🥺",
// // //   "😴",
// // //   "👍",
// // //   "👎",
// // //   "❤️",
// // //   "🔥",
// // //   "✨",
// // //   "🎉",
// // //   "🙏",
// // //   "💯",
// // //   "😊",
// // //   "🤣",
// // //   "😘",
// // //   "🥳",
// // //   "😤",
// // //   "🤯",
// // //   "😇",
// // //   "🤗",
// // //   "😏",
// // //   "🙄",
// // //   "😬",
// // //   "🤝",
// // //   "👀",
// // //   "💀",
// // //   "🫡",
// // //   "🫠",
// // //   "🥹",
// // //   "😮",
// // //   "😱",
// // //   "🤌",
// // //   "💪",
// // //   "👏",
// // //   "🍕",
// // //   "🎮",
// // //   "🎵",
// // //   "⚡",
// // //   "🌙",
// // //   "☀️",
// // //   "🌈",
// // //   "💫",
// // //   "🚀",
// // //   "🎯",
// // // ];

// // // function MessageSkeleton() {
// // //   return (
// // //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function ChatBox({ chat, onBack, onNewMessage }) {
// // //   const { user } = useAuth();
// // //   const { sendSignal, messages, setMessages } = useContext(websocketContext);
// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const [fetchingMessages, setFetchingMessages] = useState(true);
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// // //   const [showChatOptions, setShowChatOptions] = useState(false);
// // //   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
// // //   const [chatTheme, setChatTheme] = useState({
// // //     id: "default",
// // //     label: "Default",
// // //     bg: "#0a0a0a",
// // //   });
// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const emojiPickerRef = useRef(null);
// // //   const chatOptionsRef = useRef(null);
// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;
// // //   const [hasMore, setHasMore] = useState(true);

// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (
// // //         emojiPickerRef.current &&
// // //         !emojiPickerRef.current.contains(e.target)
// // //       ) {
// // //         setShowEmojiPicker(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   useEffect(() => {
// // //     setHasMore(true);
// // //     setCursor(null);
// // //     setFetchingMessages(true);
// // //     setShowEmojiPicker(false);
// // //     setShowChatOptions(false);
// // //   }, [conversationId]);

// // //   const handleToggleChatOptions = () => {
// // //     if (!showChatOptions && chatOptionsRef.current) {
// // //       const rect = chatOptionsRef.current.getBoundingClientRect();
// // //       setPopupPos({
// // //         top: rect.bottom + 6,
// // //         right: window.innerWidth - rect.right,
// // //       });
// // //     }
// // //     setShowChatOptions((v) => !v);
// // //   };

// // //   const insertEmoji = (emoji) => {
// // //     const ta = textareaRef.current;
// // //     if (!ta) {
// // //       setText((prev) => prev + emoji);
// // //       return;
// // //     }
// // //     const start = ta.selectionStart;
// // //     const end = ta.selectionEnd;
// // //     const newText = text.slice(0, start) + emoji + text.slice(end);
// // //     setText(newText);
// // //     requestAnimationFrame(() => {
// // //       ta.focus();
// // //       ta.selectionStart = start + emoji.length;
// // //       ta.selectionEnd = start + emoji.length;
// // //       ta.style.height = "auto";
// // //       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
// // //     });
// // //   };

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     const messageText = text; // ← capture before clearing

// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text: messageText,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });

// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text: messageText,
// // //       createdAt,
// // //     });

// // //     onNewMessage?.(conversationId, messageText); // ← add this

// // //     setText("");
// // //     setShowEmojiPicker(false);
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     const el = messagesContainerRef.current;
// // //     const scrollHeightBefore = el ? el.scrollHeight : 0;
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       shouldAutoScrollRef.current = false;
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return { ...prev, [conversationId]: [...newMessages, ...existing] };
// // //       });
// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //       setTimeout(() => {
// // //         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
// // //       }, 50);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       const isNearBottom =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //       shouldAutoScrollRef.current = isNearBottom;
// // //     };
// // //     el.addEventListener("scroll", handleScroll);
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];
// // //           const ids = new Set(existing.map((m) => m.messageId));
// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //           return { ...prev, [conversationId]: [...existing, ...newMessages] };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       } finally {
// // //         setFetchingMessages(false);
// // //       }
// // //     };
// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (shouldAutoScrollRef.current) {
// // //       el.scrollTop = el.scrollHeight;
// // //     }
// // //   }, [messages[conversationId]]);

// // //   return (
// // //     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>
// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>
// // //         <h3 className="font-semibold text-sm text-white truncate flex-1">
// // //           {otherUser.username}
// // //         </h3>

// // //         {/* Three dots */}
// // //         <div ref={chatOptionsRef} className="relative flex-shrink-0">
// // //           <button
// // //             onClick={handleToggleChatOptions}
// // //             className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
// // //           >
// // //             <svg
// // //               width="16"
// // //               height="16"
// // //               viewBox="0 0 24 24"
// // //               fill="none"
// // //               stroke="currentColor"
// // //               strokeWidth="2"
// // //               strokeLinecap="round"
// // //             >
// // //               <circle cx="12" cy="5" r="1" />
// // //               <circle cx="12" cy="12" r="1" />
// // //               <circle cx="12" cy="19" r="1" />
// // //             </svg>
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       {fetchingMessages ? (
// // //         <div className="flex-1 overflow-hidden">
// // //           <MessageSkeleton />
// // //         </div>
// // //       ) : (
// // //         <div
// // //           ref={messagesContainerRef}
// // //           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //           style={{
// // //             overscrollBehavior: "contain",
// // //             WebkitOverflowScrolling: "touch",
// // //             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
// // //             background: chatTheme.bg,
// // //             transition: "background 0.3s ease",
// // //           }}
// // //         >
// // //           {hasMore &&
// // //             messages[conversationId] &&
// // //             messages[conversationId].length > 0 && (
// // //               <div className="flex justify-center mb-2">
// // //                 <button
// // //                   onClick={loadOlderMessages}
// // //                   className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
// // //                 >
// // //                   {loadingMore ? "Loading..." : "Load older messages"}
// // //                 </button>
// // //               </div>
// // //             )}

// // //           {(!messages[conversationId] ||
// // //             messages[conversationId].length === 0) && (
// // //             <div className="text-center text-white/60 text-sm">
// // //               Start a conversation with {otherUser.username}
// // //             </div>
// // //           )}

// // //           {(messages[conversationId] || []).map((msg) => {
// // //             const isMe = msg.from === myUserId;
// // //             return (
// // //               <MessageBubble
// // //                 key={msg.messageId}
// // //                 msg={msg}
// // //                 isMe={isMe}
// // //                 otherUser={otherUser}
// // //                 user={user}
// // //               />
// // //             );
// // //           })}

// // //           <div className="h-2" />
// // //         </div>
// // //       )}

// // //       {/* INPUT */}
// // //       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
// // //         {showEmojiPicker && (
// // //           <div
// // //             ref={emojiPickerRef}
// // //             className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
// // //           >
// // //             <div className="grid grid-cols-10 gap-1">
// // //               {EMOJI_LIST.map((emoji) => (
// // //                 <button
// // //                   key={emoji}
// // //                   onClick={() => insertEmoji(emoji)}
// // //                   className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
// // //                 >
// // //                   {emoji}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         <div className="flex items-end gap-2">
// // //           <button
// // //             onClick={() => setShowEmojiPicker((prev) => !prev)}
// // //             className={`
// // //               flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center
// // //               border transition-all duration-150 active:scale-90
// // //               ${
// // //                 showEmojiPicker
// // //                   ? "bg-indigo-600 border-indigo-500 text-white"
// // //                   : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// // //               }
// // //             `}
// // //           >
// // //             <Smile size={17} />
// // //           </button>

// // //           <textarea
// // //             ref={textareaRef}
// // //             rows={1}
// // //             value={text}
// // //             onChange={(e) => {
// // //               setText(e.target.value);
// // //               e.target.style.height = "auto";
// // //               e.target.style.height =
// // //                 Math.min(e.target.scrollHeight, 112) + "px";
// // //             }}
// // //             onKeyDown={(e) => {
// // //               if (e.key === "Enter" && !e.shiftKey) {
// // //                 e.preventDefault();
// // //                 handleSend();
// // //               }
// // //             }}
// // //             placeholder="Type a message..."
// // //             className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// // //             style={{ maxHeight: "112px", fontSize: "16px" }}
// // //           />

// // //           <button
// // //             onClick={handleSend}
// // //             disabled={!text.trim()}
// // //             className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
// // //           >
// // //             <Send size={16} className="text-white ml-0.5" />
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Chat options popup — portaled to body to escape stacking context */}
// // //       {showChatOptions &&
// // //         createPortal(
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: popupPos.top,
// // //               right: popupPos.right,
// // //               zIndex: 99999,
// // //             }}
// // //           >
// // //             <ChatOptionsPopup
// // //               onClose={() => setShowChatOptions(false)}
// // //               onClearChat={() => {
// // //                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
// // //               }}
// // //               onBlock={() => {
// // //                 // wire up block logic here
// // //               }}
// // //               onThemeChange={(theme) => setChatTheme(theme)}
// // //               currentTheme={chatTheme}
// // //               anchorRef={chatOptionsRef}
// // //             />
// // //           </div>,
// // //           document.body,
// // //         )}
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft, Send, Smile } from "lucide-react";
// // // import { useContext, useState, useEffect, useRef } from "react";
// // // import { createPortal } from "react-dom";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";
// // // import ChatOptionsPopup from "../ChatOptionsPopup";

// // // const EMOJI_LIST = [
// // //   "😀",
// // //   "😂",
// // //   "😍",
// // //   "🥰",
// // //   "😎",
// // //   "🤔",
// // //   "😭",
// // //   "😡",
// // //   "🥺",
// // //   "😴",
// // //   "👍",
// // //   "👎",
// // //   "❤️",
// // //   "🔥",
// // //   "✨",
// // //   "🎉",
// // //   "🙏",
// // //   "💯",
// // //   "😊",
// // //   "🤣",
// // //   "😘",
// // //   "🥳",
// // //   "😤",
// // //   "🤯",
// // //   "😇",
// // //   "🤗",
// // //   "😏",
// // //   "🙄",
// // //   "😬",
// // //   "🤝",
// // //   "👀",
// // //   "💀",
// // //   "🫡",
// // //   "🫠",
// // //   "🥹",
// // //   "😮",
// // //   "😱",
// // //   "🤌",
// // //   "💪",
// // //   "👏",
// // //   "🍕",
// // //   "🎮",
// // //   "🎵",
// // //   "⚡",
// // //   "🌙",
// // //   "☀️",
// // //   "🌈",
// // //   "💫",
// // //   "🚀",
// // //   "🎯",
// // // ];

// // // // ── MESSAGE STATUS TICKS ──────────────────────────────
// // // function MessageStatus({ status }) {
// // //   if (status === "sending") {
// // //     return (
// // //       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// // //         <path
// // //           d="M1 5l3 3 5-6"
// // //           stroke="rgba(255,255,255,0.2)"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //       </svg>
// // //     );
// // //   }
// // //   if (status === "read") {
// // //     return (
// // //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// // //         <path
// // //           d="M1 5l3 3 5-6"
// // //           stroke="#60a5fa"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //         <path
// // //           d="M6 5l3 3 5-6"
// // //           stroke="#60a5fa"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //       </svg>
// // //     );
// // //   }
// // //   if (status === "delivered") {
// // //     return (
// // //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// // //         <path
// // //           d="M1 5l3 3 5-6"
// // //           stroke="rgba(255,255,255,0.35)"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //         <path
// // //           d="M6 5l3 3 5-6"
// // //           stroke="rgba(255,255,255,0.35)"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //       </svg>
// // //     );
// // //   }
// // //   // sent
// // //   return (
// // //     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// // //       <path
// // //         d="M1 5l3 3 5-6"
// // //         stroke="rgba(255,255,255,0.35)"
// // //         strokeWidth="1.6"
// // //         strokeLinecap="round"
// // //         strokeLinejoin="round"
// // //       />
// // //     </svg>
// // //   );
// // // }
// // // // ─────────────────────────────────────────────────────

// // // function MessageSkeleton() {
// // //   return (
// // //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function ChatBox({ chat, onBack, onNewMessage }) {
// // //   const { user } = useAuth();

// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const [fetchingMessages, setFetchingMessages] = useState(true);
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// // //   const [showChatOptions, setShowChatOptions] = useState(false);
// // //   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
// // //   const [chatTheme, setChatTheme] = useState({
// // //     id: "default",
// // //     label: "Default",
// // //     bg: "#0a0a0a",
// // //   });

// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const emojiPickerRef = useRef(null);
// // //   const chatOptionsRef = useRef(null);
// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;
// // //   const [hasMore, setHasMore] = useState(true);

// // //    const {
// // //      sendSignal,
// // //      messages,
// // //      setMessages,
// // //      markAsRead,
// // //      setCurrentConversation,
// // //    } = useContext(websocketContext);

// // //    useEffect(() => {
// // //      setCurrentConversation(conversationId);
// // //      return () => setCurrentConversation(null);
// // //    }, [conversationId]);
// // //   // ── MARK AS READ when new messages arrive while chat is open ──
// // //  useEffect(() => {
// // //    const convMessages = messages[conversationId] || [];
// // //    const hasUnread = convMessages.some(
// // //      (msg) => msg.from !== myUserId && msg.status !== "read",
// // //    );

// // //    if (!hasUnread) return;

// // //    // optimistically mark received messages as read in local state
// // //    setMessages((prev) => {
// // //      const existing = prev[conversationId] || [];
// // //      return {
// // //        ...prev,
// // //        [conversationId]: existing.map((msg) =>
// // //          msg.from !== myUserId && msg.status !== "read"
// // //            ? { ...msg, status: "read" }
// // //            : msg,
// // //        ),
// // //      };
// // //    });

// // //    markAsRead(conversationId);

// // //   fetchData(`/api/chat/conversations/${conversationId}/read`, {
// // //     // ← change here
// // //     method: "PATCH",
// // //     credentials: "include",
// // //   }).catch(() => {});
// // //  }, [messages[conversationId]]);
// // //   // ─────────────────────────────────────────────────────────────

// // //   // ── MARK AS READ when conversation opens ─────────────
// // //   useEffect(() => {
// // //     if (!conversationId) return;

// // //     markAsRead(conversationId);

// // // fetchData(`/api/chat/conversations/${conversationId}/read`, {
// // //   // ← change here
// // //   method: "PATCH",
// // //   credentials: "include",
// // // }).catch(() => {});
// // //   }, [conversationId]);
// // //   // ─────────────────────────────────────────────────────

// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (
// // //         emojiPickerRef.current &&
// // //         !emojiPickerRef.current.contains(e.target)
// // //       ) {
// // //         setShowEmojiPicker(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   useEffect(() => {
// // //     setHasMore(true);
// // //     setCursor(null);
// // //     setFetchingMessages(true);
// // //     setShowEmojiPicker(false);
// // //     setShowChatOptions(false);
// // //   }, [conversationId]);

// // //   const handleToggleChatOptions = () => {
// // //     if (!showChatOptions && chatOptionsRef.current) {
// // //       const rect = chatOptionsRef.current.getBoundingClientRect();
// // //       setPopupPos({
// // //         top: rect.bottom + 6,
// // //         right: window.innerWidth - rect.right,
// // //       });
// // //     }
// // //     setShowChatOptions((v) => !v);
// // //   };

// // //   const insertEmoji = (emoji) => {
// // //     const ta = textareaRef.current;
// // //     if (!ta) {
// // //       setText((prev) => prev + emoji);
// // //       return;
// // //     }
// // //     const start = ta.selectionStart;
// // //     const end = ta.selectionEnd;
// // //     const newText = text.slice(0, start) + emoji + text.slice(end);
// // //     setText(newText);
// // //     requestAnimationFrame(() => {
// // //       ta.focus();
// // //       ta.selectionStart = start + emoji.length;
// // //       ta.selectionEnd = start + emoji.length;
// // //       ta.style.height = "auto";
// // //       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
// // //     });
// // //   };

// // //   const handleSend = async () => {
// // //     if (!text.trim()) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     const messageText = text;

// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text: messageText,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });

// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text: messageText,
// // //       createdAt,
// // //     });

// // //     onNewMessage?.(conversationId, messageText);

// // //     setText("");
// // //     setShowEmojiPicker(false);
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     const el = messagesContainerRef.current;
// // //     const scrollHeightBefore = el ? el.scrollHeight : 0;
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       shouldAutoScrollRef.current = false;
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return { ...prev, [conversationId]: [...newMessages, ...existing] };
// // //       });
// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //       setTimeout(() => {
// // //         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
// // //       }, 50);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       const isNearBottom =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //       shouldAutoScrollRef.current = isNearBottom;
// // //     };
// // //     el.addEventListener("scroll", handleScroll);
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];
// // //           const ids = new Set(existing.map((m) => m.messageId));
// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //           return { ...prev, [conversationId]: [...existing, ...newMessages] };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       } finally {
// // //         setFetchingMessages(false);
// // //       }
// // //     };
// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (shouldAutoScrollRef.current) {
// // //       el.scrollTop = el.scrollHeight;
// // //     }
// // //   }, [messages[conversationId]]);

// // //   return (
// // //     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>
// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0 ring-2 ring-white/10">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>
// // //         <h3 className="font-semibold text-sm text-white truncate flex-1">
// // //           {otherUser.username}
// // //         </h3>
// // //         <div ref={chatOptionsRef} className="relative flex-shrink-0">
// // //           <button
// // //             onClick={handleToggleChatOptions}
// // //             className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
// // //           >
// // //             <svg
// // //               width="16"
// // //               height="16"
// // //               viewBox="0 0 24 24"
// // //               fill="none"
// // //               stroke="currentColor"
// // //               strokeWidth="2"
// // //               strokeLinecap="round"
// // //             >
// // //               <circle cx="12" cy="5" r="1" />
// // //               <circle cx="12" cy="12" r="1" />
// // //               <circle cx="12" cy="19" r="1" />
// // //             </svg>
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       {fetchingMessages ? (
// // //         <div className="flex-1 overflow-hidden">
// // //           <MessageSkeleton />
// // //         </div>
// // //       ) : (
// // //         <div
// // //           ref={messagesContainerRef}
// // //           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //           style={{
// // //             overscrollBehavior: "contain",
// // //             WebkitOverflowScrolling: "touch",
// // //             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
// // //             background: chatTheme.bg,
// // //             transition: "background 0.3s ease",
// // //           }}
// // //         >
// // //           {hasMore && messages[conversationId]?.length > 0 && (
// // //             <div className="flex justify-center mb-2">
// // //               <button
// // //                 onClick={loadOlderMessages}
// // //                 className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
// // //               >
// // //                 {loadingMore ? "Loading..." : "Load older messages"}
// // //               </button>
// // //             </div>
// // //           )}

// // //           {(!messages[conversationId] ||
// // //             messages[conversationId].length === 0) && (
// // //             <div className="text-center text-white/60 text-sm">
// // //               Start a conversation with {otherUser.username}
// // //             </div>
// // //           )}

// // //           {(messages[conversationId] || []).map((msg) => {
// // //             const isMe = msg.from === myUserId;
// // //             return (
// // //               <div key={msg.messageId}>
// // //                 <MessageBubble
// // //                   msg={msg}
// // //                   isMe={isMe}
// // //                   otherUser={otherUser}
// // //                   user={user}
// // //                 />

// // //               </div>
// // //             );
// // //           })}

// // //           <div className="h-2" />
// // //         </div>
// // //       )}

// // //       {/* INPUT */}
// // //       <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
// // //         {showEmojiPicker && (
// // //           <div
// // //             ref={emojiPickerRef}
// // //             className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
// // //           >
// // //             <div className="grid grid-cols-10 gap-1">
// // //               {EMOJI_LIST.map((emoji) => (
// // //                 <button
// // //                   key={emoji}
// // //                   onClick={() => insertEmoji(emoji)}
// // //                   className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
// // //                 >
// // //                   {emoji}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         <div className="flex items-end gap-2">
// // //           <button
// // //             onClick={() => setShowEmojiPicker((prev) => !prev)}
// // //             className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
// // //               showEmojiPicker
// // //                 ? "bg-indigo-600 border-indigo-500 text-white"
// // //                 : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// // //             }`}
// // //           >
// // //             <Smile size={17} />
// // //           </button>

// // //           <textarea
// // //             ref={textareaRef}
// // //             rows={1}
// // //             value={text}
// // //             onChange={(e) => {
// // //               setText(e.target.value);
// // //               e.target.style.height = "auto";
// // //               e.target.style.height =
// // //                 Math.min(e.target.scrollHeight, 112) + "px";
// // //             }}
// // //             onKeyDown={(e) => {
// // //               if (e.key === "Enter" && !e.shiftKey) {
// // //                 e.preventDefault();
// // //                 handleSend();
// // //               }
// // //             }}
// // //             placeholder="Type a message..."
// // //             className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// // //             style={{ maxHeight: "112px", fontSize: "16px" }}
// // //           />

// // //           <button
// // //             onClick={handleSend}
// // //             disabled={!text.trim()}
// // //             className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
// // //           >
// // //             <Send size={16} className="text-white ml-0.5" />
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {showChatOptions &&
// // //         createPortal(
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: popupPos.top,
// // //               right: popupPos.right,
// // //               zIndex: 99999,
// // //             }}
// // //           >
// // //             <ChatOptionsPopup
// // //               onClose={() => setShowChatOptions(false)}
// // //               onClearChat={() =>
// // //                 setMessages((prev) => ({ ...prev, [conversationId]: [] }))
// // //               }
// // //               onBlock={() => {}}
// // //               onThemeChange={(theme) => setChatTheme(theme)}
// // //               currentTheme={chatTheme}
// // //               anchorRef={chatOptionsRef}
// // //             />
// // //           </div>,
// // //           document.body,
// // //         )}
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft, Send, Smile } from "lucide-react";
// // // import { useContext, useState, useEffect, useRef } from "react";
// // // import { createPortal } from "react-dom";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";
// // // import ChatOptionsPopup from "../ChatOptionsPopup";
// // // import { useNavigate } from "react-router-dom";

// // // const EMOJI_LIST = [
// // //   "😀",
// // //   "😂",
// // //   "😍",
// // //   "🥰",
// // //   "😎",
// // //   "🤔",
// // //   "😭",
// // //   "😡",
// // //   "🥺",
// // //   "😴",
// // //   "👍",
// // //   "👎",
// // //   "❤️",
// // //   "🔥",
// // //   "✨",
// // //   "🎉",
// // //   "🙏",
// // //   "💯",
// // //   "😊",
// // //   "🤣",
// // //   "😘",
// // //   "🥳",
// // //   "😤",
// // //   "🤯",
// // //   "😇",
// // //   "🤗",
// // //   "😏",
// // //   "🙄",
// // //   "😬",
// // //   "🤝",
// // //   "👀",
// // //   "💀",
// // //   "🫡",
// // //   "🫠",
// // //   "🥹",
// // //   "😮",
// // //   "😱",
// // //   "🤌",
// // //   "💪",
// // //   "👏",
// // //   "🍕",
// // //   "🎮",
// // //   "🎵",
// // //   "⚡",
// // //   "🌙",
// // //   "☀️",
// // //   "🌈",
// // //   "💫",
// // //   "🚀",
// // //   "🎯",
// // // ];

// // // function MessageStatus({ status }) {

// // //    if (status === "blocked") {
// // //      return (
// // //        <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>
// // //      );
// // //    }

// // //   if (status === "sending") {
// // //     return (
// // //       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// // //         <path
// // //           d="M1 5l3 3 5-6"
// // //           stroke="rgba(255,255,255,0.2)"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //       </svg>
// // //     );
// // //   }
// // //   if (status === "read") {
// // //     return (
// // //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// // //         <path
// // //           d="M1 5l3 3 5-6"
// // //           stroke="#60a5fa"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //         <path
// // //           d="M6 5l3 3 5-6"
// // //           stroke="#60a5fa"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //       </svg>
// // //     );
// // //   }
// // //   if (status === "delivered") {
// // //     return (
// // //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// // //         <path
// // //           d="M1 5l3 3 5-6"
// // //           stroke="rgba(255,255,255,0.35)"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //         <path
// // //           d="M6 5l3 3 5-6"
// // //           stroke="rgba(255,255,255,0.35)"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //       </svg>
// // //     );
// // //   }
// // //   return (
// // //     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// // //       <path
// // //         d="M1 5l3 3 5-6"
// // //         stroke="rgba(255,255,255,0.35)"
// // //         strokeWidth="1.6"
// // //         strokeLinecap="round"
// // //         strokeLinejoin="round"
// // //       />
// // //     </svg>
// // //   );
// // // }

// // // function MessageSkeleton() {
// // //   return (
// // //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function ChatBox({ chat, onBack, onNewMessage, onClearMessages }) {
// // //   const { user } = useAuth();

// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const [fetchingMessages, setFetchingMessages] = useState(true);
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// // //   const [showChatOptions, setShowChatOptions] = useState(false);
// // //   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
// // //   const [chatTheme, setChatTheme] = useState({
// // //     id: "default",
// // //     label: "Default",
// // //     bg: "#0a0a0a",
// // //   });
// // //   const [isBlocked, setIsBlocked] = useState(false);

// // //   const navigate = useNavigate();

// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const emojiPickerRef = useRef(null);
// // //   const chatOptionsRef = useRef(null);
// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   if (!otherUser) return null;

// // //   const receiverId = otherUser._id;
// // //   const [hasMore, setHasMore] = useState(true);

// // //   const {
// // //     sendSignal,
// // //     messages,
// // //     setMessages,
// // //     markAsRead,
// // //     setCurrentConversation,
// // //   } = useContext(websocketContext);

// // //   // Add this useEffect after the other useEffects in ChatBox
// // //   useEffect(() => {
// // //     if (!receiverId) return;
// // //     const checkBlockStatus = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/users/${receiverId}/block-status`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         setIsBlocked(data.isBlocked);
// // //       } catch (err) {
// // //         console.error("Failed to fetch block status", err);
// // //       }
// // //     };
// // //     checkBlockStatus();
// // //   }, [receiverId]);

// // //   useEffect(() => {
// // //     setCurrentConversation(conversationId);
// // //     return () => setCurrentConversation(null);
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const convMessages = messages[conversationId] || [];
// // //     const hasUnread = convMessages.some(
// // //       (msg) => msg.from !== myUserId && msg.status !== "read",
// // //     );
// // //     if (!hasUnread) return;
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: existing.map((msg) =>
// // //           msg.from !== myUserId && msg.status !== "read"
// // //             ? { ...msg, status: "read" }
// // //             : msg,
// // //         ),
// // //       };
// // //     });
// // //     markAsRead(conversationId);
// // //     fetchData(`/api/chat/conversations/${conversationId}/read`, {
// // //       method: "PATCH",
// // //       credentials: "include",
// // //     }).catch(() => {});
// // //   }, [messages[conversationId]]);

// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     markAsRead(conversationId);
// // //     fetchData(`/api/chat/conversations/${conversationId}/read`, {
// // //       method: "PATCH",
// // //       credentials: "include",
// // //     }).catch(() => {});
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (
// // //         emojiPickerRef.current &&
// // //         !emojiPickerRef.current.contains(e.target)
// // //       ) {
// // //         setShowEmojiPicker(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   useEffect(() => {
// // //     setHasMore(true);
// // //     setCursor(null);
// // //     setFetchingMessages(true);
// // //     setShowEmojiPicker(false);
// // //     setShowChatOptions(false);
// // //     setIsBlocked(false);
// // //   }, [conversationId]);

// // //   const handleToggleChatOptions = () => {
// // //     if (!showChatOptions && chatOptionsRef.current) {
// // //       const rect = chatOptionsRef.current.getBoundingClientRect();
// // //       setPopupPos({
// // //         top: rect.bottom + 6,
// // //         right: window.innerWidth - rect.right,
// // //       });
// // //     }
// // //     setShowChatOptions((v) => !v);
// // //   };

// // //   const insertEmoji = (emoji) => {
// // //     const ta = textareaRef.current;
// // //     if (!ta) {
// // //       setText((prev) => prev + emoji);
// // //       return;
// // //     }
// // //     const start = ta.selectionStart;
// // //     const end = ta.selectionEnd;
// // //     const newText = text.slice(0, start) + emoji + text.slice(end);
// // //     setText(newText);
// // //     requestAnimationFrame(() => {
// // //       ta.focus();
// // //       ta.selectionStart = start + emoji.length;
// // //       ta.selectionEnd = start + emoji.length;
// // //       ta.style.height = "auto";
// // //       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
// // //     });
// // //   };

// // //   const handleSend = async () => {
// // //     if (!text.trim() || isBlocked) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     const messageText = text;

// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text: messageText,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });

// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text: messageText,
// // //       createdAt,
// // //     });

// // //     onNewMessage?.(conversationId, messageText);
// // //     setText("");
// // //     setShowEmojiPicker(false);
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //   };

// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     const el = messagesContainerRef.current;
// // //     const scrollHeightBefore = el ? el.scrollHeight : 0;
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       shouldAutoScrollRef.current = false;
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return { ...prev, [conversationId]: [...newMessages, ...existing] };
// // //       });
// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //       setTimeout(() => {
// // //         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
// // //       }, 50);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   };

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       const isNearBottom =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //       shouldAutoScrollRef.current = isNearBottom;
// // //     };
// // //     el.addEventListener("scroll", handleScroll);
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         setMessages((prev) => {
// // //           const existing = prev[conversationId] || [];
// // //           const ids = new Set(existing.map((m) => m.messageId));
// // //           const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //           return { ...prev, [conversationId]: [...existing, ...newMessages] };
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       } finally {
// // //         setFetchingMessages(false);
// // //       }
// // //     };
// // //     fetchMessages();
// // //   }, [conversationId]);

// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (shouldAutoScrollRef.current) {
// // //       el.scrollTop = el.scrollHeight;
// // //     }
// // //   }, [messages[conversationId]]);

// // //   return (
// // //     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>
// // //         <div
// // //           onClick={() => navigate(`/profile/${otherUser.username}`)}
// // //           className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 ... cursor-pointer hover:opacity-80 transition-opacity duration-150"
// // //         >
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>
// // //         <div className="flex flex-col flex-1 min-w-0">
// // //           <h3
// // //             onClick={() => navigate(`/profile/${otherUser.username}`)}
// // //             className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
// // //           >
// // //             {otherUser.username}
// // //           </h3>
// // //           {isBlocked && (
// // //             <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
// // //               Blocked
// // //             </span>
// // //           )}
// // //         </div>
// // //         <div ref={chatOptionsRef} className="relative flex-shrink-0">
// // //           <button
// // //             onClick={handleToggleChatOptions}
// // //             className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
// // //           >
// // //             <svg
// // //               width="16"
// // //               height="16"
// // //               viewBox="0 0 24 24"
// // //               fill="none"
// // //               stroke="currentColor"
// // //               strokeWidth="2"
// // //               strokeLinecap="round"
// // //             >
// // //               <circle cx="12" cy="5" r="1" />
// // //               <circle cx="12" cy="12" r="1" />
// // //               <circle cx="12" cy="19" r="1" />
// // //             </svg>
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       {fetchingMessages ? (
// // //         <div className="flex-1 overflow-hidden">
// // //           <MessageSkeleton />
// // //         </div>
// // //       ) : (
// // //         <div
// // //           ref={messagesContainerRef}
// // //           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //           style={{
// // //             overscrollBehavior: "contain",
// // //             WebkitOverflowScrolling: "touch",
// // //             animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
// // //             background: chatTheme.bg,
// // //             transition: "background 0.3s ease",
// // //           }}
// // //         >
// // //           {hasMore && messages[conversationId]?.length > 0 && (
// // //             <div className="flex justify-center mb-2">
// // //               <button
// // //                 onClick={loadOlderMessages}
// // //                 className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide"
// // //               >
// // //                 {loadingMore ? "Loading..." : "Load older messages"}
// // //               </button>
// // //             </div>
// // //           )}

// // //           {(!messages[conversationId] ||
// // //             messages[conversationId].length === 0) && (
// // //             <div className="text-center text-white/60 text-sm">
// // //               Start a conversation with {otherUser.username}
// // //             </div>
// // //           )}

// // //           {(messages[conversationId] || []).map((msg) => {
// // //             const isMe = msg.from === myUserId;
// // //             return (
// // //               <div key={msg.messageId}>
// // //                 <MessageBubble
// // //                   msg={msg}
// // //                   isMe={isMe}
// // //                   otherUser={otherUser}
// // //                   user={user}
// // //                 />
// // //               </div>
// // //             );
// // //           })}

// // //           <div className="h-2" />
// // //         </div>
// // //       )}

// // //       {/* BLOCKED BANNER — replaces input when user is blocked */}
// // //       {isBlocked ? (
// // //         <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
// // //           <svg
// // //             width="16"
// // //             height="16"
// // //             viewBox="0 0 24 24"
// // //             fill="none"
// // //             stroke="#f87171"
// // //             strokeWidth="1.8"
// // //             strokeLinecap="round"
// // //             strokeLinejoin="round"
// // //           >
// // //             <circle cx="12" cy="12" r="10" />
// // //             <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
// // //           </svg>
// // //           <p className="text-sm text-white/40 text-center">
// // //             You have blocked{" "}
// // //             <span className="text-white/60 font-medium">
// // //               {otherUser.username}
// // //             </span>
// // //             . They can no longer message you.
// // //           </p>
// // //         </div>
// // //       ) : (
// // //         /* INPUT */
// // //         <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
// // //           {showEmojiPicker && (
// // //             <div
// // //               ref={emojiPickerRef}
// // //               className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
// // //             >
// // //               <div className="grid grid-cols-10 gap-1">
// // //                 {EMOJI_LIST.map((emoji) => (
// // //                   <button
// // //                     key={emoji}
// // //                     onClick={() => insertEmoji(emoji)}
// // //                     className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
// // //                   >
// // //                     {emoji}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}

// // //           <div className="flex items-end gap-2">
// // //             <button
// // //               onClick={() => setShowEmojiPicker((prev) => !prev)}
// // //               className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
// // //                 showEmojiPicker
// // //                   ? "bg-indigo-600 border-indigo-500 text-white"
// // //                   : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// // //               }`}
// // //             >
// // //               <Smile size={17} />
// // //             </button>

// // //             <textarea
// // //               ref={textareaRef}
// // //               rows={1}
// // //               value={text}
// // //               onChange={(e) => {
// // //                 setText(e.target.value);
// // //                 e.target.style.height = "auto";
// // //                 e.target.style.height =
// // //                   Math.min(e.target.scrollHeight, 112) + "px";
// // //               }}
// // //               onKeyDown={(e) => {
// // //                 if (e.key === "Enter" && !e.shiftKey) {
// // //                   e.preventDefault();
// // //                   handleSend();
// // //                 }
// // //               }}
// // //               placeholder="Type a message..."
// // //               className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// // //               style={{ maxHeight: "112px", fontSize: "16px" }}
// // //             />

// // //             <button
// // //               onClick={handleSend}
// // //               disabled={!text.trim()}
// // //               className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
// // //             >
// // //               <Send size={16} className="text-white ml-0.5" />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {showChatOptions &&
// // //         createPortal(
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: popupPos.top,
// // //               right: popupPos.right,
// // //               zIndex: 99999,
// // //             }}
// // //           >
// // //             <ChatOptionsPopup
// // //               onClose={() => setShowChatOptions(false)}
// // //               onClearChat={() => {
// // //                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
// // //                 onClearMessages?.(conversationId); // ← add this
// // //               }}
// // //               onBlock={() => setIsBlocked(true)}
// // //               onThemeChange={(theme) => setChatTheme(theme)}
// // //               currentTheme={chatTheme}
// // //               anchorRef={chatOptionsRef}
// // //               conversationId={conversationId}
// // //               otherUserId={receiverId}
// // //               isBlocked={isBlocked} // ← add this
// // //               onUnblock={() => setIsBlocked(false)} // ← add this
// // //             />
// // //           </div>,
// // //           document.body,
// // //         )}
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // import { ArrowLeft, Send, Smile } from "lucide-react";
// // // import { useContext, useState, useEffect, useRef, useCallback } from "react";
// // // import { createPortal } from "react-dom";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";
// // // import ChatOptionsPopup from "../ChatOptionsPopup";
// // // import { useNavigate } from "react-router-dom";

// // // const EMOJI_LIST = [
// // //   "😀","😂","😍","🥰","😎","🤔","😭","😡","🥺","😴",
// // //   "👍","👎","❤️","🔥","✨","🎉","🙏","💯","😊","🤣",
// // //   "😘","🥳","😤","🤯","😇","🤗","😏","🙄","😬","🤝",
// // //   "👀","💀","🫡","🫠","🥹","😮","😱","🤌","💪","👏",
// // //   "🍕","🎮","🎵","⚡","🌙","☀️","🌈","💫","🚀","🎯",
// // // ];

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // MessageStatus
// // // // Renders the correct tick icon based on the message status string.
// // // //
// // // // Status lifecycle (MY messages):
// // // //   "sending"   → single grey tick   (optimistic, not yet ACK'd by server)
// // // //   "sent"      → single grey tick   (server stored it, recipient hasn't received yet)
// // // //   "delivered" → double grey ticks  (recipient's device received it)
// // // //   "read"      → double blue ticks  (recipient opened the chat)
// // // //   "blocked"   → red "Not delivered" text
// // // //
// // // // Status lifecycle (THEIR messages):
// // // //   "sent" / "delivered" / "read" — we don't render a tick for incoming messages
// // // // ─────────────────────────────────────────────────────────────────────────────
// // // function MessageStatus({ status }) {
// // //   if (status === "blocked") {
// // //     return <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>;
// // //   }

// // //   // Single grey tick — message is in-flight or stored but not yet delivered
// // //   if (status === "sending" || status === "sent") {
// // //     return (
// // //       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// // //         <path
// // //           d="M1 5l3 3 5-6"
// // //           stroke="rgba(255,255,255,0.35)"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //       </svg>
// // //     );
// // //   }

// // //   // Double blue ticks — recipient has read the message
// // //   if (status === "read") {
// // //     return (
// // //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// // //         <path d="M1 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //         <path d="M6 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //       </svg>
// // //     );
// // //   }

// // //   // Double grey ticks — delivered but not yet read
// // //   if (status === "delivered") {
// // //     return (
// // //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// // //         <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //         <path d="M6 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //       </svg>
// // //     );
// // //   }

// // //   // Fallback — single grey tick (shouldn't normally be hit)
// // //   return (
// // //     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// // //       <path
// // //         d="M1 5l3 3 5-6"
// // //         stroke="rgba(255,255,255,0.35)"
// // //         strokeWidth="1.6"
// // //         strokeLinecap="round"
// // //         strokeLinejoin="round"
// // //       />
// // //     </svg>
// // //   );
// // // }

// // // function MessageSkeleton() {
// // //   return (
// // //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // ChatBox
// // // // ─────────────────────────────────────────────────────────────────────────────
// // // function ChatBox({ chat, onBack, onNewMessage, onClearMessages }) {
// // //   const { user } = useAuth();

// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const [fetchingMessages, setFetchingMessages] = useState(true);
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// // //   const [showChatOptions, setShowChatOptions] = useState(false);
// // //   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
// // //   const [chatTheme, setChatTheme] = useState({
// // //     id: "default",
// // //     label: "Default",
// // //     bg: "#0a0a0a",
// // //   });
// // //   const [isBlocked, setIsBlocked] = useState(false);
// // //   const [hasMore, setHasMore] = useState(true);

// // //   const navigate = useNavigate();

// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   // true  → scroll to bottom on next paint (new message or initial load)
// // //   // false → preserve scroll position (loading older messages)
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const emojiPickerRef = useRef(null);
// // //   const chatOptionsRef = useRef(null);
// // //   // Tracks whether we have already dispatched a read-mark for this conversation
// // //   // to avoid duplicate PATCH calls from competing useEffects.
// // //   const readMarkedRef = useRef(false);

// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   const {
// // //     sendSignal,
// // //     messages,
// // //     setMessages,
// // //     markAsRead,
// // //     setCurrentConversation,
// // //   } = useContext(websocketContext);

// // //   if (!otherUser) return null;
// // //   const receiverId = otherUser._id;

// // //   // ── Block status ────────────────────────────────────────────────────────
// // //   useEffect(() => {
// // //     if (!receiverId) return;
// // //     let cancelled = false;
// // //     const checkBlockStatus = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/users/${receiverId}/block-status`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         if (!cancelled) setIsBlocked(data.isBlocked);
// // //       } catch (err) {
// // //         console.error("Failed to fetch block status", err);
// // //       }
// // //     };
// // //     checkBlockStatus();
// // //     return () => { cancelled = true; };
// // //   }, [receiverId]);

// // //   // ── Register current conversation with WS context ───────────────────────
// // //   useEffect(() => {
// // //     setCurrentConversation(conversationId);
// // //     return () => setCurrentConversation(null);
// // //   }, [conversationId, setCurrentConversation]);

// // //   // ── Reset all local state when switching conversations ──────────────────
// // //   useEffect(() => {
// // //     setHasMore(true);
// // //     setCursor(null);
// // //     setFetchingMessages(true);
// // //     setShowEmojiPicker(false);
// // //     setShowChatOptions(false);
// // //     setIsBlocked(false);
// // //     readMarkedRef.current = false;
// // //     shouldAutoScrollRef.current = true;
// // //   }, [conversationId]);

// // //   // ── Mark messages as read (single, deduplicated call per conversation) ──
// // //   //
// // //   // FIX: Previously there were TWO competing useEffects both calling markAsRead
// // //   // and the PATCH endpoint — one watching [conversationId] and one watching
// // //   // [messages[conversationId]]. This caused duplicate network requests and
// // //   // race conditions. Now we have ONE effect that fires when the conversation
// // //   // changes OR when new messages arrive, but only sends the network call once
// // //   // per conversation session via readMarkedRef.
// // //   const doMarkRead = useCallback(() => {
// // //     const convMessages = messages[conversationId] || [];
// // //     const hasUnread = convMessages.some(
// // //       (msg) => msg.from !== myUserId && msg.status !== "read",
// // //     );
// // //     if (!hasUnread) return;

// // //     // Optimistically flip statuses in state
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: existing.map((msg) =>
// // //           msg.from !== myUserId && msg.status !== "read"
// // //             ? { ...msg, status: "read" }
// // //             : msg,
// // //         ),
// // //       };
// // //     });

// // //     markAsRead(conversationId);

// // //     if (!readMarkedRef.current) {
// // //       readMarkedRef.current = true;
// // //       fetchData(`/api/chat/conversations/${conversationId}/read`, {
// // //         method: "PATCH",
// // //         credentials: "include",
// // //       }).catch(() => {});
// // //     }
// // //   }, [conversationId, messages, myUserId, markAsRead, setMessages]);

// // //   // Fire on mount (conversation open) and whenever new messages land
// // //   useEffect(() => {
// // //     doMarkRead();
// // //     // Re-arm for the next batch of incoming messages
// // //     readMarkedRef.current = false;
// // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [conversationId, messages[conversationId]?.length]);

// // //   // ── Emoji picker close on outside click ────────────────────────────────
// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
// // //         setShowEmojiPicker(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   // ── Chat options toggle ─────────────────────────────────────────────────
// // //   const handleToggleChatOptions = () => {
// // //     if (!showChatOptions && chatOptionsRef.current) {
// // //       const rect = chatOptionsRef.current.getBoundingClientRect();
// // //       setPopupPos({
// // //         top: rect.bottom + 6,
// // //         right: window.innerWidth - rect.right,
// // //       });
// // //     }
// // //     setShowChatOptions((v) => !v);
// // //   };

// // //   // ── Emoji insertion ─────────────────────────────────────────────────────
// // //   const insertEmoji = (emoji) => {
// // //     const ta = textareaRef.current;
// // //     if (!ta) {
// // //       setText((prev) => prev + emoji);
// // //       return;
// // //     }
// // //     const start = ta.selectionStart;
// // //     const end = ta.selectionEnd;
// // //     const newText = text.slice(0, start) + emoji + text.slice(end);
// // //     setText(newText);
// // //     requestAnimationFrame(() => {
// // //       ta.focus();
// // //       ta.selectionStart = start + emoji.length;
// // //       ta.selectionEnd = start + emoji.length;
// // //       ta.style.height = "auto";
// // //       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
// // //     });
// // //   };

// // //   // ── Send ────────────────────────────────────────────────────────────────
// // //   const handleSend = async () => {
// // //     if (!text.trim() || isBlocked) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     const messageText = text;

// // //     // Optimistic message — starts as "sending"
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text: messageText,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });

// // //     // Tell the WS context to emit the signal. Your WebSocket context should
// // //     // listen for an ACK from the server and call something like:
// // //     //
// // //     //   setMessages(prev => ({
// // //     //     ...prev,
// // //     //     [conversationId]: prev[conversationId].map(m =>
// // //     //       m.messageId === ack.messageId ? { ...m, status: "sent" } : m
// // //     //     )
// // //     //   }));
// // //     //
// // //     // That transitions "sending" → "sent" (single tick).
// // //     // The server then pushes "delivered" and "read" updates through the socket.
// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text: messageText,
// // //       createdAt,
// // //     });

// // //     onNewMessage?.(conversationId, messageText);
// // //     setText("");
// // //     setShowEmojiPicker(false);
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //     // Ensure we scroll to the bottom for our own sent message
// // //     shouldAutoScrollRef.current = true;
// // //   };

// // //   // ── Load older messages ─────────────────────────────────────────────────
// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     const el = messagesContainerRef.current;
// // //     const scrollHeightBefore = el ? el.scrollHeight : 0;
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       // Do NOT auto-scroll — we want the viewport to stay where it was
// // //       shouldAutoScrollRef.current = false;
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return { ...prev, [conversationId]: [...newMessages, ...existing] };
// // //       });
// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //       // Restore the scroll position after prepend
// // //       setTimeout(() => {
// // //         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
// // //       }, 50);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   };

// // //   // ── Track whether user is near the bottom ─────────────────────────────
// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       shouldAutoScrollRef.current =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //     };
// // //     el.addEventListener("scroll", handleScroll, { passive: true });
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   // ── Initial message fetch ───────────────────────────────────────────────
// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     let cancelled = false;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         if (!cancelled) {
// // //           setMessages((prev) => {
// // //             const existing = prev[conversationId] || [];
// // //             const ids = new Set(existing.map((m) => m.messageId));
// // //             const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //             return { ...prev, [conversationId]: [...existing, ...newMessages] };
// // //           });
// // //         }
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       } finally {
// // //         if (!cancelled) setFetchingMessages(false);
// // //       }
// // //     };
// // //     fetchMessages();
// // //     return () => { cancelled = true; };
// // //   }, [conversationId]);

// // //   // ── Auto-scroll to bottom when messages update ─────────────────────────
// // //   //
// // //   // FIX: The original code did `el.scrollTop = el.scrollHeight` synchronously
// // //   // after setMessages, i.e. before the DOM had repainted. The new message
// // //   // bubble hadn't been rendered yet so scrollHeight was stale, causing the
// // //   // list to scroll short by exactly one message height. We now defer to
// // //   // requestAnimationFrame so the browser has committed the paint first.
// // //   const convMessages = messages[conversationId];
// // //   useEffect(() => {
// // //     if (!shouldAutoScrollRef.current) return;
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     requestAnimationFrame(() => {
// // //       el.scrollTop = el.scrollHeight;
// // //     });
// // //   }, [convMessages]);

// // //   // ── Render ─────────────────────────────────────────────────────────────
// // //   return (
// // //     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>
// // //         <div
// // //           onClick={() => navigate(`/profile/${otherUser.username}`)}
// // //           className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 cursor-pointer hover:opacity-80 transition-opacity duration-150 flex items-center justify-center"
// // //         >
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>
// // //         <div className="flex flex-col flex-1 min-w-0">
// // //           <h3
// // //             onClick={() => navigate(`/profile/${otherUser.username}`)}
// // //             className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
// // //           >
// // //             {otherUser.username}
// // //           </h3>
// // //           {isBlocked && (
// // //             <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
// // //               Blocked
// // //             </span>
// // //           )}
// // //         </div>
// // //         <div ref={chatOptionsRef} className="relative flex-shrink-0">
// // //           <button
// // //             onClick={handleToggleChatOptions}
// // //             className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
// // //           >
// // //             <svg
// // //               width="16"
// // //               height="16"
// // //               viewBox="0 0 24 24"
// // //               fill="none"
// // //               stroke="currentColor"
// // //               strokeWidth="2"
// // //               strokeLinecap="round"
// // //             >
// // //               <circle cx="12" cy="5" r="1" />
// // //               <circle cx="12" cy="12" r="1" />
// // //               <circle cx="12" cy="19" r="1" />
// // //             </svg>
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       {fetchingMessages ? (
// // //         <div className="flex-1 overflow-hidden">
// // //           <MessageSkeleton />
// // //         </div>
// // //       ) : (
// // //         <div
// // //           ref={messagesContainerRef}
// // //           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //           style={{
// // //             overscrollBehavior: "contain",
// // //             WebkitOverflowScrolling: "touch",
// // //             background: chatTheme.bg,
// // //             transition: "background 0.3s ease",
// // //           }}
// // //         >
// // //           {hasMore && messages[conversationId]?.length > 0 && (
// // //             <div className="flex justify-center mb-2">
// // //               <button
// // //                 onClick={loadOlderMessages}
// // //                 disabled={loadingMore}
// // //                 className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide disabled:opacity-50"
// // //               >
// // //                 {loadingMore ? "Loading…" : "Load older messages"}
// // //               </button>
// // //             </div>
// // //           )}

// // //           {(!messages[conversationId] ||
// // //             messages[conversationId].length === 0) && (
// // //             <div className="text-center text-white/60 text-sm">
// // //               Start a conversation with {otherUser.username}
// // //             </div>
// // //           )}

// // //           {(messages[conversationId] || []).map((msg) => {
// // //             const isMe = msg.from === myUserId;
// // //             return (
// // //               <div key={msg.messageId}>
// // //                 <MessageBubble
// // //                   msg={msg}
// // //                   isMe={isMe}
// // //                   otherUser={otherUser}
// // //                   user={user}
// // //                   // Pass MessageStatus so MessageBubble can render ticks inline
// // //                   StatusComponent={isMe ? MessageStatus : null}
// // //                 />
// // //               </div>
// // //             );
// // //           })}

// // //           <div className="h-2" />
// // //         </div>
// // //       )}

// // //       {/* BLOCKED BANNER */}
// // //       {isBlocked ? (
// // //         <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
// // //           <svg
// // //             width="16"
// // //             height="16"
// // //             viewBox="0 0 24 24"
// // //             fill="none"
// // //             stroke="#f87171"
// // //             strokeWidth="1.8"
// // //             strokeLinecap="round"
// // //             strokeLinejoin="round"
// // //           >
// // //             <circle cx="12" cy="12" r="10" />
// // //             <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
// // //           </svg>
// // //           <p className="text-sm text-white/40 text-center">
// // //             You have blocked{" "}
// // //             <span className="text-white/60 font-medium">
// // //               {otherUser.username}
// // //             </span>
// // //             . They can no longer message you.
// // //           </p>
// // //         </div>
// // //       ) : (
// // //         /* INPUT */
// // //         <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
// // //           {showEmojiPicker && (
// // //             <div
// // //               ref={emojiPickerRef}
// // //               className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
// // //             >
// // //               <div className="grid grid-cols-10 gap-1">
// // //                 {EMOJI_LIST.map((emoji) => (
// // //                   <button
// // //                     key={emoji}
// // //                     onClick={() => insertEmoji(emoji)}
// // //                     className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
// // //                   >
// // //                     {emoji}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}

// // //           <div className="flex items-end gap-2">
// // //             <button
// // //               onClick={() => setShowEmojiPicker((prev) => !prev)}
// // //               className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
// // //                 showEmojiPicker
// // //                   ? "bg-indigo-600 border-indigo-500 text-white"
// // //                   : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// // //               }`}
// // //             >
// // //               <Smile size={17} />
// // //             </button>

// // //             <textarea
// // //               ref={textareaRef}
// // //               rows={1}
// // //               value={text}
// // //               onChange={(e) => {
// // //                 setText(e.target.value);
// // //                 e.target.style.height = "auto";
// // //                 e.target.style.height =
// // //                   Math.min(e.target.scrollHeight, 112) + "px";
// // //               }}
// // //               onKeyDown={(e) => {
// // //                 if (e.key === "Enter" && !e.shiftKey) {
// // //                   e.preventDefault();
// // //                   handleSend();
// // //                 }
// // //               }}
// // //               placeholder="Type a message…"
// // //               className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// // //               style={{ maxHeight: "112px", fontSize: "16px" }}
// // //             />

// // //             <button
// // //               onClick={handleSend}
// // //               disabled={!text.trim()}
// // //               className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
// // //             >
// // //               <Send size={16} className="text-white ml-0.5" />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {showChatOptions &&
// // //         createPortal(
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: popupPos.top,
// // //               right: popupPos.right,
// // //               zIndex: 99999,
// // //             }}
// // //           >
// // //             <ChatOptionsPopup
// // //               onClose={() => setShowChatOptions(false)}
// // //               onClearChat={() => {
// // //                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
// // //                 onClearMessages?.(conversationId);
// // //               }}
// // //               onBlock={() => setIsBlocked(true)}
// // //               onThemeChange={(theme) => setChatTheme(theme)}
// // //               currentTheme={chatTheme}
// // //               anchorRef={chatOptionsRef}
// // //               conversationId={conversationId}
// // //               otherUserId={receiverId}
// // //               isBlocked={isBlocked}
// // //               onUnblock={() => setIsBlocked(false)}
// // //             />
// // //           </div>,
// // //           document.body,
// // //         )}
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // WEBSOCKET CONTEXT — what the server ACK handler should look like
// // // // (add this to your websocketContext provider, not in this file)
// // // // ─────────────────────────────────────────────────────────────────────────────
// // // //
// // // // ws.onmessage = (event) => {
// // // //   const signal = JSON.parse(event.data);
// // // //
// // // //   // Server ACK: message stored → "sending" → "sent" (single grey tick)
// // // //   if (signal.type === "message_ack") {
// // // //     setMessages(prev => ({
// // // //       ...prev,
// // // //       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
// // // //         m.messageId === signal.messageId ? { ...m, status: "sent" } : m
// // // //       ),
// // // //     }));
// // // //   }
// // // //
// // // //   // Recipient's device received it → "sent" → "delivered" (double grey ticks)
// // // //   if (signal.type === "message_delivered") {
// // // //     setMessages(prev => ({
// // // //       ...prev,
// // // //       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
// // // //         m.messageId === signal.messageId ? { ...m, status: "delivered" } : m
// // // //       ),
// // // //     }));
// // // //   }
// // // //
// // // //   // Recipient opened the chat → "delivered" → "read" (double blue ticks)
// // // //   if (signal.type === "message_read") {
// // // //     setMessages(prev => ({
// // // //       ...prev,
// // // //       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
// // // //         m.conversationId === signal.conversationId && m.status !== "read"
// // // //           ? { ...m, status: "read" }
// // // //           : m
// // // //       ),
// // // //     }));
// // // //   }
// // // // };

// // // import { ArrowLeft, Send, Smile } from "lucide-react";
// // // import { useContext, useState, useEffect, useRef, useCallback } from "react";
// // // import { createPortal } from "react-dom";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";
// // // import ChatOptionsPopup from "../ChatOptionsPopup";
// // // import { useNavigate } from "react-router-dom";

// // // const EMOJI_LIST = [
// // //   "😀","😂","😍","🥰","😎","🤔","😭","😡","🥺","😴",
// // //   "👍","👎","❤️","🔥","✨","🎉","🙏","💯","😊","🤣",
// // //   "😘","🥳","😤","🤯","😇","🤗","😏","🙄","😬","🤝",
// // //   "👀","💀","🫡","🫠","🥹","😮","😱","🤌","💪","👏",
// // //   "🍕","🎮","🎵","⚡","🌙","☀️","🌈","💫","🚀","🎯",
// // // ];

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // MessageStatus
// // // // Renders the correct tick icon based on the message status string.
// // // //
// // // // Status lifecycle (MY messages):
// // // //   "sending"   → single grey tick   (optimistic, not yet ACK'd by server)
// // // //   "sent"      → single grey tick   (server stored it, recipient hasn't received yet)
// // // //   "delivered" → double grey ticks  (recipient's device received it)
// // // //   "read"      → double blue ticks  (recipient opened the chat)
// // // //   "blocked"   → red "Not delivered" text
// // // //
// // // // Status lifecycle (THEIR messages):
// // // //   "sent" / "delivered" / "read" — we don't render a tick for incoming messages
// // // // ─────────────────────────────────────────────────────────────────────────────
// // // function MessageStatus({ status }) {
// // //   if (status === "blocked") {
// // //     return <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>;
// // //   }

// // //   // Single grey tick — message is in-flight or stored but not yet delivered
// // //   if (status === "sending" || status === "sent") {
// // //     return (
// // //       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// // //         <path
// // //           d="M1 5l3 3 5-6"
// // //           stroke="rgba(255,255,255,0.35)"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //       </svg>
// // //     );
// // //   }

// // //   // Double blue ticks — recipient has read the message
// // //   if (status === "read") {
// // //     return (
// // //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// // //         <path d="M1 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //         <path d="M6 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //       </svg>
// // //     );
// // //   }

// // //   // Double grey ticks — delivered but not yet read
// // //   if (status === "delivered") {
// // //     return (
// // //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// // //         <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //         <path d="M6 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //       </svg>
// // //     );
// // //   }

// // //   // Fallback — single grey tick (shouldn't normally be hit)
// // //   return (
// // //     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// // //       <path
// // //         d="M1 5l3 3 5-6"
// // //         stroke="rgba(255,255,255,0.35)"
// // //         strokeWidth="1.6"
// // //         strokeLinecap="round"
// // //         strokeLinejoin="round"
// // //       />
// // //     </svg>
// // //   );
// // // }

// // // function MessageSkeleton() {
// // //   return (
// // //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // ChatBox
// // // // ─────────────────────────────────────────────────────────────────────────────
// // // function ChatBox({ chat, onBack, onNewMessage, onClearMessages }) {
// // //   const { user } = useAuth();

// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const [fetchingMessages, setFetchingMessages] = useState(true);
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// // //   const [showChatOptions, setShowChatOptions] = useState(false);
// // //   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
// // //   const [chatTheme, setChatTheme] = useState({
// // //     id: "default",
// // //     label: "Default",
// // //     bg: "#0a0a0a",
// // //   });
// // //   const [isBlocked, setIsBlocked] = useState(false);
// // //   const [hasMore, setHasMore] = useState(true);

// // //   const navigate = useNavigate();

// // //   const myUserId = user._id;
// // //   const messagesContainerRef = useRef(null);
// // //   // true  → scroll to bottom on next paint (new message or initial load)
// // //   // false → preserve scroll position (loading older messages)
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const emojiPickerRef = useRef(null);
// // //   const chatOptionsRef = useRef(null);
// // //   // Tracks whether we have already dispatched a read-mark for this conversation
// // //   // to avoid duplicate PATCH calls from competing useEffects.
// // //   const readMarkedRef = useRef(false);

// // //   const conversationId = chat._id.toString();
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

// // //   const {
// // //     sendSignal,
// // //     messages,
// // //     setMessages,
// // //     markAsRead,
// // //     setCurrentConversation,
// // //   } = useContext(websocketContext);

// // //   if (!otherUser) return null;
// // //   const receiverId = otherUser._id;

// // //   // ── Block status ────────────────────────────────────────────────────────
// // //   useEffect(() => {
// // //     if (!receiverId) return;
// // //     let cancelled = false;
// // //     const checkBlockStatus = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/users/${receiverId}/block-status`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         if (!cancelled) setIsBlocked(data.isBlocked);
// // //       } catch (err) {
// // //         console.error("Failed to fetch block status", err);
// // //       }
// // //     };
// // //     checkBlockStatus();
// // //     return () => { cancelled = true; };
// // //   }, [receiverId]);

// // //   // ── Register current conversation with WS context ───────────────────────
// // //   useEffect(() => {
// // //     setCurrentConversation(conversationId);
// // //     return () => setCurrentConversation(null);
// // //   }, [conversationId, setCurrentConversation]);

// // //   // ── Reset all local state when switching conversations ──────────────────
// // //   useEffect(() => {
// // //     setHasMore(true);
// // //     setCursor(null);
// // //     setFetchingMessages(true);
// // //     setShowEmojiPicker(false);
// // //     setShowChatOptions(false);
// // //     setIsBlocked(false);
// // //     readMarkedRef.current = false;
// // //     shouldAutoScrollRef.current = true;
// // //   }, [conversationId]);

// // //   // ── Mark messages as read (single, deduplicated call per conversation) ──
// // //   //
// // //   // FIX: Previously there were TWO competing useEffects both calling markAsRead
// // //   // and the PATCH endpoint — one watching [conversationId] and one watching
// // //   // [messages[conversationId]]. This caused duplicate network requests and
// // //   // race conditions. Now we have ONE effect that fires when the conversation
// // //   // changes OR when new messages arrive, but only sends the network call once
// // //   // per conversation session via readMarkedRef.
// // //   const doMarkRead = useCallback(() => {
// // //     const convMessages = messages[conversationId] || [];
// // //     const hasUnread = convMessages.some(
// // //       (msg) => msg.from !== myUserId && msg.status !== "read",
// // //     );
// // //     if (!hasUnread) return;

// // //     // Optimistically flip statuses in state
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: existing.map((msg) =>
// // //           msg.from !== myUserId && msg.status !== "read"
// // //             ? { ...msg, status: "read" }
// // //             : msg,
// // //         ),
// // //       };
// // //     });

// // //     markAsRead(conversationId);

// // //     if (!readMarkedRef.current) {
// // //       readMarkedRef.current = true;
// // //       fetchData(`/api/chat/conversations/${conversationId}/read`, {
// // //         method: "PATCH",
// // //         credentials: "include",
// // //       }).catch(() => {});
// // //     }
// // //   }, [conversationId, messages, myUserId, markAsRead, setMessages]);

// // //   // Fire on mount (conversation open) and whenever new messages land
// // //   useEffect(() => {
// // //     doMarkRead();
// // //     // Re-arm for the next batch of incoming messages
// // //     readMarkedRef.current = false;
// // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [conversationId, messages[conversationId]?.length]);

// // //   // ── Emoji picker close on outside click ────────────────────────────────
// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
// // //         setShowEmojiPicker(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   // ── Chat options toggle ─────────────────────────────────────────────────
// // //   const handleToggleChatOptions = () => {
// // //     if (!showChatOptions && chatOptionsRef.current) {
// // //       const rect = chatOptionsRef.current.getBoundingClientRect();
// // //       setPopupPos({
// // //         top: rect.bottom + 6,
// // //         right: window.innerWidth - rect.right,
// // //       });
// // //     }
// // //     setShowChatOptions((v) => !v);
// // //   };

// // //   // ── Emoji insertion ─────────────────────────────────────────────────────
// // //   const insertEmoji = (emoji) => {
// // //     const ta = textareaRef.current;
// // //     if (!ta) {
// // //       setText((prev) => prev + emoji);
// // //       return;
// // //     }
// // //     const start = ta.selectionStart;
// // //     const end = ta.selectionEnd;
// // //     const newText = text.slice(0, start) + emoji + text.slice(end);
// // //     setText(newText);
// // //     requestAnimationFrame(() => {
// // //       ta.focus();
// // //       ta.selectionStart = start + emoji.length;
// // //       ta.selectionEnd = start + emoji.length;
// // //       ta.style.height = "auto";
// // //       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
// // //     });
// // //   };

// // //   // ── Send ────────────────────────────────────────────────────────────────
// // //   const handleSend = async () => {
// // //     if (!text.trim() || isBlocked) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     const messageText = text;

// // //     // Optimistic message — starts as "sending"
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text: messageText,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });

// // //     // Tell the WS context to emit the signal. Your WebSocket context should
// // //     // listen for an ACK from the server and call something like:
// // //     //
// // //     //   setMessages(prev => ({
// // //     //     ...prev,
// // //     //     [conversationId]: prev[conversationId].map(m =>
// // //     //       m.messageId === ack.messageId ? { ...m, status: "sent" } : m
// // //     //     )
// // //     //   }));
// // //     //
// // //     // That transitions "sending" → "sent" (single tick).
// // //     // The server then pushes "delivered" and "read" updates through the socket.
// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text: messageText,
// // //       createdAt,
// // //     });

// // //     onNewMessage?.(conversationId, messageText);
// // //     setText("");
// // //     setShowEmojiPicker(false);
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = "auto";
// // //     }
// // //     // Ensure we scroll to the bottom for our own sent message
// // //     shouldAutoScrollRef.current = true;
// // //   };

// // //   // ── Load older messages ─────────────────────────────────────────────────
// // //   const loadOlderMessages = async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     const el = messagesContainerRef.current;
// // //     const scrollHeightBefore = el ? el.scrollHeight : 0;
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //       if (messagesArray.length < 50) setHasMore(false);
// // //       const formatted = messagesArray.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       // Do NOT auto-scroll — we want the viewport to stay where it was
// // //       shouldAutoScrollRef.current = false;
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //         return { ...prev, [conversationId]: [...newMessages, ...existing] };
// // //       });
// // //       if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //       // Restore the scroll position after prepend
// // //       setTimeout(() => {
// // //         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
// // //       }, 50);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   };

// // //   // ── Track whether user is near the bottom ─────────────────────────────
// // //   // Updates shouldAutoScrollRef on every scroll event so we always know
// // //   // whether the user is near the bottom before deciding to auto-scroll.
// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const handleScroll = () => {
// // //       const threshold = 150;
// // //       shouldAutoScrollRef.current =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
// // //     };
// // //     el.addEventListener("scroll", handleScroll, { passive: true });
// // //     return () => el.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   // ── Scroll to bottom helper ────────────────────────────────────────────
// // //   // Deferred to rAF so the DOM has committed the new bubble before we
// // //   // measure scrollHeight. Called from two places:
// // //   //   1. After initial/conversation-switch fetch completes (always scroll)
// // //   //   2. After a new message is added (only scroll if near bottom)
// // //   const scrollToBottom = useCallback((force = false) => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (!force && !shouldAutoScrollRef.current) return;
// // //     requestAnimationFrame(() => {
// // //       el.scrollTop = el.scrollHeight;
// // //     });
// // //   }, []);

// // //   // ── Initial message fetch ───────────────────────────────────────────────
// // //   // FIX (open conversation): After fetch completes we force-scroll to the
// // //   // bottom regardless of shouldAutoScrollRef. This covers two cases:
// // //   //   a) Fresh conversation — no messages in cache yet, obvious need to scroll.
// // //   //   b) Cached conversation (already in WS messages map) — the convMessageCount
// // //   //      effect below won't fire because the count hasn't changed, so without
// // //   //      this force-scroll the list stays wherever it was from the last visit.
// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     let cancelled = false;
// // //     const fetchMessages = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const messagesArray = Array.isArray(data) ? data : data.messages || [];
// // //         if (messagesArray.length < 50) setHasMore(false);
// // //         const formatted = messagesArray.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (messagesArray.length > 0) setCursor(messagesArray[0].createdAt);
// // //         if (!cancelled) {
// // //           setMessages((prev) => {
// // //             const existing = prev[conversationId] || [];
// // //             const ids = new Set(existing.map((m) => m.messageId));
// // //             const newMessages = formatted.filter((m) => !ids.has(m.messageId));
// // //             return { ...prev, [conversationId]: [...existing, ...newMessages] };
// // //           });
// // //           // Force scroll after paint — covers both fresh and cached conversations
// // //           requestAnimationFrame(() => {
// // //             const el = messagesContainerRef.current;
// // //             if (el) el.scrollTop = el.scrollHeight;
// // //           });
// // //         }
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       } finally {
// // //         if (!cancelled) setFetchingMessages(false);
// // //       }
// // //     };
// // //     fetchMessages();
// // //     return () => { cancelled = true; };
// // //   }, [conversationId]);

// // //   // ── Auto-scroll when a new message arrives ────────────────────────────
// // //   //
// // //   // Depends on message COUNT not the array reference. The array is recreated
// // //   // on every setMessages call including status-only updates ("sending"→"sent"),
// // //   // which would scroll the user back to the bottom mid-history-read.
// // //   //
// // //   // Behaviour:
// // //   //   - User is near the bottom (within 150px) → scroll down. They're clearly
// // //   //     following the conversation actively.
// // //   //   - User scrolled up to read history → don't scroll. They are reading
// // //   //     something. This matches WhatsApp/Telegram/Instagram behaviour.
// // //   const convMessageCount = messages[conversationId]?.length ?? 0;
// // //   useEffect(() => {
// // //     scrollToBottom(false); // respects shouldAutoScrollRef
// // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [convMessageCount]);

// // //   // ── Render ─────────────────────────────────────────────────────────────
// // //   return (
// // //     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
// // //       {/* HEADER */}
// // //       <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //         <button
// // //           onClick={onBack}
// // //           className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //         >
// // //           <ArrowLeft size={18} />
// // //         </button>
// // //         <div
// // //           onClick={() => navigate(`/profile/${otherUser.username}`)}
// // //           className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 cursor-pointer hover:opacity-80 transition-opacity duration-150 flex items-center justify-center"
// // //         >
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>
// // //         <div className="flex flex-col flex-1 min-w-0">
// // //           <h3
// // //             onClick={() => navigate(`/profile/${otherUser.username}`)}
// // //             className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
// // //           >
// // //             {otherUser.username}
// // //           </h3>
// // //           {isBlocked && (
// // //             <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
// // //               Blocked
// // //             </span>
// // //           )}
// // //         </div>
// // //         <div ref={chatOptionsRef} className="relative flex-shrink-0">
// // //           <button
// // //             onClick={handleToggleChatOptions}
// // //             className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
// // //           >
// // //             <svg
// // //               width="16"
// // //               height="16"
// // //               viewBox="0 0 24 24"
// // //               fill="none"
// // //               stroke="currentColor"
// // //               strokeWidth="2"
// // //               strokeLinecap="round"
// // //             >
// // //               <circle cx="12" cy="5" r="1" />
// // //               <circle cx="12" cy="12" r="1" />
// // //               <circle cx="12" cy="19" r="1" />
// // //             </svg>
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       {fetchingMessages ? (
// // //         <div className="flex-1 overflow-hidden">
// // //           <MessageSkeleton />
// // //         </div>
// // //       ) : (
// // //         <div
// // //           ref={messagesContainerRef}
// // //           className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //           style={{
// // //             overscrollBehavior: "contain",
// // //             WebkitOverflowScrolling: "touch",
// // //             background: chatTheme.bg,
// // //             transition: "background 0.3s ease",
// // //             // No animation here — applying fadeInUp on the scroll container
// // //             // re-triggers on every state change, causing the entire message
// // //             // list to flash/fade whenever anything updates.
// // //           }}
// // //         >
// // //           {hasMore && messages[conversationId]?.length > 0 && (
// // //             <div className="flex justify-center mb-2">
// // //               <button
// // //                 onClick={loadOlderMessages}
// // //                 disabled={loadingMore}
// // //                 className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide disabled:opacity-50"
// // //               >
// // //                 {loadingMore ? "Loading…" : "Load older messages"}
// // //               </button>
// // //             </div>
// // //           )}

// // //           {(!messages[conversationId] ||
// // //             messages[conversationId].length === 0) && (
// // //             <div className="text-center text-white/60 text-sm">
// // //               Start a conversation with {otherUser.username}
// // //             </div>
// // //           )}

// // //           {(messages[conversationId] || []).map((msg) => (
// // //             <MessageBubble
// // //               key={msg.messageId}
// // //               msg={msg}
// // //               isMe={msg.from === myUserId}
// // //               otherUser={otherUser}
// // //               user={user}
// // //             />
// // //           ))}

// // //           <div className="h-2" />
// // //         </div>
// // //       )}

// // //       {/* BLOCKED BANNER */}
// // //       {isBlocked ? (
// // //         <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
// // //           <svg
// // //             width="16"
// // //             height="16"
// // //             viewBox="0 0 24 24"
// // //             fill="none"
// // //             stroke="#f87171"
// // //             strokeWidth="1.8"
// // //             strokeLinecap="round"
// // //             strokeLinejoin="round"
// // //           >
// // //             <circle cx="12" cy="12" r="10" />
// // //             <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
// // //           </svg>
// // //           <p className="text-sm text-white/40 text-center">
// // //             You have blocked{" "}
// // //             <span className="text-white/60 font-medium">
// // //               {otherUser.username}
// // //             </span>
// // //             . They can no longer message you.
// // //           </p>
// // //         </div>
// // //       ) : (
// // //         /* INPUT */
// // //         <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/5 backdrop-blur-sm relative">
// // //           {showEmojiPicker && (
// // //             <div
// // //               ref={emojiPickerRef}
// // //               className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
// // //             >
// // //               <div className="grid grid-cols-10 gap-1">
// // //                 {EMOJI_LIST.map((emoji) => (
// // //                   <button
// // //                     key={emoji}
// // //                     onClick={() => insertEmoji(emoji)}
// // //                     className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
// // //                   >
// // //                     {emoji}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}

// // //           <div className="flex items-end gap-2">
// // //             <button
// // //               onClick={() => setShowEmojiPicker((prev) => !prev)}
// // //               className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
// // //                 showEmojiPicker
// // //                   ? "bg-indigo-600 border-indigo-500 text-white"
// // //                   : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// // //               }`}
// // //             >
// // //               <Smile size={17} />
// // //             </button>

// // //             <textarea
// // //               ref={textareaRef}
// // //               rows={1}
// // //               value={text}
// // //               onChange={(e) => {
// // //                 setText(e.target.value);
// // //                 e.target.style.height = "auto";
// // //                 e.target.style.height =
// // //                   Math.min(e.target.scrollHeight, 112) + "px";
// // //               }}
// // //               onKeyDown={(e) => {
// // //                 if (e.key === "Enter" && !e.shiftKey) {
// // //                   e.preventDefault();
// // //                   handleSend();
// // //                 }
// // //               }}
// // //               placeholder="Type a message…"
// // //               className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// // //               style={{ maxHeight: "112px", fontSize: "16px" }}
// // //             />

// // //             <button
// // //               onClick={handleSend}
// // //               disabled={!text.trim()}
// // //               className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
// // //             >
// // //               <Send size={16} className="text-white ml-0.5" />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {showChatOptions &&
// // //         createPortal(
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: popupPos.top,
// // //               right: popupPos.right,
// // //               zIndex: 99999,
// // //             }}
// // //           >
// // //             <ChatOptionsPopup
// // //               onClose={() => setShowChatOptions(false)}
// // //               onClearChat={() => {
// // //                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
// // //                 onClearMessages?.(conversationId);
// // //               }}
// // //               onBlock={() => setIsBlocked(true)}
// // //               onThemeChange={(theme) => setChatTheme(theme)}
// // //               currentTheme={chatTheme}
// // //               anchorRef={chatOptionsRef}
// // //               conversationId={conversationId}
// // //               otherUserId={receiverId}
// // //               isBlocked={isBlocked}
// // //               onUnblock={() => setIsBlocked(false)}
// // //             />
// // //           </div>,
// // //           document.body,
// // //         )}
// // //     </div>
// // //   );
// // // }

// // // export default ChatBox;

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // WEBSOCKET CONTEXT — what the server ACK handler should look like
// // // // (add this to your websocketContext provider, not in this file)
// // // // ─────────────────────────────────────────────────────────────────────────────
// // // //
// // // // ws.onmessage = (event) => {
// // // //   const signal = JSON.parse(event.data);
// // // //
// // // //   // Server ACK: message stored → "sending" → "sent" (single grey tick)
// // // //   if (signal.type === "message_ack") {
// // // //     setMessages(prev => ({
// // // //       ...prev,
// // // //       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
// // // //         m.messageId === signal.messageId ? { ...m, status: "sent" } : m
// // // //       ),
// // // //     }));
// // // //   }
// // // //
// // // //   // Recipient's device received it → "sent" → "delivered" (double grey ticks)
// // // //   if (signal.type === "message_delivered") {
// // // //     setMessages(prev => ({
// // // //       ...prev,
// // // //       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
// // // //         m.messageId === signal.messageId ? { ...m, status: "delivered" } : m
// // // //       ),
// // // //     }));
// // // //   }
// // // //
// // // //   // Recipient opened the chat → "delivered" → "read" (double blue ticks)
// // // //   if (signal.type === "message_read") {
// // // //     setMessages(prev => ({
// // // //       ...prev,
// // // //       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
// // // //         m.conversationId === signal.conversationId && m.status !== "read"
// // // //           ? { ...m, status: "read" }
// // // //           : m
// // // //       ),
// // // //     }));
// // // //   }
// // // // };

// // // import { ArrowLeft, Send, Smile } from "lucide-react";
// // // import { useContext, useState, useEffect, useRef, useCallback, useMemo } from "react";
// // // import { createPortal } from "react-dom";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";
// // // import ChatOptionsPopup from "../ChatOptionsPopup";
// // // import { useNavigate } from "react-router-dom";

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // Platform detection — evaluated once at module load, never changes.
// // // //
// // // // ChatBox keyboard strategy differs fundamentally between iOS and Android:
// // // //
// // // // iOS Safari:
// // // //   • The entire page shrinks (window.innerHeight decreases) when the keyboard
// // // //     opens. Because ChatBox is a flex column filling the screen via h-full/dvh,
// // // //     it naturally shrinks with the page — the input bar stays visible and the
// // // //     message list fills the remaining space. No JS intervention needed for
// // // //     layout. We only need to scroll the message list to the bottom after the
// // // //     keyboard settles (one visualViewport event, post-animation).
// // // //   • backdropFilter: blur() on the input bar is fine — iOS compositor handles
// // // //     it cleanly.
// // // //   • Safe-area-inset-bottom disappears when the keyboard is open (the home
// // // //     bar slides away), so env(safe-area-inset-bottom) self-corrects.
// // // //
// // // // Android Chrome (with interactive-widget=resizes-content):
// // // //   • The layout viewport (clientHeight) shrinks when keyboard opens. Our flex
// // // //     column reflows correctly — same as iOS, no extra JS layout work.
// // // //   • BUT: backdropFilter: blur() on the input bar promotes a compositing layer.
// // // //     The boundary between our layer and the keyboard surface shows as a white
// // // //     strip. Fix: remove blur from the input bar on Android.
// // // //   • BUT: safe-area-inset-bottom on gesture-nav Android stays non-zero when
// // // //     the keyboard is open (the navigation bar persists). This pushes the input
// // // //     bar up by an extra ~20-48px above the keyboard. Fix: detect keyboard open
// // // //     state and conditionally remove safe-area padding.
// // // //   • BUT: visualViewport fires 30-60x during keyboard animation. Any JS that
// // // //     mutates layout on each event causes jank. We debounce scroll-to-bottom.
// // // //   • BUT: the emoji picker is position:absolute bottom:100%. On Android, when
// // // //     the keyboard is open and the picker is rendered, the picker can overflow
// // // //     above the screen if the message list is short. Fix: cap the picker height
// // // //     and use overflow-y:auto so it's always on-screen.
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // const UA = typeof navigator !== "undefined" ? navigator.userAgent : "";
// // // const IS_ANDROID = /Android/i.test(UA);

// // // // dvh = "dynamic viewport height" — shrinks with browser chrome (address bar).
// // // // Supported: Chrome 108+, Safari 15.4+, Firefox 109+.
// // // const SUPPORTS_DVH = (() => {
// // //   try {
// // //     const el = document.createElement("div");
// // //     el.style.height = "1dvh";
// // //     return el.style.height === "1dvh";
// // //   } catch { return false; }
// // // })();

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // Viewport meta management
// // // //
// // // // We patch the viewport meta on mount and restore it on unmount.
// // // // This is done at the ChatBox level (not in platform variants) because the
// // // // meta tag should be set as early as possible — before the keyboard opens.
// // // //
// // // // iOS  → resizes-visual: layout viewport stays fixed, visual viewport shrinks.
// // // //         iOS then automatically moves position:fixed elements with the visual
// // // //         viewport. Our flex layout reflows via dvh/svh changes.
// // // // Android → resizes-content: layout viewport shrinks. Our flex column reflows
// // // //            naturally. No JS needed for the keyboard. resizes-content is the
// // // //            Chrome 108+ standard behaviour on Android.
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function useViewportMeta() {
// // //   useEffect(() => {
// // //     let meta = document.querySelector('meta[name="viewport"]');
// // //     const prev = meta?.getAttribute("content") ?? "";
// // //     if (!meta) {
// // //       meta = document.createElement("meta");
// // //       meta.name = "viewport";
// // //       document.head.appendChild(meta);
// // //     }
// // //     const value = IS_ANDROID
// // //       ? "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
// // //       : "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-visual";
// // //     meta.setAttribute("content", value);
// // //     return () => meta.setAttribute("content", prev);
// // //   }, []);
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // Shared constants
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // const EMOJI_LIST = [
// // //   "😀","😂","😍","🥰","😎","🤔","😭","😡","🥺","😴",
// // //   "👍","👎","❤️","🔥","✨","🎉","🙏","💯","😊","🤣",
// // //   "😘","🥳","😤","🤯","😇","🤗","😏","🙄","😬","🤝",
// // //   "👀","💀","🫡","🫠","🥹","😮","😱","🤌","💪","👏",
// // //   "🍕","🎮","🎵","⚡","🌙","☀️","🌈","💫","🚀","🎯",
// // // ];

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // MessageStatus
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function MessageStatus({ status }) {
// // //   if (status === "blocked") {
// // //     return <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>;
// // //   }
// // //   if (status === "sending" || status === "sent") {
// // //     return (
// // //       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// // //         <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //       </svg>
// // //     );
// // //   }
// // //   if (status === "read") {
// // //     return (
// // //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// // //         <path d="M1 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //         <path d="M6 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //       </svg>
// // //     );
// // //   }
// // //   if (status === "delivered") {
// // //     return (
// // //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// // //         <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //         <path d="M6 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //       </svg>
// // //     );
// // //   }
// // //   return (
// // //     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// // //       <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// // //     </svg>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // MessageSkeleton
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function MessageSkeleton() {
// // //   return (
// // //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // useConversation — all data/WS logic, shared between both platform variants.
// // // //
// // // // Extracted so neither iOS nor Android variant duplicates a single line of
// // // // business logic. Both variants receive the same props from this hook.
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function useConversation({ chat, onNewMessage, onClearMessages }) {
// // //   const { user }    = useAuth();
// // //   const navigate    = useNavigate();
// // //   const myUserId    = user._id;
// // //   const otherUser   = chat.participants?.find((p) => p._id !== myUserId);
// // //   const conversationId = chat._id.toString();
// // //   const receiverId  = otherUser?._id;

// // //   const { sendSignal, messages, setMessages, markAsRead, setCurrentConversation } = useContext(websocketContext);

// // //   const [text,             setText]             = useState("");
// // //   const [cursor,           setCursor]           = useState(null);
// // //   const [loadingMore,      setLoadingMore]      = useState(false);
// // //   const [fetchingMessages, setFetchingMessages] = useState(true);
// // //   const [showEmojiPicker,  setShowEmojiPicker]  = useState(false);
// // //   const [showChatOptions,  setShowChatOptions]  = useState(false);
// // //   const [popupPos,         setPopupPos]         = useState({ top: 0, right: 0 });
// // //   const [chatTheme,        setChatTheme]        = useState({ id: "default", label: "Default", bg: "#0a0a0a" });
// // //   const [isBlocked,        setIsBlocked]        = useState(false);
// // //   const [hasMore,          setHasMore]          = useState(true);

// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef  = useRef(true);
// // //   const textareaRef          = useRef(null);
// // //   const emojiPickerRef       = useRef(null);
// // //   const chatOptionsRef       = useRef(null);
// // //   const readMarkedRef        = useRef(false);

// // //   // ── Block status ──────────────────────────────────────────────────────────
// // //   useEffect(() => {
// // //     if (!receiverId) return;
// // //     let cancelled = false;
// // //     fetchData(`/api/users/${receiverId}/block-status`, { credentials: "include" })
// // //       .then(r => r.json())
// // //       .then(data => { if (!cancelled) setIsBlocked(data.isBlocked); })
// // //       .catch(err => console.error("Failed to fetch block status", err));
// // //     return () => { cancelled = true; };
// // //   }, [receiverId]);

// // //   // ── Register current conversation ─────────────────────────────────────────
// // //   useEffect(() => {
// // //     setCurrentConversation(conversationId);
// // //     return () => setCurrentConversation(null);
// // //   }, [conversationId, setCurrentConversation]);

// // //   // ── Reset on conversation switch ──────────────────────────────────────────
// // //   useEffect(() => {
// // //     setHasMore(true);
// // //     setCursor(null);
// // //     setFetchingMessages(true);
// // //     setShowEmojiPicker(false);
// // //     setShowChatOptions(false);
// // //     setIsBlocked(false);
// // //     readMarkedRef.current = false;
// // //     shouldAutoScrollRef.current = true;
// // //   }, [conversationId]);

// // //   // ── Mark as read (deduplicated) ───────────────────────────────────────────
// // //   const doMarkRead = useCallback(() => {
// // //     const convMessages = messages[conversationId] || [];
// // //     const hasUnread = convMessages.some(m => m.from !== myUserId && m.status !== "read");
// // //     if (!hasUnread) return;
// // //     setMessages(prev => ({
// // //       ...prev,
// // //       [conversationId]: (prev[conversationId] || []).map(m =>
// // //         m.from !== myUserId && m.status !== "read" ? { ...m, status: "read" } : m
// // //       ),
// // //     }));
// // //     markAsRead(conversationId);
// // //     if (!readMarkedRef.current) {
// // //       readMarkedRef.current = true;
// // //       fetchData(`/api/chat/conversations/${conversationId}/read`, { method: "PATCH", credentials: "include" }).catch(() => {});
// // //     }
// // //   }, [conversationId, messages, myUserId, markAsRead, setMessages]);

// // //   useEffect(() => {
// // //     doMarkRead();
// // //     readMarkedRef.current = false;
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [conversationId, messages[conversationId]?.length]);

// // //   // ── Emoji picker close on outside click ───────────────────────────────────
// // //   useEffect(() => {
// // //     const h = e => { if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) setShowEmojiPicker(false); };
// // //     document.addEventListener("mousedown", h);
// // //     return () => document.removeEventListener("mousedown", h);
// // //   }, []);

// // //   // ── Chat options toggle ───────────────────────────────────────────────────
// // //   const handleToggleChatOptions = useCallback(() => {
// // //     if (!showChatOptions && chatOptionsRef.current) {
// // //       const rect = chatOptionsRef.current.getBoundingClientRect();
// // //       setPopupPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
// // //     }
// // //     setShowChatOptions(v => !v);
// // //   }, [showChatOptions]);

// // //   // ── Emoji insertion ───────────────────────────────────────────────────────
// // //   const insertEmoji = useCallback((emoji) => {
// // //     const ta = textareaRef.current;
// // //     if (!ta) { setText(prev => prev + emoji); return; }
// // //     const start = ta.selectionStart;
// // //     const end   = ta.selectionEnd;
// // //     const newText = text.slice(0, start) + emoji + text.slice(end);
// // //     setText(newText);
// // //     requestAnimationFrame(() => {
// // //       ta.focus();
// // //       ta.selectionStart = start + emoji.length;
// // //       ta.selectionEnd   = start + emoji.length;
// // //       ta.style.height   = "auto";
// // //       ta.style.height   = Math.min(ta.scrollHeight, 112) + "px";
// // //     });
// // //   }, [text]);

// // //   // ── Send ──────────────────────────────────────────────────────────────────
// // //   const handleSend = useCallback(async () => {
// // //     if (!text.trim() || isBlocked) return;
// // //     const messageId  = uuidv4();
// // //     const createdAt  = Date.now();
// // //     const messageText = text;
// // //     setMessages(prev => {
// // //       const existing = prev[conversationId] || [];
// // //       return { ...prev, [conversationId]: [...existing, { messageId, conversationId, from: myUserId, to: receiverId, text: messageText, status: "sending", createdAt }] };
// // //     });
// // //     sendSignal({ type: "chat_message", messageId, conversationId, to: receiverId, text: messageText, createdAt });
// // //     onNewMessage?.(conversationId, messageText);
// // //     setText("");
// // //     setShowEmojiPicker(false);
// // //     if (textareaRef.current) textareaRef.current.style.height = "auto";
// // //     shouldAutoScrollRef.current = true;
// // //   }, [text, isBlocked, conversationId, myUserId, receiverId, sendSignal, setMessages, onNewMessage]);

// // //   // ── Load older messages ───────────────────────────────────────────────────
// // //   const loadOlderMessages = useCallback(async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     const el = messagesContainerRef.current;
// // //     const scrollHeightBefore = el ? el.scrollHeight : 0;
// // //     try {
// // //       const res  = await fetchData(`/api/chat/messages/${conversationId}?cursor=${cursor}`, { credentials: "include" });
// // //       const data = await res.json();
// // //       const arr  = Array.isArray(data) ? data : data.messages || [];
// // //       if (arr.length < 50) setHasMore(false);
// // //       const formatted = arr.map(msg => ({
// // //         messageId: msg.messageId, conversationId,
// // //         from: msg.senderId, to: msg.receiverId,
// // //         text: msg.text, status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       shouldAutoScrollRef.current = false;
// // //       setMessages(prev => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map(m => m.messageId));
// // //         return { ...prev, [conversationId]: [...formatted.filter(m => !ids.has(m.messageId)), ...existing] };
// // //       });
// // //       if (arr.length > 0) setCursor(arr[0].createdAt);
// // //       setTimeout(() => { if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore; }, 50);
// // //     } catch (err) { console.error("Failed loading older messages", err); }
// // //     setLoadingMore(false);
// // //   }, [cursor, loadingMore, conversationId, setMessages]);

// // //   // ── Scroll tracking ───────────────────────────────────────────────────────
// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const h = () => {
// // //       shouldAutoScrollRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 150;
// // //     };
// // //     el.addEventListener("scroll", h, { passive: true });
// // //     return () => el.removeEventListener("scroll", h);
// // //   }, []);

// // //   // ── Scroll to bottom helper ───────────────────────────────────────────────
// // //   const scrollToBottom = useCallback((force = false) => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (!force && !shouldAutoScrollRef.current) return;
// // //     requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
// // //   }, []);

// // //   // ── Initial fetch ─────────────────────────────────────────────────────────
// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     let cancelled = false;
// // //     const fetch_ = async () => {
// // //       try {
// // //         const res  = await fetchData(`/api/chat/messages/${conversationId}`, { credentials: "include" });
// // //         const data = await res.json();
// // //         const arr  = Array.isArray(data) ? data : data.messages || [];
// // //         if (arr.length < 50) setHasMore(false);
// // //         const formatted = arr.map(msg => ({
// // //           messageId: msg.messageId, conversationId,
// // //           from: msg.senderId, to: msg.receiverId,
// // //           text: msg.text, status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (arr.length > 0) setCursor(arr[0].createdAt);
// // //         if (!cancelled) {
// // //           setMessages(prev => {
// // //             const existing = prev[conversationId] || [];
// // //             const ids = new Set(existing.map(m => m.messageId));
// // //             return { ...prev, [conversationId]: [...existing, ...formatted.filter(m => !ids.has(m.messageId))] };
// // //           });
// // //           requestAnimationFrame(() => {
// // //             const el = messagesContainerRef.current;
// // //             if (el) el.scrollTop = el.scrollHeight;
// // //           });
// // //         }
// // //       } catch (err) { console.error("Failed to fetch messages", err); }
// // //       finally { if (!cancelled) setFetchingMessages(false); }
// // //     };
// // //     fetch_();
// // //     return () => { cancelled = true; };
// // //   }, [conversationId]);

// // //   // ── Auto-scroll on new message ────────────────────────────────────────────
// // //   const convMessageCount = messages[conversationId]?.length ?? 0;
// // //   useEffect(() => {
// // //     scrollToBottom(false);
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [convMessageCount]);

// // //   return {
// // //     // identity
// // //     user, navigate, myUserId, otherUser, conversationId, receiverId,
// // //     messages, setMessages,
// // //     // ui state
// // //     text, setText,
// // //     loadingMore, fetchingMessages,
// // //     showEmojiPicker, setShowEmojiPicker,
// // //     showChatOptions, setShowChatOptions,
// // //     popupPos,
// // //     chatTheme, setChatTheme,
// // //     isBlocked, setIsBlocked,
// // //     hasMore,
// // //     // refs
// // //     messagesContainerRef, textareaRef, emojiPickerRef, chatOptionsRef,
// // //     // actions
// // //     handleSend, handleToggleChatOptions, insertEmoji, loadOlderMessages,
// // //     scrollToBottom,
// // //   };
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // Shared pieces rendered identically on both platforms
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function ChatHeader({ otherUser, isBlocked, navigate, chatOptionsRef, handleToggleChatOptions, onBack }) {
// // //   return (
// // //     <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //       <button onClick={onBack} className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95">
// // //         <ArrowLeft size={18} />
// // //       </button>
// // //       <div
// // //         onClick={() => navigate(`/profile/${otherUser.username}`)}
// // //         className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 cursor-pointer hover:opacity-80 transition-opacity duration-150 flex items-center justify-center"
// // //       >
// // //         {otherUser.profilePicture
// // //           ? <img src={otherUser.profilePicture} alt={otherUser.username} className="w-full h-full object-cover" />
// // //           : <span className="text-sm font-semibold text-white">{otherUser.username?.[0]?.toUpperCase()}</span>
// // //         }
// // //       </div>
// // //       <div className="flex flex-col flex-1 min-w-0">
// // //         <h3
// // //           onClick={() => navigate(`/profile/${otherUser.username}`)}
// // //           className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
// // //         >
// // //           {otherUser.username}
// // //         </h3>
// // //         {isBlocked && <span className="text-[10px] text-red-400/80 font-medium tracking-wide">Blocked</span>}
// // //       </div>
// // //       <div ref={chatOptionsRef} className="relative flex-shrink-0">
// // //         <button onClick={handleToggleChatOptions} className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white">
// // //           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
// // //             <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
// // //           </svg>
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function MessageList({ messagesContainerRef, fetchingMessages, hasMore, messages, conversationId, loadOlderMessages, loadingMore, myUserId, otherUser, user, chatTheme }) {
// // //   if (fetchingMessages) {
// // //     return <div className="flex-1 overflow-hidden"><MessageSkeleton /></div>;
// // //   }
// // //   return (
// // //     <div
// // //       ref={messagesContainerRef}
// // //       className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //       style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch", background: chatTheme.bg, transition: "background 0.3s ease" }}
// // //     >
// // //       {hasMore && messages[conversationId]?.length > 0 && (
// // //         <div className="flex justify-center mb-2">
// // //           <button onClick={loadOlderMessages} disabled={loadingMore}
// // //             className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide disabled:opacity-50">
// // //             {loadingMore ? "Loading…" : "Load older messages"}
// // //           </button>
// // //         </div>
// // //       )}
// // //       {(!messages[conversationId] || messages[conversationId].length === 0) && (
// // //         <div className="text-center text-white/60 text-sm">Start a conversation with {otherUser.username}</div>
// // //       )}
// // //       {(messages[conversationId] || []).map(msg => (
// // //         <MessageBubble key={msg.messageId} msg={msg} isMe={msg.from === myUserId} otherUser={otherUser} user={user} />
// // //       ))}
// // //       <div className="h-2" />
// // //     </div>
// // //   );
// // // }

// // // function BlockedBanner({ otherUser }) {
// // //   return (
// // //     <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
// // //       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// // //         <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
// // //       </svg>
// // //       <p className="text-sm text-white/40 text-center">
// // //         You have blocked <span className="text-white/60 font-medium">{otherUser.username}</span>. They can no longer message you.
// // //       </p>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // EmojiPicker
// // // //
// // // // Platform-aware: on Android the picker is constrained to maxHeight:220px with
// // // // overflow-y:auto. When the keyboard is open the available space above the
// // // // input bar can be very limited, and an unconstrained picker overflows off the
// // // // top of the screen. 220px fits 3 rows of emojis — enough to be usable.
// // // //
// // // // On iOS the picker gets the full 280px since iOS gives us the full space
// // // // above the keyboard naturally.
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function EmojiPicker({ emojiPickerRef, insertEmoji }) {
// // //   return (
// // //     <div
// // //       ref={emojiPickerRef}
// // //       className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
// // //       style={{
// // //         maxHeight: IS_ANDROID ? 220 : 280,
// // //         overflowY: "auto",
// // //         // Prevent the emoji picker scroll from propagating to the page on Android
// // //         overscrollBehavior: "contain",
// // //       }}
// // //     >
// // //       <div className="grid grid-cols-10 gap-1">
// // //         {EMOJI_LIST.map(emoji => (
// // //           <button key={emoji} onClick={() => insertEmoji(emoji)}
// // //             className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100">
// // //             {emoji}
// // //           </button>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // ██████████████████████████████████████████████████████████████████████████████
// // // // iOS INPUT BAR
// // // //
// // // // Strategy:
// // // //   • backdropFilter: blur — safe on iOS, compositor handles it cleanly.
// // // //   • env(safe-area-inset-bottom) applied directly — it auto-corrects to 0
// // // //     when the keyboard is open (home bar slides away on iOS).
// // // //   • No keyboard state tracking needed — iOS layout handles itself.
// // // //   • fontSize:16px on the textarea is critical — below 16px iOS Safari
// // // //     auto-zooms the page on focus, breaking the layout.
// // // // ██████████████████████████████████████████████████████████████████████████████

// // // function InputBarIOS({ text, setText, textareaRef, emojiPickerRef, showEmojiPicker, setShowEmojiPicker, insertEmoji, handleSend, isBlocked }) {
// // //   return (
// // //     <div
// // //       className="flex-shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-sm relative"
// // //       style={{
// // //         paddingTop: 12,
// // //         paddingLeft: 12,
// // //         paddingRight: 12,
// // //         // iOS: safe-area-inset-bottom goes to 0 when keyboard is open.
// // //         // Apply it unconditionally — no JS state needed.
// // //         paddingBottom: "max(12px, calc(12px + env(safe-area-inset-bottom, 0px)))",
// // //       }}
// // //     >
// // //       {showEmojiPicker && <EmojiPicker emojiPickerRef={emojiPickerRef} insertEmoji={insertEmoji} />}
// // //       <div className="flex items-end gap-2">
// // //         <button
// // //           onClick={() => setShowEmojiPicker(prev => !prev)}
// // //           className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
// // //             showEmojiPicker
// // //               ? "bg-indigo-600 border-indigo-500 text-white"
// // //               : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// // //           }`}
// // //         >
// // //           <Smile size={17} />
// // //         </button>
// // //         <textarea
// // //           ref={textareaRef}
// // //           rows={1}
// // //           value={text}
// // //           onChange={e => {
// // //             setText(e.target.value);
// // //             e.target.style.height = "auto";
// // //             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
// // //           }}
// // //           onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
// // //           placeholder="Type a message…"
// // //           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// // //           style={{ maxHeight: "112px", fontSize: "16px" }}
// // //         />
// // //         <button onClick={handleSend} disabled={!text.trim()}
// // //           className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed">
// // //           <Send size={16} className="text-white ml-0.5" />
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // ██████████████████████████████████████████████████████████████████████████████
// // // // ANDROID INPUT BAR
// // // //
// // // // Strategy:
// // // //   • NO backdropFilter: blur — removes the compositor layer boundary that
// // // //     causes the white strip between the input bar and the keyboard.
// // // //   • Safe-area-inset-bottom is toggled via JS keyboard detection.
// // // //     On gesture-nav Android, safe-area-inset-bottom stays non-zero when the
// // // //     keyboard is open. With resizes-content the keyboard is already handled
// // // //     by the browser shrinking the layout viewport — adding safe-area on top
// // // //     pushes the input bar up by an extra 20-48px, creating phantom space.
// // // //     We use a plain bg colour instead of bg-white/5 to avoid any GPU layer.
// // // //   • The textarea onChange does NOT call scrollToBottom directly — that would
// // // //     fire on every keystroke. The message list's auto-scroll logic handles it
// // // //     (scrolls only on new messages, only if near bottom).
// // // // ██████████████████████████████████████████████████████████████████████████████

// // // function InputBarAndroid({ text, setText, textareaRef, emojiPickerRef, showEmojiPicker, setShowEmojiPicker, insertEmoji, handleSend, isBlocked, keyboardOpen }) {
// // //   return (
// // //     <div
// // //       className="flex-shrink-0 border-t border-white/10 relative"
// // //       style={{
// // //         paddingTop: 12,
// // //         paddingLeft: 12,
// // //         paddingRight: 12,
// // //         // Android: safe-area only when keyboard is CLOSED.
// // //         // When keyboard is open, resizes-content already moved everything up —
// // //         // adding safe-area here would double the bottom gap.
// // //         paddingBottom: keyboardOpen
// // //           ? 12
// // //           : "max(12px, calc(12px + env(safe-area-inset-bottom, 0px)))",
// // //         // Flat colour instead of bg-white/5 — no GPU compositing layer,
// // //         // so no white strip at the keyboard boundary.
// // //         backgroundColor: "rgba(255,255,255,0.04)",
// // //         // NO backdropFilter here — that's what caused the white strip.
// // //       }}
// // //     >
// // //       {showEmojiPicker && <EmojiPicker emojiPickerRef={emojiPickerRef} insertEmoji={insertEmoji} />}
// // //       <div className="flex items-end gap-2">
// // //         <button
// // //           onClick={() => setShowEmojiPicker(prev => !prev)}
// // //           className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
// // //             showEmojiPicker
// // //               ? "bg-indigo-600 border-indigo-500 text-white"
// // //               : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// // //           }`}
// // //         >
// // //           <Smile size={17} />
// // //         </button>
// // //         <textarea
// // //           ref={textareaRef}
// // //           rows={1}
// // //           value={text}
// // //           onChange={e => {
// // //             setText(e.target.value);
// // //             e.target.style.height = "auto";
// // //             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
// // //           }}
// // //           onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
// // //           placeholder="Type a message…"
// // //           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// // //           style={{ maxHeight: "112px", fontSize: "16px" }}
// // //           // inputMode="text" ensures Android shows a standard keyboard, not a
// // //           // specialised one (numeric, email etc.) which can have different heights.
// // //           inputMode="text"
// // //         />
// // //         <button onClick={handleSend} disabled={!text.trim()}
// // //           className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed">
// // //           <Send size={16} className="text-white ml-0.5" />
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // ██████████████████████████████████████████████████████████████████████████████
// // // // iOS CHATBOX VARIANT
// // // //
// // // // Keyboard behaviour on iOS:
// // // //   With interactive-widget=resizes-visual the layout viewport does NOT shrink.
// // // //   Instead the visual viewport shrinks. Our ChatBox root is a flex column
// // // //   with h-full (or dvh) — this height is based on the layout viewport, which
// // // //   hasn't changed, so the component doesn't reflow at all from CSS alone.
// // // //
// // // //   We need to manually compensate by reading visualViewport.height and
// // // //   setting the component's explicit height. This is the ONLY way to get the
// // // //   flex column to compress correctly on iOS without using resizes-content
// // // //   (which causes the Android white-strip problem).
// // // //
// // // //   visualViewport fires ONCE after keyboard animation ends on iOS → safe to
// // // //   apply directly, no debouncing needed.
// // // // ██████████████████████████████████████████████████████████████████████████████

// // // function ChatBoxIOS({ chat, onBack, onNewMessage, onClearMessages }) {
// // //   useViewportMeta();

// // //   const conv = useConversation({ chat, onNewMessage, onClearMessages });
// // //   const { user, navigate, myUserId, otherUser, conversationId, receiverId,
// // //     messages, setMessages, text, setText, loadingMore, fetchingMessages,
// // //     showEmojiPicker, setShowEmojiPicker, showChatOptions, setShowChatOptions,
// // //     popupPos, chatTheme, setChatTheme, isBlocked, setIsBlocked, hasMore,
// // //     messagesContainerRef, textareaRef, emojiPickerRef, chatOptionsRef,
// // //     handleSend, handleToggleChatOptions, insertEmoji, loadOlderMessages,
// // //     scrollToBottom,
// // //   } = conv;

// // //   // iOS: track visual viewport height to compress the flex column when keyboard opens.
// // //   const [containerHeight, setContainerHeight] = useState(() =>
// // //     window.visualViewport ? window.visualViewport.height : window.innerHeight
// // //   );

// // //   useEffect(() => {
// // //     if (!window.visualViewport) return;
// // //     const onResize = () => {
// // //       const vv = window.visualViewport;
// // //       setContainerHeight(vv.height);
// // //       // Scroll to bottom after keyboard settles — single rAF is fine on iOS.
// // //       requestAnimationFrame(() => {
// // //         const el = messagesContainerRef.current;
// // //         if (el) el.scrollTop = el.scrollHeight;
// // //       });
// // //     };
// // //     window.visualViewport.addEventListener("resize", onResize);
// // //     return () => window.visualViewport.removeEventListener("resize", onResize);
// // //   }, [messagesContainerRef]);

// // //   if (!otherUser) return null;

// // //   return (
// // //     <div
// // //       className="flex flex-col w-full overflow-hidden"
// // //       style={{
// // //         // Explicitly set height to visual viewport height.
// // //         // This is what makes the flex column compress when the iOS keyboard opens.
// // //         // Without this, the layout viewport height is used, which doesn't change
// // //         // on iOS with resizes-visual, so the input bar slides under the keyboard.
// // //         height: containerHeight,
// // //       }}
// // //     >
// // //       <ChatHeader
// // //         otherUser={otherUser} isBlocked={isBlocked} navigate={navigate}
// // //         chatOptionsRef={chatOptionsRef} handleToggleChatOptions={handleToggleChatOptions}
// // //         onBack={onBack}
// // //       />

// // //       <MessageList
// // //         messagesContainerRef={messagesContainerRef} fetchingMessages={fetchingMessages}
// // //         hasMore={hasMore} messages={messages} conversationId={conversationId}
// // //         loadOlderMessages={loadOlderMessages} loadingMore={loadingMore}
// // //         myUserId={myUserId} otherUser={otherUser} user={user} chatTheme={chatTheme}
// // //       />

// // //       {isBlocked
// // //         ? <BlockedBanner otherUser={otherUser} />
// // //         : <InputBarIOS
// // //             text={text} setText={setText} textareaRef={textareaRef}
// // //             emojiPickerRef={emojiPickerRef} showEmojiPicker={showEmojiPicker}
// // //             setShowEmojiPicker={setShowEmojiPicker} insertEmoji={insertEmoji}
// // //             handleSend={handleSend} isBlocked={isBlocked}
// // //           />
// // //       }

// // //       {showChatOptions && createPortal(
// // //         <div style={{ position: "fixed", top: popupPos.top, right: popupPos.right, zIndex: 99999 }}>
// // //           <ChatOptionsPopup
// // //             onClose={() => setShowChatOptions(false)}
// // //             onClearChat={() => { setMessages(prev => ({ ...prev, [conversationId]: [] })); onClearMessages?.(conversationId); }}
// // //             onBlock={() => setIsBlocked(true)}
// // //             onThemeChange={theme => setChatTheme(theme)}
// // //             currentTheme={chatTheme}
// // //             anchorRef={chatOptionsRef}
// // //             conversationId={conversationId}
// // //             otherUserId={receiverId}
// // //             isBlocked={isBlocked}
// // //             onUnblock={() => setIsBlocked(false)}
// // //           />
// // //         </div>,
// // //         document.body,
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // ██████████████████████████████████████████████████████████████████████████████
// // // // ANDROID CHATBOX VARIANT
// // // //
// // // // Keyboard behaviour on Android (interactive-widget=resizes-content):
// // // //   The browser shrinks the layout viewport when the keyboard opens.
// // // //   Our flex column has h-full — "full" is relative to the parent, which is
// // // //   already sized to the layout viewport. So the flex column naturally
// // // //   compresses when the keyboard opens. No JS height tracking needed.
// // // //
// // // //   We only need JS for:
// // // //     1. Detecting keyboard open/close to toggle safe-area on the input bar.
// // // //     2. Debounced scroll-to-bottom (vv fires 30-60x during animation).
// // // //
// // // //   White strip fix: no backdropFilter on any element that sits adjacent to
// // // //   the keyboard. The input bar uses a flat background colour instead.
// // // //   The root uses h-full so it fills exactly the layout viewport — no
// // // //   padding-bottom overshoot trick needed here (unlike the CommentsBottomSheet)
// // // //   because there's no position:fixed involved. The flex column ends at the
// // // //   bottom of the layout viewport, which ends at the top of the keyboard.
// // // //   There is no gap.
// // // // ██████████████████████████████████████████████████████████████████████████████

// // // function ChatBoxAndroid({ chat, onBack, onNewMessage, onClearMessages }) {
// // //   useViewportMeta();

// // //   const conv = useConversation({ chat, onNewMessage, onClearMessages });
// // //   const { user, navigate, myUserId, otherUser, conversationId, receiverId,
// // //     messages, setMessages, text, setText, loadingMore, fetchingMessages,
// // //     showEmojiPicker, setShowEmojiPicker, showChatOptions, setShowChatOptions,
// // //     popupPos, chatTheme, setChatTheme, isBlocked, setIsBlocked, hasMore,
// // //     messagesContainerRef, textareaRef, emojiPickerRef, chatOptionsRef,
// // //     handleSend, handleToggleChatOptions, insertEmoji, loadOlderMessages,
// // //   } = conv;

// // //   // Android: track keyboard open state only — for safe-area toggling.
// // //   // We do NOT track height — resizes-content handles layout automatically.
// // //   const [keyboardOpen, setKeyboardOpen] = useState(false);

// // //   useEffect(() => {
// // //     if (!window.visualViewport) return;

// // //     // baseHeight is captured once at mount (keyboard closed).
// // //     // We compare against this to detect keyboard open/close.
// // //     // Using clientHeight (not innerHeight) — with resizes-content,
// // //     // clientHeight is what actually shrinks when the keyboard opens.
// // //     const baseHeight = document.documentElement.clientHeight;
// // //     let scrollTimeout = null;

// // //     const onResize = () => {
// // //       const currentHeight = document.documentElement.clientHeight;
// // //       // > 150px shrinkage = keyboard is open (accommodates address bar changes too)
// // //       const isOpen = (baseHeight - currentHeight) > 150;
// // //       setKeyboardOpen(isOpen);

// // //       // Debounce scroll: Android fires this event 30-60x during keyboard animation.
// // //       // Wait until events stop (200ms of silence) before scrolling — that's when
// // //       // the layout has fully settled.
// // //       if (isOpen) {
// // //         clearTimeout(scrollTimeout);
// // //         scrollTimeout = setTimeout(() => {
// // //           requestAnimationFrame(() => {
// // //             const el = messagesContainerRef.current;
// // //             if (el) el.scrollTop = el.scrollHeight;
// // //           });
// // //         }, 200);
// // //       }
// // //     };

// // //     window.visualViewport.addEventListener("resize", onResize, { passive: true });
// // //     return () => {
// // //       window.visualViewport.removeEventListener("resize", onResize);
// // //       clearTimeout(scrollTimeout);
// // //     };
// // //   }, [messagesContainerRef]);

// // //   if (!otherUser) return null;

// // //   return (
// // //     // h-full: fills the layout viewport. resizes-content shrinks the layout
// // //     // viewport when keyboard opens, so this div naturally compresses.
// // //     // NO explicit height in px — we let the browser's own layout do the work.
// // //     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
// // //       <ChatHeader
// // //         otherUser={otherUser} isBlocked={isBlocked} navigate={navigate}
// // //         chatOptionsRef={chatOptionsRef} handleToggleChatOptions={handleToggleChatOptions}
// // //         onBack={onBack}
// // //       />

// // //       <MessageList
// // //         messagesContainerRef={messagesContainerRef} fetchingMessages={fetchingMessages}
// // //         hasMore={hasMore} messages={messages} conversationId={conversationId}
// // //         loadOlderMessages={loadOlderMessages} loadingMore={loadingMore}
// // //         myUserId={myUserId} otherUser={otherUser} user={user} chatTheme={chatTheme}
// // //       />

// // //       {isBlocked
// // //         ? <BlockedBanner otherUser={otherUser} />
// // //         : <InputBarAndroid
// // //             text={text} setText={setText} textareaRef={textareaRef}
// // //             emojiPickerRef={emojiPickerRef} showEmojiPicker={showEmojiPicker}
// // //             setShowEmojiPicker={setShowEmojiPicker} insertEmoji={insertEmoji}
// // //             handleSend={handleSend} isBlocked={isBlocked} keyboardOpen={keyboardOpen}
// // //           />
// // //       }

// // //       {showChatOptions && createPortal(
// // //         <div style={{ position: "fixed", top: popupPos.top, right: popupPos.right, zIndex: 99999 }}>
// // //           <ChatOptionsPopup
// // //             onClose={() => setShowChatOptions(false)}
// // //             onClearChat={() => { setMessages(prev => ({ ...prev, [conversationId]: [] })); onClearMessages?.(conversationId); }}
// // //             onBlock={() => setIsBlocked(true)}
// // //             onThemeChange={theme => setChatTheme(theme)}
// // //             currentTheme={chatTheme}
// // //             anchorRef={chatOptionsRef}
// // //             conversationId={conversationId}
// // //             otherUserId={receiverId}
// // //             isBlocked={isBlocked}
// // //             onUnblock={() => setIsBlocked(false)}
// // //           />
// // //         </div>,
// // //         document.body,
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // Public export — selects platform variant at module load time.
// // // //
// // // // Android → ChatBoxAndroid (resizes-content, no blur, flat bg, debounced scroll)
// // // // iOS + all others → ChatBoxIOS (resizes-visual, explicit height from vv, blur ok)
// // // //
// // // // Desktop: visualViewport.height === window.innerHeight always (no keyboard),
// // // // so ChatBoxIOS degrades correctly — containerHeight stays at full window height.
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function ChatBox(props) {
// // //   const Variant = useMemo(() => IS_ANDROID ? ChatBoxAndroid : ChatBoxIOS, []);
// // //   return <Variant {...props} />;
// // // }

// // // export default ChatBox;

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // WEBSOCKET CONTEXT — reference implementation for the ACK handler
// // // // (belongs in your websocketContext provider, not in this file)
// // // // ─────────────────────────────────────────────────────────────────────────────
// // // //
// // // // ws.onmessage = (event) => {
// // // //   const signal = JSON.parse(event.data);
// // // //
// // // //   if (signal.type === "message_ack") {
// // // //     setMessages(prev => ({
// // // //       ...prev,
// // // //       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
// // // //         m.messageId === signal.messageId ? { ...m, status: "sent" } : m
// // // //       ),
// // // //     }));
// // // //   }
// // // //
// // // //   if (signal.type === "message_delivered") {
// // // //     setMessages(prev => ({
// // // //       ...prev,
// // // //       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
// // // //         m.messageId === signal.messageId ? { ...m, status: "delivered" } : m
// // // //       ),
// // // //     }));
// // // //   }
// // // //
// // // //   if (signal.type === "message_read") {
// // // //     setMessages(prev => ({
// // // //       ...prev,
// // // //       [signal.conversationId]: (prev[signal.conversationId] || []).map(m =>
// // // //         m.conversationId === signal.conversationId && m.status !== "read"
// // // //           ? { ...m, status: "read" }
// // // //           : m
// // // //       ),
// // // //     }));
// // // //   }
// // // // };

// // // import { ArrowLeft, Send, Smile } from "lucide-react";
// // // import {
// // //   useContext,
// // //   useState,
// // //   useEffect,
// // //   useRef,
// // //   useCallback,
// // //   useMemo,
// // // } from "react";
// // // import { createPortal } from "react-dom";
// // // import { v4 as uuidv4 } from "uuid";
// // // import { websocketContext } from "../../context/WebSocket";
// // // import { useAuth } from "../../hooks/useAuth";
// // // import fetchData from "../../utils/fetchData";
// // // import MessageBubble from "../MessageBubble";
// // // import ChatOptionsPopup from "../ChatOptionsPopup";
// // // import { useNavigate } from "react-router-dom";

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // Platform detection — evaluated once at module load, never changes.
// // // //
// // // // ChatBox keyboard strategy differs fundamentally between iOS and Android:
// // // //
// // // // iOS Safari:
// // // //   • The entire page shrinks (window.innerHeight decreases) when the keyboard
// // // //     opens. Because ChatBox is a flex column filling the screen via h-full/dvh,
// // // //     it naturally shrinks with the page — the input bar stays visible and the
// // // //     message list fills the remaining space. No JS intervention needed for
// // // //     layout. We only need to scroll the message list to the bottom after the
// // // //     keyboard settles (one visualViewport event, post-animation).
// // // //   • backdropFilter: blur() on the input bar is fine — iOS compositor handles
// // // //     it cleanly.
// // // //   • Safe-area-inset-bottom disappears when the keyboard is open (the home
// // // //     bar slides away), so env(safe-area-inset-bottom) self-corrects.
// // // //
// // // // Android Chrome (with interactive-widget=resizes-content):
// // // //   • The layout viewport (clientHeight) shrinks when keyboard opens. Our flex
// // // //     column reflows correctly — same as iOS, no extra JS layout work.
// // // //   • BUT: backdropFilter: blur() on the input bar promotes a compositing layer.
// // // //     The boundary between our layer and the keyboard surface shows as a white
// // // //     strip. Fix: remove blur from the input bar on Android.
// // // //   • BUT: safe-area-inset-bottom on gesture-nav Android stays non-zero when
// // // //     the keyboard is open (the navigation bar persists). This pushes the input
// // // //     bar up by an extra ~20-48px above the keyboard. Fix: detect keyboard open
// // // //     state and conditionally remove safe-area padding.
// // // //   • BUT: visualViewport fires 30-60x during keyboard animation. Any JS that
// // // //     mutates layout on each event causes jank. We debounce scroll-to-bottom.
// // // //   • BUT: the emoji picker is position:absolute bottom:100%. On Android, when
// // // //     the keyboard is open and the picker is rendered, the picker can overflow
// // // //     above the screen if the message list is short. Fix: cap the picker height
// // // //     and use overflow-y:auto so it's always on-screen.
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // const UA = typeof navigator !== "undefined" ? navigator.userAgent : "";
// // // const IS_ANDROID = /Android/i.test(UA);

// // // // dvh = "dynamic viewport height" — shrinks with browser chrome (address bar).
// // // // Supported: Chrome 108+, Safari 15.4+, Firefox 109+.
// // // const SUPPORTS_DVH = (() => {
// // //   try {
// // //     const el = document.createElement("div");
// // //     el.style.height = "1dvh";
// // //     return el.style.height === "1dvh";
// // //   } catch {
// // //     return false;
// // //   }
// // // })();

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // Viewport meta management
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function useViewportMeta() {
// // //   useEffect(() => {
// // //     let meta = document.querySelector('meta[name="viewport"]');
// // //     const prev = meta?.getAttribute("content") ?? "";
// // //     if (!meta) {
// // //       meta = document.createElement("meta");
// // //       meta.name = "viewport";
// // //       document.head.appendChild(meta);
// // //     }
// // //     const value = IS_ANDROID
// // //       ? "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
// // //       : "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-visual";
// // //     meta.setAttribute("content", value);
// // //     return () => meta.setAttribute("content", prev);
// // //   }, []);
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // Shared constants
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // const EMOJI_LIST = [
// // //   "😀",
// // //   "😂",
// // //   "😍",
// // //   "🥰",
// // //   "😎",
// // //   "🤔",
// // //   "😭",
// // //   "😡",
// // //   "🥺",
// // //   "😴",
// // //   "👍",
// // //   "👎",
// // //   "❤️",
// // //   "🔥",
// // //   "✨",
// // //   "🎉",
// // //   "🙏",
// // //   "💯",
// // //   "😊",
// // //   "🤣",
// // //   "😘",
// // //   "🥳",
// // //   "😤",
// // //   "🤯",
// // //   "😇",
// // //   "🤗",
// // //   "😏",
// // //   "🙄",
// // //   "😬",
// // //   "🤝",
// // //   "👀",
// // //   "💀",
// // //   "🫡",
// // //   "🫠",
// // //   "🥹",
// // //   "😮",
// // //   "😱",
// // //   "🤌",
// // //   "💪",
// // //   "👏",
// // //   "🍕",
// // //   "🎮",
// // //   "🎵",
// // //   "⚡",
// // //   "🌙",
// // //   "☀️",
// // //   "🌈",
// // //   "💫",
// // //   "🚀",
// // //   "🎯",
// // // ];

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // MessageStatus
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function MessageStatus({ status }) {
// // //   if (status === "blocked") {
// // //     return (
// // //       <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>
// // //     );
// // //   }
// // //   if (status === "sending" || status === "sent") {
// // //     return (
// // //       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// // //         <path
// // //           d="M1 5l3 3 5-6"
// // //           stroke="rgba(255,255,255,0.35)"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //       </svg>
// // //     );
// // //   }
// // //   if (status === "read") {
// // //     return (
// // //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// // //         <path
// // //           d="M1 5l3 3 5-6"
// // //           stroke="#60a5fa"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //         <path
// // //           d="M6 5l3 3 5-6"
// // //           stroke="#60a5fa"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //       </svg>
// // //     );
// // //   }
// // //   if (status === "delivered") {
// // //     return (
// // //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// // //         <path
// // //           d="M1 5l3 3 5-6"
// // //           stroke="rgba(255,255,255,0.35)"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //         <path
// // //           d="M6 5l3 3 5-6"
// // //           stroke="rgba(255,255,255,0.35)"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         />
// // //       </svg>
// // //     );
// // //   }
// // //   return (
// // //     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// // //       <path
// // //         d="M1 5l3 3 5-6"
// // //         stroke="rgba(255,255,255,0.35)"
// // //         strokeWidth="1.6"
// // //         strokeLinecap="round"
// // //         strokeLinejoin="round"
// // //       />
// // //     </svg>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // MessageSkeleton
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function MessageSkeleton() {
// // //   return (
// // //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex items-end gap-2">
// // //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// // //         <div className="h-9 w-40 rounded-2xl rounded-bl-sm bg-white/8" />
// // //       </div>
// // //       <div className="flex justify-end">
// // //         <div className="h-9 w-28 rounded-2xl rounded-br-sm bg-white/8" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // useConversation — all data/WS logic, shared between both platform variants.
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function useConversation({ chat, onNewMessage, onClearMessages }) {
// // //   const { user } = useAuth();
// // //   const navigate = useNavigate();
// // //   const myUserId = user._id;
// // //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);
// // //   const conversationId = chat._id.toString();
// // //   const receiverId = otherUser?._id;

// // //   const {
// // //     sendSignal,
// // //     messages,
// // //     setMessages,
// // //     markAsRead,
// // //     setCurrentConversation,
// // //   } = useContext(websocketContext);

// // //   const [text, setText] = useState("");
// // //   const [cursor, setCursor] = useState(null);
// // //   const [loadingMore, setLoadingMore] = useState(false);
// // //   const [fetchingMessages, setFetchingMessages] = useState(true);
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// // //   const [showChatOptions, setShowChatOptions] = useState(false);
// // //   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
// // //   const [chatTheme, setChatTheme] = useState({
// // //     id: "default",
// // //     label: "Default",
// // //     bg: "#0a0a0a",
// // //   });
// // //   const [isBlocked, setIsBlocked] = useState(false);
// // //   const [hasMore, setHasMore] = useState(true);

// // //   const messagesContainerRef = useRef(null);
// // //   const shouldAutoScrollRef = useRef(true);
// // //   const textareaRef = useRef(null);
// // //   const emojiPickerRef = useRef(null);
// // //   const chatOptionsRef = useRef(null);
// // //   const readMarkedRef = useRef(false);

// // //   // ── Block status ──────────────────────────────────────────────────────────
// // //   useEffect(() => {
// // //     if (!receiverId) return;
// // //     let cancelled = false;
// // //     fetchData(`/api/users/${receiverId}/block-status`, {
// // //       credentials: "include",
// // //     })
// // //       .then((r) => r.json())
// // //       .then((data) => {
// // //         if (!cancelled) setIsBlocked(data.isBlocked);
// // //       })
// // //       .catch((err) => console.error("Failed to fetch block status", err));
// // //     return () => {
// // //       cancelled = true;
// // //     };
// // //   }, [receiverId]);

// // //   // ── Register current conversation ─────────────────────────────────────────
// // //   useEffect(() => {
// // //     setCurrentConversation(conversationId);
// // //     return () => setCurrentConversation(null);
// // //   }, [conversationId, setCurrentConversation]);

// // //   // ── Reset on conversation switch ──────────────────────────────────────────
// // //   useEffect(() => {
// // //     setHasMore(true);
// // //     setCursor(null);
// // //     setFetchingMessages(true);
// // //     setShowEmojiPicker(false);
// // //     setShowChatOptions(false);
// // //     setIsBlocked(false);
// // //     readMarkedRef.current = false;
// // //     shouldAutoScrollRef.current = true;
// // //   }, [conversationId]);

// // //   // ── Mark as read (deduplicated) ───────────────────────────────────────────
// // //   const doMarkRead = useCallback(() => {
// // //     const convMessages = messages[conversationId] || [];
// // //     const hasUnread = convMessages.some(
// // //       (m) => m.from !== myUserId && m.status !== "read",
// // //     );
// // //     if (!hasUnread) return;
// // //     setMessages((prev) => ({
// // //       ...prev,
// // //       [conversationId]: (prev[conversationId] || []).map((m) =>
// // //         m.from !== myUserId && m.status !== "read"
// // //           ? { ...m, status: "read" }
// // //           : m,
// // //       ),
// // //     }));
// // //     markAsRead(conversationId);
// // //     if (!readMarkedRef.current) {
// // //       readMarkedRef.current = true;
// // //       fetchData(`/api/chat/conversations/${conversationId}/read`, {
// // //         method: "PATCH",
// // //         credentials: "include",
// // //       }).catch(() => {});
// // //     }
// // //   }, [conversationId, messages, myUserId, markAsRead, setMessages]);

// // //   useEffect(() => {
// // //     doMarkRead();
// // //     readMarkedRef.current = false;
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [conversationId, messages[conversationId]?.length]);

// // //   // ── Emoji picker close on outside click ───────────────────────────────────
// // //   useEffect(() => {
// // //     const h = (e) => {
// // //       if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target))
// // //         setShowEmojiPicker(false);
// // //     };
// // //     document.addEventListener("mousedown", h);
// // //     return () => document.removeEventListener("mousedown", h);
// // //   }, []);

// // //   // ── Chat options toggle ───────────────────────────────────────────────────
// // //   const handleToggleChatOptions = useCallback(() => {
// // //     if (!showChatOptions && chatOptionsRef.current) {
// // //       const rect = chatOptionsRef.current.getBoundingClientRect();
// // //       setPopupPos({
// // //         top: rect.bottom + 6,
// // //         right: window.innerWidth - rect.right,
// // //       });
// // //     }
// // //     setShowChatOptions((v) => !v);
// // //   }, [showChatOptions]);

// // //   // ── Emoji insertion ───────────────────────────────────────────────────────
// // //   const insertEmoji = useCallback(
// // //     (emoji) => {
// // //       const ta = textareaRef.current;
// // //       if (!ta) {
// // //         setText((prev) => prev + emoji);
// // //         return;
// // //       }
// // //       const start = ta.selectionStart;
// // //       const end = ta.selectionEnd;
// // //       const newText = text.slice(0, start) + emoji + text.slice(end);
// // //       setText(newText);
// // //       requestAnimationFrame(() => {
// // //         ta.focus();
// // //         ta.selectionStart = start + emoji.length;
// // //         ta.selectionEnd = start + emoji.length;
// // //         ta.style.height = "auto";
// // //         ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
// // //       });
// // //     },
// // //     [text],
// // //   );

// // //   // ── Send ──────────────────────────────────────────────────────────────────
// // //   const handleSend = useCallback(async () => {
// // //     if (!text.trim() || isBlocked) return;
// // //     const messageId = uuidv4();
// // //     const createdAt = Date.now();
// // //     const messageText = text;
// // //     setMessages((prev) => {
// // //       const existing = prev[conversationId] || [];
// // //       return {
// // //         ...prev,
// // //         [conversationId]: [
// // //           ...existing,
// // //           {
// // //             messageId,
// // //             conversationId,
// // //             from: myUserId,
// // //             to: receiverId,
// // //             text: messageText,
// // //             status: "sending",
// // //             createdAt,
// // //           },
// // //         ],
// // //       };
// // //     });
// // //     sendSignal({
// // //       type: "chat_message",
// // //       messageId,
// // //       conversationId,
// // //       to: receiverId,
// // //       text: messageText,
// // //       createdAt,
// // //     });
// // //     onNewMessage?.(conversationId, messageText);
// // //     setText("");
// // //     setShowEmojiPicker(false);
// // //     if (textareaRef.current) textareaRef.current.style.height = "auto";
// // //     shouldAutoScrollRef.current = true;
// // //   }, [
// // //     text,
// // //     isBlocked,
// // //     conversationId,
// // //     myUserId,
// // //     receiverId,
// // //     sendSignal,
// // //     setMessages,
// // //     onNewMessage,
// // //   ]);

// // //   // ── Load older messages ───────────────────────────────────────────────────
// // //   const loadOlderMessages = useCallback(async () => {
// // //     if (!cursor || loadingMore) return;
// // //     setLoadingMore(true);
// // //     const el = messagesContainerRef.current;
// // //     const scrollHeightBefore = el ? el.scrollHeight : 0;
// // //     try {
// // //       const res = await fetchData(
// // //         `/api/chat/messages/${conversationId}?cursor=${cursor}`,
// // //         { credentials: "include" },
// // //       );
// // //       const data = await res.json();
// // //       const arr = Array.isArray(data) ? data : data.messages || [];
// // //       if (arr.length < 50) setHasMore(false);
// // //       const formatted = arr.map((msg) => ({
// // //         messageId: msg.messageId,
// // //         conversationId,
// // //         from: msg.senderId,
// // //         to: msg.receiverId,
// // //         text: msg.text,
// // //         status: msg.status || "sent",
// // //         createdAt: new Date(msg.createdAt).getTime(),
// // //       }));
// // //       shouldAutoScrollRef.current = false;
// // //       setMessages((prev) => {
// // //         const existing = prev[conversationId] || [];
// // //         const ids = new Set(existing.map((m) => m.messageId));
// // //         return {
// // //           ...prev,
// // //           [conversationId]: [
// // //             ...formatted.filter((m) => !ids.has(m.messageId)),
// // //             ...existing,
// // //           ],
// // //         };
// // //       });
// // //       if (arr.length > 0) setCursor(arr[0].createdAt);
// // //       setTimeout(() => {
// // //         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
// // //       }, 50);
// // //     } catch (err) {
// // //       console.error("Failed loading older messages", err);
// // //     }
// // //     setLoadingMore(false);
// // //   }, [cursor, loadingMore, conversationId, setMessages]);

// // //   // ── Scroll tracking ───────────────────────────────────────────────────────
// // //   useEffect(() => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     const h = () => {
// // //       shouldAutoScrollRef.current =
// // //         el.scrollHeight - el.scrollTop - el.clientHeight < 150;
// // //     };
// // //     el.addEventListener("scroll", h, { passive: true });
// // //     return () => el.removeEventListener("scroll", h);
// // //   }, []);

// // //   // ── Scroll to bottom helper ───────────────────────────────────────────────
// // //   const scrollToBottom = useCallback((force = false) => {
// // //     const el = messagesContainerRef.current;
// // //     if (!el) return;
// // //     if (!force && !shouldAutoScrollRef.current) return;
// // //     requestAnimationFrame(() => {
// // //       el.scrollTop = el.scrollHeight;
// // //     });
// // //   }, []);

// // //   // ── Initial fetch ─────────────────────────────────────────────────────────
// // //   useEffect(() => {
// // //     if (!conversationId) return;
// // //     let cancelled = false;
// // //     const fetch_ = async () => {
// // //       try {
// // //         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
// // //           credentials: "include",
// // //         });
// // //         const data = await res.json();
// // //         const arr = Array.isArray(data) ? data : data.messages || [];
// // //         if (arr.length < 50) setHasMore(false);
// // //         const formatted = arr.map((msg) => ({
// // //           messageId: msg.messageId,
// // //           conversationId,
// // //           from: msg.senderId,
// // //           to: msg.receiverId,
// // //           text: msg.text,
// // //           status: msg.status || "sent",
// // //           createdAt: new Date(msg.createdAt).getTime(),
// // //         }));
// // //         if (arr.length > 0) setCursor(arr[0].createdAt);
// // //         if (!cancelled) {
// // //           setMessages((prev) => {
// // //             const existing = prev[conversationId] || [];
// // //             const ids = new Set(existing.map((m) => m.messageId));
// // //             return {
// // //               ...prev,
// // //               [conversationId]: [
// // //                 ...existing,
// // //                 ...formatted.filter((m) => !ids.has(m.messageId)),
// // //               ],
// // //             };
// // //           });
// // //           requestAnimationFrame(() => {
// // //             const el = messagesContainerRef.current;
// // //             if (el) el.scrollTop = el.scrollHeight;
// // //           });
// // //         }
// // //       } catch (err) {
// // //         console.error("Failed to fetch messages", err);
// // //       } finally {
// // //         if (!cancelled) setFetchingMessages(false);
// // //       }
// // //     };
// // //     fetch_();
// // //     return () => {
// // //       cancelled = true;
// // //     };
// // //   }, [conversationId]);

// // //   // ── Auto-scroll on new message ────────────────────────────────────────────
// // //   const convMessageCount = messages[conversationId]?.length ?? 0;
// // //   useEffect(() => {
// // //     scrollToBottom(false);
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [convMessageCount]);

// // //   return {
// // //     // identity
// // //     user,
// // //     navigate,
// // //     myUserId,
// // //     otherUser,
// // //     conversationId,
// // //     receiverId,
// // //     messages,
// // //     setMessages,
// // //     // ui state
// // //     text,
// // //     setText,
// // //     loadingMore,
// // //     fetchingMessages,
// // //     showEmojiPicker,
// // //     setShowEmojiPicker,
// // //     showChatOptions,
// // //     setShowChatOptions,
// // //     popupPos,
// // //     chatTheme,
// // //     setChatTheme,
// // //     isBlocked,
// // //     setIsBlocked,
// // //     hasMore,
// // //     // refs
// // //     messagesContainerRef,
// // //     textareaRef,
// // //     emojiPickerRef,
// // //     chatOptionsRef,
// // //     // actions
// // //     handleSend,
// // //     handleToggleChatOptions,
// // //     insertEmoji,
// // //     loadOlderMessages,
// // //     scrollToBottom,
// // //   };
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // ChatHeader
// // // // FIX: pulls onlineUsers from websocketContext and shows green dot + "Online"
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function ChatHeader({
// // //   otherUser,
// // //   isBlocked,
// // //   navigate,
// // //   chatOptionsRef,
// // //   handleToggleChatOptions,
// // //   onBack,
// // // }) {
// // //   const { onlineUsers } = useContext(websocketContext);
// // //   const isOnline = onlineUsers?.has(otherUser?._id?.toString());

// // //   return (
// // //     <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// // //       <button
// // //         onClick={onBack}
// // //         className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// // //       >
// // //         <ArrowLeft size={18} />
// // //       </button>

// // //       {/* Avatar with online dot */}
// // //       <div
// // //         onClick={() => navigate(`/profile/${otherUser.username}`)}
// // //         className="relative w-9 h-9 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-150"
// // //       >
// // //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center">
// // //           {otherUser.profilePicture ? (
// // //             <img
// // //               src={otherUser.profilePicture}
// // //               alt={otherUser.username}
// // //               className="w-full h-full object-cover"
// // //             />
// // //           ) : (
// // //             <span className="text-sm font-semibold text-white">
// // //               {otherUser.username?.[0]?.toUpperCase()}
// // //             </span>
// // //           )}
// // //         </div>
// // //         {isOnline && (
// // //           <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 ring-2 ring-[#1a1a2e]" />
// // //         )}
// // //       </div>

// // //       {/* Name + status */}
// // //       <div className="flex flex-col flex-1 min-w-0">
// // //         <h3
// // //           onClick={() => navigate(`/profile/${otherUser.username}`)}
// // //           className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
// // //         >
// // //           {otherUser.username}
// // //         </h3>
// // //         {isBlocked ? (
// // //           <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
// // //             Blocked
// // //           </span>
// // //         ) : isOnline ? (
// // //           <span className="text-[11px] text-green-400 font-medium">Online</span>
// // //         ) : (
// // //           <span className="text-[11px] text-white/30">Offline</span>
// // //         )}
// // //       </div>

// // //       <div ref={chatOptionsRef} className="relative flex-shrink-0">
// // //         <button
// // //           onClick={handleToggleChatOptions}
// // //           className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
// // //         >
// // //           <svg
// // //             width="16"
// // //             height="16"
// // //             viewBox="0 0 24 24"
// // //             fill="none"
// // //             stroke="currentColor"
// // //             strokeWidth="2"
// // //             strokeLinecap="round"
// // //           >
// // //             <circle cx="12" cy="5" r="1" />
// // //             <circle cx="12" cy="12" r="1" />
// // //             <circle cx="12" cy="19" r="1" />
// // //           </svg>
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // MessageList
// // // // FIX: changed items-end → items-start on the message row wrapper so the
// // // // avatar aligns to the top of the bubble instead of the bottom. This means
// // // // for multi-line messages the avatar no longer slides down to sit at the
// // // // bottom edge of the bubble — it stays at the top, which is the standard
// // // // chat alignment used by WhatsApp, iMessage, etc.
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function MessageList({
// // //   messagesContainerRef,
// // //   fetchingMessages,
// // //   hasMore,
// // //   messages,
// // //   conversationId,
// // //   loadOlderMessages,
// // //   loadingMore,
// // //   myUserId,
// // //   otherUser,
// // //   user,
// // //   chatTheme,
// // // }) {
// // //   if (fetchingMessages) {
// // //     return (
// // //       <div className="flex-1 overflow-hidden">
// // //         <MessageSkeleton />
// // //       </div>
// // //     );
// // //   }
// // //   return (
// // //     <div
// // //       ref={messagesContainerRef}
// // //       className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// // //       style={{
// // //         overscrollBehavior: "contain",
// // //         WebkitOverflowScrolling: "touch",
// // //         background: chatTheme.bg,
// // //         transition: "background 0.3s ease",
// // //       }}
// // //     >
// // //       {hasMore && messages[conversationId]?.length > 0 && (
// // //         <div className="flex justify-center mb-2">
// // //           <button
// // //             onClick={loadOlderMessages}
// // //             disabled={loadingMore}
// // //             className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide disabled:opacity-50"
// // //           >
// // //             {loadingMore ? "Loading…" : "Load older messages"}
// // //           </button>
// // //         </div>
// // //       )}
// // //       {(!messages[conversationId] || messages[conversationId].length === 0) && (
// // //         <div className="text-center text-white/60 text-sm">
// // //           Start a conversation with {otherUser.username}
// // //         </div>
// // //       )}
// // //       {(messages[conversationId] || []).map((msg) => (
// // //         <MessageBubble
// // //           key={msg.messageId}
// // //           msg={msg}
// // //           isMe={msg.from === myUserId}
// // //           otherUser={otherUser}
// // //           user={user}
// // //         />
// // //       ))}
// // //       <div className="h-2" />
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // BlockedBanner
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function BlockedBanner({ otherUser }) {
// // //   return (
// // //     <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
// // //       <svg
// // //         width="16"
// // //         height="16"
// // //         viewBox="0 0 24 24"
// // //         fill="none"
// // //         stroke="#f87171"
// // //         strokeWidth="1.8"
// // //         strokeLinecap="round"
// // //         strokeLinejoin="round"
// // //       >
// // //         <circle cx="12" cy="12" r="10" />
// // //         <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
// // //       </svg>
// // //       <p className="text-sm text-white/40 text-center">
// // //         You have blocked{" "}
// // //         <span className="text-white/60 font-medium">{otherUser.username}</span>.
// // //         They can no longer message you.
// // //       </p>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // EmojiPicker
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function EmojiPicker({ emojiPickerRef, insertEmoji }) {
// // //   return (
// // //     <div
// // //       ref={emojiPickerRef}
// // //       className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
// // //       style={{
// // //         maxHeight: IS_ANDROID ? 220 : 280,
// // //         overflowY: "auto",
// // //         overscrollBehavior: "contain",
// // //       }}
// // //     >
// // //       <div className="grid grid-cols-10 gap-1">
// // //         {EMOJI_LIST.map((emoji) => (
// // //           <button
// // //             key={emoji}
// // //             onClick={() => insertEmoji(emoji)}
// // //             className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
// // //           >
// // //             {emoji}
// // //           </button>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // InputBarIOS
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function InputBarIOS({
// // //   text,
// // //   setText,
// // //   textareaRef,
// // //   emojiPickerRef,
// // //   showEmojiPicker,
// // //   setShowEmojiPicker,
// // //   insertEmoji,
// // //   handleSend,
// // //   isBlocked,
// // // }) {
// // //   return (
// // //     <div
// // //       className="flex-shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-sm relative"
// // //       style={{
// // //         paddingTop: 12,
// // //         paddingLeft: 12,
// // //         paddingRight: 12,
// // //         paddingBottom:
// // //           "max(12px, calc(12px + env(safe-area-inset-bottom, 0px)))",
// // //       }}
// // //     >
// // //       {showEmojiPicker && (
// // //         <EmojiPicker
// // //           emojiPickerRef={emojiPickerRef}
// // //           insertEmoji={insertEmoji}
// // //         />
// // //       )}
// // //       <div className="flex items-end gap-2">
// // //         <button
// // //           onClick={() => setShowEmojiPicker((prev) => !prev)}
// // //           className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
// // //             showEmojiPicker
// // //               ? "bg-indigo-600 border-indigo-500 text-white"
// // //               : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// // //           }`}
// // //         >
// // //           <Smile size={17} />
// // //         </button>
// // //         <textarea
// // //           ref={textareaRef}
// // //           rows={1}
// // //           value={text}
// // //           onChange={(e) => {
// // //             setText(e.target.value);
// // //             e.target.style.height = "auto";
// // //             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
// // //           }}
// // //           onKeyDown={(e) => {
// // //             if (e.key === "Enter" && !e.shiftKey) {
// // //               e.preventDefault();
// // //               handleSend();
// // //             }
// // //           }}
// // //           placeholder="Type a message…"
// // //           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// // //           style={{ maxHeight: "112px", fontSize: "16px" }}
// // //         />
// // //         <button
// // //           onClick={handleSend}
// // //           disabled={!text.trim()}
// // //           className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
// // //         >
// // //           <Send size={16} className="text-white ml-0.5" />
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // InputBarAndroid
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function InputBarAndroid({
// // //   text,
// // //   setText,
// // //   textareaRef,
// // //   emojiPickerRef,
// // //   showEmojiPicker,
// // //   setShowEmojiPicker,
// // //   insertEmoji,
// // //   handleSend,
// // //   isBlocked,
// // //   keyboardOpen,
// // // }) {
// // //   return (
// // //     <div
// // //       className="flex-shrink-0 border-t border-white/10 relative"
// // //       style={{
// // //         paddingTop: 12,
// // //         paddingLeft: 12,
// // //         paddingRight: 12,
// // //         paddingBottom: keyboardOpen
// // //           ? 12
// // //           : "max(12px, calc(12px + env(safe-area-inset-bottom, 0px)))",
// // //         backgroundColor: "rgba(255,255,255,0.04)",
// // //       }}
// // //     >
// // //       {showEmojiPicker && (
// // //         <EmojiPicker
// // //           emojiPickerRef={emojiPickerRef}
// // //           insertEmoji={insertEmoji}
// // //         />
// // //       )}
// // //       <div className="flex items-end gap-2">
// // //         <button
// // //           onClick={() => setShowEmojiPicker((prev) => !prev)}
// // //           className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
// // //             showEmojiPicker
// // //               ? "bg-indigo-600 border-indigo-500 text-white"
// // //               : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// // //           }`}
// // //         >
// // //           <Smile size={17} />
// // //         </button>
// // //         <textarea
// // //           ref={textareaRef}
// // //           rows={1}
// // //           value={text}
// // //           onChange={(e) => {
// // //             setText(e.target.value);
// // //             e.target.style.height = "auto";
// // //             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
// // //           }}
// // //           onKeyDown={(e) => {
// // //             if (e.key === "Enter" && !e.shiftKey) {
// // //               e.preventDefault();
// // //               handleSend();
// // //             }
// // //           }}
// // //           placeholder="Type a message…"
// // //           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// // //           style={{ maxHeight: "112px", fontSize: "16px" }}
// // //           inputMode="text"
// // //         />
// // //         <button
// // //           onClick={handleSend}
// // //           disabled={!text.trim()}
// // //           className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
// // //         >
// // //           <Send size={16} className="text-white ml-0.5" />
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // iOS CHATBOX VARIANT
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function ChatBoxIOS({ chat, onBack, onNewMessage, onClearMessages }) {
// // //   useViewportMeta();

// // //   const conv = useConversation({ chat, onNewMessage, onClearMessages });
// // //   const {
// // //     user,
// // //     navigate,
// // //     myUserId,
// // //     otherUser,
// // //     conversationId,
// // //     receiverId,
// // //     messages,
// // //     setMessages,
// // //     text,
// // //     setText,
// // //     loadingMore,
// // //     fetchingMessages,
// // //     showEmojiPicker,
// // //     setShowEmojiPicker,
// // //     showChatOptions,
// // //     setShowChatOptions,
// // //     popupPos,
// // //     chatTheme,
// // //     setChatTheme,
// // //     isBlocked,
// // //     setIsBlocked,
// // //     hasMore,
// // //     messagesContainerRef,
// // //     textareaRef,
// // //     emojiPickerRef,
// // //     chatOptionsRef,
// // //     handleSend,
// // //     handleToggleChatOptions,
// // //     insertEmoji,
// // //     loadOlderMessages,
// // //     scrollToBottom,
// // //   } = conv;

// // //   const [containerHeight, setContainerHeight] = useState(() =>
// // //     window.visualViewport ? window.visualViewport.height : window.innerHeight,
// // //   );

// // //   useEffect(() => {
// // //     if (!window.visualViewport) return;
// // //     const onResize = () => {
// // //       const vv = window.visualViewport;
// // //       setContainerHeight(vv.height);
// // //       requestAnimationFrame(() => {
// // //         const el = messagesContainerRef.current;
// // //         if (el) el.scrollTop = el.scrollHeight;
// // //       });
// // //     };
// // //     window.visualViewport.addEventListener("resize", onResize);
// // //     return () => window.visualViewport.removeEventListener("resize", onResize);
// // //   }, [messagesContainerRef]);

// // //   if (!otherUser) return null;

// // //   return (
// // //     <div
// // //       className="flex flex-col w-full overflow-hidden"
// // //       style={{ height: containerHeight }}
// // //     >
// // //       <ChatHeader
// // //         otherUser={otherUser}
// // //         isBlocked={isBlocked}
// // //         navigate={navigate}
// // //         chatOptionsRef={chatOptionsRef}
// // //         handleToggleChatOptions={handleToggleChatOptions}
// // //         onBack={onBack}
// // //       />
// // //       <MessageList
// // //         messagesContainerRef={messagesContainerRef}
// // //         fetchingMessages={fetchingMessages}
// // //         hasMore={hasMore}
// // //         messages={messages}
// // //         conversationId={conversationId}
// // //         loadOlderMessages={loadOlderMessages}
// // //         loadingMore={loadingMore}
// // //         myUserId={myUserId}
// // //         otherUser={otherUser}
// // //         user={user}
// // //         chatTheme={chatTheme}
// // //       />
// // //       {isBlocked ? (
// // //         <BlockedBanner otherUser={otherUser} />
// // //       ) : (
// // //         <InputBarIOS
// // //           text={text}
// // //           setText={setText}
// // //           textareaRef={textareaRef}
// // //           emojiPickerRef={emojiPickerRef}
// // //           showEmojiPicker={showEmojiPicker}
// // //           setShowEmojiPicker={setShowEmojiPicker}
// // //           insertEmoji={insertEmoji}
// // //           handleSend={handleSend}
// // //           isBlocked={isBlocked}
// // //         />
// // //       )}
// // //       {showChatOptions &&
// // //         createPortal(
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: popupPos.top,
// // //               right: popupPos.right,
// // //               zIndex: 99999,
// // //             }}
// // //           >
// // //             <ChatOptionsPopup
// // //               onClose={() => setShowChatOptions(false)}
// // //               onClearChat={() => {
// // //                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
// // //                 onClearMessages?.(conversationId);
// // //               }}
// // //               onBlock={() => setIsBlocked(true)}
// // //               onThemeChange={(theme) => setChatTheme(theme)}
// // //               currentTheme={chatTheme}
// // //               anchorRef={chatOptionsRef}
// // //               conversationId={conversationId}
// // //               otherUserId={receiverId}
// // //               isBlocked={isBlocked}
// // //               onUnblock={() => setIsBlocked(false)}
// // //             />
// // //           </div>,
// // //           document.body,
// // //         )}
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // ANDROID CHATBOX VARIANT
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function ChatBoxAndroid({ chat, onBack, onNewMessage, onClearMessages }) {
// // //   useViewportMeta();

// // //   const conv = useConversation({ chat, onNewMessage, onClearMessages });
// // //   const {
// // //     user,
// // //     navigate,
// // //     myUserId,
// // //     otherUser,
// // //     conversationId,
// // //     receiverId,
// // //     messages,
// // //     setMessages,
// // //     text,
// // //     setText,
// // //     loadingMore,
// // //     fetchingMessages,
// // //     showEmojiPicker,
// // //     setShowEmojiPicker,
// // //     showChatOptions,
// // //     setShowChatOptions,
// // //     popupPos,
// // //     chatTheme,
// // //     setChatTheme,
// // //     isBlocked,
// // //     setIsBlocked,
// // //     hasMore,
// // //     messagesContainerRef,
// // //     textareaRef,
// // //     emojiPickerRef,
// // //     chatOptionsRef,
// // //     handleSend,
// // //     handleToggleChatOptions,
// // //     insertEmoji,
// // //     loadOlderMessages,
// // //   } = conv;

// // //   const [keyboardOpen, setKeyboardOpen] = useState(false);

// // //   useEffect(() => {
// // //     if (!window.visualViewport) return;
// // //     const baseHeight = document.documentElement.clientHeight;
// // //     let scrollTimeout = null;
// // //     const onResize = () => {
// // //       const currentHeight = document.documentElement.clientHeight;
// // //       const isOpen = baseHeight - currentHeight > 150;
// // //       setKeyboardOpen(isOpen);
// // //       if (isOpen) {
// // //         clearTimeout(scrollTimeout);
// // //         scrollTimeout = setTimeout(() => {
// // //           requestAnimationFrame(() => {
// // //             const el = messagesContainerRef.current;
// // //             if (el) el.scrollTop = el.scrollHeight;
// // //           });
// // //         }, 200);
// // //       }
// // //     };
// // //     window.visualViewport.addEventListener("resize", onResize, {
// // //       passive: true,
// // //     });
// // //     return () => {
// // //       window.visualViewport.removeEventListener("resize", onResize);
// // //       clearTimeout(scrollTimeout);
// // //     };
// // //   }, [messagesContainerRef]);

// // //   if (!otherUser) return null;

// // //   return (
// // //     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
// // //       <ChatHeader
// // //         otherUser={otherUser}
// // //         isBlocked={isBlocked}
// // //         navigate={navigate}
// // //         chatOptionsRef={chatOptionsRef}
// // //         handleToggleChatOptions={handleToggleChatOptions}
// // //         onBack={onBack}
// // //       />
// // //       <MessageList
// // //         messagesContainerRef={messagesContainerRef}
// // //         fetchingMessages={fetchingMessages}
// // //         hasMore={hasMore}
// // //         messages={messages}
// // //         conversationId={conversationId}
// // //         loadOlderMessages={loadOlderMessages}
// // //         loadingMore={loadingMore}
// // //         myUserId={myUserId}
// // //         otherUser={otherUser}
// // //         user={user}
// // //         chatTheme={chatTheme}
// // //       />
// // //       {isBlocked ? (
// // //         <BlockedBanner otherUser={otherUser} />
// // //       ) : (
// // //         <InputBarAndroid
// // //           text={text}
// // //           setText={setText}
// // //           textareaRef={textareaRef}
// // //           emojiPickerRef={emojiPickerRef}
// // //           showEmojiPicker={showEmojiPicker}
// // //           setShowEmojiPicker={setShowEmojiPicker}
// // //           insertEmoji={insertEmoji}
// // //           handleSend={handleSend}
// // //           isBlocked={isBlocked}
// // //           keyboardOpen={keyboardOpen}
// // //         />
// // //       )}
// // //       {showChatOptions &&
// // //         createPortal(
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: popupPos.top,
// // //               right: popupPos.right,
// // //               zIndex: 99999,
// // //             }}
// // //           >
// // //             <ChatOptionsPopup
// // //               onClose={() => setShowChatOptions(false)}
// // //               onClearChat={() => {
// // //                 setMessages((prev) => ({ ...prev, [conversationId]: [] }));
// // //                 onClearMessages?.(conversationId);
// // //               }}
// // //               onBlock={() => setIsBlocked(true)}
// // //               onThemeChange={(theme) => setChatTheme(theme)}
// // //               currentTheme={chatTheme}
// // //               anchorRef={chatOptionsRef}
// // //               conversationId={conversationId}
// // //               otherUserId={receiverId}
// // //               isBlocked={isBlocked}
// // //               onUnblock={() => setIsBlocked(false)}
// // //             />
// // //           </div>,
// // //           document.body,
// // //         )}
// // //     </div>
// // //   );
// // // }

// // // // ─────────────────────────────────────────────────────────────────────────────
// // // // Public export
// // // // ─────────────────────────────────────────────────────────────────────────────

// // // function ChatBox(props) {
// // //   const Variant = useMemo(() => (IS_ANDROID ? ChatBoxAndroid : ChatBoxIOS), []);
// // //   return <Variant {...props} />;
// // // }

// // // export default ChatBox;



// // import { ArrowLeft, Send, Smile } from "lucide-react";
// // import {
// //   useContext,
// //   useState,
// //   useEffect,
// //   useRef,
// //   useCallback,
// //   useMemo,
// // } from "react";
// // import { createPortal } from "react-dom";
// // import { v4 as uuidv4 } from "uuid";
// // import { websocketContext } from "../../context/WebSocket";
// // import { useAuth } from "../../hooks/useAuth";
// // import fetchData from "../../utils/fetchData";
// // import MessageBubble from "../MessageBubble";
// // import ChatOptionsPopup from "../ChatOptionsPopup";
// // import { useNavigate } from "react-router-dom";

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Platform detection
// // // ─────────────────────────────────────────────────────────────────────────────

// // const UA = typeof navigator !== "undefined" ? navigator.userAgent : "";
// // const IS_ANDROID = /Android/i.test(UA);

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Viewport meta management
// // //
// // //   iOS  → resizes-visual: visual viewport shrinks, layout viewport stays.
// // //          We track visualViewport.height and apply it as explicit height.
// // //
// // //   Android → resizes-content: layout viewport shrinks automatically.
// // //          h-full flex column compresses by itself. No JS height needed.
// // // ─────────────────────────────────────────────────────────────────────────────

// // function useViewportMeta() {
// //   useEffect(() => {
// //     let meta = document.querySelector('meta[name="viewport"]');
// //     const prev = meta?.getAttribute("content") ?? "";
// //     if (!meta) {
// //       meta = document.createElement("meta");
// //       meta.name = "viewport";
// //       document.head.appendChild(meta);
// //     }
// //     const value = IS_ANDROID
// //       ? "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
// //       : "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-visual";
// //     meta.setAttribute("content", value);
// //     return () => meta.setAttribute("content", prev);
// //   }, []);
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Shared constants
// // // ─────────────────────────────────────────────────────────────────────────────

// // const EMOJI_LIST = [
// //   "😀","😂","😍","🥰","😎","🤔","😭","😡","🥺","😴",
// //   "👍","👎","❤️","🔥","✨","🎉","🙏","💯","😊","🤣",
// //   "😘","🥳","😤","🤯","😇","🤗","😏","🙄","😬","🤝",
// //   "👀","💀","🫡","🫠","🥹","😮","😱","🤌","💪","👏",
// //   "🍕","🎮","🎵","⚡","🌙","☀️","🌈","💫","🚀","🎯",
// // ];

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Shared textarea attributes that suppress Android suggestions/password strip
// // //
// // // autoComplete="off"         → hides password manager icon on the strip
// // // autoCorrect="off"          → reduces strip on some Android keyboards  
// // // autoCapitalize="sentences" → keeps normal capitalisation
// // // spellCheck={false}         → no red underlines
// // // data-form-type="other"     → tells password managers to ignore this field
// // // enterKeyHint="send"        → shows "Send" label on the keyboard return key
// // // ─────────────────────────────────────────────────────────────────────────────

// // const TEXTAREA_PROPS = {
// //   autoComplete: "off",
// //   autoCorrect: "off",
// //   autoCapitalize: "sentences",
// //   spellCheck: false,
// //   "data-form-type": "other",
// //   enterKeyHint: "send",
// // };

// // // ─────────────────────────────────────────────────────────────────────────────
// // // MessageStatus
// // // ─────────────────────────────────────────────────────────────────────────────

// // function MessageStatus({ status }) {
// //   if (status === "blocked") {
// //     return <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>;
// //   }
// //   if (status === "sending" || status === "sent") {
// //     return (
// //       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// //         <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //       </svg>
// //     );
// //   }
// //   if (status === "read") {
// //     return (
// //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// //         <path d="M1 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //         <path d="M6 5l3 3 5-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //       </svg>
// //     );
// //   }
// //   if (status === "delivered") {
// //     return (
// //       <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
// //         <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //         <path d="M6 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //       </svg>
// //     );
// //   }
// //   return (
// //     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// //       <path d="M1 5l3 3 5-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //     </svg>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // MessageSkeleton
// // // ─────────────────────────────────────────────────────────────────────────────

// // function MessageSkeleton() {
// //   return (
// //     <div className="flex flex-col gap-3 px-4 py-4 animate-pulse">
// //       <div className="flex items-end gap-2">
// //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// //         <div className="h-9 w-48 rounded-2xl rounded-bl-sm bg-white/8" />
// //       </div>
// //       <div className="flex justify-end">
// //         <div className="h-9 w-36 rounded-2xl rounded-br-sm bg-white/8" />
// //       </div>
// //       <div className="flex items-end gap-2">
// //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// //         <div className="h-14 w-56 rounded-2xl rounded-bl-sm bg-white/8" />
// //       </div>
// //       <div className="flex justify-end">
// //         <div className="h-9 w-44 rounded-2xl rounded-br-sm bg-white/8" />
// //       </div>
// //       <div className="flex items-end gap-2">
// //         <div className="w-6 h-6 rounded-full bg-white/8 flex-shrink-0" />
// //         <div className="h-9 w-32 rounded-2xl rounded-bl-sm bg-white/8" />
// //       </div>
// //       <div className="flex justify-end">
// //         <div className="h-14 w-52 rounded-2xl rounded-br-sm bg-white/8" />
// //       </div>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // useConversation — all data/WS logic
// // // ─────────────────────────────────────────────────────────────────────────────

// // function useConversation({ chat, onNewMessage, onClearMessages }) {
// //   const { user } = useAuth();
// //   const navigate = useNavigate();
// //   const myUserId = user._id;
// //   const otherUser = chat.participants?.find((p) => p._id !== myUserId);
// //   const conversationId = chat._id.toString();
// //   const receiverId = otherUser?._id;

// //   const { sendSignal, messages, setMessages, markAsRead, setCurrentConversation } = useContext(websocketContext);

// //   const [text, setText] = useState("");
// //   const [cursor, setCursor] = useState(null);
// //   const [loadingMore, setLoadingMore] = useState(false);
// //   const [fetchingMessages, setFetchingMessages] = useState(true);
// //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// //   const [showChatOptions, setShowChatOptions] = useState(false);
// //   const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
// //   const [chatTheme, setChatTheme] = useState({ id: "default", label: "Default", bg: "#0a0a0a" });
// //   const [isBlocked, setIsBlocked] = useState(false);
// //   const [hasMore, setHasMore] = useState(true);

// //   const messagesContainerRef = useRef(null);
// //   const shouldAutoScrollRef = useRef(true);
// //   const textareaRef = useRef(null);
// //   const emojiPickerRef = useRef(null);
// //   const chatOptionsRef = useRef(null);
// //   const readMarkedRef = useRef(false);

// //   useEffect(() => {
// //     if (!receiverId) return;
// //     let cancelled = false;
// //     fetchData(`/api/users/${receiverId}/block-status`, { credentials: "include" })
// //       .then((r) => r.json())
// //       .then((data) => { if (!cancelled) setIsBlocked(data.isBlocked); })
// //       .catch((err) => console.error("Failed to fetch block status", err));
// //     return () => { cancelled = true; };
// //   }, [receiverId]);

// //   useEffect(() => {
// //     setCurrentConversation(conversationId);
// //     return () => setCurrentConversation(null);
// //   }, [conversationId, setCurrentConversation]);

// //   useEffect(() => {
// //     setHasMore(true);
// //     setCursor(null);
// //     setFetchingMessages(true);
// //     setShowEmojiPicker(false);
// //     setShowChatOptions(false);
// //     setIsBlocked(false);
// //     readMarkedRef.current = false;
// //     shouldAutoScrollRef.current = true;
// //   }, [conversationId]);

// //   const doMarkRead = useCallback(() => {
// //     const convMessages = messages[conversationId] || [];
// //     const hasUnread = convMessages.some((m) => m.from !== myUserId && m.status !== "read");
// //     if (!hasUnread) return;
// //     setMessages((prev) => ({
// //       ...prev,
// //       [conversationId]: (prev[conversationId] || []).map((m) =>
// //         m.from !== myUserId && m.status !== "read" ? { ...m, status: "read" } : m
// //       ),
// //     }));
// //     markAsRead(conversationId);
// //     if (!readMarkedRef.current) {
// //       readMarkedRef.current = true;
// //       fetchData(`/api/chat/conversations/${conversationId}/read`, { method: "PATCH", credentials: "include" }).catch(() => {});
// //     }
// //   }, [conversationId, messages, myUserId, markAsRead, setMessages]);

// //   useEffect(() => {
// //     doMarkRead();
// //     readMarkedRef.current = false;
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [conversationId, messages[conversationId]?.length]);

// //   useEffect(() => {
// //     const h = (e) => {
// //       if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target))
// //         setShowEmojiPicker(false);
// //     };
// //     document.addEventListener("mousedown", h);
// //     return () => document.removeEventListener("mousedown", h);
// //   }, []);

// //   const handleToggleChatOptions = useCallback(() => {
// //     if (!showChatOptions && chatOptionsRef.current) {
// //       const rect = chatOptionsRef.current.getBoundingClientRect();
// //       setPopupPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
// //     }
// //     setShowChatOptions((v) => !v);
// //   }, [showChatOptions]);

// //   const insertEmoji = useCallback((emoji) => {
// //     const ta = textareaRef.current;
// //     if (!ta) { setText((prev) => prev + emoji); return; }
// //     const start = ta.selectionStart;
// //     const end = ta.selectionEnd;
// //     const newText = text.slice(0, start) + emoji + text.slice(end);
// //     setText(newText);
// //     requestAnimationFrame(() => {
// //       ta.focus();
// //       ta.selectionStart = start + emoji.length;
// //       ta.selectionEnd = start + emoji.length;
// //       ta.style.height = "auto";
// //       ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
// //     });
// //   }, [text]);

// //   const handleSend = useCallback(async () => {
// //     if (!text.trim() || isBlocked) return;
// //     const messageId = uuidv4();
// //     const createdAt = Date.now();
// //     const messageText = text;
// //     setMessages((prev) => {
// //       const existing = prev[conversationId] || [];
// //       return {
// //         ...prev,
// //         [conversationId]: [...existing, { messageId, conversationId, from: myUserId, to: receiverId, text: messageText, status: "sending", createdAt }],
// //       };
// //     });
// //     sendSignal({ type: "chat_message", messageId, conversationId, to: receiverId, text: messageText, createdAt });
// //     onNewMessage?.(conversationId, messageText);
// //     setText("");
// //     setShowEmojiPicker(false);
// //     if (textareaRef.current) textareaRef.current.style.height = "auto";
// //     shouldAutoScrollRef.current = true;
// //   }, [text, isBlocked, conversationId, myUserId, receiverId, sendSignal, setMessages, onNewMessage]);

// //   const loadOlderMessages = useCallback(async () => {
// //     if (!cursor || loadingMore) return;
// //     setLoadingMore(true);
// //     const el = messagesContainerRef.current;
// //     const scrollHeightBefore = el ? el.scrollHeight : 0;
// //     try {
// //       const res = await fetchData(`/api/chat/messages/${conversationId}?cursor=${cursor}`, { credentials: "include" });
// //       const data = await res.json();
// //       const arr = Array.isArray(data) ? data : data.messages || [];
// //       if (arr.length < 50) setHasMore(false);
// //       const formatted = arr.map((msg) => ({
// //         messageId: msg.messageId, conversationId,
// //         from: msg.senderId, to: msg.receiverId,
// //         text: msg.text, status: msg.status || "sent",
// //         createdAt: new Date(msg.createdAt).getTime(),
// //       }));
// //       shouldAutoScrollRef.current = false;
// //       setMessages((prev) => {
// //         const existing = prev[conversationId] || [];
// //         const ids = new Set(existing.map((m) => m.messageId));
// //         return { ...prev, [conversationId]: [...formatted.filter((m) => !ids.has(m.messageId)), ...existing] };
// //       });
// //       if (arr.length > 0) setCursor(arr[0].createdAt);
// //       setTimeout(() => { if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore; }, 50);
// //     } catch (err) { console.error("Failed loading older messages", err); }
// //     setLoadingMore(false);
// //   }, [cursor, loadingMore, conversationId, setMessages]);

// //   useEffect(() => {
// //     const el = messagesContainerRef.current;
// //     if (!el) return;
// //     const h = () => { shouldAutoScrollRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 150; };
// //     el.addEventListener("scroll", h, { passive: true });
// //     return () => el.removeEventListener("scroll", h);
// //   }, []);

// //   const scrollToBottom = useCallback((force = false) => {
// //     const el = messagesContainerRef.current;
// //     if (!el) return;
// //     if (!force && !shouldAutoScrollRef.current) return;
// //     requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
// //   }, []);

// //   useEffect(() => {
// //     if (!conversationId) return;
// //     let cancelled = false;
// //     const fetch_ = async () => {
// //       try {
// //         const res = await fetchData(`/api/chat/messages/${conversationId}`, { credentials: "include" });
// //         const data = await res.json();
// //         const arr = Array.isArray(data) ? data : data.messages || [];
// //         if (arr.length < 50) setHasMore(false);
// //         const formatted = arr.map((msg) => ({
// //           messageId: msg.messageId, conversationId,
// //           from: msg.senderId, to: msg.receiverId,
// //           text: msg.text, status: msg.status || "sent",
// //           createdAt: new Date(msg.createdAt).getTime(),
// //         }));
// //         if (arr.length > 0) setCursor(arr[0].createdAt);
// //         if (!cancelled) {
// //           setMessages((prev) => {
// //             const existing = prev[conversationId] || [];
// //             const ids = new Set(existing.map((m) => m.messageId));
// //             return { ...prev, [conversationId]: [...existing, ...formatted.filter((m) => !ids.has(m.messageId))] };
// //           });
// //           requestAnimationFrame(() => {
// //             const el = messagesContainerRef.current;
// //             if (el) el.scrollTop = el.scrollHeight;
// //           });
// //         }
// //       } catch (err) { console.error("Failed to fetch messages", err); }
// //       finally { if (!cancelled) setFetchingMessages(false); }
// //     };
// //     fetch_();
// //     return () => { cancelled = true; };
// //   }, [conversationId]);

// //   const convMessageCount = messages[conversationId]?.length ?? 0;
// //   useEffect(() => {
// //     scrollToBottom(false);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [convMessageCount]);

// //   return {
// //     user, navigate, myUserId, otherUser, conversationId, receiverId,
// //     messages, setMessages, text, setText, loadingMore, fetchingMessages,
// //     showEmojiPicker, setShowEmojiPicker, showChatOptions, setShowChatOptions,
// //     popupPos, chatTheme, setChatTheme, isBlocked, setIsBlocked, hasMore,
// //     messagesContainerRef, textareaRef, emojiPickerRef, chatOptionsRef,
// //     handleSend, handleToggleChatOptions, insertEmoji, loadOlderMessages, scrollToBottom,
// //   };
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // ChatHeader
// // // ─────────────────────────────────────────────────────────────────────────────

// // function ChatHeader({ otherUser, isBlocked, navigate, chatOptionsRef, handleToggleChatOptions, onBack }) {
// //   const { onlineUsers } = useContext(websocketContext);
// //   const isOnline = onlineUsers?.has(otherUser?._id?.toString());

// //   return (
// //     <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
// //       <button
// //         onClick={onBack}
// //         className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
// //       >
// //         <ArrowLeft size={18} />
// //       </button>
// //       <div
// //         onClick={() => navigate(`/profile/${otherUser.username}`)}
// //         className="relative w-9 h-9 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-150"
// //       >
// //         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center">
// //           {otherUser.profilePicture ? (
// //             <img
// //               src={otherUser.profilePicture}
// //               alt={otherUser.username}
// //               className="w-full h-full object-cover"
// //             />
// //           ) : (
// //             <span className="text-sm font-semibold text-white">
// //               {otherUser.username?.[0]?.toUpperCase()}
// //             </span>
// //           )}
// //         </div>
// //         <span
// //           className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-[#1a1a2e] ${isOnline ? "bg-green-400" : "bg-neutral-600"}`}
// //         />
// //       </div>
// //       <div className="flex flex-col flex-1 min-w-0">
// //         <h3
// //           onClick={() => navigate(`/profile/${otherUser.username}`)}
// //           className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
// //         >
// //           {otherUser.username}
// //         </h3>
// //         {isBlocked && (
// //           <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
// //             Blocked
// //           </span>
// //         )}
// //       </div>
// //       <div ref={chatOptionsRef} className="relative flex-shrink-0">
// //         <button
// //           onClick={handleToggleChatOptions}
// //           className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
// //         >
// //           <svg
// //             width="16"
// //             height="16"
// //             viewBox="0 0 24 24"
// //             fill="none"
// //             stroke="currentColor"
// //             strokeWidth="2"
// //             strokeLinecap="round"
// //           >
// //             <circle cx="12" cy="5" r="1" />
// //             <circle cx="12" cy="12" r="1" />
// //             <circle cx="12" cy="19" r="1" />
// //           </svg>
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // MessageList
// // // ─────────────────────────────────────────────────────────────────────────────

// // function MessageList({ messagesContainerRef, fetchingMessages, hasMore, messages, conversationId, loadOlderMessages, loadingMore, myUserId, otherUser, user, chatTheme }) {
// //   if (fetchingMessages) {
// //     return <div className="flex-1 overflow-hidden"><MessageSkeleton /></div>;
// //   }
// //   return (
// //     <div
// //       ref={messagesContainerRef}
// //       className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
// //       style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch", background: chatTheme.bg, transition: "background 0.3s ease" }}
// //     >
// //       {hasMore && messages[conversationId]?.length > 0 && (
// //         <div className="flex justify-center mb-2">
// //           <button onClick={loadOlderMessages} disabled={loadingMore}
// //             className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide disabled:opacity-50">
// //             {loadingMore ? "Loading…" : "Load older messages"}
// //           </button>
// //         </div>
// //       )}
// //       {(!messages[conversationId] || messages[conversationId].length === 0) && (
// //         <div className="text-center text-white/60 text-sm">Start a conversation with {otherUser.username}</div>
// //       )}
// //       {(messages[conversationId] || []).map((msg) => (
// //         <MessageBubble key={msg.messageId} msg={msg} isMe={msg.from === myUserId} otherUser={otherUser} user={user} />
// //       ))}
// //       <div className="h-2" />
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // BlockedBanner
// // // ─────────────────────────────────────────────────────────────────────────────

// // function BlockedBanner({ otherUser }) {
// //   return (
// //     <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
// //       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
// //         <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
// //       </svg>
// //       <p className="text-sm text-white/40 text-center">
// //         You have blocked <span className="text-white/60 font-medium">{otherUser.username}</span>. They can no longer message you.
// //       </p>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // EmojiPicker
// // // ─────────────────────────────────────────────────────────────────────────────

// // function EmojiPicker({ emojiPickerRef, insertEmoji }) {
// //   return (
// //     <div
// //       ref={emojiPickerRef}
// //       className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
// //       style={{ maxHeight: IS_ANDROID ? 220 : 280, overflowY: "auto", overscrollBehavior: "contain" }}
// //     >
// //       <div className="grid grid-cols-10 gap-1">
// //         {EMOJI_LIST.map((emoji) => (
// //           <button key={emoji} onClick={() => insertEmoji(emoji)}
// //             className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100">
// //             {emoji}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // InputBarIOS
// // //
// // // safe-area: env(safe-area-inset-bottom) self-corrects to 0 when keyboard
// // // is open on iOS (home bar slides away). Apply unconditionally — no JS needed.
// // // fontSize 16px is mandatory — below this iOS Safari auto-zooms on focus.
// // // ─────────────────────────────────────────────────────────────────────────────

// // function InputBarIOS({ text, setText, textareaRef, emojiPickerRef, showEmojiPicker, setShowEmojiPicker, insertEmoji, handleSend }) {
// //   return (
// //     <div
// //       className="flex-shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-sm relative"
// //       style={{
// //         paddingTop: 10,
// //         paddingLeft: 12,
// //         paddingRight: 12,
// //         paddingBottom: "max(10px, env(safe-area-inset-bottom, 0px))",
// //       }}
// //     >
// //       {showEmojiPicker && <EmojiPicker emojiPickerRef={emojiPickerRef} insertEmoji={insertEmoji} />}
// //       <div className="flex items-end gap-2">
// //         <button
// //           onClick={() => setShowEmojiPicker((prev) => !prev)}
// //           className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
// //             showEmojiPicker ? "bg-indigo-600 border-indigo-500 text-white" : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// //           }`}
// //         >
// //           <Smile size={17} />
// //         </button>
// //         <textarea
// //           ref={textareaRef}
// //           rows={1}
// //           value={text}
// //           onChange={(e) => {
// //             setText(e.target.value);
// //             e.target.style.height = "auto";
// //             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
// //           }}
// //           onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
// //           placeholder="Type a message…"
// //           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// //           style={{ maxHeight: "112px", fontSize: "16px" }}
// //           {...TEXTAREA_PROPS}
// //         />
// //         <button onClick={handleSend} disabled={!text.trim()}
// //           className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed">
// //           <Send size={16} className="text-white ml-0.5" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // InputBarAndroid
// // //
// // // GAP FIX: paddingBottom = 0 when keyboard is open.
// // // resizes-content already positions the bottom of the layout viewport flush
// // // against the top of the keyboard. Any additional padding here creates the
// // // gap the user was seeing. When keyboard is closed we restore safe-area.
// // //
// // // NO backdropFilter — it creates a GPU compositing layer whose boundary
// // // with the keyboard renders as a white strip on Android Chrome.
// // // ─────────────────────────────────────────────────────────────────────────────

// // function InputBarAndroid({ text, setText, textareaRef, emojiPickerRef, showEmojiPicker, setShowEmojiPicker, insertEmoji, handleSend, keyboardOpen }) {
// //   return (
// //     <div
// //       className="flex-shrink-0 border-t border-white/10 relative"
// //       style={{
// //         paddingTop: 10,
// //         paddingLeft: 12,
// //         paddingRight: 12,
// //         // Zero when keyboard open — resizes-content already handles positioning.
// //         // Restores nav bar inset when keyboard is closed.
// //         paddingBottom: keyboardOpen ? 0 : "env(safe-area-inset-bottom, 0px)",
// //         backgroundColor: "rgba(15, 15, 20, 0.98)",
// //         // No backdropFilter — causes white strip at keyboard boundary
// //       }}
// //     >
// //       {showEmojiPicker && <EmojiPicker emojiPickerRef={emojiPickerRef} insertEmoji={insertEmoji} />}
// //       <div className="flex items-end gap-2 py-2">
// //         <button
// //           onClick={() => setShowEmojiPicker((prev) => !prev)}
// //           className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
// //             showEmojiPicker ? "bg-indigo-600 border-indigo-500 text-white" : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
// //           }`}
// //         >
// //           <Smile size={17} />
// //         </button>
// //         <textarea
// //           ref={textareaRef}
// //           rows={1}
// //           value={text}
// //           onChange={(e) => {
// //             setText(e.target.value);
// //             e.target.style.height = "auto";
// //             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
// //           }}
// //           onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
// //           placeholder="Type a message…"
// //           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
// //           style={{ maxHeight: "112px", fontSize: "16px" }}
// //           inputMode="text"
// //           {...TEXTAREA_PROPS}
// //         />
// //         <button onClick={handleSend} disabled={!text.trim()}
// //           className="flex-shrink-0 w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed">
// //           <Send size={16} className="text-white ml-0.5" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // iOS CHATBOX VARIANT
// // //
// // // KEY FIX — containerHeight race condition:
// // //   Previously: initialise from vv.height, update on "resize".
// // //   Problem: the first resize fires mid-animation with a partial height,
// // //   the layout snaps to the wrong size and keyboard covers content.
// // //
// // //   Fix: debounce the height update by 100ms so we only apply the final
// // //   settled height after the keyboard animation completes. Also listen to
// // //   visualViewport "scroll" (fires when iOS scrolls the page for the keyboard)
// // //   so we catch all keyboard-open scenarios.
// // // ─────────────────────────────────────────────────────────────────────────────

// // function ChatBoxIOS({ chat, onBack, onNewMessage, onClearMessages }) {
// //   useViewportMeta();

// //   const conv = useConversation({ chat, onNewMessage, onClearMessages });
// //   const {
// //     user, navigate, myUserId, otherUser, conversationId, receiverId,
// //     messages, setMessages, text, setText, loadingMore, fetchingMessages,
// //     showEmojiPicker, setShowEmojiPicker, showChatOptions, setShowChatOptions,
// //     popupPos, chatTheme, setChatTheme, isBlocked, setIsBlocked, hasMore,
// //     messagesContainerRef, textareaRef, emojiPickerRef, chatOptionsRef,
// //     handleSend, handleToggleChatOptions, insertEmoji, loadOlderMessages,
// //   } = conv;

// //   const [containerHeight, setContainerHeight] = useState(
// //     () => window.visualViewport?.height ?? window.innerHeight
// //   );
// //   const timerRef = useRef(null);

// //   useEffect(() => {
// //     const vv = window.visualViewport;
// //     if (!vv) return;

// //     const update = () => {
// //       // 100ms debounce: skip intermediate animation frames, apply final height only
// //       clearTimeout(timerRef.current);
// //       timerRef.current = setTimeout(() => {
// //         setContainerHeight(vv.height);
// //         requestAnimationFrame(() => {
// //           const el = messagesContainerRef.current;
// //           if (el) el.scrollTop = el.scrollHeight;
// //         });
// //       }, 100);
// //     };

// //     vv.addEventListener("resize", update);
// //     vv.addEventListener("scroll", update); // catches keyboard-triggered page scroll
// //     return () => {
// //       vv.removeEventListener("resize", update);
// //       vv.removeEventListener("scroll", update);
// //       clearTimeout(timerRef.current);
// //     };
// //   }, [messagesContainerRef]);

// //   if (!otherUser) return null;

// //   return (
// //     <div
// //       className="flex flex-col w-full overflow-hidden"
// //       style={{ height: containerHeight, maxHeight: containerHeight }}
// //     >
// //       <ChatHeader
// //         otherUser={otherUser} isBlocked={isBlocked} navigate={navigate}
// //         chatOptionsRef={chatOptionsRef} handleToggleChatOptions={handleToggleChatOptions}
// //         onBack={onBack}
// //       />
// //       <MessageList
// //         messagesContainerRef={messagesContainerRef} fetchingMessages={fetchingMessages}
// //         hasMore={hasMore} messages={messages} conversationId={conversationId}
// //         loadOlderMessages={loadOlderMessages} loadingMore={loadingMore}
// //         myUserId={myUserId} otherUser={otherUser} user={user} chatTheme={chatTheme}
// //       />
// //       {isBlocked
// //         ? <BlockedBanner otherUser={otherUser} />
// //         : <InputBarIOS
// //             text={text} setText={setText} textareaRef={textareaRef}
// //             emojiPickerRef={emojiPickerRef} showEmojiPicker={showEmojiPicker}
// //             setShowEmojiPicker={setShowEmojiPicker} insertEmoji={insertEmoji}
// //             handleSend={handleSend}
// //           />
// //       }
// //       {showChatOptions && createPortal(
// //         <div style={{ position: "fixed", top: popupPos.top, right: popupPos.right, zIndex: 99999 }}>
// //           <ChatOptionsPopup
// //             onClose={() => setShowChatOptions(false)}
// //             onClearChat={() => { setMessages((prev) => ({ ...prev, [conversationId]: [] })); onClearMessages?.(conversationId); }}
// //             onBlock={() => setIsBlocked(true)}
// //             onThemeChange={(theme) => setChatTheme(theme)}
// //             currentTheme={chatTheme}
// //             anchorRef={chatOptionsRef}
// //             conversationId={conversationId}
// //             otherUserId={receiverId}
// //             isBlocked={isBlocked}
// //             onUnblock={() => setIsBlocked(false)}
// //           />
// //         </div>,
// //         document.body,
// //       )}
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // ANDROID CHATBOX VARIANT
// // //
// // // KEY FIX — reliable keyboard detection:
// // //   Use visualViewport.height (not document.documentElement.clientHeight).
// // //   clientHeight can be stale on some Android WebViews at mount time.
// // //   visualViewport.height is always accurate and updates reliably.
// // //
// // //   baseHeight is captured 50ms after mount (async) because some Android
// // //   browsers report a wrong clientHeight synchronously before first paint.
// // // ─────────────────────────────────────────────────────────────────────────────

// // function ChatBoxAndroid({ chat, onBack, onNewMessage, onClearMessages }) {
// //   useViewportMeta();

// //   const conv = useConversation({ chat, onNewMessage, onClearMessages });
// //   const {
// //     user, navigate, myUserId, otherUser, conversationId, receiverId,
// //     messages, setMessages, text, setText, loadingMore, fetchingMessages,
// //     showEmojiPicker, setShowEmojiPicker, showChatOptions, setShowChatOptions,
// //     popupPos, chatTheme, setChatTheme, isBlocked, setIsBlocked, hasMore,
// //     messagesContainerRef, textareaRef, emojiPickerRef, chatOptionsRef,
// //     handleSend, handleToggleChatOptions, insertEmoji, loadOlderMessages,
// //   } = conv;

// //   const [keyboardOpen, setKeyboardOpen] = useState(false);
// //   const baseHeightRef = useRef(0);
// //   const scrollTimerRef = useRef(null);

// //   useEffect(() => {
// //     const vv = window.visualViewport;
// //     if (!vv) return;

// //     // Capture true base height after first paint (async to avoid stale value)
// //     const initTimer = setTimeout(() => {
// //       baseHeightRef.current = vv.height;
// //     }, 50);

// //     const onResize = () => {
// //       if (!baseHeightRef.current) return;
// //       const isOpen = baseHeightRef.current - vv.height > 120;
// //       setKeyboardOpen(isOpen);

// //       if (isOpen) {
// //         // Debounce — Android fires resize 30-60x during keyboard animation
// //         clearTimeout(scrollTimerRef.current);
// //         scrollTimerRef.current = setTimeout(() => {
// //           requestAnimationFrame(() => {
// //             const el = messagesContainerRef.current;
// //             if (el) el.scrollTop = el.scrollHeight;
// //           });
// //         }, 150);
// //       }
// //     };

// //     vv.addEventListener("resize", onResize, { passive: true });
// //     return () => {
// //       vv.removeEventListener("resize", onResize);
// //       clearTimeout(initTimer);
// //       clearTimeout(scrollTimerRef.current);
// //     };
// //   }, [messagesContainerRef]);

// //   if (!otherUser) return null;

// //   return (
// //     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
// //       <ChatHeader
// //         otherUser={otherUser} isBlocked={isBlocked} navigate={navigate}
// //         chatOptionsRef={chatOptionsRef} handleToggleChatOptions={handleToggleChatOptions}
// //         onBack={onBack}
// //       />
// //       <MessageList
// //         messagesContainerRef={messagesContainerRef} fetchingMessages={fetchingMessages}
// //         hasMore={hasMore} messages={messages} conversationId={conversationId}
// //         loadOlderMessages={loadOlderMessages} loadingMore={loadingMore}
// //         myUserId={myUserId} otherUser={otherUser} user={user} chatTheme={chatTheme}
// //       />
// //       {isBlocked
// //         ? <BlockedBanner otherUser={otherUser} />
// //         : <InputBarAndroid
// //             text={text} setText={setText} textareaRef={textareaRef}
// //             emojiPickerRef={emojiPickerRef} showEmojiPicker={showEmojiPicker}
// //             setShowEmojiPicker={setShowEmojiPicker} insertEmoji={insertEmoji}
// //             handleSend={handleSend} keyboardOpen={keyboardOpen}
// //           />
// //       }
// //       {showChatOptions && createPortal(
// //         <div style={{ position: "fixed", top: popupPos.top, right: popupPos.right, zIndex: 99999 }}>
// //           <ChatOptionsPopup
// //             onClose={() => setShowChatOptions(false)}
// //             onClearChat={() => { setMessages((prev) => ({ ...prev, [conversationId]: [] })); onClearMessages?.(conversationId); }}
// //             onBlock={() => setIsBlocked(true)}
// //             onThemeChange={(theme) => setChatTheme(theme)}
// //             currentTheme={chatTheme}
// //             anchorRef={chatOptionsRef}
// //             conversationId={conversationId}
// //             otherUserId={receiverId}
// //             isBlocked={isBlocked}
// //             onUnblock={() => setIsBlocked(false)}
// //           />
// //         </div>,
// //         document.body,
// //       )}
// //     </div>
// //   );
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // // Public export
// // // ─────────────────────────────────────────────────────────────────────────────

// // function ChatBox(props) {
// //   const Variant = useMemo(() => (IS_ANDROID ? ChatBoxAndroid : ChatBoxIOS), []);
// //   return <Variant {...props} />;
// // }

// // export default ChatBox;


// import { ArrowLeft, Send, Smile } from "lucide-react";
// import {
//   useContext,
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useMemo,
// } from "react";
// import { createPortal } from "react-dom";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";
// import fetchData from "../../utils/fetchData";
// import MessageBubble from "../MessageBubble";
// import ChatOptionsPopup from "../ChatOptionsPopup";
// import { useNavigate } from "react-router-dom";

// const UA = typeof navigator !== "undefined" ? navigator.userAgent : "";
// const IS_ANDROID = /Android/i.test(UA);

// function useViewportMeta() {
//   useEffect(() => {
//     let meta = document.querySelector('meta[name="viewport"]');
//     const prev = meta?.getAttribute("content") ?? "";
//     if (!meta) {
//       meta = document.createElement("meta");
//       meta.name = "viewport";
//       document.head.appendChild(meta);
//     }
//     const value = IS_ANDROID
//       ? "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
//       : "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-visual";
//     meta.setAttribute("content", value);
//     return () => meta.setAttribute("content", prev);
//   }, []);
// }

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

// const TEXTAREA_PROPS = {
//   autoComplete: "off",
//   autoCorrect: "off",
//   autoCapitalize: "sentences",
//   spellCheck: false,
//   "data-form-type": "other",
//   enterKeyHint: "send",
// };

// function MessageStatus({ status }) {
//   if (status === "blocked") {
//     return (
//       <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>
//     );
//   }
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
//     </div>
//   );
// }

// function useConversation({ chat, onNewMessage, onClearMessages }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const myUserId = user._id;
//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);
//   const conversationId = chat._id.toString();
//   const receiverId = otherUser?._id;

//   const {
//     sendSignal,
//     messages,
//     setMessages,
//     markAsRead,
//     setCurrentConversation,
//   } = useContext(websocketContext);

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

//   const messagesContainerRef = useRef(null);
//   const shouldAutoScrollRef = useRef(true);
//   const textareaRef = useRef(null);
//   const emojiPickerRef = useRef(null);
//   const chatOptionsRef = useRef(null);
//   const readMarkedRef = useRef(false);

//   useEffect(() => {
//     if (!receiverId) return;
//     let cancelled = false;
//     fetchData(`/api/users/${receiverId}/block-status`, {
//       credentials: "include",
//     })
//       .then((r) => r.json())
//       .then((data) => {
//         if (!cancelled) setIsBlocked(data.isBlocked);
//       })
//       .catch((err) => console.error("Failed to fetch block status", err));
//     return () => {
//       cancelled = true;
//     };
//   }, [receiverId]);

//   useEffect(() => {
//     setCurrentConversation(conversationId);
//     return () => setCurrentConversation(null);
//   }, [conversationId, setCurrentConversation]);

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

//   const doMarkRead = useCallback(() => {
//     const convMessages = messages[conversationId] || [];
//     const hasUnread = convMessages.some(
//       (m) => m.from !== myUserId && m.status !== "read",
//     );
//     if (!hasUnread) return;
//     setMessages((prev) => ({
//       ...prev,
//       [conversationId]: (prev[conversationId] || []).map((m) =>
//         m.from !== myUserId && m.status !== "read"
//           ? { ...m, status: "read" }
//           : m,
//       ),
//     }));
//     markAsRead(conversationId);
//     if (!readMarkedRef.current) {
//       readMarkedRef.current = true;
//       fetchData(`/api/chat/conversations/${conversationId}/read`, {
//         method: "PATCH",
//         credentials: "include",
//       }).catch(() => {});
//     }
//   }, [conversationId, messages, myUserId, markAsRead, setMessages]);

//   useEffect(() => {
//     doMarkRead();
//     readMarkedRef.current = false;
//   }, [conversationId, messages[conversationId]?.length]);

//   useEffect(() => {
//     const h = (e) => {
//       if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target))
//         setShowEmojiPicker(false);
//     };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   const handleToggleChatOptions = useCallback(() => {
//     if (!showChatOptions && chatOptionsRef.current) {
//       const rect = chatOptionsRef.current.getBoundingClientRect();
//       setPopupPos({
//         top: rect.bottom + 6,
//         right: window.innerWidth - rect.right,
//       });
//     }
//     setShowChatOptions((v) => !v);
//   }, [showChatOptions]);

//   const insertEmoji = useCallback(
//     (emoji) => {
//       const ta = textareaRef.current;
//       if (!ta) {
//         setText((prev) => prev + emoji);
//         return;
//       }
//       const start = ta.selectionStart;
//       const end = ta.selectionEnd;
//       const newText = text.slice(0, start) + emoji + text.slice(end);
//       setText(newText);
//       requestAnimationFrame(() => {
//         ta.focus();
//         ta.selectionStart = start + emoji.length;
//         ta.selectionEnd = start + emoji.length;
//         ta.style.height = "auto";
//         ta.style.height = Math.min(ta.scrollHeight, 112) + "px";
//       });
//     },
//     [text],
//   );

//   const handleSend = useCallback(async () => {
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
//     if (textareaRef.current) textareaRef.current.style.height = "auto";
//     shouldAutoScrollRef.current = true;
//   }, [
//     text,
//     isBlocked,
//     conversationId,
//     myUserId,
//     receiverId,
//     sendSignal,
//     setMessages,
//     onNewMessage,
//   ]);

//   const loadOlderMessages = useCallback(async () => {
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
//       const arr = Array.isArray(data) ? data : data.messages || [];
//       if (arr.length < 50) setHasMore(false);
//       const formatted = arr.map((msg) => ({
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
//         return {
//           ...prev,
//           [conversationId]: [
//             ...formatted.filter((m) => !ids.has(m.messageId)),
//             ...existing,
//           ],
//         };
//       });
//       if (arr.length > 0) setCursor(arr[0].createdAt);
//       setTimeout(() => {
//         if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
//       }, 50);
//     } catch (err) {
//       console.error("Failed loading older messages", err);
//     }
//     setLoadingMore(false);
//   }, [cursor, loadingMore, conversationId, setMessages]);

//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     const h = () => {
//       shouldAutoScrollRef.current =
//         el.scrollHeight - el.scrollTop - el.clientHeight < 150;
//     };
//     el.addEventListener("scroll", h, { passive: true });
//     return () => el.removeEventListener("scroll", h);
//   }, []);

//   const scrollToBottom = useCallback((force = false) => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     if (!force && !shouldAutoScrollRef.current) return;
//     requestAnimationFrame(() => {
//       el.scrollTop = el.scrollHeight;
//     });
//   }, []);

//   useEffect(() => {
//     if (!conversationId) return;
//     let cancelled = false;
//     const fetch_ = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${conversationId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : data.messages || [];
//         if (arr.length < 50) setHasMore(false);
//         const formatted = arr.map((msg) => ({
//           messageId: msg.messageId,
//           conversationId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));
//         if (arr.length > 0) setCursor(arr[0].createdAt);
//         if (!cancelled) {
//           setMessages((prev) => {
//             const existing = prev[conversationId] || [];
//             const ids = new Set(existing.map((m) => m.messageId));
//             return {
//               ...prev,
//               [conversationId]: [
//                 ...existing,
//                 ...formatted.filter((m) => !ids.has(m.messageId)),
//               ],
//             };
//           });
//           requestAnimationFrame(() => {
//             const el = messagesContainerRef.current;
//             if (el) el.scrollTop = el.scrollHeight;
//           });
//         }
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       } finally {
//         if (!cancelled) setFetchingMessages(false);
//       }
//     };
//     fetch_();
//     return () => {
//       cancelled = true;
//     };
//   }, [conversationId]);

//   const convMessageCount = messages[conversationId]?.length ?? 0;
//   useEffect(() => {
//     scrollToBottom(false);
//   }, [convMessageCount]);

//   return {
//     user,
//     navigate,
//     myUserId,
//     otherUser,
//     conversationId,
//     receiverId,
//     messages,
//     setMessages,
//     text,
//     setText,
//     loadingMore,
//     fetchingMessages,
//     showEmojiPicker,
//     setShowEmojiPicker,
//     showChatOptions,
//     setShowChatOptions,
//     popupPos,
//     chatTheme,
//     setChatTheme,
//     isBlocked,
//     setIsBlocked,
//     hasMore,
//     messagesContainerRef,
//     textareaRef,
//     emojiPickerRef,
//     chatOptionsRef,
//     handleSend,
//     handleToggleChatOptions,
//     insertEmoji,
//     loadOlderMessages,
//     scrollToBottom,
//   };
// }

// // ─── ChatHeader ───────────────────────────────────────────────────────────────

// function ChatHeader({
//   otherUser,
//   isBlocked,
//   navigate,
//   chatOptionsRef,
//   handleToggleChatOptions,
//   onBack,
// }) {
//   const { onlineUsers } = useContext(websocketContext);
//   const isOnline = onlineUsers?.has(otherUser?._id?.toString());

//   return (
//     <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
//       <button
//         onClick={onBack}
//         className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
//       >
//         <ArrowLeft size={18} />
//       </button>

//       {/* Avatar with gradient border ring */}
//       <div
//         onClick={() => navigate(`/profile/${otherUser.username}`)}
//         className="relative flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity duration-150"
//         style={{ width: 42, height: 42 }}
//       >
//         {/* Gradient ring */}
//         {isOnline && (
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               borderRadius: "50%",
//               padding: 2.5,
//               background: "linear-gradient(135deg, #22c55e, #16a34a)",
//               WebkitMask:
//                 "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
//               WebkitMaskComposite: "xor",
//               maskComposite: "exclude",
//             }}
//           />
//         )}
//         {/* Avatar */}
//         <div
//           className="absolute rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center"
//           style={{ inset: 2.5 }}
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

//         {/* Online dot */}
//         <span
//           className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
//             isOnline ? "bg-green-400" : "bg-neutral-400"
//           }`}
//         />
//       </div>

//       <div className="flex flex-col flex-1 min-w-0">
//         <h3
//           onClick={() => navigate(`/profile/${otherUser.username}`)}
//           className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
//         >
//           {otherUser.username}
//         </h3>
//         {isBlocked ? (
//           <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
//             Blocked
//           </span>
//         ) : (
//           ""
//         )}
//       </div>

//       <div ref={chatOptionsRef} className="relative flex-shrink-0">
//         <button
//           onClick={handleToggleChatOptions}
//           className="p-2 rounded-xl hover:bg-white/10 transition active:scale-95 text-white/50 hover:text-white"
//         >
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//           >
//             <circle cx="12" cy="5" r="1" />
//             <circle cx="12" cy="12" r="1" />
//             <circle cx="12" cy="19" r="1" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── MessageList ──────────────────────────────────────────────────────────────

// function MessageList({
//   messagesContainerRef,
//   fetchingMessages,
//   hasMore,
//   messages,
//   conversationId,
//   loadOlderMessages,
//   loadingMore,
//   myUserId,
//   otherUser,
//   user,
//   chatTheme,
// }) {
//   if (fetchingMessages) {
//     return (
//       <div className="flex-1 overflow-hidden">
//         <MessageSkeleton />
//       </div>
//     );
//   }
//   return (
//     <div
//       ref={messagesContainerRef}
//       className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
//       style={{
//         overscrollBehavior: "contain",
//         WebkitOverflowScrolling: "touch",
//         background: chatTheme.bg,
//         transition: "background 0.3s ease",
//       }}
//     >
//       {hasMore && messages[conversationId]?.length > 0 && (
//         <div className="flex justify-center mb-2">
//           <button
//             onClick={loadOlderMessages}
//             disabled={loadingMore}
//             className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150 active:scale-95 tracking-wide disabled:opacity-50"
//           >
//             {loadingMore ? "Loading…" : "Load older messages"}
//           </button>
//         </div>
//       )}
//       {(!messages[conversationId] || messages[conversationId].length === 0) && (
//         <div className="text-center text-white/60 text-sm">
//           Start a conversation with {otherUser.username}
//         </div>
//       )}
//       {(messages[conversationId] || []).map((msg) => (
//         <MessageBubble
//           key={msg.messageId}
//           msg={msg}
//           isMe={msg.from === myUserId}
//           otherUser={otherUser}
//           user={user}
//         />
//       ))}
//       <div className="h-2" />
//     </div>
//   );
// }

// // ─── BlockedBanner ────────────────────────────────────────────────────────────

// function BlockedBanner({ otherUser }) {
//   return (
//     <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-3">
//       <svg
//         width="16"
//         height="16"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#f87171"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <circle cx="12" cy="12" r="10" />
//         <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//       </svg>
//       <p className="text-sm text-white/40 text-center">
//         You have blocked{" "}
//         <span className="text-white/60 font-medium">{otherUser.username}</span>.
//         They can no longer message you.
//       </p>
//     </div>
//   );
// }

// // ─── EmojiPicker ─────────────────────────────────────────────────────────────

// function EmojiPicker({ emojiPickerRef, insertEmoji }) {
//   return (
//     <div
//       ref={emojiPickerRef}
//       className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
//       style={{
//         maxHeight: IS_ANDROID ? 220 : 280,
//         overflowY: "auto",
//         overscrollBehavior: "contain",
//       }}
//     >
//       <div className="grid grid-cols-10 gap-1">
//         {EMOJI_LIST.map((emoji) => (
//           <button
//             key={emoji}
//             onClick={() => insertEmoji(emoji)}
//             className="w-8 h-8 flex items-center justify-center text-[18px] rounded-lg hover:bg-white/10 active:scale-90 transition-all duration-100"
//           >
//             {emoji}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── InputBarIOS ──────────────────────────────────────────────────────────────

// function InputBarIOS({
//   text,
//   setText,
//   textareaRef,
//   emojiPickerRef,
//   showEmojiPicker,
//   setShowEmojiPicker,
//   insertEmoji,
//   handleSend,
// }) {
//   return (
//     <div
//       className="flex-shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-sm relative"
//       style={{
//         paddingTop: 10,
//         paddingLeft: 12,
//         paddingRight: 12,
//         paddingBottom: "max(10px, env(safe-area-inset-bottom, 0px))",
//       }}
//     >
//       {showEmojiPicker && (
//         <EmojiPicker
//           emojiPickerRef={emojiPickerRef}
//           insertEmoji={insertEmoji}
//         />
//       )}
//       <div className="flex items-end gap-2">
//         <button
//           onClick={() => setShowEmojiPicker((prev) => !prev)}
//           className={`flex-shrink-0 w-10 h-10 mb-0.5 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
//             showEmojiPicker
//               ? "bg-indigo-600 border-indigo-500 text-white"
//               : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//           }`}
//         >
//           <Smile size={17} />
//         </button>
//         <textarea
//           ref={textareaRef}
//           rows={1}
//           value={text}
//           onChange={(e) => {
//             setText(e.target.value);
//             e.target.style.height = "auto";
//             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
//           }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSend();
//             }
//           }}
//           placeholder="Type a message…"
//           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
//           style={{ maxHeight: "112px", fontSize: "16px" }}
//           {...TEXTAREA_PROPS}
//         />
//         <button
//           onClick={handleSend}
//           disabled={!text.trim()}
//           className="flex-shrink-0 w-11 h-11 mb-0.5 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
//         >
//           <Send size={16} className="text-white ml-0.5" />
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── InputBarAndroid ──────────────────────────────────────────────────────────

// function InputBarAndroid({
//   text,
//   setText,
//   textareaRef,
//   emojiPickerRef,
//   showEmojiPicker,
//   setShowEmojiPicker,
//   insertEmoji,
//   handleSend,
//   keyboardOpen,
// }) {
//   return (
//     <div
//       className="flex-shrink-0 border-t border-white/10 relative"
//       style={{
//         paddingTop: 10,
//         paddingLeft: 12,
//         paddingRight: 12,
//         paddingBottom: keyboardOpen ? 0 : "env(safe-area-inset-bottom, 0px)",
//         backgroundColor: "rgba(15, 15, 20, 0.98)",
//       }}
//     >
//       {showEmojiPicker && (
//         <EmojiPicker
//           emojiPickerRef={emojiPickerRef}
//           insertEmoji={insertEmoji}
//         />
//       )}
//       <div className="flex items-end gap-2 py-2">
//         <button
//           onClick={() => setShowEmojiPicker((prev) => !prev)}
//           className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
//             showEmojiPicker
//               ? "bg-indigo-600 border-indigo-500 text-white"
//               : "bg-white/8 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/12"
//           }`}
//         >
//           <Smile size={17} />
//         </button>
//         <textarea
//           ref={textareaRef}
//           rows={1}
//           value={text}
//           onChange={(e) => {
//             setText(e.target.value);
//             e.target.style.height = "auto";
//             e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
//           }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSend();
//             }
//           }}
//           placeholder="Type a message…"
//           className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
//           style={{ maxHeight: "112px", fontSize: "16px" }}
//           inputMode="text"
//           {...TEXTAREA_PROPS}
//         />
//         <button
//           onClick={handleSend}
//           disabled={!text.trim()}
//           className="flex-shrink-0 w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
//         >
//           <Send size={16} className="text-white ml-0.5" />
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── ChatBoxIOS ───────────────────────────────────────────────────────────────

// function ChatBoxIOS({ chat, onBack, onNewMessage, onClearMessages }) {
//   useViewportMeta();
//   const conv = useConversation({ chat, onNewMessage, onClearMessages });
//   const {
//     user,
//     navigate,
//     myUserId,
//     otherUser,
//     conversationId,
//     receiverId,
//     messages,
//     setMessages,
//     text,
//     setText,
//     loadingMore,
//     fetchingMessages,
//     showEmojiPicker,
//     setShowEmojiPicker,
//     showChatOptions,
//     setShowChatOptions,
//     popupPos,
//     chatTheme,
//     setChatTheme,
//     isBlocked,
//     setIsBlocked,
//     hasMore,
//     messagesContainerRef,
//     textareaRef,
//     emojiPickerRef,
//     chatOptionsRef,
//     handleSend,
//     handleToggleChatOptions,
//     insertEmoji,
//     loadOlderMessages,
//   } = conv;

//   const [containerHeight, setContainerHeight] = useState(
//     () => window.visualViewport?.height ?? window.innerHeight,
//   );
//   const timerRef = useRef(null);

//   useEffect(() => {
//     const vv = window.visualViewport;
//     if (!vv) return;
//     const update = () => {
//       clearTimeout(timerRef.current);
//       timerRef.current = setTimeout(() => {
//         setContainerHeight(vv.height);
//         requestAnimationFrame(() => {
//           const el = messagesContainerRef.current;
//           if (el) el.scrollTop = el.scrollHeight;
//         });
//       }, 100);
//     };
//     vv.addEventListener("resize", update);
//     vv.addEventListener("scroll", update);
//     return () => {
//       vv.removeEventListener("resize", update);
//       vv.removeEventListener("scroll", update);
//       clearTimeout(timerRef.current);
//     };
//   }, [messagesContainerRef]);

//   if (!otherUser) return null;

//   return (
//     <div
//       className="flex flex-col w-full overflow-hidden"
//       style={{ height: containerHeight, maxHeight: containerHeight }}
//     >
//       <ChatHeader
//         otherUser={otherUser}
//         isBlocked={isBlocked}
//         navigate={navigate}
//         chatOptionsRef={chatOptionsRef}
//         handleToggleChatOptions={handleToggleChatOptions}
//         onBack={onBack}
//       />
//       <MessageList
//         messagesContainerRef={messagesContainerRef}
//         fetchingMessages={fetchingMessages}
//         hasMore={hasMore}
//         messages={messages}
//         conversationId={conversationId}
//         loadOlderMessages={loadOlderMessages}
//         loadingMore={loadingMore}
//         myUserId={myUserId}
//         otherUser={otherUser}
//         user={user}
//         chatTheme={chatTheme}
//       />
//       {isBlocked ? (
//         <BlockedBanner otherUser={otherUser} />
//       ) : (
//         <InputBarIOS
//           text={text}
//           setText={setText}
//           textareaRef={textareaRef}
//           emojiPickerRef={emojiPickerRef}
//           showEmojiPicker={showEmojiPicker}
//           setShowEmojiPicker={setShowEmojiPicker}
//           insertEmoji={insertEmoji}
//           handleSend={handleSend}
//         />
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

// // ─── ChatBoxAndroid ───────────────────────────────────────────────────────────

// function ChatBoxAndroid({ chat, onBack, onNewMessage, onClearMessages }) {
//   useViewportMeta();
//   const conv = useConversation({ chat, onNewMessage, onClearMessages });
//   const {
//     user,
//     navigate,
//     myUserId,
//     otherUser,
//     conversationId,
//     receiverId,
//     messages,
//     setMessages,
//     text,
//     setText,
//     loadingMore,
//     fetchingMessages,
//     showEmojiPicker,
//     setShowEmojiPicker,
//     showChatOptions,
//     setShowChatOptions,
//     popupPos,
//     chatTheme,
//     setChatTheme,
//     isBlocked,
//     setIsBlocked,
//     hasMore,
//     messagesContainerRef,
//     textareaRef,
//     emojiPickerRef,
//     chatOptionsRef,
//     handleSend,
//     handleToggleChatOptions,
//     insertEmoji,
//     loadOlderMessages,
//   } = conv;

//   const [keyboardOpen, setKeyboardOpen] = useState(false);
//   const baseHeightRef = useRef(0);
//   const scrollTimerRef = useRef(null);

//   useEffect(() => {
//     const vv = window.visualViewport;
//     if (!vv) return;
//     const initTimer = setTimeout(() => {
//       baseHeightRef.current = vv.height;
//     }, 50);
//     const onResize = () => {
//       if (!baseHeightRef.current) return;
//       const isOpen = baseHeightRef.current - vv.height > 120;
//       setKeyboardOpen(isOpen);
//       if (isOpen) {
//         clearTimeout(scrollTimerRef.current);
//         scrollTimerRef.current = setTimeout(() => {
//           requestAnimationFrame(() => {
//             const el = messagesContainerRef.current;
//             if (el) el.scrollTop = el.scrollHeight;
//           });
//         }, 150);
//       }
//     };
//     vv.addEventListener("resize", onResize, { passive: true });
//     return () => {
//       vv.removeEventListener("resize", onResize);
//       clearTimeout(initTimer);
//       clearTimeout(scrollTimerRef.current);
//     };
//   }, [messagesContainerRef]);

//   if (!otherUser) return null;

//   return (
//     <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
//       <ChatHeader
//         otherUser={otherUser}
//         isBlocked={isBlocked}
//         navigate={navigate}
//         chatOptionsRef={chatOptionsRef}
//         handleToggleChatOptions={handleToggleChatOptions}
//         onBack={onBack}
//       />
//       <MessageList
//         messagesContainerRef={messagesContainerRef}
//         fetchingMessages={fetchingMessages}
//         hasMore={hasMore}
//         messages={messages}
//         conversationId={conversationId}
//         loadOlderMessages={loadOlderMessages}
//         loadingMore={loadingMore}
//         myUserId={myUserId}
//         otherUser={otherUser}
//         user={user}
//         chatTheme={chatTheme}
//       />
//       {isBlocked ? (
//         <BlockedBanner otherUser={otherUser} />
//       ) : (
//         <InputBarAndroid
//           text={text}
//           setText={setText}
//           textareaRef={textareaRef}
//           emojiPickerRef={emojiPickerRef}
//           showEmojiPicker={showEmojiPicker}
//           setShowEmojiPicker={setShowEmojiPicker}
//           insertEmoji={insertEmoji}
//           handleSend={handleSend}
//           keyboardOpen={keyboardOpen}
//         />
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

// function ChatBox(props) {
//   const Variant = useMemo(() => (IS_ANDROID ? ChatBoxAndroid : ChatBoxIOS), []);
//   return <Variant {...props} />;
// }

// export default ChatBox;


import { ArrowLeft, Send, Smile } from "lucide-react";
import {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { websocketContext } from "../../context/WebSocket";
import { useAuth } from "../../hooks/useAuth";
import fetchData from "../../utils/fetchData";
import MessageBubble from "../MessageBubble";
import ChatOptionsPopup from "../ChatOptionsPopup";
import { useNavigate } from "react-router-dom";

const UA = typeof navigator !== "undefined" ? navigator.userAgent : "";
const IS_ANDROID = /Android/i.test(UA);

function useViewportMeta() {
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    const prev = meta?.getAttribute("content") ?? "";
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      document.head.appendChild(meta);
    }
    const value = IS_ANDROID
      ? "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
      : "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-visual";
    meta.setAttribute("content", value);
    return () => meta.setAttribute("content", prev);
  }, []);
}

const EMOJI_LIST = [
  "😀",
  "😂",
  "😍",
  "🥰",
  "😎",
  "🤔",
  "😭",
  "😡",
  "🥺",
  "😴",
  "👍",
  "👎",
  "❤️",
  "🔥",
  "✨",
  "🎉",
  "🙏",
  "💯",
  "😊",
  "🤣",
  "😘",
  "🥳",
  "😤",
  "🤯",
  "😇",
  "🤗",
  "😏",
  "🙄",
  "😬",
  "🤝",
  "👀",
  "💀",
  "🫡",
  "🫠",
  "🥹",
  "😮",
  "😱",
  "🤌",
  "💪",
  "👏",
  "🍕",
  "🎮",
  "🎵",
  "⚡",
  "🌙",
  "☀️",
  "🌈",
  "💫",
  "🚀",
  "🎯",
];

// FIX 1: enterKeyHint changed from "send" to "enter" so mobile keyboard shows a newline key
const TEXTAREA_PROPS = {
  autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "sentences",
  spellCheck: false,
  "data-form-type": "other",
  enterKeyHint: "enter",
};

function MessageStatus({ status }) {
  if (status === "blocked") {
    return (
      <span style={{ fontSize: 10, color: "#f87171" }}>Not delivered</span>
    );
  }
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
  if (status === "read") {
    return (
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
        <path
          d="M1 5l3 3 5-6"
          stroke="#60a5fa"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 5l3 3 5-6"
          stroke="#60a5fa"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (status === "delivered") {
    return (
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
        <path
          d="M1 5l3 3 5-6"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 5l3 3 5-6"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
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
    </div>
  );
}

function useConversation({ chat, onNewMessage, onClearMessages }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const myUserId = user._id;
  const otherUser = chat.participants?.find((p) => p._id !== myUserId);
  const conversationId = chat._id.toString();
  const receiverId = otherUser?._id;

  const {
    sendSignal,
    messages,
    setMessages,
    markAsRead,
    setCurrentConversation,
  } = useContext(websocketContext);

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

  const messagesContainerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const chatOptionsRef = useRef(null);
  const readMarkedRef = useRef(false);

  useEffect(() => {
    if (!receiverId) return;
    let cancelled = false;
    fetchData(`/api/users/${receiverId}/block-status`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setIsBlocked(data.isBlocked);
      })
      .catch((err) => console.error("Failed to fetch block status", err));
    return () => {
      cancelled = true;
    };
  }, [receiverId]);

  useEffect(() => {
    setCurrentConversation(conversationId);
    return () => setCurrentConversation(null);
  }, [conversationId, setCurrentConversation]);

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

  const doMarkRead = useCallback(() => {
    const convMessages = messages[conversationId] || [];
    const hasUnread = convMessages.some(
      (m) => m.from !== myUserId && m.status !== "read",
    );
    if (!hasUnread) return;
    setMessages((prev) => ({
      ...prev,
      [conversationId]: (prev[conversationId] || []).map((m) =>
        m.from !== myUserId && m.status !== "read"
          ? { ...m, status: "read" }
          : m,
      ),
    }));
    markAsRead(conversationId);
    if (!readMarkedRef.current) {
      readMarkedRef.current = true;
      fetchData(`/api/chat/conversations/${conversationId}/read`, {
        method: "PATCH",
        credentials: "include",
      }).catch(() => {});
    }
  }, [conversationId, messages, myUserId, markAsRead, setMessages]);

  useEffect(() => {
    doMarkRead();
    readMarkedRef.current = false;
  }, [conversationId, messages[conversationId]?.length]);

  useEffect(() => {
    const h = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target))
        setShowEmojiPicker(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleToggleChatOptions = useCallback(() => {
    if (!showChatOptions && chatOptionsRef.current) {
      const rect = chatOptionsRef.current.getBoundingClientRect();
      setPopupPos({
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      });
    }
    setShowChatOptions((v) => !v);
  }, [showChatOptions]);

  const insertEmoji = useCallback(
    (emoji) => {
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
    },
    [text],
  );

  const handleSend = useCallback(async () => {
    if (!text.trim() || isBlocked) return;
    const messageId = uuidv4();
    const createdAt = Date.now();
    const messageText = text;
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
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    shouldAutoScrollRef.current = true;
  }, [
    text,
    isBlocked,
    conversationId,
    myUserId,
    receiverId,
    sendSignal,
    setMessages,
    onNewMessage,
  ]);

  const loadOlderMessages = useCallback(async () => {
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
      const arr = Array.isArray(data) ? data : data.messages || [];
      if (arr.length < 50) setHasMore(false);
      const formatted = arr.map((msg) => ({
        messageId: msg.messageId,
        conversationId,
        from: msg.senderId,
        to: msg.receiverId,
        text: msg.text,
        status: msg.status || "sent",
        createdAt: new Date(msg.createdAt).getTime(),
      }));
      shouldAutoScrollRef.current = false;
      setMessages((prev) => {
        const existing = prev[conversationId] || [];
        const ids = new Set(existing.map((m) => m.messageId));
        return {
          ...prev,
          [conversationId]: [
            ...formatted.filter((m) => !ids.has(m.messageId)),
            ...existing,
          ],
        };
      });
      if (arr.length > 0) setCursor(arr[0].createdAt);
      setTimeout(() => {
        if (el) el.scrollTop = el.scrollHeight - scrollHeightBefore;
      }, 50);
    } catch (err) {
      console.error("Failed loading older messages", err);
    }
    setLoadingMore(false);
  }, [cursor, loadingMore, conversationId, setMessages]);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const h = () => {
      shouldAutoScrollRef.current =
        el.scrollHeight - el.scrollTop - el.clientHeight < 150;
    };
    el.addEventListener("scroll", h, { passive: true });
    return () => el.removeEventListener("scroll", h);
  }, []);

  const scrollToBottom = useCallback((force = false) => {
    const el = messagesContainerRef.current;
    if (!el) return;
    if (!force && !shouldAutoScrollRef.current) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, []);

  useEffect(() => {
    if (!conversationId) return;
    let cancelled = false;
    const fetch_ = async () => {
      try {
        const res = await fetchData(`/api/chat/messages/${conversationId}`, {
          credentials: "include",
        });
        const data = await res.json();
        const arr = Array.isArray(data) ? data : data.messages || [];
        if (arr.length < 50) setHasMore(false);
        const formatted = arr.map((msg) => ({
          messageId: msg.messageId,
          conversationId,
          from: msg.senderId,
          to: msg.receiverId,
          text: msg.text,
          status: msg.status || "sent",
          createdAt: new Date(msg.createdAt).getTime(),
        }));
        if (arr.length > 0) setCursor(arr[0].createdAt);
        if (!cancelled) {
          setMessages((prev) => {
            const existing = prev[conversationId] || [];
            const ids = new Set(existing.map((m) => m.messageId));
            return {
              ...prev,
              [conversationId]: [
                ...existing,
                ...formatted.filter((m) => !ids.has(m.messageId)),
              ],
            };
          });
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
    fetch_();
    return () => {
      cancelled = true;
    };
  }, [conversationId]);

  const convMessageCount = messages[conversationId]?.length ?? 0;
  useEffect(() => {
    scrollToBottom(false);
  }, [convMessageCount]);

  return {
    user,
    navigate,
    myUserId,
    otherUser,
    conversationId,
    receiverId,
    messages,
    setMessages,
    text,
    setText,
    loadingMore,
    fetchingMessages,
    showEmojiPicker,
    setShowEmojiPicker,
    showChatOptions,
    setShowChatOptions,
    popupPos,
    chatTheme,
    setChatTheme,
    isBlocked,
    setIsBlocked,
    hasMore,
    messagesContainerRef,
    textareaRef,
    emojiPickerRef,
    chatOptionsRef,
    handleSend,
    handleToggleChatOptions,
    insertEmoji,
    loadOlderMessages,
    scrollToBottom,
  };
}

// ─── ChatHeader ───────────────────────────────────────────────────────────────

function ChatHeader({
  otherUser,
  isBlocked,
  navigate,
  chatOptionsRef,
  handleToggleChatOptions,
  onBack,
}) {
  const { onlineUsers } = useContext(websocketContext);
  const isOnline = onlineUsers?.has(otherUser?._id?.toString());

  return (
    <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 flex items-center gap-3 text-white bg-white/5 backdrop-blur-sm">
      <button
        onClick={onBack}
        className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition active:scale-95"
      >
        <ArrowLeft size={18} />
      </button>

      {/* Avatar with gradient border ring */}
      <div
        onClick={() => navigate(`/profile/${otherUser.username}`)}
        className="relative flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity duration-150"
        style={{ width: 42, height: 42 }}
      >
        {/* Gradient ring */}
        
        {/* Avatar */}
        <div
          className="absolute rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center"
          style={{ inset: 2.5 }}
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

        {/* Online dot */}
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
            isOnline ? "bg-green-400" : "bg-neutral-400"
          }`}
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <h3
          onClick={() => navigate(`/profile/${otherUser.username}`)}
          className="font-semibold text-sm text-white truncate cursor-pointer hover:text-white/70 transition-colors duration-150"
        >
          {otherUser.username}
        </h3>
        {isBlocked ? (
          <span className="text-[10px] text-red-400/80 font-medium tracking-wide">
            Blocked
          </span>
        ) : (
          ""
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
  );
}

// ─── MessageList ──────────────────────────────────────────────────────────────

function MessageList({
  messagesContainerRef,
  fetchingMessages,
  hasMore,
  messages,
  conversationId,
  loadOlderMessages,
  loadingMore,
  myUserId,
  otherUser,
  user,
  chatTheme,
}) {
  if (fetchingMessages) {
    return (
      <div className="flex-1 overflow-hidden">
        <MessageSkeleton />
      </div>
    );
  }
  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
      style={{
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        background: chatTheme.bg,
        transition: "background 0.3s ease",
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
      {(!messages[conversationId] || messages[conversationId].length === 0) && (
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
  );
}

// ─── BlockedBanner ────────────────────────────────────────────────────────────

function BlockedBanner({ otherUser }) {
  return (
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
        <span className="text-white/60 font-medium">{otherUser.username}</span>.
        They can no longer message you.
      </p>
    </div>
  );
}

// ─── EmojiPicker ─────────────────────────────────────────────────────────────

function EmojiPicker({ emojiPickerRef, insertEmoji }) {
  return (
    <div
      ref={emojiPickerRef}
      className="absolute bottom-full left-0 mx-3 mb-2 w-80 max-w-[calc(100%-24px)] p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl z-10"
      style={{
        maxHeight: IS_ANDROID ? 220 : 280,
        overflowY: "auto",
        overscrollBehavior: "contain",
      }}
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
  );
}

// ─── InputBarIOS ──────────────────────────────────────────────────────────────

function InputBarIOS({
  text,
  setText,
  textareaRef,
  emojiPickerRef,
  showEmojiPicker,
  setShowEmojiPicker,
  insertEmoji,
  handleSend,
}) {
  return (
    <div
      className="flex-shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-sm relative"
      style={{
        paddingTop: 10,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: "max(10px, env(safe-area-inset-bottom, 0px))",
      }}
    >
      {showEmojiPicker && (
        <EmojiPicker
          emojiPickerRef={emojiPickerRef}
          insertEmoji={insertEmoji}
        />
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
            e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
          }}
          placeholder="Type a message…"
          className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
          style={{ maxHeight: "112px", fontSize: "16px" }}
          {...TEXTAREA_PROPS}
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
  );
}

// ─── InputBarAndroid ──────────────────────────────────────────────────────────

function InputBarAndroid({
  text,
  setText,
  textareaRef,
  emojiPickerRef,
  showEmojiPicker,
  setShowEmojiPicker,
  insertEmoji,
  handleSend,
  keyboardOpen,
}) {
  return (
    <div
      className="flex-shrink-0 border-t border-white/10 relative"
      style={{
        paddingTop: 10,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: keyboardOpen ? 0 : "env(safe-area-inset-bottom, 0px)",
        backgroundColor: "rgba(15, 15, 20, 0.98)",
      }}
    >
      {showEmojiPicker && (
        <EmojiPicker
          emojiPickerRef={emojiPickerRef}
          insertEmoji={insertEmoji}
        />
      )}
      <div className="flex items-end gap-2 py-2">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-150 active:scale-90 ${
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
            e.target.style.height = Math.min(e.target.scrollHeight, 112) + "px";
          }}
          placeholder="Type a message…"
          className="flex-1 resize-none overflow-y-auto px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 leading-relaxed min-h-[44px]"
          style={{ maxHeight: "112px", fontSize: "16px" }}
          inputMode="text"
          {...TEXTAREA_PROPS}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex-shrink-0 w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send size={16} className="text-white ml-0.5" />
        </button>
      </div>
    </div>
  );
}

// ─── ChatBoxIOS ───────────────────────────────────────────────────────────────

function ChatBoxIOS({ chat, onBack, onNewMessage, onClearMessages }) {
  useViewportMeta();
  const conv = useConversation({ chat, onNewMessage, onClearMessages });
  const {
    user,
    navigate,
    myUserId,
    otherUser,
    conversationId,
    receiverId,
    messages,
    setMessages,
    text,
    setText,
    loadingMore,
    fetchingMessages,
    showEmojiPicker,
    setShowEmojiPicker,
    showChatOptions,
    setShowChatOptions,
    popupPos,
    chatTheme,
    setChatTheme,
    isBlocked,
    setIsBlocked,
    hasMore,
    messagesContainerRef,
    textareaRef,
    emojiPickerRef,
    chatOptionsRef,
    handleSend,
    handleToggleChatOptions,
    insertEmoji,
    loadOlderMessages,
  } = conv;

  const [containerHeight, setContainerHeight] = useState(
    () => window.visualViewport?.height ?? window.innerHeight,
  );
  const timerRef = useRef(null);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    // FIX 2: debounce reduced to 0ms to eliminate gap between keyboard and input bar
    const update = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setContainerHeight(vv.height);
        requestAnimationFrame(() => {
          const el = messagesContainerRef.current;
          if (el) el.scrollTop = el.scrollHeight;
        });
      }, 0);
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      clearTimeout(timerRef.current);
    };
  }, [messagesContainerRef]);

  if (!otherUser) return null;

  return (
    <div
      className="flex flex-col w-full overflow-hidden"
      style={{ height: containerHeight, maxHeight: containerHeight }}
    >
      <ChatHeader
        otherUser={otherUser}
        isBlocked={isBlocked}
        navigate={navigate}
        chatOptionsRef={chatOptionsRef}
        handleToggleChatOptions={handleToggleChatOptions}
        onBack={onBack}
      />
      <MessageList
        messagesContainerRef={messagesContainerRef}
        fetchingMessages={fetchingMessages}
        hasMore={hasMore}
        messages={messages}
        conversationId={conversationId}
        loadOlderMessages={loadOlderMessages}
        loadingMore={loadingMore}
        myUserId={myUserId}
        otherUser={otherUser}
        user={user}
        chatTheme={chatTheme}
      />
      {isBlocked ? (
        <BlockedBanner otherUser={otherUser} />
      ) : (
        <InputBarIOS
          text={text}
          setText={setText}
          textareaRef={textareaRef}
          emojiPickerRef={emojiPickerRef}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          insertEmoji={insertEmoji}
          handleSend={handleSend}
        />
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

// ─── ChatBoxAndroid ───────────────────────────────────────────────────────────

function ChatBoxAndroid({ chat, onBack, onNewMessage, onClearMessages }) {
  useViewportMeta();
  const conv = useConversation({ chat, onNewMessage, onClearMessages });
  const {
    user,
    navigate,
    myUserId,
    otherUser,
    conversationId,
    receiverId,
    messages,
    setMessages,
    text,
    setText,
    loadingMore,
    fetchingMessages,
    showEmojiPicker,
    setShowEmojiPicker,
    showChatOptions,
    setShowChatOptions,
    popupPos,
    chatTheme,
    setChatTheme,
    isBlocked,
    setIsBlocked,
    hasMore,
    messagesContainerRef,
    textareaRef,
    emojiPickerRef,
    chatOptionsRef,
    handleSend,
    handleToggleChatOptions,
    insertEmoji,
    loadOlderMessages,
  } = conv;

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const baseHeightRef = useRef(0);
  const scrollTimerRef = useRef(null);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const initTimer = setTimeout(() => {
      baseHeightRef.current = vv.height;
    }, 50);
    const onResize = () => {
      if (!baseHeightRef.current) return;
      const isOpen = baseHeightRef.current - vv.height > 120;
      setKeyboardOpen(isOpen);
      if (isOpen) {
        clearTimeout(scrollTimerRef.current);
        // FIX 3: reduced from 150ms to 50ms to close the gap on Android
        scrollTimerRef.current = setTimeout(() => {
          requestAnimationFrame(() => {
            const el = messagesContainerRef.current;
            if (el) el.scrollTop = el.scrollHeight;
          });
        }, 50);
      }
    };
    vv.addEventListener("resize", onResize, { passive: true });
    return () => {
      vv.removeEventListener("resize", onResize);
      clearTimeout(initTimer);
      clearTimeout(scrollTimerRef.current);
    };
  }, [messagesContainerRef]);

  if (!otherUser) return null;

  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
      <ChatHeader
        otherUser={otherUser}
        isBlocked={isBlocked}
        navigate={navigate}
        chatOptionsRef={chatOptionsRef}
        handleToggleChatOptions={handleToggleChatOptions}
        onBack={onBack}
      />
      <MessageList
        messagesContainerRef={messagesContainerRef}
        fetchingMessages={fetchingMessages}
        hasMore={hasMore}
        messages={messages}
        conversationId={conversationId}
        loadOlderMessages={loadOlderMessages}
        loadingMore={loadingMore}
        myUserId={myUserId}
        otherUser={otherUser}
        user={user}
        chatTheme={chatTheme}
      />
      {isBlocked ? (
        <BlockedBanner otherUser={otherUser} />
      ) : (
        <InputBarAndroid
          text={text}
          setText={setText}
          textareaRef={textareaRef}
          emojiPickerRef={emojiPickerRef}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          insertEmoji={insertEmoji}
          handleSend={handleSend}
          keyboardOpen={keyboardOpen}
        />
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

function ChatBox(props) {
  const Variant = useMemo(() => (IS_ANDROID ? ChatBoxAndroid : ChatBoxIOS), []);
  return <Variant {...props} />;
}

export default ChatBox;


