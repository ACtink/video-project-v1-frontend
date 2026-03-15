// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PostModal from "./PostModal";

// function PostCard({ post , openProfile, onDelete}) {

// const [selectedPost, setSelectedPost] = useState(null);

//   const navigate = useNavigate();
//   return (
//     <div className="bg-black border border-white/10  overflow-hidden shadow max-w-md mx-auto">
//       {/* Header */}
//       <div
//         onClick={() => navigate(`/profile/${post.user.username}`)}
//         className="flex items-center gap-2 px-3 py-2 cursor-pointer"
//       >
//         {post.user.profilePicture ? (
//           <img
//             src={post.user.profilePicture}
//             alt=""
//             className="w-8 h-8 rounded-full object-cover"
//           />
//         ) : (
//           <div
//             className="
//                     w-8 h-8
//                     rounded-full
//                     flex items-center justify-center
//                     bg-emerald-600
//                     text-white
//                     font-bold
//                     text-sm
//                   "
//           >
//             {post.user.username?.charAt(0).toUpperCase()}
//           </div>
//         )}

//         <span className="font-medium text-sm">{post.user.username}</span>
//       </div>

//       {/* Image */}
//       <img
//         onClick={() => setSelectedPost(post)}
//         src={post.imageUrl}
//         alt=""
//         className="w-full max-h-[420px] object-cover cursor-pointer"
//       />

//       {/* Actions */}
//       <div className="px-3 py-2 space-y-1.5">
//         <div className="flex items-center gap-3 text-lg">
//           <button className="hover:text-red-500 transition">❤️</button>
//           <button className="hover:text-blue-400 transition">💬</button>
//         </div>

//         {/* Likes */}
//         <p className="text-sm font-medium">{post.likesCount} likes</p>

//         {/* Caption */}
//         {post.caption && (
//           <p className="text-sm leading-relaxed text-white/90">
//             <span className="font-semibold mr-2">{post.user.username}</span>
//             <span className="text-white/80">{post.caption}</span>
//           </p>
//         )}

//         {/* Comments */}
//         <p className="text-white/60 text-sm cursor-pointer">
//           View all {post.commentsCount} comments
//         </p>

//         {/* Time */}
//         <p className="text-xs text-white/40">
//           {new Date(post.createdAt).toLocaleDateString()}
//         </p>

//         {/* Add Comment */}
//         <input
//           placeholder="Add a comment..."
//           className="w-full bg-transparent border-t border-white/10 pt-1.5 text-sm outline-none placeholder-white/40"
//         />
//       </div>
//       {selectedPost && (
//         <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} onDelete={onDelete} />
//       )}
//     </div>
//   );
// }

// export default PostCard;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostModal from "./PostModal";

function PostCard({ post, onDelete }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-[#0a0a0a] border border-white/[0.08] max-w-[470px] mx-auto mb-6 overflow-hidden">
      {/* Header */}
      <div
        onClick={() => navigate(`/profile/${post.user.username}`)}
        className="flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer"
      >
        {post.user.profilePicture ? (
          <img
            src={post.user.profilePicture}
            alt=""
            className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {post.user.username?.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="flex-1 font-semibold text-[13.5px] text-neutral-100 tracking-wide">
          {post.user.username}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        >
          <circle cx="5" cy="12" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
        </svg>
      </div>

      {/* Image */}
      <img
        onClick={() => setSelectedPost(post)}
        src={post.imageUrl}
        alt=""
        className="w-full max-h-[470px] object-cover cursor-pointer block"
      />

      {/* Actions */}
      <div className="px-3.5 pt-2.5 pb-4">
        {/* Action Buttons */}
        <div className="flex items-center gap-1 mb-2">
          <button
            onClick={() => setLiked(!liked)}
            className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={liked ? "#ef4444" : "none"}
              stroke={liked ? "#ef4444" : "rgba(255,255,255,0.85)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button className="p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer ml-auto">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 10 22 21 22 3" />
              <line x1="12" y1="12" x2="22" y2="3" />
            </svg>
          </button>
        </div>

        {/* Likes */}
        <p className="text-[13.5px] font-semibold text-neutral-100 mb-1 tracking-wide">
          {post.likesCount.toLocaleString()} likes
        </p>

        {/* Caption */}
        {post.caption && (
          <p className="text-[13.5px] leading-relaxed text-white/75 mb-1.5">
            <span className="font-semibold text-neutral-100 mr-1.5">
              {post.user.username}
            </span>
            {post.caption}
          </p>
        )}

        {/* Comments */}
        <p className="text-[13px] text-white/35 cursor-pointer mb-2 tracking-wide">
          View all {post.commentsCount} comments
        </p>

        {/* Time */}
        <p className="text-[11px] text-white/25 mb-2.5 uppercase tracking-widest">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Add Comment */}
        <div className="flex items-center gap-2 border-t border-white/[0.07] pt-2.5">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment…"
            className="flex-1 bg-transparent border-none outline-none text-[13px] text-white/70 placeholder-white/30 tracking-wide"
          />
          {comment.trim() && (
            <button
              onClick={() => setComment("")}
              className="text-[12px] font-semibold text-blue-400 bg-transparent border-none cursor-pointer tracking-wide"
            >
              Post
            </button>
          )}
        </div>
      </div>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}

export default PostCard;