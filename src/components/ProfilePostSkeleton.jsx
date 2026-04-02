export default function ProfilePostSkeleton() {
  return (
    <div className="aspect-square relative overflow-hidden bg-neutral-900">
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
          backgroundSize: "200% 100%",
          animation: "profileShimmer 1.4s ease-in-out infinite",
        }}
      />
    </div>
  );
}
