import { useContext, useEffect, useState } from "react";
import { webRTCContext } from "../../context/WebRTC";

function VideoChatBox({ wsConnected }) {
  const {
    sendMessage,
    pcRef,
    dataChannelRef,
    dataChannelReady,
    dataChannel,
    cleanVideoChatMessagesUI,
    setCleanVideoChatMessagesUI,
    sendJsonMessage,
    
  } = useContext(webRTCContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");






  //Receive messages

  useEffect(() => {
    // console.log("Data Channel value in VideoChatBox:", dataChannel);

    if (!dataChannel) return;

    const handleMessage = (e) => {
      console.log("naya message aya hai chatbox ke liye", e.data);

      let msg;

 
        msg = e.data;

 
      

      console.log("Normalized message:", JSON.stringify(msg));

        setMessages((prev) => [...prev, { from: "peer", text: msg }]);
      
    };

    dataChannel.addEventListener("message", handleMessage);

    return () => {
      dataChannel.removeEventListener("message", handleMessage);
    };
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

  return (
    <div
      className="
    order-3 xl:order-2
    w-full xl:flex-[2]
    h-[32vh] sm:h-[40vh] xl:h-full
    flex flex-col
    bg-white/10 backdrop-blur-xl
    border border-white/20
    rounded-2xl overflow-hidden
    shadow-lg
  "
    >
      {/* HEADER */}
      <div className="shrink-0 px-4 py-3 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white text-sm">Chat With the Stranger</h3>
            <p
              className={`text-xs font-medium ${
                pcRef.current?.connectionState
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {pcRef.current?.connectionState === "connected"
                ? "Connected with a stranger"
                : "Not connected yet"}
            </p>
          </div>

          <span
            className={`text-xs font-medium ${
              wsConnected ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {wsConnected ? "● Server is Online" : "● Server is Offline"}
          </span>
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
              max-w-[80%] px-4 py-2 rounded-2xl
              break-words leading-relaxed
              ${
                msg.from === "self"
                  ? "bg-cyan-400 text-black rounded-br-sm"
                  : "bg-white/80 text-black rounded-bl-sm"
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
            flex-1 px-4 py-2.5 rounded-full text-sm
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
            shrink-0 px-4 py-2.5 rounded-full
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
