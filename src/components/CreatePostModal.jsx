import { useState } from "react";

function CreatePostModal({ open, onClose }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    if (!image) {
      setError("Please select an image");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);

      const response = await fetch(
        `http://localhost:3000/api/upload/post`,
        {
          method: "POST",
          credentials: "include", // ✅ cookie-based auth
          body: formData,
        },
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error || "Upload failed");
      }

      const data = await response.json();
      console.log("Post created:", data);

      // reset & close
      setCaption("");
      setImage(null);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="w-full max-w-md bg-black border border-white/20 rounded-xl shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-white/20">
          <h3 className="font-semibold text-white">Create post</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 space-y-4">
          {/* Image picker */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm text-white"
          />

          {/* Caption */}
          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:border-white/40"
            rows={4}
          />

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-sm py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
