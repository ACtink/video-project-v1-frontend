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

import { useEffect, useState, useRef } from "react";
import PostCard from "../PostCard";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "../RightSidebar";
import fetchData from "../../utils/fetchData";
import SkeletonPost from "../SkeletonPost";

/* CACHE */
let cachedPosts = null;

/* SCROLL CACHE */
let cachedScrollY = 0;



function HomeView({ openProfile }) {

  const containerRef = useRef(null);
  const scrollThrottleRef = useRef(false);

  const [posts, setPosts] = useState(cachedPosts || []);
  const [loading, setLoading] = useState(!cachedPosts);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);




  const refreshLatestPosts = async () => {
    try {
      const res = await fetchData(`/api/posts?page=1&limit=10`, {
        credentials: "include",
      });

      const latest = await res.json();

      if (!latest.length) return;

      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));

        const newPosts = latest.filter((p) => !existingIds.has(p._id));

        if (!newPosts.length) return prev;

        const updated = [...newPosts, ...prev];

        cachedPosts = updated;

        return updated;
      });
    } catch (err) {
      console.error("refresh feed error", err);
    }
  };

  useEffect(() => {
    if (cachedPosts) {
      setLoading(false);

      refreshLatestPosts();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = cachedScrollY;
          }
        });
      });

      return;
    }

    const start = Date.now();

    fetchData(`/api/posts?page=1&limit=10`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const elapsed = Date.now() - start;
        const delay = Math.max(900 - elapsed, 0);

        setTimeout(() => {
          cachedPosts = data;

          setPosts(data);

          if (data.length < 10) {
            setHasMore(false);
          }

          setLoading(false);
        }, delay);
      })
      .catch(() => setLoading(false));
  }, []);

  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    try {
      const res = await fetchData(`/api/posts?page=${page + 1}&limit=10`, {
        credentials: "include",
      });

      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

     setPosts((prev) => {
       const existingIds = new Set(prev.map((p) => p._id));

       const newPosts = data.filter((p) => !existingIds.has(p._id));

       if (!newPosts.length) {
         setHasMore(false);
         return prev;
       }

       const updated = [...prev, ...newPosts];

       cachedPosts = updated;

       return updated;
     });

      setPage((prev) => prev + 1);

      if (data.length < 10) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = () => {
    if (scrollThrottleRef.current) return;

    scrollThrottleRef.current = true;

    setTimeout(() => {
      scrollThrottleRef.current = false;
    }, 200);

    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    cachedScrollY = scrollTop;

    if (scrollTop + clientHeight >= scrollHeight - 300) {
      loadMorePosts();
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen overflow-y-auto text-white"
    >
      <div className="max-w-7xl mx-auto pt-5 pb-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
          <LeftSidebar />
        </div>

        {/* FEED */}
        <div className="lg:col-span-6 space-y-6 transition-opacity duration-500">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonPost key={i} />)
            : posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  openProfile={openProfile}
                  onDelete={() => {
                    const updated = posts.filter((p) => p._id !== post._id);

                    setPosts(updated);

                    cachedPosts = updated;
                  }}
                />
              ))}

          {loadingMore && (
            <div className="flex justify-center py-6 text-gray-400">
              Loading more posts...
            </div>
          )}

          {!loading && <div className="h-[20vh] bg-black" />}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden lg:block lg:col-span-3 sticky top-6 h-[calc(100vh-3rem)]">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default HomeView;