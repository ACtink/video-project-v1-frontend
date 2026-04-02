// // //

// // import { useEffect } from "react";

// // function PostOptionsPopup({ post, onClose, isOwner, anchorRef }) {
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (anchorRef.current && !anchorRef.current.contains(e.target)) {
// //         onClose();
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const options = isOwner
// //     ? [
// //         {
// //           label: "Not interested",
// //           color: "rgba(255,255,255,0.8)",
// //           icon: (
// //             <svg
// //               width="14"
// //               height="14"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="1.8"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             >
// //               <circle cx="12" cy="12" r="10" />
// //               <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
// //             </svg>
// //           ),
// //           action: onClose,
// //         },
// //         {
// //           label: "Report post",
// //           color: "#f87171",
// //           icon: (
// //             <svg
// //               width="14"
// //               height="14"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="1.8"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             >
// //               <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
// //               <line x1="4" y1="22" x2="4" y2="15" />
// //             </svg>
// //           ),
// //           action: onClose,
// //         },
// //       ]
// //     : [
// //         {
// //           label: "Delete post",
// //           color: "#f87171",
// //           icon: (
// //             <svg
// //               width="14"
// //               height="14"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="1.8"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             >
// //               <polyline points="3 6 5 6 21 6" />
// //               <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
// //               <path d="M10 11v6M14 11v6M9 6V4h6v2" />
// //             </svg>
// //           ),
// //           action: onClose,
// //         },
// //       ];

// //   return (
// //     <div
// //       style={{
// //         position: "absolute",
// //         right: 0,
// //         top: 36,
// //         zIndex: 50,
// //         width: 180,
// //         borderRadius: 12,
// //         background: "#1f1f1f",
// //         border: "0.5px solid rgba(255,255,255,0.1)",
// //         boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
// //         overflow: "hidden",
// //         animation: "fadeSlideInOption 0.18s ease forwards",
// //       }}
// //     >
// //       {options.map((opt, i) => (
// //         <button
// //           key={opt.label}
// //           onClick={opt.action}
// //           style={{
// //             width: "100%",
// //             display: "flex",
// //             alignItems: "center",
// //             gap: 10,
// //             padding: "10px 14px",
// //             background: "transparent",
// //             border: "none",
// //             cursor: "pointer",
// //             color: opt.color,
// //             fontSize: 13,
// //             fontWeight: 500,
// //             textAlign: "left",
// //             transition: "background 0.15s ease",
// //             borderBottom:
// //               i < options.length - 1
// //                 ? "0.5px solid rgba(255,255,255,0.06)"
// //                 : "none",
// //           }}
// //           onMouseEnter={(e) =>
// //             (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
// //           }
// //           onMouseLeave={(e) =>
// //             (e.currentTarget.style.background = "transparent")
// //           }
// //         >
// //           {opt.icon}
// //           {opt.label}
// //         </button>
// //       ))}
// //     </div>
// //   );
// // }

// // export default PostOptionsPopup;

// // import { useEffect } from "react";

// // function PostOptionsPopup({ post, onClose, isOwner, anchorRef }) {
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (anchorRef.current && !anchorRef.current.contains(e.target)) {
// //         onClose();
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   if (isOwner) return null;

// //   const options = [
// //     {
// //       label: "Not interested",
// //       color: "rgba(255,255,255,0.8)",
// //       icon: (
// //         <svg
// //           width="14"
// //           height="14"
// //           viewBox="0 0 24 24"
// //           fill="none"
// //           stroke="currentColor"
// //           strokeWidth="1.8"
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //         >
// //           <circle cx="12" cy="12" r="10" />
// //           <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
// //         </svg>
// //       ),
// //       action: onClose,
// //     },
// //     {
// //       label: "Report post",
// //       color: "#f87171",
// //       icon: (
// //         <svg
// //           width="14"
// //           height="14"
// //           viewBox="0 0 24 24"
// //           fill="none"
// //           stroke="currentColor"
// //           strokeWidth="1.8"
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //         >
// //           <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
// //           <line x1="4" y1="22" x2="4" y2="15" />
// //         </svg>
// //       ),
// //       action: onClose,
// //     },
// //   ];

// //   return (
// //     <div
// //       style={{
// //         position: "absolute",
// //         right: 0,
// //         top: 36,
// //         zIndex: 50,
// //         width: 180,
// //         borderRadius: 12,
// //         background: "#1f1f1f",
// //         border: "0.5px solid rgba(255,255,255,0.1)",
// //         boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
// //         overflow: "hidden",
// //         animation: "fadeSlideInOption 0.18s ease forwards",
// //       }}
// //     >
// //       {options.map((opt, i) => (
// //         <button
// //           key={opt.label}
// //           onClick={opt.action}
// //           style={{
// //             width: "100%",
// //             display: "flex",
// //             alignItems: "center",
// //             gap: 10,
// //             padding: "10px 14px",
// //             background: "transparent",
// //             border: "none",
// //             cursor: "pointer",
// //             color: opt.color,
// //             fontSize: 13,
// //             fontWeight: 500,
// //             textAlign: "left",
// //             transition: "background 0.15s ease",
// //             borderBottom:
// //               i < options.length - 1
// //                 ? "0.5px solid rgba(255,255,255,0.06)"
// //                 : "none",
// //           }}
// //           onMouseEnter={(e) =>
// //             (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
// //           }
// //           onMouseLeave={(e) =>
// //             (e.currentTarget.style.background = "transparent")
// //           }
// //         >
// //           {opt.icon}
// //           {opt.label}
// //         </button>
// //       ))}
// //     </div>
// //   );
// // }

// // export default PostOptionsPopup;

// // import { useEffect, useState } from "react";
// // import fetchData from "../utils/fetchData";

// // const REPORT_REASONS = [
// //   "Spam",
// //   "Nudity or sexual activity",
// //   "Hate speech or symbols",
// //   "Violence or dangerous content",
// //   "Harassment or bullying",
// //   "False information",
// // ];

// // function PostOptionsPopup({ post, onClose, onHide, isOwner, anchorRef }) {
// //   const [view, setView] = useState("menu"); // "menu" | "report" | "done"
// //   const [loadingAction, setLoadingAction] = useState(null); // "notInterested" | reason string | null

// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (anchorRef.current && !anchorRef.current.contains(e.target)) onClose();
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   if (isOwner) return null;

// //   const handleNotInterested = async () => {
// //     setLoadingAction("notInterested");
// //     try {
// //       await fetchData(`/api/posts/${post._id}/not-interested`, {
// //         method: "POST",
// //         credentials: "include",
// //       });
// //       onHide?.(post._id); // remove from feed instantly
// //       onClose();
// //     } catch (err) {
// //       console.error("Not interested error:", err);
// //     } finally {
// //       setLoadingAction(null);
// //     }
// //   };

// //   const handleReport = async (reason) => {
// //     setLoadingAction(reason);
// //     try {
// //       await fetchData(`/api/posts/${post._id}/report`, {
// //         method: "POST",
// //         credentials: "include",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ reason }),
// //       });
// //       onHide?.(post._id);
// //       setView("done");
// //     } catch (err) {
// //       console.error("Report error:", err);
// //     } finally {
// //       setLoadingAction(null);
// //     }
// //   };

// //   const base = {
// //     position: "absolute",
// //     right: 0,
// //     top: 36,
// //     zIndex: 50,
// //     borderRadius: 12,
// //     background: "#1a1a1a",
// //     border: "0.5px solid rgba(255,255,255,0.1)",
// //     boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
// //     overflow: "hidden",
// //     animation: "fadeSlideInOption 0.18s ease forwards",
// //   };

// //   /* ── CONFIRMATION ── */
// //   if (view === "done") {
// //     return (
// //       <div
// //         style={{
// //           ...base,
// //           width: 200,
// //           padding: "16px 14px",
// //           textAlign: "center",
// //         }}
// //       >
// //         <svg
// //           width="28"
// //           height="28"
// //           viewBox="0 0 24 24"
// //           fill="none"
// //           stroke="#4ade80"
// //           strokeWidth="1.8"
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //           style={{ margin: "0 auto 8px" }}
// //         >
// //           <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
// //           <polyline points="22 4 12 14.01 9 11.01" />
// //         </svg>
// //         <p
// //           style={{
// //             color: "rgba(255,255,255,0.9)",
// //             fontSize: 13,
// //             fontWeight: 600,
// //             marginBottom: 4,
// //           }}
// //         >
// //           Report submitted
// //         </p>
// //         <p
// //           style={{
// //             color: "rgba(255,255,255,0.4)",
// //             fontSize: 12,
// //             marginBottom: 12,
// //             lineHeight: 1.5,
// //           }}
// //         >
// //           Thanks for helping keep this community safe.
// //         </p>
// //         <button
// //           onClick={onClose}
// //           style={{
// //             background: "rgba(255,255,255,0.08)",
// //             border: "none",
// //             borderRadius: 8,
// //             color: "rgba(255,255,255,0.7)",
// //             fontSize: 12,
// //             padding: "6px 20px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           Done
// //         </button>
// //       </div>
// //     );
// //   }

// //   /* ── REPORT REASONS ── */
// //   if (view === "report") {
// //     return (
// //       <div style={{ ...base, width: 250 }}>
// //         <div
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             gap: 8,
// //             padding: "10px 14px",
// //             borderBottom: "0.5px solid rgba(255,255,255,0.06)",
// //           }}
// //         >
// //           <button
// //             onClick={() => setView("menu")}
// //             style={{
// //               background: "none",
// //               border: "none",
// //               cursor: "pointer",
// //               padding: 0,
// //               color: "rgba(255,255,255,0.45)",
// //               display: "flex",
// //               alignItems: "center",
// //             }}
// //           >
// //             <svg
// //               width="14"
// //               height="14"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             >
// //               <polyline points="15 18 9 12 15 6" />
// //             </svg>
// //           </button>
// //           <span
// //             style={{
// //               color: "rgba(255,255,255,0.6)",
// //               fontSize: 12,
// //               fontWeight: 600,
// //             }}
// //           >
// //             Why are you reporting this?
// //           </span>
// //         </div>

// //         {REPORT_REASONS.map((reason, i) => {
// //           const isLoading = loadingAction === reason;
// //           return (
// //             <button
// //               key={reason}
// //               onClick={() => !loadingAction && handleReport(reason)}
// //               disabled={!!loadingAction}
// //               style={{
// //                 width: "100%",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "space-between",
// //                 padding: "10px 14px",
// //                 background: "transparent",
// //                 border: "none",
// //                 cursor: loadingAction ? "default" : "pointer",
// //                 color: "rgba(255,255,255,0.75)",
// //                 fontSize: 12.5,
// //                 textAlign: "left",
// //                 borderBottom:
// //                   i < REPORT_REASONS.length - 1
// //                     ? "0.5px solid rgba(255,255,255,0.06)"
// //                     : "none",
// //                 transition: "background 0.15s ease",
// //                 opacity: loadingAction && !isLoading ? 0.4 : 1,
// //               }}
// //               onMouseEnter={(e) =>
// //                 !loadingAction &&
// //                 (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
// //               }
// //               onMouseLeave={(e) =>
// //                 (e.currentTarget.style.background = "transparent")
// //               }
// //             >
// //               {reason}
// //               {isLoading && (
// //                 <svg
// //                   width="12"
// //                   height="12"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="rgba(255,255,255,0.4)"
// //                   strokeWidth="2"
// //                   strokeLinecap="round"
// //                   style={{
// //                     animation: "spin 0.8s linear infinite",
// //                     flexShrink: 0,
// //                   }}
// //                 >
// //                   <path d="M21 12a9 9 0 1 1-6.219-8.56" />
// //                 </svg>
// //               )}
// //             </button>
// //           );
// //         })}
// //       </div>
// //     );
// //   }

// //   /* ── MAIN MENU ── */
// //   const options = [
// //     {
// //       label: "Not interested",
// //       color: "rgba(255,255,255,0.8)",
// //       loading: loadingAction === "notInterested",
// //       icon: (
// //         <svg
// //           width="14"
// //           height="14"
// //           viewBox="0 0 24 24"
// //           fill="none"
// //           stroke="currentColor"
// //           strokeWidth="1.8"
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //         >
// //           <circle cx="12" cy="12" r="10" />
// //           <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
// //         </svg>
// //       ),
// //       action: handleNotInterested,
// //     },
// //     {
// //       label: "Report post",
// //       color: "#f87171",
// //       loading: false,
// //       icon: (
// //         <svg
// //           width="14"
// //           height="14"
// //           viewBox="0 0 24 24"
// //           fill="none"
// //           stroke="currentColor"
// //           strokeWidth="1.8"
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //         >
// //           <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
// //           <line x1="4" y1="22" x2="4" y2="15" />
// //         </svg>
// //       ),
// //       action: () => setView("report"),
// //     },
// //   ];

// //   return (
// //     <div style={{ ...base, width: 185 }}>
// //       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
// //       {options.map((opt, i) => (
// //         <button
// //           key={opt.label}
// //           onClick={() => !loadingAction && opt.action()}
// //           disabled={!!loadingAction}
// //           style={{
// //             width: "100%",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "space-between",
// //             gap: 10,
// //             padding: "10px 14px",
// //             background: "transparent",
// //             border: "none",
// //             cursor: loadingAction ? "default" : "pointer",
// //             color: opt.color,
// //             fontSize: 13,
// //             fontWeight: 500,
// //             textAlign: "left",
// //             transition: "background 0.15s ease",
// //             borderBottom:
// //               i < options.length - 1
// //                 ? "0.5px solid rgba(255,255,255,0.06)"
// //                 : "none",
// //             opacity: loadingAction && !opt.loading ? 0.4 : 1,
// //           }}
// //           onMouseEnter={(e) =>
// //             !loadingAction &&
// //             (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
// //           }
// //           onMouseLeave={(e) =>
// //             (e.currentTarget.style.background = "transparent")
// //           }
// //         >
// //           <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //             {opt.icon}
// //             {opt.label}
// //           </span>
// //           {opt.loading && (
// //             <svg
// //               width="12"
// //               height="12"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="rgba(255,255,255,0.4)"
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //               style={{ animation: "spin 0.8s linear infinite" }}
// //             >
// //               <path d="M21 12a9 9 0 1 1-6.219-8.56" />
// //             </svg>
// //           )}
// //         </button>
// //       ))}
// //     </div>
// //   );
// // }

// // export default PostOptionsPopup;

// import { useEffect, useState } from "react";
// import fetchData from "../utils/fetchData";

// const REPORT_REASONS = [
//   "Spam",
//   "Nudity or sexual activity",
//   "Hate speech or symbols",
//   "Violence or dangerous content",
//   "Harassment or bullying",
//   "False information",
// ];

// function PostOptionsPopup({ post, onClose, onHide, isOwner, anchorRef }) {
//   const [view, setView] = useState("menu"); // "menu" | "report" | "done"
//   const [loadingAction, setLoadingAction] = useState(null);

//   // Close on outside click — but NOT when showing the done screen.
//   // If we close on outside click during "done", the post hasn't been hidden yet
//   // (onHide fires on Done button) so the user loses the confirmation AND the
//   // post stays in the feed until next reload.
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (view === "done") return;
//       if (anchorRef.current && !anchorRef.current.contains(e.target)) onClose();
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [view]);

//   if (isOwner) return null;

//   const handleNotInterested = async () => {
//     setLoadingAction("notInterested");
//     try {
//       await fetchData(`/api/posts/${post._id}/not-interested`, {
//         method: "POST",
//         credentials: "include",
//       });
//       onHide?.(post._id);
//       onClose();
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
//       // Do NOT call onHide here — that unmounts the post which unmounts this
//       // popup before the done screen can render. onHide fires on Done button.
//       setView("done");
//     } catch (err) {
//       console.error("Report error:", err);
//     } finally {
//       setLoadingAction(null);
//     }
//   };

//   const base = {
//     position: "absolute",
//     right: 0,
//     top: 36,
//     zIndex: 50,
//     borderRadius: 12,
//     background: "#1a1a1a",
//     border: "0.5px solid rgba(255,255,255,0.1)",
//     boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
//     overflow: "hidden",
//     animation: "fadeSlideInOption 0.18s ease forwards",
//   };

//   /* ── CONFIRMATION ─────────────────────────────────────────────────────────── */
//   if (view === "done") {
//     return (
//       <div
//         style={{
//           ...base,
//           width: 210,
//           padding: "20px 16px",
//           textAlign: "center",
//         }}
//       >
//         <svg
//           width="28"
//           height="28"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="#4ade80"
//           strokeWidth="1.8"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           style={{ margin: "0 auto 10px", display: "block" }}
//         >
//           <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//           <polyline points="22 4 12 14.01 9 11.01" />
//         </svg>
//         <p
//           style={{
//             color: "rgba(255,255,255,0.9)",
//             fontSize: 13,
//             fontWeight: 600,
//             margin: "0 0 6px",
//           }}
//         >
//           Report submitted
//         </p>
//         <p
//           style={{
//             color: "rgba(255,255,255,0.4)",
//             fontSize: 12,
//             margin: "0 0 14px",
//             lineHeight: 1.5,
//           }}
//         >
//           Thanks for helping keep this community safe.
//         </p>
//         <button
//           onClick={() => {
//             onHide?.(post._id);
//             onClose();
//           }}
//           style={{
//             background: "rgba(255,255,255,0.08)",
//             border: "none",
//             borderRadius: 8,
//             color: "rgba(255,255,255,0.7)",
//             fontSize: 12,
//             padding: "7px 24px",
//             cursor: "pointer",
//             width: "100%",
//           }}
//         >
//           Done
//         </button>
//       </div>
//     );
//   }

//   /* ── REPORT REASONS ───────────────────────────────────────────────────────── */
//   if (view === "report") {
//     return (
//       <div style={{ ...base, width: 250 }}>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             padding: "10px 14px",
//             borderBottom: "0.5px solid rgba(255,255,255,0.06)",
//           }}
//         >
//           <button
//             onClick={() => setView("menu")}
//             style={{
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               padding: 0,
//               color: "rgba(255,255,255,0.45)",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <svg
//               width="14"
//               height="14"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="15 18 9 12 15 6" />
//             </svg>
//           </button>
//           <span
//             style={{
//               color: "rgba(255,255,255,0.6)",
//               fontSize: 12,
//               fontWeight: 600,
//             }}
//           >
//             Why are you reporting this?
//           </span>
//         </div>

//         {REPORT_REASONS.map((reason, i) => {
//           const isLoading = loadingAction === reason;
//           return (
//             <button
//               key={reason}
//               onClick={() => !loadingAction && handleReport(reason)}
//               disabled={!!loadingAction}
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "10px 14px",
//                 background: "transparent",
//                 border: "none",
//                 cursor: loadingAction ? "default" : "pointer",
//                 color: "rgba(255,255,255,0.75)",
//                 fontSize: 12.5,
//                 textAlign: "left",
//                 borderBottom:
//                   i < REPORT_REASONS.length - 1
//                     ? "0.5px solid rgba(255,255,255,0.06)"
//                     : "none",
//                 transition: "background 0.15s ease",
//                 opacity: loadingAction && !isLoading ? 0.4 : 1,
//               }}
//               onMouseEnter={(e) =>
//                 !loadingAction &&
//                 (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.background = "transparent")
//               }
//             >
//               {reason}
//               {isLoading && (
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="rgba(255,255,255,0.4)"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   style={{
//                     animation: "pop-spin 0.8s linear infinite",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//                 </svg>
//               )}
//             </button>
//           );
//         })}
//       </div>
//     );
//   }

//   /* ── MAIN MENU ────────────────────────────────────────────────────────────── */
//   const options = [
//     {
//       label: "Not interested",
//       color: "rgba(255,255,255,0.8)",
//       loading: loadingAction === "notInterested",
//       icon: (
//         <svg
//           width="14"
//           height="14"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.8"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <circle cx="12" cy="12" r="10" />
//           <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//         </svg>
//       ),
//       action: handleNotInterested,
//     },
//     {
//       label: "Report post",
//       color: "#f87171",
//       loading: false,
//       icon: (
//         <svg
//           width="14"
//           height="14"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.8"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
//           <line x1="4" y1="22" x2="4" y2="15" />
//         </svg>
//       ),
//       action: () => setView("report"),
//     },
//   ];

//   return (
//     <div style={{ ...base, width: 185 }}>
//       <style>{`
//         @keyframes pop-spin { to { transform: rotate(360deg); } }
//         @keyframes fadeSlideInOption {
//           from { opacity: 0; transform: translateY(4px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//       {options.map((opt, i) => (
//         <button
//           key={opt.label}
//           onClick={() => !loadingAction && opt.action()}
//           disabled={!!loadingAction}
//           style={{
//             width: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: 10,
//             padding: "10px 14px",
//             background: "transparent",
//             border: "none",
//             cursor: loadingAction ? "default" : "pointer",
//             color: opt.color,
//             fontSize: 13,
//             fontWeight: 500,
//             textAlign: "left",
//             transition: "background 0.15s ease",
//             borderBottom:
//               i < options.length - 1
//                 ? "0.5px solid rgba(255,255,255,0.06)"
//                 : "none",
//             opacity: loadingAction && !opt.loading ? 0.4 : 1,
//           }}
//           onMouseEnter={(e) =>
//             !loadingAction &&
//             (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.background = "transparent")
//           }
//         >
//           <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             {opt.icon}
//             {opt.label}
//           </span>
//           {opt.loading && (
//             <svg
//               width="12"
//               height="12"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.4)"
//               strokeWidth="2"
//               strokeLinecap="round"
//               style={{ animation: "pop-spin 0.8s linear infinite" }}
//             >
//               <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//             </svg>
//           )}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default PostOptionsPopup;

import { useEffect, useState } from "react";
import fetchData from "../utils/fetchData";

const REPORT_REASONS = [
  "Spam",
  "Nudity or sexual activity",
  "Hate speech or symbols",
  "Violence or dangerous content",
  "Harassment or bullying",
  "False information",
];

function PostOptionsPopup({ post, onClose, onHide, isOwner, anchorRef }) {
  const [view, setView] = useState("menu"); // "menu" | "report" | "done"
  const [loadingAction, setLoadingAction] = useState(null);

  // Close on outside click — but NOT when showing the done screen.
  // If we close on outside click during "done", the post hasn't been hidden yet
  // (onHide fires on Done button) so the user loses the confirmation AND the
  // post stays in the feed until next reload.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (view === "done") return;
      if (anchorRef.current && !anchorRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [view]);

  if (isOwner) return null;

  const handleNotInterested = async () => {
    setLoadingAction("notInterested");
    try {
      await fetchData(`/api/posts/${post._id}/not-interested`, {
        method: "POST",
        credentials: "include",
      });
      onHide?.(post._id);
      onClose();
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
      // Do NOT call onHide here — that unmounts the post which unmounts this
      // popup before the done screen can render. onHide fires on Done button.
      setView("done");
    } catch (err) {
      console.error("Report error:", err);
    } finally {
      setLoadingAction(null);
    }
  };

  const base = {
    position: "absolute",
    right: 0,
    top: 36,
    zIndex: 50,
    borderRadius: 12,
    background: "#1a1a1a",
    border: "0.5px solid rgba(255,255,255,0.1)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
    overflow: "hidden",
    animation: "fadeSlideInOption 0.18s ease forwards",
  };

  /* ── CONFIRMATION ─────────────────────────────────────────────────────────── */
  // Auto-close after 3s if the user doesn't tap Done
  useEffect(() => {
    if (view !== "done") return;
    const t = setTimeout(() => {
      onHide?.(post._id);
      onClose();
    }, 3000);
    return () => clearTimeout(t);
  }, [view]);

  if (view === "done") {
    return (
      <div
        style={{
          ...base,
          width: 210,
          padding: "20px 16px",
          textAlign: "center",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4ade80"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ margin: "0 auto 10px", display: "block" }}
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <p
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: 13,
            fontWeight: 600,
            margin: "0 0 6px",
          }}
        >
          Report submitted
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
            margin: "0 0 14px",
            lineHeight: 1.5,
          }}
        >
          Thanks for helping keep this community safe.
        </p>
        <button
          onClick={() => {
            onHide?.(post._id);
            onClose();
          }}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "none",
            borderRadius: 8,
            color: "rgba(255,255,255,0.7)",
            fontSize: 12,
            padding: "7px 24px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Done
        </button>
      </div>
    );
  }

  /* ── REPORT REASONS ───────────────────────────────────────────────────────── */
  if (view === "report") {
    return (
      <div style={{ ...base, width: 250 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            onClick={() => setView("menu")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "rgba(255,255,255,0.45)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              width="14"
              height="14"
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
              color: "rgba(255,255,255,0.6)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Why are you reporting this?
          </span>
        </div>

        {REPORT_REASONS.map((reason, i) => {
          const isLoading = loadingAction === reason;
          return (
            <button
              key={reason}
              onClick={() => !loadingAction && handleReport(reason)}
              disabled={!!loadingAction}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                background: "transparent",
                border: "none",
                cursor: loadingAction ? "default" : "pointer",
                color: "rgba(255,255,255,0.75)",
                fontSize: 12.5,
                textAlign: "left",
                borderBottom:
                  i < REPORT_REASONS.length - 1
                    ? "0.5px solid rgba(255,255,255,0.06)"
                    : "none",
                transition: "background 0.15s ease",
                opacity: loadingAction && !isLoading ? 0.4 : 1,
              }}
              onMouseEnter={(e) =>
                !loadingAction &&
                (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {reason}
              {isLoading && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    animation: "pop-spin 0.8s linear infinite",
                    flexShrink: 0,
                  }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  /* ── MAIN MENU ────────────────────────────────────────────────────────────── */
  const options = [
    {
      label: "Not interested",
      color: "rgba(255,255,255,0.8)",
      loading: loadingAction === "notInterested",
      icon: (
        <svg
          width="14"
          height="14"
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
      ),
      action: handleNotInterested,
    },
    {
      label: "Report post",
      color: "#f87171",
      loading: false,
      icon: (
        <svg
          width="14"
          height="14"
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
      ),
      action: () => setView("report"),
    },
  ];

  return (
    <div style={{ ...base, width: 185 }}>
      <style>{`
        @keyframes pop-spin { to { transform: rotate(360deg); } }
        @keyframes fadeSlideInOption {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {options.map((opt, i) => (
        <button
          key={opt.label}
          onClick={() => !loadingAction && opt.action()}
          disabled={!!loadingAction}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            padding: "10px 14px",
            background: "transparent",
            border: "none",
            cursor: loadingAction ? "default" : "pointer",
            color: opt.color,
            fontSize: 13,
            fontWeight: 500,
            textAlign: "left",
            transition: "background 0.15s ease",
            borderBottom:
              i < options.length - 1
                ? "0.5px solid rgba(255,255,255,0.06)"
                : "none",
            opacity: loadingAction && !opt.loading ? 0.4 : 1,
          }}
          onMouseEnter={(e) =>
            !loadingAction &&
            (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {opt.icon}
            {opt.label}
          </span>
          {opt.loading && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animation: "pop-spin 0.8s linear infinite" }}
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}

export default PostOptionsPopup;