import { useEffect, useState } from "react";

function ProfilePosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/posts/user/${userId}`,
          { credentials: "include" },
        );
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };

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
          className="aspect-square bg-white/10 overflow-hidden"
        >
          <img
            src={post.imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default ProfilePosts;
