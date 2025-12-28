import { useContext, useEffect, useState } from "react";
import { webRTCContext } from "../../context/WebRTC";

function VideoChatBox({ wsConnected }) {
  const { sendMessage, dataChannelRef , dataChannelReady , dataChannel } = useContext(webRTCContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Receive messages
  useEffect(() => {
    console.log("Data Channel value in VideoChatBox:", dataChannel);

    if (!dataChannel) return;

    const handleMessage = (e) => {
      console.log("naya message aya", e.data);
      setMessages((prev) => [...prev, { from: "peer", text: e.data }]);
    };

    dataChannel.onmessage = handleMessage;

    return () => {
      dataChannel.onmessage = null;
    };
  }, [dataChannel]);






  const handleSendMessage = () => {
    if (!input.trim()) return;

    sendMessage(input);

    setMessages((prev) => [...prev, { from: "self", text: input }]);

    setInput("");
  };

  return (
    <div className="order-3 xl:order-2 w-full xl:flex-[2] h-[30vh] xl:h-full flex flex-col bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden">
      {/* TOP */}
      <div className="shrink-0 px-4 py-4 border-b border-white/20">
        <h3 className="font-semibold text-white text-sm">Video Chat</h3>
        <p className="text-xs text-white/60">Connected with a stranger</p>
        <p className="text-xs text-cyan-400 mt-1">
          {wsConnected
            ? "🟢 Connection established"
            : "🔴 Connection not established"}
        </p>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 px-3 py-2 space-y-2 overflow-y-auto text-sm">
          {messages.length === 0 && (
            <div className="text-center text-white/50">Say hello 👋</div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] px-3 py-2 rounded-lg break-words ${
                msg.from === "self"
                  ? "ml-auto bg-cyan-400 text-black"
                  : "mr-auto bg-white/70 text-black"
              }`}
            >
            {msg.from === "self" ? "You: " : "Stranger: "} {msg.text}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="px-3 py-2 border-t border-white/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Message…"
              className="flex-1 px-3 py-2 rounded-md bg-white/70 text-gray-800 text-sm focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-2 bg-cyan-400 text-black rounded-md text-sm font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoChatBox;
