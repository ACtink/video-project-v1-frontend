// import { useState } from "react";
// import { loginUser } from "../api/auth";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import { useAuth } from "../hooks/useAuth";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { refreshUser } = useAuth();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await loginUser({
//         email: formData.email.trim(),
//         password: formData.password,
//       });

//       setFormData({ email: "", password: "" });
//       await refreshUser();
//       navigate("/");
//     } catch (err) {
//       setError(err.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* <Header /> */}

//       {/* Soft glow behind card */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <div className="w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />
//       </div>

//       <main className="flex-1 mt-16 flex items-center justify-center px-4 py-6 sm:px-0 sm:py-0 relative z-10">
//         <div
//           className="
//             w-full max-w-md
//             rounded-2xl
//             p-6 sm:p-8
//             bg-white/20
//             backdrop-blur-2xl
//             border border-white/30
//             shadow-[0_20px_50px_rgba(0,0,0,0.25)]
//             max-h-[85vh] overflow-y-auto
//           "
//         >
//           {/* Header */}
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-purple-300 via-indigo-300 to-white bg-clip-text text-transparent">
//             Welcome Back
//           </h2>
//           <p className="text-center text-white/60 mt-2 tracking-wide">
//             Log in to continue the conversation
//           </p>

//           {/* Error */}
//           {error && (
//             <p className="mt-4 text-red-300 text-sm text-center">{error}</p>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-white">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="you@example.com"
//                 autoComplete="email"
//                 className="mt-1 w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-500 border border-white/40 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 placeholder="••••••••"
//                 autoComplete="current-password"
//                 className="mt-1 w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-500 border border-white/40 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 rounded-xl font-semibold text-lg transition-all
//                 ${
//                   !loading
//                     ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
//                     : "bg-white/40 text-white/60 cursor-not-allowed"
//                 }`}
//             >
//               {loading ? "Logging in..." : "Log In"}
//             </button>
//           </form>

//           {/* Footer */}
//           <p className="mt-6 text-center text-white/80 text-sm">
//             Don’t have an account?{" "}
//             <span className="text-indigo-200 font-medium cursor-pointer hover:underline">
//               <Link to="/join"> Join Now </Link>
//             </span>
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default LoginPage;


import { useState } from "react";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AlertCircle, Loader2 } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });
      setFormData({ email: "", password: "" });
      await refreshUser();
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full px-4 py-3 rounded-xl
    bg-white/[0.04] hover:bg-white/[0.06]
    border border-white/10 hover:border-white/20
    text-[14px] text-white placeholder-white/25
    focus:outline-none focus:border-white/30 focus:bg-white/[0.06]
    transition-all duration-150
  `;

  const labelClass =
    "block text-[12px] font-medium text-white/50 tracking-wide uppercase mb-1.5";

  return (
    <div className="min-h-full flex items-center justify-center px-4 py-10 relative">
      {/* background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[500px] h-[500px] bg-indigo-600/15 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* CARD */}
        <div
          className="
          bg-[#0f0f0f]
          border border-white/10
          rounded-2xl
          overflow-hidden
          shadow-2xl
        "
        >
          {/* HEADER */}
          <div className="px-6 pt-8 pb-6 text-center border-b border-white/10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-[12px] font-black">HS</span>
              </div>
            </div>
            <h1 className="text-[22px] font-bold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-[13px] text-white/40 mt-1.5 tracking-wide">
              Log in to continue the conversation
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            {/* ERROR */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
                <p className="text-[13px] text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                autoComplete="email"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                autoComplete="current-password"
                className={inputClass}
              />
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full h-[46px]
                  flex items-center justify-center gap-2
                  rounded-xl
                  text-[14px] font-semibold text-white tracking-wide
                  bg-indigo-600 hover:bg-indigo-500
                  disabled:opacity-40 disabled:cursor-not-allowed
                  active:scale-[0.98] transition-all duration-150
                  shadow-[0_0_20px_rgba(99,102,241,0.25)]
                  hover:shadow-[0_0_28px_rgba(99,102,241,0.4)]
                "
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Logging in…
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </div>

            <p className="text-center text-[13px] text-white/35 pt-1">
              Don't have an account?{" "}
              <Link
                to="/join"
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Join Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
