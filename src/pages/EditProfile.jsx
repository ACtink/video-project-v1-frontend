// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import fetchData from "../utils/fetchData";

// function EditProfile() {
//   const { user, setUser } = useAuth();
//   const navigate = useNavigate();

//   const [fullName, setFullName] = useState(user?.fullName || "");
//   const [bio, setBio] = useState(user?.bio || "");

//   const [loading, setLoading] = useState(false);

//   const handleSave = async () => {
//     try {
//       setLoading(true);

//       const res = await fetchData("/api/users/edit-profile", {
//         method: "PATCH",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fullName,
//           bio,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to update profile");

//       const updatedUser = await res.json();

//       setUser(updatedUser);

//       navigate(`/profile`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-black text-white min-h-screen flex justify-center">
//       <div className="w-full max-w-xl px-6 py-10 space-y-6">
//         <h1 className="text-xl font-semibold">Edit Profile</h1>

//         {/* USERNAME */}
//         <div className="flex flex-col gap-1">
//           <label className="text-sm text-white/60">Username</label>
//           <input
//             value={user?.username}
//             disabled
//             className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/60"
//           />
//         </div>

//         {/* FULL NAME */}
//         <div className="flex flex-col gap-1">
//           <label className="text-sm text-white/60">Full Name</label>
//           <input
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-white/30"
//           />
//         </div>

//         {/* BIO */}
//         <div className="flex flex-col gap-1">
//           <label className="text-sm text-white/60">Bio</label>
//           <textarea
//             value={bio}
//             maxLength={150}
//             onChange={(e) => setBio(e.target.value)}
//             className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-white/30"
//             rows={3}
//           />
//           <span className="text-xs text-white/40">{bio.length}/150</span>
//         </div>

//         {/* BUTTONS */}
//         <div className="flex gap-3 pt-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex-1 border border-white/20 rounded-lg py-2 hover:bg-white/10 transition"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg py-2 transition"
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditProfile;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import fetchData from "../utils/fetchData";
import { ArrowLeft, User, FileText, AtSign, Check } from "lucide-react";

function EditProfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetchData("/api/users/edit-profile", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, bio }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updatedUser = await res.json();
      setUser(updatedUser);
      navigate(`/profile`);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* ── STICKY HEADER ── */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-90 transition-all duration-150 text-white/70 hover:text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="flex-1 text-[15px] font-semibold tracking-tight">
          Edit Profile
        </h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 text-[13px] font-semibold tracking-wide"
        >
          {loading ? (
            <span className="flex items-center gap-1.5">
              <svg
                className="animate-spin w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
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
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Saving
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Check size={13} strokeWidth={2.5} />
              Save
            </span>
          )}
        </button>
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-lg space-y-2">
          {/* AVATAR PREVIEW */}
          <div className="flex flex-col items-center gap-3 pb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center ring-2 ring-white/10">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-white">
                  {user?.username?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <p className="text-[13px] text-white/40 tracking-wide">
              Change photo from your profile page
            </p>
          </div>

          {/* SECTION LABEL */}
          <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest px-1 pb-1">
            Account info
          </p>

          {/* FIELDS CARD */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden divide-y divide-white/10">
            {/* USERNAME — disabled */}
            <div className="flex items-center gap-4 px-4 py-4">
              <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center flex-shrink-0">
                <AtSign size={14} className="text-white/40" />
              </div>
              <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                <label className="text-[11px] text-white/35 tracking-wide uppercase">
                  Username
                </label>
                <input
                  value={user?.username}
                  disabled
                  className="bg-transparent text-[14px] text-white/35 focus:outline-none w-full cursor-not-allowed"
                />
              </div>
              <span className="text-[10px] text-white/20 bg-white/5 border border-white/10 rounded-full px-2 py-0.5 tracking-wide flex-shrink-0">
                locked
              </span>
            </div>

            {/* FULL NAME */}
            <div className="flex items-center gap-4 px-4 py-4">
              <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-white/50" />
              </div>
              <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                <label className="text-[11px] text-white/35 tracking-wide uppercase">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="bg-transparent text-[14px] text-white placeholder-white/20 focus:outline-none w-full"
                />
              </div>
            </div>
          </div>

          {/* BIO SECTION */}
          <div className="pt-6 space-y-2">
            <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest px-1 pb-1">
              Bio
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <div className="flex gap-4 px-4 pt-4 pb-2">
                <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText size={14} className="text-white/50" />
                </div>
                <textarea
                  value={bio}
                  maxLength={150}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell people about yourself…"
                  rows={4}
                  className="flex-1 bg-transparent text-[14px] text-white placeholder-white/20 focus:outline-none resize-none leading-relaxed"
                />
              </div>
              <div className="flex justify-end px-4 pb-3">
                <span
                  className={`text-[11px] tabular-nums transition-colors ${bio.length > 130 ? "text-amber-400" : "text-white/25"}`}
                >
                  {bio.length}/150
                </span>
              </div>
            </div>
          </div>

          {/* CANCEL LINK */}
          <div className="flex justify-center pt-6">
            <button
              onClick={() => navigate(-1)}
              className="text-[13px] text-white/35 hover:text-white/60 active:scale-95 transition-all duration-150 tracking-wide px-4 py-2"
            >
              Discard changes
            </button>
          </div>
          <div className="h-16 bg-black">

          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;