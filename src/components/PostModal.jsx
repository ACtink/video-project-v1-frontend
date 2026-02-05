function PostModal({ post, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 sm:px-6">
      <div
        className="
    w-full max-w-5xl
    h-[78vh] md:h-[76vh]
    bg-black
    rounded-xl
    overflow-hidden
    flex flex-col md:flex-row
    relative

    transform transition-all duration-300 ease-out
    animate-postModalIn
  "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="
    absolute top-3 right-3 z-30

    w-10 h-10
    flex items-center justify-center

    rounded-full
    bg-black/60
    backdrop-blur-md
    border border-white/20

    text-white text-lg
    shadow-lg

    hover:bg-black/80
    hover:scale-110
    active:scale-95
    transition-all duration-200
  "
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

        {/* COMMENTS SIDE */}
        <div
          className="
            w-full md:w-1/2
            border-t md:border-t-0 md:border-l border-white/10
            flex flex-col
            text-white
          "
        >
          {/* CAPTION */}
          {post.caption && (
            <div className="p-5 border-b border-white/10 bg-white/[0.03] backdrop-blur-md">
              <p className="text-base md:text-lg leading-relaxed tracking-wide">
                <span className="font-bold text-white mr-2">
                  {post.user?.username} -
                </span>
                <span className="block max-w-[70%] text-white/85 font-medium">
                  {post.caption}
                </span>
              </p>
            </div>
          )}

          {/* COMMENTS HEADER */}
          <div className="p-4 border-b border-white/10 font-semibold text-white/80">
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
