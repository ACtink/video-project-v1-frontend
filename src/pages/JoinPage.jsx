// import { useState } from "react";
// import { joinUser } from "../api/auth";
// import { Link } from "react-router-dom";
// import Header from "../components/Header";
// import { COUNTRIES } from "../data/countries";
// import CountrySelect from "../components/CountrySelect";
// import GenderSelect from "../components/GenderSelect";

// const JoinPage = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     age: "",
//     country: "",
//     acceptedTerms: false,
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (Number(formData.age) < 16) {
//       setError("You must be at least 16 years old to use this platform.");
//       return;
//     }

//     if (!formData.acceptedTerms) {
//       setError("You must agree to the Terms & Conditions to continue.");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       await joinUser({
//         username: formData.username.trim(),
//         email: formData.email.trim(),
//         password: formData.password,
//         age: Number(formData.age),
//         country: formData.country.trim(),
//         gender: formData.gender,
//         acceptedTerms: formData.acceptedTerms,
//       });

//       setSuccess(true);
//       setFormData({
//         username: "",
//         email: "",
//         password: "",
//         age: "",
//         country: "",
//         gender: "",
//         acceptedTerms: false,
//       });
//     } catch (err) {
//       setError(err.message || "Failed to create account");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* <Header /> */}

//       {/* Soft glow behind card */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <div className="w-[600px] h-[600px] bg-purple-600/20 blur-[140px] rounded-full" />
//       </div>

//       <main className="flex-1 mt-5 flex items-center justify-center px-4 py-6 sm:px-0 sm:py-0 relative z-10">
//         <div
//           className="
//             w-full max-w-2xl
//             rounded-2xl
//             p-2 sm:p-8
//             bg-white/20
//             backdrop-blur-2xl
//             border border-white/30
//             shadow-[0_20px_50px_rgba(0,0,0,0.25)]
//             max-h-[85vh] overflow-y-auto
//           "
//         >
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-purple-300 via-indigo-300 to-white bg-clip-text text-transparent">
//             Join the Community
//           </h2>
//           <p className="text-center text-white/60 mt-2 tracking-wide">
//             Sign up to connect, share, and engage in real conversations
//           </p>

//           {success && (
//             <p className="mt-4 text-green-300 text-center font-medium">
//               Account created successfully 🎉
//             </p>
//           )}

//           <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Username */}
//               <div>
//                 <label className="block text-sm font-medium text-white">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                   placeholder="cool_stranger"
//                   autoComplete="username"
//                   className="mt-1 w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-500 border border-white/40 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-white">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   placeholder="you@example.com"
//                   autoComplete="email"
//                   className="mt-1 w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-500 border border-white/40 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium text-white">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   placeholder="••••••••"
//                   autoComplete="new-password"
//                   className="mt-1 w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-500 border border-white/40 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                 />
//               </div>

//               {/* Age */}
//               <div>
//                 <label className="block text-sm font-medium text-white">
//                   Age
//                 </label>
//                 <input
//                   type="number"
//                   name="age"
//                   min="16"
//                   value={formData.age}
//                   placeholder="16+ only"
//                   onChange={handleChange}
//                   required
//                   className="mt-1 w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-500 border border-white/40 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                 />
//               </div>

//               {/* Country + Gender */}
//               <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-white">
//                     Country
//                   </label>
//                   <CountrySelect
//                     value={formData.country}
//                     countries={COUNTRIES}
//                     onChange={(code) =>
//                       setFormData((prev) => ({ ...prev, country: code }))
//                     }
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-white">
//                     Gender
//                   </label>
//                   <GenderSelect
//                     value={formData.gender}
//                     onChange={(val) =>
//                       setFormData((prev) => ({ ...prev, gender: val }))
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Terms */}
//             <div className="flex items-start gap-3">
//               <input
//                 type="checkbox"
//                 name="acceptedTerms"
//                 checked={formData.acceptedTerms}
//                 onChange={handleChange}
//                 required
//                 id="acceptedTerms"
//                 className="mt-1"
//               />
//               <label htmlFor="acceptedTerms" className="text-sm text-white/90">
//                 I confirm that I am at least 16 years old and agree to the{" "}
//                 <span className="text-indigo-200 font-medium hover:underline cursor-pointer">
//                   Terms & Conditions
//                 </span>{" "}
//                 and{" "}
//                 <span className="text-indigo-200 font-medium hover:underline cursor-pointer">
//                   Community Guidelines
//                 </span>
//                 .
//               </label>
//             </div>

//             {error && (
//               <p className="text-red-300 text-sm text-center">{error}</p>
//             )}

//             <button
//               type="submit"
//               disabled={!formData.acceptedTerms || loading}
//               className={`w-full py-3 rounded-xl font-semibold text-lg transition-all
//                 ${
//                   !loading && formData.acceptedTerms
//                     ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
//                     : "bg-white/40 text-white/60 cursor-not-allowed"
//                 }`}
//             >
//               {loading ? "Creating account..." : "Join Now"}
//             </button>
//           </form>

//           <p className="text-center text-sm text-white mt-6">
//             Already joined?{" "}
//             <span className="text-indigo-200 font-medium cursor-pointer sm:hover:underline">
//               <Link to="/login">Login</Link>
//             </span>
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default JoinPage;


// import { useState } from "react";
// import { joinUser } from "../api/auth";
// import { Link } from "react-router-dom";
// import { COUNTRIES } from "../data/countries";
// import CountrySelect from "../components/CountrySelect";
// import GenderSelect from "../components/GenderSelect";
// import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

// const JoinPage = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     age: "",
//     country: "",
//     gender: "",
//     acceptedTerms: false,
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (Number(formData.age) < 16) {
//       setError("You must be at least 16 years old to use this platform.");
//       return;
//     }

//     if (!formData.acceptedTerms) {
//       setError("You must agree to the Terms & Conditions to continue.");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       await joinUser({
//         username: formData.username.trim(),
//         email: formData.email.trim(),
//         password: formData.password,
//         age: Number(formData.age),
//         country: formData.country.trim(),
//         gender: formData.gender,
//         acceptedTerms: formData.acceptedTerms,
//       });

//       setSuccess(true);
//       setFormData({
//         username: "",
//         email: "",
//         password: "",
//         age: "",
//         country: "",
//         gender: "",
//         acceptedTerms: false,
//       });
//     } catch (err) {
//       setError(err.message || "Failed to create account");
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

//       <div className="relative z-10 w-full max-w-xl">
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
//             <div className="flex items-center justify-center gap-2 mb-4">
//               <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
//                 <span className="text-white text-[12px] font-black">HS</span>
//               </div>
//             </div>
//             <h1 className="text-[22px] font-bold text-white tracking-tight">
//               Join HelloStranger
//             </h1>
//             <p className="text-[13px] text-white/40 mt-1.5 tracking-wide">
//               Create your account to start connecting
//             </p>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
//             {/* SUCCESS */}
//             {success && (
//               <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
//                 <CheckCircle2
//                   size={15}
//                   className="text-emerald-400 flex-shrink-0"
//                 />
//                 <p className="text-[13px] text-emerald-400 font-medium">
//                   Account created successfully! You can now log in 🎉
//                 </p>
//               </div>
//             )}

//             {/* ROW 1 — username + email */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className={labelClass}>Username</label>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                   placeholder="cool_stranger"
//                   autoComplete="username"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className={labelClass}>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   placeholder="you@example.com"
//                   autoComplete="email"
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             {/* ROW 2 — password + age */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className={labelClass}>Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   placeholder="••••••••"
//                   autoComplete="new-password"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className={labelClass}>Age</label>
//                 <input
//                   type="number"
//                   name="age"
//                   min="16"
//                   value={formData.age}
//                   placeholder="16+ only"
//                   onChange={handleChange}
//                   required
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             {/* ROW 3 — country + gender */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className={labelClass}>Country</label>
//                 <CountrySelect
//                   value={formData.country}
//                   countries={COUNTRIES}
//                   onChange={(code) =>
//                     setFormData((prev) => ({ ...prev, country: code }))
//                   }
//                 />
//               </div>
//               <div>
//                 <label className={labelClass}>Gender</label>
//                 <GenderSelect
//                   value={formData.gender}
//                   onChange={(val) =>
//                     setFormData((prev) => ({ ...prev, gender: val }))
//                   }
//                 />
//               </div>
//             </div>

//             {/* TERMS */}
//             <label className="flex items-start gap-3 cursor-pointer group">
//               <div className="relative flex-shrink-0 mt-0.5">
//                 <input
//                   type="checkbox"
//                   name="acceptedTerms"
//                   checked={formData.acceptedTerms}
//                   onChange={handleChange}
//                   required
//                   id="acceptedTerms"
//                   className="sr-only"
//                 />
//                 <div
//                   className={`
//                   w-4 h-4 rounded flex items-center justify-center
//                   border transition-all duration-150
//                   ${
//                     formData.acceptedTerms
//                       ? "bg-indigo-600 border-indigo-600"
//                       : "bg-white/5 border-white/20 group-hover:border-white/40"
//                   }
//                 `}
//                 >
//                   {formData.acceptedTerms && (
//                     <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
//                       <path
//                         d="M1 3.5L3.5 6L8 1"
//                         stroke="white"
//                         strokeWidth="1.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   )}
//                 </div>
//               </div>
//               <span className="text-[13px] text-white/50 leading-relaxed">
//                 I confirm I am at least 16 years old and agree to the{" "}
//                 <span className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
//                   Terms & Conditions
//                 </span>{" "}
//                 and{" "}
//                 <span className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
//                   Community Guidelines
//                 </span>
//                 .
//               </span>
//             </label>

//             {/* ERROR */}
//             {error && (
//               <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
//                 <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
//                 <p className="text-[13px] text-red-400">{error}</p>
//               </div>
//             )}

//             {/* SUBMIT */}
//             <button
//               type="submit"
//               disabled={!formData.acceptedTerms || loading || success}
//               className="
//                 w-full h-[46px]
//                 flex items-center justify-center gap-2
//                 rounded-xl
//                 text-[14px] font-semibold text-white tracking-wide
//                 bg-indigo-600 hover:bg-indigo-500
//                 disabled:opacity-40 disabled:cursor-not-allowed
//                 active:scale-[0.98] transition-all duration-150
//                 shadow-[0_0_20px_rgba(99,102,241,0.25)]
//                 hover:shadow-[0_0_28px_rgba(99,102,241,0.4)]
//               "
//             >
//               {loading ? (
//                 <>
//                   <Loader2 size={16} className="animate-spin" />
//                   Creating account…
//                 </>
//               ) : (
//                 "Join Now"
//               )}
//             </button>

//             {/* LOGIN LINK */}
//             <p className="text-center text-[13px] text-white/35 pt-1">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
//               >
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JoinPage;



import { useState } from "react";
import { joinUser } from "../api/auth";
import { Link } from "react-router-dom";
import { COUNTRIES } from "../data/countries";
import CountrySelect from "../components/CountrySelect";
import GenderSelect from "../components/GenderSelect";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const BACKEND_URL =import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const JoinPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    country: "",
    gender: "",
    acceptedTerms: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.age) < 16) {
      setError("You must be at least 16 years old to use this platform.");
      return;
    }

    if (!formData.acceptedTerms) {
      setError("You must agree to the Terms & Conditions to continue.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await joinUser({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        age: Number(formData.age),
        country: formData.country.trim(),
        gender: formData.gender,
        acceptedTerms: formData.acceptedTerms,
      });

      setSuccess(true);
      setFormData({
        username: "",
        email: "",
        password: "",
        age: "",
        country: "",
        gender: "",
        acceptedTerms: false,
      });
    } catch (err) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Redirect to backend Google OAuth route
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  const inputClass = `
    w-full px-4 py-3 rounded-xl
    bg-white/[0.04] hover:bg-white/[0.06]
    border border-white/10 hover:border-white/20
    text-[14px] text-white placeholder-white/25
    focus:outline-none focus:border-white/30 focus:bg-white/[0.06]
  `;

  const labelClass =
    "block text-[12px] font-medium text-white/50 tracking-wide uppercase mb-1.5";

  return (
    <div className="min-h-full flex items-center justify-center px-4 py-10 relative">
      {/* background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[500px] h-[500px] bg-indigo-600/15 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-xl">
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
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-[12px] font-black">HS</span>
              </div>
            </div>
            <h1 className="text-[22px] font-bold text-white tracking-tight">
              Join HelloStranger
            </h1>
            <p className="text-[13px] text-white/40 mt-1.5 tracking-wide">
              Create your account to start connecting
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            {/* SUCCESS */}
            {success && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2
                  size={15}
                  className="text-emerald-400 flex-shrink-0"
                />
                <p className="text-[13px] text-emerald-400 font-medium">
                  Account created successfully! You can now log in 🎉
                </p>
              </div>
            )}

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="
                w-full h-[46px]
                flex items-center justify-center gap-3
                rounded-xl
                text-[14px] font-medium text-white/80 tracking-wide
                bg-white/[0.04] hover:bg-white/[0.08]
                border border-white/10 hover:border-white/25
                active:scale-[0.98] transition-all duration-150
              "
            >
              {/* Google SVG icon */}
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.6 35.5 16.3 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C41.2 36.3 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5z"/>
              </svg>
              Continue with Google
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[12px] text-white/25 tracking-widest uppercase">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* ROW 1 — username + email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="cool_stranger"
                  autoComplete="username"
                  className={inputClass}
                />
              </div>
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
            </div>

            {/* ROW 2 — password + age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Age</label>
                <input
                  type="number"
                  name="age"
                  min="16"
                  value={formData.age}
                  placeholder="16+ only"
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* ROW 3 — country + gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Country</label>
                <CountrySelect
                  value={formData.country}
                  countries={COUNTRIES}
                  onChange={(code) =>
                    setFormData((prev) => ({ ...prev, country: code }))
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Gender</label>
                <GenderSelect
                  value={formData.gender}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, gender: val }))
                  }
                />
              </div>
            </div>

            {/* TERMS */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleChange}
                  required
                  id="acceptedTerms"
                  className="sr-only"
                />
                <div
                  className={`
                  w-4 h-4 rounded flex items-center justify-center
                  border transition-all duration-150
                  ${
                    formData.acceptedTerms
                      ? "bg-indigo-600 border-indigo-600"
                      : "bg-white/5 border-white/20 group-hover:border-white/40"
                  }
                `}
                >
                  {formData.acceptedTerms && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path
                        d="M1 3.5L3.5 6L8 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-[13px] text-white/50 leading-relaxed">
                I confirm I am at least 16 years old and agree to the{" "}
                <span className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                  Community Guidelines
                </span>
                .
              </span>
            </label>

            {/* ERROR */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
                <p className="text-[13px] text-red-400">{error}</p>
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={!formData.acceptedTerms || loading || success}
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
                  Creating account…
                </>
              ) : (
                "Join Now"
              )}
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-[13px] text-white/35 pt-1">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;


