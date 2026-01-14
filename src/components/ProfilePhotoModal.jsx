function ProfilePhotoModal({ open, onClose, onUpload, onRemove }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[90%] max-w-sm rounded-xl bg-neutral-900 text-white shadow-lg">
        <div className="border-b border-white/10 px-4 py-3 text-center text-lg font-semibold">
          Change Profile Photo
        </div>

        <div className="flex flex-col divide-y divide-white/10">
          <button
            onClick={onUpload}
            className="py-3 text-blue-400 hover:bg-white/5 transition"
          >
            Upload New Photo
          </button>

          <button
            onClick={onRemove}
            className="py-3 text-red-500 hover:bg-white/5 transition"
          >
            Remove Current Photo
          </button>

          <button
            onClick={onClose}
            className="py-3 hover:bg-white/5 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePhotoModal;
