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

// function ProfileView() {
//   const { user: authUser, setUser } = useAuth();
//   const { username } = useParams();
//   const navigate = useNavigate();
//  console.log("authUser in ProfileView:", authUser);

//   // ✅ HOOKS MUST ALWAYS RUN
//   const [open, setOpen] = useState(false);
//   const [listOpen, setListOpen] = useState(false);
//   const [listType, setListType] = useState(null);
//   const fileInputRef = useRef(null);
//   const [followed, setFollowed] = useState(false);

// const [loadingProfile, setLoadingProfile] = useState(true);

// const [user, setProfileUser] = useState(null);

// useEffect(() => {
//   setLoadingProfile(true);

//   if (username) {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetchData(`/api/users/profile/${username}`, {
//           credentials: "include",
//         });

//         if (!res.ok) throw new Error();

//         const data = await res.json();

//         console.log("Fetched profile data:", data);
//         setProfileUser(data);
//       } catch {
//         setProfileUser(null);
//       } finally {
//         setLoadingProfile(false);
//       }
//     };

//     fetchProfile();
//   } else {
//     setProfileUser(authUser);

//     setLoadingProfile(false);
//   }
// }, [username, authUser]);

//   const [createOpen, setCreateOpen] = useState(false);

//   // if (!user) return null; // ✅ SAFE NOW

//   const isMe = user?._id === authUser?._id;

//  const isFollowing =
//    !!authUser &&
//    !!user &&
//    user.followers?.some((id) => id.toString() === authUser._id.toString());

//   // Open file picker
//   const handleUploadClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   useEffect(() => {
//     if (followed) {
//       // Update local state to reflect the new follower
//       setUser((prevUser) => {
//         if (!prevUser) return prevUser;
//         return {
//           ...prevUser,
//           following: [...prevUser.following, user._id],
//         };
//       });
//     }
//   }, [followed, user, setUser]);

//  const handleFollowUser = async () => {
//    if (!user?._id || isFollowing) return;

//    try {
//      await fetchData(`/api/users/${user._id}/follow`, {
//        method: "POST",
//        credentials: "include",
//        headers: { "Content-Type": "application/json" },
//      });

//      setProfileUser((prev) => ({
//        ...prev,
//        followers: [...prev.followers, authUser._id.toString()],
//      }));
//    } catch (err) {
//      console.error("Follow error:", err);
//    }
//  };

//   // Handle file selection
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please upload an image file");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       alert("Image must be under 5MB");
//       return;
//     }

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

//       // 🔥 update auth context
//       setUser(updatedUser);

//       setOpen(false);
//     } catch (err) {
//       console.error("Profile picture upload failed", err);
//       alert("Failed to upload profile picture");
//     } finally {
//       e.target.value = "";
//     }
//   };
//   // Remove photo
//   const handleRemovePhoto = async () => {
//     try {
//       console.log("Remove profile photo");

//       const res = await fetchData("/api/upload/profile-picture", {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err?.error || "Failed to remove photo");
//       }

//       const data = await res.json();
//       console.log("Profile photo removed:", data);

//       // ✅ optional: refresh UI
//       // 1) simplest (for now)
//       window.location.reload();

//       // 2) later you can update user state instead

//       setOpen(false);
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Something went wrong");
//     }
//   };

//   if (loadingProfile || !user) {
//     return (
//       <ProfileSkeleton/>
//     );
//   }else{
//   return (
//     <div
//       className=" bg-black
//   bg-black text-white overflow-y-auto
//   h-[calc(100vh-72px-56px)]
//   md:h-[calc(100vh-80px-56px)]
//   text-white flex justify-center overflow-y-auto"
//     >
//       {/* CENTER COLUMN */}
//       <div className="w-full max-w-[935px] min-[60%]: overflow-y-auto px-4 pt-10">
//         {/* GO BACK BUTTON */}
//         {!isMe && (
//           <div className="mb-4 flex items-center gap-2">
//             {/* Back button */}
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center gap-2 text-white/80 hover:text-white text-sm sm:text-base px-2 py-1 rounded-lg hover:bg-white/10 transition"
//             >
//               <span className="text-lg sm:text-xl">←</span>
//               <span className="hidden sm:inline">Go back</span>
//             </button>

//             {/* Home button */}
//             <button
//               onClick={() => navigate("/")}
//               className="flex items-center gap-2 text-white/80 hover:text-white text-sm sm:text-base px-2 py-1 rounded-lg hover:bg-white/10 transition"
//             >
//               <span className="text-lg sm:text-xl">🏠</span>
//               <span className="hidden sm:inline">Home</span>
//             </button>
//           </div>
//         )}

//         {isMe && (
//           <div className="mb-4 flex items-center">
//             <button
//               onClick={() => navigate("/")}
//               className="flex items-center gap-2 text-white/80 hover:text-white text-sm sm:text-base px-2 py-1 rounded-lg hover:bg-white/10 transition"
//             >
//               <span className="text-lg sm:text-xl">🏠</span>
//               <span className="hidden sm:inline">Home</span>
//             </button>
//           </div>
//         )}

//         {/* PROFILE HEADER */}
//         <div className="flex flex-col justify-between sm:flex-row sm:items-start gap-8">
//           {/* AVATAR */}
//           <div
//             onClick={isMe ? () => setOpen(true) : undefined}
//             className={`flex justify-center sm:justify-start ${
//               isMe ? "cursor-pointer" : ""
//             }`}
//           >
//             <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden  bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
//               {user?.profilePicture ? (
//                 <img
//                   src={user?.profilePicture}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-3xl sm:text-4xl font-semibold">
//                   {user?.username?.[0]?.toUpperCase() || "U"}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* RIGHT CONTENT */}
//           <div className="flex flex-col gap-4 w-full max-w-xl">
//             {/* STATS */}
//             <div className="flex justify-around sm:justify-start gap-6 text-sm">
//               <div className="text-center sm:text-left">
//                 <span className="font-semibold">{user?.postsCount || 0}</span>
//                 <div className="text-white/70">posts</div>
//               </div>

//               <div
//                 className="text-center sm:text-left cursor-pointer"
//                 onClick={() => {
//                   setListType("followers");
//                   setListOpen(true);
//                 }}
//               >
//                 <span className="font-semibold">{user?.followers?.length}</span>
//                 <div className="text-white/70">followers</div>
//               </div>

//               <div
//                 className="text-center sm:text-left cursor-pointer"
//                 onClick={() => {
//                   setListType("following");
//                   setListOpen(true);
//                 }}
//               >
//                 <span className="font-semibold">{user?.following?.length}</span>
//                 <div className="text-white/70">following</div>
//               </div>
//             </div>

//             {/* USERNAME + BIO */}
//             {/* USERNAME + FULLNAME + BIO */}
//             <div className="leading-snug space-y-1">
//               {/* USERNAME */}
//               <div className="flex items-center gap-2">
//                 <span
//                   className={`text-[15px] tracking-wide transition-all duration-200 ${
//                     isMe
//                       ? "font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]"
//                       : "font-medium text-gray-300 hover:text-white"
//                   }`}
//                 >
//                   {isMe ? `@${user?.username}` : user?.username}
//                 </span>
//               </div>

//               {/* FULL NAME */}
//               {user?.fullName && (
//                 <p className="text-sm text-white font-medium">
//                   {user.fullName}
//                 </p>
//               )}

//               {/* BIO */}
//               <p className="text-sm text-white/80">
//                 {user?.bio || "Welcome to my profile ✨"}
//               </p>
//             </div>

//             {/* ACTION BUTTONS */}
//             <div className="flex gap-3 mt-2">
//               {isMe ? (
//                 <>
//                   <button
//                     onClick={() => setCreateOpen(true)}
//                     className="flex-1 px-4 py-1.5 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
//                   >
//                     Create post
//                   </button>
//                   <button
//                     onClick={() => navigate("/edit-profile")}
//                     className="flex-1 px-4 py-1.5 text-sm rounded-lg border border-white/20 hover:bg-white/10"
//                   >
//                     Edit profile
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={handleFollowUser}
//                     disabled={isFollowing}
//                     className={`flex-1 px-4 py-1.5 text-sm rounded-lg transition ${
//                       isFollowing
//                         ? "border border-white/30 text-white hover:bg-white/10"
//                         : "bg-indigo-600 hover:bg-indigo-700"
//                     }`}
//                   >
//                     {isFollowing ? "Following" : "Follow"}
//                   </button>

//                   {/* <button className="flex-1 px-4 py-1.5 text-sm rounded-lg border border-white/20 hover:bg-white/10">
//                     Message
//                   </button> */}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* DIVIDER */}
//         <div className="mt-12 border-t border-white/20" />

//         {/* OPTIONAL INFO SECTION */}
//         {/* <div className="mt-6 max-w-xl text-sm space-y-4">
//           <div className="flex justify-between">
//             <span className="text-white/60">Username</span>
//             <span>{user.username}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-white/60">Email</span>
//             <span>{user.email}</span>
//           </div>
//         </div> */}

//         {user?.postsCount === 0 ? (
//           <div className="mt-8 flex justify-center items-center text-white/60 text-lg">
//             No posts yet
//           </div>
//         ) : (
//           <ProfilePosts userId={user?._id} />
//         )}

//         {/* 🔽 MODAL (MUST BE HERE) */}
//         <ProfilePhotoModal
//           open={open}
//           onClose={() => setOpen(false)}
//           onUpload={handleUploadClick}
//           onRemove={handleRemovePhoto}
//         />

//         {/* 🔽 HIDDEN FILE INPUT (MUST BE HERE) */}
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//       </div>

//       <CreatePostModal open={createOpen} onClose={() => setCreateOpen(false)} />

//       <FollowersFollowingModal
//         open={listOpen}
//         onClose={() => setListOpen(false)}
//         title={listType === "followers" ? "Followers" : "Following"}
//         ids={listType === "followers" ? user?.followers : user?.following}
//       />
//     </div>
//   );
// }
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

// function ProfileView() {
//   const { user: authUser, setUser } = useAuth();
//   const { username } = useParams();
//   const navigate = useNavigate();
//   console.log("authUser in ProfileView:", authUser);

//   const [open, setOpen] = useState(false);
//   const [listOpen, setListOpen] = useState(false);
//   const [listType, setListType] = useState(null);
//   const fileInputRef = useRef(null);
//   const [followed, setFollowed] = useState(false);
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [user, setProfileUser] = useState(null);

//   console.log(authUser);

//   useEffect(() => {
//     setLoadingProfile(true);
//     if (username) {
//       const fetchProfile = async () => {
//         try {
//           const res = await fetchData(`/api/users/profile/${username}`, {
//             credentials: "include",
//           });
//           if (!res.ok) throw new Error();
//           const data = await res.json();
//           console.log("Fetched profile data:", data);
//           setProfileUser(data);
//         } catch {
//           setProfileUser(null);
//         } finally {
//           setLoadingProfile(false);
//         }
//       };
//       fetchProfile();
//     } else {
//       setProfileUser(authUser);
//       setLoadingProfile(false);
//     }
//   }, [username, authUser]);

//   const [createOpen, setCreateOpen] = useState(false);

//   const isMe = user?._id === authUser?._id;

//   const isFollowing =
//     !!authUser &&
//     !!user &&
//     user.followers?.some((id) => id.toString() === authUser._id.toString());

//   const handleUploadClick = () => {
//     if (fileInputRef.current) fileInputRef.current.click();
//   };

//   useEffect(() => {
//     if (followed) {
//       setUser((prevUser) => {
//         if (!prevUser) return prevUser;
//         return {
//           ...prevUser,
//           following: [...prevUser.following, user._id],
//         };
//       });
//     }
//   }, [followed, user, setUser]);

//   const handleFollowUser = async () => {
//     if (!user?._id || isFollowing) return;
//     try {
//       await fetchData(`/api/users/${user._id}/follow`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });
//       setProfileUser((prev) => ({
//         ...prev,
//         followers: [...prev.followers, authUser._id.toString()],
//       }));
//     } catch (err) {
//       console.error("Follow error:", err);
//     }
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/")) {
//       alert("Please upload an image file");
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       alert("Image must be under 5MB");
//       return;
//     }
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
//       console.log("Remove profile photo");
//       const res = await fetchData("/api/upload/profile-picture", {
//         method: "DELETE",
//         credentials: "include",
//       });
//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err?.error || "Failed to remove photo");
//       }
//       const data = await res.json();
//       console.log("Profile photo removed:", data);
//       window.location.reload();
//       setOpen(false);
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Something went wrong");
//     }
//   };

//   if (loadingProfile || !user) {
//     return <ProfileSkeleton />;
//   } else {
//     return (
//       <div className="bg-black text-white overflow-y-auto h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex justify-center">
//         {/* CENTER COLUMN */}
//         <div className="w-full max-w-[935px] px-4 pt-8 pb-10">
//           {/* GO BACK / HOME BUTTONS */}
//           {!isMe && (
//             <div className="mb-5 flex items-center gap-1">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
//               >
//                 <span className="text-base leading-none">←</span>
//                 <span className="hidden sm:inline tracking-wide">Back</span>
//               </button>
//               <button
//                 onClick={() => navigate("/")}
//                 className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
//               >
//                 <span className="text-base leading-none">🏠</span>
//                 <span className="hidden sm:inline tracking-wide">Home</span>
//               </button>
//             </div>
//           )}

//           {isMe && (
//             <div className="mb-5 flex items-center">
//               <button
//                 onClick={() => navigate("/")}
//                 className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
//               >
//                 <span className="text-base leading-none">🏠</span>
//                 <span className="hidden sm:inline tracking-wide">Home</span>
//               </button>
//             </div>
//           )}

//           {/* PROFILE HEADER */}
//           <div className="flex flex-col sm:flex-row sm:items-start gap-7 sm:gap-14 mb-8">
//             {/* AVATAR */}
//             <div
//               onClick={isMe ? () => setOpen(true) : undefined}
//               className={`flex justify-center sm:justify-start ${isMe ? "cursor-pointer" : ""}`}
//             >
//               <div
//                 className="
//                 w-24 h-24 sm:w-36 sm:h-36
//                 rounded-full overflow-hidden
//                 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600
//                 flex items-center justify-center
//                 ring-[3px] ring-white/10
//                 transition-opacity duration-200
//                 hover:opacity-90
//               "
//               >
//                 {user?.profilePicture ? (
//                   <img
//                     src={user?.profilePicture}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-3xl sm:text-4xl font-semibold text-white">
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
//                     {user?.postsCount || 0}
//                   </p>
//                   <p className="text-xs text-white/45 mt-0.5 tracking-wide">
//                     posts
//                   </p>
//                 </div>
//                 <div
//                   className="text-center sm:text-left cursor-pointer group"
//                   onClick={() => {
//                     setListType("followers");
//                     setListOpen(true);
//                   }}
//                 >
//                   <p className="text-[15px] font-bold text-white group-hover:text-white/80 transition-colors">
//                     {user?.followers?.length}
//                   </p>
//                   <p className="text-xs text-white/45 mt-0.5 tracking-wide">
//                     followers
//                   </p>
//                 </div>
//                 <div
//                   className="text-center sm:text-left cursor-pointer group"
//                   onClick={() => {
//                     setListType("following");
//                     setListOpen(true);
//                   }}
//                 >
//                   <p className="text-[15px] font-bold text-white group-hover:text-white/80 transition-colors">
//                     {user?.following?.length}
//                   </p>
//                   <p className="text-xs text-white/45 mt-0.5 tracking-wide">
//                     following
//                   </p>
//                 </div>
//               </div>

//               {/* USERNAME + FULLNAME + BIO */}
//               <div className="space-y-1.5">
//                 <div className="flex items-center gap-2">
//                   <span
//                     className={`text-[14px] tracking-wide transition-all duration-200 ${
//                       isMe
//                         ? "font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
//                         : "font-semibold text-white/90 hover:text-white"
//                     }`}
//                   >
//                     {isMe ? `@${user?.username}` : user?.username}
//                   </span>
//                 </div>
//                 {user?.fullName && (
//                   <p className="text-[13px] text-white font-medium">
//                     {user.fullName}
//                   </p>
//                 )}
//                 <p className="text-[13px] text-white/60 leading-relaxed">
//                   {user?.bio || "Welcome to my profile ✨"}
//                 </p>
//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="flex gap-2.5">
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
//                 ) : (
//                   <button
//                     onClick={handleFollowUser}
//                     disabled={isFollowing}
//                     className={`flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg active:scale-95 transition-all duration-150 tracking-wide ${
//                       isFollowing
//                         ? "border border-white/15 text-white/80 hover:bg-white/8 hover:text-white"
//                         : "bg-indigo-600 hover:bg-indigo-500 text-white"
//                     }`}
//                   >
//                     {isFollowing ? "Following" : "Follow"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* DIVIDER */}
//           <div className="border-t border-white/10" />

//           {/* POSTS */}
//           {user?.postsCount === 0 ? (
//             <div className="mt-16 flex flex-col items-center justify-center gap-3 text-white/30">
//               <span className="text-5xl opacity-40">📷</span>
//               <p className="text-sm tracking-wide">No posts yet</p>
//             </div>
//           ) : (
//             <ProfilePosts userId={user?._id} />
//           )}

//           {/* MODALS */}
//           <ProfilePhotoModal
//             open={open}
//             onClose={() => setOpen(false)}
//             onUpload={handleUploadClick}
//             onRemove={handleRemovePhoto}
//           />
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//         </div>

//         <CreatePostModal
//           open={createOpen}
//           onClose={() => setCreateOpen(false)}
//         />

//         <FollowersFollowingModal
//           open={listOpen}
//           onClose={() => setListOpen(false)}
//           title={listType === "followers" ? "Followers" : "Following"}
//           ids={listType === "followers" ? user?.followers : user?.following}
//         />
//       </div>
//     );
//   }
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
import { Home } from "lucide-react";

function ProfileView() {
  const { user: authUser, setUser } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();
  console.log("authUser in ProfileView:", authUser);

  const [open, setOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState(null);
  const fileInputRef = useRef(null);
  const [followed, setFollowed] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [user, setProfileUser] = useState(null);
  const [visible, setVisible] = useState(false); // ← fade-in trigger

  console.log(authUser);

  useEffect(() => {
    setLoadingProfile(true);
    setVisible(false); // reset fade on every profile change
    if (username) {
      const fetchProfile = async () => {
        try {
          const res = await fetchData(`/api/users/profile/${username}`, {
            credentials: "include",
          });
          if (!res.ok) throw new Error();
          const data = await res.json();
          console.log("Fetched profile data:", data);
          setProfileUser(data);
        } catch {
          setProfileUser(null);
        } finally {
          setLoadingProfile(false);
        }
      };
      fetchProfile();
    } else {
      setProfileUser(authUser);
      setLoadingProfile(false);
    }
  }, [username, authUser]);

  // once loading is done, trigger fade-in on next tick
  useEffect(() => {
    if (!loadingProfile && user) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }
  }, [loadingProfile, user]);

  const [createOpen, setCreateOpen] = useState(false);

  const isMe = user?._id === authUser?._id;

  const isFollowing =
    !!authUser &&
    !!user &&
    user.followers?.some((id) => id.toString() === authUser._id.toString());

  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  useEffect(() => {
    if (followed) {
      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          following: [...prevUser.following, user._id],
        };
      });
    }
  }, [followed, user, setUser]);

  const handleFollowUser = async () => {
    if (!user?._id || isFollowing) return;
    try {
      await fetchData(`/api/users/${user._id}/follow`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      setProfileUser((prev) => ({
        ...prev,
        followers: [...prev.followers, authUser._id.toString()],
      }));
    } catch (err) {
      console.error("Follow error:", err);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }
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
      console.log("Remove profile photo");
      const res = await fetchData("/api/upload/profile-picture", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Failed to remove photo");
      }
      const data = await res.json();
      console.log("Profile photo removed:", data);
      window.location.reload();
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  };

  if (loadingProfile || !user) {
    return <ProfileSkeleton />;
  }

  return (
    <div
      className="bg-black text-white overflow-y-auto h-[calc(100vh-72px-56px)] md:h-[calc(100vh-80px-56px)] flex justify-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      {/* CENTER COLUMN */}
      <div className="w-full max-w-[935px] px-4 pt-8 pb-10">
        {/* GO BACK / HOME BUTTONS */}
        {!isMe && (
          <div className="mb-5 flex items-center gap-1">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
            >
              <span className="text-base leading-none">←</span>
              <span className="hidden sm:inline tracking-wide">Back</span>
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
            >
              <Home size={18} />
              <span className="hidden sm:inline tracking-wide">Home</span>
            </button>
          </div>
        )}

        {isMe && (
          <div className="mb-5 flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/8 transition-all duration-150 active:scale-95"
            >
              <Home size={18} />{" "}
              <span className="hidden sm:inline tracking-wide">Home</span>
            </button>
          </div>
        )}

        {/* PROFILE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-7 sm:gap-14 mb-8">
          {/* AVATAR */}
          <div
            onClick={isMe ? () => setOpen(true) : undefined}
            className={`flex justify-center sm:justify-start ${isMe ? "cursor-pointer" : ""}`}
          >
            <div
              className="
                w-24 h-24 sm:w-36 sm:h-36
                rounded-full overflow-hidden
                bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600
                flex items-center justify-center
                ring-[3px] ring-white/10
                transition-opacity duration-200
                hover:opacity-90
              "
            >
              {user?.profilePicture ? (
                <img
                  src={user?.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl sm:text-4xl font-semibold text-white">
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
                <p className="text-[15px] font-bold text-white">
                  {user?.postsCount || 0}
                </p>
                <p className="text-xs text-white/45 mt-0.5 tracking-wide">
                  posts
                </p>
              </div>
              <div
                className="text-center sm:text-left cursor-pointer group"
                onClick={() => {
                  setListType("followers");
                  setListOpen(true);
                }}
              >
                <p className="text-[15px] font-bold text-white group-hover:text-white/80 transition-colors">
                  {user?.followers?.length}
                </p>
                <p className="text-xs text-white/45 mt-0.5 tracking-wide">
                  followers
                </p>
              </div>
              <div
                className="text-center sm:text-left cursor-pointer group"
                onClick={() => {
                  setListType("following");
                  setListOpen(true);
                }}
              >
                <p className="text-[15px] font-bold text-white group-hover:text-white/80 transition-colors">
                  {user?.following?.length}
                </p>
                <p className="text-xs text-white/45 mt-0.5 tracking-wide">
                  following
                </p>
              </div>
            </div>

            {/* USERNAME + FULLNAME + BIO */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[14px] tracking-wide transition-all duration-200 ${
                    isMe
                      ? "font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                      : "font-semibold text-white/90 hover:text-white"
                  }`}
                >
                  {isMe ? `@${user?.username}` : user?.username}
                </span>
              </div>
              {user?.fullName && (
                <p className="text-[13px] text-white font-medium">
                  {user.fullName}
                </p>
              )}
              <p className="text-[13px] text-white/60 leading-relaxed">
                {user?.bio || "Welcome to my profile ✨"}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2.5">
              {isMe ? (
                <>
                  <button
                    onClick={() => setCreateOpen(true)}
                    className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 tracking-wide"
                  >
                    Create post
                  </button>
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg border border-white/15 hover:bg-white/8 active:scale-95 transition-all duration-150 tracking-wide text-white/80 hover:text-white"
                  >
                    Edit profile
                  </button>
                </>
              ) : (
                <button
                  onClick={handleFollowUser}
                  disabled={isFollowing}
                  className={`flex-1 px-4 py-2 text-[13px] font-semibold rounded-lg active:scale-95 transition-all duration-150 tracking-wide ${
                    isFollowing
                      ? "border border-white/15 text-white/80 hover:bg-white/8 hover:text-white"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10" />

        {/* POSTS */}
        {user?.postsCount === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-3 text-white/30">
            <span className="text-5xl opacity-40">📷</span>
            <p className="text-sm tracking-wide">No posts yet</p>
          </div>
        ) : (
          <ProfilePosts userId={user?._id} />
        )}

        {/* MODALS */}
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
      </div>

      <CreatePostModal open={createOpen} onClose={() => setCreateOpen(false)} />

      <FollowersFollowingModal
        open={listOpen}
        onClose={() => setListOpen(false)}
        title={listType === "followers" ? "Followers" : "Following"}
        ids={listType === "followers" ? user?.followers : user?.following}
      />
    </div>
  );
}

export default ProfileView;