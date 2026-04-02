// // import { useEffect, useState } from "react";
// // import PostModal from "./PostModal";
// // import fetchData from "../utils/fetchData";
// // import ProfilePostSkeleton from "./ProfilePostSkeleton";

// // function ProfilePosts({ userId }) {
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedPost, setSelectedPost] = useState(null);

// //   useEffect(() => {
// //     if (!userId) return;

// //     const start = Date.now();

// //     const fetchPosts = async () => {
// //       try {
// //         const res = await fetchData(`/api/posts/user/${userId}`, {
// //           credentials: "include",
// //         });
// //         const data = await res.json();

// //         // Minimum skeleton display time (700ms)
// //         const elapsed = Date.now() - start;
// //         const delay = Math.max(700 - elapsed, 0);

// //         setTimeout(() => {
// //           setPosts(data);
// //           setLoading(false);
// //         }, delay);
// //       } catch (err) {
// //         console.error("Failed to fetch posts", err);
// //         setLoading(false);
// //       }
// //     };

// //     fetchPosts();
// //   }, [userId]);

// //   return (
// //     <>

// //       {/* GRID OR SKELETON */}
// //       {(loading || posts.length > 0) && (
// //         <div className="min-h-52 mt-8 grid grid-cols-3 gap-1 sm:gap-3 pb-14">
// //           {loading
// //             ? Array.from({ length: 9 }).map((_, i) => (
// //                 <ProfilePostSkeleton key={i} />
// //               ))
// //             : posts.map((post) => (
// //                 <div
// //                   key={post._id}
// //                   onClick={() => setSelectedPost(post)}
// //                   className="aspect-square p-2 bg-white/5 hover:bg-white/10 overflow-hidden cursor-pointer rounded-sm border border-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
// //                 >
// //                   <img
// //                     src={post.imageUrl}
// //                     alt=""
// //                     className="w-full h-full object-cover"
// //                   />
// //                 </div>
// //               ))}
// //         </div>
// //       )}

// //       {selectedPost && (
// //         <PostModal
// //           post={selectedPost}
// //           onClose={() => setSelectedPost(null)}
// //           onDeleteProfilePost={() =>
// //             setPosts(posts.filter((p) => p._id !== selectedPost._id))
// //           }
// //         />
// //       )}
// //     </>
// //   );
// // }

// // export default ProfilePosts;

// import { useEffect, useState } from "react";
// import PostModal from "./PostModal";
// import fetchData from "../utils/fetchData";
// import ProfilePostSkeleton from "./ProfilePostSkeleton";

// function ProfilePosts({ userId }) {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedPost, setSelectedPost] = useState(null);

//   useEffect(() => {
//     if (!userId) return;

//     const start = Date.now();

//     const fetchPosts = async () => {
//       try {
//         const res = await fetchData(`/api/posts/user/${userId}`, {
//           credentials: "include",
//         });
//         const data = await res.json();

//         const elapsed = Date.now() - start;
//         const delay = Math.max(700 - elapsed, 0);

//         setTimeout(() => {
//           setPosts(data);
//           setLoading(false);
//         }, delay);
//       } catch (err) {
//         console.error("Failed to fetch posts", err);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [userId]);

//   return (
//     <>
//       {(loading || posts.length > 0) && (
//         <div className="mt-6 grid grid-cols-3 gap-0.5 sm:gap-1 pb-14">
//           {loading
//             ? Array.from({ length: 9 }).map((_, i) => (
//                 <ProfilePostSkeleton key={i} />
//               ))
//             : posts.map((post) => (
//                 <div
//                   key={post._id}
//                   onClick={() => setSelectedPost(post)}
//                   className="relative aspect-square overflow-hidden cursor-pointer group"
//                 >
//                   <img
//                     src={post.imageUrl}
//                     alt=""
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                   {/* hover overlay */}
//                   <div
//                     className="
//                     absolute inset-0
//                     bg-black/0 group-hover:bg-black/30
//                     transition-all duration-200
//                     flex items-center justify-center
//                   "
//                   >
//                     <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-3 text-white">
//                       <span className="flex items-center gap-1 text-sm font-semibold drop-shadow">
//                         ❤️ {post.likesCount || 0}
//                       </span>
//                       <span className="flex items-center gap-1 text-sm font-semibold drop-shadow">
//                         💬 {post.commentsCount || 0}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//         </div>
//       )}

//       {selectedPost && (
//         <PostModal
//           post={selectedPost}
//           onClose={() => setSelectedPost(null)}
//           onDeleteProfilePost={() =>
//             setPosts(posts.filter((p) => p._id !== selectedPost._id))
//           }
//         />
//       )}
//     </>
//   );
// }

// export default ProfilePosts;

// import { useEffect, useState, useCallback, useRef } from "react";
// import PostModal from "./PostModal";
// import fetchData from "../utils/fetchData";
// import ProfilePostSkeleton from "./ProfilePostSkeleton";
// import ImageWithSkeleton from "./ImageWithSketeton";

// const PAGE_SIZE = 6; // 12 = 4 rows of 3, looks clean

// function ProfilePosts({ userId }) {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const loaderRef = useRef(null); // sentinel div for IntersectionObserver

//   // ── Fetch one page ──────────────────────────────────────────
//   const fetchPage = useCallback(
//     async (pageNum) => {
//       if (!userId) return;
//       pageNum === 1 ? setLoading(true) : setLoadingMore(true);
//       try {
//         const res = await fetchData(
//           `/api/posts/user/${userId}?page=${pageNum}&limit=${PAGE_SIZE}`,
//           { credentials: "include" },
//         );
//         const data = await res.json();
//         const incoming = Array.isArray(data.posts) ? data.posts : data; // backwards-compat

//         setPosts((prev) => (pageNum === 1 ? incoming : [...prev, ...incoming]));
//         // If we got fewer than PAGE_SIZE we've hit the end
//         setHasMore(incoming.length === PAGE_SIZE);
//       } catch (err) {
//         console.error("Failed to fetch posts", err);
//       } finally {
//         setLoading(false);
//         setLoadingMore(false);
//       }
//     },
//     [userId],
//   );

//   // Reset + load page 1 whenever userId changes
//   useEffect(() => {
//     setPosts([]);
//     setPage(1);
//     setHasMore(true);
//     fetchPage(1);
//   }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

//   // Load subsequent pages
//   useEffect(() => {
//     if (page === 1) return; // already handled above
//     fetchPage(page);
//   }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

//   // ── IntersectionObserver — auto-load next page ──────────────
//   useEffect(() => {
//     if (!loaderRef.current) return;
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
//           setPage((p) => p + 1);
//         }
//       },
//       { rootMargin: "200px" },
//     );
//     observer.observe(loaderRef.current);
//     return () => observer.disconnect();
//   }, [hasMore, loadingMore, loading]);

//   // ── Delete handler passed up from PostModal ─────────────────
//   const handleDelete = (deletedId) => {
//     setPosts((prev) => prev.filter((p) => p._id !== deletedId));
//     setSelectedPost(null);
//   };

//   if (!loading && posts.length === 0) return null; // ProfileView shows empty state

//   return (
//     <>
//       <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-0.5 sm:gap-1 pb-14">
//         {/* Initial skeleton */}
//         {loading
//           ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
//               <ProfilePostSkeleton key={i} />
//             ))
//           : posts.map((post) => (
//               <div
//                 key={post._id}
//                 onClick={() => setSelectedPost(post)}
//                 className="relative aspect-square overflow-hidden cursor-pointer group"
//               >
//                 <ImageWithSkeleton src={post.imageUrl} />
//                 {/* Hover overlay */}
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-200 flex items-center justify-center">
//                   <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-3 sm:gap-4 text-white">
//                     <span className="flex items-center gap-1 text-xs sm:text-sm font-semibold drop-shadow">
//                       ❤️ {post.likesCount || 0}
//                     </span>
//                     <span className="flex items-center gap-1 text-xs sm:text-sm font-semibold drop-shadow">
//                       💬 {post.commentsCount || 0}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}

//         {/* "Load more" skeletons while fetching next page */}
//         {loadingMore &&
//           Array.from({ length: 6 }).map((_, i) => (
//             <ProfilePostSkeleton key={`more-${i}`} />
//           ))}
//       </div>

//       {/* Sentinel — IntersectionObserver watches this */}
//       {hasMore && !loading && (
//         <div ref={loaderRef} className="h-4" aria-hidden="true" />
//       )}

//       {/* End of posts indicator */}
//       {!hasMore && posts.length > 0 && (
//         <p className="text-center text-xs text-white/20 pb-10 tracking-widest">
//           · · ·
//         </p>
//       )}

//       {selectedPost && (
//         <PostModal
//           post={selectedPost}
//           onClose={() => setSelectedPost(null)}
//           onDeleteProfilePost={() => handleDelete(selectedPost._id)}
//         />
//       )}
//     </>
//   );
// }

// export default ProfilePosts;

import { useEffect, useState, useCallback, useRef } from "react";
import PostModal from "./PostModal";
import fetchData from "../utils/fetchData";
import ProfilePostSkeleton from "./ProfilePostSkeleton";

const PAGE_SIZE = 12;

// ── Add shimmer keyframe once into the document head ──────────
if (typeof document !== "undefined") {
  const id = "profile-shimmer-style";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes profileShimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ── Single post cell with per-image skeleton ──────────────────
function PostCell({ post, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="relative aspect-square overflow-hidden cursor-pointer group bg-neutral-900"
    >
      {/* Skeleton shown until image loads */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
            backgroundSize: "200% 100%",
            animation: "profileShimmer 1.4s ease-in-out infinite",
          }}
        />
      )}

      {/* Image — invisible until loaded, then fades in */}
      <img
        src={post.imageUrl}
        alt=""
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          animation: loaded ? "fadeIn 0.25s ease" : "none",
          transition: "transform 0.3s ease",
        }}
        className="group-hover:scale-105"
      />

      {/* Hover overlay */}
      {loaded && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-3 sm:gap-4 text-white">
            <span className="flex items-center gap-1 text-xs sm:text-sm font-semibold drop-shadow">
              ❤️ {post.likesCount || 0}
            </span>
            <span className="flex items-center gap-1 text-xs sm:text-sm font-semibold drop-shadow">
              💬 {post.commentsCount || 0}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────
function ProfilePosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const loaderRef = useRef(null);

  const fetchPage = useCallback(
    async (pageNum) => {
      if (!userId) return;
      pageNum === 1 ? setLoading(true) : setLoadingMore(true);
      try {
        const res = await fetchData(
          `/api/posts/user/${userId}?page=${pageNum}&limit=${PAGE_SIZE}`,
          { credentials: "include" },
        );
        const data = await res.json();
        const incoming = Array.isArray(data.posts) ? data.posts : data;
        setPosts((prev) => (pageNum === 1 ? incoming : [...prev, ...incoming]));
        setHasMore(incoming.length === PAGE_SIZE);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [userId],
  );

  // Reset on userId change
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    fetchPage(1);
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load subsequent pages
  useEffect(() => {
    if (page === 1) return;
    fetchPage(page);
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading]);

  const handleDelete = (deletedId) => {
    setPosts((prev) => prev.filter((p) => p._id !== deletedId));
    setSelectedPost(null);
  };

  if (!loading && posts.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center gap-3 text-white/30">
        <span className="text-5xl opacity-40">📷</span>
        <p className="text-sm tracking-wide">No posts yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-0.5 sm:gap-1 pb-14">
        {loading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <ProfilePostSkeleton key={i} />
            ))
          : posts.map((post) => (
              <PostCell
                key={post._id}
                post={post}
                onClick={() => setSelectedPost(post)}
              />
            ))}

        {loadingMore &&
          Array.from({ length: 6 }).map((_, i) => (
            <ProfilePostSkeleton key={`more-${i}`} />
          ))}
      </div>

      {hasMore && !loading && (
        <div ref={loaderRef} className="h-4" aria-hidden="true" />
      )}

      {!hasMore && posts.length > 0 && (
        <p className="text-center text-xs text-white/20 pb-10 tracking-widest">
          · · ·
        </p>
      )}

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onDeleteProfilePost={() => handleDelete(selectedPost._id)}
        />
      )}
    </>
  );
}

export default ProfilePosts;