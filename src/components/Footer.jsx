// import { Home, Video, MessageCircle, User } from "lucide-react";
// import { useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { websocketContext } from "../context/WebSocket";

// const tabs = [
//   { path: "/", icon: Home },
//   { path: "/video", icon: Video },
//   { path: "/chat", icon: MessageCircle },
//   { path: "/profile", icon: User },
// ];

// function Footer() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { uiState } = useContext(websocketContext); // ← must be INSIDE the function

//   const callActive = uiState !== "idle";

//   return (
//     <div
//       className="fixed bottom-0 left-0 w-full z-[999] bg-black/80 backdrop-blur-xl border-t border-white/10"
//       style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//     >
//       <div className="w-full flex justify-around items-center px-2 py-2 sm:w-fit sm:mx-auto sm:gap-2 sm:px-4 sm:justify-center">
//         {tabs.map(({ path, icon: Icon }) => {
//           const isActive =
//             location.pathname === path ||
//             (path === "/profile" && location.pathname.startsWith("/profile"));

//           const isDisabled = callActive && path !== "/video";

//           return (
//             <button
//               key={path}
//               onClick={() => {
//                 if (!isDisabled) navigate(path);
//               }}
//               disabled={isDisabled}
//               className={`
//                 relative flex flex-col items-center justify-center
//                 w-14 h-12 rounded-xl
//                 transition-all duration-200 active:scale-90
//                 ${
//                   isDisabled
//                     ? "opacity-25 cursor-not-allowed"
//                     : isActive
//                       ? "text-white"
//                       : "text-white/40 hover:text-white/70"
//                 }
//               `}
//             >
//               <Icon
//                 size={22}
//                 strokeWidth={isActive && !isDisabled ? 2.5 : 1.8}
//               />
//               {isActive && !isDisabled && (
//                 <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-fuchsia-500" />
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Footer;

// import { Home, Video, MessageCircle, User } from "lucide-react";
// import { useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { websocketContext } from "../context/WebSocket";

// const tabs = [
//   { path: "/", icon: Home },
//   { path: "/video", icon: Video },
//   { path: "/chat", icon: MessageCircle },
//   { path: "/profile", icon: User },
// ];

// function Footer() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { uiState } = useContext(websocketContext);

//   const callActive = uiState !== "idle";

//   return (
//     <div
//       className="w-full bg-black/80 backdrop-blur-xl border-t border-white/10 flex-shrink-0"
//       style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//     >
//       <div className="w-full flex justify-around items-center px-2 py-2 sm:w-fit sm:mx-auto sm:gap-2 sm:px-4 sm:justify-center">
//         {tabs.map(({ path, icon: Icon }) => {
//           const isActive =
//             location.pathname === path ||
//             (path === "/profile" && location.pathname.startsWith("/profile"));

//           const isDisabled = callActive && path !== "/video";

//           return (
//             <button
//               key={path}
//               onClick={() => {
//                 if (!isDisabled) navigate(path);
//               }}
//               disabled={isDisabled}
//               className={`
//                 relative flex flex-col items-center justify-center
//                 w-14 h-12 rounded-xl
//                 transition-all duration-200 active:scale-90
//                 ${
//                   isDisabled
//                     ? "opacity-25 cursor-not-allowed"
//                     : isActive
//                       ? "text-white"
//                       : "text-white/40 hover:text-white/70"
//                 }
//               `}
//             >
//               <Icon
//                 size={22}
//                 strokeWidth={isActive && !isDisabled ? 2.5 : 1.8}
//               />
//               {isActive && !isDisabled && (
//                 <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-fuchsia-500" />
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Footer;

// import { Home, MessageCircle, User } from "lucide-react";
// import { useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { websocketContext } from "../context/WebSocket";

// const RetroTV = ({ size = 22, strokeWidth = 1.8 }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={strokeWidth}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="8" width="20" height="13" rx="2" />
//     <line x1="8" y1="8" x2="5" y2="2" />
//     <line x1="16" y1="8" x2="19" y2="2" />
//     <circle cx="5" cy="2" r="0.8" fill="currentColor" />
//     <circle cx="19" cy="2" r="0.8" fill="currentColor" />
//     <line x1="8" y1="21" x2="7" y2="23" />
//     <line x1="16" y1="21" x2="17" y2="23" />
//   </svg>
// );

// const tabs = [
//   { path: "/", icon: Home },
//   { path: "/video", icon: RetroTV },
//   { path: "/chat", icon: MessageCircle },
//   { path: "/profile", icon: User },
// ];

// function Footer() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { uiState } = useContext(websocketContext);

//   const callActive = uiState !== "idle";

//   return (
//     <div
//       className="w-full bg-black/80 backdrop-blur-xl border-t border-white/10 flex-shrink-0"
//       style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//     >
//       <div className="w-full flex justify-around items-center px-2 py-2 sm:w-fit sm:mx-auto sm:gap-2 sm:px-4 sm:justify-center">
//         {tabs.map(({ path, icon: Icon }) => {
//           const isActive =
//             location.pathname === path ||
//             (path === "/profile" && location.pathname.startsWith("/profile"));

//           const isDisabled = callActive && path !== "/video";

//           return (
//             <button
//               key={path}
//               onClick={() => {
//                 if (!isDisabled) navigate(path);
//               }}
//               disabled={isDisabled}
//               className={`
//                 relative flex flex-col items-center justify-center
//                 w-14 h-12 rounded-xl
//                 transition-all duration-200 active:scale-90
//                 ${
//                   isDisabled
//                     ? "opacity-25 cursor-not-allowed"
//                     : isActive
//                       ? "text-white"
//                       : "text-white/40 hover:text-white/70"
//                 }
//               `}
//             >
//               <Icon
//                 size={22}
//                 strokeWidth={isActive && !isDisabled ? 2.5 : 1.8}
//               />
//               {isActive && !isDisabled && (
//                 <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-fuchsia-500" />
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Footer;

// import { useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { websocketContext } from "../context/WebSocket";

// const HomeIcon = ({ active }) => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 24 24"
//     fill={active ? "currentColor" : "none"}
//     stroke="currentColor"
//     strokeWidth={active ? "0" : "1.8"}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
//     <path
//       d="M9 21V12h6v9"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       fill={active ? "white" : "none"}
//     />
//   </svg>
// );

// const VideoIcon = ({ active }) => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={active ? "2.2" : "1.8"}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect
//       x="2"
//       y="7"
//       width="14"
//       height="10"
//       rx="2"
//       fill={active ? "currentColor" : "none"}
//       fillOpacity={active ? "0.15" : "0"}
//     />
//     <path
//       d="M16 10l5-3v10l-5-3V10z"
//       fill={active ? "currentColor" : "none"}
//       fillOpacity={active ? "0.15" : "0"}
//     />
//     <rect x="2" y="7" width="14" height="10" rx="2" />
//     <path d="M16 10l5-3v10l-5-3V10z" />
//   </svg>
// );

// const ChatIcon = ({ active }) => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={active ? "2.2" : "1.8"}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path
//       d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
//       fill={active ? "currentColor" : "none"}
//       fillOpacity={active ? "0.15" : "0"}
//     />
//     <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
//   </svg>
// );

// const ProfileIcon = ({ active }) => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={active ? "2.2" : "1.8"}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle
//       cx="12"
//       cy="8"
//       r="4"
//       fill={active ? "currentColor" : "none"}
//       fillOpacity={active ? "0.15" : "0"}
//     />
//     <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
//     <circle cx="12" cy="8" r="4" />
//   </svg>
// );

// const tabs = [
//   { path: "/", icon: HomeIcon, label: "Home" },
//   { path: "/video", icon: VideoIcon, label: "Video" },
//   { path: "/chat", icon: ChatIcon, label: "Chat" },
//   { path: "/profile", icon: ProfileIcon, label: "Profile" },
// ];

// const tabColors = {
//   "/": "text-indigo-400",
//   "/video": "text-cyan-400",
//   "/chat": "text-emerald-400",
//   "/profile": "text-pink-400",
// };

// const glowColors = {
//   "/": "rgba(99,102,241,0.35)",
//   "/video": "rgba(6,182,212,0.35)",
//   "/chat": "rgba(16,185,129,0.35)",
//   "/profile": "rgba(244,63,94,0.35)",
// };

// function Footer() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { uiState } = useContext(websocketContext);

//   const callActive = uiState !== "idle";

//   return (
//     <div
//       className="w-full bg-black/80 backdrop-blur-xl border-t border-white/10 flex-shrink-0"
//       style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//     >
//       <style>{`
//         @keyframes tab-bounce {
//           0%   { transform: scale(1); }
//           30%  { transform: scale(1.25) translateY(-3px); }
//           60%  { transform: scale(0.95) translateY(0px); }
//           100% { transform: scale(1); }
//         }
//         .tab-active-icon {
//           animation: tab-bounce 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
//         }
//       `}</style>

//       <div className="w-full flex justify-around items-center px-2 py-1 sm:w-fit sm:mx-auto sm:gap-2 sm:px-4 sm:justify-center">
//         {tabs.map(({ path, icon: Icon, label }) => {
//           const isActive =
//             location.pathname === path ||
//             (path === "/profile" && location.pathname.startsWith("/profile"));

//           const isDisabled = callActive && path !== "/video";
//           const color = tabColors[path];
//           const glow = glowColors[path];

//           return (
//             <button
//               key={path}
//               onClick={() => {
//                 if (!isDisabled) navigate(path);
//               }}
//               disabled={isDisabled}
//               className={`
//                 relative flex flex-col items-center justify-center gap-0.5
//                 w-16 h-14 rounded-xl transition-all duration-200
//                 ${
//                   isDisabled
//                     ? "opacity-25 cursor-not-allowed"
//                     : isActive
//                       ? color
//                       : "text-white/35 hover:text-white/60"
//                 }
//               `}
//               style={
//                 isActive && !isDisabled
//                   ? {
//                       filter: `drop-shadow(0 0 6px ${glow})`,
//                     }
//                   : {}
//               }
//             >
//               {/* Icon with bounce on active */}
//               <span
//                 key={location.pathname}
//                 className={isActive && !isDisabled ? "tab-active-icon" : ""}
//               >
//                 <Icon active={isActive && !isDisabled} />
//               </span>

//               {/* Label */}
//               <span
//                 className={`text-[10px] tracking-wide transition-all duration-200 ${
//                   isActive && !isDisabled
//                     ? "opacity-100 font-semibold"
//                     : "opacity-40 font-normal"
//                 }`}
//               >
//                 {label}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Footer;

import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { websocketContext } from "../context/WebSocket";

const HomeIcon = ({ active }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill={active ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={active ? "0" : "1.8"}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path
      d="M9 21V12h6v9"
      stroke="currentColor"
      strokeWidth="1.8"
      fill={active ? "white" : "none"}
    />
  </svg>
);

const RetroTV = ({ active }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? "2.2" : "1.8"}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect
      x="2"
      y="8"
      width="20"
      height="13"
      rx="2"
      fill={active ? "currentColor" : "none"}
      fillOpacity={active ? "0.15" : "0"}
    />
    <rect x="2" y="8" width="20" height="13" rx="2" />
    <line x1="8" y1="8" x2="5" y2="2" />
    <line x1="16" y1="8" x2="19" y2="2" />
    <circle cx="5" cy="2" r="0.8" fill="currentColor" />
    <circle cx="19" cy="2" r="0.8" fill="currentColor" />
    <line x1="8" y1="21" x2="7" y2="23" />
    <line x1="16" y1="21" x2="17" y2="23" />
  </svg>
);

const ChatIcon = ({ active }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? "2.2" : "1.8"}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
      fill={active ? "currentColor" : "none"}
      fillOpacity={active ? "0.15" : "0"}
    />
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const ProfileIcon = ({ active }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? "2.2" : "1.8"}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle
      cx="12"
      cy="8"
      r="4"
      fill={active ? "currentColor" : "none"}
      fillOpacity={active ? "0.15" : "0"}
    />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    <circle cx="12" cy="8" r="4" />
  </svg>
);

const tabs = [
  { path: "/", icon: HomeIcon, label: "Home" },
  { path: "/video", icon: RetroTV, label: "Video" },
  { path: "/chat", icon: ChatIcon, label: "Chat" },
  { path: "/profile", icon: ProfileIcon, label: "Profile" },
];

const tabColors = {
  "/": "text-indigo-400",
  "/video": "text-cyan-400",
  "/chat": "text-emerald-400",
  "/profile": "text-pink-400",
};

const glowColors = {
  "/": "rgba(99,102,241,0.35)",
  "/video": "rgba(6,182,212,0.35)",
  "/chat": "rgba(16,185,129,0.35)",
  "/profile": "rgba(244,63,94,0.35)",
};

const pillColors = {
  "/": "rgba(99,102,241,0.12)",
  "/video": "rgba(6,182,212,0.12)",
  "/chat": "rgba(16,185,129,0.12)",
  "/profile": "rgba(244,63,94,0.12)",
};

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { uiState } = useContext(websocketContext);

  const callActive = uiState !== "idle";

  return (
    <div
      className="w-full bg-black/80 backdrop-blur-xl border-t border-white/10 flex-shrink-0"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <style>{`
        @keyframes tab-rise {
          0%   { transform: translateY(0px)  scale(1);    opacity: 0.35; }
          100% { transform: translateY(-3px) scale(1.12); opacity: 1;    }
        }
        @keyframes tab-pill-in {
          0%   { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1);    }
        }
        .tab-rise    { animation: tab-rise    0.25s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .tab-pill-in { animation: tab-pill-in 0.2s  ease-out forwards; }
      `}</style>

      <div className="w-full flex justify-around items-center px-2 py-1 sm:w-fit sm:mx-auto sm:gap-2 sm:px-4 sm:justify-center">
        {tabs.map(({ path, icon: Icon, label }) => {
          const isActive =
            location.pathname === path ||
            (path === "/profile" && location.pathname.startsWith("/profile"));

          const isDisabled = callActive && path !== "/video";
          const color = tabColors[path];
          const glow = glowColors[path];
          const pill = pillColors[path];

          return (
            <button
              key={path}
              onClick={() => {
                if (!isDisabled) navigate(path);
              }}
              disabled={isDisabled}
              className={`
                relative flex flex-col items-center justify-center gap-0.5
                w-16 h-14 rounded-xl
                ${
                  isDisabled
                    ? "opacity-25 cursor-not-allowed"
                    : isActive
                      ? color
                      : "text-white/35 hover:text-white/60"
                }
              `}
            >
              {/* Soft pill background */}
              {isActive && !isDisabled && (
                <span
                  key={`pill-${path}`}
                  className="tab-pill-in"
                  style={{
                    position: "absolute",
                    inset: "4px 6px",
                    borderRadius: 10,
                    background: pill,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Icon — floats up smoothly on active */}
              <span
                key={`icon-${location.pathname}-${path}`}
                className={isActive && !isDisabled ? "tab-rise" : ""}
                style={
                  isActive && !isDisabled
                    ? { filter: `drop-shadow(0 0 5px ${glow})` }
                    : {}
                }
              >
                <Icon active={isActive && !isDisabled} />
              </span>

              {/* Label fades in */}
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.04em",
                  transition: "opacity 0.2s ease, font-weight 0.2s ease",
                  opacity: isActive && !isDisabled ? 1 : 0.35,
                  fontWeight: isActive && !isDisabled ? 600 : 400,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Footer;