import { useEffect, useState } from "react";
import PostModal from "./PostModal";
import fetchData from "../utils/fetchData";

function ProfilePosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await fetchData(`/api/posts/user/${userId}`, {
        credentials: "include",
      });
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchPosts();
  }, [userId]);

  if (loading) {
    return <div className="mt-8 text-center text-white/60">Loading posts…</div>;
  }

  if (posts.length === 0) {
    return <div className="mt-8 text-center text-white/60">No posts yet</div>;
  }

  return (
    <div className="mt-8 grid grid-cols-3  gap-1 sm:gap-3">
      {posts.map((post) => (
        <div
          key={post._id}
          onClick={() => setSelectedPost(post)}
          className="aspect-square bg-white/10 overflow-hidden cursor-pointer"
        >
          <img
            src={post.imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}

export default ProfilePosts;
