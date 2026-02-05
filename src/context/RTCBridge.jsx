import { useContext, useEffect } from "react";
import { webRTCContext } from "./WebRTC";
import { websocketContext } from "./WebSocket";

export function RTCBridge() {
  const rtc = useContext(webRTCContext);
  const ws = useContext(websocketContext);

  useEffect(() => {
    if (!rtc || !ws) return;

    ws.registerHandlers({
      "matched_ack": (m) => {

        console.log("inside function matched_ack handler, message received is ", m);

        console.log("ab startWebRTC function call karunga matched_ack ke andar se, aur ye message pass karunga ", m);

        if (m.role === "caller") {
            rtc.startWebRTC(m.type, m.role, ws.sendSignal);
        }


      },

      offer: (m) => rtc.handleOffer(m.type, m.offer, ws.sendSignal),

      answer: (m) => rtc.handleAnswer(m.type, m.answer),

      "ice-candidate": (m) => rtc.addIceCandidate(m.candidate),

      "partner-disconnected": () => rtc.cleanupFull(),
    });
  }, [rtc, ws]);

  return null;
}
