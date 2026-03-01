import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostModal from "./PostModal";

function PostCard({ post , openProfile, onDelete}) {
  
const [selectedPost, setSelectedPost] = useState(null);



  const navigate = useNavigate();
  return (
    <div className="bg-black border border-white/10  overflow-hidden shadow max-w-md mx-auto">
      {/* Header */}
      <div
        onClick={() => navigate(`/profile/${post.user.username}`)}
        className="flex items-center gap-2 px-3 py-2 cursor-pointer"
      >
        {post.user.profilePicture ? (
          <img
            src={post.user.profilePicture}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div
            className="
                    w-8 h-8
                    rounded-full
                    flex items-center justify-center
                    bg-emerald-600
                    text-white
                    font-bold
                    text-sm
                  "
          >
            {post.user.username?.charAt(0).toUpperCase()}
          </div>
        )}

        <span className="font-medium text-sm">{post.user.username}</span>
      </div>

      {/* Image */}
      <img
        onClick={() => setSelectedPost(post)}
        src={post.imageUrl}
        alt=""
        className="w-full max-h-[420px] object-cover cursor-pointer"
      />

      {/* Actions */}
      <div className="px-3 py-2 space-y-1.5">
        <div className="flex items-center gap-3 text-lg">
          <button className="hover:text-red-500 transition">❤️</button>
          <button className="hover:text-blue-400 transition">💬</button>
        </div>

        {/* Likes */}
        <p className="text-sm font-medium">{post.likesCount} likes</p>

        {/* Caption */}
        {post.caption && (
          <p className="text-sm leading-relaxed text-white/90">
            <span className="font-semibold mr-2">{post.user.username}</span>
            <span className="text-white/80">{post.caption}</span>
          </p>
        )}

        {/* Comments */}
        <p className="text-white/60 text-sm cursor-pointer">
          View all {post.commentsCount} comments
        </p>

        {/* Time */}
        <p className="text-xs text-white/40">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {/* Add Comment */}
        <input
          placeholder="Add a comment..."
          className="w-full bg-transparent border-t border-white/10 pt-1.5 text-sm outline-none placeholder-white/40"
        />
      </div>
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} onDelete={onDelete} />
      )}
    </div>
  );
}

export default PostCard;
