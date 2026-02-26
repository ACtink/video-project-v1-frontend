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

        // Minimum skeleton display time (700ms)
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
      {/* EMPTY STATE */}
      {/* {!loading && posts.length === 0 && (
        <div className="mt-8 flex justify-center items-center text-white/60 text-lg">
          No posts yet
        </div>
      )} */}

      {/* GRID OR SKELETON */}
      {(loading || posts.length > 0) && (
        <div className="min-h-52 mt-8 grid grid-cols-3 gap-1 sm:gap-3 pb-14">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
                <ProfilePostSkeleton key={i} />
              ))
            : posts.map((post) => (
                <div
                  key={post._id}
                  onClick={() => setSelectedPost(post)}
                  className="aspect-square p-2 bg-white/10 overflow-hidden cursor-pointer"
                >
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
        </div>
      )}

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
}

export default ProfilePosts;
