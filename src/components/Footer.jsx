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



import { Home, Video, MessageCircle, User } from "lucide-react";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { websocketContext } from "../context/WebSocket";

const tabs = [
  { path: "/", icon: Home },
  { path: "/video", icon: Video },
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
      // ✅ Removed: fixed bottom-0 left-0
      // ✅ Now it's just a normal flex child — Layout's flex-col pushes it to bottom
      // ✅ z-[999] kept in case anything overlaps it
      className="w-full z-[999] bg-black/80 backdrop-blur-xl border-t border-white/10 flex-shrink-0"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      // ✅ flex-shrink-0 prevents footer from being squished when keyboard opens
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
