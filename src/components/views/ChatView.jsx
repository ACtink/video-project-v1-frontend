// import { useEffect, useState } from "react";
// import { MessageCircle } from "lucide-react";
// import ChatBox from "./ChatBox";
// import fetchData from "../../utils/fetchData";

// import { useLocation } from "react-router-dom";

// function ChatView() {
//   const [activeChat, setActiveChat] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);

//   const conversationIdFromQuery = queryParams.get("conversation");

//   // const userIdFromQuery = queryParams.get("user");

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await fetchData("/api/chat/contacts", {
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

//   useEffect(() => {
//     if (!userIdFromQuery || chats.length === 0) return;

//     const chatUser = chats.find((c) => c._id === userIdFromQuery);

//     if (chatUser) {
//       setActiveChat(chatUser);
//     }
//   }, [userIdFromQuery, chats]);

//   return (
//     <div
//       className="
//       w-full
//       flex
//       bg-white/10
//       backdrop-blur-xl
//       border border-white/20
//       overflow-hidden
//       h-[calc(100vh-72px-56px)]
//     "
//     >
//       {/* CHAT LIST */}
//       <div
//         className={`
//           w-full sm:w-72
//           ${activeChat ? "hidden sm:block" : "block"}
//           border-r border-white/20 bg-white/10
//         `}
//       >
//         <div className="px-4 py-4 border-b border-white/20">
//           <h2 className="text-white font-semibold text-lg">Chats</h2>
//           <p className="text-white/60 text-sm">Your conversations</p>
//         </div>

//         <div className="overflow-y-auto">
//           {loading && (
//             <p className="p-4 text-white/60 text-sm">Loading chats…</p>
//           )}

//           {!loading && chats.length === 0 && (
//             <p className="p-4 text-white/60 text-sm">No chats available</p>
//           )}

//           {!loading &&
//             chats.map((chat) => (
//               <button
//                 key={chat._id}
//                 onClick={() => setActiveChat(chat)}
//                 className="w-full text-left px-4 py-3 hover:bg-white/20 transition"
//               >
//                 <p className="text-white font-medium">{chat.username}</p>
//                 <p className="text-white/60 text-sm truncate">Start Chatting</p>
//               </button>
//             ))}
//         </div>
//       </div>

//       {/* CHAT PANEL */}
//       <div
//         className={`
//           flex-1
//           ${activeChat ? "block" : "hidden sm:flex"}
//           flex flex-col
//         `}
//       >
//         {!activeChat ? (
//           <div className="flex-1 flex flex-col items-center justify-center text-white/70 text-center">
//             <MessageCircle size={48} className="mb-4 opacity-60" />
//             <p className="text-lg font-medium">
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

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatBox from "./ChatBox";
import fetchData from "../../utils/fetchData";
import { useLocation } from "react-router-dom";

function ChatView() {
  const [activeChat, setActiveChat] = useState(null);

  const [chats, setChats] = useState([]);

  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const conversationIdFromQuery = queryParams.get("conversation");

  // ✅ Fetch conversations (NOT contacts)
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetchData(
          "/api/chat/conversations",

          { credentials: "include" },
        );

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

  // ✅ Activate chat from URL
  useEffect(() => {
    if (!conversationIdFromQuery || chats.length === 0) return;

    const conversation = chats.find((c) => c._id === conversationIdFromQuery);

    if (conversation) {
      setActiveChat(conversation);
    }
  }, [conversationIdFromQuery, chats]);

  return (
    <div className="w-full flex bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden h-[calc(100vh-72px-56px)]">
      {/* CHAT LIST */}

      <div
        className={`

  w-full sm:w-72

  ${activeChat ? "hidden sm:flex" : "flex"}

  flex-col

  border-r border-white/20 bg-white/10

`}
      >
        <div className="px-4 py-4 border-b border-white/20">
          <h2 className="text-white font-semibold text-lg">Chats</h2>

          <p className="text-white/60 text-sm">Your conversations</p>
        </div>

        <div className="flex-1 overflow-y-auto pt-2 pb-8">
          {loading && (
            <p className="p-4 text-white/60 text-sm">Loading chats…</p>
          )}

          {!loading && chats.length === 0 && (
            <p className="p-4 text-white/60 text-sm">No chats available</p>
          )}

          {!loading &&
            chats.map((chat) => {
              const otherUser = chat.participants.find(
                (p) => {  
                  console.log("chat", chat)
                  console.log("chat.participants", chat.participants) 
                  console.log("chat.myUserId", chat.requesterId)
                  console.log("p._id", p._id)
                  return p._id !== chat.requesterId;
                } 
              );

              return (
                <button
                  key={chat._id}
                  onClick={() => setActiveChat(chat)}
                  className="w-full text-left px-4 py-3 hover:bg-white/20 transition"
                >
                  <p className="text-white font-medium">
                    {otherUser?.username}
                  </p>

                  <p className="text-white/60 text-sm truncate">
                    {chat.lastMessage || "Start chatting"}
                  </p>
                </button>
              );
            })}
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