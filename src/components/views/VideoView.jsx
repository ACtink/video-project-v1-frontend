import VideoChatBox from "./VideoChatBox";
import React, { createContext, useEffect, useState, useContext } from "react";
import { websocketContext } from "../../context/WebSocket.jsx";
import { setupUserMedia } from "../../utils/userMedia.js";
import { webRTCContext } from "../../context/WebRTC.jsx";

function VideoView() {


const { clientSocket, wsConnected, connectToWebSocketServer ,sendSignal } = useContext(websocketContext);

const { localVideoRef, localStreamRef , remoteVideoRef  } = useContext(webRTCContext);


useEffect(() => {

  const connectToServer = async()=>{

      await connectToWebSocketServer();

      console.log("WebSocket connected:", wsConnected);



  }

  connectToServer();

}, []); 
  






const handleStart = async () => {
  // 1️⃣ Get camera + mic first
  await setupUserMedia(localVideoRef, localStreamRef );


  // 2 Tell server you want to match
  sendSignal({
    type: "join-queue",
  });
};








  return (
    <div className="w-full h-full flex flex-col px-4 py-4 text-white bg-gradient-to-br from-[#0b0f1a] via-[#1a0f2e] to-[#0b1a2e]">
      {/* VIDEOS & CHAT */}
      <div className="flex-1 w-full flex flex-col xl:flex-row gap-4 xl:gap-6 overflow-hidden">
        {/* LOCAL VIDEO */}

        <div
          className="
              order-1
              xl:order-1
              w-full
              xl:flex-[3]
              h-[45vh]
              xl:h-full
              rounded-xl
              border-[3px] border-cyan-400
              bg-black
              overflow-hidden
            "
        >
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* CHAT */}

        <VideoChatBox wsConnected={wsConnected} />

        {/* REMOTE VIDEO */}

        <div
          className="
                  order-2
                  xl:order-3
                  w-full
                  xl:flex-[3]
                  h-[25vh]
                  xl:h-full
                  rounded-xl
                  border-[3px] border-cyan-400
                  bg-black
                  overflow-hidden
                "
        >
          <video
            autoPlay
            muted
            playsInline
            ref={remoteVideoRef}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* CONTROLS */}
      <div className="mt-3 flex flex-wrap gap-3 justify-center shrink-0">
        <button
          onClick={handleStart}
          className="px-5 py-2 rounded-lg font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition active:scale-95"
        >
          Start
        </button>
        <button className="px-5 py-2 rounded-lg font-bold bg-yellow-400 text-black hover:bg-yellow-300 transition active:scale-95">
          Next
        </button>
        <button className="px-5 py-2 rounded-lg font-bold bg-red-500 text-white hover:bg-red-600 transition active:scale-95">
          Close
        </button>
        <button className="px-5 py-2 rounded-lg font-bold bg-red-600 text-white hover:bg-red-700 transition active:scale-95">
          Exit
        </button>
      </div>
    </div>
  );
}

export default VideoView;
