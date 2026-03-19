// import { useAuth } from "../hooks/useAuth";

// function countryCodeToFlag(code = "") {
//   if (!code || code.length !== 2) return "🌍";

//   return String.fromCodePoint(
//     ...code
//       .toUpperCase()
//       .split("")
//       .map((char) => 127397 + char.charCodeAt())
//   );
// }

// function DisplayUserInfoCard({ strangerInfo = {} }) {
//   const { user, loading } = useAuth();

//   if (!user || loading) return null;

//   console.log("Stranger info:$$$$$$$$$$$$$$$$$$$$$$$", strangerInfo);

//   const countryCode = strangerInfo?.data?.country;
//   const flag = countryCodeToFlag(countryCode);

//   return (
//     <div
//       className="
//         absolute inset-0 z-20
//         flex items-center justify-center
//         bg-black/70 backdrop-blur-sm
//         pointer-events-none
//         transition-opacity duration-300
//       "
//     >
//       {/* CONTENT */}
//       <div
//         className="
//           flex flex-col items-center text-center
//           transform transition-all duration-300
//           opacity-100 scale-100
//         "
//       >
//         {/* Accent line */}
//         <div className="w-12 h-[3px] rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] mb-4" />

//         <p className="text-xs sm:text-sm text-gray-400 mb-1 tracking-wide">
//           You are connecting with
//         </p>

//         {/* Username */}
//         <h2 className="font-semibold text-white mb-4 text-xl sm:text-2xl lg:text-4xl xl:text-5xl">
//           {strangerInfo?.data?.username || "Anonymous"}
//         </h2>

//         {/* FLAG + COUNTRY CODE */}
//         <div className="flex items-center gap-4">
//           {/* Flag */}
//           <span
//             className="
//               leading-none
//               drop-shadow-[0_6px_14px_rgba(0,0,0,0.75)]
//               text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
//             "
//           >
//             {flag}
//           </span>

//           {/* Country code badge */}
//           <span
//             className="
//               px-5 py-2
//               font-semibold tracking-widest
//               text-cyan-300
//               border border-cyan-400/40
//               rounded-md
//               bg-cyan-400/10
//               shadow-[0_0_16px_rgba(34,211,238,0.45)]
//               text-sm sm:text-base lg:text-lg xl:text-xl
//             "
//           >
//             {countryCode || "UN"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DisplayUserInfoCard;

// import { useAuth } from "../hooks/useAuth";

// function countryCodeToFlag(code = "") {
//   if (!code || code.length !== 2) return "🌍";
//   return String.fromCodePoint(
//     ...code
//       .toUpperCase()
//       .split("")
//       .map((char) => 127397 + char.charCodeAt()),
//   );
// }

// function DisplayUserInfoCard({ strangerInfo = {} }) {
//   const { user, loading } = useAuth();
//   if (!user || loading) return null;

//   const countryCode = strangerInfo?.data?.country;
//   const flag = countryCodeToFlag(countryCode);
//   const username = strangerInfo?.data?.username || "Anonymous";

//   return (
//     <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
//       {/* ── FULL BLUR LAYER — covers everything ── */}
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" />

//       {/* ── CARD — sits above the blur, has its own lighter blur for glass effect ── */}
//       <div className="relative z-10 flex flex-col items-center text-center px-10 py-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl mx-6 animate-fade-in">
//         {/* TOP GLOW DOT */}
//         <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_6px_rgba(34,211,238,0.4)] mb-5" />

//         {/* LABEL */}
//         <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3 font-medium">
//           Connecting you with
//         </p>

//         {/* AVATAR */}
//         <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg ring-2 ring-white/10">
//           <span className="text-2xl font-bold text-white">
//             {username.charAt(0).toUpperCase()}
//           </span>
//         </div>

//         {/* USERNAME */}
//         <h2 className="text-white font-bold tracking-tight mb-5 text-2xl sm:text-3xl xl:text-4xl">
//           {username}
//         </h2>

//         {/* DIVIDER */}
//         <div className="w-16 h-px bg-white/10 mb-5" />

//         {/* FLAG + COUNTRY */}
//         <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-2.5">
//           <span className="text-3xl leading-none">{flag}</span>
//           <span className="text-sm font-semibold tracking-widest text-cyan-300 uppercase">
//             {countryCode || "Unknown"}
//           </span>
//         </div>

//         {/* BOTTOM PULSE INDICATOR */}
//         <div className="flex items-center gap-2 mt-5">
//           <span className="relative flex h-2 w-2">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
//             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
//           </span>
//           <span className="text-[11px] text-white/40 tracking-wide">
//             Establishing connection...
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DisplayUserInfoCard;

import { useAuth } from "../hooks/useAuth";
import { getCountryNameFromCode } from "../utils/countryName";

// function countryCodeToFlag(code = "") {
//   if (!code || code.length !== 2) return "🌍";
//   return String.fromCodePoint(
//     ...code
//       .toUpperCase()
//       .split("")
//       .map((char) => 127397 + char.charCodeAt()),
//   );
// }


const FALLBACK_FLAGS = {
  AN: "🇳🇱", // Netherlands Antilles → Netherlands
  EU: "🇪🇺", // Europe
  AP: "🌏", // Asia/Pacific
  A1: "🌍", // Anonymous proxy
  A2: "🌍", // Satellite provider
  O1: "🌍", // Other country
  UK: "🇬🇧", // UK (should be GB)
};

function countryCodeToFlag(code = "") {
  if (!code || code.length !== 2) return "🌍";

  const upper = code.toUpperCase();

  if (FALLBACK_FLAGS[upper]) return FALLBACK_FLAGS[upper];

  return String.fromCodePoint(
    ...upper.split("").map((char) => 127397 + char.charCodeAt()),
  );
}

function DisplayUserInfoCard({ strangerInfo = {} }) {
  const { user, loading } = useAuth();
  if (!user || loading) return null;

  const countryCode = strangerInfo?.data?.country;
  console.log("Stranger info:$$$$$$$$$$$$$$$$$$$$$$$", strangerInfo);
  const flag = countryCodeToFlag(countryCode);
  const username = strangerInfo?.data?.username || "Anonymous";

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      {/* FULL BLUR LAYER */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" />

      {/* CARD — full width, no mx, no rounded */}
      <div className="relative z-10 flex flex-col items-center text-center w-full h-full justify-center px-10 py-8 border-t border-b border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl animate-fade-in">
        {/* TOP GLOW DOT */}
        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_6px_rgba(34,211,238,0.4)] mb-5" />

        {/* LABEL */}
        <p
          className="text-[11px] uppercase text-white/40 mb-3 font-medium"
          style={{ letterSpacing: "0.25em", fontFamily: "monospace" }}
        >
          Connecting you with
        </p>

        {/* AVATAR */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg ring-2 ring-white/10">
          <span
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {username.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* USERNAME */}
        <h2
          className="font-extrabold tracking-tight mb-5"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            background:
              "linear-gradient(135deg, #e0e7ff 0%, #a5b4fc 50%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          {username}
        </h2>

        {/* DIVIDER */}
        <div className="w-16 h-px bg-white/10 mb-5" />

        {/* FLAG + COUNTRY */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-2.5">
          <span className="text-3xl leading-none">{flag}</span>
          <span
            className="text-sm font-semibold text-cyan-300 uppercase"
            style={{ letterSpacing: "0.2em", fontFamily: "monospace" }}
          >
            {getCountryNameFromCode(strangerInfo?.data?.country) || "Unknown"}
          </span>
        </div>

        {/* BOTTOM PULSE INDICATOR */}
        <div className="flex items-center gap-2 mt-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span
            className="text-white/40"
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              fontFamily: "monospace",
            }}
          >
            Establishing connection...
          </span>
        </div>
      </div>
    </div>
  );
}

export default DisplayUserInfoCard;