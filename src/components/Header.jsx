// import React, { useContext } from 'react'

// import {useNavigate} from 'react-router-dom' 
// import { useAuth } from '../hooks/useAuth';
// import { websocketContext } from '../context/WebSocket';

// function Header() {
//   const navigate = useNavigate();

//   const { user, loading, logout } = useAuth();

//   const { wsConnected } =
//     useContext(websocketContext);

  
//     const handleLogOut =() => {
//       logout();
//       navigate("/");
//     } 

//   if (loading) return null; // or spinner
//   return (
//     <header
//       className="
//   flex text-white justify-between items-center
//   px-6 md:px-10 py-5 md:py-6
// bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]

// "
//     >
//       <h1 className="text-xl md:text-2xl font-bold tracking-wide">
//         <span
//           className="cursor-pointer"
//           onClick={() => {
//             localStorage.setItem("activeTab", "home");
//             window.location.href = "/";

//             //  navigate("/")
//           }}
//         >
//           HelloStranger
//         </span>
//       </h1>

//       <div className="flex gap-3 md:gap-4">
//         {!user ? (
//           <div className="flex gap-3">
//             {" "}
//             <button
//               className="px-3 md:px-4 py-2 rounded-md border border-white/30 hover:bg-white/10 transition text-sm md:text-base"
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </button>
//             <button
//               className="px-3 md:px-4 py-2 rounded-md  text-base 
//               md:text-lg 
//               font-semibold
//               text-white
//               bg-gradient-to-r from-purple-700 to-indigo-800
//               hover:scale-105
//               transition-all 
//               duration-300
//               shadow-xl
//               text-sm
//                md:text-base"
//               onClick={() => navigate("/join")}
//             >
//               Join Now
//             </button>
//           </div>
//         ) : (

//           <>
//             <p>{wsConnected ? "Connected" : "Disconnected"} {user.username}</p>
//           <button
//             onClick={handleLogOut}
//             className="
//     px-3 md:px-4 py-2 rounded-md
//     text-sm md:text-base font-semibold
//     text-white
//     bg-gradient-to-r from-purple-700 to-indigo-800
//     hover:scale-105
//     transition-all duration-300
//     shadow-xl
//   "
//           >
//             Logout
//           </button>
//           </>
//         )}
//       </div>
//     </header>
//   );
// } 

// export default Header

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { websocketContext } from "../context/WebSocket";
import { LogOut, Wifi, WifiOff } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const { wsConnected } = useContext(websocketContext);

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  if (loading) return null;

  return (
    <header className="
      sticky top-0 z-[998]
      w-full
      flex items-center justify-between
      px-4 sm:px-6 md:px-10
      py-3 md:py-4
      bg-black/80 backdrop-blur-xl
      border-b border-white/10
    ">

      {/* ── LOGO ── */}
      <div
        onClick={() => { window.location.href = "/"; }}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
          <span className="text-white text-[11px] font-black tracking-tight">HS</span>
        </div>
        <span className="text-[15px] font-bold text-white tracking-tight hidden sm:block group-hover:text-white/80 transition-colors duration-200">
          HelloStranger
        </span>
      </div>

      {/* ── RIGHT SIDE ── */}
      <div className="flex items-center gap-2 sm:gap-3">
        {!user ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="
                px-4 py-2 rounded-xl
                text-[13px] font-semibold text-white/70 hover:text-white
                border border-white/10 hover:bg-white/8
                active:scale-95 transition-all duration-150 tracking-wide
              "
            >
              Login
            </button>
            <button
              onClick={() => navigate("/join")}
              className="
                px-4 py-2 rounded-xl
                text-[13px] font-semibold text-white
                bg-indigo-600 hover:bg-indigo-500
                active:scale-95 transition-all duration-150 tracking-wide
                shadow-[0_0_20px_rgba(99,102,241,0.3)]
                hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]
              "
            >
              Join Now
            </button>
          </>
        ) : (
          <>
            {/* WS status + username */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8">
              {wsConnected ? (
                <Wifi size={12} className="text-emerald-400 flex-shrink-0" />
              ) : (
                <WifiOff size={12} className="text-white/25 flex-shrink-0" />
              )}
              <span className="text-[12px] text-white/50 font-medium tracking-wide truncate max-w-[100px]">
                {user.username}
              </span>
            </div>

            {/* Mobile — just the dot indicator */}
            <div className="flex sm:hidden items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${wsConnected ? "bg-emerald-400" : "bg-white/20"}`} />
              <span className="text-[12px] text-white/50 font-medium">{user.username}</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogOut}
              className="
                flex items-center gap-1.5
                px-3 py-2 rounded-xl
                text-[13px] font-semibold
                text-white/60 hover:text-white
                border border-white/10 hover:bg-white/8
                active:scale-95 transition-all duration-150
              "
            >
              <LogOut size={14} />
              <span className="hidden sm:block tracking-wide">Logout</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;