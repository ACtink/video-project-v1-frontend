// // import { useEffect, useRef, useState } from "react";
// // import fetchData from "../utils/fetchData";
// // import { useAuth } from "../hooks/useAuth";

// // function CommentsBottomSheet({ post, onClose }) {
// //   const { user } = useAuth();
// //   const [comment, setComment] = useState("");
// //   const [comments, setComments] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [contentVisible, setContentVisible] = useState(false);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [dragY, setDragY] = useState(0);
// //   const [visible, setVisible] = useState(false);
// //   const dragStartY = useRef(null);
// //   const sheetRef = useRef(null);
// //   const inputRef = useRef(null);

// //   useEffect(() => {
// //     requestAnimationFrame(() => setVisible(true));
// //   }, []);

// //   const handleClose = () => {
// //     setVisible(false);
// //     setTimeout(onClose, 320);
// //   };

// //   useEffect(() => {
// //     fetchData(`/api/posts/${post._id}/comments`, {
// //       credentials: "include",
// //     })
// //       .then((r) => r.json())
// //       .then((data) => {
// //         setComments(data.comments || []);
// //         setTimeout(() => {
// //           setLoading(false);
// //           requestAnimationFrame(() => setContentVisible(true));
// //         }, 300);
// //       })
// //       .catch(() => {
// //         setLoading(false);
// //         requestAnimationFrame(() => setContentVisible(true));
// //       });
// //   }, [post._id]);

// //   const handlePost = async () => {
// //     if (!comment.trim()) return;
// //     try {
// //       const res = await fetchData(`/api/posts/${post._id}/comments`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify({ text: comment }),
// //       });
// //       const data = await res.json();
// //       setComments((prev) => [data.comment, ...prev]);
// //       setComment("");
// //     } catch (err) {
// //       console.error("Post comment error:", err);
// //     }
// //   };

// //   const handleTouchStart = (e) => {
// //     dragStartY.current = e.touches[0].clientY;
// //     setIsDragging(true);
// //   };

// //   const handleTouchMove = (e) => {
// //     if (dragStartY.current === null) return;
// //     const delta = e.touches[0].clientY - dragStartY.current;
// //     if (delta > 0) setDragY(delta);
// //   };

// //   const handleTouchEnd = () => {
// //     if (dragY > 120) {
// //       handleClose();
// //     } else {
// //       setDragY(0);
// //     }
// //     setIsDragging(false);
// //     dragStartY.current = null;
// //   };

// //   const Avatar = ({ username, profilePicture, size = 32 }) => (
// //     <div
// //       style={{
// //         width: size,
// //         height: size,
// //         borderRadius: "50%",
// //         flexShrink: 0,
// //         overflow: "hidden",
// //       }}
// //     >
// //       {profilePicture ? (
// //         <img
// //           src={profilePicture}
// //           alt={username}
// //           style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //         />
// //       ) : (
// //         <div
// //           style={{
// //             width: "100%",
// //             height: "100%",
// //             background: `hsl(${(username.charCodeAt(0) * 47) % 360}, 55%, 45%)`,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontSize: size * 0.38,
// //             fontWeight: 700,
// //             color: "#fff",
// //           }}
// //         >
// //           {username.charAt(0).toUpperCase()}
// //         </div>
// //       )}
// //     </div>
// //   );

// //   return (
// //     <>
// //       <style>{`
// //         @keyframes shimmer {
// //           0% { background-position: -400px 0; }
// //           100% { background-position: 400px 0; }
// //         }
// //         .skeleton {
// //           background: linear-gradient(
// //             90deg,
// //             rgba(255,255,255,0.04) 25%,
// //             rgba(255,255,255,0.09) 50%,
// //             rgba(255,255,255,0.04) 75%
// //           );
// //           background-size: 400px 100%;
// //           animation: shimmer 1.4s ease infinite;
// //         }
// //         @keyframes fadeSlideIn {
// //           from { opacity: 0; transform: translateY(10px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         .comment-row {
// //           opacity: 0;
// //           animation: fadeSlideIn 0.28s ease forwards;
// //         }
// //       `}</style>

// //       {/* Backdrop */}
// //       <div
// //         onClick={handleClose}
// //         style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
// //         className="fixed inset-0 bg-black/60 z-[100] md:hidden backdrop-blur-[2px]"
// //       />

// //       {/* Sheet wrapper */}
// //       <div
// //         className="fixed inset-x-0 bottom-0 z-[101] flex justify-center md:hidden"
// //         style={{ top: "10vh", paddingBottom: "env(safe-area-inset-bottom)" }}
// //       >
// //         <div
// //           ref={sheetRef}
// //           style={{
// //             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
// //             transition: isDragging
// //               ? "none"
// //               : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
// //             height: "100%",
// //             borderTop: "0.5px solid rgba(255,255,255,0.08)",
// //             background: "#141414",
// //             borderRadius: "16px 16px 0 0",
// //             display: "flex",
// //             flexDirection: "column",
// //             overflow: "hidden",
// //             boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
// //           }}
// //           className="w-full max-w-[470px]"
// //         >
// //           {/* Drag Handle + Header */}
// //           <div
// //             style={{
// //               flexShrink: 0,
// //               padding: "12px 16px 0",
// //               cursor: "grab",
// //               userSelect: "none",
// //             }}
// //             onTouchStart={handleTouchStart}
// //             onTouchMove={handleTouchMove}
// //             onTouchEnd={handleTouchEnd}
// //           >
// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 marginBottom: 12,
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   width: 36,
// //                   height: 4,
// //                   borderRadius: 99,
// //                   background: "rgba(255,255,255,0.15)",
// //                 }}
// //               />
// //             </div>
// //             <div
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "space-between",
// //                 paddingBottom: 12,
// //                 borderBottom: "0.5px solid rgba(255,255,255,0.07)",
// //               }}
// //             >
// //               <span
// //                 style={{
// //                   fontSize: 15,
// //                   fontWeight: 600,
// //                   color: "#fff",
// //                   letterSpacing: "0.01em",
// //                 }}
// //               >
// //                 Comments
// //               </span>
// //               <button
// //                 onClick={handleClose}
// //                 style={{
// //                   width: 28,
// //                   height: 28,
// //                   borderRadius: "50%",
// //                   background: "rgba(255,255,255,0.07)",
// //                   border: "0.5px solid rgba(255,255,255,0.1)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   cursor: "pointer",
// //                   transition: "background 0.15s ease",
// //                 }}
// //                 onMouseEnter={(e) =>
// //                   (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
// //                 }
// //                 onMouseLeave={(e) =>
// //                   (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
// //                 }
// //               >
// //                 <svg
// //                   width="10"
// //                   height="10"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="rgba(255,255,255,0.6)"
// //                   strokeWidth="2.5"
// //                   strokeLinecap="round"
// //                 >
// //                   <line x1="18" y1="6" x2="6" y2="18" />
// //                   <line x1="6" y1="6" x2="18" y2="18" />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Comments List */}
// //           <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
// //             {loading ? (
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: 20,
// //                   paddingTop: 4,
// //                 }}
// //               >
// //                 {[1, 2, 3, 4].map((i) => (
// //                   <div
// //                     key={i}
// //                     style={{
// //                       display: "flex",
// //                       gap: 12,
// //                       alignItems: "flex-start",
// //                       opacity: contentVisible ? 0 : 1,
// //                       transition: "opacity 0.2s ease",
// //                     }}
// //                   >
// //                     <div
// //                       className="skeleton"
// //                       style={{
// //                         width: 32,
// //                         height: 32,
// //                         borderRadius: "50%",
// //                         flexShrink: 0,
// //                       }}
// //                     />
// //                     <div
// //                       style={{
// //                         flex: 1,
// //                         display: "flex",
// //                         flexDirection: "column",
// //                         gap: 8,
// //                       }}
// //                     >
// //                       <div
// //                         className="skeleton"
// //                         style={{
// //                           height: 11,
// //                           borderRadius: 6,
// //                           width: `${[40, 55, 45, 50][i - 1]}%`,
// //                         }}
// //                       />
// //                       <div
// //                         className="skeleton"
// //                         style={{
// //                           height: 11,
// //                           borderRadius: 6,
// //                           width: `${[70, 85, 60, 75][i - 1]}%`,
// //                         }}
// //                       />
// //                       <div
// //                         className="skeleton"
// //                         style={{
// //                           height: 9,
// //                           borderRadius: 6,
// //                           width: "25%",
// //                           marginTop: 2,
// //                         }}
// //                       />
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div
// //                 style={{
// //                   opacity: contentVisible ? 1 : 0,
// //                   transform: contentVisible
// //                     ? "translateY(0)"
// //                     : "translateY(8px)",
// //                   transition: "opacity 0.35s ease, transform 0.35s ease",
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: 20,
// //                   paddingTop: 4,
// //                 }}
// //               >
// //                 {comments.length === 0 ? (
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                       gap: 8,
// //                       paddingTop: 60,
// //                       paddingBottom: 40,
// //                     }}
// //                   >
// //                     <svg
// //                       width="36"
// //                       height="36"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="rgba(255,255,255,0.12)"
// //                       strokeWidth="1.5"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                     >
// //                       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
// //                     </svg>
// //                     <p
// //                       style={{
// //                         color: "rgba(255,255,255,0.25)",
// //                         fontSize: 13,
// //                         margin: 0,
// //                       }}
// //                     >
// //                       No comments yet
// //                     </p>
// //                     <p
// //                       style={{
// //                         color: "rgba(255,255,255,0.15)",
// //                         fontSize: 12,
// //                         margin: 0,
// //                       }}
// //                     >
// //                       Be the first to comment
// //                     </p>
// //                   </div>
// //                 ) : (
// //                   comments.map((c, i) => (
// //                     <div
// //                       key={c._id}
// //                       className="comment-row"
// //                       style={{
// //                         animationDelay: `${i * 50}ms`,
// //                         display: "flex",
// //                         gap: 12,
// //                         alignItems: "flex-start",
// //                       }}
// //                     >
// //                       <Avatar
// //                         username={c.user.username}
// //                         profilePicture={c.user.profilePicture}
// //                         size={32}
// //                       />
// //                       <div style={{ flex: 1, minWidth: 0 }}>
// //                         <p
// //                           style={{
// //                             fontSize: 13,
// //                             lineHeight: 1.5,
// //                             color: "rgba(255,255,255,0.8)",
// //                             margin: 0,
// //                           }}
// //                         >
// //                           <span
// //                             style={{
// //                               fontWeight: 600,
// //                               color: "#fff",
// //                               marginRight: 6,
// //                             }}
// //                           >
// //                             {c.user.username}
// //                           </span>
// //                           {c.text}
// //                         </p>
// //                         <p
// //                           style={{
// //                             fontSize: 11,
// //                             color: "rgba(255,255,255,0.25)",
// //                             margin: "4px 0 0",
// //                           }}
// //                         >
// //                           {new Date(c.createdAt).toLocaleDateString("en-US", {
// //                             month: "short",
// //                             day: "numeric",
// //                           })}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   ))
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Comment Input Bar */}
// //           <div
// //             style={{
// //               flexShrink: 0,
// //               borderTop: "0.5px solid rgba(255,255,255,0.06)",
// //               padding: "10px 12px",
// //               paddingBottom: "max(12px, env(safe-area-inset-bottom))",
// //               background: "#141414",
// //             }}
// //           >
// //             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //               <Avatar
// //                 username={user?.username || "?"}
// //                 profilePicture={user?.profilePicture}
// //                 size={30}
// //               />
// //               <div
// //                 style={{
// //                   flex: 1,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   background: "rgba(255,255,255,0.06)",
// //                   borderRadius: 24,
// //                   border: "0.5px solid rgba(255,255,255,0.08)",
// //                   padding: "8px 14px",
// //                   gap: 8,
// //                 }}
// //               >
// //                 <input
// //                   ref={inputRef}
// //                   value={comment}
// //                   onChange={(e) => setComment(e.target.value)}
// //                   onKeyDown={(e) => e.key === "Enter" && handlePost()}
// //                   placeholder="Add a comment…"
// //                   style={{
// //                     flex: 1,
// //                     background: "transparent",
// //                     border: "none",
// //                     outline: "none",
// //                     fontSize: 13,
// //                     color: "rgba(255,255,255,0.8)",
// //                     caretColor: "#60a5fa",
// //                   }}
// //                 />
// //                 {comment.trim() && (
// //                   <button
// //                     onClick={handlePost}
// //                     style={{
// //                       fontSize: 12,
// //                       fontWeight: 600,
// //                       color: "#60a5fa",
// //                       background: "transparent",
// //                       border: "none",
// //                       cursor: "pointer",
// //                       whiteSpace: "nowrap",
// //                       padding: 0,
// //                       transition: "opacity 0.15s ease",
// //                     }}
// //                   >
// //                     Post
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default CommentsBottomSheet;

// // import { useEffect, useRef, useState } from "react";
// // import fetchData from "../utils/fetchData";
// // import { useAuth } from "../hooks/useAuth";

// // function CommentsBottomSheet({ post, onClose }) {
// //   const { user } = useAuth();
// //   const [comment, setComment] = useState("");
// //   const [comments, setComments] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [contentVisible, setContentVisible] = useState(false);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [dragY, setDragY] = useState(0);
// //   const [visible, setVisible] = useState(false);
// //   const [activeCommentMenu, setActiveCommentMenu] = useState(null);
// //   const [keyboardHeight, setKeyboardHeight] = useState(0);
// //   const dragStartY = useRef(null);
// //   const sheetRef = useRef(null);
// //   const inputRef = useRef(null);

// //   useEffect(() => {
// //     requestAnimationFrame(() => setVisible(true));
// //   }, []);

// //   // Track keyboard open/close via visualViewport
// //   useEffect(() => {
// //     const viewport = window.visualViewport;
// //     if (!viewport) return;

// //     const handleResize = () => {
// //       const keyboardH = window.innerHeight - viewport.height;
// //       setKeyboardHeight(Math.max(0, keyboardH));
// //     };

// //     viewport.addEventListener("resize", handleResize);
// //     viewport.addEventListener("scroll", handleResize);
// //     return () => {
// //       viewport.removeEventListener("resize", handleResize);
// //       viewport.removeEventListener("scroll", handleResize);
// //     };
// //   }, []);

// //   const handleClose = () => {
// //     setVisible(false);
// //     setTimeout(onClose, 320);
// //   };

// //   useEffect(() => {
// //     fetchData(`/api/posts/${post._id}/comments`, {
// //       credentials: "include",
// //     })
// //       .then((r) => r.json())
// //       .then((data) => {
// //         setComments(data.comments || []);
// //         setTimeout(() => {
// //           setLoading(false);
// //           requestAnimationFrame(() => setContentVisible(true));
// //         }, 300);
// //       })
// //       .catch(() => {
// //         setLoading(false);
// //         requestAnimationFrame(() => setContentVisible(true));
// //       });
// //   }, [post._id]);

// //   const handlePost = async () => {
// //     if (!comment.trim()) return;
// //     try {
// //       const res = await fetchData(`/api/posts/${post._id}/comments`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify({ text: comment }),
// //       });
// //       const data = await res.json();
// //       setComments((prev) => [data.comment, ...prev]);
// //       setComment("");
// //     } catch (err) {
// //       console.error("Post comment error:", err);
// //     }
// //   };

// //   const handleDeleteComment = async (commentId) => {
// //     try {
// //       const res = await fetchData(
// //         `/api/posts/${post._id}/comments/${commentId}`,
// //         {
// //           method: "DELETE",
// //           credentials: "include",
// //         },
// //       );
// //       const data = await res.json();
// //       if (data.success) {
// //         setComments((prev) => prev.filter((c) => c._id !== commentId));
// //         setActiveCommentMenu(null);
// //       }
// //     } catch (err) {
// //       console.error("Delete comment error:", err);
// //     }
// //   };

// //   const handleTouchStart = (e) => {
// //     dragStartY.current = e.touches[0].clientY;
// //     setIsDragging(true);
// //   };

// //   const handleTouchMove = (e) => {
// //     if (dragStartY.current === null) return;
// //     const delta = e.touches[0].clientY - dragStartY.current;
// //     if (delta > 0) setDragY(delta);
// //   };

// //   const handleTouchEnd = () => {
// //     if (dragY > 120) {
// //       handleClose();
// //     } else {
// //       setDragY(0);
// //     }
// //     setIsDragging(false);
// //     dragStartY.current = null;
// //   };

// //   const Avatar = ({ username, profilePicture, size = 32 }) => (
// //     <div
// //       style={{
// //         width: size,
// //         height: size,
// //         borderRadius: "50%",
// //         flexShrink: 0,
// //         overflow: "hidden",
// //       }}
// //     >
// //       {profilePicture ? (
// //         <img
// //           src={profilePicture}
// //           alt={username}
// //           style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //         />
// //       ) : (
// //         <div
// //           style={{
// //             width: "100%",
// //             height: "100%",
// //             background: `hsl(${(username?.charCodeAt(0) * 47) % 360}, 55%, 45%)`,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontSize: size * 0.38,
// //             fontWeight: 700,
// //             color: "#fff",
// //           }}
// //         >
// //           {username?.charAt(0).toUpperCase()}
// //         </div>
// //       )}
// //     </div>
// //   );

// //   return (
// //     <>
// //       <style>{`
// //         @keyframes shimmer {
// //           0% { background-position: -400px 0; }
// //           100% { background-position: 400px 0; }
// //         }
// //         .cbs-skeleton {
// //           background: linear-gradient(
// //             90deg,
// //             rgba(255,255,255,0.04) 25%,
// //             rgba(255,255,255,0.09) 50%,
// //             rgba(255,255,255,0.04) 75%
// //           );
// //           background-size: 400px 100%;
// //           animation: shimmer 1.4s ease infinite;
// //         }
// //         @keyframes fadeSlideIn {
// //           from { opacity: 0; transform: translateY(10px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         .cbs-comment-row {
// //           opacity: 0;
// //           animation: fadeSlideIn 0.28s ease forwards;
// //         }
// //       `}</style>

// //       {/* Backdrop */}
// //       <div
// //         onClick={handleClose}
// //         style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
// //         className="fixed inset-0 bg-black/60 z-[100] md:hidden backdrop-blur-[2px]"
// //       />

// //       {/* Sheet wrapper — shifts up with keyboard */}
// //       <div
// //         className="fixed inset-x-0 z-[101] flex justify-center md:hidden"
// //         style={{
// //           top: "10vh",
// //           bottom: keyboardHeight,
// //           transition: isDragging ? "none" : "bottom 0.22s ease",
// //           paddingBottom:
// //             keyboardHeight === 0 ? "env(safe-area-inset-bottom)" : 0,
// //         }}
// //       >
// //         <div
// //           ref={sheetRef}
// //           style={{
// //             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
// //             transition: isDragging
// //               ? "none"
// //               : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
// //             height: "100%",
// //             borderTop: "0.5px solid rgba(255,255,255,0.08)",
// //             background: "#141414",
// //             borderRadius: "16px 16px 0 0",
// //             display: "flex",
// //             flexDirection: "column",
// //             overflow: "hidden",
// //             boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
// //           }}
// //           className="w-full max-w-[470px]"
// //         >
// //           {/* Drag Handle + Header */}
// //           <div
// //             style={{
// //               flexShrink: 0,
// //               padding: "12px 16px 0",
// //               cursor: "grab",
// //               userSelect: "none",
// //             }}
// //             onTouchStart={handleTouchStart}
// //             onTouchMove={handleTouchMove}
// //             onTouchEnd={handleTouchEnd}
// //           >
// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 marginBottom: 12,
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   width: 36,
// //                   height: 4,
// //                   borderRadius: 99,
// //                   background: "rgba(255,255,255,0.15)",
// //                 }}
// //               />
// //             </div>
// //             <div
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "space-between",
// //                 paddingBottom: 12,
// //                 borderBottom: "0.5px solid rgba(255,255,255,0.07)",
// //               }}
// //             >
// //               <span
// //                 style={{
// //                   fontSize: 15,
// //                   fontWeight: 600,
// //                   color: "#fff",
// //                   letterSpacing: "0.01em",
// //                 }}
// //               >
// //                 Comments
// //               </span>
// //               <button
// //                 onClick={handleClose}
// //                 style={{
// //                   width: 28,
// //                   height: 28,
// //                   borderRadius: "50%",
// //                   background: "rgba(255,255,255,0.07)",
// //                   border: "0.5px solid rgba(255,255,255,0.1)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   cursor: "pointer",
// //                   transition: "background 0.15s ease",
// //                 }}
// //                 onMouseEnter={(e) =>
// //                   (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
// //                 }
// //                 onMouseLeave={(e) =>
// //                   (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
// //                 }
// //               >
// //                 <svg
// //                   width="10"
// //                   height="10"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="rgba(255,255,255,0.6)"
// //                   strokeWidth="2.5"
// //                   strokeLinecap="round"
// //                 >
// //                   <line x1="18" y1="6" x2="6" y2="18" />
// //                   <line x1="6" y1="6" x2="18" y2="18" />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Comments List */}
// //           <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
// //             {loading ? (
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: 20,
// //                   paddingTop: 4,
// //                 }}
// //               >
// //                 {[1, 2, 3, 4].map((i) => (
// //                   <div
// //                     key={i}
// //                     style={{
// //                       display: "flex",
// //                       gap: 12,
// //                       alignItems: "flex-start",
// //                       opacity: contentVisible ? 0 : 1,
// //                       transition: "opacity 0.2s ease",
// //                     }}
// //                   >
// //                     <div
// //                       className="cbs-skeleton"
// //                       style={{
// //                         width: 32,
// //                         height: 32,
// //                         borderRadius: "50%",
// //                         flexShrink: 0,
// //                       }}
// //                     />
// //                     <div
// //                       style={{
// //                         flex: 1,
// //                         display: "flex",
// //                         flexDirection: "column",
// //                         gap: 8,
// //                       }}
// //                     >
// //                       <div
// //                         className="cbs-skeleton"
// //                         style={{
// //                           height: 11,
// //                           borderRadius: 6,
// //                           width: `${[40, 55, 45, 50][i - 1]}%`,
// //                         }}
// //                       />
// //                       <div
// //                         className="cbs-skeleton"
// //                         style={{
// //                           height: 11,
// //                           borderRadius: 6,
// //                           width: `${[70, 85, 60, 75][i - 1]}%`,
// //                         }}
// //                       />
// //                       <div
// //                         className="cbs-skeleton"
// //                         style={{
// //                           height: 9,
// //                           borderRadius: 6,
// //                           width: "25%",
// //                           marginTop: 2,
// //                         }}
// //                       />
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div
// //                 style={{
// //                   opacity: contentVisible ? 1 : 0,
// //                   transform: contentVisible
// //                     ? "translateY(0)"
// //                     : "translateY(8px)",
// //                   transition: "opacity 0.35s ease, transform 0.35s ease",
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: 20,
// //                   paddingTop: 4,
// //                 }}
// //               >
// //                 {comments.length === 0 ? (
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                       gap: 8,
// //                       paddingTop: 60,
// //                       paddingBottom: 40,
// //                     }}
// //                   >
// //                     <svg
// //                       width="36"
// //                       height="36"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="rgba(255,255,255,0.12)"
// //                       strokeWidth="1.5"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                     >
// //                       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
// //                     </svg>
// //                     <p
// //                       style={{
// //                         color: "rgba(255,255,255,0.25)",
// //                         fontSize: 13,
// //                         margin: 0,
// //                       }}
// //                     >
// //                       No comments yet
// //                     </p>
// //                     <p
// //                       style={{
// //                         color: "rgba(255,255,255,0.15)",
// //                         fontSize: 12,
// //                         margin: 0,
// //                       }}
// //                     >
// //                       Be the first to comment
// //                     </p>
// //                   </div>
// //                 ) : (
// //                   comments.map((c, i) => {
// //                     const isMyComment =
// //                       String(user?._id) === String(c.user?._id);
// //                     return (
// //                       <div
// //                         key={c._id}
// //                         className="cbs-comment-row"
// //                         style={{
// //                           animationDelay: `${i * 50}ms`,
// //                           display: "flex",
// //                           gap: 12,
// //                           alignItems: "flex-start",
// //                           position: "relative",
// //                         }}
// //                       >
// //                         <Avatar
// //                           username={c.user.username}
// //                           profilePicture={c.user.profilePicture}
// //                           size={32}
// //                         />

// //                         <div style={{ flex: 1, minWidth: 0 }}>
// //                           <p
// //                             style={{
// //                               fontSize: 13,
// //                               lineHeight: 1.5,
// //                               color: "rgba(255,255,255,0.8)",
// //                               margin: 0,
// //                             }}
// //                           >
// //                             <span
// //                               style={{
// //                                 fontWeight: 600,
// //                                 color: "#fff",
// //                                 marginRight: 6,
// //                               }}
// //                             >
// //                               {c.user.username}
// //                             </span>
// //                             {c.text}
// //                           </p>
// //                           <p
// //                             style={{
// //                               fontSize: 11,
// //                               color: "rgba(255,255,255,0.25)",
// //                               margin: "4px 0 0",
// //                             }}
// //                           >
// //                             {new Date(c.createdAt).toLocaleDateString("en-US", {
// //                               month: "short",
// //                               day: "numeric",
// //                             })}
// //                           </p>
// //                         </div>

// //                         {/* Three dots — only for own comments */}
// //                         {isMyComment && (
// //                           <div
// //                             style={{ position: "relative", flexShrink: 0 }}
// //                             data-comment-menu
// //                           >
// //                             <button
// //                               onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 setActiveCommentMenu(
// //                                   activeCommentMenu === c._id ? null : c._id,
// //                                 );
// //                               }}
// //                               style={{
// //                                 width: 26,
// //                                 height: 26,
// //                                 borderRadius: "50%",
// //                                 background: "transparent",
// //                                 border: "none",
// //                                 display: "flex",
// //                                 alignItems: "center",
// //                                 justifyContent: "center",
// //                                 cursor: "pointer",
// //                                 color: "rgba(255,255,255,0.3)",
// //                                 transition:
// //                                   "color 0.15s ease, background 0.15s ease",
// //                               }}
// //                               onMouseEnter={(e) => {
// //                                 e.currentTarget.style.color =
// //                                   "rgba(255,255,255,0.7)";
// //                                 e.currentTarget.style.background =
// //                                   "rgba(255,255,255,0.08)";
// //                               }}
// //                               onMouseLeave={(e) => {
// //                                 e.currentTarget.style.color =
// //                                   "rgba(255,255,255,0.3)";
// //                                 e.currentTarget.style.background =
// //                                   "transparent";
// //                               }}
// //                             >
// //                               <svg
// //                                 width="14"
// //                                 height="14"
// //                                 viewBox="0 0 24 24"
// //                                 fill="none"
// //                                 stroke="currentColor"
// //                                 strokeWidth="2"
// //                               >
// //                                 <circle cx="5" cy="12" r="1" />
// //                                 <circle cx="12" cy="12" r="1" />
// //                                 <circle cx="19" cy="12" r="1" />
// //                               </svg>
// //                             </button>

// //                             {activeCommentMenu === c._id && (
// //                               <div
// //                                 data-comment-menu
// //                                 style={{
// //                                   position: "absolute",
// //                                   right: 0,
// //                                   top: 30,
// //                                   zIndex: 50,
// //                                   width: 148,
// //                                   borderRadius: 12,
// //                                   background: "#1f1f1f",
// //                                   border: "0.5px solid rgba(255,255,255,0.1)",
// //                                   boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
// //                                   overflow: "hidden",
// //                                 }}
// //                               >
// //                                 <button
// //                                   onClick={() => handleDeleteComment(c._id)}
// //                                   style={{
// //                                     width: "100%",
// //                                     display: "flex",
// //                                     alignItems: "center",
// //                                     gap: 8,
// //                                     padding: "10px 12px",
// //                                     fontSize: 12,
// //                                     fontWeight: 500,
// //                                     color: "#f87171",
// //                                     background: "transparent",
// //                                     border: "none",
// //                                     cursor: "pointer",
// //                                     textAlign: "left",
// //                                     transition: "background 0.15s ease",
// //                                   }}
// //                                   onMouseEnter={(e) =>
// //                                     (e.currentTarget.style.background =
// //                                       "rgba(255,255,255,0.06)")
// //                                   }
// //                                   onMouseLeave={(e) =>
// //                                     (e.currentTarget.style.background =
// //                                       "transparent")
// //                                   }
// //                                 >
// //                                   <svg
// //                                     width="12"
// //                                     height="12"
// //                                     viewBox="0 0 24 24"
// //                                     fill="none"
// //                                     stroke="currentColor"
// //                                     strokeWidth="2"
// //                                     strokeLinecap="round"
// //                                     strokeLinejoin="round"
// //                                   >
// //                                     <polyline points="3 6 5 6 21 6" />
// //                                     <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
// //                                     <path d="M10 11v6M14 11v6" />
// //                                     <path d="M9 6V4h6v2" />
// //                                   </svg>
// //                                   Delete comment
// //                                 </button>
// //                               </div>
// //                             )}
// //                           </div>
// //                         )}
// //                       </div>
// //                     );
// //                   })
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Comment Input Bar */}
// //           <div
// //             style={{
// //               flexShrink: 0,
// //               borderTop: "0.5px solid rgba(255,255,255,0.06)",
// //               padding: "10px 12px",
// //               paddingBottom:
// //                 keyboardHeight === 0
// //                   ? "max(12px, env(safe-area-inset-bottom))"
// //                   : "10px",
// //               background: "#141414",
// //             }}
// //           >
// //             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //               <Avatar
// //                 username={user?.username || "?"}
// //                 profilePicture={user?.profilePicture}
// //                 size={30}
// //               />
// //               <div
// //                 style={{
// //                   flex: 1,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   background: "rgba(255,255,255,0.06)",
// //                   borderRadius: 24,
// //                   border: "0.5px solid rgba(255,255,255,0.08)",
// //                   padding: "8px 14px",
// //                   gap: 8,
// //                 }}
// //               >
// //                 <input
// //                   ref={inputRef}
// //                   value={comment}
// //                   onChange={(e) => setComment(e.target.value)}
// //                   onKeyDown={(e) => e.key === "Enter" && handlePost()}
// //                   placeholder="Add a comment…"
// //                   style={{
// //                     flex: 1,
// //                     background: "transparent",
// //                     border: "none",
// //                     outline: "none",
// //                     fontSize: 13,
// //                     color: "rgba(255,255,255,0.8)",
// //                     caretColor: "#60a5fa",
// //                   }}
// //                 />
// //                 {comment.trim() && (
// //                   <button
// //                     onClick={handlePost}
// //                     style={{
// //                       fontSize: 12,
// //                       fontWeight: 600,
// //                       color: "#60a5fa",
// //                       background: "transparent",
// //                       border: "none",
// //                       cursor: "pointer",
// //                       whiteSpace: "nowrap",
// //                       padding: 0,
// //                       transition: "opacity 0.15s ease",
// //                     }}
// //                   >
// //                     Post
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default CommentsBottomSheet;

// // import { useEffect, useRef, useState } from "react";
// // import fetchData from "../utils/fetchData";
// // import { useAuth } from "../hooks/useAuth";

// // function CommentsBottomSheet({
// //   post,
// //   onClose,
// //   onCommentAdded,
// //   onCommentDeleted,
// // }) {
// //   const { user } = useAuth();
// //   const [comment, setComment] = useState("");
// //   const [comments, setComments] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [contentVisible, setContentVisible] = useState(false);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [dragY, setDragY] = useState(0);
// //   const [visible, setVisible] = useState(false);
// //   const [activeCommentMenu, setActiveCommentMenu] = useState(null);
// //   const [keyboardHeight, setKeyboardHeight] = useState(0);
// //   const dragStartY = useRef(null);
// //   const sheetRef = useRef(null);
// //   const inputRef = useRef(null);

// //   useEffect(() => {
// //     requestAnimationFrame(() => setVisible(true));
// //   }, []);

// //   useEffect(() => {
// //     const viewport = window.visualViewport;
// //     if (!viewport) return;

// //     const handleResize = () => {
// //       const keyboardH = Math.max(
// //         0,
// //         window.innerHeight - viewport.height - viewport.offsetTop,
// //       );
// //       setKeyboardHeight(keyboardH);
// //     };

// //     viewport.addEventListener("resize", handleResize);
// //     viewport.addEventListener("scroll", handleResize);
// //     return () => {
// //       viewport.removeEventListener("resize", handleResize);
// //       viewport.removeEventListener("scroll", handleResize);
// //     };
// //   }, []);

// //   const handleClose = () => {
// //     setVisible(false);
// //     setTimeout(onClose, 320);
// //   };

// //   useEffect(() => {
// //     fetchData(`/api/posts/${post._id}/comments`, {
// //       credentials: "include",
// //     })
// //       .then((r) => r.json())
// //       .then((data) => {
// //         setComments(data.comments || []);
// //         setTimeout(() => {
// //           setLoading(false);
// //           requestAnimationFrame(() => setContentVisible(true));
// //         }, 300);
// //       })
// //       .catch(() => {
// //         setLoading(false);
// //         requestAnimationFrame(() => setContentVisible(true));
// //       });
// //   }, [post._id]);

// //  const handlePost = async () => {
// //    if (!comment.trim()) return;
// //    try {
// //      const res = await fetchData(`/api/posts/${post._id}/comments`, {
// //        method: "POST",
// //        headers: { "Content-Type": "application/json" },
// //        credentials: "include",
// //        body: JSON.stringify({ text: comment }),
// //      });
// //      const data = await res.json();
// //      setComments((prev) => [data.comment, ...prev]);
// //      setComment("");
// //      onCommentAdded?.(); // ← add this
// //    } catch (err) {
// //      console.error("Post comment error:", err);
// //    }
// //  };

// //   const handleDeleteComment = async (commentId) => {
// //     try {
// //       const res = await fetchData(
// //         `/api/posts/${post._id}/comments/${commentId}`,
// //         {
// //           method: "DELETE",
// //           credentials: "include",
// //         },
// //       );
// //       const data = await res.json();
// //       if (data.success) {
// //         setComments((prev) => prev.filter((c) => c._id !== commentId));
// //         setActiveCommentMenu(null);
// //         onCommentDeleted?.(); // ← add this
// //       }
// //     } catch (err) {
// //       console.error("Delete comment error:", err);
// //     }
// //   };

// //   const handleTouchStart = (e) => {
// //     dragStartY.current = e.touches[0].clientY;
// //     setIsDragging(true);
// //   };

// //   const handleTouchMove = (e) => {
// //     if (dragStartY.current === null) return;
// //     const delta = e.touches[0].clientY - dragStartY.current;
// //     if (delta > 0) setDragY(delta);
// //   };

// //   const handleTouchEnd = () => {
// //     if (dragY > 120) {
// //       handleClose();
// //     } else {
// //       setDragY(0);
// //     }
// //     setIsDragging(false);
// //     dragStartY.current = null;
// //   };

// //   const Avatar = ({ username, profilePicture, size = 32 }) => (
// //     <div
// //       style={{
// //         width: size,
// //         height: size,
// //         borderRadius: "50%",
// //         flexShrink: 0,
// //         overflow: "hidden",
// //       }}
// //     >
// //       {profilePicture ? (
// //         <img
// //           src={profilePicture}
// //           alt={username}
// //           style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //         />
// //       ) : (
// //         <div
// //           style={{
// //             width: "100%",
// //             height: "100%",
// //             background: `hsl(${(username?.charCodeAt(0) * 47) % 360}, 55%, 45%)`,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontSize: size * 0.38,
// //             fontWeight: 700,
// //             color: "#fff",
// //           }}
// //         >
// //           {username?.charAt(0).toUpperCase()}
// //         </div>
// //       )}
// //     </div>
// //   );

// //   return (
// //     <>
// //       <style>{`
// //         @keyframes shimmer {
// //           0% { background-position: -400px 0; }
// //           100% { background-position: 400px 0; }
// //         }
// //         .cbs-skeleton {
// //           background: linear-gradient(
// //             90deg,
// //             rgba(255,255,255,0.04) 25%,
// //             rgba(255,255,255,0.09) 50%,
// //             rgba(255,255,255,0.04) 75%
// //           );
// //           background-size: 400px 100%;
// //           animation: shimmer 1.4s ease infinite;
// //         }
// //         @keyframes fadeSlideIn {
// //           from { opacity: 0; transform: translateY(10px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         .cbs-comment-row {
// //           opacity: 0;
// //           animation: fadeSlideIn 0.28s ease forwards;
// //         }
// //       `}</style>

// //       {/* Backdrop */}
// //       <div
// //         onClick={handleClose}
// //         style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
// //         className="fixed inset-0 bg-black/60 z-[100] md:hidden backdrop-blur-[2px]"
// //       />

// //       {/* Sheet wrapper */}
// //       <div
// //         className="fixed inset-x-0 z-[101] flex justify-center md:hidden"
// //         style={{
// //           top: "10vh",
// //           bottom: 0,
// //           transform: `translateY(-${keyboardHeight}px)`,
// //           transition: isDragging ? "none" : "transform 0.22s ease",
// //           paddingBottom:
// //             keyboardHeight === 0 ? "env(safe-area-inset-bottom)" : 0,
// //         }}
// //       >
// //         <div
// //           ref={sheetRef}
// //           style={{
// //             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
// //             transition: isDragging
// //               ? "none"
// //               : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
// //             height: "100%",
// //             borderTop: "0.5px solid rgba(255,255,255,0.08)",
// //             background: "#141414",
// //             borderRadius: "16px 16px 0 0",
// //             display: "flex",
// //             flexDirection: "column",
// //             overflow: "hidden",
// //             boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
// //           }}
// //           className="w-full max-w-[470px]"
// //         >
// //           {/* Drag Handle + Header */}
// //           <div
// //             style={{
// //               flexShrink: 0,
// //               padding: "12px 16px 0",
// //               cursor: "grab",
// //               userSelect: "none",
// //             }}
// //             onTouchStart={handleTouchStart}
// //             onTouchMove={handleTouchMove}
// //             onTouchEnd={handleTouchEnd}
// //           >
// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 marginBottom: 12,
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   width: 36,
// //                   height: 4,
// //                   borderRadius: 99,
// //                   background: "rgba(255,255,255,0.15)",
// //                 }}
// //               />
// //             </div>
// //             <div
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "space-between",
// //                 paddingBottom: 12,
// //                 borderBottom: "0.5px solid rgba(255,255,255,0.07)",
// //               }}
// //             >
// //               <span
// //                 style={{
// //                   fontSize: 15,
// //                   fontWeight: 600,
// //                   color: "#fff",
// //                   letterSpacing: "0.01em",
// //                 }}
// //               >
// //                 Comments
// //               </span>
// //               <button
// //                 onClick={handleClose}
// //                 style={{
// //                   width: 28,
// //                   height: 28,
// //                   borderRadius: "50%",
// //                   background: "rgba(255,255,255,0.07)",
// //                   border: "0.5px solid rgba(255,255,255,0.1)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   cursor: "pointer",
// //                   transition: "background 0.15s ease",
// //                 }}
// //                 onMouseEnter={(e) =>
// //                   (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
// //                 }
// //                 onMouseLeave={(e) =>
// //                   (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
// //                 }
// //               >
// //                 <svg
// //                   width="10"
// //                   height="10"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="rgba(255,255,255,0.6)"
// //                   strokeWidth="2.5"
// //                   strokeLinecap="round"
// //                 >
// //                   <line x1="18" y1="6" x2="6" y2="18" />
// //                   <line x1="6" y1="6" x2="18" y2="18" />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Comments List */}
// //           <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
// //             {loading ? (
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: 20,
// //                   paddingTop: 4,
// //                 }}
// //               >
// //                 {[1, 2, 3, 4].map((i) => (
// //                   <div
// //                     key={i}
// //                     style={{
// //                       display: "flex",
// //                       gap: 12,
// //                       alignItems: "flex-start",
// //                       opacity: contentVisible ? 0 : 1,
// //                       transition: "opacity 0.2s ease",
// //                     }}
// //                   >
// //                     <div
// //                       className="cbs-skeleton"
// //                       style={{
// //                         width: 32,
// //                         height: 32,
// //                         borderRadius: "50%",
// //                         flexShrink: 0,
// //                       }}
// //                     />
// //                     <div
// //                       style={{
// //                         flex: 1,
// //                         display: "flex",
// //                         flexDirection: "column",
// //                         gap: 8,
// //                       }}
// //                     >
// //                       <div
// //                         className="cbs-skeleton"
// //                         style={{
// //                           height: 11,
// //                           borderRadius: 6,
// //                           width: `${[40, 55, 45, 50][i - 1]}%`,
// //                         }}
// //                       />
// //                       <div
// //                         className="cbs-skeleton"
// //                         style={{
// //                           height: 11,
// //                           borderRadius: 6,
// //                           width: `${[70, 85, 60, 75][i - 1]}%`,
// //                         }}
// //                       />
// //                       <div
// //                         className="cbs-skeleton"
// //                         style={{
// //                           height: 9,
// //                           borderRadius: 6,
// //                           width: "25%",
// //                           marginTop: 2,
// //                         }}
// //                       />
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div
// //                 style={{
// //                   opacity: contentVisible ? 1 : 0,
// //                   transform: contentVisible
// //                     ? "translateY(0)"
// //                     : "translateY(8px)",
// //                   transition: "opacity 0.35s ease, transform 0.35s ease",
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: 20,
// //                   paddingTop: 4,
// //                 }}
// //               >
// //                 {comments.length === 0 ? (
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                       gap: 8,
// //                       paddingTop: 60,
// //                       paddingBottom: 40,
// //                     }}
// //                   >
// //                     <svg
// //                       width="36"
// //                       height="36"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="rgba(255,255,255,0.12)"
// //                       strokeWidth="1.5"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                     >
// //                       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
// //                     </svg>
// //                     <p
// //                       style={{
// //                         color: "rgba(255,255,255,0.25)",
// //                         fontSize: 13,
// //                         margin: 0,
// //                       }}
// //                     >
// //                       No comments yet
// //                     </p>
// //                     <p
// //                       style={{
// //                         color: "rgba(255,255,255,0.15)",
// //                         fontSize: 12,
// //                         margin: 0,
// //                       }}
// //                     >
// //                       Be the first to comment
// //                     </p>
// //                   </div>
// //                 ) : (
// //                   comments.map((c, i) => {
// //                     const isMyComment =
// //                       String(user?._id) === String(c.user?._id);
// //                     return (
// //                       <div
// //                         key={c._id}
// //                         className="cbs-comment-row"
// //                         style={{
// //                           animationDelay: `${i * 50}ms`,
// //                           display: "flex",
// //                           gap: 12,
// //                           alignItems: "flex-start",
// //                           position: "relative",
// //                         }}
// //                       >
// //                         <Avatar
// //                           username={c.user.username}
// //                           profilePicture={c.user.profilePicture}
// //                           size={32}
// //                         />

// //                         <div style={{ flex: 1, minWidth: 0 }}>
// //                           <p
// //                             style={{
// //                               fontSize: 13,
// //                               lineHeight: 1.5,
// //                               color: "rgba(255,255,255,0.8)",
// //                               margin: 0,
// //                             }}
// //                           >
// //                             <span
// //                               style={{
// //                                 fontWeight: 600,
// //                                 color: "#fff",
// //                                 marginRight: 6,
// //                               }}
// //                             >
// //                               {c.user.username}
// //                             </span>
// //                             {c.text}
// //                           </p>
// //                           <p
// //                             style={{
// //                               fontSize: 11,
// //                               color: "rgba(255,255,255,0.25)",
// //                               margin: "4px 0 0",
// //                             }}
// //                           >
// //                             {new Date(c.createdAt).toLocaleDateString("en-US", {
// //                               month: "short",
// //                               day: "numeric",
// //                             })}
// //                           </p>
// //                         </div>

// //                         {/* Three dots — only for own comments */}
// //                         {isMyComment && (
// //                           <div
// //                             style={{ position: "relative", flexShrink: 0 }}
// //                             data-comment-menu
// //                           >
// //                             <button
// //                               onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 setActiveCommentMenu(
// //                                   activeCommentMenu === c._id ? null : c._id,
// //                                 );
// //                               }}
// //                               style={{
// //                                 width: 26,
// //                                 height: 26,
// //                                 borderRadius: "50%",
// //                                 background: "transparent",
// //                                 border: "none",
// //                                 display: "flex",
// //                                 alignItems: "center",
// //                                 justifyContent: "center",
// //                                 cursor: "pointer",
// //                                 color: "rgba(255,255,255,0.3)",
// //                                 transition:
// //                                   "color 0.15s ease, background 0.15s ease",
// //                               }}
// //                               onMouseEnter={(e) => {
// //                                 e.currentTarget.style.color =
// //                                   "rgba(255,255,255,0.7)";
// //                                 e.currentTarget.style.background =
// //                                   "rgba(255,255,255,0.08)";
// //                               }}
// //                               onMouseLeave={(e) => {
// //                                 e.currentTarget.style.color =
// //                                   "rgba(255,255,255,0.3)";
// //                                 e.currentTarget.style.background =
// //                                   "transparent";
// //                               }}
// //                             >
// //                               <svg
// //                                 width="14"
// //                                 height="14"
// //                                 viewBox="0 0 24 24"
// //                                 fill="none"
// //                                 stroke="currentColor"
// //                                 strokeWidth="2"
// //                               >
// //                                 <circle cx="5" cy="12" r="1" />
// //                                 <circle cx="12" cy="12" r="1" />
// //                                 <circle cx="19" cy="12" r="1" />
// //                               </svg>
// //                             </button>

// //                             {activeCommentMenu === c._id && (
// //                               <div
// //                                 data-comment-menu
// //                                 style={{
// //                                   position: "absolute",
// //                                   right: 0,
// //                                   top: 30,
// //                                   zIndex: 50,
// //                                   width: 148,
// //                                   borderRadius: 12,
// //                                   background: "#1f1f1f",
// //                                   border: "0.5px solid rgba(255,255,255,0.1)",
// //                                   boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
// //                                   overflow: "hidden",
// //                                 }}
// //                               >
// //                                 <button
// //                                   onClick={() => handleDeleteComment(c._id)}
// //                                   style={{
// //                                     width: "100%",
// //                                     display: "flex",
// //                                     alignItems: "center",
// //                                     gap: 8,
// //                                     padding: "10px 12px",
// //                                     fontSize: 12,
// //                                     fontWeight: 500,
// //                                     color: "#f87171",
// //                                     background: "transparent",
// //                                     border: "none",
// //                                     cursor: "pointer",
// //                                     textAlign: "left",
// //                                     transition: "background 0.15s ease",
// //                                   }}
// //                                   onMouseEnter={(e) =>
// //                                     (e.currentTarget.style.background =
// //                                       "rgba(255,255,255,0.06)")
// //                                   }
// //                                   onMouseLeave={(e) =>
// //                                     (e.currentTarget.style.background =
// //                                       "transparent")
// //                                   }
// //                                 >
// //                                   <svg
// //                                     width="12"
// //                                     height="12"
// //                                     viewBox="0 0 24 24"
// //                                     fill="none"
// //                                     stroke="currentColor"
// //                                     strokeWidth="2"
// //                                     strokeLinecap="round"
// //                                     strokeLinejoin="round"
// //                                   >
// //                                     <polyline points="3 6 5 6 21 6" />
// //                                     <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
// //                                     <path d="M10 11v6M14 11v6" />
// //                                     <path d="M9 6V4h6v2" />
// //                                   </svg>
// //                                   Delete comment
// //                                 </button>
// //                               </div>
// //                             )}
// //                           </div>
// //                         )}
// //                       </div>
// //                     );
// //                   })
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Comment Input Bar */}
// //           <div
// //             style={{
// //               flexShrink: 0,
// //               borderTop: "0.5px solid rgba(255,255,255,0.06)",
// //               padding: "10px 12px",
// //               paddingBottom:
// //                 keyboardHeight === 0
// //                   ? "max(12px, env(safe-area-inset-bottom))"
// //                   : "10px",
// //               background: "#141414",
// //             }}
// //           >
// //             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //               <Avatar
// //                 username={user?.username || "?"}
// //                 profilePicture={user?.profilePicture}
// //                 size={30}
// //               />
// //               <div
// //                 style={{
// //                   flex: 1,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   background: "rgba(255,255,255,0.06)",
// //                   borderRadius: 24,
// //                   border: "0.5px solid rgba(255,255,255,0.08)",
// //                   padding: "8px 14px",
// //                   gap: 8,
// //                 }}
// //               >
// //                 <input
// //                   ref={inputRef}
// //                   value={comment}
// //                   onChange={(e) => setComment(e.target.value)}
// //                   onKeyDown={(e) => e.key === "Enter" && handlePost()}
// //                   placeholder="Add a comment…"
// //                   style={{
// //                     flex: 1,
// //                     background: "transparent",
// //                     border: "none",
// //                     outline: "none",
// //                     fontSize: 13,
// //                     color: "rgba(255,255,255,0.8)",
// //                     caretColor: "#60a5fa",
// //                   }}
// //                 />
// //                 {comment.trim() && (
// //                   <button
// //                     onClick={handlePost}
// //                     style={{
// //                       fontSize: 12,
// //                       fontWeight: 600,
// //                       color: "#60a5fa",
// //                       background: "transparent",
// //                       border: "none",
// //                       cursor: "pointer",
// //                       whiteSpace: "nowrap",
// //                       padding: 0,
// //                       transition: "opacity 0.15s ease",
// //                     }}
// //                   >
// //                     Post
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default CommentsBottomSheet;

// // import { useEffect, useRef, useState } from "react";
// // import fetchData from "../utils/fetchData";
// // import { useAuth } from "../hooks/useAuth";

// // function CommentsBottomSheet({
// //   post,
// //   onClose,
// //   onCommentAdded,
// //   onCommentDeleted,
// // }) {
// //   const { user } = useAuth();
// //   const [comment, setComment] = useState("");
// //   const [comments, setComments] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [contentVisible, setContentVisible] = useState(false);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [dragY, setDragY] = useState(0);
// //   const [visible, setVisible] = useState(false);
// //   const [activeCommentMenu, setActiveCommentMenu] = useState(null);
// //   // Removed: keyboardHeight state — no longer using JS to track keyboard

// //   const dragStartY = useRef(null);
// //   const sheetRef = useRef(null);
// //   const inputRef = useRef(null);
// //   const listRef = useRef(null);

// //   useEffect(() => {
// //     requestAnimationFrame(() => setVisible(true));
// //   }, []);

// //   // ─── KEY FIX ───────────────────────────────────────────────────────────────
// //   // Instead of manually measuring the keyboard via visualViewport and applying
// //   // a translateY, we inject a meta viewport tag that tells iOS/Android to
// //   // resize the viewport when the keyboard opens, and use `dvh` units so the
// //   // sheet naturally shrinks to fit. This eliminates the gap + flicker entirely.
// //   //
// //   // We also set `interactive-widget=resizes-content` on Android Chrome (v108+)
// //   // via the viewport meta so the browser shrinks the layout viewport instead
// //   // of overlapping it with the keyboard.
// //   useEffect(() => {
// //     // Save existing meta content so we can restore it on unmount
// //     let metaViewport = document.querySelector('meta[name="viewport"]');
// //     const originalContent = metaViewport?.getAttribute("content") || "";

// //     if (!metaViewport) {
// //       metaViewport = document.createElement("meta");
// //       metaViewport.setAttribute("name", "viewport");
// //       document.head.appendChild(metaViewport);
// //     }

// //     // `interactive-widget=resizes-content` makes Android Chrome shrink the
// //     // layout viewport when the keyboard appears — exactly what we need.
// //     metaViewport.setAttribute(
// //       "content",
// //       "width=device-width, initial-scale=1, interactive-widget=resizes-content",
// //     );

// //     // Prevent body from scrolling behind the sheet
// //     const prevOverflow = document.body.style.overflow;
// //     document.body.style.overflow = "hidden";

// //     return () => {
// //       metaViewport.setAttribute("content", originalContent);
// //       document.body.style.overflow = prevOverflow;
// //     };
// //   }, []);

// //   // Close comment menus when clicking outside
// //   useEffect(() => {
// //     const handler = (e) => {
// //       if (!e.target.closest("[data-comment-menu]")) {
// //         setActiveCommentMenu(null);
// //       }
// //     };
// //     document.addEventListener("mousedown", handler);
// //     document.addEventListener("touchstart", handler);
// //     return () => {
// //       document.removeEventListener("mousedown", handler);
// //       document.removeEventListener("touchstart", handler);
// //     };
// //   }, []);

// //   const handleClose = () => {
// //     setVisible(false);
// //     setTimeout(onClose, 320);
// //   };

// //   useEffect(() => {
// //     fetchData(`/api/posts/${post._id}/comments`, { credentials: "include" })
// //       .then((r) => r.json())
// //       .then((data) => {
// //         setComments(data.comments || []);
// //         setTimeout(() => {
// //           setLoading(false);
// //           requestAnimationFrame(() => setContentVisible(true));
// //         }, 300);
// //       })
// //       .catch(() => {
// //         setLoading(false);
// //         requestAnimationFrame(() => setContentVisible(true));
// //       });
// //   }, [post._id]);

// //   // Scroll list to bottom when new comments are added
// //   useEffect(() => {
// //     if (!loading && listRef.current) {
// //       listRef.current.scrollTop = listRef.current.scrollHeight;
// //     }
// //   }, [comments, loading]);

// //   const handlePost = async () => {
// //     if (!comment.trim()) return;
// //     try {
// //       const res = await fetchData(`/api/posts/${post._id}/comments`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify({ text: comment }),
// //       });
// //       const data = await res.json();
// //       setComments((prev) => [data.comment, ...prev]);
// //       setComment("");
// //       onCommentAdded?.();
// //     } catch (err) {
// //       console.error("Post comment error:", err);
// //     }
// //   };

// //   const handleDeleteComment = async (commentId) => {
// //     try {
// //       const res = await fetchData(
// //         `/api/posts/${post._id}/comments/${commentId}`,
// //         { method: "DELETE", credentials: "include" },
// //       );
// //       const data = await res.json();
// //       if (data.success) {
// //         setComments((prev) => prev.filter((c) => c._id !== commentId));
// //         setActiveCommentMenu(null);
// //         onCommentDeleted?.();
// //       }
// //     } catch (err) {
// //       console.error("Delete comment error:", err);
// //     }
// //   };

// //   const handleTouchStart = (e) => {
// //     dragStartY.current = e.touches[0].clientY;
// //     setIsDragging(true);
// //   };

// //   const handleTouchMove = (e) => {
// //     if (dragStartY.current === null) return;
// //     const delta = e.touches[0].clientY - dragStartY.current;
// //     if (delta > 0) setDragY(delta);
// //   };

// //   const handleTouchEnd = () => {
// //     if (dragY > 120) {
// //       handleClose();
// //     } else {
// //       setDragY(0);
// //     }
// //     setIsDragging(false);
// //     dragStartY.current = null;
// //   };

// //   const Avatar = ({ username, profilePicture, size = 32 }) => (
// //     <div
// //       style={{
// //         width: size,
// //         height: size,
// //         borderRadius: "50%",
// //         flexShrink: 0,
// //         overflow: "hidden",
// //       }}
// //     >
// //       {profilePicture ? (
// //         <img
// //           src={profilePicture}
// //           alt={username}
// //           style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //         />
// //       ) : (
// //         <div
// //           style={{
// //             width: "100%",
// //             height: "100%",
// //             background: `hsl(${(username?.charCodeAt(0) * 47) % 360}, 55%, 45%)`,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontSize: size * 0.38,
// //             fontWeight: 700,
// //             color: "#fff",
// //           }}
// //         >
// //           {username?.charAt(0).toUpperCase()}
// //         </div>
// //       )}
// //     </div>
// //   );

// //   return (
// //     <>
// //       <style>{`
// //         @keyframes shimmer {
// //           0% { background-position: -400px 0; }
// //           100% { background-position: 400px 0; }
// //         }
// //         .cbs-skeleton {
// //           background: linear-gradient(
// //             90deg,
// //             rgba(255,255,255,0.04) 25%,
// //             rgba(255,255,255,0.09) 50%,
// //             rgba(255,255,255,0.04) 75%
// //           );
// //           background-size: 400px 100%;
// //           animation: shimmer 1.4s ease infinite;
// //         }
// //         @keyframes fadeSlideIn {
// //           from { opacity: 0; transform: translateY(10px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         .cbs-comment-row {
// //           opacity: 0;
// //           animation: fadeSlideIn 0.28s ease forwards;
// //         }

// //         /*
// //          * THE CORE FIX
// //          * ─────────────────────────────────────────────────────────────────────
// //          * Instead of position:fixed + manual keyboard offset, we use a full-
// //          * screen fixed backdrop that uses dvh (dynamic viewport height).
// //          * When the keyboard opens, dvh shrinks automatically on both iOS and
// //          * Android (with interactive-widget=resizes-content), so the sheet
// //          * naturally moves up with the keyboard — no JS, no flicker, no gap.
// //          *
// //          * We anchor the sheet to the BOTTOM of this container so it always
// //          * sits right above the keyboard.
// //          */
// //         .cbs-root {
// //           position: fixed;
// //           inset: 0;
// //           /* dvh accounts for the keyboard on both platforms */
// //           height: 100dvh;
// //           display: flex;
// //           flex-direction: column;
// //           justify-content: flex-end;
// //           z-index: 100;
// //           pointer-events: none;
// //         }
// //         .cbs-backdrop {
// //           position: absolute;
// //           inset: 0;
// //           background: rgba(0,0,0,0.6);
// //           backdrop-filter: blur(2px);
// //           pointer-events: all;
// //         }
// //         .cbs-sheet {
// //           position: relative;
// //           width: 100%;
// //           max-width: 470px;
// //           margin: 0 auto;
// //           display: flex;
// //           flex-direction: column;
// //           background: #141414;
// //           border-radius: 16px 16px 0 0;
// //           border-top: 0.5px solid rgba(255,255,255,0.08);
// //           box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
// //           pointer-events: all;
// //           /*
// //            * KEY FIX: Fixed height (not max-height, not dvh-based).
// //            * The sheet stays this tall always. When the keyboard opens,
// //            * cbs-root shrinks via dvh and the sheet simply rides upward
// //            * without collapsing. Only the internal list scrolls to adapt.
// //            */
// //           height: 72vh;
// //           padding-bottom: env(safe-area-inset-bottom);
// //           overflow: hidden;
// //           will-change: transform;
// //         }
// //         /* Input bar never shrinks — it stays pinned to the bottom of the sheet */
// //         .cbs-input-bar {
// //           flex-shrink: 0;
// //           border-top: 0.5px solid rgba(255,255,255,0.06);
// //           padding: 10px 12px 12px;
// //           background: #141414;
// //         }
// //         /* Comment list fills remaining space and scrolls — the only thing that adapts */
// //         .cbs-list {
// //           flex: 1;
// //           min-height: 0;
// //           overflow-y: auto;
// //           -webkit-overflow-scrolling: touch;
// //           overscroll-behavior: contain;
// //           padding: 12px 16px;
// //         }
// //       `}</style>

// //       <div className="cbs-root md:hidden">
// //         {/* Backdrop */}
// //         <div
// //           className="cbs-backdrop"
// //           onClick={handleClose}
// //           style={{
// //             opacity: visible ? 1 : 0,
// //             transition: "opacity 0.3s ease",
// //           }}
// //         />

// //         {/* Sheet */}
// //         <div
// //           ref={sheetRef}
// //           className="cbs-sheet"
// //           style={{
// //             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
// //             transition: isDragging
// //               ? "none"
// //               : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
// //           }}
// //         >
// //           {/* Drag Handle + Header */}
// //           <div
// //             style={{
// //               flexShrink: 0,
// //               padding: "12px 16px 0",
// //               cursor: "grab",
// //               userSelect: "none",
// //             }}
// //             onTouchStart={handleTouchStart}
// //             onTouchMove={handleTouchMove}
// //             onTouchEnd={handleTouchEnd}
// //           >
// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 marginBottom: 12,
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   width: 36,
// //                   height: 4,
// //                   borderRadius: 99,
// //                   background: "rgba(255,255,255,0.15)",
// //                 }}
// //               />
// //             </div>
// //             <div
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "space-between",
// //                 paddingBottom: 12,
// //                 borderBottom: "0.5px solid rgba(255,255,255,0.07)",
// //               }}
// //             >
// //               <span
// //                 style={{
// //                   fontSize: 15,
// //                   fontWeight: 600,
// //                   color: "#fff",
// //                   letterSpacing: "0.01em",
// //                 }}
// //               >
// //                 Comments
// //               </span>
// //               <button
// //                 onClick={handleClose}
// //                 style={{
// //                   width: 28,
// //                   height: 28,
// //                   borderRadius: "50%",
// //                   background: "rgba(255,255,255,0.07)",
// //                   border: "0.5px solid rgba(255,255,255,0.1)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   cursor: "pointer",
// //                   transition: "background 0.15s ease",
// //                 }}
// //                 onMouseEnter={(e) =>
// //                   (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
// //                 }
// //                 onMouseLeave={(e) =>
// //                   (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
// //                 }
// //               >
// //                 <svg
// //                   width="10"
// //                   height="10"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="rgba(255,255,255,0.6)"
// //                   strokeWidth="2.5"
// //                   strokeLinecap="round"
// //                 >
// //                   <line x1="18" y1="6" x2="6" y2="18" />
// //                   <line x1="6" y1="6" x2="18" y2="18" />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Comments List */}
// //           <div ref={listRef} className="cbs-list">
// //             {loading ? (
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: 20,
// //                   paddingTop: 4,
// //                 }}
// //               >
// //                 {[1, 2, 3, 4].map((i) => (
// //                   <div
// //                     key={i}
// //                     style={{
// //                       display: "flex",
// //                       gap: 12,
// //                       alignItems: "flex-start",
// //                       opacity: contentVisible ? 0 : 1,
// //                       transition: "opacity 0.2s ease",
// //                     }}
// //                   >
// //                     <div
// //                       className="cbs-skeleton"
// //                       style={{
// //                         width: 32,
// //                         height: 32,
// //                         borderRadius: "50%",
// //                         flexShrink: 0,
// //                       }}
// //                     />
// //                     <div
// //                       style={{
// //                         flex: 1,
// //                         display: "flex",
// //                         flexDirection: "column",
// //                         gap: 8,
// //                       }}
// //                     >
// //                       <div
// //                         className="cbs-skeleton"
// //                         style={{
// //                           height: 11,
// //                           borderRadius: 6,
// //                           width: `${[40, 55, 45, 50][i - 1]}%`,
// //                         }}
// //                       />
// //                       <div
// //                         className="cbs-skeleton"
// //                         style={{
// //                           height: 11,
// //                           borderRadius: 6,
// //                           width: `${[70, 85, 60, 75][i - 1]}%`,
// //                         }}
// //                       />
// //                       <div
// //                         className="cbs-skeleton"
// //                         style={{
// //                           height: 9,
// //                           borderRadius: 6,
// //                           width: "25%",
// //                           marginTop: 2,
// //                         }}
// //                       />
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div
// //                 style={{
// //                   opacity: contentVisible ? 1 : 0,
// //                   transform: contentVisible
// //                     ? "translateY(0)"
// //                     : "translateY(8px)",
// //                   transition: "opacity 0.35s ease, transform 0.35s ease",
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: 20,
// //                   paddingTop: 4,
// //                 }}
// //               >
// //                 {comments.length === 0 ? (
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                       gap: 8,
// //                       paddingTop: 60,
// //                       paddingBottom: 40,
// //                     }}
// //                   >
// //                     <svg
// //                       width="36"
// //                       height="36"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="rgba(255,255,255,0.12)"
// //                       strokeWidth="1.5"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                     >
// //                       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
// //                     </svg>
// //                     <p
// //                       style={{
// //                         color: "rgba(255,255,255,0.25)",
// //                         fontSize: 13,
// //                         margin: 0,
// //                       }}
// //                     >
// //                       No comments yet
// //                     </p>
// //                     <p
// //                       style={{
// //                         color: "rgba(255,255,255,0.15)",
// //                         fontSize: 12,
// //                         margin: 0,
// //                       }}
// //                     >
// //                       Be the first to comment
// //                     </p>
// //                   </div>
// //                 ) : (
// //                   comments.map((c, i) => {
// //                     const isMyComment =
// //                       String(user?._id) === String(c.user?._id);
// //                     return (
// //                       <div
// //                         key={c._id}
// //                         className="cbs-comment-row"
// //                         style={{
// //                           animationDelay: `${i * 50}ms`,
// //                           display: "flex",
// //                           gap: 12,
// //                           alignItems: "flex-start",
// //                           position: "relative",
// //                         }}
// //                       >
// //                         <Avatar
// //                           username={c.user.username}
// //                           profilePicture={c.user.profilePicture}
// //                           size={32}
// //                         />
// //                         <div style={{ flex: 1, minWidth: 0 }}>
// //                           <p
// //                             style={{
// //                               fontSize: 13,
// //                               lineHeight: 1.5,
// //                               color: "rgba(255,255,255,0.8)",
// //                               margin: 0,
// //                             }}
// //                           >
// //                             <span
// //                               style={{
// //                                 fontWeight: 600,
// //                                 color: "#fff",
// //                                 marginRight: 6,
// //                               }}
// //                             >
// //                               {c.user.username}
// //                             </span>
// //                             {c.text}
// //                           </p>
// //                           <p
// //                             style={{
// //                               fontSize: 11,
// //                               color: "rgba(255,255,255,0.25)",
// //                               margin: "4px 0 0",
// //                             }}
// //                           >
// //                             {new Date(c.createdAt).toLocaleDateString("en-US", {
// //                               month: "short",
// //                               day: "numeric",
// //                             })}
// //                           </p>
// //                         </div>

// //                         {isMyComment && (
// //                           <div
// //                             style={{ position: "relative", flexShrink: 0 }}
// //                             data-comment-menu
// //                           >
// //                             <button
// //                               onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 setActiveCommentMenu(
// //                                   activeCommentMenu === c._id ? null : c._id,
// //                                 );
// //                               }}
// //                               style={{
// //                                 width: 26,
// //                                 height: 26,
// //                                 borderRadius: "50%",
// //                                 background: "transparent",
// //                                 border: "none",
// //                                 display: "flex",
// //                                 alignItems: "center",
// //                                 justifyContent: "center",
// //                                 cursor: "pointer",
// //                                 color: "rgba(255,255,255,0.3)",
// //                                 transition:
// //                                   "color 0.15s ease, background 0.15s ease",
// //                               }}
// //                               onMouseEnter={(e) => {
// //                                 e.currentTarget.style.color =
// //                                   "rgba(255,255,255,0.7)";
// //                                 e.currentTarget.style.background =
// //                                   "rgba(255,255,255,0.08)";
// //                               }}
// //                               onMouseLeave={(e) => {
// //                                 e.currentTarget.style.color =
// //                                   "rgba(255,255,255,0.3)";
// //                                 e.currentTarget.style.background =
// //                                   "transparent";
// //                               }}
// //                             >
// //                               <svg
// //                                 width="14"
// //                                 height="14"
// //                                 viewBox="0 0 24 24"
// //                                 fill="none"
// //                                 stroke="currentColor"
// //                                 strokeWidth="2"
// //                               >
// //                                 <circle cx="5" cy="12" r="1" />
// //                                 <circle cx="12" cy="12" r="1" />
// //                                 <circle cx="19" cy="12" r="1" />
// //                               </svg>
// //                             </button>

// //                             {activeCommentMenu === c._id && (
// //                               <div
// //                                 data-comment-menu
// //                                 style={{
// //                                   position: "absolute",
// //                                   right: 0,
// //                                   top: 30,
// //                                   zIndex: 50,
// //                                   width: 148,
// //                                   borderRadius: 12,
// //                                   background: "#1f1f1f",
// //                                   border: "0.5px solid rgba(255,255,255,0.1)",
// //                                   boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
// //                                   overflow: "hidden",
// //                                 }}
// //                               >
// //                                 <button
// //                                   onClick={() => handleDeleteComment(c._id)}
// //                                   style={{
// //                                     width: "100%",
// //                                     display: "flex",
// //                                     alignItems: "center",
// //                                     gap: 8,
// //                                     padding: "10px 12px",
// //                                     fontSize: 12,
// //                                     fontWeight: 500,
// //                                     color: "#f87171",
// //                                     background: "transparent",
// //                                     border: "none",
// //                                     cursor: "pointer",
// //                                     textAlign: "left",
// //                                     transition: "background 0.15s ease",
// //                                   }}
// //                                   onMouseEnter={(e) =>
// //                                     (e.currentTarget.style.background =
// //                                       "rgba(255,255,255,0.06)")
// //                                   }
// //                                   onMouseLeave={(e) =>
// //                                     (e.currentTarget.style.background =
// //                                       "transparent")
// //                                   }
// //                                 >
// //                                   <svg
// //                                     width="12"
// //                                     height="12"
// //                                     viewBox="0 0 24 24"
// //                                     fill="none"
// //                                     stroke="currentColor"
// //                                     strokeWidth="2"
// //                                     strokeLinecap="round"
// //                                     strokeLinejoin="round"
// //                                   >
// //                                     <polyline points="3 6 5 6 21 6" />
// //                                     <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
// //                                     <path d="M10 11v6M14 11v6" />
// //                                     <path d="M9 6V4h6v2" />
// //                                   </svg>
// //                                   Delete comment
// //                                 </button>
// //                               </div>
// //                             )}
// //                           </div>
// //                         )}
// //                       </div>
// //                     );
// //                   })
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Comment Input Bar — always pinned to bottom of sheet */}
// //           <div className="cbs-input-bar">
// //             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //               <Avatar
// //                 username={user?.username || "?"}
// //                 profilePicture={user?.profilePicture}
// //                 size={30}
// //               />
// //               <div
// //                 style={{
// //                   flex: 1,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   background: "rgba(255,255,255,0.06)",
// //                   borderRadius: 24,
// //                   border: "0.5px solid rgba(255,255,255,0.08)",
// //                   padding: "8px 14px",
// //                   gap: 8,
// //                 }}
// //               >
// //                 <input
// //                   ref={inputRef}
// //                   value={comment}
// //                   onChange={(e) => setComment(e.target.value)}
// //                   onKeyDown={(e) => e.key === "Enter" && handlePost()}
// //                   placeholder="Add a comment…"
// //                   // Prevent iOS from zooming on focus (font-size >= 16px)
// //                   style={{
// //                     flex: 1,
// //                     background: "transparent",
// //                     border: "none",
// //                     outline: "none",
// //                     fontSize: 16,
// //                     color: "rgba(255,255,255,0.8)",
// //                     caretColor: "#60a5fa",
// //                   }}
// //                 />
// //                 {comment.trim() && (
// //                   <button
// //                     onClick={handlePost}
// //                     style={{
// //                       fontSize: 12,
// //                       fontWeight: 600,
// //                       color: "#60a5fa",
// //                       background: "transparent",
// //                       border: "none",
// //                       cursor: "pointer",
// //                       whiteSpace: "nowrap",
// //                       padding: 0,
// //                       transition: "opacity 0.15s ease",
// //                     }}
// //                   >
// //                     Post
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default CommentsBottomSheet;

// // import { useEffect, useRef, useState } from "react";
// // import fetchData from "../utils/fetchData";
// // import { useAuth } from "../hooks/useAuth";

// // function CommentsBottomSheet({
// //   post,
// //   onClose,
// //   onCommentAdded,
// //   onCommentDeleted,
// // }) {
// //   const { user } = useAuth();
// //   const [comment, setComment] = useState("");
// //   const [comments, setComments] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [contentVisible, setContentVisible] = useState(false);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [dragY, setDragY] = useState(0);
// //   const [visible, setVisible] = useState(false);
// //   const [activeCommentMenu, setActiveCommentMenu] = useState(null);

// //   const dragStartY = useRef(null);
// //   const sheetRef = useRef(null);
// //   const inputRef = useRef(null);
// //   const listRef = useRef(null);

// //   useEffect(() => {
// //     requestAnimationFrame(() => setVisible(true));
// //   }, []);

// //   // ─── VIEWPORT / KEYBOARD FIX ──────────────────────────────────────────────
// //   //
// //   // Strategy: Two-pronged approach for maximum cross-platform coverage.
// //   //
// //   // 1. META VIEWPORT TAG
// //   //    `interactive-widget=resizes-content` tells Android Chrome (v108+) to
// //   //    shrink the layout viewport when the keyboard opens, rather than
// //   //    overlapping it. Combined with `height: 100dvh` on .cbs-root, the
// //   //    sheet rides up automatically — zero JS needed on Android.
// //   //
// //   // 2. visualViewport API (iOS Safari + older Android fallback)
// //   //    iOS Safari does NOT respect `interactive-widget` or shrink dvh when
// //   //    the keyboard opens — it just overlaps. So we listen to visualViewport
// //   //    resize events and apply a CSS custom property `--vvh` (visual viewport
// //   //    height) that the sheet uses instead of dvh. This makes the sheet
// //   //    shrink to the visible area above the keyboard on iOS.
// //   //
// //   // 3. BODY SCROLL LOCK
// //   //    Prevents the page from rubber-band-scrolling behind the sheet on iOS.
// //   //
// //   useEffect(() => {
// //     // ── 1. Patch viewport meta ──────────────────────────────────────────────
// //     let metaViewport = document.querySelector('meta[name="viewport"]');
// //     const originalContent = metaViewport?.getAttribute("content") ?? "";

// //     if (!metaViewport) {
// //       metaViewport = document.createElement("meta");
// //       metaViewport.setAttribute("name", "viewport");
// //       document.head.appendChild(metaViewport);
// //     }
// //     metaViewport.setAttribute(
// //       "content",
// //       "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content",
// //     );

// //     // ── 2. visualViewport listener (iOS + fallback) ─────────────────────────
// //     const setVVH = () => {
// //       const h = window.visualViewport?.height ?? window.innerHeight;
// //       // Expose as CSS var so .cbs-root can use it directly
// //       document.documentElement.style.setProperty("--vvh", `${h}px`);
// //     };
// //     setVVH(); // run once immediately
// //     window.visualViewport?.addEventListener("resize", setVVH);
// //     window.visualViewport?.addEventListener("scroll", setVVH);
// //     // Fallback for browsers without visualViewport
// //     window.addEventListener("resize", setVVH);

// //     // ── 3. Body scroll lock ─────────────────────────────────────────────────
// //     const prevOverflow = document.body.style.overflow;
// //     const prevPosition = document.body.style.position;
// //     document.body.style.overflow = "hidden";
// //     // `position: fixed` on body is the most reliable iOS scroll-lock
// //     document.body.style.position = "fixed";
// //     document.body.style.width = "100%";

// //     return () => {
// //       metaViewport.setAttribute("content", originalContent);
// //       window.visualViewport?.removeEventListener("resize", setVVH);
// //       window.visualViewport?.removeEventListener("scroll", setVVH);
// //       window.removeEventListener("resize", setVVH);
// //       document.body.style.overflow = prevOverflow;
// //       document.body.style.position = prevPosition;
// //       document.body.style.width = "";
// //       document.documentElement.style.removeProperty("--vvh");
// //     };
// //   }, []);

// //   // Scroll list to bottom when new comments load
// //   useEffect(() => {
// //     if (!loading && listRef.current) {
// //       listRef.current.scrollTop = listRef.current.scrollHeight;
// //     }
// //   }, [comments, loading]);

// //   // Close comment menus when clicking/tapping outside
// //   useEffect(() => {
// //     const handler = (e) => {
// //       if (!e.target.closest("[data-comment-menu]")) {
// //         setActiveCommentMenu(null);
// //       }
// //     };
// //     document.addEventListener("mousedown", handler);
// //     document.addEventListener("touchstart", handler, { passive: true });
// //     return () => {
// //       document.removeEventListener("mousedown", handler);
// //       document.removeEventListener("touchstart", handler);
// //     };
// //   }, []);

// //   const handleClose = () => {
// //     setVisible(false);
// //     setTimeout(onClose, 320);
// //   };

// //   useEffect(() => {
// //     fetchData(`/api/posts/${post._id}/comments`, { credentials: "include" })
// //       .then((r) => r.json())
// //       .then((data) => {
// //         setComments(data.comments || []);
// //         setTimeout(() => {
// //           setLoading(false);
// //           requestAnimationFrame(() => setContentVisible(true));
// //         }, 300);
// //       })
// //       .catch(() => {
// //         setLoading(false);
// //         requestAnimationFrame(() => setContentVisible(true));
// //       });
// //   }, [post._id]);

// //   const handlePost = async () => {
// //     if (!comment.trim()) return;
// //     try {
// //       const res = await fetchData(`/api/posts/${post._id}/comments`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify({ text: comment }),
// //       });
// //       const data = await res.json();
// //       setComments((prev) => [data.comment, ...prev]);
// //       setComment("");
// //       onCommentAdded?.();
// //     } catch (err) {
// //       console.error("Post comment error:", err);
// //     }
// //   };

// //   const handleDeleteComment = async (commentId) => {
// //     try {
// //       const res = await fetchData(
// //         `/api/posts/${post._id}/comments/${commentId}`,
// //         { method: "DELETE", credentials: "include" },
// //       );
// //       const data = await res.json();
// //       if (data.success) {
// //         setComments((prev) => prev.filter((c) => c._id !== commentId));
// //         setActiveCommentMenu(null);
// //         onCommentDeleted?.();
// //       }
// //     } catch (err) {
// //       console.error("Delete comment error:", err);
// //     }
// //   };

// //   // ── Drag to dismiss ─────────────────────────────────────────────────────────
// //   const handleTouchStart = (e) => {
// //     dragStartY.current = e.touches[0].clientY;
// //     setIsDragging(true);
// //   };
// //   const handleTouchMove = (e) => {
// //     if (dragStartY.current === null) return;
// //     const delta = e.touches[0].clientY - dragStartY.current;
// //     if (delta > 0) setDragY(delta);
// //   };
// //   const handleTouchEnd = () => {
// //     if (dragY > 120) handleClose();
// //     else setDragY(0);
// //     setIsDragging(false);
// //     dragStartY.current = null;
// //   };

// //   const Avatar = ({ username, profilePicture, size = 32 }) => (
// //     <div
// //       style={{
// //         width: size,
// //         height: size,
// //         borderRadius: "50%",
// //         flexShrink: 0,
// //         overflow: "hidden",
// //       }}
// //     >
// //       {profilePicture ? (
// //         <img
// //           src={profilePicture}
// //           alt={username}
// //           style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //         />
// //       ) : (
// //         <div
// //           style={{
// //             width: "100%",
// //             height: "100%",
// //             background: `hsl(${(username?.charCodeAt(0) * 47) % 360}, 55%, 45%)`,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontSize: size * 0.38,
// //             fontWeight: 700,
// //             color: "#fff",
// //           }}
// //         >
// //           {username?.charAt(0).toUpperCase()}
// //         </div>
// //       )}
// //     </div>
// //   );

// //   return (
// //     <>
// //       <style>{`
// //         @keyframes shimmer {
// //           0%   { background-position: -400px 0; }
// //           100% { background-position:  400px 0; }
// //         }
// //         .cbs-skeleton {
// //           background: linear-gradient(
// //             90deg,
// //             rgba(255,255,255,0.04) 25%,
// //             rgba(255,255,255,0.09) 50%,
// //             rgba(255,255,255,0.04) 75%
// //           );
// //           background-size: 400px 100%;
// //           animation: shimmer 1.4s ease infinite;
// //         }
// //         @keyframes fadeSlideIn {
// //           from { opacity: 0; transform: translateY(10px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         .cbs-comment-row {
// //           opacity: 0;
// //           animation: fadeSlideIn 0.28s ease forwards;
// //         }

// //         /*
// //          * ROOT
// //          * Uses --vvh (set by JS above) so the overlay always matches the
// //          * VISIBLE viewport — i.e. the area above the keyboard.
// //          * Falls back to 100dvh if JS hasn't run yet (first paint).
// //          * On Android with interactive-widget=resizes-content, dvh itself
// //          * shrinks with the keyboard, so either value works there.
// //          */
// //         .cbs-root {
// //           position: fixed;
// //           inset: 0;
// //           height: var(--vvh, 100dvh);
// //           display: flex;
// //           flex-direction: column;
// //           justify-content: flex-end;
// //           z-index: 100;
// //           pointer-events: none;
// //         }

// //         .cbs-backdrop {
// //           position: absolute;
// //           inset: 0;
// //           background: rgba(0,0,0,0.6);
// //           backdrop-filter: blur(2px);
// //           -webkit-backdrop-filter: blur(2px);
// //           pointer-events: all;
// //         }

// //         /*
// //          * SHEET
// //          * height: 72vh keeps the sheet a fixed proportion of the screen.
// //          * When --vvh shrinks (keyboard opens), the sheet slides up as a
// //          * unit — the internal list scrolls, nothing gets squished.
// //          * max-height: 100% caps it so it never overflows on tiny phones.
// //          */
// //         .cbs-sheet {
// //           position: relative;
// //           width: 100%;
// //           max-width: 470px;
// //           margin: 0 auto;
// //           display: flex;
// //           flex-direction: column;
// //           background: #141414;
// //           border-radius: 16px 16px 0 0;
// //           border-top: 0.5px solid rgba(255,255,255,0.08);
// //           box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
// //           pointer-events: all;
// //           height: 72vh;
// //           max-height: 100%;
// //           /* Safe area for devices with home indicators (iPhone X+) */
// //           padding-bottom: env(safe-area-inset-bottom);
// //           overflow: hidden;
// //           will-change: transform;
// //         }

// //         /* Input bar — pinned to bottom of sheet, never shrinks */
// //         .cbs-input-bar {
// //           flex-shrink: 0;
// //           border-top: 0.5px solid rgba(255,255,255,0.06);
// //           padding: 10px 12px 12px;
// //           background: #141414;
// //         }

// //         /*
// //          * INPUT FIELD
// //          * font-size: 16px is CRITICAL on iOS — anything smaller triggers
// //          * automatic zoom-in when the field is focused, which breaks layout.
// //          * We also disable all autocorrect/autocomplete/spellcheck features
// //          * that cause the "suggestions bar" to appear above the keyboard.
// //          */
// //         .cbs-input {
// //           flex: 1;
// //           background: transparent;
// //           border: none;
// //           outline: none;
// //           font-size: 16px;
// //           color: rgba(255,255,255,0.8);
// //           caret-color: #60a5fa;
// //           /* Kill autocomplete toolbar suggestions */
// //           -webkit-user-modify: read-write-plaintext-only;
// //         }

// //         /* Comment list — scrollable, fills remaining space */
// //         .cbs-list {
// //           flex: 1;
// //           min-height: 0;
// //           overflow-y: auto;
// //           -webkit-overflow-scrolling: touch;
// //           overscroll-behavior: contain;
// //           padding: 12px 16px;
// //         }

// //         /* Ensure tap targets are comfortable on mobile */
// //         .cbs-touch-btn {
// //           -webkit-tap-highlight-color: transparent;
// //           touch-action: manipulation;
// //           user-select: none;
// //           min-height: 44px;
// //           min-width: 44px;
// //         }
// //       `}</style>

// //       <div className="cbs-root md:hidden">
// //         {/* Backdrop */}
// //         <div
// //           className="cbs-backdrop"
// //           onClick={handleClose}
// //           style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
// //         />

// //         {/* Sheet */}
// //         <div
// //           ref={sheetRef}
// //           className="cbs-sheet"
// //           style={{
// //             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
// //             transition: isDragging
// //               ? "none"
// //               : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
// //           }}
// //         >
// //           {/* Drag Handle + Header */}
// //           <div
// //             style={{
// //               flexShrink: 0,
// //               padding: "12px 16px 0",
// //               cursor: "grab",
// //               userSelect: "none",
// //             }}
// //             onTouchStart={handleTouchStart}
// //             onTouchMove={handleTouchMove}
// //             onTouchEnd={handleTouchEnd}
// //           >
// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 marginBottom: 12,
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   width: 36,
// //                   height: 4,
// //                   borderRadius: 99,
// //                   background: "rgba(255,255,255,0.15)",
// //                 }}
// //               />
// //             </div>
// //             <div
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "space-between",
// //                 paddingBottom: 12,
// //                 borderBottom: "0.5px solid rgba(255,255,255,0.07)",
// //               }}
// //             >
// //               <span
// //                 style={{
// //                   fontSize: 15,
// //                   fontWeight: 600,
// //                   color: "#fff",
// //                   letterSpacing: "0.01em",
// //                 }}
// //               >
// //                 Comments
// //               </span>
// //               <button
// //                 className="cbs-touch-btn"
// //                 onClick={handleClose}
// //                 style={{
// //                   width: 28,
// //                   height: 28,
// //                   borderRadius: "50%",
// //                   background: "rgba(255,255,255,0.07)",
// //                   border: "0.5px solid rgba(255,255,255,0.1)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   cursor: "pointer",
// //                   transition: "background 0.15s ease",
// //                 }}
// //                 onMouseEnter={(e) =>
// //                   (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
// //                 }
// //                 onMouseLeave={(e) =>
// //                   (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
// //                 }
// //               >
// //                 <svg
// //                   width="10"
// //                   height="10"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="rgba(255,255,255,0.6)"
// //                   strokeWidth="2.5"
// //                   strokeLinecap="round"
// //                 >
// //                   <line x1="18" y1="6" x2="6" y2="18" />
// //                   <line x1="6" y1="6" x2="18" y2="18" />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Comments List */}
// //           <div ref={listRef} className="cbs-list">
// //             {loading ? (
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: 20,
// //                   paddingTop: 4,
// //                 }}
// //               >
// //                 {[1, 2, 3, 4].map((i) => (
// //                   <div
// //                     key={i}
// //                     style={{
// //                       display: "flex",
// //                       gap: 12,
// //                       alignItems: "flex-start",
// //                       opacity: contentVisible ? 0 : 1,
// //                       transition: "opacity 0.2s ease",
// //                     }}
// //                   >
// //                     <div
// //                       className="cbs-skeleton"
// //                       style={{
// //                         width: 32,
// //                         height: 32,
// //                         borderRadius: "50%",
// //                         flexShrink: 0,
// //                       }}
// //                     />
// //                     <div
// //                       style={{
// //                         flex: 1,
// //                         display: "flex",
// //                         flexDirection: "column",
// //                         gap: 8,
// //                       }}
// //                     >
// //                       <div
// //                         className="cbs-skeleton"
// //                         style={{
// //                           height: 11,
// //                           borderRadius: 6,
// //                           width: `${[40, 55, 45, 50][i - 1]}%`,
// //                         }}
// //                       />
// //                       <div
// //                         className="cbs-skeleton"
// //                         style={{
// //                           height: 11,
// //                           borderRadius: 6,
// //                           width: `${[70, 85, 60, 75][i - 1]}%`,
// //                         }}
// //                       />
// //                       <div
// //                         className="cbs-skeleton"
// //                         style={{
// //                           height: 9,
// //                           borderRadius: 6,
// //                           width: "25%",
// //                           marginTop: 2,
// //                         }}
// //                       />
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div
// //                 style={{
// //                   opacity: contentVisible ? 1 : 0,
// //                   transform: contentVisible
// //                     ? "translateY(0)"
// //                     : "translateY(8px)",
// //                   transition: "opacity 0.35s ease, transform 0.35s ease",
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: 20,
// //                   paddingTop: 4,
// //                 }}
// //               >
// //                 {comments.length === 0 ? (
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                       gap: 8,
// //                       paddingTop: 60,
// //                       paddingBottom: 40,
// //                     }}
// //                   >
// //                     <svg
// //                       width="36"
// //                       height="36"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="rgba(255,255,255,0.12)"
// //                       strokeWidth="1.5"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                     >
// //                       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
// //                     </svg>
// //                     <p
// //                       style={{
// //                         color: "rgba(255,255,255,0.25)",
// //                         fontSize: 13,
// //                         margin: 0,
// //                       }}
// //                     >
// //                       No comments yet
// //                     </p>
// //                     <p
// //                       style={{
// //                         color: "rgba(255,255,255,0.15)",
// //                         fontSize: 12,
// //                         margin: 0,
// //                       }}
// //                     >
// //                       Be the first to comment
// //                     </p>
// //                   </div>
// //                 ) : (
// //                   comments.map((c, i) => {
// //                     const isMyComment =
// //                       String(user?._id) === String(c.user?._id);
// //                     return (
// //                       <div
// //                         key={c._id}
// //                         className="cbs-comment-row"
// //                         style={{
// //                           animationDelay: `${i * 50}ms`,
// //                           display: "flex",
// //                           gap: 12,
// //                           alignItems: "flex-start",
// //                           position: "relative",
// //                         }}
// //                       >
// //                         <Avatar
// //                           username={c.user.username}
// //                           profilePicture={c.user.profilePicture}
// //                           size={32}
// //                         />
// //                         <div style={{ flex: 1, minWidth: 0 }}>
// //                           <p
// //                             style={{
// //                               fontSize: 13,
// //                               lineHeight: 1.5,
// //                               color: "rgba(255,255,255,0.8)",
// //                               margin: 0,
// //                             }}
// //                           >
// //                             <span
// //                               style={{
// //                                 fontWeight: 600,
// //                                 color: "#fff",
// //                                 marginRight: 6,
// //                               }}
// //                             >
// //                               {c.user.username}
// //                             </span>
// //                             {c.text}
// //                           </p>
// //                           <p
// //                             style={{
// //                               fontSize: 11,
// //                               color: "rgba(255,255,255,0.25)",
// //                               margin: "4px 0 0",
// //                             }}
// //                           >
// //                             {new Date(c.createdAt).toLocaleDateString("en-US", {
// //                               month: "short",
// //                               day: "numeric",
// //                             })}
// //                           </p>
// //                         </div>

// //                         {isMyComment && (
// //                           <div
// //                             style={{ position: "relative", flexShrink: 0 }}
// //                             data-comment-menu
// //                           >
// //                             <button
// //                               className="cbs-touch-btn"
// //                               onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 setActiveCommentMenu(
// //                                   activeCommentMenu === c._id ? null : c._id,
// //                                 );
// //                               }}
// //                               style={{
// //                                 width: 26,
// //                                 height: 26,
// //                                 borderRadius: "50%",
// //                                 background: "transparent",
// //                                 border: "none",
// //                                 display: "flex",
// //                                 alignItems: "center",
// //                                 justifyContent: "center",
// //                                 cursor: "pointer",
// //                                 color: "rgba(255,255,255,0.3)",
// //                                 transition:
// //                                   "color 0.15s ease, background 0.15s ease",
// //                               }}
// //                               onMouseEnter={(e) => {
// //                                 e.currentTarget.style.color =
// //                                   "rgba(255,255,255,0.7)";
// //                                 e.currentTarget.style.background =
// //                                   "rgba(255,255,255,0.08)";
// //                               }}
// //                               onMouseLeave={(e) => {
// //                                 e.currentTarget.style.color =
// //                                   "rgba(255,255,255,0.3)";
// //                                 e.currentTarget.style.background =
// //                                   "transparent";
// //                               }}
// //                             >
// //                               <svg
// //                                 width="14"
// //                                 height="14"
// //                                 viewBox="0 0 24 24"
// //                                 fill="none"
// //                                 stroke="currentColor"
// //                                 strokeWidth="2"
// //                               >
// //                                 <circle cx="5" cy="12" r="1" />
// //                                 <circle cx="12" cy="12" r="1" />
// //                                 <circle cx="19" cy="12" r="1" />
// //                               </svg>
// //                             </button>

// //                             {activeCommentMenu === c._id && (
// //                               <div
// //                                 data-comment-menu
// //                                 style={{
// //                                   position: "absolute",
// //                                   right: 0,
// //                                   top: 30,
// //                                   zIndex: 50,
// //                                   width: 148,
// //                                   borderRadius: 12,
// //                                   background: "#1f1f1f",
// //                                   border: "0.5px solid rgba(255,255,255,0.1)",
// //                                   boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
// //                                   overflow: "hidden",
// //                                 }}
// //                               >
// //                                 <button
// //                                   className="cbs-touch-btn"
// //                                   onClick={() => handleDeleteComment(c._id)}
// //                                   style={{
// //                                     width: "100%",
// //                                     display: "flex",
// //                                     alignItems: "center",
// //                                     gap: 8,
// //                                     padding: "10px 12px",
// //                                     fontSize: 12,
// //                                     fontWeight: 500,
// //                                     color: "#f87171",
// //                                     background: "transparent",
// //                                     border: "none",
// //                                     cursor: "pointer",
// //                                     textAlign: "left",
// //                                     transition: "background 0.15s ease",
// //                                   }}
// //                                   onMouseEnter={(e) =>
// //                                     (e.currentTarget.style.background =
// //                                       "rgba(255,255,255,0.06)")
// //                                   }
// //                                   onMouseLeave={(e) =>
// //                                     (e.currentTarget.style.background =
// //                                       "transparent")
// //                                   }
// //                                 >
// //                                   <svg
// //                                     width="12"
// //                                     height="12"
// //                                     viewBox="0 0 24 24"
// //                                     fill="none"
// //                                     stroke="currentColor"
// //                                     strokeWidth="2"
// //                                     strokeLinecap="round"
// //                                     strokeLinejoin="round"
// //                                   >
// //                                     <polyline points="3 6 5 6 21 6" />
// //                                     <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
// //                                     <path d="M10 11v6M14 11v6M9 6V4h6v2" />
// //                                   </svg>
// //                                   Delete comment
// //                                 </button>
// //                               </div>
// //                             )}
// //                           </div>
// //                         )}
// //                       </div>
// //                     );
// //                   })
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Input Bar — always pinned to the bottom of the sheet */}
// //           <div className="cbs-input-bar">
// //             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //               <Avatar
// //                 username={user?.username || "?"}
// //                 profilePicture={user?.profilePicture}
// //                 size={30}
// //               />
// //               <div
// //                 style={{
// //                   flex: 1,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   background: "rgba(255,255,255,0.06)",
// //                   borderRadius: 24,
// //                   border: "0.5px solid rgba(255,255,255,0.08)",
// //                   padding: "8px 14px",
// //                   gap: 8,
// //                 }}
// //               >
// //                 <input
// //                   ref={inputRef}
// //                   value={comment}
// //                   onChange={(e) => setComment(e.target.value)}
// //                   onKeyDown={(e) => e.key === "Enter" && handlePost()}
// //                   placeholder="Add a comment…"
// //                   className="cbs-input"
// //                   // ── Suppress keyboard toolbar / autofill bar ─────────────
// //                   // autoComplete="off" alone is not enough on Android Chrome —
// //                   // it still shows the autofill bar with key/GIF/clipboard icons.
// //                   // "new-password" is a well-known hack: it's the one value
// //                   // Chrome actually respects to suppress its autofill UI entirely,
// //                   // including the key icon strip, without treating the field as
// //                   // a real password input (type stays "text" so text is visible).
// //                   autoComplete="new-password"
// //                   // Prevent Samsung/Gboard from offering GIF / sticker strip
// //                   autoCorrect="off"
// //                   autoCapitalize="sentences"
// //                   spellCheck={false}
// //                   // Tells Android not to treat this as a rich content target
// //                   // (blocks GIF/image insertion from the keyboard)
// //                   inputMode="text"
// //                   // Blocks the browser's built-in autofill dropdown entirely
// //                   data-form-type="other"
// //                   // font-size 16px prevents iOS auto-zoom on focus
// //                   style={{ fontSize: 16 }}
// //                 />
// //                 {comment.trim() && (
// //                   <button
// //                     className="cbs-touch-btn"
// //                     onClick={handlePost}
// //                     style={{
// //                       fontSize: 12,
// //                       fontWeight: 600,
// //                       color: "#60a5fa",
// //                       background: "transparent",
// //                       border: "none",
// //                       cursor: "pointer",
// //                       whiteSpace: "nowrap",
// //                       padding: 0,
// //                       transition: "opacity 0.15s ease",
// //                     }}
// //                   >
// //                     Post
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default CommentsBottomSheet;

// import { useEffect, useRef, useState, useCallback } from "react";
// import fetchData from "../utils/fetchData";
// import { useAuth } from "../hooks/useAuth";

// // ─────────────────────────────────────────────────────────────────────────────
// // ARCHITECTURE NOTES — Read before touching anything keyboard/layout related
// // ─────────────────────────────────────────────────────────────────────────────
// //
// // THE CORE PROBLEM
// // ────────────────
// // When a soft keyboard opens on mobile, there are THREE different behaviors
// // across platforms, and we must handle all of them:
// //
// //   Android (Chrome 108+, `interactive-widget=resizes-content`):
// //     - The layout viewport SHRINKS. `100dvh` automatically adapts.
// //     - The visual viewport also shrinks to match.
// //     - Best case: zero JS needed for layout. BUT we still need to scroll
// //       the comment list so the last message is visible.
// //
// //   Android (older Chrome / WebViews):
// //     - The keyboard OVERLAPS the content. Neither dvh nor innerHeight shrinks.
// //     - Only `window.visualViewport.height` gives the true visible area.
// //     - We must imperatively set heights from JS.
// //
// //   iOS Safari (all versions as of 2025):
// //     - Ignores `interactive-widget` entirely.
// //     - `window.innerHeight` does NOT change when keyboard opens.
// //     - `100dvh` does NOT shrink.
// //     - ONLY `window.visualViewport.height` reliably reflects keyboard state.
// //     - Additional gotcha: `position: fixed` elements are positioned relative
// //       to the LAYOUT viewport (the full screen), not the visual viewport.
// //       This is why "just use position:fixed on the input" breaks on iOS.
// //
// // THE SOLUTION (same pattern Instagram/WhatsApp use)
// // ──────────────────────────────────────────────────
// // 1. The sheet root uses `position: fixed` anchored to the BOTTOM of the
// //    layout viewport, spanning the FULL screen height initially.
// //
// // 2. We listen to `visualViewport` resize events. When the keyboard opens,
// //    `visualViewport.height` drops. We calculate:
// //      keyboardHeight = window.innerHeight - visualViewport.height - visualViewport.offsetTop
// //    and apply it as `padding-bottom` OR `margin-bottom` on the sheet root.
// //    This effectively "pushes up" the fixed element above the keyboard.
// //
// // 3. The sheet itself uses `height: SHEET_HEIGHT_VH vh` relative to its
// //    CONTAINER (the pushed-up root), not the full screen. This keeps the
// //    sheet's proportions consistent whether keyboard is open or not.
// //
// // 4. The comment list uses `flex: 1; min-height: 0; overflow-y: auto`.
// //    This is the CSS flex trick that allows the list to SHRINK properly —
// //    without `min-height: 0`, flex children won't shrink below their
// //    content height and the input bar gets pushed off screen.
// //
// // 5. Body scroll lock uses the `top: -scrollY + position:fixed` technique
// //    (the "save/restore scroll" pattern), which is more reliable than
// //    `overflow: hidden` on iOS, which ignores it.
// //
// // 6. We do NOT use `interactive-widget=resizes-content` as a primary
// //    strategy — it's a progressive enhancement on Android. All logic must
// //    work without it.
// //
// // DRAG TO DISMISS
// // ───────────────
// // Applied only to the handle/header area (not the list) to avoid fighting
// // with the list's own scroll gesture. If the user drags > DISMISS_THRESHOLD
// // px downward from the handle, we close.
// //
// // ─────────────────────────────────────────────────────────────────────────────

// const SHEET_HEIGHT_PERCENT = 72; // % of viewport the sheet occupies
// const DISMISS_THRESHOLD = 120; // px drag-down to trigger close

// // ── Avatar ────────────────────────────────────────────────────────────────────
// const Avatar = ({ username, profilePicture, size = 32 }) => (
//   <div
//     style={{
//       width: size,
//       height: size,
//       borderRadius: "50%",
//       flexShrink: 0,
//       overflow: "hidden",
//     }}
//   >
//     {profilePicture ? (
//       <img
//         src={profilePicture}
//         alt={username}
//         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//       />
//     ) : (
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           background: `hsl(${(username?.charCodeAt(0) * 47) % 360}, 55%, 45%)`,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: size * 0.38,
//           fontWeight: 700,
//           color: "#fff",
//         }}
//       >
//         {username?.charAt(0).toUpperCase()}
//       </div>
//     )}
//   </div>
// );

// // ── Main Component ─────────────────────────────────────────────────────────────
// function CommentsBottomSheet({
//   post,
//   onClose,
//   onCommentAdded,
//   onCommentDeleted,
// }) {
//   const { user } = useAuth();

//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contentVisible, setContentVisible] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [activeCommentMenu, setActiveCommentMenu] = useState(null);

//   // Drag state
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragY, setDragY] = useState(0);
//   const dragStartY = useRef(null);

//   // Refs
//   const rootRef = useRef(null); // The fixed overlay root
//   const sheetRef = useRef(null); // The white sheet panel
//   const listRef = useRef(null); // The scrollable comment list
//   const inputRef = useRef(null); // The text input
//   const savedScrollY = useRef(0); // For body scroll lock

//   // ── Entry animation ──────────────────────────────────────────────────────────
//   useEffect(() => {
//     requestAnimationFrame(() => setVisible(true));
//   }, []);

//   // ── Body scroll lock (save/restore pattern — most reliable on iOS) ───────────
//   useEffect(() => {
//     savedScrollY.current = window.scrollY;
//     const top = -savedScrollY.current;
//     document.body.style.cssText = `
//       overflow: hidden;
//       position: fixed;
//       top: ${top}px;
//       left: 0;
//       right: 0;
//       width: 100%;
//     `;
//     return () => {
//       document.body.style.cssText = "";
//       window.scrollTo(0, savedScrollY.current);
//     };
//   }, []);

//   // ── Viewport meta patch ──────────────────────────────────────────────────────
//   // `interactive-widget=resizes-content` is Android Chrome 108+ progressive
//   // enhancement. The visualViewport fallback below handles everything else.
//   useEffect(() => {
//     let meta = document.querySelector('meta[name="viewport"]');
//     const prev = meta?.getAttribute("content") ?? "";
//     if (!meta) {
//       meta = document.createElement("meta");
//       meta.name = "viewport";
//       document.head.appendChild(meta);
//     }
//     meta.setAttribute(
//       "content",
//       "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content",
//     );
//     return () => meta.setAttribute("content", prev);
//   }, []);

//   // ── Core keyboard handler — the heart of the fix ─────────────────────────────
//   //
//   // Strategy: track visualViewport height. When it shrinks (keyboard opens),
//   // push the fixed root up by the keyboard height via `paddingBottom`.
//   // This works on iOS because it shifts our fixed-positioned overlay above
//   // the keyboard — something CSS alone cannot do on iOS.
//   //
//   useEffect(() => {
//     if (!window.visualViewport) return;

//     const onViewportChange = () => {
//       const root = rootRef.current;
//       if (!root) return;

//       const vv = window.visualViewport;
//       // On iOS, fixed elements are relative to layout viewport.
//       // vv.offsetTop accounts for any scroll the page did when keyboard opened.
//       const keyboardHeight =
//         window.innerHeight - vv.height - (vv.offsetTop ?? 0);

//       // Push the overlay root up above the keyboard.
//       // We use paddingBottom on the root (which is position:fixed, inset:0)
//       // so the flex child (sheet) naturally sits above the keyboard.
//       root.style.paddingBottom =
//         keyboardHeight > 0 ? `${keyboardHeight}px` : "0px";

//       // After keyboard opens, scroll comment list to bottom so latest
//       // comment stays visible (mirrors WhatsApp / iMessage UX).
//       if (keyboardHeight > 0 && listRef.current) {
//         // Small delay lets the layout settle before we measure scroll height
//         setTimeout(() => {
//           if (listRef.current) {
//             listRef.current.scrollTop = listRef.current.scrollHeight;
//           }
//         }, 50);
//       }
//     };

//     window.visualViewport.addEventListener("resize", onViewportChange);
//     window.visualViewport.addEventListener("scroll", onViewportChange);
//     // Run once on mount to capture initial state
//     onViewportChange();

//     return () => {
//       window.visualViewport.removeEventListener("resize", onViewportChange);
//       window.visualViewport.removeEventListener("scroll", onViewportChange);
//       // Reset on unmount
//       if (rootRef.current) rootRef.current.style.paddingBottom = "0px";
//     };
//   }, []);

//   // ── Close comment menus on outside tap ──────────────────────────────────────
//   useEffect(() => {
//     const handler = (e) => {
//       if (!e.target.closest("[data-comment-menu]")) setActiveCommentMenu(null);
//     };
//     document.addEventListener("mousedown", handler);
//     document.addEventListener("touchstart", handler, { passive: true });
//     return () => {
//       document.removeEventListener("mousedown", handler);
//       document.removeEventListener("touchstart", handler);
//     };
//   }, []);

//   // ── Scroll list to bottom when comments load ─────────────────────────────────
//   useEffect(() => {
//     if (!loading && listRef.current) {
//       listRef.current.scrollTop = listRef.current.scrollHeight;
//     }
//   }, [comments, loading]);

//   // ── Fetch comments ───────────────────────────────────────────────────────────
//   useEffect(() => {
//     fetchData(`/api/posts/${post._id}/comments`, { credentials: "include" })
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

//   // ── Close handler ────────────────────────────────────────────────────────────
//   const handleClose = useCallback(() => {
//     // Dismiss keyboard first (blur the input) before animating out
//     inputRef.current?.blur();
//     setVisible(false);
//     setTimeout(onClose, 350);
//   }, [onClose]);

//   // ── Post comment ─────────────────────────────────────────────────────────────
//   const handlePost = useCallback(async () => {
//     if (!comment.trim()) return;
//     try {
//       const res = await fetchData(`/api/posts/${post._id}/comments`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ text: comment }),
//       });
//       const data = await res.json();
//       setComments((prev) => [...prev, data.comment]);
//       setComment("");
//       onCommentAdded?.();
//       // Scroll to bottom after posting — same as WhatsApp
//       setTimeout(() => {
//         if (listRef.current)
//           listRef.current.scrollTop = listRef.current.scrollHeight;
//       }, 50);
//     } catch (err) {
//       console.error("Post comment error:", err);
//     }
//   }, [comment, post._id, onCommentAdded]);

//   // ── Delete comment ───────────────────────────────────────────────────────────
//   const handleDeleteComment = useCallback(
//     async (commentId) => {
//       try {
//         const res = await fetchData(
//           `/api/posts/${post._id}/comments/${commentId}`,
//           {
//             method: "DELETE",
//             credentials: "include",
//           },
//         );
//         const data = await res.json();
//         if (data.success) {
//           setComments((prev) => prev.filter((c) => c._id !== commentId));
//           setActiveCommentMenu(null);
//           onCommentDeleted?.();
//         }
//       } catch (err) {
//         console.error("Delete comment error:", err);
//       }
//     },
//     [post._id, onCommentDeleted],
//   );

//   // ── Drag to dismiss (handle area only) ──────────────────────────────────────
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
//     if (dragY > DISMISS_THRESHOLD) handleClose();
//     else setDragY(0);
//     setIsDragging(false);
//     dragStartY.current = null;
//   };

//   // ─────────────────────────────────────────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <style>{`
//         /* ── Shimmer skeleton ─────────────────────────────── */
//         @keyframes cbs-shimmer {
//           0%   { background-position: -400px 0; }
//           100% { background-position:  400px 0; }
//         }
//         .cbs-skeleton {
//           background: linear-gradient(
//             90deg,
//             rgba(255,255,255,0.04) 25%,
//             rgba(255,255,255,0.09) 50%,
//             rgba(255,255,255,0.04) 75%
//           );
//           background-size: 400px 100%;
//           animation: cbs-shimmer 1.4s ease infinite;
//         }

//         /* ── Comment row animation ────────────────────────── */
//         @keyframes cbs-fadeSlideIn {
//           from { opacity: 0; transform: translateY(8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .cbs-comment-row {
//           opacity: 0;
//           animation: cbs-fadeSlideIn 0.25s ease forwards;
//         }

//         /*
//          * ROOT OVERLAY
//          * position: fixed + inset: 0 anchors to layout viewport.
//          * paddingBottom is updated by JS to push sheet above keyboard.
//          * display: flex + justify-content: flex-end keeps the sheet
//          * pinned to the BOTTOM of whatever space remains after padding.
//          *
//          * CRITICAL: We do NOT set height here. The root takes its height
//          * from inset:0 (top:0 + bottom:0 = full viewport height).
//          * paddingBottom then eats into that height from the bottom,
//          * exactly like "the keyboard ate the bottom X pixels".
//          */
//         .cbs-root {
//           position: fixed;
//           inset: 0;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-end;
//           z-index: 9999;
//           pointer-events: none;
//           /* GPU-accelerate the padding-bottom transition */
//           transition: padding-bottom 0.25s ease;
//           /* Prevent safe-area from adding extra space unintentionally */
//           box-sizing: border-box;
//         }

//         .cbs-backdrop {
//           position: absolute;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.55);
//           backdrop-filter: blur(2px);
//           -webkit-backdrop-filter: blur(2px);
//           pointer-events: all;
//           transition: opacity 0.3s ease;
//         }

//         /*
//          * THE SHEET
//          * height: SHEET_HEIGHT_PERCENT vh is intentional — we want the
//          * sheet to be a fixed fraction of the SCREEN, not the remaining
//          * space. When the keyboard opens, the root paddingBottom pushes
//          * the sheet UP, but the sheet keeps its height. The list inside
//          * (flex: 1; min-height: 0; overflow-y: auto) scrolls to compensate.
//          *
//          * Alternatively some apps use max-height instead of height.
//          * We use height for predictability — users know exactly how much
//          * of the screen is the comment section.
//          *
//          * will-change: transform hints the browser to promote this element
//          * to its own compositor layer, keeping the slide-up animation smooth.
//          */
//         .cbs-sheet {
//           position: relative;
//           width: 100%;
//           max-width: 470px;
//           margin: 0 auto;
//           height: ${SHEET_HEIGHT_PERCENT}vh;
//           max-height: 100%;
//           display: flex;
//           flex-direction: column;
//           background: #141414;
//           border-radius: 16px 16px 0 0;
//           border-top: 0.5px solid rgba(255, 255, 255, 0.08);
//           box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.6);
//           pointer-events: all;
//           overflow: hidden;
//           will-change: transform;
//           /* Safe-area bottom padding for iPhones with home indicator.
//            * Applied to the sheet so it only adds space when keyboard is closed
//            * (the keyboard hides the home indicator anyway). */
//           padding-bottom: env(safe-area-inset-bottom, 0px);
//           box-sizing: border-box;
//         }

//         /*
//          * COMMENT LIST
//          * flex: 1 takes all remaining vertical space.
//          * min-height: 0 is THE key rule. Without this, flex children
//          * won't shrink below their content size, and the list pushes the
//          * input bar off screen when there are many comments.
//          * overflow-y: auto enables independent scroll within the list.
//          * overscroll-behavior: contain prevents the sheet/page from
//          * scrolling when the list hits its top/bottom boundary.
//          */
//         .cbs-list {
//           flex: 1;
//           min-height: 0;
//           overflow-y: auto;
//           -webkit-overflow-scrolling: touch;
//           overscroll-behavior: contain;
//           padding: 12px 16px 8px;
//         }

//         /*
//          * INPUT BAR
//          * flex-shrink: 0 means NEVER shrink, even when the sheet is short.
//          * This ensures the input is always visible and never gets cut off.
//          * The list shrinks to accommodate it, not the other way around.
//          */
//         .cbs-input-bar {
//           flex-shrink: 0;
//           border-top: 0.5px solid rgba(255, 255, 255, 0.07);
//           padding: 10px 12px 12px;
//           background: #141414;
//         }

//         /*
//          * INPUT ELEMENT
//          * font-size: 16px is NON-NEGOTIABLE on iOS.
//          * Any value below 16px triggers iOS Safari automatic zoom-in
//          * when the field is focused, which scrolls the page and
//          * breaks the entire layout. Always 16px minimum on text inputs.
//          */
//         .cbs-input {
//           flex: 1;
//           background: transparent;
//           border: none;
//           outline: none;
//           font-size: 16px;
//           line-height: 1.4;
//           color: rgba(255, 255, 255, 0.85);
//           caret-color: #60a5fa;
//           min-width: 0;
//         }
//         .cbs-input::placeholder {
//           color: rgba(255, 255, 255, 0.3);
//         }

//         .cbs-touch-btn {
//           -webkit-tap-highlight-color: transparent;
//           touch-action: manipulation;
//           user-select: none;
//         }
//       `}</style>

//       {/*
//         ROOT OVERLAY
//         ref={rootRef} so our visualViewport handler can update paddingBottom.
//       */}
//       <div className="cbs-root md:hidden" ref={rootRef}>
//         {/* Backdrop */}
//         <div
//           className="cbs-backdrop"
//           style={{ opacity: visible ? 1 : 0 }}
//           onClick={handleClose}
//         />

//         {/* Sheet */}
//         <div
//           ref={sheetRef}
//           className="cbs-sheet"
//           style={{
//             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
//             transition: isDragging
//               ? "none"
//               : "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
//           }}
//         >
//           {/* ── Drag Handle + Header ──────────────────────────────────────── */}
//           <div
//             style={{
//               flexShrink: 0,
//               padding: "12px 16px 0",
//               userSelect: "none",
//             }}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             {/* Handle pill */}
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

//             {/* Header row */}
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
//                 className="cbs-touch-btn"
//                 onClick={handleClose}
//                 style={{
//                   width: 28,
//                   height: 28,
//                   minWidth: 44,
//                   minHeight: 44,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderRadius: "50%",
//                   background: "rgba(255,255,255,0.07)",
//                   border: "0.5px solid rgba(255,255,255,0.1)",
//                   cursor: "pointer",
//                   marginRight: -8,
//                 }}
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

//           {/* ── Comment List ──────────────────────────────────────────────── */}
//           <div ref={listRef} className="cbs-list">
//             {loading ? (
//               /* Skeleton loader */
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
//                   paddingBottom: 4,
//                 }}
//               >
//                 {comments.length === 0 ? (
//                   /* Empty state */
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
//                           animationDelay: `${i * 40}ms`,
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
//                               wordBreak: "break-word",
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

//                         {isMyComment && (
//                           <div
//                             style={{ position: "relative", flexShrink: 0 }}
//                             data-comment-menu
//                           >
//                             <button
//                               className="cbs-touch-btn"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setActiveCommentMenu(
//                                   activeCommentMenu === c._id ? null : c._id,
//                                 );
//                               }}
//                               style={{
//                                 width: 44,
//                                 height: 44,
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 background: "transparent",
//                                 border: "none",
//                                 cursor: "pointer",
//                                 color: "rgba(255,255,255,0.3)",
//                                 marginRight: -10,
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
//                                   top: 36,
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
//                                   className="cbs-touch-btn"
//                                   onClick={() => handleDeleteComment(c._id)}
//                                   style={{
//                                     width: "100%",
//                                     minHeight: 44,
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: 8,
//                                     padding: "10px 12px",
//                                     fontSize: 13,
//                                     fontWeight: 500,
//                                     color: "#f87171",
//                                     background: "transparent",
//                                     border: "none",
//                                     cursor: "pointer",
//                                     textAlign: "left",
//                                   }}
//                                 >
//                                   <svg
//                                     width="13"
//                                     height="13"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   >
//                                     <polyline points="3 6 5 6 21 6" />
//                                     <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//                                     <path d="M10 11v6M14 11v6M9 6V4h6v2" />
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

//           {/* ── Input Bar ─────────────────────────────────────────────────── */}
//           {/*
//             This is the most critical element.
//             `flex-shrink: 0` ensures it NEVER gets hidden by the comment list.
//             The keyboard-push logic (paddingBottom on root) ensures it's always
//             visible above the keyboard. The combination is what WhatsApp uses.
//           */}
//           <div className="cbs-input-bar">
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <Avatar
//                 username={user?.username || "?"}
//                 profilePicture={user?.profilePicture}
//                 size={32}
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
//                   minWidth: 0,
//                   /*
//                    * Transition the border on focus is done via JS below
//                    * since CSS :focus-within doesn't reach into shadow DOM
//                    * consistently on older iOS WebViews.
//                    */
//                 }}
//               >
//                 <input
//                   ref={inputRef}
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       handlePost();
//                     }
//                   }}
//                   onFocus={(e) => {
//                     // Highlight the input wrapper on focus
//                     e.currentTarget.parentElement.style.border =
//                       "0.5px solid rgba(96, 165, 250, 0.4)";
//                   }}
//                   onBlur={(e) => {
//                     e.currentTarget.parentElement.style.border =
//                       "0.5px solid rgba(255,255,255,0.08)";
//                   }}
//                   placeholder="Add a comment…"
//                   className="cbs-input"
//                   /*
//                    * Suppress autofill / suggestion bars
//                    * "new-password" is the most reliable cross-browser hack
//                    * to suppress Chrome's autofill toolbar (key icon, GIF, etc.)
//                    */
//                   autoComplete="new-password"
//                   autoCorrect="off"
//                   autoCapitalize="sentences"
//                   spellCheck={false}
//                   inputMode="text"
//                   data-form-type="other"
//                   /*
//                    * font-size: 16px in the className is NOT enough —
//                    * inline style wins specificity, so we set it here too
//                    * as a defensive override.
//                    */
//                   style={{ fontSize: "16px" }}
//                 />
//                 {comment.trim() && (
//                   <button
//                     className="cbs-touch-btn"
//                     onClick={handlePost}
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 600,
//                       color: "#60a5fa",
//                       background: "transparent",
//                       border: "none",
//                       cursor: "pointer",
//                       whiteSpace: "nowrap",
//                       padding: "4px 0",
//                       flexShrink: 0,
//                       minHeight: 44,
//                       display: "flex",
//                       alignItems: "center",
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

// import { useEffect, useRef, useState, useCallback } from "react";
// import fetchData from "../utils/fetchData";
// import { useAuth } from "../hooks/useAuth";

// // ─────────────────────────────────────────────────────────────────────────────
// // ARCHITECTURE NOTES — Read before touching anything keyboard/layout related
// // ─────────────────────────────────────────────────────────────────────────────
// //
// // THE CORE PROBLEM
// // ────────────────
// // When a soft keyboard opens on mobile, there are THREE different behaviors
// // across platforms, and we must handle all of them:
// //
// //   Android (Chrome 108+, `interactive-widget=resizes-content`):
// //     - The layout viewport SHRINKS. `100dvh` automatically adapts.
// //     - The visual viewport also shrinks to match.
// //     - Best case: zero JS needed for layout. BUT we still need to scroll
// //       the comment list so the last message is visible.
// //
// //   Android (older Chrome / WebViews):
// //     - The keyboard OVERLAPS the content. Neither dvh nor innerHeight shrinks.
// //     - Only `window.visualViewport.height` gives the true visible area.
// //     - We must imperatively set heights from JS.
// //
// //   iOS Safari (all versions as of 2025):
// //     - Ignores `interactive-widget` entirely.
// //     - `window.innerHeight` does NOT change when keyboard opens.
// //     - `100dvh` does NOT shrink.
// //     - ONLY `window.visualViewport.height` reliably reflects keyboard state.
// //     - Additional gotcha: `position: fixed` elements are positioned relative
// //       to the LAYOUT viewport (the full screen), not the visual viewport.
// //       This is why "just use position:fixed on the input" breaks on iOS.
// //
// // THE SOLUTION (same pattern Instagram/WhatsApp use)
// // ──────────────────────────────────────────────────
// // 1. The sheet root uses `position: fixed` anchored to the BOTTOM of the
// //    layout viewport, spanning the FULL screen height initially.
// //
// // 2. We listen to `visualViewport` resize events. When the keyboard opens,
// //    `visualViewport.height` drops. We calculate:
// //      keyboardHeight = window.innerHeight - visualViewport.height - visualViewport.offsetTop
// //    and apply it as `padding-bottom` OR `margin-bottom` on the sheet root.
// //    This effectively "pushes up" the fixed element above the keyboard.
// //
// // 3. The sheet itself uses `height: SHEET_HEIGHT_VH vh` relative to its
// //    CONTAINER (the pushed-up root), not the full screen. This keeps the
// //    sheet's proportions consistent whether keyboard is open or not.
// //
// // 4. The comment list uses `flex: 1; min-height: 0; overflow-y: auto`.
// //    This is the CSS flex trick that allows the list to SHRINK properly —
// //    without `min-height: 0`, flex children won't shrink below their
// //    content height and the input bar gets pushed off screen.
// //
// // 5. Body scroll lock uses the `top: -scrollY + position:fixed` technique
// //    (the "save/restore scroll" pattern), which is more reliable than
// //    `overflow: hidden` on iOS, which ignores it.
// //
// // 6. We do NOT use `interactive-widget=resizes-content` as a primary
// //    strategy — it's a progressive enhancement on Android. All logic must
// //    work without it.
// //
// // DRAG TO DISMISS
// // ───────────────
// // Applied only to the handle/header area (not the list) to avoid fighting
// // with the list's own scroll gesture. If the user drags > DISMISS_THRESHOLD
// // px downward from the handle, we close.
// //
// // ─────────────────────────────────────────────────────────────────────────────

// const SHEET_HEIGHT_PERCENT = 72; // % of viewport the sheet occupies
// const DISMISS_THRESHOLD = 120; // px drag-down to trigger close

// // ── Avatar ────────────────────────────────────────────────────────────────────
// const Avatar = ({ username, profilePicture, size = 32 }) => (
//   <div
//     style={{
//       width: size,
//       height: size,
//       borderRadius: "50%",
//       flexShrink: 0,
//       overflow: "hidden",
//     }}
//   >
//     {profilePicture ? (
//       <img
//         src={profilePicture}
//         alt={username}
//         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//       />
//     ) : (
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           background: `hsl(${(username?.charCodeAt(0) * 47) % 360}, 55%, 45%)`,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: size * 0.38,
//           fontWeight: 700,
//           color: "#fff",
//         }}
//       >
//         {username?.charAt(0).toUpperCase()}
//       </div>
//     )}
//   </div>
// );

// // ── Main Component ─────────────────────────────────────────────────────────────
// function CommentsBottomSheet({
//   post,
//   onClose,
//   onCommentAdded,
//   onCommentDeleted,
// }) {
//   const { user } = useAuth();

//   // Fetched from GET /api/users/blocked — array of user objects [{_id, username, ...}]
//   // Stored as a Set of ID strings for O(1) lookup during comment filtering.
//   const [blockedSet, setBlockedSet] = useState(() => new Set());

//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contentVisible, setContentVisible] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [activeCommentMenu, setActiveCommentMenu] = useState(null);

//   // Drag state
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragY, setDragY] = useState(0);
//   const dragStartY = useRef(null);

//   // Refs
//   const rootRef = useRef(null); // The fixed overlay root
//   const sheetRef = useRef(null); // The white sheet panel
//   const listRef = useRef(null); // The scrollable comment list
//   const inputRef = useRef(null); // The text input
//   const savedScrollY = useRef(0); // For body scroll lock

//   // ── Entry animation ──────────────────────────────────────────────────────────
//   useEffect(() => {
//     requestAnimationFrame(() => setVisible(true));
//   }, []);

//   // ── Body scroll lock (save/restore pattern — most reliable on iOS) ───────────
//   useEffect(() => {
//     savedScrollY.current = window.scrollY;
//     const top = -savedScrollY.current;
//     document.body.style.cssText = `
//       overflow: hidden;
//       position: fixed;
//       top: ${top}px;
//       left: 0;
//       right: 0;
//       width: 100%;
//     `;
//     return () => {
//       document.body.style.cssText = "";
//       window.scrollTo(0, savedScrollY.current);
//     };
//   }, []);

//   // ── Viewport meta patch ──────────────────────────────────────────────────────
//   // `interactive-widget=resizes-content` is Android Chrome 108+ progressive
//   // enhancement. The visualViewport fallback below handles everything else.
//   useEffect(() => {
//     let meta = document.querySelector('meta[name="viewport"]');
//     const prev = meta?.getAttribute("content") ?? "";
//     if (!meta) {
//       meta = document.createElement("meta");
//       meta.name = "viewport";
//       document.head.appendChild(meta);
//     }
//     meta.setAttribute(
//       "content",
//       "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content",
//     );
//     return () => meta.setAttribute("content", prev);
//   }, []);

//   // ── Core keyboard handler — the heart of the fix ─────────────────────────────
//   //
//   // Strategy: track visualViewport height. When it shrinks (keyboard opens),
//   // push the fixed root up by the keyboard height via `paddingBottom`.
//   // This works on iOS because it shifts our fixed-positioned overlay above
//   // the keyboard — something CSS alone cannot do on iOS.
//   //
//   useEffect(() => {
//     if (!window.visualViewport) return;

//     const onViewportChange = () => {
//       const root = rootRef.current;
//       if (!root) return;

//       const vv = window.visualViewport;
//       // On iOS, fixed elements are relative to layout viewport.
//       // vv.offsetTop accounts for any scroll the page did when keyboard opened.
//       const keyboardHeight =
//         window.innerHeight - vv.height - (vv.offsetTop ?? 0);

//       // Push the overlay root up above the keyboard.
//       // We use paddingBottom on the root (which is position:fixed, inset:0)
//       // so the flex child (sheet) naturally sits above the keyboard.
//       root.style.paddingBottom =
//         keyboardHeight > 0 ? `${keyboardHeight}px` : "0px";

//       // After keyboard opens, scroll comment list to bottom so latest
//       // comment stays visible (mirrors WhatsApp / iMessage UX).
//       if (keyboardHeight > 0 && listRef.current) {
//         // Small delay lets the layout settle before we measure scroll height
//         setTimeout(() => {
//           if (listRef.current) {
//             listRef.current.scrollTop = listRef.current.scrollHeight;
//           }
//         }, 50);
//       }
//     };

//     window.visualViewport.addEventListener("resize", onViewportChange);
//     window.visualViewport.addEventListener("scroll", onViewportChange);
//     // Run once on mount to capture initial state
//     onViewportChange();

//     return () => {
//       window.visualViewport.removeEventListener("resize", onViewportChange);
//       window.visualViewport.removeEventListener("scroll", onViewportChange);
//       // Reset on unmount
//       if (rootRef.current) rootRef.current.style.paddingBottom = "0px";
//     };
//   }, []);

//   // ── Close comment menus on outside tap ──────────────────────────────────────
//   useEffect(() => {
//     const handler = (e) => {
//       if (!e.target.closest("[data-comment-menu]")) setActiveCommentMenu(null);
//     };
//     document.addEventListener("mousedown", handler);
//     document.addEventListener("touchstart", handler, { passive: true });
//     return () => {
//       document.removeEventListener("mousedown", handler);
//       document.removeEventListener("touchstart", handler);
//     };
//   }, []);

//   // ── Scroll list to bottom when comments load ─────────────────────────────────
//   useEffect(() => {
//     if (!loading && listRef.current) {
//       listRef.current.scrollTop = listRef.current.scrollHeight;
//     }
//   }, [comments, loading]);

//   // ── Fetch blocked users ─────────────────────────────────────────────────────
//   // Runs once on mount. Parallel to comments fetch — neither blocks the other.
//   // We fire-and-forget errors: if it fails, blockedSet stays empty and all
//   // comments show (safe degradation — better than breaking the sheet).
//   useEffect(() => {
//     fetchData("/api/users/blocked", { credentials: "include" })
//       .then((r) => r.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setBlockedSet(new Set(data.map((u) => String(u._id))));
//         }
//       })
//       .catch(() => {
//         // Silent fail — show all comments rather than break the UI
//       });
//   }, []);

//   // ── Fetch comments ───────────────────────────────────────────────────────────
//   useEffect(() => {
//     fetchData(`/api/posts/${post._id}/comments`, { credentials: "include" })
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

//   // ── Close handler ────────────────────────────────────────────────────────────
//   const handleClose = useCallback(() => {
//     // Dismiss keyboard first (blur the input) before animating out
//     inputRef.current?.blur();
//     setVisible(false);
//     setTimeout(onClose, 350);
//   }, [onClose]);

//   // ── Post comment ─────────────────────────────────────────────────────────────
//   const handlePost = useCallback(async () => {
//     if (!comment.trim()) return;
//     try {
//       const res = await fetchData(`/api/posts/${post._id}/comments`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ text: comment }),
//       });
//       const data = await res.json();
//       setComments((prev) => [...prev, data.comment]);
//       setComment("");
//       onCommentAdded?.();
//       // Scroll to bottom after posting — same as WhatsApp
//       setTimeout(() => {
//         if (listRef.current)
//           listRef.current.scrollTop = listRef.current.scrollHeight;
//       }, 50);
//     } catch (err) {
//       console.error("Post comment error:", err);
//     }
//   }, [comment, post._id, onCommentAdded]);

//   // ── Delete comment ───────────────────────────────────────────────────────────
//   const handleDeleteComment = useCallback(
//     async (commentId) => {
//       try {
//         const res = await fetchData(
//           `/api/posts/${post._id}/comments/${commentId}`,
//           {
//             method: "DELETE",
//             credentials: "include",
//           },
//         );
//         const data = await res.json();
//         if (data.success) {
//           setComments((prev) => prev.filter((c) => c._id !== commentId));
//           setActiveCommentMenu(null);
//           onCommentDeleted?.();
//         }
//       } catch (err) {
//         console.error("Delete comment error:", err);
//       }
//     },
//     [post._id, onCommentDeleted],
//   );

//   // ── Drag to dismiss (handle area only) ──────────────────────────────────────
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
//     if (dragY > DISMISS_THRESHOLD) handleClose();
//     else setDragY(0);
//     setIsDragging(false);
//     dragStartY.current = null;
//   };

//   // ─────────────────────────────────────────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <style>{`
//         /* ── Shimmer skeleton ─────────────────────────────── */
//         @keyframes cbs-shimmer {
//           0%   { background-position: -400px 0; }
//           100% { background-position:  400px 0; }
//         }
//         .cbs-skeleton {
//           background: linear-gradient(
//             90deg,
//             rgba(255,255,255,0.04) 25%,
//             rgba(255,255,255,0.09) 50%,
//             rgba(255,255,255,0.04) 75%
//           );
//           background-size: 400px 100%;
//           animation: cbs-shimmer 1.4s ease infinite;
//         }

//         /* ── Comment row animation ────────────────────────── */
//         @keyframes cbs-fadeSlideIn {
//           from { opacity: 0; transform: translateY(8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .cbs-comment-row {
//           opacity: 0;
//           animation: cbs-fadeSlideIn 0.25s ease forwards;
//         }

//         /*
//          * ROOT OVERLAY
//          * position: fixed + inset: 0 anchors to layout viewport.
//          * paddingBottom is updated by JS to push sheet above keyboard.
//          * display: flex + justify-content: flex-end keeps the sheet
//          * pinned to the BOTTOM of whatever space remains after padding.
//          *
//          * CRITICAL: We do NOT set height here. The root takes its height
//          * from inset:0 (top:0 + bottom:0 = full viewport height).
//          * paddingBottom then eats into that height from the bottom,
//          * exactly like "the keyboard ate the bottom X pixels".
//          */
//         .cbs-root {
//           position: fixed;
//           inset: 0;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-end;
//           z-index: 9999;
//           pointer-events: none;
//           /* GPU-accelerate the padding-bottom transition */
//           transition: padding-bottom 0.25s ease;
//           /* Prevent safe-area from adding extra space unintentionally */
//           box-sizing: border-box;
//         }

//         .cbs-backdrop {
//           position: absolute;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.55);
//           backdrop-filter: blur(2px);
//           -webkit-backdrop-filter: blur(2px);
//           pointer-events: all;
//           transition: opacity 0.3s ease;
//         }

//         /*
//          * THE SHEET
//          * height: SHEET_HEIGHT_PERCENT vh is intentional — we want the
//          * sheet to be a fixed fraction of the SCREEN, not the remaining
//          * space. When the keyboard opens, the root paddingBottom pushes
//          * the sheet UP, but the sheet keeps its height. The list inside
//          * (flex: 1; min-height: 0; overflow-y: auto) scrolls to compensate.
//          *
//          * Alternatively some apps use max-height instead of height.
//          * We use height for predictability — users know exactly how much
//          * of the screen is the comment section.
//          *
//          * will-change: transform hints the browser to promote this element
//          * to its own compositor layer, keeping the slide-up animation smooth.
//          */
//         .cbs-sheet {
//           position: relative;
//           width: 100%;
//           max-width: 470px;
//           margin: 0 auto;
//           height: ${SHEET_HEIGHT_PERCENT}vh;
//           max-height: 100%;
//           display: flex;
//           flex-direction: column;
//           background: #141414;
//           border-radius: 16px 16px 0 0;
//           border-top: 0.5px solid rgba(255, 255, 255, 0.08);
//           box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.6);
//           pointer-events: all;
//           overflow: hidden;
//           will-change: transform;
//           /* Safe-area bottom padding for iPhones with home indicator.
//            * Applied to the sheet so it only adds space when keyboard is closed
//            * (the keyboard hides the home indicator anyway). */
//           padding-bottom: env(safe-area-inset-bottom, 0px);
//           box-sizing: border-box;
//         }

//         /*
//          * COMMENT LIST
//          * flex: 1 takes all remaining vertical space.
//          * min-height: 0 is THE key rule. Without this, flex children
//          * won't shrink below their content size, and the list pushes the
//          * input bar off screen when there are many comments.
//          * overflow-y: auto enables independent scroll within the list.
//          * overscroll-behavior: contain prevents the sheet/page from
//          * scrolling when the list hits its top/bottom boundary.
//          */
//         .cbs-list {
//           flex: 1;
//           min-height: 0;
//           overflow-y: auto;
//           -webkit-overflow-scrolling: touch;
//           overscroll-behavior: contain;
//           padding: 12px 16px 8px;
//         }

//         /*
//          * INPUT BAR
//          * flex-shrink: 0 means NEVER shrink, even when the sheet is short.
//          * This ensures the input is always visible and never gets cut off.
//          * The list shrinks to accommodate it, not the other way around.
//          */
//         .cbs-input-bar {
//           flex-shrink: 0;
//           border-top: 0.5px solid rgba(255, 255, 255, 0.07);
//           padding: 10px 12px 12px;
//           background: #141414;
//         }

//         /*
//          * INPUT ELEMENT
//          * font-size: 16px is NON-NEGOTIABLE on iOS.
//          * Any value below 16px triggers iOS Safari automatic zoom-in
//          * when the field is focused, which scrolls the page and
//          * breaks the entire layout. Always 16px minimum on text inputs.
//          */
//         .cbs-input {
//           flex: 1;
//           background: transparent;
//           border: none;
//           outline: none;
//           font-size: 16px;
//           line-height: 1.4;
//           color: rgba(255, 255, 255, 0.85);
//           caret-color: #60a5fa;
//           min-width: 0;
//         }
//         .cbs-input::placeholder {
//           color: rgba(255, 255, 255, 0.3);
//         }

//         .cbs-touch-btn {
//           -webkit-tap-highlight-color: transparent;
//           touch-action: manipulation;
//           user-select: none;
//         }
//       `}</style>

//       {/*
//         ROOT OVERLAY
//         ref={rootRef} so our visualViewport handler can update paddingBottom.
//       */}
//       <div className="cbs-root md:hidden" ref={rootRef}>
//         {/* Backdrop */}
//         <div
//           className="cbs-backdrop"
//           style={{ opacity: visible ? 1 : 0 }}
//           onClick={handleClose}
//         />

//         {/* Sheet */}
//         <div
//           ref={sheetRef}
//           className="cbs-sheet"
//           style={{
//             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
//             transition: isDragging
//               ? "none"
//               : "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
//           }}
//         >
//           {/* ── Drag Handle + Header ──────────────────────────────────────── */}
//           <div
//             style={{
//               flexShrink: 0,
//               padding: "12px 16px 0",
//               userSelect: "none",
//             }}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             {/* Handle pill */}
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

//             {/* Header row */}
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
//                 className="cbs-touch-btn"
//                 onClick={handleClose}
//                 style={{
//                   width: 28,
//                   height: 28,
//                   minWidth: 44,
//                   minHeight: 44,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderRadius: "50%",
//                   background: "rgba(255,255,255,0.07)",
//                   border: "0.5px solid rgba(255,255,255,0.1)",
//                   cursor: "pointer",
//                   marginRight: -8,
//                 }}
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

//           {/* ── Comment List ──────────────────────────────────────────────── */}
//           <div ref={listRef} className="cbs-list">
//             {loading ? (
//               /* Skeleton loader */
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
//                   paddingBottom: 4,
//                 }}
//               >
//                 {comments.length === 0 ? (
//                   /* Empty state */
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
//                   comments
//                     // Skip comments whose user wasn't populated (deleted/deactivated account)
//                     .filter((c) => c.user?._id)
//                     // Hide comments from blocked users
//                     .filter((c) => !blockedSet.has(String(c.user?._id)))
//                     .map((c, i) => {
//                       const isMyComment =
//                         String(user?._id) === String(c.user?._id);
//                       return (
//                         <div
//                           key={c._id}
//                           className="cbs-comment-row"
//                           style={{
//                             animationDelay: `${i * 40}ms`,
//                             display: "flex",
//                             gap: 12,
//                             alignItems: "flex-start",
//                             position: "relative",
//                           }}
//                         >
//                           <Avatar
//                             username={c.user?.username}
//                             profilePicture={c.user?.profilePicture}
//                             size={32}
//                           />
//                           <div style={{ flex: 1, minWidth: 0 }}>
//                             <p
//                               style={{
//                                 fontSize: 13,
//                                 lineHeight: 1.5,
//                                 color: "rgba(255,255,255,0.8)",
//                                 margin: 0,
//                                 wordBreak: "break-word",
//                               }}
//                             >
//                               <span
//                                 style={{
//                                   fontWeight: 600,
//                                   color: "#fff",
//                                   marginRight: 6,
//                                 }}
//                               >
//                                 {c.user?.username}
//                               </span>
//                               {c.text}
//                             </p>
//                             <p
//                               style={{
//                                 fontSize: 11,
//                                 color: "rgba(255,255,255,0.25)",
//                                 margin: "4px 0 0",
//                               }}
//                             >
//                               {new Date(c.createdAt).toLocaleDateString(
//                                 "en-US",
//                                 {
//                                   month: "short",
//                                   day: "numeric",
//                                 },
//                               )}
//                             </p>
//                           </div>

//                           {isMyComment && (
//                             <div
//                               style={{ position: "relative", flexShrink: 0 }}
//                               data-comment-menu
//                             >
//                               <button
//                                 className="cbs-touch-btn"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   setActiveCommentMenu(
//                                     activeCommentMenu === c._id ? null : c._id,
//                                   );
//                                 }}
//                                 style={{
//                                   width: 44,
//                                   height: 44,
//                                   display: "flex",
//                                   alignItems: "center",
//                                   justifyContent: "center",
//                                   background: "transparent",
//                                   border: "none",
//                                   cursor: "pointer",
//                                   color: "rgba(255,255,255,0.3)",
//                                   marginRight: -10,
//                                 }}
//                               >
//                                 <svg
//                                   width="14"
//                                   height="14"
//                                   viewBox="0 0 24 24"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   strokeWidth="2"
//                                 >
//                                   <circle cx="5" cy="12" r="1" />
//                                   <circle cx="12" cy="12" r="1" />
//                                   <circle cx="19" cy="12" r="1" />
//                                 </svg>
//                               </button>

//                               {activeCommentMenu === c._id && (
//                                 <div
//                                   data-comment-menu
//                                   style={{
//                                     position: "absolute",
//                                     right: 0,
//                                     top: 36,
//                                     zIndex: 50,
//                                     width: 148,
//                                     borderRadius: 12,
//                                     background: "#1f1f1f",
//                                     border: "0.5px solid rgba(255,255,255,0.1)",
//                                     boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
//                                     overflow: "hidden",
//                                   }}
//                                 >
//                                   <button
//                                     className="cbs-touch-btn"
//                                     onClick={() => handleDeleteComment(c._id)}
//                                     style={{
//                                       width: "100%",
//                                       minHeight: 44,
//                                       display: "flex",
//                                       alignItems: "center",
//                                       gap: 8,
//                                       padding: "10px 12px",
//                                       fontSize: 13,
//                                       fontWeight: 500,
//                                       color: "#f87171",
//                                       background: "transparent",
//                                       border: "none",
//                                       cursor: "pointer",
//                                       textAlign: "left",
//                                     }}
//                                   >
//                                     <svg
//                                       width="13"
//                                       height="13"
//                                       viewBox="0 0 24 24"
//                                       fill="none"
//                                       stroke="currentColor"
//                                       strokeWidth="2"
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                     >
//                                       <polyline points="3 6 5 6 21 6" />
//                                       <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//                                       <path d="M10 11v6M14 11v6M9 6V4h6v2" />
//                                     </svg>
//                                     Delete comment
//                                   </button>
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       );
//                     })
//                 )}
//               </div>
//             )}
//           </div>

//           {/* ── Input Bar ─────────────────────────────────────────────────── */}
//           {/*
//             This is the most critical element.
//             `flex-shrink: 0` ensures it NEVER gets hidden by the comment list.
//             The keyboard-push logic (paddingBottom on root) ensures it's always
//             visible above the keyboard. The combination is what WhatsApp uses.
//           */}
//           <div className="cbs-input-bar">
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <Avatar
//                 username={user?.username || "?"}
//                 profilePicture={user?.profilePicture}
//                 size={32}
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
//                   minWidth: 0,
//                   /*
//                    * Transition the border on focus is done via JS below
//                    * since CSS :focus-within doesn't reach into shadow DOM
//                    * consistently on older iOS WebViews.
//                    */
//                 }}
//               >
//                 <input
//                   ref={inputRef}
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       handlePost();
//                     }
//                   }}
//                   onFocus={(e) => {
//                     // Highlight the input wrapper on focus
//                     e.currentTarget.parentElement.style.border =
//                       "0.5px solid rgba(96, 165, 250, 0.4)";
//                   }}
//                   onBlur={(e) => {
//                     e.currentTarget.parentElement.style.border =
//                       "0.5px solid rgba(255,255,255,0.08)";
//                   }}
//                   placeholder="Add a comment…"
//                   className="cbs-input"
//                   /*
//                    * Suppress autofill / suggestion bars
//                    * "new-password" is the most reliable cross-browser hack
//                    * to suppress Chrome's autofill toolbar (key icon, GIF, etc.)
//                    */
//                   autoComplete="new-password"
//                   autoCorrect="off"
//                   autoCapitalize="sentences"
//                   spellCheck={false}
//                   inputMode="text"
//                   data-form-type="other"
//                   /*
//                    * font-size: 16px in the className is NOT enough —
//                    * inline style wins specificity, so we set it here too
//                    * as a defensive override.
//                    */
//                   style={{ fontSize: "16px" }}
//                 />
//                 {comment.trim() && (
//                   <button
//                     className="cbs-touch-btn"
//                     onClick={handlePost}
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 600,
//                       color: "#60a5fa",
//                       background: "transparent",
//                       border: "none",
//                       cursor: "pointer",
//                       whiteSpace: "nowrap",
//                       padding: "4px 0",
//                       flexShrink: 0,
//                       minHeight: 44,
//                       display: "flex",
//                       alignItems: "center",
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

// import { useEffect, useRef, useState, useCallback } from "react";
// import fetchData from "../utils/fetchData";
// import { useAuth } from "../hooks/useAuth";

// const SHEET_HEIGHT_PERCENT = 72;
// const DISMISS_THRESHOLD = 120;

// // ── Avatar ────────────────────────────────────────────────────────────────────
// const Avatar = ({ username, profilePicture, size = 32 }) => (
//   <div
//     style={{
//       width: size,
//       height: size,
//       borderRadius: "50%",
//       flexShrink: 0,
//       overflow: "hidden",
//     }}
//   >
//     {profilePicture ? (
//       <img
//         src={profilePicture}
//         alt={username}
//         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//       />
//     ) : (
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           background: `hsl(${(username?.charCodeAt(0) * 47) % 360}, 55%, 45%)`,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: size * 0.38,
//           fontWeight: 700,
//           color: "#fff",
//         }}
//       >
//         {username?.charAt(0).toUpperCase()}
//       </div>
//     )}
//   </div>
// );

// function CommentsBottomSheet({
//   post,
//   onClose,
//   onCommentAdded,
//   onCommentDeleted,
// }) {
//   const { user } = useAuth();

//   const [blockedSet, setBlockedSet] = useState(() => new Set());
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contentVisible, setContentVisible] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [activeCommentMenu, setActiveCommentMenu] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragY, setDragY] = useState(0);
//   const dragStartY = useRef(null);

//   const rootRef = useRef(null);
//   const sheetRef = useRef(null);
//   const listRef = useRef(null);
//   const inputRef = useRef(null);
//   const savedScrollY = useRef(0);

//   // ── Entry animation ──────────────────────────────────────────────────────────
//   useEffect(() => {
//     requestAnimationFrame(() => setVisible(true));
//   }, []);

//   // ── Body scroll lock ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     savedScrollY.current = window.scrollY;
//     const top = -savedScrollY.current;
//     document.body.style.cssText = `
//       overflow: hidden;
//       position: fixed;
//       top: ${top}px;
//       left: 0;
//       right: 0;
//       width: 100%;
//     `;
//     return () => {
//       document.body.style.cssText = "";
//       window.scrollTo(0, savedScrollY.current);
//     };
//   }, []);

//   // ── Viewport meta patch ──────────────────────────────────────────────────────
//   useEffect(() => {
//     let meta = document.querySelector('meta[name="viewport"]');
//     const prev = meta?.getAttribute("content") ?? "";
//     if (!meta) {
//       meta = document.createElement("meta");
//       meta.name = "viewport";
//       document.head.appendChild(meta);
//     }
//     meta.setAttribute(
//       "content",
//       "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content",
//     );
//     return () => meta.setAttribute("content", prev);
//   }, []);

//   // ── Core keyboard handler ────────────────────────────────────────────────────
//   //
//   // ANDROID FIX 1: No CSS transition on padding-bottom.
//   // On Android, visualViewport fires continuously during keyboard animation
//   // (many events as keyboard slides up). A CSS transition chases a moving
//   // target — the sheet lags behind the keyboard, showing a white gap.
//   // iOS fires once (after animation ends), so the transition was fine there.
//   // Solution: update paddingBottom instantly via JS, no CSS transition.
//   //
//   // ANDROID FIX 2: Use document.documentElement.clientHeight instead of
//   // window.innerHeight to calculate keyboard height.
//   // With interactive-widget=resizes-content (Android Chrome 108+), the CSS
//   // layout viewport (clientHeight) already shrinks when the keyboard opens.
//   // window.innerHeight does NOT shrink with it. So:
//   //   window.innerHeight - vv.height  → overestimates keyboard on Android
//   //   clientHeight - vv.height        → correctly returns ~0 when browser
//   //                                      already compensated via resizes-content,
//   //                                      and the true keyboard height on older
//   //                                      Android where it didn't.
//   // iOS: window.innerHeight === clientHeight always, so no difference there.
//   //
//   useEffect(() => {
//     if (!window.visualViewport) return;

//     const onViewportChange = () => {
//       const root = rootRef.current;
//       if (!root) return;

//       const vv = window.visualViewport;

//       // FIX: use clientHeight (CSS layout viewport) not innerHeight.
//       // This prevents double-compensation on Android Chrome 108+ with
//       // interactive-widget=resizes-content.
//       const layoutHeight = document.documentElement.clientHeight;
//       const keyboardHeight = Math.max(
//         0,
//         layoutHeight - vv.height - (vv.offsetTop ?? 0),
//       );

//       // Apply instantly — no CSS transition (see ANDROID FIX 1 above)
//       root.style.paddingBottom =
//         keyboardHeight > 0 ? `${keyboardHeight}px` : "0px";

//       // Scroll list to bottom so the latest comment stays visible.
//       // FIX: 150ms + rAF instead of 50ms alone.
//       // On Android, visualViewport events fire mid-animation so the layout
//       // hasn't settled at 50ms. 150ms lets the keyboard finish, rAF ensures
//       // we read a fully-painted scrollHeight.
//       if (keyboardHeight > 0 && listRef.current) {
//         setTimeout(() => {
//           requestAnimationFrame(() => {
//             if (listRef.current) {
//               listRef.current.scrollTop = listRef.current.scrollHeight;
//             }
//           });
//         }, 150);
//       }
//     };

//     window.visualViewport.addEventListener("resize", onViewportChange);
//     window.visualViewport.addEventListener("scroll", onViewportChange);
//     onViewportChange();

//     return () => {
//       window.visualViewport.removeEventListener("resize", onViewportChange);
//       window.visualViewport.removeEventListener("scroll", onViewportChange);
//       if (rootRef.current) rootRef.current.style.paddingBottom = "0px";
//     };
//   }, []);

//   // ── Close comment menus on outside tap ──────────────────────────────────────
//   useEffect(() => {
//     const handler = (e) => {
//       if (!e.target.closest("[data-comment-menu]")) setActiveCommentMenu(null);
//     };
//     document.addEventListener("mousedown", handler);
//     document.addEventListener("touchstart", handler, { passive: true });
//     return () => {
//       document.removeEventListener("mousedown", handler);
//       document.removeEventListener("touchstart", handler);
//     };
//   }, []);

//   // ── Scroll list to bottom when comments load ─────────────────────────────────
//   useEffect(() => {
//     if (!loading && listRef.current) {
//       listRef.current.scrollTop = listRef.current.scrollHeight;
//     }
//   }, [comments, loading]);

//   // ── Fetch blocked users ──────────────────────────────────────────────────────
//   useEffect(() => {
//     fetchData("/api/users/blocked", { credentials: "include" })
//       .then((r) => r.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setBlockedSet(new Set(data.map((u) => String(u._id))));
//         }
//       })
//       .catch(() => {});
//   }, []);

//   // ── Fetch comments ───────────────────────────────────────────────────────────
//   useEffect(() => {
//     fetchData(`/api/posts/${post._id}/comments`, { credentials: "include" })
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

//   // ── Close handler ────────────────────────────────────────────────────────────
//   const handleClose = useCallback(() => {
//     inputRef.current?.blur();
//     setVisible(false);
//     setTimeout(onClose, 350);
//   }, [onClose]);

//   // ── Post comment ─────────────────────────────────────────────────────────────
//   const handlePost = useCallback(async () => {
//     if (!comment.trim()) return;
//     try {
//       const res = await fetchData(`/api/posts/${post._id}/comments`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ text: comment }),
//       });
//       const data = await res.json();
//       setComments((prev) => [...prev, data.comment]);
//       setComment("");
//       onCommentAdded?.();
//       setTimeout(() => {
//         requestAnimationFrame(() => {
//           if (listRef.current)
//             listRef.current.scrollTop = listRef.current.scrollHeight;
//         });
//       }, 150);
//     } catch (err) {
//       console.error("Post comment error:", err);
//     }
//   }, [comment, post._id, onCommentAdded]);

//   // ── Delete comment ───────────────────────────────────────────────────────────
//   const handleDeleteComment = useCallback(
//     async (commentId) => {
//       try {
//         const res = await fetchData(
//           `/api/posts/${post._id}/comments/${commentId}`,
//           { method: "DELETE", credentials: "include" },
//         );
//         const data = await res.json();
//         if (data.success) {
//           setComments((prev) => prev.filter((c) => c._id !== commentId));
//           setActiveCommentMenu(null);
//           onCommentDeleted?.();
//         }
//       } catch (err) {
//         console.error("Delete comment error:", err);
//       }
//     },
//     [post._id, onCommentDeleted],
//   );

//   // ── Drag to dismiss ──────────────────────────────────────────────────────────
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
//     if (dragY > DISMISS_THRESHOLD) handleClose();
//     else setDragY(0);
//     setIsDragging(false);
//     dragStartY.current = null;
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes cbs-shimmer {
//           0%   { background-position: -400px 0; }
//           100% { background-position:  400px 0; }
//         }
//         .cbs-skeleton {
//           background: linear-gradient(
//             90deg,
//             rgba(255,255,255,0.04) 25%,
//             rgba(255,255,255,0.09) 50%,
//             rgba(255,255,255,0.04) 75%
//           );
//           background-size: 400px 100%;
//           animation: cbs-shimmer 1.4s ease infinite;
//         }

//         @keyframes cbs-fadeSlideIn {
//           from { opacity: 0; transform: translateY(8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .cbs-comment-row {
//           opacity: 0;
//           animation: cbs-fadeSlideIn 0.25s ease forwards;
//         }

//         .cbs-root {
//           position: fixed;
//           inset: 0;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-end;
//           z-index: 9999;
//           pointer-events: none;
//           box-sizing: border-box;
//           /*
//            * ANDROID FIX 1: NO transition on padding-bottom.
//            * Android fires visualViewport resize continuously during keyboard
//            * animation. A CSS transition chases a moving target and causes
//            * a visible gap between the sheet and the keyboard throughout.
//            * iOS fires once after animation — transition was harmless there.
//            * We handle visual smoothness by letting the keyboard animation
//            * itself do the work, not a CSS transition on our side.
//            */
//         }

//         .cbs-backdrop {
//           position: absolute;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.55);
//           backdrop-filter: blur(2px);
//           -webkit-backdrop-filter: blur(2px);
//           pointer-events: all;
//           transition: opacity 0.3s ease;
//         }

//         .cbs-sheet {
//           position: relative;
//           width: 100%;
//           max-width: 470px;
//           margin: 0 auto;
//           /*
//            * ANDROID FIX 4: Use dvh + max-height instead of plain vh.
//            * With interactive-widget=resizes-content, 100dvh already shrinks
//            * when keyboard opens on modern Android. Using vh used the
//            * pre-keyboard full-screen height, so the sheet could be taller
//            * than the visible area above the keyboard.
//            * max-height: 100% clamps to whatever the root allows after
//            * paddingBottom is applied.
//            */
//           height: ${SHEET_HEIGHT_PERCENT}dvh;
//           max-height: 100%;
//           display: flex;
//           flex-direction: column;
//           background: #141414;
//           border-radius: 16px 16px 0 0;
//           border-top: 0.5px solid rgba(255, 255, 255, 0.08);
//           box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.6);
//           pointer-events: all;
//           overflow: hidden;
//           will-change: transform;
//           /*
//            * ANDROID FIX 3: safe-area-inset-bottom moved to input bar only.
//            * On some Android gesture-nav devices, safe-area-inset-bottom is
//            * non-zero AND does not go to zero when the keyboard opens (unlike
//            * iOS where the home indicator disappears). Having it on the sheet
//            * root caused double-padding — once from safe-area, once from the
//            * JS keyboard handler. Now it only affects the input bar, which is
//            * the only element that actually needs home-indicator clearance
//            * when the keyboard is closed.
//            */
//           box-sizing: border-box;
//         }

//         .cbs-list {
//           flex: 1;
//           min-height: 0;
//           overflow-y: auto;
//           -webkit-overflow-scrolling: touch;
//           overscroll-behavior: contain;
//           padding: 12px 16px 8px;
//         }

//         .cbs-input-bar {
//           flex-shrink: 0;
//           border-top: 0.5px solid rgba(255, 255, 255, 0.07);
//           padding: 10px 12px 12px;
//           background: #141414;
//           /*
//            * ANDROID FIX 3 (continued): safe-area padding on input bar only,
//            * not the sheet. This gives home-indicator clearance when keyboard
//            * is closed without stacking on top of the keyboard JS compensation.
//            */
//           padding-bottom: max(12px, calc(12px + env(safe-area-inset-bottom, 0px)));
//           box-sizing: border-box;
//         }

//         .cbs-input {
//           flex: 1;
//           background: transparent;
//           border: none;
//           outline: none;
//           font-size: 16px;
//           line-height: 1.4;
//           color: rgba(255, 255, 255, 0.85);
//           caret-color: #60a5fa;
//           min-width: 0;
//         }
//         .cbs-input::placeholder {
//           color: rgba(255, 255, 255, 0.3);
//         }

//         .cbs-touch-btn {
//           -webkit-tap-highlight-color: transparent;
//           touch-action: manipulation;
//           user-select: none;
//         }
//       `}</style>

//       <div className="cbs-root md:hidden" ref={rootRef}>
//         <div
//           className="cbs-backdrop"
//           style={{ opacity: visible ? 1 : 0 }}
//           onClick={handleClose}
//         />

//         <div
//           ref={sheetRef}
//           className="cbs-sheet"
//           style={{
//             transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
//             transition: isDragging
//               ? "none"
//               : "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
//           }}
//         >
//           {/* ── Drag Handle + Header ──────────────────────────────────────── */}
//           <div
//             style={{
//               flexShrink: 0,
//               padding: "12px 16px 0",
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
//                 className="cbs-touch-btn"
//                 onClick={handleClose}
//                 style={{
//                   width: 28,
//                   height: 28,
//                   minWidth: 44,
//                   minHeight: 44,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderRadius: "50%",
//                   background: "rgba(255,255,255,0.07)",
//                   border: "0.5px solid rgba(255,255,255,0.1)",
//                   cursor: "pointer",
//                   marginRight: -8,
//                 }}
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

//           {/* ── Comment List ──────────────────────────────────────────────── */}
//           <div ref={listRef} className="cbs-list">
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
//                   paddingBottom: 4,
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
//                   comments
//                     .filter((c) => c.user?._id)
//                     .filter((c) => !blockedSet.has(String(c.user?._id)))
//                     .map((c, i) => {
//                       const isMyComment =
//                         String(user?._id) === String(c.user?._id);
//                       return (
//                         <div
//                           key={c._id}
//                           className="cbs-comment-row"
//                           style={{
//                             animationDelay: `${i * 40}ms`,
//                             display: "flex",
//                             gap: 12,
//                             alignItems: "flex-start",
//                             position: "relative",
//                           }}
//                         >
//                           <Avatar
//                             username={c.user?.username}
//                             profilePicture={c.user?.profilePicture}
//                             size={32}
//                           />
//                           <div style={{ flex: 1, minWidth: 0 }}>
//                             <p
//                               style={{
//                                 fontSize: 13,
//                                 lineHeight: 1.5,
//                                 color: "rgba(255,255,255,0.8)",
//                                 margin: 0,
//                                 wordBreak: "break-word",
//                               }}
//                             >
//                               <span
//                                 style={{
//                                   fontWeight: 600,
//                                   color: "#fff",
//                                   marginRight: 6,
//                                 }}
//                               >
//                                 {c.user?.username}
//                               </span>
//                               {c.text}
//                             </p>
//                             <p
//                               style={{
//                                 fontSize: 11,
//                                 color: "rgba(255,255,255,0.25)",
//                                 margin: "4px 0 0",
//                               }}
//                             >
//                               {new Date(c.createdAt).toLocaleDateString(
//                                 "en-US",
//                                 { month: "short", day: "numeric" },
//                               )}
//                             </p>
//                           </div>

//                           {isMyComment && (
//                             <div
//                               style={{ position: "relative", flexShrink: 0 }}
//                               data-comment-menu
//                             >
//                               <button
//                                 className="cbs-touch-btn"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   setActiveCommentMenu(
//                                     activeCommentMenu === c._id ? null : c._id,
//                                   );
//                                 }}
//                                 style={{
//                                   width: 44,
//                                   height: 44,
//                                   display: "flex",
//                                   alignItems: "center",
//                                   justifyContent: "center",
//                                   background: "transparent",
//                                   border: "none",
//                                   cursor: "pointer",
//                                   color: "rgba(255,255,255,0.3)",
//                                   marginRight: -10,
//                                 }}
//                               >
//                                 <svg
//                                   width="14"
//                                   height="14"
//                                   viewBox="0 0 24 24"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   strokeWidth="2"
//                                 >
//                                   <circle cx="5" cy="12" r="1" />
//                                   <circle cx="12" cy="12" r="1" />
//                                   <circle cx="19" cy="12" r="1" />
//                                 </svg>
//                               </button>

//                               {activeCommentMenu === c._id && (
//                                 <div
//                                   data-comment-menu
//                                   style={{
//                                     position: "absolute",
//                                     right: 0,
//                                     top: 36,
//                                     zIndex: 50,
//                                     width: 148,
//                                     borderRadius: 12,
//                                     background: "#1f1f1f",
//                                     border: "0.5px solid rgba(255,255,255,0.1)",
//                                     boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
//                                     overflow: "hidden",
//                                   }}
//                                 >
//                                   <button
//                                     className="cbs-touch-btn"
//                                     onClick={() => handleDeleteComment(c._id)}
//                                     style={{
//                                       width: "100%",
//                                       minHeight: 44,
//                                       display: "flex",
//                                       alignItems: "center",
//                                       gap: 8,
//                                       padding: "10px 12px",
//                                       fontSize: 13,
//                                       fontWeight: 500,
//                                       color: "#f87171",
//                                       background: "transparent",
//                                       border: "none",
//                                       cursor: "pointer",
//                                       textAlign: "left",
//                                     }}
//                                   >
//                                     <svg
//                                       width="13"
//                                       height="13"
//                                       viewBox="0 0 24 24"
//                                       fill="none"
//                                       stroke="currentColor"
//                                       strokeWidth="2"
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                     >
//                                       <polyline points="3 6 5 6 21 6" />
//                                       <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//                                       <path d="M10 11v6M14 11v6M9 6V4h6v2" />
//                                     </svg>
//                                     Delete comment
//                                   </button>
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       );
//                     })
//                 )}
//               </div>
//             )}
//           </div>

//           {/* ── Input Bar ─────────────────────────────────────────────────── */}
//           <div className="cbs-input-bar">
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <Avatar
//                 username={user?.username || "?"}
//                 profilePicture={user?.profilePicture}
//                 size={32}
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
//                   minWidth: 0,
//                 }}
//               >
//                 <input
//                   ref={inputRef}
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       handlePost();
//                     }
//                   }}
//                   onFocus={(e) => {
//                     e.currentTarget.parentElement.style.border =
//                       "0.5px solid rgba(96, 165, 250, 0.4)";
//                   }}
//                   onBlur={(e) => {
//                     e.currentTarget.parentElement.style.border =
//                       "0.5px solid rgba(255,255,255,0.08)";
//                   }}
//                   placeholder="Add a comment…"
//                   className="cbs-input"
//                   autoComplete="new-password"
//                   autoCorrect="off"
//                   autoCapitalize="sentences"
//                   spellCheck={false}
//                   inputMode="text"
//                   data-form-type="other"
//                   style={{ fontSize: "16px" }}
//                 />
//                 {comment.trim() && (
//                   <button
//                     className="cbs-touch-btn"
//                     onClick={handlePost}
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 600,
//                       color: "#60a5fa",
//                       background: "transparent",
//                       border: "none",
//                       cursor: "pointer",
//                       whiteSpace: "nowrap",
//                       padding: "4px 0",
//                       flexShrink: 0,
//                       minHeight: 44,
//                       display: "flex",
//                       alignItems: "center",
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

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import fetchData from "../utils/fetchData";
import { useAuth } from "../hooks/useAuth";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const SHEET_HEIGHT_PERCENT = 72;
const DISMISS_THRESHOLD = 120;

// ─────────────────────────────────────────────────────────────────────────────
// Platform detection — runs once, never changes during a session.
//
// WHY separate Android / iOS paths?
//   iOS Safari  : innerHeight shrinks once (post-animation), fixed elements
//                 anchor to the visual viewport automatically, safe-area-inset
//                 clears the home bar and disappears when keyboard is open.
//   Android Chrome: clientHeight shrinks (with interactive-widget=resizes-content),
//                 visualViewport fires 30-60x during keyboard animation,
//                 position:fixed is anchored to the LAYOUT viewport (not visual),
//                 so the sheet can end up BEHIND the keyboard mid-animation.
//
// Trying to patch one component for both creates an arms race of hacks.
// The correct engineering answer is: detect once → fork the rendering strategy.
// ─────────────────────────────────────────────────────────────────────────────

const UA = typeof navigator !== "undefined" ? navigator.userAgent : "";

const IS_IOS = /iPad|iPhone|iPod/.test(UA) && !window.MSStream;

// Android detection: covers Chrome, Samsung Internet, WebView, Firefox for Android
const IS_ANDROID = /Android/i.test(UA);

// Detect if the browser supports the CSS dvh unit (dynamic viewport height).
// dvh = "dynamic viewport height" that accounts for browser chrome collapsing.
// Supported in Chrome 108+, Safari 15.4+, Firefox 109+.
const SUPPORTS_DVH = (() => {
  try {
    const el = document.createElement("div");
    el.style.height = "1dvh";
    return el.style.height === "1dvh";
  } catch {
    return false;
  }
})();

// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────────────────────────────────────

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

// Shimmer skeleton row (shared)
const SkeletonRow = ({ widths }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
    <div
      className="cbs-skeleton"
      style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0 }}
    />
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        className="cbs-skeleton"
        style={{ height: 11, borderRadius: 6, width: widths[0] }}
      />
      <div
        className="cbs-skeleton"
        style={{ height: 11, borderRadius: 6, width: widths[1] }}
      />
      <div
        className="cbs-skeleton"
        style={{ height: 9, borderRadius: 6, width: "25%", marginTop: 2 }}
      />
    </div>
  </div>
);

const SKELETON_WIDTHS = [
  ["40%", "70%"],
  ["55%", "85%"],
  ["45%", "60%"],
  ["50%", "75%"],
];

// Empty state (shared)
const EmptyComments = () => (
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
    <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, margin: 0 }}>
      No comments yet
    </p>
    <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 12, margin: 0 }}>
      Be the first to comment
    </p>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Shared CSS string (injected once by whichever variant mounts)
// ─────────────────────────────────────────────────────────────────────────────

const SHARED_CSS = `
  @keyframes cbs-shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  .cbs-skeleton {
    background: linear-gradient(90deg,
      rgba(255,255,255,0.04) 25%,
      rgba(255,255,255,0.09) 50%,
      rgba(255,255,255,0.04) 75%
    );
    background-size: 400px 100%;
    animation: cbs-shimmer 1.4s ease infinite;
  }
  @keyframes cbs-fadeSlideIn {
    from { opacity:0; transform:translateY(8px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .cbs-comment-row {
    opacity: 0;
    animation: cbs-fadeSlideIn 0.25s ease forwards;
  }
  .cbs-touch-btn {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Shared hook: fetch comments + blocked set + post/delete actions
// ─────────────────────────────────────────────────────────────────────────────

function useComments(post, onCommentAdded, onCommentDeleted) {
  const [blockedSet, setBlockedSet] = useState(() => new Set());
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    fetchData("/api/users/blocked", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data))
          setBlockedSet(new Set(data.map((u) => String(u._id))));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchData(`/api/posts/${post._id}/comments`, { credentials: "include" })
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

  const postComment = useCallback(
    async (text, onSuccess) => {
      if (!text.trim()) return;
      try {
        const res = await fetchData(`/api/posts/${post._id}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ text }),
        });
        const data = await res.json();
        setComments((prev) => [...prev, data.comment]);
        onCommentAdded?.();
        onSuccess?.();
      } catch (err) {
        console.error("Post comment error:", err);
      }
    },
    [post._id, onCommentAdded],
  );

  const deleteComment = useCallback(
    async (commentId) => {
      try {
        const res = await fetchData(
          `/api/posts/${post._id}/comments/${commentId}`,
          { method: "DELETE", credentials: "include" },
        );
        const data = await res.json();
        if (data.success) {
          setComments((prev) => prev.filter((c) => c._id !== commentId));
          onCommentDeleted?.();
        }
      } catch (err) {
        console.error("Delete comment error:", err);
      }
    },
    [post._id, onCommentDeleted],
  );

  return {
    blockedSet,
    comments,
    loading,
    contentVisible,
    postComment,
    deleteComment,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared: comment list content (both variants render the same list DOM)
// ─────────────────────────────────────────────────────────────────────────────

function CommentList({
  loading,
  contentVisible,
  comments,
  blockedSet,
  userId,
  activeCommentMenu,
  setActiveCommentMenu,
  deleteComment,
}) {
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          paddingTop: 4,
        }}
      >
        {SKELETON_WIDTHS.map((w, i) => (
          <SkeletonRow key={i} widths={w} />
        ))}
      </div>
    );
  }

  const visible = comments
    .filter((c) => c.user?._id)
    .filter((c) => !blockedSet.has(String(c.user?._id)));

  return (
    <div
      style={{
        opacity: contentVisible ? 1 : 0,
        transform: contentVisible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      {visible.length === 0 ? (
        <EmptyComments />
      ) : (
        visible.map((c, i) => {
          const isMyComment = String(userId) === String(c.user?._id);
          return (
            <div
              key={c._id}
              className="cbs-comment-row"
              style={{
                animationDelay: `${i * 40}ms`,
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <Avatar
                username={c.user?.username}
                profilePicture={c.user?.profilePicture}
                size={32}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.8)",
                    margin: 0,
                    wordBreak: "break-word",
                  }}
                >
                  <span
                    style={{ fontWeight: 600, color: "#fff", marginRight: 6 }}
                  >
                    {c.user?.username}
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

              {isMyComment && (
                <div
                  style={{ position: "relative", flexShrink: 0 }}
                  data-comment-menu
                >
                  <button
                    className="cbs-touch-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCommentMenu(
                        activeCommentMenu === c._id ? null : c._id,
                      );
                    }}
                    style={{
                      width: 44,
                      height: 44,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.3)",
                      marginRight: -10,
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
                        top: 36,
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
                        className="cbs-touch-btn"
                        onClick={() => {
                          deleteComment(c._id);
                          setActiveCommentMenu(null);
                        }}
                        style={{
                          width: "100%",
                          minHeight: 44,
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "10px 12px",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#f87171",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6M9 6V4h6v2" />
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
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ██████████████████████████████████████████████████████████████████████████████
// iOS VARIANT
// ─────────────────────────────────────────────────────────────────────────────
// Strategy:
//   • Use position:fixed on the root overlay — Safari correctly anchors fixed
//     elements to the visual viewport, so when the keyboard opens the sheet
//     rises naturally without any JS.
//   • Listen to visualViewport.resize ONCE (fires after keyboard animation ends)
//     to apply a CSS transition-friendly paddingBottom adjustment.
//   • Use env(safe-area-inset-bottom) on the input bar for home bar clearance.
//   • Use dvh (or vh fallback) for sheet height.
//   • Body scroll lock via position:fixed trick (standard for iOS).
// ██████████████████████████████████████████████████████████████████████████████

function CommentsBottomSheetIOS({
  post,
  onClose,
  onCommentAdded,
  onCommentDeleted,
}) {
  const { user } = useAuth();
  const {
    blockedSet,
    comments,
    loading,
    contentVisible,
    postComment,
    deleteComment,
  } = useComments(post, onCommentAdded, onCommentDeleted);

  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeCommentMenu, setActiveCommentMenu] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [keyboardPadding, setKeyboardPadding] = useState(0);

  const rootRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const dragStartY = useRef(null);
  const savedScrollY = useRef(0);

  // Entry animation
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Body scroll lock — iOS standard approach
  useEffect(() => {
    savedScrollY.current = window.scrollY;
    document.body.style.cssText = `overflow:hidden;position:fixed;top:${-savedScrollY.current}px;left:0;right:0;width:100%;`;
    return () => {
      document.body.style.cssText = "";
      window.scrollTo(0, savedScrollY.current);
    };
  }, []);

  // Viewport meta — iOS needs interactive-widget=resizes-visual (not resizes-content)
  // so that the layout viewport does NOT shrink; the visual viewport shrinks instead,
  // and position:fixed elements follow it automatically.
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    const prev = meta?.getAttribute("content") ?? "";
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-visual",
    );
    return () => meta.setAttribute("content", prev);
  }, []);

  // iOS keyboard handler:
  // visualViewport fires ONCE after keyboard animation → safe to use CSS transition.
  // We use innerHeight (not clientHeight) because on iOS they're identical and
  // innerHeight is the most reliable pre-change value.
  useEffect(() => {
    if (!window.visualViewport) return;
    const onResize = () => {
      const vv = window.visualViewport;
      // On iOS with resizes-visual, innerHeight stays the same (layout unchanged).
      // The visual viewport shrinks by keyboard height.
      const gap = window.innerHeight - vv.height;
      setKeyboardPadding(Math.max(0, gap));
      if (gap > 0 && listRef.current) {
        // Single rAF is fine — iOS fires after animation
        requestAnimationFrame(() => {
          if (listRef.current)
            listRef.current.scrollTop = listRef.current.scrollHeight;
        });
      }
    };
    window.visualViewport.addEventListener("resize", onResize);
    // Initial call in case keyboard is somehow already open
    onResize();
    return () => window.visualViewport.removeEventListener("resize", onResize);
  }, []);

  // Scroll to bottom when comments load
  useEffect(() => {
    if (!loading && listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [comments, loading]);

  // Close comment menus on outside tap
  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest("[data-comment-menu]")) setActiveCommentMenu(null);
    };
    document.addEventListener("mousedown", h);
    document.addEventListener("touchstart", h, { passive: true });
    return () => {
      document.removeEventListener("mousedown", h);
      document.removeEventListener("touchstart", h);
    };
  }, []);

  const handleClose = useCallback(() => {
    inputRef.current?.blur();
    setVisible(false);
    setTimeout(onClose, 350);
  }, [onClose]);

  const handlePost = useCallback(async () => {
    await postComment(comment, () => {
      setComment("");
      setTimeout(
        () =>
          requestAnimationFrame(() => {
            if (listRef.current)
              listRef.current.scrollTop = listRef.current.scrollHeight;
          }),
        50,
      ); // 50ms is fine on iOS — one rAF after single visualViewport event
    });
  }, [comment, postComment]);

  // Drag to dismiss
  const handleTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };
  const handleTouchMove = (e) => {
    if (dragStartY.current === null) return;
    const d = e.touches[0].clientY - dragStartY.current;
    if (d > 0) setDragY(d);
  };
  const handleTouchEnd = () => {
    if (dragY > DISMISS_THRESHOLD) handleClose();
    else setDragY(0);
    setIsDragging(false);
    dragStartY.current = null;
  };

  return (
    <>
      <style>{SHARED_CSS}</style>
      <style>{`
        .cbs-ios-root {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 9999;
          pointer-events: none;
          box-sizing: border-box;
          /* iOS: transition on paddingBottom is fine — visualViewport fires once */
          transition: padding-bottom 0.25s ease;
        }
        .cbs-ios-sheet {
          position: relative;
          width: 100%;
          max-width: 470px;
          margin: 0 auto;
          height: ${SUPPORTS_DVH ? `${SHEET_HEIGHT_PERCENT}dvh` : `${SHEET_HEIGHT_PERCENT}vh`};
          max-height: 100%;
          display: flex;
          flex-direction: column;
          background: #141414;
          border-radius: 16px 16px 0 0;
          border-top: 0.5px solid rgba(255,255,255,0.08);
          box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
          pointer-events: all;
          overflow: hidden;
          will-change: transform;
          box-sizing: border-box;
        }
        .cbs-ios-list {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          padding: 12px 16px 8px;
        }
        .cbs-ios-input-bar {
          flex-shrink: 0;
          border-top: 0.5px solid rgba(255,255,255,0.07);
          padding: 10px 12px;
          /* iOS safe-area: home bar clears without double-padding the keyboard,
             because we use resizes-visual (layout unchanged, fixed elements follow visual vp). */
          padding-bottom: max(12px, calc(12px + env(safe-area-inset-bottom, 0px)));
          background: #141414;
          box-sizing: border-box;
        }
      `}</style>

      <div
        className="cbs-ios-root md:hidden"
        ref={rootRef}
        style={{
          paddingBottom: keyboardPadding > 0 ? keyboardPadding : undefined,
        }}
      >
        {/* Backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            pointerEvents: "all",
            transition: "opacity 0.3s ease",
            opacity: visible ? 1 : 0,
          }}
          onClick={handleClose}
        />

        {/* Sheet */}
        <div
          className="cbs-ios-sheet"
          style={{
            transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
            transition: isDragging
              ? "none"
              : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
          }}
        >
          {/* Header + drag handle */}
          <div
            style={{
              flexShrink: 0,
              padding: "12px 16px 0",
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
                className="cbs-touch-btn"
                onClick={handleClose}
                style={{
                  width: 28,
                  height: 28,
                  minWidth: 44,
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  marginRight: -8,
                }}
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

          {/* List */}
          <div ref={listRef} className="cbs-ios-list">
            <CommentList
              loading={loading}
              contentVisible={contentVisible}
              comments={comments}
              blockedSet={blockedSet}
              userId={user?._id}
              activeCommentMenu={activeCommentMenu}
              setActiveCommentMenu={setActiveCommentMenu}
              deleteComment={deleteComment}
            />
          </div>

          {/* Input bar */}
          <div className="cbs-ios-input-bar">
            <InputBar
              inputRef={inputRef}
              user={user}
              comment={comment}
              setComment={setComment}
              onPost={handlePost}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ██████████████████████████████████████████████████████████████████████████████
// ANDROID VARIANT
// ─────────────────────────────────────────────────────────────────────────────
// Strategy:
//   • Use interactive-widget=resizes-content so the browser SHRINKS the layout
//     viewport when the keyboard opens. This means our entire fixed-position
//     root already sits above the keyboard without any JS intervention.
//   • Because resizes-content already moves everything, we do NOT add extra
//     paddingBottom from visualViewport math (that would double-compensate).
//   • We still listen to visualViewport to detect keyboard-open state (to scroll
//     the list) but we do NOT mutate layout from it.
//   • No CSS transitions on padding — Android fires vv.resize continuously
//     during keyboard animation (see original code comments). Instead the layout
//     simply reflows instantly because the browser itself resizes the viewport.
//   • Sheet height uses dvh so it's relative to the (already-shrunk) viewport.
//   • Safe-area on input bar: Android safe-area-inset-bottom behaves differently
//     (it persists when keyboard is open on gesture-nav devices), so we use
//     a JS flag to zero it out when keyboard is open.
//   • overscroll-behavior: contain prevents the Android pull-to-refresh
//     from triggering inside the sheet.
// ██████████████████████████████████████████████████████████████████████████████

function CommentsBottomSheetAndroid({
  post,
  onClose,
  onCommentAdded,
  onCommentDeleted,
}) {
  const { user } = useAuth();
  const {
    blockedSet,
    comments,
    loading,
    contentVisible,
    postComment,
    deleteComment,
  } = useComments(post, onCommentAdded, onCommentDeleted);

  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeCommentMenu, setActiveCommentMenu] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const dragStartY = useRef(null);
  const savedScrollY = useRef(0);

  // Entry animation
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Body scroll lock.
  // On Android with resizes-content, position:fixed layout is already adjusted
  // by the browser. We still lock the body to prevent background scroll.
  // We do NOT use the position:fixed+top trick here because it interacts badly
  // with resizes-content on some Samsung devices.
  useEffect(() => {
    savedScrollY.current = window.scrollY;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Also prevent touchmove on body (Android pull-to-refresh protection)
    const preventBodyScroll = (e) => {
      // Allow scroll inside the sheet — it has its own scrollable area
      if (!e.target.closest(".cbs-android-list")) e.preventDefault();
    };
    document.addEventListener("touchmove", preventBodyScroll, {
      passive: false,
    });
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("touchmove", preventBodyScroll);
    };
  }, []);

  // Viewport meta — CRITICAL difference from iOS.
  // resizes-content: the browser shrinks the layout viewport.
  // This means position:fixed elements are naturally above the keyboard.
  // No JS paddingBottom needed — the browser does the work.
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    const prev = meta?.getAttribute("content") ?? "";
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content",
    );
    return () => meta.setAttribute("content", prev);
  }, []);

  // Android keyboard detection.
  // With resizes-content, clientHeight shrinks when keyboard opens.
  // We use this ONLY to:
  //   1. Know whether keyboard is open (for safe-area conditional)
  //   2. Scroll the list to bottom after layout settles
  // We do NOT set paddingBottom from here — that would double-compensate.
  useEffect(() => {
    if (!window.visualViewport) return;

    // Store the initial height so we can detect keyboard open/close
    const baseHeight = document.documentElement.clientHeight;
    let scrollTimeout = null;

    const onResize = () => {
      const currentHeight = document.documentElement.clientHeight;
      // Keyboard is open when the viewport has shrunk by more than 150px
      const isOpen = baseHeight - currentHeight > 150;
      setKeyboardOpen(isOpen);

      // Scroll to bottom after keyboard finishes animating.
      // We debounce because Android fires this continuously during animation.
      // 200ms after the LAST resize event, keyboard has settled.
      if (isOpen) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          requestAnimationFrame(() => {
            if (listRef.current)
              listRef.current.scrollTop = listRef.current.scrollHeight;
          });
        }, 200);
      }
    };

    window.visualViewport.addEventListener("resize", onResize, {
      passive: true,
    });
    return () => {
      window.visualViewport.removeEventListener("resize", onResize);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Scroll to bottom when comments load
  useEffect(() => {
    if (!loading && listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [comments, loading]);

  // Close comment menus on outside tap
  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest("[data-comment-menu]")) setActiveCommentMenu(null);
    };
    document.addEventListener("mousedown", h);
    document.addEventListener("touchstart", h, { passive: true });
    return () => {
      document.removeEventListener("mousedown", h);
      document.removeEventListener("touchstart", h);
    };
  }, []);

  const handleClose = useCallback(() => {
    inputRef.current?.blur();
    setVisible(false);
    setTimeout(onClose, 350);
  }, [onClose]);

  const handlePost = useCallback(async () => {
    await postComment(comment, () => {
      setComment("");
      // On Android, after posting, wait for vv to fire (debounced to 200ms above)
      // then rAF to read the settled scrollHeight.
      setTimeout(
        () =>
          requestAnimationFrame(() => {
            if (listRef.current)
              listRef.current.scrollTop = listRef.current.scrollHeight;
          }),
        250,
      );
    });
  }, [comment, postComment]);

  // Drag to dismiss
  const handleTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };
  const handleTouchMove = (e) => {
    if (dragStartY.current === null) return;
    const d = e.touches[0].clientY - dragStartY.current;
    if (d > 0) setDragY(d);
  };
  const handleTouchEnd = () => {
    if (dragY > DISMISS_THRESHOLD) handleClose();
    else setDragY(0);
    setIsDragging(false);
    dragStartY.current = null;
  };

  return (
    <>
      <style>{SHARED_CSS}</style>
      <style>{`
        .cbs-android-root {
          /*
           * position:fixed with resizes-content: the browser already
           * shrinks the layout viewport (and thus this fixed container)
           * when the keyboard opens. No JS padding needed.
           * NO transition here — Android fires vv.resize 30-60x during
           * keyboard animation; any transition would chase a moving target.
           */
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 9999;
          pointer-events: none;
          box-sizing: border-box;
        }
        .cbs-android-sheet {
          position: relative;
          width: 100%;
          max-width: 470px;
          margin: 0 auto;
          /*
           * dvh: "dynamic viewport height" — respects browser chrome (address bar).
           * On Android with resizes-content, dvh also respects the keyboard,
           * so the sheet never overflows behind the keyboard.
           * Fallback to vh for older Android browsers (Chrome < 108).
           */
          height: ${SUPPORTS_DVH ? `${SHEET_HEIGHT_PERCENT}dvh` : `${SHEET_HEIGHT_PERCENT}vh`};
          max-height: 100%;
          display: flex;
          flex-direction: column;
          background: #141414;
          border-radius: 16px 16px 0 0;
          border-top: 0.5px solid rgba(255,255,255,0.08);
          box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
          pointer-events: all;
          overflow: hidden;
          will-change: transform;
          box-sizing: border-box;
        }
        .cbs-android-list {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          /*
           * overscroll-behavior:contain prevents Android pull-to-refresh
           * from triggering when scrolling the comment list.
           * -webkit-overflow-scrolling:touch is still useful on older
           * Android WebView (pre-Chromium-based browsers).
           */
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          padding: 12px 16px 8px;
        }
        .cbs-android-input-bar {
          flex-shrink: 0;
          border-top: 0.5px solid rgba(255,255,255,0.07);
          padding: 10px 12px;
          /*
           * Android safe-area behavior:
           * On gesture-nav Android, safe-area-inset-bottom can be non-zero
           * AND stays non-zero when the keyboard opens (unlike iOS where it
           * goes to zero with the home bar). With resizes-content the keyboard
           * is already handled by browser, so we ONLY apply safe-area when
           * the keyboard is NOT open — otherwise it adds phantom extra space
           * at the bottom of the input bar.
           * We use a CSS custom property set by JS to toggle this.
           */
          padding-bottom: var(--cbs-safe-bottom, 12px);
          background: #141414;
          box-sizing: border-box;
        }
      `}</style>

      {/* Apply safe-area conditional via inline style on root */}
      <div
        className="cbs-android-root md:hidden"
        style={{
          // When keyboard is open, zero out safe-area inset (browser already compensated).
          // When keyboard is closed, respect device safe area.
          "--cbs-safe-bottom": keyboardOpen
            ? "12px"
            : "max(12px, calc(12px + env(safe-area-inset-bottom, 0px)))",
        }}
      >
        {/* Backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            pointerEvents: "all",
            transition: "opacity 0.3s ease",
            opacity: visible ? 1 : 0,
          }}
          onClick={handleClose}
        />

        {/* Sheet */}
        <div
          className="cbs-android-sheet"
          style={{
            transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
            transition: isDragging
              ? "none"
              : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
          }}
        >
          {/* Header + drag handle */}
          <div
            style={{
              flexShrink: 0,
              padding: "12px 16px 0",
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
                className="cbs-touch-btn"
                onClick={handleClose}
                style={{
                  width: 28,
                  height: 28,
                  minWidth: 44,
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  marginRight: -8,
                }}
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

          {/* List */}
          <div ref={listRef} className="cbs-android-list">
            <CommentList
              loading={loading}
              contentVisible={contentVisible}
              comments={comments}
              blockedSet={blockedSet}
              userId={user?._id}
              activeCommentMenu={activeCommentMenu}
              setActiveCommentMenu={setActiveCommentMenu}
              deleteComment={deleteComment}
            />
          </div>

          {/* Input bar */}
          <div className="cbs-android-input-bar">
            <InputBar
              inputRef={inputRef}
              user={user}
              comment={comment}
              setComment={setComment}
              onPost={handlePost}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared InputBar (identical UI, different parent layout)
// ─────────────────────────────────────────────────────────────────────────────

function InputBar({ inputRef, user, comment, setComment, onPost }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Avatar
        username={user?.username || "?"}
        profilePicture={user?.profilePicture}
        size={32}
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
          minWidth: 0,
        }}
        onFocus={(e) =>
          (e.currentTarget.style.border = "0.5px solid rgba(96,165,250,0.4)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.border = "0.5px solid rgba(255,255,255,0.08)")
        }
      >
        <input
          ref={inputRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onPost();
            }
          }}
          onFocus={(e) =>
            (e.currentTarget.parentElement.style.border =
              "0.5px solid rgba(96,165,250,0.4)")
          }
          onBlur={(e) =>
            (e.currentTarget.parentElement.style.border =
              "0.5px solid rgba(255,255,255,0.08)")
          }
          placeholder="Add a comment…"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: 16,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.85)",
            caretColor: "#60a5fa",
            minWidth: 0,
          }}
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="sentences"
          spellCheck={false}
          inputMode="text"
          data-form-type="other"
        />
        {comment.trim() && (
          <button
            className="cbs-touch-btn"
            onClick={onPost}
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#60a5fa",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              padding: "4px 0",
              flexShrink: 0,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
            }}
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ██████████████████████████████████████████████████████████████████████████████
// Public export — selects the right variant at module load time
//
// Why at module load and not inside the component?
//   - The platform never changes mid-session.
//   - Detecting in the component body would re-run on every render.
//   - This also means React never mounts both variants simultaneously,
//     avoiding any risk of the two different viewport meta tags fighting.
//
// The fallback for unknown platforms uses the iOS strategy because:
//   - Desktop browsers have no keyboard, so all keyboard logic is a no-op.
//   - Other mobile browsers (Firefox Android, Samsung Internet) partially
//     support the iOS model OR the resizes-content model.
//   - The iOS path degrades more gracefully when its assumptions are wrong.
// ██████████████████████████████████████████████████████████████████████████████

function CommentsBottomSheet(props) {
  const Variant = useMemo(() => {
    if (IS_ANDROID) return CommentsBottomSheetAndroid;
    // iOS, desktop, unknown → iOS strategy (graceful degradation)
    return CommentsBottomSheetIOS;
  }, []); // empty deps — platform never changes

  return <Variant {...props} />;
}

export default CommentsBottomSheet;