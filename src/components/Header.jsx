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
  const mobileMenuRef = useRef(null);

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  // ── Fetch unread notification count ───────────────────────
  const fetchUnreadCount = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetchData("/api/notifications/unread-count", {
        credentials: "include",
      });
      const data = await res.json();
      setUnreadCount(data.count ?? 0);
    } catch {
      // silently fail — badge just won't show
    }
  }, [user]);

  // Fetch on mount and whenever the route changes
  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount, location.pathname]);

  // Listen for NotificationsPage telling us all are read — zero the badge instantly
  useEffect(() => {
    const handler = () => setUnreadCount(0);
    window.addEventListener("notifications:read-all", handler);
    return () => window.removeEventListener("notifications:read-all", handler);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) return null;

  return (
    <header
      className="
      sticky top-0 z-[998]
      w-full
      flex items-center justify-between
      px-4 sm:px-6 md:px-10
      py-3 md:py-4
      bg-black/80 backdrop-blur-xl
      border-b border-white/10
    "
    >
      {/* ── LOGO ── */}
      <div
        onClick={() => {
          window.location.href = "/";
        }}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
          <span className="text-white text-[11px] font-black tracking-tight">
            HS
          </span>
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
              className="px-4 py-2 rounded-xl text-[16px] font-semibold text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150 tracking-wide"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/join")}
              className="px-4 py-2 rounded-xl text-[16px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 tracking-wide shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]"
            >
              Join Now
            </button>
          </>
        ) : (
          <>
            {/* ── WS status chip — desktop only ── */}
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

            {/* ── Mobile username dot ── */}
            <div className="flex sm:hidden items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${wsConnected ? "bg-emerald-400" : "bg-white/20"}`}
              />
              <span className="text-[12px] text-white/50 font-medium">
                {user.username}
              </span>
            </div>

            {/* ── Bell ── */}
            <button
              onClick={() => navigate("/notifications")}
              className="relative flex items-center justify-center w-9 h-9 rounded-xl text-white/60 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
              aria-label="Notifications"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full border-2 border-black leading-none">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {/* ── Desktop dropdown ── */}
            <div className="relative hidden sm:block" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[8px] font-bold uppercase">
                    {user.username?.[0] ?? "U"}
                  </span>
                </div>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-44 bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-[999] animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
                  >
                    <User size={13} className="flex-shrink-0" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
                  >
                    <Settings size={13} className="flex-shrink-0" />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogOut();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] transition-colors duration-100"
                  >
                    <LogOut size={13} className="flex-shrink-0" />
                    Log out
                  </button>
                </div>
              )}
            </div>

            {/* ── Mobile dropdown ── */}
            <div className="relative flex sm:hidden" ref={mobileMenuRef}>
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-white/70 hover:text-white border border-white/10 hover:bg-white/8 active:scale-95 transition-all duration-150"
                aria-label="Menu"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[8px] font-bold uppercase">
                    {user.username?.[0] ?? "U"}
                  </span>
                </div>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${mobileMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-44 bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-[999] animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
                  >
                    <User size={13} className="flex-shrink-0" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-100 border-b border-white/[0.06]"
                  >
                    <Settings size={13} className="flex-shrink-0" />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogOut();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] transition-colors duration-100"
                  >
                    <LogOut size={13} className="flex-shrink-0" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;