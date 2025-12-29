import { useAuth } from "../hooks/useAuth";

function DisplayUserInfoCard({ strangerInfo = {} }) {
  const { user, loading } = useAuth();

  console.log("Stranger Info in DisplayUserInfoCard:", strangerInfo.data);

  if (!user || loading) return null;

  return (
    <div
      className="
        absolute inset-0 z-20
        flex items-center justify-center
        bg-black
        pointer-events-none
        transition-opacity duration-300
      "
    >
      {/* CONTENT */}
      <div
        className="
          flex flex-col items-center text-center
          transform transition-all duration-300
          opacity-100 scale-100
        "
      >
        {/* Accent line */}
        <div className="w-12 h-[3px] rounded-full bg-cyan-400 mb-4" />

        <p className="text-sm text-gray-400 mb-1 tracking-wide">
          You are connecting with
        </p>

        <h2 className="text-2xl font-semibold text-white">
          {strangerInfo?.data?.username || "Anonymous"}
        </h2>

        <p className="text-sm text-cyan-400 mt-1">
          {strangerInfo?.data?.country || "Unknown location"}
        </p>
      </div>
    </div>
  );
}

export default DisplayUserInfoCard;
