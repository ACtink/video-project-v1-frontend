// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import PostModal from "./PostModal";

// // function PostCard({ post , openProfile, onDelete}) {

// // const [selectedPost, setSelectedPost] = useState(null);

// //   const navigate = useNavigate();
// //   return (
// //     <div className="bg-black border border-white/10  overflow-hidden shadow max-w-md mx-auto">
// //       {/* Header */}
// //       <div
// //         onClick={() => navigate(`/profile/${post.user.username}`)}
// //         className="flex items-center gap-2 px-3 py-2 cursor-pointer"
// //       >
// //         {post.user.profilePicture ? (
// //           <img
// //             src={post.user.profilePicture}
// //             alt=""
// //             className="w-8 h-8 rounded-full object-cover"
// //           />
// //         ) : (
// //           <div
// //             className="
// //                     w-8 h-8
// //                     rounded-full
// //                     flex items-center justify-center
// //                     bg-emerald-600
// //                     text-white
// //                     font-bold
// //                     text-sm
// //                   "
// //           >
// //             {post.user.username?.charAt(0).toUpperCase()}
// //           </div>
// //         )}

// //         <span className="font-medium text-sm">{post.user.username}</span>
// //       </div>

// //       {/* Image */}
// //       <img
// //         onClick={() => setSelectedPost(post)}
// //         src={post.imageUrl}
// //         alt=""
// //         className="w-full max-h-[420px] object-cover cursor-pointer"
// //       />

// //       {/* Actions */}
// //       <div className="px-3 py-2 space-y-1.5">
// //         <div className="flex items-center gap-3 text-lg">
// //           <button className="hover:text-red-500 transition">❤️</button>
// //           <button className="hover:text-blue-400 transition">💬</button>
// //         </div>

// //         {/* Likes */}
// //         <p className="text-sm font-medium">{post.likesCount} likes</p>

// //         {/* Caption */}
// //         {post.caption && (
// //           <p className="text-sm leading-relaxed text-white/90">
// //             <span className="font-semibold mr-2">{post.user.username}</span>
// //             <span className="text-white/80">{post.caption}</span>
// //           </p>
// //         )}

// //         {/* Comments */}
// //         <p className="text-white/60 text-sm cursor-pointer">
// //           View all {post.commentsCount} comments
// //         </p>

// //         {/* Time */}
// //         <p className="text-xs text-white/40">
// //           {new Date(post.createdAt).toLocaleDateString()}
// //         </p>

// //         {/* Add Comment */}
// //         <input
// //           placeholder="Add a comment..."
// //           className="w-full bg-transparent border-t border-white/10 pt-1.5 text-sm outline-none placeholder-white/40"
// //         />
// //       </div>
// //       {selectedPost && (
// //         <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} onDelete={onDelete} />
// //       )}
// //     </div>
// //   );
// // }

// // export default PostCard;

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import PostModal from "./PostModal";

// // function PostCard({ post, onDelete }) {
// //   const [selectedPost, setSelectedPost] = useState(null);
// //   const [liked, setLiked] = useState(false);
// //   const [comment, setComment] = useState("");
// //   const navigate = useNavigate();

// //   return (
// //     <div className="bg-[#0a0a0a] border border-white/[0.08] max-w-[470px] mx-auto mb-6 overflow-hidden">
// //       {/* Header */}
// //       <div
// //         onClick={() => navigate(`/profile/${post.user.username}`)}
// //         className="flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer"
// //       >
// //         {post.user.profilePicture ? (
// //           <img
// //             src={post.user.profilePicture}
// //             alt=""
// //             className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0"
// //           />
// //         ) : (
// //           <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
// //             {post.user.username?.charAt(0).toUpperCase()}
// //           </div>
// //         )}
// //         <span className="flex-1 font-semibold text-[13.5px] text-neutral-100 tracking-wide">
// //           {post.user.username}
// //         </span>
// //         <svg
// //           width="16"
// //           height="16"
// //           viewBox="0 0 24 24"
// //           fill="none"
// //           stroke="rgba(255,255,255,0.25)"
// //           strokeWidth="2"
// //         >
// //           <circle cx="5" cy="12" r="1" />
// //           <circle cx="12" cy="12" r="1" />
// //           <circle cx="19" cy="12" r="1" />
// //         </svg>
// //       </div>

// //       {/* Image */}
// //       <img
// //         onClick={() => setSelectedPost(post)}
// //         src={post.imageUrl}
// //         alt=""
// //         className="w-full max-h-[470px] object-cover cursor-pointer block"
// //       />

// //       {/* Actions */}
// //       <div className="px-3.5 pt-2.5 pb-4">
// //         {/* Action Buttons */}
// //         <div className="flex items-center gap-1 mb-2">
// //           <button
// //             onClick={() => setLiked(!liked)}
// //             className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
// //           >
// //             <svg
// //               width="22"
// //               height="22"
// //               viewBox="0 0 24 24"
// //               fill={liked ? "#ef4444" : "none"}
// //               stroke={liked ? "#ef4444" : "rgba(255,255,255,0.85)"}
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             >
// //               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
// //             </svg>
// //           </button>
// //           <button className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer">
// //             <svg
// //               width="22"
// //               height="22"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="rgba(255,255,255,0.85)"
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             >
// //               <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
// //             </svg>
// //           </button>
// //           <button className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer ml-auto">
// //             <svg
// //               width="22"
// //               height="22"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="rgba(255,255,255,0.85)"
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             >
// //               <polygon points="22 3 2 10 22 21 22 3" />
// //               <line x1="12" y1="12" x2="22" y2="3" />
// //             </svg>
// //           </button>
// //         </div>

// //         {/* Likes */}
// //         <p className="text-[13.5px] font-semibold text-neutral-100 mb-1 tracking-wide">
// //           {post.likesCount.toLocaleString()} likes
// //         </p>

// //         {/* Caption */}
// //         {post.caption && (
// //           <p className="text-[13.5px] leading-relaxed text-white/75 mb-1.5">
// //             <span className="font-semibold text-neutral-100 mr-1.5">
// //               {post.user.username}
// //             </span>
// //             {post.caption}
// //           </p>
// //         )}

// //         {/* Comments */}
// //         <p className="text-[13px] text-white/35 cursor-pointer mb-2 tracking-wide">
// //           View all {post.commentsCount} comments
// //         </p>

// //         {/* Time */}
// //         <p className="text-[11px] text-white/25 mb-2.5 uppercase tracking-widest">
// //           {new Date(post.createdAt).toLocaleDateString("en-US", {
// //             month: "long",
// //             day: "numeric",
// //           })}
// //         </p>

// //         {/* Add Comment */}
// //         <div className="flex items-center gap-2 border-t border-white/[0.07] pt-2.5">
// //           <input
// //             value={comment}
// //             onChange={(e) => setComment(e.target.value)}
// //             placeholder="Add a comment…"
// //             className="flex-1 bg-transparent border-none outline-none text-[13px] text-white/70 placeholder-white/30 tracking-wide"
// //           />
// //           {comment.trim() && (
// //             <button
// //               onClick={() => setComment("")}
// //               className="text-[12px] font-semibold text-blue-400 bg-transparent border-none cursor-pointer tracking-wide"
// //             >
// //               Post
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {selectedPost && (
// //         <PostModal
// //           post={selectedPost}
// //           onClose={() => setSelectedPost(null)}
// //           onDelete={onDelete}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // export default PostCard;

// import { useState , useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import PostModal from "./PostModal";

// function CommentsBottomSheet({ post, onClose, token }) {
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragY, setDragY] = useState(0);
//   const dragStartY = useRef(null);
//   const sheetRef = useRef(null);

//   // Fetch comments on open
//   useEffect(() => {
//     fetch(`/api/posts/${post._id}/comments`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((r) => r.json())
//       .then((data) => setComments(data.comments || []))
//       .catch(() => setComments([]))
//       .finally(() => setLoading(false));
//   }, [post._id]);

//   // Post a comment
//   const handlePost = async () => {
//     if (!comment.trim()) return;
//     try {
//       const res = await fetch(`/api/posts/${post._id}/comments`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
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
//       onClose();
//     } else {
//       setDragY(0);
//     }
//     setIsDragging(false);
//     dragStartY.current = null;
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black/50 z-40 md:hidden"
//         onClick={onClose}
//       />

//       {/* Sheet wrapper */}
//       <div
//         className="fixed inset-x-0 bottom-0 z-50 flex justify-center md:hidden"
//         style={{
//           top: "10vh",
//           paddingBottom: "env(safe-area-inset-bottom)",
//         }}
//       >
//         <div
//           ref={sheetRef}
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           style={{
//             transform: `translateY(${dragY}px)`,
//             transition: isDragging
//               ? "none"
//               : "transform 0.3s cubic-bezier(0.32,0.72,0,1)",
//             height: "100dvh",
//           }}
//           className="w-full max-w-[470px] bg-[#1c1c1e] rounded-t-2xl flex flex-col overflow-hidden shadow-2xl"
//         >
//           {/* Drag Handle + Header */}
//           <div className="flex-shrink-0 px-4 pt-3 pb-0">
//             <div className="flex justify-center mb-3">
//               <div className="w-10 h-[4px] rounded-full bg-white/20" />
//             </div>
//             <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
//               <span className="text-[15px] font-semibold text-white tracking-wide">
//                 Comments
//               </span>
//               <button
//                 onClick={onClose}
//                 className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer"
//               >
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="rgba(255,255,255,0.7)"
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
//           <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5">
//             {loading ? (
//               <div className="flex items-center justify-center h-full pb-10">
//                 <p className="text-white/30 text-sm">Loading...</p>
//               </div>
//             ) : comments.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full gap-2 pb-10">
//                 <svg
//                   width="40"
//                   height="40"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="rgba(255,255,255,0.15)"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//                 </svg>
//                 <p className="text-white/30 text-sm">No comments yet</p>
//                 <p className="text-white/20 text-xs">Be the first to comment</p>
//               </div>
//             ) : (
//               comments.map((c) => (
//                 <div key={c._id} className="flex items-start gap-3">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
//                     {c.user.username.charAt(0).toUpperCase()}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-[13px] leading-relaxed text-white/85">
//                       <span className="font-semibold text-white mr-1.5">
//                         {c.user.username}
//                       </span>
//                       {c.text}
//                     </p>
//                     <div className="flex items-center gap-3 mt-1">
//                       <span className="text-[11px] text-white/30">
//                         {new Date(c.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Comment Input Bar */}
//           <div
//             className="flex-shrink-0 border-t border-white/[0.07] px-3 pt-3 bg-[#1c1c1e]"
//             style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
//           >
//             <div className="flex items-center gap-2.5">
//               <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
//                 Y
//               </div>
//               <div className="flex-1 flex items-center bg-white/[0.07] rounded-full px-3.5 py-2 gap-2">
//                 <input
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handlePost()}
//                   placeholder="Add a comment…"
//                   className="flex-1 bg-transparent border-none outline-none text-[13px] text-white/80 placeholder-white/30 tracking-wide"
//                 />
//                 {comment.trim() && (
//                   <button
//                     onClick={handlePost}
//                     className="text-[12px] font-semibold text-blue-400 bg-transparent border-none cursor-pointer tracking-wide whitespace-nowrap"
//                   >
//                     Post
//                   </button>
//                 )}
//               </div>
//               <button className="bg-transparent border-none cursor-pointer text-lg leading-none">
//                 😊
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function PostCard({ post, onDelete }) {
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [showMobileComments, setShowMobileComments] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [comment, setComment] = useState("");
//   const navigate = useNavigate();

//   // Only open modal on md+ screens (≥768px)
//   const handleImageClick = () => {
//     if (window.innerWidth >= 768) {
//       setSelectedPost(post);
//     }
//   };

//   return (
//     <div className="bg-[#0a0a0a] border border-white/[0.08] max-w-[470px] mx-auto mb-6 overflow-hidden">
//       {/* Header */}
//       <div
//         onClick={() => navigate(`/profile/${post.user.username}`)}
//         className="flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer"
//       >
//         {post.user.profilePicture ? (
//           <img
//             src={post.user.profilePicture}
//             alt=""
//             className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0"
//           />
//         ) : (
//           <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//             {post.user.username?.charAt(0).toUpperCase()}
//           </div>
//         )}
//         <span className="flex-1 font-semibold text-[13.5px] text-neutral-100 tracking-wide">
//           {post.user.username}
//         </span>
//         <svg
//           width="16"
//           height="16"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="rgba(255,255,255,0.25)"
//           strokeWidth="2"
//         >
//           <circle cx="5" cy="12" r="1" />
//           <circle cx="12" cy="12" r="1" />
//           <circle cx="19" cy="12" r="1" />
//         </svg>
//       </div>

//       {/* Image */}
//       <img
//         onClick={handleImageClick}
//         src={post.imageUrl}
//         alt=""
//         className="w-full max-h-[470px] object-cover block md:cursor-pointer"
//       />

//       {/* Actions */}
//       <div className="px-3.5 pt-2.5 pb-4">
//         {/* Action Buttons */}
//         <div className="flex items-center gap-1 mb-2">
//           <button
//             onClick={() => setLiked(!liked)}
//             className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill={liked ? "#ef4444" : "none"}
//               stroke={liked ? "#ef4444" : "rgba(255,255,255,0.85)"}
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//             </svg>
//           </button>

//           {/* Comment Button — opens bottom sheet on mobile, modal on desktop */}
//           <button
//             onClick={() => {
//               if (window.innerWidth < 768) {
//                 setShowMobileComments(true);
//               } else {
//                 setSelectedPost(post);
//               }
//             }}
//             className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.85)"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//             </svg>
//           </button>

//           <button className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer ml-auto">
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.85)"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polygon points="22 3 2 10 22 21 22 3" />
//               <line x1="12" y1="12" x2="22" y2="3" />
//             </svg>
//           </button>
//         </div>

//         {/* Likes */}
//         <p className="text-[13.5px] font-semibold text-neutral-100 mb-1 tracking-wide">
//           {post.likesCount.toLocaleString()} likes
//         </p>

//         {/* Caption */}
//         {post.caption && (
//           <p className="text-[13.5px] leading-relaxed text-white/75 mb-1.5">
//             <span className="font-semibold text-neutral-100 mr-1.5">
//               {post.user.username}
//             </span>
//             {post.caption}
//           </p>
//         )}

//         {/* Comments */}
//         <p
//           onClick={() => {
//             if (window.innerWidth < 768) {
//               setShowMobileComments(true);
//             } else {
//               setSelectedPost(post);
//             }
//           }}
//           className="text-[13px] text-white/35 cursor-pointer mb-2 tracking-wide"
//         >
//           View all {post.commentsCount} comments
//         </p>

//         {/* Time */}
//         <p className="text-[11px] text-white/25 mb-2.5 uppercase tracking-widest">
//           {new Date(post.createdAt).toLocaleDateString("en-US", {
//             month: "long",
//             day: "numeric",
//           })}
//         </p>

//         {/* Add Comment — hidden on mobile (use bottom sheet instead) */}
//         <div className="hidden md:flex items-center gap-2 border-t border-white/[0.07] pt-2.5">
//           <input
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Add a comment…"
//             className="flex-1 bg-transparent border-none outline-none text-[13px] text-white/70 placeholder-white/30 tracking-wide"
//           />
//           {comment.trim() && (
//             <button
//               onClick={() => setComment("")}
//               className="text-[12px] font-semibold text-blue-400 bg-transparent border-none cursor-pointer tracking-wide"
//             >
//               Post
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Desktop Modal */}
//       {selectedPost && (
//         <PostModal
//           post={selectedPost}
//           onClose={() => setSelectedPost(null)}
//           onDelete={onDelete}
//         />
//       )}

//       {/* Mobile Comments Bottom Sheet */}
//       {showMobileComments && (
//         <CommentsBottomSheet
//           post={post}
//           onClose={() => setShowMobileComments(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default PostCard;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PostModal from "./PostModal";
// import CommentsBottomSheet from "./CommentsBottomSheet";

// function PostCard({ post, onDelete }) {
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [showMobileComments, setShowMobileComments] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [comment, setComment] = useState("");
//   const navigate = useNavigate();

//   const handleImageClick = () => {
//     if (window.innerWidth >= 768) {
//       setSelectedPost(post);
//     }
//   };

//   return (
//     <div className="bg-[#0a0a0a] border border-white/[0.08] max-w-[470px] mx-auto mb-6 overflow-hidden">
//       {/* Header */}
//       <div
//         onClick={() => navigate(`/profile/${post.user.username}`)}
//         className="flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer"
//       >
//         {post.user.profilePicture ? (
//           <img
//             src={post.user.profilePicture}
//             alt=""
//             className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0"
//           />
//         ) : (
//           <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//             {post.user.username?.charAt(0).toUpperCase()}
//           </div>
//         )}
//         <span className="flex-1 font-semibold text-[13.5px] text-neutral-100 tracking-wide">
//           {post.user.username}
//         </span>
//         <svg
//           width="16"
//           height="16"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="rgba(255,255,255,0.25)"
//           strokeWidth="2"
//         >
//           <circle cx="5" cy="12" r="1" />
//           <circle cx="12" cy="12" r="1" />
//           <circle cx="19" cy="12" r="1" />
//         </svg>
//       </div>

//       {/* Image */}
//       <img
//         onClick={handleImageClick}
//         src={post.imageUrl}
//         alt=""
//         className="w-full max-h-[950px] object-cover block md:cursor-pointer"
//       />

//       {/* Actions */}
//       <div className="px-3.5 pt-2.5 pb-4">
//         <div className="flex items-center gap-1 mb-2">
//           {/* Like */}
//           <button
//             onClick={() => setLiked(!liked)}
//             className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill={liked ? "#ef4444" : "none"}
//               stroke={liked ? "#ef4444" : "rgba(255,255,255,0.85)"}
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//             </svg>
//           </button>

//           {/* Comment */}
//           <button
//             onClick={() => {
//               if (window.innerWidth < 768) {
//                 setShowMobileComments(true);
//               } else {
//                 setSelectedPost(post);
//               }
//             }}
//             className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.85)"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a9.954 9.954 0 0 1-1.515 5.31L22 22l-4.69-1.515A9.954 9.954 0 0 1 12 22z" />
//             </svg>
//           </button>

//           {/* Share */}
//           <button
//             onClick={async () => {
//               if (navigator.share) {
//                 try {
//                   await navigator.share({
//                     title: `${post.user.username}'s post`,
//                     text: post.caption || "Check out this post",
//                     url: `${window.location.origin}/post/${post._id}`,
//                   });
//                 } catch (err) {
//                   // user cancelled
//                 }
//               }
//             }}
//             className="md:hidden p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer ml-auto"
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.85)"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <line x1="22" y1="2" x2="11" y2="13" />
//               <polygon points="22 2 15 22 11 13 2 9 22 2" />
//             </svg>
//           </button>
//         </div>

//         <p className="text-[13.5px] font-semibold text-neutral-100 mb-1 tracking-wide">
//           {post.likesCount.toLocaleString()} likes
//         </p>

//         {post.caption && (
//           <p className="text-[13.5px] leading-relaxed text-white/75 mb-1.5">
//             <span className="font-semibold text-neutral-100 mr-1.5">
//               {post.user.username}
//             </span>
//             {post.caption}
//           </p>
//         )}

//         <p
//           onClick={() => {
//             if (window.innerWidth < 768) {
//               setShowMobileComments(true);
//             } else {
//               setSelectedPost(post);
//             }
//           }}
//           className="text-[13px] text-white/35 cursor-pointer mb-2 tracking-wide"
//         >
//           View all {post.commentsCount} comments
//         </p>

//         <p className="text-[11px] text-white/25 mb-2.5 uppercase tracking-widest">
//           {new Date(post.createdAt).toLocaleDateString("en-US", {
//             month: "long",
//             day: "numeric",
//           })}
//         </p>
//       </div>

//       {selectedPost && (
//         <PostModal
//           post={selectedPost}
//           onClose={() => setSelectedPost(null)}
//           onDelete={onDelete}
//         />
//       )}

//       {showMobileComments && (
//         <CommentsBottomSheet
//           post={post}
//           onClose={() => setShowMobileComments(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default PostCard;

// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import PostModal from "./PostModal";
// import CommentsBottomSheet from "./CommentsBottomSheet";
// import PostOptionsSheet from "./PostOptionsSheet";
// import PostOptionsPopup from "./PostOptionsPopup";
// import { useAuth } from "../hooks/useAuth";

// function PostCard({ post, onDelete }) {
//   const { user } = useAuth();
//   const isOwner = String(user?._id) === String(post.user?._id);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [showMobileComments, setShowMobileComments] = useState(false);
//   const [showMobileOptions, setShowMobileOptions] = useState(false);
//   const [showDesktopOptions, setShowDesktopOptions] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const optionsRef = useRef(null);
//   const navigate = useNavigate();

//   const handleImageClick = () => {
//     if (window.innerWidth >= 768) setSelectedPost(post);
//   };

//   return (
//     <div className="bg-[#0a0a0a] max-w-[470px] mx-auto overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center gap-2.5 px-3.5 py-2.5">
//         {/* Avatar + username — navigates to profile */}
//         <div
//           onClick={() => navigate(`/profile/${post.user.username}`)}
//           className="flex items-center gap-2.5 cursor-pointer min-w-0"
//         >
//           {post.user.profilePicture ? (
//             <img
//               src={post.user.profilePicture}
//               alt=""
//               className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0"
//             />
//           ) : (
//             <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//               {post.user.username?.charAt(0).toUpperCase()}
//             </div>
//           )}
//           <span className="font-semibold text-[13.5px] text-neutral-100 tracking-wide truncate">
//             {post.user.username}
//           </span>
//         </div>

//         {/* Spacer — pushes three dots to the right */}
//         <div className="flex-1" />

//         {/* Three dots */}
//         {/* Three dots */}
//         {!isOwner && (
//           <div ref={optionsRef} className="relative flex-shrink-0">
//             <button
//               onClick={() => {
//                 if (window.innerWidth < 768) {
//                   setShowMobileOptions(true);
//                 } else {
//                   setShowDesktopOptions((v) => !v);
//                 }
//               }}
//               className="p-1.5 rounded-full bg-transparent border-none cursor-pointer transition-all duration-150 hover:bg-white/8 active:scale-90"
//             >
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="rgba(255,255,255,0.4)"
//                 strokeWidth="2"
//               >
//                 <circle cx="5" cy="12" r="1" />
//                 <circle cx="12" cy="12" r="1" />
//                 <circle cx="19" cy="12" r="1" />
//               </svg>
//             </button>

//             {showDesktopOptions && (
//               <PostOptionsPopup
//                 post={post}
//                 isOwner={isOwner}
//                 onClose={() => setShowDesktopOptions(false)}
//                 anchorRef={optionsRef}
//               />
//             )}
//           </div>
//         )}
//       </div>

//       {/* Image */}
//       <img
//         onClick={handleImageClick}
//         src={post.imageUrl}
//         alt=""
//         className="w-full max-h-[950px] object-cover block md:cursor-pointer"
//       />

//       {/* Actions */}
//       <div className="px-3.5 pt-2.5 pb-4">
//         <div className="flex items-center gap-1 mb-2">
//           {/* Like */}
//           <button
//             onClick={() => setLiked(!liked)}
//             className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill={liked ? "#ef4444" : "none"}
//               stroke={liked ? "#ef4444" : "rgba(255,255,255,0.85)"}
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//             </svg>
//           </button>

//           {/* Comment */}
//           <button
//             onClick={() => {
//               if (window.innerWidth < 768) setShowMobileComments(true);
//               else setSelectedPost(post);
//             }}
//             className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.85)"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a9.954 9.954 0 0 1-1.515 5.31L22 22l-4.69-1.515A9.954 9.954 0 0 1 12 22z" />
//             </svg>
//           </button>

//           {/* Share — mobile only */}
//           <button
//             onClick={async () => {
//               if (navigator.share) {
//                 try {
//                   await navigator.share({
//                     title: `${post.user.username}'s post`,
//                     text: post.caption || "Check out this post",
//                     url: `${window.location.origin}/post/${post._id}`,
//                   });
//                 } catch (err) {}
//               }
//             }}
//             className="md:hidden p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer ml-auto"
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.85)"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <line x1="22" y1="2" x2="11" y2="13" />
//               <polygon points="22 2 15 22 11 13 2 9 22 2" />
//             </svg>
//           </button>
//         </div>

//         <p className="text-[13.5px] font-semibold text-neutral-100 mb-1 tracking-wide">
//           {post.likesCount.toLocaleString()} likes
//         </p>

//         {post.caption && (
//           <p className="text-[13.5px] leading-relaxed text-white/75 mb-1.5">
//             <span className="font-semibold text-neutral-100 mr-1.5">
//               {post.user.username}
//             </span>
//             {post.caption}
//           </p>
//         )}

//         <p
//           onClick={() => {
//             if (window.innerWidth < 768) setShowMobileComments(true);
//             else setSelectedPost(post);
//           }}
//           className="text-[13px] text-white/35 cursor-pointer mb-2 tracking-wide"
//         >
//           View all {post.commentsCount} comments
//         </p>

//         <p className="text-[11px] text-white/25 mb-2.5 uppercase tracking-widest">
//           {new Date(post.createdAt).toLocaleDateString("en-US", {
//             month: "long",
//             day: "numeric",
//           })}
//         </p>
//       </div>

//       {selectedPost && (
//         <PostModal
//           post={selectedPost}
//           onClose={() => setSelectedPost(null)}
//           onDelete={onDelete}
//         />
//       )}

//       {showMobileComments && (
//         <CommentsBottomSheet
//           post={post}
//           onClose={() => setShowMobileComments(false)}
//         />
//       )}

//       {showMobileOptions && (
//         <PostOptionsSheet
//           post={post}
//           isOwner={isOwner}
//           onClose={() => setShowMobileOptions(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default PostCard;

// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import PostModal from "./PostModal";
// import CommentsBottomSheet from "./CommentsBottomSheet";
// import PostOptionsSheet from "./PostOptionsSheet";
// import PostOptionsPopup from "./PostOptionsPopup";
// import { useAuth } from "../hooks/useAuth";
// import fetchData from "../utils/fetchData";

// function PostCard({ post, onDelete, onLikeUpdate }) {
//   const { user } = useAuth();
//   const isOwner = String(user?._id) === String(post.user?._id);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [showMobileComments, setShowMobileComments] = useState(false);
//   const [showMobileOptions, setShowMobileOptions] = useState(false);
//   const [showDesktopOptions, setShowDesktopOptions] = useState(false);
//   const optionsRef = useRef(null);
//   const navigate = useNavigate();

//   const [commentsCount, setCommentsCount] = useState(post.commentsCount ?? 0);

//   // ── LIKE STATE ──────────────────────────────────────────────
//   const [liked, setLiked] = useState(() =>
//     post.likes?.some((id) => String(id) === String(user?.id ?? user?._id)),
//   );
//   const [likesCount, setLikesCount] = useState(post.likesCount ?? 0);
//   const [likeLoading, setLikeLoading] = useState(false);
//   const [animating, setAnimating] = useState(false);

//   const [hidden, setHidden] = useState(false);

//   // 2. Early return before the main render
//   if (hidden) return null;
//   // ────────────────────────────────────────────────────────────

//   const handleImageClick = () => {
//     if (window.innerWidth >= 768) setSelectedPost(post);
//   };

//   const handleLike = async () => {
//     if (likeLoading) return;
//     setLikeLoading(true);

//     const wasLiked = liked;
//     const newLiked = !wasLiked;
//     const newCount = wasLiked ? likesCount - 1 : likesCount + 1;

//     setLiked(newLiked);
//     setLikesCount(newCount);
//     setAnimating(true);
//     setTimeout(() => setAnimating(false), 350);

//     try {
//       await fetchData(`/api/posts/${post._id}/like`, {
//         method: "POST",
//         credentials: "include",
//       });
//       onLikeUpdate?.(post._id, user?._id ?? user?.id, newLiked, newCount); // ← add this line
//     } catch (err) {
//       setLiked(wasLiked);
//       setLikesCount(wasLiked ? likesCount : likesCount);
//       console.error("Like error:", err);
//     } finally {
//       setLikeLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#0a0a0a] max-w-[470px] mx-auto overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center gap-2.5 px-3.5 py-2.5">
//         <div
//           onClick={() => navigate(`/profile/${post.user.username}`)}
//           className="flex items-center gap-2.5 cursor-pointer min-w-0"
//         >
//           {post.user.profilePicture ? (
//             <img
//               src={post.user.profilePicture}
//               alt=""
//               className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0"
//             />
//           ) : (
//             <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//               {post.user.username?.charAt(0).toUpperCase()}
//             </div>
//           )}
//           <span className="font-semibold text-[13.5px] text-neutral-100 tracking-wide truncate">
//             {post.user.username}
//           </span>
//         </div>

//         <div className="flex-1" />

//         {!isOwner && (
//           <div ref={optionsRef} className="relative flex-shrink-0">
//             <button
//               onClick={() => {
//                 if (window.innerWidth < 768) setShowMobileOptions(true);
//                 else setShowDesktopOptions((v) => !v);
//               }}
//               className="p-1.5 rounded-full bg-transparent border-none cursor-pointer transition-all duration-150 hover:bg-white/8 active:scale-90"
//             >
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="rgba(255,255,255,0.4)"
//                 strokeWidth="2"
//               >
//                 <circle cx="5" cy="12" r="1" />
//                 <circle cx="12" cy="12" r="1" />
//                 <circle cx="19" cy="12" r="1" />
//               </svg>
//             </button>
//             {showDesktopOptions && (
//               <PostOptionsPopup
//                 post={post}
//                 isOwner={isOwner}
//                 onClose={() => setShowDesktopOptions(false)}
//                 onHide={(postId) => setHidden(true)} // ← add this line
//                 anchorRef={optionsRef}
//               />
//             )}
//           </div>
//         )}
//       </div>

//       {/* Image — double tap to like on mobile */}
//       <div className="relative">
//         <img
//           onClick={handleImageClick}
//           onDoubleClick={!liked ? handleLike : undefined}
//           src={post.imageUrl}
//           alt=""
//           className="w-full max-h-[950px] object-cover block md:cursor-pointer"
//         />
//       </div>

//       {/* Actions */}
//       <div className="px-3.5 pt-2.5 pb-4">
//         <div className="flex items-center gap-1 mb-2">
//           {/* Like button */}
//           <button
//             onClick={handleLike}
//             disabled={likeLoading}
//             className="p-1.5 rounded-full bg-transparent border-none cursor-pointer disabled:cursor-default"
//             style={{
//               transform: animating ? "scale(1.3)" : "scale(1)",
//               transition: "transform 0.2s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
//             }}
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill={liked ? "#ef4444" : "none"}
//               stroke={liked ? "#ef4444" : "rgba(255,255,255,0.85)"}
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               style={{ transition: "fill 0.2s ease, stroke 0.2s ease" }}
//             >
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//             </svg>
//           </button>

//           {/* Comment */}
//           <button
//             onClick={() => {
//               if (window.innerWidth < 768) setShowMobileComments(true);
//               else setSelectedPost(post);
//             }}
//             className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.85)"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a9.954 9.954 0 0 1-1.515 5.31L22 22l-4.69-1.515A9.954 9.954 0 0 1 12 22z" />
//             </svg>
//           </button>

//           {/* Share — mobile only */}
//           <button
//             onClick={async () => {
//               if (navigator.share) {
//                 try {
//                   await navigator.share({
//                     title: `${post.user.username}'s post`,
//                     text: post.caption || "Check out this post",
//                     url: `${window.location.origin}/post/${post._id}`,
//                   });
//                 } catch (err) {}
//               }
//             }}
//             className="md:hidden p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer ml-auto"
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.85)"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <line x1="22" y1="2" x2="11" y2="13" />
//               <polygon points="22 2 15 22 11 13 2 9 22 2" />
//             </svg>
//           </button>
//         </div>

//         <p className="text-[13.5px] font-semibold text-neutral-100 mb-1 tracking-wide">
//           {likesCount.toLocaleString()} {likesCount === 1 ? "like" : "likes"}
//         </p>

//         {post.caption && (
//           <p className="text-[13.5px] leading-relaxed text-white/75 mb-1.5">
//             <span className="font-semibold text-neutral-100 mr-1.5">
//               {post.user.username}
//             </span>
//             {post.caption}
//           </p>
//         )}

//         <p
//           onClick={() => {
//             if (window.innerWidth < 768) setShowMobileComments(true);
//             else setSelectedPost(post);
//           }}
//           className="text-[13px] text-white/35 cursor-pointer mb-2 tracking-wide"
//         >
//           View all {commentsCount} comments
//         </p>

//         <p className="text-[11px] text-white/25 mb-2.5 uppercase tracking-widest">
//           {new Date(post.createdAt).toLocaleDateString("en-US", {
//             month: "long",
//             day: "numeric",
//           })}
//         </p>
//       </div>

//       {selectedPost && (
//         <PostModal
//           post={{
//             ...selectedPost,
//             likesCount,
//             likes: liked
//               ? [...(selectedPost.likes || []), user?._id]
//               : (selectedPost.likes || []).filter(
//                   (id) => String(id) !== String(user?._id),
//                 ),
//           }}
//           onClose={() => setSelectedPost(null)}
//           onDelete={onDelete}
//           onCommentAdded={() => setCommentsCount((c) => c + 1)}
//           onCommentDeleted={() => setCommentsCount((c) => Math.max(0, c - 1))}
//         />
//       )}
//       {showMobileComments && (
//         <CommentsBottomSheet
//           post={post}
//           onClose={() => setShowMobileComments(false)}
//           onCommentAdded={() => setCommentsCount((c) => c + 1)}
//           onCommentDeleted={() => setCommentsCount((c) => Math.max(0, c - 1))}
//         />
//       )}
//       {showMobileOptions && (
//         <PostOptionsSheet
//           post={post}
//           isOwner={isOwner}
//           onClose={() => setShowMobileOptions(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default PostCard;

// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import PostModal from "./PostModal";
// import CommentsBottomSheet from "./CommentsBottomSheet";
// import PostOptionsSheet from "./PostOptionsSheet";
// import PostOptionsPopup from "./PostOptionsPopup";
// import { useAuth } from "../hooks/useAuth";
// import fetchData from "../utils/fetchData";

// function PostCard({ post, onDelete, onLikeUpdate }) {
//   const { user } = useAuth();
//   const isOwner = String(user?._id) === String(post.user?._id);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [showMobileComments, setShowMobileComments] = useState(false);
//   const [showMobileOptions, setShowMobileOptions] = useState(false);
//   const [showDesktopOptions, setShowDesktopOptions] = useState(false);
//   const optionsRef = useRef(null);
//   const navigate = useNavigate();

//   const [hidden, setHidden] = useState(false);
//   const [commentsCount, setCommentsCount] = useState(post.commentsCount ?? 0);

//   // ── LIKE STATE ──────────────────────────────────────────────
//   const [liked, setLiked] = useState(() =>
//     post.likes?.some((id) => String(id) === String(user?.id ?? user?._id)),
//   );
//   const [likesCount, setLikesCount] = useState(post.likesCount ?? 0);
//   const [likeLoading, setLikeLoading] = useState(false);
//   const [animating, setAnimating] = useState(false);
//   // ────────────────────────────────────────────────────────────

//   // Hide post from feed (not interested)
//   if (hidden) return null;

//   const handleImageClick = () => {
//     if (window.innerWidth >= 768) setSelectedPost(post);
//   };

//   const handleLike = async () => {
//     if (likeLoading) return;
//     setLikeLoading(true);

//     const wasLiked = liked;
//     const newLiked = !wasLiked;
//     const newCount = wasLiked ? likesCount - 1 : likesCount + 1;

//     setLiked(newLiked);
//     setLikesCount(newCount);
//     setAnimating(true);
//     setTimeout(() => setAnimating(false), 350);

//     try {
//       await fetchData(`/api/posts/${post._id}/like`, {
//         method: "POST",
//         credentials: "include",
//       });
//       onLikeUpdate?.(post._id, user?._id ?? user?.id, newLiked, newCount);
//     } catch (err) {
//       setLiked(wasLiked);
//       setLikesCount(wasLiked ? likesCount : likesCount);
//       console.error("Like error:", err);
//     } finally {
//       setLikeLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#0a0a0a] max-w-[470px] mx-auto overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center gap-2.5 px-3.5 py-2.5">
//         <div
//           onClick={() => navigate(`/profile/${post.user.username}`)}
//           className="flex items-center gap-2.5 cursor-pointer min-w-0"
//         >
//           {post.user.profilePicture ? (
//             <img
//               src={post.user.profilePicture}
//               alt=""
//               className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0"
//             />
//           ) : (
//             <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//               {post.user.username?.charAt(0).toUpperCase()}
//             </div>
//           )}
//           <span className="font-semibold text-[13.5px] text-neutral-100 tracking-wide truncate">
//             {post.user.username}
//           </span>
//         </div>

//         <div className="flex-1" />

//         {/* Options button — shown for both owner and non-owner but renders different menus */}
//         <div ref={optionsRef} className="relative flex-shrink-0">
//           <button
//             onClick={() => {
//               if (window.innerWidth < 768) setShowMobileOptions(true);
//               else setShowDesktopOptions((v) => !v);
//             }}
//             className="p-1.5 rounded-full bg-transparent border-none cursor-pointer transition-all duration-150 hover:bg-white/8 active:scale-90"
//           >
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.4)"
//               strokeWidth="2"
//             >
//               <circle cx="5" cy="12" r="1" />
//               <circle cx="12" cy="12" r="1" />
//               <circle cx="19" cy="12" r="1" />
//             </svg>
//           </button>

//           {showDesktopOptions && (
//             <PostOptionsPopup
//               post={post}
//               isOwner={isOwner}
//               onClose={() => setShowDesktopOptions(false)}
//               onHide={() => setHidden(true)}
//               anchorRef={optionsRef}
//             />
//           )}
//         </div>
//       </div>

//       {/* Image — double tap to like on mobile */}
//       <div className="relative">
//         <img
//           onClick={handleImageClick}
//           onDoubleClick={!liked ? handleLike : undefined}
//           src={post.imageUrl}
//           alt=""
//           className="w-full max-h-[950px] object-cover block md:cursor-pointer"
//         />
//       </div>

//       {/* Actions */}
//       <div className="px-3.5 pt-2.5 pb-4">
//         <div className="flex items-center gap-1 mb-2">
//           {/* Like button */}
//           <button
//             onClick={handleLike}
//             disabled={likeLoading}
//             className="p-1.5 rounded-full bg-transparent border-none cursor-pointer disabled:cursor-default"
//             style={{
//               transform: animating ? "scale(1.3)" : "scale(1)",
//               transition: "transform 0.2s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
//             }}
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill={liked ? "#ef4444" : "none"}
//               stroke={liked ? "#ef4444" : "rgba(255,255,255,0.85)"}
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               style={{ transition: "fill 0.2s ease, stroke 0.2s ease" }}
//             >
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//             </svg>
//           </button>

//           {/* Comment */}
//           <button
//             onClick={() => {
//               if (window.innerWidth < 768) setShowMobileComments(true);
//               else setSelectedPost(post);
//             }}
//             className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.85)"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a9.954 9.954 0 0 1-1.515 5.31L22 22l-4.69-1.515A9.954 9.954 0 0 1 12 22z" />
//             </svg>
//           </button>

//           {/* Share — mobile only */}
//           <button
//             onClick={async () => {
//               if (navigator.share) {
//                 try {
//                   await navigator.share({
//                     title: `${post.user.username}'s post`,
//                     text: post.caption || "Check out this post",
//                     url: `${window.location.origin}/post/${post._id}`,
//                   });
//                 } catch (err) {}
//               }
//             }}
//             className="md:hidden p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer ml-auto"
//           >
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.85)"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <line x1="22" y1="2" x2="11" y2="13" />
//               <polygon points="22 2 15 22 11 13 2 9 22 2" />
//             </svg>
//           </button>
//         </div>

//         <p className="text-[13.5px] font-semibold text-neutral-100 mb-1 tracking-wide">
//           {likesCount.toLocaleString()} {likesCount === 1 ? "like" : "likes"}
//         </p>

//         {post.caption && (
//           <p className="text-[13.5px] leading-relaxed text-white/75 mb-1.5">
//             <span className="font-semibold text-neutral-100 mr-1.5">
//               {post.user.username}
//             </span>
//             {post.caption}
//           </p>
//         )}

//         <p
//           onClick={() => {
//             if (window.innerWidth < 768) setShowMobileComments(true);
//             else setSelectedPost(post);
//           }}
//           className="text-[13px] text-white/35 cursor-pointer mb-2 tracking-wide"
//         >
//           View all {commentsCount} comments
//         </p>

//         <p className="text-[11px] text-white/25 mb-2.5 uppercase tracking-widest">
//           {new Date(post.createdAt).toLocaleDateString("en-US", {
//             month: "long",
//             day: "numeric",
//           })}
//         </p>
//       </div>

//       {selectedPost && (
//         <PostModal
//           post={{
//             ...selectedPost,
//             likesCount,
//             likes: liked
//               ? [...(selectedPost.likes || []), user?._id]
//               : (selectedPost.likes || []).filter(
//                   (id) => String(id) !== String(user?._id),
//                 ),
//           }}
//           onClose={() => setSelectedPost(null)}
//           onDelete={onDelete}
//           onCommentAdded={() => setCommentsCount((c) => c + 1)}
//           onCommentDeleted={() => setCommentsCount((c) => Math.max(0, c - 1))}
//         />
//       )}

//       {showMobileComments && (
//         <CommentsBottomSheet
//           post={post}
//           onClose={() => setShowMobileComments(false)}
//           onCommentAdded={() => setCommentsCount((c) => c + 1)}
//           onCommentDeleted={() => setCommentsCount((c) => Math.max(0, c - 1))}
//         />
//       )}

//       {showMobileOptions && (
//         <PostOptionsSheet
//           post={post}
//           isOwner={isOwner}
//           onClose={() => setShowMobileOptions(false)}
//           onHide={() => setHidden(true)}
//         />
//       )}
//     </div>
//   );
// }

// export default PostCard;

import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import PostModal from "./PostModal";
import CommentsBottomSheet from "./CommentsBottomSheet";
import PostOptionsSheet from "./PostOptionsSheet";
import PostOptionsPopup from "./PostOptionsPopup";
import { useAuth } from "../hooks/useAuth";
import fetchData from "../utils/fetchData";

function PostCard({ post, onDelete, onLikeUpdate }) {
  const { user } = useAuth();
  const isOwner = String(user?._id) === String(post.user?._id);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showMobileComments, setShowMobileComments] = useState(false);
  const [showMobileOptions, setShowMobileOptions] = useState(false);
  const [showDesktopOptions, setShowDesktopOptions] = useState(false);
  const optionsRef = useRef(null);
  const navigate = useNavigate();

  const [hidden, setHidden] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount ?? 0);

  const [liked, setLiked] = useState(() =>
    post.likes?.some((id) => String(id) === String(user?.id ?? user?._id)),
  );
  const [likesCount, setLikesCount] = useState(post.likesCount ?? 0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [animating, setAnimating] = useState(false);

  if (hidden) return null;

  const handleImageClick = () => {
    if (window.innerWidth >= 768) setSelectedPost(post);
  };

  const handleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);

    const wasLiked = liked;
    const newLiked = !wasLiked;
    const newCount = wasLiked ? likesCount - 1 : likesCount + 1;

    setLiked(newLiked);
    setLikesCount(newCount);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 350);

    try {
      await fetchData(`/api/posts/${post._id}/like`, {
        method: "POST",
        credentials: "include",
      });
      onLikeUpdate?.(post._id, user?._id ?? user?.id, newLiked, newCount);
    } catch (err) {
      setLiked(wasLiked);
      setLikesCount(wasLiked ? likesCount : likesCount);
      console.error("Like error:", err);
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <>
      {/*
       * Removed overflow-hidden from this wrapper.
       * overflow-hidden creates a stacking context that can trap
       * position:fixed children (CommentsBottomSheet, PostOptionsSheet)
       * on certain Android/iOS browsers, clipping or misplacing them.
       * The card has no content that actually needs overflow clipping.
       */}
      <div className="bg-[#0a0a0a] max-w-[470px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5">
          <div
            onClick={() => navigate(`/profile/${post.user.username}`)}
            className="flex items-center gap-2.5 cursor-pointer min-w-0"
          >
            {post.user.profilePicture ? (
              <img
                src={post.user.profilePicture}
                alt=""
                className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {post.user.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="font-semibold text-[13.5px] text-neutral-100 tracking-wide truncate">
              {post.user.username}
            </span>
          </div>

          <div className="flex-1" />

          <div ref={optionsRef} className="relative flex-shrink-0">
            <button
              onClick={() => {
                if (window.innerWidth < 768) setShowMobileOptions(true);
                else setShowDesktopOptions((v) => !v);
              }}
              className="p-1.5 rounded-full bg-transparent border-none cursor-pointer transition-all duration-150 hover:bg-white/8 active:scale-90"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              >
                <circle cx="5" cy="12" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
              </svg>
            </button>

            {showDesktopOptions && (
              <PostOptionsPopup
                post={post}
                isOwner={isOwner}
                onClose={() => setShowDesktopOptions(false)}
                onHide={() => setHidden(true)}
                anchorRef={optionsRef}
              />
            )}
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <img
            onClick={handleImageClick}
            onDoubleClick={!liked ? handleLike : undefined}
            src={post.imageUrl}
            alt=""
            className="w-full max-h-[950px] object-cover block md:cursor-pointer"
          />
        </div>

        {/* Actions */}
        <div className="px-3.5 pt-2.5 pb-4">
          <div className="flex items-center gap-1 mb-2">
            {/* Like */}
            <button
              onClick={handleLike}
              disabled={likeLoading}
              className="p-1.5 rounded-full bg-transparent border-none cursor-pointer disabled:cursor-default"
              style={{
                transform: animating ? "scale(1.3)" : "scale(1)",
                transition:
                  "transform 0.2s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill={liked ? "#ef4444" : "none"}
                stroke={liked ? "#ef4444" : "rgba(255,255,255,0.85)"}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "fill 0.2s ease, stroke 0.2s ease" }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Comment */}
            <button
              onClick={() => {
                if (window.innerWidth < 768) setShowMobileComments(true);
                else setSelectedPost(post);
              }}
              className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a9.954 9.954 0 0 1-1.515 5.31L22 22l-4.69-1.515A9.954 9.954 0 0 1 12 22z" />
              </svg>
            </button>

            {/* Share — mobile only */}
            <button
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: `${post.user.username}'s post`,
                      text: post.caption || "Check out this post",
                      url: `${window.location.origin}/post/${post._id}`,
                    });
                  } catch (err) {}
                }
              }}
              className="md:hidden p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer ml-auto"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          <p className="text-[13.5px] font-semibold text-neutral-100 mb-1 tracking-wide">
            {likesCount.toLocaleString()} {likesCount === 1 ? "like" : "likes"}
          </p>

          {post.caption && (
            <p className="text-[13.5px] leading-relaxed text-white/75 mb-1.5">
              <span className="font-semibold text-neutral-100 mr-1.5">
                {post.user.username}
              </span>
              {post.caption}
            </p>
          )}

          <p
            onClick={() => {
              if (window.innerWidth < 768) setShowMobileComments(true);
              else setSelectedPost(post);
            }}
            className="text-[13px] text-white/35 cursor-pointer mb-2 tracking-wide"
          >
            View all {commentsCount} comments
          </p>

          <p className="text-[11px] text-white/25 mb-2.5 uppercase tracking-widest">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* PostModal — manages its own positioning, no portal needed */}
      {selectedPost && (
        <PostModal
          post={{
            ...selectedPost,
            likesCount,
            likes: liked
              ? [...(selectedPost.likes || []), user?._id]
              : (selectedPost.likes || []).filter(
                  (id) => String(id) !== String(user?._id),
                ),
          }}
          onClose={() => setSelectedPost(null)}
          onDelete={onDelete}
          onCommentAdded={() => setCommentsCount((c) => c + 1)}
          onCommentDeleted={() => setCommentsCount((c) => Math.max(0, c - 1))}
        />
      )}

      {/*
       * Portal to document.body — keeps CommentsBottomSheet completely outside
       * any parent stacking context. Without this, ancestors with
       * overflow:hidden, transform, or will-change can trap position:fixed
       * children on Android/iOS, clipping or misplacing the sheet.
       */}
      {showMobileComments &&
        createPortal(
          <CommentsBottomSheet
            post={post}
            onClose={() => setShowMobileComments(false)}
            onCommentAdded={() => setCommentsCount((c) => c + 1)}
            onCommentDeleted={() => setCommentsCount((c) => Math.max(0, c - 1))}
          />,
          document.body,
        )}

      {/* Same portal treatment for PostOptionsSheet */}
      {showMobileOptions &&
        createPortal(
          <PostOptionsSheet
            post={post}
            isOwner={isOwner}
            onClose={() => setShowMobileOptions(false)}
            onHide={() => setHidden(true)} // ← make sure this is there
          />,
          document.body,
        )}
    </>
  );
}

export default PostCard;