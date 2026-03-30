// import React from "react";

// const MessageBubble = React.memo(function MessageBubble({
//   msg,
//   isMe,
//   otherUser,
//   user,
// }) {

//   return (
//     <div
//       className={`flex items-end gap-2 min-w-0 ${
//         isMe ? "justify-end" : "justify-start"
//       }`}
//     >
//       {!isMe && (
//         <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-600 shrink-0">
//           {otherUser?.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </div>
//           )}
//         </div>
//       )}

//       <div
//         className={`min-w-14 max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed text-white break-words shadow-sm backdrop-blur-sm ${
//           isMe ? "bg-indigo-600/95 rounded-br-md" : "bg-white/20 rounded-bl-md"
//         }`}
//       >
//         {msg.image && (
//           <img
//             src={msg.image}
//             alt="message"
//             className="rounded-xl mb-2 max-h-64 object-cover"
//           />
//         )}

//         {msg.text && <div className="tracking-wide">{msg.text}</div>}
//       </div>

//       {isMe && (
//         <div className="w-6 h-6 rounded-full overflow-hidden bg-indigo-600 shrink-0">
//           {user?.profilePicture ? (
//             <img
//               src={user.profilePicture}
//               alt={user.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
//               {user.username?.[0]?.toUpperCase()}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// });

// export default MessageBubble;

// import React from "react";

// const MessageBubble = React.memo(function MessageBubble({
//   msg,
//   isMe,
//   otherUser,
//   user,
// }) {
//   return (
//     <div
//       className={`flex items-end gap-2 min-w-0 ${
//         isMe ? "justify-end" : "justify-start"
//       }`}
//       style={{ transform: "translateZ(0)" }}
//     >
//       {!isMe && (
//         <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-600 shrink-0">
//           {otherUser?.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </div>
//           )}
//         </div>
//       )}

//       <div
//         className={`
//           min-w-14
//           max-w-[70%]
//           sm:max-w-[55%]
//           md:max-w-[50%]
//           lg:max-w-[45%]
//           xl:max-w-[40%]
//           rounded-2xl px-4 py-2.5 text-sm leading-relaxed text-white break-words shadow-sm
//           ${isMe ? "bg-indigo-600/95 rounded-br-md" : "bg-white/20 rounded-bl-md"}
//         `}
//         style={{ transform: "translateZ(0)", willChange: "transform" }}
//       >
//         {msg.image && (
//           <img
//             src={msg.image}
//             alt="message"
//             className="rounded-xl mb-2 max-h-64 object-cover"
//           />
//         )}

//         {msg.text && <div className="tracking-wide">{msg.text}</div>}
//       </div>

//       {isMe && (
//         <div className="w-6 h-6 rounded-full overflow-hidden bg-indigo-600 shrink-0">
//           {user?.profilePicture ? (
//             <img
//               src={user.profilePicture}
//               alt={user.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
//               {user.username?.[0]?.toUpperCase()}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// });

// export default MessageBubble;

// import React from "react";

// const MessageBubble = React.memo(function MessageBubble({
//   msg,
//   isMe,
//   otherUser,
//   user,
// }) {
//   return (
//     <div
//       className={`flex items-end gap-2 min-w-0 ${
//         isMe ? "justify-end" : "justify-start"
//       }`}
//       style={{ transform: "translateZ(0)" }}
//     >
//       {!isMe && (
//         <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-600 shrink-0">
//           {otherUser?.profilePicture ? (
//             <img
//               src={otherUser.profilePicture}
//               alt={otherUser.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
//               {otherUser.username?.[0]?.toUpperCase()}
//             </div>
//           )}
//         </div>
//       )}

//       <div
//         className={`
//           relative
//           min-w-14
//           max-w-[70%]
//           sm:max-w-[55%]
//           md:max-w-[50%]
//           lg:max-w-[45%]
//           xl:max-w-[40%]
//           px-4 py-2.5 text-sm leading-relaxed text-white break-words shadow-sm
//          ${
//            isMe
//              ? "bg-indigo-600/95 rounded-tl-2xl  rounded-tr-2xl rounded-bl-2xl rounded-br-none"
//              : "bg-white/20 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none"
//          }
//         `}
//         style={{ transform: "translateZ(0)", willChange: "transform" }}
//       >
//         {msg.image && (
//           <img
//             src={msg.image}
//             alt="message"
//             className="rounded-xl mb-2 max-h-64 object-cover"
//           />
//         )}

//         {msg.text && <div className="tracking-wide ">{msg.text}</div>}
//       </div>

//       {isMe && (
//         <div className="w-6 h-6 rounded-full overflow-hidden bg-indigo-600 shrink-0">
//           {user?.profilePicture ? (
//             <img
//               src={user.profilePicture}
//               alt={user.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
//               {user.username?.[0]?.toUpperCase()}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// });

// export default MessageBubble;

// import React from "react";

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

// const MessageBubble = React.memo(
//   function MessageBubble({ msg, isMe, otherUser, user }) {
//     return (
//       <div
//         className={`flex items-end gap-2 min-w-0 ${isMe ? "justify-end" : "justify-start"}`}
//         style={{ transform: "translateZ(0)" }}
//       >
//         {!isMe && (
//           <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-600 shrink-0">
//             {otherUser?.profilePicture ? (
//               <img
//                 src={otherUser.profilePicture}
//                 alt={otherUser.username}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
//                 {otherUser.username?.[0]?.toUpperCase()}
//               </div>
//             )}
//           </div>
//         )}

//         <div
//           className={`
//             relative min-w-14
//             max-w-[70%] sm:max-w-[55%] md:max-w-[50%] lg:max-w-[45%] xl:max-w-[40%]
//             px-4 py-2.5 text-sm leading-relaxed text-white break-words shadow-sm
//             ${
//               isMe
//                 ? "bg-indigo-600/95 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none"
//                 : "bg-white/20 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none"
//             }
//           `}
//           style={{ transform: "translateZ(0)", willChange: "transform" }}
//         >
//           {msg.image && (
//             <img
//               src={msg.image}
//               alt="message"
//               className="rounded-xl mb-2 max-h-64 object-cover"
//             />
//           )}
//           {msg.text && <div className="tracking-wide">{msg.text}</div>}

//           {/* Status ticks inside bubble — bottom right */}
//           {isMe && (
//             <div className="flex justify-end mt-1 -mb-1">
//               <MessageStatus status={msg.status} />
//             </div>
//           )}
//         </div>

//         {isMe && (
//           <div className="w-6 h-6 rounded-full overflow-hidden bg-indigo-600 shrink-0">
//             {user?.profilePicture ? (
//               <img
//                 src={user.profilePicture}
//                 alt={user.username}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
//                 {user.username?.[0]?.toUpperCase()}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   },
//   (prev, next) =>
//     prev.msg.messageId === next.msg.messageId &&
//     prev.msg.status === next.msg.status &&
//     prev.msg.text === next.msg.text,
// );

// export default MessageBubble;

// import React from "react";

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

// const MessageBubble = React.memo(
//   function MessageBubble({ msg, isMe, otherUser, user }) {
//     return (
//       <div
//         className={`flex items-end gap-2 min-w-0 ${isMe ? "justify-end" : "justify-start"}`}
//         style={{ transform: "translateZ(0)" }}
//       >
//         {/* Avatar — received (left) */}
//         {!isMe && (
//           <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-600 shrink-0">
//             {otherUser?.profilePicture ? (
//               <img
//                 src={otherUser.profilePicture}
//                 alt={otherUser.username}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
//                 {otherUser.username?.[0]?.toUpperCase()}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Bubble */}
//         <div
//           className={`
//             relative min-w-14
//             max-w-[70%] sm:max-w-[55%] md:max-w-[50%] lg:max-w-[45%] xl:max-w-[40%]
//             px-4 py-2.5 text-sm leading-relaxed text-white break-words
//             ${isMe ? "bg-indigo-600/95" : "bg-neutral-800/85 backdrop-blur-sm shadow-lg"}
//           `}
//           style={{
//             transform: "translateZ(0)",
//             willChange: "transform",
//             borderRadius: isMe
//               ? "18px 18px 4px 18px" // top-left top-right bottom-right bottom-left — sharp bottom-right for sent
//               : "18px 18px 18px 4px", // sharp bottom-left for received
//           }}
//         >
//           {msg.image && (
//             <img
//               src={msg.image}
//               alt="message"
//               className="rounded-xl mb-2 max-h-64 object-cover"
//             />
//           )}
//           {msg.text && <div className="tracking-wide">{msg.text}</div>}

//           {isMe && (
//             <div className="flex justify-end mt-1 -mb-1">
//               <MessageStatus status={msg.status} />
//             </div>
//           )}
//         </div>

//         {/* Avatar — sent (right) */}
//         {isMe && (
//           <div className="w-6 h-6 rounded-full overflow-hidden bg-indigo-600 shrink-0">
//             {user?.profilePicture ? (
//               <img
//                 src={user.profilePicture}
//                 alt={user.username}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
//                 {user.username?.[0]?.toUpperCase()}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   },
//   (prev, next) =>
//     prev.msg.messageId === next.msg.messageId &&
//     prev.msg.status === next.msg.status &&
//     prev.msg.text === next.msg.text,
// );

// export default MessageBubble;

//

//

// import React from "react";

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

// const MessageBubble = React.memo(
//   function MessageBubble({ msg, isMe, otherUser, user }) {
//     const sentColor = "#4f46e5";
//     const receivedColor = "#262626";
//     const bubbleColor = isMe ? sentColor : receivedColor;

//     return (
//       <div
//         className={`flex items-end gap-2 min-w-0 ${isMe ? "justify-end" : "justify-start"}`}
//       >
//         {/* Avatar — received */}
//         {!isMe && (
//           <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-600 shrink-0 self-end">
//             {otherUser?.profilePicture ? (
//               <img
//                 src={otherUser.profilePicture}
//                 alt={otherUser.username}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
//                 {otherUser?.username?.[0]?.toUpperCase()}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Bubble + Tail wrapper — drop-shadow on wrapper unifies both shapes */}
//         <div
//           className="relative max-w-[70%] sm:max-w-[55%] md:max-w-[50%] lg:max-w-[45%] xl:max-w-[40%]"
//           style={{
//             marginBottom: "28px",
//             filter: isMe
//               ? "drop-shadow(0 6px 16px rgba(79,70,229,0.45))"
//               : "drop-shadow(0 6px 16px rgba(0,0,0,0.5))",
//           }}
//         >
//           {/* Bubble — solid hex color, no boxShadow, no opacity modifier */}
//           <div
//             className="relative min-w-14 px-4 py-2.5 text-sm leading-relaxed text-white break-words"
//             style={{
//               backgroundColor: bubbleColor,
//               borderRadius: isMe ? "18px 18px 0px 18px" : "18px 18px 18px 0px",
//             }}
//           >
//             {msg.image && (
//               <img
//                 src={msg.image}
//                 alt="message"
//                 className="rounded-xl mb-2 max-h-64 object-cover"
//               />
//             )}
//             {msg.text && <div className="tracking-wide">{msg.text}</div>}
//             {isMe && (
//               <div className="flex justify-end mt-1 -mb-1">
//                 <MessageStatus status={msg.status} />
//               </div>
//             )}
//           </div>

//           {/* Tail — same exact color, zero offset so it's flush */}
//           <svg
//             width="18"
//             height="10"
//             viewBox="0 0 18 10"
//             style={{
//               position: "absolute",
//               bottom: "-9px",
//               ...(isMe ? { right: "0px" } : { left: "0px" }),
//               display: "block",
//             }}
//           >
//             {isMe ? (
//               <polygon points="0,0 18,0 18,10" fill={bubbleColor} />
//             ) : (
//               <polygon points="0,0 18,0 0,10" fill={bubbleColor} />
//             )}
//           </svg>
//         </div>

//         {/* Avatar — sent */}
//         {isMe && (
//           <div className="w-7 h-7 rounded-full overflow-hidden bg-indigo-600 shrink-0 self-end">
//             {user?.profilePicture ? (
//               <img
//                 src={user.profilePicture}
//                 alt={user.username}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
//                 {user?.username?.[0]?.toUpperCase()}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   },
//   (prev, next) =>
//     prev.msg.messageId === next.msg.messageId &&
//     prev.msg.status === next.msg.status &&
//     prev.msg.text === next.msg.text,
// );

// export default MessageBubble;

import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// MessageStatus
// Single source of truth for tick rendering. This file's version supersedes
// the one previously duplicated inside ChatBox.jsx.
//
// Status lifecycle (outgoing messages only — never rendered on incoming):
//   "sending"   → single dim tick    (optimistic, not yet ACK'd)
//   "sent"      → single grey tick   (server confirmed storage)
//   "delivered" → double grey ticks  (recipient device received)
//   "read"      → double blue ticks  (recipient opened the chat)
//   "blocked"   → red "Not delivered"
// ─────────────────────────────────────────────────────────────────────────────
function MessageStatus({ status }) {
  if (status === "blocked") {
    return (
      <span style={{ fontSize: 10, color: "#f87171", lineHeight: 1 }}>
        Not delivered
      </span>
    );
  }

  if (status === "sending") {
    // Dimmer tick — visually signals "in flight"
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M1 5l3 3 5-6"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (status === "sent") {
    // Single grey tick — stored on server, not yet delivered
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M1 5l3 3 5-6"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (status === "delivered") {
    // Double grey ticks
    return (
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
        <path
          d="M1 5l3 3 5-6"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 5l3 3 5-6"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (status === "read") {
    // Double blue ticks
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

  // Fallback — treat unknown status as "sent"
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M1 5l3 3 5-6"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MessageBubble
// ─────────────────────────────────────────────────────────────────────────────
const MessageBubble = React.memo(
  function MessageBubble({ msg, isMe, otherUser, user }) {
    const sentColor = "#4f46e5";
    const receivedColor = "#262626";
    const bubbleColor = isMe ? sentColor : receivedColor;

    return (
      <div
        className={`flex items-end gap-2 min-w-0 ${
          isMe ? "justify-end" : "justify-start"
        }`}
      >
        {/* Avatar — received side */}
        {!isMe && (
          <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-600 shrink-0 self-end mb-[10px]">
            {otherUser?.profilePicture ? (
              <img
                src={otherUser.profilePicture}
                alt={otherUser.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
                {otherUser?.username?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
        )}

        {/*
         * Bubble + tail wrapper.
         *
         * FIX 1 — marginBottom removed.
         * The old code had `marginBottom: "28px"` hardcoded on every bubble.
         * This created a massive fixed gap below every message that caused
         * the list to visually jump whenever a status update changed the
         * bubble's height slightly. The tail sits flush at the bottom of the
         * bubble now; the avatar uses `mb-[10px]` to align with the tail tip.
         *
         * FIX 2 — drop-shadow filter removed.
         * `filter: drop-shadow(...)` forces the browser to create a new
         * compositing layer for every bubble. With 50+ messages visible,
         * this meant 50+ GPU layers during scroll — a major source of
         * dropped frames on mid-range devices. Replaced with a simple
         * `boxShadow` on the bubble div itself, which composites cheaply.
         *
         * FIX 3 — tail is now inside the bubble's padding-bottom space
         * rather than positioned relative to the wrapper, so it stays
         * flush regardless of zoom level or font scaling.
         */}
        <div
          className="relative max-w-[70%] sm:max-w-[55%] md:max-w-[50%] lg:max-w-[45%] xl:max-w-[40%]"
          style={{ paddingBottom: "10px" }}
        >
          {/* Bubble */}
          <div
            className="relative min-w-14 px-4 py-2.5 text-sm leading-relaxed text-white break-words"
            style={{
              backgroundColor: bubbleColor,
              borderRadius: isMe ? "18px 18px 0px 18px" : "18px 18px 18px 0px",
              boxShadow: isMe
                ? "0 4px 14px rgba(79,70,229,0.4)"
                : "0 4px 14px rgba(0,0,0,0.4)",
            }}
          >
            {msg.image && (
              <img
                src={msg.image}
                alt="message"
                className="rounded-xl mb-2 max-h-64 object-cover"
              />
            )}
            {msg.text && <div className="tracking-wide">{msg.text}</div>}
            {/* Tick row — only on outgoing messages */}
            {isMe && (
              <div className="flex justify-end items-center mt-1 -mb-0.5 gap-1">
                <MessageStatus status={msg.status} />
              </div>
            )}
          </div>

          {/* Tail — sits inside the paddingBottom space, flush with bubble */}
          <svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              ...(isMe ? { right: 0 } : { left: 0 }),
              display: "block",
              // Prevent the tail from interfering with pointer events on
              // adjacent elements (it's purely decorative)
              pointerEvents: "none",
            }}
          >
            {isMe ? (
              <polygon points="0,0 18,0 18,10" fill={bubbleColor} />
            ) : (
              <polygon points="0,0 18,0 0,10" fill={bubbleColor} />
            )}
          </svg>
        </div>

        {/* Avatar — sent side */}
        {isMe && (
          <div className="w-7 h-7 rounded-full overflow-hidden bg-indigo-600 shrink-0 self-end mb-[10px]">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
                {user?.username?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
  // ── Memo comparator ────────────────────────────────────────────────────
  // FIX: The old comparator only checked msg.messageId, msg.status, and
  // msg.text. It omitted isMe, otherUser, and user — so if a profile
  // picture loaded after the first render, the avatar would never update.
  // Now we check every prop that affects visual output.
  (prev, next) =>
    prev.msg.messageId === next.msg.messageId &&
    prev.msg.status === next.msg.status &&
    prev.msg.text === next.msg.text &&
    prev.msg.image === next.msg.image &&
    prev.isMe === next.isMe &&
    prev.otherUser?.profilePicture === next.otherUser?.profilePicture &&
    prev.user?.profilePicture === next.user?.profilePicture,
);

export default MessageBubble;