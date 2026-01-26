function PostModal({ post, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div
        className="
        w-full max-w-5xl
        h-[80vh] md:h-[78vh]
        bg-black
        rounded-xl
        overflow-hidden
        flex flex-col md:flex-row
        relative
      "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl z-10"
        >
          ✕
        </button>

        {/* IMAGE */}
        <div
          className="
          w-full md:w-1/2
          h-[45%] md:h-full
          bg-black
          flex items-center justify-center
        "
        >
          <img
            src={post.imageUrl}
            alt=""
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* COMMENTS */}
        <div
          className="
          w-full md:w-1/2
          border-t md:border-t-0 md:border-l border-white/10
          flex flex-col
          text-white
        "
        >
          {/* HEADER */}
          <div className="p-4 border-b border-white/10 font-semibold">
            Comments
          </div>

          {/* COMMENTS LIST */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm text-white/80">
            <div>No comments yet</div>
          </div>

          {/* ADD COMMENT */}
          <div className="p-4 border-t border-white/10">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full bg-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
