// import { useState } from "react";
// import fetchData from "../utils/fetchData";

// function CreatePostModal({ open, onClose }) {
//   const [caption, setCaption] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   if (!open) return null;

//   const handleSubmit = async () => {
//     if (!image) {
//       setError("Please select an image");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("caption", caption);

//       const response = await fetchData(`/api/upload/post`, {
//         method: "POST",
//         credentials: "include", // ✅ cookie-based auth
//         body: formData,
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(err?.error || "Upload failed");
//       }

//       const data = await response.json();
//       console.log("Post created:", data);

//       // reset & close
//       setCaption("");
//       setError("");
//       setImage(null);
//       onClose();
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//       setError("");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
//       <div className="w-full max-w-md bg-black border border-white/20 rounded-xl shadow-xl">
//         {/* HEADER */}
//         <div className="flex justify-between items-center px-4 py-3 border-b border-white/20">
//           <h3 className="font-semibold text-white">Create post</h3>
//           <button
//             onClick={() => {
//               setError("");
//               onClose();
//             }}
//             className="text-white/60 hover:text-white text-lg"
//           >
//             ✕
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="p-4 space-y-4">
//           {/* Image picker */}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//             className="w-full text-sm text-white"
//           />

//           {/* Caption */}
//           <textarea
//             placeholder="Write a caption..."
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//             className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:border-white/40"
//             rows={4}
//           />

//           {/* Error */}
//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           {/* Submit */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-sm py-2 rounded-lg disabled:opacity-50"
//           >
//             {loading ? "Posting..." : "Post"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreatePostModal;

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, ImagePlus, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import fetchData from "../utils/fetchData";

function CreatePostModal({ open, onClose }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setError("");
    setPreview(URL.createObjectURL(file));
  };

  const handleClose = () => {
    setCaption("");
    setImage(null);
    setPreview(null);
    setError("");
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);
      const response = await fetchData(`/api/upload/post`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error || "Upload failed");
      }
      const data = await response.json();
      console.log("Post created:", data);
      setSuccess(true);
      setTimeout(() => {
        handleClose();
        window.location.reload();
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      onClick={(e) => e.target === e.currentTarget && !loading && handleClose()}
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="text-[15px] font-semibold text-white tracking-tight">
            Create post
          </h3>
          <button
            onClick={handleClose}
            disabled={loading}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white disabled:opacity-40 active:scale-90 transition-all duration-150"
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 space-y-3">
          {/* IMAGE PICKER */}
          <label
            className={`
            relative flex flex-col items-center justify-center
            w-full rounded-xl overflow-hidden cursor-pointer
            border border-dashed transition-all duration-150
            ${preview ? "border-white/10 h-56" : "border-white/15 hover:border-white/30 h-36 bg-white/[0.02] hover:bg-white/[0.04]"}
          `}
          >
            {preview ? (
              <>
                <img
                  src={preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {/* change photo overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                  <span className="text-[12px] text-white/80 font-medium tracking-wide">
                    Change photo
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-white/30">
                <ImagePlus size={28} strokeWidth={1.5} />
                <span className="text-[13px] tracking-wide">
                  Tap to select a photo
                </span>
                <span className="text-[11px] text-white/20">
                  JPG, PNG up to 5MB
                </span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
          </label>

          {/* CAPTION */}
          <textarea
            placeholder="Write a caption…"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            disabled={loading}
            rows={3}
            maxLength={500}
            className="
              w-full bg-white/[0.04] hover:bg-white/[0.06]
              border border-white/10
              rounded-xl p-3
              text-[13px] text-white placeholder-white/25
              resize-none focus:outline-none focus:border-white/20
              transition-colors duration-150
              disabled:opacity-50
            "
          />
          <p className="text-[11px] text-white/20 text-right -mt-1 pr-1">
            {caption.length}/500
          </p>

          {/* ERROR */}
          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
              <p className="text-[13px] text-red-400">{error}</p>
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2
                size={14}
                className="text-emerald-400 flex-shrink-0"
              />
              <p className="text-[13px] text-emerald-400">
                Post shared successfully!
              </p>
            </div>
          )}

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading || success || !image}
            className="
              w-full h-[46px]
              flex items-center justify-center gap-2
              rounded-xl
              bg-indigo-600 hover:bg-indigo-500
              text-[14px] font-semibold text-white tracking-wide
              disabled:opacity-40 disabled:cursor-not-allowed
              active:scale-[0.98] transition-all duration-150
            "
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Uploading…
              </>
            ) : success ? (
              <>
                <CheckCircle2 size={16} />
                Posted!
              </>
            ) : (
              "Share post"
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default CreatePostModal;