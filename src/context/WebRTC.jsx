
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useRef , useState} from "react";

export const webRTCContext = createContext(null);

export const WebRTCProvider = ({ children }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const pcRef = useRef(null);
  const dataChannelRef = useRef(null);


  const [dataChannel, setDataChannel] = useState(null);


  const [dataChannelReady, setDataChannelReady] = useState(false);

  const createPeerConnection = (sendSignal) => {
    pcRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pcRef.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
      console.log("REMOTE STREAM is being received");
    };

    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal({ type: "ice-candidate", candidate: event.candidate });
      }
    };

    pcRef.current.oniceconnectionstatechange = () => {
      console.log("ICE STATE:", pcRef.current.iceConnectionState);
    };

    pcRef.current.ondatachannel = (event) => {
      dataChannelRef.current = event.channel;
      console.log("data channel ki current value update hui hai dekho ye hai", dataChannelRef.current);
      console.log("DataChannel received");
      setDataChannelReady(true);
      setDataChannel(dataChannelRef.current);
      // dataChannelRef.current.onmessage = (e) =>
      //   console.log("📩", e.data);
    };

    

  };

  const startWebRTC = async (messagetype, userRole, sendSignal) => {
   await createPeerConnection(sendSignal);

    console.log("SIGNALING:", pcRef.current.signalingState);


    localStreamRef.current.getTracks().forEach((track) => {
      pcRef.current.addTrack(track, localStreamRef.current);
    });

    if (userRole === "caller") {
      dataChannelRef.current =
        pcRef.current.createDataChannel("chat");

    console.log("data channel ki current value update hui hai dekho ye hai", dataChannelRef.current);

      dataChannelRef.current.onopen = () =>{
      console.log("✅ DataChannel open");
      setDataChannelReady(true);
      setDataChannel(dataChannelRef.current);
      // dataChannelRef.current.onmessage = (e) =>
      //   console.log("📩", e.data) ;
    }
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);

      sendSignal({ type: "offer", offer });

    }
  };

  const handleOffer = async (messageType, offer, sendSignal) => {

    if(messageType === "offer") {
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

 const handleAnswer = async (messageType , answer) => {
   if (!pcRef.current) return;

  //  if (pcRef.current.signalingState !== "have-local-offer") {
  //   //  console.warn("Ignoring answer in state:", pcRef.current.signalingState);
  //    console.log("SIGNALING:", pcRef.current.signalingState);

  //    return;
  //  }

 if(messageType === "answer") {

  
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
    if (dataChannelRef.current?.readyState === "open") {
      dataChannelRef.current.send(text);
    }
  };

  const cleanupCall = () => {
    dataChannelRef.current?.close();
    pcRef.current?.close();
    dataChannelRef.current = null;
    pcRef.current = null;
  };

  return (
    <webRTCContext.Provider
      value={{
        localVideoRef,
        remoteVideoRef,
        localStreamRef,
        startWebRTC,
        handleOffer,
        handleAnswer,
        addIceCandidate,
        sendMessage,
        cleanupCall,
        dataChannelReady,
        dataChannel,
        setDataChannel
      }}
    >
      {children}
    </webRTCContext.Provider>
  );
};

