// function Loader({ uiState, allGoodAndConnected }) {
//   return (
//     <div
//       className="
//         absolute inset-0
//         z-20
//         flex items-center justify-center
//         bg-black/60 backdrop-blur-sm
//       "
//     >
//       <div className="flex flex-col items-center gap-5 text-white">
//         {/* Spinner */}
//         <div
//           className="
//             w-10 h-10
//             border-4 border-white/20
//             border-t-cyan-400
//             rounded-full
//             animate-spin
//             shadow-[0_0_12px_rgba(34,211,238,0.35)]
//           "
//         />

//         {/* CONNECTING */}
//         {uiState === "successfully_queued" && (
//           <div
//             className="
//               px-5 py-2.5
//               rounded-lg
//               bg-cyan-400/10
//               border border-cyan-400/30
//               shadow-[0_0_16px_rgba(34,211,238,0.25)]
//             "
//           >
//             <p
//               className="
//     text-sm sm:text-base lg:text-lg
//     text-slate-400
//     font-medium
//     tracking-wide
//   "
//             >
//               Connecting you to a stranger…
//             </p>
//           </div>
//         )}

//         {/* SKIPPED */}
//         {uiState === "successfully_skipped_and_searching" &&
//           !allGoodAndConnected && (
//             <div
//               className="
//                 px-5 py-2.5
//                 rounded-lg
//                 bg-amber-400/10
//                 border border-amber-400/30
//                 shadow-[0_0_16px_rgba(251,191,36,0.25)]
//               "
//             >
//               <p
//                 className="
//                   text-sm sm:text-base lg:text-lg
//                   text-amber-300
//                   font-semibold
//                   tracking-wide
//                 "
//               >
//                 Skipped. Finding someone new…
//               </p>
//             </div>
//           )}
//       </div>
//     </div>
//   );
// }

// export default Loader;

// function Loader({ uiState, allGoodAndConnected }) {
//   return (
//     <div
//       className="
//         absolute inset-0
//         z-20
//         flex items-center justify-center
//         bg-black/60 backdrop-blur-sm
//       "
//     >
//       <div className="flex flex-col items-center gap-5 text-white">
//         {/* Spinner */}
//         <div className="relative w-10 h-10">
//           {/* Outer ring */}
//           <div className="absolute inset-0 rounded-full border-4 border-white/10" />
//           {/* Spinning arc */}
//           <div
//             className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin"
//             style={{
//               filter: "drop-shadow(0 0 6px rgba(34,211,238,0.8))",
//             }}
//           />
//           {/* Inner pulse dot */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div
//               className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
//               style={{ boxShadow: "0 0 8px 3px rgba(34,211,238,0.6)" }}
//             />
//           </div>
//         </div>

//         {/* CONNECTING */}
//         {uiState === "successfully_queued" && (
//           <div
//             className="px-5 py-2.5 rounded-lg bg-cyan-400/10 border border-cyan-400/30"
//             style={{
//               boxShadow:
//                 "0 0 24px rgba(34,211,238,0.15), inset 0 0 12px rgba(34,211,238,0.05)",
//               animation: "fadeSlideUp 0.3s ease forwards",
//             }}
//           >
//             <p
//               className="text-sm sm:text-base lg:text-lg font-semibold tracking-widest uppercase"
//               style={{
//                 fontFamily: "monospace",
//                 background: "linear-gradient(90deg, #67e8f9, #a5f3fc, #67e8f9)",
//                 backgroundSize: "200% auto",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//                 animation: "shimmer 2.5s linear infinite",
//               }}
//             >
//               Connecting you to a stranger…
//             </p>
//           </div>
//         )}

//         {/* SKIPPED */}
//         {uiState === "successfully_skipped_and_searching" &&
//           !allGoodAndConnected && (
//             <div
//               className="px-5 py-2.5 rounded-lg bg-amber-400/10 border border-amber-400/30"
//               style={{
//                 boxShadow:
//                   "0 0 24px rgba(251,191,36,0.15), inset 0 0 12px rgba(251,191,36,0.05)",
//                 animation: "fadeSlideUp 0.3s ease forwards",
//               }}
//             >
//               <p
//                 className="text-sm sm:text-base lg:text-lg font-semibold tracking-widest uppercase"
//                 style={{
//                   fontFamily: "monospace",
//                   background:
//                     "linear-gradient(90deg, #fcd34d, #fde68a, #fcd34d)",
//                   backgroundSize: "200% auto",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   backgroundClip: "text",
//                   animation: "shimmer 2.5s linear infinite",
//                 }}
//               >
//                 Skipped. Finding someone new…
//               </p>
//             </div>
//           )}
//       </div>

//       {/* Keyframes */}
//       <style>{`
//         @keyframes shimmer {
//           0% { background-position: 0% center; }
//           100% { background-position: 200% center; }
//         }
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Loader;

function Loader({ uiState, allGoodAndConnected }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8 text-white">
        {/* Sonar */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: 110, height: 110 }}
        >
          {[0, 0.6, 1.2].map((delay, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 110,
                height: 110,
                border: `1.5px solid rgba(34,211,238,${0.6 - i * 0.15})`,
                animation: `sonar 1.8s ${delay}s ease-out infinite`,
              }}
            />
          ))}
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: 48,
              height: 48,
              background: "rgba(34,211,238,0.1)",
              border: "2px solid rgba(34,211,238,0.8)",
              boxShadow: "0 0 24px rgba(34,211,238,0.4)",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(34,211,238,1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>

        {/* CONNECTING */}
        {uiState === "successfully_queued" && (
          <div
            className="px-6 py-3 rounded-xl"
            style={{
              background: "rgba(34,211,238,0.08)",
              border: "1px solid rgba(34,211,238,0.25)",
              boxShadow:
                "0 0 32px rgba(34,211,238,0.12), inset 0 0 16px rgba(34,211,238,0.05)",
              animation: "fadeSlideUp 0.3s ease forwards",
            }}
          >
            <p
              className="font-semibold tracking-widest uppercase"
              style={{
                fontFamily: "monospace",
                fontSize: "clamp(0.78rem, 2.5vw, 1rem)",
                background: "linear-gradient(90deg, #67e8f9, #a5f3fc, #67e8f9)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 2s linear infinite",
              }}
            >
              Connecting you to a stranger…
            </p>
          </div>
        )}

        {/* SKIPPED */}
        {uiState === "successfully_skipped_and_searching" &&
          !allGoodAndConnected && (
            <div
              className="px-6 py-3 rounded-xl"
              style={{
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.25)",
                boxShadow:
                  "0 0 32px rgba(251,191,36,0.12), inset 0 0 16px rgba(251,191,36,0.05)",
                animation: "fadeSlideUp 0.3s ease forwards",
              }}
            >
              <p
                className="font-semibold tracking-widest uppercase"
                style={{
                  fontFamily: "monospace",
                  fontSize: "clamp(0.78rem, 2.5vw, 1rem)",
                  background:
                    "linear-gradient(90deg, #fcd34d, #fde68a, #fcd34d)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 2s linear infinite",
                }}
              >
                Skipped. Finding someone new…
              </p>
            </div>
          )}
      </div>

      <style>{`
        @keyframes sonar {
          0%   { transform: scale(0.4); opacity: 0.8; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Loader;