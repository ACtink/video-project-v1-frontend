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

function AppShell({ user , setShowHeader }) {
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
      <div className="flex-1 overflow-hidden mb-20 md:mb-30 ">
        <WebRTCProvider>
          <WebSocketProvider>
            <RTCBridge />
            {renderView()}
          </WebSocketProvider>
        </WebRTCProvider>
      </div>

      {/* Bottom feature bar */}
      <div className="fixed bottom-0 pt-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 left-1/2 -translate-x-1/2 w-full flex justify-center px-10">
        <div
          className="
            w-fit
            flex justify-center
            gap-4 sm:gap-6 lg:gap-8
            px-6 sm:px-10 lg:px-16
            py-3
            bg-white/20 backdrop-blur-xl
            border border-white/30
            rounded-2xl
            shadow-2xl
          "
        >
          {tabs.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                if (isVideoLocked && id !== "video") return;
                setActiveTab(id);
              }}
              className={`p-3 rounded-xl transition-all
                ${
                  activeTab === id
                    ? "bg-white text-indigo-600 scale-110"
                    : isVideoLocked && id !== "video"
                      ? "text-white/40 cursor-not-allowed"
                      : "text-white hover:bg-white/20"
                }`}
            >
              <Icon size={22} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppShell;
