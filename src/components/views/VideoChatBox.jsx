function VideoChatBox() {
  return (
    <div
      className="
        order-3 xl:order-2
        w-full xl:flex-[2]
        h-[30vh] xl:h-full
        flex flex-col
        bg-white/10 backdrop-blur-xl
        border border-white/20 rounded-xl
        overflow-hidden
      "
    >
      {/* TOP: Connection info */}
      <div className="shrink-0 px-4 py-2 border-b border-white/20">
        <h3 className="font-semibold text-white text-sm">Video Chat</h3>
        <p className="text-xs text-white/60">Connected with a stranger</p>
        <p className="text-xs text-cyan-400 mt-1">🔵 Connection stable</p>
      </div>

      {/* BOTTOM: Chat */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 px-3 py-2 space-y-2 overflow-y-auto text-sm">
          <div className="text-center text-white/50">Say hello 👋</div>
        </div>

        <div className="px-3 py-2 border-t border-white/20">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Message…"
              className="flex-1 px-3 py-2 rounded-md bg-white/70 text-gray-800 text-sm focus:outline-none"
            />
            <button className="px-3 py-2 bg-cyan-400 text-black rounded-md text-sm font-semibold">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoChatBox;
