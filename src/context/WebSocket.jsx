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
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import { webRTCContext } from "./WebRTC";
// import { useAuth } from "../hooks/useAuth";
// import { saveMessage } from "../utils/saveMessage";

// export const websocketContext = createContext(null);

// export const WebSocketProvider = ({ children }) => {

//   const socketRef = useRef(null);

//   const handlersRef = useRef({});

//   const sendQueueRef = useRef([]);

//   const pingIntervalRef = useRef(null);

//   const [wsConnected, setWsConnected] = useState(false);

//   const [messages, setMessages] = useState([]);

//   const { user } = useAuth();

//   const {
//     setVideoCallLoader,
//     cleanupFull,
//     cleanupRemotePeer,
//     manualCleanupRef,
//   } = useContext(webRTCContext);

//   const [uiState, setUistate] = useState("idle");

//   /* ============================================
//      HANDLE INCOMING MESSAGE
//   ============================================ */

//   function handleIncomingMessage(message) {

//     console.log("Received new message:", message);

//     setMessages((prev) => {

//       const exists = prev.some(
//         (m) => m.messageId === message.message.messageId
//       );

//       if (exists) return prev;

//       return [

//         ...prev,

//         {

//           messageId: message.message.messageId,

//           conversationId: message.message.conversationId,

//           from: message.message.from,

//           to: user._id,

//           text: message.message.text,

//           status: "delivered",

//           createdAt: new Date(
//             message.message.createdAt
//           ).getTime(),

//         },

//       ];

//     });

//   }

//   function handleAck({ messageId, status }) {

//     setMessages((prev) =>
//       prev.map((msg) =>
//         msg.messageId === messageId
//           ? { ...msg, status }
//           : msg
//       )
//     );

//   }

//   /* ============================================
//      CONNECT FUNCTION (FIXED)
//   ============================================ */

//   function connectToWebSocketServer() {

//     // ✅ Prevent duplicate connection

//     if (
//       socketRef.current &&
//       socketRef.current.readyState === WebSocket.OPEN
//     ) {
//       return socketRef.current;
//     }

//     const WS_URL = import.meta.env.VITE_WS_URL;

//     const socket = new WebSocket(WS_URL);

//     socketRef.current = socket;

//     /* ========================
//        ON OPEN
//     ======================== */

//     socket.onopen = () => {

//       console.log("WebSocket connected");

//       setWsConnected(true);

//       // ✅ Send auth (IMPORTANT)

//       // socket.send(

//       //   JSON.stringify({

//       //     type: "chat_auth",

//       //     userId: user._id,

//       //   })

//       // );

//       // ✅ Flush queued messages

//       sendQueueRef.current.forEach((msg) => {

//         socket.send(JSON.stringify(msg));

//       });

//       sendQueueRef.current = [];

//     };

//     /* ========================
//        ON MESSAGE
//     ======================== */

//     socket.onmessage = async (event) => {

//       try {

//         const message = JSON.parse(event.data);

//         switch (message.type) {
//           // case "chat_deliver":

//           //   // await saveMessage(message);

//           //   handleIncomingMessage(message);

//           //   break;

//           case "chat_deliver":
//             handleIncomingMessage(message);

//             // SAFE ADDITION (does not break anything)

//             if (socketRef.current?.readyState === WebSocket.OPEN) {
//               socketRef.current.send(
//                 JSON.stringify({
//                   type: "ack",
//                   messageId: message.message.messageId,
//                   status: "delivered",
//                 }),
//               );
//             }

//             break;

//           case "ack":
//             handleAck(message);

//             break;

//           case "queued_ack":
//             if (message.success === "ok") setUistate("successfully_queued");

//             break;

//           case "matched_ack":
//             if (message.success === "ok") setUistate("successfully_matched");

//             break;

//           case "close_ack":
//             if (message.success === "ok") setUistate("successfully_closed");

//             break;

//           case "queued_and_searching_next_for_you":
//             setUistate("successfully_skipped_and_searching");

//             setVideoCallLoader(true);

//             manualCleanupRef.current = true;

//             cleanupRemotePeer();

//             break;

//           case "successfully_ended_call":
//             setUistate("idle");

//             cleanupFull();

//             break;
//         }

//         handlersRef.current[message.type]?.(message);

//       }

//       catch {

//         console.warn("Invalid WS message");

//       }

//     };

//     /* ========================
//        ON ERROR
//     ======================== */

//     socket.onerror = (error) => {

//       console.error("WebSocket error:", error);

//     };

//     /* ========================
//        ON CLOSE (FIXED)
//     ======================== */

//     socket.onclose = (event) => {

//       console.log(
//         "WebSocket closed:",
//         event.code,
//         event.reason
//       );

//       clearInterval(pingIntervalRef.current);

//       setWsConnected(false);

//     };

//     return socket;

//   }

//   /* ============================================
//      CONNECT WHEN USER READY
//   ============================================ */

//   useEffect(() => {

//     if (!user?._id) return;

//     const socket = connectToWebSocketServer();

//     return () => {

//       if (
//         socket &&
//         socket.readyState === WebSocket.OPEN
//       ) {
//         socket.close();
//       }

//     };

//   }, [user]);

//   /* ============================================
//      SEND SIGNAL (FIXED)
//   ============================================ */

//   const sendSignal = (msg) => {

//     if (
//       !socketRef.current ||
//       socketRef.current.readyState !== WebSocket.OPEN
//     ) {

//       console.log("Queued message:", msg);

//       sendQueueRef.current.push(msg);

//       return;

//     }

//     socketRef.current.send(JSON.stringify(msg));

//   };

//   const registerHandlers = (handlers) => {

//     handlersRef.current = handlers;

//   };

//   return (

//     <websocketContext.Provider
//       value={{

//         sendSignal,

//         registerHandlers,

//         wsConnected,

//         uiState,

//         setUistate,

//         messages,

//         setMessages,

//       }}

//     >

//       {children}

//     </websocketContext.Provider>

//   );

//};

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import { webRTCContext } from "./WebRTC";
// import { useAuth } from "../hooks/useAuth";

// export const websocketContext = createContext(null);

// export const WebSocketProvider = ({ children }) => {
//   const socketRef = useRef(null);
//   const handlersRef = useRef({});
//   const sendQueueRef = useRef([]);
//   const pingIntervalRef = useRef(null);

//   const [wsConnected, setWsConnected] = useState(false);

//   // ✅ FIX: messages now stored per conversation
//   const [messages, setMessages] = useState({});

//   const { user } = useAuth();

//   const reconnectTimeoutRef = useRef(null);

//   const {
//     setVideoCallLoader,
//     cleanupFull,
//     cleanupRemotePeer,
//     manualCleanupRef,
//   } = useContext(webRTCContext);

//   const [uiState, setUistate] = useState("idle");

//   /* ============================================
//      HANDLE INCOMING MESSAGE (FIXED)
//   ============================================ */

//   function handleIncomingMessage(message) {
//     const msg = message.message;

//     const convId = msg.conversationId;

//     setMessages((prev) => {
//       const existing = prev[convId] || [];

//       const exists = existing.some((m) => m.messageId === msg.messageId);

//       if (exists) return prev;

//       return {
//         ...prev,

//         [convId]: [
//           ...existing,

//           {
//             messageId: msg.messageId,

//             conversationId: convId,

//             from: msg.from,

//             to: user._id,

//             text: msg.text,

//             status: "delivered",

//             createdAt: new Date(msg.createdAt).getTime(),
//           },
//         ],
//       };
//     });
//   }

//   /* ============================================
//      HANDLE ACK (FIXED)
//   ============================================ */

//   function handleAck({ messageId, status }) {
//     setMessages((prev) => {
//       const updated = { ...prev };

//       for (const convId in updated) {
//         updated[convId] = updated[convId].map((msg) =>
//           msg.messageId === messageId ? { ...msg, status } : msg,
//         );
//       }

//       return updated;
//     });
//   }

//   /* ============================================
//      CONNECT FUNCTION
//   ============================================ */

//   function connectToWebSocketServer() {
//     if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
//       return socketRef.current;
//     }

//     const WS_URL = import.meta.env.VITE_WS_URL;

//     const socket = new WebSocket(WS_URL);

//     socketRef.current = socket;

//     socket.onopen = () => {
//       console.log("WebSocket connected");

//       setWsConnected(true);

//       sendQueueRef.current.forEach((msg) => {
//         socket.send(JSON.stringify(msg));
//       });

//       sendQueueRef.current = [];
//     };

//     socket.onmessage = async (event) => {
//       try {
//         const message = JSON.parse(event.data);

//         switch (message.type) {
//           case "chat_deliver":
//             handleIncomingMessage(message);

//             // send delivered ack
//             if (socketRef.current?.readyState === WebSocket.OPEN) {
//               socketRef.current.send(
//                 JSON.stringify({
//                   type: "ack",
//                   messageId: message.message.messageId,
//                   status: "delivered",
//                 }),
//               );
//             }

//             break;

//           case "ack":
//             handleAck(message);

//             break;

//           case "queued_ack":
//             if (message.success === "ok") setUistate("successfully_queued");

//             break;

//           case "matched_ack":
//             if (message.success === "ok") setUistate("successfully_matched");

//             break;

//           case "close_ack":
//             if (message.success === "ok") setUistate("successfully_closed");

//             break;

//           case "queued_and_searching_next_for_you":
//             setUistate("successfully_skipped_and_searching");

//             setVideoCallLoader(true);

//             manualCleanupRef.current = true;

//             cleanupRemotePeer();

//             break;

//           case "successfully_ended_call":
//             setUistate("idle");

//             cleanupFull();

//             break;
//         }

//         handlersRef.current[message.type]?.(message);
//       } catch {
//         console.warn("Invalid WS message");
//       }
//     };

//     socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     socket.onclose = (event) => {
//       console.log("WebSocket closed:", event.code, event.reason);

//       clearInterval(pingIntervalRef.current);

//       setWsConnected(false);

//       // ✅ auto reconnect after 2 seconds
//       reconnectTimeoutRef.current = setTimeout(() => {
//         if (user?._id) {
//           connectToWebSocketServer();
//         }
//       }, 2000);
//     };

//     return socket;
//   }

//   /* ============================================
//      CONNECT WHEN USER READY
//   ============================================ */

//   useEffect(() => {
//     if (!user?._id) return;

//     const socket = connectToWebSocketServer();

//     return () => {
//       if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.close();
//       }
//     };
//   }, [user]);

//   useEffect(() => {
//     const handleVisibility = () => {
//       if (!document.hidden) {
//         if (
//           !socketRef.current ||
//           socketRef.current.readyState !== WebSocket.OPEN
//         ) {
//           console.log("Reconnecting websocket after tab focus");

//           connectToWebSocketServer();
//         }
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibility);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibility);
//     };
//   }, [user]);

//   /* ============================================
//      SEND SIGNAL
//   ============================================ */

//   const sendSignal = (msg) => {
//     if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
//       console.log("Queued message:", msg);

//       sendQueueRef.current.push(msg);

//       return;
//     }

//     socketRef.current.send(JSON.stringify(msg));
//   };

//   const registerHandlers = (handlers) => {
//     handlersRef.current = handlers;
//   };

//   return (
//     <websocketContext.Provider
//       value={{
//         sendSignal,

//         registerHandlers,

//         wsConnected,

//         uiState,

//         setUistate,

//         messages, // now object
//         setMessages, // still usable
//       }}
//     >
//       {children}
//     </websocketContext.Provider>
//   );
// };

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import { webRTCContext } from "./WebRTC";
// import { useAuth } from "../hooks/useAuth";

// export const websocketContext = createContext(null);

// export const WebSocketProvider = ({ children }) => {
//   const socketRef = useRef(null);
//   const handlersRef = useRef({});
//   const sendQueueRef = useRef([]);
//   const pingIntervalRef = useRef(null);
//   const reconnectTimeoutRef = useRef(null);
//   const isIntentionalClose = useRef(false);

//   const [wsConnected, setWsConnected] = useState(false);
//   const [messages, setMessages] = useState({});

//   const { user } = useAuth();

//   const {
//     setVideoCallLoader,
//     cleanupFull,
//     cleanupRemotePeer,
//     manualCleanupRef,
//   } = useContext(webRTCContext);

//   const [uiState, setUistate] = useState("idle");

//   const userIdRef = useRef(null);

//   useEffect(() => {
//     userIdRef.current = user?._id;
//   }, [user]);

//   /* ============================================
//      HANDLE INCOMING MESSAGE
//   ============================================ */
//   // function handleIncomingMessage(message) {
//   //   const msg = message.message;
//   //   const convId = msg.conversationId;

//   //   setMessages((prev) => {
//   //     const existing = prev[convId] || [];
//   //     const exists = existing.some((m) => m.messageId === msg.messageId);
//   //     if (exists) return prev;

//   //     return {
//   //       ...prev,
//   //       [convId]: [
//   //         ...existing,
//   //         {
//   //           messageId: msg.messageId,
//   //           conversationId: convId,
//   //           from: msg.from,
//   //           to: user._id,
//   //           text: msg.text,
//   //           status: "delivered",
//   //           createdAt: new Date(msg.createdAt).getTime(),
//   //         },
//   //       ],
//   //     };
//   //   });
//   // }

//   function handleIncomingMessage(message) {
//     const msg = message.message;
//     const convId = msg.conversationId;

//     setMessages((prev) => {
//       const existing = prev[convId] || [];
//       const exists = existing.some((m) => m.messageId === msg.messageId);
//       if (exists) return prev;

//       return {
//         ...prev,
//         [convId]: [
//           ...existing,
//           {
//             messageId: msg.messageId,
//             conversationId: convId,
//             from: msg.from,
//             to: userIdRef.current, // ← fix here
//             text: msg.text,
//             status: "delivered",
//             createdAt: new Date(msg.createdAt).getTime(),
//           },
//         ],
//       };
//     });
//   }

//   /* ============================================
//      HANDLE ACK
//   ============================================ */
//   function handleAck({ messageId, status }) {
//     setMessages((prev) => {
//       const updated = { ...prev };
//       for (const convId in updated) {
//         updated[convId] = updated[convId].map((msg) =>
//           msg.messageId === messageId ? { ...msg, status } : msg,
//         );
//       }
//       return updated;
//     });
//   }

//   /* ============================================
//      SCHEDULE RECONNECT
//   ============================================ */
//   function scheduleReconnect() {
//     // Clear any existing reconnect timer before scheduling a new one
//     if (reconnectTimeoutRef.current) {
//       clearTimeout(reconnectTimeoutRef.current);
//     }
//     reconnectTimeoutRef.current = setTimeout(() => {
//       if (user?._id && !isIntentionalClose.current) {
//         console.log("Attempting reconnect...");
//         connectToWebSocketServer();
//       }
//     }, 2000);
//   }

//   /* ============================================
//      CONNECT FUNCTION
//   ============================================ */
//   function connectToWebSocketServer() {
//     // Already open — do nothing
//     if (socketRef.current?.readyState === WebSocket.OPEN)
//       return socketRef.current;

//     // Already connecting — do nothing
//     if (socketRef.current?.readyState === WebSocket.CONNECTING)
//       return socketRef.current;

//     isIntentionalClose.current = false;

//     const WS_URL = import.meta.env.VITE_WS_URL;
//     const socket = new WebSocket(WS_URL);
//     socketRef.current = socket;

//     socket.onopen = () => {
//       console.log("WebSocket connected");
//       setWsConnected(true);

//       // Clear any pending reconnect since we're now connected
//       if (reconnectTimeoutRef.current) {
//         clearTimeout(reconnectTimeoutRef.current);
//         reconnectTimeoutRef.current = null;
//       }

//       // Flush queued messages
//       sendQueueRef.current.forEach((msg) => socket.send(JSON.stringify(msg)));
//       sendQueueRef.current = [];

//       // Heartbeat ping every 25s to keep connection alive
//       clearInterval(pingIntervalRef.current);
//       pingIntervalRef.current = setInterval(() => {
//         if (socket.readyState === WebSocket.OPEN) {
//           socket.send(JSON.stringify({ type: "ping" }));
//         }
//       }, 25000);
//     };

//     socket.onmessage = async (event) => {
//       try {
//         const message = JSON.parse(event.data);

//         switch (message.type) {
//           case "chat_deliver":
//             handleIncomingMessage(message);
//             if (socketRef.current?.readyState === WebSocket.OPEN) {
//               socketRef.current.send(
//                 JSON.stringify({
//                   type: "ack",
//                   messageId: message.message.messageId,
//                   status: "delivered",
//                 }),
//               );
//             }
//             break;

//           case "ack":
//             handleAck(message);
//             break;

//           case "queued_ack":
//             if (message.success === "ok") setUistate("successfully_queued");
//             break;

//           case "matched_ack":
//             if (message.success === "ok") setUistate("successfully_matched");
//             break;

//           case "close_ack":
//             if (message.success === "ok") setUistate("successfully_closed");
//             break;

//           case "queued_and_searching_next_for_you":
//             setUistate("successfully_skipped_and_searching");
//             setVideoCallLoader(true);
//             manualCleanupRef.current = true;
//             cleanupRemotePeer();
//             break;

//           case "successfully_ended_call":
//             setUistate("idle");
//             cleanupFull();
//             break;

//           case "pong":
//             // Server acknowledged our ping — connection is healthy
//             break;
//         }

//         handlersRef.current[message.type]?.(message);
//       } catch {
//         console.warn("Invalid WS message");
//       }
//     };

//     socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     socket.onclose = (event) => {
//       console.log("WebSocket closed:", event.code, event.reason);
//       clearInterval(pingIntervalRef.current);
//       setWsConnected(false);

//       // Only reconnect if it wasn't closed intentionally
//       if (!isIntentionalClose.current) {
//         scheduleReconnect();
//       }
//     };

//     return socket;
//   }

//   /* ============================================
//      CONNECT WHEN USER READY
//   ============================================ */
//   useEffect(() => {
//     if (!user?._id) return;

//     connectToWebSocketServer();

//     return () => {
//       // Mark as intentional so onclose doesn't trigger reconnect on unmount
//       isIntentionalClose.current = true;
//       clearTimeout(reconnectTimeoutRef.current);
//       clearInterval(pingIntervalRef.current);
//       if (socketRef.current?.readyState === WebSocket.OPEN) {
//         socketRef.current.close();
//       }
//     };
//   }, [user]);

//   /* ============================================
//      RECONNECT ON TAB FOCUS / COMING BACK TO APP
//   ============================================ */
//   useEffect(() => {
//     const handleVisibility = () => {
//       if (!document.hidden && user?._id) {
//         const state = socketRef.current?.readyState;
//         if (state !== WebSocket.OPEN && state !== WebSocket.CONNECTING) {
//           console.log("Reconnecting websocket after tab focus");
//           connectToWebSocketServer();
//         }
//       }
//     };

//     // Also reconnect on network coming back online
//     const handleOnline = () => {
//       if (user?._id) {
//         const state = socketRef.current?.readyState;
//         if (state !== WebSocket.OPEN && state !== WebSocket.CONNECTING) {
//           console.log("Reconnecting websocket after network restore");
//           connectToWebSocketServer();
//         }
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibility);
//     window.addEventListener("online", handleOnline);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibility);
//       window.removeEventListener("online", handleOnline);
//     };
//   }, [user]);

//   /* ============================================
//      SEND SIGNAL
//   ============================================ */
//   const sendSignal = (msg) => {
//     if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
//       console.log("Queued message:", msg);
//       sendQueueRef.current.push(msg);
//       return;
//     }
//     socketRef.current.send(JSON.stringify(msg));
//   };

//   const registerHandlers = (handlers) => {
//     handlersRef.current = handlers;
//   };

//   return (
//     <websocketContext.Provider
//       value={{
//         sendSignal,
//         registerHandlers,
//         wsConnected,
//         uiState,
//         setUistate,
//         messages,
//         setMessages,
//       }}
//     >
//       {children}
//     </websocketContext.Provider>
//   );
// };

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { webRTCContext } from "./WebRTC";
import { useAuth } from "../hooks/useAuth";

export const websocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const handlersRef = useRef({});
  const sendQueueRef = useRef([]);
  const pingIntervalRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const isIntentionalClose = useRef(false);

  const [wsConnected, setWsConnected] = useState(false);
  const [messages, setMessages] = useState({});

  const { user } = useAuth();

  const currentConversationIdRef = useRef(null);

  const setCurrentConversation = (conversationId) => {
    currentConversationIdRef.current = conversationId;
  };

  const {
    setVideoCallLoader,
    cleanupFull,
    cleanupRemotePeer,
    manualCleanupRef,
  } = useContext(webRTCContext);

  const [uiState, setUistate] = useState("idle");

  const userIdRef = useRef(null);

  useEffect(() => {
    userIdRef.current = user?._id;
  }, [user]);

  /* ============================================
     HANDLE INCOMING MESSAGE
  ============================================ */
  function handleIncomingMessage(message) {
    const msg = message.message;
    const convId = msg.conversationId;

    setMessages((prev) => {
      const existing = prev[convId] || [];
      const exists = existing.some((m) => m.messageId === msg.messageId);
      if (exists) return prev;

      return {
        ...prev,
        [convId]: [
          ...existing,
          {
            messageId: msg.messageId,
            conversationId: convId,
            from: msg.from,
            to: userIdRef.current,
            text: msg.text,
            status: "delivered",
            createdAt: new Date(msg.createdAt).getTime(),
          },
        ],
      };
    });
  }

  /* ============================================
     HANDLE ACK (sent / delivered / read)
  ============================================ */
 function handleAck({ messageId, status, conversationId }) {
   console.log("handleAck called:", { messageId, status, conversationId }); // ← add this

   setMessages((prev) => {
     const updated = { ...prev };

     if (status === "read" && conversationId) {
       // bulk update all messages in this conversation to read
       if (updated[conversationId]) {
         updated[conversationId] = updated[conversationId].map((msg) =>
           msg.from === userIdRef.current && msg.status !== "read"
             ? { ...msg, status: "read" }
             : msg,
         );
       }
       return updated;
     }

     // sent / delivered — update specific message by id
     for (const convId in updated) {
       updated[convId] = updated[convId].map((msg) =>
         msg.messageId === messageId ? { ...msg, status } : msg,
       );
     }
     return updated;
   });
 }

  /* ============================================
     MARK CONVERSATION AS READ
  ============================================ */
  const markAsRead = (conversationId) => {
    sendSignal({ type: "read", conversationId });

    // update ALL unread messages in this conversation to read
    // (both for receiver's view and sender's incoming ack)
    setMessages((prev) => {
      const existing = prev[conversationId] || [];
      return {
        ...prev,
        [conversationId]: existing.map((msg) =>
          msg.status !== "read" ? { ...msg, status: "read" } : msg,
        ),
      };
    });
  };

  /* ============================================
     SCHEDULE RECONNECT
  ============================================ */
  function scheduleReconnect() {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    reconnectTimeoutRef.current = setTimeout(() => {
      if (user?._id && !isIntentionalClose.current) {
        console.log("Attempting reconnect...");
        connectToWebSocketServer();
      }
    }, 2000);
  }

  /* ============================================
     CONNECT FUNCTION
  ============================================ */
  function connectToWebSocketServer() {
    if (socketRef.current?.readyState === WebSocket.OPEN)
      return socketRef.current;

    if (socketRef.current?.readyState === WebSocket.CONNECTING)
      return socketRef.current;

    isIntentionalClose.current = false;

    const WS_URL = import.meta.env.VITE_WS_URL;
    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      setWsConnected(true);

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      // flush queued messages
      sendQueueRef.current.forEach((msg) => socket.send(JSON.stringify(msg)));
      sendQueueRef.current = [];

      // heartbeat ping every 25s
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "ping" }));
        }
      }, 25000);
    };

    socket.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case "chat_deliver":
            handleIncomingMessage(message);
            if (socketRef.current?.readyState === WebSocket.OPEN) {
              socketRef.current.send(
                JSON.stringify({
                  type: "ack",
                  messageId: message.message.messageId,
                  status: "delivered",
                }),
              );

              // if receiver is currently viewing this conversation → mark as read immediately
              const incomingConvId = message.message.conversationId?.toString();
              if (
                incomingConvId &&
                currentConversationIdRef.current === incomingConvId
              ) {
                socketRef.current.send(
                  JSON.stringify({
                    type: "read",
                    conversationId: incomingConvId,
                  }),
                );
              }
            }
            break;

          case "ack":
            handleAck(message);
            break;

          case "read_ack":
            handleAck({
              messageId: message.messageId,
              conversationId: message.conversationId,
              status: "read",
            });
            break;

          case "queued_ack":
            if (message.success === "ok") setUistate("successfully_queued");
            break;

          case "matched_ack":
            if (message.success === "ok") setUistate("successfully_matched");
            break;

          case "close_ack":
            if (message.success === "ok") setUistate("successfully_closed");
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

          case "pong":
            break;
        }

        handlersRef.current[message.type]?.(message);
      } catch {
        console.warn("Invalid WS message");
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket closed:", event.code, event.reason);
      clearInterval(pingIntervalRef.current);
      setWsConnected(false);

      if (!isIntentionalClose.current) {
        scheduleReconnect();
      }
    };

    return socket;
  }

  /* ============================================
     CONNECT WHEN USER READY
  ============================================ */
  useEffect(() => {
    if (!user?._id) return;

    connectToWebSocketServer();

    return () => {
      isIntentionalClose.current = true;
      clearTimeout(reconnectTimeoutRef.current);
      clearInterval(pingIntervalRef.current);
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [user]);

  /* ============================================
     RECONNECT ON TAB FOCUS / NETWORK RESTORE
  ============================================ */
  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden && user?._id) {
        const state = socketRef.current?.readyState;
        if (state !== WebSocket.OPEN && state !== WebSocket.CONNECTING) {
          console.log("Reconnecting websocket after tab focus");
          connectToWebSocketServer();
        }
      }
    };

    const handleOnline = () => {
      if (user?._id) {
        const state = socketRef.current?.readyState;
        if (state !== WebSocket.OPEN && state !== WebSocket.CONNECTING) {
          console.log("Reconnecting websocket after network restore");
          connectToWebSocketServer();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("online", handleOnline);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("online", handleOnline);
    };
  }, [user]);

  /* ============================================
     SEND SIGNAL
  ============================================ */
  const sendSignal = (msg) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
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
        markAsRead,
        setCurrentConversation, // ← add
      }}
    >
      {children}
    </websocketContext.Provider>
  );
};