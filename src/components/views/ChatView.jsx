// // import { useEffect, useState } from "react";
// // import { MessageCircle } from "lucide-react";
// // import ChatBox from "./ChatBox";
// // import fetchData from "../../utils/fetchData";
// // import { useLocation } from "react-router-dom";
// // import { useAuth } from "../../hooks/useAuth";

// // function ChatView() {
// //   const [activeChat, setActiveChat] = useState(null);

// //   const [chats, setChats] = useState([]);

// //   const [loading, setLoading] = useState(true);

// //   const location = useLocation();

// //     const { user } = useAuth();

// //       const myUserId = user?._id;

// //   const queryParams = new URLSearchParams(location.search);

// //   const conversationIdFromQuery = queryParams.get("conversation");

// //   // ✅ Fetch conversations (NOT contacts)
// //   useEffect(() => {
// //     const fetchChats = async () => {
// //       try {
// //         const res = await fetchData(
// //           "/api/chat/conversations",

// //           { credentials: "include" },
// //         );

// //         const data = await res.json();
// //         console.log("conversations yaai hain ,data", data);

// //         setChats(data);
// //       } catch (err) {
// //         console.error("Failed to load chats", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchChats();
// //   }, []);

// //   // ✅ Activate chat from URL
// //   useEffect(() => {
// //     if (!conversationIdFromQuery || chats.length === 0) return;

// //     const conversation = chats.find((c) => c._id === conversationIdFromQuery);

// //     if (conversation) {
// //       setActiveChat(conversation);
// //     }
// //   }, [conversationIdFromQuery, chats]);

// //   return (
// //     <div className="w-full flex bg-white/10 backdrop-blur-xl border border-white/20 overflow-x-hidden h-[calc(100vh-72px-56px)]">
// //       {" "}
// //       {/* CHAT LIST */}
// //       <div
// //         className={`

// //   w-full sm:w-72

// //   ${activeChat ? "hidden sm:flex" : "flex"}

// //   flex-col

// //   border-r border-white/20 bg-white/10

// // `}
// //       >
// //         <div className="px-4 py-4 border-b border-white/20">
// //           <h2 className="text-white font-semibold text-lg">Chats</h2>

// //           <p className="text-white/60 text-sm">Your conversations</p>
// //         </div>

// //         <div className="flex-1 overflow-y-auto pt-2 pb-8">
// //           {loading && (
// //             <p className="p-4 text-white/60 text-sm">Loading chats…</p>
// //           )}

// //           {!loading && chats.length === 0 && (
// //             <p className="p-4 text-white/60 text-sm">No chats available</p>
// //           )}

// //           {!loading &&
// //             chats.map((chat) => {
// //               const otherUser = chat.participants.find((p) => {
// //                 // console.log("chat", chat)
// //                 // console.log("chat.participants", chat.participants)
// //                 // console.log("chat.myUserId", myUserId)
// //                 // console.log("p._id", p._id)
// //                 return p._id !== myUserId;
// //               });

// //               return (
// //                 <button
// //                   key={chat._id}
// //                   onClick={() => setActiveChat(chat)}
// //                   className="w-full text-left px-4 py-3 hover:bg-white/20 transition"
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     {/* Profile Picture */}
// //                     <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold overflow-hidden">
// //                       {otherUser?.profilePicture ? (
// //                         <img
// //                           src={otherUser.profilePicture}
// //                           alt={otherUser.username}
// //                           className="w-full h-full object-cover"
// //                         />
// //                       ) : (
// //                         otherUser?.username?.charAt(0).toUpperCase()
// //                       )}
// //                     </div>

// //                     <div className="flex-1 min-w-0">
// //                       <p className="text-white font-medium">
// //                         {otherUser?.username}
// //                       </p>

// //                       <p className="text-white/90 text-sm font-bold truncate tracking-wide max-w-[160px]">
// //                         {chat.lastMessage?.slice(0, 20) + "..." || "Start chatting"}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </button>
// //               );
// //             })}
// //         </div>
// //       </div>
// //       {/* CHAT PANEL */}
// //       <div
// //         className={`

// //         flex-1

// //         ${activeChat ? "block" : "hidden sm:flex"}

// //         flex flex-col

// //       `}
// //       >
// //         {!activeChat ? (
// //           <div className="flex-1 flex flex-col items-center justify-center text-white/70 text-center">
// //             <MessageCircle size={48} className="mb-4 opacity-60" />

// //             <p className="text-lg font-medium">
// //               Select a chat to start messaging
// //             </p>
// //           </div>
// //         ) : (
// //           <ChatBox chat={activeChat} onBack={() => setActiveChat(null)} />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ChatView;

// import { useEffect, useState } from "react";
// import { MessageCircle } from "lucide-react";
// import ChatBox from "./ChatBox";
// import fetchData from "../../utils/fetchData";
// import { useLocation } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// function ChatView() {
//   const [activeChat, setActiveChat] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const location = useLocation();
//   const { user } = useAuth();
//   const myUserId = user?._id;

//   const queryParams = new URLSearchParams(location.search);
//   const conversationIdFromQuery = queryParams.get("conversation");

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await fetchData("/api/chat/conversations", {
//           credentials: "include",
//         });
//         const data = await res.json();
//         console.log("conversations yaai hain ,data", data);
//         setChats(data);
//       } catch (err) {
//         console.error("Failed to load chats", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchChats();
//   }, []);

//   useEffect(() => {
//     if (!conversationIdFromQuery || chats.length === 0) return;
//     const conversation = chats.find((c) => c._id === conversationIdFromQuery);
//     if (conversation) setActiveChat(conversation);
//   }, [conversationIdFromQuery, chats]);

//   return (
//     <div
//       className="w-full flex overflow-hidden text-white bg-[#020617] overflow-x-hidden"
//       style={{
//         height: "calc(100dvh - env(safe-area-inset-bottom, 0px) - 72px)",
//       }}
//     >
//       {/* ── CHAT LIST ── */}
//       <div
//         className={`
//           w-full sm:w-72 flex-shrink-0
//           ${activeChat ? "hidden sm:flex" : "flex"}
//           flex-col
//           border-r border-white/10
//           bg-white/[0.03]
//         `}
//       >
//         {/* Header */}
//         <div className="flex-shrink-0 px-4 py-4 border-b border-white/10">
//           <h2 className="text-white font-semibold text-[16px] tracking-tight">
//             Chats
//           </h2>
//           <p className="text-white/40 text-[13px] mt-0.5">Your conversations</p>
//         </div>

//         {/* List */}
//         <div
//           className="flex-1 overflow-y-auto pt-2 pb-8"
//           style={{ WebkitOverflowScrolling: "touch" }}
//         >
//           {/* Loading */}
//           {loading && (
//             <div className="px-3 py-2 space-y-1">
//               {[...Array(5)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-3 px-2 py-3 animate-pulse"
//                 >
//                   <div className="w-10 h-10 rounded-full bg-white/8 flex-shrink-0" />
//                   <div className="flex-1 space-y-2">
//                     <div className="h-2.5 w-24 bg-white/8 rounded-full" />
//                     <div className="h-2 w-32 bg-white/5 rounded-full" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Empty */}
//           {!loading && chats.length === 0 && (
//             <p className="p-4 text-white/40 text-[13px]">No chats available</p>
//           )}

//           {/* Rows */}
//           {!loading &&
//             chats.map((chat) => {
//               const otherUser = chat.participants.find(
//                 (p) => p._id !== myUserId,
//               );
//               const isActive = activeChat?._id === chat._id;

//               return (
//                 <button
//                   key={chat._id}
//                   onClick={() => setActiveChat(chat)}
//                   className={`
//                   w-full text-left px-3 py-3 mx-1 rounded-xl
//                   flex items-center gap-3
//                   transition-all duration-150 active:scale-[0.98]
//                   ${isActive ? "bg-white/10" : "hover:bg-white/5"}
//                 `}
//                   style={{ width: "calc(100% - 8px)" }}
//                 >
//                   {/* Avatar */}
//                   <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10 bg-neutral-800 flex items-center justify-center">
//                     {otherUser?.profilePicture ? (
//                       <img
//                         src={otherUser.profilePicture}
//                         alt={otherUser.username}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-sm font-semibold text-white">
//                         {otherUser?.username?.charAt(0).toUpperCase()}
//                       </span>
//                     )}
//                   </div>

//                   {/* Text */}
//                   <div className="flex-1 min-w-0">
//                     <p className="text-[13.5px] font-semibold text-white leading-tight truncate">
//                       {otherUser?.username}
//                     </p>
//                     <p className="text-[12px] text-white/35 truncate mt-0.5">
//                       {chat.lastMessage
//                         ? chat.lastMessage.slice(0, 24) +
//                           (chat.lastMessage.length > 24 ? "…" : "")
//                         : "Start chatting"}
//                     </p>
//                   </div>
//                 </button>
//               );
//             })}
//         </div>
//       </div>
//       {/* ── CHAT PANEL ── */}
//       <div
//         className={`
//           flex-1 min-w-0
//           ${activeChat ? "flex" : "hidden sm:flex"}
//           flex-col overflow-hidden
//         `}
//       >
//         {!activeChat ? (
//           <div className="flex-1 flex flex-col items-center justify-center text-white/30 text-center gap-3">
//             <MessageCircle size={48} strokeWidth={1.5} className="opacity-40" />
//             <p className="text-[14px] font-medium">
//               Select a chat to start messaging
//             </p>
//           </div>
//         ) : (
//           <ChatBox chat={activeChat} onBack={() => setActiveChat(null)} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChatView;

// import { useEffect, useState } from "react";
// import { MessageCircle } from "lucide-react";
// import ChatBox from "./ChatBox";
// import fetchData from "../../utils/fetchData";
// import { useLocation } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// function ChatView() {
//   const [activeChat, setActiveChat] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const location = useLocation();
//   const { user } = useAuth();
//   const myUserId = user?._id;

//   const queryParams = new URLSearchParams(location.search);
//   const conversationIdFromQuery = queryParams.get("conversation");

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await fetchData("/api/chat/conversations", {
//           credentials: "include",
//         });
//         const data = await res.json();
//         console.log("conversations yaai hain ,data", data);
//         setChats(data);
//       } catch (err) {
//         console.error("Failed to load chats", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchChats();
//   }, []);

//   useEffect(() => {
//     if (!conversationIdFromQuery || chats.length === 0) return;
//     const conversation = chats.find((c) => c._id === conversationIdFromQuery);
//     if (conversation) setActiveChat(conversation);
//   }, [conversationIdFromQuery, chats]);

//   return (
//     <div
//       className="w-full flex flex-col overflow-hidden text-white bg-[#020617]"
//       style={{ height: "100dvh" }}
//     >
//       {/* ── MAIN ROW (list + panel) ── */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* ── CHAT LIST ── */}
//         <div
//           className={`
//             w-full sm:w-72 flex-shrink-0
//             ${activeChat ? "hidden sm:flex" : "flex"}
//             flex-col
//             border-r border-white/10
//             bg-white/[0.03]
//           `}
//         >
//           {/* Header */}
//           <div className="flex-shrink-0 px-4 py-4 border-b border-white/10">
//             <h2 className="text-white font-semibold text-[16px] tracking-tight">
//               Chats
//             </h2>
//             <p className="text-white/40 text-[13px] mt-0.5">
//               Your conversations
//             </p>
//           </div>

//           {/* List */}
//           <div
//             className="flex-1 overflow-y-auto pt-2 pb-2"
//             style={{ WebkitOverflowScrolling: "touch" }}
//           >
//             {/* Loading */}
//             {loading && (
//               <div className="px-3 py-2 space-y-1">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 px-2 py-3 animate-pulse"
//                   >
//                     <div className="w-10 h-10 rounded-full bg-white/8 flex-shrink-0" />
//                     <div className="flex-1 space-y-2">
//                       <div className="h-2.5 w-24 bg-white/8 rounded-full" />
//                       <div className="h-2 w-32 bg-white/5 rounded-full" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Empty */}
//             {!loading && chats.length === 0 && (
//               <p className="p-4 text-white/40 text-[13px]">
//                 No chats available
//               </p>
//             )}

//             {/* Rows */}
//             {!loading &&
//               chats.map((chat) => {
//                 const otherUser = chat.participants.find(
//                   (p) => p._id !== myUserId,
//                 );
//                 const isActive = activeChat?._id === chat._id;

//                 return (
//                   <button
//                     key={chat._id}
//                     onClick={() => setActiveChat(chat)}
//                     className={`
//                     w-full text-left px-3 py-3 mx-1 rounded-xl
//                     flex items-center gap-3
//                     transition-all duration-150 active:scale-[0.98]
//                     ${isActive ? "bg-white/10" : "hover:bg-white/5"}
//                   `}
//                     style={{ width: "calc(100% - 8px)" }}
//                   >
//                     <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10 bg-neutral-800 flex items-center justify-center">
//                       {otherUser?.profilePicture ? (
//                         <img
//                           src={otherUser.profilePicture}
//                           alt={otherUser.username}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <span className="text-sm font-semibold text-white">
//                           {otherUser?.username?.charAt(0).toUpperCase()}
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-[13.5px] font-semibold text-white leading-tight truncate">
//                         {otherUser?.username}
//                       </p>
//                       <p className="text-[12px] text-white/35 truncate mt-0.5">
//                         {chat.lastMessage
//                           ? chat.lastMessage.slice(0, 24) +
//                             (chat.lastMessage.length > 24 ? "…" : "")
//                           : "Start chatting"}
//                       </p>
//                     </div>
//                   </button>
//                 );
//               })}
//           </div>

//           {/* ── FOOTER SPACER (chat list) ── */}
//           <div
//             className="flex-shrink-0"
//             style={{ height: "calc(72px + env(safe-area-inset-bottom, 0px))" }}
//           />
//         </div>

//         {/* ── CHAT PANEL ── */}
//         <div
//           className={`
//             flex-1 min-w-0
//             ${activeChat ? "flex" : "hidden sm:flex"}
//             flex-col overflow-hidden
//           `}
//         >
//           {!activeChat ? (
//             <div className="flex-1 flex flex-col items-center justify-center text-white/30 text-center gap-3">
//               <MessageCircle
//                 size={48}
//                 strokeWidth={1.5}
//                 className="opacity-40"
//               />
//               <p className="text-[14px] font-medium">
//                 Select a chat to start messaging
//               </p>
//             </div>
//           ) : (
//             <ChatBox chat={activeChat} onBack={() => setActiveChat(null)} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatView;

// import { useEffect, useState, useRef } from "react";
// import { MessageCircle, MoreVertical, Trash2 } from "lucide-react";
// import ChatBox from "./ChatBox";
// import fetchData from "../../utils/fetchData";
// import { useLocation } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// function ChatView() {
//   const [activeChat, setActiveChat] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const menuRef = useRef(null);

//   const location = useLocation();
//   const { user } = useAuth();
//   const myUserId = user?._id;

//   const queryParams = new URLSearchParams(location.search);
//   const conversationIdFromQuery = queryParams.get("conversation");

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await fetchData("/api/chat/conversations", {
//           credentials: "include",
//         });
//         const data = await res.json();
//         console.log("conversations yaai hain ,data", data);
//         setChats(data);
//       } catch (err) {
//         console.error("Failed to load chats", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchChats();
//   }, []);

//   useEffect(() => {
//     if (!conversationIdFromQuery || chats.length === 0) return;
//     const conversation = chats.find((c) => c._id === conversationIdFromQuery);
//     if (conversation) setActiveChat(conversation);
//   }, [conversationIdFromQuery, chats]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpenMenuId(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleDeleteChat = async (chatId) => {
//     const confirmed = window.confirm("Delete this conversation?");
//     if (!confirmed) return;
//     try {
//       await fetchData(`/api/chat/conversations/${chatId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       setChats((prev) => prev.filter((c) => c._id !== chatId));
//       if (activeChat?._id === chatId) setActiveChat(null);
//     } catch (err) {
//       console.error("Failed to delete chat", err);
//     }
//     setOpenMenuId(null);
//   };

//   return (
//     <div
//       className="w-full flex flex-col overflow-hidden text-white bg-[#020617]"
//       style={{ height: "100dvh" }}
//     >
//       {/* ── MAIN ROW (list + panel) ── */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* ── CHAT LIST ── */}
//         <div
//           className={`
//             w-full sm:w-72 flex-shrink-0
//             ${activeChat ? "hidden sm:flex" : "flex"}
//             flex-col
//             border-r border-white/10
//             bg-white/[0.03]
//           `}
//         >
//           {/* Header */}
//           <div className="flex-shrink-0 px-4 py-4 border-b border-white/10">
//             <h2 className="text-white font-semibold text-[16px] tracking-tight">
//               Chats
//             </h2>
//             <p className="text-white/40 text-[13px] mt-0.5">
//               Your conversations
//             </p>
//           </div>

//           {/* List */}
//           <div
//             className="flex-1 overflow-y-auto pt-2 pb-2"
//             style={{ WebkitOverflowScrolling: "touch" }}
//           >
//             {/* Loading */}
//             {loading && (
//               <div className="px-3 py-2 space-y-1">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 px-2 py-3 animate-pulse"
//                   >
//                     <div className="w-10 h-10 rounded-full bg-white/8 flex-shrink-0" />
//                     <div className="flex-1 space-y-2">
//                       <div className="h-2.5 w-24 bg-white/8 rounded-full" />
//                       <div className="h-2 w-32 bg-white/5 rounded-full" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Empty */}
//             {!loading && chats.length === 0 && (
//               <p className="p-4 text-white/40 text-[13px]">
//                 No chats available
//               </p>
//             )}

//             {/* Rows */}
//             {!loading &&
//               chats.map((chat) => {
//                 const otherUser = chat.participants.find(
//                   (p) => p._id !== myUserId,
//                 );
//                 const isActive = activeChat?._id === chat._id;
//                 const isMenuOpen = openMenuId === chat._id;

//                 return (
//                   <div
//                     key={chat._id}
//                     className={`
//                     relative mx-1 rounded-xl
//                     flex items-center
//                     transition-all duration-150
//                     ${isActive ? "bg-white/10" : "hover:bg-white/5"}
//                   `}
//                     style={{ width: "calc(100% - 8px)" }}
//                   >
//                     {/* Clickable row */}
//                     <button
//                       onClick={() => setActiveChat(chat)}
//                       className="flex items-center gap-3 flex-1 min-w-0 px-3 py-3 text-left active:scale-[0.98] transition-all duration-150"
//                     >
//                       <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10 bg-neutral-800 flex items-center justify-center">
//                         {otherUser?.profilePicture ? (
//                           <img
//                             src={otherUser.profilePicture}
//                             alt={otherUser.username}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <span className="text-sm font-semibold text-white">
//                             {otherUser?.username?.charAt(0).toUpperCase()}
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-[13.5px] font-semibold text-white leading-tight truncate">
//                           {otherUser?.username}
//                         </p>
//                         <p className="text-[12px] text-white/35 truncate mt-0.5">
//                           {chat.lastMessage
//                             ? chat.lastMessage.slice(0, 24) +
//                               (chat.lastMessage.length > 24 ? "…" : "")
//                             : "Start chatting"}
//                         </p>
//                       </div>
//                     </button>

//                     {/* ── THREE DOTS ── */}
//                     <div
//                       className="relative flex-shrink-0 pr-2"
//                       ref={isMenuOpen ? menuRef : null}
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setOpenMenuId(isMenuOpen ? null : chat._id);
//                         }}
//                         className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-90 transition-all duration-150 text-white/30 hover:text-white/70"
//                       >
//                         <MoreVertical size={14} />
//                       </button>

//                       {/* Dropdown */}
//                       {isMenuOpen && (
//                         <div className="absolute right-0 top-8 z-[999] w-44 rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDeleteChat(chat._id);
//                             }}
//                             className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors duration-150 text-left"
//                           >
//                             <Trash2 size={14} />
//                             Delete chat
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//           </div>

//           {/* ── FOOTER SPACER ── */}
//           <div
//             className="flex-shrink-0"
//             style={{ height: "calc(72px + env(safe-area-inset-bottom, 0px))" }}
//           />
//         </div>

//         {/* ── CHAT PANEL ── */}
//         <div
//           className={`
//             flex-1 min-w-0
//             ${activeChat ? "flex" : "hidden sm:flex"}
//             flex-col overflow-hidden
//           `}
//         >
//           {!activeChat ? (
//             <div className="flex-1 flex flex-col items-center justify-center text-white/30 text-center gap-3">
//               <MessageCircle
//                 size={48}
//                 strokeWidth={1.5}
//                 className="opacity-40"
//               />
//               <p className="text-[14px] font-medium">
//                 Select a chat to start messaging
//               </p>
//             </div>
//           ) : (
//             <ChatBox chat={activeChat} onBack={() => setActiveChat(null)} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatView;

// import { useEffect, useState, useRef, useContext } from "react";
// import { MessageCircle, MoreVertical, Trash2 } from "lucide-react";
// import ChatBox from "./ChatBox";
// import fetchData from "../../utils/fetchData";
// import { useLocation } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { websocketContext } from "../../context/WebSocket";

// function ChatView() {
//   const [activeChat, setActiveChat] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const menuRef = useRef(null);

//   const location = useLocation();
//   const { user } = useAuth();
//   const myUserId = user?._id;

//   const queryParams = new URLSearchParams(location.search);
//   const conversationIdFromQuery = queryParams.get("conversation");
//    const { messages } = useContext(websocketContext);

//   useEffect(() => {
//     const allMessages = Object.entries(messages);
//     if (!allMessages.length) return;

//     allMessages.forEach(([chatId, msgs]) => {
//       if (!msgs.length) return;
//       const latest = msgs[msgs.length - 1];
//       // only update if message is from the other user (not me)
//       if (latest.from !== user?._id) {
//         setChats((prev) => {
//           const updated = prev.map((c) =>
//             c._id === chatId ? { ...c, lastMessage: latest.text } : c,
//           );
//           const chatIndex = updated.findIndex((c) => c._id === chatId);
//           if (chatIndex > 0) {
//             const [chat] = updated.splice(chatIndex, 1);
//             updated.unshift(chat);
//           }
//           return [...updated];
//         });
//       }
//     });
//   }, [messages]);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await fetchData("/api/chat/conversations", {
//           credentials: "include",
//         });
//         const data = await res.json();
//         console.log("conversations yaai hain ,data", data);
//         setChats(data);
//       } catch (err) {
//         console.error("Failed to load chats", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchChats();
//   }, []);

//   useEffect(() => {
//     if (!conversationIdFromQuery || chats.length === 0) return;
//     const conversation = chats.find((c) => c._id === conversationIdFromQuery);
//     if (conversation) setActiveChat(conversation);
//   }, [conversationIdFromQuery, chats]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpenMenuId(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleNewMessage = (chatId, messageText) => {
//     setChats((prev) => {
//       const updated = prev.map((c) =>
//         c._id === chatId ? { ...c, lastMessage: messageText } : c,
//       );
//       // move the updated chat to the top
//       const chatIndex = updated.findIndex((c) => c._id === chatId);
//       if (chatIndex > 0) {
//         const [chat] = updated.splice(chatIndex, 1);
//         updated.unshift(chat);
//       }
//       return [...updated];
//     });
//   };

//   const handleDeleteChat = async (chatId) => {
//     const confirmed = window.confirm("Delete this conversation?");
//     if (!confirmed) return;
//     try {
//       await fetchData(`/api/chat/conversations/${chatId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       setChats((prev) => prev.filter((c) => c._id !== chatId));
//       if (activeChat?._id === chatId) setActiveChat(null);
//     } catch (err) {
//       console.error("Failed to delete chat", err);
//     }
//     setOpenMenuId(null);
//   };

//   return (
//     // ✅ h-full instead of height: 100dvh — Layout's <main> already controls height
//     // ✅ min-h-0 so flex children can shrink properly
//     <div className="w-full h-full min-h-0 flex flex-col overflow-hidden text-white bg-[#020617]">
//       {/* ── MAIN ROW (list + panel) ── */}
//       {/* ✅ min-h-0 here too — critical for nested flex scroll to work */}
//       <div className="flex flex-1 min-h-0 overflow-hidden">
//         {/* ── CHAT LIST ── */}
//         <div
//           className={`
//             w-full sm:w-72 flex-shrink-0
//             ${activeChat ? "hidden sm:flex" : "flex"}
//             flex-col
//             border-r border-white/10
//             bg-white/[0.03]
//           `}
//         >
//           {/* Header */}
//           <div className="flex-shrink-0 px-4 py-4 border-b border-white/10">
//             <h2 className="text-white font-semibold text-[16px] tracking-tight">
//               Chats
//             </h2>
//             <p className="text-white/40 text-[13px] mt-0.5">
//               Your conversations
//             </p>
//           </div>

//           {/* List */}
//           <div
//             className="flex-1 overflow-y-auto pt-2 pb-2"
//             style={{ WebkitOverflowScrolling: "touch" }}
//           >
//             {/* Loading */}
//             {loading && (
//               <div className="px-3 py-2 space-y-1">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 px-2 py-3 animate-pulse"
//                   >
//                     <div className="w-10 h-10 rounded-full bg-white/8 flex-shrink-0" />
//                     <div className="flex-1 space-y-2">
//                       <div className="h-2.5 w-24 bg-white/8 rounded-full" />
//                       <div className="h-2 w-32 bg-white/5 rounded-full" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Empty */}
//             {!loading && chats.length === 0 && (
//               <p className="p-4 text-white/40 text-[13px]">
//                 No chats available
//               </p>
//             )}

//             {/* Rows */}
//             {!loading &&
//               chats.map((chat) => {
//                 const otherUser = chat.participants.find(
//                   (p) => p._id !== myUserId,
//                 );
//                 const isActive = activeChat?._id === chat._id;
//                 const isMenuOpen = openMenuId === chat._id;

//                 return (
//                   <div
//                     key={chat._id}
//                     className={`
//                       relative mx-1 rounded-xl
//                       flex items-center
//                       transition-all duration-150
//                       ${isActive ? "bg-white/10" : "hover:bg-white/5"}
//                     `}
//                     style={{ width: "calc(100% - 8px)" }}
//                   >
//                     {/* Clickable row */}
//                     <button
//                       onClick={() => setActiveChat(chat)}
//                       className="flex items-center gap-3 flex-1 min-w-0 px-3 py-3 text-left active:scale-[0.98] transition-all duration-150"
//                     >
//                       <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10 bg-neutral-800 flex items-center justify-center">
//                         {otherUser?.profilePicture ? (
//                           <img
//                             src={otherUser.profilePicture}
//                             alt={otherUser.username}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <span className="text-sm font-semibold text-white">
//                             {otherUser?.username?.charAt(0).toUpperCase()}
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-[13.5px] font-semibold text-white leading-tight truncate">
//                           {otherUser?.username}
//                         </p>
//                         <p className="text-[12px] text-white/60 truncate mt-0.5 font-semibold">
//                           {chat.lastMessage
//                             ? chat.lastMessage.slice(0, 24) +
//                               (chat.lastMessage.length > 24 ? "…" : "")
//                             : "Start chatting"}
//                         </p>
//                       </div>
//                     </button>

//                     {/* ── THREE DOTS ── */}
//                     <div
//                       className="relative flex-shrink-0 pr-2"
//                       ref={isMenuOpen ? menuRef : null}
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setOpenMenuId(isMenuOpen ? null : chat._id);
//                         }}
//                         className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-90 transition-all duration-150 text-white/30 hover:text-white/70"
//                       >
//                         <MoreVertical size={14} />
//                       </button>

//                       {/* Dropdown */}
//                       {isMenuOpen && (
//                         <div className="absolute right-0 top-8 z-[999] w-44 rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDeleteChat(chat._id);
//                             }}
//                             className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors duration-150 text-left"
//                           >
//                             <Trash2 size={14} />
//                             Delete chat
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//           </div>

//           {/* ✅ REMOVED: footer spacer div — Footer is no longer fixed, no spacer needed */}
//         </div>

//         {/* ── CHAT PANEL ── */}
//         <div
//           className={`
//             flex-1 min-w-0
//             ${activeChat ? "flex" : "hidden sm:flex"}
//             flex-col overflow-hidden
//           `}
//         >
//           {!activeChat ? (
//             <div className="flex-1 flex flex-col items-center justify-center text-white/30 text-center gap-3">
//               <MessageCircle
//                 size={48}
//                 strokeWidth={1.5}
//                 className="opacity-40"
//               />
//               <p className="text-[14px] font-medium">
//                 Select a chat to start messaging
//               </p>
//             </div>
//           ) : (
//             <ChatBox
//               chat={activeChat}
//               onBack={() => setActiveChat(null)}
//               onNewMessage={handleNewMessage}
//               onClearMessages={(chatId) => {
//                 // ← add this
//                 setChats((prev) =>
//                   prev.map((c) =>
//                     c._id === chatId ? { ...c, lastMessage: "" } : c,
//                   ),
//                 );
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatView;

// import { useEffect, useState, useRef, useContext, useCallback } from "react";
// import { MessageCircle, MoreVertical, Trash2 } from "lucide-react";
// import ChatBox from "./ChatBox";
// import fetchData from "../../utils/fetchData";
// import { useLocation } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { websocketContext } from "../../context/WebSocket";

// function ChatView() {
//   const [activeChat, setActiveChat] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   // unreadCounts: { [chatId]: number }
//   const [unreadCounts, setUnreadCounts] = useState({});

//   // One stable ref for the currently-open menu container
//   const menuRef = useRef(null);
//   const activeChatRef = useRef(null);

//   const location = useLocation();
//   const { user } = useAuth();
//   const myUserId = user?._id;

//   const queryParams = new URLSearchParams(location.search);
//   const conversationIdFromQuery = queryParams.get("conversation");
//   const { messages } = useContext(websocketContext);

//   // Keep activeChatRef in sync so the WS effect can read it without a stale closure
//   useEffect(() => {
//     activeChatRef.current = activeChat;
//   }, [activeChat]);

//   // ── Derive unread counts from the WS messages map ──────────────────────────
//   // A message is "unread" when:
//   //   - it came from the other user (from !== myUserId)
//   //   - its status is NOT "read"
//   //   - its conversation is NOT the currently-active one
//   useEffect(() => {
//     const counts = {};
//     Object.entries(messages).forEach(([chatId, msgs]) => {
//       if (!Array.isArray(msgs)) return;
//       const activeChatId = activeChatRef.current?._id;
//       if (chatId === activeChatId) {
//         // User is looking at this chat right now → nothing is unread
//         counts[chatId] = 0;
//         return;
//       }
//       counts[chatId] = msgs.filter(
//         (m) => m.from !== myUserId && m.status !== "read",
//       ).length;
//     });
//     setUnreadCounts(counts);
//   }, [messages, myUserId]);

//   // ── Update chat list when new WS messages arrive ──────────────────────────
//   useEffect(() => {
//     const allMessages = Object.entries(messages);
//     if (!allMessages.length) return;

//     allMessages.forEach(([chatId, msgs]) => {
//       if (!msgs.length) return;
//       const latest = msgs[msgs.length - 1];
//       // Only bubble the chat to the top when the message is from the other user.
//       // Our own messages are handled by handleNewMessage (called at send time).
//       if (latest.from !== myUserId) {
//         setChats((prev) => {
//           const updated = prev.map((c) =>
//             c._id === chatId ? { ...c, lastMessage: latest.text } : c,
//           );
//           const chatIndex = updated.findIndex((c) => c._id === chatId);
//           if (chatIndex > 0) {
//             const [chat] = updated.splice(chatIndex, 1);
//             updated.unshift(chat);
//           }
//           return [...updated];
//         });
//       }
//     });
//   }, [messages, myUserId]);

//   // ── Initial fetch ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await fetchData("/api/chat/conversations", {
//           credentials: "include",
//         });
//         const data = await res.json();
//         setChats(data);
//       } catch (err) {
//         console.error("Failed to load chats", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchChats();
//   }, []);

//   // ── Auto-select chat from query param ────────────────────────────────────
//   useEffect(() => {
//     if (!conversationIdFromQuery || chats.length === 0) return;
//     const conversation = chats.find((c) => c._id === conversationIdFromQuery);
//     if (conversation) setActiveChat(conversation);
//   }, [conversationIdFromQuery, chats]);

//   // ── Click-outside to close menu ───────────────────────────────────────────
//   // menuRef is always attached to the open menu's wrapper div (see JSX below).
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpenMenuId(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ── Handlers ──────────────────────────────────────────────────────────────
//   const handleSelectChat = useCallback((chat) => {
//     setActiveChat(chat);
//     // Zero out the badge immediately when the user opens the chat
//     setUnreadCounts((prev) => ({ ...prev, [chat._id]: 0 }));
//     setOpenMenuId(null);
//   }, []);

//   const handleNewMessage = useCallback((chatId, messageText) => {
//     setChats((prev) => {
//       const updated = prev.map((c) =>
//         c._id === chatId ? { ...c, lastMessage: messageText } : c,
//       );
//       const chatIndex = updated.findIndex((c) => c._id === chatId);
//       if (chatIndex > 0) {
//         const [chat] = updated.splice(chatIndex, 1);
//         updated.unshift(chat);
//       }
//       return [...updated];
//     });
//   }, []);

//   const handleDeleteChat = useCallback(
//     async (chatId) => {
//       const confirmed = window.confirm("Delete this conversation?");
//       if (!confirmed) return;
//       try {
//         await fetchData(`/api/chat/conversations/${chatId}`, {
//           method: "DELETE",
//           credentials: "include",
//         });
//         setChats((prev) => prev.filter((c) => c._id !== chatId));
//         setUnreadCounts((prev) => {
//           const next = { ...prev };
//           delete next[chatId];
//           return next;
//         });
//         if (activeChat?._id === chatId) setActiveChat(null);
//       } catch (err) {
//         console.error("Failed to delete chat", err);
//       }
//       setOpenMenuId(null);
//     },
//     [activeChat],
//   );

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <div className="w-full h-full min-h-0 flex flex-col overflow-hidden text-white bg-[#020617]">
//       <div className="flex flex-1 min-h-0 overflow-hidden">
//         {/* ── CHAT LIST ── */}
//         <div
//           className={`
//             w-full sm:w-72 flex-shrink-0
//             ${activeChat ? "hidden sm:flex" : "flex"}
//             flex-col
//             border-r border-white/10
//             bg-white/[0.03]
//           `}
//         >
//           {/* Header */}
//           <div className="flex-shrink-0 px-4 py-4 border-b border-white/10">
//             <h2 className="text-white font-semibold text-[16px] tracking-tight">
//               Chats
//             </h2>
//             <p className="text-white/40 text-[13px] mt-0.5">
//               Your conversations
//             </p>
//           </div>

//           {/* List */}
//           <div
//             className="flex-1 overflow-y-auto pt-2 pb-2"
//             style={{ WebkitOverflowScrolling: "touch" }}
//           >
//             {/* Loading skeletons */}
//             {loading && (
//               <div className="px-3 py-2 space-y-1">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 px-2 py-3 animate-pulse"
//                   >
//                     <div className="w-10 h-10 rounded-full bg-white/8 flex-shrink-0" />
//                     <div className="flex-1 space-y-2">
//                       <div className="h-2.5 w-24 bg-white/8 rounded-full" />
//                       <div className="h-2 w-32 bg-white/5 rounded-full" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Empty state */}
//             {!loading && chats.length === 0 && (
//               <p className="p-4 text-white/40 text-[13px]">
//                 No chats available
//               </p>
//             )}

//             {/* Rows */}
//             {!loading &&
//               chats.map((chat) => {
//                 const otherUser = chat.participants.find(
//                   (p) => p._id !== myUserId,
//                 );
//                 const isActive = activeChat?._id === chat._id;
//                 const isMenuOpen = openMenuId === chat._id;
//                 const unread = unreadCounts[chat._id] || 0;

//                 return (
//                   <div
//                     key={chat._id}
//                     className={`
//                       relative mx-1 rounded-xl
//                       flex items-center
//                       transition-all duration-150
//                       ${isActive ? "bg-white/10" : "hover:bg-white/5"}
//                     `}
//                     style={{ width: "calc(100% - 8px)" }}
//                   >
//                     {/* Clickable row */}
//                     <button
//                       onClick={() => handleSelectChat(chat)}
//                       className="flex items-center gap-3 flex-1 min-w-0 px-3 py-3 text-left active:scale-[0.98] transition-all duration-150"
//                     >
//                       {/* Avatar */}
//                       <div className="relative flex-shrink-0">
//                         <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 bg-neutral-800 flex items-center justify-center">
//                           {otherUser?.profilePicture ? (
//                             <img
//                               src={otherUser.profilePicture}
//                               alt={otherUser.username}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <span className="text-sm font-semibold text-white">
//                               {otherUser?.username?.charAt(0).toUpperCase()}
//                             </span>
//                           )}
//                         </div>
//                         {/* Unread badge on avatar */}
//                         {unread > 0 && (
//                           <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center leading-none shadow-md">
//                             {unread > 99 ? "99+" : unread}
//                           </span>
//                         )}
//                       </div>

//                       {/* Text */}
//                       <div className="flex-1 min-w-0">
//                         <p
//                           className={`text-[13.5px] font-semibold leading-tight truncate ${
//                             unread > 0 ? "text-white" : "text-white/80"
//                           }`}
//                         >
//                           {otherUser?.username}
//                         </p>
//                         <p
//                           className={`text-[12px] truncate mt-0.5 ${
//                             unread > 0
//                               ? "text-white font-semibold"
//                               : "text-white/50 font-normal"
//                           }`}
//                         >
//                           {chat.lastMessage
//                             ? chat.lastMessage.slice(0, 28) +
//                               (chat.lastMessage.length > 28 ? "…" : "")
//                             : "Start chatting"}
//                         </p>
//                       </div>
//                     </button>

//                     {/* ── THREE DOTS ── */}
//                     {/*
//                      * FIX: The ref was previously conditional (`ref={isMenuOpen ? menuRef : null}`),
//                      * so the click-outside listener couldn't find the element on the first open.
//                      * Now we always attach the ref to a stable wrapper and the menu portal is
//                      * conditionally rendered inside it.
//                      */}
//                     <div
//                       className="relative flex-shrink-0 pr-2"
//                       ref={isMenuOpen ? menuRef : null}
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setOpenMenuId(isMenuOpen ? null : chat._id);
//                         }}
//                         className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-90 transition-all duration-150 text-white/30 hover:text-white/70"
//                       >
//                         <MoreVertical size={14} />
//                       </button>

//                       {isMenuOpen && (
//                         <div className="absolute right-0 top-8 z-[999] w-44 rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDeleteChat(chat._id);
//                             }}
//                             className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors duration-150 text-left"
//                           >
//                             <Trash2 size={14} />
//                             Delete chat
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//           </div>
//         </div>

//         {/* ── CHAT PANEL ── */}
//         <div
//           className={`
//             flex-1 min-w-0
//             ${activeChat ? "flex" : "hidden sm:flex"}
//             flex-col overflow-hidden
//           `}
//         >
//           {!activeChat ? (
//             <div className="flex-1 flex flex-col items-center justify-center text-white/30 text-center gap-3">
//               <MessageCircle
//                 size={48}
//                 strokeWidth={1.5}
//                 className="opacity-40"
//               />
//               <p className="text-[14px] font-medium">
//                 Select a chat to start messaging
//               </p>
//             </div>
//           ) : (
//             <ChatBox
//               chat={activeChat}
//               onBack={() => setActiveChat(null)}
//               onNewMessage={handleNewMessage}
//               onClearMessages={(chatId) => {
//                 setChats((prev) =>
//                   prev.map((c) =>
//                     c._id === chatId ? { ...c, lastMessage: "" } : c,
//                   ),
//                 );
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatView;

// import { useEffect, useState, useRef, useContext, useCallback } from "react";
// import { MessageCircle, MoreVertical, Trash2 } from "lucide-react";
// import ChatBox from "./ChatBox";
// import fetchData from "../../utils/fetchData";
// import { useLocation } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { websocketContext } from "../../context/WebSocket";

// // ─────────────────────────────────────────────────────────────────────────────
// // Helpers
// // ─────────────────────────────────────────────────────────────────────────────

// // Sort a chats array by lastMessageAt descending (most recent first).
// // This is the single place ordering is decided — no splice/unshift anywhere.
// function sortChats(chats) {
//   return [...chats].sort(
//     (a, b) => (b.lastMessageAt || 0) - (a.lastMessageAt || 0),
//   );
// }

// function ChatView() {
//   const [activeChat, setActiveChat] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [unreadCounts, setUnreadCounts] = useState({});

//   const menuRef = useRef(null);
//   const activeChatRef = useRef(null);

//   const location = useLocation();
//   const { user } = useAuth();
//   const myUserId = user?._id;

//   const queryParams = new URLSearchParams(location.search);
//   const conversationIdFromQuery = queryParams.get("conversation");
//   const { messages } = useContext(websocketContext);

//   useEffect(() => {
//     activeChatRef.current = activeChat;
//   }, [activeChat]);

//   // ── React to live WS messages ────────────────────────────────────────────
//   //
//   // Previously there were TWO separate effects on `messages`:
//   //   1. One to update unread counts
//   //   2. One to reorder chats
//   //
//   // They both iterated Object.entries(messages) and both called setChats.
//   // Because React batches setState calls within the same event tick, the
//   // second setChats would overwrite the first — causing races where the
//   // chat list would partially reorder then snap back.
//   //
//   // Now there is ONE effect that does both jobs atomically in a single
//   // setChats call, so the state is always consistent.
//   //
//   // Ordering strategy: each chat carries a `lastMessageAt` timestamp (ms).
//   // We update it whenever a new message arrives for that chat, then sort
//   // the whole array by that field. This mirrors how WhatsApp/Instagram work —
//   // the most recently active chat is always at the top, regardless of
//   // whether you sent or received the message.
//   useEffect(() => {
//     const entries = Object.entries(messages);
//     if (!entries.length) return;

//     // Collect the latest message per conversation from the WS state.
//     // We process all conversations in one pass so the single setChats call
//     // below gets the full picture, not just one conversation at a time.
//     const updates = {}; // { chatId: { latestMsg, liveUnread } }

//     entries.forEach(([chatId, msgs]) => {
//       if (!Array.isArray(msgs) || !msgs.length) return;

//       const latest = msgs[msgs.length - 1];
//       const activeChatId = activeChatRef.current?._id;

//       const liveUnread =
//         chatId === activeChatId
//           ? 0
//           : msgs.filter((m) => m.from !== myUserId && m.status !== "read")
//               .length;

//       updates[chatId] = { latest, liveUnread };
//     });

//     if (!Object.keys(updates).length) return;

//     // Update chats and unread counts atomically
//     setChats((prev) => {
//       const next = prev.map((chat) => {
//         const update = updates[chat._id];
//         if (!update) return chat;

//         return {
//           ...chat,
//           lastMessage: update.latest.text,
//           // Store as a number for reliable sort comparison
//           lastMessageAt: update.latest.createdAt ?? chat.lastMessageAt,
//         };
//       });

//       return sortChats(next);
//     });

//     setUnreadCounts((prev) => {
//       const next = { ...prev };
//       Object.entries(updates).forEach(([chatId, { liveUnread }]) => {
//         if (liveUnread === 0) return;
//         // Take the max to avoid double-counting with the seeded offline count
//         next[chatId] = Math.max(prev[chatId] || 0, liveUnread);
//       });
//       return next;
//     });
//   }, [messages, myUserId]);

//   // ── Initial fetch ─────────────────────────────────────────────────────────
//   // The server sorts by lastMessageAt DESC, so the initial order is correct.
//   // We normalise lastMessageAt to a JS timestamp (ms number) here so the
//   // client-side sortChats() helper can compare it reliably.
//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await fetchData("/api/chat/conversations", {
//           credentials: "include",
//         });
//         const data = await res.json();

//         // Normalise lastMessageAt to ms number and seed unread counts
//         const seeded = {};
//         const normalised = data.map((chat) => {
//           if (chat.unreadCount > 0) seeded[chat._id] = chat.unreadCount;
//           return {
//             ...chat,
//             lastMessageAt: chat.lastMessageAt
//               ? new Date(chat.lastMessageAt).getTime()
//               : 0,
//           };
//         });

//         setChats(sortChats(normalised));
//         if (Object.keys(seeded).length > 0) setUnreadCounts(seeded);
//       } catch (err) {
//         console.error("Failed to load chats", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchChats();
//   }, []);

//   // ── Auto-select chat from query param ────────────────────────────────────
//   useEffect(() => {
//     if (!conversationIdFromQuery || chats.length === 0) return;
//     const conversation = chats.find((c) => c._id === conversationIdFromQuery);
//     if (conversation) setActiveChat(conversation);
//   }, [conversationIdFromQuery, chats]);

//   // ── Click-outside to close menu ───────────────────────────────────────────
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpenMenuId(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ── Handlers ──────────────────────────────────────────────────────────────
//   const handleSelectChat = useCallback((chat) => {
//     setActiveChat(chat);
//     setUnreadCounts((prev) => ({ ...prev, [chat._id]: 0 }));
//     setOpenMenuId(null);
//   }, []);

//   // Called by ChatBox when the current user sends a message.
//   // Updates lastMessage + lastMessageAt and re-sorts so the chat bubbles to top.
//   const handleNewMessage = useCallback((chatId, messageText) => {
//     const now = Date.now();
//     setChats((prev) => {
//       const next = prev.map((c) =>
//         c._id === chatId
//           ? { ...c, lastMessage: messageText, lastMessageAt: now }
//           : c,
//       );
//       return sortChats(next);
//     });
//   }, []);

//   const handleDeleteChat = useCallback(
//     async (chatId) => {
//       const confirmed = window.confirm("Delete this conversation?");
//       if (!confirmed) return;
//       try {
//         await fetchData(`/api/chat/conversations/${chatId}`, {
//           method: "DELETE",
//           credentials: "include",
//         });
//         setChats((prev) => prev.filter((c) => c._id !== chatId));
//         setUnreadCounts((prev) => {
//           const next = { ...prev };
//           delete next[chatId];
//           return next;
//         });
//         if (activeChat?._id === chatId) setActiveChat(null);
//       } catch (err) {
//         console.error("Failed to delete chat", err);
//       }
//       setOpenMenuId(null);
//     },
//     [activeChat],
//   );

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <div className="w-full h-full min-h-0 flex flex-col overflow-hidden text-white bg-[#020617]">
//       <div className="flex flex-1 min-h-0 overflow-hidden">
//         {/* ── CHAT LIST ── */}
//         <div
//           className={`
//             w-full sm:w-72 flex-shrink-0
//             ${activeChat ? "hidden sm:flex" : "flex"}
//             flex-col
//             border-r border-white/10
//             bg-white/[0.03]
//           `}
//         >
//           <div className="flex-shrink-0 px-4 py-4 border-b border-white/10">
//             <h2 className="text-white font-semibold text-[16px] tracking-tight">
//               Chats
//             </h2>
//             <p className="text-white/40 text-[13px] mt-0.5">
//               Your conversations
//             </p>
//           </div>

//           <div
//             className="flex-1 overflow-y-auto pt-2 pb-2"
//             style={{ WebkitOverflowScrolling: "touch" }}
//           >
//             {loading && (
//               <div className="px-3 py-2 space-y-1">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 px-2 py-3 animate-pulse"
//                   >
//                     <div className="w-10 h-10 rounded-full bg-white/8 flex-shrink-0" />
//                     <div className="flex-1 space-y-2">
//                       <div className="h-2.5 w-24 bg-white/8 rounded-full" />
//                       <div className="h-2 w-32 bg-white/5 rounded-full" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {!loading && chats.length === 0 && (
//               <p className="p-4 text-white/40 text-[13px]">
//                 No chats available
//               </p>
//             )}

//             {!loading &&
//               chats.map((chat) => {
//                 const otherUser = chat.participants.find(
//                   (p) => p._id !== myUserId,
//                 );
//                 const isActive = activeChat?._id === chat._id;
//                 const isMenuOpen = openMenuId === chat._id;
//                 const unread = unreadCounts[chat._id] || 0;

//                 return (
//                   <div
//                     key={chat._id}
//                     className={`
//                       relative mx-1 rounded-xl
//                       flex items-center
//                       transition-all duration-150
//                       ${isActive ? "bg-white/10" : "hover:bg-white/5"}
//                     `}
//                     style={{ width: "calc(100% - 8px)" }}
//                   >
//                     <button
//                       onClick={() => handleSelectChat(chat)}
//                       className="flex items-center gap-3 flex-1 min-w-0 px-3 py-3 text-left active:scale-[0.98] transition-all duration-150"
//                     >
//                       <div className="relative flex-shrink-0">
//                         <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 bg-neutral-800 flex items-center justify-center">
//                           {otherUser?.profilePicture ? (
//                             <img
//                               src={otherUser.profilePicture}
//                               alt={otherUser.username}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <span className="text-sm font-semibold text-white">
//                               {otherUser?.username?.charAt(0).toUpperCase()}
//                             </span>
//                           )}
//                         </div>
//                         {unread > 0 && (
//                           <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center leading-none shadow-md">
//                             {unread > 99 ? "99+" : unread}
//                           </span>
//                         )}
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <p
//                           className={`text-[13.5px] font-semibold leading-tight truncate ${
//                             unread > 0 ? "text-white" : "text-white/80"
//                           }`}
//                         >
//                           {otherUser?.username}
//                         </p>
//                         <p
//                           className={`text-[12px] truncate mt-0.5 ${
//                             unread > 0
//                               ? "text-white font-semibold"
//                               : "text-white/50 font-normal"
//                           }`}
//                         >
//                           {chat.lastMessage
//                             ? chat.lastMessage.slice(0, 28) +
//                               (chat.lastMessage.length > 28 ? "…" : "")
//                             : "Start chatting"}
//                         </p>
//                       </div>
//                     </button>

//                     <div
//                       className="relative flex-shrink-0 pr-2"
//                       ref={isMenuOpen ? menuRef : null}
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setOpenMenuId(isMenuOpen ? null : chat._id);
//                         }}
//                         className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-90 transition-all duration-150 text-white/30 hover:text-white/70"
//                       >
//                         <MoreVertical size={14} />
//                       </button>

//                       {isMenuOpen && (
//                         <div className="absolute right-0 top-8 z-[999] w-44 rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDeleteChat(chat._id);
//                             }}
//                             className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors duration-150 text-left"
//                           >
//                             <Trash2 size={14} />
//                             Delete chat
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//           </div>
//         </div>

//         {/* ── CHAT PANEL ── */}
//         <div
//           className={`
//             flex-1 min-w-0
//             ${activeChat ? "flex" : "hidden sm:flex"}
//             flex-col overflow-hidden
//           `}
//         >
//           {!activeChat ? (
//             <div className="flex-1 flex flex-col items-center justify-center text-white/30 text-center gap-3">
//               <MessageCircle
//                 size={48}
//                 strokeWidth={1.5}
//                 className="opacity-40"
//               />
//               <p className="text-[14px] font-medium">
//                 Select a chat to start messaging
//               </p>
//             </div>
//           ) : (
//             <ChatBox
//               chat={activeChat}
//               onBack={() => setActiveChat(null)}
//               onNewMessage={handleNewMessage}
//               onClearMessages={(chatId) => {
//                 setChats((prev) =>
//                   prev.map((c) =>
//                     c._id === chatId ? { ...c, lastMessage: "" } : c,
//                   ),
//                 );
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatView;

import { useEffect, useState, useRef, useContext, useCallback } from "react";
import { MessageCircle, MoreVertical, Trash2 } from "lucide-react";
import ChatBox from "./ChatBox";
import fetchData from "../../utils/fetchData";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { websocketContext } from "../../context/WebSocket";
import SplashScreen from "../SplashScreen";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

// Sort a chats array by lastMessageAt descending (most recent first).
// This is the single place ordering is decided — no splice/unshift anywhere.
function sortChats(chats) {
  return [...chats].sort(
    (a, b) => (b.lastMessageAt || 0) - (a.lastMessageAt || 0),
  );
}

function ChatView() {
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});

  const menuRef = useRef(null);
  const activeChatRef = useRef(null);

   // 2. add state
    const [showSplash, setShowSplash] = useState(true);

  const location = useLocation();
  const { user } = useAuth();
  const myUserId = user?._id;

  const queryParams = new URLSearchParams(location.search);
  const conversationIdFromQuery = queryParams.get("conversation");
  const { messages, onlineUsers } = useContext(websocketContext);

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  // ── React to live WS messages ────────────────────────────────────────────
  //
  // Previously there were TWO separate effects on `messages`:
  //   1. One to update unread counts
  //   2. One to reorder chats
  //
  // They both iterated Object.entries(messages) and both called setChats.
  // Because React batches setState calls within the same event tick, the
  // second setChats would overwrite the first — causing races where the
  // chat list would partially reorder then snap back.
  //
  // Now there is ONE effect that does both jobs atomically in a single
  // setChats call, so the state is always consistent.
  //
  // Ordering strategy: each chat carries a `lastMessageAt` timestamp (ms).
  // We update it whenever a new message arrives for that chat, then sort
  // the whole array by that field. This mirrors how WhatsApp/Instagram work —
  // the most recently active chat is always at the top, regardless of
  // whether you sent or received the message.
  useEffect(() => {
    const entries = Object.entries(messages);
    if (!entries.length) return;

    // Collect the latest message per conversation from the WS state.
    // We process all conversations in one pass so the single setChats call
    // below gets the full picture, not just one conversation at a time.
    const updates = {}; // { chatId: { latestMsg, liveUnread } }

    entries.forEach(([chatId, msgs]) => {
      if (!Array.isArray(msgs) || !msgs.length) return;

      const latest = msgs[msgs.length - 1];
      const activeChatId = activeChatRef.current?._id;

      const liveUnread =
        chatId === activeChatId
          ? 0
          : msgs.filter((m) => m.from !== myUserId && m.status !== "read")
              .length;

      updates[chatId] = { latest, liveUnread };
    });

    if (!Object.keys(updates).length) return;

    // Update chats and unread counts atomically
    setChats((prev) => {
      const next = prev.map((chat) => {
        const update = updates[chat._id];
        if (!update) return chat;

        return {
          ...chat,
          lastMessage: update.latest.text,
          // Store as a number for reliable sort comparison
          lastMessageAt: update.latest.createdAt ?? chat.lastMessageAt,
        };
      });

      return sortChats(next);
    });

    setUnreadCounts((prev) => {
      const next = { ...prev };
      Object.entries(updates).forEach(([chatId, { liveUnread }]) => {
        if (liveUnread === 0) return;
        // Take the max to avoid double-counting with the seeded offline count
        next[chatId] = Math.max(prev[chatId] || 0, liveUnread);
      });
      return next;
    });
  }, [messages, myUserId]);

  // ── Initial fetch ─────────────────────────────────────────────────────────
  // The server sorts by lastMessageAt DESC, so the initial order is correct.
  // We normalise lastMessageAt to a JS timestamp (ms number) here so the
  // client-side sortChats() helper can compare it reliably.
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetchData("/api/chat/conversations", {
          credentials: "include",
        });
        const data = await res.json();

        // Normalise lastMessageAt to ms number and seed unread counts
        const seeded = {};
        const normalised = data.map((chat) => {
          if (chat.unreadCount > 0) seeded[chat._id] = chat.unreadCount;
          return {
            ...chat,
            lastMessageAt: chat.lastMessageAt
              ? new Date(chat.lastMessageAt).getTime()
              : 0,
          };
        });

        setChats(sortChats(normalised));
        if (Object.keys(seeded).length > 0) setUnreadCounts(seeded);
      } catch (err) {
        console.error("Failed to load chats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  // ── Auto-select chat from query param ────────────────────────────────────
  useEffect(() => {
    if (!conversationIdFromQuery || chats.length === 0) return;
    const conversation = chats.find((c) => c._id === conversationIdFromQuery);
    if (conversation) setActiveChat(conversation);
  }, [conversationIdFromQuery, chats]);

  // ── Click-outside to close menu ───────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSelectChat = useCallback((chat) => {
    setActiveChat(chat);
    setUnreadCounts((prev) => ({ ...prev, [chat._id]: 0 }));
    setOpenMenuId(null);
  }, []);

  // Called by ChatBox when the current user sends a message.
  // Updates lastMessage + lastMessageAt and re-sorts so the chat bubbles to top.
  const handleNewMessage = useCallback((chatId, messageText) => {
    const now = Date.now();
    setChats((prev) => {
      const next = prev.map((c) =>
        c._id === chatId
          ? { ...c, lastMessage: messageText, lastMessageAt: now }
          : c,
      );
      return sortChats(next);
    });
  }, []);

  const handleDeleteChat = useCallback(
    async (chatId) => {
      const confirmed = window.confirm("Delete this conversation?");
      if (!confirmed) return;
      try {
        await fetchData(`/api/chat/conversations/${chatId}`, {
          method: "DELETE",
          credentials: "include",
        });
        setChats((prev) => prev.filter((c) => c._id !== chatId));
        setUnreadCounts((prev) => {
          const next = { ...prev };
          delete next[chatId];
          return next;
        });
        if (activeChat?._id === chatId) setActiveChat(null);
      } catch (err) {
        console.error("Failed to delete chat", err);
      }
      setOpenMenuId(null);
    },
    [activeChat],
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-full h-full min-h-0 flex flex-col relative overflow-hidden text-white bg-[#020617]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* ── CHAT LIST ── */}

        {showSplash && (
          <SplashScreen
            onDone={() => setShowSplash(false)}
            config={{
              from: "#10b981",
              to: "#06b6d4",
              glow: "16,185,129",
              title: "Chat",
              duration: 1000,
              icon: (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              ),
            }}
          />
        )}
        <div
          className={`
            w-full sm:w-72 flex-shrink-0
            ${activeChat ? "hidden sm:flex" : "flex"}
            flex-col
            border-r border-white/10
            bg-white/[0.03]
          `}
        >
          <div className="flex-shrink-0 px-4 py-4 border-b border-white/10">
            <h2 className="text-white font-semibold text-[16px] tracking-tight">
              Chats
            </h2>
            <p className="text-white/40 text-[13px] mt-0.5">
              Your conversations
            </p>
          </div>

          <div
            className="flex-1 overflow-y-auto pt-2 pb-2"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {loading && (
              <div className="px-3 py-2 space-y-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-2 py-3 animate-pulse"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/8 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2.5 w-24 bg-white/8 rounded-full" />
                      <div className="h-2 w-32 bg-white/5 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && chats.length === 0 && (
              <p className="p-4 text-white/40 text-[13px]">
                No chats available
              </p>
            )}

            {!loading &&
              chats.map((chat) => {
                const otherUser = chat.participants.find(
                  (p) => p._id !== myUserId,
                );
                const isActive = activeChat?._id === chat._id;
                const isMenuOpen = openMenuId === chat._id;
                const unread = unreadCounts[chat._id] || 0;
                const isOnline = onlineUsers?.has(otherUser?._id?.toString());

                return (
                  <div
                    key={chat._id}
                    className={`
                      relative mx-1 rounded-xl
                      flex items-center
                      transition-all duration-150
                      ${isActive ? "bg-white/10" : "hover:bg-white/5"}
                    `}
                    style={{ width: "calc(100% - 8px)" }}
                  >
                    <button
                      onClick={() => handleSelectChat(chat)}
                      className="flex items-center gap-3 flex-1 min-w-0 px-3 py-3 text-left active:scale-[0.98] transition-all duration-150"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 bg-neutral-800 flex items-center justify-center">
                          {otherUser?.profilePicture ? (
                            <img
                              src={otherUser.profilePicture}
                              alt={otherUser.username}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-semibold text-white">
                              {otherUser?.username?.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>

                        {/* ── Online dot ── */}
                        <span
                          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-[#020617] ${
                            isOnline ? "bg-green-400" : "bg-neutral-600"
                          }`}
                        />

                        {unread > 0 && (
                          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center leading-none shadow-md">
                            {unread > 99 ? "99+" : unread}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p
                            className={`text-[13.5px] font-semibold leading-tight truncate ${
                              unread > 0 ? "text-white" : "text-white/80"
                            }`}
                          >
                            {otherUser?.username}
                          </p>
                        </div>
                        <p
                          className={`text-[12px] truncate mt-0.5 ${
                            unread > 0
                              ? "text-white font-semibold"
                              : "text-white/50 font-normal"
                          }`}
                        >
                          {chat.lastMessage
                            ? chat.lastMessage.slice(0, 28) +
                              (chat.lastMessage.length > 28 ? "…" : "")
                            : "Start chatting"}
                        </p>
                      </div>
                    </button>

                    <div
                      className="relative flex-shrink-0 pr-2"
                      ref={isMenuOpen ? menuRef : null}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(isMenuOpen ? null : chat._id);
                        }}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-90 transition-all duration-150 text-white/30 hover:text-white/70"
                      >
                        <MoreVertical size={14} />
                      </button>

                      {isMenuOpen && (
                        <div className="absolute right-0 top-8 z-[999] w-44 rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChat(chat._id);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors duration-150 text-left"
                          >
                            <Trash2 size={14} />
                            Delete chat
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* ── CHAT PANEL ── */}
        <div
          className={`
            flex-1 min-w-0
            ${activeChat ? "flex" : "hidden sm:flex"}
            flex-col overflow-hidden
          `}
        >
          {!activeChat ? (
            <div className="flex-1 flex flex-col items-center justify-center text-white/30 text-center gap-3">
              <MessageCircle
                size={48}
                strokeWidth={1.5}
                className="opacity-40"
              />
              <p className="text-[14px] font-medium">
                Select a chat to start messaging
              </p>
            </div>
          ) : (
            <ChatBox
              chat={activeChat}
              onBack={() => setActiveChat(null)}
              onNewMessage={handleNewMessage}
              onClearMessages={(chatId) => {
                setChats((prev) =>
                  prev.map((c) =>
                    c._id === chatId ? { ...c, lastMessage: "" } : c,
                  ),
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatView;