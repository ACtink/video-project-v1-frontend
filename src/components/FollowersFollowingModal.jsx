import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FollowersFollowingModal({ open, onClose, title, ids = [] }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();


  useEffect(() => {
    if (!open) return;

    if (ids.length === 0) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://service.weblinkup.online/api/users/by-ids",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ ids }),
          },
        );

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [open, ids]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center">
      {/* MODAL */}
      <div className="w-full max-w-md bg-black border border-white/20 rounded-xl overflow-hidden shadow-xl transition-opacity duration-150">
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-white/20">
          <h3 className="font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="max-h-[60vh] overflow-y-auto">
          {!loading && (
            <>
              {users.length === 0 ? (
                <p className="text-center text-white/60 py-6 text-sm">
                  No users found
                </p>
              ) : (
                users.map((u) => (
                  <div
                    key={u._id}
                    onClick={() => {
                      onClose(); // close modal
                      navigate(`/profile/${u.username}`);
                    }}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/10 transition"
                  >
                    {/* Avatar */}
                    {u.profilePicture ? (
                      <img
                        src={u.profilePicture}
                        alt={u.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-semibold text-white">
                        {u.username?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}

                    {/* User info */}
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">
                        {u.username}
                      </span>
                      {u.fullName && (
                        <span className="text-xs text-white/60">
                          {u.fullName}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowersFollowingModal;
