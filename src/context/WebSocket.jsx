
// /* eslint-disable react-refresh/only-export-components */
// import React, { createContext, useContext, useEffect, useRef, useState } from "react";
// import { webRTCContext } from "./WebRTC";
// import { useAuth } from "../hooks/useAuth";
// import { saveMessage } from "../utils/saveMessage";

// export const websocketContext = createContext(null);

// export const WebSocketProvider = ({ children }) => {
//   const socketRef = useRef(null);
//   const handlersRef = useRef({});
//   const [wsConnected, setWsConnected] = React.useState(false);

//     const [messages, setMessages] = React.useState([]);

//       const { user } = useAuth(); // ✅ current logged-in user
//     const sendQueueRef = useRef([]);



// const { setVideoCallLoader, cleanupFull, cleanupRemotePeer , manualCleanupRef } =
//   useContext(webRTCContext);

//   const [uiState , setUistate] = useState("idle")

// let pingInterval

// function handleIncomingMessage(message) {
//   // message = { messageId, from, text, createdAt }

//   setMessages((prev) => {
//     const exists = prev.some((m) => m.messageId === message.messageId);
//     if (exists) return prev;

//     console.log("Received new message:", message);
//     console.log("Current user id:", user._id);

//     return [
//       ...prev,
//       {
//         messageId: message?.message.messageId,
//         from: message?.message.from, // ✅ sender id
//         to: user._id, // ✅ receiver = me
//         text: message?.message.text,
//         status: "delivered",
//         createdAt: new Date(message?.message.createdAt).getTime(),
//       },
//     ];
//   });
// }

// function handleAck({ messageId, status }) {

//   console.log("Received ack for message:", messageId, "with status:", status);
//   setMessages((prev) =>
//     prev.map((msg) => (msg.messageId === messageId ? { ...msg, status } : msg))
//   );
// }



//   function connectToWebSocketServer() {

//     if (
//       socketRef.current &&
//       socketRef.current.readyState !== WebSocket.CLOSED
//     ) {
//       return socketRef.current;
//     }




//    const WS_URL = import.meta.env.VITE_WS_URL;

//    socketRef.current = new WebSocket(WS_URL);


//    socketRef.current.onopen = () => {
//      console.log("WebSocket is connected");
//      setWsConnected(true);

//      // 🔥 flush queued messages
//      sendQueueRef.current.forEach((msg) => {
//        socketRef.current.send(JSON.stringify(msg));
//      });
//      sendQueueRef.current = [];
//    };



//    socketRef.current.onerror = (event) => {
//      console.error("WebSocket error", event);
//    };



//    socketRef.current.onmessage = async (event) => {
//      try {
//        const message = JSON.parse(event.data);


//        switch (message.type) {
//          case "chat_deliver":
//           console.log("Received chat_deliver message:", message.message);
//            await saveMessage(message);
//            handleIncomingMessage(message);
//            break;

//          case "ack":
//            handleAck(message);
//            break;

//          case "queued_ack":
//            if (message.success == "ok") {
//              setUistate("successfully_queued");
//              break;
//            } else {
//              return;
//            }
//          case "matched_ack":
//            if (message.success == "ok") {
//              setUistate("successfully_matched");
//              break;
//            } else {
//              return;
//            }

//         //  case "next_ack":
//         //    if (message.success == "ok") {
//         //      setUistate("successfully_done_next");
//         //      setVideoCallLoader(true);

//         //      cleanupFull();
//         //      break;
//         //    } else {
//         //      return;
//         //    }
//          case "close_ack":
//            if (message.success == "ok") {
//              setUistate("successfully_closed");
//              break;
//            } else {
//              return;
//            }
//          case "queued_and_searching_next_for_you":
//            if (message.success == "ok") {
//              console.log(
//                "case--------------->queued_and_searching_next_for_you "
//              );
//              setUistate("successfully_skipped_and_searching");
//              setVideoCallLoader(true);
//              manualCleanupRef.current = true; 
//              cleanupRemotePeer();
//             // cleanupFull();
//              break;
//            } else {
//              return;
//            }
//          case "successfully_ended_call":
//            if (message.success == "ok") {
//              console.log("case--------------->successfully_ended_call");

//              setUistate("idle");
//              //  setVideoCallLoader(false);
//              cleanupFull();
//              break;
//            } else {
//              return;
//            }
//        }
       







//        if(message.type=="matched_ack"){
//         console.log("matched ackownledgment aya hai")
//        }


//        handlersRef.current[message.type]?.(message);
//      } catch (e) {
//        console.warn("Invalid WS message:", event.data);
//      }
//    };


//     socketRef.current.onclose = (event) => {
//       console.log(event.code, event.reason, event.wasClean);
//       socketRef.current.onclose = () => {
//         clearInterval(pingInterval);
//         setWsConnected(false);
//       };

//         setWsConnected(false);

//     };

//     return socketRef.current

//   };



//     useEffect(() => {
//       // ✅ DO NOT CONNECT if user not logged in
//       if (!user?._id) return;

//       const ws = connectToWebSocketServer();

//       return () => {
//         if (ws && ws.readyState === WebSocket.OPEN) {
//           ws.close();
//         }
//       };
//     }, [user]);

 

//   const registerHandlers = (handlers) => {
//     handlersRef.current = handlers;
//   };

// const sendSignal = (msg) => {
//   console.log("sending message to server", msg);

//   if (!socketRef.current) return;

//   if (socketRef.current.readyState !== WebSocket.OPEN) {

//     console.log(socketRef.current.readyState);
//     console.log(WebSocket.OPEN)
//     console.warn("WebSocket not ready, queued:", msg);
//     sendQueueRef.current.push(msg); // 👈 ONLY CHANGE
//     return;
//   }

//   console.log("WebSocket sending:", msg);
//   socketRef.current.send(JSON.stringify(msg));
// };


//   return (
//     <websocketContext.Provider
//       value={{  sendSignal, registerHandlers , wsConnected , uiState , setUistate , messages, setMessages }}
//     >
//       {children}
//     </websocketContext.Provider>
//   );
// };



/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { webRTCContext } from "./WebRTC";
import { useAuth } from "../hooks/useAuth";
import { saveMessage } from "../utils/saveMessage";

export const websocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {

  const socketRef = useRef(null);

  const handlersRef = useRef({});

  const sendQueueRef = useRef([]);

  const pingIntervalRef = useRef(null);

  const [wsConnected, setWsConnected] = useState(false);

  const [messages, setMessages] = useState([]);

  const { user } = useAuth();

  const {
    setVideoCallLoader,
    cleanupFull,
    cleanupRemotePeer,
    manualCleanupRef,
  } = useContext(webRTCContext);

  const [uiState, setUistate] = useState("idle");


  /* ============================================
     HANDLE INCOMING MESSAGE
  ============================================ */

  function handleIncomingMessage(message) {

    setMessages((prev) => {

      const exists = prev.some(
        (m) => m.messageId === message.message.messageId
      );

      if (exists) return prev;

      return [

        ...prev,

        {

          messageId: message.message.messageId,

          conversationId: message.message.conversationId,

          from: message.message.from,

          to: user._id,

          text: message.message.text,

          status: "delivered",

          createdAt: new Date(
            message.message.createdAt
          ).getTime(),

        },

      ];

    });

  }


  function handleAck({ messageId, status }) {

    setMessages((prev) =>
      prev.map((msg) =>
        msg.messageId === messageId
          ? { ...msg, status }
          : msg
      )
    );

  }



  /* ============================================
     CONNECT FUNCTION (FIXED)
  ============================================ */

  function connectToWebSocketServer() {

    // ✅ Prevent duplicate connection

    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      return socketRef.current;
    }


    const WS_URL = import.meta.env.VITE_WS_URL;

    const socket = new WebSocket(WS_URL);

    socketRef.current = socket;


    /* ========================
       ON OPEN
    ======================== */

    socket.onopen = () => {

      console.log("WebSocket connected");

      setWsConnected(true);


      // ✅ Send auth (IMPORTANT)

      // socket.send(

      //   JSON.stringify({

      //     type: "chat_auth",

      //     userId: user._id,

      //   })

      // );


      // ✅ Flush queued messages

      sendQueueRef.current.forEach((msg) => {

        socket.send(JSON.stringify(msg));

      });

      sendQueueRef.current = [];

    };


    /* ========================
       ON MESSAGE
    ======================== */

    socket.onmessage = async (event) => {

      try {

        const message = JSON.parse(event.data);


        switch (message.type) {

          case "chat_deliver":

            await saveMessage(message);

            handleIncomingMessage(message);

            break;


          case "ack":

            handleAck(message);

            break;


          case "queued_ack":

            if (message.success === "ok")
              setUistate("successfully_queued");

            break;


          case "matched_ack":

            if (message.success === "ok")
              setUistate("successfully_matched");

            break;


          case "close_ack":

            if (message.success === "ok")
              setUistate("successfully_closed");

            break;


          case "queued_and_searching_next_for_you":

            setUistate("successfully_skipped_and_searching");

            setVideoCallLoader(true);

            manualCleanupRef.current = true;

            cleanupRemotePeer();

            break;


          case "successfully_ended_call":

            setUistate("idle");

            cleanupFull();

            break;

        }


        handlersRef.current[message.type]?.(message);

      }

      catch {

        console.warn("Invalid WS message");

      }

    };


    /* ========================
       ON ERROR
    ======================== */

    socket.onerror = (error) => {

      console.error("WebSocket error:", error);

    };


    /* ========================
       ON CLOSE (FIXED)
    ======================== */

    socket.onclose = (event) => {

      console.log(
        "WebSocket closed:",
        event.code,
        event.reason
      );

      clearInterval(pingIntervalRef.current);

      setWsConnected(false);

    };


    return socket;

  }



  /* ============================================
     CONNECT WHEN USER READY
  ============================================ */

  useEffect(() => {

    if (!user?._id) return;

    const socket = connectToWebSocketServer();


    return () => {

      if (
        socket &&
        socket.readyState === WebSocket.OPEN
      ) {
        socket.close();
      }

    };

  }, [user]);



  /* ============================================
     SEND SIGNAL (FIXED)
  ============================================ */

  const sendSignal = (msg) => {

    if (
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN
    ) {

      console.log("Queued message:", msg);

      sendQueueRef.current.push(msg);

      return;

    }

    socketRef.current.send(JSON.stringify(msg));

  };


  const registerHandlers = (handlers) => {

    handlersRef.current = handlers;

  };


  return (

    <websocketContext.Provider
      value={{

        sendSignal,

        registerHandlers,

        wsConnected,

        uiState,

        setUistate,

        messages,

        setMessages,

      }}

    >

      {children}

    </websocketContext.Provider>

  );

};