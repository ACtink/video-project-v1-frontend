import { useContext, useEffect } from "react";
import { webRTCContext } from "./WebRTC";
import { websocketContext } from "./WebSocket";

export function RTCBridge() {
  const rtc = useContext(webRTCContext);
  const ws = useContext(websocketContext);

  useEffect(() => {
    if (!rtc || !ws) return;

    ws.registerHandlers({
      matched: (m) => rtc.startWebRTC(m.type, m.role, ws.sendSignal),

      offer: (m) => rtc.handleOffer(m.type, m.offer, ws.sendSignal),

      answer: (m) => rtc.handleAnswer(m.type, m.answer),

      "ice-candidate": (m) => rtc.addIceCandidate(m.candidate),
    });
  }, [rtc, ws]);

  return null;
}
