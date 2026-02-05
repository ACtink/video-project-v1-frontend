import { useState, useEffect } from "react";
import { Home, Video, MessageCircle, User } from "lucide-react";

import HomeView from "./views/HomeView";
import VideoView from "./views/VideoView";
import ChatView from "./views/ChatView";
import ProfileView from "./views/ProfileView";
import { WebSocketProvider } from "../context/WebSocket.jsx";
import { WebRTCProvider } from "../context/WebRTC.jsx";
import { RTCBridge } from "../context/RTCBridge.jsx";

const tabs = [
  { id: "home", icon: Home },
  { id: "video", icon: Video },
  { id: "chat", icon: MessageCircle },
  { id: "profile", icon: User },
];

function AppShell({ user , setShowHeader   }) {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "home";
  });


const [uiState, setUiState] = useState("idle");


useEffect(() => {
  localStorage.setItem("activeTab", activeTab);

  // 🔥 layout decision here
  setShowHeader(activeTab !== "video");
}, [activeTab, setShowHeader]);

  const renderView = () => {
    switch (activeTab) {
      case "video":
         return <VideoView onUiStateChange={setUiState} />;
      case "chat":
        return <ChatView />;
      case "profile":
        return <ProfileView user={user} />;
      default:
        return <HomeView />;
    }
  };


  const isVideoLocked = activeTab === "video" && uiState !== "idle";


  return (
    <div className="h-full w-full relative flex flex-col bg-black">
      {/* Main content */}
      {/* <div className="flex-1 overflow-hidden mb-20 md:mb-30"> */}
      <WebRTCProvider>
        <WebSocketProvider>
          <RTCBridge />
          <div
            key={activeTab}
            className="flex-1 overflow-hidden view-transition will-change-transform"
          >
            {renderView()}
          </div>
        </WebSocketProvider>
      </WebRTCProvider>
      {/* </div> */}

      {/* Bottom feature bar */}
      {/* <div className="fixed bottom-0 pt-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 left-1/2 -translate-x-1/2 w-full flex justify-center px-10"> */}

      <div className="bg-gradient-to-br from-purple-700 via-fuchsia-800 to-rose-900">
        <div
          className="
      w-fit mx-auto
      flex items-center gap-3
      px-6 sm:px-10 lg:px-16
      py-3

      rounded-2xl
      bg-black/40
      backdrop-blur-2xl

      border border-white/20
      shadow-[0_10px_40px_rgba(0,0,0,0.35)]
    "
        >
          {tabs.map(({ id, icon: Icon }) => {
            const isActive = activeTab === id;
            const isLocked = isVideoLocked && id !== "video";

            return (
              <button
                key={id}
                onClick={() => {
                  if (isLocked) return;
                  setActiveTab(id);
                }}
                className={`
            relative p-3 rounded-xl
            transition-all duration-300 ease-out

            ${
              isActive
                ? `
                  text-fuchsia-700
                  bg-white
                  shadow-lg
                  ring-1 ring-black/10
                `
                : isLocked
                  ? "text-white/30 cursor-not-allowed"
                  : `
                  text-white/80
                  hover:text-white
                  hover:bg-white/10
                  hover:shadow-md
                `
            }
          `}
              >
                {/* Soft glow behind active tab */}
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-white/40 blur-md -z-10" />
                )}

                {/* Optical centering wrapper */}
                <span className="flex items-center justify-center translate-x-[1px] translate-y-[1px]">
                  <Icon size={22} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
    // </div>
  );
}

export default AppShell;
