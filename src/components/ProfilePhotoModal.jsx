// function ProfilePhotoModal({ open, onClose, onUpload, onRemove }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//       <div className="w-[90%] max-w-sm rounded-xl bg-neutral-900 text-white shadow-lg">
//         <div className="border-b border-white/10 px-4 py-3 text-center text-lg font-semibold">
//           Change Profile Photo
//         </div>

//         <div className="flex flex-col divide-y divide-white/10">
//           <button
//             onClick={onUpload}
//             className="py-3 text-blue-400 hover:bg-white/5 transition"
//           >
//             Upload New Photo
//           </button>

//           <button
//             onClick={onRemove}
//             className="py-3 text-red-500 hover:bg-white/5 transition"
//           >
//             Remove Current Photo
//           </button>

//           <button
//             onClick={onClose}
//             className="py-3 hover:bg-white/5 transition"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfilePhotoModal;

import { X, Upload, Trash2 } from "lucide-react";

function ProfilePhotoModal({ open, onClose, onUpload, onRemove }) {
  if (!open) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="text-[15px] font-semibold text-white tracking-tight">
            Profile Photo
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white active:scale-90 transition-all duration-150"
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-2 p-3">
          <button
            onClick={onUpload}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-white/5 active:bg-white/8 active:scale-[0.98] transition-all duration-150 text-left group"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600/30 transition-colors">
              <Upload size={15} className="text-indigo-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-white">
                Upload new photo
              </span>
              <span className="text-[12px] text-white/35">
                JPG, PNG up to 5MB
              </span>
            </div>
          </button>

          <button
            onClick={onRemove}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-red-500/8 active:scale-[0.98] transition-all duration-150 text-left group"
          >
            <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/25 transition-colors">
              <Trash2 size={15} className="text-red-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-red-400">
                Remove current photo
              </span>
              <span className="text-[12px] text-white/35">
                This cannot be undone
              </span>
            </div>
          </button>
        </div>

        {/* CANCEL */}
        <div className="px-3 pb-3">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-[13px] font-semibold text-white/40 hover:text-white/60 hover:bg-white/5 active:scale-[0.98] transition-all duration-150 tracking-wide"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePhotoModal;
