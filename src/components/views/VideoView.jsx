import React, { useEffect, useState, useContext } from "react";
import VideoChatBox from "./VideoChatBox";
import { websocketContext } from "../../context/WebSocket.jsx";
import { setupUserMedia } from "../../utils/userMedia.js";
import { webRTCContext } from "../../context/WebRTC.jsx";
import DisplayUserInfoCard from "../DisplayUserInfoCard.jsx";
import Loader from "../Loader.jsx";
import AddFriend from "../AddFriend.jsx";

function VideoView({ onUiStateChange }) {
  const {
    connectToWebSocketServer,
    sendSignal,
    wsConnected,
    uiState,
    setUiState,
  } = useContext(websocketContext);

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
    matchedUser,
    pcState,
    remoteStream,
    dataChannel,
    pcReady,
    dataChannelReady,
    remoteStreamReady,
    videoPlayingReady,
    cleanupFull,
    sessionActive,
    setSessionActive,
    cleanupRemotePeer,
    endedByMe,
    setEndedByMe,
    setMatchedUser,
  } = useContext(webRTCContext);

  // const [uiState, setUiState] = useState("idle");

  const [started, setStarted] = useState(false);
  const [isLoaderDone, setIsLoaderDone] = useState(false);
  const [isUserCardDone, setIsUserCardDone] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const shouldShowVideo = isLoaderDone && isUserCardDone && isVideoPlaying;

  const [isMatchedDataReceived, setIsMatchedDataReceived] = useState(false);

  const allGoodAndConnected = pcReady && remoteStreamReady && videoPlayingReady;

  // const allGoodAndConnected =
  // //   pcReady && remoteStreamReady && videoPlayingReady;
  // const startButtonStage = !pcReady && uiState == "idle";
  //   const exitButtonStage = !pcReady && uiState == "started" && localVideoRef!=null && localStreamRef!=null
  // const nextButtonStage = pcReady && remoteStreamReady && videoPlayingReady;

  // const allGoodAndConnected =
  //   pcReady && remoteStreamReady && videoPlayingReady;

  console.log("value of pcReady", pcReady);
  console.log("value of remoteStreamReady", remoteStreamReady);

  console.log("value of videoPlayingReady", videoPlayingReady);

  console.log("value of dataChannelReady", dataChannelReady);

  console.log("value of allGoodAndConnected--------->", allGoodAndConnected);

  useEffect(() => {
    onUiStateChange(uiState);
  }, [uiState]);

  /* -------------------- CONNECT TO WS -------------------- */

  // useEffect(() => {
  // const ws =  connectToWebSocketServer();

  //  return () => {
  //    if (ws && ws.readyState === WebSocket.OPEN) {
  //      ws.close();
  //    }
  //  };

  // }, []);

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

  useEffect(() => {
    let timer;
    if (!videoCallLoader && matchedUser) {
      console.log("calling in if useeffect");
      console.log(
        "value of matched user in if condition of useeffect",
        matchedUser,
      );
      timer = setTimeout(() => {
        setMatchedUser(null);
        setShowUserCard(false);
      }, 3000);
      setShowUserCard(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [videoCallLoader, matchedUser]);

  const showAddFriend = !videoCallLoader && !showUserCard && uiState !== "idle";

  /* -------------------- START CALL -------------------- */

  const handleStart = async () => {
    // setEndedByMe(false);

    // setSessionActive(true);

    await setupUserMedia(localVideoRef, localStreamRef);

    sendSignal({ type: "join-queue" });

    // Loader starts here
    setVideoCallLoader(true);
  };

  //  const handleExit = () => {
  //      setUiState("idle");

  //    // cleanup logic (close pc, stop tracks, etc.)

  //       cleanupCallWhenCloseButtonIsPressed();

  //  };

  //  const handleStart = () => {
  //    setUiState("searching");
  //    // start matchmaking / webrtc
  //  };

  //  const handleConnected = () => {
  //    setUiState("connected");
  //    // call this when peer is connected
  //  };

  const handleNext = () => {
    //  setUiState("started");
    // disconnect current peer & requeue
    setEndedByMe(false); // 🔥 I did NOT leave system

    sendSignal({ type: "next" });

    //  cleanupRemotePeer();
    //  setSessionActive(true);
  };

  const handleClose = () => {
    //  setUiState("idle");
    //  setStarted(false)
    //  cleanupCallWhenCloseButtonIsPressed
    // setEndedByMe(true); // 🔥 I am leaving system
    sendSignal({ type: "end-call" });

    // cleanupFull();
    setSessionActive(false);
  };

  // useEffect(() => {
  //   const allReady =
  //     ready.pc &&
  //     ready.remoteStream &&
  //     ready.videoPlaying &&
  //     ready.dataChannel;

  //   if (allReady && uiState !== "connected") {
  //     setUiState("connected");
  //   }
  // }, [ready, uiState]);

  //        bg-white/10 backdrop-blur-xl

  /* -------------------- UI -------------------- */
  return (
    <div
      className="
    w-full
    h-[96vh]
    overflow-hidden
    flex
    flex-col
    text-white
    bg-gradient-to-br
    from-[#0f172a]
    via-[#020617]
    to-[#020617]
    rounded-xl
    border
    border-white/10
    backdrop-blur-xl
  "
    >
      {/* ===================== TOP : VIDEO AREA (70% on xl) ===================== */}
      <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
        {/* LOCAL VIDEO */}
        <div className="xl:flex-1 h-[45vh] xl:h-full bg-black overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* REMOTE VIDEO */}
        {/* <div className="relative xl:flex-1 h-[25vh] xl:h-full bg-black overflow-hidden xl:border-l xl:border-white/10">
        <video
          ref={remoteVideoRef}
          autoPlay
          muted
          playsInline
          className={`
            w-full h-full object-cover
            transition-opacity duration-300
            ${!videoCallLoader && !showUserCard ? "opacity-100" : "opacity-0"}
          `}
        />

        {videoCallLoader && uiState !== "idle" && (
          <Loader uiState={uiState} allGoodAndConnected={allGoodAndConnected} />
        )}
        {showUserCard && <DisplayUserInfoCard strangerInfo={matchedUser} />}
      </div> */}

        <div className="relative xl:flex-1 h-[25vh] xl:h-full bg-black overflow-hidden xl:border-l xl:border-white/10">
          <video
            ref={remoteVideoRef}
            autoPlay
            muted
            playsInline
            className={`
      w-full h-full object-cover
      transition-opacity duration-300
      ${!videoCallLoader && !showUserCard ? "opacity-100" : "opacity-0"}
    `}
          />

          {videoCallLoader && uiState !== "idle" && (
            <Loader
              uiState={uiState}
              allGoodAndConnected={allGoodAndConnected}
            />
          )}

          {showUserCard && <DisplayUserInfoCard strangerInfo={matchedUser} />}

          {/* ✅ AddFriend overlay */}
          {showAddFriend && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
              <AddFriend uiState={uiState} />
            </div>
          )}
        </div>
      </div>

      {/* ===================== BOTTOM : CONTROLS + CHAT (30% on xl) ===================== */}
      <div className="h-[180px] xl:h-[220px] flex flex-row bg-white/10 shrink-0">
        {/* CONTROLS */}
        <div className="xl:w-1/2 w-full flex items-center justify-center px-4 xl:items-stretch">
          {/* FIXED / RESPONSIVE CONTROL AREA */}
          <div
            className="
                        w-full
                        max-w-[520px]
                        flex
                        flex-nowrap
                        justify-center  
                        gap-3
                        py-2 sm:py-3 xl:py-4
                        xl:h-full
                        xl:items-stretch
                      
                      "
          >
            {/* START */}
            {uiState === "idle" && (
              <button
                disabled={started}
                onClick={handleStart}
                className={`
                        w-[90%]
                        sm:w-[220px]
                        xl:w-[240px]
                        h-[64px] sm:h-[72px] xl:h-full
                        text-lg sm:text-xl xl:text-2xl
                        font-bold
                        rounded-xl
                        bg-cyan-400 text-black
                        hover:bg-cyan-300
                        shadow-lg shadow-cyan-400/60
                        transition
                        active:scale-95
                        disabled:opacity-50
                        ${!started ? "animate-pulse" : ""}
  `}
              >
                Start
              </button>
            )}

            {/* CLOSE (QUEUED) */}
            {uiState === "successfully_queued" && (
              <>
                <button
                  onClick={handleClose}
                  className="
                  w-[45%]
                  sm:w-[220px]
                  xl:w-[240px]
                  h-[64px] sm:h-[72px] xl:h-full
                  text-base sm:text-lg xl:text-xl
                  font-bold
                  rounded-xl
                  bg-red-500 text-white
                  hover:bg-red-600
                  shadow-lg
                  transition
                  active:scale-95
                "
                >
                  Close
                </button>

                {/* COUNTRY CARD */}
                {/* <div
                className="
                  w-[45%]
                  sm:w-[220px]
                  xl:w-[240px]
                  h-[64px] sm:h-[72px] xl:h-full
                  flex items-center justify-center
                  text-base sm:text-lg xl:text-xl
                  font-semibold
                  rounded-xl
                  bg-white/10
                  border border-white/20
                  backdrop-blur-md
                  shadow-lg
                "
              >
                🌍 {matchedUser?.country || "Unknown"}
              </div> */}
              </>
            )}

            {/* NEXT + CLOSE */}
            {(allGoodAndConnected ||
              uiState === "successfully_skipped_and_searching") && (
              <>
                <button
                  onClick={handleNext}
                  disabled={
                    uiState === "successfully_skipped_and_searching" ||
                    videoCallLoader ||
                    !allGoodAndConnected ||
                    showUserCard
                  }
                  className="
                  w-[30%]
                  sm:w-[200px]
                  xl:w-[220px]
                  h-[64px] sm:h-[72px] xl:h-full
                  text-base sm:text-lg xl:text-xl
                  font-bold
                  rounded-xl
                  bg-yellow-400 text-black
                  hover:bg-yellow-300
                  shadow-lg
                  transition
                  active:scale-95
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
                >
                  Next
                </button>

                <button
                  onClick={handleClose}
                  className="
                  w-[30%]
                  sm:w-[200px]
                  xl:w-[220px]
                  h-[64px] sm:h-[72px] xl:h-full
                  text-base sm:text-lg xl:text-xl
                  font-bold
                  rounded-xl
                  bg-red-500 text-white
                  hover:bg-red-600
                  shadow-lg
                  transition
                  active:scale-95
                "
                >
                  Close
                </button>

                {/* COUNTRY CARD */}
                {/* <div
                className="
                  w-[30%]
                  sm:w-[200px]
                  xl:w-[220px]
                  h-[64px] sm:h-[72px] xl:h-full
                  flex items-center justify-center
                  text-base sm:text-lg xl:text-xl
                  font-semibold
                  rounded-xl
                  bg-white/10
                  border border-white/20
                  backdrop-blur-md
                  shadow-lg
                "
              >
                🌍 {matchedUser?.country || "Unknown"}
              </div> */}
              </>
            )}
          </div>
        </div>

        {/* CHAT (desktop only) */}
        <div className="hidden xl:flex xl:w-1/2 overflow-hidden">
          <VideoChatBox wsConnected={wsConnected} uiState={uiState} />
        </div>
      </div>
    </div>
  );
}

export default VideoView;
