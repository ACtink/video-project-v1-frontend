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


import { Home, MessageCircle, User } from "lucide-react";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { websocketContext } from "../context/WebSocket";

const RetroTV = ({ size = 22, strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="8" width="20" height="13" rx="2" />
    <line x1="8" y1="8" x2="5" y2="2" />
    <line x1="16" y1="8" x2="19" y2="2" />
    <circle cx="5" cy="2" r="0.8" fill="currentColor" />
    <circle cx="19" cy="2" r="0.8" fill="currentColor" />
    <line x1="8" y1="21" x2="7" y2="23" />
    <line x1="16" y1="21" x2="17" y2="23" />
  </svg>
);

const tabs = [
  { path: "/", icon: Home },
  { path: "/video", icon: RetroTV },
  { path: "/chat", icon: MessageCircle },
  { path: "/profile", icon: User },
];

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
      <div className="w-full flex justify-around items-center px-2 py-2 sm:w-fit sm:mx-auto sm:gap-2 sm:px-4 sm:justify-center">
        {tabs.map(({ path, icon: Icon }) => {
          const isActive =
            location.pathname === path ||
            (path === "/profile" && location.pathname.startsWith("/profile"));

          const isDisabled = callActive && path !== "/video";

          return (
            <button
              key={path}
              onClick={() => {
                if (!isDisabled) navigate(path);
              }}
              disabled={isDisabled}
              className={`
                relative flex flex-col items-center justify-center
                w-14 h-12 rounded-xl
                transition-all duration-200 active:scale-90
                ${
                  isDisabled
                    ? "opacity-25 cursor-not-allowed"
                    : isActive
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                }
              `}
            >
              <Icon
                size={22}
                strokeWidth={isActive && !isDisabled ? 2.5 : 1.8}
              />
              {isActive && !isDisabled && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-fuchsia-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Footer;



