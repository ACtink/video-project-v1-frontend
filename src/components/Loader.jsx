function Loader({ uiState, allGoodAndConnected }) {
  return (
    <div
      className="
        absolute inset-0
        z-20
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
      "
    >
      <div className="flex flex-col items-center gap-5 text-white">
        {/* Spinner */}
        <div
          className="
            w-10 h-10
            border-4 border-white/20
            border-t-cyan-400
            rounded-full
            animate-spin
            shadow-[0_0_12px_rgba(34,211,238,0.35)]
          "
        />

        {/* CONNECTING */}
        {uiState === "successfully_queued" && (
          <div
            className="
              px-5 py-2.5
              rounded-lg
              bg-cyan-400/10
              border border-cyan-400/30
              shadow-[0_0_16px_rgba(34,211,238,0.25)]
            "
          >
            <p
              className="
    text-sm sm:text-base lg:text-lg
    text-slate-400
    font-medium
    tracking-wide
  "
            >
              Connecting you to a stranger…
            </p>
          </div>
        )}

        {/* SKIPPED */}
        {uiState === "successfully_skipped_and_searching" &&
          !allGoodAndConnected && (
            <div
              className="
                px-5 py-2.5
                rounded-lg
                bg-amber-400/10
                border border-amber-400/30
                shadow-[0_0_16px_rgba(251,191,36,0.25)]
              "
            >
              <p
                className="
                  text-sm sm:text-base lg:text-lg
                  text-amber-300
                  font-semibold
                  tracking-wide
                "
              >
                Skipped. Finding someone new…
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

export default Loader;
