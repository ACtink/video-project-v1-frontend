import React from "react";
import { useNavigate } from "react-router-dom";

function LandingInfo() {
  const navigate = useNavigate();

  return (
    <main className="min-h-full flex items-center justify-center">
      <div className="px-6 md:px-10 max-w-3xl text-center fade-up">
        {/* HEADLINE */}
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-purple-300 via-indigo-300 to-slate-200 bg-clip-text text-transparent">
          Meet Strangers on
          <br className="hidden md:block" /> Live Video
        </h2>

        {/* DESCRIPTION */}
        <p className="text-white/70 text-base md:text-lg mb-10 leading-relaxed">
          HelloStranger brings people together through random video chats,
          available only to registered users. Accounts help us maintain a safer,
          more respectful space for genuine human connections.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button
            onClick={() => navigate("/join")}
            className="
              px-10 py-3 rounded-xl
              text-base md:text-lg font-semibold
              text-white
              bg-gradient-to-r from-purple-700 to-indigo-800
              hover:scale-105
              transition-all duration-300
              shadow-xl
            "
          >
            Join Now
          </button>

          <button
            onClick={() => navigate("/login")}
            className="
              px-10 py-3 rounded-xl
              text-base md:text-lg font-medium
              border border-white/20
              bg-white/5 backdrop-blur-lg
              hover:bg-white/10
              transition-all duration-300
            "
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}

export default LandingInfo;
