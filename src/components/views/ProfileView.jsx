import { useAuth } from "../../hooks/useAuth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePhotoModal from "../ProfilePhotoModal";
import FollowersFollowingModal from "../FollowersFollowingModal";
import CreatePostModal from "../CreatePostModal";
import ProfilePosts from "../ProfilePosts";

function ProfileView({ user: profileUser }) {
  const { user: authUser , setUser } = useAuth();
  const navigate = useNavigate();

  // ✅ HOOKS MUST ALWAYS RUN
  const [open, setOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState(null);
  const fileInputRef = useRef(null);

  console.log("ProfileView render:", { profileUser, authUser });

  let user = profileUser || authUser;

const [createOpen, setCreateOpen] = useState(false);



  

  // if (!user) return null; // ✅ SAFE NOW

  const isMe = user._id === authUser?._id;

  const isFollowing =
    !!authUser &&
    !!profileUser &&
    profileUser.followers?.some(
      (id) => id.toString() === authUser._id.toString(),
    );


  // Open file picker
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


   const handleFollowUser = async () => {
     try {
       const res = await fetch(
         `http://localhost:3000/api/users/${profileUser?._id}/follow`,
         {
           method: "POST",
           credentials: "include",
           headers: { "Content-Type": "application/json" },
         },
       );

     } catch (err) {
       console.error("Follow error:", err);
     }
   };

  // Handle file selection
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

      const res = await fetch(
        "http://localhost:3000/api/upload/profile-picture",
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const updatedUser = await res.json();

      // 🔥 update auth context
      setUser(updatedUser);

      setOpen(false);
    } catch (err) {
      console.error("Profile picture upload failed", err);
      alert("Failed to upload profile picture");
    } finally {
      e.target.value = "";
    }
  }
  // Remove photo
 const handleRemovePhoto = async () => {
   try {
     console.log("Remove profile photo");

     const res = await fetch(
       "http://localhost:3000/api/upload/profile-picture",
       {
         method: "DELETE",
         credentials: "include",
       },
     );

     if (!res.ok) {
       const err = await res.json();
       throw new Error(err?.error || "Failed to remove photo");
     }

     const data = await res.json();
     console.log("Profile photo removed:", data);

     // ✅ optional: refresh UI
     // 1) simplest (for now)
     window.location.reload();

     // 2) later you can update user state instead

     setOpen(false);
   } catch (err) {
     console.error(err);
     alert(err.message || "Something went wrong");
   }
 };


  return (
    <div className="min-h-screen bg-black text-white flex justify-center overflow-y-auto">
      {/* CENTER COLUMN */}
      <div className="w-full max-w-[935px] px-4 pt-10">
        {/* GO BACK BUTTON */}
        {!isMe && (
          <div className="mb-4 flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm sm:text-base px-2 py-1 rounded-lg hover:bg-white/10 transition"
            >
              <span className="text-lg sm:text-xl">←</span>
              <span className="hidden sm:inline">Go back</span>
            </button>
          </div>
        )}

        {/* PROFILE HEADER */}
        <div className="flex flex-col justify-between sm:flex-row sm:items-start gap-8">
          {/* AVATAR */}
          <div
            onClick={isMe ? () => setOpen(true) : undefined}
            className={`flex justify-center sm:justify-start ${
              isMe ? "cursor-pointer" : ""
            }`}
          >
            <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden  bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl sm:text-4xl font-semibold">
                  {user.username?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-4 w-full max-w-xl">
            {/* STATS */}
            <div className="flex justify-around sm:justify-start gap-6 text-sm">
              <div className="text-center sm:text-left">
                <span className="font-semibold">{user.postsCount || 0}</span>
                <div className="text-white/70">posts</div>
              </div>

              <div
                className="text-center sm:text-left cursor-pointer"
                onClick={() => {
                  setListType("followers");
                  setListOpen(true);
                }}
              >
                <span className="font-semibold">{user.followers.length}</span>
                <div className="text-white/70">followers</div>
              </div>

              <div
                className="text-center sm:text-left cursor-pointer"
                onClick={() => {
                  setListType("following");
                  setListOpen(true);
                }}
              >
                <span className="font-semibold">{user.following.length}</span>
                <div className="text-white/70">following</div>
              </div>
            </div>

            {/* USERNAME + BIO */}
            <div className="text-sm leading-snug">
              <p className="font-semibold">{user.fullName || user.username}</p>
              <p className="text-white/80">
                {user.bio || "Welcome to my profile ✨"}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-2">
              {isMe ? (
                <>
                  <button
                    onClick={() => setCreateOpen(true)}
                    className="flex-1 px-4 py-1.5 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
                  >
                    Create post
                  </button>
                  <button className="flex-1 px-4 py-1.5 text-sm rounded-lg border border-white/20 hover:bg-white/10">
                    Edit profile
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleFollowUser}
                    disabled={isFollowing}
                    className={`flex-1 px-4 py-1.5 text-sm rounded-lg transition ${
                      isFollowing
                        ? "border border-white/30 text-white hover:bg-white/10"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>

                  {/* <button className="flex-1 px-4 py-1.5 text-sm rounded-lg border border-white/20 hover:bg-white/10">
                    Message
                  </button> */}
                </>
              )}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-12 border-t border-white/20" />

        {/* OPTIONAL INFO SECTION */}
        {/* <div className="mt-6 max-w-xl text-sm space-y-4">
          <div className="flex justify-between">
            <span className="text-white/60">Username</span>
            <span>{user.username}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/60">Email</span>
            <span>{user.email}</span>
          </div>
        </div> */}

        <ProfilePosts userId={user._id} />

        {/* 🔽 MODAL (MUST BE HERE) */}
        <ProfilePhotoModal
          open={open}
          onClose={() => setOpen(false)}
          onUpload={handleUploadClick}
          onRemove={handleRemovePhoto}
        />

        {/* 🔽 HIDDEN FILE INPUT (MUST BE HERE) */}
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
        ids={listType === "followers" ? user.followers : user.following}
      />
    </div>
  );
}

export default ProfileView;
