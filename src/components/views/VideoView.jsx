// // // import React, { useEffect, useState, useContext } from "react";
// // // import VideoChatBox from "./VideoChatBox";
// // // import { websocketContext } from "../../context/WebSocket.jsx";
// // // import { setupUserMedia } from "../../utils/userMedia.js";
// // // import { webRTCContext } from "../../context/WebRTC.jsx";
// // // import DisplayUserInfoCard from "../DisplayUserInfoCard.jsx";
// // // import Loader from "../Loader.jsx";
// // // import AddFriend from "../AddFriend.jsx";

// // // function VideoView({ onUiStateChange }) {
// // //   const {
// // //     connectToWebSocketServer,
// // //     sendSignal,
// // //     wsConnected,
// // //     uiState,
// // //     setUiState,
// // //   } = useContext(websocketContext);

// // //   const {
// // //     localVideoRef,
// // //     localStreamRef,
// // //     remoteVideoRef,
// // //     videoCallLoader,
// // //     setVideoCallLoader,
// // //     showUserCard,
// // //     setShowUserCard,
// // //     dataChannelForJsonMessages,
// // //     dataChannelForJsonRef,
// // //     matchedUser,
// // //     pcState,
// // //     remoteStream,
// // //     dataChannel,
// // //     pcReady,
// // //     dataChannelReady,
// // //     remoteStreamReady,
// // //     videoPlayingReady,
// // //     cleanupFull,
// // //     sessionActive,
// // //     setSessionActive,
// // //     cleanupRemotePeer,
// // //     endedByMe,
// // //     setEndedByMe,
// // //     setMatchedUser,
// // //   } = useContext(webRTCContext);

// // //   // const [uiState, setUiState] = useState("idle");

// // //   const [started, setStarted] = useState(false);
// // //   const [isLoaderDone, setIsLoaderDone] = useState(false);
// // //   const [isUserCardDone, setIsUserCardDone] = useState(false);
// // //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

// // //   const shouldShowVideo = isLoaderDone && isUserCardDone && isVideoPlaying;

// // //   const [isMatchedDataReceived, setIsMatchedDataReceived] = useState(false);

// // //   const allGoodAndConnected = pcReady && remoteStreamReady && videoPlayingReady;

// // //   const [swapVideos, setSwapVideos] = useState(false);

// // //   console.log("value of pcReady", pcReady);
// // //   console.log("value of remoteStreamReady", remoteStreamReady);

// // //   console.log("value of videoPlayingReady", videoPlayingReady);

// // //   console.log("value of dataChannelReady", dataChannelReady);

// // //   console.log("value of allGoodAndConnected--------->", allGoodAndConnected);

// // //   useEffect(() => {
// // //     let timer;
// // //     if (!videoCallLoader && matchedUser) {
// // //       console.log("calling in if useeffect");
// // //       console.log(
// // //         "value of matched user in if condition of useeffect",
// // //         matchedUser,
// // //       );
// // //       timer = setTimeout(() => {
// // //         setMatchedUser(null);
// // //         setShowUserCard(false);
// // //       }, 3000);
// // //       setShowUserCard(true);
// // //     }

// // //     return () => {
// // //       clearTimeout(timer);
// // //     };
// // //   }, [videoCallLoader, matchedUser]);

// // //   const showAddFriend = !videoCallLoader && !showUserCard && uiState !== "idle";

// // //   /* -------------------- START CALL -------------------- */

// // //   const handleStart = async () => {
// // //     // setEndedByMe(false);

// // //     // setSessionActive(true);

// // //     await setupUserMedia(localVideoRef, localStreamRef);

// // //     sendSignal({ type: "join-queue" });

// // //     // Loader starts here
// // //     setVideoCallLoader(true);
// // //   };

// // //   const handleNext = () => {
// // //     //  setUiState("started");
// // //     // disconnect current peer & requeue
// // //     setEndedByMe(false); // 🔥 I did NOT leave system

// // //     sendSignal({ type: "next" });

// // //     //  cleanupRemotePeer();
// // //     //  setSessionActive(true);
// // //   };

// // //   const handleClose = () => {

// // //     sendSignal({ type: "end-call" });

// // //   };

// // //   /* -------------------- UI -------------------- */
// // //   return (
// // //     <div
// // //       className="
// // //     w-full
// // //     h-[93vh]
// // //     overflow-hidden
// // //     flex
// // //     flex-col
// // //     text-white
// // //     bg-gradient-to-br
// // //     from-[#0f172a]
// // //     via-[#020617]
// // //     to-[#020617]
// // //     border
// // //     border-white/10
// // //     backdrop-blur-xl
// // //   "
// // //     >
// // //       {/* ===================== TOP : VIDEO AREA (70% on xl) ===================== */}
// // //       <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
// // //         {/* LOCAL VIDEO */}
// // //         <div
// // //           onClick={() => setSwapVideos(!swapVideos)}
// // //           className={`
// // //   ${
// // //     swapVideos
// // //       ? "absolute bottom-8 right-4 z-20 w-[110px] h-[160px] rounded-lg border border-white/20 shadow-xl xl:relative xl:w-auto xl:h-auto xl:flex-1"
// // //       : "absolute bottom-8 right-4 z-20 w-[110px] h-[160px] rounded-lg border border-white/20 shadow-xl xl:relative xl:flex-1 xl:h-full"
// // //   }
// // //   bg-black overflow-hidden
// // // `}
// // //         >
// // //           <video
// // //             ref={swapVideos ? remoteVideoRef : localVideoRef}
// // //             autoPlay
// // //             muted
// // //             playsInline
// // //             className="w-full h-full object-cover cursor-pointer"
// // //           />
// // //         </div>

// // //         <div
// // //           onClick={() => setSwapVideos(!swapVideos)}
// // //           className={`
// // //   relative
// // //   ${
// // //     swapVideos
// // //       ? "w-full h-full xl:flex-1 xl:h-full"
// // //       : "w-full h-full xl:flex-1 xl:h-full"
// // //   }
// // //   bg-black overflow-hidden xl:border-l xl:border-white/10
// // // `}
// // //         >
// // //           <video
// // //             ref={swapVideos ? localVideoRef : remoteVideoRef}
// // //             autoPlay
// // //             muted
// // //             playsInline
// // //             className={`
// // //     w-full h-full object-cover cursor-pointer
// // //     transition-opacity duration-300
// // //     ${!videoCallLoader && !showUserCard ? "opacity-100" : "opacity-0"}
// // //   `}
// // //           />

// // //           {videoCallLoader && uiState !== "idle" && (
// // //             <Loader
// // //               uiState={uiState}
// // //               allGoodAndConnected={allGoodAndConnected}
// // //             />
// // //           )}

// // //           {showUserCard && <DisplayUserInfoCard strangerInfo={matchedUser} />}

// // //           {/* ✅ AddFriend overlay */}
// // //           {showAddFriend && allGoodAndConnected && (
// // //             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
// // //               <AddFriend
// // //                 uiState={uiState}
// // //                 allGoodAndConnected={allGoodAndConnected}
// // //               />
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* ===================== BOTTOM : CONTROLS + CHAT (30% on xl) ===================== */}
// // //       <div className="h-[180px] xl:h-[220px] flex flex-row  shrink-0">
// // //         {/* CONTROLS */}
// // //         <div className="xl:w-1/2 w-full flex items-center justify-center px-4 xl:items-stretch">
// // //           {/* FIXED / RESPONSIVE CONTROL AREA */}
// // //           <div
// // //             className="
// // //                         w-full
// // //                         max-w-[520px]
// // //                         flex
// // //                         flex-nowrap
// // //                         justify-center
// // //                         gap-3
// // //                         py-2 sm:py-3 xl:py-4
// // //                         xl:h-full
// // //                         xl:items-stretch

// // //                       "
// // //           >
// // //             {/* START */}
// // //             {uiState === "idle" && (
// // //               <button
// // //                 disabled={started}
// // //                 onClick={handleStart}
// // //                 className={`
// // //     w-[90%]
// // //     sm:w-[220px]
// // //     xl:w-[240px]
// // //     h-[64px] sm:h-[72px] xl:h-full
// // //     text-lg sm:text-xl xl:text-2xl
// // //     font-bold
// // //     rounded-xl

// // //     bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500
// // //     text-white

// // //     shadow-[0_0_16px_rgba(16,185,129,0.45)]
// // //     hover:shadow-[0_0_22px_rgba(16,185,129,0.6)]
// // //     hover:brightness-105

// // //     transition-all duration-300 ease-out
// // //     active:scale-95
// // //     disabled:opacity-50 disabled:shadow-none
// // //   `}
// // //               >
// // //                 Start
// // //               </button>
// // //             )}

// // //             {/* CLOSE (QUEUED) */}
// // //             {uiState === "successfully_queued" && (
// // //               <>
// // //                 <button
// // //                   onClick={handleClose}
// // //                   className="
// // //                   w-[45%]
// // //                   sm:w-[220px]
// // //                   xl:w-[240px]
// // //                   h-[64px] sm:h-[72px] xl:h-full
// // //                   text-base sm:text-lg xl:text-xl
// // //                   font-bold
// // //                   rounded-xl
// // //                   bg-red-500 text-white
// // //                   hover:bg-red-600
// // //                   shadow-lg
// // //                   transition
// // //                   active:scale-95
// // //                 "
// // //                 >
// // //                   Stop
// // //                 </button>
// // //               </>
// // //             )}

// // //             {/* NEXT + CLOSE */}
// // //             {(allGoodAndConnected ||
// // //               uiState === "successfully_skipped_and_searching") && (
// // //               <>
// // //                 <button
// // //                   onClick={handleNext}
// // //                   disabled={
// // //                     uiState === "successfully_skipped_and_searching" ||
// // //                     videoCallLoader ||
// // //                     !allGoodAndConnected ||
// // //                     showUserCard
// // //                   }
// // //                   className="
// // //                   w-[30%]
// // //                   sm:w-[200px]
// // //                   xl:w-[220px]
// // //                   h-[64px] sm:h-[72px] xl:h-full
// // //                   text-base sm:text-lg xl:text-xl
// // //                   font-bold
// // //                   rounded-xl
// // //                   bg-yellow-400 text-black
// // //                   hover:bg-yellow-300
// // //                   shadow-lg
// // //                   transition
// // //                   active:scale-95
// // //                   disabled:opacity-50
// // //                   disabled:cursor-not-allowed
// // //                 "
// // //                 >
// // //                   Next
// // //                 </button>

// // //                 <button
// // //                   onClick={handleClose}
// // //                   className="
// // //                   w-[30%]
// // //                   sm:w-[200px]
// // //                   xl:w-[220px]
// // //                   h-[64px] sm:h-[72px] xl:h-full
// // //                   text-base sm:text-lg xl:text-xl
// // //                   font-bold
// // //                   rounded-xl
// // //                   bg-red-500 text-white
// // //                   hover:bg-red-600
// // //                   shadow-lg
// // //                   transition
// // //                   active:scale-95
// // //                 "
// // //                 >
// // //                   Stop
// // //                 </button>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* CHAT (desktop only) */}
// // //         <div className="hidden xl:flex xl:w-1/2 overflow-hidden">
// // //           <VideoChatBox wsConnected={wsConnected} uiState={uiState} />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default VideoView;

// // import React, { useEffect, useState, useContext } from "react";
// // import VideoChatBox from "./VideoChatBox";
// // import { websocketContext } from "../../context/WebSocket.jsx";
// // import { setupUserMedia } from "../../utils/userMedia.js";
// // import { webRTCContext } from "../../context/WebRTC.jsx";
// // import DisplayUserInfoCard from "../DisplayUserInfoCard.jsx";
// // import Loader from "../Loader.jsx";
// // import AddFriend from "../AddFriend.jsx";

// // function VideoView({ onUiStateChange }) {
// //   const {
// //     connectToWebSocketServer,
// //     sendSignal,
// //     wsConnected,
// //     uiState,
// //     setUiState,
// //   } = useContext(websocketContext);

// //   const {
// //     localVideoRef,
// //     localStreamRef,
// //     remoteVideoRef,
// //     videoCallLoader,
// //     setVideoCallLoader,
// //     showUserCard,
// //     setShowUserCard,
// //     dataChannelForJsonMessages,
// //     dataChannelForJsonRef,
// //     matchedUser,
// //     pcState,
// //     remoteStream,
// //     dataChannel,
// //     pcReady,
// //     dataChannelReady,
// //     remoteStreamReady,
// //     videoPlayingReady,
// //     cleanupFull,
// //     sessionActive,
// //     setSessionActive,
// //     cleanupRemotePeer,
// //     endedByMe,
// //     setEndedByMe,
// //     setMatchedUser,
// //   } = useContext(webRTCContext);

// //   const [started, setStarted] = useState(false);
// //   const [isLoaderDone, setIsLoaderDone] = useState(false);
// //   const [isUserCardDone, setIsUserCardDone] = useState(false);
// //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

// //   const shouldShowVideo = isLoaderDone && isUserCardDone && isVideoPlaying;
// //   const [isMatchedDataReceived, setIsMatchedDataReceived] = useState(false);
// //   const allGoodAndConnected = pcReady && remoteStreamReady && videoPlayingReady;

// //   console.log("value of pcReady", pcReady);
// //   console.log("value of remoteStreamReady", remoteStreamReady);
// //   console.log("value of videoPlayingReady", videoPlayingReady);
// //   console.log("value of dataChannelReady", dataChannelReady);
// //   console.log("value of allGoodAndConnected--------->", allGoodAndConnected);

// //   useEffect(() => {
// //     let timer;
// //     if (!videoCallLoader && matchedUser) {
// //       console.log("calling in if useeffect");
// //       console.log(
// //         "value of matched user in if condition of useeffect",
// //         matchedUser,
// //       );
// //       timer = setTimeout(() => {
// //         setMatchedUser(null);
// //         setShowUserCard(false);
// //       }, 3000);
// //       setShowUserCard(true);
// //     }
// //     return () => clearTimeout(timer);
// //   }, [videoCallLoader, matchedUser]);

// //   const showAddFriend = !videoCallLoader && !showUserCard && uiState !== "idle";

// //   /* -------------------- HANDLERS -------------------- */

// //   const handleStart = async () => {
// //     await setupUserMedia(localVideoRef, localStreamRef);
// //     sendSignal({ type: "join-queue" });
// //     setVideoCallLoader(true);
// //   };

// //   const handleNext = () => {
// //     setEndedByMe(false);
// //     sendSignal({ type: "next" });
// //     // local stream stays alive — no cleanup of localStreamRef here
// //   };

// //   const handleClose = () => {
// //     sendSignal({ type: "end-call" });
// //   };

// //   /* -------------------- UI -------------------- */
// //   return (
// //     <div className="w-full h-[93vh] overflow-hidden flex flex-col text-white bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] border border-white/10 backdrop-blur-xl">
// //       {/* ===================== VIDEO AREA ===================== */}
// //       <div className="flex-1 overflow-hidden relative flex flex-col xl:flex-row">
// //         {/* ── LOCAL VIDEO ──
// //             Mobile : small PiP overlay, bottom-left
// //             Desktop: left half, full height               */}
// //         <div
// //           className="
// //           absolute bottom-4 left-3 z-20
// //           w-[100px] h-[150px] rounded-xl
// //           border border-white/20 shadow-2xl
// //           xl:static xl:w-1/2 xl:h-full
// //           xl:rounded-none xl:border-0 xl:shadow-none xl:z-auto
// //           bg-black overflow-hidden
// //           xl:border-r xl:border-white/10
// //         "
// //         >
// //           <video
// //             ref={localVideoRef}
// //             autoPlay
// //             muted
// //             playsInline
// //             className="w-full h-full object-cover"
// //           />
// //         </div>

// //         {/* ── REMOTE VIDEO ──
// //             Mobile : fills the full area (behind PiP)
// //             Desktop: right half, full height              */}
// //         <div
// //           className="
// //           w-full h-full
// //           xl:w-1/2 xl:h-full xl:flex-shrink-0
// //           bg-black overflow-hidden relative
// //         "
// //         >
// //           <video
// //             ref={remoteVideoRef}
// //             autoPlay
// //             playsInline
// //             className={`
// //               w-full h-full object-cover
// //               transition-opacity duration-300
// //               ${!videoCallLoader && !showUserCard ? "opacity-100" : "opacity-0"}
// //             `}
// //           />

// //           {videoCallLoader && uiState !== "idle" && (
// //             <Loader
// //               uiState={uiState}
// //               allGoodAndConnected={allGoodAndConnected}
// //             />
// //           )}

// //           {showUserCard && <DisplayUserInfoCard strangerInfo={matchedUser} />}

// //           {showAddFriend && allGoodAndConnected && (
// //             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
// //               <AddFriend
// //                 uiState={uiState}
// //                 allGoodAndConnected={allGoodAndConnected}
// //               />
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* ===================== CONTROLS + CHAT ===================== */}
// //       <div className="h-[180px] xl:h-[220px] flex flex-row shrink-0">
// //         {/* CONTROLS */}
// //         <div className="xl:w-1/2 w-full flex items-center justify-center px-4 xl:items-stretch">
// //           <div className="w-full max-w-[520px] flex flex-nowrap justify-center gap-3 py-2 sm:py-3 xl:py-4 xl:h-full xl:items-stretch">
// //             {/* START */}
// //             {uiState === "idle" && (
// //               <button
// //                 disabled={started}
// //                 onClick={handleStart}
// //                 className="
// //                   w-[90%] sm:w-[220px] xl:w-[240px]
// //                   h-[64px] sm:h-[72px] xl:h-full
// //                   text-lg sm:text-xl xl:text-2xl font-bold rounded-xl
// //                   bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500
// //                   text-white
// //                   shadow-[0_0_16px_rgba(16,185,129,0.45)]
// //                   hover:shadow-[0_0_22px_rgba(16,185,129,0.6)]
// //                   hover:brightness-105
// //                   transition-all duration-300 ease-out
// //                   active:scale-95
// //                   disabled:opacity-50 disabled:shadow-none
// //                 "
// //               >
// //                 Start
// //               </button>
// //             )}

// //             {/* STOP (queued) */}
// //             {uiState === "successfully_queued" && (
// //               <button
// //                 onClick={handleClose}
// //                 className="
// //                   w-[45%] sm:w-[220px] xl:w-[240px]
// //                   h-[64px] sm:h-[72px] xl:h-full
// //                   text-base sm:text-lg xl:text-xl font-bold rounded-xl
// //                   bg-red-500 text-white hover:bg-red-600
// //                   shadow-lg transition active:scale-95
// //                 "
// //               >
// //                 Stop
// //               </button>
// //             )}

// //             {/* NEXT + STOP */}
// //             {(allGoodAndConnected ||
// //               uiState === "successfully_skipped_and_searching") && (
// //               <>
// //                 <button
// //                   onClick={handleNext}
// //                   disabled={
// //                     uiState === "successfully_skipped_and_searching" ||
// //                     videoCallLoader ||
// //                     !allGoodAndConnected ||
// //                     showUserCard
// //                   }
// //                   className="
// //                     w-[30%] sm:w-[200px] xl:w-[220px]
// //                     h-[64px] sm:h-[72px] xl:h-full
// //                     text-base sm:text-lg xl:text-xl font-bold rounded-xl
// //                     bg-yellow-400 text-black hover:bg-yellow-300
// //                     shadow-lg transition active:scale-95
// //                     disabled:opacity-50 disabled:cursor-not-allowed
// //                   "
// //                 >
// //                   Next
// //                 </button>

// //                 <button
// //                   onClick={handleClose}
// //                   className="
// //                     w-[30%] sm:w-[200px] xl:w-[220px]
// //                     h-[64px] sm:h-[72px] xl:h-full
// //                     text-base sm:text-lg xl:text-xl font-bold rounded-xl
// //                     bg-red-500 text-white hover:bg-red-600
// //                     shadow-lg transition active:scale-95
// //                   "
// //                 >
// //                   Stop
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* CHAT (desktop only) */}
// //         <div className="hidden xl:flex xl:w-1/2 overflow-hidden">
// //           <VideoChatBox wsConnected={wsConnected} uiState={uiState} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default VideoView;

// // import React, {
// //   useEffect,
// //   useState,
// //   useContext,
// //   useRef,
// //   useCallback,
// // } from "react";
// // import VideoChatBox from "./VideoChatBox";
// // import { websocketContext } from "../../context/WebSocket.jsx";
// // import { setupUserMedia } from "../../utils/userMedia.js";
// // import { webRTCContext } from "../../context/WebRTC.jsx";
// // import DisplayUserInfoCard from "../DisplayUserInfoCard.jsx";
// // import Loader from "../Loader.jsx";
// // import AddFriend from "../AddFriend.jsx";

// // function VideoView({ onUiStateChange }) {
// //   const {
// //     connectToWebSocketServer,
// //     sendSignal,
// //     wsConnected,
// //     uiState,
// //     setUiState,
// //   } = useContext(websocketContext);

// //   const {
// //     localVideoRef,
// //     localStreamRef,
// //     remoteVideoRef,
// //     videoCallLoader,
// //     setVideoCallLoader,
// //     showUserCard,
// //     setShowUserCard,
// //     dataChannelForJsonMessages,
// //     dataChannelForJsonRef,
// //     matchedUser,
// //     pcState,
// //     remoteStream,
// //     dataChannel,
// //     pcReady,
// //     dataChannelReady,
// //     remoteStreamReady,
// //     videoPlayingReady,
// //     cleanupFull,
// //     sessionActive,
// //     setSessionActive,
// //     cleanupRemotePeer,
// //     endedByMe,
// //     setEndedByMe,
// //     setMatchedUser,
// //   } = useContext(webRTCContext);

// //   const [started, setStarted] = useState(false);
// //   const [isLoaderDone, setIsLoaderDone] = useState(false);
// //   const [isUserCardDone, setIsUserCardDone] = useState(false);
// //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

// //   const shouldShowVideo = isLoaderDone && isUserCardDone && isVideoPlaying;
// //   const [isMatchedDataReceived, setIsMatchedDataReceived] = useState(false);
// //   const allGoodAndConnected = pcReady && remoteStreamReady && videoPlayingReady;

// //   // ── Draggable PiP state ──
// //   const pipRef = useRef(null);
// //   const dragState = useRef({
// //     dragging: false,
// //     startX: 0,
// //     startY: 0,
// //     origX: 0,
// //     origY: 0,
// //   });
// //   const [pipPos, setPipPos] = useState({ x: 12, y: 12 }); // top-left default

// //   console.log("value of pcReady", pcReady);
// //   console.log("value of remoteStreamReady", remoteStreamReady);
// //   console.log("value of videoPlayingReady", videoPlayingReady);
// //   console.log("value of dataChannelReady", dataChannelReady);
// //   console.log("value of allGoodAndConnected--------->", allGoodAndConnected);

// //   useEffect(() => {
// //     let timer;
// //     if (!videoCallLoader && matchedUser) {
// //       console.log("calling in if useeffect");
// //       console.log(
// //         "value of matched user in if condition of useeffect",
// //         matchedUser,
// //       );
// //       timer = setTimeout(() => {
// //         setMatchedUser(null);
// //         setShowUserCard(false);
// //       }, 3000);
// //       setShowUserCard(true);
// //     }
// //     return () => clearTimeout(timer);
// //   }, [videoCallLoader, matchedUser]);

// //   const showAddFriend = !videoCallLoader && !showUserCard && uiState !== "idle";

// //   /* ── Drag handlers ── */
// //   const onPointerDown = useCallback(
// //     (e) => {
// //       e.preventDefault();
// //       const el = pipRef.current;
// //       if (!el) return;
// //       dragState.current = {
// //         dragging: true,
// //         startX: e.clientX,
// //         startY: e.clientY,
// //         origX: pipPos.x,
// //         origY: pipPos.y,
// //       };

// //       const onMove = (ev) => {
// //         if (!dragState.current.dragging) return;
// //         const dx = ev.clientX - dragState.current.startX;
// //         const dy = ev.clientY - dragState.current.startY;
// //         const parent = el.parentElement;
// //         if (!parent) return;
// //         const maxX = parent.clientWidth - el.offsetWidth;
// //         const maxY = parent.clientHeight - el.offsetHeight;
// //         setPipPos({
// //           x: Math.min(Math.max(0, dragState.current.origX + dx), maxX),
// //           y: Math.min(Math.max(0, dragState.current.origY + dy), maxY),
// //         });
// //       };

// //       const onUp = () => {
// //         dragState.current.dragging = false;
// //         window.removeEventListener("pointermove", onMove);
// //         window.removeEventListener("pointerup", onUp);
// //       };

// //       window.addEventListener("pointermove", onMove);
// //       window.addEventListener("pointerup", onUp);
// //     },
// //     [pipPos],
// //   );

// //   /* -------------------- HANDLERS -------------------- */

// //   const handleStart = async () => {
// //     await setupUserMedia(localVideoRef, localStreamRef);
// //     sendSignal({ type: "join-queue" });
// //     setVideoCallLoader(true);
// //   };

// //   const handleNext = () => {
// //     setEndedByMe(false);
// //     sendSignal({ type: "next" });
// //   };

// //   const handleClose = () => {
// //     sendSignal({ type: "end-call" });
// //   };

// //   /* -------------------- UI -------------------- */
// //   return (
// //     <div className="w-full h-[93vh] overflow-hidden flex flex-col text-white bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] border border-white/10 backdrop-blur-xl">
// //       {/* ===================== VIDEO AREA ===================== */}
// //       <div className="flex-1 overflow-hidden relative flex flex-col xl:flex-row">
// //         {/* ── LOCAL VIDEO ──
// //             Mobile : draggable PiP, top-left by default
// //             Desktop: left half, full height               */}
// //         <div
// //           ref={pipRef}
// //           onPointerDown={onPointerDown}
// //           style={{ left: pipPos.x, top: pipPos.y }}
// //           className="
// //             absolute z-[50] cursor-grab active:cursor-grabbing
// //             w-[100px] h-[150px]
// //             rounded-xl overflow-hidden
// //             border border-white/20 shadow-2xl
// //             bg-black
// //             xl:static xl:w-1/2 xl:h-full
// //             xl:rounded-none xl:border-0 xl:shadow-none xl:z-auto
// //             xl:cursor-default
// //             xl:border-r xl:border-white/10
// //           "
// //         >
// //           <video
// //             ref={localVideoRef}
// //             autoPlay
// //             muted
// //             playsInline
// //             className="w-full h-full object-cover"
// //           />
// //           {/* Drag hint — mobile only */}
// //           <div className="absolute bottom-1 right-1 xl:hidden pointer-events-none">
// //             <div className="w-4 h-4 rounded-sm bg-black/40 flex items-center justify-center">
// //               <svg
// //                 width="8"
// //                 height="8"
// //                 viewBox="0 0 10 10"
// //                 fill="white"
// //                 opacity="0.6"
// //               >
// //                 <circle cx="2" cy="2" r="1" />
// //                 <circle cx="5" cy="2" r="1" />
// //                 <circle cx="8" cy="2" r="1" />
// //                 <circle cx="2" cy="5" r="1" />
// //                 <circle cx="5" cy="5" r="1" />
// //                 <circle cx="8" cy="5" r="1" />
// //                 <circle cx="2" cy="8" r="1" />
// //                 <circle cx="5" cy="8" r="1" />
// //                 <circle cx="8" cy="8" r="1" />
// //               </svg>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── REMOTE VIDEO ──
// //             Mobile : fills the full area (behind PiP)
// //             Desktop: right half, full height              */}
// //         <div
// //           className="
// //           w-full h-full
// //           xl:w-1/2 xl:h-full xl:flex-shrink-0
// //           bg-black overflow-hidden relative
// //         "
// //         >
// //           <video
// //             ref={remoteVideoRef}
// //             autoPlay
// //             playsInline
// //             className={`
// //               w-full h-full object-cover
// //               transition-opacity duration-300
// //               ${!videoCallLoader && !showUserCard ? "opacity-100" : "opacity-0"}
// //             `}
// //           />

// //           {videoCallLoader && uiState !== "idle" && (
// //             <Loader
// //               uiState={uiState}
// //               allGoodAndConnected={allGoodAndConnected}
// //             />
// //           )}

// //           {showUserCard && <DisplayUserInfoCard strangerInfo={matchedUser} />}

// //           {showAddFriend && allGoodAndConnected && (
// //             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
// //               <AddFriend
// //                 uiState={uiState}
// //                 allGoodAndConnected={allGoodAndConnected}
// //               />
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* ===================== CONTROLS + CHAT ===================== */}
// //       <div className="h-[180px] xl:h-[220px] flex flex-row shrink-0">
// //         {/* CONTROLS */}
// //         <div className="xl:w-1/2 w-full flex items-center justify-center px-4 xl:items-stretch">
// //           <div className="w-full max-w-[520px] flex flex-nowrap justify-center gap-3 py-2 sm:py-3 xl:py-4 xl:h-full xl:items-stretch">
// //             {/* START */}
// //             {uiState === "idle" && (
// //               <button
// //                 disabled={started}
// //                 onClick={handleStart}
// //                 className="
// //                   w-[90%] sm:w-[220px] xl:w-[240px]
// //                   h-[64px] sm:h-[72px] xl:h-full
// //                   text-lg sm:text-xl xl:text-2xl font-bold rounded-xl
// //                   bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500
// //                   text-white
// //                   shadow-[0_0_16px_rgba(16,185,129,0.45)]
// //                   hover:shadow-[0_0_22px_rgba(16,185,129,0.6)]
// //                   hover:brightness-105
// //                   transition-all duration-300 ease-out
// //                   active:scale-95
// //                   disabled:opacity-50 disabled:shadow-none
// //                 "
// //               >
// //                 Start
// //               </button>
// //             )}

// //             {/* STOP (queued) */}
// //             {uiState === "successfully_queued" && (
// //               <button
// //                 onClick={handleClose}
// //                 className="
// //                   w-[45%] sm:w-[220px] xl:w-[240px]
// //                   h-[64px] sm:h-[72px] xl:h-full
// //                   text-base sm:text-lg xl:text-xl font-bold rounded-xl
// //                   bg-red-500 text-white hover:bg-red-600
// //                   shadow-lg transition active:scale-95
// //                 "
// //               >
// //                 Stop
// //               </button>
// //             )}

// //             {/* NEXT + STOP */}
// //             {(allGoodAndConnected ||
// //               uiState === "successfully_skipped_and_searching") && (
// //               <>
// //                 <button
// //                   onClick={handleNext}
// //                   disabled={
// //                     uiState === "successfully_skipped_and_searching" ||
// //                     videoCallLoader ||
// //                     !allGoodAndConnected ||
// //                     showUserCard
// //                   }
// //                   className="
// //                     w-[30%] sm:w-[200px] xl:w-[220px]
// //                     h-[64px] sm:h-[72px] xl:h-full
// //                     text-base sm:text-lg xl:text-xl font-bold rounded-xl
// //                     bg-yellow-400 text-black hover:bg-yellow-300
// //                     shadow-lg transition active:scale-95
// //                     disabled:opacity-50 disabled:cursor-not-allowed
// //                   "
// //                 >
// //                   Next
// //                 </button>

// //                 <button
// //                   onClick={handleClose}
// //                   className="
// //                     w-[30%] sm:w-[200px] xl:w-[220px]
// //                     h-[64px] sm:h-[72px] xl:h-full
// //                     text-base sm:text-lg xl:text-xl font-bold rounded-xl
// //                     bg-red-500 text-white hover:bg-red-600
// //                     shadow-lg transition active:scale-95
// //                   "
// //                 >
// //                   Stop
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* CHAT (desktop only) */}
// //         <div className="hidden xl:flex xl:w-1/2 overflow-hidden">
// //           <VideoChatBox wsConnected={wsConnected} uiState={uiState} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default VideoView;

// import React, {
//   useEffect,
//   useState,
//   useContext,
//   useRef,
//   useCallback,
// } from "react";
// import VideoChatBox from "./VideoChatBox";
// import { websocketContext } from "../../context/WebSocket.jsx";
// import { setupUserMedia } from "../../utils/userMedia.js";
// import { webRTCContext } from "../../context/WebRTC.jsx";
// import DisplayUserInfoCard from "../DisplayUserInfoCard.jsx";
// import Loader from "../Loader.jsx";
// import AddFriend from "../AddFriend.jsx";

// function VideoView({ onUiStateChange }) {
//   const {
//     connectToWebSocketServer,
//     sendSignal,
//     wsConnected,
//     uiState,
//     setUiState,
//   } = useContext(websocketContext);

//   const {
//     localVideoRef,
//     localStreamRef,
//     remoteVideoRef,
//     videoCallLoader,
//     setVideoCallLoader,
//     showUserCard,
//     setShowUserCard,
//     dataChannelForJsonMessages,
//     dataChannelForJsonRef,
//     matchedUser,
//     pcState,
//     remoteStream,
//     dataChannel,
//     pcReady,
//     dataChannelReady,
//     remoteStreamReady,
//     videoPlayingReady,
//     cleanupFull,
//     sessionActive,
//     setSessionActive,
//     cleanupRemotePeer,
//     endedByMe,
//     setEndedByMe,
//     setMatchedUser,
//   } = useContext(webRTCContext);

//   const [started, setStarted] = useState(false);
//   const [isLoaderDone, setIsLoaderDone] = useState(false);
//   const [isUserCardDone, setIsUserCardDone] = useState(false);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

//   const shouldShowVideo = isLoaderDone && isUserCardDone && isVideoPlaying;
//   const [isMatchedDataReceived, setIsMatchedDataReceived] = useState(false);
//   const allGoodAndConnected = pcReady && remoteStreamReady && videoPlayingReady;

//   const pipRef = useRef(null);
//   const dragState = useRef({
//     dragging: false,
//     startX: 0,
//     startY: 0,
//     origX: 0,
//     origY: 0,
//   });
//   const [pipPos, setPipPos] = useState({ x: 12, y: 12 });

//   console.log("value of pcReady", pcReady);
//   console.log("value of remoteStreamReady", remoteStreamReady);
//   console.log("value of videoPlayingReady", videoPlayingReady);
//   console.log("value of dataChannelReady", dataChannelReady);
//   console.log("value of allGoodAndConnected--------->", allGoodAndConnected);

//   useEffect(() => {
//     let timer;
//     if (!videoCallLoader && matchedUser) {
//       console.log("calling in if useeffect");
//       console.log(
//         "value of matched user in if condition of useeffect",
//         matchedUser,
//       );
//       timer = setTimeout(() => {
//         setMatchedUser(null);
//         setShowUserCard(false);
//       }, 3000);
//       setShowUserCard(true);
//     }
//     return () => clearTimeout(timer);
//   }, [videoCallLoader, matchedUser]);

//   const showAddFriend = !videoCallLoader && !showUserCard && uiState !== "idle";

//   const onPointerDown = useCallback(
//     (e) => {
//       e.preventDefault();
//       const el = pipRef.current;
//       if (!el) return;
//       dragState.current = {
//         dragging: true,
//         startX: e.clientX,
//         startY: e.clientY,
//         origX: pipPos.x,
//         origY: pipPos.y,
//       };
//       const onMove = (ev) => {
//         if (!dragState.current.dragging) return;
//         const dx = ev.clientX - dragState.current.startX;
//         const dy = ev.clientY - dragState.current.startY;
//         const parent = el.parentElement;
//         if (!parent) return;
//         const maxX = parent.clientWidth - el.offsetWidth;
//         const maxY = parent.clientHeight - el.offsetHeight;
//         setPipPos({
//           x: Math.min(Math.max(0, dragState.current.origX + dx), maxX),
//           y: Math.min(Math.max(0, dragState.current.origY + dy), maxY),
//         });
//       };
//       const onUp = () => {
//         dragState.current.dragging = false;
//         window.removeEventListener("pointermove", onMove);
//         window.removeEventListener("pointerup", onUp);
//       };
//       window.addEventListener("pointermove", onMove);
//       window.addEventListener("pointerup", onUp);
//     },
//     [pipPos],
//   );

//   const handleStart = async () => {
//     await setupUserMedia(localVideoRef, localStreamRef);
//     sendSignal({ type: "join-queue" });
//     setVideoCallLoader(true);
//   };

//   const handleNext = () => {
//     setEndedByMe(false);
//     sendSignal({ type: "next" });
//   };

//   const handleClose = () => {
//     sendSignal({ type: "end-call" });
//   };

//   return (
//     // <div className="w-full h-[93vh] overflow-hidden flex flex-col text-white bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] border border-white/10">
//     <div
//       className="w-full overflow-hidden flex flex-col text-white bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] border border-white/10"
//       style={{
//         height: "100dvh",
//         paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)",
//       }}
//     >
//       {/* ===================== VIDEO AREA ===================== */}
//       <div className="flex-1 overflow-hidden relative flex flex-col xl:flex-row min-h-0">
//         {/* ── LOCAL VIDEO ── */}
//         <div
//           ref={pipRef}
//           onPointerDown={onPointerDown}
//           style={{ left: pipPos.x, top: pipPos.y }}
//           className="
//             absolute z-[50] cursor-grab active:cursor-grabbing
//             w-[100px] h-[150px] rounded-xl overflow-hidden
//             border border-white/20 shadow-2xl bg-black
//             xl:static xl:w-1/2 xl:h-full
//             xl:rounded-none xl:border-0 xl:shadow-none xl:z-auto
//             xl:cursor-default xl:border-r xl:border-white/10
//           "
//         >
//           <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             playsInline
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute bottom-1 right-1 xl:hidden pointer-events-none">
//             <div className="w-4 h-4 rounded-sm bg-black/40 flex items-center justify-center">
//               <svg
//                 width="8"
//                 height="8"
//                 viewBox="0 0 10 10"
//                 fill="white"
//                 opacity="0.6"
//               >
//                 <circle cx="2" cy="2" r="1" />
//                 <circle cx="5" cy="2" r="1" />
//                 <circle cx="8" cy="2" r="1" />
//                 <circle cx="2" cy="5" r="1" />
//                 <circle cx="5" cy="5" r="1" />
//                 <circle cx="8" cy="5" r="1" />
//                 <circle cx="2" cy="8" r="1" />
//                 <circle cx="5" cy="8" r="1" />
//                 <circle cx="8" cy="8" r="1" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* ── REMOTE VIDEO ── */}
//         <div className="w-full h-full xl:w-1/2 xl:h-full xl:flex-shrink-0 bg-black overflow-hidden relative">
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             playsInline
//             className={`
//               w-full h-full object-cover transition-opacity duration-300
//               ${!videoCallLoader && !showUserCard ? "opacity-100" : "opacity-0"}
//             `}
//           />
//           {videoCallLoader && uiState !== "idle" && (
//             <Loader
//               uiState={uiState}
//               allGoodAndConnected={allGoodAndConnected}
//             />
//           )}
//           {showUserCard && <DisplayUserInfoCard strangerInfo={matchedUser} />}
//           {showAddFriend && allGoodAndConnected && (
//             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
//               <AddFriend
//                 uiState={uiState}
//                 allGoodAndConnected={allGoodAndConnected}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ===================== CONTROLS + CHAT ===================== */}
//       <div
//         className="
//         h-[180px] xl:h-[200px]
//         flex flex-row shrink-0
//         border-t border-white/10
//         bg-[#020617]/80 backdrop-blur-md
//       "
//       >
//         {/* CONTROLS — left half on xl */}
//         <div
//           className="
//           xl:w-1/2 w-full
//           flex items-center justify-center
//           px-6
//           border-r border-white/10
//         "
//         >
//           <div className="flex items-center justify-center gap-3 w-full max-w-[420px]">
//             {/* START */}
//             {uiState === "idle" && (
//               <button
//                 disabled={started}
//                 onClick={handleStart}
//                 className="
//                   w-full xl:w-[200px]
//                   h-[52px]
//                   text-[15px] font-semibold tracking-wide rounded-xl
//                   bg-emerald-600 hover:bg-emerald-500
//                   text-white
//                   border border-emerald-500/40
//                   shadow-[0_0_20px_rgba(16,185,129,0.3)]
//                   hover:shadow-[0_0_28px_rgba(16,185,129,0.45)]
//                   transition-all duration-200 ease-out
//                   active:scale-[0.97]
//                   disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed
//                 "
//               >
//                 Start
//               </button>
//             )}

//             {/* STOP (queued) */}
//             {uiState === "successfully_queued" && (
//               <button
//                 onClick={handleClose}
//                 className="
//                   w-full xl:w-[200px]
//                   h-[52px]
//                   text-[15px] font-semibold tracking-wide rounded-xl
//                   bg-red-600 hover:bg-red-500
//                   text-white
//                   border border-red-500/30
//                   shadow-[0_0_20px_rgba(239,68,68,0.2)]
//                   hover:shadow-[0_0_28px_rgba(239,68,68,0.35)]
//                   transition-all duration-200
//                   active:scale-[0.97]
//                 "
//               >
//                 Stop
//               </button>
//             )}

//             {/* NEXT + STOP */}
//             {(allGoodAndConnected ||
//               uiState === "successfully_skipped_and_searching") && (
//               <>
//                 <button
//                   onClick={handleNext}
//                   disabled={
//                     uiState === "successfully_skipped_and_searching" ||
//                     videoCallLoader ||
//                     !allGoodAndConnected ||
//                     showUserCard
//                   }
//                   className="
//                     flex-1 xl:w-[180px] xl:flex-none
//                     h-[52px]
//                     text-[15px] font-semibold tracking-wide rounded-xl
//                     bg-amber-400 hover:bg-amber-300
//                     text-neutral-900
//                     border border-amber-300/40
//                     shadow-[0_0_20px_rgba(251,191,36,0.2)]
//                     hover:shadow-[0_0_28px_rgba(251,191,36,0.35)]
//                     transition-all duration-200
//                     active:scale-[0.97]
//                     disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
//                   "
//                 >
//                   Next
//                 </button>

//                 <button
//                   onClick={handleClose}
//                   className="
//                     flex-1 xl:w-[180px] xl:flex-none
//                     h-[52px]
//                     text-[15px] font-semibold tracking-wide rounded-xl
//                     bg-red-600 hover:bg-red-500
//                     text-white
//                     border border-red-500/30
//                     shadow-[0_0_20px_rgba(239,68,68,0.2)]
//                     hover:shadow-[0_0_28px_rgba(239,68,68,0.35)]
//                     transition-all duration-200
//                     active:scale-[0.97]
//                   "
//                 >
//                   Stop
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* CHAT — right half on xl */}
//         <div className="hidden xl:flex xl:w-1/2 overflow-hidden">
//           <VideoChatBox wsConnected={wsConnected} uiState={uiState} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VideoView;

import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import VideoChatBox from "./VideoChatBox";
import { websocketContext } from "../../context/WebSocket.jsx";
import { setupUserMedia } from "../../utils/userMedia.js";
import { webRTCContext } from "../../context/WebRTC.jsx";
import DisplayUserInfoCard from "../DisplayUserInfoCard.jsx";
import Loader from "../Loader.jsx";
import AddFriend from "../AddFriend.jsx";
 // 1. import at the top
  import SplashScreen from "../SplashScreen";


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

  const [started, setStarted] = useState(false);
  const [isLoaderDone, setIsLoaderDone] = useState(false);
  const [isUserCardDone, setIsUserCardDone] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

 
  // 2. add state
  const [showSplash, setShowSplash] = useState(true);

  const shouldShowVideo = isLoaderDone && isUserCardDone && isVideoPlaying;
  const [isMatchedDataReceived, setIsMatchedDataReceived] = useState(false);
  const allGoodAndConnected = pcReady && remoteStreamReady && videoPlayingReady;

  const pipRef = useRef(null);
  const dragState = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });
  const [pipPos, setPipPos] = useState({ x: 12, y: 12 });

  console.log("value of pcReady", pcReady);
  console.log("value of remoteStreamReady", remoteStreamReady);
  console.log("value of videoPlayingReady", videoPlayingReady);
  console.log("value of dataChannelReady", dataChannelReady);
  console.log("value of allGoodAndConnected--------->", allGoodAndConnected);

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
    return () => clearTimeout(timer);
  }, [videoCallLoader, matchedUser]);

  // const showAddFriend = !videoCallLoader && !showUserCard && uiState !== "idle";

  // After
  const showAddFriend =
    !videoCallLoader &&
    !showUserCard &&
    uiState !== "idle" &&
    allGoodAndConnected;

  const onPointerDown = useCallback(
    (e) => {
      e.preventDefault();
      const el = pipRef.current;
      if (!el) return;
      dragState.current = {
        dragging: true,
        startX: e.clientX,
        startY: e.clientY,
        origX: pipPos.x,
        origY: pipPos.y,
      };
      const onMove = (ev) => {
        if (!dragState.current.dragging) return;
        const dx = ev.clientX - dragState.current.startX;
        const dy = ev.clientY - dragState.current.startY;
        const parent = el.parentElement;
        if (!parent) return;
        const maxX = parent.clientWidth - el.offsetWidth;
        const maxY = parent.clientHeight - el.offsetHeight;
        setPipPos({
          x: Math.min(Math.max(0, dragState.current.origX + dx), maxX),
          y: Math.min(Math.max(0, dragState.current.origY + dy), maxY),
        });
      };
      const onUp = () => {
        dragState.current.dragging = false;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [pipPos],
  );

  const handleStart = async () => {
    await setupUserMedia(localVideoRef, localStreamRef);
    sendSignal({ type: "join-queue" });
    setVideoCallLoader(true);
  };

  const handleNext = () => {
    setEndedByMe(false);
    sendSignal({ type: "next" });
  };

  const handleClose = () => {
    sendSignal({ type: "end-call" });
  };

  return (
    // ✅ No fixed height — fills whatever <main> gives it (flex-1 in Layout)
    // ✅ overflow-hidden stops any internal scrolling
    <div className="w-full h-full overflow-hidden relative flex flex-col text-white bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617]">
      {/* ===================== VIDEO AREA ===================== */}
      {/* ✅ min-h-0 is critical — without it, flex children don't shrink below their content size */}

      {/* Video Splash */}
      {showSplash && (
      
        <SplashScreen
          onDone={() => setShowSplash(false)}
          config={{
            from: "#06b6d4",
            to: "#3b82f6",
            glow: "6,182,212",
            title: "Video Chat",
            duration: 2000,
            iconBoxSize: 150, // 👈 controls the box size
            icon: (
              <svg
                width="120" // 👈 icon fills the box
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="8" width="20" height="13" rx="2" />
                <line x1="8" y1="8" x2="5" y2="2" />
                <line x1="16" y1="8" x2="19" y2="2" />
                <circle cx="5" cy="2" r="0.8" fill="#fff" />
                <circle cx="19" cy="2" r="0.8" fill="#fff" />
                <line x1="8" y1="21" x2="7" y2="23" />
                <line x1="16" y1="21" x2="17" y2="23" />
              </svg>
            ),
          }}
        />
      )}
      <div className="flex-1 min-h-0 overflow-hidden relative flex flex-col xl:flex-row">
        {/* ── LOCAL VIDEO (PiP on mobile, left half on desktop) ── */}
        <div
          ref={pipRef}
          onPointerDown={onPointerDown}
          style={{ left: pipPos.x, top: pipPos.y }}
          className="
            absolute z-[50] cursor-grab active:cursor-grabbing
            w-[100px] h-[150px] rounded-xl overflow-hidden
            border border-white/20 shadow-2xl bg-black
            xl:static xl:w-1/2 xl:h-full
            xl:rounded-none xl:border-0 xl:shadow-none xl:z-auto
            xl:cursor-default xl:border-r xl:border-white/10
          "
        >
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Drag hint — mobile only */}
          <div className="absolute bottom-1 right-1 xl:hidden pointer-events-none">
            <div className="w-4 h-4 rounded-sm bg-black/40 flex items-center justify-center">
              <svg
                width="8"
                height="8"
                viewBox="0 0 10 10"
                fill="white"
                opacity="0.6"
              >
                <circle cx="2" cy="2" r="1" />
                <circle cx="5" cy="2" r="1" />
                <circle cx="8" cy="2" r="1" />
                <circle cx="2" cy="5" r="1" />
                <circle cx="5" cy="5" r="1" />
                <circle cx="8" cy="5" r="1" />
                <circle cx="2" cy="8" r="1" />
                <circle cx="5" cy="8" r="1" />
                <circle cx="8" cy="8" r="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── REMOTE VIDEO (full screen on mobile, right half on desktop) ── */}
        <div className="w-full h-full xl:w-1/2 xl:flex-shrink-0 bg-black overflow-hidden relative">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={`
                        w-full h-full object-cover transition-opacity duration-300
                        ${!videoCallLoader && !showUserCard && !matchedUser ? "opacity-100" : "opacity-0"}
                      `}
          />
          {videoCallLoader && uiState !== "idle" && (
            <Loader
              uiState={uiState}
              allGoodAndConnected={allGoodAndConnected}
            />
          )}
          {showUserCard && <DisplayUserInfoCard strangerInfo={matchedUser} />}
          {showAddFriend && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
              <AddFriend
                uiState={uiState}
                allGoodAndConnected={allGoodAndConnected}
              />
            </div>
          )}
        </div>
      </div>

      {/* ===================== CONTROLS + CHAT ===================== */}
      {/* ✅ flex-shrink-0 — never compressed, always stays at fixed height */}
      <div className="h-[120px] xl:h-[200px] flex flex-row flex-shrink-0 border-t border-white/10 bg-[#020617]/80 backdrop-blur-md">
        {/* CONTROLS */}
        <div className="xl:w-1/2 w-full flex items-center justify-center px-6 border-r border-white/10">
          <div className="flex items-center justify-center gap-3 w-full max-w-[420px]">
            {/* START */}
            {uiState === "idle" && (
              <button
                disabled={started}
                onClick={handleStart}
                className="
                  w-full xl:w-[200px] h-[52px]
                  text-[15px] font-semibold tracking-wide rounded-xl
                  bg-emerald-600 hover:bg-emerald-500 text-white
                  border border-emerald-500/40
                  shadow-[0_0_20px_rgba(16,185,129,0.3)]
                  hover:shadow-[0_0_28px_rgba(16,185,129,0.45)]
                  transition-all duration-200 ease-out active:scale-[0.97]
                  disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed
                "
              >
                Start
              </button>
            )}

            {/* STOP (queued) */}
            {uiState === "successfully_queued" && (
              <button
                onClick={handleClose}
                className="
                  w-full xl:w-[200px] h-[52px]
                  text-[15px] font-semibold tracking-wide rounded-xl
                  bg-red-600 hover:bg-red-500 text-white
                  border border-red-500/30
                  shadow-[0_0_20px_rgba(239,68,68,0.2)]
                  hover:shadow-[0_0_28px_rgba(239,68,68,0.35)]
                  transition-all duration-200 active:scale-[0.97]
                "
              >
                Stop
              </button>
            )}

            {/* NEXT + STOP */}
            {(allGoodAndConnected ||
              uiState === "successfully_skipped_and_searching" ||
              uiState === "successfully_matched") && (
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
                    flex-1 xl:w-[180px] xl:flex-none h-[52px]
                    text-[15px] font-semibold tracking-wide rounded-xl
                    bg-amber-400 hover:bg-amber-300 text-neutral-900
                    border border-amber-300/40
                    shadow-[0_0_20px_rgba(251,191,36,0.2)]
                    hover:shadow-[0_0_28px_rgba(251,191,36,0.35)]
                    transition-all duration-200 active:scale-[0.97]
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                  "
                >
                  Next
                </button>

                <button
                  onClick={handleClose}
                  className="
                    flex-1 xl:w-[180px] xl:flex-none h-[52px]
                    text-[15px] font-semibold tracking-wide rounded-xl
                    bg-red-600 hover:bg-red-500 text-white
                    border border-red-500/30
                    shadow-[0_0_20px_rgba(239,68,68,0.2)]
                    hover:shadow-[0_0_28px_rgba(239,68,68,0.35)]
                    transition-all duration-200 active:scale-[0.97]
                  "
                >
                  Stop
                </button>
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