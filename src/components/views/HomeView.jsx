// import { useEffect, useState } from "react";
// import PostCard from "../PostCard";
// import LeftSidebar from "../LeftSidebar";
// import RightSidebar from "../RightSidebar";
// import fetchData from "../../utils/fetchData";
// import SkeletonPost from "../SkeletonPost";

// /* ✅ CACHE (added) */
// let cachedPosts = null;

// function HomeView({ openProfile }) {
//   /* ✅ use cache if exists (added) */
//   const [posts, setPosts] = useState(cachedPosts || []);
//   const [loading, setLoading] = useState(!cachedPosts);

//   useEffect(() => {
//     /* ✅ prevent refetch if cached (added) */
//     if (cachedPosts) {
//       setLoading(false);
//       return;
//     }

//     const start = Date.now();

//     fetchData("/api/posts", { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) => {
//         const elapsed = Date.now() - start;
//         const delay = Math.max(900 - elapsed, 0);

//         setTimeout(() => {
//           cachedPosts = data; /* ✅ save cache (added) */

//           setPosts(data);
//           setLoading(false);
//         }, delay);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <div className="h-screen overflow-y-auto text-white">
//       <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* LEFT SIDEBAR */}
//         <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
//           <LeftSidebar />
//         </div>

//         {/* FEED */}
//         <div className="lg:col-span-6 space-y-6 transition-opacity duration-500">
//           {loading
//             ? Array.from({ length: 6 }).map((_, i) => <SkeletonPost key={i} />)
//             : posts.map((post) => (
//                 <PostCard
//                   key={post._id}
//                   post={post}
//                   openProfile={openProfile}
//                   onDelete={() => {
//                     const updated = posts.filter((p) => p._id !== post._id);
//                     setPosts(updated);

//                     cachedPosts =
//                       updated; /* ✅ update cache on delete (added) */
//                   }}
//                 />
//               ))}

//           {/* 🔥 bottom breathing space */}
//           {!loading && <div className="h-[20vh] bg-black" />}
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
//           <RightSidebar />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomeView;

// import { useEffect, useState, useRef } from "react";
// import PostCard from "../PostCard";
// import LeftSidebar from "../LeftSidebar";
// import RightSidebar from "../RightSidebar";
// import fetchData from "../../utils/fetchData";
// import SkeletonPost from "../SkeletonPost";

// /* CACHE */
// let cachedPosts = null;

// /* SCROLL CACHE */
// let cachedScrollY = 0;

// function HomeView({ openProfile }) {
//   const containerRef = useRef(null);

//   const [posts, setPosts] = useState(cachedPosts || []);
//   const [loading, setLoading] = useState(!cachedPosts);

//   useEffect(() => {
//     if (cachedPosts) {
//       setLoading(false);

//       /* ✅ restore scroll AFTER render */
//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//           if (containerRef.current) {
//             containerRef.current.scrollTop = cachedScrollY;
//           }
//         });
//       });

//       return;
//     }

//     const start = Date.now();

//     fetchData("/api/posts", { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) => {
//         const elapsed = Date.now() - start;
//         const delay = Math.max(900 - elapsed, 0);

//         setTimeout(() => {
//           cachedPosts = data;

//           setPosts(data);

//           setLoading(false);
//         }, delay);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   /* SAVE SCROLL ON SCROLL */
//   const handleScroll = () => {
//     if (containerRef.current) {
//       cachedScrollY = containerRef.current.scrollTop;
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       onScroll={handleScroll}
//       className="h-screen overflow-y-auto text-white"
//     >
//       <div className="max-w-7xl mx-auto pt-5 pb-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* LEFT SIDEBAR */}
//         <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
//           <LeftSidebar />
//         </div>

//         {/* FEED */}
//         <div className="lg:col-span-6 space-y-6 transition-opacity duration-500">
//           {loading
//             ? Array.from({ length: 6 }).map((_, i) => <SkeletonPost key={i} />)
//             : posts.map((post) => (
//                 <PostCard
//                   key={post._id}
//                   post={post}
//                   openProfile={openProfile}
//                   onDelete={() => {
//                     const updated = posts.filter((p) => p._id !== post._id);

//                     setPosts(updated);

//                     cachedPosts = updated;
//                   }}
//                 />
//               ))}

//           {!loading && <div className="h-[20vh] bg-black" />}
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
//           <RightSidebar />
//         </div>
//       </div>
//     </div>
//   );
// }
// export default HomeView;

// import { useEffect, useState, useRef } from "react";
// import PostCard from "../PostCard";
// import LeftSidebar from "../LeftSidebar";
// import RightSidebar from "../RightSidebar";
// import fetchData from "../../utils/fetchData";
// import SkeletonPost from "../SkeletonPost";

// /* CACHE */
// let cachedPosts = null;

// /* SCROLL CACHE */
// let cachedScrollY = 0;

// function HomeView({ openProfile }) {

//   const containerRef = useRef(null);
//   const scrollThrottleRef = useRef(false);

//   const [posts, setPosts] = useState(cachedPosts || []);
//   const [loading, setLoading] = useState(!cachedPosts);

//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const refreshLatestPosts = async () => {
//     try {
//       const res = await fetchData(`/api/posts?page=1&limit=10`, {
//         credentials: "include",
//       });

//       const latest = await res.json();

//       if (!latest.length) return;

//       setPosts((prev) => {
//         const existingIds = new Set(prev.map((p) => p._id));

//         const newPosts = latest.filter((p) => !existingIds.has(p._id));

//         if (!newPosts.length) return prev;

//         const updated = [...newPosts, ...prev];

//         cachedPosts = updated;

//         return updated;
//       });
//     } catch (err) {
//       console.error("refresh feed error", err);
//     }
//   };

//   useEffect(() => {
//     if (cachedPosts) {
//       setLoading(false);

//       refreshLatestPosts();

//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//           if (containerRef.current) {
//             containerRef.current.scrollTop = cachedScrollY;
//           }
//         });
//       });

//       return;
//     }

//     const start = Date.now();

//     fetchData(`/api/posts?page=1&limit=10`, { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) => {
//         const elapsed = Date.now() - start;
//         const delay = Math.max(900 - elapsed, 0);

//         setTimeout(() => {
//           cachedPosts = data;

//           setPosts(data);

//           if (data.length < 10) {
//             setHasMore(false);
//           }

//           setLoading(false);
//         }, delay);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   const loadMorePosts = async () => {
//     if (loadingMore || !hasMore) return;

//     setLoadingMore(true);

//     try {
//       const res = await fetchData(`/api/posts?page=${page + 1}&limit=10`, {
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (data.length === 0) {
//         setHasMore(false);
//         return;
//       }

//      setPosts((prev) => {
//        const existingIds = new Set(prev.map((p) => p._id));

//        const newPosts = data.filter((p) => !existingIds.has(p._id));

//        if (!newPosts.length) {
//          setHasMore(false);
//          return prev;
//        }

//        const updated = [...prev, ...newPosts];

//        cachedPosts = updated;

//        return updated;
//      });

//       setPage((prev) => prev + 1);

//       if (data.length < 10) {
//         setHasMore(false);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingMore(false);
//     }
//   };

//   const handleScroll = () => {
//     if (scrollThrottleRef.current) return;

//     scrollThrottleRef.current = true;

//     setTimeout(() => {
//       scrollThrottleRef.current = false;
//     }, 200);

//     if (!containerRef.current) return;

//     const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

//     cachedScrollY = scrollTop;

//     if (scrollTop + clientHeight >= scrollHeight - 300) {
//       loadMorePosts();
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       onScroll={handleScroll}
//       className="h-screen overflow-y-auto text-white"
//     >
//       <div className="max-w-7xl mx-auto pt-5 pb-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* LEFT SIDEBAR */}
//         <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
//           <LeftSidebar />
//         </div>

//         {/* FEED */}
//         <div className="lg:col-span-6 space-y-6 transition-opacity duration-500">
//           {loading
//             ? Array.from({ length: 6 }).map((_, i) => <SkeletonPost key={i} />)
//             : posts.map((post) => (
//                 <PostCard
//                   key={post._id}
//                   post={post}
//                   openProfile={openProfile}
//                   onDelete={() => {
//                     const updated = posts.filter((p) => p._id !== post._id);

//                     setPosts(updated);

//                     cachedPosts = updated;
//                   }}
//                 />
//               ))}

//           {loadingMore && (
//             <div className="flex justify-center py-6 text-gray-400">
//               Loading more posts...
//             </div>
//           )}

//           {!loading && <div className="h-[20vh] bg-black" />}
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
//           <RightSidebar />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomeView;

// import { useEffect, useState, useRef } from "react";
// import PostCard from "../PostCard";
// import LeftSidebar from "../LeftSidebar";
// import RightSidebar from "../RightSidebar";
// import fetchData from "../../utils/fetchData";
// import SkeletonPost from "../SkeletonPost";
// import { usePosts } from "../../hooks/usePosts";

// /* CACHE */
// let cachedPosts = null;

// /* SCROLL CACHE */
// let cachedScrollY = 0;

// function HomeView({ openProfile }) {
//   const containerRef = useRef(null);
//   const scrollThrottleRef = useRef(false);

// const { posts, setPosts, updatePostLike } = usePosts(cachedPosts || []);
//   const [loading, setLoading] = useState(!cachedPosts);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const refreshLatestPosts = async () => {
//     try {
//       const res = await fetchData(`/api/posts?page=1&limit=10`, {
//         credentials: "include",
//       });
//       const latest = await res.json();
//       if (!latest.length) return;
//       setPosts((prev) => {
//         const existingIds = new Set(prev.map((p) => p._id));
//         const newPosts = latest.filter((p) => !existingIds.has(p._id));
//         if (!newPosts.length) return prev;
//         const updated = [...newPosts, ...prev];
//         cachedPosts = updated;
//         return updated;
//       });
//     } catch (err) {
//       console.error("refresh feed error", err);
//     }
//   };

//   useEffect(() => {
//     if (cachedPosts) {
//       setLoading(false);
//       refreshLatestPosts();
//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//           if (containerRef.current) {
//             containerRef.current.scrollTop = cachedScrollY;
//           }
//         });
//       });
//       return;
//     }

//     const start = Date.now();
//     fetchData(`/api/posts?page=1&limit=10`, { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) => {
//         const elapsed = Date.now() - start;
//         const delay = Math.max(900 - elapsed, 0);
//         setTimeout(() => {
//           cachedPosts = data;
//           setPosts(data);
//           if (data.length < 10) setHasMore(false);
//           setLoading(false);
//         }, delay);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   const loadMorePosts = async () => {
//     if (loadingMore || !hasMore) return;
//     setLoadingMore(true);
//     try {
//       const res = await fetchData(`/api/posts?page=${page + 1}&limit=10`, {
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (data.length === 0) {
//         setHasMore(false);
//         return;
//       }
//       setPosts((prev) => {
//         const existingIds = new Set(prev.map((p) => p._id));
//         const newPosts = data.filter((p) => !existingIds.has(p._id));
//         if (!newPosts.length) {
//           setHasMore(false);
//           return prev;
//         }
//         const updated = [...prev, ...newPosts];
//         cachedPosts = updated;
//         return updated;
//       });
//       setPage((prev) => prev + 1);
//       if (data.length < 10) setHasMore(false);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingMore(false);
//     }
//   };

//   const handleScroll = () => {
//     if (scrollThrottleRef.current) return;
//     scrollThrottleRef.current = true;
//     setTimeout(() => {
//       scrollThrottleRef.current = false;
//     }, 200);
//     if (!containerRef.current) return;
//     const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
//     cachedScrollY = scrollTop;

//     // ── trigger earlier: 600px before the bottom instead of 300px ──
//     if (scrollTop + clientHeight >= scrollHeight - 600) {
//       loadMorePosts();
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       onScroll={handleScroll}
//       className="h-screen overflow-y-auto text-white"
//     >
//       <div className="max-w-7xl mx-auto pt-5 pb-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* LEFT SIDEBAR */}
//         <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
//           <LeftSidebar />
//         </div>

//         {/* FEED */}
//         <div className="lg:col-span-6 transition-opacity duration-500">
//           {loading
//             ? Array.from({ length: 6 }).map((_, i) => <SkeletonPost key={i} />)
//             : posts.map((post) => (
//                 <PostCard
//                   key={post._id}
//                   post={post}
//                   openProfile={openProfile}
//                   onLikeUpdate={(postId, userId, liked, likesCount) => {
//                     updatePostLike(postId, userId, liked, likesCount);
//                     cachedPosts = posts.map((p) =>
//                       String(p._id) === String(postId)
//                         ? {
//                             ...p,
//                             likesCount,
//                             likes: liked
//                               ? [
//                                   ...new Set([
//                                     ...(p.likes || []),
//                                     String(userId),
//                                   ]),
//                                 ]
//                               : (p.likes || []).filter(
//                                   (id) => String(id) !== String(userId),
//                                 ),
//                           }
//                         : p,
//                     );
//                   }}
//                   onDelete={() => {
//                     const updated = posts.filter((p) => p._id !== post._id);
//                     setPosts(updated);
//                     cachedPosts = updated;
//                   }}
//                 />
//               ))}

//           {/* ── LOAD MORE SPINNER ── */}
//           {loadingMore && (
//             <div className="flex items-center justify-center gap-3 py-8">
//               <svg
//                 className="animate-spin w-5 h-5 text-white/40"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <circle
//                   className="opacity-20"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="3"
//                 />
//                 <path
//                   className="opacity-80"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                 />
//               </svg>
//               <span className="text-[13px] text-white/30 tracking-wide">
//                 Loading more posts
//               </span>
//             </div>
//           )}

//           {/* ── END OF FEED ── */}
//           {!loading && !hasMore && posts.length > 0 && (
//             <div className="flex items-center gap-4 py-8 px-4">
//               <div className="flex-1 h-px bg-white/8" />
//               <span className="text-[11px] text-white/20 tracking-widest uppercase">
//                 You're all caught up
//               </span>
//               <div className="flex-1 h-px bg-white/8" />
//             </div>
//           )}

//           {!loading && <div className="h-[20vh] bg-black" />}
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
//           <RightSidebar />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomeView;

import { useEffect, useState, useRef, useCallback } from "react";
import PostCard from "../PostCard";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";
import fetchData from "../../utils/fetchData";
import SkeletonPost from "../SkeletonPost";
import { usePosts } from "../../hooks/usePosts";

// ─────────────────────────────────────────────────────────────────────────────
// Module-level feed cache
//
// Persists across re-mounts (navigation away and back) without needing
// a context or global store.
//
// Shape:
//   posts     — the full cached post array
//   page      — the last page number successfully fetched (derived = posts/10)
//   hasMore   — whether the API returned a full page last time
//   fetchedAt — timestamp of last full fetch, used for staleness check
// ─────────────────────────────────────────────────────────────────────────────
let feedCache = null; // { posts, hasMore, fetchedAt }

// How old the cache can be before we re-fetch page 1 in the background.
// 60 seconds — fresh enough that navigating away and back feels instant,
// stale enough that new posts appear reasonably quickly.
const CACHE_STALE_MS = 60_000;

let cachedScrollY = 0;

function HomeView({ openProfile }) {
  const containerRef = useRef(null);
  const scrollThrottleRef = useRef(false);

  // ── Initialise from cache if available ──────────────────────────────────
  const { posts, setPosts, updatePostLike } = usePosts(feedCache?.posts || []);
  const [loading, setLoading] = useState(!feedCache);

  // FIX: page and hasMore are now derived from / restored from the cache,
  // not independently initialised. Previously, returning to a cached feed
  // always reset page to 1 and hasMore to true — causing duplicate fetches
  // and spurious "load more" spinners.
  const [page, setPage] = useState(() =>
    feedCache ? Math.ceil(feedCache.posts.length / 10) : 1,
  );
  const [hasMore, setHasMore] = useState(() => feedCache?.hasMore ?? true);
  const [loadingMore, setLoadingMore] = useState(false);

  // ── Background refresh of page 1 ─────────────────────────────────────
  // Silently prepends any posts newer than what we have cached.
  // Only called when returning to a cached feed that is stale.
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
        // Keep cache in sync
        feedCache = { ...feedCache, posts: updated, fetchedAt: Date.now() };
        return updated;
      });
    } catch (err) {
      console.error("Feed refresh error:", err);
    }
  }, [setPosts]);

  // ── Initial load / cache restore ─────────────────────────────────────
  useEffect(() => {
    // Cache hit — restore scroll position and optionally refresh in background
    if (feedCache) {
      setLoading(false);

      // Restore scroll position after the DOM has painted
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = cachedScrollY;
          }
        });
      });

      // FIX: Only refresh if cache is actually stale. Previously refreshed
      // on every mount — a user navigating away and back after 2 seconds
      // would still fire a needless network request.
      const isStale = Date.now() - (feedCache.fetchedAt || 0) > CACHE_STALE_MS;
      if (isStale) refreshLatestPosts();

      return;
    }

    // Cache miss — full initial fetch
    // FIX: Removed the artificial Math.max(900 - elapsed, 0) delay.
    // Deliberately making users wait up to 900ms for no reason is always
    // bad UX. The skeleton screen already handles perceived loading time.
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
      })
      .catch(() => setLoading(false));
  }, [refreshLatestPosts]);

  // ── Load more (pagination) ────────────────────────────────────────────
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
          // All returned posts were duplicates — treat as end of feed
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

  // ── Scroll handler ────────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    if (scrollThrottleRef.current) return;
    scrollThrottleRef.current = true;
    setTimeout(() => {
      scrollThrottleRef.current = false;
    }, 200);

    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    cachedScrollY = scrollTop;

    if (scrollTop + clientHeight >= scrollHeight - 600) {
      loadMorePosts();
    }
  }, [loadMorePosts]);

  // ── Like update handler ───────────────────────────────────────────────
  // FIX: Previously `cachedPosts = posts.map(...)` read `posts` from the
  // render closure at callback-creation time — if posts had changed since
  // that render, the cache was updated with stale data.
  // Now we use the functional setPosts pattern which always gets current state,
  // and update the cache from that same current value.
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
    // FIX: h-screen uses 100vh which on mobile includes the browser chrome
    // (address bar), making the bottom of the feed hidden behind the browser UI.
    // h-[100dvh] uses the dynamic viewport height which accounts for the
    // visible area only.
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-[100dvh] overflow-y-auto text-white"
    >
      <div className="max-w-7xl mx-auto pt-5 pb-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100dvh-3rem)]">
          <LeftSidebar />
        </div>

        {/* FEED */}
        <div className="lg:col-span-6 transition-opacity duration-500">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonPost key={i} />)
            : posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  openProfile={openProfile}
                  onLikeUpdate={(postId, userId, liked, likesCount) =>
                    handleLikeUpdate(postId, userId, liked, likesCount)
                  }
                  onDelete={() => handleDelete(post._id)}
                />
              ))}

          {/* Load more spinner */}
          {loadingMore && (
            <div className="flex items-center justify-center gap-3 py-8">
              <svg
                className="animate-spin w-5 h-5 text-white/40"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-80"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span className="text-[13px] text-white/30 tracking-wide">
                Loading more posts
              </span>
            </div>
          )}

          {/* End of feed */}
          {!loading && !hasMore && posts.length > 0 && (
            <div className="flex items-center gap-4 py-8 px-4">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-[11px] text-white/20 tracking-widest uppercase">
                You're all caught up
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
          )}

          {/* FIX: Removed h-[20vh] bg-black spacer. A hardcoded 20vh black
              void at the bottom of the feed served no purpose — it pushed
              the "all caught up" message upward and left a black gap that
              looked broken, especially on mobile. Replaced with a small
              bottom padding that gives the last post breathing room. */}
          {!loading && <div className="h-8" />}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100dvh-3rem)]">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default HomeView;