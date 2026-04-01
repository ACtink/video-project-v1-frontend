// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   Sun,
//   Moon,
//   Monitor,
//   ChevronRight,
//   ArrowLeft,
//   User,
//   Bell,
//   Shield,
//   LogOut,
//   Palette,
// } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";

// // ── Theme helpers ──────────────────────────────────────────────
// const THEME_KEY = "app-theme";

// function getStoredTheme() {
//   return localStorage.getItem(THEME_KEY) || "dark";
// }

// function applyTheme(theme) {
//   const root = document.documentElement;
//   if (theme === "system") {
//     const prefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)",
//     ).matches;
//     root.setAttribute("data-theme", prefersDark ? "dark" : "light");
//   } else {
//     root.setAttribute("data-theme", theme);
//   }
//   localStorage.setItem(THEME_KEY, theme);
// }

// // ── Section wrapper ────────────────────────────────────────────
// function Section({ title, children }) {
//   return (
//     <div className="mb-6">
//       <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 px-1 mb-2">
//         {title}
//       </p>
//       <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden divide-y divide-white/8">
//         {children}
//       </div>
//     </div>
//   );
// }

// // ── Row ────────────────────────────────────────────────────────
// function Row({ icon: Icon, label, sublabel, right, onClick, danger }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-150
//         ${onClick ? "hover:bg-white/5 active:bg-white/8" : "cursor-default"}
//         ${danger ? "hover:bg-red-500/5" : ""}
//       `}
//     >
//       <div
//         className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
//         ${danger ? "bg-red-500/10" : "bg-white/6"}`}
//       >
//         <Icon size={15} className={danger ? "text-red-400" : "text-white/50"} />
//       </div>
//       <div className="flex-1 min-w-0">
//         <p
//           className={`text-[14px] font-medium ${danger ? "text-red-400" : "text-white/90"}`}
//         >
//           {label}
//         </p>
//         {sublabel && (
//           <p className="text-[12px] text-white/35 mt-0.5">{sublabel}</p>
//         )}
//       </div>
//       {right && <div className="flex-shrink-0">{right}</div>}
//     </button>
//   );
// }

// // ── Theme picker ───────────────────────────────────────────────
// const themes = [
//   { id: "light", label: "Light", icon: Sun },
//   { id: "dark", label: "Dark", icon: Moon },
//   { id: "system", label: "System", icon: Monitor },
// ];

// function ThemePicker({ current, onChange }) {
//   return (
//     <div className="px-5 py-4">
//       <div className="flex items-center gap-3 mb-4">
//         <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/6 flex-shrink-0">
//           <Palette size={15} className="text-white/50" />
//         </div>
//         <p className="text-[14px] font-medium text-white/90">Theme</p>
//       </div>
//       <div className="grid grid-cols-3 gap-2.5">
//         {themes.map(({ id, label, icon: Icon }) => {
//           const active = current === id;
//           return (
//             <button
//               key={id}
//               onClick={() => onChange(id)}
//               className={`relative flex flex-col items-center gap-2 py-4 rounded-xl border transition-all duration-200
//                 ${
//                   active
//                     ? "border-indigo-500/60 bg-indigo-500/10 shadow-[0_0_16px_rgba(99,102,241,0.15)]"
//                     : "border-white/8 bg-white/[0.02] hover:bg-white/6 hover:border-white/15"
//                 }`}
//             >
//               {/* Preview swatch */}
//               <div
//                 className={`w-10 h-10 rounded-lg flex items-center justify-center
//                 ${
//                   id === "light"
//                     ? "bg-white shadow-sm"
//                     : id === "dark"
//                       ? "bg-[#111] border border-white/10"
//                       : "bg-gradient-to-br from-white to-[#111]"
//                 }`}
//               >
//                 <Icon
//                   size={16}
//                   className={id === "light" ? "text-gray-700" : "text-white/70"}
//                 />
//               </div>
//               <span
//                 className={`text-[12px] font-semibold tracking-wide
//                 ${active ? "text-indigo-400" : "text-white/45"}`}
//               >
//                 {label}
//               </span>
//               {active && (
//                 <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500" />
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ── Main page ──────────────────────────────────────────────────
// function SettingsPage() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [theme, setTheme] = useState(getStoredTheme);
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

//   useEffect(() => {
//     applyTheme(theme);
//   }, [theme]);

//   const handleThemeChange = (t) => {
//     setTheme(t);
//     applyTheme(t);
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };

//   return (
//     <div className="bg-black text-white min-h-[calc(100vh-72px-56px)] md:min-h-[calc(100vh-80px-56px)] overflow-y-auto">
//       <div className="max-w-lg mx-auto px-4 pt-8 pb-16">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150 active:scale-95"
//           >
//             <ArrowLeft size={16} />
//           </button>
//           <h1 className="text-[20px] font-bold text-white tracking-tight">
//             Settings
//           </h1>
//         </div>

//         {/* Account info card */}
//         {user && (
//           <div className="flex items-center gap-4 mb-8 px-5 py-4 rounded-2xl border border-white/8 bg-white/[0.03]">
//             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 ring-2 ring-white/10">
//               {user.profilePicture ? (
//                 <img
//                   src={user.profilePicture}
//                   alt={user.username}
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               ) : (
//                 <span className="text-[18px] font-bold text-white">
//                   {user.username?.[0]?.toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <div className="min-w-0">
//               <p className="text-[15px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 truncate">
//                 @{user.username}
//               </p>
//               {user.fullName && (
//                 <p className="text-[13px] text-white/40 truncate">
//                   {user.fullName}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Appearance */}
//         <Section title="Appearance">
//           <ThemePicker current={theme} onChange={handleThemeChange} />
//         </Section>

//         {/* Account */}
//         <Section title="Account">
//           <Row
//             icon={User}
//             label="Edit Profile"
//             sublabel="Update your photo, name, and bio"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/edit-profile")}
//           />
//           <Row
//             icon={Shield}
//             label="Privacy"
//             sublabel="Manage who can see your content"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/settings/privacy")}
//           />
//           <Row
//             icon={Bell}
//             label="Notifications"
//             sublabel="Push, email, and in-app alerts"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/settings/notifications")}
//           />
//         </Section>

//         {/* Danger */}
//         <Section title="Session">
//           <Row
//             icon={LogOut}
//             label="Log out"
//             sublabel={`Signed in as @${user?.username}`}
//             danger
//             onClick={() => setShowLogoutConfirm(true)}
//           />
//         </Section>

//         <p className="text-center text-[11px] text-white/15 mt-6 tracking-wide">
//           v1.0.0
//         </p>
//       </div>

//       {/* Logout confirm */}
//       {showLogoutConfirm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//           <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-[300px] overflow-hidden">
//             <div className="px-6 py-5 border-b border-white/8 text-center">
//               <p className="text-[15px] font-bold text-white">Log out?</p>
//               <p className="text-[12px] text-white/45 mt-1.5 leading-relaxed">
//                 You'll need to sign in again to access your account.
//               </p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="w-full px-6 py-3.5 text-[13px] font-semibold text-red-400 hover:bg-white/6 transition-colors duration-100 border-b border-white/8"
//             >
//               Log out
//             </button>
//             <button
//               onClick={() => setShowLogoutConfirm(false)}
//               className="w-full px-6 py-3.5 text-[13px] font-medium text-white/60 hover:bg-white/6 transition-colors duration-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SettingsPage;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ChevronRight,
//   ArrowLeft,
//   User,
//   ShieldOff,
//   LogOut,
//   KeyRound,
// } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";

// // ── Section wrapper ────────────────────────────────────────────
// function Section({ title, children }) {
//   return (
//     <div className="mb-6">
//       <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 px-1 mb-2">
//         {title}
//       </p>
//       <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden divide-y divide-white/8">
//         {children}
//       </div>
//     </div>
//   );
// }

// // ── Row ────────────────────────────────────────────────────────
// function Row({ icon: Icon, label, sublabel, right, onClick, danger }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-150
//         ${onClick ? "hover:bg-white/5 active:bg-white/8" : "cursor-default"}
//         ${danger ? "hover:bg-red-500/5" : ""}
//       `}
//     >
//       <div
//         className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
//         ${danger ? "bg-red-500/10" : "bg-white/6"}`}
//       >
//         <Icon size={15} className={danger ? "text-red-400" : "text-white/50"} />
//       </div>
//       <div className="flex-1 min-w-0">
//         <p
//           className={`text-[14px] font-medium ${danger ? "text-red-400" : "text-white/90"}`}
//         >
//           {label}
//         </p>
//         {sublabel && (
//           <p className="text-[12px] text-white/35 mt-0.5">{sublabel}</p>
//         )}
//       </div>
//       {right && <div className="flex-shrink-0">{right}</div>}
//     </button>
//   );
// }

// // ── Main page ──────────────────────────────────────────────────
// function SettingsPage() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };

//   return (
//     <div className="bg-black text-white min-h-[calc(100vh-72px-56px)] md:min-h-[calc(100vh-80px-56px)] overflow-y-auto">
//       <div className="max-w-lg mx-auto px-4 pt-8 pb-16">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150 active:scale-95"
//           >
//             <ArrowLeft size={16} />
//           </button>
//           <h1 className="text-[20px] font-bold text-white tracking-tight">
//             Settings
//           </h1>
//         </div>

//         {/* Account info card */}
//         {user && (
//           <div className="flex items-center gap-4 mb-8 px-5 py-4 rounded-2xl border border-white/8 bg-white/[0.03]">
//             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 ring-2 ring-white/10 overflow-hidden">
//               {user.profilePicture ? (
//                 <img
//                   src={user.profilePicture}
//                   alt={user.username}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-[18px] font-bold text-white">
//                   {user.username?.[0]?.toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <div className="min-w-0">
//               <p className="text-[15px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 truncate">
//                 @{user.username}
//               </p>
//               {user.fullName && (
//                 <p className="text-[13px] text-white/40 truncate">
//                   {user.fullName}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Account */}
//         <Section title="Account">
//           <Row
//             icon={User}
//             label="Edit Profile"
//             sublabel="Update your photo, name, and bio"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/edit-profile")}
//           />
//           <Row
//             icon={KeyRound}
//             label="Change Password"
//             sublabel="Update your account password"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/settings/change-password")}
//           />
//           <Row
//             icon={ShieldOff}
//             label="Blocked Users"
//             sublabel="Manage accounts you've blocked"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/settings/blocked")}
//           />
//         </Section>

//         {/* Session */}
//         <Section title="Session">
//           <Row
//             icon={LogOut}
//             label="Log out"
//             sublabel={`Signed in as @${user?.username}`}
//             danger
//             onClick={() => setShowLogoutConfirm(true)}
//           />
//         </Section>

//         <p className="text-center text-[11px] text-white/15 mt-6 tracking-wide">
//           v1.0.0
//         </p>
//       </div>

//       {/* Logout confirm */}
//       {showLogoutConfirm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//           <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-[300px] overflow-hidden">
//             <div className="px-6 py-5 border-b border-white/8 text-center">
//               <p className="text-[15px] font-bold text-white">Log out?</p>
//               <p className="text-[12px] text-white/45 mt-1.5 leading-relaxed">
//                 You'll need to sign in again to access your account.
//               </p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="w-full px-6 py-3.5 text-[13px] font-semibold text-red-400 hover:bg-white/6 transition-colors duration-100 border-b border-white/8"
//             >
//               Log out
//             </button>
//             <button
//               onClick={() => setShowLogoutConfirm(false)}
//               className="w-full px-6 py-3.5 text-[13px] font-medium text-white/60 hover:bg-white/6 transition-colors duration-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SettingsPage;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ChevronRight,
//   ArrowLeft,
//   User,
//   ShieldOff,
//   LogOut,
//   KeyRound,
//   EyeOff,
// } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";
// import fetchData from "../utils/fetchData";

// // ── Section wrapper ────────────────────────────────────────────
// function Section({ title, children }) {
//   return (
//     <div className="mb-6">
//       <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 px-1 mb-2">
//         {title}
//       </p>
//       <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden divide-y divide-white/8">
//         {children}
//       </div>
//     </div>
//   );
// }

// // ── Row ────────────────────────────────────────────────────────
// function Row({ icon: Icon, label, sublabel, right, onClick, danger }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-150
//         ${onClick ? "hover:bg-white/5 active:bg-white/8" : "cursor-default"}
//         ${danger ? "hover:bg-red-500/5" : ""}
//       `}
//     >
//       <div
//         className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
//         ${danger ? "bg-red-500/10" : "bg-white/6"}`}
//       >
//         <Icon size={15} className={danger ? "text-red-400" : "text-white/50"} />
//       </div>
//       <div className="flex-1 min-w-0">
//         <p
//           className={`text-[14px] font-medium ${danger ? "text-red-400" : "text-white/90"}`}
//         >
//           {label}
//         </p>
//         {sublabel && (
//           <p className="text-[12px] text-white/35 mt-0.5">{sublabel}</p>
//         )}
//       </div>
//       {right && <div className="flex-shrink-0">{right}</div>}
//     </button>
//   );
// }

// // ── Hidden Posts Sheet ─────────────────────────────────────────
// function HiddenPostsSheet({ onClose }) {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [undoing, setUndoing] = useState(null);

//  useEffect(() => {
//    const load = async () => {
//      try {
//        const res = await fetchData("/api/posts/not-interested", {
//          credentials: "include",
//        });
//        const data = await res.json(); // ← parse it here
//        setPosts(Array.isArray(data) ? data : []);
//      } catch (err) {
//        console.error(err);
//      } finally {
//        setLoading(false);
//      }
//    };
//    load();
//  }, []);

//   const handleUndo = async (postId) => {
//     setUndoing(postId);
//     try {
//       await fetchData(`/api/posts/${postId}/not-interested`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       setPosts((prev) => prev.filter((p) => p._id !== postId));
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setUndoing(null);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black flex flex-col">
//       {/* Header */}
//       <div className="flex items-center gap-3 px-4 pt-8 pb-4 border-b border-white/8">
//         <button
//           onClick={onClose}
//           className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150 active:scale-95"
//         >
//           <ArrowLeft size={16} />
//         </button>
//         <h1 className="text-[18px] font-bold text-white tracking-tight">
//           Hidden Posts
//         </h1>
//       </div>

//       <div className="flex-1 overflow-y-auto">
//         {loading ? (
//           <div className="flex items-center justify-center h-40">
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.3)"
//               strokeWidth="2"
//               strokeLinecap="round"
//               style={{ animation: "spin 0.8s linear infinite" }}
//             >
//               <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//             </svg>
//             <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//           </div>
//         ) : posts.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-40 gap-2">
//             <EyeOff size={28} className="text-white/20" />
//             <p className="text-[13px] text-white/30">No hidden posts</p>
//           </div>
//         ) : (
//           <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
//             <p className="text-[12px] text-white/30 mb-4 leading-relaxed">
//               These posts are hidden from your feed. You can restore them at any
//               time.
//             </p>
//             {posts.map((post) => (
//               <div
//                 key={post._id}
//                 className="flex items-center gap-3 p-3 rounded-2xl border border-white/8 bg-white/[0.03]"
//               >
//                 {/* Thumbnail */}
//                 <img
//                   src={post.imageUrl}
//                   alt=""
//                   className="w-14 h-14 rounded-xl object-cover flex-shrink-0 opacity-60"
//                 />

//                 {/* Info */}
//                 <div className="flex-1 min-w-0">
//                   <p className="text-[13px] font-semibold text-white/80 truncate">
//                     @{post.user?.username}
//                   </p>
//                   {post.caption && (
//                     <p className="text-[12px] text-white/35 truncate mt-0.5">
//                       {post.caption}
//                     </p>
//                   )}
//                 </div>

//                 {/* Undo button */}
//                 <button
//                   onClick={() => handleUndo(post._id)}
//                   disabled={undoing === post._id}
//                   className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-white/10 text-[12px] font-medium text-white/60 hover:text-white hover:border-white/25 hover:bg-white/6 transition-all duration-150 disabled:opacity-40 disabled:cursor-default active:scale-95"
//                 >
//                   {undoing === post._id ? (
//                     <svg
//                       width="12"
//                       height="12"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       style={{ animation: "spin 0.8s linear infinite" }}
//                     >
//                       <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//                     </svg>
//                   ) : (
//                     "Restore"
//                   )}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ── Main page ──────────────────────────────────────────────────
// function SettingsPage() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const [showHiddenPosts, setShowHiddenPosts] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };

//   return (
//     <div className="bg-black text-white min-h-[calc(100vh-72px-56px)] md:min-h-[calc(100vh-80px-56px)] overflow-y-auto">
//       <div className="max-w-lg mx-auto px-4 pt-8 pb-16">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150 active:scale-95"
//           >
//             <ArrowLeft size={16} />
//           </button>
//           <h1 className="text-[20px] font-bold text-white tracking-tight">
//             Settings
//           </h1>
//         </div>

//         {/* Account info card */}
//         {user && (
//           <div className="flex items-center gap-4 mb-8 px-5 py-4 rounded-2xl border border-white/8 bg-white/[0.03]">
//             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 ring-2 ring-white/10 overflow-hidden">
//               {user.profilePicture ? (
//                 <img
//                   src={user.profilePicture}
//                   alt={user.username}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-[18px] font-bold text-white">
//                   {user.username?.[0]?.toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <div className="min-w-0">
//               <p className="text-[15px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 truncate">
//                 @{user.username}
//               </p>
//               {user.fullName && (
//                 <p className="text-[13px] text-white/40 truncate">
//                   {user.fullName}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Account */}
//         <Section title="Account">
//           <Row
//             icon={User}
//             label="Edit Profile"
//             sublabel="Update your photo, name, and bio"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/edit-profile")}
//           />
//           <Row
//             icon={KeyRound}
//             label="Change Password"
//             sublabel="Update your account password"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/settings/change-password")}
//           />
//           <Row
//             icon={ShieldOff}
//             label="Blocked Users"
//             sublabel="Manage accounts you've blocked"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/settings/blocked")}
//           />
//         </Section>

//         {/* Content */}
//         <Section title="Content">
//           <Row
//             icon={EyeOff}
//             label="Hidden Posts"
//             sublabel="Posts you've marked as not interested"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => setShowHiddenPosts(true)}
//           />
//         </Section>

//         {/* Session */}
//         <Section title="Session">
//           <Row
//             icon={LogOut}
//             label="Log out"
//             sublabel={`Signed in as @${user?.username}`}
//             danger
//             onClick={() => setShowLogoutConfirm(true)}
//           />
//         </Section>

//         <p className="text-center text-[11px] text-white/15 mt-6 tracking-wide">
//           v1.0.0
//         </p>
//       </div>

//       {/* Logout confirm */}
//       {showLogoutConfirm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//           <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-[300px] overflow-hidden">
//             <div className="px-6 py-5 border-b border-white/8 text-center">
//               <p className="text-[15px] font-bold text-white">Log out?</p>
//               <p className="text-[12px] text-white/45 mt-1.5 leading-relaxed">
//                 You'll need to sign in again to access your account.
//               </p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="w-full px-6 py-3.5 text-[13px] font-semibold text-red-400 hover:bg-white/6 transition-colors duration-100 border-b border-white/8"
//             >
//               Log out
//             </button>
//             <button
//               onClick={() => setShowLogoutConfirm(false)}
//               className="w-full px-6 py-3.5 text-[13px] font-medium text-white/60 hover:bg-white/6 transition-colors duration-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Hidden posts sheet */}
//       {showHiddenPosts && (
//         <HiddenPostsSheet onClose={() => setShowHiddenPosts(false)} />
//       )}
//     </div>
//   );
// }

// export default SettingsPage;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ChevronRight,
//   ArrowLeft,
//   User,
//   ShieldOff,
//   LogOut,
//   KeyRound,
//   EyeOff,
// } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";

// // ── Section wrapper ────────────────────────────────────────────
// function Section({ title, children }) {
//   return (
//     <div className="mb-6">
//       <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 px-1 mb-2">
//         {title}
//       </p>
//       <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden divide-y divide-white/8">
//         {children}
//       </div>
//     </div>
//   );
// }

// // ── Row ────────────────────────────────────────────────────────
// function Row({ icon: Icon, label, sublabel, right, onClick, danger }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-150
//         ${onClick ? "hover:bg-white/5 active:bg-white/8" : "cursor-default"}
//         ${danger ? "hover:bg-red-500/5" : ""}
//       `}
//     >
//       <div
//         className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
//         ${danger ? "bg-red-500/10" : "bg-white/6"}`}
//       >
//         <Icon size={15} className={danger ? "text-red-400" : "text-white/50"} />
//       </div>
//       <div className="flex-1 min-w-0">
//         <p
//           className={`text-[14px] font-medium ${danger ? "text-red-400" : "text-white/90"}`}
//         >
//           {label}
//         </p>
//         {sublabel && (
//           <p className="text-[12px] text-white/35 mt-0.5">{sublabel}</p>
//         )}
//       </div>
//       {right && <div className="flex-shrink-0">{right}</div>}
//     </button>
//   );
// }

// // ── Main page ──────────────────────────────────────────────────
// function SettingsPage() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };

//   return (
//     <div className="bg-black text-white min-h-[calc(100vh-72px-56px)] md:min-h-[calc(100vh-80px-56px)] overflow-y-auto">
//       <div className="max-w-lg mx-auto px-4 pt-8 pb-16">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150 active:scale-95"
//           >
//             <ArrowLeft size={16} />
//           </button>
//           <h1 className="text-[20px] font-bold text-white tracking-tight">
//             Settings
//           </h1>
//         </div>

//         {/* Account info card */}
//         {user && (
//           <div className="flex items-center gap-4 mb-8 px-5 py-4 rounded-2xl border border-white/8 bg-white/[0.03]">
//             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 ring-2 ring-white/10 overflow-hidden">
//               {user.profilePicture ? (
//                 <img
//                   src={user.profilePicture}
//                   alt={user.username}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-[18px] font-bold text-white">
//                   {user.username?.[0]?.toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <div className="min-w-0">
//               <p className="text-[15px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 truncate">
//                 @{user.username}
//               </p>
//               {user.fullName && (
//                 <p className="text-[13px] text-white/40 truncate">
//                   {user.fullName}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Account */}
//         <Section title="Account">
//           <Row
//             icon={User}
//             label="Edit Profile"
//             sublabel="Update your photo, name, and bio"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/edit-profile")}
//           />
//           <Row
//             icon={KeyRound}
//             label="Change Password"
//             sublabel="Update your account password"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/settings/change-password")}
//           />
//           <Row
//             icon={ShieldOff}
//             label="Blocked Users"
//             sublabel="Manage accounts you've blocked"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/settings/blocked")}
//           />
//         </Section>

//         {/* Content */}
//         <Section title="Content">
//           <Row
//             icon={EyeOff}
//             label="Hidden Posts"
//             sublabel="Posts you've marked as not interested"
//             right={<ChevronRight size={15} className="text-white/25" />}
//             onClick={() => navigate("/settings/hidden-posts")}
//           />
//         </Section>

//         {/* Session */}
//         <Section title="Session">
//           <Row
//             icon={LogOut}
//             label="Log out"
//             sublabel={`Signed in as @${user?.username}`}
//             danger
//             onClick={() => setShowLogoutConfirm(true)}
//           />
//         </Section>

//         <p className="text-center text-[11px] text-white/15 mt-6 tracking-wide">
//           v1.0.0
//         </p>
//       </div>

//       {/* Logout confirm */}
//       {showLogoutConfirm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//           <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-[300px] overflow-hidden">
//             <div className="px-6 py-5 border-b border-white/8 text-center">
//               <p className="text-[15px] font-bold text-white">Log out?</p>
//               <p className="text-[12px] text-white/45 mt-1.5 leading-relaxed">
//                 You'll need to sign in again to access your account.
//               </p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="w-full px-6 py-3.5 text-[13px] font-semibold text-red-400 hover:bg-white/6 transition-colors duration-100 border-b border-white/8"
//             >
//               Log out
//             </button>
//             <button
//               onClick={() => setShowLogoutConfirm(false)}
//               className="w-full px-6 py-3.5 text-[13px] font-medium text-white/60 hover:bg-white/6 transition-colors duration-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SettingsPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ArrowLeft,
  User,
  ShieldOff,
  LogOut,
  KeyRound,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

// ── Section wrapper ────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 px-1 mb-2">
        {title}
      </p>
      <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden divide-y divide-white/8">
        {children}
      </div>
    </div>
  );
}

// ── Row ────────────────────────────────────────────────────────
function Row({ icon: Icon, label, sublabel, right, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-150
        ${onClick ? "hover:bg-white/5 active:bg-white/8" : "cursor-default"}
        ${danger ? "hover:bg-red-500/5" : ""}
      `}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
        ${danger ? "bg-red-500/10" : "bg-white/6"}`}
      >
        <Icon size={15} className={danger ? "text-red-400" : "text-white/50"} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-[14px] font-medium ${danger ? "text-red-400" : "text-white/90"}`}
        >
          {label}
        </p>
        {sublabel && (
          <p className="text-[12px] text-white/35 mt-0.5">{sublabel}</p>
        )}
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </button>
  );
}

// ── Main page ──────────────────────────────────────────────────
function SettingsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="bg-black text-white min-h-[calc(100vh-72px-56px)] md:min-h-[calc(100vh-80px-56px)] overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150 active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-[20px] font-bold text-white tracking-tight">
            Settings
          </h1>
        </div>

        {/* Account info card */}
        {user && (
          <div className="flex items-center gap-4 mb-8 px-5 py-4 rounded-2xl border border-white/8 bg-white/[0.03]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 ring-2 ring-white/10 overflow-hidden">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[18px] font-bold text-white">
                  {user.username?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 truncate">
                @{user.username}
              </p>
              {user.fullName && (
                <p className="text-[13px] text-white/40 truncate">
                  {user.fullName}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Account */}
        <Section title="Account">
          <Row
            icon={User}
            label="Edit Profile"
            sublabel="Update your photo, name, and bio"
            right={<ChevronRight size={15} className="text-white/25" />}
            onClick={() => navigate("/edit-profile")}
          />
          <Row
            icon={KeyRound}
            label="Change Password"
            sublabel="Update your account password"
            right={<ChevronRight size={15} className="text-white/25" />}
            onClick={() => navigate("/settings/change-password")}
          />
          <Row
            icon={ShieldOff}
            label="Blocked Users"
            sublabel="Manage accounts you've blocked"
            right={<ChevronRight size={15} className="text-white/25" />}
            onClick={() => navigate("/settings/blocked")}
          />
        </Section>

        {/* Support */}
        <Section title="Support">
          <Row
            icon={HelpCircle}
            label="Help & Support"
            sublabel="Get help or contact our team"
            right={<ChevronRight size={15} className="text-white/25" />}
            onClick={() => navigate("/settings/help")}
          />
        </Section>

        {/* Session */}
        <Section title="Session">
          <Row
            icon={LogOut}
            label="Log out"
            sublabel={`Signed in as @${user?.username}`}
            danger
            onClick={() => setShowLogoutConfirm(true)}
          />
        </Section>

        <p className="text-center text-[11px] text-white/15 mt-6 tracking-wide">
          v1.0.0
        </p>
      </div>

      {/* Logout confirm */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-[300px] overflow-hidden">
            <div className="px-6 py-5 border-b border-white/8 text-center">
              <p className="text-[15px] font-bold text-white">Log out?</p>
              <p className="text-[12px] text-white/45 mt-1.5 leading-relaxed">
                You'll need to sign in again to access your account.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-6 py-3.5 text-[13px] font-semibold text-red-400 hover:bg-white/6 transition-colors duration-100 border-b border-white/8"
            >
              Log out
            </button>
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="w-full px-6 py-3.5 text-[13px] font-medium text-white/60 hover:bg-white/6 transition-colors duration-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;