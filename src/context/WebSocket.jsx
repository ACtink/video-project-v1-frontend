
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useRef } from "react";

export const websocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const handlersRef = useRef({});
  const [wsConnected, setWsConnected] = React.useState(false);

  const connectToWebSocketServer = () => {
    const url =
      window.MODE === "development" || !window.MODE
        ? "ws://localhost:3000"
        : "wss://boomless-plushed-paisley.ngrok-free.dev";

    socketRef.current =  new WebSocket(url);

    setWsConnected(true);
    socketRef.current.onopen = (event) => {
  console.log("WebSocket connected");
};


   socketRef.current.onerror = (event) => {
     console.error("WebSocket error", event);
   };



    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handlersRef.current[message.type]?.(message);
    };

    socketRef.current.onclose = (event) => {
      console.log(event.code, event.reason, event.wasClean);
    };

  };

 

  const registerHandlers = (handlers) => {
    handlersRef.current = handlers;
  };


   const sendSignal = (msg) => {
      if (!socketRef.current) return;

      if (socketRef.current.readyState !== WebSocket.OPEN) {
        console.warn("WebSocket not ready, dropped:", msg);
        return;
      }

      socketRef.current.send(JSON.stringify(msg));
    };

  return (
    <websocketContext.Provider
      value={{ connectToWebSocketServer, sendSignal, registerHandlers , wsConnected }}
    >
      {children}
    </websocketContext.Provider>
  );
};
