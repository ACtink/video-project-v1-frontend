function ProfileSkeleton() {
  return (
    <div
      className="
        bg-black text-white
        flex justify-center
        h-[calc(100vh-72px-56px)]
        overflow-y-auto
      "
    >
      <div className="w-full max-w-[935px] px-4 pt-10 animate-pulse">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Avatar */}
          <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-white/10 mx-auto sm:mx-0" />

          {/* Right */}
          <div className="flex-1 space-y-4">
            <div className="h-4 w-32 bg-white/10 rounded" />

            <div className="h-4 w-48 bg-white/10 rounded" />

            <div className="flex gap-6">
              <div className="h-4 w-16 bg-white/10 rounded" />
              <div className="h-4 w-16 bg-white/10 rounded" />
              <div className="h-4 w-16 bg-white/10 rounded" />
            </div>

            <div className="h-8 w-32 bg-white/10 rounded-lg" />
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/10" />

        {/* Posts grid */}
        <div className="grid grid-cols-3 gap-2 mt-10">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="aspect-square bg-white/10 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;
