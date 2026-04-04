

// function ProfileView() {
//   const { user: authUser, setUser } = useAuth();
//   const { username } = useParams();
//   const navigate = useNavigate();

//   const [open, setOpen] = useState(false);
//   const [listOpen, setListOpen] = useState(false);
//   const [listType, setListType] = useState(null);
//   const fileInputRef = useRef(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [user, setProfileUser] = useState(null);
//   const [visible, setVisible] = useState(false);
//   const [messagingLoading, setMessagingLoading] = useState(false);
//   const [followLoading, setFollowLoading] = useState(false);
//   const [createOpen, setCreateOpen] = useState(false);
//   const [isBlocked, setIsBlocked] = useState(false);
//   const [showBlockConfirm, setShowBlockConfirm] = useState(false);
//   const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
//   const [showCancelRequestConfirm, setShowCancelRequestConfirm] =
//     useState(false);
//   const [followStatus, setFollowStatus] = useState("not_following");
//   const [notFound, setNotFound] = useState(false);
//   const [imgError, setImgError] = useState(false);

//   // Fetch profile — no artificial delay, cancellable on cleanup
//   useEffect(() => {
//     if (!username && !authUser) return;
//     setVisible(false);
//     setLoadingProfile(true);
//     setNotFound(false);
//     setImgError(false);

//     let cancelled = false;

//     (async () => {
//       try {
//         const targetUsername = username || authUser?.username;
//         if (!targetUsername) {
//           setProfileUser(null);
//           return;
//         }
//         const res = await fetchData(`/api/users/profile/${targetUsername}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (cancelled) return;
//         setProfileUser(data);
//         setFollowStatus(data.followStatus ?? "not_following");
//         setIsBlocked(data.isBlocked ?? false);
//       } catch (err) {
//         if (cancelled) return;
//         if (err.status === 404) setNotFound(true);
//         setProfileUser(null);
//       } finally {
//         if (!cancelled) setLoadingProfile(false);
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [username, authUser]);

//   // Fade in once data is ready — single effect, no double rAF
//   useEffect(() => {
//     if (!loadingProfile && user) {
//       setVisible(true);
//     } else {
//       setVisible(false);
//     }
//   }, [loadingProfile, user]);

//   const isMe = user?._id === authUser?._id;
//   const isFollowing = followStatus === "following";
//   const isRequested = followStatus === "requested";
//   const canViewList = isMe || isFollowing;

//   const handleFollowUser = async () => {
//     if (!user?._id || followLoading) return;
//     try {
//       setFollowLoading(true);
//       const res = await fetchData(`/api/users/${user._id}/follow`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();
//       setFollowStatus(data.followStatus ?? "requested");
//     } catch (err) {
//       console.error("Follow error:", err);
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   const handleCancelRequest = async () => {
//     if (!user?._id || followLoading) return;
//     try {
//       setFollowLoading(true);
//       await fetchData(`/api/users/${user._id}/follow-request`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       setFollowStatus("not_following");
//     } catch (err) {
//       console.error("Cancel request error:", err);
//     } finally {
//       setFollowLoading(false);
//       setShowCancelRequestConfirm(false);
//     }
//   };

//   const handleUnfollowUser = async () => {
//     if (!user?._id || !isFollowing || followLoading) return;
//     try {
//       setFollowLoading(true);
//       await fetchData(`/api/users/${user._id}/unfollow`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       setFollowStatus("not_following");
//       setProfileUser((prev) => ({
//         ...prev,
//         followersCount: Math.max(0, (prev.followersCount ?? 1) - 1),
//       }));
//     } catch (err) {
//       console.error("Unfollow error:", err);
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   const handleBlockUser = async () => {
//     try {
//       setFollowLoading(true);
//       await fetchData(`/api/users/${user._id}/block`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });
//       setIsBlocked(true);
//       setFollowStatus("not_following");
//       if (isFollowing) {
//         setProfileUser((prev) => ({
//           ...prev,
//           followersCount: Math.max(0, (prev.followersCount ?? 1) - 1),
//         }));
//       }
//     } catch (err) {
//       console.error("Block error:", err);
//     } finally {
//       setFollowLoading(false);
//       setShowBlockConfirm(false);
//     }
//   };

//   const handleUnblockUser = async () => {
//     try {
//       setFollowLoading(true);
//       await fetchData(`/api/users/${user._id}/block`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       window.location.reload();
//     } catch (err) {
//       console.error("Unblock error:", err);
//       setFollowLoading(false);
//       setShowUnblockConfirm(false);
//     }
//   };

//   const handleUploadClick = () => fileInputRef.current?.click();

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/"))
//       return alert("Please upload an image file");
//     if (file.size > 5 * 1024 * 1024) return alert("Image must be under 5MB");
//     try {
//       const formData = new FormData();
//       formData.append("profilePicture", file);
//       const res = await fetchData("/api/upload/profile-picture", {
//         method: "PUT",
//         credentials: "include",
//         body: formData,
//       });
//       if (!res.ok) throw new Error("Upload failed");
//       const updatedUser = await res.json();
//       setUser(updatedUser);
//       setImgError(false);
//       setOpen(false);
//     } catch (err) {
//       console.error("Profile picture upload failed", err);
//       alert("Failed to upload profile picture");
//     } finally {
//       e.target.value = "";
//     }
//   };

//   const handleRemovePhoto = async () => {
//     try {
//       const res = await fetchData("/api/upload/profile-picture", {
//         method: "DELETE",
//         credentials: "include",
//       });
//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err?.error || "Failed to remove photo");
//       }
//       window.location.reload();
//       setOpen(false);
//     } catch (err) {
//       alert(err.message || "Something went wrong");
//     }
//   };

//   if (loadingProfile) return <ProfileSkeleton />;

//   if (notFound) {
//     return (
//       <div className="bg-black text-white h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex flex-col items-center justify-center gap-4">
//         <svg
//           width="48"
//           height="48"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="text-white/20"
//         >
//           <circle cx="12" cy="8" r="4" />
//           <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
//           <line x1="18" y1="6" x2="22" y2="10" />
//           <line x1="22" y1="6" x2="18" y2="10" />
//         </svg>
//         <p className="text-white/50 text-[15px] font-medium">
//           This account is no longer available
//         </p>
//         <p className="text-white/25 text-[13px]">
//           It may have been removed or deactivated.
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-2 px-5 py-2 text-[13px] font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150"
//         >
//           Go back
//         </button>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="bg-black text-white h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex flex-col items-center justify-center gap-4">
//         <p className="text-white/40 text-[14px]">Something went wrong.</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-5 py-2 text-[13px] font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150"
//         >
//           Try again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* ── Scrollable page content ── */}
//       <div
//         className="bg-black text-white overflow-y-auto h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex justify-center"
//         style={{
//           opacity: visible ? 1 : 0,
//           transform: visible ? "translateY(0)" : "translateY(8px)",
//           transition: "opacity 0.2s ease, transform 0.2s ease",
//         }}
//       >
//         <div className="w-full max-w-[935px] px-4 pt-8 pb-10">
//           {/* BACK / HOME */}
//           <div className="mb-5 flex items-center gap-1">
//             {!isMe && (
//               <button
//                 onClick={() => navigate(-1)}
//                 className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
//               >
//                 <span className="text-base leading-none">←</span>
//                 <span className="hidden sm:inline tracking-wide">Back</span>
//               </button>
//             )}
//             <button
//               onClick={() => navigate("/")}
//               className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
//             >
//               <Home size={18} />
//               <span className="hidden sm:inline tracking-wide">Home</span>
//             </button>
//           </div>

//           {/* PROFILE HEADER */}
//           <div className="flex flex-col sm:flex-row sm:items-start gap-7 sm:gap-14 mb-8">
//             {/* AVATAR */}
//             <div
//               onClick={isMe ? () => setOpen(true) : undefined}
//               className={`flex justify-center sm:justify-start ${isMe ? "cursor-pointer" : ""}`}
//             >
//               <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center ring-[3px] ring-white/10 transition-opacity duration-200 hover:opacity-90">
//                 {user?.profilePicture && !imgError ? (
//                   <img
//                     src={user.profilePicture}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                     onError={() => setImgError(true)}
//                   />
//                 ) : (
//                   <span className="text-3xl sm:text-4xl font-semibold text-white flex items-center justify-center">
//                     {user?.username?.[0]?.toUpperCase() || "U"}
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* RIGHT CONTENT */}
//             <div className="flex flex-col gap-5 w-full max-w-xl">
//               {/* STATS */}
//               <div className="flex justify-around sm:justify-start gap-0 sm:gap-10">
//                 <div className="text-center sm:text-left">
//                   <p className="text-[15px] font-bold text-white">
//                     {isBlocked ? "—" : (user?.postsCount ?? 0)}
//                   </p>
//                   <p className="text-xs text-white/45 mt-0.5 tracking-wide">
//                     posts
//                   </p>
//                 </div>
//                 <div
//                   className={`text-center sm:text-left ${canViewList && !isBlocked ? "cursor-pointer group" : "cursor-default"}`}
//                   onClick={() => {
//                     if (!canViewList || isBlocked) return;
//                     setListType("followers");
//                     setListOpen(true);
//                   }}
//                 >
//                   <p className="text-[15px] font-bold text-white group-hover:text-white/80 transition-colors">
//                     {isBlocked ? "—" : (user?.followersCount ?? 0)}
//                   </p>
//                   <p className="text-xs text-white/45 mt-0.5 tracking-wide">
//                     followers
//                   </p>
//                 </div>
//                 <div
//                   className={`text-center sm:text-left ${canViewList && !isBlocked ? "cursor-pointer group" : "cursor-default"}`}
//                   onClick={() => {
//                     if (!canViewList || isBlocked) return;
//                     setListType("following");
//                     setListOpen(true);
//                   }}
//                 >
//                   <p className="text-[15px] font-bold text-white group-hover:text-white/80 transition-colors">
//                     {isBlocked ? "—" : (user?.followingCount ?? 0)}
//                   </p>
//                   <p className="text-xs text-white/45 mt-0.5 tracking-wide">
//                     following
//                   </p>
//                 </div>
//               </div>

//               {/* USERNAME + BIO */}
//               <div className="space-y-1.5">
//                 <span
//                   className={`text-[15px] tracking-tight transition-all duration-200 ${isMe ? "font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" : "font-black text-white"}`}
//                 >
//                   {isMe ? `@${user?.username}` : user.username}
//                 </span>
//                 {user?.fullName && (
//                   <p className="text-[13px] text-white/50 font-normal tracking-wide">
//                     {user.fullName}
//                   </p>
//                 )}
//                 {(isMe || isFollowing) && (
//                   <p className="text-[13px] text-white/60 leading-relaxed">
//                     {user?.bio || "Welcome to my profile ✨"}
//                   </p>
//                 )}
//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="flex gap-2.5 items-center">
//                 {isMe ? (
//                   <>
//                     <button
//                       onClick={() => setCreateOpen(true)}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 tracking-wide"
//                     >
//                       Create post
//                     </button>
//                     <button
//                       onClick={() => navigate("/edit-profile")}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 hover:bg-white/8 active:scale-95 transition-all duration-150 tracking-wide text-white/80 hover:text-white"
//                     >
//                       Edit profile
//                     </button>
//                   </>
//                 ) : isBlocked ? (
//                   <button
//                     onClick={() => setShowUnblockConfirm(true)}
//                     disabled={followLoading}
//                     className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {followLoading ? <Spinner /> : "Unblock"}
//                   </button>
//                 ) : isFollowing ? (
//                   <>
//                     <button
//                       onClick={handleUnfollowUser}
//                       disabled={followLoading}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 text-white/80 hover:bg-white/8 hover:text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {followLoading ? <Spinner /> : "Unfollow"}
//                     </button>
//                     <button
//                       onClick={async () => {
//                         try {
//                           setMessagingLoading(true);
//                           const res = await fetchData(
//                             `/api/chat/start/${user._id}`,
//                             { method: "POST", credentials: "include" },
//                           );
//                           const data = await res.json();
//                           navigate(`/chat?conversation=${data._id}`);
//                         } catch (err) {
//                           console.error(err);
//                         } finally {
//                           setMessagingLoading(false);
//                         }
//                       }}
//                       disabled={messagingLoading}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 text-white/80 hover:bg-white/8 hover:text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {messagingLoading ? (
//                         <>
//                           <Spinner />
//                           <span>Opening...</span>
//                         </>
//                       ) : (
//                         "Message"
//                       )}
//                     </button>
//                     <ThreeDotsMenu
//                       isBlocked={isBlocked}
//                       onBlock={() => setShowBlockConfirm(true)}
//                       onUnblock={() => setShowUnblockConfirm(true)}
//                     />
//                   </>
//                 ) : isRequested ? (
//                   <>
//                     <button
//                       onClick={() => setShowCancelRequestConfirm(true)}
//                       disabled={followLoading}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 text-white/60 hover:text-red-400 hover:border-red-400/40 active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {followLoading ? <Spinner /> : "Requested"}
//                     </button>
//                     <ThreeDotsMenu
//                       isBlocked={isBlocked}
//                       onBlock={() => setShowBlockConfirm(true)}
//                       onUnblock={() => setShowUnblockConfirm(true)}
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={handleFollowUser}
//                       disabled={followLoading}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {followLoading ? <Spinner /> : "Follow"}
//                     </button>
//                     <ThreeDotsMenu
//                       isBlocked={isBlocked}
//                       onBlock={() => setShowBlockConfirm(true)}
//                       onUnblock={() => setShowUnblockConfirm(true)}
//                     />
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-white/10" />

//           {/* POSTS */}
//           {isBlocked ? (
//             <div className="mt-16 flex flex-col items-center justify-center gap-3 text-white/30">
//               <svg
//                 width="40"
//                 height="40"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="opacity-40"
//               >
//                 <circle cx="12" cy="12" r="10" />
//                 <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//               </svg>
//               <p className="text-sm tracking-wide">No Posts</p>
//               <p className="text-xs text-white/20">
//                 You have blocked this user.
//               </p>
//             </div>
//           ) : !isMe && !isFollowing ? (
//             <div className="mt-16 flex flex-col items-center justify-center gap-3 text-white/30">
//               <svg
//                 width="36"
//                 height="36"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="opacity-40"
//               >
//                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//                 <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//               </svg>
//               <p className="text-sm tracking-wide">This account is private</p>
//               <p className="text-xs text-white/20">
//                 {isRequested
//                   ? "Follow request sent. Wait for approval to see their posts."
//                   : "Follow this account to see their posts."}
//               </p>
//             </div>
//           ) : (
//             <ProfilePosts userId={user?._id} />
//           )}
//         </div>
//       </div>

//       {/* ── Modals — outside scrollable div so fixed positioning works ── */}
//       <ProfilePhotoModal
//         open={open}
//         onClose={() => setOpen(false)}
//         onUpload={handleUploadClick}
//         onRemove={handleRemovePhoto}
//       />
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={handleFileChange}
//       />
//       <CreatePostModal open={createOpen} onClose={() => setCreateOpen(false)} />
//       <FollowersFollowingModal
//         open={listOpen}
//         onClose={() => setListOpen(false)}
//         title={listType === "followers" ? "Followers" : "Following"}
//         userId={user?._id}
//         type={listType}
//         loggedInUser={authUser}
//         onMessage={async (u) => {
//           setListOpen(false);
//           const res = await fetchData(`/api/chat/start/${u._id}`, {
//             method: "POST",
//             credentials: "include",
//           });
//           const data = await res.json();
//           navigate(`/chat?conversation=${data._id}`);
//         }}
//       />

//       {showBlockConfirm && (
//         <ConfirmModal
//           title={`Block @${user?.username}?`}
//           description="They won't be able to see your posts or find your profile."
//           confirmLabel="Block"
//           confirmClass="text-red-400"
//           onConfirm={handleBlockUser}
//           onCancel={() => setShowBlockConfirm(false)}
//         />
//       )}
//       {showUnblockConfirm && (
//         <ConfirmModal
//           title={`Unblock @${user?.username}?`}
//           description="They will be able to see your posts and find your profile again."
//           confirmLabel="Unblock"
//           confirmClass="text-indigo-400"
//           onConfirm={handleUnblockUser}
//           onCancel={() => setShowUnblockConfirm(false)}
//         />
//       )}
//       {showCancelRequestConfirm && (
//         <ConfirmModal
//           title="Cancel request?"
//           description={`Withdraw your follow request to @${user?.username}.`}
//           confirmLabel="Cancel request"
//           confirmClass="text-red-400"
//           onConfirm={handleCancelRequest}
//           onCancel={() => setShowCancelRequestConfirm(false)}
//         />
//       )}
//     </>
//   );
// }

// export default ProfileView;

// import { useAuth } from "../../hooks/useAuth";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ProfilePhotoModal from "../ProfilePhotoModal";
// import FollowersFollowingModal from "../FollowersFollowingModal";
// import CreatePostModal from "../CreatePostModal";
// import ProfilePosts from "../ProfilePosts";
// import fetchData from "../../utils/fetchData";
// import { useParams } from "react-router-dom";
// import ProfileSkeleton from "../ProfileSkeleton";
// import { Home, MoreHorizontal } from "lucide-react";

// const Spinner = () => (
//   <svg
//     className="animate-spin h-3.5 w-3.5 text-white"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//   >
//     <circle
//       className="opacity-25"
//       cx="12"
//       cy="12"
//       r="10"
//       stroke="currentColor"
//       strokeWidth="4"
//     />
//     <path
//       className="opacity-75"
//       fill="currentColor"
//       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//     />
//   </svg>
// );

// function ThreeDotsMenu({ onBlock, isBlocked, onUnblock }) {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target))
//         setOpen(false);
//     };
//     if (open) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [open]);

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         onClick={() => setOpen((prev) => !prev)}
//         className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-white/70 hover:text-white hover:bg-white/8 active:scale-95 transition-all duration-150"
//         aria-label="More options"
//       >
//         <MoreHorizontal size={18} />
//       </button>
//       <div
//         className="absolute right-0 mt-2 w-44 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
//         style={{
//           opacity: open ? 1 : 0,
//           transform: open ? "translateY(0)" : "translateY(-6px)",
//           pointerEvents: open ? "auto" : "none",
//           transition: "opacity 0.1s ease, transform 0.1s ease",
//         }}
//       >
//         {isBlocked ? (
//           <button
//             onClick={() => {
//               onUnblock();
//               setOpen(false);
//             }}
//             className="w-full text-left px-4 py-3 text-[13px] font-medium text-green-400 hover:bg-white/6 transition-colors duration-100"
//           >
//             Unblock user
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               onBlock();
//               setOpen(false);
//             }}
//             className="w-full text-left px-4 py-3 text-[13px] font-medium text-red-400 hover:bg-white/6 transition-colors duration-100"
//           >
//             Block user
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// function ConfirmModal({
//   title,
//   description,
//   confirmLabel,
//   confirmClass,
//   onConfirm,
//   onCancel,
// }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//       <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-[300px] overflow-hidden">
//         <div className="px-6 py-5 border-b border-white/8 text-center">
//           <p className="text-[15px] font-bold text-white">{title}</p>
//           <p className="text-[12px] text-white/45 mt-1.5 leading-relaxed">
//             {description}
//           </p>
//         </div>
//         <button
//           onClick={onConfirm}
//           className={`w-full px-6 py-3.5 text-[13px] font-semibold hover:bg-white/6 transition-colors duration-100 border-b border-white/8 ${confirmClass}`}
//         >
//           {confirmLabel}
//         </button>
//         <button
//           onClick={onCancel}
//           className="w-full px-6 py-3.5 text-[13px] font-medium text-white/60 hover:bg-white/6 transition-colors duration-100"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

// function ProfileView() {
//   const { user: authUser, setUser } = useAuth();
//   const { username } = useParams();
//   const navigate = useNavigate();

//   const [open, setOpen] = useState(false);
//   const [listOpen, setListOpen] = useState(false);
//   const [listType, setListType] = useState(null);
//   const fileInputRef = useRef(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [user, setProfileUser] = useState(null);
//   const [visible, setVisible] = useState(false);
//   const [messagingLoading, setMessagingLoading] = useState(false);
//   const [followLoading, setFollowLoading] = useState(false);
//   const [createOpen, setCreateOpen] = useState(false);
//   const [isBlocked, setIsBlocked] = useState(false);
//   const [showBlockConfirm, setShowBlockConfirm] = useState(false);
//   const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
//   const [showCancelRequestConfirm, setShowCancelRequestConfirm] =
//     useState(false);
//   const [followStatus, setFollowStatus] = useState("not_following");
//   const [notFound, setNotFound] = useState(false);
//   const [imgError, setImgError] = useState(false);

//   // Fetch profile — no artificial delay, cancellable on cleanup
//   useEffect(() => {
//     if (!username && !authUser) return;
//     setVisible(false);
//     setLoadingProfile(true);
//     setNotFound(false);
//     setImgError(false);

//     let cancelled = false;

//     (async () => {
//       try {
//         const targetUsername = username || authUser?.username;
//         if (!targetUsername) {
//           setProfileUser(null);
//           return;
//         }
//         const res = await fetchData(`/api/users/profile/${targetUsername}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (cancelled) return;
//         setProfileUser(data);
//         setFollowStatus(data.followStatus ?? "not_following");
//         setIsBlocked(data.isBlocked ?? false);
//       } catch (err) {
//         if (cancelled) return;
//         if (err.status === 404) setNotFound(true);
//         setProfileUser(null);
//       } finally {
//         if (!cancelled) setLoadingProfile(false);
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [username, authUser]);

//   // Fade in once data is ready — single effect, no double rAF
//   useEffect(() => {
//     if (!loadingProfile && user) {
//       setVisible(true);
//     } else {
//       setVisible(false);
//     }
//   }, [loadingProfile, user]);

//   const isMe = user?._id === authUser?._id;
//   const isFollowing = followStatus === "following";
//   const isRequested = followStatus === "requested";
//   const canViewList = isMe || isFollowing;

//   const handleFollowUser = async () => {
//     if (!user?._id || followLoading) return;
//     try {
//       setFollowLoading(true);
//       const res = await fetchData(`/api/users/${user._id}/follow`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();
//       setFollowStatus(data.followStatus ?? "requested");
//     } catch (err) {
//       console.error("Follow error:", err);
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   const handleCancelRequest = async () => {
//     if (!user?._id || followLoading) return;
//     try {
//       setFollowLoading(true);
//       await fetchData(`/api/users/${user._id}/follow-request`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       setFollowStatus("not_following");
//     } catch (err) {
//       console.error("Cancel request error:", err);
//     } finally {
//       setFollowLoading(false);
//       setShowCancelRequestConfirm(false);
//     }
//   };

//   const handleUnfollowUser = async () => {
//     if (!user?._id || !isFollowing || followLoading) return;
//     try {
//       setFollowLoading(true);
//       await fetchData(`/api/users/${user._id}/unfollow`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       setFollowStatus("not_following");
//       setProfileUser((prev) => ({
//         ...prev,
//         followersCount: Math.max(0, (prev.followersCount ?? 1) - 1),
//       }));
//     } catch (err) {
//       console.error("Unfollow error:", err);
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   const handleBlockUser = async () => {
//     try {
//       setFollowLoading(true);
//       await fetchData(`/api/users/${user._id}/block`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });
//       setIsBlocked(true);
//       setFollowStatus("not_following");
//       if (isFollowing) {
//         setProfileUser((prev) => ({
//           ...prev,
//           followersCount: Math.max(0, (prev.followersCount ?? 1) - 1),
//         }));
//       }
//     } catch (err) {
//       console.error("Block error:", err);
//     } finally {
//       setFollowLoading(false);
//       setShowBlockConfirm(false);
//     }
//   };

//   const handleUnblockUser = async () => {
//     try {
//       setFollowLoading(true);
//       await fetchData(`/api/users/${user._id}/block`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       window.location.reload();
//     } catch (err) {
//       console.error("Unblock error:", err);
//       setFollowLoading(false);
//       setShowUnblockConfirm(false);
//     }
//   };

//   const handleUploadClick = () => fileInputRef.current?.click();

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/"))
//       return alert("Please upload an image file");
//     if (file.size > 5 * 1024 * 1024) return alert("Image must be under 5MB");
//     try {
//       const formData = new FormData();
//       formData.append("profilePicture", file);
//       const res = await fetchData("/api/upload/profile-picture", {
//         method: "PUT",
//         credentials: "include",
//         body: formData,
//       });
//       if (!res.ok) throw new Error("Upload failed");
//       const updatedUser = await res.json();
//       setUser(updatedUser);
//       setImgError(false);
//       setOpen(false);
//     } catch (err) {
//       console.error("Profile picture upload failed", err);
//       alert("Failed to upload profile picture");
//     } finally {
//       e.target.value = "";
//     }
//   };

//   const handleRemovePhoto = async () => {
//     try {
//       const res = await fetchData("/api/upload/profile-picture", {
//         method: "DELETE",
//         credentials: "include",
//       });
//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err?.error || "Failed to remove photo");
//       }
//       window.location.reload();
//       setOpen(false);
//     } catch (err) {
//       alert(err.message || "Something went wrong");
//     }
//   };

//   if (loadingProfile) return <ProfileSkeleton />;

//   if (notFound) {
//     return (
//       <div className="bg-black text-white h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex flex-col items-center justify-center gap-4">
//         <svg
//           width="48"
//           height="48"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="text-white/20"
//         >
//           <circle cx="12" cy="8" r="4" />
//           <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
//           <line x1="18" y1="6" x2="22" y2="10" />
//           <line x1="22" y1="6" x2="18" y2="10" />
//         </svg>
//         <p className="text-white/50 text-[15px] font-medium">
//           This account is no longer available
//         </p>
//         <p className="text-white/25 text-[13px]">
//           It may have been removed or deactivated.
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-2 px-5 py-2 text-[13px] font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150"
//         >
//           Go back
//         </button>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="bg-black text-white h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex flex-col items-center justify-center gap-4">
//         <p className="text-white/40 text-[14px]">Something went wrong.</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-5 py-2 text-[13px] font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150"
//         >
//           Try again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* ── Scrollable page content ── */}
//       <div
//         className="bg-black text-white overflow-y-auto h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex justify-center"
//         style={{
//           opacity: visible ? 1 : 0,
//           transform: visible ? "translateY(0)" : "translateY(8px)",
//           transition: "opacity 0.2s ease, transform 0.2s ease",
//         }}
//       >
//         <div className="w-full max-w-[935px] px-4 pt-8 pb-10">
//           {/* BACK / HOME */}
//           <div className="mb-5 flex items-center gap-1">
//             {!isMe && (
//               <button
//                 onClick={() => navigate(-1)}
//                 className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
//               >
//                 <span className="text-base leading-none">←</span>
//                 <span className="hidden sm:inline tracking-wide">Back</span>
//               </button>
//             )}
//             <button
//               onClick={() => navigate("/")}
//               className="hidden md:flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
//             >
//               <Home size={18} />
//               <span className="tracking-wide">Home</span>
//             </button>
//           </div>

//           {/* PROFILE HEADER */}
//           <div className="flex flex-col sm:flex-row sm:items-start gap-7 sm:gap-14 mb-8">
//             {/* AVATAR */}
//             <div
//               onClick={isMe ? () => setOpen(true) : undefined}
//               className={`flex justify-center sm:justify-start ${isMe ? "cursor-pointer" : ""}`}
//             >
//               <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center ring-[3px] ring-white/10 transition-opacity duration-200 hover:opacity-90">
//                 {user?.profilePicture && !imgError ? (
//                   <img
//                     src={user.profilePicture}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                     onError={() => setImgError(true)}
//                   />
//                 ) : (
//                   <span className="text-3xl sm:text-4xl font-semibold text-white flex items-center justify-center">
//                     {user?.username?.[0]?.toUpperCase() || "U"}
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* RIGHT CONTENT */}
//             <div className="flex flex-col gap-5 w-full max-w-xl">
//               {/* STATS */}
//               <div className="flex justify-around sm:justify-start gap-0 sm:gap-10">
//                 <div className="text-center sm:text-left">
//                   <p className="text-[15px] font-bold text-white">
//                     {isBlocked ? "—" : (user?.postsCount ?? 0)}
//                   </p>
//                   <p className="text-xs text-white/45 mt-0.5 tracking-wide">
//                     posts
//                   </p>
//                 </div>
//                 <div
//                   className={`text-center sm:text-left ${canViewList && !isBlocked ? "cursor-pointer group" : "cursor-default"}`}
//                   onClick={() => {
//                     if (!canViewList || isBlocked) return;
//                     setListType("followers");
//                     setListOpen(true);
//                   }}
//                 >
//                   <p className="text-[15px] font-bold text-white group-hover:text-white/80 transition-colors">
//                     {isBlocked ? "—" : (user?.followersCount ?? 0)}
//                   </p>
//                   <p className="text-xs text-white/45 mt-0.5 tracking-wide">
//                     followers
//                   </p>
//                 </div>
//                 <div
//                   className={`text-center sm:text-left ${canViewList && !isBlocked ? "cursor-pointer group" : "cursor-default"}`}
//                   onClick={() => {
//                     if (!canViewList || isBlocked) return;
//                     setListType("following");
//                     setListOpen(true);
//                   }}
//                 >
//                   <p className="text-[15px] font-bold text-white group-hover:text-white/80 transition-colors">
//                     {isBlocked ? "—" : (user?.followingCount ?? 0)}
//                   </p>
//                   <p className="text-xs text-white/45 mt-0.5 tracking-wide">
//                     following
//                   </p>
//                 </div>
//               </div>

//               {/* USERNAME + BIO */}
//               <div className="space-y-1.5">
//                 <span
//                   className={`text-[15px] tracking-tight transition-all duration-200 ${isMe ? "font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" : "font-black text-white"}`}
//                 >
//                   {isMe ? `@${user?.username}` : user.username}
//                 </span>
//                 {user?.fullName && (
//                   <p className="text-[13px] text-white/50 font-normal tracking-wide">
//                     {user.fullName}
//                   </p>
//                 )}
//                 {(isMe || isFollowing) && (
//                   <p className="text-[13px] text-white/60 leading-relaxed">
//                     {user?.bio || "Welcome to my profile ✨"}
//                   </p>
//                 )}
//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="flex gap-2.5 items-center">
//                 {isMe ? (
//                   <>
//                     <button
//                       onClick={() => setCreateOpen(true)}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 tracking-wide"
//                     >
//                       Create post
//                     </button>
//                     <button
//                       onClick={() => navigate("/edit-profile")}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 hover:bg-white/8 active:scale-95 transition-all duration-150 tracking-wide text-white/80 hover:text-white"
//                     >
//                       Edit profile
//                     </button>
//                   </>
//                 ) : isBlocked ? (
//                   <button
//                     onClick={() => setShowUnblockConfirm(true)}
//                     disabled={followLoading}
//                     className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {followLoading ? <Spinner /> : "Unblock"}
//                   </button>
//                 ) : isFollowing ? (
//                   <>
//                     <button
//                       onClick={handleUnfollowUser}
//                       disabled={followLoading}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 text-white/80 hover:bg-white/8 hover:text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {followLoading ? <Spinner /> : "Unfollow"}
//                     </button>
//                     <button
//                       onClick={async () => {
//                         try {
//                           setMessagingLoading(true);
//                           const res = await fetchData(
//                             `/api/chat/start/${user._id}`,
//                             { method: "POST", credentials: "include" },
//                           );
//                           const data = await res.json();
//                           navigate(`/chat?conversation=${data._id}`);
//                         } catch (err) {
//                           console.error(err);
//                         } finally {
//                           setMessagingLoading(false);
//                         }
//                       }}
//                       disabled={messagingLoading}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 text-white/80 hover:bg-white/8 hover:text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {messagingLoading ? (
//                         <>
//                           <Spinner />
//                           <span>Opening...</span>
//                         </>
//                       ) : (
//                         "Message"
//                       )}
//                     </button>
//                     <ThreeDotsMenu
//                       isBlocked={isBlocked}
//                       onBlock={() => setShowBlockConfirm(true)}
//                       onUnblock={() => setShowUnblockConfirm(true)}
//                     />
//                   </>
//                 ) : isRequested ? (
//                   <>
//                     <button
//                       onClick={() => setShowCancelRequestConfirm(true)}
//                       disabled={followLoading}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 text-white/60 hover:text-red-400 hover:border-red-400/40 active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {followLoading ? <Spinner /> : "Requested"}
//                     </button>
//                     <ThreeDotsMenu
//                       isBlocked={isBlocked}
//                       onBlock={() => setShowBlockConfirm(true)}
//                       onUnblock={() => setShowUnblockConfirm(true)}
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={handleFollowUser}
//                       disabled={followLoading}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {followLoading ? <Spinner /> : "Follow"}
//                     </button>
//                     <ThreeDotsMenu
//                       isBlocked={isBlocked}
//                       onBlock={() => setShowBlockConfirm(true)}
//                       onUnblock={() => setShowUnblockConfirm(true)}
//                     />
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-white/10" />

//           {/* POSTS */}
//           {isBlocked ? (
//             <div className="mt-16 flex flex-col items-center justify-center gap-3 text-white/30">
//               <svg
//                 width="40"
//                 height="40"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="opacity-40"
//               >
//                 <circle cx="12" cy="12" r="10" />
//                 <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//               </svg>
//               <p className="text-sm tracking-wide">No Posts</p>
//               <p className="text-xs text-white/20">
//                 You have blocked this user.
//               </p>
//             </div>
//           ) : !isMe && !isFollowing ? (
//             <div className="mt-16 flex flex-col items-center justify-center gap-3 text-white/30">
//               <svg
//                 width="36"
//                 height="36"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="opacity-40"
//               >
//                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//                 <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//               </svg>
//               <p className="text-sm tracking-wide">This account is private</p>
//               <p className="text-xs text-white/20">
//                 {isRequested
//                   ? "Follow request sent. Wait for approval to see their posts."
//                   : "Follow this account to see their posts."}
//               </p>
//             </div>
//           ) : (
//             <ProfilePosts userId={user?._id} />
//           )}
//         </div>
//       </div>

//       {/* ── Modals — outside scrollable div so fixed positioning works ── */}
//       <ProfilePhotoModal
//         open={open}
//         onClose={() => setOpen(false)}
//         onUpload={handleUploadClick}
//         onRemove={handleRemovePhoto}
//       />
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={handleFileChange}
//       />
//       <CreatePostModal open={createOpen} onClose={() => setCreateOpen(false)} />
//       <FollowersFollowingModal
//         open={listOpen}
//         onClose={() => setListOpen(false)}
//         title={listType === "followers" ? "Followers" : "Following"}
//         userId={user?._id}
//         type={listType}
//         loggedInUser={authUser}
//         onMessage={async (u) => {
//           setListOpen(false);
//           const res = await fetchData(`/api/chat/start/${u._id}`, {
//             method: "POST",
//             credentials: "include",
//           });
//           const data = await res.json();
//           navigate(`/chat?conversation=${data._id}`);
//         }}
//       />

//       {showBlockConfirm && (
//         <ConfirmModal
//           title={`Block @${user?.username}?`}
//           description="They won't be able to see your posts or find your profile."
//           confirmLabel="Block"
//           confirmClass="text-red-400"
//           onConfirm={handleBlockUser}
//           onCancel={() => setShowBlockConfirm(false)}
//         />
//       )}
//       {showUnblockConfirm && (
//         <ConfirmModal
//           title={`Unblock @${user?.username}?`}
//           description="They will be able to see your posts and find your profile again."
//           confirmLabel="Unblock"
//           confirmClass="text-indigo-400"
//           onConfirm={handleUnblockUser}
//           onCancel={() => setShowUnblockConfirm(false)}
//         />
//       )}
//       {showCancelRequestConfirm && (
//         <ConfirmModal
//           title="Cancel request?"
//           description={`Withdraw your follow request to @${user?.username}.`}
//           confirmLabel="Cancel request"
//           confirmClass="text-red-400"
//           onConfirm={handleCancelRequest}
//           onCancel={() => setShowCancelRequestConfirm(false)}
//         />
//       )}
//     </>
//   );
// }

// export default ProfileView;

// import { useAuth } from "../../hooks/useAuth";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ProfilePhotoModal from "../ProfilePhotoModal";
// import FollowersFollowingModal from "../FollowersFollowingModal";
// import CreatePostModal from "../CreatePostModal";
// import ProfilePosts from "../ProfilePosts";
// import fetchData from "../../utils/fetchData";
// import { useParams } from "react-router-dom";
// import ProfileSkeleton from "../ProfileSkeleton";
// import { Home, MoreHorizontal } from "lucide-react";
// // import SplashScreen from "../SplashScreen";

// const Spinner = () => (
//   <svg
//     className="animate-spin h-3.5 w-3.5 text-white"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//   >
//     <circle
//       className="opacity-25"
//       cx="12"
//       cy="12"
//       r="10"
//       stroke="currentColor"
//       strokeWidth="4"
//     />
//     <path
//       className="opacity-75"
//       fill="currentColor"
//       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//     />
//   </svg>
// );

// function ThreeDotsMenu({ onBlock, isBlocked, onUnblock }) {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target))
//         setOpen(false);
//     };
//     if (open) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [open]);

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         onClick={() => setOpen((prev) => !prev)}
//         className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-white/70 hover:text-white hover:bg-white/8 active:scale-95 transition-all duration-150"
//         aria-label="More options"
//       >
//         <MoreHorizontal size={18} />
//       </button>
//       <div
//         className="absolute right-0 mt-2 w-44 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
//         style={{
//           opacity: open ? 1 : 0,
//           transform: open ? "translateY(0)" : "translateY(-6px)",
//           pointerEvents: open ? "auto" : "none",
//           transition: "opacity 0.1s ease, transform 0.1s ease",
//         }}
//       >
//         {isBlocked ? (
//           <button
//             onClick={() => {
//               onUnblock();
//               setOpen(false);
//             }}
//             className="w-full text-left px-4 py-3 text-[13px] font-medium text-green-400 hover:bg-white/6 transition-colors duration-100"
//           >
//             Unblock user
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               onBlock();
//               setOpen(false);
//             }}
//             className="w-full text-left px-4 py-3 text-[13px] font-medium text-red-400 hover:bg-white/6 transition-colors duration-100"
//           >
//             Block user
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// function ConfirmModal({
//   title,
//   description,
//   confirmLabel,
//   confirmClass,
//   onConfirm,
//   onCancel,
// }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//       <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-[300px] overflow-hidden">
//         <div className="px-6 py-5 border-b border-white/8 text-center">
//           <p className="text-[15px] font-bold text-white">{title}</p>
//           <p className="text-[12px] text-white/45 mt-1.5 leading-relaxed">
//             {description}
//           </p>
//         </div>
//         <button
//           onClick={onConfirm}
//           className={`w-full px-6 py-3.5 text-[13px] font-semibold hover:bg-white/6 transition-colors duration-100 border-b border-white/8 ${confirmClass}`}
//         >
//           {confirmLabel}
//         </button>
//         <button
//           onClick={onCancel}
//           className="w-full px-6 py-3.5 text-[13px] font-medium text-white/60 hover:bg-white/6 transition-colors duration-100"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

// function ProfileView() {
//   const { user: authUser, setUser } = useAuth();
//   const { username } = useParams();
//   const navigate = useNavigate();

//   const [open, setOpen] = useState(false);
//   const [listOpen, setListOpen] = useState(false);
//   const [listType, setListType] = useState(null);
//   const fileInputRef = useRef(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [user, setProfileUser] = useState(null);
//   const [visible, setVisible] = useState(false);
//   const [messagingLoading, setMessagingLoading] = useState(false);
//   const [followLoading, setFollowLoading] = useState(false);
//   const [createOpen, setCreateOpen] = useState(false);
//   const [isBlocked, setIsBlocked] = useState(false);
//   const [showBlockConfirm, setShowBlockConfirm] = useState(false);
//   const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
//   const [showCancelRequestConfirm, setShowCancelRequestConfirm] =
//     useState(false);
//   const [followStatus, setFollowStatus] = useState("not_following");
//   const [notFound, setNotFound] = useState(false);
//   const [imgError, setImgError] = useState(false);
// // const [showSplash, setShowSplash] = useState(!username);

//   useEffect(() => {
//     if (!username && !authUser) return;
//     setVisible(false);
//     setLoadingProfile(true);
//     setNotFound(false);
//     setImgError(false);

//     let cancelled = false;

//     (async () => {
//       try {
//         const targetUsername = username || authUser?.username;
//         if (!targetUsername) {
//           setProfileUser(null);
//           return;
//         }
//         const res = await fetchData(`/api/users/profile/${targetUsername}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (cancelled) return;
//         setProfileUser(data);
//         setFollowStatus(data.followStatus ?? "not_following");
//         setIsBlocked(data.isBlocked ?? false);
//       } catch (err) {
//         if (cancelled) return;
//         if (err.status === 404) setNotFound(true);
//         setProfileUser(null);
//       } finally {
//         if (!cancelled) setLoadingProfile(false);
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [username, authUser]);

//   useEffect(() => {
//     if (!loadingProfile && user ) {
//       setVisible(true);
//     } else {
//       setVisible(false);
//     }
//   }, [loadingProfile, user]);

//   const isMe = user?._id === authUser?._id;
//   const isFollowing = followStatus === "following";
//   const isRequested = followStatus === "requested";
//   const canViewList = isMe || isFollowing;

//   const handleFollowUser = async () => {
//     if (!user?._id || followLoading) return;
//     try {
//       setFollowLoading(true);
//       const res = await fetchData(`/api/users/${user._id}/follow`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();
//       setFollowStatus(data.followStatus ?? "requested");
//     } catch (err) {
//       console.error("Follow error:", err);
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   const handleCancelRequest = async () => {
//     if (!user?._id || followLoading) return;
//     try {
//       setFollowLoading(true);
//       await fetchData(`/api/users/${user._id}/follow-request`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       setFollowStatus("not_following");
//     } catch (err) {
//       console.error("Cancel request error:", err);
//     } finally {
//       setFollowLoading(false);
//       setShowCancelRequestConfirm(false);
//     }
//   };

//   const handleUnfollowUser = async () => {
//     if (!user?._id || !isFollowing || followLoading) return;
//     try {
//       setFollowLoading(true);
//       await fetchData(`/api/users/${user._id}/unfollow`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       setFollowStatus("not_following");
//       setProfileUser((prev) => ({
//         ...prev,
//         followersCount: Math.max(0, (prev.followersCount ?? 1) - 1),
//       }));
//     } catch (err) {
//       console.error("Unfollow error:", err);
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   const handleBlockUser = async () => {
//     try {
//       setFollowLoading(true);
//       await fetchData(`/api/users/${user._id}/block`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });
//       setIsBlocked(true);
//       setFollowStatus("not_following");
//       if (isFollowing) {
//         setProfileUser((prev) => ({
//           ...prev,
//           followersCount: Math.max(0, (prev.followersCount ?? 1) - 1),
//         }));
//       }
//     } catch (err) {
//       console.error("Block error:", err);
//     } finally {
//       setFollowLoading(false);
//       setShowBlockConfirm(false);
//     }
//   };

//   const handleUnblockUser = async () => {
//     try {
//       setFollowLoading(true);
//       await fetchData(`/api/users/${user._id}/block`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       window.location.reload();
//     } catch (err) {
//       console.error("Unblock error:", err);
//       setFollowLoading(false);
//       setShowUnblockConfirm(false);
//     }
//   };

//   const handleUploadClick = () => fileInputRef.current?.click();

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/"))
//       return alert("Please upload an image file");
//     if (file.size > 5 * 1024 * 1024) return alert("Image must be under 5MB");
//     try {
//       const formData = new FormData();
//       formData.append("profilePicture", file);
//       const res = await fetchData("/api/upload/profile-picture", {
//         method: "PUT",
//         credentials: "include",
//         body: formData,
//       });
//       if (!res.ok) throw new Error("Upload failed");
//       const updatedUser = await res.json();
//       setUser(updatedUser);
//       setImgError(false);
//       setOpen(false);
//     } catch (err) {
//       console.error("Profile picture upload failed", err);
//       alert("Failed to upload profile picture");
//     } finally {
//       e.target.value = "";
//     }
//   };

//   const handleRemovePhoto = async () => {
//     try {
//       const res = await fetchData("/api/upload/profile-picture", {
//         method: "DELETE",
//         credentials: "include",
//       });
//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err?.error || "Failed to remove photo");
//       }
//       window.location.reload();
//       setOpen(false);
//     } catch (err) {
//       alert(err.message || "Something went wrong");
//     }
//   };

//   if (loadingProfile) return <ProfileSkeleton />;

//   if (notFound) {
//     return (
//       <div className="bg-black text-white h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex flex-col items-center justify-center gap-4">
//         <svg
//           width="48"
//           height="48"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="text-white/20"
//         >
//           <circle cx="12" cy="8" r="4" />
//           <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
//           <line x1="18" y1="6" x2="22" y2="10" />
//           <line x1="22" y1="6" x2="18" y2="10" />
//         </svg>
//         <p className="text-white/50 text-[15px] font-medium">
//           This account is no longer available
//         </p>
//         <p className="text-white/25 text-[13px]">
//           It may have been removed or deactivated.
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-2 px-5 py-2 text-[13px] font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150"
//         >
//           Go back
//         </button>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="bg-black text-white h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex flex-col items-center justify-center gap-4">
//         <p className="text-white/40 text-[14px]">Something went wrong.</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-5 py-2 text-[13px] font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150"
//         >
//           Try again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="relative w-full h-full">

//         {/* ── Scrollable page content ── */}
//         <div
//           className="bg-black text-white overflow-y-auto h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex justify-center"
//           style={{
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(8px)",
//             transition: "opacity 0.2s ease, transform 0.2s ease",
//           }}
//         >
//           <div className="w-full max-w-[935px] px-4 pt-8 pb-10">
//             {/* BACK / HOME */}
//             <div className="mb-5 flex items-center gap-1">
//               {!isMe && (
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
//                 >
//                   <span className="text-base leading-none">←</span>
//                   <span className="hidden sm:inline tracking-wide">Back</span>
//                 </button>
//               )}
//               <button
//                 onClick={() => navigate("/")}
//                 className="hidden md:flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
//               >
//                 <Home size={18} />
//                 <span className="tracking-wide">Home</span>
//               </button>
//             </div>

//             {/* PROFILE HEADER */}
//             <div className="flex flex-col sm:flex-row sm:items-start gap-7 sm:gap-14 mb-8">
//               {/* AVATAR */}
//               <div
//                 onClick={isMe ? () => setOpen(true) : undefined}
//                 className={`flex justify-center sm:justify-start ${isMe ? "cursor-pointer" : ""}`}
//               >
//                 <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center ring-[3px] ring-white/10 transition-opacity duration-200 hover:opacity-90">
//                   {user?.profilePicture && !imgError ? (
//                     <img
//                       src={user.profilePicture}
//                       alt="Profile"
//                       className="w-full h-full object-cover"
//                       onError={() => setImgError(true)}
//                     />
//                   ) : (
//                     <span className="text-3xl sm:text-4xl font-semibold text-white flex items-center justify-center">
//                       {user?.username?.[0]?.toUpperCase() || "U"}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* RIGHT CONTENT */}
//               <div className="flex flex-col gap-5 w-full max-w-xl">
//                 {/* STATS */}
//                 <div className="flex justify-around sm:justify-start gap-0 sm:gap-10">
//                   <div className="text-center sm:text-left">
//                     <p className="text-[15px] font-bold text-white">
//                       {isBlocked ? "—" : (user?.postsCount ?? 0)}
//                     </p>
//                     <p className="text-xs text-white/45 mt-0.5 tracking-wide">
//                       posts
//                     </p>
//                   </div>
//                   <div
//                     className={`text-center sm:text-left ${canViewList && !isBlocked ? "cursor-pointer group" : "cursor-default"}`}
//                     onClick={() => {
//                       if (!canViewList || isBlocked) return;
//                       setListType("followers");
//                       setListOpen(true);
//                     }}
//                   >
//                     <p className="text-[15px] font-bold text-white group-hover:text-white/80 transition-colors">
//                       {isBlocked ? "—" : (user?.followersCount ?? 0)}
//                     </p>
//                     <p className="text-xs text-white/45 mt-0.5 tracking-wide">
//                       followers
//                     </p>
//                   </div>
//                   <div
//                     className={`text-center sm:text-left ${canViewList && !isBlocked ? "cursor-pointer group" : "cursor-default"}`}
//                     onClick={() => {
//                       if (!canViewList || isBlocked) return;
//                       setListType("following");
//                       setListOpen(true);
//                     }}
//                   >
//                     <p className="text-[15px] font-bold text-white group-hover:text-white/80 transition-colors">
//                       {isBlocked ? "—" : (user?.followingCount ?? 0)}
//                     </p>
//                     <p className="text-xs text-white/45 mt-0.5 tracking-wide">
//                       following
//                     </p>
//                   </div>
//                 </div>

//                 {/* USERNAME + BIO */}
//                 <div className="space-y-1.5">
//                   <span
//                     className={`text-[15px] tracking-tight transition-all duration-200 ${isMe ? "font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" : "font-black text-white"}`}
//                   >
//                     {isMe ? `@${user?.username}` : user.username}
//                   </span>
//                   {user?.fullName && (
//                     <p className="text-[13px] text-white/50 font-normal tracking-wide">
//                       {user.fullName}
//                     </p>
//                   )}
//                   {(isMe || isFollowing) && (
//                     <p className="text-[13px] text-white/60 leading-relaxed">
//                       {user?.bio || "Welcome to my profile ✨"}
//                     </p>
//                   )}
//                 </div>

//                 {/* ACTION BUTTONS */}
//                 <div className="flex gap-2.5 items-center">
//                   {isMe ? (
//                     <>
//                       <button
//                         onClick={() => setCreateOpen(true)}
//                         className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 tracking-wide"
//                       >
//                         Create post
//                       </button>
//                       <button
//                         onClick={() => navigate("/edit-profile")}
//                         className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 hover:bg-white/8 active:scale-95 transition-all duration-150 tracking-wide text-white/80 hover:text-white"
//                       >
//                         Edit profile
//                       </button>
//                     </>
//                   ) : isBlocked ? (
//                     <button
//                       onClick={() => setShowUnblockConfirm(true)}
//                       disabled={followLoading}
//                       className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {followLoading ? <Spinner /> : "Unblock"}
//                     </button>
//                   ) : isFollowing ? (
//                     <>
//                       <button
//                         onClick={handleUnfollowUser}
//                         disabled={followLoading}
//                         className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 text-white/80 hover:bg-white/8 hover:text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                       >
//                         {followLoading ? <Spinner /> : "Unfollow"}
//                       </button>
//                       <button
//                         onClick={async () => {
//                           try {
//                             setMessagingLoading(true);
//                             const res = await fetchData(
//                               `/api/chat/start/${user._id}`,
//                               { method: "POST", credentials: "include" },
//                             );
//                             const data = await res.json();
//                             navigate(`/chat?conversation=${data._id}`);
//                           } catch (err) {
//                             console.error(err);
//                           } finally {
//                             setMessagingLoading(false);
//                           }
//                         }}
//                         disabled={messagingLoading}
//                         className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 text-white/80 hover:bg-white/8 hover:text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                       >
//                         {messagingLoading ? (
//                           <>
//                             <Spinner />
//                             <span>Opening...</span>
//                           </>
//                         ) : (
//                           "Message"
//                         )}
//                       </button>
//                       <ThreeDotsMenu
//                         isBlocked={isBlocked}
//                         onBlock={() => setShowBlockConfirm(true)}
//                         onUnblock={() => setShowUnblockConfirm(true)}
//                       />
//                     </>
//                   ) : isRequested ? (
//                     <>
//                       <button
//                         onClick={() => setShowCancelRequestConfirm(true)}
//                         disabled={followLoading}
//                         className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 text-white/60 hover:text-red-400 hover:border-red-400/40 active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                       >
//                         {followLoading ? <Spinner /> : "Requested"}
//                       </button>
//                       <ThreeDotsMenu
//                         isBlocked={isBlocked}
//                         onBlock={() => setShowBlockConfirm(true)}
//                         onUnblock={() => setShowUnblockConfirm(true)}
//                       />
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={handleFollowUser}
//                         disabled={followLoading}
//                         className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                       >
//                         {followLoading ? <Spinner /> : "Follow"}
//                       </button>
//                       <ThreeDotsMenu
//                         isBlocked={isBlocked}
//                         onBlock={() => setShowBlockConfirm(true)}
//                         onUnblock={() => setShowUnblockConfirm(true)}
//                       />
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="border-t border-white/10" />

//             {/* POSTS */}
//             {isBlocked ? (
//               <div className="mt-16 flex flex-col items-center justify-center gap-3 text-white/30">
//                 <svg
//                   width="40"
//                   height="40"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="opacity-40"
//                 >
//                   <circle cx="12" cy="12" r="10" />
//                   <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//                 </svg>
//                 <p className="text-sm tracking-wide">No Posts</p>
//                 <p className="text-xs text-white/20">
//                   You have blocked this user.
//                 </p>
//               </div>
//             ) : !isMe && !isFollowing ? (
//               <div className="mt-16 flex flex-col items-center justify-center gap-3 text-white/30">
//                 <svg
//                   width="36"
//                   height="36"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="opacity-40"
//                 >
//                   <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//                   <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//                 </svg>
//                 <p className="text-sm tracking-wide">This account is private</p>
//                 <p className="text-xs text-white/20">
//                   {isRequested
//                     ? "Follow request sent. Wait for approval to see their posts."
//                     : "Follow this account to see their posts."}
//                 </p>
//               </div>
//             ) : (
//               <ProfilePosts userId={user?._id} />
//             )}
//           </div>
//         </div>

//         {/* ── Modals ── */}
//         <ProfilePhotoModal
//           open={open}
//           onClose={() => setOpen(false)}
//           onUpload={handleUploadClick}
//           onRemove={handleRemovePhoto}
//         />
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//         <CreatePostModal
//           open={createOpen}
//           onClose={() => setCreateOpen(false)}
//         />
//         <FollowersFollowingModal
//           open={listOpen}
//           onClose={() => setListOpen(false)}
//           title={listType === "followers" ? "Followers" : "Following"}
//           userId={user?._id}
//           type={listType}
//           loggedInUser={authUser}
//           onMessage={async (u) => {
//             setListOpen(false);
//             const res = await fetchData(`/api/chat/start/${u._id}`, {
//               method: "POST",
//               credentials: "include",
//             });
//             const data = await res.json();
//             navigate(`/chat?conversation=${data._id}`);
//           }}
//         />

//         {showBlockConfirm && (
//           <ConfirmModal
//             title={`Block @${user?.username}?`}
//             description="They won't be able to see your posts or find your profile."
//             confirmLabel="Block"
//             confirmClass="text-red-400"
//             onConfirm={handleBlockUser}
//             onCancel={() => setShowBlockConfirm(false)}
//           />
//         )}
//         {showUnblockConfirm && (
//           <ConfirmModal
//             title={`Unblock @${user?.username}?`}
//             description="They will be able to see your posts and find your profile again."
//             confirmLabel="Unblock"
//             confirmClass="text-indigo-400"
//             onConfirm={handleUnblockUser}
//             onCancel={() => setShowUnblockConfirm(false)}
//           />
//         )}
//         {showCancelRequestConfirm && (
//           <ConfirmModal
//             title="Cancel request?"
//             description={`Withdraw your follow request to @${user?.username}.`}
//             confirmLabel="Cancel request"
//             confirmClass="text-red-400"
//             onConfirm={handleCancelRequest}
//             onCancel={() => setShowCancelRequestConfirm(false)}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// export default ProfileView;

import { useAuth } from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePhotoModal from "../ProfilePhotoModal";
import FollowersFollowingModal from "../FollowersFollowingModal";
import CreatePostModal from "../CreatePostModal";
import ProfilePosts from "../ProfilePosts";
import fetchData from "../../utils/fetchData";
import { useParams } from "react-router-dom";
import ProfileSkeleton from "../ProfileSkeleton";
import { Home, MoreHorizontal } from "lucide-react";
// import SplashScreen from "../SplashScreen";

const Spinner = () => (
  <svg
    className="animate-spin h-3.5 w-3.5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

function ThreeDotsMenu({ onBlock, isBlocked, onUnblock }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/15 text-white/70 hover:text-white hover:bg-white/8 active:scale-95 transition-all duration-150"
        aria-label="More options"
      >
        <MoreHorizontal size={18} />
      </button>
      <div
        className="absolute right-0 mt-2 w-44 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.1s ease, transform 0.1s ease",
        }}
      >
        {isBlocked ? (
          <button
            onClick={() => {
              onUnblock();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-sm font-medium text-green-400 hover:bg-white/6 transition-colors duration-100"
          >
            Unblock user
          </button>
        ) : (
          <button
            onClick={() => {
              onBlock();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-sm font-medium text-red-400 hover:bg-white/6 transition-colors duration-100"
          >
            Block user
          </button>
        )}
      </div>
    </div>
  );
}

function ConfirmModal({
  title,
  description,
  confirmLabel,
  confirmClass,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-[300px] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/8 text-center">
          <p className="text-base font-bold text-white">{title}</p>
          <p className="text-xs text-white/45 mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>
        <button
          onClick={onConfirm}
          className={`w-full px-6 py-3.5 text-sm font-semibold hover:bg-white/6 transition-colors duration-100 border-b border-white/8 ${confirmClass}`}
        >
          {confirmLabel}
        </button>
        <button
          onClick={onCancel}
          className="w-full px-6 py-3.5 text-sm font-medium text-white/60 hover:bg-white/6 transition-colors duration-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function ProfileView() {
  const { user: authUser, setUser } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState(null);
  const fileInputRef = useRef(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [user, setProfileUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const [messagingLoading, setMessagingLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
  const [showCancelRequestConfirm, setShowCancelRequestConfirm] =
    useState(false);
  const [followStatus, setFollowStatus] = useState("not_following");
  const [notFound, setNotFound] = useState(false);
  const [imgError, setImgError] = useState(false);
  // const [showSplash, setShowSplash] = useState(!username);

  useEffect(() => {
    if (!username && !authUser) return;
    setVisible(false);
    setLoadingProfile(true);
    setNotFound(false);
    setImgError(false);

    let cancelled = false;

    (async () => {
      try {
        const targetUsername = username || authUser?.username;
        if (!targetUsername) {
          setProfileUser(null);
          return;
        }
        const res = await fetchData(`/api/users/profile/${targetUsername}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (cancelled) return;
        setProfileUser(data);
        setFollowStatus(data.followStatus ?? "not_following");
        setIsBlocked(data.isBlocked ?? false);
      } catch (err) {
        if (cancelled) return;
        if (err.status === 404) setNotFound(true);
        setProfileUser(null);
      } finally {
        if (!cancelled) setLoadingProfile(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [username, authUser]);

  useEffect(() => {
    if (!loadingProfile && user) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [loadingProfile, user]);

  const isMe = user?._id === authUser?._id;
  const isFollowing = followStatus === "following";
  const isRequested = followStatus === "requested";
  const canViewList = isMe || isFollowing;

  const handleFollowUser = async () => {
    if (!user?._id || followLoading) return;
    try {
      setFollowLoading(true);
      const res = await fetchData(`/api/users/${user._id}/follow`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setFollowStatus(data.followStatus ?? "requested");
    } catch (err) {
      console.error("Follow error:", err);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleCancelRequest = async () => {
    if (!user?._id || followLoading) return;
    try {
      setFollowLoading(true);
      await fetchData(`/api/users/${user._id}/follow-request`, {
        method: "DELETE",
        credentials: "include",
      });
      setFollowStatus("not_following");
    } catch (err) {
      console.error("Cancel request error:", err);
    } finally {
      setFollowLoading(false);
      setShowCancelRequestConfirm(false);
    }
  };

  const handleUnfollowUser = async () => {
    if (!user?._id || !isFollowing || followLoading) return;
    try {
      setFollowLoading(true);
      await fetchData(`/api/users/${user._id}/unfollow`, {
        method: "DELETE",
        credentials: "include",
      });
      setFollowStatus("not_following");
      setProfileUser((prev) => ({
        ...prev,
        followersCount: Math.max(0, (prev.followersCount ?? 1) - 1),
      }));
    } catch (err) {
      console.error("Unfollow error:", err);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleBlockUser = async () => {
    try {
      setFollowLoading(true);
      await fetchData(`/api/users/${user._id}/block`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      setIsBlocked(true);
      setFollowStatus("not_following");
      if (isFollowing) {
        setProfileUser((prev) => ({
          ...prev,
          followersCount: Math.max(0, (prev.followersCount ?? 1) - 1),
        }));
      }
    } catch (err) {
      console.error("Block error:", err);
    } finally {
      setFollowLoading(false);
      setShowBlockConfirm(false);
    }
  };

  const handleUnblockUser = async () => {
    try {
      setFollowLoading(true);
      await fetchData(`/api/users/${user._id}/block`, {
        method: "DELETE",
        credentials: "include",
      });
      window.location.reload();
    } catch (err) {
      console.error("Unblock error:", err);
      setFollowLoading(false);
      setShowUnblockConfirm(false);
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return alert("Please upload an image file");
    if (file.size > 5 * 1024 * 1024) return alert("Image must be under 5MB");
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const res = await fetchData("/api/upload/profile-picture", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const updatedUser = await res.json();
      setUser(updatedUser);
      setImgError(false);
      setOpen(false);
    } catch (err) {
      console.error("Profile picture upload failed", err);
      alert("Failed to upload profile picture");
    } finally {
      e.target.value = "";
    }
  };

  const handleRemovePhoto = async () => {
    try {
      const res = await fetchData("/api/upload/profile-picture", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Failed to remove photo");
      }
      window.location.reload();
      setOpen(false);
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  if (loadingProfile) return <ProfileSkeleton />;

  if (notFound) {
    return (
      <div className="bg-black text-white h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex flex-col items-center justify-center gap-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/20"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          <line x1="18" y1="6" x2="22" y2="10" />
          <line x1="22" y1="6" x2="18" y2="10" />
        </svg>
        <p className="text-white/50 text-sm font-medium">
          This account is no longer available
        </p>
        <p className="text-white/25 text-xs">
          It may have been removed or deactivated.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 px-5 py-2 text-sm font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150"
        >
          Go back
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-black text-white h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex flex-col items-center justify-center gap-4">
        <p className="text-white/40 text-sm">Something went wrong.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 text-sm font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-full">
        {/* ── Scrollable page content ── */}
        <div
          className="bg-black text-white overflow-y-auto h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          <div className="w-full max-w-[935px] px-4 pt-8 pb-10">
            {/* BACK / HOME */}
            <div className="mb-5 flex items-center gap-1">
              {!isMe && (
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
                >
                  <span className="text-base leading-none">←</span>
                  <span className="hidden sm:inline tracking-wide">Back</span>
                </button>
              )}
              <button
                onClick={() => navigate("/")}
                className="hidden md:flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
              >
                <Home size={18} />
                <span className="tracking-wide">Home</span>
              </button>
            </div>

            {/* PROFILE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-7 sm:gap-14 mb-8">
              {/* AVATAR */}
              <div
                onClick={isMe ? () => setOpen(true) : undefined}
                className={`flex justify-center sm:justify-start ${isMe ? "cursor-pointer" : ""}`}
              >
                <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center ring-[3px] ring-white/10 transition-opacity duration-200 hover:opacity-90">
                  {user?.profilePicture && !imgError ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <span className="text-3xl sm:text-4xl font-semibold text-white flex items-center justify-center">
                      {user?.username?.[0]?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex flex-col gap-5 w-full max-w-xl">
                {/* STATS */}
                <div className="flex justify-around sm:justify-start gap-0 sm:gap-10">
                  <div className="text-center sm:text-left">
                    <p className="text-sm sm:text-base font-bold text-white">
                      {isBlocked ? "—" : (user?.postsCount ?? 0)}
                    </p>
                    <p className="text-xs text-white/45 mt-0.5 tracking-wide">
                      posts
                    </p>
                  </div>
                  <div
                    className={`text-center sm:text-left ${canViewList && !isBlocked ? "cursor-pointer group" : "cursor-default"}`}
                    onClick={() => {
                      if (!canViewList || isBlocked) return;
                      setListType("followers");
                      setListOpen(true);
                    }}
                  >
                    <p className="text-sm sm:text-base font-bold text-white group-hover:text-white/80 transition-colors">
                      {isBlocked ? "—" : (user?.followersCount ?? 0)}
                    </p>
                    <p className="text-xs text-white/45 mt-0.5 tracking-wide">
                      followers
                    </p>
                  </div>
                  <div
                    className={`text-center sm:text-left ${canViewList && !isBlocked ? "cursor-pointer group" : "cursor-default"}`}
                    onClick={() => {
                      if (!canViewList || isBlocked) return;
                      setListType("following");
                      setListOpen(true);
                    }}
                  >
                    <p className="text-sm sm:text-base font-bold text-white group-hover:text-white/80 transition-colors">
                      {isBlocked ? "—" : (user?.followingCount ?? 0)}
                    </p>
                    <p className="text-xs text-white/45 mt-0.5 tracking-wide">
                      following
                    </p>
                  </div>
                </div>

                {/* USERNAME + BIO */}
                <div className="space-y-1.5">
                  <span
                    className={`text-sm sm:text-base tracking-tight transition-all duration-200 ${isMe ? "font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" : "font-black text-white"}`}
                  >
                    {isMe ? `@${user?.username}` : user.username}
                  </span>
                  {user?.fullName && (
                    <p className="text-xs sm:text-sm text-white/50 font-normal tracking-wide">
                      {user.fullName}
                    </p>
                  )}
                  {(isMe || isFollowing) && (
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                      {user?.bio || "Welcome to my profile ✨"}
                    </p>
                  )}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2.5 items-center">
                  {isMe ? (
                    <>
                      <button
                        onClick={() => setCreateOpen(true)}
                        className="flex-1 px-4 py-2.5 sm:py-2 text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 tracking-wide"
                      >
                        Create post
                      </button>
                      <button
                        onClick={() => navigate("/edit-profile")}
                        className="flex-1 px-4 py-2.5 sm:py-2 text-sm font-semibold rounded-lg border border-white/15 hover:bg-white/8 active:scale-95 transition-all duration-150 tracking-wide text-white/80 hover:text-white"
                      >
                        Edit profile
                      </button>
                    </>
                  ) : isBlocked ? (
                    <button
                      onClick={() => setShowUnblockConfirm(true)}
                      disabled={followLoading}
                      className="flex-1 px-4 py-2.5 sm:py-2 text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {followLoading ? <Spinner /> : "Unblock"}
                    </button>
                  ) : isFollowing ? (
                    <>
                      <button
                        onClick={handleUnfollowUser}
                        disabled={followLoading}
                        className="flex-1 px-4 py-2.5 sm:py-2 text-sm font-semibold rounded-lg border border-white/15 text-white/80 hover:bg-white/8 hover:text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {followLoading ? <Spinner /> : "Unfollow"}
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            setMessagingLoading(true);
                            const res = await fetchData(
                              `/api/chat/start/${user._id}`,
                              { method: "POST", credentials: "include" },
                            );
                            const data = await res.json();
                            navigate(`/chat?conversation=${data._id}`);
                          } catch (err) {
                            console.error(err);
                          } finally {
                            setMessagingLoading(false);
                          }
                        }}
                        disabled={messagingLoading}
                        className="flex-1 px-4 py-2.5 sm:py-2 text-sm font-semibold rounded-lg border border-white/15 text-white/80 hover:bg-white/8 hover:text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {messagingLoading ? (
                          <>
                            <Spinner />
                            <span>Opening...</span>
                          </>
                        ) : (
                          "Message"
                        )}
                      </button>
                      <ThreeDotsMenu
                        isBlocked={isBlocked}
                        onBlock={() => setShowBlockConfirm(true)}
                        onUnblock={() => setShowUnblockConfirm(true)}
                      />
                    </>
                  ) : isRequested ? (
                    <>
                      <button
                        onClick={() => setShowCancelRequestConfirm(true)}
                        disabled={followLoading}
                        className="flex-1 px-4 py-2.5 sm:py-2 text-sm font-semibold rounded-lg border border-white/15 text-white/60 hover:text-red-400 hover:border-red-400/40 active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {followLoading ? <Spinner /> : "Requested"}
                      </button>
                      <ThreeDotsMenu
                        isBlocked={isBlocked}
                        onBlock={() => setShowBlockConfirm(true)}
                        onUnblock={() => setShowUnblockConfirm(true)}
                      />
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleFollowUser}
                        disabled={followLoading}
                        className="flex-1 px-4 py-2.5 sm:py-2 text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 transition-all duration-150 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {followLoading ? <Spinner /> : "Follow"}
                      </button>
                      <ThreeDotsMenu
                        isBlocked={isBlocked}
                        onBlock={() => setShowBlockConfirm(true)}
                        onUnblock={() => setShowUnblockConfirm(true)}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10" />

            {/* POSTS */}
            {isBlocked ? (
              <div className="mt-16 flex flex-col items-center justify-center gap-3 text-white/30">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-40"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
                <p className="text-sm tracking-wide">No Posts</p>
                <p className="text-xs text-white/20">
                  You have blocked this user.
                </p>
              </div>
            ) : !isMe && !isFollowing ? (
              <div className="mt-16 flex flex-col items-center justify-center gap-3 text-white/30">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-40"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p className="text-sm tracking-wide">This account is private</p>
                <p className="text-xs text-white/20">
                  {isRequested
                    ? "Follow request sent. Wait for approval to see their posts."
                    : "Follow this account to see their posts."}
                </p>
              </div>
            ) : (
              <ProfilePosts userId={user?._id} />
            )}
          </div>
        </div>

        {/* ── Modals ── */}
        <ProfilePhotoModal
          open={open}
          onClose={() => setOpen(false)}
          onUpload={handleUploadClick}
          onRemove={handleRemovePhoto}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <CreatePostModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
        />
        <FollowersFollowingModal
          open={listOpen}
          onClose={() => setListOpen(false)}
          title={listType === "followers" ? "Followers" : "Following"}
          userId={user?._id}
          type={listType}
          loggedInUser={authUser}
          onMessage={async (u) => {
            setListOpen(false);
            const res = await fetchData(`/api/chat/start/${u._id}`, {
              method: "POST",
              credentials: "include",
            });
            const data = await res.json();
            navigate(`/chat?conversation=${data._id}`);
          }}
        />

        {showBlockConfirm && (
          <ConfirmModal
            title={`Block @${user?.username}?`}
            description="They won't be able to see your posts or find your profile."
            confirmLabel="Block"
            confirmClass="text-red-400"
            onConfirm={handleBlockUser}
            onCancel={() => setShowBlockConfirm(false)}
          />
        )}
        {showUnblockConfirm && (
          <ConfirmModal
            title={`Unblock @${user?.username}?`}
            description="They will be able to see your posts and find your profile again."
            confirmLabel="Unblock"
            confirmClass="text-indigo-400"
            onConfirm={handleUnblockUser}
            onCancel={() => setShowUnblockConfirm(false)}
          />
        )}
        {showCancelRequestConfirm && (
          <ConfirmModal
            title="Cancel request?"
            description={`Withdraw your follow request to @${user?.username}.`}
            confirmLabel="Cancel request"
            confirmClass="text-red-400"
            onConfirm={handleCancelRequest}
            onCancel={() => setShowCancelRequestConfirm(false)}
          />
        )}
      </div>
    </>
  );
}

export default ProfileView;