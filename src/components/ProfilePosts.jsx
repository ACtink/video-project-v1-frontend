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

//         // Minimum skeleton display time (700ms)
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
      

//       {/* GRID OR SKELETON */}
//       {(loading || posts.length > 0) && (
//         <div className="min-h-52 mt-8 grid grid-cols-3 gap-1 sm:gap-3 pb-14">
//           {loading
//             ? Array.from({ length: 9 }).map((_, i) => (
//                 <ProfilePostSkeleton key={i} />
//               ))
//             : posts.map((post) => (
//                 <div
//                   key={post._id}
//                   onClick={() => setSelectedPost(post)}
//                   className="aspect-square p-2 bg-white/5 hover:bg-white/10 overflow-hidden cursor-pointer rounded-sm border border-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
//                 >
//                   <img
//                     src={post.imageUrl}
//                     alt=""
//                     className="w-full h-full object-cover"
//                   />
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


import { useEffect, useState } from "react";
import PostModal from "./PostModal";
import fetchData from "../utils/fetchData";
import ProfilePostSkeleton from "./ProfilePostSkeleton";

function ProfilePosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const start = Date.now();

    const fetchPosts = async () => {
      try {
        const res = await fetchData(`/api/posts/user/${userId}`, {
          credentials: "include",
        });
        const data = await res.json();

        const elapsed = Date.now() - start;
        const delay = Math.max(700 - elapsed, 0);

        setTimeout(() => {
          setPosts(data);
          setLoading(false);
        }, delay);
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <>
      {(loading || posts.length > 0) && (
        <div className="mt-6 grid grid-cols-3 gap-0.5 sm:gap-1 pb-14">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
                <ProfilePostSkeleton key={i} />
              ))
            : posts.map((post) => (
                <div
                  key={post._id}
                  onClick={() => setSelectedPost(post)}
                  className="relative aspect-square overflow-hidden cursor-pointer group"
                >
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* hover overlay */}
                  <div
                    className="
                    absolute inset-0
                    bg-black/0 group-hover:bg-black/30
                    transition-all duration-200
                    flex items-center justify-center
                  "
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-3 text-white">
                      <span className="flex items-center gap-1 text-sm font-semibold drop-shadow">
                        ❤️ {post.likesCount || 0}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold drop-shadow">
                        💬 {post.commentsCount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      )}

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onDeleteProfilePost={() =>
            setPosts(posts.filter((p) => p._id !== selectedPost._id))
          }
        />
      )}
    </>
  );
}

export default ProfilePosts;
