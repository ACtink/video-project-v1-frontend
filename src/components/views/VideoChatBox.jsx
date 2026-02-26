import { useContext, useEffect, useState, useRef } from "react";
import { webRTCContext } from "../../context/WebRTC";
import { websocketContext } from "../../context/WebSocket";

function VideoChatBox({ wsConnected, uiState }) {
  const {
    sendMessage,
    pcRef,
    dataChannel,
    cleanVideoChatMessagesUI,
    setCleanVideoChatMessagesUI,
  } = useContext(webRTCContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✅ auto scroll ref
  const bottomRef = useRef(null);

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

  // Clear messages when session resets
  useEffect(() => {
    if (cleanVideoChatMessagesUI) {
      setMessages([]);
      setCleanVideoChatMessagesUI(false);
    }
  }, [cleanVideoChatMessagesUI, setCleanVideoChatMessagesUI]);

  // ✅ Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setMessages((prev) => [...prev, { from: "self", text: input }]);
    setInput("");
  };

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
      {/* HEADER (reduced padding) */}
      <div className="shrink-0 px-3 py-1.5 border-b border-white/20">
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
        </div>
      </div>

      {/* CHAT BODY (reduced padding) */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2 text-sm">
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
    max-w-[80%] px-3 py-1.5 rounded-md
    break-words leading-snug
    ${msg.from === "self" ? "bg-cyan-400 text-black" : "bg-white/80 text-black"}
  `}
            >
              <p className="text-[10px] font-semibold opacity-60 mb-0.5">
                {msg.from === "self" ? "You" : "Stranger"}
              </p>
              <p className="text-xs">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* ✅ scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* INPUT BAR (unchanged) */}
      <div className="shrink-0 px-3 py-3 border-t mb-2 border-white/20 bg-black/10">
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
