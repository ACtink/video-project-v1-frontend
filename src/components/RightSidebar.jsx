function RightSidebar() {
  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      <p className="font-semibold">What’s happening</p>

      <div className="space-y-3 text-sm text-white/80">
        <div
          className="group border border-white/10 rounded-lg p-3 bg-black/20 
                        transition-all duration-300 ease-out
                        hover:bg-black/30 hover:border-white/20 hover:-translate-y-0.5"
        >
          🎥 Video matching is live
        </div>

        <div
          className="group border border-white/10 rounded-lg p-3 bg-black/20 
                        transition-all duration-300 ease-out
                        hover:bg-black/30 hover:border-white/20 hover:-translate-y-0.5"
        >
          🔒 Calls are end-to-end encrypted
        </div>

        <div
          className="group border border-white/10 rounded-lg p-3 bg-black/20 
                        transition-all duration-300 ease-out
                        hover:bg-black/30 hover:border-white/20 hover:-translate-y-0.5"
        >
          ⏱️ Average call length: 4 min
        </div>

        <div
          className="group border border-white/10 rounded-lg p-3 bg-black/20 
                        transition-all duration-300 ease-out
                        hover:bg-black/30 hover:border-white/20 hover:-translate-y-0.5"
        >
          🛡️ Report or block anytime
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
