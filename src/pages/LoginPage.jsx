// import { useState } from "react";
// import { loginUser } from "../api/auth";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { AlertCircle, Loader2 } from "lucide-react";

// const BACKEND_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
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

//   const handleGoogleSignIn = () => {
//     window.location.href = `${BACKEND_URL}/auth/google`;
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

//         .lp-wrap {
//           min-height: 100%;
//           display: flex;
//           align-items: flex-start;
//           justify-content: center;
//           padding: clamp(32px, 8vw, 80px) clamp(16px, 4vw, 24px);
//           box-sizing: border-box;
//           font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
//           position: relative;
//         }

//         .lp-glow {
//           position: fixed;
//           top: 10%;
//           left: 50%;
//           transform: translateX(-50%);
//           width: min(500px, 90vw);
//           height: min(500px, 90vw);
//           background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
//           pointer-events: none;
//           z-index: 0;
//           border-radius: 50%;
//           filter: blur(40px);
//         }

//         .lp-card {
//           position: relative;
//           z-index: 1;
//           width: 100%;
//           max-width: 420px;
//           background: rgba(10,8,28,0.92);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 20px;
//           overflow: hidden;
//           box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04) inset;
//         }

//         .lp-header {
//           padding: clamp(24px,4vw,36px) clamp(20px,4vw,32px) clamp(20px,3vw,28px);
//           text-align: center;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//         }

//         .lp-body {
//           padding: clamp(20px,4vw,32px) clamp(20px,4vw,32px) clamp(24px,4vw,36px);
//           display: flex;
//           flex-direction: column;
//           gap: clamp(14px,2.5vw,18px);
//         }

//         /* Google button */
//         .lp-google-btn {
//           width: 100%;
//           height: 46px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 10px;
//           border-radius: 12px;
//           border: 1px solid rgba(255,255,255,0.09);
//           background: rgba(255,255,255,0.04);
//           color: rgba(255,255,255,0.75);
//           font-size: 14px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
//           font-family: inherit;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .lp-google-btn:hover {
//           background: rgba(255,255,255,0.07);
//           border-color: rgba(255,255,255,0.18);
//           color: #fff;
//         }
//         .lp-google-btn:active { transform: scale(0.98); }

//         /* Divider */
//         .lp-divider { display: flex; align-items: center; gap: 12px; }
//         .lp-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
//         .lp-divider-text { font-size: 11px; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; text-transform: uppercase; }

//         /* Field label */
//         .lp-label {
//           display: block;
//           font-size: 11px;
//           font-weight: 600;
//           color: rgba(255,255,255,0.35);
//           letter-spacing: 0.08em;
//           text-transform: uppercase;
//           margin-bottom: 6px;
//         }

//         /* Input */
//         .lp-input {
//           width: 100%;
//           padding: 11px 14px;
//           border-radius: 12px;
//           border: 1px solid rgba(255,255,255,0.09);
//           background: rgba(255,255,255,0.04);
//           color: #f1f5f9;
//           font-size: 14px;
//           outline: none;
//           box-sizing: border-box;
//           font-family: inherit;
//           /* No transition on background — prevents typing jank */
//           transition: border-color 0.15s ease;
//         }
//         .lp-input::placeholder { color: rgba(255,255,255,0.2); }
//         .lp-input:hover  { border-color: rgba(255,255,255,0.16); }
//         .lp-input:focus  { border-color: rgba(139,92,246,0.5); background: rgba(99,102,241,0.06); }
//         .lp-input-pr     { padding-right: 44px; }

//         /* Password toggle */
//         .lp-eye-btn {
//           position: absolute;
//           right: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: rgba(255,255,255,0.25);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 4px;
//           border-radius: 6px;
//           transition: color 0.15s ease;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .lp-eye-btn:hover { color: rgba(255,255,255,0.6); }

//         /* Submit */
//         .lp-submit {
//           width: 100%;
//           height: 48px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           border-radius: 13px;
//           border: none;
//           background: linear-gradient(135deg, #6366f1, #8b5cf6);
//           color: #fff;
//           font-size: 14px;
//           font-weight: 700;
//           cursor: pointer;
//           transition: box-shadow 0.18s ease, transform 0.18s ease;
//           font-family: inherit;
//           letter-spacing: -0.01em;
//           box-shadow: 0 4px 20px rgba(99,102,241,0.35);
//           -webkit-tap-highlight-color: transparent;
//         }
//         .lp-submit:hover:not(:disabled) {
//           box-shadow: 0 6px 28px rgba(99,102,241,0.55);
//           transform: translateY(-1px);
//         }
//         .lp-submit:active:not(:disabled) { transform: scale(0.98); }
//         .lp-submit:disabled { opacity: 0.4; cursor: not-allowed; }

//         /* Error banner */
//         .lp-alert {
//           display: flex;
//           align-items: flex-start;
//           gap: 10px;
//           padding: 12px 14px;
//           border-radius: 12px;
//           font-size: 13px;
//           font-weight: 500;
//           line-height: 1.5;
//           background: rgba(239,68,68,0.08);
//           border: 1px solid rgba(239,68,68,0.2);
//           color: #fca5a5;
//         }

//         @keyframes lp-spin { to { transform: rotate(360deg); } }
//       `}</style>

//       <div className="lp-wrap">
//         <div className="lp-glow" />

//         <div className="lp-card">
//           {/* ── Header ── */}
//           <div className="lp-header">
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 marginBottom: 14,
//               }}
//             >
//               <div
//                 style={{
//                   width: 36,
//                   height: 36,
//                   borderRadius: 10,
//                   background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   boxShadow: "0 0 20px rgba(99,102,241,0.4)",
//                 }}
//               >
//                 <span
//                   style={{
//                     color: "#fff",
//                     fontSize: 12,
//                     fontWeight: 900,
//                     letterSpacing: "-0.02em",
//                   }}
//                 >
//                   HS
//                 </span>
//               </div>
//             </div>
//             <h1
//               style={{
//                 margin: 0,
//                 fontSize: "clamp(18px,4vw,22px)",
//                 fontWeight: 800,
//                 color: "#f1f5f9",
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Welcome back
//             </h1>
//             <p
//               style={{
//                 margin: "6px 0 0",
//                 fontSize: 13,
//                 color: "rgba(255,255,255,0.35)",
//                 fontWeight: 500,
//               }}
//             >
//               Log in to continue the conversation
//             </p>
//           </div>

//           {/* ── Form ── */}
//           <form onSubmit={handleSubmit} className="lp-body">
//             {/* Error */}
//             {error && (
//               <div className="lp-alert">
//                 <AlertCircle
//                   size={15}
//                   style={{ flexShrink: 0, marginTop: 1 }}
//                 />
//                 {error}
//               </div>
//             )}

//             {/* Google */}
//             <button
//               type="button"
//               onClick={handleGoogleSignIn}
//               className="lp-google-btn"
//             >
//               <svg width="17" height="17" viewBox="0 0 48 48" fill="none">
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

//             {/* Divider */}
//             <div className="lp-divider">
//               <div className="lp-divider-line" />
//               <span className="lp-divider-text">or</span>
//               <div className="lp-divider-line" />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="lp-label">Email</label>
//               <input
//                 className="lp-input"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="you@example.com"
//                 autoComplete="email"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="lp-label">Password</label>
//               <div style={{ position: "relative" }}>
//                 <input
//                   className={"lp-input lp-input-pr"}
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   placeholder="••••••••"
//                   autoComplete="current-password"
//                 />
//                 <button
//                   type="button"
//                   className="lp-eye-btn"
//                   onClick={() => setShowPassword((v) => !v)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <svg
//                       width="16"
//                       height="16"
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
//                       width="16"
//                       height="16"
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

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="lp-submit"
//               style={{ marginTop: 4 }}
//             >
//               {loading ? (
//                 <>
//                   <Loader2
//                     size={15}
//                     style={{ animation: "lp-spin 1s linear infinite" }}
//                   />
//                   Logging in…
//                 </>
//               ) : (
//                 "Log In"
//               )}
//             </button>

//             {/* Join link */}
//             <p
//               style={{
//                 textAlign: "center",
//                 fontSize: 13,
//                 color: "rgba(255,255,255,0.3)",
//                 margin: 0,
//               }}
//             >
//               Don&apos;t have an account?{" "}
//               <Link
//                 to="/join"
//                 style={{
//                   color: "#818cf8",
//                   fontWeight: 600,
//                   textDecoration: "none",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#818cf8")}
//               >
//                 Join Now
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
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

        /* Brand lockup — matches header logo treatment */
        .lp-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-bottom: 16px;
        }
        .lp-brand-mark {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          object-fit: contain;
        }
        .lp-brand-text {
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -0.03em;
          background: linear-gradient(120deg,#38bdf8 0%,#818cf8 45%,#c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 14px rgba(99,102,241,0.35));
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

        /* Submit — same gradient + glow language as the header/hero primary buttons */
        .lp-submit {
          width: 100%;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 13px;
          border: none;
          background: linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#8b5cf6,#6366f1);
          background-size: 300% auto;
          background-position: 0% center;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: box-shadow 0.18s ease, transform 0.18s ease, background-position 0.4s ease;
          font-family: inherit;
          letter-spacing: -0.01em;
          box-shadow: 0 0 18px rgba(99,102,241,0.35), 0 0 32px rgba(236,72,153,0.15);
          -webkit-tap-highlight-color: transparent;
        }
        .lp-submit:hover:not(:disabled) {
          background-position: 100% center;
          box-shadow: 0 0 26px rgba(99,102,241,0.55), 0 0 46px rgba(236,72,153,0.28);
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
            <div className="lp-brand">
              <img src="/quikchat-logo-2.png" alt="" className="lp-brand-mark" />
              {/* <span className="lp-brand-text">quikchat</span> */}
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(19px,4vw,23px)",
                fontWeight: 500,
                color: "#f1f5f3",
                letterSpacing: "-0.01em",
              }}
            >
              Log in
            </h1>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                fontWeight: 500,
              }}
            >
              Enter your details to continue to quikchat
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