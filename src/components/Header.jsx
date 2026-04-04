// // // import React, { useContext } from 'react'

// // // import {useNavigate} from 'react-router-dom'
// // // import { useAuth } from '../hooks/useAuth';
// // // import { websocketContext } from '../context/WebSocket';

// // // function Header() {
// // //   const navigate = useNavigate();

// // //   const { user, loading, logout } = useAuth();

// // //   const { wsConnected } =
// // //     useContext(websocketContext);

// // //     const handleLogOut =() => {
// // //       logout();
// // //       navigate("/");
// // //     }

// // //   if (loading) return null; // or spinner
// // //   return (
// // //     <header
// // //       className="
// // //   flex text-white justify-between items-center
// // //   px-6 md:px-10 py-5 md:py-6
// // // bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]

// // // "
// // //     >
// // //       <h1 className="text-xl md:text-2xl font-bold tracking-wide">
// // //         <span
// // //           className="cursor-pointer"
// // //           onClick={() => {
// // //             localStorage.setItem("activeTab", "home");
// // //             window.location.href = "/";

// // //             //  navigate("/")
// // //           }}
// // //         >
// // //           HelloStranger
// // //         </span>
// // //       </h1>

// // //       <div className="flex gap-3 md:gap-4">
// // //         {!user ? (
// // //           <div className="flex gap-3">
// // //             {" "}
// // //             <button
// // //               className="px-3 md:px-4 py-2 rounded-md border border-white/30 hover:bg-white/10 transition text-sm md:text-base"
// // //               onClick={() => navigate("/login")}
// // //             >
// // //               Login
// // //             </button>
// // //             <button
// // //               className="px-3 md:px-4 py-2 rounded-md  text-base
// // //               md:text-lg
// // //               font-semibold
// // //               text-white
// // //               bg-gradient-to-r from-purple-700 to-indigo-800
// // //               hover:scale-105
// // //               transition-all
// // //               duration-300
// // //               shadow-xl
// // //               text-sm
// // //                md:text-base"
// // //               onClick={() => navigate("/join")}
// // //             >
// // //               Join Now
// // //             </button>
// // //           </div>
// // //         ) : (

// // //           <>
// // //             <p>{wsConnected ? "Connected" : "Disconnected"} {user.username}</p>
// // //           <button
// // //             onClick={handleLogOut}
// // //             className="
// // //     px-3 md:px-4 py-2 rounded-md
// // //     text-sm md:text-base font-semibold
// // //     text-white
// // //     bg-gradient-to-r from-purple-700 to-indigo-800
// // //     hover:scale-105
// // //     transition-all duration-300
// // //     shadow-xl
// // //   "
// // //           >
// // //             Logout
// // //           </button>
// // //           </>
// // //         )}
// // //       </div>
// // //     </header>
// // //   );
// // // }

// // // export default Header

// // // import React, { useContext } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { useAuth } from "../hooks/useAuth";
// // // import { websocketContext } from "../context/WebSocket";
// // // import { LogOut, Wifi, WifiOff } from "lucide-react";

// // // function Header() {
// // //   const navigate = useNavigate();
// // //   const { user, loading, logout } = useAuth();
// // //   const { wsConnected } = useContext(websocketContext);

// // //   const handleLogOut = () => {
// // //     logout();
// // //     navigate("/");
// // //   };

// // //   if (loading) return null;

// // //   return (
// // //     <header className="
// // //       sticky top-0 z-[998]
// // //       w-full
// // //       flex items-center justify-between
// // //       px-4 sm:px-6 md:px-10
// // //       py-3 md:py-4
// // //       bg-black/80 backdrop-blur-xl
// // //       border-b border-white/10
// // //     ">

// // //       {/* ── LOGO ── */}
// // //       <div
// // //         onClick={() => { window.location.href = "/"; }}
// // //         className="flex items-center gap-2 cursor-pointer group"
// // //       >
// // //         <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
// // //           <span className="text-white text-[11px] font-black tracking-tight">HS</span>
// // //         </div>
// // //         <span className="text-[15px] font-bold text-white tracking-tight hidden sm:block group-hover:text-white/80 transition-colors duration-200">
// // //           HelloStranger
// // //         </span>
// // //       </div>

// // //       {/* ── RIGHT SIDE ── */}
// // //       <div className="flex items-center gap-2 sm:gap-3">
// // //         {!user ? (
// // //           <>
// // //             <button
// // //               onClick={() => navigate("/login")}
// // //               className="
// // //                 px-4 py-2 rounded-xl
// // //                 text-[13px] font-semibold text-white/70 hover:text-white
// // //                 border border-white/10 hover:bg-white/8
// // //                 active:scale-95 transition-all duration-150 tracking-wide
// // //               "
// // //             >
// // //               Login
// // //             </button>
// // //             <button
// // //               onClick={() => navigate("/join")}
// // //               className="
// // //                 px-4 py-2 rounded-xl
// // //                 text-[13px] font-semibold text-white
// // //                 bg-indigo-600 hover:bg-indigo-500
// // //                 active:scale-95 transition-all duration-150 tracking-wide
// // //                 shadow-[0_0_20px_rgba(99,102,241,0.3)]
// // //                 hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]
// // //               "
// // //             >
// // //               Join Now
// // //             </button>
// // //           </>
// // //         ) : (
// // //           <>
// // //             {/* WS status + username */}
// // //             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8">
// // //               {wsConnected ? (
// // //                 <Wifi size={12} className="text-emerald-400 flex-shrink-0" />
// // //               ) : (
// // //                 <WifiOff size={12} className="text-white/25 flex-shrink-0" />
// // //               )}
// // //               <span className="text-[12px] text-white/50 font-medium tracking-wide truncate max-w-[100px]">
// // //                 {user.username}
// // //               </span>
// // //             </div>

// // //             {/* Mobile — just the dot indicator */}
// // //             <div className="flex sm:hidden items-center gap-1.5">
// // //               <div className={`w-1.5 h-1.5 rounded-full ${wsConnected ? "bg-emerald-400" : "bg-white/20"}`} />
// // //               <span className="text-[12px] text-white/50 font-medium">{user.username}</span>
// // //             </div>

// // //             {/* Logout */}
// // //             <button
// // //               onClick={handleLogOut}
// // //               className="
// // //                 flex items-center gap-1.5
// // //                 px-3 py-2 rounded-xl
// // //                 text-[13px] font-semibold
// // //                 text-white/60 hover:text-white
// // //                 border border-white/10 hover:bg-white/8
// // //                 active:scale-95 transition-all duration-150
// // //               "
// // //             >
// // //               <LogOut size={14} />
// // //               <span className="hidden sm:block tracking-wide">Logout</span>
// // //             </button>
// // //           </>
// // //         )}
// // //       </div>
// // //     </header>
// // //   );
// // // }

// // // export default Header;

// // // import React, { useContext } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { useAuth } from "../hooks/useAuth";
// // // import { websocketContext } from "../context/WebSocket";
// // // import { LogOut, Wifi, WifiOff } from "lucide-react";

// // // function Header() {
// // //   const navigate = useNavigate();
// // //   const { user, loading, logout } = useAuth();
// // //   const { wsConnected } = useContext(websocketContext);

// // //   const handleLogOut = () => {
// // //     logout();
// // //     navigate("/");
// // //   };

// // //   if (loading) return null;

// // //   return (
// // //     <header
// // //       className="
// // //       sticky top-0 z-[998]
// // //       w-full
// // //       flex items-center justify-between
// // //       px-4 sm:px-6 md:px-10
// // //       py-3 md:py-4
// // //       bg-black/80 backdrop-blur-xl
// // //       border-b border-white/10
// // //     "
// // //     >
// // //       {/* ── LOGO ── */}
// // //       <div
// // //         onClick={() => {
// // //           window.location.href = "/";
// // //         }}
// // //         className="flex items-center gap-2 cursor-pointer group"
// // //       >
// // //         <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
// // //           {/* ✅ font-size kept at 11px here — this is a logo span, not an input, so no zoom risk */}
// // //           <span className="text-white text-[11px] font-black tracking-tight">
// // //             HS
// // //           </span>
// // //         </div>
// // //         <span className="text-[15px] font-bold text-white tracking-tight hidden sm:block group-hover:text-white/80 transition-colors duration-200">
// // //           HelloStranger
// // //         </span>
// // //       </div>

// // //       {/* ── RIGHT SIDE ── */}
// // //       <div className="flex items-center gap-2 sm:gap-3">
// // //         {!user ? (
// // //           <>
// // //             <button
// // //               onClick={() => navigate("/login")}
// // //               className="
// // //                 px-4 py-2 rounded-xl
// // //                 text-[16px] font-semibold text-white/70 hover:text-white
// // //                 border border-white/10 hover:bg-white/8
// // //                 active:scale-95 transition-all duration-150 tracking-wide
// // //               "
// // //               // ✅ Changed from text-[13px] to text-[16px]
// // //               // Buttons are not inputs, but 13px can still feel tiny on mobile tap targets
// // //               // 16px also makes it look cleaner on mobile
// // //             >
// // //               Login
// // //             </button>
// // //             <button
// // //               onClick={() => navigate("/join")}
// // //               className="
// // //                 px-4 py-2 rounded-xl
// // //                 text-[16px] font-semibold text-white
// // //                 bg-indigo-600 hover:bg-indigo-500
// // //                 active:scale-95 transition-all duration-150 tracking-wide
// // //                 shadow-[0_0_20px_rgba(99,102,241,0.3)]
// // //                 hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]
// // //               "
// // //               // ✅ Same — 13px → 16px
// // //             >
// // //               Join Now
// // //             </button>
// // //           </>
// // //         ) : (
// // //           <>
// // //             {/* WS status + username */}
// // //             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8">
// // //               {wsConnected ? (
// // //                 <Wifi size={12} className="text-emerald-400 flex-shrink-0" />
// // //               ) : (
// // //                 <WifiOff size={12} className="text-white/25 flex-shrink-0" />
// // //               )}
// // //               <span className="text-[12px] text-white/50 font-medium tracking-wide truncate max-w-[100px]">
// // //                 {/* ✅ This is display text, not an input — 12px here is fine, no zoom risk */}
// // //                 {user.username}
// // //               </span>
// // //             </div>

// // //             {/* Mobile — just the dot indicator */}
// // //             <div className="flex sm:hidden items-center gap-1.5">
// // //               <div
// // //                 className={`w-1.5 h-1.5 rounded-full ${wsConnected ? "bg-emerald-400" : "bg-white/20"}`}
// // //               />
// // //               <span className="text-[12px] text-white/50 font-medium">
// // //                 {user.username}
// // //               </span>
// // //             </div>

// // //             {/* Logout */}
// // //             <button
// // //               onClick={handleLogOut}
// // //               className="
// // //                 flex items-center gap-1.5
// // //                 px-3 py-2 rounded-xl
// // //                 text-[16px] font-semibold
// // //                 text-white/60 hover:text-white
// // //                 border border-white/10 hover:bg-white/8
// // //                 active:scale-95 transition-all duration-150
// // //               "
// // //               // ✅ 13px → 16px
// // //             >
// // //               <LogOut size={14} />
// // //               <span className="hidden sm:block tracking-wide">Logout</span>
// // //             </button>
// // //           </>
// // //         )}
// // //       </div>
// // //     </header>
// // //   );
// // // }

// // // export default Header;

// // // import React, { useContext, useState, useRef, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { useAuth } from "../hooks/useAuth";
// // // import { websocketContext } from "../context/WebSocket";
// // // import {
// // //   LogOut,
// // //   Wifi,
// // //   WifiOff,
// // //   Bell,
// // //   ChevronDown,
// // //   Settings,
// // //   User,
// // // } from "lucide-react";

// // // function Header({ notificationCount = 0 }) {
// // //   const navigate = useNavigate();
// // //   const { user, loading, logout } = useAuth();
// // //   const { wsConnected } = useContext(websocketContext);
// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const menuRef = useRef(null);

// // //   const handleLogOut = () => {
// // //     logout();
// // //     navigate("/");
// // //   };

// // //   // Close dropdown when clicking outside
// // //   useEffect(() => {
// // //     function handleClickOutside(e) {
// // //       if (menuRef.current && !menuRef.current.contains(e.target)) {
// // //         setMenuOpen(false);
// // //       }
// // //     }
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   if (loading) return null;

// // //   return (
// // //     <header
// // //       className="
// // //       sticky top-0 z-[998]
// // //       w-full
// // //       flex items-center justify-between
// // //       px-4 sm:px-6 md:px-10
// // //       py-3 md:py-4
// // //       bg-black/80 backdrop-blur-xl
// // //       border-b border-white/10
// // //     "
// // //     >
// // //       {/* ── LOGO ── */}
// // //       <div
// // //         onClick={() => {
// // //           window.location.href = "/";
// // //         }}
// // //         className="flex items-center gap-2 cursor-pointer group"
// // //       >
// // //         <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
// // //           <span className="text-white text-[11px] font-black tracking-tight">
// // //             HS
// // //           </span>
// // //         </div>
// // //         <span className="text-[15px] font-bold text-white tracking-tight hidden sm:block group-hover:text-white/80 transition-colors duration-200">
// // //           HelloStranger
// // //         </span>
// // //       </div>

// // //       {/* ── RIGHT SIDE ── */}
// // //       <div className="flex items-center gap-2 sm:gap-3">
// // //         {!user ? (
// // //           <>
// // //             <button
// // //               onClick={() => navigate("/login")}
// // //               className="
// // //                 px-4 py-2 rounded-xl
// // //                 text-[16px] font-semibold text-white/70 hover:text-white
// // //                 border border-white/10 hover:bg-white/8
// // //                 active:scale-95 transition-all duration-150 tracking-wide
// // //               "
// // //             >
// // //               Login
// // //             </button>
// // //             <button
// // //               onClick={() => navigate("/join")}
// // //               className="
// // //                 px-4 py-2 rounded-xl
// // //                 text-[16px] font-semibold text-white
// // //                 bg-indigo-600 hover:bg-indigo-500
// // //                 active:scale-95 transition-all duration-150 tracking-wide
// // //                 shadow-[0_0_20px_rgba(99,102,241,0.3)]
// // //                 hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]
// // //               "
// // //             >
// // //               Join Now
// // //             </button>
// // //           </>
// // //         ) : (
// // //           <>
// // //             {/* ── WS status chip — desktop only ── */}
// // //             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8">
// // //               {wsConnected ? (
// // //                 <Wifi size={12} className="text-emerald-400 flex-shrink-0" />
// // //               ) : (
// // //                 <WifiOff size={12} className="text-white/25 flex-shrink-0" />
// // //               )}
// // //               <span className="text-[12px] text-white/50 font-medium tracking-wide truncate max-w-[100px]">
// // //                 {user.username}
// // //               </span>
// // //             </div>

// // //             {/* ── Mobile WS dot ── */}
// // //             <div className="flex sm:hidden items-center gap-1.5">
// // //               <div
// // //                 className={`w-1.5 h-1.5 rounded-full ${wsConnected ? "bg-emerald-400" : "bg-white/20"}`}
// // //               />
// // //               <span className="text-[12px] text-white/50 font-medium">
// // //                 {user.username}
// // //               </span>
// // //             </div>

// // //             {/* ── Bell icon (all screen sizes) ── */}
// // //             <button
// // //               onClick={() => navigate("/notifications")}
// // //               className="
// // //                 relative
// // //                 flex items-center justify-center
// // //                 w-9 h-9 rounded-xl
// // //                 text-white/60 hover:text-white
// // //                 border border-white/10 hover:bg-white/8
// // //                 active:scale-95 transition-all duration-150
// // //               "
// // //               aria-label="Notifications"
// // //             >
// // //               <Bell size={16} />
// // //               {notificationCount > 0 && (
// // //                 <span
// // //                   className="
// // //                   absolute -top-1 -right-1
// // //                   min-w-[16px] h-4 px-0.5
// // //                   flex items-center justify-center
// // //                   bg-red-500 text-white
// // //                   text-[9px] font-bold
// // //                   rounded-full
// // //                   border-2 border-black
// // //                   leading-none
// // //                 "
// // //                 >
// // //                   {notificationCount > 99 ? "99+" : notificationCount}
// // //                 </span>
// // //               )}
// // //             </button>

// // //             {/* ── User menu (desktop) / plain logout (mobile) ── */}

// // //             {/* Desktop: avatar + dropdown */}
// // //             <div className="relative hidden sm:block" ref={menuRef}>
// // //               <button
// // //                 onClick={() => setMenuOpen((v) => !v)}
// // //                 className="
// // //                   flex items-center gap-2
// // //                   px-3 py-2 rounded-xl
// // //                   text-white/70 hover:text-white
// // //                   border border-white/10 hover:bg-white/8
// // //                   active:scale-95 transition-all duration-150
// // //                 "
// // //               >
// // //                 {/* Mini avatar circle */}
// // //                 <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
// // //                   <span className="text-white text-[8px] font-bold uppercase">
// // //                     {user.username?.[0] ?? "U"}
// // //                   </span>
// // //                 </div>
// // //                 <ChevronDown
// // //                   size={13}
// // //                   className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
// // //                 />
// // //               </button>

// // //               {/* Dropdown */}
// // //               {menuOpen && (
// // //                 <div
// // //                   className="
// // //                   absolute right-0 top-[calc(100%+8px)]
// // //                   w-44
// // //                   bg-[#141414] border border-white/10
// // //                   rounded-2xl overflow-hidden
// // //                   shadow-[0_8px_32px_rgba(0,0,0,0.6)]
// // //                   z-[999]
// // //                   animate-in fade-in slide-in-from-top-2 duration-150
// // //                 "
// // //                 >
// // //                   <button
// // //                     onClick={() => {
// // //                       setMenuOpen(false);
// // //                       navigate("/profile");
// // //                     }}
// // //                     className="
// // //                       w-full flex items-center gap-2.5
// // //                       px-4 py-3
// // //                       text-[13px] text-white/70 hover:text-white
// // //                       hover:bg-white/[0.06]
// // //                       transition-colors duration-100
// // //                       border-b border-white/[0.06]
// // //                     "
// // //                   >
// // //                     <User size={13} className="flex-shrink-0" />
// // //                     Profile
// // //                   </button>
// // //                   <button
// // //                     onClick={() => {
// // //                       setMenuOpen(false);
// // //                       navigate("/settings");
// // //                     }}
// // //                     className="
// // //                       w-full flex items-center gap-2.5
// // //                       px-4 py-3
// // //                       text-[13px] text-white/70 hover:text-white
// // //                       hover:bg-white/[0.06]
// // //                       transition-colors duration-100
// // //                       border-b border-white/[0.06]
// // //                     "
// // //                   >
// // //                     <Settings size={13} className="flex-shrink-0" />
// // //                     Settings
// // //                   </button>
// // //                   <button
// // //                     onClick={() => {
// // //                       setMenuOpen(false);
// // //                       handleLogOut();
// // //                     }}
// // //                     className="
// // //                       w-full flex items-center gap-2.5
// // //                       px-4 py-3
// // //                       text-[13px] text-red-400 hover:text-red-300
// // //                       hover:bg-red-500/[0.08]
// // //                       transition-colors duration-100
// // //                     "
// // //                   >
// // //                     <LogOut size={13} className="flex-shrink-0" />
// // //                     Log out
// // //                   </button>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Mobile: plain logout icon button */}
// // //             <button
// // //               onClick={handleLogOut}
// // //               className="
// // //                 flex sm:hidden items-center justify-center
// // //                 w-9 h-9 rounded-xl
// // //                 text-white/50 hover:text-white
// // //                 border border-white/10 hover:bg-white/8
// // //                 active:scale-95 transition-all duration-150
// // //               "
// // //               aria-label="Log out"
// // //             >
// // //               <LogOut size={15} />
// // //             </button>
// // //           </>
// // //         )}
// // //       </div>
// // //     </header>
// // //   );
// // // }

// // // export default Header;

// // import React, {
// //   useContext,
// //   useState,
// //   useRef,
// //   useEffect,
// //   useCallback,
// // } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { useAuth } from "../hooks/useAuth";
// // import { websocketContext } from "../context/WebSocket";
// // import {
// //   LogOut,
// //   Wifi,
// //   WifiOff,
// //   Bell,
// //   ChevronDown,
// //   Settings,
// //   User,
// // } from "lucide-react";
// // import fetchData from "../utils/fetchData";

// // function Header() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { user, loading, logout } = useAuth();
// //   const { wsConnected } = useContext(websocketContext);
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [unreadCount, setUnreadCount] = useState(0);
// //   const menuRef = useRef(null);

// //   const handleLogOut = () => {
// //     logout();
// //     navigate("/");
// //   };

// //   // ── Fetch unread notification count ───────────────────────
// //   const fetchUnreadCount = useCallback(async () => {
// //     if (!user) return;
// //     try {
// //       const res = await fetchData("/api/notifications/unread-count", {
// //         credentials: "include",
// //       });
// //       const data = await res.json();
// //       setUnreadCount(data.count ?? 0);
// //     } catch {
// //       // silently fail — badge just won't show
// //     }
// //   }, [user]);

// //   // Fetch on mount and whenever the route changes
// //   useEffect(() => {
// //     fetchUnreadCount();
// //   }, [fetchUnreadCount, location.pathname]);

// //   // Reset count to 0 when user navigates to /notifications
// //   useEffect(() => {
// //     if (location.pathname === "/notifications") {
// //       setUnreadCount(0);
// //     }
// //   }, [location.pathname]);

// //   // Close dropdown when clicking outside
// //   useEffect(() => {
// //     function handleClickOutside(e) {
// //       if (menuRef.current && !menuRef.current.contains(e.target)) {
// //         setMenuOpen(false);
// //       }
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   if (loading) return null;

// //   return (
// //     <header
// //       className="
// //       sticky top-0 z-[998]
// //       w-full
// //       flex items-center justify-between
// //       px-4 sm:px-6 md:px-10
// //       py-3 md:py-4
// //       bg-black/80 backdrop-blur-xl
// //       border-b border-white/10
// //     "
// //     >
// //       {/* ── LOGO ── */}
// //       <div
// //         onClick={() => {
// //           window.location.href = "/";
// //         }}
// //         className="flex items-center gap-2 cursor-pointer group"
// //       >
// //         <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
// //           <span className="text-white text-[11px] font-black tracking-tight">
// //             HS
// //           </span>
// //         </div>
// //         <span className="text-[15px] font-bold text-white tracking-tight hidden sm:block group-hover:text-white/80 transition-colors duration-200">
// //           HelloStranger
// //         </span>
// //       </div>

// //       {/* ── RIGHT SIDE ── */}
// //       <div className="flex items-center gap-2 sm:gap-3">
// //         {!user ? (
// //           <>
// //             <button
// //               onClick={() => navigate("/login")}
// //               className="px-4 py-2 rounded-xl text-[16px] font-semibold text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150 tracking-wide"
// //             >
// //               Login
// //             </button>
// //             <button
// //               onClick={() => navigate("/join")}
// //               className="px-4 py-2 rounded-xl text-[16px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 tracking-wide shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]"
// //             >
// //               Join Now
// //             </button>
// //           </>
// //         ) : (
// //           <>
// //             {/* ── WS status chip — desktop only ── */}
// //             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8">
// //               {wsConnected ? (
// //                 <Wifi size={12} className="text-emerald-400 flex-shrink-0" />
// //               ) : (
// //                 <WifiOff size={12} className="text-white/25 flex-shrink-0" />
// //               )}
// //               <span className="text-[12px] text-white/50 font-medium tracking-wide truncate max-w-[100px]">
// //                 {user.username}
// //               </span>
// //             </div>

// //             {/* ── Mobile WS dot ── */}
// //             <div className="flex sm:hidden items-center gap-1.5">
// //               <div
// //                 className={`w-1.5 h-1.5 rounded-full ${wsConnected ? "bg-emerald-400" : "bg-white/20"}`}
// //               />
// //               <span className="text-[12px] text-white/50 font-medium">
// //                 {user.username}
// //               </span>
// //             </div>

// //             {/* ── Bell ── */}
// //             <button
// //               onClick={() => navigate("/notifications")}
// //               className="relative flex items-center justify-center w-9 h-9 rounded-xl text-white/60 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
// //               aria-label="Notifications"
// //             >
// //               <Bell size={16} />
// //               {unreadCount > 0 && (
// //                 <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full border-2 border-black leading-none">
// //                   {unreadCount > 99 ? "99+" : unreadCount}
// //                 </span>
// //               )}
// //             </button>

// //             {/* ── Desktop dropdown ── */}
// //             <div className="relative hidden sm:block" ref={menuRef}>
// //               <button
// //                 onClick={() => setMenuOpen((v) => !v)}
// //                 className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
// //               >
// //                 <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
// //                   <span className="text-white text-[8px] font-bold uppercase">
// //                     {user.username?.[0] ?? "U"}
// //                   </span>
// //                 </div>
// //                 <ChevronDown
// //                   size={13}
// //                   className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
// //                 />
// //               </button>

// //               {menuOpen && (
// //                 <div className="absolute right-0 top-[calc(100%+8px)] w-44 bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-[999] animate-in fade-in slide-in-from-top-2 duration-150">
// //                   <button
// //                     onClick={() => {
// //                       setMenuOpen(false);
// //                       navigate("/profile");
// //                     }}
// //                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
// //                   >
// //                     <User size={13} className="flex-shrink-0" />
// //                     Profile
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       setMenuOpen(false);
// //                       navigate("/settings");
// //                     }}
// //                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
// //                   >
// //                     <Settings size={13} className="flex-shrink-0" />
// //                     Settings
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       setMenuOpen(false);
// //                       handleLogOut();
// //                     }}
// //                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] transition-colors duration-100"
// //                   >
// //                     <LogOut size={13} className="flex-shrink-0" />
// //                     Log out
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             {/* ── Mobile logout ── */}
// //             <button
// //               onClick={handleLogOut}
// //               className="flex sm:hidden items-center justify-center w-9 h-9 rounded-xl text-white/50 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
// //               aria-label="Log out"
// //             >
// //               <LogOut size={15} />
// //             </button>
// //           </>
// //         )}
// //       </div>
// //     </header>
// //   );
// // }

// // export default Header;

// // import React, {
// //   useContext,
// //   useState,
// //   useRef,
// //   useEffect,
// //   useCallback,
// // } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { useAuth } from "../hooks/useAuth";
// // import { websocketContext } from "../context/WebSocket";
// // import {
// //   LogOut,
// //   Wifi,
// //   WifiOff,
// //   Bell,
// //   ChevronDown,
// //   Settings,
// //   User,
// // } from "lucide-react";
// // import fetchData from "../utils/fetchData";

// // function Header() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { user, loading, logout } = useAuth();
// //   const { wsConnected } = useContext(websocketContext);
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [unreadCount, setUnreadCount] = useState(0);
// //   const menuRef = useRef(null);
// //   const mobileMenuRef = useRef(null);

// //   const handleLogOut = () => {
// //     logout();
// //     navigate("/");
// //   };

// //   // ── Fetch unread notification count ───────────────────────
// //   const fetchUnreadCount = useCallback(async () => {
// //     if (!user) return;
// //     try {
// //       const res = await fetchData("/api/notifications/unread-count", {
// //         credentials: "include",
// //       });
// //       const data = await res.json();
// //       setUnreadCount(data.count ?? 0);
// //     } catch {
// //       // silently fail — badge just won't show
// //     }
// //   }, [user]);

// //   // Fetch on mount and whenever the route changes
// //   useEffect(() => {
// //     fetchUnreadCount();
// //   }, [fetchUnreadCount, location.pathname]);

// //   // When user navigates TO /notifications, mark all as read on the server
// //   // and clear the badge — rather than just zeroing it locally on navigation.
// //   useEffect(() => {
// //     if (location.pathname !== "/notifications" || unreadCount === 0) return;
// //     setUnreadCount(0);
// //     fetchData("/api/notifications/read-all", {
// //       method: "POST",
// //       credentials: "include",
// //     }).catch(() => {});
// //   }, [location.pathname]); // intentionally only pathname — we want this once per visit

// //   // Close dropdowns when clicking outside
// //   useEffect(() => {
// //     function handleClickOutside(e) {
// //       if (menuRef.current && !menuRef.current.contains(e.target)) {
// //         setMenuOpen(false);
// //       }
// //       if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
// //         setMobileMenuOpen(false);
// //       }
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   if (loading) return null;

// //   return (
// //     <header
// //       className="
// //       sticky top-0 z-[998]
// //       w-full
// //       flex items-center justify-between
// //       px-4 sm:px-6 md:px-10
// //       py-3 md:py-4
// //       bg-black/80 backdrop-blur-xl
// //       border-b border-white/10
// //     "
// //     >
// //       {/* ── LOGO ── */}
// //       <div
// //         onClick={() => {
// //           window.location.href = "/";
// //         }}
// //         className="flex items-center gap-2 cursor-pointer group"
// //       >
// //         <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
// //           <span className="text-white text-[11px] font-black tracking-tight">
// //             HS
// //           </span>
// //         </div>
// //         <span className="text-[15px] font-bold text-white tracking-tight hidden sm:block group-hover:text-white/80 transition-colors duration-200">
// //           HelloStranger
// //         </span>
// //       </div>

// //       {/* ── RIGHT SIDE ── */}
// //       <div className="flex items-center gap-2 sm:gap-3">
// //         {!user ? (
// //           <>
// //             <button
// //               onClick={() => navigate("/login")}
// //               className="px-4 py-2 rounded-xl text-[16px] font-semibold text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150 tracking-wide"
// //             >
// //               Login
// //             </button>
// //             <button
// //               onClick={() => navigate("/join")}
// //               className="px-4 py-2 rounded-xl text-[16px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 tracking-wide shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]"
// //             >
// //               Join Now
// //             </button>
// //           </>
// //         ) : (
// //           <>
// //             {/* ── WS status chip — desktop only ── */}
// //             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8">
// //               {wsConnected ? (
// //                 <Wifi size={12} className="text-emerald-400 flex-shrink-0" />
// //               ) : (
// //                 <WifiOff size={12} className="text-white/25 flex-shrink-0" />
// //               )}
// //               <span className="text-[12px] text-white/50 font-medium tracking-wide truncate max-w-[100px]">
// //                 {user.username}
// //               </span>
// //             </div>

// //             {/* ── Mobile username dot ── */}
// //             <div className="flex sm:hidden items-center gap-1.5">
// //               <div
// //                 className={`w-1.5 h-1.5 rounded-full ${wsConnected ? "bg-emerald-400" : "bg-white/20"}`}
// //               />
// //               <span className="text-[12px] text-white/50 font-medium">
// //                 {user.username}
// //               </span>
// //             </div>

// //             {/* ── Bell ── */}
// //             <button
// //               onClick={() => navigate("/notifications")}
// //               className="relative flex items-center justify-center w-9 h-9 rounded-xl text-white/60 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
// //               aria-label="Notifications"
// //             >
// //               <Bell size={16} />
// //               {unreadCount > 0 && (
// //                 <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full border-2 border-black leading-none">
// //                   {unreadCount > 99 ? "99+" : unreadCount}
// //                 </span>
// //               )}
// //             </button>

// //             {/* ── Desktop dropdown ── */}
// //             <div className="relative hidden sm:block" ref={menuRef}>
// //               <button
// //                 onClick={() => setMenuOpen((v) => !v)}
// //                 className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
// //               >
// //                 <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
// //                   <span className="text-white text-[8px] font-bold uppercase">
// //                     {user.username?.[0] ?? "U"}
// //                   </span>
// //                 </div>
// //                 <ChevronDown
// //                   size={13}
// //                   className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
// //                 />
// //               </button>

// //               {menuOpen && (
// //                 <div className="absolute right-0 top-[calc(100%+8px)] w-44 bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-[999] animate-in fade-in slide-in-from-top-2 duration-150">
// //                   <button
// //                     onClick={() => {
// //                       setMenuOpen(false);
// //                       navigate("/profile");
// //                     }}
// //                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
// //                   >
// //                     <User size={13} className="flex-shrink-0" />
// //                     Profile
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       setMenuOpen(false);
// //                       navigate("/settings");
// //                     }}
// //                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
// //                   >
// //                     <Settings size={13} className="flex-shrink-0" />
// //                     Settings
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       setMenuOpen(false);
// //                       handleLogOut();
// //                     }}
// //                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] transition-colors duration-100"
// //                   >
// //                     <LogOut size={13} className="flex-shrink-0" />
// //                     Log out
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             {/* ── Mobile dropdown (replaces bare logout button) ── */}
// //             <div className="relative flex sm:hidden" ref={mobileMenuRef}>
// //               <button
// //                 onClick={() => setMobileMenuOpen((v) => !v)}
// //                 className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
// //                 aria-label="Menu"
// //               >
// //                 <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
// //                   <span className="text-white text-[8px] font-bold uppercase">
// //                     {user.username?.[0] ?? "U"}
// //                   </span>
// //                 </div>
// //                 <ChevronDown
// //                   size={13}
// //                   className={`transition-transform duration-200 ${mobileMenuOpen ? "rotate-180" : ""}`}
// //                 />
// //               </button>

// //               {mobileMenuOpen && (
// //                 <div className="absolute right-0 top-[calc(100%+8px)] w-44 bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-[999] animate-in fade-in slide-in-from-top-2 duration-150">
// //                   <button
// //                     onClick={() => {
// //                       setMobileMenuOpen(false);
// //                       navigate("/profile");
// //                     }}
// //                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
// //                   >
// //                     <User size={13} className="flex-shrink-0" />
// //                     Profile
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       setMobileMenuOpen(false);
// //                       navigate("/settings");
// //                     }}
// //                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
// //                   >
// //                     <Settings size={13} className="flex-shrink-0" />
// //                     Settings
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       setMobileMenuOpen(false);
// //                       handleLogOut();
// //                     }}
// //                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] transition-colors duration-100"
// //                   >
// //                     <LogOut size={13} className="flex-shrink-0" />
// //                     Log out
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </header>
// //   );
// // }

// // export default Header;

// import React, {
//   useContext,
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
// } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { websocketContext } from "../context/WebSocket";
// import {
//   LogOut,
//   Wifi,
//   WifiOff,
//   Bell,
//   ChevronDown,
//   Settings,
//   User,
// } from "lucide-react";
// import fetchData from "../utils/fetchData";

// function Header() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, loading, logout } = useAuth();
//   const { wsConnected } = useContext(websocketContext);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const menuRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   const handleLogOut = () => {
//     logout();
//     navigate("/");
//   };

//   // ── Fetch unread notification count ───────────────────────
//   const fetchUnreadCount = useCallback(async () => {
//     if (!user) return;
//     try {
//       const res = await fetchData("/api/notifications/unread-count", {
//         credentials: "include",
//       });
//       const data = await res.json();
//       setUnreadCount(data.count ?? 0);
//     } catch {
//       // silently fail — badge just won't show
//     }
//   }, [user]);

//   // Fetch on mount and whenever the route changes
//   useEffect(() => {
//     fetchUnreadCount();
//   }, [fetchUnreadCount, location.pathname]);

//   // When user navigates TO /notifications, instantly clear the badge.
//   // The actual read-all API call is handled by NotificationsPage.
//   useEffect(() => {
//     if (location.pathname === "/notifications") setUnreadCount(0);
//   }, [location.pathname]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setMenuOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
//         setMobileMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   if (loading) return null;

//   return (
//     <header
//       className="
//       sticky top-0 z-[998]
//       w-full
//       flex items-center justify-between
//       px-4 sm:px-6 md:px-10
//       py-3 md:py-4
//       bg-black/80 backdrop-blur-xl
//       border-b border-white/10
//     "
//     >
//       {/* ── LOGO ── */}
//       <div
//         onClick={() => {
//           window.location.href = "/";
//         }}
//         className="flex items-center gap-2 cursor-pointer group"
//       >
//         <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
//           <span className="text-white text-[11px] font-black tracking-tight">
//             HS
//           </span>
//         </div>
//         <span className="text-[15px] font-bold text-white tracking-tight hidden sm:block group-hover:text-white/80 transition-colors duration-200">
//           HelloStranger
//         </span>
//       </div>

//       {/* ── RIGHT SIDE ── */}
//       <div className="flex items-center gap-2 sm:gap-3">
//         {!user ? (
//           <>
//             <button
//               onClick={() => navigate("/login")}
//               className="px-4 py-2 rounded-xl text-[16px] font-semibold text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150 tracking-wide"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => navigate("/join")}
//               className="px-4 py-2 rounded-xl text-[16px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 tracking-wide shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]"
//             >
//               Join Now
//             </button>
//           </>
//         ) : (
//           <>
//             {/* ── WS status chip — desktop only ── */}
//             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8">
//               {wsConnected ? (
//                 <Wifi size={12} className="text-emerald-400 flex-shrink-0" />
//               ) : (
//                 <WifiOff size={12} className="text-white/25 flex-shrink-0" />
//               )}
//               <span className="text-[12px] text-white/50 font-medium tracking-wide truncate max-w-[100px]">
//                 {user.username}
//               </span>
//             </div>

//             {/* ── Mobile username dot ── */}
//             <div className="flex sm:hidden items-center gap-1.5">
//               <div
//                 className={`w-1.5 h-1.5 rounded-full ${wsConnected ? "bg-emerald-400" : "bg-white/20"}`}
//               />
//               <span className="text-[12px] text-white/50 font-medium">
//                 {user.username}
//               </span>
//             </div>

//             {/* ── Bell ── */}
//             <button
//               onClick={() => navigate("/notifications")}
//               className="relative flex items-center justify-center w-9 h-9 rounded-xl text-white/60 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
//               aria-label="Notifications"
//             >
//               <Bell size={16} />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full border-2 border-black leading-none">
//                   {unreadCount > 99 ? "99+" : unreadCount}
//                 </span>
//               )}
//             </button>

//             {/* ── Desktop dropdown ── */}
//             <div className="relative hidden sm:block" ref={menuRef}>
//               <button
//                 onClick={() => setMenuOpen((v) => !v)}
//                 className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
//               >
//                 <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
//                   <span className="text-white text-[8px] font-bold uppercase">
//                     {user.username?.[0] ?? "U"}
//                   </span>
//                 </div>
//                 <ChevronDown
//                   size={13}
//                   className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
//                 />
//               </button>

//               {menuOpen && (
//                 <div className="absolute right-0 top-[calc(100%+8px)] w-44 bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-[999] animate-in fade-in slide-in-from-top-2 duration-150">
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false);
//                       navigate("/profile");
//                     }}
//                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
//                   >
//                     <User size={13} className="flex-shrink-0" />
//                     Profile
//                   </button>
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false);
//                       navigate("/settings");
//                     }}
//                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
//                   >
//                     <Settings size={13} className="flex-shrink-0" />
//                     Settings
//                   </button>
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false);
//                       handleLogOut();
//                     }}
//                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] transition-colors duration-100"
//                   >
//                     <LogOut size={13} className="flex-shrink-0" />
//                     Log out
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* ── Mobile dropdown ── */}
//             <div className="relative flex sm:hidden" ref={mobileMenuRef}>
//               <button
//                 onClick={() => setMobileMenuOpen((v) => !v)}
//                 className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
//                 aria-label="Menu"
//               >
//                 <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
//                   <span className="text-white text-[8px] font-bold uppercase">
//                     {user.username?.[0] ?? "U"}
//                   </span>
//                 </div>
//                 <ChevronDown
//                   size={13}
//                   className={`transition-transform duration-200 ${mobileMenuOpen ? "rotate-180" : ""}`}
//                 />
//               </button>

//               {mobileMenuOpen && (
//                 <div className="absolute right-0 top-[calc(100%+8px)] w-44 bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-[999] animate-in fade-in slide-in-from-top-2 duration-150">
//                   <button
//                     onClick={() => {
//                       setMobileMenuOpen(false);
//                       navigate("/profile");
//                     }}
//                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
//                   >
//                     <User size={13} className="flex-shrink-0" />
//                     Profile
//                   </button>
//                   <button
//                     onClick={() => {
//                       setMobileMenuOpen(false);
//                       navigate("/settings");
//                     }}
//                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
//                   >
//                     <Settings size={13} className="flex-shrink-0" />
//                     Settings
//                   </button>
//                   <button
//                     onClick={() => {
//                       setMobileMenuOpen(false);
//                       handleLogOut();
//                     }}
//                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] transition-colors duration-100"
//                   >
//                     <LogOut size={13} className="flex-shrink-0" />
//                     Log out
//                   </button>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Header;

// import React, {
//   useContext,
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
// } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { websocketContext } from "../context/WebSocket";
// import {
//   LogOut,
//   Wifi,
//   WifiOff,
//   Bell,
//   ChevronDown,
//   Settings,
//   User,
// } from "lucide-react";
// import fetchData from "../utils/fetchData";

// function Header() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, loading, logout } = useAuth();
//   const { wsConnected } = useContext(websocketContext);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const menuRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   const handleLogOut = () => {
//     logout();
//     navigate("/");
//   };

//   // ── Fetch unread notification count ───────────────────────
//   const fetchUnreadCount = useCallback(async () => {
//     if (!user) return;
//     try {
//       const res = await fetchData("/api/notifications/unread-count", {
//         credentials: "include",
//       });
//       const data = await res.json();
//       setUnreadCount(data.count ?? 0);
//     } catch {
//       // silently fail — badge just won't show
//     }
//   }, [user]);

//   // Fetch on mount and whenever the route changes
//   useEffect(() => {
//     fetchUnreadCount();
//   }, [fetchUnreadCount, location.pathname]);

//   // Listen for NotificationsPage telling us all are read — zero the badge instantly
//   useEffect(() => {
//     const handler = () => setUnreadCount(0);
//     window.addEventListener("notifications:read-all", handler);
//     return () => window.removeEventListener("notifications:read-all", handler);
//   }, []);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setMenuOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
//         setMobileMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   if (loading) return null;

//   return (
//     <header
//       className="
//       sticky top-0 z-[998]
//       w-full
//       flex items-center justify-between
//       px-4 sm:px-6 md:px-10
//       py-3 md:py-4
//       bg-black/80 backdrop-blur-xl
//       border-b border-white/10
//     "
//     >
//       {/* ── LOGO ── */}
//       <div
//         onClick={() => {
//           window.location.href = "/";
//         }}
//         className="flex items-center gap-2 cursor-pointer group"
//       >
//         <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
//           <span className="text-white text-[11px] font-black tracking-tight">
//             HS
//           </span>
//         </div>
//         <span className="text-[15px] font-bold text-white tracking-tight hidden sm:block group-hover:text-white/80 transition-colors duration-200">
//           HelloStranger
//         </span>
//       </div>

//       {/* ── RIGHT SIDE ── */}
//       <div className="flex items-center gap-2 sm:gap-3">
//         {!user ? (
//           <>
//             <button
//               onClick={() => navigate("/login")}
//               className="px-4 py-2 rounded-xl text-[16px] font-semibold text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150 tracking-wide"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => navigate("/join")}
//               className="px-4 py-2 rounded-xl text-[16px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 tracking-wide shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]"
//             >
//               Join Now
//             </button>
//           </>
//         ) : (
//           <>
//             {/* ── WS status chip — desktop only ── */}
//             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8">
//               {wsConnected ? (
//                 <Wifi size={12} className="text-emerald-400 flex-shrink-0" />
//               ) : (
//                 <WifiOff size={12} className="text-white/25 flex-shrink-0" />
//               )}
//               <span className="text-[12px] text-white/50 font-medium tracking-wide truncate max-w-[100px]">
//                 {user.username}
//               </span>
//             </div>

//             {/* ── Mobile username dot ── */}
//             <div className="flex sm:hidden items-center gap-1.5">
//               <div
//                 className={`w-1.5 h-1.5 rounded-full ${wsConnected ? "bg-emerald-400" : "bg-white/20"}`}
//               />
//               <span className="text-[12px] text-white/50 font-medium">
//                 {user.username}
//               </span>
//             </div>

//             {/* ── Bell ── */}
//             <button
//               onClick={() => navigate("/notifications")}
//               className="relative flex items-center justify-center w-9 h-9 rounded-xl text-white/60 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
//               aria-label="Notifications"
//             >
//               <Bell size={16} />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full border-2 border-black leading-none">
//                   {unreadCount > 99 ? "99+" : unreadCount}
//                 </span>
//               )}
//             </button>

//             {/* ── Desktop dropdown ── */}
//             <div className="relative hidden sm:block" ref={menuRef}>
//               <button
//                 onClick={() => setMenuOpen((v) => !v)}
//                 className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
//               >
//                 <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
//                   <span className="text-white text-[8px] font-bold uppercase">
//                     {user.username?.[0] ?? "U"}
//                   </span>
//                 </div>
//                 <ChevronDown
//                   size={13}
//                   className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
//                 />
//               </button>

//               {menuOpen && (
//                 <div className="absolute right-0 top-[calc(100%+8px)] w-44 bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-[999] animate-in fade-in slide-in-from-top-2 duration-150">
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false);
//                       navigate("/profile");
//                     }}
//                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
//                   >
//                     <User size={13} className="flex-shrink-0" />
//                     Profile
//                   </button>
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false);
//                       navigate("/settings");
//                     }}
//                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
//                   >
//                     <Settings size={13} className="flex-shrink-0" />
//                     Settings
//                   </button>
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false);
//                       handleLogOut();
//                     }}
//                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] transition-colors duration-100"
//                   >
//                     <LogOut size={13} className="flex-shrink-0" />
//                     Log out
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* ── Mobile dropdown ── */}
//             <div className="relative flex sm:hidden" ref={mobileMenuRef}>
//               <button
//                 onClick={() => setMobileMenuOpen((v) => !v)}
//                 className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
//                 aria-label="Menu"
//               >
//                 <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
//                   <span className="text-white text-[8px] font-bold uppercase">
//                     {user.username?.[0] ?? "U"}
//                   </span>
//                 </div>
//                 <ChevronDown
//                   size={13}
//                   className={`transition-transform duration-200 ${mobileMenuOpen ? "rotate-180" : ""}`}
//                 />
//               </button>

//               {mobileMenuOpen && (
//                 <div className="absolute right-0 top-[calc(100%+8px)] w-44 bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-[999] animate-in fade-in slide-in-from-top-2 duration-150">
//                   <button
//                     onClick={() => {
//                       setMobileMenuOpen(false);
//                       navigate("/profile");
//                     }}
//                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
//                   >
//                     <User size={13} className="flex-shrink-0" />
//                     Profile
//                   </button>
//                   <button
//                     onClick={() => {
//                       setMobileMenuOpen(false);
//                       navigate("/settings");
//                     }}
//                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
//                   >
//                     <Settings size={13} className="flex-shrink-0" />
//                     Settings
//                   </button>
//                   <button
//                     onClick={() => {
//                       setMobileMenuOpen(false);
//                       handleLogOut();
//                     }}
//                     className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] transition-colors duration-100"
//                   >
//                     <LogOut size={13} className="flex-shrink-0" />
//                     Log out
//                   </button>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Header;

// import React, {
//   useContext,
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
// } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { websocketContext } from "../context/WebSocket";
// import {
//   LogOut,
//   Wifi,
//   WifiOff,
//   Bell,
//   ChevronDown,
//   Settings,
//   User,
// } from "lucide-react";
// import fetchData from "../utils/fetchData";

// function Header() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, loading, logout } = useAuth();
//   const { wsConnected } = useContext(websocketContext);

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const menuRef = useRef(null);

//   const handleLogOut = () => {
//     logout();
//     navigate("/");
//   };

//   // ── Unread notifications ───────────────────────────────────────────────────
//   const fetchUnreadCount = useCallback(async () => {
//     if (!user) return;
//     try {
//       const res = await fetchData("/api/notifications/unread-count", {
//         credentials: "include",
//       });
//       const data = await res.json();
//       setUnreadCount(data.count ?? 0);
//     } catch {
//       /* silent — badge simply won't show */
//     }
//   }, [user]);

//   useEffect(() => {
//     fetchUnreadCount();
//   }, [fetchUnreadCount, location.pathname]);

//   useEffect(() => {
//     const handler = () => setUnreadCount(0);
//     window.addEventListener("notifications:read-all", handler);
//     return () => window.removeEventListener("notifications:read-all", handler);
//   }, []);

//   // ── Close menu on outside click ────────────────────────────────────────────
//   useEffect(() => {
//     const handler = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target))
//         setMenuOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   if (loading) return null;

//   return (
//     <>
//       <style>{`
//         /* Dropdown fade-slide animation */
//         @keyframes hdr-drop-in {
//           from { opacity: 0; transform: translateY(-6px) scale(0.97); }
//           to   { opacity: 1; transform: translateY(0)   scale(1);    }
//         }
//         .hdr-dropdown {
//           animation: hdr-drop-in 0.15s ease forwards;
//         }

//         /* Ensure the bell badge never wraps */
//         .hdr-bell { position: relative; flex-shrink: 0; }

//         /* Logo text: hide on very small screens */
//         @media (max-width: 359px) { .hdr-logo-text { display: none !important; } }
//       `}</style>

//       <header
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 998,
//           width: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "14px clamp(12px, 4vw, 40px)",
//           background: "rgba(6,6,16,0.85)",
//           backdropFilter: "blur(20px)",
//           WebkitBackdropFilter: "blur(20px)",
//           borderBottom: "1px solid rgba(255,255,255,0.07)",
//           boxSizing: "border-box",
//           gap: 8,
//         }}
//       >
//         {/* ── Logo ────────────────────────────────────────────────────────── */}
//         <div
//           onClick={() => navigate("/")}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             cursor: "pointer",
//             flexShrink: 0,
//           }}
//         >
//           <div
//             style={{
//               width: 28,
//               height: 28,
//               borderRadius: 8,
//               flexShrink: 0,
//               background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0 0 16px rgba(99,102,241,0.35)",
//             }}
//           >
//             <span
//               style={{
//                 color: "#fff",
//                 fontSize: 10,
//                 fontWeight: 900,
//                 letterSpacing: "-0.03em",
//               }}
//             >
//               HS
//             </span>
//           </div>
//           <span
//             className="hdr-logo-text"
//             style={{
//               fontSize: 15,
//               fontWeight: 700,
//               color: "#f1f5f9",
//               letterSpacing: "-0.02em",
//               whiteSpace: "nowrap",
//             }}
//           >
//             HelloStranger
//           </span>
//         </div>

//         {/* ── Right side ──────────────────────────────────────────────────── */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "clamp(6px,2vw,12px)",
//             flexShrink: 0,
//           }}
//         >
//           {/* ── LOGGED OUT ── */}
//           {!user ? (
//             <>
//               <button
//                 onClick={() => navigate("/login")}
//                 style={{
//                   padding: "8px clamp(10px,2.5vw,18px)",
//                   borderRadius: 11,
//                   border: "1px solid rgba(255,255,255,0.1)",
//                   background: "transparent",
//                   color: "rgba(255,255,255,0.65)",
//                   fontSize: "clamp(12px,3vw,14px)",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   whiteSpace: "nowrap",
//                   transition: "all 0.15s ease",
//                   fontFamily: "inherit",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.color = "#fff";
//                   e.currentTarget.style.background = "rgba(255,255,255,0.06)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.color = "rgba(255,255,255,0.65)";
//                   e.currentTarget.style.background = "transparent";
//                 }}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => navigate("/join")}
//                 style={{
//                   padding: "8px clamp(10px,2.5vw,18px)",
//                   borderRadius: 11,
//                   border: "none",
//                   background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
//                   color: "#fff",
//                   fontSize: "clamp(12px,3vw,14px)",
//                   fontWeight: 700,
//                   cursor: "pointer",
//                   whiteSpace: "nowrap",
//                   boxShadow: "0 0 20px rgba(99,102,241,0.35)",
//                   transition: "all 0.15s ease",
//                   fontFamily: "inherit",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.boxShadow =
//                     "0 0 28px rgba(99,102,241,0.55)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.boxShadow =
//                     "0 0 20px rgba(99,102,241,0.35)")
//                 }
//               >
//                 Join Now
//               </button>
//             </>
//           ) : (
//             <>
//               {/* ── WS / username chip — hidden on very small screens ── */}
//               <div
//                 style={{
//                   display: "none", // overridden by media below via className
//                   alignItems: "center",
//                   gap: 6,
//                   padding: "5px 10px",
//                   borderRadius: 10,
//                   background: "rgba(255,255,255,0.04)",
//                   border: "1px solid rgba(255,255,255,0.07)",
//                   maxWidth: 130,
//                 }}
//                 className="hdr-status-chip"
//               >
//                 {wsConnected ? (
//                   <Wifi size={11} color="#34d399" style={{ flexShrink: 0 }} />
//                 ) : (
//                   <WifiOff
//                     size={11}
//                     color="rgba(255,255,255,0.2)"
//                     style={{ flexShrink: 0 }}
//                   />
//                 )}
//                 <span
//                   style={{
//                     fontSize: 12,
//                     color: "rgba(255,255,255,0.45)",
//                     fontWeight: 500,
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   {user.username}
//                 </span>
//               </div>

//               {/* ── Mobile status dot (always visible) ── */}
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: 5 }}
//                 className="hdr-dot-chip"
//               >
//                 <div
//                   style={{
//                     width: 6,
//                     height: 6,
//                     borderRadius: "50%",
//                     flexShrink: 0,
//                     background: wsConnected
//                       ? "#22c55e"
//                       : "rgba(255,255,255,0.2)",
//                     boxShadow: wsConnected
//                       ? "0 0 0 2px rgba(34,197,94,0.2)"
//                       : "none",
//                   }}
//                 />
//                 <span
//                   style={{
//                     fontSize: 11,
//                     color: "rgba(255,255,255,0.4)",
//                     fontWeight: 500,
//                     maxWidth: 80,
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   {user.username}
//                 </span>
//               </div>

//               {/* ── Bell ── */}
//               <div className="hdr-bell">
//                 <button
//                   onClick={() => navigate("/notifications")}
//                   aria-label="Notifications"
//                   style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: 10,
//                     border: "1px solid rgba(255,255,255,0.09)",
//                     background: "transparent",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                     color: "rgba(255,255,255,0.55)",
//                     transition: "all 0.15s ease",
//                     flexShrink: 0,
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.color = "#fff";
//                     e.currentTarget.style.background = "rgba(255,255,255,0.07)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.color = "rgba(255,255,255,0.55)";
//                     e.currentTarget.style.background = "transparent";
//                   }}
//                 >
//                   <Bell size={15} />
//                 </button>
//                 {unreadCount > 0 && (
//                   <span
//                     style={{
//                       position: "absolute",
//                       top: -4,
//                       right: -4,
//                       minWidth: 16,
//                       height: 16,
//                       padding: "0 3px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       background: "#ef4444",
//                       color: "#fff",
//                       fontSize: 9,
//                       fontWeight: 800,
//                       borderRadius: 99,
//                       border: "2px solid #060610",
//                       lineHeight: 1,
//                       pointerEvents: "none",
//                     }}
//                   >
//                     {unreadCount > 99 ? "99+" : unreadCount}
//                   </span>
//                 )}
//               </div>

//               {/* ── Single unified dropdown (works on all screen sizes) ── */}
//               <div
//                 ref={menuRef}
//                 style={{ position: "relative", flexShrink: 0 }}
//               >
//                 <button
//                   onClick={() => setMenuOpen((v) => !v)}
//                   aria-label="Account menu"
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 5,
//                     padding: "5px 8px 5px 5px",
//                     borderRadius: 10,
//                     border: "1px solid rgba(255,255,255,0.09)",
//                     background: menuOpen
//                       ? "rgba(255,255,255,0.07)"
//                       : "transparent",
//                     cursor: "pointer",
//                     color: "rgba(255,255,255,0.65)",
//                     transition: "all 0.15s ease",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.background =
//                       "rgba(255,255,255,0.07)")
//                   }
//                   onMouseLeave={(e) => {
//                     if (!menuOpen)
//                       e.currentTarget.style.background = "transparent";
//                   }}
//                 >
//                   {/* Avatar circle — profile pic if available, else initial */}
//                   <div
//                     style={{
//                       width: 24,
//                       height: 24,
//                       borderRadius: "50%",
//                       flexShrink: 0,
//                       background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {user.profilePicture ? (
//                       <img
//                         src={user.profilePicture}
//                         alt={user.username}
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                         }}
//                       />
//                     ) : (
//                       <span
//                         style={{
//                           color: "#fff",
//                           fontSize: 9,
//                           fontWeight: 800,
//                           textTransform: "uppercase",
//                         }}
//                       >
//                         {user.username?.[0] ?? "U"}
//                       </span>
//                     )}
//                   </div>
//                   <ChevronDown
//                     size={12}
//                     style={{
//                       transition: "transform 0.2s ease",
//                       transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
//                       flexShrink: 0,
//                     }}
//                   />
//                 </button>

//                 {menuOpen && (
//                   <div
//                     className="hdr-dropdown"
//                     style={{
//                       position: "absolute",
//                       right: 0,
//                       top: "calc(100% + 8px)",
//                       width: 172,
//                       background: "#111118",
//                       border: "1px solid rgba(255,255,255,0.09)",
//                       borderRadius: 16,
//                       overflow: "hidden",
//                       boxShadow:
//                         "0 12px 40px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
//                       zIndex: 999,
//                     }}
//                   >
//                     {/* Username header inside dropdown */}
//                     <div
//                       style={{
//                         padding: "11px 14px 9px",
//                         borderBottom: "1px solid rgba(255,255,255,0.05)",
//                       }}
//                     >
//                       <div
//                         style={{
//                           fontSize: 12,
//                           fontWeight: 700,
//                           color: "#e2e8f0",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {user.username}
//                       </div>
//                     </div>

//                     {/* Menu items */}
//                     {[
//                       {
//                         icon: <User size={12} />,
//                         label: "Profile",
//                         path: "/profile",
//                         red: false,
//                       },
//                       {
//                         icon: <Settings size={12} />,
//                         label: "Settings",
//                         path: "/settings",
//                         red: false,
//                       },
//                     ].map((item) => (
//                       <button
//                         key={item.path}
//                         onClick={() => {
//                           setMenuOpen(false);
//                           navigate(item.path);
//                         }}
//                         style={{
//                           width: "100%",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 9,
//                           padding: "10px 14px",
//                           background: "transparent",
//                           border: "none",
//                           borderBottom: "1px solid rgba(255,255,255,0.04)",
//                           fontSize: 13,
//                           fontWeight: 500,
//                           color: "rgba(255,255,255,0.6)",
//                           cursor: "pointer",
//                           textAlign: "left",
//                           transition: "all 0.12s ease",
//                           fontFamily: "inherit",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.background =
//                             "rgba(255,255,255,0.05)";
//                           e.currentTarget.style.color = "#fff";
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.background = "transparent";
//                           e.currentTarget.style.color = "rgba(255,255,255,0.6)";
//                         }}
//                       >
//                         {item.icon}
//                         {item.label}
//                       </button>
//                     ))}

//                     <button
//                       onClick={() => {
//                         setMenuOpen(false);
//                         handleLogOut();
//                       }}
//                       style={{
//                         width: "100%",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 9,
//                         padding: "10px 14px",
//                         background: "transparent",
//                         border: "none",
//                         fontSize: 13,
//                         fontWeight: 500,
//                         color: "#f87171",
//                         cursor: "pointer",
//                         textAlign: "left",
//                         transition: "all 0.12s ease",
//                         fontFamily: "inherit",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background =
//                           "rgba(239,68,68,0.08)";
//                         e.currentTarget.style.color = "#fca5a5";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = "transparent";
//                         e.currentTarget.style.color = "#f87171";
//                       }}
//                     >
//                       <LogOut size={12} />
//                       Log out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </header>

//       {/* Responsive helpers — show/hide chips based on screen width */}
//       <style>{`
//         .hdr-status-chip { display: none !important; }
//         .hdr-dot-chip    { display: flex  !important; }
//         @media (min-width: 520px) {
//           .hdr-status-chip { display: flex !important; }
//           .hdr-dot-chip    { display: none !important; }
//         }
//       `}</style>
//     </>
//   );
// }

// export default Header;

import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { websocketContext } from "../context/WebSocket";
import {
  LogOut,
  Wifi,
  WifiOff,
  Bell,
  ChevronDown,
  Settings,
  User,
} from "lucide-react";
import fetchData from "../utils/fetchData";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, logout } = useAuth();
  const { wsConnected } = useContext(websocketContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef(null);

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  // ── Unread notifications ───────────────────────────────────────────────────
  const fetchUnreadCount = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetchData("/api/notifications/unread-count", {
        credentials: "include",
      });
      const data = await res.json();
      setUnreadCount(data.count ?? 0);
    } catch {
      /* silent — badge simply won't show */
    }
  }, [user]);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount, location.pathname]);

  useEffect(() => {
    const handler = () => setUnreadCount(0);
    window.addEventListener("notifications:read-all", handler);
    return () => window.removeEventListener("notifications:read-all", handler);
  }, []);

  // ── Close menu on outside click ────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading) return null;

  return (
    <>
      <style>{`
        /* Dropdown fade-slide animation */
        @keyframes hdr-drop-in {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .hdr-dropdown { animation: hdr-drop-in 0.15s ease forwards; }

        /* Ensure the bell badge never wraps */
        .hdr-bell { position: relative; flex-shrink: 0; }

        /* Logo text: hide on very small screens */
        @media (max-width: 359px) { .hdr-logo-text { display: none !important; } }

        /*
         * All text in the header uses clamp(min, fluid-vw, max).
         * min  = smallest readable size on a 320px phone
         * mid  = scales proportionally with viewport width
         * max  = caps at a comfortable desktop size
         */

        /* Logo wordmark: 13px → 15px */
        .hdr-logo-text       { font-size: clamp(13px, 3.5vw, 15px) !important; }

        /* Auth buttons (Login / Join Now): 12px → 14px */
        .hdr-btn-auth        { font-size: clamp(12px, 3vw, 14px) !important; }

        /* Status chip username (≥520px): 11px → 12px */
        .hdr-chip-username   { font-size: clamp(11px, 2.8vw, 12px) !important; }

        /* Mobile dot chip username: 10px → 11px */
        .hdr-dot-username    { font-size: clamp(10px, 2.5vw, 11px) !important; }

        /* Notification badge count: fixed 9px — must stay tiny, no scaling */
        .hdr-badge-count     { font-size: 9px !important; }

        /* Avatar initial inside button circle: fixed 9px */
        .hdr-avatar-initial  { font-size: 9px !important; }

        /* Dropdown username header: 11px → 13px */
        .hdr-drop-username   { font-size: clamp(11px, 2.8vw, 13px) !important; }

        /* Dropdown menu items (Profile, Settings, Log out): 12px → 13px */
        .hdr-drop-item       { font-size: clamp(12px, 3vw, 13px) !important; }

        /* Logo icon "HS" text: fixed 10px — fits inside 28px box */
        .hdr-logo-icon-text  { font-size: 10px !important; }
      `}</style>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 998,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px clamp(12px, 4vw, 40px)",
          background: "rgba(6,6,16,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxSizing: "border-box",
          gap: 8,
        }}
      >
        {/* ── Logo ────────────────────────────────────────────────────────── */}
        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              flexShrink: 0,
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(99,102,241,0.35)",
            }}
          >
            {/* fixed 10px — must fit inside 28px box, no scaling needed */}
            <span
              className="hdr-logo-icon-text"
              style={{
                color: "#fff",
                fontWeight: 900,
                letterSpacing: "-0.03em",
              }}
            >
              HS
            </span>
          </div>
          <span
            className="hdr-logo-text"
            style={{
              fontWeight: 700,
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            HelloStranger
          </span>
        </div>

        {/* ── Right side ──────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(6px,2vw,12px)",
            flexShrink: 0,
          }}
        >
          {/* ── LOGGED OUT ── */}
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hdr-btn-auth"
                style={{
                  padding: "8px clamp(10px,2.5vw,18px)",
                  borderRadius: 11,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.65)",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/join")}
                className="hdr-btn-auth"
                style={{
                  padding: "8px clamp(10px,2.5vw,18px)",
                  borderRadius: 11,
                  border: "none",
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: "0 0 20px rgba(99,102,241,0.35)",
                  transition: "all 0.15s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 28px rgba(99,102,241,0.55)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(99,102,241,0.35)")
                }
              >
                Join Now
              </button>
            </>
          ) : (
            <>
              {/* ── WS / username chip — hidden on very small screens ── */}
              <div
                style={{
                  display: "none",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 10px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  maxWidth: 130,
                }}
                className="hdr-status-chip"
              >
                {wsConnected ? (
                  <Wifi size={11} color="#34d399" style={{ flexShrink: 0 }} />
                ) : (
                  <WifiOff
                    size={11}
                    color="rgba(255,255,255,0.2)"
                    style={{ flexShrink: 0 }}
                  />
                )}
                <span
                  className="hdr-chip-username"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.username}
                </span>
              </div>

              {/* ── Mobile status dot (always visible) ── */}
              <div
                style={{ display: "flex", alignItems: "center", gap: 5 }}
                className="hdr-dot-chip"
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: wsConnected
                      ? "#22c55e"
                      : "rgba(255,255,255,0.2)",
                    boxShadow: wsConnected
                      ? "0 0 0 2px rgba(34,197,94,0.2)"
                      : "none",
                  }}
                />
                <span
                  className="hdr-dot-username"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 500,
                    maxWidth: 80,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.username}
                </span>
              </div>

              {/* ── Bell ── */}
              <div className="hdr-bell">
                <button
                  onClick={() => navigate("/notifications")}
                  aria-label="Notifications"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.09)",
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.55)",
                    transition: "all 0.15s ease",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Bell size={15} />
                </button>
                {unreadCount > 0 && (
                  <span
                    className="hdr-badge-count"
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      minWidth: 16,
                      height: 16,
                      padding: "0 3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#ef4444",
                      color: "#fff",
                      fontWeight: 800,
                      borderRadius: 99,
                      border: "2px solid #060610",
                      lineHeight: 1,
                      pointerEvents: "none",
                    }}
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </div>

              {/* ── Single unified dropdown ── */}
              <div
                ref={menuRef}
                style={{ position: "relative", flexShrink: 0 }}
              >
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label="Account menu"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "5px 8px 5px 5px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.09)",
                    background: menuOpen
                      ? "rgba(255,255,255,0.07)"
                      : "transparent",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.65)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.07)")
                  }
                  onMouseLeave={(e) => {
                    if (!menuOpen)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  {/* Avatar circle */}
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      /* fixed 9px — must fit inside 24px circle */
                      <span
                        className="hdr-avatar-initial"
                        style={{
                          color: "#fff",
                          fontWeight: 800,
                          textTransform: "uppercase",
                        }}
                      >
                        {user.username?.[0] ?? "U"}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    size={12}
                    style={{
                      transition: "transform 0.2s ease",
                      transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                      flexShrink: 0,
                    }}
                  />
                </button>

                {menuOpen && (
                  <div
                    className="hdr-dropdown"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 8px)",
                      width: 172,
                      background: "#111118",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow:
                        "0 12px 40px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
                      zIndex: 999,
                    }}
                  >
                    {/* Username header inside dropdown */}
                    <div
                      style={{
                        padding: "11px 14px 9px",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div
                        className="hdr-drop-username"
                        style={{
                          fontWeight: 700,
                          color: "#e2e8f0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user.username}
                      </div>
                    </div>

                    {/* Menu items */}
                    {[
                      {
                        icon: <User size={12} />,
                        label: "Profile",
                        path: "/profile",
                      },
                      {
                        icon: <Settings size={12} />,
                        label: "Settings",
                        path: "/settings",
                      },
                    ].map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          setMenuOpen(false);
                          navigate(item.path);
                        }}
                        className="hdr-drop-item"
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 9,
                          padding: "10px 14px",
                          background: "transparent",
                          border: "none",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.6)",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.12s ease",
                          fontFamily: "inherit",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.05)";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogOut();
                      }}
                      className="hdr-drop-item"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 9,
                        padding: "10px 14px",
                        background: "transparent",
                        border: "none",
                        fontWeight: 500,
                        color: "#f87171",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.12s ease",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(239,68,68,0.08)";
                        e.currentTarget.style.color = "#fca5a5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#f87171";
                      }}
                    >
                      <LogOut size={12} />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Responsive helpers — show/hide chips based on screen width */}
      <style>{`
        .hdr-status-chip { display: none !important; }
        .hdr-dot-chip    { display: flex  !important; }
        @media (min-width: 520px) {
          .hdr-status-chip { display: flex !important; }
          .hdr-dot-chip    { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default Header;