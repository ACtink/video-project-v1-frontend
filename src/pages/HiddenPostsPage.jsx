import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, EyeOff } from "lucide-react";
import fetchData from "../utils/fetchData";

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="w-14 h-14 rounded-xl bg-white/8 flex-shrink-0 animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-28 bg-white/8 rounded-full animate-pulse" />
        <div className="h-2.5 w-40 bg-white/5 rounded-full animate-pulse" />
      </div>
      <div className="w-16 h-8 bg-white/8 rounded-lg animate-pulse" />
    </div>
  );
}

export default function HiddenPostsPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restoring, setRestoring] = useState(null);

  const fetchHiddenPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchData("/api/posts/not-interested", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch hidden posts");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHiddenPosts();
  }, [fetchHiddenPosts]);

  const handleRestore = async (postId) => {
    try {
      setRestoring(postId);
      await fetchData(`/api/posts/${postId}/not-interested`, {
        method: "DELETE",
        credentials: "include",
      });
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error("Restore error:", err);
    } finally {
      setRestoring(null);
    }
  };

  return (
    <div className="bg-black text-white min-h-[calc(100vh-72px-56px)] md:min-h-[calc(100vh-80px-56px)] overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150 active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-[20px] font-bold text-white tracking-tight">
            Hidden Posts
          </h1>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden divide-y divide-white/8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <p className="text-[13px] text-red-400">{error}</p>
              <button
                onClick={fetchHiddenPosts}
                className="px-5 py-2 text-[13px] font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150"
              >
                Retry
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <EyeOff size={20} className="text-white/20" />
              </div>
              <p className="text-[14px] text-white/30">No hidden posts</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="flex items-center gap-4 px-4 py-3">
                {/* Thumbnail */}
                <img
                  src={post.imageUrl}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0 opacity-60"
                />

                {/* Info */}
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => navigate(`/profile/${post.user?.username}`)}
                >
                  <p className="text-[14px] font-semibold text-white/90 truncate">
                    @{post.user?.username}
                  </p>
                  {post.caption ? (
                    <p className="text-[12px] text-white/35 truncate mt-0.5">
                      {post.caption}
                    </p>
                  ) : (
                    <p className="text-[12px] text-white/20 truncate mt-0.5 italic">
                      No caption
                    </p>
                  )}
                </div>

                {/* Restore button */}
                <button
                  onClick={() => handleRestore(post._id)}
                  disabled={restoring === post._id}
                  className="px-4 py-1.5 text-[12px] font-semibold rounded-lg border border-white/15 text-white/70 hover:text-white hover:bg-white/8 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {restoring === post._id ? "..." : "Restore"}
                </button>
              </div>
            ))
          )}
        </div>

        {posts.length > 0 && !loading && (
          <p className="text-center text-[11px] text-white/20 mt-4">
            {posts.length} hidden {posts.length === 1 ? "post" : "posts"}
          </p>
        )}
      </div>
    </div>
  );
}
