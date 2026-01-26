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
        <span
          className={`
    px-6 py-4
    text-base font-semibold
    tracking-wide
    rounded-md
    border
    transition-all duration-300
    ${
      isFollowing
        ? "bg-pink-500 text-white border-pink-500 shadow-[0_0_18px_rgba(236,72,153,0.6)]"
        : "bg-emerald-500 text-black border-emerald-500 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.8)]"
    }
  `}
        >
          {isFollowing ? "Friends 💕" : "Add Friend"}
        </span>
      )}
    </div>
  );
}

export default AddFriend