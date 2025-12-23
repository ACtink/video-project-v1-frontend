import { useAuth } from "../../hooks/useAuth";

function ProfileView() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-2xl font-bold text-slate-900">
            {user.username?.[0]?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-white/70 text-sm">Member profile</p>
          </div>
        </div>

        {/* Profile details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white/10 rounded-xl px-4 py-3">
            <span className="text-white/70 text-sm">Username</span>
            <span className="font-medium">{user.username}</span>
          </div>

          <div className="flex justify-between items-center bg-white/10 rounded-xl px-4 py-3">
            <span className="text-white/70 text-sm">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>

          {/* Optional fields – render only if present */}
          {user.country && (
            <div className="flex justify-between items-center bg-white/10 rounded-xl px-4 py-3">
              <span className="text-white/70 text-sm">Country</span>
              <span className="font-medium">{user.country}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/20" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 transition active:scale-[0.98]">
            Edit Profile
          </button>

          <button className="flex-1 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 transition active:scale-[0.98]">
            Account Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
