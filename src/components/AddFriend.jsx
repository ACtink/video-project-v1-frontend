import React from 'react'

import { useContext, useEffect, useState } from "react";
import { webRTCContext } from '../context/WebRTC';


function AddFriend({ uiState }) {


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





      const handleFollowUser = async () => {
        try {
          const res = await fetch(
            `http://localhost:3000/api/users/${strangerUserProfileData?.data?.id}/follow`,
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
            const res = await fetch(
              `http://localhost:3000/api/users/${strangerUserProfileData.data.id}/is-following`,
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




  return (
    <div>
      {" "}
      {strangerUserProfileData && (
        <button
          onClick={handleFollowUser}
          disabled={isFollowing}
          className="flex items-center"
        >
          {uiState !== "idle" && (
            <span
              className={`
                      px-6 py-4
                      text-base font-semibold
                      tracking-wide
                      rounded-md
                      border
                      transition-all
            ${
              isFollowing
                ? "bg-pink-500/10 text-pink-400 border-pink-400/30 shadow-[0_0_12px_rgba(236,72,153,0.35)]"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:shadow-[0_0_10px_rgba(255,255,255,0.25)]"
            }
          `}
            >
              {isFollowing ? "Friends 💕" : "Add Friend"}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

export default AddFriend