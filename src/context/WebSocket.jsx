// /* eslint-disable react-refresh/only-export-components */
// import React, { createContext, useState } from "react";
// import { webRTCContext } from "./WebRTC";



// export const websocketContext = createContext(null);

// export const WebSocketProvider = ({ children }) => {
//   const [clientSocket, setClientSocket] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [wsConnected, setWsConnected] = useState(false);

//   const { localVideoRef, remoteVideoRef, startWebRTC, handleOffer, handleAnswer, sendMessage, cleanupCall, addIceCandidate } = React.useContext(webRTCContext);




    


//   const connectToWebSocketServer = async () => {
//     try {


//             let url = "";
//             console.log("Window MODE:", window.MODE);
//             if (window.MODE == "development" || !window.MODE) {
//             url = "ws://localhost:3000";
//             console.log("Development mode detected");
//             } else {
//             console.log("Production mode detected");
//             url = "wss://boomless-plushed-paisley.ngrok-free.dev";
//             }

//         const socket = new WebSocket(url);


//       setClientSocket(socket);



//       socket.onopen = () => { 
        
//         setWsConnected(true);

//       }

     



//       socket.onmessage = async (event) => {
//         const message = JSON.parse(event.data);
//         console.log("WebSocket message received:", message);


//         switch (message.type) {
//           case "MATCH_FOUND":
//             await startWebRTC(true); // offerer
//             break;

//           case "OFFER":
//             await handleOffer(message.offer);
//             break;

//           case "ANSWER":
//             await handleAnswer(message.answer);
//             break;

//           case "ICE":
//             await addIceCandidate(message.candidate);
//             break;
//         }
//       };









//     } catch {
//       setClientSocket(null);
//     } finally {
//       setLoading(false);
//     }
//   };



//   return (
//     <websocketContext.Provider value={{ clientSocket, loading, wsConnected, connectToWebSocketServer }}>
//       {children}
//     </websocketContext.Provider>
//   );
// };

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


   


    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handlersRef.current[message.type]?.(message);
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
