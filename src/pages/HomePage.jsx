// // // import React, { useState } from "react";

// // import HomeView from "../components/views/HomeView";
// // import { useAuth } from "../hooks/useAuth";

// // // import { useNavigate } from "react-router-dom";
// // // import Header from "../components/Header";
// // import LandingInfo from "../components/LandingInfo";
// // // import { useAuth } from "../hooks/useAuth";

// // // import AppShell from "../components/AppShell";
// // // import Layout from "../components/Layout";

// // // function HomePage() {

// // // const { user, loading } = useAuth();
// // //   const [showHeader, setShowHeader] = useState(true);

// // //   // const navigate = useNavigate();

// // //   return (
// // //     <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 text-white flex flex-col overflow-y-auto">
// // //       <Layout header={<Header />} showHeader={showHeader}>
// // //         {loading ? (
// // //           <div className="w-full h-full flex items-center justify-center">
// // //             <div className="flex flex-col items-center gap-3 animate-fade-in">
// // //               {/* Spinner */}
// // //               <div
// // //                 className="
// // //         w-10 h-10
// // //         rounded-full
// // //         border-4 border-white/20
// // //         border-t-cyan-400
// // //         animate-spin
// // //       "
// // //               />

// // //               {/* Text */}
// // //               <span className="text-sm text-white/60 tracking-wide">
// // //                 Loading…
// // //               </span>
// // //             </div>
// // //           </div>
// // //         ) : user ? (
// // //           <AppShell user={user} setShowHeader={setShowHeader} loading={loading} />
// // //         ) : (
// // //           <LandingInfo />
// // //         )}
// // //       </Layout>
// // //     </div>
// // //   );
// // // }

// // // export default HomePage;

// // // function HomePage() {
// // //   const { user, loading } = useAuth();

// // //   // if (loading) return <Spinner />;
// // // if (loading)
// // //   return <div style={{ position: "fixed", inset: 0, background: "#060610" }} />;
// // //   if (!user) return <LandingInfo />;

// // //   return <HomeView />;
// // // }

// // // export default HomePage;

// // import { useEffect, useState } from "react";

// // function HomePage() {
// //   const { user, loading } = useAuth();
// //   const [showSplash, setShowSplash] = useState(true);

// //   useEffect(() => {
// //     const timer = setTimeout(() => setShowSplash(false), 1500);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   // Splash screen
// //   if (showSplash) {
// //     return (
// //       <div
// //         style={{
// //           position: "fixed",
// //           inset: 0,
// //           zIndex: 9999,
// //           background: "#060610",
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "center",
// //           justifyContent: "center",
// //         }}
// //       >
// //         <style>{`
// //           @keyframes splash-logo-pop {
// //             0%   { transform: scale(0.7); opacity: 0; }
// //             60%  { transform: scale(1.08); opacity: 1; }
// //             100% { transform: scale(1); opacity: 1; }
// //           }
// //           @keyframes splash-fade-up {
// //             from { opacity: 0; transform: translateY(10px); }
// //             to   { opacity: 1; transform: translateY(0); }
// //           }
// //         `}</style>

// //         {/* Logo */}
// //         <div
// //           style={{
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             gap: 16,
// //             animation:
// //               "splash-logo-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards",
// //           }}
// //         >
// //           <div
// //             style={{
// //               width: 72,
// //               height: 72,
// //               borderRadius: 22,
// //               background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               boxShadow:
// //                 "0 0 40px rgba(99,102,241,0.5), 0 0 80px rgba(99,102,241,0.15)",
// //             }}
// //           >
// //             <span
// //               style={{
// //                 color: "#fff",
// //                 fontSize: 24,
// //                 fontWeight: 900,
// //                 letterSpacing: "-0.04em",
// //               }}
// //             >
// //               HS
// //             </span>
// //           </div>

// //           <span
// //             style={{
// //               fontSize: 18,
// //               fontWeight: 700,
// //               color: "#f1f5f9",
// //               letterSpacing: "-0.03em",
// //               animation: "splash-fade-up 0.4s 0.3s ease forwards",
// //               opacity: 0,
// //             }}
// //           >
// //             HelloStranger
// //           </span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Auth handling
// //   if (loading) return null;

// //   if (!user) return <LandingInfo />;

// //   return <HomeView />;
// // }

// // export default HomePage;

// import { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";
// import LandingInfo from "../components/LandingInfo";
// import HomeView from "../components/views/HomeView";

// function HomePage() {
//   const { user, loading } = useAuth();
//   const [showSplash, setShowSplash] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowSplash(false), 1800);
//     return () => clearTimeout(timer);
//   }, []);

//   if (showSplash) {
//     return (
//       <div
//         style={{
//           position: "fixed",
//           inset: 0,
//           zIndex: 9999,
//           background: "#060610",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <style>{`
//           @keyframes splash-logo-pop {
//             0%   { transform: scale(0.7); opacity: 0; }
//             60%  { transform: scale(1.08); opacity: 1; }
//             100% { transform: scale(1); opacity: 1; }
//           }
//           @keyframes splash-fade-up {
//             from { opacity: 0; transform: translateY(10px); }
//             to   { opacity: 1; transform: translateY(0); }
//           }
//           @keyframes splash-bar {
//             from { width: 0%; }
//             to   { width: 100%; }
//           }
//           @keyframes splash-pulse {
//             0%   { transform: scale(0.85); opacity: 0.5; }
//             50%  { transform: scale(1.12); opacity: 0.12; }
//             100% { transform: scale(0.85); opacity: 0.5; }
//           }
//         `}</style>

//         {/* Ambient glow */}
//         <div
//           style={{
//             position: "absolute",
//             width: 360,
//             height: 360,
//             borderRadius: "50%",
//             background:
//               "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
//             pointerEvents: "none",
//           }}
//         />

//         {/* Pulse rings */}
//         {[120, 170].map((size, i) => (
//           <div
//             key={i}
//             style={{
//               position: "absolute",
//               width: size,
//               height: size,
//               borderRadius: "50%",
//               border: `1.5px solid rgba(${
//                 i === 0 ? "99,102,241,0.35" : "139,92,246,0.18"
//               })`,
//               animation: `splash-pulse ${i === 0 ? "2.2s" : "2.6s"} ${
//                 i === 0 ? "0s" : "0.4s"
//               } ease-in-out infinite`,
//             }}
//           />
//         ))}

//         {/* Logo */}
//         <div
//           style={{
//             position: "relative",
//             zIndex: 2,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 16,
//             animation:
//               "splash-logo-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards",
//           }}
//         >
//           <div
//             style={{
//               width: 72,
//               height: 72,
//               borderRadius: 22,
//               background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow:
//                 "0 0 40px rgba(99,102,241,0.5), 0 0 80px rgba(99,102,241,0.15)",
//             }}
//           >
//             <span
//               style={{
//                 color: "#fff",
//                 fontSize: 24,
//                 fontWeight: 900,
//                 letterSpacing: "-0.04em",
//               }}
//             >
//               HS
//             </span>
//           </div>

//           <span
//             style={{
//               fontSize: 18,
//               fontWeight: 700,
//               color: "#f1f5f9",
//               letterSpacing: "-0.03em",
//               animation: "splash-fade-up 0.4s 0.35s ease forwards",
//               opacity: 0,
//             }}
//           >
//             HelloStranger
//           </span>
//         </div>

//         {/* Progress bar */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 52,
//             width: 80,
//             height: 2,
//             background: "rgba(255,255,255,0.08)",
//             borderRadius: 99,
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               height: "100%",
//               background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
//               borderRadius: 99,
//               animation:
//                 "splash-bar 1.4s 0.2s cubic-bezier(0.4,0,0.2,1) forwards",
//               width: "0%",
//             }}
//           />
//         </div>

//         {/* Tagline */}
//         <span
//           style={{
//             position: "absolute",
//             bottom: 30,
//             fontSize: 10,
//             color: "rgba(255,255,255,0.2)",
//             letterSpacing: "0.08em",
//             textTransform: "uppercase",
//             animation: "splash-fade-up 0.4s 0.5s ease forwards",
//             opacity: 0,
//           }}
//         >
//           Meet Strangers · Make Stories
//         </span>
//       </div>
//     );
//   }

//   if (loading) return null;

//   if (!user) return <LandingInfo />;

//   return <HomeView />;
// }

// export default HomePage;

// import { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";
// import LandingInfo from "../components/LandingInfo";
// import HomeView from "../components/views/HomeView";

// function HomePage() {
//   const { user, loading } = useAuth();
//   const [showSplash, setShowSplash] = useState(false);

//   useEffect(() => {
//     if (!loading && user) {
//       setShowSplash(true);
//     }
//   }, [loading, user]);

//   useEffect(() => {
//     if (!showSplash) return;
//     const timer = setTimeout(() => setShowSplash(false), 1800);
//     return () => clearTimeout(timer);
//   }, [showSplash]);

//   if (showSplash) {
//     return (
//       <div
//         style={{
//           position: "fixed",
//           inset: 0,
//           zIndex: 9999,
//           background: "#060610",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <style>{`
//           @keyframes splash-logo-pop {
//             0%   { transform: scale(0.7); opacity: 0; }
//             60%  { transform: scale(1.08); opacity: 1; }
//             100% { transform: scale(1); opacity: 1; }
//           }
//           @keyframes splash-fade-up {
//             from { opacity: 0; transform: translateY(10px); }
//             to   { opacity: 1; transform: translateY(0); }
//           }
//           @keyframes splash-bar {
//             from { width: 0%; }
//             to   { width: 100%; }
//           }
//           @keyframes splash-pulse {
//             0%   { transform: scale(0.85); opacity: 0.5; }
//             50%  { transform: scale(1.12); opacity: 0.12; }
//             100% { transform: scale(0.85); opacity: 0.5; }
//           }
//         `}</style>

//         {/* Ambient glow */}
//         <div
//           style={{
//             position: "absolute",
//             width: 360,
//             height: 360,
//             borderRadius: "50%",
//             background:
//               "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
//             pointerEvents: "none",
//           }}
//         />

//         {/* Pulse rings */}
//         {[120, 170].map((size, i) => (
//           <div
//             key={i}
//             style={{
//               position: "absolute",
//               width: size,
//               height: size,
//               borderRadius: "50%",
//               border: `1.5px solid rgba(${
//                 i === 0 ? "99,102,241,0.35" : "139,92,246,0.18"
//               })`,
//               animation: `splash-pulse ${i === 0 ? "2.2s" : "2.6s"} ${
//                 i === 0 ? "0s" : "0.4s"
//               } ease-in-out infinite`,
//             }}
//           />
//         ))}

//         {/* Logo */}
//         <div
//           style={{
//             position: "relative",
//             zIndex: 2,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 16,
//             animation:
//               "splash-logo-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards",
//           }}
//         >
//           <div
//             style={{
//               width: 72,
//               height: 72,
//               borderRadius: 22,
//               background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow:
//                 "0 0 40px rgba(99,102,241,0.5), 0 0 80px rgba(99,102,241,0.15)",
//             }}
//           >
//             <span
//               style={{
//                 color: "#fff",
//                 fontSize: 24,
//                 fontWeight: 900,
//                 letterSpacing: "-0.04em",
//               }}
//             >
//               HS
//             </span>
//           </div>

//           <span
//             style={{
//               fontSize: 18,
//               fontWeight: 700,
//               color: "#f1f5f9",
//               letterSpacing: "-0.03em",
//               animation: "splash-fade-up 0.4s 0.35s ease forwards",
//               opacity: 0,
//             }}
//           >
//             HelloStranger
//           </span>
//         </div>

//         {/* Progress bar */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 52,
//             width: 80,
//             height: 2,
//             background: "rgba(255,255,255,0.08)",
//             borderRadius: 99,
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               height: "100%",
//               background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
//               borderRadius: 99,
//               animation:
//                 "splash-bar 1.4s 0.2s cubic-bezier(0.4,0,0.2,1) forwards",
//               width: "0%",
//             }}
//           />
//         </div>

//         {/* Tagline */}
//         <span
//           style={{
//             position: "absolute",
//             bottom: 30,
//             fontSize: 10,
//             color: "rgba(255,255,255,0.2)",
//             letterSpacing: "0.08em",
//             textTransform: "uppercase",
//             animation: "splash-fade-up 0.4s 0.5s ease forwards",
//             opacity: 0,
//           }}
//         >
//           Meet Strangers · Make Stories
//         </span>
//       </div>
//     );
//   }

//   if (loading) return null;

//   if (!user) return <LandingInfo />;

//   return <HomeView />;
// }

// export default HomePage;

// import { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";
// import LandingInfo from "../components/LandingInfo";
// import HomeView from "../components/views/HomeView";
// import SplashScreen from "../components/SplashScreen";

// function HomePage() {
//   const { user, loading } = useAuth();
//   const [showSplash, setShowSplash] = useState(false);

//   useEffect(() => {
//     if (!loading && user) setShowSplash(true);
//   }, [loading, user]);

//   if (loading) return null;
//   if (!user) return <LandingInfo />;

//   return (
//     <div className="w-full h-full relative">
//       {showSplash && (
//         // <SplashScreen
//         //   onDone={() => setShowSplash(false)}
//         //   config={{
//         //     dot: "#6366f1",
//         //     gradientFrom: "#6366f1",
//         //     gradientTo: "#8b5cf6",
//         //     title: "HelloStranger",
//         //     duration: 1800,
//         //   }}
//         // />

//         <SplashScreen
//           onDone={() => setShowSplash(false)}
//           config={{
//             from: "#6366f1",
//             to: "#8b5cf6",
//             glow: "99,102,241",
//             title: "HelloStranger",
//             duration: 1000,
//             icon: (
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#fff"
//                 strokeWidth="2.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
//                 <path d="M9 21V12h6v9" />
//               </svg>
//             ),
//           }}
//         />
//       )}
//       <HomeView />
//     </div>
//   );
// }

// export default HomePage;

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import LandingInfo from "../components/LandingInfo";
import HomeView from "../components/views/HomeView";
import SplashScreen from "../components/SplashScreen";

function HomePage() {
  const { user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!loading && !user) setShowSplash(false);
  }, [loading, user]);

  useEffect(() => {
    if (!showSplash) return;
    const timer = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(timer);
  }, [showSplash]);

  if (showSplash)
    return (
      <div className="w-full h-full relative">
        <SplashScreen
          onDone={() => setShowSplash(false)}
          config={{
            from: "#6366f1",
            to: "#8b5cf6",
            glow: "99,102,241",
            title: "HelloStranger",
            duration: 1000,
            icon: (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                <path d="M9 21V12h6v9" />
              </svg>
            ),
          }}
        />
      </div>
    );

  if (loading) return null;
  if (!user) return <LandingInfo />;

  return (
    <div className="w-full h-full relative">
      <HomeView />
    </div>
  );
}







export default HomePage;