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

import { useEffect, useState, useRef, useContext } from "react";
import { MessageCircle, MoreVertical, Trash2 } from "lucide-react";
import ChatBox from "./ChatBox";
import fetchData from "../../utils/fetchData";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { websocketContext } from "../../context/WebSocket";

function ChatView() {
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const location = useLocation();
  const { user } = useAuth();
  const myUserId = user?._id;

  const queryParams = new URLSearchParams(location.search);
  const conversationIdFromQuery = queryParams.get("conversation");
   const { messages } = useContext(websocketContext);

  useEffect(() => {
    const allMessages = Object.entries(messages);
    if (!allMessages.length) return;

    allMessages.forEach(([chatId, msgs]) => {
      if (!msgs.length) return;
      const latest = msgs[msgs.length - 1];
      // only update if message is from the other user (not me)
      if (latest.from !== user?._id) {
        setChats((prev) => {
          const updated = prev.map((c) =>
            c._id === chatId ? { ...c, lastMessage: latest.text } : c,
          );
          const chatIndex = updated.findIndex((c) => c._id === chatId);
          if (chatIndex > 0) {
            const [chat] = updated.splice(chatIndex, 1);
            updated.unshift(chat);
          }
          return [...updated];
        });
      }
    });
  }, [messages]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetchData("/api/chat/conversations", {
          credentials: "include",
        });
        const data = await res.json();
        console.log("conversations yaai hain ,data", data);
        setChats(data);
      } catch (err) {
        console.error("Failed to load chats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    if (!conversationIdFromQuery || chats.length === 0) return;
    const conversation = chats.find((c) => c._id === conversationIdFromQuery);
    if (conversation) setActiveChat(conversation);
  }, [conversationIdFromQuery, chats]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleNewMessage = (chatId, messageText) => {
    setChats((prev) => {
      const updated = prev.map((c) =>
        c._id === chatId ? { ...c, lastMessage: messageText } : c,
      );
      // move the updated chat to the top
      const chatIndex = updated.findIndex((c) => c._id === chatId);
      if (chatIndex > 0) {
        const [chat] = updated.splice(chatIndex, 1);
        updated.unshift(chat);
      }
      return [...updated];
    });
  };

  const handleDeleteChat = async (chatId) => {
    const confirmed = window.confirm("Delete this conversation?");
    if (!confirmed) return;
    try {
      await fetchData(`/api/chat/conversations/${chatId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setChats((prev) => prev.filter((c) => c._id !== chatId));
      if (activeChat?._id === chatId) setActiveChat(null);
    } catch (err) {
      console.error("Failed to delete chat", err);
    }
    setOpenMenuId(null);
  };

  return (
    // ✅ h-full instead of height: 100dvh — Layout's <main> already controls height
    // ✅ min-h-0 so flex children can shrink properly
    <div className="w-full h-full min-h-0 flex flex-col overflow-hidden text-white bg-[#020617]">
      {/* ── MAIN ROW (list + panel) ── */}
      {/* ✅ min-h-0 here too — critical for nested flex scroll to work */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* ── CHAT LIST ── */}
        <div
          className={`
            w-full sm:w-72 flex-shrink-0
            ${activeChat ? "hidden sm:flex" : "flex"}
            flex-col
            border-r border-white/10
            bg-white/[0.03]
          `}
        >
          {/* Header */}
          <div className="flex-shrink-0 px-4 py-4 border-b border-white/10">
            <h2 className="text-white font-semibold text-[16px] tracking-tight">
              Chats
            </h2>
            <p className="text-white/40 text-[13px] mt-0.5">
              Your conversations
            </p>
          </div>

          {/* List */}
          <div
            className="flex-1 overflow-y-auto pt-2 pb-2"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Loading */}
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

            {/* Empty */}
            {!loading && chats.length === 0 && (
              <p className="p-4 text-white/40 text-[13px]">
                No chats available
              </p>
            )}

            {/* Rows */}
            {!loading &&
              chats.map((chat) => {
                const otherUser = chat.participants.find(
                  (p) => p._id !== myUserId,
                );
                const isActive = activeChat?._id === chat._id;
                const isMenuOpen = openMenuId === chat._id;

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
                    {/* Clickable row */}
                    <button
                      onClick={() => setActiveChat(chat)}
                      className="flex items-center gap-3 flex-1 min-w-0 px-3 py-3 text-left active:scale-[0.98] transition-all duration-150"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10 bg-neutral-800 flex items-center justify-center">
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
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] font-semibold text-white leading-tight truncate">
                          {otherUser?.username}
                        </p>
                        <p className="text-[12px] text-white/35 truncate mt-0.5">
                          {chat.lastMessage
                            ? chat.lastMessage.slice(0, 24) +
                              (chat.lastMessage.length > 24 ? "…" : "")
                            : "Start chatting"}
                        </p>
                      </div>
                    </button>

                    {/* ── THREE DOTS ── */}
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

                      {/* Dropdown */}
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

          {/* ✅ REMOVED: footer spacer div — Footer is no longer fixed, no spacer needed */}
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
                // ← add this
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