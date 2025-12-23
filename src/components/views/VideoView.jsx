import { Video } from "lucide-react";
import VideoChatBox from "./VideoChatBox";

function VideoView() {
  return (
    <div className="w-full h-full flex flex-col px-4 py-4 text-white bg-gradient-to-br from-[#0b0f1a] via-[#1a0f2e] to-[#0b1a2e]">
      {/* Header */}
      {/* <h1 className="text-xl md:text-2xl font-bold text-cyan-400 text-center drop-shadow-[0_0_20px_#00c8ff] mb-2">
        HelloStranger — Talk to Real People Across the Globe
      </h1> */}

      {/* Status */}
      {/* <div className="text-sm text-white/70 text-center mb-3">
        Status: <span className="text-white">Disconnected</span>
      </div> */}

      {/* MAIN AREA — TAKES FULL REMAINING HEIGHT */}
      {/* <div className="flex-1 w-full flex flex-col xl:flex-row gap-4 xl:gap-6 overflow-hidden"> */}
      <div className="flex-1 w-full flex flex-col xl:flex-row gap-4 xl:gap-6 overflow-hidden">
        {/* LOCAL VIDEO */}
        {/* <div className="flex-1 xl:flex-[3] relative rounded-xl border-[3px] border-cyan-400 shadow-[0_0_20px_rgba(0,200,255,0.5)] bg-black overflow-hidden">
          <video
            className="w-full h-full object-contain"
            autoPlay
            muted
            playsInline
          />
        </div> */}
        <div
          className="
              order-1
              xl:order-1
              w-full
              xl:flex-[3]
              h-[45vh]
              xl:h-full
              rounded-xl
              border-[3px] border-cyan-400
              bg-black
              overflow-hidden
            "
        >
          <video className="w-full h-full object-contain" />
        </div>

        {/* CHAT */}

        <VideoChatBox />

        {/* REMOTE VIDEO */}
        {/* <div className="flex-1 xl:flex-[3] relative rounded-xl border-[3px] border-cyan-400 shadow-[0_0_20px_rgba(0,200,255,0.5)] bg-black overflow-hidden">
          <video
            className="w-full h-full object-contain"
            autoPlay
            playsInline
          />
        </div> */}
        <div
          className="
                  order-2
                  xl:order-3
                  w-full
                  xl:flex-[3]
                  h-[25vh]
                  xl:h-full
                  rounded-xl
                  border-[3px] border-cyan-400
                  bg-black
                  overflow-hidden
                "
        >
          <video className="w-full h-full object-contain" />
        </div>
      </div>

      {/* CONTROLS */}
      <div className="mt-3 flex flex-wrap gap-3 justify-center shrink-0">
        <button className="px-5 py-2 rounded-lg font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition active:scale-95">
          Start
        </button>
        <button className="px-5 py-2 rounded-lg font-bold bg-yellow-400 text-black hover:bg-yellow-300 transition active:scale-95">
          Next
        </button>
        <button className="px-5 py-2 rounded-lg font-bold bg-red-500 text-white hover:bg-red-600 transition active:scale-95">
          Close
        </button>
        <button className="px-5 py-2 rounded-lg font-bold bg-red-600 text-white hover:bg-red-700 transition active:scale-95">
          Exit
        </button>
      </div>
    </div>
  );
}

export default VideoView;
