// import React from "react";
// import { useNavigate } from "react-router-dom";

// function LandingInfo() {
//   const navigate = useNavigate();

//   return (
//     <main className="min-h-full flex items-center justify-center">
//       <div className="px-6 md:px-10 max-w-3xl text-center fade-up">
//         {/* HEADLINE */}
//         <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-purple-300 via-indigo-300 to-slate-200 bg-clip-text text-transparent">
//           Meet Strangers on
//           <br className="hidden md:block" /> Live Video
//         </h2>

//         {/* DESCRIPTION */}
//         <p className="text-white/70 text-base md:text-lg mb-10 leading-relaxed">
//           HelloStranger brings people together through random video chats,
//           available only to registered users. Accounts help us maintain a safer,
//           more respectful space for genuine human connections.
//         </p>

//         {/* BUTTONS */}
//         <div className="flex flex-col sm:flex-row gap-5 justify-center">
//           <button
//             onClick={() => navigate("/join")}
//             className="
//               px-10 py-3 rounded-xl
//               text-base md:text-lg font-semibold
//               text-white
//               bg-gradient-to-r from-purple-700 to-indigo-800
//               hover:scale-105
//               transition-all duration-300
//               shadow-xl
//             "
//           >
//             Join Now
//           </button>

//           <button
//             onClick={() => navigate("/login")}
//             className="
//               px-10 py-3 rounded-xl
//               text-base md:text-lg font-medium
//               border border-white/20
//               bg-white/5 backdrop-blur-lg
//               hover:bg-white/10
//               transition-all duration-300
//             "
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default LandingInfo;


import React from "react";
import { useNavigate } from "react-router-dom";
import { Video, Shield, Users } from "lucide-react";

function LandingInfo() {
  const navigate = useNavigate();

  return (
    <main className="min-h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl text-center flex flex-col items-center gap-8">
        {/* BADGE */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-[12px] text-indigo-300 font-medium tracking-wide">
            Live video chat — meet someone new
          </span>
        </div>

        {/* HEADLINE */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
            Meet Strangers
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              on Live Video
            </span>
          </h1>
          <p className="text-[15px] sm:text-base text-white/50 leading-relaxed max-w-lg mx-auto">
            HelloStranger connects you with real people through random video
            chats. Accounts help us keep the space safe and respectful.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate("/join")}
            className="
              px-8 py-3 rounded-xl
              text-[14px] font-semibold text-white tracking-wide
              bg-indigo-600 hover:bg-indigo-500
              shadow-[0_0_28px_rgba(99,102,241,0.35)]
              hover:shadow-[0_0_36px_rgba(99,102,241,0.5)]
              active:scale-[0.97] transition-all duration-200
            "
          >
            Join Now
          </button>
          <button
            onClick={() => navigate("/login")}
            className="
              px-8 py-3 rounded-xl
              text-[14px] font-semibold text-white/70 hover:text-white tracking-wide
              border border-white/10 hover:bg-white/8
              active:scale-[0.97] transition-all duration-200
            "
          >
            Login
          </button>
        </div>

        {/* FEATURE PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            { icon: Video, label: "Random video chat" },
            { icon: Shield, label: "Registered users only" },
            { icon: Users, label: "Real connections" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/8"
            >
              <Icon size={12} className="text-white/40" />
              <span className="text-[12px] text-white/40 tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default LandingInfo;
