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

// import { useState } from "react";
// import { loginUser } from "../api/auth";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { AlertCircle, Loader2 } from "lucide-react";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { refreshUser } = useAuth();

//   const [showPassword, setShowPassword] = useState(false);

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
//       console.log("Login error:", err);
//       setError(err.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass = `
//     w-full px-4 py-3 rounded-xl
//     bg-white/[0.04] hover:bg-white/[0.06]
//     border border-white/10 hover:border-white/20
//     text-[14px] text-white placeholder-white/25
//     focus:outline-none focus:border-white/30 focus:bg-white/[0.06]
//     transition-all duration-150
//   `;

//   const labelClass =
//     "block text-[12px] font-medium text-white/50 tracking-wide uppercase mb-1.5";

//   return (
//     <div className="min-h-full flex items-center justify-center px-4 py-10 relative">
//       {/* background glow */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
//         <div className="w-[500px] h-[500px] bg-indigo-600/15 blur-[120px] rounded-full" />
//       </div>

//       <div className="relative z-10 w-full max-w-sm">
//         {/* CARD */}
//         <div
//           className="
//           bg-[#0f0f0f]
//           border border-white/10
//           rounded-2xl
//           overflow-hidden
//           shadow-2xl
//         "
//         >
//           {/* HEADER */}
//           <div className="px-6 pt-8 pb-6 text-center border-b border-white/10">
//             <div className="flex items-center justify-center mb-4">
//               <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
//                 <span className="text-white text-[12px] font-black">HS</span>
//               </div>
//             </div>
//             <h1 className="text-[22px] font-bold text-white tracking-tight">
//               Welcome back
//             </h1>
//             <p className="text-[13px] text-white/40 mt-1.5 tracking-wide">
//               Log in to continue the conversation
//             </p>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
//             {/* ERROR */}
//             {error && (
//               <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
//                 <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
//                 <p className="text-[13px] text-red-400">{error}</p>
//               </div>
//             )}

//             <div>
//               <label className={labelClass}>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="you@example.com"
//                 autoComplete="email"
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   placeholder="••••••••"
//                   autoComplete="current-password"
//                   className={inputClass + " pr-11"}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((v) => !v)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-150"
//                 >
//                   {showPassword ? (
//                     <svg
//                       width="17"
//                       height="17"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
//                       <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
//                       <line x1="1" y1="1" x2="23" y2="23" />
//                     </svg>
//                   ) : (
//                     <svg
//                       width="17"
//                       height="17"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//                       <circle cx="12" cy="12" r="3" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>
//             <div className="pt-1">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="
//                   w-full h-[46px]
//                   flex items-center justify-center gap-2
//                   rounded-xl
//                   text-[14px] font-semibold text-white tracking-wide
//                   bg-indigo-600 hover:bg-indigo-500
//                   disabled:opacity-40 disabled:cursor-not-allowed
//                   active:scale-[0.98] transition-all duration-150
//                   shadow-[0_0_20px_rgba(99,102,241,0.25)]
//                   hover:shadow-[0_0_28px_rgba(99,102,241,0.4)]
//                 "
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 size={16} className="animate-spin" />
//                     Logging in…
//                   </>
//                 ) : (
//                   "Log In"
//                 )}
//               </button>
//             </div>

//             <p className="text-center text-[13px] text-white/35 pt-1">
//               Don't have an account?{" "}
//               <Link
//                 to="/join"
//                 className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
//               >
//                 Join Now
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import { useState } from "react";
// import { loginUser } from "../api/auth";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { AlertCircle, Loader2 } from "lucide-react";

// const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { refreshUser } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);

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
//       console.log("Login error:", err);
//       setError(err.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = () => {
//     window.location.href = `${BACKEND_URL}/auth/google`;
//   };

//   // ✅ removed transition-all duration-150 — that was causing the typing jank
//   const inputClass = `
//     w-full px-4 py-3 rounded-xl
//     bg-white/[0.04] hover:bg-white/[0.06]
//     border border-white/10 hover:border-white/20
//     text-[14px] text-white placeholder-white/25
//     focus:outline-none focus:border-white/30 focus:bg-white/[0.06]
//   `;

//   const labelClass =
//     "block text-[12px] font-medium text-white/50 tracking-wide uppercase mb-1.5";

//   return (
//     <div className="min-h-full flex items-center justify-center px-4 py-10 relative">
//       {/* background glow */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
//         <div className="w-[500px] h-[500px] bg-indigo-600/15 blur-[120px] rounded-full" />
//       </div>

//       <div className="relative z-10 w-full max-w-sm">
//         {/* CARD */}
//         <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
//           {/* HEADER */}
//           <div className="px-6 pt-8 pb-6 text-center border-b border-white/10">
//             <div className="flex items-center justify-center mb-4">
//               <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
//                 <span className="text-white text-[12px] font-black">HS</span>
//               </div>
//             </div>
//             <h1 className="text-[22px] font-bold text-white tracking-tight">
//               Welcome back
//             </h1>
//             <p className="text-[13px] text-white/40 mt-1.5 tracking-wide">
//               Log in to continue the conversation
//             </p>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
//             {/* ERROR */}
//             {error && (
//               <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
//                 <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
//                 <p className="text-[13px] text-red-400">{error}</p>
//               </div>
//             )}

//             {/* GOOGLE BUTTON */}
//             <button
//               type="button"
//               onClick={handleGoogleSignIn}
//               className="
//                 w-full h-[46px]
//                 flex items-center justify-center gap-3
//                 rounded-xl
//                 text-[14px] font-medium text-white/80 tracking-wide
//                 bg-white/[0.04] hover:bg-white/[0.08]
//                 border border-white/10 hover:border-white/25
//                 active:scale-[0.98] transition-all duration-150
//               "
//             >
//               <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
//                 <path
//                   fill="#FFC107"
//                   d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
//                 />
//                 <path
//                   fill="#FF3D00"
//                   d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
//                 />
//                 <path
//                   fill="#4CAF50"
//                   d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.6 35.5 16.3 44 24 44z"
//                 />
//                 <path
//                   fill="#1976D2"
//                   d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C41.2 36.3 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5z"
//                 />
//               </svg>
//               Continue with Google
//             </button>

//             {/* DIVIDER */}
//             <div className="flex items-center gap-3">
//               <div className="flex-1 h-px bg-white/10" />
//               <span className="text-[12px] text-white/25 tracking-widest uppercase">
//                 or
//               </span>
//               <div className="flex-1 h-px bg-white/10" />
//             </div>

//             {/* EMAIL */}
//             <div>
//               <label className={labelClass}>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="you@example.com"
//                 autoComplete="email"
//                 className={inputClass}
//               />
//             </div>

//             {/* PASSWORD */}
//             <div>
//               <label className={labelClass}>Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   placeholder="••••••••"
//                   autoComplete="current-password"
//                   className={inputClass + " pr-11"}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((v) => !v)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-150"
//                 >
//                   {showPassword ? (
//                     <svg
//                       width="17"
//                       height="17"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
//                       <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
//                       <line x1="1" y1="1" x2="23" y2="23" />
//                     </svg>
//                   ) : (
//                     <svg
//                       width="17"
//                       height="17"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//                       <circle cx="12" cy="12" r="3" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* SUBMIT */}
//             <div className="pt-1">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="
//                   w-full h-[46px]
//                   flex items-center justify-center gap-2
//                   rounded-xl
//                   text-[14px] font-semibold text-white tracking-wide
//                   bg-indigo-600 hover:bg-indigo-500
//                   disabled:opacity-40 disabled:cursor-not-allowed
//                   active:scale-[0.98] transition-all duration-150
//                   shadow-[0_0_20px_rgba(99,102,241,0.25)]
//                   hover:shadow-[0_0_28px_rgba(99,102,241,0.4)]
//                 "
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 size={16} className="animate-spin" />
//                     Logging in…
//                   </>
//                 ) : (
//                   "Log In"
//                 )}
//               </button>
//             </div>

//             <p className="text-center text-[13px] text-white/35 pt-1">
//               Don't have an account?{" "}
//               <Link
//                 to="/join"
//                 className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
//               >
//                 Join Now
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { useState } from "react";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AlertCircle, Loader2 } from "lucide-react";

const BACKEND_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
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

  const handleGoogleSignIn = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .lp-wrap {
          min-height: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(32px, 8vw, 80px) clamp(16px, 4vw, 24px);
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          position: relative;
        }

        .lp-glow {
          position: fixed;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: min(500px, 90vw);
          height: min(500px, 90vw);
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          border-radius: 50%;
          filter: blur(40px);
        }

        .lp-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          background: rgba(10,8,28,0.92);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04) inset;
        }

        .lp-header {
          padding: clamp(24px,4vw,36px) clamp(20px,4vw,32px) clamp(20px,3vw,28px);
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .lp-body {
          padding: clamp(20px,4vw,32px) clamp(20px,4vw,32px) clamp(24px,4vw,36px);
          display: flex;
          flex-direction: column;
          gap: clamp(14px,2.5vw,18px);
        }

        /* Google button */
        .lp-google-btn {
          width: 100%;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.75);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
          font-family: inherit;
          -webkit-tap-highlight-color: transparent;
        }
        .lp-google-btn:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.18);
          color: #fff;
        }
        .lp-google-btn:active { transform: scale(0.98); }

        /* Divider */
        .lp-divider { display: flex; align-items: center; gap: 12px; }
        .lp-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .lp-divider-text { font-size: 11px; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; text-transform: uppercase; }

        /* Field label */
        .lp-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        /* Input */
        .lp-input {
          width: 100%;
          padding: 11px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          color: #f1f5f9;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
          /* No transition on background — prevents typing jank */
          transition: border-color 0.15s ease;
        }
        .lp-input::placeholder { color: rgba(255,255,255,0.2); }
        .lp-input:hover  { border-color: rgba(255,255,255,0.16); }
        .lp-input:focus  { border-color: rgba(139,92,246,0.5); background: rgba(99,102,241,0.06); }
        .lp-input-pr     { padding-right: 44px; }

        /* Password toggle */
        .lp-eye-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.15s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .lp-eye-btn:hover { color: rgba(255,255,255,0.6); }

        /* Submit */
        .lp-submit {
          width: 100%;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 13px;
          border: none;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: box-shadow 0.18s ease, transform 0.18s ease;
          font-family: inherit;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
          -webkit-tap-highlight-color: transparent;
        }
        .lp-submit:hover:not(:disabled) {
          box-shadow: 0 6px 28px rgba(99,102,241,0.55);
          transform: translateY(-1px);
        }
        .lp-submit:active:not(:disabled) { transform: scale(0.98); }
        .lp-submit:disabled { opacity: 0.4; cursor: not-allowed; }

        /* Error banner */
        .lp-alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.5;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          color: #fca5a5;
        }

        @keyframes lp-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="lp-wrap">
        <div className="lp-glow" />

        <div className="lp-card">
          {/* ── Header ── */}
          <div className="lp-header">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(99,102,241,0.4)",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                  }}
                >
                  HS
                </span>
              </div>
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(18px,4vw,22px)",
                fontWeight: 800,
                color: "#f1f5f9",
                letterSpacing: "-0.02em",
              }}
            >
              Welcome back
            </h1>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                fontWeight: 500,
              }}
            >
              Log in to continue the conversation
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="lp-body">
            {/* Error */}
            {error && (
              <div className="lp-alert">
                <AlertCircle
                  size={15}
                  style={{ flexShrink: 0, marginTop: 1 }}
                />
                {error}
              </div>
            )}

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="lp-google-btn"
            >
              <svg width="17" height="17" viewBox="0 0 48 48" fill="none">
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.6 35.5 16.3 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C41.2 36.3 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="lp-divider">
              <div className="lp-divider-line" />
              <span className="lp-divider-text">or</span>
              <div className="lp-divider-line" />
            </div>

            {/* Email */}
            <div>
              <label className="lp-label">Email</label>
              <input
                className="lp-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="lp-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className={"lp-input lp-input-pr"}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lp-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="lp-submit"
              style={{ marginTop: 4 }}
            >
              {loading ? (
                <>
                  <Loader2
                    size={15}
                    style={{ animation: "lp-spin 1s linear infinite" }}
                  />
                  Logging in…
                </>
              ) : (
                "Log In"
              )}
            </button>

            {/* Join link */}
            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "rgba(255,255,255,0.3)",
                margin: 0,
              }}
            >
              Don&apos;t have an account?{" "}
              <Link
                to="/join"
                style={{
                  color: "#818cf8",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#818cf8")}
              >
                Join Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;