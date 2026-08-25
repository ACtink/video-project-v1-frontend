// // import { useState } from "react";
// // import { joinUser } from "../api/auth";
// // import { Link } from "react-router-dom";
// // import { COUNTRIES } from "../data/countries";
// // import CountrySelect from "../components/CountrySelect";
// // import GenderSelect from "../components/GenderSelect";
// // import {
// //   AlertCircle,
// //   CheckCircle2,
// //   Loader2,
// //   X,
// //   ScrollText,
// //   ShieldCheck,
// // } from "lucide-react";

// // const BACKEND_URL =
// //   import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// // // ─── Reusable field wrapper ───────────────────────────────────────────────────
// // function Field({ label, children }) {
// //   // ── Legal modal renderer ───────────────────────────────────────────────────
// //   const LegalModal = ({ type }) => {
// //     const isTerms = type === "terms";
// //     const hasScrolled = isTerms ? scrolledTerms : scrolledGuide;
// //     const hasAgreed = isTerms ? agreedTerms : agreedGuide;
// //     const setScrolled = isTerms ? setScrolledTerms : setScrolledGuide;
// //     const setAgreed = isTerms ? setAgreedTerms : setAgreedGuide;

// //     const agree = () => {
// //       setAgreed(true);
// //       setOpenModal(null);
// //     };

// //     return (
// //       <div
// //         className="jp-overlay"
// //         onClick={(e) => {
// //           if (e.target === e.currentTarget) setOpenModal(null);
// //         }}
// //       >
// //         <div className="jp-modal" role="dialog" aria-modal="true">
// //           {/* Header */}
// //           <div className="jp-modal-header">
// //             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //               {isTerms ? (
// //                 <ScrollText
// //                   size={16}
// //                   style={{ color: "#818cf8", flexShrink: 0 }}
// //                 />
// //               ) : (
// //                 <ShieldCheck
// //                   size={16}
// //                   style={{ color: "#818cf8", flexShrink: 0 }}
// //                 />
// //               )}
// //               <span
// //                 style={{
// //                   fontSize: 15,
// //                   fontWeight: 700,
// //                   color: "#f1f5f9",
// //                   letterSpacing: "-0.01em",
// //                 }}
// //               >
// //                 {isTerms ? "Terms & Conditions" : "Community Guidelines"}
// //               </span>
// //             </div>
// //             <button
// //               onClick={() => setOpenModal(null)}
// //               style={{
// //                 width: 32,
// //                 height: 32,
// //                 borderRadius: 8,
// //                 border: "1px solid rgba(255,255,255,0.09)",
// //                 background: "transparent",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 cursor: "pointer",
// //                 color: "rgba(255,255,255,0.4)",
// //                 flexShrink: 0,
// //               }}
// //             >
// //               <X size={14} />
// //             </button>
// //           </div>

// //           {/* Scrollable body */}
// //           <div
// //             className="jp-modal-body"
// //             onScroll={(e) => handleModalScroll(e, setScrolled)}
// //           >
// //             {isTerms ? <TermsContent /> : <GuidelinesContent />}
// //             {/* Sentinel — reaching this means fully scrolled */}
// //             <div style={{ height: 1 }} />
// //           </div>

// //           {/* Footer */}
// //           <div className="jp-modal-footer">
// //             <div className={"jp-scroll-notice" + (hasScrolled ? " ready" : "")}>
// //               {hasScrolled ? (
// //                 <>
// //                   <CheckCircle2 size={13} /> You have read this document — you
// //                   can now agree
// //                 </>
// //               ) : (
// //                 <>
// //                   <ScrollText size={13} /> Please scroll to the bottom to enable
// //                   the agree button
// //                 </>
// //               )}
// //             </div>
// //             <button
// //               className="jp-agree-btn"
// //               disabled={!hasScrolled || hasAgreed}
// //               onClick={agree}
// //             >
// //               {hasAgreed ? "✓ Already agreed" : "I have read and agree"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
// //       <label
// //         style={{
// //           fontSize: 11,
// //           fontWeight: 600,
// //           color: "rgba(255,255,255,0.35)",
// //           letterSpacing: "0.08em",
// //           textTransform: "uppercase",
// //         }}
// //       >
// //         {label}
// //       </label>
// //       {children}
// //     </div>
// //   );
// // }

// // // ─── Shared input style ───────────────────────────────────────────────────────
// // const inputStyle = {
// //   width: "100%",
// //   padding: "11px 14px",
// //   borderRadius: 12,
// //   border: "1px solid rgba(255,255,255,0.09)",
// //   background: "rgba(255,255,255,0.04)",
// //   color: "#f1f5f9",
// //   fontSize: 14,
// //   outline: "none",
// //   boxSizing: "border-box",
// //   fontFamily: "inherit",
// //   transition: "border-color 0.15s ease, background 0.15s ease",
// // };

// // // ─── Main component ───────────────────────────────────────────────────────────
// // const JoinPage = () => {
// //   const [formData, setFormData] = useState({
// //     username: "",
// //     email: "",
// //     password: "",
// //     age: "",
// //     country: "",
// //     gender: "",
// //     acceptedTerms: false,
// //   });
// //   const [error, setError] = useState("");
// //   const [openModal, setOpenModal] = useState(null); // "terms" | "guidelines" | null
// //   const [scrolledTerms, setScrolledTerms] = useState(false);
// //   const [scrolledGuide, setScrolledGuide] = useState(false);
// //   const [agreedTerms, setAgreedTerms] = useState(false);
// //   const [agreedGuide, setAgreedGuide] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [success, setSuccess] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   // Both docs must be agreed to enable the checkbox and submit
// //   const bothAgreed = agreedTerms && agreedGuide;
// //   // Keep formData.acceptedTerms in sync
// //   if (formData.acceptedTerms !== bothAgreed) {
// //     setFormData((prev) => ({ ...prev, acceptedTerms: bothAgreed }));
// //   }

// //   const handleModalScroll = (e, setter) => {
// //     const el = e.currentTarget;
// //     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
// //     if (nearBottom) setter(true);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (Number(formData.age) < 16) {
// //       setError("You must be at least 16 years old.");
// //       return;
// //     }
// //     if (!formData.acceptedTerms) {
// //       setError("You must agree to the Terms & Conditions.");
// //       return;
// //     }
// //     setError("");
// //     setLoading(true);
// //     try {
// //       await joinUser({
// //         username: formData.username.trim(),
// //         email: formData.email.trim(),
// //         password: formData.password,
// //         age: Number(formData.age),
// //         country: formData.country.trim(),
// //         gender: formData.gender,
// //         acceptedTerms: formData.acceptedTerms,
// //       });
// //       setSuccess(true);
// //       setFormData({
// //         username: "",
// //         email: "",
// //         password: "",
// //         age: "",
// //         country: "",
// //         gender: "",
// //         acceptedTerms: false,
// //       });
// //     } catch (err) {
// //       setError(err.message || "Failed to create account");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleGoogleSignIn = () => {
// //     window.location.href = `${BACKEND_URL}/auth/google`;
// //   };

// //   // ── Legal modal renderer ───────────────────────────────────────────────────
// //   const LegalModal = ({ type }) => {
// //     const isTerms = type === "terms";
// //     const hasScrolled = isTerms ? scrolledTerms : scrolledGuide;
// //     const hasAgreed = isTerms ? agreedTerms : agreedGuide;
// //     const setScrolled = isTerms ? setScrolledTerms : setScrolledGuide;
// //     const setAgreed = isTerms ? setAgreedTerms : setAgreedGuide;

// //     const agree = () => {
// //       setAgreed(true);
// //       setOpenModal(null);
// //     };

// //     return (
// //       <div
// //         className="jp-overlay"
// //         onClick={(e) => {
// //           if (e.target === e.currentTarget) setOpenModal(null);
// //         }}
// //       >
// //         <div className="jp-modal" role="dialog" aria-modal="true">
// //           {/* Header */}
// //           <div className="jp-modal-header">
// //             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //               {isTerms ? (
// //                 <ScrollText
// //                   size={16}
// //                   style={{ color: "#818cf8", flexShrink: 0 }}
// //                 />
// //               ) : (
// //                 <ShieldCheck
// //                   size={16}
// //                   style={{ color: "#818cf8", flexShrink: 0 }}
// //                 />
// //               )}
// //               <span
// //                 style={{
// //                   fontSize: 15,
// //                   fontWeight: 700,
// //                   color: "#f1f5f9",
// //                   letterSpacing: "-0.01em",
// //                 }}
// //               >
// //                 {isTerms ? "Terms & Conditions" : "Community Guidelines"}
// //               </span>
// //             </div>
// //             <button
// //               onClick={() => setOpenModal(null)}
// //               style={{
// //                 width: 32,
// //                 height: 32,
// //                 borderRadius: 8,
// //                 border: "1px solid rgba(255,255,255,0.09)",
// //                 background: "transparent",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 cursor: "pointer",
// //                 color: "rgba(255,255,255,0.4)",
// //                 flexShrink: 0,
// //               }}
// //             >
// //               <X size={14} />
// //             </button>
// //           </div>

// //           {/* Scrollable body */}
// //           <div
// //             className="jp-modal-body"
// //             onScroll={(e) => handleModalScroll(e, setScrolled)}
// //           >
// //             {isTerms ? <TermsContent /> : <GuidelinesContent />}
// //             {/* Sentinel — reaching this means fully scrolled */}
// //             <div style={{ height: 1 }} />
// //           </div>

// //           {/* Footer */}
// //           <div className="jp-modal-footer">
// //             <div className={"jp-scroll-notice" + (hasScrolled ? " ready" : "")}>
// //               {hasScrolled ? (
// //                 <>
// //                   <CheckCircle2 size={13} /> You have read this document — you
// //                   can now agree
// //                 </>
// //               ) : (
// //                 <>
// //                   <ScrollText size={13} /> Please scroll to the bottom to enable
// //                   the agree button
// //                 </>
// //               )}
// //             </div>
// //             <button
// //               className="jp-agree-btn"
// //               disabled={!hasScrolled || hasAgreed}
// //               onClick={agree}
// //             >
// //               {hasAgreed ? "✓ Already agreed" : "I have read and agree"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

// //         .jp-wrap {
// //           min-height: 100%;
// //           display: flex;
// //           align-items: flex-start;
// //           justify-content: center;
// //           padding: clamp(24px, 5vw, 56px) clamp(16px, 4vw, 24px);
// //           box-sizing: border-box;
// //           font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
// //           position: relative;
// //         }

// //         /* Background glow */
// //         .jp-glow {
// //           position: fixed;
// //           top: 10%;
// //           left: 50%;
// //           transform: translateX(-50%);
// //           width: min(600px, 90vw);
// //           height: min(600px, 90vw);
// //           background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
// //           pointer-events: none;
// //           z-index: 0;
// //           border-radius: 50%;
// //           filter: blur(40px);
// //         }

// //         /* Card */
// //         .jp-card {
// //           position: relative;
// //           z-index: 1;
// //           width: 100%;
// //           max-width: 560px;
// //           background: rgba(10, 8, 28, 0.92);
// //           border: 1px solid rgba(255,255,255,0.08);
// //           border-radius: 20px;
// //           overflow: hidden;
// //           box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04) inset;
// //         }

// //         /* Card header */
// //         .jp-header {
// //           padding: clamp(24px, 4vw, 36px) clamp(20px, 4vw, 32px) clamp(20px, 3vw, 28px);
// //           text-align: center;
// //           border-bottom: 1px solid rgba(255,255,255,0.06);
// //         }

// //         /* Form body */
// //         .jp-body {
// //           padding: clamp(20px, 4vw, 32px) clamp(20px, 4vw, 32px) clamp(24px, 4vw, 36px);
// //           display: flex;
// //           flex-direction: column;
// //           gap: clamp(14px, 2.5vw, 20px);
// //         }

// //         /* Two-col grid — stacks on small phones */
// //         .jp-grid {
// //           display: grid;
// //           grid-template-columns: 1fr;
// //           gap: clamp(12px, 2vw, 16px);
// //         }
// //         @media (min-width: 460px) {
// //           .jp-grid { grid-template-columns: 1fr 1fr; }
// //         }

// //         /* Input focus states */
// //         .jp-input:focus {
// //           border-color: rgba(139,92,246,0.5) !important;
// //           background: rgba(99,102,241,0.06) !important;
// //         }
// //         .jp-input::placeholder { color: rgba(255,255,255,0.2); }
// //         /* Remove number input arrows */
// //         .jp-input[type=number]::-webkit-inner-spin-button,
// //         .jp-input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
// //         .jp-input[type=number] { -moz-appearance: textfield; }

// //         /* Google button */
// //         .jp-google-btn {
// //           width: 100%;
// //           height: 46px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           gap: 10px;
// //           border-radius: 12px;
// //           border: 1px solid rgba(255,255,255,0.09);
// //           background: rgba(255,255,255,0.04);
// //           color: rgba(255,255,255,0.75);
// //           font-size: 14px;
// //           font-weight: 500;
// //           cursor: pointer;
// //           transition: all 0.15s ease;
// //           font-family: inherit;
// //           -webkit-tap-highlight-color: transparent;
// //         }
// //         .jp-google-btn:hover {
// //           background: rgba(255,255,255,0.07);
// //           border-color: rgba(255,255,255,0.18);
// //           color: #fff;
// //         }
// //         .jp-google-btn:active { transform: scale(0.98); }

// //         /* Submit button */
// //         .jp-submit {
// //           width: 100%;
// //           height: 48px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           gap: 8px;
// //           border-radius: 13px;
// //           border: none;
// //           background: linear-gradient(135deg, #6366f1, #8b5cf6);
// //           color: #fff;
// //           font-size: 14px;
// //           font-weight: 700;
// //           cursor: pointer;
// //           transition: all 0.18s ease;
// //           font-family: inherit;
// //           letter-spacing: -0.01em;
// //           box-shadow: 0 4px 20px rgba(99,102,241,0.35);
// //           -webkit-tap-highlight-color: transparent;
// //         }
// //         .jp-submit:hover:not(:disabled) {
// //           box-shadow: 0 6px 28px rgba(99,102,241,0.55);
// //           transform: translateY(-1px);
// //         }
// //         .jp-submit:active:not(:disabled) { transform: scale(0.98); }
// //         .jp-submit:disabled { opacity: 0.4; cursor: not-allowed; }

// //         /* Custom checkbox */
// //         .jp-checkbox-box {
// //           width: 17px;
// //           height: 17px;
// //           border-radius: 5px;
// //           border: 1px solid rgba(255,255,255,0.18);
// //           background: rgba(255,255,255,0.04);
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           flex-shrink: 0;
// //           transition: all 0.15s ease;
// //           margin-top: 1px;
// //         }
// //         .jp-checkbox-box.checked {
// //           background: #6366f1;
// //           border-color: #6366f1;
// //           box-shadow: 0 0 10px rgba(99,102,241,0.4);
// //         }

// //         /* Divider */
// //         .jp-divider {
// //           display: flex;
// //           align-items: center;
// //           gap: 12px;
// //         }
// //         .jp-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
// //         .jp-divider-text { font-size: 11px; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; text-transform: uppercase; }

// //         /* ── Legal Modal ─────────────────────────────────────── */
// //         .jp-overlay {
// //           position: fixed;
// //           inset: 0;
// //           background: rgba(0,0,0,0.75);
// //           backdrop-filter: blur(6px);
// //           -webkit-backdrop-filter: blur(6px);
// //           z-index: 9999;
// //           display: flex;
// //           align-items: flex-end;
// //           justify-content: center;
// //           padding: 0;
// //           animation: jp-overlay-in 0.2s ease;
// //         }
// //         @keyframes jp-overlay-in {
// //           from { opacity: 0; }
// //           to   { opacity: 1; }
// //         }
// //         @media (min-width: 540px) {
// //           .jp-overlay { align-items: center; padding: 24px 16px; }
// //         }

// //         .jp-modal {
// //           width: 100%;
// //           max-width: 560px;
// //           max-height: 92dvh;
// //           display: flex;
// //           flex-direction: column;
// //           background: #0d0b20;
// //           border: 1px solid rgba(255,255,255,0.1);
// //           border-radius: 20px 20px 0 0;
// //           overflow: hidden;
// //           box-shadow: 0 -8px 60px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(255,255,255,0.05) inset;
// //           animation: jp-modal-in 0.28s cubic-bezier(0.32,0.72,0,1);
// //         }
// //         @media (min-width: 540px) {
// //           .jp-modal {
// //             border-radius: 20px;
// //             max-height: 88dvh;
// //             animation: jp-modal-center-in 0.25s ease;
// //           }
// //         }
// //         @keyframes jp-modal-in {
// //           from { transform: translateY(100%); }
// //           to   { transform: translateY(0); }
// //         }
// //         @keyframes jp-modal-center-in {
// //           from { opacity: 0; transform: scale(0.95) translateY(12px); }
// //           to   { opacity: 1; transform: scale(1)    translateY(0); }
// //         }

// //         .jp-modal-header {
// //           flex-shrink: 0;
// //           display: flex;
// //           align-items: center;
// //           justify-content: space-between;
// //           padding: 18px 20px 16px;
// //           border-bottom: 1px solid rgba(255,255,255,0.07);
// //           background: #0d0b20;
// //         }

// //         .jp-modal-body {
// //           flex: 1;
// //           overflow-y: auto;
// //           -webkit-overflow-scrolling: touch;
// //           overscroll-behavior: contain;
// //           padding: 24px 20px;
// //           font-size: 13.5px;
// //           line-height: 1.75;
// //           color: rgba(255,255,255,0.55);
// //         }
// //         .jp-modal-body::-webkit-scrollbar { width: 4px; }
// //         .jp-modal-body::-webkit-scrollbar-track { background: transparent; }
// //         .jp-modal-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }

// //         .jp-modal-body h2 {
// //           font-size: 11px;
// //           font-weight: 700;
// //           letter-spacing: 0.1em;
// //           text-transform: uppercase;
// //           color: rgba(255,255,255,0.25);
// //           margin: 28px 0 10px;
// //         }
// //         .jp-modal-body h2:first-child { margin-top: 0; }
// //         .jp-modal-body p { margin: 0 0 12px; }
// //         .jp-modal-body ul { margin: 0 0 12px; padding-left: 18px; }
// //         .jp-modal-body li { margin-bottom: 6px; }
// //         .jp-modal-body strong { color: rgba(255,255,255,0.75); font-weight: 600; }

// //         .jp-modal-footer {
// //           flex-shrink: 0;
// //           padding: 14px 20px;
// //           border-top: 1px solid rgba(255,255,255,0.07);
// //           background: #0d0b20;
// //           display: flex;
// //           flex-direction: column;
// //           gap: 10px;
// //         }
// //         .jp-scroll-notice {
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //           font-size: 12px;
// //           color: rgba(255,255,255,0.3);
// //           padding: 8px 12px;
// //           border-radius: 10px;
// //           background: rgba(255,255,255,0.03);
// //           border: 1px solid rgba(255,255,255,0.06);
// //           transition: all 0.2s ease;
// //         }
// //         .jp-scroll-notice.ready {
// //           color: rgba(134,239,172,0.9);
// //           background: rgba(34,197,94,0.07);
// //           border-color: rgba(34,197,94,0.2);
// //         }
// //         .jp-agree-btn {
// //           width: 100%;
// //           height: 46px;
// //           border-radius: 12px;
// //           border: none;
// //           background: linear-gradient(135deg,#6366f1,#8b5cf6);
// //           color: #fff;
// //           font-size: 14px;
// //           font-weight: 700;
// //           cursor: pointer;
// //           transition: all 0.18s ease;
// //           font-family: inherit;
// //           box-shadow: 0 4px 20px rgba(99,102,241,0.35);
// //           -webkit-tap-highlight-color: transparent;
// //         }
// //         .jp-agree-btn:hover:not(:disabled) {
// //           box-shadow: 0 6px 28px rgba(99,102,241,0.55);
// //           transform: translateY(-1px);
// //         }
// //         .jp-agree-btn:disabled {
// //           opacity: 0.35;
// //           cursor: not-allowed;
// //           transform: none;
// //           box-shadow: none;
// //         }
// //         .jp-agree-btn:active:not(:disabled) { transform: scale(0.98); }

// //         /* Alert banners */
// //         .jp-alert {
// //           display: flex;
// //           align-items: flex-start;
// //           gap: 10px;
// //           padding: 12px 14px;
// //           border-radius: 12px;
// //           font-size: 13px;
// //           font-weight: 500;
// //           line-height: 1.5;
// //         }
// //         .jp-alert-error   { background: rgba(239,68,68,0.08);  border: 1px solid rgba(239,68,68,0.2);  color: #fca5a5; }
// //         .jp-alert-success { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2); color: #86efac; }
// //       `}</style>

// //       <div className="jp-wrap">
// //         {/* Ambient glow */}
// //         <div className="jp-glow" />

// //         <div className="jp-card">
// //           {/* ── Card header ── */}
// //           <div className="jp-header">
// //             <div
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 marginBottom: 14,
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   width: 36,
// //                   height: 36,
// //                   borderRadius: 10,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   boxShadow: "0 0 20px rgba(99,102,241,0.4)",
// //                 }}
// //               >
// //                 <div className="lp-brand">
// //                   <img
// //                     src="/quikchat-logo.png"
// //                     alt=""
// //                     className="lp-brand-mark"
// //                   />
// //                   {/* <span className="lp-brand-text">quikchat</span> */}
// //                 </div>
// //               </div>
// //             </div>
// //             <h1
// //               style={{
// //                 margin: 0,
// //                 fontSize: "clamp(18px,4vw,22px)",
// //                 fontWeight: 800,
// //                 color: "#f1f5f9",
// //                 letterSpacing: "-0.02em",
// //               }}
// //             >
// //               Join QuikChat
// //             </h1>
// //             <p
// //               style={{
// //                 margin: "6px 0 0",
// //                 fontSize: 13,
// //                 color: "rgba(255,255,255,0.35)",
// //                 fontWeight: 500,
// //               }}
// //             >
// //               Create your account to start connecting
// //             </p>
// //           </div>

// //           {/* ── Form body ── */}
// //           <form onSubmit={handleSubmit} className="jp-body">
// //             {/* Success banner */}
// //             {success && (
// //               <div className="jp-alert jp-alert-success">
// //                 <CheckCircle2
// //                   size={15}
// //                   style={{ flexShrink: 0, marginTop: 1 }}
// //                 />
// //                 Account created! You can now{" "}
// //                 <Link
// //                   to="/login"
// //                   style={{ color: "#4ade80", textDecoration: "underline" }}
// //                 >
// //                   log in
// //                 </Link>{" "}
// //                 🎉
// //               </div>
// //             )}

// //             {/* Google OAuth */}
// //             <button
// //               type="button"
// //               onClick={handleGoogleSignIn}
// //               className="jp-google-btn"
// //             >
// //               <svg width="17" height="17" viewBox="0 0 48 48" fill="none">
// //                 <path
// //                   fill="#FFC107"
// //                   d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
// //                 />
// //                 <path
// //                   fill="#FF3D00"
// //                   d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
// //                 />
// //                 <path
// //                   fill="#4CAF50"
// //                   d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.6 35.5 16.3 44 24 44z"
// //                 />
// //                 <path
// //                   fill="#1976D2"
// //                   d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C41.2 36.3 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5z"
// //                 />
// //               </svg>
// //               Continue with Google
// //             </button>

// //             {/* Divider */}
// //             <div className="jp-divider">
// //               <div className="jp-divider-line" />
// //               <span className="jp-divider-text">or</span>
// //               <div className="jp-divider-line" />
// //             </div>

// //             {/* Row 1 — username + email */}
// //             <div className="jp-grid">
// //               <Field label="Username">
// //                 <input
// //                   className="jp-input"
// //                   style={inputStyle}
// //                   type="text"
// //                   name="username"
// //                   value={formData.username}
// //                   onChange={handleChange}
// //                   required
// //                   placeholder="cool_stranger"
// //                   autoComplete="username"
// //                 />
// //               </Field>
// //               <Field label="Email">
// //                 <input
// //                   className="jp-input"
// //                   style={inputStyle}
// //                   type="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   required
// //                   placeholder="you@example.com"
// //                   autoComplete="email"
// //                 />
// //               </Field>
// //             </div>

// //             {/* Row 2 — password + age */}
// //             <div className="jp-grid">
// //               <Field label="Password">
// //                 <input
// //                   className="jp-input"
// //                   style={inputStyle}
// //                   type="password"
// //                   name="password"
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   required
// //                   placeholder="••••••••"
// //                   autoComplete="new-password"
// //                 />
// //               </Field>
// //               <Field label="Age">
// //                 <input
// //                   className="jp-input"
// //                   style={inputStyle}
// //                   type="number"
// //                   name="age"
// //                   min="16"
// //                   value={formData.age}
// //                   onChange={handleChange}
// //                   required
// //                   placeholder="16+ only"
// //                 />
// //               </Field>
// //             </div>

// //             {/* Row 3 — country + gender */}
// //             <div className="jp-grid">
// //               <Field label="Country">
// //                 <CountrySelect
// //                   value={formData.country}
// //                   countries={COUNTRIES}
// //                   onChange={(code) =>
// //                     setFormData((prev) => ({ ...prev, country: code }))
// //                   }
// //                 />
// //               </Field>
// //               <Field label="Gender">
// //                 <GenderSelect
// //                   value={formData.gender}
// //                   onChange={(val) =>
// //                     setFormData((prev) => ({ ...prev, gender: val }))
// //                   }
// //                 />
// //               </Field>
// //             </div>

// //             {/* Terms & Guidelines — must read + agree each before joining */}
// //             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
// //               {/* Read indicator row */}
// //               {[
// //                 {
// //                   key: "terms",
// //                   label: "Terms & Conditions",
// //                   agreed: agreedTerms,
// //                   icon: <ScrollText size={13} />,
// //                 },
// //                 {
// //                   key: "guidelines",
// //                   label: "Community Guidelines",
// //                   agreed: agreedGuide,
// //                   icon: <ShieldCheck size={13} />,
// //                 },
// //               ].map(({ key, label, agreed, icon }) => (
// //                 <div
// //                   key={key}
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "space-between",
// //                     padding: "10px 14px",
// //                     borderRadius: 12,
// //                     background: agreed
// //                       ? "rgba(34,197,94,0.07)"
// //                       : "rgba(255,255,255,0.03)",
// //                     border: agreed
// //                       ? "1px solid rgba(34,197,94,0.2)"
// //                       : "1px solid rgba(255,255,255,0.07)",
// //                     transition: "all 0.2s ease",
// //                   }}
// //                 >
// //                   <div
// //                     style={{ display: "flex", alignItems: "center", gap: 9 }}
// //                   >
// //                     <span
// //                       style={{
// //                         color: agreed ? "#4ade80" : "rgba(255,255,255,0.3)",
// //                       }}
// //                     >
// //                       {icon}
// //                     </span>
// //                     <span
// //                       style={{
// //                         fontSize: 13,
// //                         fontWeight: 500,
// //                         color: agreed ? "#86efac" : "rgba(255,255,255,0.5)",
// //                       }}
// //                     >
// //                       {label}
// //                     </span>
// //                   </div>
// //                   <div
// //                     style={{ display: "flex", alignItems: "center", gap: 8 }}
// //                   >
// //                     {agreed && (
// //                       <span
// //                         style={{
// //                           fontSize: 11,
// //                           color: "#4ade80",
// //                           fontWeight: 600,
// //                         }}
// //                       >
// //                         ✓ Agreed
// //                       </span>
// //                     )}
// //                     <button
// //                       type="button"
// //                       onClick={() => setOpenModal(key)}
// //                       style={{
// //                         padding: "5px 12px",
// //                         borderRadius: 8,
// //                         border: "1px solid rgba(139,92,246,0.3)",
// //                         background: agreed
// //                           ? "rgba(34,197,94,0.08)"
// //                           : "rgba(99,102,241,0.1)",
// //                         color: agreed ? "#4ade80" : "#a5b4fc",
// //                         fontSize: 12,
// //                         fontWeight: 600,
// //                         cursor: "pointer",
// //                         fontFamily: "inherit",
// //                         transition: "all 0.15s ease",
// //                         whiteSpace: "nowrap",
// //                       }}
// //                     >
// //                       {agreed ? "Re-read" : "Read & Agree"}
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}

// //               {/* Checkbox — only enabled when both agreed */}
// //               <label
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "flex-start",
// //                   gap: 10,
// //                   cursor: bothAgreed ? "pointer" : "not-allowed",
// //                   marginTop: 2,
// //                 }}
// //               >
// //                 <input
// //                   type="checkbox"
// //                   name="acceptedTerms"
// //                   checked={formData.acceptedTerms}
// //                   onChange={() => {}}
// //                   style={{
// //                     position: "absolute",
// //                     opacity: 0,
// //                     width: 0,
// //                     height: 0,
// //                   }}
// //                 />
// //                 <div
// //                   className={"jp-checkbox-box" + (bothAgreed ? " checked" : "")}
// //                   style={{ opacity: bothAgreed ? 1 : 0.35 }}
// //                 >
// //                   {bothAgreed && (
// //                     <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
// //                       <path
// //                         d="M1 3.5L3.5 6L8 1"
// //                         stroke="white"
// //                         strokeWidth="1.5"
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                       />
// //                     </svg>
// //                   )}
// //                 </div>
// //                 <span
// //                   style={{
// //                     fontSize: 13,
// //                     color: bothAgreed
// //                       ? "rgba(255,255,255,0.6)"
// //                       : "rgba(255,255,255,0.25)",
// //                     lineHeight: 1.6,
// //                     userSelect: "none",
// //                     transition: "color 0.2s ease",
// //                   }}
// //                 >
// //                   {bothAgreed
// //                     ? "I confirm I am at least 16 and have read and agreed to both documents above."
// //                     : "Read and agree to both documents above to continue."}
// //                 </span>
// //               </label>
// //             </div>

// //             {/* Error banner */}
// //             {error && (
// //               <div className="jp-alert jp-alert-error">
// //                 <AlertCircle
// //                   size={15}
// //                   style={{ flexShrink: 0, marginTop: 1 }}
// //                 />
// //                 {error}
// //               </div>
// //             )}

// //             {/* Submit */}
// //             <button
// //               type="submit"
// //               disabled={!formData.acceptedTerms || loading || success}
// //               className="jp-submit"
// //             >
// //               {loading ? (
// //                 <>
// //                   <Loader2
// //                     size={15}
// //                     style={{ animation: "spin 1s linear infinite" }}
// //                   />
// //                   Creating account…
// //                 </>
// //               ) : (
// //                 "Create Account 🚀"
// //               )}
// //             </button>

// //             {/* Login link */}
// //             <p
// //               style={{
// //                 textAlign: "center",
// //                 fontSize: 13,
// //                 color: "rgba(255,255,255,0.3)",
// //                 margin: 0,
// //               }}
// //             >
// //               Already have an account?{" "}
// //               <Link
// //                 to="/login"
// //                 style={{
// //                   color: "#818cf8",
// //                   fontWeight: 600,
// //                   textDecoration: "none",
// //                 }}
// //                 onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
// //                 onMouseLeave={(e) => (e.currentTarget.style.color = "#818cf8")}
// //               >
// //                 Login
// //               </Link>
// //             </p>
// //           </form>
// //         </div>
// //       </div>

// //       {/* Spinner keyframe */}
// //       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

// //       {/* Legal modals — portal-like, rendered at top level */}
// //       {openModal && <LegalModal type={openModal} />}
// //     </>
// //   );
// // };

// // // ─── Terms of Service content ─────────────────────────────────────────────────
// // function TermsContent() {
// //   return (
// //     <>
// //       <h2>1. Acceptance of Terms</h2>
// //       <p>
// //         By creating an account on <strong>HelloStranger</strong>, you confirm
// //         that you have read, understood, and agree to be bound by these Terms &
// //         Conditions. If you do not agree, you must not use this service. We may
// //         update these terms at any time; continued use after changes constitutes
// //         acceptance.
// //       </p>

// //       <h2>2. Eligibility</h2>
// //       <p>
// //         You must be at least <strong>16 years of age</strong> to register and
// //         use HelloStranger. By registering, you represent and warrant that you
// //         meet this age requirement. We reserve the right to terminate accounts of
// //         users found to be under this age.
// //       </p>

// //       <h2>3. Account Responsibilities</h2>
// //       <ul>
// //         <li>
// //           You are responsible for maintaining the confidentiality of your login
// //           credentials.
// //         </li>
// //         <li>
// //           You must provide accurate, current, and complete information during
// //           registration.
// //         </li>
// //         <li>
// //           You are solely responsible for all activity that occurs under your
// //           account.
// //         </li>
// //         <li>
// //           You must notify us immediately of any unauthorised use of your
// //           account.
// //         </li>
// //         <li>
// //           One account per person — creating multiple accounts is not permitted.
// //         </li>
// //       </ul>

// //       <h2>4. Acceptable Use</h2>
// //       <p>You agree not to use HelloStranger to:</p>
// //       <ul>
// //         <li>Harass, bully, threaten, or intimidate other users.</li>
// //         <li>
// //           Share, solicit, or transmit sexual content involving minors in any
// //           form.
// //         </li>
// //         <li>
// //           Impersonate any person or entity, or falsely represent your
// //           affiliation.
// //         </li>
// //         <li>Transmit spam, unsolicited messages, or phishing content.</li>
// //         <li>Distribute malware, viruses, or any harmful code.</li>
// //         <li>
// //           Circumvent, disable, or interfere with security-related features.
// //         </li>
// //         <li>
// //           Collect or harvest personal data of other users without consent.
// //         </li>
// //         <li>Engage in any activity that is illegal under applicable law.</li>
// //       </ul>

// //       <h2>5. Video Chat Rules</h2>
// //       <ul>
// //         <li>
// //           Nudity, sexual conduct, or explicit content during video sessions is
// //           strictly prohibited.
// //         </li>
// //         <li>
// //           Recording video sessions without the explicit consent of all
// //           participants is forbidden.
// //         </li>
// //         <li>
// //           You must not use HelloStranger video chats for commercial
// //           solicitation.
// //         </li>
// //       </ul>

// //       <h2>6. Content & Intellectual Property</h2>
// //       <p>
// //         You retain ownership of content you post but grant HelloStranger a
// //         non-exclusive, worldwide, royalty-free licence to use, display, and
// //         distribute that content in connection with the service. You warrant that
// //         any content you submit does not infringe the rights of any third party.
// //       </p>

// //       <h2>7. Privacy</h2>
// //       <p>
// //         Your use of HelloStranger is also governed by our Privacy Policy. By
// //         accepting these terms you also accept our Privacy Policy. We collect
// //         only the data necessary to provide the service and do not sell your
// //         personal information to third parties.
// //       </p>

// //       <h2>8. Termination</h2>
// //       <p>
// //         We reserve the right to suspend or permanently terminate your account,
// //         at our sole discretion, for violation of these Terms, Community
// //         Guidelines, or any applicable law — without prior notice or liability.
// //       </p>

// //       <h2>9. Disclaimers & Limitation of Liability</h2>
// //       <p>
// //         HelloStranger is provided <strong>"as is"</strong> without warranties of
// //         any kind. To the maximum extent permitted by law, HelloStranger shall
// //         not be liable for any indirect, incidental, special, or consequential
// //         damages arising from your use of the service, including interactions
// //         with other users.
// //       </p>

// //       <h2>10. Governing Law</h2>
// //       <p>
// //         These Terms are governed by and construed in accordance with applicable
// //         law. Any disputes arising from these Terms will be subject to the
// //         exclusive jurisdiction of the competent courts in the applicable
// //         territory.
// //       </p>

// //       <h2>11. Contact</h2>
// //       <p>
// //         For questions about these Terms, contact us at{" "}
// //         <strong>legal@hellostrangerapp.com</strong>.
// //       </p>
// //       <p
// //         style={{ marginTop: 24, color: "rgba(255,255,255,0.2)", fontSize: 12 }}
// //       >
// //         Last updated: January 2025
// //       </p>
// //     </>
// //   );
// // }

// // // ─── Community Guidelines content ────────────────────────────────────────────
// // function GuidelinesContent() {
// //   return (
// //     <>
// //       <h2>Our Community Promise</h2>
// //       <p>
// //         HelloStranger exists to help people make real connections across the
// //         world. Every interaction shapes what this community feels like. These
// //         guidelines exist to protect everyone and ensure HelloStranger stays a
// //         place people genuinely want to be.
// //       </p>

// //       <h2>1. Treat Everyone With Respect</h2>
// //       <ul>
// //         <li>Speak to others the way you would want to be spoken to.</li>
// //         <li>
// //           Disagreements are fine — personal attacks and hate speech are not.
// //         </li>
// //         <li>
// //           Do not discriminate based on race, ethnicity, religion, gender, sexual
// //           orientation, disability, nationality, or age.
// //         </li>
// //         <li>
// //           Mocking or belittling someone for their appearance, accent, or
// //           background is not allowed.
// //         </li>
// //       </ul>

// //       <h2>2. Zero Tolerance Behaviours</h2>
// //       <p>
// //         The following will result in an immediate permanent ban with no appeal:
// //       </p>
// //       <ul>
// //         <li>
// //           <strong>Child sexual abuse material (CSAM)</strong> — any depiction,
// //           solicitation, or grooming of minors.
// //         </li>
// //         <li>
// //           <strong>Threats of violence</strong> — credible threats directed at
// //           any individual or group.
// //         </li>
// //         <li>
// //           <strong>Doxxing</strong> — sharing someone's private personal
// //           information without consent.
// //         </li>
// //         <li>
// //           <strong>Non-consensual intimate imagery</strong> — sharing or
// //           threatening to share intimate images without consent.
// //         </li>
// //       </ul>

// //       <h2>3. No Harassment or Stalking</h2>
// //       <ul>
// //         <li>
// //           Do not repeatedly contact someone who has blocked you or asked you to
// //           stop.
// //         </li>
// //         <li>
// //           Do not follow, track, or attempt to identify a user's real-world
// //           location without consent.
// //         </li>
// //         <li>
// //           Coordinated campaigns to harass a specific person are prohibited.
// //         </li>
// //       </ul>

// //       <h2>4. Keep It Safe for Everyone</h2>
// //       <ul>
// //         <li>
// //           Do not share or encourage self-harm, suicide methods, or dangerous
// //           behaviour.
// //         </li>
// //         <li>
// //           Do not promote or sell illegal substances, weapons, or counterfeit
// //           goods.
// //         </li>
// //         <li>
// //           Do not spread deliberate misinformation about health emergencies or
// //           public safety.
// //         </li>
// //       </ul>

// //       <h2>5. Authentic Identity</h2>
// //       <ul>
// //         <li>
// //           Do not impersonate real people, celebrities, or other HelloStranger
// //           users.
// //         </li>
// //         <li>
// //           Do not misrepresent your age, especially to interact with minors.
// //         </li>
// //         <li>Fake or bot accounts are not permitted.</li>
// //       </ul>

// //       <h2>6. Spam & Commercial Activity</h2>
// //       <ul>
// //         <li>
// //           Do not send unsolicited promotional messages or repeat identical
// //           messages.
// //         </li>
// //         <li>
// //           Do not use HelloStranger to run scams, phishing attacks, or pyramid
// //           schemes.
// //         </li>
// //         <li>
// //           Commercial advertising without explicit permission from HelloStranger
// //           is not allowed.
// //         </li>
// //       </ul>

// //       <h2>7. Reporting & Enforcement</h2>
// //       <p>
// //         Use the in-app report button whenever you encounter a guideline
// //         violation. Our moderation team reviews all reports. Enforcement actions
// //         range from a warning to a permanent ban, depending on severity and
// //         history. We aim to be consistent and fair.
// //       </p>

// //       <h2>8. Your Role in the Community</h2>
// //       <p>
// //         You are not just a user — you are a member. The quality of this
// //         community depends on each person who joins it. If something feels wrong,
// //         report it. If someone seems distressed, be kind. Together we can make
// //         HelloStranger a place worth coming back to.
// //       </p>

// //       <p
// //         style={{ marginTop: 24, color: "rgba(255,255,255,0.2)", fontSize: 12 }}
// //       >
// //         Last updated: January 2025
// //       </p>
// //     </>
// //   );
// // }

// // export default JoinPage;

// import { useState } from "react";
// import { joinUser } from "../api/auth";
// import { Link } from "react-router-dom";
// import { COUNTRIES } from "../data/countries";
// import CountrySelect from "../components/CountrySelect";
// import GenderSelect from "../components/GenderSelect";
// import {
//   AlertCircle,
//   CheckCircle2,
//   Loader2,
//   X,
//   ScrollText,
//   ShieldCheck,
// } from "lucide-react";

// const BACKEND_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// // ─── Reusable field wrapper ───────────────────────────────────────────────────
// function Field({ label, children }) {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//       <label
//         style={{
//           fontSize: 11,
//           fontWeight: 600,
//           color: "rgba(255,255,255,0.35)",
//           letterSpacing: "0.08em",
//           textTransform: "uppercase",
//         }}
//       >
//         {label}
//       </label>
//       {children}
//     </div>
//   );
// }

// // ─── Shared input style ───────────────────────────────────────────────────────
// const inputStyle = {
//   width: "100%",
//   padding: "11px 14px",
//   borderRadius: 12,
//   border: "1px solid rgba(255,255,255,0.09)",
//   background: "rgba(255,255,255,0.04)",
//   color: "#f1f5f9",
//   fontSize: 14,
//   outline: "none",
//   boxSizing: "border-box",
//   fontFamily: "inherit",
//   transition: "border-color 0.15s ease, background 0.15s ease",
// };

// // ─── Main component ───────────────────────────────────────────────────────────
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
//   const [openModal, setOpenModal] = useState(null); // "terms" | "guidelines" | null
//   const [scrolledTerms, setScrolledTerms] = useState(false);
//   const [scrolledGuide, setScrolledGuide] = useState(false);
//   const [agreedTerms, setAgreedTerms] = useState(false);
//   const [agreedGuide, setAgreedGuide] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Both docs must be agreed to enable the checkbox and submit
//   const bothAgreed = agreedTerms && agreedGuide;
//   // Keep formData.acceptedTerms in sync
//   if (formData.acceptedTerms !== bothAgreed) {
//     setFormData((prev) => ({ ...prev, acceptedTerms: bothAgreed }));
//   }

//   const handleModalScroll = (e, setter) => {
//     const el = e.currentTarget;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
//     if (nearBottom) setter(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (Number(formData.age) < 16) {
//       setError("You must be at least 16 years old.");
//       return;
//     }
//     if (!formData.acceptedTerms) {
//       setError("You must agree to the Terms & Conditions.");
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

//   const handleGoogleSignIn = () => {
//     window.location.href = `${BACKEND_URL}/auth/google`;
//   };

//   // ── Legal modal renderer ───────────────────────────────────────────────────
//   const LegalModal = ({ type }) => {
//     const isTerms = type === "terms";
//     const hasScrolled = isTerms ? scrolledTerms : scrolledGuide;
//     const hasAgreed = isTerms ? agreedTerms : agreedGuide;
//     const setScrolled = isTerms ? setScrolledTerms : setScrolledGuide;
//     const setAgreed = isTerms ? setAgreedTerms : setAgreedGuide;

//     const agree = () => {
//       setAgreed(true);
//       setOpenModal(null);
//     };

//     return (
//       <div
//         className="jp-overlay"
//         onClick={(e) => {
//           if (e.target === e.currentTarget) setOpenModal(null);
//         }}
//       >
//         <div className="jp-modal" role="dialog" aria-modal="true">
//           {/* Header */}
//           <div className="jp-modal-header">
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               {isTerms ? (
//                 <ScrollText
//                   size={16}
//                   style={{ color: "#818cf8", flexShrink: 0 }}
//                 />
//               ) : (
//                 <ShieldCheck
//                   size={16}
//                   style={{ color: "#818cf8", flexShrink: 0 }}
//                 />
//               )}
//               <span
//                 style={{
//                   fontSize: 15,
//                   fontWeight: 700,
//                   color: "#f1f5f9",
//                   letterSpacing: "-0.01em",
//                 }}
//               >
//                 {isTerms ? "Terms & Conditions" : "Community Guidelines"}
//               </span>
//             </div>
//             <button
//               onClick={() => setOpenModal(null)}
//               style={{
//                 width: 32,
//                 height: 32,
//                 borderRadius: 8,
//                 border: "1px solid rgba(255,255,255,0.09)",
//                 background: "transparent",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//                 color: "rgba(255,255,255,0.4)",
//                 flexShrink: 0,
//               }}
//             >
//               <X size={14} />
//             </button>
//           </div>

//           {/* Scrollable body */}
//           <div
//             className="jp-modal-body"
//             onScroll={(e) => handleModalScroll(e, setScrolled)}
//           >
//             {isTerms ? <TermsContent /> : <GuidelinesContent />}
//             {/* Sentinel — reaching this means fully scrolled */}
//             <div style={{ height: 1 }} />
//           </div>

//           {/* Footer */}
//           <div className="jp-modal-footer">
//             <div className={"jp-scroll-notice" + (hasScrolled ? " ready" : "")}>
//               {hasScrolled ? (
//                 <>
//                   <CheckCircle2 size={13} /> You have read this document — you
//                   can now agree
//                 </>
//               ) : (
//                 <>
//                   <ScrollText size={13} /> Please scroll to the bottom to enable
//                   the agree button
//                 </>
//               )}
//             </div>
//             <button
//               className="jp-agree-btn"
//               disabled={!hasScrolled || hasAgreed}
//               onClick={agree}
//             >
//               {hasAgreed ? "✓ Already agreed" : "I have read and agree"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

//         .jp-wrap {
//           min-height: 100%;
//           display: flex;
//           align-items: flex-start;
//           justify-content: center;
//           padding: clamp(24px, 5vw, 56px) clamp(16px, 4vw, 24px);
//           box-sizing: border-box;
//           font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
//           position: relative;
//         }

//         /* Background glow */
//         .jp-glow {
//           position: fixed;
//           top: 10%;
//           left: 50%;
//           transform: translateX(-50%);
//           width: min(600px, 90vw);
//           height: min(600px, 90vw);
//           background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
//           pointer-events: none;
//           z-index: 0;
//           border-radius: 50%;
//           filter: blur(40px);
//         }

//         /* Card */
//         .jp-card {
//           position: relative;
//           z-index: 1;
//           width: 100%;
//           max-width: 560px;
//           background: rgba(10, 8, 28, 0.92);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 20px;
//           overflow: hidden;
//           box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04) inset;
//         }

//         /* Card header */
//         .jp-header {
//           padding: clamp(24px, 4vw, 36px) clamp(20px, 4vw, 32px) clamp(20px, 3vw, 28px);
//           text-align: center;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//         }

//         /* Brand lockup — matches header + login page logo treatment */
//         .jp-brand {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 9px;
//           margin-bottom: 14px;
//         }
//         .jp-brand-mark {
//           width: 36px;
//           height: 36px;
//           flex-shrink: 0;
//           object-fit: contain;
//         }
//         .jp-brand-text {
//           font-weight: 800;
//           font-size: 20px;
//           letter-spacing: -0.03em;
//           background: linear-gradient(120deg,#38bdf8 0%,#818cf8 45%,#c084fc 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           filter: drop-shadow(0 0 14px rgba(99,102,241,0.35));
//         }

//         /* Form body */
//         .jp-body {
//           padding: clamp(20px, 4vw, 32px) clamp(20px, 4vw, 32px) clamp(24px, 4vw, 36px);
//           display: flex;
//           flex-direction: column;
//           gap: clamp(14px, 2.5vw, 20px);
//         }

//         /* Two-col grid — stacks on small phones */
//         .jp-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: clamp(12px, 2vw, 16px);
//         }
//         @media (min-width: 460px) {
//           .jp-grid { grid-template-columns: 1fr 1fr; }
//         }

//         /* Input focus states */
//         .jp-input:focus {
//           border-color: rgba(139,92,246,0.5) !important;
//           background: rgba(99,102,241,0.06) !important;
//         }
//         .jp-input::placeholder { color: rgba(255,255,255,0.2); }
//         /* Remove number input arrows */
//         .jp-input[type=number]::-webkit-inner-spin-button,
//         .jp-input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
//         .jp-input[type=number] { -moz-appearance: textfield; }

//         /* Google button */
//         .jp-google-btn {
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
//           transition: all 0.15s ease;
//           font-family: inherit;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .jp-google-btn:hover {
//           background: rgba(255,255,255,0.07);
//           border-color: rgba(255,255,255,0.18);
//           color: #fff;
//         }
//         .jp-google-btn:active { transform: scale(0.98); }

//         /* Submit button — matches header/hero primary buttons */
//         .jp-submit {
//           width: 100%;
//           height: 48px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           border-radius: 13px;
//           border: none;
//           background: linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#8b5cf6,#6366f1);
//           background-size: 300% auto;
//           background-position: 0% center;
//           color: #fff;
//           font-size: 14px;
//           font-weight: 700;
//           cursor: pointer;
//           transition: box-shadow 0.18s ease, transform 0.18s ease, background-position 0.4s ease;
//           font-family: inherit;
//           letter-spacing: -0.01em;
//           box-shadow: 0 0 18px rgba(99,102,241,0.35), 0 0 32px rgba(236,72,153,0.15);
//           -webkit-tap-highlight-color: transparent;
//         }
//         .jp-submit:hover:not(:disabled) {
//           background-position: 100% center;
//           box-shadow: 0 0 26px rgba(99,102,241,0.55), 0 0 46px rgba(236,72,153,0.28);
//           transform: translateY(-1px);
//         }
//         .jp-submit:active:not(:disabled) { transform: scale(0.98); }
//         .jp-submit:disabled { opacity: 0.4; cursor: not-allowed; }

//         /* Custom checkbox */
//         .jp-checkbox-box {
//           width: 17px;
//           height: 17px;
//           border-radius: 5px;
//           border: 1px solid rgba(255,255,255,0.18);
//           background: rgba(255,255,255,0.04);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//           transition: all 0.15s ease;
//           margin-top: 1px;
//         }
//         .jp-checkbox-box.checked {
//           background: #6366f1;
//           border-color: #6366f1;
//           box-shadow: 0 0 10px rgba(99,102,241,0.4);
//         }

//         /* Divider */
//         .jp-divider {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }
//         .jp-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
//         .jp-divider-text { font-size: 11px; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; text-transform: uppercase; }

//         /* ── Legal Modal ─────────────────────────────────────── */
//         .jp-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.75);
//           backdrop-filter: blur(6px);
//           -webkit-backdrop-filter: blur(6px);
//           z-index: 9999;
//           display: flex;
//           align-items: flex-end;
//           justify-content: center;
//           padding: 0;
//           animation: jp-overlay-in 0.2s ease;
//         }
//         @keyframes jp-overlay-in {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//         @media (min-width: 540px) {
//           .jp-overlay { align-items: center; padding: 24px 16px; }
//         }

//         .jp-modal {
//           width: 100%;
//           max-width: 560px;
//           max-height: 92dvh;
//           display: flex;
//           flex-direction: column;
//           background: #0d0b20;
//           border: 1px solid rgba(255,255,255,0.1);
//           border-radius: 20px 20px 0 0;
//           overflow: hidden;
//           box-shadow: 0 -8px 60px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(255,255,255,0.05) inset;
//           animation: jp-modal-in 0.28s cubic-bezier(0.32,0.72,0,1);
//         }
//         @media (min-width: 540px) {
//           .jp-modal {
//             border-radius: 20px;
//             max-height: 88dvh;
//             animation: jp-modal-center-in 0.25s ease;
//           }
//         }
//         @keyframes jp-modal-in {
//           from { transform: translateY(100%); }
//           to   { transform: translateY(0); }
//         }
//         @keyframes jp-modal-center-in {
//           from { opacity: 0; transform: scale(0.95) translateY(12px); }
//           to   { opacity: 1; transform: scale(1)    translateY(0); }
//         }

//         .jp-modal-header {
//           flex-shrink: 0;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 18px 20px 16px;
//           border-bottom: 1px solid rgba(255,255,255,0.07);
//           background: #0d0b20;
//         }

//         .jp-modal-body {
//           flex: 1;
//           overflow-y: auto;
//           -webkit-overflow-scrolling: touch;
//           overscroll-behavior: contain;
//           padding: 24px 20px;
//           font-size: 13.5px;
//           line-height: 1.75;
//           color: rgba(255,255,255,0.55);
//         }
//         .jp-modal-body::-webkit-scrollbar { width: 4px; }
//         .jp-modal-body::-webkit-scrollbar-track { background: transparent; }
//         .jp-modal-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }

//         .jp-modal-body h2 {
//           font-size: 11px;
//           font-weight: 700;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.25);
//           margin: 28px 0 10px;
//         }
//         .jp-modal-body h2:first-child { margin-top: 0; }
//         .jp-modal-body p { margin: 0 0 12px; }
//         .jp-modal-body ul { margin: 0 0 12px; padding-left: 18px; }
//         .jp-modal-body li { margin-bottom: 6px; }
//         .jp-modal-body strong { color: rgba(255,255,255,0.75); font-weight: 600; }

//         .jp-modal-footer {
//           flex-shrink: 0;
//           padding: 14px 20px;
//           border-top: 1px solid rgba(255,255,255,0.07);
//           background: #0d0b20;
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }
//         .jp-scroll-notice {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 12px;
//           color: rgba(255,255,255,0.3);
//           padding: 8px 12px;
//           border-radius: 10px;
//           background: rgba(255,255,255,0.03);
//           border: 1px solid rgba(255,255,255,0.06);
//           transition: all 0.2s ease;
//         }
//         .jp-scroll-notice.ready {
//           color: rgba(134,239,172,0.9);
//           background: rgba(34,197,94,0.07);
//           border-color: rgba(34,197,94,0.2);
//         }
//         .jp-agree-btn {
//           width: 100%;
//           height: 46px;
//           border-radius: 12px;
//           border: none;
//           background: linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#8b5cf6,#6366f1);
//           background-size: 300% auto;
//           background-position: 0% center;
//           color: #fff;
//           font-size: 14px;
//           font-weight: 700;
//           cursor: pointer;
//           transition: box-shadow 0.18s ease, transform 0.18s ease, background-position 0.4s ease;
//           font-family: inherit;
//           box-shadow: 0 0 18px rgba(99,102,241,0.35), 0 0 32px rgba(236,72,153,0.15);
//           -webkit-tap-highlight-color: transparent;
//         }
//         .jp-agree-btn:hover:not(:disabled) {
//           background-position: 100% center;
//           box-shadow: 0 0 26px rgba(99,102,241,0.55), 0 0 46px rgba(236,72,153,0.28);
//           transform: translateY(-1px);
//         }
//         .jp-agree-btn:disabled {
//           opacity: 0.35;
//           cursor: not-allowed;
//           transform: none;
//           box-shadow: none;
//         }
//         .jp-agree-btn:active:not(:disabled) { transform: scale(0.98); }

//         /* Alert banners */
//         .jp-alert {
//           display: flex;
//           align-items: flex-start;
//           gap: 10px;
//           padding: 12px 14px;
//           border-radius: 12px;
//           font-size: 13px;
//           font-weight: 500;
//           line-height: 1.5;
//         }
//         .jp-alert-error   { background: rgba(239,68,68,0.08);  border: 1px solid rgba(239,68,68,0.2);  color: #fca5a5; }
//         .jp-alert-success { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2); color: #86efac; }
//       `}</style>

//       <div className="jp-wrap">
//         {/* Ambient glow */}
//         <div className="jp-glow" />

//         <div className="jp-card">
//           {/* ── Card header ── */}
//           <div className="jp-header">
//             <div className="jp-brand">
//               <img src="/quikchat-logo.png" alt="" className="jp-brand-mark" />
//               <span className="jp-brand-text">quikchat</span>
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
//               Join quikchat
//             </h1>
//             <p
//               style={{
//                 margin: "6px 0 0",
//                 fontSize: 13,
//                 color: "rgba(255,255,255,0.35)",
//                 fontWeight: 500,
//               }}
//             >
//               Create your account to start connecting
//             </p>
//           </div>

//           {/* ── Form body ── */}
//           <form onSubmit={handleSubmit} className="jp-body">
//             {/* Success banner */}
//             {success && (
//               <div className="jp-alert jp-alert-success">
//                 <CheckCircle2
//                   size={15}
//                   style={{ flexShrink: 0, marginTop: 1 }}
//                 />
//                 Account created! You can now{" "}
//                 <Link
//                   to="/login"
//                   style={{ color: "#4ade80", textDecoration: "underline" }}
//                 >
//                   log in
//                 </Link>{" "}
//                 🎉
//               </div>
//             )}

//             {/* Google OAuth */}
//             <button
//               type="button"
//               onClick={handleGoogleSignIn}
//               className="jp-google-btn"
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
//             <div className="jp-divider">
//               <div className="jp-divider-line" />
//               <span className="jp-divider-text">or</span>
//               <div className="jp-divider-line" />
//             </div>

//             {/* Row 1 — username + email */}
//             <div className="jp-grid">
//               <Field label="Username">
//                 <input
//                   className="jp-input"
//                   style={inputStyle}
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                   placeholder="cool_stranger"
//                   autoComplete="username"
//                 />
//               </Field>
//               <Field label="Email">
//                 <input
//                   className="jp-input"
//                   style={inputStyle}
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   placeholder="you@example.com"
//                   autoComplete="email"
//                 />
//               </Field>
//             </div>

//             {/* Row 2 — password + age */}
//             <div className="jp-grid">
//               <Field label="Password">
//                 <input
//                   className="jp-input"
//                   style={inputStyle}
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   placeholder="••••••••"
//                   autoComplete="new-password"
//                 />
//               </Field>
//               <Field label="Age">
//                 <input
//                   className="jp-input"
//                   style={inputStyle}
//                   type="number"
//                   name="age"
//                   min="16"
//                   value={formData.age}
//                   onChange={handleChange}
//                   required
//                   placeholder="16+ only"
//                 />
//               </Field>
//             </div>

//             {/* Row 3 — country + gender */}
//             <div className="jp-grid">
//               <Field label="Country">
//                 <CountrySelect
//                   value={formData.country}
//                   countries={COUNTRIES}
//                   onChange={(code) =>
//                     setFormData((prev) => ({ ...prev, country: code }))
//                   }
//                 />
//               </Field>
//               <Field label="Gender">
//                 <GenderSelect
//                   value={formData.gender}
//                   onChange={(val) =>
//                     setFormData((prev) => ({ ...prev, gender: val }))
//                   }
//                 />
//               </Field>
//             </div>

//             {/* Terms & Guidelines — must read + agree each before joining */}
//             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//               {/* Read indicator row */}
//               {[
//                 {
//                   key: "terms",
//                   label: "Terms & Conditions",
//                   agreed: agreedTerms,
//                   icon: <ScrollText size={13} />,
//                 },
//                 {
//                   key: "guidelines",
//                   label: "Community Guidelines",
//                   agreed: agreedGuide,
//                   icon: <ShieldCheck size={13} />,
//                 },
//               ].map(({ key, label, agreed, icon }) => (
//                 <div
//                   key={key}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     padding: "10px 14px",
//                     borderRadius: 12,
//                     background: agreed
//                       ? "rgba(34,197,94,0.07)"
//                       : "rgba(255,255,255,0.03)",
//                     border: agreed
//                       ? "1px solid rgba(34,197,94,0.2)"
//                       : "1px solid rgba(255,255,255,0.07)",
//                     transition: "all 0.2s ease",
//                   }}
//                 >
//                   <div
//                     style={{ display: "flex", alignItems: "center", gap: 9 }}
//                   >
//                     <span
//                       style={{
//                         color: agreed ? "#4ade80" : "rgba(255,255,255,0.3)",
//                       }}
//                     >
//                       {icon}
//                     </span>
//                     <span
//                       style={{
//                         fontSize: 13,
//                         fontWeight: 500,
//                         color: agreed ? "#86efac" : "rgba(255,255,255,0.5)",
//                       }}
//                     >
//                       {label}
//                     </span>
//                   </div>
//                   <div
//                     style={{ display: "flex", alignItems: "center", gap: 8 }}
//                   >
//                     {agreed && (
//                       <span
//                         style={{
//                           fontSize: 11,
//                           color: "#4ade80",
//                           fontWeight: 600,
//                         }}
//                       >
//                         ✓ Agreed
//                       </span>
//                     )}
//                     <button
//                       type="button"
//                       onClick={() => setOpenModal(key)}
//                       style={{
//                         padding: "5px 12px",
//                         borderRadius: 8,
//                         border: "1px solid rgba(139,92,246,0.3)",
//                         background: agreed
//                           ? "rgba(34,197,94,0.08)"
//                           : "rgba(99,102,241,0.1)",
//                         color: agreed ? "#4ade80" : "#a5b4fc",
//                         fontSize: 12,
//                         fontWeight: 600,
//                         cursor: "pointer",
//                         fontFamily: "inherit",
//                         transition: "all 0.15s ease",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       {agreed ? "Re-read" : "Read & Agree"}
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {/* Checkbox — only enabled when both agreed */}
//               <label
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   gap: 10,
//                   cursor: bothAgreed ? "pointer" : "not-allowed",
//                   marginTop: 2,
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   name="acceptedTerms"
//                   checked={formData.acceptedTerms}
//                   onChange={() => {}}
//                   style={{
//                     position: "absolute",
//                     opacity: 0,
//                     width: 0,
//                     height: 0,
//                   }}
//                 />
//                 <div
//                   className={"jp-checkbox-box" + (bothAgreed ? " checked" : "")}
//                   style={{ opacity: bothAgreed ? 1 : 0.35 }}
//                 >
//                   {bothAgreed && (
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
//                 <span
//                   style={{
//                     fontSize: 13,
//                     color: bothAgreed
//                       ? "rgba(255,255,255,0.6)"
//                       : "rgba(255,255,255,0.25)",
//                     lineHeight: 1.6,
//                     userSelect: "none",
//                     transition: "color 0.2s ease",
//                   }}
//                 >
//                   {bothAgreed
//                     ? "I confirm I am at least 16 and have read and agreed to both documents above."
//                     : "Read and agree to both documents above to continue."}
//                 </span>
//               </label>
//             </div>

//             {/* Error banner */}
//             {error && (
//               <div className="jp-alert jp-alert-error">
//                 <AlertCircle
//                   size={15}
//                   style={{ flexShrink: 0, marginTop: 1 }}
//                 />
//                 {error}
//               </div>
//             )}

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={!formData.acceptedTerms || loading || success}
//               className="jp-submit"
//             >
//               {loading ? (
//                 <>
//                   <Loader2
//                     size={15}
//                     style={{ animation: "spin 1s linear infinite" }}
//                   />
//                   Creating account…
//                 </>
//               ) : (
//                 "Create Account 🚀"
//               )}
//             </button>

//             {/* Login link */}
//             <p
//               style={{
//                 textAlign: "center",
//                 fontSize: 13,
//                 color: "rgba(255,255,255,0.3)",
//                 margin: 0,
//               }}
//             >
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 style={{
//                   color: "#818cf8",
//                   fontWeight: 600,
//                   textDecoration: "none",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#818cf8")}
//               >
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>

//       {/* Spinner keyframe */}
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

//       {/* Legal modals — portal-like, rendered at top level */}
//       {openModal && <LegalModal type={openModal} />}
//     </>
//   );
// };

// // ─── Terms of Service content ─────────────────────────────────────────────────
// function TermsContent() {
//   return (
//     <>
//       <h2>1. Acceptance of Terms</h2>
//       <p>
//         By creating an account on <strong>quikchat</strong>, you confirm that
//         you have read, understood, and agree to be bound by these Terms &
//         Conditions. If you do not agree, you must not use this service. We may
//         update these terms at any time; continued use after changes constitutes
//         acceptance.
//       </p>

//       <h2>2. Eligibility</h2>
//       <p>
//         You must be at least <strong>16 years of age</strong> to register and
//         use quikchat. By registering, you represent and warrant that you meet
//         this age requirement. We reserve the right to terminate accounts of
//         users found to be under this age.
//       </p>

//       <h2>3. Account Responsibilities</h2>
//       <ul>
//         <li>
//           You are responsible for maintaining the confidentiality of your login
//           credentials.
//         </li>
//         <li>
//           You must provide accurate, current, and complete information during
//           registration.
//         </li>
//         <li>
//           You are solely responsible for all activity that occurs under your
//           account.
//         </li>
//         <li>
//           You must notify us immediately of any unauthorised use of your
//           account.
//         </li>
//         <li>
//           One account per person — creating multiple accounts is not permitted.
//         </li>
//       </ul>

//       <h2>4. Acceptable Use</h2>
//       <p>You agree not to use quikchat to:</p>
//       <ul>
//         <li>Harass, bully, threaten, or intimidate other users.</li>
//         <li>
//           Share, solicit, or transmit sexual content involving minors in any
//           form.
//         </li>
//         <li>
//           Impersonate any person or entity, or falsely represent your
//           affiliation.
//         </li>
//         <li>Transmit spam, unsolicited messages, or phishing content.</li>
//         <li>Distribute malware, viruses, or any harmful code.</li>
//         <li>
//           Circumvent, disable, or interfere with security-related features.
//         </li>
//         <li>
//           Collect or harvest personal data of other users without consent.
//         </li>
//         <li>Engage in any activity that is illegal under applicable law.</li>
//       </ul>

//       <h2>5. Video Chat Rules</h2>
//       <ul>
//         <li>
//           Nudity, sexual conduct, or explicit content during video sessions is
//           strictly prohibited.
//         </li>
//         <li>
//           Recording video sessions without the explicit consent of all
//           participants is forbidden.
//         </li>
//         <li>
//           You must not use quikchat video chats for commercial solicitation.
//         </li>
//       </ul>

//       <h2>6. Content & Intellectual Property</h2>
//       <p>
//         You retain ownership of content you post but grant quikchat a
//         non-exclusive, worldwide, royalty-free licence to use, display, and
//         distribute that content in connection with the service. You warrant that
//         any content you submit does not infringe the rights of any third party.
//       </p>

//       <h2>7. Privacy</h2>
//       <p>
//         Your use of quikchat is also governed by our Privacy Policy. By
//         accepting these terms you also accept our Privacy Policy. We collect
//         only the data necessary to provide the service and do not sell your
//         personal information to third parties.
//       </p>

//       <h2>8. Termination</h2>
//       <p>
//         We reserve the right to suspend or permanently terminate your account,
//         at our sole discretion, for violation of these Terms, Community
//         Guidelines, or any applicable law — without prior notice or liability.
//       </p>

//       <h2>9. Disclaimers & Limitation of Liability</h2>
//       <p>
//         quikchat is provided <strong>"as is"</strong> without warranties of any
//         kind. To the maximum extent permitted by law, quikchat shall not be
//         liable for any indirect, incidental, special, or consequential damages
//         arising from your use of the service, including interactions with other
//         users.
//       </p>

//       <h2>10. Governing Law</h2>
//       <p>
//         These Terms are governed by and construed in accordance with applicable
//         law. Any disputes arising from these Terms will be subject to the
//         exclusive jurisdiction of the competent courts in the applicable
//         territory.
//       </p>

//       <h2>11. Contact</h2>
//       <p>
//         For questions about these Terms, contact us at{" "}
//         <strong>legal@quikchatapp.com</strong>.
//       </p>
//       <p
//         style={{ marginTop: 24, color: "rgba(255,255,255,0.2)", fontSize: 12 }}
//       >
//         Last updated: January 2025
//       </p>
//     </>
//   );
// }

// // ─── Community Guidelines content ────────────────────────────────────────────
// function GuidelinesContent() {
//   return (
//     <>
//       <h2>Our Community Promise</h2>
//       <p>
//         quikchat exists to help people make real connections across the world.
//         Every interaction shapes what this community feels like. These
//         guidelines exist to protect everyone and ensure quikchat stays a place
//         people genuinely want to be.
//       </p>

//       <h2>1. Treat Everyone With Respect</h2>
//       <ul>
//         <li>Speak to others the way you would want to be spoken to.</li>
//         <li>
//           Disagreements are fine — personal attacks and hate speech are not.
//         </li>
//         <li>
//           Do not discriminate based on race, ethnicity, religion, gender, sexual
//           orientation, disability, nationality, or age.
//         </li>
//         <li>
//           Mocking or belittling someone for their appearance, accent, or
//           background is not allowed.
//         </li>
//       </ul>

//       <h2>2. Zero Tolerance Behaviours</h2>
//       <p>
//         The following will result in an immediate permanent ban with no appeal:
//       </p>
//       <ul>
//         <li>
//           <strong>Child sexual abuse material (CSAM)</strong> — any depiction,
//           solicitation, or grooming of minors.
//         </li>
//         <li>
//           <strong>Threats of violence</strong> — credible threats directed at
//           any individual or group.
//         </li>
//         <li>
//           <strong>Doxxing</strong> — sharing someone's private personal
//           information without consent.
//         </li>
//         <li>
//           <strong>Non-consensual intimate imagery</strong> — sharing or
//           threatening to share intimate images without consent.
//         </li>
//       </ul>

//       <h2>3. No Harassment or Stalking</h2>
//       <ul>
//         <li>
//           Do not repeatedly contact someone who has blocked you or asked you to
//           stop.
//         </li>
//         <li>
//           Do not follow, track, or attempt to identify a user's real-world
//           location without consent.
//         </li>
//         <li>
//           Coordinated campaigns to harass a specific person are prohibited.
//         </li>
//       </ul>

//       <h2>4. Keep It Safe for Everyone</h2>
//       <ul>
//         <li>
//           Do not share or encourage self-harm, suicide methods, or dangerous
//           behaviour.
//         </li>
//         <li>
//           Do not promote or sell illegal substances, weapons, or counterfeit
//           goods.
//         </li>
//         <li>
//           Do not spread deliberate misinformation about health emergencies or
//           public safety.
//         </li>
//       </ul>

//       <h2>5. Authentic Identity</h2>
//       <ul>
//         <li>
//           Do not impersonate real people, celebrities, or other quikchat users.
//         </li>
//         <li>
//           Do not misrepresent your age, especially to interact with minors.
//         </li>
//         <li>Fake or bot accounts are not permitted.</li>
//       </ul>

//       <h2>6. Spam & Commercial Activity</h2>
//       <ul>
//         <li>
//           Do not send unsolicited promotional messages or repeat identical
//           messages.
//         </li>
//         <li>
//           Do not use quikchat to run scams, phishing attacks, or pyramid
//           schemes.
//         </li>
//         <li>
//           Commercial advertising without explicit permission from quikchat is
//           not allowed.
//         </li>
//       </ul>

//       <h2>7. Reporting & Enforcement</h2>
//       <p>
//         Use the in-app report button whenever you encounter a guideline
//         violation. Our moderation team reviews all reports. Enforcement actions
//         range from a warning to a permanent ban, depending on severity and
//         history. We aim to be consistent and fair.
//       </p>

//       <h2>8. Your Role in the Community</h2>
//       <p>
//         You are not just a user — you are a member. The quality of this
//         community depends on each person who joins it. If something feels wrong,
//         report it. If someone seems distressed, be kind. Together we can make
//         quikchat a place worth coming back to.
//       </p>

//       <p
//         style={{ marginTop: 24, color: "rgba(255,255,255,0.2)", fontSize: 12 }}
//       >
//         Last updated: January 2025
//       </p>
//     </>
//   );
// }

// export default JoinPage;

// import { useState } from "react";
// import { joinUser } from "../api/auth";
// import { Link } from "react-router-dom";
// import { COUNTRIES } from "../data/countries";
// import CountrySelect from "../components/CountrySelect";
// import GenderSelect from "../components/GenderSelect";
// import {
//   AlertCircle,
//   CheckCircle2,
//   Loader2,
//   X,
//   ScrollText,
//   ShieldCheck,
// } from "lucide-react";

// const BACKEND_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// // ─── Reusable field wrapper ───────────────────────────────────────────────────
// function Field({ label, children }) {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//       <label
//         style={{
//           fontSize: 11,
//           fontWeight: 600,
//           color: "rgba(255,255,255,0.35)",
//           letterSpacing: "0.08em",
//           textTransform: "uppercase",
//         }}
//       >
//         {label}
//       </label>
//       {children}
//     </div>
//   );
// }

// // ─── Shared input style ───────────────────────────────────────────────────────
// const inputStyle = {
//   width: "100%",
//   padding: "11px 14px",
//   borderRadius: 12,
//   border: "1px solid rgba(255,255,255,0.09)",
//   background: "rgba(255,255,255,0.04)",
//   color: "#f1f5f9",
//   fontSize: 14,
//   outline: "none",
//   boxSizing: "border-box",
//   fontFamily: "inherit",
//   transition: "border-color 0.15s ease, background 0.15s ease",
// };

// // ─── Main component ───────────────────────────────────────────────────────────
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
//   const [openModal, setOpenModal] = useState(null); // "terms" | "guidelines" | null
//   const [agreedTerms, setAgreedTerms] = useState(false);
//   const [agreedGuide, setAgreedGuide] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Both docs must be agreed to enable the checkbox and submit
//   const bothAgreed = agreedTerms && agreedGuide;
//   // Keep formData.acceptedTerms in sync
//   if (formData.acceptedTerms !== bothAgreed) {
//     setFormData((prev) => ({ ...prev, acceptedTerms: bothAgreed }));
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (Number(formData.age) < 16) {
//       setError("You must be at least 16 years old.");
//       return;
//     }
//     if (!formData.acceptedTerms) {
//       setError("You must agree to the Terms & Conditions.");
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

//   const handleGoogleSignIn = () => {
//     window.location.href = `${BACKEND_URL}/auth/google`;
//   };

//   // ── Legal modal renderer ───────────────────────────────────────────────────
//   // Reading is now confirmed by CLOSING the modal (X button, tapping outside,
//   // or the footer button) — not by scrolling to the bottom.
//   const LegalModal = ({ type }) => {
//     const isTerms = type === "terms";
//     const hasAgreed = isTerms ? agreedTerms : agreedGuide;
//     const setAgreed = isTerms ? setAgreedTerms : setAgreedGuide;

//     const closeAndAgree = () => {
//       setAgreed(true);
//       setOpenModal(null);
//     };

//     return (
//       <div
//         className="jp-overlay"
//         onClick={(e) => {
//           if (e.target === e.currentTarget) closeAndAgree();
//         }}
//       >
//         <div className="jp-modal" role="dialog" aria-modal="true">
//           {/* Header */}
//           <div className="jp-modal-header">
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               {isTerms ? (
//                 <ScrollText
//                   size={16}
//                   style={{ color: "#818cf8", flexShrink: 0 }}
//                 />
//               ) : (
//                 <ShieldCheck
//                   size={16}
//                   style={{ color: "#818cf8", flexShrink: 0 }}
//                 />
//               )}
//               <span
//                 style={{
//                   fontSize: 15,
//                   fontWeight: 700,
//                   color: "#f1f5f9",
//                   letterSpacing: "-0.01em",
//                 }}
//               >
//                 {isTerms ? "Terms & Conditions" : "Community Guidelines"}
//               </span>
//             </div>
//             <button
//               onClick={closeAndAgree}
//               style={{
//                 width: 32,
//                 height: 32,
//                 borderRadius: 8,
//                 border: "1px solid rgba(255,255,255,0.09)",
//                 background: "transparent",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//                 color: "rgba(255,255,255,0.4)",
//                 flexShrink: 0,
//               }}
//             >
//               <X size={14} />
//             </button>
//           </div>

//           {/* Scrollable body */}
//           <div className="jp-modal-body">
//             {isTerms ? <TermsContent /> : <GuidelinesContent />}
//           </div>

//           {/* Footer */}
//           <div className="jp-modal-footer">
//             <div className="jp-scroll-notice ready">
//               {hasAgreed ? (
//                 <>
//                   <CheckCircle2 size={13} /> You've already agreed to this
//                   document
//                 </>
//               ) : (
//                 <>
//                   <ScrollText size={13} /> Close this window once you've read it
//                   to confirm your agreement
//                 </>
//               )}
//             </div>
//             <button className="jp-agree-btn" onClick={closeAndAgree}>
//               {hasAgreed ? "✓ Close" : "Close & Agree"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

//         .jp-wrap {
//           min-height: 100%;
//           display: flex;
//           align-items: flex-start;
//           justify-content: center;
//           padding: clamp(24px, 5vw, 56px) clamp(16px, 4vw, 24px);
//           box-sizing: border-box;
//           font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
//           position: relative;
//         }

//         /* Background glow */
//         .jp-glow {
//           position: fixed;
//           top: 10%;
//           left: 50%;
//           transform: translateX(-50%);
//           width: min(600px, 90vw);
//           height: min(600px, 90vw);
//           background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
//           pointer-events: none;
//           z-index: 0;
//           border-radius: 50%;
//           filter: blur(40px);
//         }

//         /* Card */
//         .jp-card {
//           position: relative;
//           z-index: 1;
//           width: 100%;
//           max-width: 560px;
//           background: rgba(10, 8, 28, 0.92);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 20px;
//           overflow: hidden;
//           box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04) inset;
//         }

//         /* Card header */
//         .jp-header {
//           padding: clamp(24px, 4vw, 36px) clamp(20px, 4vw, 32px) clamp(20px, 3vw, 28px);
//           text-align: center;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//         }

//         /* Brand lockup — matches header + login page logo treatment */
//         .jp-brand {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 9px;
//           margin-bottom: 14px;
//         }
//         .jp-brand-mark {
//           width: 36px;
//           height: 36px;
//           flex-shrink: 0;
//           object-fit: contain;
//         }
//         .jp-brand-text {
//           font-weight: 800;
//           font-size: 20px;
//           letter-spacing: -0.03em;
//           background: linear-gradient(120deg,#38bdf8 0%,#818cf8 45%,#c084fc 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           filter: drop-shadow(0 0 14px rgba(99,102,241,0.35));
//         }

//         /* Form body */
//         .jp-body {
//           padding: clamp(20px, 4vw, 32px) clamp(20px, 4vw, 32px) clamp(24px, 4vw, 36px);
//           display: flex;
//           flex-direction: column;
//           gap: clamp(14px, 2.5vw, 20px);
//         }

//         /* Two-col grid — stacks on small phones */
//         .jp-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: clamp(12px, 2vw, 16px);
//         }
//         @media (min-width: 460px) {
//           .jp-grid { grid-template-columns: 1fr 1fr; }
//         }

//         /* Input focus states */
//         .jp-input:focus {
//           border-color: rgba(139,92,246,0.5) !important;
//           background: rgba(99,102,241,0.06) !important;
//         }
//         .jp-input::placeholder { color: rgba(255,255,255,0.2); }
//         /* Remove number input arrows */
//         .jp-input[type=number]::-webkit-inner-spin-button,
//         .jp-input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
//         .jp-input[type=number] { -moz-appearance: textfield; }

//         /* Google button */
//         .jp-google-btn {
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
//           transition: all 0.15s ease;
//           font-family: inherit;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .jp-google-btn:hover {
//           background: rgba(255,255,255,0.07);
//           border-color: rgba(255,255,255,0.18);
//           color: #fff;
//         }
//         .jp-google-btn:active { transform: scale(0.98); }

//         /* Submit button — matches header/hero primary buttons */
//         .jp-submit {
//           width: 100%;
//           height: 48px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           border-radius: 13px;
//           border: none;
//           background: linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#8b5cf6,#6366f1);
//           background-size: 300% auto;
//           background-position: 0% center;
//           color: #fff;
//           font-size: 14px;
//           font-weight: 700;
//           cursor: pointer;
//           transition: box-shadow 0.18s ease, transform 0.18s ease, background-position 0.4s ease;
//           font-family: inherit;
//           letter-spacing: -0.01em;
//           box-shadow: 0 0 18px rgba(99,102,241,0.35), 0 0 32px rgba(236,72,153,0.15);
//           -webkit-tap-highlight-color: transparent;
//         }
//         .jp-submit:hover:not(:disabled) {
//           background-position: 100% center;
//           box-shadow: 0 0 26px rgba(99,102,241,0.55), 0 0 46px rgba(236,72,153,0.28);
//           transform: translateY(-1px);
//         }
//         .jp-submit:active:not(:disabled) { transform: scale(0.98); }
//         .jp-submit:disabled { opacity: 0.4; cursor: not-allowed; }

//         /* Custom checkbox */
//         .jp-checkbox-box {
//           width: 17px;
//           height: 17px;
//           border-radius: 5px;
//           border: 1px solid rgba(255,255,255,0.18);
//           background: rgba(255,255,255,0.04);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//           transition: all 0.15s ease;
//           margin-top: 1px;
//         }
//         .jp-checkbox-box.checked {
//           background: #6366f1;
//           border-color: #6366f1;
//           box-shadow: 0 0 10px rgba(99,102,241,0.4);
//         }

//         /* Divider */
//         .jp-divider {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }
//         .jp-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
//         .jp-divider-text { font-size: 11px; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; text-transform: uppercase; }

//         /* ── Legal Modal ─────────────────────────────────────── */
//         .jp-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.75);
//           backdrop-filter: blur(6px);
//           -webkit-backdrop-filter: blur(6px);
//           z-index: 9999;
//           display: flex;
//           align-items: flex-end;
//           justify-content: center;
//           padding: 0;
//           animation: jp-overlay-in 0.2s ease;
//         }
//         @keyframes jp-overlay-in {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//         @media (min-width: 540px) {
//           .jp-overlay { align-items: center; padding: 24px 16px; }
//         }

//         .jp-modal {
//           width: 100%;
//           max-width: 560px;
//           max-height: 92dvh;
//           display: flex;
//           flex-direction: column;
//           background: #0d0b20;
//           border: 1px solid rgba(255,255,255,0.1);
//           border-radius: 20px 20px 0 0;
//           overflow: hidden;
//           box-shadow: 0 -8px 60px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(255,255,255,0.05) inset;
//           animation: jp-modal-in 0.28s cubic-bezier(0.32,0.72,0,1);
//         }
//         @media (min-width: 540px) {
//           .jp-modal {
//             border-radius: 20px;
//             max-height: 88dvh;
//             animation: jp-modal-center-in 0.25s ease;
//           }
//         }
//         @keyframes jp-modal-in {
//           from { transform: translateY(100%); }
//           to   { transform: translateY(0); }
//         }
//         @keyframes jp-modal-center-in {
//           from { opacity: 0; transform: scale(0.95) translateY(12px); }
//           to   { opacity: 1; transform: scale(1)    translateY(0); }
//         }

//         .jp-modal-header {
//           flex-shrink: 0;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 18px 20px 16px;
//           border-bottom: 1px solid rgba(255,255,255,0.07);
//           background: #0d0b20;
//         }

//         .jp-modal-body {
//           flex: 1;
//           overflow-y: auto;
//           -webkit-overflow-scrolling: touch;
//           overscroll-behavior: contain;
//           padding: 24px 20px;
//           font-size: 13.5px;
//           line-height: 1.75;
//           color: rgba(255,255,255,0.55);
//         }
//         .jp-modal-body::-webkit-scrollbar { width: 4px; }
//         .jp-modal-body::-webkit-scrollbar-track { background: transparent; }
//         .jp-modal-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }

//         .jp-modal-body h2 {
//           font-size: 11px;
//           font-weight: 700;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.25);
//           margin: 28px 0 10px;
//         }
//         .jp-modal-body h2:first-child { margin-top: 0; }
//         .jp-modal-body p { margin: 0 0 12px; }
//         .jp-modal-body ul { margin: 0 0 12px; padding-left: 18px; }
//         .jp-modal-body li { margin-bottom: 6px; }
//         .jp-modal-body strong { color: rgba(255,255,255,0.75); font-weight: 600; }

//         .jp-modal-footer {
//           flex-shrink: 0;
//           padding: 14px 20px;
//           border-top: 1px solid rgba(255,255,255,0.07);
//           background: #0d0b20;
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }
//         .jp-scroll-notice {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 12px;
//           color: rgba(255,255,255,0.3);
//           padding: 8px 12px;
//           border-radius: 10px;
//           background: rgba(255,255,255,0.03);
//           border: 1px solid rgba(255,255,255,0.06);
//           transition: all 0.2s ease;
//         }
//         .jp-scroll-notice.ready {
//           color: rgba(134,239,172,0.9);
//           background: rgba(34,197,94,0.07);
//           border-color: rgba(34,197,94,0.2);
//         }
//         .jp-agree-btn {
//           width: 100%;
//           height: 46px;
//           border-radius: 12px;
//           border: none;
//           background: linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#8b5cf6,#6366f1);
//           background-size: 300% auto;
//           background-position: 0% center;
//           color: #fff;
//           font-size: 14px;
//           font-weight: 700;
//           cursor: pointer;
//           transition: box-shadow 0.18s ease, transform 0.18s ease, background-position 0.4s ease;
//           font-family: inherit;
//           box-shadow: 0 0 18px rgba(99,102,241,0.35), 0 0 32px rgba(236,72,153,0.15);
//           -webkit-tap-highlight-color: transparent;
//         }
//         .jp-agree-btn:hover:not(:disabled) {
//           background-position: 100% center;
//           box-shadow: 0 0 26px rgba(99,102,241,0.55), 0 0 46px rgba(236,72,153,0.28);
//           transform: translateY(-1px);
//         }
//         .jp-agree-btn:disabled {
//           opacity: 0.35;
//           cursor: not-allowed;
//           transform: none;
//           box-shadow: none;
//         }
//         .jp-agree-btn:active:not(:disabled) { transform: scale(0.98); }

//         /* Alert banners */
//         .jp-alert {
//           display: flex;
//           align-items: flex-start;
//           gap: 10px;
//           padding: 12px 14px;
//           border-radius: 12px;
//           font-size: 13px;
//           font-weight: 500;
//           line-height: 1.5;
//         }
//         .jp-alert-error   { background: rgba(239,68,68,0.08);  border: 1px solid rgba(239,68,68,0.2);  color: #fca5a5; }
//         .jp-alert-success { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2); color: #86efac; }
//       `}</style>

//       <div className="jp-wrap">
//         {/* Ambient glow */}
//         <div className="jp-glow" />

//         <div className="jp-card">
//           {/* ── Card header ── */}
//           <div className="jp-header">
//             <div className="jp-brand">
//               <img src="/quikchat-logo-2.png" alt="" className="jp-brand-mark" />
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
//               Join quikchat
//             </h1>
//             <p
//               style={{
//                 margin: "6px 0 0",
//                 fontSize: 13,
//                 color: "rgba(255,255,255,0.35)",
//                 fontWeight: 500,
//               }}
//             >
//               Create your account to start connecting
//             </p>
//           </div>

//           {/* ── Form body ── */}
//           <form onSubmit={handleSubmit} className="jp-body">
//             {/* Success banner */}
//             {success && (
//               <div className="jp-alert jp-alert-success">
//                 <CheckCircle2
//                   size={15}
//                   style={{ flexShrink: 0, marginTop: 1 }}
//                 />
//                 Account created! You can now{" "}
//                 <Link
//                   to="/login"
//                   style={{ color: "#4ade80", textDecoration: "underline" }}
//                 >
//                   log in
//                 </Link>{" "}
//                 🎉
//               </div>
//             )}

//             {/* Google OAuth */}
//             <button
//               type="button"
//               onClick={handleGoogleSignIn}
//               className="jp-google-btn"
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
//             <div className="jp-divider">
//               <div className="jp-divider-line" />
//               <span className="jp-divider-text">or</span>
//               <div className="jp-divider-line" />
//             </div>

//             {/* Row 1 — username + email */}
//             <div className="jp-grid">
//               <Field label="Username">
//                 <input
//                   className="jp-input"
//                   style={inputStyle}
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                   placeholder="cool_stranger"
//                   autoComplete="username"
//                 />
//               </Field>
//               <Field label="Email">
//                 <input
//                   className="jp-input"
//                   style={inputStyle}
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   placeholder="you@example.com"
//                   autoComplete="email"
//                 />
//               </Field>
//             </div>

//             {/* Row 2 — password + age */}
//             <div className="jp-grid">
//               <Field label="Password">
//                 <input
//                   className="jp-input"
//                   style={inputStyle}
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   placeholder="••••••••"
//                   autoComplete="new-password"
//                 />
//               </Field>
//               <Field label="Age">
//                 <input
//                   className="jp-input"
//                   style={inputStyle}
//                   type="number"
//                   name="age"
//                   min="16"
//                   value={formData.age}
//                   onChange={handleChange}
//                   required
//                   placeholder="16+ only"
//                 />
//               </Field>
//             </div>

//             {/* Row 3 — country + gender */}
//             <div className="jp-grid">
//               <Field label="Country">
//                 <CountrySelect
//                   value={formData.country}
//                   countries={COUNTRIES}
//                   onChange={(code) =>
//                     setFormData((prev) => ({ ...prev, country: code }))
//                   }
//                 />
//               </Field>
//               <Field label="Gender">
//                 <GenderSelect
//                   value={formData.gender}
//                   onChange={(val) =>
//                     setFormData((prev) => ({ ...prev, gender: val }))
//                   }
//                 />
//               </Field>
//             </div>

//             {/* Terms & Guidelines — must read + agree each before joining */}
//             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//               {/* Read indicator row */}
//               {[
//                 {
//                   key: "terms",
//                   label: "Terms & Conditions",
//                   agreed: agreedTerms,
//                   icon: <ScrollText size={13} />,
//                 },
//                 {
//                   key: "guidelines",
//                   label: "Community Guidelines",
//                   agreed: agreedGuide,
//                   icon: <ShieldCheck size={13} />,
//                 },
//               ].map(({ key, label, agreed, icon }) => (
//                 <div
//                   key={key}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     padding: "10px 14px",
//                     borderRadius: 12,
//                     background: agreed
//                       ? "rgba(34,197,94,0.07)"
//                       : "rgba(255,255,255,0.03)",
//                     border: agreed
//                       ? "1px solid rgba(34,197,94,0.2)"
//                       : "1px solid rgba(255,255,255,0.07)",
//                     transition: "all 0.2s ease",
//                   }}
//                 >
//                   <div
//                     style={{ display: "flex", alignItems: "center", gap: 9 }}
//                   >
//                     <span
//                       style={{
//                         color: agreed ? "#4ade80" : "rgba(255,255,255,0.3)",
//                       }}
//                     >
//                       {icon}
//                     </span>
//                     <span
//                       style={{
//                         fontSize: 13,
//                         fontWeight: 500,
//                         color: agreed ? "#86efac" : "rgba(255,255,255,0.5)",
//                       }}
//                     >
//                       {label}
//                     </span>
//                   </div>
//                   <div
//                     style={{ display: "flex", alignItems: "center", gap: 8 }}
//                   >
//                     {agreed && (
//                       <span
//                         style={{
//                           fontSize: 11,
//                           color: "#4ade80",
//                           fontWeight: 600,
//                         }}
//                       >
//                         ✓ Agreed
//                       </span>
//                     )}
//                     <button
//                       type="button"
//                       onClick={() => setOpenModal(key)}
//                       style={{
//                         padding: "5px 12px",
//                         borderRadius: 8,
//                         border: "1px solid rgba(139,92,246,0.3)",
//                         background: agreed
//                           ? "rgba(34,197,94,0.08)"
//                           : "rgba(99,102,241,0.1)",
//                         color: agreed ? "#4ade80" : "#a5b4fc",
//                         fontSize: 12,
//                         fontWeight: 600,
//                         cursor: "pointer",
//                         fontFamily: "inherit",
//                         transition: "all 0.15s ease",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       {agreed ? "Re-read" : "Read & Agree"}
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {/* Checkbox — only enabled when both agreed */}
//               <label
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   gap: 10,
//                   cursor: bothAgreed ? "pointer" : "not-allowed",
//                   marginTop: 2,
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   name="acceptedTerms"
//                   checked={formData.acceptedTerms}
//                   onChange={() => {}}
//                   style={{
//                     position: "absolute",
//                     opacity: 0,
//                     width: 0,
//                     height: 0,
//                   }}
//                 />
//                 <div
//                   className={"jp-checkbox-box" + (bothAgreed ? " checked" : "")}
//                   style={{ opacity: bothAgreed ? 1 : 0.35 }}
//                 >
//                   {bothAgreed && (
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
//                 <span
//                   style={{
//                     fontSize: 13,
//                     color: bothAgreed
//                       ? "rgba(255,255,255,0.6)"
//                       : "rgba(255,255,255,0.25)",
//                     lineHeight: 1.6,
//                     userSelect: "none",
//                     transition: "color 0.2s ease",
//                   }}
//                 >
//                   {bothAgreed
//                     ? "I confirm I am at least 16 and have read and agreed to both documents above."
//                     : "Read and agree to both documents above to continue."}
//                 </span>
//               </label>
//             </div>

//             {/* Error banner */}
//             {error && (
//               <div className="jp-alert jp-alert-error">
//                 <AlertCircle
//                   size={15}
//                   style={{ flexShrink: 0, marginTop: 1 }}
//                 />
//                 {error}
//               </div>
//             )}

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={!formData.acceptedTerms || loading || success}
//               className="jp-submit"
//             >
//               {loading ? (
//                 <>
//                   <Loader2
//                     size={15}
//                     style={{ animation: "spin 1s linear infinite" }}
//                   />
//                   Creating account…
//                 </>
//               ) : (
//                 "Create Account 🚀"
//               )}
//             </button>

//             {/* Login link */}
//             <p
//               style={{
//                 textAlign: "center",
//                 fontSize: 13,
//                 color: "rgba(255,255,255,0.3)",
//                 margin: 0,
//               }}
//             >
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 style={{
//                   color: "#818cf8",
//                   fontWeight: 600,
//                   textDecoration: "none",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "#818cf8")}
//               >
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>

//       {/* Spinner keyframe */}
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

//       {/* Legal modals — portal-like, rendered at top level */}
//       {openModal && <LegalModal type={openModal} />}
//     </>
//   );
// };

// // ─── Terms of Service content ─────────────────────────────────────────────────
// function TermsContent() {
//   return (
//     <>
//       <h2>1. Acceptance of Terms</h2>
//       <p>
//         By creating an account on <strong>quikchat</strong>, you confirm that
//         you have read, understood, and agree to be bound by these Terms &
//         Conditions. If you do not agree, you must not use this service. We may
//         update these terms at any time; continued use after changes constitutes
//         acceptance.
//       </p>

//       <h2>2. Eligibility</h2>
//       <p>
//         You must be at least <strong>16 years of age</strong> to register and
//         use quikchat. By registering, you represent and warrant that you meet
//         this age requirement. We reserve the right to terminate accounts of
//         users found to be under this age.
//       </p>

//       <h2>3. Account Responsibilities</h2>
//       <ul>
//         <li>
//           You are responsible for maintaining the confidentiality of your login
//           credentials.
//         </li>
//         <li>
//           You must provide accurate, current, and complete information during
//           registration.
//         </li>
//         <li>
//           You are solely responsible for all activity that occurs under your
//           account.
//         </li>
//         <li>
//           You must notify us immediately of any unauthorised use of your
//           account.
//         </li>
//         <li>
//           One account per person — creating multiple accounts is not permitted.
//         </li>
//       </ul>

//       <h2>4. Acceptable Use</h2>
//       <p>You agree not to use quikchat to:</p>
//       <ul>
//         <li>Harass, bully, threaten, or intimidate other users.</li>
//         <li>
//           Share, solicit, or transmit sexual content involving minors in any
//           form.
//         </li>
//         <li>
//           Impersonate any person or entity, or falsely represent your
//           affiliation.
//         </li>
//         <li>Transmit spam, unsolicited messages, or phishing content.</li>
//         <li>Distribute malware, viruses, or any harmful code.</li>
//         <li>
//           Circumvent, disable, or interfere with security-related features.
//         </li>
//         <li>
//           Collect or harvest personal data of other users without consent.
//         </li>
//         <li>Engage in any activity that is illegal under applicable law.</li>
//       </ul>

//       <h2>5. Video Chat Rules</h2>
//       <ul>
//         <li>
//           Nudity, sexual conduct, or explicit content during video sessions is
//           strictly prohibited.
//         </li>
//         <li>
//           Recording video sessions without the explicit consent of all
//           participants is forbidden.
//         </li>
//         <li>
//           You must not use quikchat video chats for commercial solicitation.
//         </li>
//       </ul>

//       <h2>6. Content & Intellectual Property</h2>
//       <p>
//         You retain ownership of content you post but grant quikchat a
//         non-exclusive, worldwide, royalty-free licence to use, display, and
//         distribute that content in connection with the service. You warrant that
//         any content you submit does not infringe the rights of any third party.
//       </p>

//       <h2>7. Privacy</h2>
//       <p>
//         Your use of quikchat is also governed by our Privacy Policy. By
//         accepting these terms you also accept our Privacy Policy. We collect
//         only the data necessary to provide the service and do not sell your
//         personal information to third parties.
//       </p>

//       <h2>8. Termination</h2>
//       <p>
//         We reserve the right to suspend or permanently terminate your account,
//         at our sole discretion, for violation of these Terms, Community
//         Guidelines, or any applicable law — without prior notice or liability.
//       </p>

//       <h2>9. Disclaimers & Limitation of Liability</h2>
//       <p>
//         quikchat is provided <strong>"as is"</strong> without warranties of any
//         kind. To the maximum extent permitted by law, quikchat shall not be
//         liable for any indirect, incidental, special, or consequential damages
//         arising from your use of the service, including interactions with other
//         users.
//       </p>

//       <h2>10. Governing Law</h2>
//       <p>
//         These Terms are governed by and construed in accordance with applicable
//         law. Any disputes arising from these Terms will be subject to the
//         exclusive jurisdiction of the competent courts in the applicable
//         territory.
//       </p>

//       <h2>11. Contact</h2>
//       <p>
//         For questions about these Terms, contact us at{" "}
//         <strong>legal@quikchatapp.com</strong>.
//       </p>
//       <p
//         style={{ marginTop: 24, color: "rgba(255,255,255,0.2)", fontSize: 12 }}
//       >
//         Last updated: January 2025
//       </p>
//     </>
//   );
// }

// // ─── Community Guidelines content ────────────────────────────────────────────
// function GuidelinesContent() {
//   return (
//     <>
//       <h2>Our Community Promise</h2>
//       <p>
//         quikchat exists to help people make real connections across the world.
//         Every interaction shapes what this community feels like. These
//         guidelines exist to protect everyone and ensure quikchat stays a place
//         people genuinely want to be.
//       </p>

//       <h2>1. Treat Everyone With Respect</h2>
//       <ul>
//         <li>Speak to others the way you would want to be spoken to.</li>
//         <li>
//           Disagreements are fine — personal attacks and hate speech are not.
//         </li>
//         <li>
//           Do not discriminate based on race, ethnicity, religion, gender, sexual
//           orientation, disability, nationality, or age.
//         </li>
//         <li>
//           Mocking or belittling someone for their appearance, accent, or
//           background is not allowed.
//         </li>
//       </ul>

//       <h2>2. Zero Tolerance Behaviours</h2>
//       <p>
//         The following will result in an immediate permanent ban with no appeal:
//       </p>
//       <ul>
//         <li>
//           <strong>Child sexual abuse material (CSAM)</strong> — any depiction,
//           solicitation, or grooming of minors.
//         </li>
//         <li>
//           <strong>Threats of violence</strong> — credible threats directed at
//           any individual or group.
//         </li>
//         <li>
//           <strong>Doxxing</strong> — sharing someone's private personal
//           information without consent.
//         </li>
//         <li>
//           <strong>Non-consensual intimate imagery</strong> — sharing or
//           threatening to share intimate images without consent.
//         </li>
//       </ul>

//       <h2>3. No Harassment or Stalking</h2>
//       <ul>
//         <li>
//           Do not repeatedly contact someone who has blocked you or asked you to
//           stop.
//         </li>
//         <li>
//           Do not follow, track, or attempt to identify a user's real-world
//           location without consent.
//         </li>
//         <li>
//           Coordinated campaigns to harass a specific person are prohibited.
//         </li>
//       </ul>

//       <h2>4. Keep It Safe for Everyone</h2>
//       <ul>
//         <li>
//           Do not share or encourage self-harm, suicide methods, or dangerous
//           behaviour.
//         </li>
//         <li>
//           Do not promote or sell illegal substances, weapons, or counterfeit
//           goods.
//         </li>
//         <li>
//           Do not spread deliberate misinformation about health emergencies or
//           public safety.
//         </li>
//       </ul>

//       <h2>5. Authentic Identity</h2>
//       <ul>
//         <li>
//           Do not impersonate real people, celebrities, or other quikchat users.
//         </li>
//         <li>
//           Do not misrepresent your age, especially to interact with minors.
//         </li>
//         <li>Fake or bot accounts are not permitted.</li>
//       </ul>

//       <h2>6. Spam & Commercial Activity</h2>
//       <ul>
//         <li>
//           Do not send unsolicited promotional messages or repeat identical
//           messages.
//         </li>
//         <li>
//           Do not use quikchat to run scams, phishing attacks, or pyramid
//           schemes.
//         </li>
//         <li>
//           Commercial advertising without explicit permission from quikchat is
//           not allowed.
//         </li>
//       </ul>

//       <h2>7. Reporting & Enforcement</h2>
//       <p>
//         Use the in-app report button whenever you encounter a guideline
//         violation. Our moderation team reviews all reports. Enforcement actions
//         range from a warning to a permanent ban, depending on severity and
//         history. We aim to be consistent and fair.
//       </p>

//       <h2>8. Your Role in the Community</h2>
//       <p>
//         You are not just a user — you are a member. The quality of this
//         community depends on each person who joins it. If something feels wrong,
//         report it. If someone seems distressed, be kind. Together we can make
//         quikchat a place worth coming back to.
//       </p>

//       <p
//         style={{ marginTop: 24, color: "rgba(255,255,255,0.2)", fontSize: 12 }}
//       >
//         Last updated: January 2025
//       </p>
//     </>
//   );
// }

// export default JoinPage;

import { useState } from "react";
import { joinUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { COUNTRIES } from "../data/countries";
import CountrySelect from "../components/CountrySelect";
import GenderSelect from "../components/GenderSelect";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  X,
  ScrollText,
  ShieldCheck,
  Home,
} from "lucide-react";

const BACKEND_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// ─── Reusable field wrapper ───────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Post-signup success panel — replaces the form once joined ────────────────
function SuccessPanel({ onLogin, onHome }) {
  return (
    <div className="jp-body jp-success">
      <div className="jp-success-icon">
        <CheckCircle2 size={30} />
      </div>
      <h2 className="jp-success-title">You're in! 🎉</h2>
      <p className="jp-success-text">
        Your account has been created. Log in to start connecting with new
        people.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 6,
        }}
      >
        <button type="button"  className="jp-submit p-6 " onClick={onLogin}>
          Login
        </button>
        {/* <div style={{ display: "flex", gap: 10 }}>
         
          <button
            type="button"
            className="jp-google-btn"
            style={{ flex: 1 }}
            onClick={onHome}
          >
            <Home size={15} />
            Home
          </button>
        </div> */}
      </div>
    </div>
  );
}

// ─── Shared input style ───────────────────────────────────────────────────────
const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  color: "#f1f5f9",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.15s ease, background 0.15s ease",
};

// ─── Main component ───────────────────────────────────────────────────────────
const JoinPage = () => {
  const navigate = useNavigate();
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
  const [openModal, setOpenModal] = useState(null); // "terms" | "guidelines" | null
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedGuide, setAgreedGuide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Both docs must be agreed to enable the checkbox and submit
  const bothAgreed = agreedTerms && agreedGuide;
  // Keep formData.acceptedTerms in sync
  if (formData.acceptedTerms !== bothAgreed) {
    setFormData((prev) => ({ ...prev, acceptedTerms: bothAgreed }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(formData.age) < 16) {
      setError("You must be at least 16 years old.");
      return;
    }
    if (!formData.acceptedTerms) {
      setError("You must agree to the Terms & Conditions.");
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
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  // ── Legal modal renderer ───────────────────────────────────────────────────
  // Reading is now confirmed by CLOSING the modal (X button, tapping outside,
  // or the footer button) — not by scrolling to the bottom.
  const LegalModal = ({ type }) => {
    const isTerms = type === "terms";
    const hasAgreed = isTerms ? agreedTerms : agreedGuide;
    const setAgreed = isTerms ? setAgreedTerms : setAgreedGuide;

    const closeAndAgree = () => {
      setAgreed(true);
      setOpenModal(null);
    };

    return (
      <div
        className="jp-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeAndAgree();
        }}
      >
        <div className="jp-modal" role="dialog" aria-modal="true">
          {/* Header */}
          <div className="jp-modal-header">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {isTerms ? (
                <ScrollText
                  size={16}
                  style={{ color: "#818cf8", flexShrink: 0 }}
                />
              ) : (
                <ShieldCheck
                  size={16}
                  style={{ color: "#818cf8", flexShrink: 0 }}
                />
              )}
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#f1f5f9",
                  letterSpacing: "-0.01em",
                }}
              >
                {isTerms ? "Terms & Conditions" : "Community Guidelines"}
              </span>
            </div>
            <button
              onClick={closeAndAgree}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.09)",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(255,255,255,0.4)",
                flexShrink: 0,
              }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="jp-modal-body">
            {isTerms ? <TermsContent /> : <GuidelinesContent />}
          </div>

          {/* Footer */}
          <div className="jp-modal-footer">
            <div className="jp-scroll-notice ready">
              {hasAgreed ? (
                <>
                  <CheckCircle2 size={13} /> You've already agreed to this
                  document
                </>
              ) : (
                <>
                  <ScrollText size={13} /> Close this window once you've read it
                  to confirm your agreement
                </>
              )}
            </div>
            <button className="jp-agree-btn" onClick={closeAndAgree}>
              {hasAgreed ? "✓ Close" : "Close & Agree"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .jp-wrap {
          min-height: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(24px, 5vw, 56px) clamp(16px, 4vw, 24px);
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          position: relative;
        }

        /* Background glow */
        .jp-glow {
          position: fixed;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: min(600px, 90vw);
          height: min(600px, 90vw);
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          border-radius: 50%;
          filter: blur(40px);
        }

        /* Card */
        .jp-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 560px;
          background: rgba(10, 8, 28, 0.92);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04) inset;
        }

        /* Card header */
        .jp-header {
          padding: clamp(24px, 4vw, 36px) clamp(20px, 4vw, 32px) clamp(20px, 3vw, 28px);
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        /* Brand lockup — matches header + login page logo treatment */
        .jp-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-bottom: 14px;
        }
        .jp-brand-mark {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          object-fit: contain;
        }
        .jp-brand-text {
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -0.03em;
          background: linear-gradient(120deg,#38bdf8 0%,#818cf8 45%,#c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 14px rgba(99,102,241,0.35));
        }

        /* Form body */
        .jp-body {
          padding: clamp(20px, 4vw, 32px) clamp(20px, 4vw, 32px) clamp(24px, 4vw, 36px);
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.5vw, 20px);
        }

        /* Success panel — shown in place of the form after joining */
        .jp-success {
          align-items: center;
          text-align: center;
          padding-top: clamp(28px, 5vw, 40px);
          padding-bottom: clamp(28px, 5vw, 40px);
        }
        .jp-success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          color: #4ade80;
        }
        .jp-success-title {
          margin: 4px 0 0;
          font-size: clamp(18px, 4vw, 21px);
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.02em;
        }
        .jp-success-text {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(255,255,255,0.4);
          max-width: 360px;
        }

        /* Two-col grid — stacks on small phones */
        .jp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(12px, 2vw, 16px);
        }
        @media (min-width: 460px) {
          .jp-grid { grid-template-columns: 1fr 1fr; }
        }

        /* Input focus states */
        .jp-input:focus {
          border-color: rgba(139,92,246,0.5) !important;
          background: rgba(99,102,241,0.06) !important;
        }
        .jp-input::placeholder { color: rgba(255,255,255,0.2); }
        /* Remove number input arrows */
        .jp-input[type=number]::-webkit-inner-spin-button,
        .jp-input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        .jp-input[type=number] { -moz-appearance: textfield; }

        /* Google button */
        .jp-google-btn {
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
          transition: all 0.15s ease;
          font-family: inherit;
          -webkit-tap-highlight-color: transparent;
        }
        .jp-google-btn:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.18);
          color: #fff;
        }
        .jp-google-btn:active { transform: scale(0.98); }

        /* Submit button — matches header/hero primary buttons */
        .jp-submit {
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
        .jp-submit:hover:not(:disabled) {
          background-position: 100% center;
          box-shadow: 0 0 26px rgba(99,102,241,0.55), 0 0 46px rgba(236,72,153,0.28);
          transform: translateY(-1px);
        }
        .jp-submit:active:not(:disabled) { transform: scale(0.98); }
        .jp-submit:disabled { opacity: 0.4; cursor: not-allowed; }

        /* Custom checkbox */
        .jp-checkbox-box {
          width: 17px;
          height: 17px;
          border-radius: 5px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s ease;
          margin-top: 1px;
        }
        .jp-checkbox-box.checked {
          background: #6366f1;
          border-color: #6366f1;
          box-shadow: 0 0 10px rgba(99,102,241,0.4);
        }

        /* Divider */
        .jp-divider {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .jp-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .jp-divider-text { font-size: 11px; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; text-transform: uppercase; }


        /* ── Legal Modal ─────────────────────────────────────── */
        .jp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0;
          animation: jp-overlay-in 0.2s ease;
        }
        @keyframes jp-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (min-width: 540px) {
          .jp-overlay { align-items: center; padding: 24px 16px; }
        }

        .jp-modal {
          width: 100%;
          max-width: 560px;
          max-height: 92dvh;
          display: flex;
          flex-direction: column;
          background: #0d0b20;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px 20px 0 0;
          overflow: hidden;
          box-shadow: 0 -8px 60px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(255,255,255,0.05) inset;
          animation: jp-modal-in 0.28s cubic-bezier(0.32,0.72,0,1);
        }
        @media (min-width: 540px) {
          .jp-modal {
            border-radius: 20px;
            max-height: 88dvh;
            animation: jp-modal-center-in 0.25s ease;
          }
        }
        @keyframes jp-modal-in {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes jp-modal-center-in {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }

        .jp-modal-header {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: #0d0b20;
        }

        .jp-modal-body {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          padding: 24px 20px;
          font-size: 13.5px;
          line-height: 1.75;
          color: rgba(255,255,255,0.55);
        }
        .jp-modal-body::-webkit-scrollbar { width: 4px; }
        .jp-modal-body::-webkit-scrollbar-track { background: transparent; }
        .jp-modal-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }

        .jp-modal-body h2 {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin: 28px 0 10px;
        }
        .jp-modal-body h2:first-child { margin-top: 0; }
        .jp-modal-body p { margin: 0 0 12px; }
        .jp-modal-body ul { margin: 0 0 12px; padding-left: 18px; }
        .jp-modal-body li { margin-bottom: 6px; }
        .jp-modal-body strong { color: rgba(255,255,255,0.75); font-weight: 600; }

        .jp-modal-footer {
          flex-shrink: 0;
          padding: 14px 20px;
          border-top: 1px solid rgba(255,255,255,0.07);
          background: #0d0b20;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .jp-scroll-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.2s ease;
        }
        .jp-scroll-notice.ready {
          color: rgba(134,239,172,0.9);
          background: rgba(34,197,94,0.07);
          border-color: rgba(34,197,94,0.2);
        }
        .jp-agree-btn {
          width: 100%;
          height: 46px;
          border-radius: 12px;
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
          box-shadow: 0 0 18px rgba(99,102,241,0.35), 0 0 32px rgba(236,72,153,0.15);
          -webkit-tap-highlight-color: transparent;
        }
        .jp-agree-btn:hover:not(:disabled) {
          background-position: 100% center;
          box-shadow: 0 0 26px rgba(99,102,241,0.55), 0 0 46px rgba(236,72,153,0.28);
          transform: translateY(-1px);
        }
        .jp-agree-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .jp-agree-btn:active:not(:disabled) { transform: scale(0.98); }

        /* Alert banners */
        .jp-alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.5;
        }
        .jp-alert-error   { background: rgba(239,68,68,0.08);  border: 1px solid rgba(239,68,68,0.2);  color: #fca5a5; }
        .jp-alert-success { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2); color: #86efac; }
      `}</style>

      <div className="jp-wrap">
        {/* Ambient glow */}
        <div className="jp-glow" />

        <div className="jp-card">
          {/* ── Card header ── */}
          <div className="jp-header">
            <div className="jp-brand">
              <img
                src="/quikchat-logo-2.png"
                alt=""
                className="jp-brand-mark"
              />
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
              Join quikchat
            </h1>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                fontWeight: 500,
              }}
            >
              Create your account to start connecting
            </p>
          </div>

          {/* ── Form body, or success panel once joined ── */}
          {success ? (
            <SuccessPanel
              onLogin={() => navigate("/login")}
              onHome={() => navigate("/")}
            />
          ) : (
            <form onSubmit={handleSubmit} className="jp-body">
              {/* Google OAuth */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="jp-google-btn"
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
              <div className="jp-divider">
                <div className="jp-divider-line" />
                <span className="jp-divider-text">or</span>
                <div className="jp-divider-line" />
              </div>

              {/* Row 1 — username + email */}
              <div className="jp-grid">
                <Field label="Username">
                  <input
                    className="jp-input"
                    style={inputStyle}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="cool_stranger"
                    autoComplete="username"
                  />
                </Field>
                <Field label="Email">
                  <input
                    className="jp-input"
                    style={inputStyle}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </Field>
              </div>

              {/* Row 2 — password + age */}
              <div className="jp-grid">
                <Field label="Password">
                  <input
                    className="jp-input"
                    style={inputStyle}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                </Field>
                <Field label="Age">
                  <input
                    className="jp-input"
                    style={inputStyle}
                    type="number"
                    name="age"
                    min="16"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    placeholder="16+ only"
                  />
                </Field>
              </div>

              {/* Row 3 — country + gender */}
              <div className="jp-grid">
                <Field label="Country">
                  <CountrySelect
                    value={formData.country}
                    countries={COUNTRIES}
                    onChange={(code) =>
                      setFormData((prev) => ({ ...prev, country: code }))
                    }
                  />
                </Field>
                <Field label="Gender">
                  <GenderSelect
                    value={formData.gender}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, gender: val }))
                    }
                  />
                </Field>
              </div>

              {/* Terms & Guidelines — must read + agree each before joining */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {/* Read indicator row */}
                {[
                  {
                    key: "terms",
                    label: "Terms & Conditions",
                    agreed: agreedTerms,
                    icon: <ScrollText size={13} />,
                  },
                  {
                    key: "guidelines",
                    label: "Community Guidelines",
                    agreed: agreedGuide,
                    icon: <ShieldCheck size={13} />,
                  },
                ].map(({ key, label, agreed, icon }) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: 12,
                      background: agreed
                        ? "rgba(34,197,94,0.07)"
                        : "rgba(255,255,255,0.03)",
                      border: agreed
                        ? "1px solid rgba(34,197,94,0.2)"
                        : "1px solid rgba(255,255,255,0.07)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 9 }}
                    >
                      <span
                        style={{
                          color: agreed ? "#4ade80" : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {icon}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: agreed ? "#86efac" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {agreed && (
                        <span
                          style={{
                            fontSize: 11,
                            color: "#4ade80",
                            fontWeight: 600,
                          }}
                        >
                          ✓ Agreed
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setOpenModal(key)}
                        style={{
                          padding: "5px 12px",
                          borderRadius: 8,
                          border: "1px solid rgba(139,92,246,0.3)",
                          background: agreed
                            ? "rgba(34,197,94,0.08)"
                            : "rgba(99,102,241,0.1)",
                          color: agreed ? "#4ade80" : "#a5b4fc",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          transition: "all 0.15s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {agreed ? "Re-read" : "Read & Agree"}
                      </button>
                    </div>
                  </div>
                ))}

                {/* Checkbox — only enabled when both agreed */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    cursor: bothAgreed ? "pointer" : "not-allowed",
                    marginTop: 2,
                  }}
                >
                  <input
                    type="checkbox"
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onChange={() => {}}
                    style={{
                      position: "absolute",
                      opacity: 0,
                      width: 0,
                      height: 0,
                    }}
                  />
                  <div
                    className={
                      "jp-checkbox-box" + (bothAgreed ? " checked" : "")
                    }
                    style={{ opacity: bothAgreed ? 1 : 0.35 }}
                  >
                    {bothAgreed && (
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
                  <span
                    style={{
                      fontSize: 13,
                      color: bothAgreed
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(255,255,255,0.25)",
                      lineHeight: 1.6,
                      userSelect: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {bothAgreed
                      ? "I confirm I am at least 16 and have read and agreed to both documents above."
                      : "Read and agree to both documents above to continue."}
                  </span>
                </label>
              </div>

              {/* Error banner */}
              {error && (
                <div className="jp-alert jp-alert-error">
                  <AlertCircle
                    size={15}
                    style={{ flexShrink: 0, marginTop: 1 }}
                  />
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!formData.acceptedTerms || loading}
                className="jp-submit"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={15}
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    Creating account…
                  </>
                ) : (
                  "Create Account 🚀"
                )}
              </button>

              {/* Login link */}
              <p
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.3)",
                  margin: 0,
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#818cf8",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#a5b4fc")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#818cf8")
                  }
                >
                  Login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Legal modals — portal-like, rendered at top level */}
      {openModal && <LegalModal type={openModal} />}
    </>
  );
};

// ─── Terms of Service content ─────────────────────────────────────────────────
function TermsContent() {
  return (
    <>
      <h2>1. Acceptance of Terms</h2>
      <p>
        By creating an account on <strong>quikchat</strong>, you confirm that
        you have read, understood, and agree to be bound by these Terms &
        Conditions. If you do not agree, you must not use this service. We may
        update these terms at any time; continued use after changes constitutes
        acceptance.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least <strong>16 years of age</strong> to register and
        use quikchat. By registering, you represent and warrant that you meet
        this age requirement. We reserve the right to terminate accounts of
        users found to be under this age.
      </p>

      <h2>3. Account Responsibilities</h2>
      <ul>
        <li>
          You are responsible for maintaining the confidentiality of your login
          credentials.
        </li>
        <li>
          You must provide accurate, current, and complete information during
          registration.
        </li>
        <li>
          You are solely responsible for all activity that occurs under your
          account.
        </li>
        <li>
          You must notify us immediately of any unauthorised use of your
          account.
        </li>
        <li>
          One account per person — creating multiple accounts is not permitted.
        </li>
      </ul>

      <h2>4. Acceptable Use</h2>
      <p>You agree not to use quikchat to:</p>
      <ul>
        <li>Harass, bully, threaten, or intimidate other users.</li>
        <li>
          Share, solicit, or transmit sexual content involving minors in any
          form.
        </li>
        <li>
          Impersonate any person or entity, or falsely represent your
          affiliation.
        </li>
        <li>Transmit spam, unsolicited messages, or phishing content.</li>
        <li>Distribute malware, viruses, or any harmful code.</li>
        <li>
          Circumvent, disable, or interfere with security-related features.
        </li>
        <li>
          Collect or harvest personal data of other users without consent.
        </li>
        <li>Engage in any activity that is illegal under applicable law.</li>
      </ul>

      <h2>5. Video Chat Rules</h2>
      <ul>
        <li>
          Nudity, sexual conduct, or explicit content during video sessions is
          strictly prohibited.
        </li>
        <li>
          Recording video sessions without the explicit consent of all
          participants is forbidden.
        </li>
        <li>
          You must not use quikchat video chats for commercial solicitation.
        </li>
      </ul>

      <h2>6. Content & Intellectual Property</h2>
      <p>
        You retain ownership of content you post but grant quikchat a
        non-exclusive, worldwide, royalty-free licence to use, display, and
        distribute that content in connection with the service. You warrant that
        any content you submit does not infringe the rights of any third party.
      </p>

      <h2>7. Privacy</h2>
      <p>
        Your use of quikchat is also governed by our Privacy Policy. By
        accepting these terms you also accept our Privacy Policy. We collect
        only the data necessary to provide the service and do not sell your
        personal information to third parties.
      </p>

      <h2>8. Termination</h2>
      <p>
        We reserve the right to suspend or permanently terminate your account,
        at our sole discretion, for violation of these Terms, Community
        Guidelines, or any applicable law — without prior notice or liability.
      </p>

      <h2>9. Disclaimers & Limitation of Liability</h2>
      <p>
        quikchat is provided <strong>"as is"</strong> without warranties of any
        kind. To the maximum extent permitted by law, quikchat shall not be
        liable for any indirect, incidental, special, or consequential damages
        arising from your use of the service, including interactions with other
        users.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms are governed by and construed in accordance with applicable
        law. Any disputes arising from these Terms will be subject to the
        exclusive jurisdiction of the competent courts in the applicable
        territory.
      </p>

      <h2>11. Contact</h2>
      <p>
        For questions about these Terms, contact us at{" "}
        <strong>legal@quikchatapp.com</strong>.
      </p>
      <p
        style={{ marginTop: 24, color: "rgba(255,255,255,0.2)", fontSize: 12 }}
      >
        Last updated: January 2025
      </p>
    </>
  );
}

// ─── Community Guidelines content ────────────────────────────────────────────
function GuidelinesContent() {
  return (
    <>
      <h2>Our Community Promise</h2>
      <p>
        quikchat exists to help people make real connections across the world.
        Every interaction shapes what this community feels like. These
        guidelines exist to protect everyone and ensure quikchat stays a place
        people genuinely want to be.
      </p>

      <h2>1. Treat Everyone With Respect</h2>
      <ul>
        <li>Speak to others the way you would want to be spoken to.</li>
        <li>
          Disagreements are fine — personal attacks and hate speech are not.
        </li>
        <li>
          Do not discriminate based on race, ethnicity, religion, gender, sexual
          orientation, disability, nationality, or age.
        </li>
        <li>
          Mocking or belittling someone for their appearance, accent, or
          background is not allowed.
        </li>
      </ul>

      <h2>2. Zero Tolerance Behaviours</h2>
      <p>
        The following will result in an immediate permanent ban with no appeal:
      </p>
      <ul>
        <li>
          <strong>Child sexual abuse material (CSAM)</strong> — any depiction,
          solicitation, or grooming of minors.
        </li>
        <li>
          <strong>Threats of violence</strong> — credible threats directed at
          any individual or group.
        </li>
        <li>
          <strong>Doxxing</strong> — sharing someone's private personal
          information without consent.
        </li>
        <li>
          <strong>Non-consensual intimate imagery</strong> — sharing or
          threatening to share intimate images without consent.
        </li>
      </ul>

      <h2>3. No Harassment or Stalking</h2>
      <ul>
        <li>
          Do not repeatedly contact someone who has blocked you or asked you to
          stop.
        </li>
        <li>
          Do not follow, track, or attempt to identify a user's real-world
          location without consent.
        </li>
        <li>
          Coordinated campaigns to harass a specific person are prohibited.
        </li>
      </ul>

      <h2>4. Keep It Safe for Everyone</h2>
      <ul>
        <li>
          Do not share or encourage self-harm, suicide methods, or dangerous
          behaviour.
        </li>
        <li>
          Do not promote or sell illegal substances, weapons, or counterfeit
          goods.
        </li>
        <li>
          Do not spread deliberate misinformation about health emergencies or
          public safety.
        </li>
      </ul>

      <h2>5. Authentic Identity</h2>
      <ul>
        <li>
          Do not impersonate real people, celebrities, or other quikchat users.
        </li>
        <li>
          Do not misrepresent your age, especially to interact with minors.
        </li>
        <li>Fake or bot accounts are not permitted.</li>
      </ul>

      <h2>6. Spam & Commercial Activity</h2>
      <ul>
        <li>
          Do not send unsolicited promotional messages or repeat identical
          messages.
        </li>
        <li>
          Do not use quikchat to run scams, phishing attacks, or pyramid
          schemes.
        </li>
        <li>
          Commercial advertising without explicit permission from quikchat is
          not allowed.
        </li>
      </ul>

      <h2>7. Reporting & Enforcement</h2>
      <p>
        Use the in-app report button whenever you encounter a guideline
        violation. Our moderation team reviews all reports. Enforcement actions
        range from a warning to a permanent ban, depending on severity and
        history. We aim to be consistent and fair.
      </p>

      <h2>8. Your Role in the Community</h2>
      <p>
        You are not just a user — you are a member. The quality of this
        community depends on each person who joins it. If something feels wrong,
        report it. If someone seems distressed, be kind. Together we can make
        quikchat a place worth coming back to.
      </p>

      <p
        style={{ marginTop: 24, color: "rgba(255,255,255,0.2)", fontSize: 12 }}
      >
        Last updated: January 2025
      </p>
    </>
  );
}

export default JoinPage;