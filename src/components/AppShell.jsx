import { useState } from "react";
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

function AppShell() {
  const [activeTab, setActiveTab] = useState("home");

  const renderView = () => {
    switch (activeTab) {
      case "video":
        return <VideoView />;
      case "chat":
        return <ChatView />;
      case "profile":
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="h-full w-full relative flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Main content */}
      <div className="flex-1 overflow-hidden  pb-28">
        <WebRTCProvider>
          <WebSocketProvider>
            <RTCBridge />
            {renderView()}
          </WebSocketProvider>
        </WebRTCProvider>
      </div>

      {/* Bottom feature bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex gap-4 px-5 py-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl">
          {tabs.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`p-3 rounded-xl transition-all
                ${
                  activeTab === id
                    ? "bg-white text-indigo-600 scale-110"
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
