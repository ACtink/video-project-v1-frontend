// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import fetchData from "../utils/fetchData";
// import { useAuth } from "../hooks/useAuth";

// function FollowersFollowingModal({ open, onClose, title, ids = [] }) {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState(false);

//     const { user: authUser, setUser } = useAuth();

//   const navigate = useNavigate();

//     const isMe = authUser?._id;

//   // Smooth mount animation trigger
//   useEffect(() => {
//     if (open) {
//       setTimeout(() => setShow(true), 10);
//     } else {
//       setShow(false);
//     }
//   }, [open]);

//   useEffect(() => {
//     if (!open) return;

//     if (ids.length === 0) {
//       setUsers([]);
//       return;
//     }

//     const fetchUsers = async () => {
//       try {
//         setLoading(true);

//         const res = await fetchData("/api/users/by-ids", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({ ids }),
//         });

//         const data = await res.json();
//         console.log("Fetched users for modal:", data);
//         setUsers(data);
//       } catch (err) {
//         console.error("Failed to load users", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [open, ids]);

//   if (!open) return null;

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-300
//     px-4 sm:px-6
//     ${show ? "bg-black/70 backdrop-blur-sm" : "bg-black/0"}
//   `}
//     >
//       {/* MODAL */}
//       <div
//         className={`w-full max-w-md bg-black border border-white/20 rounded-xl overflow-hidden shadow-2xl
//           transform transition-all duration-300
//           ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}
//         `}
//       >
//         {/* HEADER */}
//         <div className="flex justify-between items-center px-4 py-3 border-b border-white/20">
//           <h3 className="font-semibold text-white">{title}</h3>
//           <button
//             onClick={onClose}
//             className="text-white/60 hover:text-white text-lg"
//           >
//             ✕
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="max-h-[60vh] overflow-y-auto">
//           {loading && (
//             <div className="p-4 space-y-4 animate-pulse">
//               {[...Array(6)].map((_, i) => (
//                 <div key={i} className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-white/10" />
//                   <div className="flex-1 space-y-2">
//                     <div className="h-3 w-32 bg-white/10 rounded" />
//                     <div className="h-3 w-20 bg-white/10 rounded" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {!loading && users.length === 0 && (
//             <p className="text-center text-white/60 py-6 text-sm">
//               No users found
//             </p>
//           )}

//           {!loading &&
//             users.map((u, index) => {
//               const isFollowing = u.isFollowing; // backend should send this

//               return (
//                 <div
//                   key={u._id}
//                   className="flex items-center justify-between px-4 py-3
//           hover:bg-white/10 transition-all duration-300
//           opacity-0 translate-y-2 animate-fadeInUp"
//                   style={{ animationDelay: `${index * 40}ms` }}
//                 >
//                   {/* LEFT SIDE — Avatar + Name */}
//                   <div
//                     onClick={() => {
//                       onClose();
//                       navigate(`/profile/${u.username}`);
//                     }}
//                     className="flex items-center gap-3 cursor-pointer flex-1"
//                   >
//                     {u.profilePicture ? (
//                       <img
//                         src={u.profilePicture}
//                         alt={u.username}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-semibold text-white">
//                         {u.username?.[0]?.toUpperCase() || "U"}
//                       </div>
//                     )}

//                     <div className="flex flex-col">
//                       <span className="text-sm font-semibold text-white">
//                         {u.username}
//                       </span>
//                       {u.fullName && (
//                         <span className="text-xs text-white/60">
//                           {u.fullName}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* RIGHT SIDE — Follow / Message button */}
//                   {isFollowing ? (
//                     <button
//                       onClick={async () => {
//                         try {
//                           const res = await fetchData(
//                             `/api/chat/start/${u._id}`,
//                             {
//                               method: "POST",
//                               credentials: "include",
//                             },
//                           );

//                           const data = await res.json();
//                           console.log("Started chat with user:", data);

//                           navigate(
//                             `/chat?conversation=${data._id}`,
//                           );
//                         } catch (err) {
//                           console.error(err);
//                         }
//                       }}
//                       className="px-3 py-1 text-xs font-semibold rounded-lg
//   border border-white/30 text-white hover:bg-white/10 transition"
//                     >
//                       Message
//                     </button>
//                   ) : (
//                     <button
//                       onClick={async () => {
//                         try {
//                           await fetchData(`/api/users/${u._id}/follow`, {
//                             method: "POST",
//                             credentials: "include",
//                           });

//                           setUsers((prev) =>
//                             prev.map((x) =>
//                               x._id === u._id ? { ...x, isFollowing: true } : x,
//                             ),
//                           );
//                         } catch (err) {
//                           console.error(err);
//                         }
//                       }}
//                       className="px-3 py-1 text-xs font-semibold rounded-lg
//               bg-indigo-600 hover:bg-indigo-700 text-white transition"
//                     >
//                       Follow
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FollowersFollowingModal;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import fetchData from "../utils/fetchData";
// import { useAuth } from "../hooks/useAuth";
// import {
//   X,
//   MessageCircle,
//   UserPlus,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// const PAGE_SIZE = 8;

// function FollowersFollowingModal({ open, onClose, title, ids = [] }) {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState(false);
//   const [page, setPage] = useState(1);

//   const { user: authUser } = useAuth();
//   const navigate = useNavigate();

//   const totalPages = Math.ceil(users.length / PAGE_SIZE);
//   const paginatedUsers = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   useEffect(() => {
//     if (open) {
//       setTimeout(() => setShow(true), 10);
//     } else {
//       setShow(false);
//       setPage(1); // reset page on close
//     }
//   }, [open]);

//   useEffect(() => {
//     if (!open) return;
//     if (ids.length === 0) {
//       setUsers([]);
//       return;
//     }
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const res = await fetchData("/api/users/by-ids", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({ ids }),
//         });
//         const data = await res.json();
//         setUsers(data);
//         setPage(1);
//       } catch (err) {
//         console.error("Failed to load users", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, [open, ids]);

//   if (!open) return null;

//   return (
//     <div
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//       className={`
//         fixed inset-0 z-[999]
//         flex items-center justify-center
//         px-4
//         transition-all duration-300
//         ${show ? "bg-black/80 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none"}
//       `}
//     >
//       <div
//         className={`
//           w-full max-w-sm
//           bg-[#0f0f0f]
//           border border-white/10
//           rounded-2xl
//           overflow-hidden shadow-2xl
//           flex flex-col
//           transition-all duration-300 ease-out
//           ${show ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"}
//         `}
//         style={{ maxHeight: "min(75vh, 560px)" }}
//       >
//         {/* ── HEADER ── */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
//           <div className="flex items-center gap-2">
//             <h3 className="text-[15px] font-semibold text-white tracking-tight">
//               {title}
//             </h3>
//             {users.length > 0 && !loading && (
//               <span className="text-[11px] text-white/30 bg-white/8 px-2 py-0.5 rounded-full tabular-nums">
//                 {ids.length}
//               </span>
//             )}
//           </div>
//           <button
//             onClick={onClose}
//             className="w-7 h-7 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white active:scale-90 transition-all duration-150"
//           >
//             <X size={13} strokeWidth={2.5} />
//           </button>
//         </div>

//         {/* ── BODY ── */}
//         <div
//           className="overflow-y-auto overscroll-contain flex-1 min-h-0"
//           style={{ WebkitOverflowScrolling: "touch" }}
//         >
//           {/* LOADING SKELETON */}
//           {loading && (
//             <div className="px-2 py-2 space-y-1">
//               {[...Array(PAGE_SIZE)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-3 px-3 py-2.5 rounded-xl animate-pulse"
//                 >
//                   <div className="w-10 h-10 rounded-full bg-white/8 flex-shrink-0" />
//                   <div className="flex-1 space-y-2">
//                     <div className="h-2.5 bg-white/8 rounded-full w-1/2" />
//                     <div className="h-2 bg-white/5 rounded-full w-1/3" />
//                   </div>
//                   <div className="w-16 h-7 rounded-full bg-white/8 flex-shrink-0" />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* EMPTY STATE */}
//           {!loading && users.length === 0 && (
//             <div className="flex flex-col items-center justify-center py-14 gap-2 text-white/25">
//               <span className="text-3xl">👤</span>
//               <p className="text-[13px] tracking-wide">No users yet</p>
//             </div>
//           )}

//           {/* USER LIST */}
//           {!loading && paginatedUsers.length > 0 && (
//             <div className="px-2 py-2">
//               {paginatedUsers.map((u, index) => {
//                 const isFollowing = u.isFollowing;
//                 const isMyOwnRow = authUser?._id === u._id;

//                 return (
//                   <div
//                     key={u._id}
//                     className="
//                       flex items-center justify-between
//                       px-3 py-2.5 rounded-xl
//                       hover:bg-white/5 active:bg-white/8
//                       transition-all duration-150
//                       opacity-0 animate-fadeInUp
//                     "
//                     style={{ animationDelay: `${index * 35}ms` }}
//                   >
//                     {/* LEFT — Avatar + Name */}
//                     <div
//                       onClick={() => {
//                         onClose();
//                         navigate(`/profile/${u.username}`);
//                       }}
//                       className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
//                     >
//                       <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10">
//                         {u.profilePicture ? (
//                           <img
//                             src={u.profilePicture}
//                             alt={u.username}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full bg-indigo-600/80 flex items-center justify-center">
//                             <span className="text-sm font-semibold text-white">
//                               {u.username?.[0]?.toUpperCase() || "U"}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex flex-col min-w-0">
//                         <span className="text-[13.5px] font-semibold text-white leading-tight truncate">
//                           {u.username}
//                           {isMyOwnRow && (
//                             <span className="ml-1.5 text-[10px] font-normal text-white/30 tracking-wide">
//                               you
//                             </span>
//                           )}
//                         </span>
//                         {u.fullName && (
//                           <span className="text-[12px] text-white/40 leading-tight truncate">
//                             {u.fullName}
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* RIGHT — Action button (hidden for own row) */}
//                     {!isMyOwnRow && (
//                       <div className="flex-shrink-0 ml-3">
//                         {isFollowing ? (
//                           <button
//                             onClick={async () => {
//                               try {
//                                 const res = await fetchData(
//                                   `/api/chat/start/${u._id}`,
//                                   {
//                                     method: "POST",
//                                     credentials: "include",
//                                   },
//                                 );
//                                 const data = await res.json();
//                                 navigate(`/chat?conversation=${data._id}`);
//                               } catch (err) {
//                                 console.error(err);
//                               }
//                             }}
//                             className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border border-white/15 text-white/70 hover:text-white hover:bg-white/8 active:scale-90 transition-all duration-150"
//                           >
//                             <MessageCircle size={12} />
//                             Message
//                           </button>
//                         ) : (
//                           <button
//                             onClick={async () => {
//                               try {
//                                 await fetchData(`/api/users/${u._id}/follow`, {
//                                   method: "POST",
//                                   credentials: "include",
//                                 });
//                                 setUsers((prev) =>
//                                   prev.map((x) =>
//                                     x._id === u._id
//                                       ? { ...x, isFollowing: true }
//                                       : x,
//                                   ),
//                                 );
//                               } catch (err) {
//                                 console.error(err);
//                               }
//                             }}
//                             className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white active:scale-90 transition-all duration-150"
//                           >
//                             <UserPlus size={12} />
//                             Follow
//                           </button>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* ── PAGINATION FOOTER ── */}
//         {!loading && totalPages > 1 && (
//           <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-t border-white/10">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed active:scale-90 transition-all duration-150"
//             >
//               <ChevronLeft size={14} />
//             </button>

//             <div className="flex items-center gap-1.5">
//               {Array.from({ length: totalPages }).map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setPage(i + 1)}
//                   className={`
//                     transition-all duration-200 rounded-full
//                     ${
//                       page === i + 1
//                         ? "w-5 h-2 bg-white"
//                         : "w-2 h-2 bg-white/20 hover:bg-white/40"
//                     }
//                   `}
//                 />
//               ))}
//             </div>

//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed active:scale-90 transition-all duration-150"
//             >
//               <ChevronRight size={14} />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default FollowersFollowingModal;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../utils/fetchData";
import { useAuth } from "../hooks/useAuth";
import {
  X,
  MessageCircle,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PAGE_SIZE = 8;

function FollowersFollowingModal({ open, onClose, title, ids = [] }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [navigatingTo, setNavigatingTo] = useState(null);

  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const paginatedUsers = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (open) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
      setPage(1);
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
        setUsers(data);
        setPage(1);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [open, ids]);

  const handleNavigateToProfile = (username) => {
    setNavigatingTo(username);
    // small delay so the fade-out plays before navigating
    setTimeout(() => {
      onClose();
      navigate(`/profile/${username}`);
      setNavigatingTo(null);
    }, 250);
  };

  if (!open) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={`
        fixed inset-0 z-[999]
        flex items-center justify-center
        px-4
        transition-all duration-300
        ${show ? "bg-black/80 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none"}
      `}
    >
      <div
        className={`
          w-full max-w-sm
          bg-[#0f0f0f]
          border border-white/10
          rounded-2xl
          overflow-hidden shadow-2xl
          flex flex-col
          transition-all duration-300 ease-out
          ${show ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"}
        `}
        style={{ maxHeight: "min(75vh, 560px)" }}
      >
        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold text-white tracking-tight">
              {title}
            </h3>
            {users.length > 0 && !loading && (
              <span className="text-[11px] text-white/30 bg-white/8 px-2 py-0.5 rounded-full tabular-nums">
                {ids.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white active:scale-90 transition-all duration-150"
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>

        {/* ── BODY ── */}
        <div
          className="overflow-y-auto overscroll-contain flex-1 min-h-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* LOADING SKELETON */}
          {loading && (
            <div className="px-2 py-2 space-y-1">
              {[...Array(PAGE_SIZE)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl animate-pulse"
                >
                  <div className="w-10 h-10 rounded-full bg-white/8 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 bg-white/8 rounded-full w-1/2" />
                    <div className="h-2 bg-white/5 rounded-full w-1/3" />
                  </div>
                  <div className="w-16 h-7 rounded-full bg-white/8 flex-shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && users.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 gap-2 text-white/25">
              <span className="text-3xl">👤</span>
              <p className="text-[13px] tracking-wide">No users yet</p>
            </div>
          )}

          {/* USER LIST */}
          {!loading && paginatedUsers.length > 0 && (
            <div className="px-2 py-2">
              {paginatedUsers.map((u, index) => {
                const isFollowing = u.isFollowing;
                const isMyOwnRow = authUser?._id === u._id;
                const isNavigating = navigatingTo === u.username;

                return (
                  <div
                    key={u._id}
                    className="
                      flex items-center justify-between
                      px-3 py-2.5 rounded-xl
                      hover:bg-white/5 active:bg-white/8
                      transition-all duration-150
                      opacity-0 animate-fadeInUp
                    "
                    style={{ animationDelay: `${index * 35}ms` }}
                  >
                    {/* LEFT — Avatar + Name */}
                    <div
                      onClick={() => handleNavigateToProfile(u.username)}
                      className={`
                        flex items-center gap-3 cursor-pointer flex-1 min-w-0
                        transition-opacity duration-200
                        ${isNavigating ? "opacity-40" : "opacity-100"}
                      `}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10">
                        {u.profilePicture ? (
                          <img
                            src={u.profilePicture}
                            alt={u.username}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-indigo-600/80 flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">
                              {u.username?.[0]?.toUpperCase() || "U"}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13.5px] font-semibold text-white leading-tight truncate">
                          {u.username}
                          {isMyOwnRow && (
                            <span className="ml-1.5 text-[10px] font-normal text-white/30 tracking-wide">
                              you
                            </span>
                          )}
                        </span>
                        {u.fullName && (
                          <span className="text-[12px] text-white/40 leading-tight truncate">
                            {u.fullName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* RIGHT — Action button (hidden for own row) */}
                    {!isMyOwnRow && (
                      <div className="flex-shrink-0 ml-3">
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
                                navigate(`/chat?conversation=${data._id}`);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            className="
                              flex items-center justify-center gap-1.5
                              w-[90px] h-[30px]
                              rounded-full text-[12px] font-semibold
                              border border-white/15
                              text-white/70 hover:text-white hover:bg-white/8
                              active:scale-90 transition-all duration-150
                            "
                          >
                            <MessageCircle size={12} />
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
                                    x._id === u._id
                                      ? { ...x, isFollowing: true }
                                      : x,
                                  ),
                                );
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            className="
                              flex items-center justify-center gap-1.5
                              w-[90px] h-[30px]
                              rounded-full text-[12px] font-semibold
                              bg-indigo-600 hover:bg-indigo-500
                              text-white
                              active:scale-90 transition-all duration-150
                            "
                          >
                            <UserPlus size={12} />
                            Follow
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── PAGINATION FOOTER ── */}
        {!loading && totalPages > 1 && (
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-t border-white/10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed active:scale-90 transition-all duration-150"
            >
              <ChevronLeft size={14} />
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`
                    transition-all duration-200 rounded-full
                    ${
                      page === i + 1
                        ? "w-5 h-2 bg-white"
                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    }
                  `}
                />
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed active:scale-90 transition-all duration-150"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FollowersFollowingModal;