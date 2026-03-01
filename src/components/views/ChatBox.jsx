// import { ArrowLeft } from "lucide-react";
// import { useContext, useState, useMemo, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";

// import { getChatMessages } from "../../utils/getMessages";
// import { saveMessage } from "../../utils/saveMessage";
// import fetchData from "../../utils/fetchData";

// /* ======================================================
//    CANONICAL MESSAGE ID NORMALIZER
// ====================================================== */
// const normalizeMessageId = (m) => m.messageId;

// function ChatBox({ chat, onBack }) {
//   const { user } = useAuth();
//   const { sendSignal, messages, setMessages } = useContext(websocketContext);

//   const [text, setText] = useState("");
//   const myUserId = user._id;

//   /* ======================================================
//      FILTER MESSAGES FOR THIS CHAT
//   ====================================================== */
//   const chatMessages = useMemo(() => {
//     return messages.filter(
//       (m) =>
//         (m.from === myUserId && m.to === chat._id) ||
//         (m.from === chat._id && m.to === myUserId),
//     );
//   }, [messages, chat._id, myUserId]);

//   /* ======================================================
//      SEND MESSAGE
//   ====================================================== */
//   const handleSend = async () => {
//     if (!text.trim()) return;

//     const messageId = uuidv4();
//     const createdAt = Date.now();

//     // Optimistic UI
//     setMessages((prev) => [
//       ...prev,
//       {
//         messageId,
//         from: myUserId,
//         to: chat._id,
//         text,
//         status: "sending",
//         createdAt,
//       },
//     ]);

//     // Save to IndexedDB / backend
//     saveMessage({
//       type: "chat_message",
//       message: {
//         messageId,
//         from: myUserId,
//         to: chat._id,
//         text,
//         createdAt,
//       },
//     });

//     // Send via WebSocket
//     sendSignal({
//       type: "chat_message",
//       messageId,
//       to: chat._id,
//       text,
//       createdAt,
//     });

//     setText("");
//   };

//   /* ======================================================
//      LOAD FROM INDEXED DB
//   ====================================================== */
//   useEffect(() => {
//     if (!chat?._id) return;

//     const loadFromIndexedDB = async () => {
//       const cachedMessages = await getChatMessages(myUserId, chat._id);

//       setMessages((prev) => {
//         const existingIds = new Set(prev.map(normalizeMessageId));
//         const newOnes = cachedMessages.filter(
//           (m) => !existingIds.has(normalizeMessageId(m)),
//         );
//         return [...prev, ...newOnes];
//       });
//     };

//     loadFromIndexedDB();
//   }, [chat._id, myUserId, setMessages]);

//   /* ======================================================
//      FETCH FROM BACKEND
//   ====================================================== */
//   useEffect(() => {
//     if (!chat?._id) return;

//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(`/api/chat/messages/${chat._id}`, {
//           credentials: "include",
//         });

//         const data = await res.json();

//         // 🔥 USE messageId FROM BACKEND (NOT _id)
//         const fetchedMessages = data.map((msg) => ({
//           messageId: msg.messageId,
//           from: msg.senderId,
//           to: msg.receiverId,
//           text: msg.text,
//           status: msg.status || "sent",
//           createdAt: new Date(msg.createdAt).getTime(),
//         }));

//         setMessages((prev) => {
//           const existingIds = new Set(prev.map(normalizeMessageId));
//           const newOnes = fetchedMessages.filter(
//             (m) => !existingIds.has(normalizeMessageId(m)),
//           );
//           return [...prev, ...newOnes];
//         });
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       }
//     };

//     fetchMessages();
//   }, [chat._id, setMessages]);

//   return (
// <div className="flex flex-col h-full w-full">      {/* HEADER */}
//       <div className="px-4 py-4 border-b border-white/20 flex items-center gap-3 text-white">
//         <button
//           onClick={onBack}
//           className="sm:hidden p-2 rounded-lg hover:bg-white/20 transition"
//         >
//           <ArrowLeft size={20} />
//         </button>

//         <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0">
//           {chat.profilePicture ? (
//             <img
//               src={chat.profilePicture}
//               alt={chat.username}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-sm font-semibold">
//               {chat.username?.[0]?.toUpperCase() || "U"}
//             </span>
//           )}
//         </div>

//         <h3 className="font-semibold text-lg">{chat.username}</h3>
//       </div>

//       {/* MESSAGES */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
//         {chatMessages.length === 0 && (
//           <div className="text-center text-white/60 text-sm">
//             Start a conversation with {chat.username}
//           </div>
//         )}

//         {chatMessages.map((msg) => {
//           const isMe = msg.from === myUserId;

//           return (
//             <div
//               key={normalizeMessageId(msg)}
//               className={`flex items-end gap-2 ${
//                 isMe ? "justify-end" : "justify-start"
//               }`}
//             >
//               {!isMe && (
//                 <div className="w-6 h-6 rounded-full bg-neutral-600 flex items-center justify-center text-xs font-semibold text-white">
//                   {chat.username?.[0]?.toUpperCase() || "U"}
//                 </div>
//               )}

//               <div
//                 className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm text-white ${
//                   isMe ? "bg-indigo-600" : "bg-white/20"
//                 }`}
//               >
//                 <p>{msg.text}</p>
//               </div>

//               {isMe && (
//                 <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white">
//                   {user.username?.[0]?.toUpperCase() || "Y"}
//                 </div>
//               )}
//             </div>
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
// import { useContext, useState, useMemo, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { websocketContext } from "../../context/WebSocket";
// import { useAuth } from "../../hooks/useAuth";

// import { getChatMessages } from "../../utils/getMessages";
// import { saveMessage } from "../../utils/saveMessage";
// import fetchData from "../../utils/fetchData";

// const normalizeMessageId = (m) => m.messageId;

// function ChatBox({ chat, onBack }) {
//   const { user } = useAuth();

//   const { sendSignal, messages, setMessages } = useContext(websocketContext);

//   const [text, setText] = useState("");

//   const myUserId = user._id;

//   const conversationId = chat._id;

//   // ✅ Find other user
//   // const otherUser = chat.participants.find((p) => p._id !== myUserId);

//   const otherUser = chat.participants?.find((p) => p._id !== myUserId);

//   const receiverId = otherUser._id;

//   /* ===============================
//      FILTER MESSAGES
//   =============================== */

//   console.log("these are messages",messages)
//   const chatMessages = useMemo(() => {
//     return messages.filter((m) => m.conversationId === conversationId);
//   }, [messages, conversationId]);

//   /* ===============================
//      SEND MESSAGE
//   =============================== */

//   const handleSend = async () => {
//     if (!text.trim()) return;

//     const messageId = uuidv4();

//     const createdAt = Date.now();

//     // Optimistic UI

//     setMessages((prev) => [
//       ...prev,

//       {
//         messageId,

//         conversationId,

//         from: myUserId,

//         to: receiverId,

//         text,

//         status: "sending",

//         createdAt,
//       },
//     ]);

//     saveMessage({
//       type: "chat_message",

//       message: {
//         messageId,

//         conversationId,

//         from: myUserId,

//         to: receiverId,

//         text,

//         createdAt,
//       },
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

//   /* ===============================
//      LOAD INDEXED DB
//   =============================== */

//   useEffect(() => {
//     if (!conversationId) return;

//     // const load = async () => {
//     //   const cached = await getChatMessages(myUserId , receiverId);

//     //   setMessages((prev) => {
//     //     const existing = new Set(prev.map(normalizeMessageId));

//     //     const newOnes = cached?.filter(
//     //       (m) => !existing.has(normalizeMessageId(m)),
//     //     );

//     //     return [...prev, ...newOnes];
//     //   });
//     // };

//     // load();
//   }, [conversationId]);

//   /* ===============================
//      FETCH BACKEND
//   =============================== */

//   useEffect(() => {
//     if (!conversationId) return;

//     const fetchMessages = async () => {
//       try {
//         const res = await fetchData(
//           `/api/chat/messages/${conversationId}`,

//           { credentials: "include" },
//         );

//         const data = await res.json();

//         const formatted = data.map((msg) => ({
//           messageId: msg.messageId,

//           conversationId: msg.conversationId,

//           from: msg.senderId,

//           to: msg.receiverId,

//           text: msg.text,

//           status: msg.status || "sent",

//           createdAt: new Date(msg.createdAt).getTime(),
//         }));

//         setMessages((prev) => {
//           const existing = new Set(prev.map(normalizeMessageId));

//           const newOnes = formatted.filter(
//             (m) => !existing.has(normalizeMessageId(m)),
//           );

//           return [...prev, ...newOnes];
//         });
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       }
//     };

//     fetchMessages();
//   }, [conversationId]);

//   /* ===============================
//      UI (RESTORED ORIGINAL STYLE)
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

//       <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
//         {chatMessages.length === 0 && (
//           <div className="text-center text-white/60 text-sm">
//             Start a conversation with {otherUser.username}
//           </div>
//         )}

//         {chatMessages.map((msg) => {
//           const isMe = msg.from === myUserId;

//           return (
//             <div
//               key={msg.messageId}
//               className={`flex items-end gap-2

//                 ${isMe ? "justify-end" : "justify-start"}

//               `}
//             >
//               {!isMe && (
//                 <div className="w-6 h-6 rounded-full bg-neutral-600 flex items-center justify-center text-xs font-semibold text-white">
//                   {otherUser.username?.[0]?.toUpperCase()}
//                 </div>
//               )}

//               <div
//                 className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm text-white

//                 ${isMe ? "bg-indigo-600" : "bg-white/20"}

//               `}
//               >
//                 {msg.text}
//               </div>

//               {isMe && (
//                 <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white">
//                   {user.username?.[0]?.toUpperCase()}
//                 </div>
//               )}
//             </div>
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
import { useContext, useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { websocketContext } from "../../context/WebSocket";
import { useAuth } from "../../hooks/useAuth";

import { getChatMessages } from "../../utils/getMessages";
import { saveMessage } from "../../utils/saveMessage";
import fetchData from "../../utils/fetchData";

const normalizeMessageId = (m) => m.messageId;

function ChatBox({ chat, onBack }) {
  const { user } = useAuth();

  const { sendSignal, messages, setMessages } = useContext(websocketContext);

  const [text, setText] = useState("");

  const myUserId = user._id;

  console.log("user from auth", user);

  // ✅ FIX: Always use string
  const conversationId = chat._id.toString();

  console.log("chat prop", chat);

  // ✅ Safe find
  const otherUser = chat.participants?.find((p) => p._id !== myUserId);

  // ✅ Guard (prevents crash)
  if (!otherUser) return null;

  const receiverId = otherUser._id;

  /* ===============================
     FILTER MESSAGES
  =============================== */

  console.log("these are messages", messages);
  console.log("conversationId", conversationId);

  // const chatMessages = useMemo(() => {
  //   return messages.filter(
  //     (m) => m.conversationId && m.conversationId.toString() === conversationId,
  //   );
  // }, [messages, conversationId]);

  /* ===============================
     SEND MESSAGE
  =============================== */

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

    // saveMessage({
    //   type: "chat_message",
    //   message: {
    //     messageId,
    //     conversationId,
    //     from: myUserId,
    //     to: receiverId,
    //     text,
    //     createdAt,
    //   },
    // });

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

  /* ===============================
     FETCH BACKEND
  =============================== */

  // useEffect(() => {
  //   if (!conversationId) return;


  //   const fetchMessages = async () => {
  //     try {
  //       const res = await fetchData(`/api/chat/messages/${conversationId}`, {
  //         credentials: "include",
  //       });

  //       const data = await res.json();
        
  //       console.log("Fetched messages from backend:", data);

  //       const formatted = data.map((msg) => ({
  //         messageId: msg.messageId,

  //         // ✅ FIX: force string
          
  //               // conversationId: msg.conversationId.toString(),

  //         conversationId,
  //         from: msg.senderId,

  //         to: msg.receiverId,

  //         text: msg.text,

  //         status: msg.status || "sent",

  //         createdAt: new Date(msg.createdAt).getTime(),
  //       }));

  //       setMessages((prev) => {
  //         const existing = new Set(prev.map(normalizeMessageId));

  //         const newOnes = formatted.filter(
  //           (m) => !existing.has(normalizeMessageId(m)),
  //         );

  //         return [...prev, ...newOnes];
  //       });
  //     } catch (err) {
  //       console.error("Failed to fetch messages", err);
  //     }
  //   };

  //   fetchMessages();
  // }, [conversationId, setMessages]);

  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetchData(`/api/chat/messages/${conversationId}`, {
          credentials: "include",
        });

        const data = await res.json();

        console.log("Fetched messages from backend:", data);

        // ✅ VERY IMPORTANT: ensure it's array
        const messagesArray = Array.isArray(data) ? data : data.messages || [];

        const formatted = messagesArray.map((msg) => ({
          messageId: msg.messageId,

          // ✅ ALWAYS use current conversationId (simple and safe)
          conversationId: conversationId,

          from: msg.senderId,

          to: msg.receiverId,

          text: msg.text,

          status: msg.status || "sent",

          createdAt: new Date(msg.createdAt).getTime(),
        }));

        // ✅ simple merge (no duplicates)
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

  /* ===============================
     UI
  =============================== */

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

        <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0">
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

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {(!messages[conversationId] ||
          messages[conversationId].length === 0) && (
          <div className="text-center text-white/60 text-sm">
            Start a conversation with {otherUser.username}
          </div>
        )}
        {(messages[conversationId] || []).map((msg) => {
          const isMe = msg.from === myUserId;

          return (
            <div
              key={msg.messageId}
              className={`flex items-end gap-2 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {!isMe && (
                <div className="w-6 h-6 rounded-full bg-neutral-600 flex items-center justify-center text-xs font-semibold text-white">
                  {otherUser.username?.[0]?.toUpperCase()}
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm text-white ${
                  isMe ? "bg-indigo-600" : "bg-white/20"
                }`}
              >
                {msg.text}
              </div>

              {isMe && (
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white">
                  {user.username?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
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