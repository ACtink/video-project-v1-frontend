function Loader() {
  return (
    <div
      className="
        absolute inset-0
        z-20
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
      "
    >
      <div className="flex flex-col items-center gap-3 text-white">
        <div
          className="
            w-10 h-10
            border-4 border-white/30
            border-t-cyan-400
            rounded-full
            animate-spin
          "
        />
        <p className="text-sm text-white/70">Connecting to a stranger…</p>
      </div>
    </div>
  );
}

export default Loader;
