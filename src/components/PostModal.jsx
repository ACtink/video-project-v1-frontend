// import { useEffect } from "react";
// import { SendHorizontal } from "lucide-react";

// function PostModal({ post, onClose }) {
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     document.body.style.touchAction = "none";

//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.touchAction = "";
//     };
//   }, []);

//   return (
//     <div
//       className="
//         fixed inset-0 z-50
//         bg-black/70
//         flex items-center justify-center
//         px-4 sm:px-6
//         overscroll-none

//         pt-16
//         pb-16

//         [padding-top:calc(4rem+env(safe-area-inset-top))]
//         [padding-bottom:calc(4rem+env(safe-area-inset-bottom))]
//       "
//     >
//       <div
//         className="
//           w-full max-w-5xl
//           h-full md:h-[76vh]
//           bg-black
//           rounded-xl
//           overflow-hidden
//           flex flex-col md:flex-row
//           relative
//           transform transition-all duration-300 ease-out
//           animate-postModalIn
//         "
//       >
//         {/* CLOSE */}
//         <button
//           onClick={onClose}
//           className="
//             absolute top-3 right-3 z-30
//             pointer-events-auto
//             w-10 h-10
//             flex items-center justify-center
//             rounded-full
//             bg-black/60
//             backdrop-blur-md
//             border border-white/20
//             text-white text-lg
//             shadow-lg
//             hover:bg-black/80
//             hover:scale-110
//             active:scale-95
//             transition-all duration-200
//           "
//         >
//           ✕
//         </button>

//         {/* IMAGE */}
//         <div
//           className="
//             w-full md:w-1/2
//             h-[45%] md:h-full
//             bg-black
//             flex items-center justify-center
//             shrink-0
//           "
//         >
//           <img
//             src={post.imageUrl}
//             alt=""
//             className="max-h-full max-w-full object-contain"
//           />
//         </div>

//         {/* COMMENTS SIDE */}
//         <div
//           className="
//             w-full md:w-1/2
//             border-t md:border-t-0 md:border-l border-white/10
//             text-white
//             overflow-y-auto
//             overscroll-contain
//           "
//         >
//           {/* CAPTION */}
//           {post.caption && (
//             <div className="p-5 border-b border-white/10 bg-white/[0.03] backdrop-blur-md">
//               <p className="text-base md:text-lg leading-relaxed tracking-wide">
//                 <span className="font-bold text-white mr-2">
//                   {post.user?.username} -
//                 </span>
//                 <span className="block max-w-[70%] text-white/85 font-medium">
//                   {post.caption}
//                 </span>
//               </p>
//             </div>
//           )}

//           {/* COMMENTS HEADER */}
//           <div className="p-4 border-b border-white/10 font-semibold text-white/80">
//             Comments
//           </div>

//           {/* COMMENTS LIST */}
//           <div className="p-4 space-y-3 text-sm text-white/80">
//             <div>No comments yet</div>
//           </div>

//           {/* ADD COMMENT BAR */}
//           <div
//             className="
//               sticky bottom-0
//               bg-black
//               border-t border-white/10
//               p-4
//               [padding-bottom:calc(1rem+env(safe-area-inset-bottom))]
//             "
//           >
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 placeholder="Add a comment..."
//                 className="
//                   flex-1
//                   bg-white/10
//                   rounded-lg
//                   px-3 py-2
//                   text-sm
//                   text-white
//                   focus:outline-none
//                 "
//               />

//               <button
//                 className="
//     w-9 h-9
//     flex items-center justify-center
//     rounded-full
//     bg-cyan-500
//     text-slate-900
//     hover:bg-cyan-400
//     active:scale-95
//     transition
//   "
//               >
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M22 2L11 13" />
//                   <path d="M22 2L15 22L11 13L2 9L22 2Z" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PostModal;

// import { useEffect, useState, useRef } from "react";
// import { SendHorizontal, MoreHorizontal } from "lucide-react";

// import { useAuth } from "../hooks/useAuth";
// import fetchData from "../utils/fetchData";

// function PostModal({ post, onClose , onDelete  , onDeleteProfilePost}) {
//   const { user } = useAuth();

//   const isOwner = String(user?._id) === String(post.user?._id);

//   const [showMenu, setShowMenu] = useState(false);

//   const menuRef = useRef(null);

//   const handleDelete = async () => {
//     const confirmed = window.confirm("Delete this post?");
//     if (!confirmed) return;

//     try {
//       await fetchData(`/api/posts/${post._id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       onDelete?.(post._id); // ← THIS LINE FIXES EVERYTHING

//       onDeleteProfilePost?.(post._id); // ← THIS LINE FIXES EVERYTHING FOR PROFILE POSTS

//       onClose();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     document.body.style.touchAction = "none";

//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.touchAction = "";
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div
//       className="
//         fixed inset-0 z-50
//         bg-black/70
//         flex items-center justify-center
//         px-4 sm:px-6
//         overscroll-none
//         pt-16
//         pb-16
//         [padding-top:calc(4rem+env(safe-area-inset-top))]
//         [padding-bottom:calc(4rem+env(safe-area-inset-bottom))]
//       "
//     >
//       <div
//         className="
//           w-full max-w-5xl
//           h-full md:h-[76vh]
//           bg-black
//           overflow-hidden
//           flex flex-col md:flex-row
//           relative
//           transform transition-all duration-300 ease-out
//           animate-postModalIn
//         "
//       >
//         {/* CLOSE */}
//         <button
//           onClick={onClose}
//           className="
//             absolute top-3 right-3 z-30
//             pointer-events-auto
//             w-10 h-10
//             flex items-center justify-center
//             rounded-full
//             bg-black/60
//             backdrop-blur-md
//             border border-white/20
//             text-white text-lg
//             shadow-lg
//             hover:bg-black/80
//             hover:scale-110
//             active:scale-95
//             transition-all duration-200
//           "
//         >
//           ✕
//         </button>

//         {/* PROFESSIONAL MENU (only owner) */}
//         {isOwner && (
//           <div ref={menuRef} className="absolute top-3 right-16 z-30">
//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               className="
//                 w-10 h-10
//                 flex items-center justify-center
//                 rounded-full
//                 bg-black/60
//                 backdrop-blur-md
//                 border border-white/20
//                 text-white
//                 shadow-lg
//                 hover:bg-black/80
//                 hover:scale-110
//                 active:scale-95
//                 transition-all duration-200
//               "
//             >
//               <MoreHorizontal size={18} />
//             </button>

//             {showMenu && (
//               <div
//                 className="
//                   absolute right-0 mt-2
//                   w-40
//                   rounded-xl
//                   bg-neutral-900
//                   border border-white/10
//                   shadow-2xl
//                   overflow-hidden
//                   animate-fadeIn
//                 "
//               >
//                 <button
//                   onClick={handleDelete}
//                   className="
//                     w-full text-left
//                     px-4 py-3
//                     text-sm
//                     text-red-400
//                     hover:bg-white/10
//                     transition
//                   "
//                 >
//                   Delete post
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* IMAGE */}
//         <div
//           className="
//             w-full md:w-1/2
//             h-[45%] md:h-full
//             bg-black
//             flex items-center justify-center
//             shrink-0
//           "
//         >
//           <img
//             src={post.imageUrl}
//             alt=""
//             className="max-h-full max-w-full object-contain"
//           />
//         </div>

//         {/* COMMENTS SIDE */}
//         <div
//           className="
//             w-full md:w-1/2
//             border-t md:border-t-0 md:border-l border-white/10
//             text-white
//             overflow-y-auto
//             overscroll-contain
//           "
//         >
//           {/* CAPTION */}
//           {post.caption && (
//             <div className="p-5 border-b border-white/10 bg-white/[0.03] backdrop-blur-md">
//               <p className="text-base md:text-lg leading-relaxed tracking-wide">
//                 <span className="font-bold text-white mr-2">
//                   {post.user?.username} -
//                 </span>
//                 <span className="block max-w-[70%] text-white/85 font-medium">
//                   {post.caption}
//                 </span>
//               </p>
//             </div>
//           )}

//           {/* COMMENTS HEADER */}
//           <div className="p-4 border-b border-white/10 font-semibold text-white/80">
//             Comments
//           </div>

//           {/* COMMENTS LIST */}
//           <div className="p-4 space-y-3 text-sm text-white/80">
//             <div>No comments yet</div>
//           </div>

//           {/* ADD COMMENT BAR */}
//           <div
//             className="
//               sticky bottom-0
//               bg-black
//               border-t border-white/10
//               p-4
//               [padding-bottom:calc(1rem+env(safe-area-inset-bottom))]
//             "
//           >
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 placeholder="Add a comment..."
//                 className="
//                   flex-1
//                   bg-white/10
//                   rounded-lg
//                   px-3 py-2
//                   text-sm
//                   text-white
//                   focus:outline-none
//                 "
//               />

//               <button
//                 className="
//                   w-9 h-9
//                   flex items-center justify-center
//                   rounded-full
//                   bg-cyan-500
//                   text-slate-900
//                   hover:bg-cyan-400
//                   active:scale-95
//                   transition
//                 "
//               >
//                 <svg width="16" height="16" viewBox="0 0 24 24">
//                   <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" />
//                   <path
//                     d="M22 2L15 22L11 13L2 9L22 2Z"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PostModal;

// import { useEffect, useState, useRef } from "react";
// import { SendHorizontal, MoreHorizontal, X } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";
// import fetchData from "../utils/fetchData";

// function PostModal({ post, onClose, onDelete, onDeleteProfilePost }) {
//   const { user } = useAuth();
//   const isOwner = String(user?._id) === String(post.user?._id);
//   const [showMenu, setShowMenu] = useState(false);
//   const menuRef = useRef(null);

//   const handleDelete = async () => {
//     const confirmed = window.confirm("Delete this post?");
//     if (!confirmed) return;
//     try {
//       await fetchData(`/api/posts/${post._id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       onDelete?.(post._id);
//       onDeleteProfilePost?.(post._id);
//       onClose();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     document.body.style.touchAction = "none";
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.touchAction = "";
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//       className="
//         fixed inset-0 z-50
//         bg-black/80 backdrop-blur-sm
//         flex items-end sm:items-center justify-center
//         [padding-top:env(safe-area-inset-top)]
//         [padding-bottom:env(safe-area-inset-bottom)]
//       "
//     >
//       <div
//         className="
//           w-full sm:max-w-4xl
//           h-[92dvh] sm:h-[80vh]
//           bg-[#0a0a0a]
//           border-t border-white/10 sm:border sm:border-white/10
//           sm:rounded-2xl
//           overflow-hidden
//           flex flex-col md:flex-row
//           relative
//         "
//       >
//         {/* ── CLOSE BUTTON ── */}
//         <button
//           onClick={onClose}
//           className="
//     absolute top-3 right-3 z-30
//     w-8 h-8
//     flex items-center justify-center
//     rounded-full
//     bg-neutral-800 hover:bg-neutral-700
//     border border-neutral-600
//     text-white
//     active:scale-90
//     transition-all duration-150
//   "
//         >
//           <X size={14} />
//         </button>

//         {/* ── THREE-DOT MENU (owner only) ── */}
//         {isOwner && (
//           <div ref={menuRef} className="absolute top-3 right-14 z-30">
//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               className="
//                 w-8 h-8
//                 flex items-center justify-center
//                 rounded-full
//                   bg-neutral-800 hover:bg-neutral-700
//     border border-neutral-600
//                 text-white/70 hover:text-white
//                 active:scale-90
//                 transition-all duration-150
//               "
//             >
//               <MoreHorizontal size={15} />
//             </button>

//             {showMenu && (
//               <div
//                 className="
//                 absolute right-0 mt-2
//                 w-44
//                 rounded-xl
//                 bg-neutral-900
//                 border border-white/10
//                 shadow-2xl
//                 overflow-hidden
//               "
//               >
//                 <button
//                   onClick={handleDelete}
//                   className="
//                     w-full text-left
//                     px-4 py-3
//                     text-[13px] font-medium
//                     text-red-400 hover:text-red-300
//                     hover:bg-white/8
//                     transition-colors duration-150
//                   "
//                 >
//                   Delete post
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ── IMAGE PANEL ── */}
//         <div
//           className="
//           w-full md:w-1/2
//           h-[42%] md:h-full
//           bg-black
//           flex items-center justify-center
//           shrink-0
//           md:rounded-l-2xl
//           overflow-hidden
//         "
//         >
//           <img
//             src={post.imageUrl}
//             alt=""
//             className="w-full h-full object-contain"
//           />
//         </div>

//         {/* ── RIGHT PANEL ── */}
//         <div
//           className="
//           flex flex-col
//           w-full md:w-1/2
//           flex-1
//           border-t md:border-t-0 md:border-l border-white/10
//           overflow-hidden
//           min-h-0
//         "
//         >
//           {/* POSTER INFO */}
//           <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-white/10">
//             <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center flex-shrink-0 ring-1 ring-white/10">
//               {post.user?.profilePicture ? (
//                 <img
//                   src={post.user.profilePicture}
//                   alt=""
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-xs font-semibold text-white">
//                   {post.user?.username?.[0]?.toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <span className="text-[13px] font-semibold text-white tracking-wide">
//               {post.user?.username}
//             </span>
//           </div>

//           {/* CAPTION + COMMENTS — scrollable */}
//           <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 min-h-0">
//             {/* Caption as first "message" */}
//             {post.caption && (
//               <div className="flex items-start gap-3">
//                 <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center flex-shrink-0 ring-1 ring-white/10">
//                   {post.user?.profilePicture ? (
//                     <img
//                       src={post.user.profilePicture}
//                       alt=""
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-[10px] font-semibold text-white">
//                       {post.user?.username?.[0]?.toUpperCase()}
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex flex-col gap-0.5">
//                   <span className="text-[12px] font-semibold text-white/90">
//                     {post.user?.username}
//                   </span>
//                   <p className="text-[13px] text-white/75 leading-relaxed">
//                     {post.caption}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Comments divider */}
//             <div className="flex items-center gap-3 pt-1">
//               <div className="flex-1 h-px bg-white/8" />
//               <span className="text-[11px] text-white/30 tracking-widest uppercase">
//                 comments
//               </span>
//               <div className="flex-1 h-px bg-white/8" />
//             </div>

//             {/* Empty state */}
//             <div className="flex flex-col items-center justify-center py-6 gap-2 text-white/25">
//               <span className="text-2xl">💬</span>
//               <p className="text-[12px] tracking-wide">No comments yet</p>
//             </div>
//           </div>

//           {/* ── ADD COMMENT BAR — always pinned ── */}
//           <div
//             className="
//             flex-shrink-0
//             border-t border-white/10
//             bg-[#0a0a0a]
//             px-3 py-3
//             [padding-bottom:calc(0.75rem+env(safe-area-inset-bottom))]
//           "
//           >
//             <div className="flex items-center gap-2">
//               <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center flex-shrink-0 ring-1 ring-white/10">
//                 {user?.profilePicture ? (
//                   <img
//                     src={user.profilePicture}
//                     alt=""
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-[10px] font-semibold text-white">
//                     {user?.username?.[0]?.toUpperCase()}
//                   </span>
//                 )}
//               </div>
//               <input
//                 type="text"
//                 placeholder="Add a comment…"
//                 className="
//                   flex-1
//                   bg-white/8 hover:bg-white/10
//                   focus:bg-white/10
//                   rounded-full
//                   px-4 py-2
//                   text-[13px] text-white
//                   placeholder-white/30
//                   focus:outline-none
//                   focus:ring-1 focus:ring-white/20
//                   transition-colors duration-150
//                 "
//               />
//               <button
//                 className="
//                 w-8 h-8 flex-shrink-0
//                 flex items-center justify-center
//                 rounded-full
//                 bg-indigo-600 hover:bg-indigo-500
//                 active:scale-90
//                 transition-all duration-150
//               "
//               >
//                 <SendHorizontal size={14} className="text-white ml-0.5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PostModal;

// import { useEffect, useState, useRef } from "react";
// import { createPortal } from "react-dom";
// import { SendHorizontal, MoreHorizontal, X, Trash2 } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";
// import fetchData from "../utils/fetchData";

// function PostModal({ post, onClose, onDelete, onDeleteProfilePost }) {
//   const { user } = useAuth();
//   const isOwner = String(user?._id) === String(post.user?._id);
//   const [showMenu, setShowMenu] = useState(false);
//   const menuRef = useRef(null);

//   const handleDelete = async () => {
//     const confirmed = window.confirm("Delete this post?");
//     if (!confirmed) return;
//     try {
//       await fetchData(`/api/posts/${post._id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       onDelete?.(post._id);
//       onDeleteProfilePost?.(post._id);
//       onClose();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     const scrollY = window.scrollY;
//     const body = document.body;
//     body.style.position = "fixed";
//     body.style.top = `-${scrollY}px`;
//     body.style.width = "100%";
//     body.style.overflow = "hidden";

//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       body.style.position = "";
//       body.style.top = "";
//       body.style.width = "";
//       body.style.overflow = "";
//       window.scrollTo(0, scrollY);
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return createPortal(
//     <div
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//       className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center px-0 sm:px-4"
//     >
//       <div
//         className="
//         w-full sm:max-w-4xl
//         h-[92dvh] sm:h-[82vh]
//         bg-[#0a0a0a]
//         border-t border-white/10 sm:border sm:border-white/10
//         sm:rounded-2xl
//         overflow-hidden
//         flex flex-col md:flex-row
//       "
//       >
//         {/* ── IMAGE PANEL ── */}
//         <div
//           className="
//           w-full md:w-1/2
//           h-[40%] md:h-full
//           bg-black flex items-center justify-center
//           shrink-0 md:rounded-l-2xl overflow-hidden
//         "
//         >
//           <img
//             src={post.imageUrl}
//             alt=""
//             className="w-full h-full object-contain"
//           />
//         </div>

//         {/* ── RIGHT PANEL ── */}
//         <div
//           className="
//           flex flex-col w-full md:w-1/2 flex-1
//           border-t md:border-t-0 md:border-l border-white/10
//           overflow-hidden min-h-0
//         "
//         >
//           {/* HEADER */}
//           <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-white/10">
//             <span className="text-[13px] font-semibold text-white tracking-wide flex-1 truncate">
//               {post.user?.username}
//             </span>

//             {isOwner && (
//               <div ref={menuRef} className="relative flex-shrink-0">
//                 <button
//                   onClick={() => setShowMenu(!showMenu)}
//                   className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white/70 hover:text-white active:scale-90 transition-all duration-150"
//                 >
//                   <MoreHorizontal size={15} />
//                 </button>
//                 {showMenu && (
//                   <div className="absolute right-0 mt-2 z-30 w-44 rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden">
//                     <button
//                       onClick={handleDelete}
//                       className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-400 hover:text-red-300 hover:bg-white/8 transition-colors duration-150 text-left"
//                     >
//                       <Trash2 size={13} />
//                       Delete post
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             <button
//               onClick={onClose}
//               className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white active:scale-90 transition-all duration-150"
//             >
//               <X size={14} />
//             </button>
//           </div>

//           {/* CAPTION + COMMENTS */}
//           <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
//             {post.caption && (
//               <div className="flex items-start gap-3">
//                 <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center flex-shrink-0 ring-1 ring-white/10">
//                   {post.user?.profilePicture ? (
//                     <img
//                       src={post.user.profilePicture}
//                       alt=""
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-[10px] font-semibold text-white">
//                       {post.user?.username?.[0]?.toUpperCase()}
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex flex-col gap-0.5">
//                   <span className="text-[12px] font-semibold text-white/90">
//                     {post.user?.username}
//                   </span>
//                   <p className="text-[13px] text-white/75 leading-relaxed">
//                     {post.caption}
//                   </p>
//                 </div>
//               </div>
//             )}

//             <div className="flex items-center gap-3 pt-1">
//               <div className="flex-1 h-px bg-white/8" />
//               <span className="text-[11px] text-white/30 tracking-widest uppercase">
//                 comments
//               </span>
//               <div className="flex-1 h-px bg-white/8" />
//             </div>

//             <div className="flex flex-col items-center justify-center py-6 gap-2 text-white/25">
//               <span className="text-2xl">💬</span>
//               <p className="text-[12px] tracking-wide">No comments yet</p>
//             </div>
//           </div>

//           {/* COMMENT BAR */}
//           <div
//             className="flex-shrink-0 border-t border-white/10 bg-[#0a0a0a] px-3 py-3"
//             style={{
//               paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
//             }}
//           >
//             <div className="flex items-center gap-2">
//               <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center flex-shrink-0 ring-1 ring-white/10">
//                 {user?.profilePicture ? (
//                   <img
//                     src={user.profilePicture}
//                     alt=""
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-[10px] font-semibold text-white">
//                     {user?.username?.[0]?.toUpperCase()}
//                   </span>
//                 )}
//               </div>
//               <input
//                 type="text"
//                 placeholder="Add a comment…"
//                 className="flex-1 bg-white/8 hover:bg-white/10 focus:bg-white/10 rounded-full px-4 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors duration-150"
//               />
//               <button className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 active:scale-90 transition-all duration-150">
//                 <SendHorizontal size={14} className="text-white ml-0.5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>,
//     document.body,
//   );
// }

// export default PostModal;

// import { useEffect, useState, useRef } from "react";
// import { createPortal } from "react-dom";
// import { SendHorizontal, MoreHorizontal, X, Trash2 } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";
// import fetchData from "../utils/fetchData";

// function PostModal({ post, onClose, onDelete, onDeleteProfilePost }) {
//   const { user } = useAuth();
//   const isOwner = String(user?._id) === String(post.user?._id);
//   const [showMenu, setShowMenu] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [commentsLoading, setCommentsLoading] = useState(true);
//   const [commentsVisible, setCommentsVisible] = useState(false);
//   const [comment, setComment] = useState("");
//   const menuRef = useRef(null);
//   const inputRef = useRef(null);

//   const handleDelete = async () => {
//     const confirmed = window.confirm("Delete this post?");
//     if (!confirmed) return;
//     try {
//       await fetchData(`/api/posts/${post._id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       onDelete?.(post._id);
//       onDeleteProfilePost?.(post._id);
//       onClose();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handlePost = async () => {
//     if (!comment.trim()) return;
//     try {
//       const res = await fetchData(`/api/posts/${post._id}/comments`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ text: comment }),
//       });
//       const data = await res.json();
//       setComments((prev) => [data.comment, ...prev]);
//       setComment("");
//     } catch (err) {
//       console.error("Post comment error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData(`/api/posts/${post._id}/comments`, {
//       credentials: "include",
//     })
//       .then((r) => r.json())
//       .then((data) => {
//         setComments(data.comments || []);
//         setTimeout(() => {
//           setCommentsLoading(false);
//           requestAnimationFrame(() => setCommentsVisible(true));
//         }, 300);
//       })
//       .catch(() => {
//         setCommentsLoading(false);
//         requestAnimationFrame(() => setCommentsVisible(true));
//       });
//   }, [post._id]);

//   useEffect(() => {
//     const scrollY = window.scrollY;
//     const body = document.body;
//     body.style.position = "fixed";
//     body.style.top = `-${scrollY}px`;
//     body.style.width = "100%";
//     body.style.overflow = "hidden";

//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       body.style.position = "";
//       body.style.top = "";
//       body.style.width = "";
//       body.style.overflow = "";
//       window.scrollTo(0, scrollY);
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const Avatar = ({ username, profilePicture, size = 28 }) => (
//     <div
//       style={{
//         width: size,
//         height: size,
//         borderRadius: "50%",
//         overflow: "hidden",
//         flexShrink: 0,
//       }}
//       className="ring-1 ring-white/10"
//     >
//       {profilePicture ? (
//         <img
//           src={profilePicture}
//           alt={username}
//           style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         />
//       ) : (
//         <div
//           style={{
//             width: "100%",
//             height: "100%",
//             background: `hsl(${(username?.charCodeAt(0) * 47) % 360}, 55%, 45%)`,
//           }}
//           className="flex items-center justify-center"
//         >
//           <span
//             style={{ fontSize: size * 0.38, fontWeight: 700, color: "#fff" }}
//           >
//             {username?.[0]?.toUpperCase()}
//           </span>
//         </div>
//       )}
//     </div>
//   );

//   return createPortal(
//     <div
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//       className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center px-0 sm:px-4"
//     >
//       <div
//         className="
//         w-full sm:max-w-4xl
//         h-[92dvh] sm:h-[82vh]
//         bg-[#0a0a0a]
//         border-t border-white/10 sm:border sm:border-white/10
//         sm:rounded-2xl
//         overflow-hidden
//         flex flex-col md:flex-row
//       "
//       >
//         {/* IMAGE PANEL */}
//         <div
//           className="
//           w-full md:w-1/2
//           h-[40%] md:h-full
//           bg-black flex items-center justify-center
//           shrink-0 md:rounded-l-2xl overflow-hidden
//         "
//         >
//           <img
//             src={post.imageUrl}
//             alt=""
//             className="w-full h-full object-contain"
//           />
//         </div>

//         {/* RIGHT PANEL */}
//         <div
//           className="
//           flex flex-col w-full md:w-1/2 flex-1
//           border-t md:border-t-0 md:border-l border-white/10
//           overflow-hidden min-h-0 h-full
//         "
//         >
//           {/* HEADER — never scrolls */}
//           <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-white/10">
//             <Avatar
//               username={post.user?.username}
//               profilePicture={post.user?.profilePicture}
//               size={28}
//             />
//             <span className="text-[13px] font-semibold text-white tracking-wide flex-1 truncate">
//               {post.user?.username}
//             </span>

//             {isOwner && (
//               <div ref={menuRef} className="relative flex-shrink-0">
//                 <button
//                   onClick={() => setShowMenu(!showMenu)}
//                   className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white/70 hover:text-white active:scale-90 transition-all duration-150"
//                 >
//                   <MoreHorizontal size={15} />
//                 </button>
//                 {showMenu && (
//                   <div className="absolute right-0 mt-2 z-30 w-44 rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden">
//                     <button
//                       onClick={handleDelete}
//                       className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-400 hover:text-red-300 hover:bg-white/8 transition-colors duration-150 text-left"
//                     >
//                       <Trash2 size={13} />
//                       Delete post
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             <button
//               onClick={onClose}
//               className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white active:scale-90 transition-all duration-150"
//             >
//               <X size={14} />
//             </button>
//           </div>

//           {/* CAPTION — never scrolls */}
//           {post.caption && (
//             <div className="flex-shrink-0 flex items-start gap-3 px-4 pt-4 pb-3 border-b border-white/[0.06]">
//               <Avatar
//                 username={post.user?.username}
//                 profilePicture={post.user?.profilePicture}
//                 size={28}
//               />
//               <div className="flex flex-col gap-0.5">
//                 <span className="text-[12px] font-semibold text-white/90">
//                   {post.user?.username}
//                 </span>
//                 <p className="text-[13px] text-white/75 leading-relaxed">
//                   {post.caption}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* COMMENTS LABEL — never scrolls */}
//           <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3">
//             <div className="flex-1 h-px bg-white/[0.06]" />
//             <span className="text-[11px] text-white/30 tracking-widest uppercase">
//               comments
//             </span>
//             <div className="flex-1 h-px bg-white/[0.06]" />
//           </div>

//           {/* COMMENTS LIST — only this scrolls */}
//           <div className="flex-1 overflow-y-auto min-h-0 px-4 pb-4">
//             {commentsLoading ? (
//               <div className="flex flex-col gap-4">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="flex gap-3 items-start">
//                     <div
//                       className="w-7 h-7 rounded-full flex-shrink-0"
//                       style={{
//                         background:
//                           "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)",
//                         backgroundSize: "400px 100%",
//                         animation: "shimmer 1.4s ease infinite",
//                       }}
//                     />
//                     <div className="flex flex-col gap-2 flex-1">
//                       <div
//                         style={{
//                           height: 10,
//                           borderRadius: 6,
//                           width: `${[40, 55, 45][i - 1]}%`,
//                           background:
//                             "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)",
//                           backgroundSize: "400px 100%",
//                           animation: "shimmer 1.4s ease infinite",
//                         }}
//                       />
//                       <div
//                         style={{
//                           height: 10,
//                           borderRadius: 6,
//                           width: `${[65, 80, 55][i - 1]}%`,
//                           background:
//                             "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)",
//                           backgroundSize: "400px 100%",
//                           animation: "shimmer 1.4s ease infinite",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div
//                 style={{
//                   opacity: commentsVisible ? 1 : 0,
//                   transform: commentsVisible
//                     ? "translateY(0)"
//                     : "translateY(6px)",
//                   transition: "opacity 0.35s ease, transform 0.35s ease",
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 16,
//                 }}
//               >
//                 {comments.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center py-6 gap-2 text-white/25">
//                     <svg
//                       width="28"
//                       height="28"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//                     </svg>
//                     <p className="text-[12px] tracking-wide">No comments yet</p>
//                   </div>
//                 ) : (
//                   comments.map((c, i) => (
//                     <div
//                       key={c._id}
//                       className="flex items-start gap-3"
//                       style={{
//                         animation: "fadeSlideIn 0.25s ease forwards",
//                         animationDelay: `${i * 40}ms`,
//                         opacity: 0,
//                       }}
//                     >
//                       <Avatar
//                         username={c.user?.username}
//                         profilePicture={c.user?.profilePicture}
//                         size={28}
//                       />
//                       <div className="flex flex-col gap-0.5 flex-1 min-w-0">
//                         <span className="text-[12px] font-semibold text-white/90">
//                           {c.user?.username}
//                         </span>
//                         <p className="text-[13px] text-white/75 leading-relaxed">
//                           {c.text}
//                         </p>
//                         <span className="text-[11px] text-white/30 mt-0.5">
//                           {new Date(c.createdAt).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                           })}
//                         </span>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>

//           {/* COMMENT BAR — never scrolls */}
//           <div
//             className="flex-shrink-0 border-t border-white/10 bg-[#0a0a0a] px-3 py-3"
//             style={{
//               paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
//             }}
//           >
//             <div className="flex items-center gap-2">
//               <Avatar
//                 username={user?.username}
//                 profilePicture={user?.profilePicture}
//                 size={28}
//               />
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handlePost()}
//                 placeholder="Add a comment…"
//                 className="flex-1 bg-white/8 hover:bg-white/10 focus:bg-white/10 rounded-full px-4 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors duration-150"
//               />
//               <button
//                 onClick={handlePost}
//                 className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 active:scale-90 transition-all duration-150"
//               >
//                 <SendHorizontal size={14} className="text-white ml-0.5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes shimmer {
//           0% { background-position: -400px 0; }
//           100% { background-position: 400px 0; }
//         }
//         @keyframes fadeSlideIn {
//           from { opacity: 0; transform: translateY(8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>,
//     document.body,
//   );
// }

// export default PostModal;
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { SendHorizontal, MoreHorizontal, X, Trash2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import fetchData from "../utils/fetchData";

function PostModal({ post, onClose, onDelete, onDeleteProfilePost }) {
  const { user } = useAuth();
  const isOwner = String(user?._id) === String(post.user?._id);
  const [showMenu, setShowMenu] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [activeCommentMenu, setActiveCommentMenu] = useState(null);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) return;
    try {
      await fetchData(`/api/posts/${post._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      onDelete?.(post._id);
      onDeleteProfilePost?.(post._id);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePost = async () => {
    if (!comment.trim()) return;
    try {
      const res = await fetchData(`/api/posts/${post._id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text: comment }),
      });
      const data = await res.json();
      setComments((prev) => [data.comment, ...prev]);
      setComment("");
    } catch (err) {
      console.error("Post comment error:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetchData(
        `/api/posts/${post._id}/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await res.json();
      if (data.success) {
        setComments((prev) => prev.filter((c) => c._id !== commentId));
        setActiveCommentMenu(null);
      }
    } catch (err) {
      console.error("Delete comment error:", err);
    }
  };

  useEffect(() => {
    fetchData(`/api/posts/${post._id}/comments`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setComments(data.comments || []);
        setTimeout(() => {
          setCommentsLoading(false);
          requestAnimationFrame(() => setCommentsVisible(true));
        }, 300);
      })
      .catch(() => {
        setCommentsLoading(false);
        requestAnimationFrame(() => setCommentsVisible(true));
      });
  }, [post._id]);

  useEffect(() => {
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
      if (!e.target.closest("[data-comment-menu]")) {
        setActiveCommentMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollY);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Avatar = ({ username, profilePicture, size = 28 }) => (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
      }}
      className="ring-1 ring-white/10"
    >
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={username}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `hsl(${(username?.charCodeAt(0) * 47) % 360}, 55%, 45%)`,
          }}
          className="flex items-center justify-center"
        >
          <span
            style={{ fontSize: size * 0.38, fontWeight: 700, color: "#fff" }}
          >
            {username?.[0]?.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );

  return createPortal(
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center px-0 sm:px-4"
    >
      <div
        className="
        w-full sm:max-w-4xl
        h-[92dvh] sm:h-[82vh]
        bg-[#0a0a0a]
        border-t border-white/10 sm:border sm:border-white/10
        sm:rounded-2xl
        overflow-hidden
        flex flex-col md:flex-row
      "
      >
        {/* IMAGE PANEL */}
        <div
          className="
          w-full md:w-1/2
          h-[40%] md:h-full
          bg-black flex items-center justify-center
          shrink-0 md:rounded-l-2xl overflow-hidden
        "
        >
          <img
            src={post.imageUrl}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* RIGHT PANEL */}
        <div
          className="
          flex flex-col w-full md:w-1/2 flex-1
          border-t md:border-t-0 md:border-l border-white/10
          overflow-hidden min-h-0 h-full
        "
        >
          {/* HEADER */}
          <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <Avatar
              username={post.user?.username}
              profilePicture={post.user?.profilePicture}
              size={28}
            />
            <span className="text-[13px] font-semibold text-white tracking-wide flex-1 truncate">
              {post.user?.username}
            </span>

            {isOwner && (
              <div ref={menuRef} className="relative flex-shrink-0">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white/70 hover:text-white active:scale-90 transition-all duration-150"
                >
                  <MoreHorizontal size={15} />
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 z-30 w-44 rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden">
                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-400 hover:text-red-300 hover:bg-white/8 transition-colors duration-150 text-left"
                    >
                      <Trash2 size={13} />
                      Delete post
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white active:scale-90 transition-all duration-150"
            >
              <X size={14} />
            </button>
          </div>

          {/* CAPTION */}
          {post.caption && (
            <div className="flex-shrink-0 flex items-start gap-3 px-4 pt-4 pb-3 border-b border-white/[0.06]">
              <Avatar
                username={post.user?.username}
                profilePicture={post.user?.profilePicture}
                size={28}
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] font-semibold text-white/90">
                  {post.user?.username}
                </span>
                <p className="text-[13px] text-white/75 leading-relaxed">
                  {post.caption}
                </p>
              </div>
            </div>
          )}

          {/* COMMENTS LABEL */}
          <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[11px] text-white/30 tracking-widest uppercase">
              comments
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* COMMENTS LIST — only this scrolls */}
          <div className="flex-1 overflow-y-auto min-h-0 px-4 pb-4">
            {commentsLoading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div
                      className="w-7 h-7 rounded-full flex-shrink-0"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)",
                        backgroundSize: "400px 100%",
                        animation: "shimmer 1.4s ease infinite",
                      }}
                    />
                    <div className="flex flex-col gap-2 flex-1">
                      <div
                        style={{
                          height: 10,
                          borderRadius: 6,
                          width: `${[40, 55, 45][i - 1]}%`,
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)",
                          backgroundSize: "400px 100%",
                          animation: "shimmer 1.4s ease infinite",
                        }}
                      />
                      <div
                        style={{
                          height: 10,
                          borderRadius: 6,
                          width: `${[65, 80, 55][i - 1]}%`,
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)",
                          backgroundSize: "400px 100%",
                          animation: "shimmer 1.4s ease infinite",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  opacity: commentsVisible ? 1 : 0,
                  transform: commentsVisible
                    ? "translateY(0)"
                    : "translateY(6px)",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {comments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 gap-2 text-white/25">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <p className="text-[12px] tracking-wide">No comments yet</p>
                  </div>
                ) : (
                  comments.map((c, i) => {
                    const isMyComment =
                      String(user?._id) === String(c.user?._id);
                    return (
                      <div
                        key={c._id}
                        className="flex items-start gap-3 group relative"
                        style={{
                          animation: "fadeSlideIn 0.25s ease forwards",
                          animationDelay: `${i * 40}ms`,
                          opacity: 0,
                        }}
                      >
                        <Avatar
                          username={c.user?.username}
                          profilePicture={c.user?.profilePicture}
                          size={28}
                        />

                        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                          <span className="text-[12px] font-semibold text-white/90">
                            {c.user?.username}
                          </span>
                          <p className="text-[13px] text-white/75 leading-relaxed">
                            {c.text}
                          </p>
                          <span className="text-[11px] text-white/30 mt-0.5">
                            {new Date(c.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        {isMyComment && (
                          <div
                            className="relative flex-shrink-0"
                            data-comment-menu
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveCommentMenu(
                                  activeCommentMenu === c._id ? null : c._id,
                                );
                              }}
                              className="w-6 h-6 flex items-center justify-center rounded-full text-white/20 hover:text-white/60 hover:bg-white/8 opacity-0 group-hover:opacity-100 transition-all duration-150 bg-transparent border-none cursor-pointer"
                            >
                              <MoreHorizontal size={13} />
                            </button>

                            {activeCommentMenu === c._id && (
                              <div
                                className="absolute right-0 mt-1 z-30 w-36 rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden"
                                data-comment-menu
                              >
                                <button
                                  onClick={() => handleDeleteComment(c._id)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] font-medium text-red-400 hover:text-red-300 hover:bg-white/8 transition-colors duration-150 text-left"
                                >
                                  <Trash2 size={12} />
                                  Delete comment
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* COMMENT BAR */}
          <div
            className="flex-shrink-0 border-t border-white/10 bg-[#0a0a0a] px-3 py-3"
            style={{
              paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
            }}
          >
            <div className="flex items-center gap-2">
              <Avatar
                username={user?.username}
                profilePicture={user?.profilePicture}
                size={28}
              />
              <input
                ref={inputRef}
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePost()}
                placeholder="Add a comment…"
                className="flex-1 bg-white/8 hover:bg-white/10 focus:bg-white/10 rounded-full px-4 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors duration-150"
              />
              <button
                onClick={handlePost}
                className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 active:scale-90 transition-all duration-150"
              >
                <SendHorizontal size={14} className="text-white ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>,
    document.body,
  );
}

export default PostModal;