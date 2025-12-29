import React, { useEffect, useState, useContext } from "react";
import VideoChatBox from "./VideoChatBox";
import { websocketContext } from "../../context/WebSocket.jsx";
import { setupUserMedia } from "../../utils/userMedia.js";
import { webRTCContext } from "../../context/WebRTC.jsx";
import DisplayUserInfoCard from "../DisplayUserInfoCard.jsx";
import Loader from "../Loader.jsx";

function VideoView() {
  const { connectToWebSocketServer, sendSignal, wsConnected } =
    useContext(websocketContext);

  const {
    localVideoRef,
    localStreamRef,
    remoteVideoRef,
    videoCallLoader,
    setVideoCallLoader,
    showUserCard,
    setShowUserCard,
    dataChannelForJsonMessages,
    dataChannelForJsonRef,
    matchedUser
  } = useContext(webRTCContext);



    const [isLoaderDone, setIsLoaderDone] = useState(false);
    const [isUserCardDone, setIsUserCardDone] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const shouldShowVideo = isLoaderDone && isUserCardDone && isVideoPlaying;

const [isMatchedDataReceived, setIsMatchedDataReceived] = useState(false)

  /* -------------------- CONNECT TO WS -------------------- */

  useEffect(() => {
    connectToWebSocketServer();
  }, []);

  /* -------------------- HANDLE USER INFO -------------------- */

  // useEffect(() => {

  //   console.log("in the video viws useeffect")

  //       console.log("data channel for json  ",dataChannelForJsonRef.current);

  //   if (!dataChannelForJsonRef.current) return;


  //   let timer;

  //   const handleJsonMessage = (e) => {
  //     console.log("handle json message is running ")
  //     let msg;
  //     try {
  //       msg = JSON.parse(e.data);
  //       console.log("user info", msg)
  //     } catch {
  //       return;
  //     }

  //     if (msg.type === "userInfo") {
  //       setVideoCallLoader(false)
  //       setShowUserCard(true);

  //       timer = setTimeout(() => {
  //         setShowUserCard(false);
  //       }, 5000);
  //     }
  //   };

  //           dataChannelForJsonRef.current.addEventListener(
  //             "message",
  //             handleJsonMessage
  //           );

  //   return () => {
  //     clearTimeout(timer);
  //     dataChannelForJsonMessages.current.removeEventListener(
  //       "message",
  //       handleJsonMessage
  //     );
  //   };
  // }, [dataChannelForJsonMessages]);







  useEffect(()=>{

    let timer;
    if (!videoCallLoader && matchedUser ) {
      console.log("calling in if useeffect")
      console.log("value of matched user in if condition of useeffect" , matchedUser)
      timer = setTimeout(() => {
        setShowUserCard(false);
      }, 3000);
      setShowUserCard(true);
    }

      return () => {
        clearTimeout(timer);
       
      };
  },[videoCallLoader])










  /* -------------------- START CALL -------------------- */

  const handleStart = async () => {
    await setupUserMedia(localVideoRef, localStreamRef);

    sendSignal({ type: "join-queue" });

    // Loader starts here
    setVideoCallLoader(true);
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="w-full h-full flex flex-col px-4 py-4 text-white bg-gradient-to-br from-[#0b0f1a] via-[#1a0f2e] to-[#0b1a2e]">
      <div className="flex-1 w-full flex flex-col xl:flex-row gap-4 xl:gap-6 overflow-hidden">
        {/* LOCAL VIDEO */}
        <div className="order-1 xl:flex-[3] h-[45vh] xl:h-full rounded-xl border-[3px] border-cyan-400 bg-black overflow-hidden">
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
        <div className="relative order-2 xl:flex-[3] h-[25vh] xl:h-full rounded-xl border-[3px] border-cyan-400 bg-black overflow-hidden">
          {/* VIDEO (hidden until phase === video) */}
          <video
            ref={remoteVideoRef}
            autoPlay
            muted
            playsInline
            className={`
    w-full h-full object-contain
    transition-opacity duration-300
    ${!videoCallLoader && !showUserCard ? "opacity-100" : "opacity-0"}
  `}
          />

          {/* OVERLAYS */}
          {videoCallLoader && <Loader />}
          {showUserCard && <DisplayUserInfoCard  strangerInfo={matchedUser} />}
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
