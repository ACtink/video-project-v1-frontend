
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useRef , useState} from "react";
import { useAuth } from "../hooks/useAuth";

export const webRTCContext = createContext(null);

export const WebRTCProvider = ({ children }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const [cleanVideoChatMessagesUI, setCleanVideoChatMessagesUI] = useState(false);
const [showUserCard, setShowUserCard] = useState(false);

  const { user } = useAuth();

  const pcRef = useRef(null);
  const dataChannelRef = useRef(null);


  const [videoCallLoader, setVideoCallLoader] = useState(false);


  const [dataChannel, setDataChannel] = useState(null);

    const dataChannelForJsonRef = useRef(null);


    const [dataChannelForJsonMessages, setDataChannelForJsonMessages] = useState(null);

const [matchedUser, setMatchedUser] = useState(null)


  const [dataChannelReady, setDataChannelReady] = useState(false);



  const handleJsonMessage = (e) => {
    console.log("handle json message is running ");
    let msg;
    try {
      msg = JSON.parse(e.data);
    } catch {
      return;
    }

    if (msg.type === "userInfo") {

      console.log("user info aayi hai ", msg)

      setMatchedUser(msg)

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
    handleJsonMessage(e)





  };
};
















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

    pcRef.current.oniceconnectionstatechange = async () => {
      console.log("ICE STATE:", pcRef.current.iceConnectionState);
      if( pcRef.current.iceConnectionState === "disconnected" || pcRef.current.iceConnectionState === "failed"){
        console.log("Peer disconnected");
        // You can add cleanup logic here if needed
      }if(pcRef.current.iceConnectionState === "connected" ){

        console.log("after successful connection-value of dcjson", dataChannelForJsonRef.current)


       

    

        // await sendJsonMessage({username:user?.username,country:user?.country})
        // setShowUserCard(true);
        // setTimeout(() => {
        // setShowUserCard(false);
        // }, 5000);
        console.log("Peers are connected via webrtc")
      }
    };

    // pcRef.current.ondatachannel = (event) => {

    //   if(event.channel.label =="chat"){
    //             console.log("calling in if chat data channel ");


    //      dataChannelRef.current = event.channel;
    //           //  setDataChannelReady(true);
    //                  setDataChannel(dataChannelRef.current);



    //   }
     
    //   console.log("data channel ki current value update hui hai dekho ye hai", event.channel);
    //   console.log("DataChannel received");
    //   // dataChannelRef.current.onmessage = (e) =>
    //   //   console.log("📩", e.data);

    //   if(event.channel=="info"){
    //     console.log("calling in if info data channel ")
    //     dataChannelForJsonRef.current = event.channel
    //           setDataChannelForJsonMessages(dataChannelForJsonRef.current);

    //   }
    // };


    pcRef.current.ondatachannel = (event) => {
      const channel = event.channel;

      if (channel.label === "chat") {
        dataChannelRef.current = channel;
        setDataChannel(channel);
      }

      if (channel.label === "info") {
        console.log("calling in if info data channel on receiver side of data channel ");

            handleInfoChannel(channel);

        // dataChannelForJsonRef.current = channel;


        //  dataChannelForJsonRef.current.onmessage = (e) => {
        //    if (!dataChannelForJsonRef.current) return;

        //    handleJsonMessage(e);
        //  };   


        // setDataChannelForJsonMessages(channel);

        // ✅ WAIT FOR OPEN, THEN SEND USER INFO
        // channel.onopen = () => {
        //   console.log("✅ Info DataChannel open (callee)");
        //   // setVideoCallLoader(false);


        
        // };
      }
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


    // dataChannelForJsonRef.current.onmessage = (e)=>{

    //       if (!dataChannelForJsonRef.current) return;


    //       handleJsonMessage(e)


    // }            

      dataChannelRef.current =
      await pcRef.current.createDataChannel("chat");





    // console.log("data channel ki current value update hui hai dekho ye hai", dataChannelRef.current);

      dataChannelRef.current.onopen = () =>{
      console.log("✅ DataChannel open");
      // setDataChannelReady(true);
      setDataChannel(dataChannelRef.current);

     
    }

    // dataChannelForJsonRef.current.onopen = () => {
    //   console.log("✅ DataChannel open");
    //   setDataChannelForJsonMessages(dataChannelForJsonRef.current);
      
    // };

// dataChannelForJsonRef.current.onopen = () => {
//   console.log("✅ Info DataChannel open");
//   setDataChannelForJsonMessages(dataChannelForJsonRef.current);

    // setVideoCallLoader(false);


  // ✅ SEND USER INFO HERE (SAFE)
  // sendJsonMessage(
  //   {
  //     type: "userInfo",
  //     data: {
  //       username: user?.username,
  //       country: user?.country,
  //     },
  //   }
  // );




// }




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
   if (dataChannelRef.current?.readyState !== "open") return;

   dataChannelRef.current.send(text);
 };



 const sendJsonMessage = (data) => {

  console.log("sendjsonmessage is called")
  console.log("jsonchannel ki value in json send message sent after conncting webrtc -value connected",dataChannelForJsonRef.current)
   if (dataChannelForJsonRef.current?.readyState !== "open") return;


   let message = JSON.stringify(data)
console.log("printing message before sending to data channel", message)
   dataChannelForJsonRef.current.send(message)
 };



  const cleanupCall = () => {
    dataChannelRef.current?.close();
    dataChannelForJsonRef.current.close()
    setDataChannelReady(false);
    setDataChannel(null);
    pcRef.current?.close();
    dataChannelRef.current = null;
    pcRef.current = null;
    setCleanVideoChatMessagesUI(true);
    dataChannelForJsonRef.current = null
    setDataChannelForJsonMessages(null)
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
        cleanupCall,
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
        matchedUser
      }}
    >
      {children}
    </webRTCContext.Provider>
  );
};

