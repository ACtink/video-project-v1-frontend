import { useAuth } from "../hooks/useAuth";

function countryCodeToFlag(code = "") {
  if (!code || code.length !== 2) return "🌍";

  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt())
  );
}

function DisplayUserInfoCard({ strangerInfo = {} }) {
  const { user, loading } = useAuth();

  if (!user || loading) return null;

  console.log("Stranger info:$$$$$$$$$$$$$$$$$$$$$$$", strangerInfo);

  const countryCode = strangerInfo?.data?.country;
  const flag = countryCodeToFlag(countryCode);

  return (
    <div
      className="
        absolute inset-0 z-20
        flex items-center justify-center
        bg-black/70 backdrop-blur-sm
        pointer-events-none
        transition-opacity duration-300
      "
    >
      {/* CONTENT */}
      <div
        className="
          flex flex-col items-center text-center
          transform transition-all duration-300
          opacity-100 scale-100
        "
      >
        {/* Accent line */}
        <div className="w-12 h-[3px] rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] mb-4" />

        <p className="text-xs sm:text-sm text-gray-400 mb-1 tracking-wide">
          You are connecting with
        </p>

        {/* Username */}
        <h2 className="font-semibold text-white mb-4 text-xl sm:text-2xl lg:text-4xl xl:text-5xl">
          {strangerInfo?.data?.username || "Anonymous"}
        </h2>

        {/* FLAG + COUNTRY CODE */}
        <div className="flex items-center gap-4">
          {/* Flag */}
          <span
            className="
              leading-none
              drop-shadow-[0_6px_14px_rgba(0,0,0,0.75)]
              text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
            "
          >
            {flag}
          </span>

          {/* Country code badge */}
          <span
            className="
              px-5 py-2
              font-semibold tracking-widest
              text-cyan-300
              border border-cyan-400/40
              rounded-md
              bg-cyan-400/10
              shadow-[0_0_16px_rgba(34,211,238,0.45)]
              text-sm sm:text-base lg:text-lg xl:text-xl
            "
          >
            {countryCode || "UN"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DisplayUserInfoCard;
