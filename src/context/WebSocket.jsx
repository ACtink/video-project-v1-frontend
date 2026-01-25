
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { webRTCContext } from "./WebRTC";
import { useAuth } from "../hooks/useAuth";
import { saveMessage } from "../utils/saveMessage";

export const websocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const handlersRef = useRef({});
  const [wsConnected, setWsConnected] = React.useState(false);

    const [messages, setMessages] = React.useState([]);

      const { user } = useAuth(); // ✅ current logged-in user
    


const { setVideoCallLoader, cleanupFull, cleanupRemotePeer } =
  useContext(webRTCContext);

  const [uiState , setUistate] = useState("idle")

let pingInterval

function handleIncomingMessage(message) {
  // message = { messageId, from, text, createdAt }

  setMessages((prev) => {
    const exists = prev.some((m) => m.messageId === message.messageId);
    if (exists) return prev;

    console.log("Received new message:", message);
    console.log("Current user id:", user._id);

    return [
      ...prev,
      {
        messageId: message?.message.messageId,
        from: message?.message.from, // ✅ sender id
        to: user._id, // ✅ receiver = me
        text: message?.message.text,
        status: "delivered",
        createdAt: new Date(message?.message.createdAt).getTime(),
      },
    ];
  });
}

function handleAck({ messageId, status }) {

  console.log("Received ack for message:", messageId, "with status:", status);
  setMessages((prev) =>
    prev.map((msg) => (msg.messageId === messageId ? { ...msg, status } : msg))
  );
}



  function connectToWebSocketServer() {

    if (
      socketRef.current &&
      socketRef.current.readyState !== WebSocket.CLOSED
    ) {
      return socketRef.current;
    }


    const url =
      window.MODE === "development" || !window.MODE
        ? "ws://localhost:3000"
        : "wss://boomless-plushed-paisley.ngrok-free.dev";

    socketRef.current =  new WebSocket(url);

    socketRef.current.onopen = (event) => {


  // socketRef.current.send(
  //   JSON.stringify({
  //     type: "chat_auth",
  //     token,
  //   })
  // );
  console.log("WebSocket connected");

   pingInterval = setInterval(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "ping" }));
    }
  }, 300000);


      setWsConnected(true);



  
};


   socketRef.current.onerror = (event) => {
     console.error("WebSocket error", event);
   };



   socketRef.current.onmessage = async (event) => {
     try {
       const message = JSON.parse(event.data);


       switch (message.type) {
         case "chat_deliver":
          console.log("Received chat_deliver message:", message.message);
           await saveMessage(message);
           handleIncomingMessage(message);
           break;

         case "ack":
           handleAck(message);
           break;

         case "queued_ack":
           if (message.success == "ok") {
             setUistate("successfully_queued");
             break;
           } else {
             return;
           }
         case "matched_ack":
           if (message.success == "ok") {
             setUistate("successfully_matched");
             break;
           } else {
             return;
           }

         case "next_ack":
           if (message.success == "ok") {
             setUistate("successfully_done_next");
             setVideoCallLoader(true);

             cleanupRemotePeer();
             break;
           } else {
             return;
           }
         case "close_ack":
           if (message.success == "ok") {
             setUistate("successfully_closed");
             break;
           } else {
             return;
           }
         case "queued_and_searching_next_for_you":
           if (message.success == "ok") {
             console.log(
               "case--------------->queued_and_searching_next_for_you "
             );
             setUistate("successfully_skipped_and_searching");
             setVideoCallLoader(true);
             cleanupRemotePeer();
             break;
           } else {
             return;
           }
         case "successfully_ended_call":
           if (message.success == "ok") {
             console.log("case--------------->successfully_ended_call");

             setUistate("idle");
             //  setVideoCallLoader(false);
             cleanupFull();
             break;
           } else {
             return;
           }
       }
       









       handlersRef.current[message.type]?.(message);
     } catch (e) {
       console.warn("Invalid WS message:", event.data);
     }
   };


    socketRef.current.onclose = (event) => {
      console.log(event.code, event.reason, event.wasClean);
      socketRef.current.onclose = () => {
        clearInterval(pingInterval);
        setWsConnected(false);
      };

        setWsConnected(false);

    };

    return socketRef.current

  };



    useEffect(() => {
      const ws = connectToWebSocketServer();

      return () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      };
    }, []);

 

  const registerHandlers = (handlers) => {
    handlersRef.current = handlers;
  };


   const sendSignal = (msg) => {
    console.log("sending message to server", msg)
      if (!socketRef.current) return;

      if (socketRef.current.readyState !== WebSocket.OPEN) {
        console.warn("WebSocket not ready, dropped:", msg);
        return;
      }

      socketRef.current.send(JSON.stringify(msg));
    };

  return (
    <websocketContext.Provider
      value={{  sendSignal, registerHandlers , wsConnected , uiState , setUistate , messages, setMessages }}
    >
      {children}
    </websocketContext.Provider>
  );
};
