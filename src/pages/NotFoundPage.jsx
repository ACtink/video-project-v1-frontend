import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-5 px-4">
      <p className="text-[64px] font-black text-white/10 leading-none select-none">
        404
      </p>

      <div className="text-center space-y-2">
        <p className="text-[17px] font-semibold text-white/70">
          This page doesn't exist
        </p>
        <p className="text-[13px] text-white/30 max-w-[260px] leading-relaxed">
          It may have been removed or the address is incorrect.
        </p>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 text-[13px] font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/6 transition-all duration-150 active:scale-95"
        >
          Go back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 text-[13px] font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-150 active:scale-95"
        >
          Home
        </button>
      </div>
    </div>
  );
}
