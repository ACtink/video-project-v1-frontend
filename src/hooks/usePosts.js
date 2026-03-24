import { useState, useCallback } from "react";

export function usePosts(initialPosts = []) {
  const [posts, setPosts] = useState(initialPosts);

  const updatePostLike = useCallback((postId, userId, liked, likesCount) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (String(p._id) !== String(postId)) return p;
        return {
          ...p,
          likesCount,
          likes: liked
            ? [...new Set([...(p.likes || []), String(userId)])]
            : (p.likes || []).filter((id) => String(id) !== String(userId)),
        };
      }),
    );
  }, []);

  return { posts, setPosts, updatePostLike };
}
