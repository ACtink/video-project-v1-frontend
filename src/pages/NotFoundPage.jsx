// import { useNavigate } from "react-router-dom";

// export default function NotFoundPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-5 px-4">
//       <p className="text-[64px] font-black text-white/10 leading-none select-none">
//         404
//       </p>

//       <div className="text-center space-y-2">
//         <p className="text-[17px] font-semibold text-white/70">
//           This page doesn't exist
//         </p>
//         <p className="text-[13px] text-white/30 max-w-[260px] leading-relaxed">
//           It may have been removed or the address is incorrect.
//         </p>
//       </div>

//       <div className="flex gap-3 mt-2">
//         <button
//           onClick={() => navigate(-1)}
//           className="px-5 py-2 text-[13px] font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150 active:scale-95"
//         >
//           Go back
//         </button>
//         <button
//           onClick={() => navigate("/")}
//           className="px-5 py-2 text-[13px] font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-150 active:scale-95"
//         >
//           Home
//         </button>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";


export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-black text-white flex flex-col items-center justify-center gap-5 px-4"
      style={{ flex: 1, minHeight: 0 }}
    >
      {/* Illustration */}
      <div className="w-full max-w-[520px] mt-6">
        {" "}
        <svg
          width="100%"
          viewBox="0 0 680 420"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`
            @keyframes float {
              0%,100% { transform: translateY(0px) rotate(-8deg); }
              50%      { transform: translateY(-14px) rotate(6deg); }
            }
            @keyframes drift {
              0%   { transform: translateX(0) translateY(0); }
              50%  { transform: translateX(6px) translateY(-4px); }
              100% { transform: translateX(0) translateY(0); }
            }
            @keyframes blink {
              0%,90%,100% { opacity:1; }
              95%         { opacity:0; }
            }
            .astronaut { animation: float 4s ease-in-out infinite; transform-origin: 340px 200px; }
            .planet    { animation: drift 8s ease-in-out infinite; transform-origin: 530px 280px; }
            .signal    { animation: blink 3s ease-in-out infinite; }
          `}</style>

          <rect width="680" height="420" fill="#060610" />

          {/* Stars */}
          <circle cx="80" cy="40" r="1.2" fill="#fff" opacity="0.6" />
          <circle cx="150" cy="90" r="0.8" fill="#fff" opacity="0.4" />
          <circle cx="220" cy="30" r="1.5" fill="#fff" opacity="0.7" />
          <circle cx="310" cy="60" r="0.9" fill="#fff" opacity="0.5" />
          <circle cx="400" cy="20" r="1.2" fill="#fff" opacity="0.6" />
          <circle cx="480" cy="70" r="0.7" fill="#fff" opacity="0.3" />
          <circle cx="560" cy="35" r="1.4" fill="#fff" opacity="0.5" />
          <circle cx="630" cy="80" r="1.0" fill="#fff" opacity="0.6" />
          <circle cx="50" cy="160" r="0.8" fill="#fff" opacity="0.3" />
          <circle cx="600" cy="150" r="1.1" fill="#fff" opacity="0.5" />
          <circle cx="130" cy="340" r="0.9" fill="#fff" opacity="0.4" />
          <circle cx="580" cy="360" r="1.3" fill="#fff" opacity="0.5" />
          <circle cx="40" cy="300" r="0.7" fill="#fff" opacity="0.3" />
          <circle cx="650" cy="300" r="1.0" fill="#fff" opacity="0.4" />
          <circle cx="250" cy="380" r="0.8" fill="#fff" opacity="0.3" />
          <circle cx="450" cy="390" r="1.1" fill="#fff" opacity="0.4" />

          {/* Purple planet */}
          <g className="planet">
            <circle cx="530" cy="280" r="55" fill="#1a0a2e" />
            <circle
              cx="530"
              cy="280"
              r="55"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1"
              opacity="0.4"
            />
            <ellipse
              cx="530"
              cy="280"
              rx="80"
              ry="14"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <circle cx="510" cy="265" r="8" fill="#2d1a4a" opacity="0.6" />
            <circle cx="545" cy="290" r="5" fill="#2d1a4a" opacity="0.5" />
          </g>

          {/* Green planet */}
          <circle cx="120" cy="310" r="22" fill="#0f1a0f" />
          <circle
            cx="120"
            cy="310"
            r="22"
            fill="none"
            stroke="#10b981"
            strokeWidth="1"
            opacity="0.3"
          />
          <circle cx="112" cy="303" r="4" fill="#1a2e1a" opacity="0.7" />
          <circle cx="125" cy="318" r="3" fill="#1a2e1a" opacity="0.6" />

          {/* Astronaut */}
          <g className="astronaut">
            {/* Body */}
            <rect
              x="310"
              y="165"
              width="60"
              height="70"
              rx="12"
              fill="#e8eaf0"
            />
            <rect
              x="316"
              y="171"
              width="48"
              height="36"
              rx="8"
              fill="#b8c4d4"
            />
            <rect
              x="320"
              y="175"
              width="40"
              height="28"
              rx="6"
              fill="#1a1a3a"
            />
            <circle cx="340" cy="189" r="2" fill="#6366f1" opacity="0.8" />
            <circle cx="350" cy="189" r="2" fill="#06b6d4" opacity="0.8" />
            <rect
              x="325"
              y="207"
              width="12"
              height="8"
              rx="2"
              fill="#6366f1"
              opacity="0.6"
            />
            <rect
              x="343"
              y="207"
              width="12"
              height="8"
              rx="2"
              fill="#f43f5e"
              opacity="0.6"
            />
            {/* Lower body */}
            <rect
              x="318"
              y="235"
              width="44"
              height="26"
              rx="8"
              fill="#d0d8e8"
            />
            <rect
              x="324"
              y="240"
              width="32"
              height="14"
              rx="4"
              fill="#c0cad8"
            />
            {/* Arms */}
            <rect
              x="295"
              y="175"
              width="16"
              height="36"
              rx="8"
              fill="#d0d8e8"
            />
            <rect
              x="369"
              y="175"
              width="16"
              height="36"
              rx="8"
              fill="#d0d8e8"
            />
            <rect
              x="292"
              y="193"
              width="10"
              height="10"
              rx="3"
              fill="#b0bcd0"
            />
            <rect
              x="378"
              y="193"
              width="10"
              height="10"
              rx="3"
              fill="#b0bcd0"
            />
            {/* Legs */}
            <rect
              x="318"
              y="261"
              width="12"
              height="28"
              rx="6"
              fill="#d0d8e8"
            />
            <rect
              x="350"
              y="261"
              width="12"
              height="28"
              rx="6"
              fill="#d0d8e8"
            />
            <rect
              x="314"
              y="284"
              width="16"
              height="10"
              rx="4"
              fill="#b0bcd0"
            />
            <rect
              x="350"
              y="284"
              width="16"
              height="10"
              rx="4"
              fill="#b0bcd0"
            />
            {/* Helmet */}
            <circle cx="340" cy="155" r="22" fill="#d0d8e8" />
            <circle cx="340" cy="155" r="18" fill="#1a1a3a" />
            <circle cx="340" cy="155" r="16" fill="#0d1117" />
            <circle cx="333" cy="151" r="3" fill="#4a90d9" opacity="0.9" />
            <circle cx="346" cy="151" r="3" fill="#4a90d9" opacity="0.9" />
            <path
              d="M334 159 Q340 163 346 159"
              fill="none"
              stroke="#4a90d9"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="328" cy="147" r="4" fill="white" opacity="0.08" />
            <rect x="326" y="168" width="28" height="4" rx="2" fill="#c0cad8" />
            {/* Signal */}
            <path
              d="M384 178 Q410 165 430 170"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1.2"
              strokeDasharray="3,3"
              opacity="0.5"
            />
            <circle
              cx="432"
              cy="170"
              r="3"
              fill="#6366f1"
              opacity="0.6"
              className="signal"
            />
          </g>

          {/* 404 text */}
          <text
            x="340"
            y="355"
            textAnchor="middle"
            fontFamily="system-ui,sans-serif"
            fontSize="72"
            fontWeight="900"
            fill="white"
            opacity="0.06"
          >
            404
          </text>
          <text
            x="340"
            y="370"
            textAnchor="middle"
            fontFamily="system-ui,sans-serif"
            fontSize="13"
            fill="white"
            opacity="0.25"
          >
            Houston, we lost this page.
          </text>
        </svg>
      </div>

      <div className="text-center space-y-2">
        <p className="text-[17px] font-semibold text-white/70">
          This page doesn't exist
        </p>
        <p className="text-[13px] text-white/30 max-w-[260px] leading-relaxed">
          It may have been removed or the address is incorrect.
        </p>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 text-[13px] font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150 active:scale-95"
        >
          Go back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 text-[13px] font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-150 active:scale-95"
        >
          Home
        </button>
      </div>
    </div>
  );
}