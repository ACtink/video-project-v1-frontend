
import { useEffect, useState, useRef, useCallback } from "react";
import PostCard from "../PostCard";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";
import fetchData from "../../utils/fetchData";
import SkeletonPost from "../SkeletonPost";
import { usePosts } from "../../hooks/usePosts";
import EmptyFeedView from "./Emptyfeedview";

let feedCache = null;
const CACHE_STALE_MS = 60_000;
let cachedScrollY = 0;

function HomeView({ openProfile }) {
  const centerRef = useRef(null);
  const scrollThrottleRef = useRef(false);

  const { posts, setPosts, updatePostLike } = usePosts(feedCache?.posts || []);
  const [loading, setLoading] = useState(!feedCache);
  const [page, setPage] = useState(() =>
    feedCache ? Math.ceil(feedCache.posts.length / 10) : 1,
  );
  const [hasMore, setHasMore] = useState(() => feedCache?.hasMore ?? true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // ── Background refresh ────────────────────────────────────────────────
  const refreshLatestPosts = useCallback(async () => {
    try {
      const res = await fetchData(`/api/posts?page=1&limit=10`, {
        credentials: "include",
      });
      const latest = await res.json();
      if (!Array.isArray(latest) || !latest.length) return;

      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const newPosts = latest.filter((p) => !existingIds.has(p._id));
        if (!newPosts.length) return prev;
        const updated = [...newPosts, ...prev];
        feedCache = { ...feedCache, posts: updated, fetchedAt: Date.now() };
        return updated;
      });
    } catch (err) {
      console.error("Feed refresh error:", err);
    }
  }, [setPosts]);

  // ── Fetch pending follow request count ────────────────────────────────
  const fetchPendingCount = useCallback(async () => {
    try {
      const res = await fetchData("/api/users/follow-requests/sent/count", {
        credentials: "include",
      });
      const data = await res.json();
      if (typeof data?.count === "number") setPendingCount(data.count);
    } catch {
      // non-critical, silently ignore
    }
  }, []);

  // ── Initial load / cache restore ──────────────────────────────────────
  useEffect(() => {
    if (feedCache) {
      setLoading(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (centerRef.current) {
            centerRef.current.scrollTop = cachedScrollY;
          }
        });
      });
      const isStale = Date.now() - (feedCache.fetchedAt || 0) > CACHE_STALE_MS;
      if (isStale) refreshLatestPosts();
      return;
    }

    fetchData(`/api/posts?page=1&limit=10`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        const hasMorePages = data.length >= 10;
        feedCache = {
          posts: data,
          hasMore: hasMorePages,
          fetchedAt: Date.now(),
        };
        setPosts(data);
        if (!hasMorePages) setHasMore(false);
        setLoading(false);
        if (data.length === 0) fetchPendingCount();
      })
      .catch(() => setLoading(false));
  }, [refreshLatestPosts, fetchPendingCount]);

  // ── Load more ─────────────────────────────────────────────────────────
  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await fetchData(`/api/posts?page=${nextPage}&limit=10`, {
        credentials: "include",
      });
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setHasMore(false);
        feedCache = feedCache ? { ...feedCache, hasMore: false } : feedCache;
        return;
      }

      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const newPosts = data.filter((p) => !existingIds.has(p._id));

        if (!newPosts.length) {
          setHasMore(false);
          feedCache = feedCache ? { ...feedCache, hasMore: false } : feedCache;
          return prev;
        }

        const updated = [...prev, ...newPosts];
        const hasMorePages = data.length >= 10;
        feedCache = {
          posts: updated,
          hasMore: hasMorePages,
          fetchedAt: feedCache?.fetchedAt ?? Date.now(),
        };
        return updated;
      });

      setPage(nextPage);
      if (data.length < 10) {
        setHasMore(false);
        feedCache = feedCache ? { ...feedCache, hasMore: false } : feedCache;
      }
    } catch (err) {
      console.error("Load more error:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page]);

  // ── Scroll handler (attached to center column only) ───────────────────
  const handleScroll = useCallback(() => {
    if (scrollThrottleRef.current) return;
    scrollThrottleRef.current = true;
    setTimeout(() => {
      scrollThrottleRef.current = false;
    }, 100);

    if (!centerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = centerRef.current;
    cachedScrollY = scrollTop;

    if (scrollHeight - scrollTop - clientHeight < 800) {
      loadMorePosts();
    }
  }, [loadMorePosts]);

  // ── Like handler ──────────────────────────────────────────────────────
  const handleLikeUpdate = useCallback(
    (postId, userId, liked, likesCount) => {
      updatePostLike(postId, userId, liked, likesCount);
      setPosts((prev) => {
        const updated = prev.map((p) =>
          String(p._id) === String(postId)
            ? {
                ...p,
                likesCount,
                likes: liked
                  ? [...new Set([...(p.likes || []), String(userId)])]
                  : (p.likes || []).filter(
                      (id) => String(id) !== String(userId),
                    ),
              }
            : p,
        );
        feedCache = feedCache ? { ...feedCache, posts: updated } : feedCache;
        return updated;
      });
    },
    [updatePostLike, setPosts],
  );

  // ── Delete handler ────────────────────────────────────────────────────
  const handleDelete = useCallback(
    (postId) => {
      setPosts((prev) => {
        const updated = prev.filter((p) => p._id !== postId);
        feedCache = feedCache ? { ...feedCache, posts: updated } : feedCache;
        return updated;
      });
    },
    [setPosts],
  );

  // ── Render ────────────────────────────────────────────────────────────
  return (
    // Outer shell: full viewport height, overflow hidden — nothing scrolls here
    <div className="h-[100dvh] overflow-hidden text-white">
      {/* Top loading bar */}
      {loadingMore && (
        <div className="fixed top-0 left-0 right-0 z-50 h-[2px] overflow-hidden">
          <div
            className="h-full bg-indigo-500"
            style={{
              animation: "loadingBar 1.2s ease-in-out infinite",
              transformOrigin: "left center",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes loadingBar {
          0%   { transform: translateX(-100%) scaleX(0.4); }
          50%  { transform: translateX(0%)    scaleX(0.7); }
          100% { transform: translateX(100%)  scaleX(0.4); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);    opacity: 0.3; }
          50%       { transform: translateY(-6px); opacity: 1;   }
        }
      `}</style>

      {/* Three-column grid — full height, columns don't overflow */}
      <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:px-4">
        {/* ── Left sidebar: full height, no scroll ─────────────────── */}
        <div className="hidden lg:block lg:col-span-3 h-full py-5 overflow-hidden">
          <LeftSidebar />
        </div>

        {/* ── Center: only this column scrolls ─────────────────────── */}
        <div
          ref={centerRef}
          onScroll={handleScroll}
          className="lg:col-span-6 h-full overflow-y-auto overflow-x-hidden py-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonPost key={i} />)
          ) : posts.length === 0 ? (
            <EmptyFeedView
              openProfile={openProfile}
              pendingCount={pendingCount}
            />
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                openProfile={openProfile}
                onLikeUpdate={(postId, userId, liked, likesCount) =>
                  handleLikeUpdate(postId, userId, liked, likesCount)
                }
                onDelete={() => handleDelete(post._id)}
              />
            ))
          )}

          {/* Bottom loading dots */}
          {loadingMore && (
            <div className="flex items-center justify-center gap-1.5 py-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/30"
                  style={{
                    animation: "bounce 1s ease-in-out infinite",
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          )}

          {!loading && !hasMore && posts.length > 0 && (
            <div className="flex items-center gap-4 py-8 px-4">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-[11px] text-white/20 tracking-widest uppercase">
                You're all caught up
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
          )}

          {!loading && <div className="h-8" />}
        </div>

        {/* ── Right sidebar: full height, no scroll ────────────────── */}
        <div className="hidden lg:block lg:col-span-3 h-full py-5 overflow-hidden">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default HomeView;