function LeftSidebar() {
  return (
    <div className="h-full flex flex-col p-4">
      {/* 🔍 SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search people or posts"
          className="
            w-full bg-black/40 border border-white/10 rounded-lg
            px-3 py-2 text-sm text-white placeholder-white/40
            focus:outline-none focus:border-indigo-400
          "
        />
      </div>

      {/* 🧭 NAVIGATION */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wide text-white/50 mb-2">
          Navigation
        </p>

        <div
          className="border border-white/10 bg-black/20 rounded-lg p-3 mb-2
                        flex items-center gap-3 cursor-pointer
                        transition-all duration-300 ease-out
                        hover:bg-black/30 hover:border-white/20 hover:-translate-y-0.5"
        >
          <span>🏠</span>
          <span className="text-sm">Home</span>
        </div>

        <div
          className="border border-white/10 bg-black/20 rounded-lg p-3 mb-2
                        flex items-center gap-3 cursor-pointer
                        transition-all duration-300 ease-out
                        hover:bg-black/30 hover:border-white/20 hover:-translate-y-0.5"
        >
          <span>🧭</span>
          <span className="text-sm">Explore</span>
        </div>

        <div
          className="border border-white/10 bg-black/20 rounded-lg p-3 mb-2
                        flex items-center gap-3 cursor-pointer
                        transition-all duration-300 ease-out
                        hover:bg-black/30 hover:border-white/20 hover:-translate-y-0.5"
        >
          <span>🔖</span>
          <span className="text-sm">Saved Posts</span>
        </div>

        <div
          className="border border-white/10 bg-black/20 rounded-lg p-3
                        flex items-center gap-3 cursor-pointer
                        transition-all duration-300 ease-out
                        hover:bg-black/30 hover:border-white/20 hover:-translate-y-0.5"
        >
          <span>👤</span>
          <span className="text-sm">My Profile</span>
        </div>
      </div>

     

        

      
      </div>
   
  );
}

export default LeftSidebar;
