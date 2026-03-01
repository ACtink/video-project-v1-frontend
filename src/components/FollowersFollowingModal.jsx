import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../utils/fetchData";

function FollowersFollowingModal({ open, onClose, title, ids = [] }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  // Smooth mount animation trigger
  useEffect(() => {
    if (open) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (ids.length === 0) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await fetchData("/api/users/by-ids", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ids }),
        });

        const data = await res.json();
        console.log("Fetched users for modal:", data);
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
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-300
    px-4 sm:px-6
    ${show ? "bg-black/70 backdrop-blur-sm" : "bg-black/0"}
  `}
    >
      {/* MODAL */}
      <div
        className={`w-full max-w-md bg-black border border-white/20 rounded-xl overflow-hidden shadow-2xl
          transform transition-all duration-300
          ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
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
          {loading && (
            <div className="p-4 space-y-4 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-32 bg-white/10 rounded" />
                    <div className="h-3 w-20 bg-white/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && users.length === 0 && (
            <p className="text-center text-white/60 py-6 text-sm">
              No users found
            </p>
          )}

          {!loading &&
            users.map((u, index) => {
              const isFollowing = u.isFollowing; // backend should send this

              return (
                <div
                  key={u._id}
                  className="flex items-center justify-between px-4 py-3
          hover:bg-white/10 transition-all duration-300
          opacity-0 translate-y-2 animate-fadeInUp"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  {/* LEFT SIDE — Avatar + Name */}
                  <div
                    onClick={() => {
                      onClose();
                      navigate(`/profile/${u.username}`);
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
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

                  {/* RIGHT SIDE — Follow / Message button */}
                  {isFollowing ? (
                    <button
                      onClick={async () => {
                        try {
                          const res = await fetchData(
                            `/api/chat/start/${u._id}`,
                            {
                              method: "POST",
                              credentials: "include",
                            },
                          );

                          const data = await res.json();
                          console.log("Started chat with user:", data);

                          navigate(
                            `/chat?conversation=${data._id}`,
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="px-3 py-1 text-xs font-semibold rounded-lg
  border border-white/30 text-white hover:bg-white/10 transition"
                    >
                      Message
                    </button>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          await fetchData(`/api/users/${u._id}/follow`, {
                            method: "POST",
                            credentials: "include",
                          });

                          setUsers((prev) =>
                            prev.map((x) =>
                              x._id === u._id ? { ...x, isFollowing: true } : x,
                            ),
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="px-3 py-1 text-xs font-semibold rounded-lg
              bg-indigo-600 hover:bg-indigo-700 text-white transition"
                    >
                      Follow
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default FollowersFollowingModal;
