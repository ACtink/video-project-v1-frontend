import { ArrowLeft } from "lucide-react";

function ChatBox({ chat, onBack }) {
  return (
    <>
      {/* HEADER */}
      <div className="px-4 py-4 border-b border-white/20 flex items-center gap-3 text-white">
        {/* Mobile back button */}
        <button
          onClick={onBack}
          className="sm:hidden p-2 rounded-lg hover:bg-white/20 transition"
        >
          <ArrowLeft size={20} />
        </button>

        <h3 className="font-semibold text-lg">{chat.username}</h3>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="text-center text-white/60 text-sm">
          Conversation with {chat.username}
        </div>

        <div className="flex justify-start">
          <div className="bg-white/20 rounded-2xl px-4 py-2 text-sm text-white">
            Hello 👋
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-indigo-600 rounded-2xl px-4 py-2 text-sm text-white">
            Hi! How are you?
          </div>
        </div>
      </div>

      {/* INPUT */}
      <div className="px-4 py-4 border-t border-white/20">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
