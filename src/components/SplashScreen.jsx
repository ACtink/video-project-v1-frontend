// import { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";

// function SplashScreen({ onDone, config = {} }) {
//   const { user, loading } = useAuth();
//   const [visible, setVisible] = useState(false);

//   const {
//     background = "#060610",
//     gradientFrom = "#6366f1",
//     gradientTo = "#8b5cf6",
//     glowColor = "99,102,241",
//     initials = "VC",
//     title = "Video Call",
//     tagline = "Meet Strangers · Make Stories",
//     duration = 2000,
//   } = config;

//   useEffect(() => {
//     if (!loading && user) setVisible(true);
//   }, [loading, user]);

//   useEffect(() => {
//     if (!visible) return;
//     const timer = setTimeout(() => {
//       setVisible(false);
//       onDone?.();
//     }, duration);
//     return () => clearTimeout(timer);
//   }, [visible]);

//   if (!visible) return null;

//   return (
//     <div
//       style={{
//         position: "absolute",
//         inset: 0,
//         zIndex: 9999,
//         background,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <style>{`
//         @keyframes splash-logo-pop {
//           0%   { transform: scale(0.7); opacity: 0; }
//           60%  { transform: scale(1.08); opacity: 1; }
//           100% { transform: scale(1); opacity: 1; }
//         }
//         @keyframes splash-fade-up {
//           from { opacity: 0; transform: translateY(10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes splash-bar {
//           from { width: 0%; }
//           to   { width: 100%; }
//         }
//         @keyframes splash-pulse {
//           0%   { transform: scale(0.85); opacity: 0.5; }
//           50%  { transform: scale(1.12); opacity: 0.12; }
//           100% { transform: scale(0.85); opacity: 0.5; }
//         }
//       `}</style>

//       {/* Ambient glow */}
//       <div
//         style={{
//           position: "absolute",
//           width: 360,
//           height: 360,
//           borderRadius: "50%",
//           background: `radial-gradient(circle, rgba(${glowColor},0.18) 0%, transparent 70%)`,
//           pointerEvents: "none",
//         }}
//       />

//       {/* Pulse rings */}
//       {[120, 170].map((size, i) => (
//         <div
//           key={i}
//           style={{
//             position: "absolute",
//             width: size,
//             height: size,
//             borderRadius: "50%",
//             border: `1.5px solid rgba(${glowColor},${i === 0 ? "0.35" : "0.18"})`,
//             animation: `splash-pulse ${i === 0 ? "2.2s" : "2.6s"} ${
//               i === 0 ? "0s" : "0.4s"
//             } ease-in-out infinite`,
//           }}
//         />
//       ))}

//       {/* Logo */}
//       <div
//         style={{
//           position: "relative",
//           zIndex: 2,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: 16,
//           animation:
//             "splash-logo-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards",
//         }}
//       >
//         <div
//           style={{
//             width: 72,
//             height: 72,
//             borderRadius: 22,
//             background: `linear-gradient(135deg,${gradientFrom},${gradientTo})`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: `0 0 40px rgba(${glowColor},0.5), 0 0 80px rgba(${glowColor},0.15)`,
//           }}
//         >
//           <span
//             style={{
//               color: "#fff",
//               fontSize: 24,
//               fontWeight: 900,
//               letterSpacing: "-0.04em",
//             }}
//           >
//             {initials}
//           </span>
//         </div>

//         <span
//           style={{
//             fontSize: 18,
//             fontWeight: 700,
//             color: "#f1f5f9",
//             letterSpacing: "-0.03em",
//             animation: "splash-fade-up 0.4s 0.35s ease forwards",
//             opacity: 0,
//           }}
//         >
//           {title}
//         </span>
//       </div>

//       {/* Progress bar */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 52,
//           width: 80,
//           height: 2,
//           background: "rgba(255,255,255,0.08)",
//           borderRadius: 99,
//           overflow: "hidden",
//         }}
//       >
//         <div
//           style={{
//             height: "100%",
//             background: `linear-gradient(90deg,${gradientFrom},${gradientTo})`,
//             borderRadius: 99,
//             animation:
//               "splash-bar 1.4s 0.2s cubic-bezier(0.4,0,0.2,1) forwards",
//             width: "0%",
//           }}
//         />
//       </div>

//       {/* Tagline */}
//       <span
//         style={{
//           position: "absolute",
//           bottom: 30,
//           fontSize: 10,
//           color: "rgba(255,255,255,0.2)",
//           letterSpacing: "0.08em",
//           textTransform: "uppercase",
//           animation: "splash-fade-up 0.4s 0.5s ease forwards",
//           opacity: 0,
//         }}
//       >
//         {tagline}
//       </span>
//     </div>
//   );
// }

// export default SplashScreen;



import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

function SplashScreen({ onDone, config = {} }) {
  const { user, loading } = useAuth();
  const [visible, setVisible] = useState(false);

  const {
    background = "#060610",
    from = "#6366f1",
    to = "#8b5cf6",
    glow = "99,102,241",
    initials = "VC",
    title = "Video Call",
    tagline = "Meet Strangers · Make Stories",
    duration = 2000,
    iconBoxSize = 72,
    icon = null,
  } = config;

  useEffect(() => {
    if (!loading && user) setVisible(true);
  }, [loading, user]);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 9999,
        background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes splash-logo-pop {
          0%   { transform: scale(0.7); opacity: 0; }
          60%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes splash-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splash-bar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes splash-pulse {
          0%   { transform: scale(0.85); opacity: 0.5; }
          50%  { transform: scale(1.12); opacity: 0.12; }
          100% { transform: scale(0.85); opacity: 0.5; }
        }
      `}</style>

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${glow},0.18) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Pulse rings */}
      {[120, 170].map((size, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1.5px solid rgba(${glow},${i === 0 ? "0.35" : "0.18"})`,
            animation: `splash-pulse ${i === 0 ? "2.2s" : "2.6s"} ${
              i === 0 ? "0s" : "0.4s"
            } ease-in-out infinite`,
          }}
        />
      ))}

      {/* Logo */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          animation:
            "splash-logo-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
      >
        <div
          style={{
            width: iconBoxSize,
            height: iconBoxSize,
            borderRadius: 22,
            background: `linear-gradient(135deg,${from},${to})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 40px rgba(${glow},0.5), 0 0 80px rgba(${glow},0.15)`,
          }}
        >
          {icon ?? (
            <span
              style={{
                color: "#fff",
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "-0.04em",
              }}
            >
              {initials}
            </span>
          )}
        </div>

        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#f1f5f9",
            letterSpacing: "-0.03em",
            animation: "splash-fade-up 0.4s 0.35s ease forwards",
            opacity: 0,
          }}
        >
          {title}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 52,
          width: 90,
          height: 4,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: `linear-gradient(90deg,${from},${to})`,
            borderRadius: 99,
            animation:
              "splash-bar 1.4s 0.2s cubic-bezier(0.4,0,0.2,1) forwards",
            width: "0%",
          }}
        />
      </div>

      {/* Tagline */}
      <span
        style={{
          position: "absolute",
          bottom: 30,
          fontSize: 10,
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          animation: "splash-fade-up 0.4s 0.5s ease forwards",
          opacity: 0,
        }}
      >
        {tagline}
      </span>
    </div>
  );
}

export default SplashScreen;



// // // // // import { useEffect, useState } from "react";
// // // // // import { useAuth } from "../hooks/useAuth";

// // // // // function SplashScreen({ onDone, config = {} }) {
// // // // //   const { user, loading } = useAuth();
// // // // //   const [visible, setVisible] = useState(false);

// // // // //   const {
// // // // //     dot = "#6366f1",
// // // // //     gradientFrom = "#6366f1",
// // // // //     gradientTo = "#8b5cf6",
// // // // //     title = "HelloStranger",
// // // // //     duration = 1800,
// // // // //   } = config;

// // // // //   useEffect(() => {
// // // // //     if (!loading && user) setVisible(true);
// // // // //   }, [loading, user]);

// // // // //   useEffect(() => {
// // // // //     if (!visible) return;
// // // // //     const timer = setTimeout(() => {
// // // // //       setVisible(false);
// // // // //       onDone?.();
// // // // //     }, duration);
// // // // //     return () => clearTimeout(timer);
// // // // //   }, [visible]);

// // // // //   if (!visible) return null;

// // // // //   return (
// // // // //     <div
// // // // //       style={{
// // // // //         position: "absolute",
// // // // //         inset: 0,
// // // // //         zIndex: 9999,
// // // // //         background: "#060610",
// // // // //         display: "flex",
// // // // //         flexDirection: "column",
// // // // //         alignItems: "center",
// // // // //         justifyContent: "center",
// // // // //         overflow: "hidden",
// // // // //       }}
// // // // //     >
// // // // //       <style>{`
// // // // //         @keyframes splash-pop {
// // // // //           0%   { transform: scale(0.7); opacity: 0; }
// // // // //           60%  { transform: scale(1.05); opacity: 1; }
// // // // //           100% { transform: scale(1); opacity: 1; }
// // // // //         }
// // // // //         @keyframes splash-wipe {
// // // // //           from { width: 0%; }
// // // // //           to   { width: 100%; }
// // // // //         }
// // // // //       `}</style>

// // // // //       {/* Dot + Wordmark */}
// // // // //       <div
// // // // //         style={{
// // // // //           display: "flex",
// // // // //           alignItems: "center",
// // // // //           gap: 12,
// // // // //           animation: "splash-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
// // // // //         }}
// // // // //       >
// // // // //         <div
// // // // //           style={{
// // // // //             width: 10,
// // // // //             height: 10,
// // // // //             borderRadius: "50%",
// // // // //             background: dot,
// // // // //           }}
// // // // //         />
// // // // //         <span
// // // // //           style={{
// // // // //             fontSize: 22,
// // // // //             fontWeight: 800,
// // // // //             color: "#f1f5f9",
// // // // //             letterSpacing: "-0.04em",
// // // // //           }}
// // // // //         >
// // // // //           {title}
// // // // //         </span>
// // // // //       </div>

// // // // //       {/* Bottom wipe line */}
// // // // //       <div
// // // // //         style={{
// // // // //           position: "absolute",
// // // // //           bottom: 0,
// // // // //           left: 0,
// // // // //           height: 2,
// // // // //           background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo}, transparent)`,
// // // // //           animation: "splash-wipe 1.4s 0.2s ease forwards",
// // // // //           width: "0%",
// // // // //         }}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default SplashScreen;

// // // // import { useEffect, useRef, useState } from "react";
// // // // import { useAuth } from "../hooks/useAuth";

// // // // function SplashScreen({ onDone, config = {} }) {
// // // //   const { user, loading } = useAuth();
// // // //   const [visible, setVisible] = useState(false);
// // // //   const canvasRef = useRef(null);

// // // //   const {
// // // //     from = "#6366f1",
// // // //     to = "#8b5cf6",
// // // //     glow = "99,102,241",
// // // //     icon = null,
// // // //     title = "HelloStranger",
// // // //     duration = 2000,
// // // //   } = config;

// // // //   useEffect(() => {
// // // //     if (!loading && user) setVisible(true);
// // // //   }, [loading, user]);

// // // //   useEffect(() => {
// // // //     if (!visible) return;
// // // //     const timer = setTimeout(() => {
// // // //       setVisible(false);
// // // //       onDone?.();
// // // //     }, duration);
// // // //     return () => clearTimeout(timer);
// // // //   }, [visible]);

// // // //   useEffect(() => {
// // // //     if (!visible) return;
// // // //     const canvas = canvasRef.current;
// // // //     if (!canvas) return;
// // // //     canvas.width = canvas.offsetWidth;
// // // //     canvas.height = canvas.offsetHeight;
// // // //     const ctx = canvas.getContext("2d");
// // // //     const [r, g, b] = glow.split(",");
// // // //     const pts = Array.from({ length: 24 }, () => ({
// // // //       x: Math.random() * canvas.width,
// // // //       y: Math.random() * canvas.height,
// // // //       radius: Math.random() * 1.2 + 0.3,
// // // //       delay: Math.random() * 1.2,
// // // //       dur: Math.random() * 1.2 + 1,
// // // //       max: Math.random() * 0.25 + 0.06,
// // // //     }));
// // // //     let start = null;
// // // //     let raf;
// // // //     function draw(ts) {
// // // //       if (!start) start = ts;
// // // //       const elapsed = (ts - start) / 1000;
// // // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // //       pts.forEach((p) => {
// // // //         const t = elapsed - p.delay;
// // // //         if (t < 0) return;
// // // //         const prog = Math.min(t / p.dur, 1);
// // // //         const a =
// // // //           prog < 0.5 ? p.max * (prog / 0.5) : p.max * (1 - (prog - 0.5) / 0.5);
// // // //         ctx.beginPath();
// // // //         ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
// // // //         ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// // // //         ctx.fill();
// // // //       });
// // // //       raf = requestAnimationFrame(draw);
// // // //     }
// // // //     raf = requestAnimationFrame(draw);
// // // //     return () => cancelAnimationFrame(raf);
// // // //   }, [visible]);

// // // //   if (!visible) return null;

// // // //   const circumference = 2 * Math.PI * 40;
// // // //   const gradId = `sg-${title.replace(/\s/g, "")}`;

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         position: "absolute",
// // // //         inset: 0,
// // // //         zIndex: 9999,
// // // //         background: "#060610",
// // // //         display: "flex",
// // // //         flexDirection: "column",
// // // //         alignItems: "center",
// // // //         justifyContent: "center",
// // // //         overflow: "hidden",
// // // //       }}
// // // //     >
// // // //       <style>{`
// // // //         @keyframes sp-pop {
// // // //           0%   { transform: scale(0.6); opacity: 0; }
// // // //           60%  { transform: scale(1.1); opacity: 1; }
// // // //           100% { transform: scale(1); opacity: 1; }
// // // //         }
// // // //         @keyframes sp-ring-draw {
// // // //           from { stroke-dashoffset: ${circumference}; }
// // // //           to   { stroke-dashoffset: 0; }
// // // //         }
// // // //         @keyframes sp-ring-fade {
// // // //           0%   { opacity: 0; }
// // // //           25%  { opacity: 1; }
// // // //           75%  { opacity: 1; }
// // // //           100% { opacity: 0; }
// // // //         }
// // // //         @keyframes sp-fadeup {
// // // //           from { opacity: 0; transform: translateY(6px); }
// // // //           to   { opacity: 1; transform: translateY(0); }
// // // //         }
// // // //         @keyframes sp-wipe {
// // // //           from { width: 0%; }
// // // //           to   { width: 100%; }
// // // //         }
// // // //       `}</style>

// // // //       {/* Particles */}
// // // //       <canvas
// // // //         ref={canvasRef}
// // // //         style={{
// // // //           position: "absolute",
// // // //           inset: 0,
// // // //           width: "100%",
// // // //           height: "100%",
// // // //         }}
// // // //       />

// // // //       {/* Center content */}
// // // //       <div
// // // //         style={{
// // // //           position: "relative",
// // // //           zIndex: 2,
// // // //           display: "flex",
// // // //           flexDirection: "column",
// // // //           alignItems: "center",
// // // //           gap: 14,
// // // //         }}
// // // //       >
// // // //         {/* Ring + Icon */}
// // // //         <div
// // // //           style={{
// // // //             position: "relative",
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             justifyContent: "center",
// // // //           }}
// // // //         >
// // // //           <svg
// // // //             width="90"
// // // //             height="90"
// // // //             viewBox="0 0 90 90"
// // // //             style={{
// // // //               position: "absolute",
// // // //               animation: "sp-ring-fade 2s 0.2s ease forwards",
// // // //               opacity: 0,
// // // //             }}
// // // //           >
// // // //             <defs>
// // // //               <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
// // // //                 <stop offset="0%" stopColor={from} />
// // // //                 <stop offset="100%" stopColor={to} />
// // // //               </linearGradient>
// // // //             </defs>
// // // //             <circle
// // // //               cx="45"
// // // //               cy="45"
// // // //               r="40"
// // // //               fill="none"
// // // //               stroke={`url(#${gradId})`}
// // // //               strokeWidth="1.5"
// // // //               strokeDasharray={circumference}
// // // //               strokeDashoffset={circumference}
// // // //               style={{
// // // //                 animation: `sp-ring-draw 1s 0.3s ease forwards`,
// // // //               }}
// // // //             />
// // // //           </svg>

// // // //           <div
// // // //             style={{
// // // //               width: 52,
// // // //               height: 52,
// // // //               borderRadius: 15,
// // // //               background: `linear-gradient(135deg, ${from}, ${to})`,
// // // //               display: "flex",
// // // //               alignItems: "center",
// // // //               justifyContent: "center",
// // // //               boxShadow: `0 0 24px rgba(${glow}, 0.4)`,
// // // //               animation:
// // // //                 "sp-pop 0.55s 0.1s cubic-bezier(0.34,1.56,0.64,1) forwards",
// // // //               opacity: 0,
// // // //             }}
// // // //           >
// // // //             {icon}
// // // //           </div>
// // // //         </div>

// // // //         {/* Title */}
// // // //         <div
// // // //           style={{
// // // //             fontSize: 15,
// // // //             fontWeight: 800,
// // // //             color: "#f1f5f9",
// // // //             letterSpacing: "-0.03em",
// // // //             animation: "sp-fadeup 0.4s 0.6s ease forwards",
// // // //             opacity: 0,
// // // //           }}
// // // //         >
// // // //           {title}
// // // //         </div>
// // // //       </div>

// // // //       {/* Wipe line */}
// // // //       <div
// // // //         style={{
// // // //           position: "absolute",
// // // //           bottom: 0,
// // // //           left: 0,
// // // //           height: 2,
// // // //           background: `linear-gradient(90deg, ${from}, ${to}, transparent)`,
// // // //           animation: "sp-wipe 1.4s 0.3s ease forwards",
// // // //           width: "0%",
// // // //         }}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }

// // // // export default SplashScreen;

// // // import { useEffect, useRef, useState } from "react";
// // // import { useAuth } from "../hooks/useAuth";

// // // function SplashScreen({ onDone, config = {} }) {
// // //   const { user, loading } = useAuth();
// // //   const [visible, setVisible] = useState(false);
// // //   const canvasRef = useRef(null);

// // //   const {
// // //     from = "#6366f1",
// // //     to = "#8b5cf6",
// // //     glow = "99,102,241",
// // //     icon = null,
// // //     title = "HelloStranger",
// // //     duration = 2000,
// // //   } = config;

// // //   useEffect(() => {
// // //     if (!loading && user) setVisible(true);
// // //   }, [loading, user]);

// // //   useEffect(() => {
// // //     if (!visible) return;
// // //     const timer = setTimeout(() => {
// // //       setVisible(false);
// // //       onDone?.();
// // //     }, duration);
// // //     return () => clearTimeout(timer);
// // //   }, [visible]);

// // //   useEffect(() => {
// // //     if (!visible) return;
// // //     const canvas = canvasRef.current;
// // //     if (!canvas) return;
// // //     canvas.width = canvas.offsetWidth;
// // //     canvas.height = canvas.offsetHeight;
// // //     const ctx = canvas.getContext("2d");
// // //     const [r, g, b] = glow.split(",");

// // //     // Particle timings compressed: delay 0–0.08s, duration 0.1–0.2s (was 0–1.2s / 1–2.2s)
// // //     const pts = Array.from({ length: 24 }, () => ({
// // //       x: Math.random() * canvas.width,
// // //       y: Math.random() * canvas.height,
// // //       radius: Math.random() * 1.2 + 0.3,
// // //       delay: Math.random() * 0.08,
// // //       dur: Math.random() * 0.1 + 0.1,
// // //       max: Math.random() * 0.25 + 0.06,
// // //     }));

// // //     let start = null;
// // //     let raf;
// // //     function draw(ts) {
// // //       if (!start) start = ts;
// // //       const elapsed = (ts - start) / 1000;
// // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // //       pts.forEach((p) => {
// // //         const t = elapsed - p.delay;
// // //         if (t < 0) return;
// // //         const prog = Math.min(t / p.dur, 1);
// // //         const a =
// // //           prog < 0.5 ? p.max * (prog / 0.5) : p.max * (1 - (prog - 0.5) / 0.5);
// // //         ctx.beginPath();
// // //         ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
// // //         ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
// // //         ctx.fill();
// // //       });
// // //       raf = requestAnimationFrame(draw);
// // //     }
// // //     raf = requestAnimationFrame(draw);
// // //     return () => cancelAnimationFrame(raf);
// // //   }, [visible]);

// // //   if (!visible) return null;

// // //   const circumference = 2 * Math.PI * 40;
// // //   const gradId = `sg-${title.replace(/\s/g, "")}`;

// // //   return (
// // //     <div
// // //       style={{
// // //         position: "absolute",
// // //         inset: 0,
// // //         zIndex: 9999,
// // //         background: "#060610",
// // //         display: "flex",
// // //         flexDirection: "column",
// // //         alignItems: "center",
// // //         justifyContent: "center",
// // //         overflow: "hidden",
// // //       }}
// // //     >
// // //       <style>{`
// // //         @keyframes sp-pop {
// // //           0%   { transform: scale(0.6); opacity: 0; }
// // //           60%  { transform: scale(1.1); opacity: 1; }
// // //           100% { transform: scale(1); opacity: 1; }
// // //         }
// // //         @keyframes sp-ring-draw {
// // //           from { stroke-dashoffset: ${circumference}; }
// // //           to   { stroke-dashoffset: 0; }
// // //         }
// // //         @keyframes sp-ring-fade {
// // //           0%   { opacity: 0; }
// // //           25%  { opacity: 1; }
// // //           75%  { opacity: 1; }
// // //           100% { opacity: 0; }
// // //         }
// // //         @keyframes sp-fadeup {
// // //           from { opacity: 0; transform: translateY(6px); }
// // //           to   { opacity: 1; transform: translateY(0); }
// // //         }
// // //         @keyframes sp-wipe {
// // //           from { width: 0%; }
// // //           to   { width: 100%; }
// // //         }
// // //       `}</style>

// // //       {/* Particles */}
// // //       <canvas
// // //         ref={canvasRef}
// // //         style={{
// // //           position: "absolute",
// // //           inset: 0,
// // //           width: "100%",
// // //           height: "100%",
// // //         }}
// // //       />

// // //       {/* Center content */}
// // //       <div
// // //         style={{
// // //           position: "relative",
// // //           zIndex: 2,
// // //           display: "flex",
// // //           flexDirection: "column",
// // //           alignItems: "center",
// // //           gap: 14,
// // //         }}
// // //       >
// // //         {/* Ring + Icon */}
// // //         <div
// // //           style={{
// // //             position: "relative",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //           }}
// // //         >
// // //           <svg
// // //             width="90"
// // //             height="90"
// // //             viewBox="0 0 90 90"
// // //             style={{
// // //               position: "absolute",
// // //               // ring-fade: was 2s 0.2s → now 0.22s 0.02s
// // //               animation: "sp-ring-fade 0.22s 0.02s ease forwards",
// // //               opacity: 0,
// // //             }}
// // //           >
// // //             <defs>
// // //               <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
// // //                 <stop offset="0%" stopColor={from} />
// // //                 <stop offset="100%" stopColor={to} />
// // //               </linearGradient>
// // //             </defs>
// // //             <circle
// // //               cx="45"
// // //               cy="45"
// // //               r="40"
// // //               fill="none"
// // //               stroke={`url(#${gradId})`}
// // //               strokeWidth="1.5"
// // //               strokeDasharray={circumference}
// // //               strokeDashoffset={circumference}
// // //               style={{
// // //                 // ring-draw: was 1s 0.3s → now 0.18s 0.03s
// // //                 animation: `sp-ring-draw 0.18s 0.03s ease forwards`,
// // //               }}
// // //             />
// // //           </svg>

// // //           <div
// // //             style={{
// // //               width: 52,
// // //               height: 52,
// // //               borderRadius: 15,
// // //               background: `linear-gradient(135deg, ${from}, ${to})`,
// // //               display: "flex",
// // //               alignItems: "center",
// // //               justifyContent: "center",
// // //               boxShadow: `0 0 24px rgba(${glow}, 0.4)`,
// // //               // sp-pop: was 0.55s 0.1s → now 0.12s 0.01s
// // //               animation:
// // //                 "sp-pop 0.12s 0.01s cubic-bezier(0.34,1.56,0.64,1) forwards",
// // //               opacity: 0,
// // //             }}
// // //           >
// // //             {icon}
// // //           </div>
// // //         </div>

// // //         {/* Title */}
// // //         <div
// // //           style={{
// // //             fontSize: 15,
// // //             fontWeight: 800,
// // //             color: "#f1f5f9",
// // //             letterSpacing: "-0.03em",
// // //             // sp-fadeup: was 0.4s 0.6s → now 0.1s 0.14s
// // //             animation: "sp-fadeup 0.1s 0.14s ease forwards",
// // //             opacity: 0,
// // //           }}
// // //         >
// // //           {title}
// // //         </div>
// // //       </div>

// // //       {/* Wipe line */}
// // //       <div
// // //         style={{
// // //           position: "absolute",
// // //           bottom: 0,
// // //           left: 0,
// // //           height: 2,
// // //           background: `linear-gradient(90deg, ${from}, ${to}, transparent)`,
// // //           // sp-wipe: was 1.4s 0.3s → now 0.24s 0.04s
// // //           animation: "sp-wipe 0.24s 0.04s ease forwards",
// // //           width: "0%",
// // //         }}
// // //       />
// // //     </div>
// // //   );
// // // }

// // // export default SplashScreen;

// // import { useEffect, useRef, useState } from "react";
// // import { useAuth } from "../hooks/useAuth";

// // function SplashScreen({ onDone, config = {} }) {
// //   const { user, loading } = useAuth();
// //   const [visible, setVisible] = useState(false);

// //   const {
// //     from = "#6366f1",
// //     to = "#8b5cf6",
// //     glow = "99,102,241",
// //     icon = null,
// //     title = "HelloStranger",
// //     duration = 2000,
// //   } = config;

// //   useEffect(() => {
// //     if (!loading && user) setVisible(true);
// //   }, [loading, user]);

// //   useEffect(() => {
// //     if (!visible) return;
// //     const timer = setTimeout(() => {
// //       setVisible(false);
// //       onDone?.();
// //     }, duration);
// //     return () => clearTimeout(timer);
// //   }, [visible]);

// //   if (!visible) return null;

// //   const gradId = `sg-${title.replace(/\s/g, "")}`;

// //   return (
// //     <div
// //       style={{
// //         position: "absolute",
// //         inset: 0,
// //         zIndex: 9999,
// //         background: "#060610",
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         overflow: "hidden",
// //       }}
// //     >
// //       <style>{`
// //         @keyframes sp-all {
// //           0%   { opacity: 0; transform: scale(0.72); }
// //           55%  { opacity: 1; transform: scale(1.08); }
// //           100% { opacity: 1; transform: scale(1); }
// //         }
// //         @keyframes sp-wipe {
// //           from { transform: scaleX(0); }
// //           to   { transform: scaleX(1); }
// //         }
// //       `}</style>

// //       {/* Bloom glow burst */}
// //       <div
// //         style={{
// //           position: "absolute",
// //           inset: 0,
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           pointerEvents: "none",
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: 200,
// //             height: 200,
// //             borderRadius: "50%",
// //             background: `radial-gradient(circle, rgba(${glow},0.28) 0%, transparent 70%)`,
// //             animation: "sp-all 0.28s cubic-bezier(0.34,1.4,0.64,1) forwards",
// //             opacity: 0,
// //           }}
// //         />
// //       </div>

// //       {/* Center content — everything pops as one unit */}
// //       <div
// //         style={{
// //           position: "relative",
// //           zIndex: 2,
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "center",
// //           gap: 14,
// //           animation: "sp-all 0.28s cubic-bezier(0.34,1.4,0.64,1) forwards",
// //           opacity: 0,
// //         }}
// //       >
// //         {/* Icon box */}
// //         <div
// //           style={{
// //             width: 56,
// //             height: 56,
// //             borderRadius: 16,
// //             background: `linear-gradient(135deg, ${from}, ${to})`,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             boxShadow: `0 0 32px rgba(${glow}, 0.45)`,
// //           }}
// //         >
// //           {icon}
// //         </div>

// //         {/* Title */}
// //         <div
// //           style={{
// //             fontSize: 15,
// //             fontWeight: 800,
// //             color: "#f1f5f9",
// //             letterSpacing: "-0.03em",
// //           }}
// //         >
// //           {title}
// //         </div>
// //       </div>

// //       {/* Wipe line */}
// //       <div
// //         style={{
// //           position: "absolute",
// //           bottom: 0,
// //           left: 0,
// //           right: 0,
// //           height: 2,
// //           background: `linear-gradient(90deg, ${from}, ${to}, transparent)`,
// //           transformOrigin: "left",
// //           animation: "sp-wipe 0.28s cubic-bezier(0.4,0,0.2,1) forwards",
// //           transform: "scaleX(0)",
// //         }}
// //       />
// //     </div>
// //   );
// // }

// // export default SplashScreen;

// // import { useEffect, useRef, useState } from "react";
// // import { useAuth } from "../hooks/useAuth";

// // function SplashScreen({ onDone, config = {} }) {
// //   const { user, loading } = useAuth();
// //   const [visible, setVisible] = useState(false);

// //   const {
// //     from = "#6366f1",
// //     to = "#8b5cf6",
// //     glow = "99,102,241",
// //     icon = null,
// //     iconBoxSize = 52,
// //     title = "HelloStranger",
// //     duration = 2000,
// //   } = config;

// //   useEffect(() => {
// //     if (!loading && user) setVisible(true);
// //   }, [loading, user]);

// //   useEffect(() => {
// //     if (!visible) return;
// //     const timer = setTimeout(() => {
// //       setVisible(false);
// //       onDone?.();
// //     }, duration);
// //     return () => clearTimeout(timer);
// //   }, [visible]);

// //   if (!visible) return null;

// //   return (
// //     <div
// //       style={{
// //         position: "absolute",
// //         inset: 0,
// //         zIndex: 9999,
// //         background: "#060610",
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         overflow: "hidden",
// //       }}
// //     >
// //       <style>{`
// //         @keyframes sp-all {
// //           0%   { opacity: 0; transform: scale(0.72); }
// //           55%  { opacity: 1; transform: scale(1.08); }
// //           100% { opacity: 1; transform: scale(1); }
// //         }
// //         @keyframes sp-wipe {
// //           from { transform: scaleX(0); }
// //           to   { transform: scaleX(1); }
// //         }
// //       `}</style>

// //       {/* Bloom glow burst */}
// //       <div
// //         style={{
// //           position: "absolute",
// //           inset: 0,
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           pointerEvents: "none",
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: iconBoxSize * 3,
// //             height: iconBoxSize * 3,
// //             borderRadius: "50%",
// //             background: `radial-gradient(circle, rgba(${glow},0.28) 0%, transparent 70%)`,
// //             animation: "sp-all 0.28s cubic-bezier(0.34,1.4,0.64,1) forwards",
// //             opacity: 0,
// //           }}
// //         />
// //       </div>

// //       {/* Center content */}
// //       <div
// //         style={{
// //           position: "relative",
// //           zIndex: 2,
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "center",
// //           gap: 18,
// //           animation: "sp-all 0.28s cubic-bezier(0.34,1.4,0.64,1) forwards",
// //           opacity: 0,
// //         }}
// //       >
// //         {/* Icon box — size controlled by iconBoxSize */}
// //         <div
// //           style={{
// //             width: iconBoxSize,
// //             height: iconBoxSize,
// //             borderRadius: iconBoxSize * 0.28,
// //             background: `linear-gradient(135deg, ${from}, ${to})`,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             boxShadow: `0 0 ${iconBoxSize * 0.6}px rgba(${glow}, 0.45)`,
// //           }}
// //         >
// //           {icon}
// //         </div>

// //         {/* Title */}
// //         <div
// //           style={{
// //             fontSize: 15,
// //             fontWeight: 800,
// //             color: "#f1f5f9",
// //             letterSpacing: "-0.03em",
// //           }}
// //         >
// //           {title}
// //         </div>
// //       </div>

// //       {/* Wipe line */}
// //       <div
// //         style={{
// //           position: "absolute",
// //           bottom: 0,
// //           left: 0,
// //           right: 0,
// //           height: 2,
// //           background: `linear-gradient(90deg, ${from}, ${to}, transparent)`,
// //           transformOrigin: "left",
// //           animation: "sp-wipe 0.28s cubic-bezier(0.4,0,0.2,1) forwards",
// //           transform: "scaleX(0)",
// //         }}
// //       />
// //     </div>
// //   );
// // }

// // export default SplashScreen;

// // import { useEffect, useState } from "react";
// // import { useAuth } from "../hooks/useAuth";

// // function SplashScreen({ onDone, config = {} }) {
// //   const { user, loading } = useAuth();
// //   const [visible, setVisible] = useState(false);

// //   const {
// //     from = "#6366f1",
// //     to = "#8b5cf6",
// //     glow = "99,102,241",
// //     icon = null,
// //     iconBoxSize = 52,
// //     title = "HelloStranger",
// //     duration = 2000,
// //   } = config;

// //   useEffect(() => {
// //     if (!loading && user) setVisible(true);
// //   }, [loading, user]);

// //   useEffect(() => {
// //     if (!visible) return;
// //     const timer = setTimeout(() => {
// //       setVisible(false);
// //       onDone?.();
// //     }, duration);
// //     return () => clearTimeout(timer);
// //   }, [visible]);

// //   if (!visible) return null;

// //   return (
// //     <div
// //       style={{
// //         position: "absolute",
// //         inset: 0,
// //         zIndex: 9999,
// //         background: "#050509",
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         overflow: "hidden",
// //       }}
// //     >
// //       <style>{`
// //         @keyframes sp-fade {
// //           0% {
// //             opacity: 0;
// //             transform: translateY(8px);
// //           }
// //           100% {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }

// //         @keyframes sp-gradient-shift {
// //           0% { transform: translateX(-10%); opacity: 0.6; }
// //           50% { transform: translateX(10%); opacity: 1; }
// //           100% { transform: translateX(-10%); opacity: 0.6; }
// //         }

// //         @keyframes sp-line {
// //           0% {
// //             transform: scaleX(0);
// //             opacity: 0;
// //           }
// //           20% {
// //             opacity: 1;
// //           }
// //           100% {
// //             transform: scaleX(1);
// //             opacity: 0.7;
// //           }
// //         }
// //       `}</style>

// //       {/* Subtle animated gradient background */}
// //       <div
// //         style={{
// //           position: "absolute",
// //           inset: 0,
// //           background: `linear-gradient(120deg, ${from}, ${to})`,
// //           opacity: 0.08,
// //           filter: "blur(80px)",
// //           animation: "sp-gradient-shift 6s ease-in-out infinite",
// //         }}
// //       />

// //       {/* Center content */}
// //       <div
// //         style={{
// //           position: "relative",
// //           zIndex: 2,
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "center",
// //           gap: 16,
// //           animation: "sp-fade 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
// //           opacity: 0,
// //         }}
// //       >
// //         {/* Icon */}
// //         <div
// //           style={{
// //             width: iconBoxSize,
// //             height: iconBoxSize,
// //             borderRadius: iconBoxSize * 0.28,
// //             background: `linear-gradient(135deg, ${from}, ${to})`,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             boxShadow: `0 8px 30px rgba(${glow}, 0.25)`,
// //           }}
// //         >
// //           {icon}
// //         </div>

// //         {/* Title */}
// //         <div
// //           style={{
// //             fontSize: 14,
// //             fontWeight: 600,
// //             color: "#e5e7eb",
// //             letterSpacing: "-0.02em",
// //             opacity: 0,
// //             animation: "sp-fade 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
// //             animationDelay: "0.1s",
// //           }}
// //         >
// //           {title}
// //         </div>
// //       </div>

// //       {/* Bottom progress line */}
// //       <div
// //         style={{
// //           position: "absolute",
// //           bottom: 0,
// //           left: 0,
// //           right: 0,
// //           height: 2,
// //           background: `linear-gradient(90deg, ${from}, ${to})`,
// //           transformOrigin: "left",
// //           animation: "sp-line 1.2s cubic-bezier(0.22,1,0.36,1) forwards",
// //           transform: "scaleX(0)",
// //         }}
// //       />
// //     </div>
// //   );
// // }

// // export default SplashScreen;

// import { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";

// function SplashScreen({ onDone, config = {} }) {
//   const { user, loading } = useAuth();
//   const [visible, setVisible] = useState(false);
//   const { duration = 2200 } = config;

//   useEffect(() => {
//     if (!loading && user) setVisible(true);
//   }, [loading, user]);

//   useEffect(() => {
//     if (!visible) return;
//     const timer = setTimeout(() => {
//       setVisible(false);
//       onDone?.();
//     }, duration);
//     return () => clearTimeout(timer);
//   }, [visible]);

//   if (!visible) return null;

//   return (
//     <div
//       style={{
//         position: "absolute",
//         inset: 0,
//         zIndex: 9999,
//         background: "#000",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: 32,
//       }}
//     >
//       <style>{`
//         @keyframes sp-up {
//           0%   { opacity: 0; transform: translateY(16px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes sp-sub {
//           0%   { opacity: 0; transform: translateY(8px); }
//           100% { opacity: 0.45; transform: translateY(0); }
//         }
//         @keyframes sp-scanline {
//           0%   { top: -18%; }
//           100% { top: 110%; }
//         }
//         @keyframes sp-flicker {
//           0%, 100% { opacity: 1; }
//           92%       { opacity: 1; }
//           93%       { opacity: 0.7; }
//           94%       { opacity: 1; }
//           97%       { opacity: 0.85; }
//           98%       { opacity: 1; }
//         }
//         @keyframes sp-dot {
//           0%, 100% { opacity: 0.3; transform: scale(0.85); }
//           50%       { opacity: 1;   transform: scale(1); }
//         }
//       `}</style>

//       {/* TV */}
//       <div
//         style={{
//           animation: "sp-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
//           opacity: 0,
//         }}
//       >
//         <svg
//           width="96"
//           height="96"
//           viewBox="0 0 96 96"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           style={{ animation: "sp-flicker 4s ease-in-out 0.8s infinite" }}
//         >
//           {/* Body */}
//           <rect x="8" y="18" width="80" height="54" rx="8" fill="#1a1a1a" />
//           <rect
//             x="8"
//             y="18"
//             width="80"
//             height="54"
//             rx="8"
//             stroke="#333"
//             strokeWidth="1"
//           />

//           {/* Screen bezel */}
//           <rect x="14" y="24" width="58" height="40" rx="4" fill="#0a0a0a" />

//           {/* Screen glow */}
//           <rect
//             x="14"
//             y="24"
//             width="58"
//             height="40"
//             rx="4"
//             fill="url(#screenGlow)"
//             opacity="0.6"
//           />

//           {/* Scanline */}
//           <clipPath id="screenClip">
//             <rect x="14" y="24" width="58" height="40" rx="4" />
//           </clipPath>
//           <rect
//             x="14"
//             width="58"
//             height="6"
//             fill="rgba(255,255,255,0.03)"
//             clipPath="url(#screenClip)"
//             style={{ animation: "sp-scanline 2.2s linear 1s infinite" }}
//           />

//           {/* Screen content — two people connecting */}
//           <circle cx="30" cy="41" r="5" fill="#444" />
//           <path
//             d="M22 53 Q30 47 38 53"
//             stroke="#444"
//             strokeWidth="1.5"
//             fill="none"
//             strokeLinecap="round"
//           />

//           <circle cx="56" cy="41" r="5" fill="#444" />
//           <path
//             d="M48 53 Q56 47 64 53"
//             stroke="#444"
//             strokeWidth="1.5"
//             fill="none"
//             strokeLinecap="round"
//           />

//           {/* Connection line with pulse dot */}
//           <line
//             x1="35"
//             y1="41"
//             x2="51"
//             y2="41"
//             stroke="#2a2a2a"
//             strokeWidth="1"
//             strokeDasharray="2 2"
//           />
//           <circle
//             cx="43"
//             cy="41"
//             r="2.5"
//             fill="#6366f1"
//             style={{ animation: "sp-dot 1.4s ease-in-out 0.5s infinite" }}
//           />

//           {/* Side controls */}
//           <rect x="76" y="28" width="6" height="6" rx="3" fill="#222" />
//           <rect x="76" y="38" width="6" height="3" rx="1.5" fill="#222" />
//           <rect x="76" y="44" width="6" height="3" rx="1.5" fill="#222" />

//           {/* Legs */}
//           <rect x="30" y="72" width="5" height="10" rx="2" fill="#1a1a1a" />
//           <rect x="61" y="72" width="5" height="10" rx="2" fill="#1a1a1a" />

//           {/* Antenna */}
//           <line
//             x1="38"
//             y1="18"
//             x2="28"
//             y2="6"
//             stroke="#333"
//             strokeWidth="2"
//             strokeLinecap="round"
//           />
//           <line
//             x1="58"
//             y1="18"
//             x2="68"
//             y2="6"
//             stroke="#333"
//             strokeWidth="2"
//             strokeLinecap="round"
//           />

//           <defs>
//             <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
//               <stop offset="0%" stopColor="#6366f1" stopOpacity="0.12" />
//               <stop offset="100%" stopColor="#000" stopOpacity="0" />
//             </radialGradient>
//           </defs>
//         </svg>
//       </div>

//       {/* Text block */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: 8,
//         }}
//       >
//         <div
//           style={{
//             fontSize: 20,
//             fontWeight: 600,
//             color: "#f1f5f9",
//             letterSpacing: "-0.03em",
//             opacity: 0,
//             animation: "sp-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s forwards",
//           }}
//         >
//           HelloStranger
//         </div>
//         <div
//           style={{
//             fontSize: 13,
//             color: "#94a3b8",
//             letterSpacing: "0.01em",
//             opacity: 0,
//             animation: "sp-sub 0.7s ease 0.55s forwards",
//           }}
//         >
//           find your people. make it real.
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SplashScreen;