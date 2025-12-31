/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const webRTCContext = createContext(null);

export const WebRTCProvider = ({ children }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const [cleanVideoChatMessagesUI, setCleanVideoChatMessagesUI] =
    useState(false);
  const [showUserCard, setShowUserCard] = useState(false);

  const { user } = useAuth();

  const pcRef = useRef(null);
  const dataChannelRef = useRef(null);

  const [videoCallLoader, setVideoCallLoader] = useState(false);

  const [dataChannel, setDataChannel] = useState(null);

  const dataChannelForJsonRef = useRef(null);

  const [dataChannelForJsonMessages, setDataChannelForJsonMessages] =
    useState(null);

  const [matchedUser, setMatchedUser] = useState(null);

  const [dataChannelReady, setDataChannelReady] = useState(false);


const [pcReady, setPcReady] = useState(false);
const [pcState, setPcState] = useState(false);
const [remoteStreamReady, setRemoteStreamReady] = useState(false);
const [videoPlayingReady, setVideoPlayingReady] = useState(false);

const [peerDisconnected, setPeerDisconnected] = useState(false)

const [sessionActive, setSessionActive] = useState(false)





// const endSession = () => {

//    setSessionActive(false); 
//   cleanupCallWhenCloseButtonIsPressed();
//  // UI → Start only
// };



  const handleJsonMessage = (e) => {
    console.log("handle json message is running ");
    let msg;
    try {
      msg = JSON.parse(e.data);
    } catch {
      return;
    }

    if (msg.type === "userInfo") {
      console.log("user info aayi hai ", msg);

      setMatchedUser(msg);

      setVideoCallLoader(false);
    }
  };

  const handleInfoChannel = (channel) => {
    dataChannelForJsonRef.current = channel;
    setDataChannelForJsonMessages(channel);

    channel.onopen = () => {
      console.log("✅ info channel ready:", channel.label);

      sendJsonMessage({
        type: "userInfo",
        data: {
          username: user?.username,
          country: user?.country,
        },
      });

      // 🔥 This fires on BOTH caller & receiver
      // Safe place to:
      // - stop loader
      // - send userInfo
      // - enable UI
    };

    channel.onmessage = (e) => {
      console.log("📩 info:", e.data);
      handleJsonMessage(e);
    };
  };

  const createPeerConnection = (sendSignal) => {
    pcRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pcRef.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
      console.log("REMOTE STREAM is being received");
  setRemoteStreamReady(true);

    };

    remoteVideoRef.current.onplaying = () => {
  setVideoPlayingReady(true);
    };

    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal({ type: "ice-candidate", candidate: event.candidate });
      }
    };

    pcRef.current.onconnectionstatechange = () => {
      setPcState(pcRef.current.connectionState);
       const state = pcRef.current.connectionState;

       console.log("PC state:", state);

       if (
         state === "disconnected" ||
         state === "failed" ||
         state === "closed"
       ) {
          handleRemoteDisconnect();
       }
    };


    pcRef.current.oniceconnectionstatechange = async () => {
      console.log("ICE STATE:", pcRef.current.iceConnectionState);
      if (
        pcRef.current.iceConnectionState === "disconnected" ||
        pcRef.current.iceConnectionState === "failed"
      ) {
        console.log("Peer disconnected");
        // You can add cleanup logic here if needed
      }
      if (pcRef.current.iceConnectionState === "connected") {
        console.log(
          "after successful connection-value of dcjson",
          dataChannelForJsonRef.current
        );


          setPcReady(true);

        console.log("Peers are connected via webrtc");
      }
    };



    pcRef.current.ondatachannel = (event) => {
      const channel = event.channel;

      if (channel.label === "chat") {
        dataChannelRef.current = channel;
        setDataChannel(channel);
      }

      if (channel.label === "info") {
        console.log(
          "calling in if info data channel on receiver side of data channel "
        );

        handleInfoChannel(channel);
      }

  setDataChannelReady(true);

    };
  };

  const startWebRTC = async (messagetype, userRole, sendSignal) => {
    await createPeerConnection(sendSignal);

    console.log("SIGNALING:", pcRef.current.signalingState);

    localStreamRef.current.getTracks().forEach((track) => {
      pcRef.current.addTrack(track, localStreamRef.current);
    });

    if (userRole === "caller") {
      const infoChannel = pcRef.current.createDataChannel("info");
      handleInfoChannel(infoChannel);

      dataChannelRef.current = await pcRef.current.createDataChannel("chat");

      dataChannelRef.current.onopen = () => {
        console.log("✅ DataChannel open");
        // setDataChannelReady(true);
        setDataChannel(dataChannelRef.current);
      };


      dataChannelRef.current.onclose = () => {
        console.log("DataChannel closed");
         handleRemoteDisconnect();

      };



      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);

      sendSignal({ type: "offer", offer });
    }
  };

  const handleOffer = async (messageType, offer, sendSignal) => {
    if (messageType === "offer") {
      createPeerConnection(sendSignal);

      localStreamRef.current.getTracks().forEach((track) => {
        pcRef.current.addTrack(track, localStreamRef.current);
      });

      await pcRef.current.setRemoteDescription(offer);
      console.log("SIGNALING:", pcRef.current.signalingState);

      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);

      sendSignal({ type: "answer", answer });
    }
  };

  const handleAnswer = async (messageType, answer) => {
    if (!pcRef.current) return;

    if (messageType === "answer") {
      await pcRef.current.setRemoteDescription(answer);

      console.log("SIGNALING:", pcRef.current.signalingState);
    }
  };

  const addIceCandidate = async (candidate) => {
    if (pcRef.current) {
      await pcRef.current.addIceCandidate(candidate);
    }
  };

  const sendMessage = (text) => {
    if (dataChannelRef.current?.readyState !== "open") return;

    dataChannelRef.current.send(text);
  };

  const sendJsonMessage = (data) => {
    console.log("sendjsonmessage is called");
    console.log(
      "jsonchannel ki value in json send message sent after conncting webrtc -value connected",
      dataChannelForJsonRef.current
    );
    if (dataChannelForJsonRef.current?.readyState !== "open") return;

    let message = JSON.stringify(data);
    console.log("printing message before sending to data channel", message);
    dataChannelForJsonRef.current.send(message);
  };

  // const cleanupCall = () => {
  //   dataChannelRef.current?.close();
  //   dataChannelForJsonRef.current.close();
  //   setDataChannelReady(false);
  //   localStreamRef.current = null
  //   localVideoRef.current = null
  //   setDataChannel(null);
  //   pcRef.current?.close();
  //   dataChannelRef.current = null;
  //   pcRef.current = null;
  //   setCleanVideoChatMessagesUI(true);
  //   dataChannelForJsonRef.current = null;
  //   setDataChannelForJsonMessages(null);
  // };

  const cleanupFull = () => {
    // 1️⃣ Stop camera & mic
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    // 2️⃣ Detach video
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

     if (remoteVideoRef.current) {
       localVideoRef.current.srcObject = null;
     }

    // 3️⃣ Close data channels
    dataChannelRef.current?.close();
    dataChannelForJsonRef.current?.close();

    // 4️⃣ Close peer connection
    pcRef.current?.close();

    // 5️⃣ Reset refs
    localStreamRef.current = null;
    pcRef.current = null;
    dataChannelRef.current = null;
    dataChannelForJsonRef.current = null;
    

    // 6️⃣ Reset UI state
    setDataChannel(null);
    setDataChannelForJsonMessages(null);
    setDataChannelReady(false);
    setCleanVideoChatMessagesUI(true);
    setVideoCallLoader(false)
    setRemoteStreamReady(false)
    setVideoPlayingReady(false)
    setPcReady(false)
  };

   const cleanupRemotePeer = () => {
     // 1️⃣ Stop camera & mic
    //  if (localStreamRef.current) {
    //    localStreamRef.current.getTracks().forEach((track) => track.stop());
    //  }

     // 2️⃣ Detach video
    //  if (localVideoRef.current) {
    //    localVideoRef.current.srcObject = null;
    //  }

     // 3️⃣ Close data channels
     dataChannelRef.current?.close();
     dataChannelForJsonRef.current?.close();

     // 4️⃣ Close peer connection
     pcRef.current?.close();

     // 5️⃣ Reset refs
    //  localStreamRef.current = null;
     pcRef.current = null;
     dataChannelRef.current = null;
     dataChannelForJsonRef.current = null;

     // 6️⃣ Reset UI state
     setDataChannel(null);
     setDataChannelForJsonMessages(null);
     setDataChannelReady(false);
     setCleanVideoChatMessagesUI(true);
     setVideoCallLoader(false);
   };


// const handlePeerDisconnected = () => {
//   console.log("Peer disconnected");

//   cleanupCallWhenCloseButtonIsPressed(); // stop streams, close pc

// }

// const handlePeerDisconnected = () => {
//   console.log("Peer disconnected");
//   setPeerDisconnected(true)
//             setPcReady(false);


//   if(pcRef.current!=null && localVideoRef.current != null ){


//     cleanupCallWhenNextButtonIsPressed(); // stop streams, close pc
//   }
// else{
//   cleanupCallWhenCloseButtonIsPressed()
// }


// };

const handleRemoteDisconnect = () => {
  cleanupRemotePeer(); // 🔥 partial reset
  setSessionActive(false);
};








  return (
    <webRTCContext.Provider
      value={{
        localVideoRef,
        pcRef,
        remoteVideoRef,
        localStreamRef,
        startWebRTC,
        handleOffer,
        handleAnswer,
        addIceCandidate,
        sendMessage,
        cleanupFull,
        dataChannelReady,
        dataChannel: dataChannel,
        setDataChannel,
        cleanVideoChatMessagesUI,
        setCleanVideoChatMessagesUI,
        videoCallLoader,
        setVideoCallLoader,
        showUserCard,
        setShowUserCard,
        dataChannelForJsonMessages,
        setDataChannelForJsonMessages,
        sendJsonMessage,
        dataChannelForJsonRef,
        matchedUser,
        pcReady,
        remoteStreamReady,
        videoPlayingReady,
        sessionActive,
        setSessionActive,
        cleanupRemotePeer,

       
        pcState,               // "new" | "connecting" | "connected"
      }}
    >
      {children}
    </webRTCContext.Provider>
  );
};
