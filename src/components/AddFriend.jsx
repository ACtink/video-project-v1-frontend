// import React from "react";

// import { useContext, useEffect, useState } from "react";
// import { webRTCContext } from "../context/WebRTC";
// import fetchData from "../utils/fetchData";

// function AddFriend({ uiState  , allGoodAndConnected }) {
//   const {
//     sendMessage,
//     pcRef,
//     dataChannelRef,
//     dataChannelReady,
//     dataChannel,
//     cleanVideoChatMessagesUI,
//     setCleanVideoChatMessagesUI,
//     sendJsonMessage,
//     strangerUserProfileData,
//     setstrangerUserProfileData,
//   } = useContext(webRTCContext);

//   const [isFollowing, setIsFollowing] = useState(false);

//   const handleFollowUser = async () => {
//     try {
//       const res = await fetchData(
//         `/api/users/${strangerUserProfileData?.data?.id}/follow`,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//         },
//       );

//       if (res.ok) setIsFollowing(true);
//     } catch (err) {
//       console.error("Follow error:", err);
//     }
//   };

//   useEffect(() => {
//     if (!strangerUserProfileData?.data?.id) return;

//     const checkFollowStatus = async () => {
//       try {
//         const res = await fetchData(
//           `/api/users/${strangerUserProfileData.data.id}/is-following`,
//           { credentials: "include" },
//         );
//         const data = await res.json();
//         setIsFollowing(data.isFollowing);
//       } catch (err) {
//         console.error("Follow status error", err);
//       }
//     };

//     checkFollowStatus();
//   }, [strangerUserProfileData]);

//   return (
//     <div>
//       {" "}
//       {strangerUserProfileData && (
//         <span
//         disabled={isFollowing || uiState !== "idle"}
//         onClick={handleFollowUser}
//           className={`
//             ${isFollowing ? "cursor-not-allowed" : "cursor-pointer"}
//     px-6 py-4
//     text-base font-semibold
//     tracking-wide
//     rounded-md
//     border
//     transition-all duration-300
//     ${
//       isFollowing
//         ? "bg-pink-500 text-white border-pink-500 shadow-[0_0_18px_rgba(236,72,153,0.6)]"
//         : "bg-emerald-500 text-black border-emerald-500 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.8)]"
//     }
//   `}
//         >
//           {isFollowing && allGoodAndConnected && "Friends 💕"}
//           {!isFollowing && allGoodAndConnected && "Add Friend 🤝"}

//         </span>
//       )}
//     </div>
//   );
// }

// export default AddFriend;







import React from "react";
import { useContext, useEffect, useState } from "react";
import { webRTCContext } from "../context/WebRTC";
import fetchData from "../utils/fetchData";

function AddFriend({ uiState, allGoodAndConnected }) {
  const {
    sendMessage,
    pcRef,
    dataChannelRef,
    dataChannelReady,
    dataChannel,
    cleanVideoChatMessagesUI,
    setCleanVideoChatMessagesUI,
    sendJsonMessage,
    strangerUserProfileData,
    setstrangerUserProfileData,
  } = useContext(webRTCContext);

  const [isFollowing, setIsFollowing] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleFollowUser = async () => {
    if (isFollowing || uiState !== "idle") return;
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
    try {
      const res = await fetchData(
        `/api/users/${strangerUserProfileData?.data?.id}/follow`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (res.ok) setIsFollowing(true);
    } catch (err) {
      console.error("Follow error:", err);
    }
  };

  useEffect(() => {
    if (!strangerUserProfileData?.data?.id) return;
    const checkFollowStatus = async () => {
      try {
        const res = await fetchData(
          `/api/users/${strangerUserProfileData.data.id}/is-following`,
          { credentials: "include" },
        );
        const data = await res.json();
        setIsFollowing(data.isFollowing);
      } catch (err) {
        console.error("Follow status error", err);
      }
    };
    checkFollowStatus();
  }, [strangerUserProfileData]);

  if (!strangerUserProfileData) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .af-btn {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
          outline: none;
          white-space: nowrap;
          user-select: none;
        }

        .af-btn:active:not(:disabled) {
          transform: scale(0.97);
        }

        .af-btn:disabled {
          cursor: not-allowed;
          opacity: 0.75;
        }

        /* ── Add Friend (idle) ── */
        .af-btn--add {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          box-shadow:
            0 2px 8px rgba(16, 185, 129, 0.45),
            0 1px 2px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .af-btn--add:hover:not(:disabled) {
          background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
          box-shadow:
            0 4px 16px rgba(16, 185, 129, 0.6),
            0 2px 4px rgba(0,0,0,0.12),
            inset 0 1px 0 rgba(255,255,255,0.22);
          transform: translateY(-1px);
        }

        /* ── Friends (connected) ── */
        .af-btn--friends {
          background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
          color: #ffffff;
          box-shadow:
            0 2px 8px rgba(236, 72, 153, 0.45),
            0 1px 2px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.18);
        }

        /* ── Icon wrapper ── */
        .af-icon {
          display: inline-flex;
          align-items: center;
          font-size: 15px;
          line-height: 1;
        }

        /* ── Ripple ── */
        .af-ripple::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.25);
          border-radius: inherit;
          animation: af-ripple-anim 0.55s ease-out forwards;
        }
        @keyframes af-ripple-anim {
          from { opacity: 1; transform: scale(0.6); }
          to   { opacity: 0; transform: scale(1.4); }
        }

        /* ── Shimmer on hover for add state ── */
        .af-btn--add::before {
          content: '';
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255,255,255,0.22) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          transition: left 0.45s ease;
          pointer-events: none;
        }
        .af-btn--add:hover:not(:disabled)::before {
          left: 130%;
        }
      `}</style>

      <button
        className={`af-btn ${
          isFollowing ? "af-btn--friends" : "af-btn--add"
        } ${ripple ? "af-ripple" : ""}`}
        onClick={handleFollowUser}
        disabled={isFollowing || uiState !== "idle"}
        aria-label={isFollowing ? "Already friends" : "Add as friend"}
      >
        {allGoodAndConnected && (
          <>
            <span className="af-icon">{isFollowing ? "💕" : "🤝"}</span>
            <span>{isFollowing ? "Friends" : "Add Friend"}</span>
          </>
        )}
      </button>
    </>
  );
}

export default AddFriend;
