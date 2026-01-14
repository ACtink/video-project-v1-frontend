import { useAuth } from "../../hooks/useAuth";
import { useRef, useState } from "react";
import ProfilePhotoModal from "../ProfilePhotoModal";

function ProfileView() {
  const { user } = useAuth();
  if (!user) return null;

  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Open file picker
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Selected file:", file);

    // TODO: upload to backend
    setOpen(false);
  };

  // Remove photo
  const handleRemovePhoto = () => {
    console.log("Remove profile photo");

    // TODO: call backend API
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      {/* CENTER COLUMN */}
      <div className="w-full max-w-[935px] px-4 pt-10">
        {/* PROFILE HEADER */}
        <div className="flex flex-col justify-between sm:flex-row sm:items-start gap-8">
          {/* AVATAR */}
          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer flex justify-center sm:justify-start"
          >
            <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl font-semibold">
              {user.username?.[0]?.toUpperCase() || "U"}
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

              <div className="text-center sm:text-left cursor-pointer">
                <span className="font-semibold">{user.followers.length}</span>
                <div className="text-white/70">followers</div>
              </div>

              <div className="text-center sm:text-left cursor-pointer">
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
              <button className="flex-1 px-4 py-1.5 text-sm rounded-lg border border-white/20 hover:bg-white/10 transition">
                Edit profile
              </button>
              <button className="flex-1 px-4 py-1.5 text-sm rounded-lg border border-white/20 hover:bg-white/10 transition">
                Message
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-12 border-t border-white/20" />

        {/* OPTIONAL INFO SECTION */}
        <div className="mt-6 max-w-xl text-sm space-y-4">
          <div className="flex justify-between">
            <span className="text-white/60">Username</span>
            <span>{user.username}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/60">Email</span>
            <span>{user.email}</span>
          </div>
        </div>

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
    </div>
  );
}

export default ProfileView;
