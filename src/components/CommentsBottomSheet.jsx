// import { useEffect, useRef, useState } from "react";
// import fetchData from "../utils/fetchData";
// import { useAuth } from "../hooks/useAuth";

// function CommentsBottomSheet({ post, onClose }) {
//   const { user } = useAuth();
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contentVisible, setContentVisible] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragY, setDragY] = useState(0);
//   const [visible, setVisible] = useState(false);
//   const dragStartY = useRef(null);
//   const sheetRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     requestAnimationFrame(() => setVisible(true));
//   }, []);

//   const handleClose = () => {
//     setVisible(false);
//     setTimeout(onClose, 320);
//   };

//   useEffect(() => {
//     fetchData(`/api/posts/${post._id}/comments`, {
//       credentials: "include",
//     })
//       .then((r) => r.json())
//       .then((data) => {
//         setComments(data.comments || []);
//         setTimeout(() => {
//           setLoading(false);
//           requestAnimationFrame(() => setContentVisible(true));
//         }, 300);
//       })
//       .catch(() => {
//         setLoading(false);
//         requestAnimationFrame(() => setContentVisible(true));
//       });
//   }, [post._id]);

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
//     if (dragY > 120) {
//       handleClose();
//     } else {
//       setDragY(0);
//     }
//     setIsDragging(false);
//     dragStartY.current = null;
//   };

//   const Avatar = ({ username, profilePicture, size = 32 }) => (
//     <div
//       style={{
//         width: size,
//         height: size,
//         borderRadius: "50%",
//         flexShrink: 0,
//         overflow: "hidden",
//       }}
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
//             background: `hsl(${(username.charCodeAt(0) * 47) % 360}, 55%, 45%)`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: size * 0.38,
//             fontWeight: 700,
//             color: "#fff",
//           }}
//         >
//           {username.charAt(0).toUpperCase()}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <>
//       <style>{`
//         @keyframes shimmer {
//           0% { background-position: -400px 0; }
//           100% { background-position: 400px 0; }
//         }
//         .skeleton {
//           background: linear-gradient(
//             90deg,
//             rgba(255,255,255,0.04) 25%,
//             rgba(255,255,255,0.09) 50%,
//             rgba(255,255,255,0.04) 75%
//           );
//           background-size: 400px 100%;
//           animation: shimmer 1.4s ease infinite;
//         }
//         @keyframes fadeSlideIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .comment-row {
//           opacity: 0;
//           animation: fadeSlideIn 0.28s ease forwards;
//         }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         onClick={handleClose}
//         style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
//         className="fixed inset-0 bg-black/60 z-[100] md:hidden backdrop-blur-[2px]"
//       />

//       {/* Sheet wrapper */}
//       <div
//         className="fixed inset-x-0 bottom-0 z-[101] flex justify-center md:hidden"
//         style={{ top: "10vh", paddingBottom: "env(safe-area-inset-bottom)" }}
//       >
//         <div
//           ref={sheetRef}
//           style={{
//             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
//             transition: isDragging
//               ? "none"
//               : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
//             height: "100%",
//             borderTop: "0.5px solid rgba(255,255,255,0.08)",
//             background: "#141414",
//             borderRadius: "16px 16px 0 0",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//             boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
//           }}
//           className="w-full max-w-[470px]"
//         >
//           {/* Drag Handle + Header */}
//           <div
//             style={{
//               flexShrink: 0,
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
//                 marginBottom: 12,
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
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 paddingBottom: 12,
//                 borderBottom: "0.5px solid rgba(255,255,255,0.07)",
//               }}
//             >
//               <span
//                 style={{
//                   fontSize: 15,
//                   fontWeight: 600,
//                   color: "#fff",
//                   letterSpacing: "0.01em",
//                 }}
//               >
//                 Comments
//               </span>
//               <button
//                 onClick={handleClose}
//                 style={{
//                   width: 28,
//                   height: 28,
//                   borderRadius: "50%",
//                   background: "rgba(255,255,255,0.07)",
//                   border: "0.5px solid rgba(255,255,255,0.1)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                   transition: "background 0.15s ease",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
//                 }
//               >
//                 <svg
//                   width="10"
//                   height="10"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="rgba(255,255,255,0.6)"
//                   strokeWidth="2.5"
//                   strokeLinecap="round"
//                 >
//                   <line x1="18" y1="6" x2="6" y2="18" />
//                   <line x1="6" y1="6" x2="18" y2="18" />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Comments List */}
//           <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
//             {loading ? (
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 20,
//                   paddingTop: 4,
//                 }}
//               >
//                 {[1, 2, 3, 4].map((i) => (
//                   <div
//                     key={i}
//                     style={{
//                       display: "flex",
//                       gap: 12,
//                       alignItems: "flex-start",
//                       opacity: contentVisible ? 0 : 1,
//                       transition: "opacity 0.2s ease",
//                     }}
//                   >
//                     <div
//                       className="skeleton"
//                       style={{
//                         width: 32,
//                         height: 32,
//                         borderRadius: "50%",
//                         flexShrink: 0,
//                       }}
//                     />
//                     <div
//                       style={{
//                         flex: 1,
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: 8,
//                       }}
//                     >
//                       <div
//                         className="skeleton"
//                         style={{
//                           height: 11,
//                           borderRadius: 6,
//                           width: `${[40, 55, 45, 50][i - 1]}%`,
//                         }}
//                       />
//                       <div
//                         className="skeleton"
//                         style={{
//                           height: 11,
//                           borderRadius: 6,
//                           width: `${[70, 85, 60, 75][i - 1]}%`,
//                         }}
//                       />
//                       <div
//                         className="skeleton"
//                         style={{
//                           height: 9,
//                           borderRadius: 6,
//                           width: "25%",
//                           marginTop: 2,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div
//                 style={{
//                   opacity: contentVisible ? 1 : 0,
//                   transform: contentVisible
//                     ? "translateY(0)"
//                     : "translateY(8px)",
//                   transition: "opacity 0.35s ease, transform 0.35s ease",
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 20,
//                   paddingTop: 4,
//                 }}
//               >
//                 {comments.length === 0 ? (
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       gap: 8,
//                       paddingTop: 60,
//                       paddingBottom: 40,
//                     }}
//                   >
//                     <svg
//                       width="36"
//                       height="36"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="rgba(255,255,255,0.12)"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//                     </svg>
//                     <p
//                       style={{
//                         color: "rgba(255,255,255,0.25)",
//                         fontSize: 13,
//                         margin: 0,
//                       }}
//                     >
//                       No comments yet
//                     </p>
//                     <p
//                       style={{
//                         color: "rgba(255,255,255,0.15)",
//                         fontSize: 12,
//                         margin: 0,
//                       }}
//                     >
//                       Be the first to comment
//                     </p>
//                   </div>
//                 ) : (
//                   comments.map((c, i) => (
//                     <div
//                       key={c._id}
//                       className="comment-row"
//                       style={{
//                         animationDelay: `${i * 50}ms`,
//                         display: "flex",
//                         gap: 12,
//                         alignItems: "flex-start",
//                       }}
//                     >
//                       <Avatar
//                         username={c.user.username}
//                         profilePicture={c.user.profilePicture}
//                         size={32}
//                       />
//                       <div style={{ flex: 1, minWidth: 0 }}>
//                         <p
//                           style={{
//                             fontSize: 13,
//                             lineHeight: 1.5,
//                             color: "rgba(255,255,255,0.8)",
//                             margin: 0,
//                           }}
//                         >
//                           <span
//                             style={{
//                               fontWeight: 600,
//                               color: "#fff",
//                               marginRight: 6,
//                             }}
//                           >
//                             {c.user.username}
//                           </span>
//                           {c.text}
//                         </p>
//                         <p
//                           style={{
//                             fontSize: 11,
//                             color: "rgba(255,255,255,0.25)",
//                             margin: "4px 0 0",
//                           }}
//                         >
//                           {new Date(c.createdAt).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                           })}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Comment Input Bar */}
//           <div
//             style={{
//               flexShrink: 0,
//               borderTop: "0.5px solid rgba(255,255,255,0.06)",
//               padding: "10px 12px",
//               paddingBottom: "max(12px, env(safe-area-inset-bottom))",
//               background: "#141414",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <Avatar
//                 username={user?.username || "?"}
//                 profilePicture={user?.profilePicture}
//                 size={30}
//               />
//               <div
//                 style={{
//                   flex: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   background: "rgba(255,255,255,0.06)",
//                   borderRadius: 24,
//                   border: "0.5px solid rgba(255,255,255,0.08)",
//                   padding: "8px 14px",
//                   gap: 8,
//                 }}
//               >
//                 <input
//                   ref={inputRef}
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handlePost()}
//                   placeholder="Add a comment…"
//                   style={{
//                     flex: 1,
//                     background: "transparent",
//                     border: "none",
//                     outline: "none",
//                     fontSize: 13,
//                     color: "rgba(255,255,255,0.8)",
//                     caretColor: "#60a5fa",
//                   }}
//                 />
//                 {comment.trim() && (
//                   <button
//                     onClick={handlePost}
//                     style={{
//                       fontSize: 12,
//                       fontWeight: 600,
//                       color: "#60a5fa",
//                       background: "transparent",
//                       border: "none",
//                       cursor: "pointer",
//                       whiteSpace: "nowrap",
//                       padding: 0,
//                       transition: "opacity 0.15s ease",
//                     }}
//                   >
//                     Post
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CommentsBottomSheet;

// import { useEffect, useRef, useState } from "react";
// import fetchData from "../utils/fetchData";
// import { useAuth } from "../hooks/useAuth";

// function CommentsBottomSheet({ post, onClose }) {
//   const { user } = useAuth();
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contentVisible, setContentVisible] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragY, setDragY] = useState(0);
//   const [visible, setVisible] = useState(false);
//   const [activeCommentMenu, setActiveCommentMenu] = useState(null);
//   const [keyboardHeight, setKeyboardHeight] = useState(0);
//   const dragStartY = useRef(null);
//   const sheetRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     requestAnimationFrame(() => setVisible(true));
//   }, []);

//   // Track keyboard open/close via visualViewport
//   useEffect(() => {
//     const viewport = window.visualViewport;
//     if (!viewport) return;

//     const handleResize = () => {
//       const keyboardH = window.innerHeight - viewport.height;
//       setKeyboardHeight(Math.max(0, keyboardH));
//     };

//     viewport.addEventListener("resize", handleResize);
//     viewport.addEventListener("scroll", handleResize);
//     return () => {
//       viewport.removeEventListener("resize", handleResize);
//       viewport.removeEventListener("scroll", handleResize);
//     };
//   }, []);

//   const handleClose = () => {
//     setVisible(false);
//     setTimeout(onClose, 320);
//   };

//   useEffect(() => {
//     fetchData(`/api/posts/${post._id}/comments`, {
//       credentials: "include",
//     })
//       .then((r) => r.json())
//       .then((data) => {
//         setComments(data.comments || []);
//         setTimeout(() => {
//           setLoading(false);
//           requestAnimationFrame(() => setContentVisible(true));
//         }, 300);
//       })
//       .catch(() => {
//         setLoading(false);
//         requestAnimationFrame(() => setContentVisible(true));
//       });
//   }, [post._id]);

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

//   const handleDeleteComment = async (commentId) => {
//     try {
//       const res = await fetchData(
//         `/api/posts/${post._id}/comments/${commentId}`,
//         {
//           method: "DELETE",
//           credentials: "include",
//         },
//       );
//       const data = await res.json();
//       if (data.success) {
//         setComments((prev) => prev.filter((c) => c._id !== commentId));
//         setActiveCommentMenu(null);
//       }
//     } catch (err) {
//       console.error("Delete comment error:", err);
//     }
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
//     if (dragY > 120) {
//       handleClose();
//     } else {
//       setDragY(0);
//     }
//     setIsDragging(false);
//     dragStartY.current = null;
//   };

//   const Avatar = ({ username, profilePicture, size = 32 }) => (
//     <div
//       style={{
//         width: size,
//         height: size,
//         borderRadius: "50%",
//         flexShrink: 0,
//         overflow: "hidden",
//       }}
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
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: size * 0.38,
//             fontWeight: 700,
//             color: "#fff",
//           }}
//         >
//           {username?.charAt(0).toUpperCase()}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <>
//       <style>{`
//         @keyframes shimmer {
//           0% { background-position: -400px 0; }
//           100% { background-position: 400px 0; }
//         }
//         .cbs-skeleton {
//           background: linear-gradient(
//             90deg,
//             rgba(255,255,255,0.04) 25%,
//             rgba(255,255,255,0.09) 50%,
//             rgba(255,255,255,0.04) 75%
//           );
//           background-size: 400px 100%;
//           animation: shimmer 1.4s ease infinite;
//         }
//         @keyframes fadeSlideIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .cbs-comment-row {
//           opacity: 0;
//           animation: fadeSlideIn 0.28s ease forwards;
//         }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         onClick={handleClose}
//         style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
//         className="fixed inset-0 bg-black/60 z-[100] md:hidden backdrop-blur-[2px]"
//       />

//       {/* Sheet wrapper — shifts up with keyboard */}
//       <div
//         className="fixed inset-x-0 z-[101] flex justify-center md:hidden"
//         style={{
//           top: "10vh",
//           bottom: keyboardHeight,
//           transition: isDragging ? "none" : "bottom 0.22s ease",
//           paddingBottom:
//             keyboardHeight === 0 ? "env(safe-area-inset-bottom)" : 0,
//         }}
//       >
//         <div
//           ref={sheetRef}
//           style={{
//             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
//             transition: isDragging
//               ? "none"
//               : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
//             height: "100%",
//             borderTop: "0.5px solid rgba(255,255,255,0.08)",
//             background: "#141414",
//             borderRadius: "16px 16px 0 0",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//             boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
//           }}
//           className="w-full max-w-[470px]"
//         >
//           {/* Drag Handle + Header */}
//           <div
//             style={{
//               flexShrink: 0,
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
//                 marginBottom: 12,
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
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 paddingBottom: 12,
//                 borderBottom: "0.5px solid rgba(255,255,255,0.07)",
//               }}
//             >
//               <span
//                 style={{
//                   fontSize: 15,
//                   fontWeight: 600,
//                   color: "#fff",
//                   letterSpacing: "0.01em",
//                 }}
//               >
//                 Comments
//               </span>
//               <button
//                 onClick={handleClose}
//                 style={{
//                   width: 28,
//                   height: 28,
//                   borderRadius: "50%",
//                   background: "rgba(255,255,255,0.07)",
//                   border: "0.5px solid rgba(255,255,255,0.1)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                   transition: "background 0.15s ease",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
//                 }
//               >
//                 <svg
//                   width="10"
//                   height="10"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="rgba(255,255,255,0.6)"
//                   strokeWidth="2.5"
//                   strokeLinecap="round"
//                 >
//                   <line x1="18" y1="6" x2="6" y2="18" />
//                   <line x1="6" y1="6" x2="18" y2="18" />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Comments List */}
//           <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
//             {loading ? (
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 20,
//                   paddingTop: 4,
//                 }}
//               >
//                 {[1, 2, 3, 4].map((i) => (
//                   <div
//                     key={i}
//                     style={{
//                       display: "flex",
//                       gap: 12,
//                       alignItems: "flex-start",
//                       opacity: contentVisible ? 0 : 1,
//                       transition: "opacity 0.2s ease",
//                     }}
//                   >
//                     <div
//                       className="cbs-skeleton"
//                       style={{
//                         width: 32,
//                         height: 32,
//                         borderRadius: "50%",
//                         flexShrink: 0,
//                       }}
//                     />
//                     <div
//                       style={{
//                         flex: 1,
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: 8,
//                       }}
//                     >
//                       <div
//                         className="cbs-skeleton"
//                         style={{
//                           height: 11,
//                           borderRadius: 6,
//                           width: `${[40, 55, 45, 50][i - 1]}%`,
//                         }}
//                       />
//                       <div
//                         className="cbs-skeleton"
//                         style={{
//                           height: 11,
//                           borderRadius: 6,
//                           width: `${[70, 85, 60, 75][i - 1]}%`,
//                         }}
//                       />
//                       <div
//                         className="cbs-skeleton"
//                         style={{
//                           height: 9,
//                           borderRadius: 6,
//                           width: "25%",
//                           marginTop: 2,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div
//                 style={{
//                   opacity: contentVisible ? 1 : 0,
//                   transform: contentVisible
//                     ? "translateY(0)"
//                     : "translateY(8px)",
//                   transition: "opacity 0.35s ease, transform 0.35s ease",
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 20,
//                   paddingTop: 4,
//                 }}
//               >
//                 {comments.length === 0 ? (
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       gap: 8,
//                       paddingTop: 60,
//                       paddingBottom: 40,
//                     }}
//                   >
//                     <svg
//                       width="36"
//                       height="36"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="rgba(255,255,255,0.12)"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//                     </svg>
//                     <p
//                       style={{
//                         color: "rgba(255,255,255,0.25)",
//                         fontSize: 13,
//                         margin: 0,
//                       }}
//                     >
//                       No comments yet
//                     </p>
//                     <p
//                       style={{
//                         color: "rgba(255,255,255,0.15)",
//                         fontSize: 12,
//                         margin: 0,
//                       }}
//                     >
//                       Be the first to comment
//                     </p>
//                   </div>
//                 ) : (
//                   comments.map((c, i) => {
//                     const isMyComment =
//                       String(user?._id) === String(c.user?._id);
//                     return (
//                       <div
//                         key={c._id}
//                         className="cbs-comment-row"
//                         style={{
//                           animationDelay: `${i * 50}ms`,
//                           display: "flex",
//                           gap: 12,
//                           alignItems: "flex-start",
//                           position: "relative",
//                         }}
//                       >
//                         <Avatar
//                           username={c.user.username}
//                           profilePicture={c.user.profilePicture}
//                           size={32}
//                         />

//                         <div style={{ flex: 1, minWidth: 0 }}>
//                           <p
//                             style={{
//                               fontSize: 13,
//                               lineHeight: 1.5,
//                               color: "rgba(255,255,255,0.8)",
//                               margin: 0,
//                             }}
//                           >
//                             <span
//                               style={{
//                                 fontWeight: 600,
//                                 color: "#fff",
//                                 marginRight: 6,
//                               }}
//                             >
//                               {c.user.username}
//                             </span>
//                             {c.text}
//                           </p>
//                           <p
//                             style={{
//                               fontSize: 11,
//                               color: "rgba(255,255,255,0.25)",
//                               margin: "4px 0 0",
//                             }}
//                           >
//                             {new Date(c.createdAt).toLocaleDateString("en-US", {
//                               month: "short",
//                               day: "numeric",
//                             })}
//                           </p>
//                         </div>

//                         {/* Three dots — only for own comments */}
//                         {isMyComment && (
//                           <div
//                             style={{ position: "relative", flexShrink: 0 }}
//                             data-comment-menu
//                           >
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setActiveCommentMenu(
//                                   activeCommentMenu === c._id ? null : c._id,
//                                 );
//                               }}
//                               style={{
//                                 width: 26,
//                                 height: 26,
//                                 borderRadius: "50%",
//                                 background: "transparent",
//                                 border: "none",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 cursor: "pointer",
//                                 color: "rgba(255,255,255,0.3)",
//                                 transition:
//                                   "color 0.15s ease, background 0.15s ease",
//                               }}
//                               onMouseEnter={(e) => {
//                                 e.currentTarget.style.color =
//                                   "rgba(255,255,255,0.7)";
//                                 e.currentTarget.style.background =
//                                   "rgba(255,255,255,0.08)";
//                               }}
//                               onMouseLeave={(e) => {
//                                 e.currentTarget.style.color =
//                                   "rgba(255,255,255,0.3)";
//                                 e.currentTarget.style.background =
//                                   "transparent";
//                               }}
//                             >
//                               <svg
//                                 width="14"
//                                 height="14"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                               >
//                                 <circle cx="5" cy="12" r="1" />
//                                 <circle cx="12" cy="12" r="1" />
//                                 <circle cx="19" cy="12" r="1" />
//                               </svg>
//                             </button>

//                             {activeCommentMenu === c._id && (
//                               <div
//                                 data-comment-menu
//                                 style={{
//                                   position: "absolute",
//                                   right: 0,
//                                   top: 30,
//                                   zIndex: 50,
//                                   width: 148,
//                                   borderRadius: 12,
//                                   background: "#1f1f1f",
//                                   border: "0.5px solid rgba(255,255,255,0.1)",
//                                   boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
//                                   overflow: "hidden",
//                                 }}
//                               >
//                                 <button
//                                   onClick={() => handleDeleteComment(c._id)}
//                                   style={{
//                                     width: "100%",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: 8,
//                                     padding: "10px 12px",
//                                     fontSize: 12,
//                                     fontWeight: 500,
//                                     color: "#f87171",
//                                     background: "transparent",
//                                     border: "none",
//                                     cursor: "pointer",
//                                     textAlign: "left",
//                                     transition: "background 0.15s ease",
//                                   }}
//                                   onMouseEnter={(e) =>
//                                     (e.currentTarget.style.background =
//                                       "rgba(255,255,255,0.06)")
//                                   }
//                                   onMouseLeave={(e) =>
//                                     (e.currentTarget.style.background =
//                                       "transparent")
//                                   }
//                                 >
//                                   <svg
//                                     width="12"
//                                     height="12"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   >
//                                     <polyline points="3 6 5 6 21 6" />
//                                     <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//                                     <path d="M10 11v6M14 11v6" />
//                                     <path d="M9 6V4h6v2" />
//                                   </svg>
//                                   Delete comment
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Comment Input Bar */}
//           <div
//             style={{
//               flexShrink: 0,
//               borderTop: "0.5px solid rgba(255,255,255,0.06)",
//               padding: "10px 12px",
//               paddingBottom:
//                 keyboardHeight === 0
//                   ? "max(12px, env(safe-area-inset-bottom))"
//                   : "10px",
//               background: "#141414",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <Avatar
//                 username={user?.username || "?"}
//                 profilePicture={user?.profilePicture}
//                 size={30}
//               />
//               <div
//                 style={{
//                   flex: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   background: "rgba(255,255,255,0.06)",
//                   borderRadius: 24,
//                   border: "0.5px solid rgba(255,255,255,0.08)",
//                   padding: "8px 14px",
//                   gap: 8,
//                 }}
//               >
//                 <input
//                   ref={inputRef}
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handlePost()}
//                   placeholder="Add a comment…"
//                   style={{
//                     flex: 1,
//                     background: "transparent",
//                     border: "none",
//                     outline: "none",
//                     fontSize: 13,
//                     color: "rgba(255,255,255,0.8)",
//                     caretColor: "#60a5fa",
//                   }}
//                 />
//                 {comment.trim() && (
//                   <button
//                     onClick={handlePost}
//                     style={{
//                       fontSize: 12,
//                       fontWeight: 600,
//                       color: "#60a5fa",
//                       background: "transparent",
//                       border: "none",
//                       cursor: "pointer",
//                       whiteSpace: "nowrap",
//                       padding: 0,
//                       transition: "opacity 0.15s ease",
//                     }}
//                   >
//                     Post
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CommentsBottomSheet;

import { useEffect, useRef, useState } from "react";
import fetchData from "../utils/fetchData";
import { useAuth } from "../hooks/useAuth";

function CommentsBottomSheet({
  post,
  onClose,
  onCommentAdded,
  onCommentDeleted,
}) {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [visible, setVisible] = useState(false);
  const [activeCommentMenu, setActiveCommentMenu] = useState(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const dragStartY = useRef(null);
  const sheetRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const handleResize = () => {
      const keyboardH = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop,
      );
      setKeyboardHeight(keyboardH);
    };

    viewport.addEventListener("resize", handleResize);
    viewport.addEventListener("scroll", handleResize);
    return () => {
      viewport.removeEventListener("resize", handleResize);
      viewport.removeEventListener("scroll", handleResize);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  useEffect(() => {
    fetchData(`/api/posts/${post._id}/comments`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setComments(data.comments || []);
        setTimeout(() => {
          setLoading(false);
          requestAnimationFrame(() => setContentVisible(true));
        }, 300);
      })
      .catch(() => {
        setLoading(false);
        requestAnimationFrame(() => setContentVisible(true));
      });
  }, [post._id]);

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
     onCommentAdded?.(); // ← add this
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
        onCommentDeleted?.(); // ← add this
      }
    } catch (err) {
      console.error("Delete comment error:", err);
    }
  };

  const handleTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (dragStartY.current === null) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    if (delta > 0) setDragY(delta);
  };

  const handleTouchEnd = () => {
    if (dragY > 120) {
      handleClose();
    } else {
      setDragY(0);
    }
    setIsDragging(false);
    dragStartY.current = null;
  };

  const Avatar = ({ username, profilePicture, size = 32 }) => (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        overflow: "hidden",
      }}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size * 0.38,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {username?.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .cbs-skeleton {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.04) 25%,
            rgba(255,255,255,0.09) 50%,
            rgba(255,255,255,0.04) 75%
          );
          background-size: 400px 100%;
          animation: shimmer 1.4s ease infinite;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cbs-comment-row {
          opacity: 0;
          animation: fadeSlideIn 0.28s ease forwards;
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        className="fixed inset-0 bg-black/60 z-[100] md:hidden backdrop-blur-[2px]"
      />

      {/* Sheet wrapper */}
      <div
        className="fixed inset-x-0 z-[101] flex justify-center md:hidden"
        style={{
          top: "10vh",
          bottom: 0,
          transform: `translateY(-${keyboardHeight}px)`,
          transition: isDragging ? "none" : "transform 0.22s ease",
          paddingBottom:
            keyboardHeight === 0 ? "env(safe-area-inset-bottom)" : 0,
        }}
      >
        <div
          ref={sheetRef}
          style={{
            transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
            transition: isDragging
              ? "none"
              : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
            height: "100%",
            borderTop: "0.5px solid rgba(255,255,255,0.08)",
            background: "#141414",
            borderRadius: "16px 16px 0 0",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
          }}
          className="w-full max-w-[470px]"
        >
          {/* Drag Handle + Header */}
          <div
            style={{
              flexShrink: 0,
              padding: "12px 16px 0",
              cursor: "grab",
              userSelect: "none",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 12,
              }}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 12,
                borderBottom: "0.5px solid rgba(255,255,255,0.07)",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "0.01em",
                }}
              >
                Comments
              </span>
              <button
                onClick={handleClose}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
                }
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  paddingTop: 4,
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      opacity: contentVisible ? 0 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <div
                      className="cbs-skeleton"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <div
                        className="cbs-skeleton"
                        style={{
                          height: 11,
                          borderRadius: 6,
                          width: `${[40, 55, 45, 50][i - 1]}%`,
                        }}
                      />
                      <div
                        className="cbs-skeleton"
                        style={{
                          height: 11,
                          borderRadius: 6,
                          width: `${[70, 85, 60, 75][i - 1]}%`,
                        }}
                      />
                      <div
                        className="cbs-skeleton"
                        style={{
                          height: 9,
                          borderRadius: 6,
                          width: "25%",
                          marginTop: 2,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  opacity: contentVisible ? 1 : 0,
                  transform: contentVisible
                    ? "translateY(0)"
                    : "translateY(8px)",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  paddingTop: 4,
                }}
              >
                {comments.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      paddingTop: 60,
                      paddingBottom: 40,
                    }}
                  >
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.25)",
                        fontSize: 13,
                        margin: 0,
                      }}
                    >
                      No comments yet
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.15)",
                        fontSize: 12,
                        margin: 0,
                      }}
                    >
                      Be the first to comment
                    </p>
                  </div>
                ) : (
                  comments.map((c, i) => {
                    const isMyComment =
                      String(user?._id) === String(c.user?._id);
                    return (
                      <div
                        key={c._id}
                        className="cbs-comment-row"
                        style={{
                          animationDelay: `${i * 50}ms`,
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                          position: "relative",
                        }}
                      >
                        <Avatar
                          username={c.user.username}
                          profilePicture={c.user.profilePicture}
                          size={32}
                        />

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontSize: 13,
                              lineHeight: 1.5,
                              color: "rgba(255,255,255,0.8)",
                              margin: 0,
                            }}
                          >
                            <span
                              style={{
                                fontWeight: 600,
                                color: "#fff",
                                marginRight: 6,
                              }}
                            >
                              {c.user.username}
                            </span>
                            {c.text}
                          </p>
                          <p
                            style={{
                              fontSize: 11,
                              color: "rgba(255,255,255,0.25)",
                              margin: "4px 0 0",
                            }}
                          >
                            {new Date(c.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>

                        {/* Three dots — only for own comments */}
                        {isMyComment && (
                          <div
                            style={{ position: "relative", flexShrink: 0 }}
                            data-comment-menu
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveCommentMenu(
                                  activeCommentMenu === c._id ? null : c._id,
                                );
                              }}
                              style={{
                                width: 26,
                                height: 26,
                                borderRadius: "50%",
                                background: "transparent",
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "rgba(255,255,255,0.3)",
                                transition:
                                  "color 0.15s ease, background 0.15s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color =
                                  "rgba(255,255,255,0.7)";
                                e.currentTarget.style.background =
                                  "rgba(255,255,255,0.08)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color =
                                  "rgba(255,255,255,0.3)";
                                e.currentTarget.style.background =
                                  "transparent";
                              }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <circle cx="5" cy="12" r="1" />
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                              </svg>
                            </button>

                            {activeCommentMenu === c._id && (
                              <div
                                data-comment-menu
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: 30,
                                  zIndex: 50,
                                  width: 148,
                                  borderRadius: 12,
                                  background: "#1f1f1f",
                                  border: "0.5px solid rgba(255,255,255,0.1)",
                                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                                  overflow: "hidden",
                                }}
                              >
                                <button
                                  onClick={() => handleDeleteComment(c._id)}
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "10px 12px",
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: "#f87171",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    transition: "background 0.15s ease",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.background =
                                      "rgba(255,255,255,0.06)")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.background =
                                      "transparent")
                                  }
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                    <path d="M10 11v6M14 11v6" />
                                    <path d="M9 6V4h6v2" />
                                  </svg>
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

          {/* Comment Input Bar */}
          <div
            style={{
              flexShrink: 0,
              borderTop: "0.5px solid rgba(255,255,255,0.06)",
              padding: "10px 12px",
              paddingBottom:
                keyboardHeight === 0
                  ? "max(12px, env(safe-area-inset-bottom))"
                  : "10px",
              background: "#141414",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar
                username={user?.username || "?"}
                profilePicture={user?.profilePicture}
                size={30}
              />
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 24,
                  border: "0.5px solid rgba(255,255,255,0.08)",
                  padding: "8px 14px",
                  gap: 8,
                }}
              >
                <input
                  ref={inputRef}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePost()}
                  placeholder="Add a comment…"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.8)",
                    caretColor: "#60a5fa",
                  }}
                />
                {comment.trim() && (
                  <button
                    onClick={handlePost}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#60a5fa",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      padding: 0,
                      transition: "opacity 0.15s ease",
                    }}
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentsBottomSheet;