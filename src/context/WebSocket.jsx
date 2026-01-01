
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useRef } from "react";

export const websocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const handlersRef = useRef({});
  const [wsConnected, setWsConnected] = React.useState(false);

let pingInterval


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
  console.log("WebSocket connected");

   pingInterval = setInterval(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "ping" }));
    }
  }, 30000);


      setWsConnected(true);



  
};


   socketRef.current.onerror = (event) => {
     console.error("WebSocket error", event);
   };



   socketRef.current.onmessage = (event) => {
     try {
       const message = JSON.parse(event.data);
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
      if (!socketRef.current) return;

      if (socketRef.current.readyState !== WebSocket.OPEN) {
        console.warn("WebSocket not ready, dropped:", msg);
        return;
      }

      socketRef.current.send(JSON.stringify(msg));
    };

  return (
    <websocketContext.Provider
      value={{  sendSignal, registerHandlers , wsConnected }}
    >
      {children}
    </websocketContext.Provider>
  );
};
