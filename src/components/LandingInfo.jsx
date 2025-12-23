import React from 'react'


import { useNavigate } from 'react-router-dom'; 

function LandingInfo() {

    const navigate = useNavigate();
    
  return (
 
      <main className="flex-1 flex items-center justify-center">
        <div className="px-6 md:px-10 max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            Meet Strangers on
            <br className="hidden md:block" /> Live Video
          </h2>

          <p className="text-white/80 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
            HelloStranger brings people together through random video chats,
            available only to registered users. Accounts help us maintain a
            safer, more respectful space for genuine human connections.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-3 bg-cyan-500 text-slate-900 rounded-lg text-base md:text-lg font-semibold hover:bg-cyan-400 transition"
              onClick={() => navigate("/join")}
            >
              Join Now
            </button>
            <button
              className="px-8 py-3 border border-white/30 rounded-lg text-base md:text-lg hover:bg-white/10 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </main>
  )
}

export default LandingInfo