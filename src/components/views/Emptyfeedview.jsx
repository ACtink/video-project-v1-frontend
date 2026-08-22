import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";

// ── Suggested User Card ───────────────────────────────────────────────────────
function SuggestedUserCard({ user, openProfile, index }) {
  const [status, setStatus] = useState("none"); // none | requested

  const handleFollow = async (e) => {
    e.stopPropagation();
    if (status === "requested") return;
    setStatus("requested");
    try {
      await fetchData(`/api/users/${user._id}/follow`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // keep "requested" optimistically — UX feels better
    }
  };

  return (
    <div
      onClick={() => openProfile(user._id)}
      className="group flex items-center gap-3 px-3 py-3 sm:px-4 rounded-xl cursor-pointer
                 hover:bg-white/[0.04] active:bg-white/[0.06] transition-all duration-150"
      style={{
        animation: "fadeSlideUp 0.35s ease both",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.username}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover
                       ring-1 ring-white/10 group-hover:ring-white/20 transition-all"
          />
        ) : (
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full
                       bg-gradient-to-br from-indigo-500/30 to-violet-600/30
                       ring-1 ring-white/10 group-hover:ring-white/20
                       flex items-center justify-center
                       text-white/70 font-semibold text-sm transition-all"
          >
            {user.username?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold text-white/90 truncate leading-tight
                      group-hover:text-white transition-colors"
        >
          {user.fullName || user.username}
        </p>
        <p className="text-xs text-white/35 truncate mt-0.5">
          @{user.username}
        </p>
        {user.mutualCount > 0 && (
          <p className="text-[11px] text-indigo-400/70 mt-1 flex items-center gap-1">
            <svg
              className="w-3 h-3 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            {user.mutualCount} mutual{" "}
            {user.mutualCount === 1 ? "connection" : "connections"}
          </p>
        )}
      </div>

      {/* Follow button */}
      <button
        onClick={handleFollow}
        disabled={status === "requested"}
        className={`flex-shrink-0 text-xs font-semibold px-3 sm:px-4 py-1.5 rounded-full
                    border transition-all duration-200 whitespace-nowrap
                    ${
                      status === "requested"
                        ? "bg-white/[0.04] border-white/[0.08] text-white/25 cursor-default"
                        : "bg-indigo-500/10 border-indigo-500/25 text-indigo-300/90 hover:bg-indigo-500/20 hover:border-indigo-400/40 hover:text-indigo-200 active:scale-95"
                    }`}
      >
        {status === "requested" ? "Requested" : "Follow"}
      </button>
    </div>
  );
}

// ── Card Skeleton ─────────────────────────────────────────────────────────────
function SuggestedSkeleton() {
  return (
    <div className="flex flex-col">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.06] animate-pulse flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <div
              className="h-3 rounded-full bg-white/[0.06] animate-pulse"
              style={{ width: `${48 + ((i * 13) % 32)}%` }}
            />
            <div
              className="h-2.5 rounded-full bg-white/[0.04] animate-pulse"
              style={{ width: `${32 + ((i * 9) % 20)}%` }}
            />
          </div>
          <div className="w-16 h-7 rounded-full bg-white/[0.06] animate-pulse flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
function Divider({ label }) {
  return (
    <div className="flex items-center gap-3 px-1">
      <div className="flex-1 h-px bg-white/[0.06]" />
      {label && (
        <span className="text-[10px] text-white/20 uppercase tracking-[0.15em] font-medium">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}

// ── Main EmptyFeedView ────────────────────────────────────────────────────────
function EmptyFeedView({ openProfile, pendingCount = 0 }) {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchData("/api/users/suggested?page=1&limit=6", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSuggestedUsers(data);
          setHasMore(data.length >= 6);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const res = await fetchData(
        `/api/users/suggested?page=${nextPage}&limit=6`,
        { credentials: "include" },
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setSuggestedUsers((prev) => {
          const ids = new Set(prev.map((u) => u._id));
          return [...prev, ...data.filter((u) => !ids.has(u._id))];
        });
        setPage(nextPage);
        if (data.length < 6) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Load more suggested error:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.5; transform: scale(1);    }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>

      <div className="flex flex-col gap-3 pb-8 w-full">
        {/* ── Hero banner ─────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-2xl border border-white/[0.07]
                     bg-white/[0.02] px-5 py-6 sm:px-6 sm:py-8"
          style={{ animation: "fadeSlideUp 0.4s ease both" }}
        >
          {/* Ambient glows */}
          <div
            className="pointer-events-none absolute -top-12 -right-12 w-52 h-52
                          rounded-full bg-indigo-600/8 blur-3xl"
          />
          <div
            className="pointer-events-none absolute -bottom-10 -left-10 w-40 h-40
                          rounded-full bg-violet-600/8 blur-3xl"
          />

          <div className="relative z-10 flex flex-col gap-3">
            {/* Icon */}
            <div
              className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/15
                          flex items-center justify-center mb-1"
            >
              {pendingCount > 0 ? (
                <svg
                  className="w-5 h-5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                  />
                </svg>
              )}
            </div>

            {/* Text */}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {pendingCount > 0
                  ? "Requests sent — hang tight"
                  : "Your feed is empty"}
              </h2>
              <p className="text-sm text-white/40 leading-relaxed mt-1.5 max-w-sm">
                {pendingCount > 0
                  ? `You have ${pendingCount} pending follow ${pendingCount === 1 ? "request" : "requests"}. Posts will show up here once they're approved.`
                  : "Follow people to see their posts here. Since this is a private network, you'll need approval before their posts show up."}
              </p>
            </div>

            {/* Pending badge */}
            {pendingCount > 0 && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                            bg-amber-500/8 border border-amber-500/15 w-fit mt-1"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-amber-400/80"
                  style={{ animation: "pulseRing 2s ease-in-out infinite" }}
                />
                <span className="text-xs text-amber-400/80 font-medium">
                  {pendingCount} pending{" "}
                  {pendingCount === 1 ? "request" : "requests"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Suggested people ────────────────────────────────────────── */}
        <div
          className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
          style={{ animation: "fadeSlideUp 0.4s ease 0.08s both" }}
        >
          {/* Section header */}
          <div className="flex items-center justify-between px-4 sm:px-5 pt-4 pb-1">
            <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.13em]">
              People to follow
            </span>
            {!loading && suggestedUsers.length > 0 && (
              <span className="text-[11px] text-white/20">
                {suggestedUsers.length} suggestion
                {suggestedUsers.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="px-1 pb-2">
            {loading ? (
              <SuggestedSkeleton />
            ) : suggestedUsers.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12">
                <div
                  className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.06]
                              flex items-center justify-center mb-1"
                >
                  <svg
                    className="w-5 h-5 text-white/20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-white/25 font-medium">
                  No suggestions right now
                </p>
                <p className="text-xs text-white/15">Check back later</p>
              </div>
            ) : (
              <>
                {suggestedUsers.map((user, i) => (
                  <SuggestedUserCard
                    key={user._id}
                    user={user}
                    openProfile={openProfile}
                    index={i}
                  />
                ))}

                {hasMore ? (
                  <div className="px-3 sm:px-4 pt-1 pb-1">
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="w-full py-2.5 rounded-xl text-xs font-medium
                                 text-white/30 hover:text-white/50 hover:bg-white/[0.03]
                                 border border-transparent hover:border-white/[0.06]
                                 transition-all duration-150 flex items-center justify-center gap-2"
                    >
                      {loadingMore ? (
                        <>
                          <div
                            className="w-3 h-3 rounded-full border border-white/20
                                          border-t-white/50 animate-spin"
                          />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <span>Show more people</span>
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="px-4 pt-2 pb-3">
                    <Divider label="That's everyone for now" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ── Tip card ──────────────────────────────────────────────── */}
        <div
          className="flex items-start gap-3 px-4 py-4 rounded-2xl
                     border border-white/[0.05] bg-white/[0.015]"
          style={{ animation: "fadeSlideUp 0.4s ease 0.16s both" }}
        >
          <div
            className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.07]
                        flex items-center justify-center flex-shrink-0 mt-0.5"
          >
            <svg
              className="w-3.5 h-3.5 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
              />
            </svg>
          </div>
          <p className="text-xs text-white/30 leading-relaxed">
            This is a private network — posts are only visible to approved
            followers. Once someone accepts your request, their posts will
            appear in your feed automatically.
          </p>
        </div>
      </div>
    </>
  );
}

export default EmptyFeedView;
