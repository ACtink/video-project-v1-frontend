export default function SkeletonPost() {
  return (
    <div className="bg-black border border-white/10 rounded-lg overflow-hidden shadow max-w-md mx-auto animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="w-8 h-8 rounded-full bg-neutral-700" />
        <div className="h-3 w-24 bg-neutral-700 rounded" />
      </div>

      {/* Image */}
      <div className="w-full h-[420px] bg-neutral-800" />

      {/* Actions + Content */}
      <div className="px-3 py-2 space-y-3">
        {/* Action icons */}
        <div className="flex gap-3">
          <div className="w-6 h-6 bg-neutral-700 rounded" />
          <div className="w-6 h-6 bg-neutral-700 rounded" />
        </div>

        {/* Likes */}
        <div className="h-3 w-20 bg-neutral-700 rounded" />

        {/* Caption lines */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-neutral-700 rounded" />
          <div className="h-3 w-4/5 bg-neutral-700 rounded" />
        </div>

        {/* Comments */}
        <div className="h-3 w-40 bg-neutral-700 rounded" />

        {/* Time */}
        <div className="h-2 w-24 bg-neutral-700 rounded" />

        {/* Input */}
        <div className="h-8 w-full bg-neutral-800 rounded" />
      </div>
    </div>
  );
}
