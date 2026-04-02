// import { useEffect, useRef, useState } from "react";

// function PostOptionsSheet({ post, onClose, isOwner }) {
//   const [visible, setVisible] = useState(false);
//   const [dragY, setDragY] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const dragStartY = useRef(null);

//   useEffect(() => {
//     requestAnimationFrame(() => setVisible(true));
//   }, []);

//   const handleClose = () => {
//     setVisible(false);
//     setTimeout(onClose, 320);
//   };

//   const handleTouchStart = (e) => {
//     dragStartY.current = e.touches[0].clientY;
//     setIsDragging(true);
//   };

//   const handleTouchMove = (e) => {
//     if (dragStartY.current === null) return;
//     const delta = e.touches[0].clientY - dragStartY.current;
//     if (delta > 0) setDragY(delta);
//   };

//   const handleTouchEnd = () => {
//     if (dragY > 80) handleClose();
//     else setDragY(0);
//     setIsDragging(false);
//     dragStartY.current = null;
//   };

//   const options = isOwner
//     ? [
//         {
//           label: "Delete post",
//           icon: (
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="3 6 5 6 21 6" />
//               <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//               <path d="M10 11v6M14 11v6" />
//               <path d="M9 6V4h6v2" />
//             </svg>
//           ),
//           color: "#f87171",
//           action: () => {
//             handleClose();
//           },
//         },
//       ]
//     : [
//         {
//           label: "Not interested",
//           icon: (
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="12" cy="12" r="10" />
//               <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//             </svg>
//           ),
//           color: "rgba(255,255,255,0.8)",
//           action: () => {
//             handleClose();
//           },
//         },
//         {
//           label: "Report post",
//           icon: (
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
//               <line x1="4" y1="22" x2="4" y2="15" />
//             </svg>
//           ),
//           color: "#f87171",
//           action: () => {
//             handleClose();
//           },
//         },
//       ];

//   return (
//     <>
//       <style>{`
//         @keyframes fadeSlideInOption {
//           from { opacity: 0; transform: translateY(6px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .post-option-row {
//           opacity: 0;
//           animation: fadeSlideInOption 0.22s ease forwards;
//         }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         onClick={handleClose}
//         style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
//         className="fixed inset-0 bg-black/60 z-[100] md:hidden backdrop-blur-[2px]"
//       />

//       {/* Sheet */}
//       <div
//         className="fixed inset-x-0 bottom-0 z-[101] flex justify-center md:hidden"
//         style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
//       >
//         <div
//           style={{
//             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
//             transition: isDragging
//               ? "none"
//               : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
//             width: "100%",
//             maxWidth: 470,
//             background: "#141414",
//             borderRadius: "16px 16px 0 0",
//             borderTop: "0.5px solid rgba(255,255,255,0.08)",
//             boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
//             overflow: "hidden",
//           }}
//         >
//           {/* Drag handle */}
//           <div
//             style={{
//               padding: "12px 16px 0",
//               cursor: "grab",
//               userSelect: "none",
//             }}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginBottom: 16,
//               }}
//             >
//               <div
//                 style={{
//                   width: 36,
//                   height: 4,
//                   borderRadius: 99,
//                   background: "rgba(255,255,255,0.15)",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Options */}
//           <div style={{ padding: "0 8px 16px" }}>
//             {options.map((opt, i) => (
//               <button
//                 key={opt.label}
//                 className="post-option-row"
//                 onClick={opt.action}
//                 style={{
//                   animationDelay: `${i * 50}ms`,
//                   width: "100%",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 14,
//                   padding: "14px 16px",
//                   borderRadius: 12,
//                   background: "transparent",
//                   border: "none",
//                   cursor: "pointer",
//                   color: opt.color,
//                   textAlign: "left",
//                   transition: "background 0.15s ease",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.background = "transparent")
//                 }
//               >
//                 {opt.icon}
//                 <span style={{ fontSize: 15, fontWeight: 500 }}>
//                   {opt.label}
//                 </span>
//               </button>
//             ))}

//             {/* Cancel */}
//             <button
//               onClick={handleClose}
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 padding: "13px 16px",
//                 marginTop: 4,
//                 borderRadius: 12,
//                 background: "rgba(255,255,255,0.05)",
//                 border: "none",
//                 cursor: "pointer",
//                 color: "rgba(255,255,255,0.4)",
//                 fontSize: 14,
//                 fontWeight: 500,
//                 transition: "background 0.15s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
//               }
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PostOptionsSheet

// import { useEffect, useRef, useState } from "react";

// function PostOptionsSheet({ post, onClose, isOwner }) {
//   const [visible, setVisible] = useState(false);
//   const [dragY, setDragY] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const dragStartY = useRef(null);

//   useEffect(() => {
//     requestAnimationFrame(() => setVisible(true));
//   }, []);

//   const handleClose = () => {
//     setVisible(false);
//     setTimeout(onClose, 320);
//   };

//   const onTouchStart = (e) => {
//     dragStartY.current = e.touches[0].clientY;
//     setIsDragging(true);
//   };
//   const onTouchMove = (e) => {
//     if (dragStartY.current === null) return;
//     const d = e.touches[0].clientY - dragStartY.current;
//     if (d > 0) setDragY(d);
//   };
//   const onTouchEnd = () => {
//     if (dragY > 80) handleClose();
//     else setDragY(0);
//     setIsDragging(false);
//     dragStartY.current = null;
//   };

//   const options = isOwner
//     ? [
//         {
//           label: "Delete post",
//           icon: (
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="3 6 5 6 21 6" />
//               <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//               <path d="M10 11v6M14 11v6" />
//               <path d="M9 6V4h6v2" />
//             </svg>
//           ),
//           color: "#f87171",
//           action: handleClose,
//         },
//       ]
//     : [
//         {
//           label: "Not interested",
//           icon: (
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="12" cy="12" r="10" />
//               <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//             </svg>
//           ),
//           color: "rgba(255,255,255,0.8)",
//           action: handleClose,
//         },
//         {
//           label: "Report post",
//           icon: (
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
//               <line x1="4" y1="22" x2="4" y2="15" />
//             </svg>
//           ),
//           color: "#f87171",
//           action: handleClose,
//         },
//       ];

//   return (
//     <>
//       <style>{`
//         @keyframes pos-fadeUp {
//           from { opacity: 0; transform: translateY(6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .post-option-row {
//           opacity: 0;
//           animation: pos-fadeUp 0.22s ease forwards;
//         }

//         /*
//          * Root: same overshoot trick as CommentsBottomSheet.
//          * padding-bottom:400px + margin-bottom:-400px extends the black
//          * background behind the keyboard/below the viewport so no white
//          * strip is ever visible during animation.
//          */
//         .pos-root {
//           position: fixed;
//           inset: 0;
//           padding-bottom: 400px;
//           margin-bottom: -400px;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-end;
//           z-index: 100;
//           pointer-events: none;
//           background: #000;
//         }

//         /*
//          * Backdrop: flat colour only — NO backdrop-blur.
//          * blur() creates a GPU compositing layer whose boundary with the
//          * screen bottom shows as a white strip on Android.
//          * Extend bottom:-400px to cover the overshoot area.
//          */
//         .pos-backdrop {
//           position: absolute;
//           top: 0; left: 0; right: 0; bottom: -400px;
//           background: rgba(0, 0, 0, 0.6);
//           pointer-events: all;
//           transition: opacity 0.3s ease;
//         }

//         .pos-sheet {
//           position: relative;
//           width: 100%;
//           max-width: 470px;
//           margin: 0 auto;
//           background: #141414;
//           border-radius: 16px 16px 0 0;
//           border-top: 0.5px solid rgba(255,255,255,0.08);
//           box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
//           pointer-events: all;
//           overflow: hidden;
//           box-sizing: border-box;
//           /* safe-area for home bar — flat background so no compositor issue */
//           padding-bottom: env(safe-area-inset-bottom, 0px);
//         }

//         .pos-btn {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           gap: 14px;
//           padding: 14px 16px;
//           border-radius: 12px;
//           background: transparent;
//           border: none;
//           cursor: pointer;
//           text-align: left;
//           transition: background 0.15s ease;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .pos-btn:active { background: rgba(255,255,255,0.05); }

//         .pos-cancel {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 13px 16px;
//           margin-top: 4px;
//           border-radius: 12px;
//           background: rgba(255,255,255,0.05);
//           border: none;
//           cursor: pointer;
//           color: rgba(255,255,255,0.4);
//           font-size: 14px;
//           font-weight: 500;
//           transition: background 0.15s ease;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .pos-cancel:active { background: rgba(255,255,255,0.08); }
//       `}</style>

//       <div className="pos-root md:hidden">
//         {/* Backdrop — flat, no blur */}
//         <div
//           className="pos-backdrop"
//           style={{ opacity: visible ? 1 : 0 }}
//           onClick={handleClose}
//         />

//         {/* Sheet */}
//         <div
//           className="pos-sheet"
//           style={{
//             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
//             transition: isDragging
//               ? "none"
//               : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
//           }}
//         >
//           {/* Drag handle */}
//           <div
//             style={{ padding: "12px 16px 0", userSelect: "none" }}
//             onTouchStart={onTouchStart}
//             onTouchMove={onTouchMove}
//             onTouchEnd={onTouchEnd}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginBottom: 16,
//               }}
//             >
//               <div
//                 style={{
//                   width: 36,
//                   height: 4,
//                   borderRadius: 99,
//                   background: "rgba(255,255,255,0.15)",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Options */}
//           <div style={{ padding: "0 8px 16px" }}>
//             {options.map((opt, i) => (
//               <button
//                 key={opt.label}
//                 className="post-option-row pos-btn"
//                 onClick={opt.action}
//                 style={{ animationDelay: `${i * 50}ms`, color: opt.color }}
//               >
//                 {opt.icon}
//                 <span style={{ fontSize: 15, fontWeight: 500 }}>
//                   {opt.label}
//                 </span>
//               </button>
//             ))}

//             <button className="pos-cancel" onClick={handleClose}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PostOptionsSheet;

// import { useEffect, useRef, useState } from "react";
// import fetchData from "../utils/fetchData";

// const REPORT_REASONS = [
//   "Spam",
//   "Nudity or sexual activity",
//   "Hate speech or symbols",
//   "Violence or dangerous content",
//   "Harassment or bullying",
//   "False information",
// ];

// function PostOptionsSheet({ post, onClose, onHide, isOwner }) {
//   const [visible, setVisible] = useState(false);
//   const [dragY, setDragY] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [view, setView] = useState("menu"); // "menu" | "report" | "done"
//   const [loadingAction, setLoadingAction] = useState(null); // "notInterested" | reason string | null
//   const dragStartY = useRef(null);

//   useEffect(() => {
//     requestAnimationFrame(() => setVisible(true));
//   }, []);

//   const handleClose = () => {
//     setVisible(false);
//     setTimeout(onClose, 320);
//   };

//   // ── Drag to dismiss ──────────────────────────────────────────────────────────
//   const onTouchStart = (e) => {
//     dragStartY.current = e.touches[0].clientY;
//     setIsDragging(true);
//   };
//   const onTouchMove = (e) => {
//     if (dragStartY.current === null) return;
//     const d = e.touches[0].clientY - dragStartY.current;
//     if (d > 0) setDragY(d);
//   };
//   const onTouchEnd = () => {
//     if (dragY > 80) handleClose();
//     else setDragY(0);
//     setIsDragging(false);
//     dragStartY.current = null;
//   };

//   // ── Actions ──────────────────────────────────────────────────────────────────
//   const handleNotInterested = async () => {
//     setLoadingAction("notInterested");
//     try {
//       await fetchData(`/api/posts/${post._id}/not-interested`, {
//         method: "POST",
//         credentials: "include",
//       });
//       onHide?.(post._id);
//       handleClose();
//     } catch (err) {
//       console.error("Not interested error:", err);
//     } finally {
//       setLoadingAction(null);
//     }
//   };

//   const handleReport = async (reason) => {
//     setLoadingAction(reason);
//     try {
//       await fetchData(`/api/posts/${post._id}/report`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ reason }),
//       });
//       setView("done");
//     } catch (err) {
//       console.error("Report error:", err);
//     } finally {
//       setLoadingAction(null);
//     }
//   };

//   // ── Drag handle (shared) ─────────────────────────────────────────────────────
//   const DragHandle = () => (
//     <div
//       style={{ padding: "12px 16px 0", userSelect: "none" }}
//       onTouchStart={onTouchStart}
//       onTouchMove={onTouchMove}
//       onTouchEnd={onTouchEnd}
//     >
//       <div
//         style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
//       >
//         <div
//           style={{
//             width: 36,
//             height: 4,
//             borderRadius: 99,
//             background: "rgba(255,255,255,0.15)",
//           }}
//         />
//       </div>
//     </div>
//   );

//   // ── Spinner ──────────────────────────────────────────────────────────────────
//   const Spinner = () => (
//     <svg
//       width="14"
//       height="14"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="rgba(255,255,255,0.4)"
//       strokeWidth="2"
//       strokeLinecap="round"
//       style={{ animation: "pos-spin 0.8s linear infinite", flexShrink: 0 }}
//     >
//       <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//     </svg>
//   );

//   return (
//     <>
//       <style>{`
//         @keyframes pos-fadeUp {
//           from { opacity: 0; transform: translateY(6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pos-spin { to { transform: rotate(360deg); } }

//         .pos-option-row {
//           opacity: 0;
//           animation: pos-fadeUp 0.22s ease forwards;
//         }

//         .pos-root {
//           position: fixed;
//           inset: 0;
//           padding-bottom: 400px;
//           margin-bottom: -400px;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-end;
//           z-index: 100;
//           pointer-events: none;
//           background: #000;
//         }
//         .pos-backdrop {
//           position: absolute;
//           top: 0; left: 0; right: 0; bottom: -400px;
//           background: rgba(0, 0, 0, 0.6);
//           pointer-events: all;
//           transition: opacity 0.3s ease;
//         }
//         .pos-sheet {
//           position: relative;
//           width: 100%;
//           max-width: 470px;
//           margin: 0 auto;
//           background: #141414;
//           border-radius: 16px 16px 0 0;
//           border-top: 0.5px solid rgba(255,255,255,0.08);
//           box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
//           pointer-events: all;
//           overflow: hidden;
//           box-sizing: border-box;
//           padding-bottom: env(safe-area-inset-bottom, 0px);
//         }
//         .pos-btn {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 14px;
//           padding: 14px 16px;
//           border-radius: 12px;
//           background: transparent;
//           border: none;
//           cursor: pointer;
//           text-align: left;
//           transition: background 0.15s ease;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .pos-btn:active { background: rgba(255,255,255,0.05); }
//         .pos-btn:disabled { cursor: default; }

//         .pos-cancel {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 13px 16px;
//           margin-top: 4px;
//           border-radius: 12px;
//           background: rgba(255,255,255,0.05);
//           border: none;
//           cursor: pointer;
//           color: rgba(255,255,255,0.4);
//           font-size: 14px;
//           font-weight: 500;
//           transition: background 0.15s ease;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .pos-cancel:active { background: rgba(255,255,255,0.08); }

//         .pos-divider {
//           border: none;
//           border-top: 0.5px solid rgba(255,255,255,0.06);
//           margin: 0;
//         }
//       `}</style>

//       <div className="pos-root md:hidden">
//         <div
//           className="pos-backdrop"
//           style={{ opacity: visible ? 1 : 0 }}
//           onClick={handleClose}
//         />

//         <div
//           className="pos-sheet"
//           style={{
//             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
//             transition: isDragging
//               ? "none"
//               : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
//           }}
//         >
//           {/* ── OWNER MENU ─────────────────────────────────────────────────────── */}
//           {isOwner && (
//             <>
//               <DragHandle />
//               <div style={{ padding: "0 8px 16px" }}>
//                 <button
//                   className="pos-option-row pos-btn"
//                   onClick={handleClose}
//                   style={{ color: "#f87171" }}
//                 >
//                   <span
//                     style={{ display: "flex", alignItems: "center", gap: 14 }}
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <polyline points="3 6 5 6 21 6" />
//                       <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//                       <path d="M10 11v6M14 11v6" />
//                       <path d="M9 6V4h6v2" />
//                     </svg>
//                     <span style={{ fontSize: 15, fontWeight: 500 }}>
//                       Delete post
//                     </span>
//                   </span>
//                 </button>
//                 <button className="pos-cancel" onClick={handleClose}>
//                   Cancel
//                 </button>
//               </div>
//             </>
//           )}

//           {/* ── NON-OWNER MAIN MENU ────────────────────────────────────────────── */}
//           {!isOwner && view === "menu" && (
//             <>
//               <DragHandle />
//               <div style={{ padding: "0 8px 16px" }}>
//                 {/* Not interested */}
//                 <button
//                   className="pos-option-row pos-btn"
//                   onClick={() => !loadingAction && handleNotInterested()}
//                   disabled={!!loadingAction}
//                   style={{
//                     color: "rgba(255,255,255,0.8)",
//                     opacity:
//                       loadingAction && loadingAction !== "notInterested"
//                         ? 0.4
//                         : 1,
//                   }}
//                 >
//                   <span
//                     style={{ display: "flex", alignItems: "center", gap: 14 }}
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <circle cx="12" cy="12" r="10" />
//                       <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//                     </svg>
//                     <span style={{ fontSize: 15, fontWeight: 500 }}>
//                       Not interested
//                     </span>
//                   </span>
//                   {loadingAction === "notInterested" && <Spinner />}
//                 </button>

//                 <hr className="pos-divider" />

//                 {/* Report */}
//                 <button
//                   className="pos-option-row pos-btn"
//                   onClick={() => !loadingAction && setView("report")}
//                   disabled={!!loadingAction}
//                   style={{
//                     color: "#f87171",
//                     animationDelay: "50ms",
//                     opacity:
//                       loadingAction && loadingAction !== "report" ? 0.4 : 1,
//                   }}
//                 >
//                   <span
//                     style={{ display: "flex", alignItems: "center", gap: 14 }}
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
//                       <line x1="4" y1="22" x2="4" y2="15" />
//                     </svg>
//                     <span style={{ fontSize: 15, fontWeight: 500 }}>
//                       Report post
//                     </span>
//                   </span>
//                 </button>

//                 <button className="pos-cancel" onClick={handleClose}>
//                   Cancel
//                 </button>
//               </div>
//             </>
//           )}

//           {/* ── REPORT REASONS ────────────────────────────────────────────────── */}
//           {!isOwner && view === "report" && (
//             <>
//               {/* Header with back button — not draggable so user can't accidentally dismiss */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   padding: "14px 16px",
//                   borderBottom: "0.5px solid rgba(255,255,255,0.06)",
//                 }}
//               >
//                 <button
//                   onClick={() => setView("menu")}
//                   style={{
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     padding: 4,
//                     color: "rgba(255,255,255,0.45)",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <polyline points="15 18 9 12 15 6" />
//                   </svg>
//                 </button>
//                 <span
//                   style={{
//                     color: "rgba(255,255,255,0.7)",
//                     fontSize: 14,
//                     fontWeight: 600,
//                   }}
//                 >
//                   Why are you reporting this?
//                 </span>
//               </div>

//               <div style={{ padding: "4px 8px 16px" }}>
//                 {REPORT_REASONS.map((reason, i) => (
//                   <button
//                     key={reason}
//                     className="pos-btn"
//                     onClick={() => !loadingAction && handleReport(reason)}
//                     disabled={!!loadingAction}
//                     style={{
//                       color: "rgba(255,255,255,0.8)",
//                       fontSize: 14,
//                       fontWeight: 400,
//                       opacity:
//                         loadingAction && loadingAction !== reason ? 0.4 : 1,
//                     }}
//                   >
//                     <span>{reason}</span>
//                     {loadingAction === reason && <Spinner />}
//                   </button>
//                 ))}
//                 <button className="pos-cancel" onClick={handleClose}>
//                   Cancel
//                 </button>
//               </div>
//             </>
//           )}

//           {/* ── DONE / CONFIRMATION ───────────────────────────────────────────── */}
//           {!isOwner && view === "done" && (
//             <div
//               style={{
//                 padding: "32px 24px",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: 8,
//               }}
//             >
//               <svg
//                 width="36"
//                 height="36"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#4ade80"
//                 strokeWidth="1.8"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 style={{ marginBottom: 4 }}
//               >
//                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//                 <polyline points="22 4 12 14.01 9 11.01" />
//               </svg>
//               <p
//                 style={{
//                   color: "rgba(255,255,255,0.9)",
//                   fontSize: 15,
//                   fontWeight: 600,
//                   margin: 0,
//                 }}
//               >
//                 Report submitted
//               </p>
//               <p
//                 style={{
//                   color: "rgba(255,255,255,0.4)",
//                   fontSize: 13,
//                   margin: 0,
//                   textAlign: "center",
//                   lineHeight: 1.5,
//                 }}
//               >
//                 Thanks for helping keep this community safe.
//               </p>
//               <button
//                 className="pos-cancel"
//                 onClick={handleClose}
//                 style={{ marginTop: 12 }}
//               >
//                 Done
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default PostOptionsSheet;

// import { useEffect, useRef, useState } from "react";
// import fetchData from "../utils/fetchData";

// const REPORT_REASONS = [
//   "Spam",
//   "Nudity or sexual activity",
//   "Hate speech or symbols",
//   "Violence or dangerous content",
//   "Harassment or bullying",
//   "False information",
// ];

// function PostOptionsSheet({ post, onClose, onHide, isOwner }) {
//   const [visible, setVisible] = useState(false);
//   const [dragY, setDragY] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [view, setView] = useState("menu"); // "menu" | "report" | "done"
//   const [loadingAction, setLoadingAction] = useState(null); // "notInterested" | reason string | null
//   const dragStartY = useRef(null);

//   useEffect(() => {
//     requestAnimationFrame(() => setVisible(true));
//   }, []);

//   const handleClose = () => {
//     setVisible(false);
//     setTimeout(onClose, 320);
//   };

//   // ── Drag to dismiss ──────────────────────────────────────────────────────────
//   const onTouchStart = (e) => {
//     dragStartY.current = e.touches[0].clientY;
//     setIsDragging(true);
//   };
//   const onTouchMove = (e) => {
//     if (dragStartY.current === null) return;
//     const d = e.touches[0].clientY - dragStartY.current;
//     if (d > 0) setDragY(d);
//   };
//   const onTouchEnd = () => {
//     if (dragY > 80) handleClose();
//     else setDragY(0);
//     setIsDragging(false);
//     dragStartY.current = null;
//   };

//   // ── Actions ──────────────────────────────────────────────────────────────────
//   const handleNotInterested = async () => {
//     setLoadingAction("notInterested");
//     try {
//       await fetchData(`/api/posts/${post._id}/not-interested`, {
//         method: "POST",
//         credentials: "include",
//       });
//       onHide?.(post._id);
//       handleClose();
//     } catch (err) {
//       console.error("Not interested error:", err);
//     } finally {
//       setLoadingAction(null);
//     }
//   };

//   const handleReport = async (reason) => {
//     setLoadingAction(reason);
//     try {
//       await fetchData(`/api/posts/${post._id}/report`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ reason }),
//       });
//       onHide?.(post._id);
//       setView("done");
//     } catch (err) {
//       console.error("Report error:", err);
//     } finally {
//       setLoadingAction(null);
//     }
//   };

//   // ── Drag handle (shared) ─────────────────────────────────────────────────────
//   const DragHandle = () => (
//     <div
//       style={{ padding: "12px 16px 0", userSelect: "none" }}
//       onTouchStart={onTouchStart}
//       onTouchMove={onTouchMove}
//       onTouchEnd={onTouchEnd}
//     >
//       <div
//         style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
//       >
//         <div
//           style={{
//             width: 36,
//             height: 4,
//             borderRadius: 99,
//             background: "rgba(255,255,255,0.15)",
//           }}
//         />
//       </div>
//     </div>
//   );

//   // ── Spinner ──────────────────────────────────────────────────────────────────
//   const Spinner = () => (
//     <svg
//       width="14"
//       height="14"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="rgba(255,255,255,0.4)"
//       strokeWidth="2"
//       strokeLinecap="round"
//       style={{ animation: "pos-spin 0.8s linear infinite", flexShrink: 0 }}
//     >
//       <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//     </svg>
//   );

//   return (
//     <>
//       <style>{`
//         @keyframes pos-fadeUp {
//           from { opacity: 0; transform: translateY(6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pos-spin { to { transform: rotate(360deg); } }

//         .pos-option-row {
//           opacity: 0;
//           animation: pos-fadeUp 0.22s ease forwards;
//         }

//         .pos-root {
//           position: fixed;
//           inset: 0;
//           padding-bottom: 400px;
//           margin-bottom: -400px;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-end;
//           z-index: 100;
//           pointer-events: none;
//           background: #000;
//         }
//         .pos-backdrop {
//           position: absolute;
//           top: 0; left: 0; right: 0; bottom: -400px;
//           background: rgba(0, 0, 0, 0.6);
//           pointer-events: all;
//           transition: opacity 0.3s ease;
//         }
//         .pos-sheet {
//           position: relative;
//           width: 100%;
//           max-width: 470px;
//           margin: 0 auto;
//           background: #141414;
//           border-radius: 16px 16px 0 0;
//           border-top: 0.5px solid rgba(255,255,255,0.08);
//           box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
//           pointer-events: all;
//           overflow: hidden;
//           box-sizing: border-box;
//           padding-bottom: env(safe-area-inset-bottom, 0px);
//         }
//         .pos-btn {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 14px;
//           padding: 14px 16px;
//           border-radius: 12px;
//           background: transparent;
//           border: none;
//           cursor: pointer;
//           text-align: left;
//           transition: background 0.15s ease;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .pos-btn:active { background: rgba(255,255,255,0.05); }
//         .pos-btn:disabled { cursor: default; }

//         .pos-cancel {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 13px 16px;
//           margin-top: 4px;
//           border-radius: 12px;
//           background: rgba(255,255,255,0.05);
//           border: none;
//           cursor: pointer;
//           color: rgba(255,255,255,0.4);
//           font-size: 14px;
//           font-weight: 500;
//           transition: background 0.15s ease;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .pos-cancel:active { background: rgba(255,255,255,0.08); }

//         .pos-divider {
//           border: none;
//           border-top: 0.5px solid rgba(255,255,255,0.06);
//           margin: 0;
//         }
//       `}</style>

//       <div className="pos-root md:hidden">
//         <div
//           className="pos-backdrop"
//           style={{ opacity: visible ? 1 : 0 }}
//           onClick={handleClose}
//         />

//         <div
//           className="pos-sheet"
//           style={{
//             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
//             transition: isDragging
//               ? "none"
//               : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
//           }}
//         >
//           {/* ── OWNER MENU ─────────────────────────────────────────────────────── */}
//           {isOwner && (
//             <>
//               <DragHandle />
//               <div style={{ padding: "0 8px 16px" }}>
//                 <button
//                   className="pos-option-row pos-btn"
//                   onClick={handleClose}
//                   style={{ color: "#f87171" }}
//                 >
//                   <span
//                     style={{ display: "flex", alignItems: "center", gap: 14 }}
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <polyline points="3 6 5 6 21 6" />
//                       <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//                       <path d="M10 11v6M14 11v6" />
//                       <path d="M9 6V4h6v2" />
//                     </svg>
//                     <span style={{ fontSize: 15, fontWeight: 500 }}>
//                       Delete post
//                     </span>
//                   </span>
//                 </button>
//                 <button className="pos-cancel" onClick={handleClose}>
//                   Cancel
//                 </button>
//               </div>
//             </>
//           )}

//           {/* ── NON-OWNER MAIN MENU ────────────────────────────────────────────── */}
//           {!isOwner && view === "menu" && (
//             <>
//               <DragHandle />
//               <div style={{ padding: "0 8px 16px" }}>
//                 {/* Not interested */}
//                 <button
//                   className="pos-option-row pos-btn"
//                   onClick={() => !loadingAction && handleNotInterested()}
//                   disabled={!!loadingAction}
//                   style={{
//                     color: "rgba(255,255,255,0.8)",
//                     opacity:
//                       loadingAction && loadingAction !== "notInterested"
//                         ? 0.4
//                         : 1,
//                   }}
//                 >
//                   <span
//                     style={{ display: "flex", alignItems: "center", gap: 14 }}
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <circle cx="12" cy="12" r="10" />
//                       <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//                     </svg>
//                     <span style={{ fontSize: 15, fontWeight: 500 }}>
//                       Not interested
//                     </span>
//                   </span>
//                   {loadingAction === "notInterested" && <Spinner />}
//                 </button>

//                 <hr className="pos-divider" />

//                 {/* Report */}
//                 <button
//                   className="pos-option-row pos-btn"
//                   onClick={() => !loadingAction && setView("report")}
//                   disabled={!!loadingAction}
//                   style={{
//                     color: "#f87171",
//                     animationDelay: "50ms",
//                     opacity:
//                       loadingAction && loadingAction !== "report" ? 0.4 : 1,
//                   }}
//                 >
//                   <span
//                     style={{ display: "flex", alignItems: "center", gap: 14 }}
//                   >
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
//                       <line x1="4" y1="22" x2="4" y2="15" />
//                     </svg>
//                     <span style={{ fontSize: 15, fontWeight: 500 }}>
//                       Report post
//                     </span>
//                   </span>
//                 </button>

//                 <button className="pos-cancel" onClick={handleClose}>
//                   Cancel
//                 </button>
//               </div>
//             </>
//           )}

//           {/* ── REPORT REASONS ────────────────────────────────────────────────── */}
//           {!isOwner && view === "report" && (
//             <>
//               {/* Header with back button — not draggable so user can't accidentally dismiss */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   padding: "14px 16px",
//                   borderBottom: "0.5px solid rgba(255,255,255,0.06)",
//                 }}
//               >
//                 <button
//                   onClick={() => setView("menu")}
//                   style={{
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     padding: 4,
//                     color: "rgba(255,255,255,0.45)",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <polyline points="15 18 9 12 15 6" />
//                   </svg>
//                 </button>
//                 <span
//                   style={{
//                     color: "rgba(255,255,255,0.7)",
//                     fontSize: 14,
//                     fontWeight: 600,
//                   }}
//                 >
//                   Why are you reporting this?
//                 </span>
//               </div>

//               <div style={{ padding: "4px 8px 16px" }}>
//                 {REPORT_REASONS.map((reason, i) => (
//                   <button
//                     key={reason}
//                     className="pos-btn"
//                     onClick={() => !loadingAction && handleReport(reason)}
//                     disabled={!!loadingAction}
//                     style={{
//                       color: "rgba(255,255,255,0.8)",
//                       fontSize: 14,
//                       fontWeight: 400,
//                       opacity:
//                         loadingAction && loadingAction !== reason ? 0.4 : 1,
//                     }}
//                   >
//                     <span>{reason}</span>
//                     {loadingAction === reason && <Spinner />}
//                   </button>
//                 ))}
//                 <button className="pos-cancel" onClick={handleClose}>
//                   Cancel
//                 </button>
//               </div>
//             </>
//           )}

//           {/* ── DONE / CONFIRMATION ───────────────────────────────────────────── */}
//           {!isOwner && view === "done" && (
//             <div
//               style={{
//                 padding: "32px 24px",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: 8,
//               }}
//             >
//               <svg
//                 width="36"
//                 height="36"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#4ade80"
//                 strokeWidth="1.8"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 style={{ marginBottom: 4 }}
//               >
//                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//                 <polyline points="22 4 12 14.01 9 11.01" />
//               </svg>
//               <p
//                 style={{
//                   color: "rgba(255,255,255,0.9)",
//                   fontSize: 15,
//                   fontWeight: 600,
//                   margin: 0,
//                 }}
//               >
//                 Report submitted
//               </p>
//               <p
//                 style={{
//                   color: "rgba(255,255,255,0.4)",
//                   fontSize: 13,
//                   margin: 0,
//                   textAlign: "center",
//                   lineHeight: 1.5,
//                 }}
//               >
//                 Thanks for helping keep this community safe.
//               </p>
//               <button
//                 className="pos-cancel"
//                 onClick={handleClose}
//                 style={{ marginTop: 12 }}
//               >
//                 Done
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default PostOptionsSheet;

import { useEffect, useRef, useState } from "react";
import fetchData from "../utils/fetchData";

const REPORT_REASONS = [
  "Spam",
  "Nudity or sexual activity",
  "Hate speech or symbols",
  "Violence or dangerous content",
  "Harassment or bullying",
  "False information",
];

function PostOptionsSheet({ post, onClose, onHide, isOwner }) {
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [view, setView] = useState("menu"); // "menu" | "report" | "done"
  const [loadingAction, setLoadingAction] = useState(null); // "notInterested" | reason string | null
  const dragStartY = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  // ── Drag to dismiss ──────────────────────────────────────────────────────────
  const onTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };
  const onTouchMove = (e) => {
    if (dragStartY.current === null) return;
    const d = e.touches[0].clientY - dragStartY.current;
    if (d > 0) setDragY(d);
  };
  const onTouchEnd = () => {
    if (dragY > 80) handleClose();
    else setDragY(0);
    setIsDragging(false);
    dragStartY.current = null;
  };

  // ── Actions ──────────────────────────────────────────────────────────────────
  const handleNotInterested = async () => {
    setLoadingAction("notInterested");
    try {
      await fetchData(`/api/posts/${post._id}/not-interested`, {
        method: "POST",
        credentials: "include",
      });
      onHide?.(post._id);
      handleClose();
    } catch (err) {
      console.error("Not interested error:", err);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleReport = async (reason) => {
    setLoadingAction(reason);
    try {
      await fetchData(`/api/posts/${post._id}/report`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      setView("done"); // show confirmation first, onHide fires when user taps Done
    } catch (err) {
      console.error("Report error:", err);
    } finally {
      setLoadingAction(null);
    }
  };

  // ── Drag handle (shared) ─────────────────────────────────────────────────────
  const DragHandle = () => (
    <div
      style={{ padding: "12px 16px 0", userSelect: "none" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
      >
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 99,
            background: "rgba(255,255,255,0.15)",
          }}
        />
      </div>
    </div>
  );

  // ── Spinner ──────────────────────────────────────────────────────────────────
  const Spinner = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ animation: "pos-spin 0.8s linear infinite", flexShrink: 0 }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );

  return (
    <>
      <style>{`
        @keyframes pos-fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pos-spin { to { transform: rotate(360deg); } }

        .pos-option-row {
          opacity: 0;
          animation: pos-fadeUp 0.22s ease forwards;
        }

        .pos-root {
          position: fixed;
          inset: 0;
          padding-bottom: 400px;
          margin-bottom: -400px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 100;
          pointer-events: none;
          background: #000;
        }
        .pos-backdrop {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: -400px;
          background: rgba(0, 0, 0, 0.6);
          pointer-events: all;
          transition: opacity 0.3s ease;
        }
        .pos-sheet {
          position: relative;
          width: 100%;
          max-width: 470px;
          margin: 0 auto;
          background: #141414;
          border-radius: 16px 16px 0 0;
          border-top: 0.5px solid rgba(255,255,255,0.08);
          box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
          pointer-events: all;
          overflow: hidden;
          box-sizing: border-box;
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        .pos-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 12px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .pos-btn:active { background: rgba(255,255,255,0.05); }
        .pos-btn:disabled { cursor: default; }

        .pos-cancel {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 13px 16px;
          margin-top: 4px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.4);
          font-size: 14px;
          font-weight: 500;
          transition: background 0.15s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .pos-cancel:active { background: rgba(255,255,255,0.08); }

        .pos-divider {
          border: none;
          border-top: 0.5px solid rgba(255,255,255,0.06);
          margin: 0;
        }
      `}</style>

      <div className="pos-root md:hidden">
        <div
          className="pos-backdrop"
          style={{ opacity: visible ? 1 : 0 }}
          onClick={handleClose}
        />

        <div
          className="pos-sheet"
          style={{
            transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
            transition: isDragging
              ? "none"
              : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
          }}
        >
          {/* ── OWNER MENU ─────────────────────────────────────────────────────── */}
          {isOwner && (
            <>
              <DragHandle />
              <div style={{ padding: "0 8px 16px" }}>
                <button
                  className="pos-option-row pos-btn"
                  onClick={handleClose}
                  style={{ color: "#f87171" }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>
                      Delete post
                    </span>
                  </span>
                </button>
                <button className="pos-cancel" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* ── NON-OWNER MAIN MENU ────────────────────────────────────────────── */}
          {!isOwner && view === "menu" && (
            <>
              <DragHandle />
              <div style={{ padding: "0 8px 16px" }}>
                {/* Not interested */}
                <button
                  className="pos-option-row pos-btn"
                  onClick={() => !loadingAction && handleNotInterested()}
                  disabled={!!loadingAction}
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    opacity:
                      loadingAction && loadingAction !== "notInterested"
                        ? 0.4
                        : 1,
                  }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    </svg>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>
                      Not interested
                    </span>
                  </span>
                  {loadingAction === "notInterested" && <Spinner />}
                </button>

                <hr className="pos-divider" />

                {/* Report */}
                <button
                  className="pos-option-row pos-btn"
                  onClick={() => !loadingAction && setView("report")}
                  disabled={!!loadingAction}
                  style={{
                    color: "#f87171",
                    animationDelay: "50ms",
                    opacity:
                      loadingAction && loadingAction !== "report" ? 0.4 : 1,
                  }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                      <line x1="4" y1="22" x2="4" y2="15" />
                    </svg>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>
                      Report post
                    </span>
                  </span>
                </button>

                <button className="pos-cancel" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* ── REPORT REASONS ────────────────────────────────────────────────── */}
          {!isOwner && view === "report" && (
            <>
              {/* Header with back button — not draggable so user can't accidentally dismiss */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 16px",
                  borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                }}
              >
                <button
                  onClick={() => setView("menu")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                    color: "rgba(255,255,255,0.45)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <span
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Why are you reporting this?
                </span>
              </div>

              <div style={{ padding: "4px 8px 16px" }}>
                {REPORT_REASONS.map((reason, i) => (
                  <button
                    key={reason}
                    className="pos-btn"
                    onClick={() => !loadingAction && handleReport(reason)}
                    disabled={!!loadingAction}
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: 14,
                      fontWeight: 400,
                      opacity:
                        loadingAction && loadingAction !== reason ? 0.4 : 1,
                    }}
                  >
                    <span>{reason}</span>
                    {loadingAction === reason && <Spinner />}
                  </button>
                ))}
                <button className="pos-cancel" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* ── DONE / CONFIRMATION ───────────────────────────────────────────── */}
          {!isOwner && view === "done" && (
            <div
              style={{
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4ade80"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginBottom: 4 }}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 15,
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                Report submitted
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 13,
                  margin: 0,
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                Thanks for helping keep this community safe.
              </p>
              <button
                className="pos-cancel"
                onClick={() => {
                  onHide?.(post._id);
                  handleClose();
                }}
                style={{ marginTop: 12 }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PostOptionsSheet;