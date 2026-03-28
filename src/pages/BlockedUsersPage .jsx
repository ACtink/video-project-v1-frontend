import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldOff } from "lucide-react";
import fetchData from "../utils/fetchData";

function ConfirmModal({ username, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-[300px] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/8 text-center">
          <p className="text-[15px] font-bold text-white">
            Unblock @{username}?
          </p>
          <p className="text-[12px] text-white/45 mt-1.5 leading-relaxed">
            They will be able to see your posts and find your profile again.
          </p>
        </div>
        <button
          onClick={onConfirm}
          className="w-full px-6 py-3.5 text-[13px] font-semibold text-indigo-400 hover:bg-white/6 transition-colors duration-100 border-b border-white/8"
        >
          Unblock
        </button>
        <button
          onClick={onCancel}
          className="w-full px-6 py-3.5 text-[13px] font-medium text-white/60 hover:bg-white/6 transition-colors duration-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="w-10 h-10 rounded-full bg-white/8 flex-shrink-0 animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-32 bg-white/8 rounded-full animate-pulse" />
        <div className="h-2.5 w-20 bg-white/5 rounded-full animate-pulse" />
      </div>
      <div className="w-20 h-8 bg-white/8 rounded-lg animate-pulse" />
    </div>
  );
}

export default function BlockedUsersPage() {
  const navigate = useNavigate();
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmUser, setConfirmUser] = useState(null); // user to unblock
  const [unblocking, setUnblocking] = useState(null); // id being unblocked

  const fetchBlocked = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchData("/api/users/blocked", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch blocked users");
      const data = await res.json();
      setBlockedUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlocked();
  }, [fetchBlocked]);

  const handleUnblock = async () => {
    if (!confirmUser) return;
    try {
      setUnblocking(confirmUser._id);
      await fetchData(`/api/users/${confirmUser._id}/block`, {
        method: "DELETE",
        credentials: "include",
      });
      setBlockedUsers((prev) => prev.filter((u) => u._id !== confirmUser._id));
    } catch (err) {
      console.error("Unblock error:", err);
    } finally {
      setUnblocking(null);
      setConfirmUser(null);
    }
  };

  return (
    <div className="bg-black text-white min-h-[calc(100vh-72px-56px)] md:min-h-[calc(100vh-80px-56px)] overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150 active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-[20px] font-bold text-white tracking-tight">
            Blocked Users
          </h1>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden divide-y divide-white/8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <p className="text-[13px] text-red-400">{error}</p>
              <button
                onClick={fetchBlocked}
                className="px-5 py-2 text-[13px] font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150"
              >
                Retry
              </button>
            </div>
          ) : blockedUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <ShieldOff size={20} className="text-white/20" />
              </div>
              <p className="text-[14px] text-white/30">No blocked users</p>
            </div>
          ) : (
            blockedUsers.map((u) => (
              <div key={u._id} className="flex items-center gap-4 px-5 py-4">
                {/* Avatar */}
                <div
                  onClick={() => navigate(`/profile/${u.username}`)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer ring-2 ring-white/10 hover:opacity-80 transition-opacity"
                >
                  {u.profilePicture ? (
                    <img
                      src={u.profilePicture}
                      alt={u.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[14px] font-bold text-white">
                      {u.username?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => navigate(`/profile/${u.username}`)}
                >
                  <p className="text-[14px] font-semibold text-white/90 truncate">
                    @{u.username}
                  </p>
                  {u.fullName && (
                    <p className="text-[12px] text-white/35 truncate">
                      {u.fullName}
                    </p>
                  )}
                </div>

                {/* Unblock button */}
                <button
                  onClick={() => setConfirmUser(u)}
                  disabled={unblocking === u._id}
                  className="px-4 py-1.5 text-[12px] font-semibold rounded-lg border border-white/15 text-white/70 hover:text-white hover:bg-white/8 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {unblocking === u._id ? "..." : "Unblock"}
                </button>
              </div>
            ))
          )}
        </div>

        {blockedUsers.length > 0 && !loading && (
          <p className="text-center text-[11px] text-white/20 mt-4">
            {blockedUsers.length} blocked{" "}
            {blockedUsers.length === 1 ? "user" : "users"}
          </p>
        )}
      </div>

      {confirmUser && (
        <ConfirmModal
          username={confirmUser.username}
          onConfirm={handleUnblock}
          onCancel={() => setConfirmUser(null)}
        />
      )}
    </div>
  );
}
