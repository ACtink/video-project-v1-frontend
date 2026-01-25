import { useContext, useEffect, useState } from "react";
import { UserPlus, UserCheck } from "lucide-react";
import { webRTCContext } from "../../context/WebRTC";
import { websocketContext } from "../../context/WebSocket";

function VideoChatBox({ wsConnected, uiState }) {
  const {
    sendMessage,
    pcRef,
    dataChannelRef,
    dataChannelReady,
    dataChannel,
    cleanVideoChatMessagesUI,
    setCleanVideoChatMessagesUI,
    sendJsonMessage,
    strangerUserProfileData,
    setstrangerUserProfileData,
  } = useContext(webRTCContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Receive messages
  useEffect(() => {
    if (!dataChannel) return;

    const handleMessage = (e) => {
      let msg = e.data;
      setMessages((prev) => [...prev, { from: "peer", text: msg }]);
    };

    dataChannel.addEventListener("message", handleMessage);
    return () => dataChannel.removeEventListener("message", handleMessage);
  }, [dataChannel]);

  useEffect(() => {
    if (cleanVideoChatMessagesUI) {
      setMessages([]);
      setCleanVideoChatMessagesUI(false);
    }
  }, [cleanVideoChatMessagesUI, setCleanVideoChatMessagesUI]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setMessages((prev) => [...prev, { from: "self", text: input }]);
    setInput("");
  };

  // const handleFollowUser = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/api/users/${strangerUserProfileData?.data?.id}/follow`,
  //       {
  //         method: "POST",
  //         credentials: "include",
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );

  //     if (res.ok) setIsFollowing(true);
  //   } catch (err) {
  //     console.error("Follow error:", err);
  //   }
  // };

  // useEffect(() => {
  //   if (!strangerUserProfileData?.data?.id) return;

  //   const checkFollowStatus = async () => {
  //     try {
  //       const res = await fetch(
  //         `http://localhost:3000/api/users/${strangerUserProfileData.data.id}/is-following`,
  //         { credentials: "include" }
  //       );
  //       const data = await res.json();
  //       setIsFollowing(data.isFollowing);
  //     } catch (err) {
  //       console.error("Follow status error", err);
  //     }
  //   };

  //   checkFollowStatus();
  // }, [strangerUserProfileData]);

  return (
    <div
      className="
        order-3 xl:order-2
        w-full xl:flex-[2]
        h-[32vh] sm:h-[40vh] xl:h-full
        flex flex-col
        overflow-hidden
        shadow-lg
        border-l border-white/10
      "
    >
      {/* HEADER */}
      <div className="shrink-0 px-4 py-3 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white text-sm">
              Chat With the Stranger
            </h3>
            <p
              className={`text-xs font-medium ${
                pcRef.current?.connectionState === "connected"
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {pcRef.current?.connectionState === "connected"
                ? "Connected with a stranger"
                : "Not connected yet"}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* FOLLOW / FRIEND CTA */}
            {/* {strangerUserProfileData && (
              <button
                onClick={handleFollowUser}
                disabled={isFollowing}
                className="flex items-center"
              >
                {uiState !== "idle" && (
                  <span
                    className={`
                      px-3 py-1.5
                      text-xs font-semibold
                      tracking-wide
                      rounded-md
                      border
                      transition-all
            ${
              isFollowing
                ? "bg-pink-500/10 text-pink-400 border-pink-400/30 shadow-[0_0_12px_rgba(236,72,153,0.35)]"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:shadow-[0_0_10px_rgba(255,255,255,0.25)]"
            }
          `}
                  >
                    {isFollowing ? "Friends ♥" : "Add Friend"}
                  </span>
                )}
              </button>
            )} */}

            {/* SERVER STATUS */}
            <span
              className={`
      text-xs font-medium
      mt-0.5
      ${wsConnected ? "text-emerald-400" : "text-red-400"}
    `}
            >
              {wsConnected ? "● Server is Online" : "● Server is Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 text-sm">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-white/40 text-sm">
            Say hello 👋
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.from === "self" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`
                max-w-[80%] px-4 py-2 rounded-md
                break-words leading-relaxed
                ${
                  msg.from === "self"
                    ? "bg-cyan-400 text-black"
                    : "bg-white/80 text-black"
                }
              `}
            >
              <p className="text-xs font-semibold opacity-70 mb-0.5">
                {msg.from === "self" ? "You" : "Stranger"}
              </p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* INPUT BAR */}
      <div className="shrink-0 px-3 py-3 border-t border-white/20 bg-black/10">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            disabled={!dataChannel}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={
              dataChannel ? "Type a message…" : "Find stranger first..."
            }
            className="
              flex-1 px-4 py-2.5 rounded-md text-sm
              bg-white/80 text-gray-900
              focus:outline-none focus:ring-2 focus:ring-cyan-400
              disabled:bg-white/30
              disabled:text-white/40
              disabled:cursor-not-allowed
            "
          />

          <button
            onClick={handleSendMessage}
            disabled={!dataChannel}
            className="
              shrink-0 px-4 py-2.5 rounded-md
              bg-cyan-400 text-black text-sm font-semibold
              transition active:scale-95
              disabled:bg-gray-400
              disabled:text-gray-600
              disabled:cursor-not-allowed
            "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoChatBox;
