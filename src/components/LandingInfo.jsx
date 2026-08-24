// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";

// // // function LandingInfo() {
// // //   const navigate = useNavigate();

// // //   return (
// // //     <main className="min-h-full flex items-center justify-center">
// // //       <div className="px-6 md:px-10 max-w-3xl text-center fade-up">
// // //         {/* HEADLINE */}
// // //         <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-purple-300 via-indigo-300 to-slate-200 bg-clip-text text-transparent">
// // //           Meet Strangers on
// // //           <br className="hidden md:block" /> Live Video
// // //         </h2>

// // //         {/* DESCRIPTION */}
// // //         <p className="text-white/70 text-base md:text-lg mb-10 leading-relaxed">
// // //           HelloStranger brings people together through random video chats,
// // //           available only to registered users. Accounts help us maintain a safer,
// // //           more respectful space for genuine human connections.
// // //         </p>

// // //         {/* BUTTONS */}
// // //         <div className="flex flex-col sm:flex-row gap-5 justify-center">
// // //           <button
// // //             onClick={() => navigate("/join")}
// // //             className="
// // //               px-10 py-3 rounded-xl
// // //               text-base md:text-lg font-semibold
// // //               text-white
// // //               bg-gradient-to-r from-purple-700 to-indigo-800
// // //               hover:scale-105
// // //               transition-all duration-300
// // //               shadow-xl
// // //             "
// // //           >
// // //             Join Now
// // //           </button>

// // //           <button
// // //             onClick={() => navigate("/login")}
// // //             className="
// // //               px-10 py-3 rounded-xl
// // //               text-base md:text-lg font-medium
// // //               border border-white/20
// // //               bg-white/5 backdrop-blur-lg
// // //               hover:bg-white/10
// // //               transition-all duration-300
// // //             "
// // //           >
// // //             Login
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </main>
// // //   );
// // // }

// // // export default LandingInfo;

// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Video, Shield, Users } from "lucide-react";

// // function LandingInfo() {
// //   const navigate = useNavigate();

// //   return (
// //     <main className="min-h-full flex items-center justify-center px-4 py-12">
// //       <div className="w-full max-w-2xl text-center flex flex-col items-center gap-8">
// //         {/* BADGE */}
// //         <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
// //           <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
// //           <span className="text-[12px] text-indigo-300 font-medium tracking-wide">
// //             Live video chat — meet someone new
// //           </span>
// //         </div>

// //         {/* HEADLINE */}
// //         <div className="space-y-4">
// //           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
// //             Meet Strangers
// //             <br />
// //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
// //               on Live Video
// //             </span>
// //           </h1>
// //           <p className="text-[15px] sm:text-base text-white/50 leading-relaxed max-w-lg mx-auto">
// //             HelloStranger connects you with real people through random video
// //             chats. Accounts help us keep the space safe and respectful.
// //           </p>
// //         </div>

// //         {/* BUTTONS */}
// //         <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
// //           <button
// //             onClick={() => navigate("/join")}
// //             className="
// //               px-8 py-3 rounded-xl
// //               text-[14px] font-semibold text-white tracking-wide
// //               bg-indigo-600 hover:bg-indigo-500
// //               shadow-[0_0_28px_rgba(99,102,241,0.35)]
// //               hover:shadow-[0_0_36px_rgba(99,102,241,0.5)]
// //               active:scale-[0.97] transition-all duration-200
// //             "
// //           >
// //             Join Now
// //           </button>
// //           <button
// //             onClick={() => navigate("/login")}
// //             className="
// //               px-8 py-3 rounded-xl
// //               text-[14px] font-semibold text-white/70 hover:text-white tracking-wide
// //               border border-white/10 hover:bg-white/8
// //               active:scale-[0.97] transition-all duration-200
// //             "
// //           >
// //             Login
// //           </button>
// //         </div>

// //         {/* FEATURE PILLS */}
// //         <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
// //           {[
// //             { icon: Video, label: "Random video chat" },
// //             { icon: Shield, label: "Registered users only" },
// //             { icon: Users, label: "Real connections" },
// //           ].map(({ icon: Icon, label }) => (
// //             <div
// //               key={label}
// //               className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/8"
// //             >
// //               <Icon size={12} className="text-white/40" />
// //               <span className="text-[12px] text-white/40 tracking-wide">
// //                 {label}
// //               </span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }

// // export default LandingInfo;

// // import React, { useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Video, Shield, Users } from "lucide-react";

// // // ─── Canvas background ────────────────────────────────────────────────────────
// // function AnimatedBackground() {
// //   const canvasRef = useRef(null);

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext("2d");

// //     let W,
// //       H,
// //       nodes = [];
// //     let animId;
// //     let mouse = { x: -999, y: -999 };

// //     const COUNT = 55;
// //     const MAX_DIST = 160;
// //     const COLORS = [
// //       [99, 102, 241], // indigo
// //       [167, 139, 250], // violet
// //       [244, 114, 182], // pink
// //       [79, 70, 229], // deep indigo
// //       [139, 92, 246], // purple
// //     ];

// //     const nebulae = [
// //       { x: 0.15, y: 0.2, rx: 0.3, ry: 0.25, c: [79, 46, 200] },
// //       { x: 0.85, y: 0.75, rx: 0.28, ry: 0.22, c: [120, 40, 160] },
// //       { x: 0.5, y: 0.5, rx: 0.2, ry: 0.15, c: [60, 60, 220] },
// //       { x: 0.3, y: 0.8, rx: 0.22, ry: 0.18, c: [180, 50, 120] },
// //     ];

// //     const rand = (a, b) => a + Math.random() * (b - a);

// //     function createNode() {
// //       const c = COLORS[Math.floor(Math.random() * COLORS.length)];
// //       const isFrame = Math.random() < 0.08;
// //       return {
// //         x: rand(0, W),
// //         y: rand(0, H),
// //         vx: rand(-0.25, 0.25) * (isFrame ? 0.4 : 1),
// //         vy: rand(-0.25, 0.25) * (isFrame ? 0.4 : 1),
// //         r: isFrame ? rand(16, 28) : rand(2, 5),
// //         color: c,
// //         alpha: rand(0.3, 0.9),
// //         pulseSpeed: rand(0.008, 0.02),
// //         pulsePhase: rand(0, Math.PI * 2),
// //         isFrame,
// //       };
// //     }

// //     function resize() {
// //       W = canvas.width = canvas.offsetWidth;
// //       H = canvas.height = canvas.offsetHeight;
// //     }

// //     function init() {
// //       resize();
// //       nodes = Array.from({ length: COUNT }, createNode);
// //     }

// //     function drawBg() {
// //       ctx.fillStyle = "#050508";
// //       ctx.fillRect(0, 0, W, H);

// //       nebulae.forEach((nb) => {
// //         const gx = nb.x * W,
// //           gy = nb.y * H;
// //         const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, nb.rx * W);
// //         grad.addColorStop(0, `rgba(${nb.c[0]},${nb.c[1]},${nb.c[2]},0.13)`);
// //         grad.addColorStop(0.5, `rgba(${nb.c[0]},${nb.c[1]},${nb.c[2]},0.05)`);
// //         grad.addColorStop(1, "rgba(0,0,0,0)");
// //         ctx.fillStyle = grad;
// //         ctx.beginPath();
// //         ctx.ellipse(gx, gy, nb.rx * W, nb.ry * H, 0, 0, Math.PI * 2);
// //         ctx.fill();
// //       });
// //     }

// //     let tick = 0;
// //     function draw() {
// //       tick++;
// //       drawBg();

// //       // Connections between nodes
// //       for (let i = 0; i < nodes.length; i++) {
// //         for (let j = i + 1; j < nodes.length; j++) {
// //           const a = nodes[i],
// //             b = nodes[j];
// //           if (a.isFrame || b.isFrame) continue;
// //           const dx = a.x - b.x,
// //             dy = a.y - b.y;
// //           const dist = Math.sqrt(dx * dx + dy * dy);
// //           if (dist < MAX_DIST) {
// //             const t = 1 - dist / MAX_DIST;
// //             const cr = Math.round((a.color[0] + b.color[0]) / 2);
// //             const cg = Math.round((a.color[1] + b.color[1]) / 2);
// //             const cb = Math.round((a.color[2] + b.color[2]) / 2);
// //             ctx.beginPath();
// //             ctx.moveTo(a.x, a.y);
// //             ctx.lineTo(b.x, b.y);
// //             ctx.strokeStyle = `rgba(${cr},${cg},${cb},${t * 0.25})`;
// //             ctx.lineWidth = t * 1.2;
// //             ctx.stroke();
// //           }
// //         }
// //       }

// //       // Mouse connections
// //       nodes.forEach((n) => {
// //         if (n.isFrame) return;
// //         const dx = mouse.x - n.x,
// //           dy = mouse.y - n.y;
// //         const dist = Math.sqrt(dx * dx + dy * dy);
// //         if (dist < 180) {
// //           const t = 1 - dist / 180;
// //           ctx.beginPath();
// //           ctx.moveTo(n.x, n.y);
// //           ctx.lineTo(mouse.x, mouse.y);
// //           ctx.strokeStyle = `rgba(167,139,250,${t * 0.4})`;
// //           ctx.lineWidth = t * 1.5;
// //           ctx.stroke();
// //         }
// //       });

// //       // Draw nodes
// //       nodes.forEach((n) => {
// //         const pulse = Math.sin(tick * n.pulseSpeed + n.pulsePhase) * 0.3 + 0.7;
// //         const [r, g, b] = n.color;

// //         if (n.isFrame) {
// //           const fw = n.r * 4.5,
// //             fh = n.r * 3.5;
// //           ctx.save();
// //           ctx.globalAlpha = 0.18 * pulse;
// //           ctx.strokeStyle = `rgb(${r},${g},${b})`;
// //           ctx.lineWidth = 1.5;
// //           ctx.shadowColor = `rgb(${r},${g},${b})`;
// //           ctx.shadowBlur = 12;
// //           const rr = 5;
// //           ctx.beginPath();
// //           ctx.moveTo(n.x - fw / 2 + rr, n.y - fh / 2);
// //           ctx.lineTo(n.x + fw / 2 - rr, n.y - fh / 2);
// //           ctx.quadraticCurveTo(
// //             n.x + fw / 2,
// //             n.y - fh / 2,
// //             n.x + fw / 2,
// //             n.y - fh / 2 + rr,
// //           );
// //           ctx.lineTo(n.x + fw / 2, n.y + fh / 2 - rr);
// //           ctx.quadraticCurveTo(
// //             n.x + fw / 2,
// //             n.y + fh / 2,
// //             n.x + fw / 2 - rr,
// //             n.y + fh / 2,
// //           );
// //           ctx.lineTo(n.x - fw / 2 + rr, n.y + fh / 2);
// //           ctx.quadraticCurveTo(
// //             n.x - fw / 2,
// //             n.y + fh / 2,
// //             n.x - fw / 2,
// //             n.y + fh / 2 - rr,
// //           );
// //           ctx.lineTo(n.x - fw / 2, n.y - fh / 2 + rr);
// //           ctx.quadraticCurveTo(
// //             n.x - fw / 2,
// //             n.y - fh / 2,
// //             n.x - fw / 2 + rr,
// //             n.y - fh / 2,
// //           );
// //           ctx.closePath();
// //           ctx.stroke();
// //           ctx.globalAlpha = 0.06 * pulse;
// //           ctx.fillStyle = `rgb(${r},${g},${b})`;
// //           ctx.fill();
// //           ctx.restore();
// //         } else {
// //           const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
// //           glow.addColorStop(0, `rgba(${r},${g},${b},${0.6 * pulse * n.alpha})`);
// //           glow.addColorStop(
// //             0.4,
// //             `rgba(${r},${g},${b},${0.15 * pulse * n.alpha})`,
// //           );
// //           glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
// //           ctx.beginPath();
// //           ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
// //           ctx.fillStyle = glow;
// //           ctx.fill();
// //           ctx.beginPath();
// //           ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
// //           ctx.fillStyle = `rgba(${r},${g},${b},${0.9 * pulse})`;
// //           ctx.fill();
// //         }

// //         // Move & wrap
// //         n.x += n.vx;
// //         n.y += n.vy;
// //         if (n.x < -50) n.x = W + 50;
// //         if (n.x > W + 50) n.x = -50;
// //         if (n.y < -50) n.y = H + 50;
// //         if (n.y > H + 50) n.y = -50;
// //       });

// //       // Vignette
// //       const vig = ctx.createRadialGradient(
// //         W / 2,
// //         H / 2,
// //         0,
// //         W / 2,
// //         H / 2,
// //         Math.max(W, H) * 0.72,
// //       );
// //       vig.addColorStop(0, "rgba(0,0,0,0)");
// //       vig.addColorStop(1, "rgba(0,0,10,0.55)");
// //       ctx.fillStyle = vig;
// //       ctx.fillRect(0, 0, W, H);

// //       animId = requestAnimationFrame(draw);
// //     }

// //     const onMouseMove = (e) => {
// //       const rect = canvas.getBoundingClientRect();
// //       mouse.x = e.clientX - rect.left;
// //       mouse.y = e.clientY - rect.top;
// //     };
// //     const onTouchMove = (e) => {
// //       const rect = canvas.getBoundingClientRect();
// //       mouse.x = e.touches[0].clientX - rect.left;
// //       mouse.y = e.touches[0].clientY - rect.top;
// //     };
// //     const onResize = () => {
// //       resize();
// //       nodes.forEach((n) => {
// //         n.x = rand(0, W);
// //         n.y = rand(0, H);
// //       });
// //     };

// //     window.addEventListener("mousemove", onMouseMove);
// //     window.addEventListener("touchmove", onTouchMove);
// //     window.addEventListener("resize", onResize);

// //     init();
// //     draw();

// //     return () => {
// //       cancelAnimationFrame(animId);
// //       window.removeEventListener("mousemove", onMouseMove);
// //       window.removeEventListener("touchmove", onTouchMove);
// //       window.removeEventListener("resize", onResize);
// //     };
// //   }, []);

// //   return (
// //     <canvas
// //       ref={canvasRef}
// //       style={{
// //         position: "absolute",
// //         inset: 0,
// //         width: "100%",
// //         height: "100%",
// //         display: "block",
// //       }}
// //     />
// //   );
// // }

// // // ─── Main component ───────────────────────────────────────────────────────────
// // function LandingInfo() {
// //   const navigate = useNavigate();

// //   return (
// //     <div
// //       style={{
// //         position: "fixed",
// //         inset: 0,
// //         background: "#050508",
// //         overflow: "hidden",
// //       }}
// //     >
// //       {/* Animated canvas background */}
// //       <AnimatedBackground />

// //       {/* Foreground content */}
// //       <main className="relative z-10 h-full flex items-center justify-center px-4 py-12">
// //         <div className="w-full max-w-2xl text-center flex flex-col items-center gap-8">
// //           {/* BADGE */}
// //           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
// //             <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
// //             <span className="text-[12px] text-indigo-300 font-medium tracking-wide">
// //               Live video chat — meet someone new
// //             </span>
// //           </div>

// //           {/* HEADLINE */}
// //           <div className="space-y-4">
// //             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
// //               Meet Strangers
// //               <br />
// //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
// //                 on Live Video
// //               </span>
// //             </h1>
// //             <p className="text-[15px] sm:text-base text-white/50 leading-relaxed max-w-lg mx-auto">
// //               HelloStranger connects you with real people through random video
// //               chats. Accounts help us keep the space safe and respectful.
// //             </p>
// //           </div>

// //           {/* BUTTONS */}
// //           <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
// //             <button
// //               onClick={() => navigate("/join")}
// //               className="
// //                 px-8 py-3 rounded-xl
// //                 text-[14px] font-semibold text-white tracking-wide
// //                 bg-indigo-600 hover:bg-indigo-500
// //                 shadow-[0_0_28px_rgba(99,102,241,0.35)]
// //                 hover:shadow-[0_0_36px_rgba(99,102,241,0.5)]
// //                 active:scale-[0.97] transition-all duration-200
// //               "
// //             >
// //               Join Now
// //             </button>
// //             <button
// //               onClick={() => navigate("/login")}
// //               className="
// //                 px-8 py-3 rounded-xl
// //                 text-[14px] font-semibold text-white/70 hover:text-white tracking-wide
// //                 border border-white/10 hover:bg-white/8
// //                 active:scale-[0.97] transition-all duration-200
// //               "
// //             >
// //               Login
// //             </button>
// //           </div>

// //           {/* FEATURE PILLS */}
// //           <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
// //             {[
// //               { icon: Video, label: "Random video chat" },
// //               { icon: Shield, label: "Registered users only" },
// //               { icon: Users, label: "Real connections" },
// //             ].map(({ icon: Icon, label }) => (
// //               <div
// //                 key={label}
// //                 className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/8"
// //               >
// //                 <Icon size={12} className="text-white/40" />
// //                 <span className="text-[12px] text-white/40 tracking-wide">
// //                   {label}
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // export default LandingInfo;

// // // // import React, { useEffect, useRef, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";

// // // // // ─── Wavy SVG background with floating blobs ─────────────────────────────────
// // // // function WavyBackground() {
// // // //   const ref = useRef(null);

// // // //   useEffect(() => {
// // // //     let t = 0;
// // // //     let id;
// // // //     const el = ref.current;
// // // //     if (!el) return;

// // // //     const paths = el.querySelectorAll(".wave-path");

// // // //     function tick() {
// // // //       t += 0.012;
// // // //       paths.forEach((p, i) => {
// // // //         const phase = i * 1.1;
// // // //         const amp = 28 + i * 10;
// // // //         const freq = 0.0018 + i * 0.0004;
// // // //         const W = window.innerWidth;
// // // //         const yBase = 0.55 + i * 0.09;
// // // //         const H = window.innerHeight;
// // // //         const y = yBase * H;

// // // //         // Build a smooth wave path across the full width
// // // //         const pts = [];
// // // //         const steps = 24;
// // // //         for (let s = 0; s <= steps; s++) {
// // // //           const x = (s / steps) * W;
// // // //           const dy =
// // // //             Math.sin(x * freq + t + phase) * amp +
// // // //             Math.sin(x * freq * 1.7 + t * 0.7 + phase) * (amp * 0.4);
// // // //           pts.push([x, y + dy]);
// // // //         }

// // // //         const d = [
// // // //           `M 0 ${H}`,
// // // //           `L 0 ${pts[0][1]}`,
// // // //           ...pts.slice(1).map(([x, y]) => `L ${x} ${y}`),
// // // //           `L ${W} ${H}`,
// // // //           "Z",
// // // //         ].join(" ");

// // // //         p.setAttribute("d", d);
// // // //       });

// // // //       id = requestAnimationFrame(tick);
// // // //     }
// // // //     tick();
// // // //     return () => cancelAnimationFrame(id);
// // // //   }, []);

// // // //   return (
// // // //     <svg
// // // //       ref={ref}
// // // //       style={{
// // // //         position: "absolute",
// // // //         inset: 0,
// // // //         width: "100%",
// // // //         height: "100%",
// // // //         pointerEvents: "none",
// // // //       }}
// // // //       preserveAspectRatio="none"
// // // //     >
// // // //       <defs>
// // // //         <linearGradient id="w0" x1="0" y1="0" x2="1" y2="0">
// // // //           <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.18" />
// // // //           <stop offset="50%" stopColor="#c084fc" stopOpacity="0.22" />
// // // //           <stop offset="100%" stopColor="#818cf8" stopOpacity="0.18" />
// // // //         </linearGradient>
// // // //         <linearGradient id="w1" x1="0" y1="0" x2="1" y2="0">
// // // //           <stop offset="0%" stopColor="#fde68a" stopOpacity="0.13" />
// // // //           <stop offset="50%" stopColor="#fb923c" stopOpacity="0.16" />
// // // //           <stop offset="100%" stopColor="#f472b6" stopOpacity="0.13" />
// // // //         </linearGradient>
// // // //         <linearGradient id="w2" x1="0" y1="0" x2="1" y2="0">
// // // //           <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.1" />
// // // //           <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.14" />
// // // //           <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
// // // //         </linearGradient>
// // // //       </defs>
// // // //       <path className="wave-path" fill="url(#w0)" />
// // // //       <path className="wave-path" fill="url(#w1)" />
// // // //       <path className="wave-path" fill="url(#w2)" />
// // // //     </svg>
// // // //   );
// // // // }

// // // // // ─── Floating emoji orbs ──────────────────────────────────────────────────────
// // // // const FLOATERS = [
// // // //   { e: "👋", size: 36, x: 8, y: 18, dur: 7, delay: 0 },
// // // //   { e: "🎉", size: 28, x: 88, y: 12, dur: 9, delay: 1.2 },
// // // //   { e: "🌍", size: 32, x: 75, y: 72, dur: 8, delay: 0.5 },
// // // //   { e: "✨", size: 22, x: 14, y: 68, dur: 6, delay: 2 },
// // // //   { e: "🤩", size: 30, x: 92, y: 44, dur: 10, delay: 0.8 },
// // // //   { e: "💬", size: 26, x: 5, y: 45, dur: 8.5, delay: 1.6 },
// // // //   { e: "🔥", size: 24, x: 52, y: 88, dur: 7.5, delay: 3 },
// // // //   { e: "🎊", size: 20, x: 35, y: 8, dur: 9.5, delay: 0.3 },
// // // //   { e: "💫", size: 18, x: 65, y: 6, dur: 6.5, delay: 2.5 },
// // // //   { e: "🫶", size: 28, x: 80, y: 88, dur: 8, delay: 1 },
// // // // ];

// // // // function FloatingEmojis() {
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         position: "absolute",
// // // //         inset: 0,
// // // //         pointerEvents: "none",
// // // //         overflow: "hidden",
// // // //       }}
// // // //     >
// // // //       <style>{`
// // // //         @keyframes floatBob {
// // // //           0%, 100% { transform: translateY(0px) rotate(-4deg); }
// // // //           50% { transform: translateY(-18px) rotate(4deg); }
// // // //         }
// // // //       `}</style>
// // // //       {FLOATERS.map((f, i) => (
// // // //         <div
// // // //           key={i}
// // // //           style={{
// // // //             position: "absolute",
// // // //             left: `${f.x}%`,
// // // //             top: `${f.y}%`,
// // // //             fontSize: f.size,
// // // //             animation: `floatBob ${f.dur}s ease-in-out ${f.delay}s infinite`,
// // // //             opacity: 0.55,
// // // //             filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))",
// // // //             userSelect: "none",
// // // //           }}
// // // //         >
// // // //           {f.e}
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Blob mesh background ─────────────────────────────────────────────────────
// // // // function BlobMesh() {
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         position: "absolute",
// // // //         inset: 0,
// // // //         overflow: "hidden",
// // // //         pointerEvents: "none",
// // // //       }}
// // // //     >
// // // //       <style>{`
// // // //         @keyframes blobMove1 {
// // // //           0%,100% { transform: translate(0,0) scale(1); }
// // // //           33% { transform: translate(40px,-30px) scale(1.08); }
// // // //           66% { transform: translate(-20px,20px) scale(0.95); }
// // // //         }
// // // //         @keyframes blobMove2 {
// // // //           0%,100% { transform: translate(0,0) scale(1); }
// // // //           33% { transform: translate(-50px,20px) scale(1.05); }
// // // //           66% { transform: translate(30px,-40px) scale(0.97); }
// // // //         }
// // // //         @keyframes blobMove3 {
// // // //           0%,100% { transform: translate(0,0) scale(1); }
// // // //           50% { transform: translate(20px,30px) scale(1.1); }
// // // //         }
// // // //       `}</style>
// // // //       {/* Blob 1 — peach/coral top-left */}
// // // //       <div
// // // //         style={{
// // // //           position: "absolute",
// // // //           top: "-10%",
// // // //           left: "-10%",
// // // //           width: 520,
// // // //           height: 520,
// // // //           borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
// // // //           background:
// // // //             "radial-gradient(circle at 40% 40%, #fecaca 0%, #fda4af 40%, #f9a8d4 100%)",
// // // //           opacity: 0.28,
// // // //           animation: "blobMove1 14s ease-in-out infinite",
// // // //           filter: "blur(40px)",
// // // //         }}
// // // //       />
// // // //       {/* Blob 2 — lavender top-right */}
// // // //       <div
// // // //         style={{
// // // //           position: "absolute",
// // // //           top: "-15%",
// // // //           right: "-12%",
// // // //           width: 580,
// // // //           height: 480,
// // // //           borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
// // // //           background:
// // // //             "radial-gradient(circle at 60% 30%, #e9d5ff 0%, #c4b5fd 50%, #a78bfa 100%)",
// // // //           opacity: 0.25,
// // // //           animation: "blobMove2 17s ease-in-out infinite",
// // // //           filter: "blur(50px)",
// // // //         }}
// // // //       />
// // // //       {/* Blob 3 — mint bottom center */}
// // // //       <div
// // // //         style={{
// // // //           position: "absolute",
// // // //           bottom: "-15%",
// // // //           left: "30%",
// // // //           width: 480,
// // // //           height: 400,
// // // //           borderRadius: "50% 50% 40% 60% / 40% 60% 40% 60%",
// // // //           background:
// // // //             "radial-gradient(circle at 50% 70%, #a7f3d0 0%, #6ee7b7 50%, #34d399 100%)",
// // // //           opacity: 0.18,
// // // //           animation: "blobMove3 12s ease-in-out infinite",
// // // //           filter: "blur(45px)",
// // // //         }}
// // // //       />
// // // //       {/* Blob 4 — yellow bottom-left */}
// // // //       <div
// // // //         style={{
// // // //           position: "absolute",
// // // //           bottom: "-8%",
// // // //           left: "-8%",
// // // //           width: 380,
// // // //           height: 380,
// // // //           borderRadius: "70% 30% 50% 50% / 30% 70% 30% 70%",
// // // //           background:
// // // //             "radial-gradient(circle at 30% 60%, #fef08a 0%, #fde047 60%, #facc15 100%)",
// // // //           opacity: 0.18,
// // // //           animation: "blobMove2 19s ease-in-out 2s infinite",
// // // //           filter: "blur(40px)",
// // // //         }}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Avatar stack (fake preview of "people online") ──────────────────────────
// // // // const AVATARS = [
// // // //   { emoji: "🧑‍🦱", bg: "#fde68a" },
// // // //   { emoji: "👩‍🦰", bg: "#fca5a5" },
// // // //   { emoji: "🧔", bg: "#a5b4fc" },
// // // //   { emoji: "👩‍🦳", bg: "#6ee7b7" },
// // // //   { emoji: "🧑‍🦲", bg: "#fdba74" },
// // // // ];

// // // // function AvatarStack() {
// // // //   return (
// // // //     <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
// // // //       <div style={{ display: "flex" }}>
// // // //         {AVATARS.map((a, i) => (
// // // //           <div
// // // //             key={i}
// // // //             style={{
// // // //               width: 32,
// // // //               height: 32,
// // // //               borderRadius: "50%",
// // // //               background: a.bg,
// // // //               border: "2.5px solid #fff",
// // // //               display: "flex",
// // // //               alignItems: "center",
// // // //               justifyContent: "center",
// // // //               fontSize: 16,
// // // //               marginLeft: i === 0 ? 0 : -10,
// // // //               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // //               zIndex: AVATARS.length - i,
// // // //               position: "relative",
// // // //             }}
// // // //           >
// // // //             {a.emoji}
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //       <div>
// // // //         <div
// // // //           style={{
// // // //             fontSize: 12,
// // // //             fontWeight: 700,
// // // //             color: "#1e1b4b",
// // // //             letterSpacing: "-0.01em",
// // // //           }}
// // // //         >
// // // //           2,400+ online
// // // //         </div>
// // // //         <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
// // // //           <div
// // // //             style={{
// // // //               width: 6,
// // // //               height: 6,
// // // //               borderRadius: "50%",
// // // //               background: "#22c55e",
// // // //               boxShadow: "0 0 0 2px rgba(34,197,94,0.25)",
// // // //             }}
// // // //           />
// // // //           <span style={{ fontSize: 11, color: "#6b7280" }}>
// // // //             Meeting right now
// // // //           </span>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Animated chat bubble preview ─────────────────────────────────────────────
// // // // const MESSAGES = [
// // // //   { side: "left", text: "hey! where are you from? 👋", delay: 0 },
// // // //   { side: "right", text: "Tokyo! you? 🗼", delay: 1.4 },
// // // //   { side: "left", text: "NYC 🗽 this is so cool", delay: 2.8 },
// // // //   { side: "right", text: "ikr! first time trying this 😄", delay: 4.2 },
// // // //   { side: "left", text: "same! let's keep chatting ✨", delay: 5.6 },
// // // // ];

// // // // function ChatPreview() {
// // // //   const [visible, setVisible] = useState([]);

// // // //   useEffect(() => {
// // // //     MESSAGES.forEach((_, i) => {
// // // //       setTimeout(
// // // //         () => {
// // // //           setVisible((v) => [...v, i]);
// // // //         },
// // // //         MESSAGES[i].delay * 1000 + 600,
// // // //       );
// // // //     });
// // // //   }, []);

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         background: "rgba(255,255,255,0.82)",
// // // //         backdropFilter: "blur(20px)",
// // // //         borderRadius: 20,
// // // //         border: "1px solid rgba(255,255,255,0.9)",
// // // //         boxShadow:
// // // //           "0 8px 40px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
// // // //         padding: "16px 14px",
// // // //         width: "100%",
// // // //         maxWidth: 280,
// // // //       }}
// // // //     >
// // // //       {/* Chat header */}
// // // //       <div
// // // //         style={{
// // // //           display: "flex",
// // // //           alignItems: "center",
// // // //           gap: 8,
// // // //           marginBottom: 14,
// // // //           paddingBottom: 12,
// // // //           borderBottom: "1px solid rgba(0,0,0,0.06)",
// // // //         }}
// // // //       >
// // // //         <div style={{ fontSize: 22 }}>💬</div>
// // // //         <div>
// // // //           <div style={{ fontSize: 12, fontWeight: 700, color: "#1e1b4b" }}>
// // // //             Live chats happening
// // // //           </div>
// // // //           <div style={{ fontSize: 11, color: "#9ca3af" }}>
// // // //             right now around the world
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //       {/* Messages */}
// // // //       <div
// // // //         style={{
// // // //           display: "flex",
// // // //           flexDirection: "column",
// // // //           gap: 8,
// // // //           minHeight: 140,
// // // //         }}
// // // //       >
// // // //         {MESSAGES.map((m, i) => (
// // // //           <div
// // // //             key={i}
// // // //             style={{
// // // //               display: "flex",
// // // //               justifyContent: m.side === "right" ? "flex-end" : "flex-start",
// // // //               opacity: visible.includes(i) ? 1 : 0,
// // // //               transform: visible.includes(i)
// // // //                 ? "translateY(0) scale(1)"
// // // //                 : `translateY(8px) scale(0.95)`,
// // // //               transition: "opacity 0.35s ease, transform 0.35s ease",
// // // //             }}
// // // //           >
// // // //             <div
// // // //               style={{
// // // //                 background:
// // // //                   m.side === "left"
// // // //                     ? "linear-gradient(135deg, #f3f4f6, #e9ecef)"
// // // //                     : "linear-gradient(135deg, #6366f1, #8b5cf6)",
// // // //                 color: m.side === "left" ? "#1f2937" : "#fff",
// // // //                 borderRadius:
// // // //                   m.side === "left"
// // // //                     ? "14px 14px 14px 4px"
// // // //                     : "14px 14px 4px 14px",
// // // //                 padding: "8px 12px",
// // // //                 fontSize: 12.5,
// // // //                 fontWeight: 500,
// // // //                 maxWidth: "82%",
// // // //                 lineHeight: 1.4,
// // // //                 boxShadow:
// // // //                   m.side === "right"
// // // //                     ? "0 4px 12px rgba(99,102,241,0.3)"
// // // //                     : "0 2px 6px rgba(0,0,0,0.06)",
// // // //               }}
// // // //             >
// // // //               {m.text}
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Feature pill ─────────────────────────────────────────────────────────────
// // // // function Pill({ emoji, label }) {
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         display: "inline-flex",
// // // //         alignItems: "center",
// // // //         gap: 6,
// // // //         padding: "7px 14px",
// // // //         borderRadius: 99,
// // // //         background: "rgba(255,255,255,0.7)",
// // // //         border: "1px solid rgba(255,255,255,0.9)",
// // // //         backdropFilter: "blur(8px)",
// // // //         boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
// // // //         fontSize: 12.5,
// // // //         fontWeight: 600,
// // // //         color: "#374151",
// // // //         whiteSpace: "nowrap",
// // // //       }}
// // // //     >
// // // //       <span style={{ fontSize: 15 }}>{emoji}</span>
// // // //       {label}
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Main component ───────────────────────────────────────────────────────────
// // // // export default function LandingInfo() {
// // // //   const navigate = useNavigate();
// // // //   const [mounted, setMounted] = useState(false);

// // // //   useEffect(() => {
// // // //     setTimeout(() => setMounted(true), 80);
// // // //   }, []);

// // // //   const anim = (delay = 0) => ({
// // // //     opacity: mounted ? 1 : 0,
// // // //     transform: mounted ? "none" : "translateY(18px)",
// // // //     transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
// // // //   });

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         position: "fixed",
// // // //         inset: 0,
// // // //         background:
// // // //           "linear-gradient(160deg, #fdf4ff 0%, #fef9ee 35%, #f0f9ff 65%, #f5f3ff 100%)",
// // // //         overflowY: "auto",
// // // //         overflowX: "hidden",
// // // //         WebkitOverflowScrolling: "touch",
// // // //         fontFamily: "'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif",
// // // //       }}
// // // //     >
// // // //       <style>{`
// // // //         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

// // // //         @keyframes shimmerBtn {
// // // //           0%   { background-position: -200% center; }
// // // //           100% { background-position: 200% center; }
// // // //         }

// // // //         /* --- Buttons --- */
// // // //         .btn-primary {
// // // //           width: 100%;
// // // //           padding: 15px 28px;
// // // //           border-radius: 14px;
// // // //           border: none;
// // // //           cursor: pointer;
// // // //           font-size: 15px;
// // // //           font-weight: 800;
// // // //           color: #fff;
// // // //           letter-spacing: -0.01em;
// // // //           background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
// // // //           background-size: 200% auto;
// // // //           box-shadow: 0 4px 24px rgba(99,102,241,0.4), 0 1px 0 rgba(255,255,255,0.2) inset;
// // // //           transition: transform 0.18s ease, box-shadow 0.18s ease;
// // // //           font-family: inherit;
// // // //           -webkit-tap-highlight-color: transparent;
// // // //           touch-action: manipulation;
// // // //         }
// // // //         .btn-primary:hover {
// // // //           transform: translateY(-2px) scale(1.02);
// // // //           box-shadow: 0 8px 32px rgba(99,102,241,0.5), 0 1px 0 rgba(255,255,255,0.2) inset;
// // // //           animation: shimmerBtn 1.4s linear infinite;
// // // //         }
// // // //         .btn-primary:active { transform: scale(0.97); }

// // // //         .btn-secondary {
// // // //           width: 100%;
// // // //           padding: 15px 28px;
// // // //           border-radius: 14px;
// // // //           border: 1.5px solid rgba(99,102,241,0.25);
// // // //           cursor: pointer;
// // // //           font-size: 15px;
// // // //           font-weight: 700;
// // // //           color: #6366f1;
// // // //           background: rgba(255,255,255,0.7);
// // // //           backdrop-filter: blur(8px);
// // // //           transition: all 0.18s ease;
// // // //           font-family: inherit;
// // // //           letter-spacing: -0.01em;
// // // //           -webkit-tap-highlight-color: transparent;
// // // //           touch-action: manipulation;
// // // //         }
// // // //         .btn-secondary:hover {
// // // //           background: rgba(255,255,255,0.95);
// // // //           border-color: rgba(99,102,241,0.5);
// // // //           box-shadow: 0 4px 16px rgba(99,102,241,0.15);
// // // //         }
// // // //         .btn-secondary:active { transform: scale(0.97); }

// // // //         /* --- Layout grid --- */
// // // //         .landing-grid {
// // // //           display: flex;
// // // //           flex-direction: column;
// // // //           align-items: center;
// // // //           gap: 32px;
// // // //         }
// // // //         .landing-text { width: 100%; text-align: center; }
// // // //         .landing-chat { display: none; }

// // // //         /* --- Tablet+ (≥700px): side by side --- */
// // // //         @media (min-width: 700px) {
// // // //           .landing-grid {
// // // //             flex-direction: row;
// // // //             align-items: center;
// // // //             justify-content: center;
// // // //             gap: 48px;
// // // //             text-align: left;
// // // //           }
// // // //           .landing-text { text-align: left; flex: 1; max-width: 520px; }
// // // //           .landing-chat { display: block; flex-shrink: 0; }
// // // //           .btn-primary, .btn-secondary { width: auto; }
// // // //           .btn-row { justify-content: flex-start !important; }
// // // //           .pill-row { justify-content: flex-start !important; }
// // // //           .badge-wrap { margin: 0 !important; }
// // // //           .avatar-wrap { justify-content: flex-start !important; }
// // // //         }
// // // //       `}</style>

// // // //       {/* Background layers — pointer-events none so scroll works */}
// // // //       <div
// // // //         style={{
// // // //           position: "fixed",
// // // //           inset: 0,
// // // //           pointerEvents: "none",
// // // //           zIndex: 0,
// // // //         }}
// // // //       >
// // // //         <BlobMesh />
// // // //         <WavyBackground />
// // // //         <FloatingEmojis />
// // // //         {/* Grain */}
// // // //         <div
// // // //           style={{
// // // //             position: "absolute",
// // // //             inset: 0,
// // // //             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
// // // //             opacity: 0.4,
// // // //           }}
// // // //         />
// // // //       </div>

// // // //       {/* Scrollable content */}
// // // //       <main
// // // //         style={{
// // // //           position: "relative",
// // // //           zIndex: 10,
// // // //           minHeight: "100%",
// // // //           display: "flex",
// // // //           alignItems: "center",
// // // //           justifyContent: "center",
// // // //           padding: "48px 20px 56px",
// // // //           boxSizing: "border-box",
// // // //         }}
// // // //       >
// // // //         <div style={{ width: "100%", maxWidth: 960 }} className="landing-grid">
// // // //           {/* ── Text column ── */}
// // // //           <div
// // // //             className="landing-text"
// // // //             style={{ display: "flex", flexDirection: "column", gap: 20 }}
// // // //           >
// // // //             {/* Badge */}
// // // //             <div
// // // //               style={{ display: "flex", justifyContent: "center" }}
// // // //               className="badge-wrap"
// // // //             >
// // // //               <div
// // // //                 style={{
// // // //                   ...anim(0),
// // // //                   display: "inline-flex",
// // // //                   alignItems: "center",
// // // //                   gap: 7,
// // // //                   padding: "7px 14px",
// // // //                   borderRadius: 99,
// // // //                   background: "rgba(255,255,255,0.75)",
// // // //                   border: "1px solid rgba(255,255,255,0.95)",
// // // //                   backdropFilter: "blur(12px)",
// // // //                   boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
// // // //                 }}
// // // //               >
// // // //                 <span style={{ fontSize: 14 }}>🌐</span>
// // // //                 <span
// // // //                   style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}
// // // //                 >
// // // //                   Random video chat for real people
// // // //                 </span>
// // // //                 <div
// // // //                   style={{
// // // //                     width: 7,
// // // //                     height: 7,
// // // //                     borderRadius: "50%",
// // // //                     background: "#22c55e",
// // // //                     boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
// // // //                   }}
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             {/* Headline */}
// // // //             <div style={anim(0.1)}>
// // // //               <h1
// // // //                 style={{
// // // //                   margin: 0,
// // // //                   fontSize: "clamp(34px, 8vw, 72px)",
// // // //                   fontWeight: 900,
// // // //                   lineHeight: 1.06,
// // // //                   letterSpacing: "-0.03em",
// // // //                   color: "#0f0a1e",
// // // //                 }}
// // // //               >
// // // //                 Meet your next
// // // //                 <br />
// // // //                 <span
// // // //                   style={{
// // // //                     background:
// // // //                       "linear-gradient(135deg, #6366f1 0%, #a855f7 45%, #ec4899 100%)",
// // // //                     WebkitBackgroundClip: "text",
// // // //                     WebkitTextFillColor: "transparent",
// // // //                     backgroundClip: "text",
// // // //                   }}
// // // //                 >
// // // //                   stranger
// // // //                 </span>
// // // //                 <span style={{ marginLeft: 10 }}>👋</span>
// // // //               </h1>
// // // //               <p
// // // //                 style={{
// // // //                   margin: "14px 0 0",
// // // //                   fontSize: "clamp(14px, 3.5vw, 17px)",
// // // //                   lineHeight: 1.65,
// // // //                   color: "#6b7280",
// // // //                   fontWeight: 500,
// // // //                   maxWidth: 400,
// // // //                   marginLeft: "auto",
// // // //                   marginRight: "auto",
// // // //                 }}
// // // //               >
// // // //                 Spontaneous video chats with real people from around the world.
// // // //                 No algorithms. No feeds. Just a conversation. ✨
// // // //               </p>
// // // //             </div>

// // // //             {/* Avatar stack */}
// // // //             <div
// // // //               style={{
// // // //                 ...anim(0.2),
// // // //                 display: "flex",
// // // //                 justifyContent: "center",
// // // //               }}
// // // //               className="avatar-wrap"
// // // //             >
// // // //               <AvatarStack />
// // // //             </div>

// // // //             {/* CTA buttons — full width stacked on mobile, inline on desktop */}
// // // //             <div
// // // //               className="btn-row"
// // // //               style={{
// // // //                 ...anim(0.3),
// // // //                 display: "flex",
// // // //                 flexDirection: "column",
// // // //                 gap: 10,
// // // //                 justifyContent: "center",
// // // //               }}
// // // //             >
// // // //               <button className="btn-primary" onClick={() => navigate("/join")}>
// // // //                 Start chatting — it&apos;s free 🚀
// // // //               </button>
// // // //               <button
// // // //                 className="btn-secondary"
// // // //                 onClick={() => navigate("/login")}
// // // //               >
// // // //                 Login
// // // //               </button>
// // // //             </div>

// // // //             {/* Feature pills */}
// // // //             <div
// // // //               className="pill-row"
// // // //               style={{
// // // //                 ...anim(0.4),
// // // //                 display: "flex",
// // // //                 gap: 8,
// // // //                 flexWrap: "wrap",
// // // //                 justifyContent: "center",
// // // //               }}
// // // //             >
// // // //               <Pill emoji="🎥" label="Live video" />
// // // //               <Pill emoji="🛡️" label="Safe & registered" />
// // // //               <Pill emoji="🌍" label="50+ countries" />
// // // //               <Pill emoji="⚡" label="Instant match" />
// // // //             </div>
// // // //           </div>

// // // //           {/* ── Chat preview (hidden on mobile, shown on ≥700px) ── */}
// // // //           <div
// // // //             className="landing-chat"
// // // //             style={{
// // // //               ...anim(0.25),
// // // //               transform: mounted ? "rotate(-2deg)" : "rotate(-2deg) scale(0.9)",
// // // //               transition:
// // // //                 "opacity 0.65s ease 0.25s, transform 0.65s ease 0.25s",
// // // //             }}
// // // //           >
// // // //             <ChatPreview />
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }

// import React, { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Video, Shield, Users } from "lucide-react";

// // ─── Canvas background ────────────────────────────────────────────────────────
// function AnimatedBackground() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     let W,
//       H,
//       nodes = [];
//     let animId;
//     let mouse = { x: -999, y: -999 };

//     const COUNT = 55;
//     const MAX_DIST = 160;
//     const COLORS = [
//       [99, 102, 241], // indigo
//       [167, 139, 250], // violet
//       [244, 114, 182], // pink
//       [79, 70, 229], // deep indigo
//       [139, 92, 246], // purple
//     ];

//     const nebulae = [
//       { x: 0.15, y: 0.2, rx: 0.3, ry: 0.25, c: [79, 46, 200] },
//       { x: 0.85, y: 0.75, rx: 0.28, ry: 0.22, c: [120, 40, 160] },
//       { x: 0.5, y: 0.5, rx: 0.2, ry: 0.15, c: [60, 60, 220] },
//       { x: 0.3, y: 0.8, rx: 0.22, ry: 0.18, c: [180, 50, 120] },
//     ];

//     const rand = (a, b) => a + Math.random() * (b - a);

//     function createNode() {
//       const c = COLORS[Math.floor(Math.random() * COLORS.length)];
//       const isFrame = Math.random() < 0.08;
//       return {
//         x: rand(0, W),
//         y: rand(0, H),
//         vx: rand(-0.25, 0.25) * (isFrame ? 0.4 : 1),
//         vy: rand(-0.25, 0.25) * (isFrame ? 0.4 : 1),
//         r: isFrame ? rand(16, 28) : rand(2, 5),
//         color: c,
//         alpha: rand(0.3, 0.9),
//         pulseSpeed: rand(0.008, 0.02),
//         pulsePhase: rand(0, Math.PI * 2),
//         isFrame,
//       };
//     }

//     function resize() {
//       W = canvas.width = canvas.offsetWidth;
//       H = canvas.height = canvas.offsetHeight;
//     }

//     function init() {
//       resize();
//       nodes = Array.from({ length: COUNT }, createNode);
//     }

//     function drawBg() {
//       ctx.fillStyle = "#050508";
//       ctx.fillRect(0, 0, W, H);

//       nebulae.forEach((nb) => {
//         const gx = nb.x * W,
//           gy = nb.y * H;
//         const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, nb.rx * W);
//         grad.addColorStop(0, `rgba(${nb.c[0]},${nb.c[1]},${nb.c[2]},0.13)`);
//         grad.addColorStop(0.5, `rgba(${nb.c[0]},${nb.c[1]},${nb.c[2]},0.05)`);
//         grad.addColorStop(1, "rgba(0,0,0,0)");
//         ctx.fillStyle = grad;
//         ctx.beginPath();
//         ctx.ellipse(gx, gy, nb.rx * W, nb.ry * H, 0, 0, Math.PI * 2);
//         ctx.fill();
//       });
//     }

//     let tick = 0;
//     function draw() {
//       tick++;
//       drawBg();

//       // Connections between nodes
//       for (let i = 0; i < nodes.length; i++) {
//         for (let j = i + 1; j < nodes.length; j++) {
//           const a = nodes[i],
//             b = nodes[j];
//           if (a.isFrame || b.isFrame) continue;
//           const dx = a.x - b.x,
//             dy = a.y - b.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist < MAX_DIST) {
//             const t = 1 - dist / MAX_DIST;
//             const cr = Math.round((a.color[0] + b.color[0]) / 2);
//             const cg = Math.round((a.color[1] + b.color[1]) / 2);
//             const cb = Math.round((a.color[2] + b.color[2]) / 2);
//             ctx.beginPath();
//             ctx.moveTo(a.x, a.y);
//             ctx.lineTo(b.x, b.y);
//             ctx.strokeStyle = `rgba(${cr},${cg},${cb},${t * 0.25})`;
//             ctx.lineWidth = t * 1.2;
//             ctx.stroke();
//           }
//         }
//       }

//       // Mouse connections
//       nodes.forEach((n) => {
//         if (n.isFrame) return;
//         const dx = mouse.x - n.x,
//           dy = mouse.y - n.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         if (dist < 180) {
//           const t = 1 - dist / 180;
//           ctx.beginPath();
//           ctx.moveTo(n.x, n.y);
//           ctx.lineTo(mouse.x, mouse.y);
//           ctx.strokeStyle = `rgba(167,139,250,${t * 0.4})`;
//           ctx.lineWidth = t * 1.5;
//           ctx.stroke();
//         }
//       });

//       // Draw nodes
//       nodes.forEach((n) => {
//         const pulse = Math.sin(tick * n.pulseSpeed + n.pulsePhase) * 0.3 + 0.7;
//         const [r, g, b] = n.color;

//         if (n.isFrame) {
//           const fw = n.r * 4.5,
//             fh = n.r * 3.5;
//           ctx.save();
//           ctx.globalAlpha = 0.18 * pulse;
//           ctx.strokeStyle = `rgb(${r},${g},${b})`;
//           ctx.lineWidth = 1.5;
//           ctx.shadowColor = `rgb(${r},${g},${b})`;
//           ctx.shadowBlur = 12;
//           const rr = 5;
//           ctx.beginPath();
//           ctx.moveTo(n.x - fw / 2 + rr, n.y - fh / 2);
//           ctx.lineTo(n.x + fw / 2 - rr, n.y - fh / 2);
//           ctx.quadraticCurveTo(
//             n.x + fw / 2,
//             n.y - fh / 2,
//             n.x + fw / 2,
//             n.y - fh / 2 + rr,
//           );
//           ctx.lineTo(n.x + fw / 2, n.y + fh / 2 - rr);
//           ctx.quadraticCurveTo(
//             n.x + fw / 2,
//             n.y + fh / 2,
//             n.x + fw / 2 - rr,
//             n.y + fh / 2,
//           );
//           ctx.lineTo(n.x - fw / 2 + rr, n.y + fh / 2);
//           ctx.quadraticCurveTo(
//             n.x - fw / 2,
//             n.y + fh / 2,
//             n.x - fw / 2,
//             n.y + fh / 2 - rr,
//           );
//           ctx.lineTo(n.x - fw / 2, n.y - fh / 2 + rr);
//           ctx.quadraticCurveTo(
//             n.x - fw / 2,
//             n.y - fh / 2,
//             n.x - fw / 2 + rr,
//             n.y - fh / 2,
//           );
//           ctx.closePath();
//           ctx.stroke();
//           ctx.globalAlpha = 0.06 * pulse;
//           ctx.fillStyle = `rgb(${r},${g},${b})`;
//           ctx.fill();
//           ctx.restore();
//         } else {
//           const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
//           glow.addColorStop(0, `rgba(${r},${g},${b},${0.6 * pulse * n.alpha})`);
//           glow.addColorStop(
//             0.4,
//             `rgba(${r},${g},${b},${0.15 * pulse * n.alpha})`,
//           );
//           glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
//           ctx.beginPath();
//           ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
//           ctx.fillStyle = glow;
//           ctx.fill();
//           ctx.beginPath();
//           ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
//           ctx.fillStyle = `rgba(${r},${g},${b},${0.9 * pulse})`;
//           ctx.fill();
//         }

//         // Move & wrap
//         n.x += n.vx;
//         n.y += n.vy;
//         if (n.x < -50) n.x = W + 50;
//         if (n.x > W + 50) n.x = -50;
//         if (n.y < -50) n.y = H + 50;
//         if (n.y > H + 50) n.y = -50;
//       });

//       // Vignette
//       const vig = ctx.createRadialGradient(
//         W / 2,
//         H / 2,
//         0,
//         W / 2,
//         H / 2,
//         Math.max(W, H) * 0.72,
//       );
//       vig.addColorStop(0, "rgba(0,0,0,0)");
//       vig.addColorStop(1, "rgba(0,0,10,0.55)");
//       ctx.fillStyle = vig;
//       ctx.fillRect(0, 0, W, H);

//       animId = requestAnimationFrame(draw);
//     }

//     const onMouseMove = (e) => {
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = e.clientX - rect.left;
//       mouse.y = e.clientY - rect.top;
//     };
//     const onTouchMove = (e) => {
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = e.touches[0].clientX - rect.left;
//       mouse.y = e.touches[0].clientY - rect.top;
//     };
//     const onResize = () => {
//       resize();
//       nodes.forEach((n) => {
//         n.x = rand(0, W);
//         n.y = rand(0, H);
//       });
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("touchmove", onTouchMove);
//     window.addEventListener("resize", onResize);

//     init();
//     draw();

//     return () => {
//       cancelAnimationFrame(animId);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("touchmove", onTouchMove);
//       window.removeEventListener("resize", onResize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "absolute",
//         inset: 0,
//         width: "100%",
//         height: "100%",
//         display: "block",
//       }}
//     />
//   );
// }

// // ─── Main component ───────────────────────────────────────────────────────────
// function LandingInfo() {
//   const navigate = useNavigate();

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "#050508",
//         overflow: "hidden",
//       }}
//     >
//       {/* Animated canvas background */}
//       <AnimatedBackground />

//       {/* Foreground content */}
//       <main className="relative z-10 h-full flex items-center justify-center px-4 py-12">
//         <div className="w-full max-w-2xl text-center flex flex-col items-center gap-8">
//           {/* BADGE */}
//           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
//             <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//             <span className="text-[12px] text-indigo-300 font-medium tracking-wide">
//               Live video chat — meet someone new
//             </span>
//           </div>

//           {/* HEADLINE */}
//           <div className="space-y-4">
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
//               Meet Strangers
//               <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
//                 on Live Video
//               </span>
//             </h1>
//             <p className="text-[15px] sm:text-base text-white/50 leading-relaxed max-w-lg mx-auto">
//               HelloStranger connects you with real people through random video
//               chats. Accounts help us keep the space safe and respectful.
//             </p>
//           </div>

//           {/* BUTTONS */}
//           <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//             <button
//               onClick={() => navigate("/join")}
//               className="
//                 px-8 py-3 rounded-xl
//                 text-[14px] font-semibold text-white tracking-wide
//                 bg-indigo-600 hover:bg-indigo-500
//                 shadow-[0_0_28px_rgba(99,102,241,0.35)]
//                 hover:shadow-[0_0_36px_rgba(99,102,241,0.5)]
//                 active:scale-[0.97] transition-all duration-200
//               "
//             >
//               Join Now
//             </button>
//             <button
//               onClick={() => navigate("/login")}
//               className="
//                 px-8 py-3 rounded-xl
//                 text-[14px] font-semibold text-white/70 hover:text-white tracking-wide
//                 border border-white/10 hover:bg-white/8
//                 active:scale-[0.97] transition-all duration-200
//               "
//             >
//               Login
//             </button>
//           </div>

//           {/* FEATURE PILLS */}
//           <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
//             {[
//               { icon: Video, label: "Random video chat" },
//               { icon: Shield, label: "Registered users only" },
//               { icon: Users, label: "Real connections" },
//             ].map(({ icon: Icon, label }) => (
//               <div
//                 key={label}
//                 className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/8"
//               >
//                 <Icon size={12} className="text-white/40" />
//                 <span className="text-[12px] text-white/40 tracking-wide">
//                   {label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default LandingInfo;

// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // ─── Dark wavy SVG background ─────────────────────────────────────────────────
// function WavyBackground() {
//   const ref = useRef(null);
//   useEffect(() => {
//     let t = 0,
//       id;
//     const el = ref.current;
//     if (!el) return;
//     const paths = el.querySelectorAll(".wp");
//     function tick() {
//       t += 0.009;
//       const W = window.innerWidth,
//         H = window.innerHeight;
//       paths.forEach((p, i) => {
//         const phase = i * 1.2,
//           amp = 32 + i * 14,
//           freq = 0.0015 + i * 0.0003;
//         const yBase = (0.5 + i * 0.1) * H;
//         const pts = [];
//         for (let s = 0; s <= 28; s++) {
//           const x = (s / 28) * W;
//           pts.push([
//             x,
//             yBase +
//               Math.sin(x * freq + t + phase) * amp +
//               Math.sin(x * freq * 1.8 + t * 0.6 + phase) * amp * 0.35,
//           ]);
//         }
//         p.setAttribute(
//           "d",
//           [
//             "M 0 " + H,
//             "L 0 " + pts[0][1],
//             ...pts.slice(1).map(([x, y]) => "L " + x + " " + y),
//             "L " + W + " " + H,
//             "Z",
//           ].join(" "),
//         );
//       });
//       id = requestAnimationFrame(tick);
//     }
//     tick();
//     return () => cancelAnimationFrame(id);
//   }, []);
//   return (
//     <svg
//       ref={ref}
//       style={{
//         position: "absolute",
//         inset: 0,
//         width: "100%",
//         height: "100%",
//         pointerEvents: "none",
//       }}
//       preserveAspectRatio="none"
//     >
//       <defs>
//         <linearGradient id="dw0" x1="0" y1="0" x2="1" y2="0">
//           <stop offset="0%" stopColor="#818cf8" stopOpacity="0.12" />
//           <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.17" />
//           <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
//         </linearGradient>
//         <linearGradient id="dw1" x1="0" y1="0" x2="1" y2="0">
//           <stop offset="0%" stopColor="#6366f1" stopOpacity="0.08" />
//           <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.13" />
//           <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.08" />
//         </linearGradient>
//         <linearGradient id="dw2" x1="0" y1="0" x2="1" y2="0">
//           <stop offset="0%" stopColor="#ec4899" stopOpacity="0.06" />
//           <stop offset="50%" stopColor="#a855f7" stopOpacity="0.1" />
//           <stop offset="100%" stopColor="#6366f1" stopOpacity="0.06" />
//         </linearGradient>
//       </defs>
//       <path className="wp" fill="url(#dw0)" />
//       <path className="wp" fill="url(#dw1)" />
//       <path className="wp" fill="url(#dw2)" />
//     </svg>
//   );
// }

// // ─── Animated dark blobs ──────────────────────────────────────────────────────
// function BlobMesh() {
//   return (
//     <div
//       style={{
//         position: "absolute",
//         inset: 0,
//         overflow: "hidden",
//         pointerEvents: "none",
//       }}
//     >
//       <style>{`
//         @keyframes b1{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(50px,-40px) scale(1.1)}70%{transform:translate(-30px,25px) scale(0.93)}}
//         @keyframes b2{0%,100%{transform:translate(0,0) scale(1)}35%{transform:translate(-60px,30px) scale(1.07)}70%{transform:translate(40px,-50px) scale(0.96)}}
//         @keyframes b3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(25px,35px) scale(1.12)}}
//       `}</style>
//       <div
//         style={{
//           position: "absolute",
//           top: "-15%",
//           left: "-12%",
//           width: "min(600px,90vw)",
//           height: "min(600px,90vw)",
//           borderRadius: "60% 40% 70% 30%/50% 60% 40% 50%",
//           background:
//             "radial-gradient(circle at 40% 40%,#4f46e5,#7c3aed,#6d28d9)",
//           opacity: 0.18,
//           animation: "b1 16s ease-in-out infinite",
//           filter: "blur(60px)",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           top: "-10%",
//           right: "-14%",
//           width: "min(520px,80vw)",
//           height: "min(520px,80vw)",
//           borderRadius: "40% 60% 30% 70%/60% 40% 60% 40%",
//           background:
//             "radial-gradient(circle at 60% 35%,#db2777,#9333ea,#7c3aed)",
//           opacity: 0.14,
//           animation: "b2 20s ease-in-out infinite",
//           filter: "blur(70px)",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           bottom: "-18%",
//           left: "25%",
//           width: "min(500px,75vw)",
//           height: "min(400px,60vw)",
//           borderRadius: "50% 50% 40% 60%/40% 60% 40% 60%",
//           background:
//             "radial-gradient(circle at 50% 70%,#0e7490,#0891b2,#06b6d4)",
//           opacity: 0.12,
//           animation: "b3 13s ease-in-out infinite",
//           filter: "blur(55px)",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           bottom: "-10%",
//           left: "-10%",
//           width: "min(400px,65vw)",
//           height: "min(400px,65vw)",
//           borderRadius: "70% 30% 50% 50%/30% 70% 30% 70%",
//           background: "radial-gradient(circle at 30% 60%,#5b21b6,#4c1d95)",
//           opacity: 0.2,
//           animation: "b2 22s ease-in-out 3s infinite",
//           filter: "blur(50px)",
//         }}
//       />
//     </div>
//   );
// }

// // ─── Floating emojis ──────────────────────────────────────────────────────────
// const FLOATERS = [
//   { e: "👋", size: 32, x: 7, y: 15, dur: 7, delay: 0 },
//   { e: "🎉", size: 24, x: 87, y: 10, dur: 9, delay: 1.2 },
//   { e: "🌍", size: 28, x: 76, y: 70, dur: 8, delay: 0.5 },
//   { e: "✨", size: 20, x: 13, y: 65, dur: 6, delay: 2 },
//   { e: "🤩", size: 26, x: 91, y: 42, dur: 10, delay: 0.8 },
//   { e: "💬", size: 22, x: 4, y: 44, dur: 8.5, delay: 1.6 },
//   { e: "🔥", size: 20, x: 50, y: 87, dur: 7.5, delay: 3 },
//   { e: "🎊", size: 18, x: 33, y: 7, dur: 9.5, delay: 0.3 },
//   { e: "💫", size: 16, x: 64, y: 5, dur: 6.5, delay: 2.5 },
//   { e: "🫶", size: 24, x: 79, y: 87, dur: 8, delay: 1 },
// ];
// function FloatingEmojis() {
//   return (
//     <div
//       style={{
//         position: "absolute",
//         inset: 0,
//         pointerEvents: "none",
//         overflow: "hidden",
//       }}
//     >
//       <style>{`@keyframes fb{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-16px) rotate(4deg)}}`}</style>
//       {FLOATERS.map((f, i) => (
//         <div
//           key={i}
//           style={{
//             position: "absolute",
//             left: f.x + "%",
//             top: f.y + "%",
//             fontSize: f.size,
//             animation:
//               "fb " + f.dur + "s ease-in-out " + f.delay + "s infinite",
//             opacity: 0.35,
//             userSelect: "none",
//             filter: "drop-shadow(0 0 8px rgba(139,92,246,0.3))",
//           }}
//         >
//           {f.e}
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── Avatar stack ─────────────────────────────────────────────────────────────
// const AVATARS = [
//   { emoji: "🧑‍🦱", bg: "#3730a3" },
//   { emoji: "👩‍🦰", bg: "#7c2d6f" },
//   { emoji: "🧔", bg: "#1e3a5f" },
//   { emoji: "👩‍🦳", bg: "#065f46" },
//   { emoji: "🧑‍🦲", bg: "#78350f" },
// ];
// function AvatarStack() {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//       <div style={{ display: "flex" }}>
//         {AVATARS.map((a, i) => (
//           <div
//             key={i}
//             style={{
//               width: 30,
//               height: 30,
//               borderRadius: "50%",
//               background: a.bg,
//               border: "2px solid #0d0b1e",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: 14,
//               marginLeft: i === 0 ? 0 : -9,
//               zIndex: AVATARS.length - i,
//               position: "relative",
//               boxShadow: "0 0 0 1px rgba(139,92,246,0.25)",
//             }}
//           >
//             {a.emoji}
//           </div>
//         ))}
//       </div>
//       <div>
//         <div
//           style={{
//             fontSize: 12,
//             fontWeight: 700,
//             color: "#e2e8f0",
//             letterSpacing: "-0.01em",
//           }}
//         >
//           2,400+ online now
//         </div>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 4,
//             marginTop: 2,
//           }}
//         >
//           <div
//             style={{
//               width: 6,
//               height: 6,
//               borderRadius: "50%",
//               background: "#22c55e",
//               boxShadow: "0 0 0 2px rgba(34,197,94,0.25)",
//             }}
//           />
//           <span style={{ fontSize: 11, color: "#475569" }}>
//             Meeting right now
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Animated chat preview ────────────────────────────────────────────────────
// const MESSAGES = [
//   { side: "left", text: "hey! where are you from? 👋", delay: 0 },
//   { side: "right", text: "Tokyo! you? 🗼", delay: 1.4 },
//   { side: "left", text: "NYC 🗽 this app is so cool", delay: 2.8 },
//   { side: "right", text: "right?! first time here 😄", delay: 4.2 },
//   { side: "left", text: "same! let's keep going ✨", delay: 5.6 },
// ];
// function ChatPreview() {
//   const [vis, setVis] = useState([]);
//   useEffect(() => {
//     MESSAGES.forEach((_, i) =>
//       setTimeout(
//         () => setVis((v) => [...v, i]),
//         MESSAGES[i].delay * 1000 + 700,
//       ),
//     );
//   }, []);
//   return (
//     <div
//       style={{
//         background: "rgba(10,8,30,0.88)",
//         backdropFilter: "blur(24px)",
//         borderRadius: 20,
//         border: "1px solid rgba(139,92,246,0.18)",
//         boxShadow:
//           "0 8px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(139,92,246,0.08)",
//         padding: "16px 14px",
//         width: "100%",
//         maxWidth: 270,
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           marginBottom: 14,
//           paddingBottom: 12,
//           borderBottom: "1px solid rgba(255,255,255,0.05)",
//         }}
//       >
//         <div style={{ fontSize: 20 }}>💬</div>
//         <div>
//           <div style={{ fontSize: 11.5, fontWeight: 700, color: "#e2e8f0" }}>
//             Live chats happening
//           </div>
//           <div style={{ fontSize: 10.5, color: "#475569" }}>
//             around the world right now
//           </div>
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 8,
//           minHeight: 136,
//         }}
//       >
//         {MESSAGES.map((m, i) => (
//           <div
//             key={i}
//             style={{
//               display: "flex",
//               justifyContent: m.side === "right" ? "flex-end" : "flex-start",
//               opacity: vis.includes(i) ? 1 : 0,
//               transform: vis.includes(i)
//                 ? "translateY(0) scale(1)"
//                 : "translateY(8px) scale(0.95)",
//               transition: "opacity 0.3s ease, transform 0.3s ease",
//             }}
//           >
//             <div
//               style={{
//                 background:
//                   m.side === "left"
//                     ? "rgba(255,255,255,0.07)"
//                     : "linear-gradient(135deg,#6366f1,#8b5cf6)",
//                 color: m.side === "left" ? "#cbd5e1" : "#fff",
//                 borderRadius:
//                   m.side === "left"
//                     ? "12px 12px 12px 3px"
//                     : "12px 12px 3px 12px",
//                 padding: "8px 11px",
//                 fontSize: 12,
//                 fontWeight: 500,
//                 maxWidth: "84%",
//                 lineHeight: 1.4,
//                 boxShadow:
//                   m.side === "right"
//                     ? "0 4px 14px rgba(99,102,241,0.35)"
//                     : "none",
//               }}
//             >
//               {m.text}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Feature pill ─────────────────────────────────────────────────────────────
// function Pill({ emoji, label }) {
//   return (
//     <div
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 6,
//         padding: "6px 12px",
//         borderRadius: 99,
//         background: "rgba(255,255,255,0.04)",
//         border: "1px solid rgba(255,255,255,0.08)",
//         fontSize: 12,
//         fontWeight: 600,
//         color: "#94a3b8",
//         whiteSpace: "nowrap",
//       }}
//     >
//       <span style={{ fontSize: 14 }}>{emoji}</span>
//       {label}
//     </div>
//   );
// }

// // ─── Landing page ─────────────────────────────────────────────────────────────
// export default function LandingInfo() {
//   const navigate = useNavigate();
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setTimeout(() => setMounted(true), 80);
//   }, []);

//   const anim = (delay) => ({
//     opacity: mounted ? 1 : 0,
//     transform: mounted ? "none" : "translateY(20px)",
//     transition:
//       "opacity 0.55s ease " + delay + "s, transform 0.55s ease " + delay + "s",
//   });

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "#060610",
//         overflowY: "auto",
//         overflowX: "hidden",
//         WebkitOverflowScrolling: "touch",
//         fontFamily: "'Plus Jakarta Sans','DM Sans',system-ui,sans-serif",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
//         *,*::before,*::after{box-sizing:border-box}

//         @keyframes shimmerBtn{0%{background-position:0% center}100%{background-position:200% center}}
//         @keyframes pulseRing{0%{box-shadow:0 0 0 0 rgba(99,102,241,0.55)}70%{box-shadow:0 0 0 8px rgba(99,102,241,0)}100%{box-shadow:0 0 0 0 rgba(99,102,241,0)}}

//         .lnd-btn-p{
//           display:block;width:100%;padding:15px 32px;border-radius:14px;border:none;cursor:pointer;
//           font-size:clamp(14px,3.5vw,15px);font-weight:800;color:#fff;letter-spacing:-0.01em;
//           background:linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#8b5cf6,#6366f1);background-size:300% auto;
//           box-shadow:0 4px 24px rgba(99,102,241,0.45);transition:transform 0.18s ease,box-shadow 0.18s ease;
//           font-family:inherit;-webkit-tap-highlight-color:transparent;touch-action:manipulation;
//         }
//         .lnd-btn-p:hover{animation:shimmerBtn 2s linear infinite;transform:translateY(-2px);box-shadow:0 8px 32px rgba(99,102,241,0.6)}
//         .lnd-btn-p:active{transform:scale(0.97)}

//         .lnd-btn-s{
//           display:block;width:100%;padding:15px 32px;border-radius:14px;
//           border:1px solid rgba(139,92,246,0.3);cursor:pointer;
//           font-size:clamp(14px,3.5vw,15px);font-weight:700;color:#a5b4fc;
//           background:rgba(99,102,241,0.07);transition:all 0.18s ease;
//           font-family:inherit;letter-spacing:-0.01em;
//           -webkit-tap-highlight-color:transparent;touch-action:manipulation;
//         }
//         .lnd-btn-s:hover{background:rgba(99,102,241,0.14);border-color:rgba(139,92,246,0.55);color:#c7d2fe}
//         .lnd-btn-s:active{transform:scale(0.97)}

//         /* Mobile-first grid */
//         .lnd-grid{display:flex;flex-direction:column;align-items:center;gap:clamp(28px,5vw,52px);width:100%}
//         .lnd-text{width:100%;display:flex;flex-direction:column;gap:clamp(14px,2.5vw,20px);align-items:center;text-align:center}
//         .lnd-chat{display:none}
//         .lnd-btns{display:flex;flex-direction:column;gap:10px;width:100%}
//         .lnd-pills{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
//         .lnd-av{display:flex;justify-content:center}

//         /* Phablet >= 480px: buttons side by side */
//         @media(min-width:480px){
//           .lnd-btns{flex-direction:row;width:auto;align-self:center}
//           .lnd-btn-p,.lnd-btn-s{width:auto}
//         }

//         /* Tablet >= 700px: side-by-side layout */
//         @media(min-width:700px){
//           .lnd-grid{flex-direction:row;align-items:center;justify-content:center}
//           .lnd-text{align-items:flex-start;text-align:left;flex:1;max-width:520px}
//           .lnd-chat{display:block;flex-shrink:0}
//           .lnd-pills{justify-content:flex-start}
//           .lnd-av{justify-content:flex-start}
//         }

//         /* Large desktop >= 1100px */
//         @media(min-width:1100px){.lnd-text{max-width:580px}}

//         /* Tiny phones <= 360px */
//         @media(max-width:360px){
//           .lnd-main-pad{padding:32px 14px 40px!important}
//         }
//       `}</style>

//       {/* Fixed bg */}
//       <div
//         style={{
//           position: "fixed",
//           inset: 0,
//           zIndex: 0,
//           pointerEvents: "none",
//         }}
//       >
//         <BlobMesh />
//         <WavyBackground />
//         <FloatingEmojis />
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "radial-gradient(ellipse 70% 55% at 50% 38%,rgba(99,102,241,0.07) 0%,transparent 70%)",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             backgroundImage:
//               "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
//             opacity: 0.5,
//           }}
//         />
//       </div>

//       {/* Scrollable content */}
//       <main
//         className="lnd-main-pad"
//         style={{
//           position: "relative",
//           zIndex: 10,
//           minHeight: "100dvh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding:
//             "clamp(40px,8vw,72px) clamp(18px,5vw,48px) clamp(48px,8vw,72px)",
//         }}
//       >
//         <div className="lnd-grid" style={{ maxWidth: 980 }}>
//           {/* Text */}
//           <div className="lnd-text">
//             {/* Badge */}
//             <div
//               style={{
//                 ...anim(0),
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 7,
//                 padding: "7px 14px 7px 10px",
//                 borderRadius: 99,
//                 background: "rgba(99,102,241,0.1)",
//                 border: "1px solid rgba(139,92,246,0.22)",
//               }}
//             >
//               <div
//                 style={{
//                   width: 7,
//                   height: 7,
//                   borderRadius: "50%",
//                   background: "#22c55e",
//                   animation: "pulseRing 2s ease-out infinite",
//                 }}
//               />
//               <span
//                 style={{
//                   fontSize: "clamp(11px,2.5vw,12.5px)",
//                   fontWeight: 700,
//                   color: "#a5b4fc",
//                 }}
//               >
//                 Random video chat for real people
//               </span>
//             </div>

//             {/* Headline */}
//             <div style={anim(0.1)}>
//               <h1
//                 style={{
//                   margin: 0,
//                   fontSize: "clamp(30px,7.5vw,72px)",
//                   fontWeight: 900,
//                   lineHeight: 1.06,
//                   letterSpacing: "-0.03em",
//                   color: "#f1f5f9",
//                 }}
//               >
//                 Meet your next
//                 <br />
//                 <span
//                   style={{
//                     background:
//                       "linear-gradient(135deg,#818cf8 0%,#a78bfa 40%,#f472b6 100%)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     backgroundClip: "text",
//                   }}
//                 >
//                   stranger
//                 </span>
//                 <span style={{ marginLeft: 10 }}>👋</span>
//               </h1>
//               <p
//                 style={{
//                   margin: "clamp(10px,2vw,14px) 0 0",
//                   fontSize: "clamp(13px,3vw,16.5px)",
//                   lineHeight: 1.7,
//                   color: "#64748b",
//                   fontWeight: 500,
//                   maxWidth: 420,
//                 }}
//               >
//                 Spontaneous video chats with real people from around the world.
//                 No algorithms. No feeds. Just a conversation. ✨
//               </p>
//             </div>

//             {/* Avatars */}
//             <div className="lnd-av" style={anim(0.2)}>
//               <AvatarStack />
//             </div>

//             {/* Buttons */}
//             <div className="lnd-btns" style={anim(0.3)}>
//               <button className="lnd-btn-p" onClick={() => navigate("/join")}>
//                 Start chatting — it&apos;s free 🚀
//               </button>
//               <button className="lnd-btn-s" onClick={() => navigate("/login")}>
//                 Login
//               </button>
//             </div>

//             {/* Pills */}
//             <div className="lnd-pills" style={anim(0.42)}>
//               <Pill emoji="🎥" label="Live video" />
//               <Pill emoji="🛡️" label="Safe & registered" />
//               <Pill emoji="🌍" label="50+ countries" />
//               <Pill emoji="⚡" label="Instant match" />
//             </div>
//           </div>

//           {/* Chat card — desktop only */}
//           <div
//             className="lnd-chat"
//             style={{
//               ...anim(0.28),
//               transform: mounted
//                 ? "rotate(-2deg)"
//                 : "rotate(-2deg) scale(0.88)",
//               transition: "opacity 0.65s ease 0.28s,transform 0.65s ease 0.28s",
//             }}
//           >
//             <ChatPreview />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * LandingInfo — hellostranger
 *
 * Design concept: "the moment before someone answers."
 * A fanned deck of video-call frames (not photos — soft gradient
 * "bokeh" fills, like the glow of a live call) stands in for the
 * product's core moment: a call connecting to a real stranger.
 * A warm coral accent reads as "live" against a deep, cool charcoal
 * background. Fraunces (serif, editorial) carries the headline;
 * Inter carries UI copy; a mono face is used only for small
 * timestamp-style captions, echoing a live feed readout.
 */

const CALL_FRAMES = [
  {
    id: "lagos",
    city: "Lagos",
    time: "now",
    top: 6,
    left: 4,
    rotate: -7,
    scale: 0.86,
    z: 1,
    from: "#243b55",
    to: "#c0522f",
  },
  {
    id: "seoul",
    city: "Seoul",
    time: "connecting",
    top: 18,
    left: 34,
    rotate: 3,
    scale: 1,
    z: 3,
    from: "#1c2b4a",
    to: "#ff6247",
    live: true,
  },
  {
    id: "lisbon",
    city: "Lisbon",
    time: "2m ago",
    top: 46,
    left: 14,
    rotate: 8,
    scale: 0.82,
    z: 2,
    from: "#2b2440",
    to: "#e8b25d",
  },
];

function StatusBadge() {
  return (
    <div className="hs-badge">
      <span className="hs-badge-dot" aria-hidden="true" />
      Live · random video chat
    </div>
  );
}

function SocialProof() {
  return (
    <div className="hs-proof">
      <div className="hs-proof-item">
        <span className="hs-proof-dot" aria-hidden="true" />
        <span>
          <strong>2,400+</strong> people online right now
        </span>
      </div>
      <div className="hs-proof-sep" aria-hidden="true" />
      <div className="hs-proof-item">
        <span>
          Live in <strong>50+</strong> countries
        </span>
      </div>
    </div>
  );
}

function CallFrame({ frame }) {
  return (
    <div
      className={"hs-frame" + (frame.live ? " hs-frame-live" : "")}
      style={{
        top: frame.top + "%",
        left: frame.left + "%",
        zIndex: frame.z,
        transform: "rotate(" + frame.rotate + "deg) scale(" + frame.scale + ")",
        "--frame-from": frame.from,
        "--frame-to": frame.to,
      }}
    >
      <div className="hs-frame-glow" aria-hidden="true" />
      <div className="hs-frame-caption">
        {frame.live && (
          <span className="hs-frame-live-dot" aria-hidden="true" />
        )}
        <span className="hs-frame-city">{frame.city}</span>
        <span className="hs-frame-time">{frame.time}</span>
      </div>
    </div>
  );
}

function HeroVisual({ mounted }) {
  return (
    <div className={"hs-visual" + (mounted ? " is-in" : "")} aria-hidden="true">
      <svg
        className="hs-visual-line"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
      >
        <path d="M 30 80 C 70 40, 110 110, 170 50" className="hs-visual-path" />
      </svg>
      {CALL_FRAMES.map((f) => (
        <CallFrame key={f.id} frame={f} />
      ))}
    </div>
  );
}

function BackgroundLayer() {
  return (
    <div className="hs-bg" aria-hidden="true">
      <div className="hs-bg-glow" />
      <div className="hs-bg-grid" />
      <div className="hs-bg-grain" />
    </div>
  );
}

export default function LandingInfo() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="hs-page">
      <style>{HS_STYLES}</style>

      <BackgroundLayer />

      <header className="hs-header">
        <span className="hs-wordmark">hellostranger</span>
        <button
          type="button"
          className="hs-header-login"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </header>

      <main className="hs-main">
        <div className="hs-hero">
          <div className={"hs-copy" + (mounted ? " is-in" : "")}>
            <StatusBadge />

            <h1 className="hs-headline">
              Meet someone new.
              <br />
              <span className="hs-headline-accent">Right now.</span>
            </h1>

            <p className="hs-sub">
              Spontaneous video conversations with real people, worldwide. No
              profile to build, no feed to scroll. Just say hello.
            </p>

            <div className="hs-cta-row">
              <button
                type="button"
                className="hs-cta-primary"
                onClick={() => navigate("/join")}
              >
                Start a conversation
              </button>
              <button
                type="button"
                className="hs-cta-secondary"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            </div>

            <SocialProof />
          </div>

          <HeroVisual mounted={mounted} />
        </div>
      </main>
    </div>
  );
}

const HS_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');

.hs-page, .hs-page *, .hs-page *::before, .hs-page *::after {
  box-sizing: border-box;
}

.hs-page {
  --hs-bg: #0b0d10;
  --hs-bg-elevated: #14171c;
  --hs-ink: #f3f1ec;
  --hs-ink-dim: #8b9099;
  --hs-ink-faint: #565b63;
  --hs-accent: #ff6247;
  --hs-accent-soft: rgba(255, 98, 71, 0.14);
  --hs-line: rgba(243, 241, 236, 0.09);
  --hs-radius: 20px;
  --hs-font-display: 'Fraunces', 'Georgia', serif;
  --hs-font-body: 'Inter', system-ui, sans-serif;
  --hs-font-mono: 'JetBrains Mono', 'SFMono-Regular', monospace;

  position: fixed;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background: var(--hs-bg);
  color: var(--hs-ink);
  font-family: var(--hs-font-body);
}

/* ── Background ─────────────────────────────────────────────── */

.hs-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.hs-bg-glow {
  position: absolute;
  top: -20%;
  left: -10%;
  width: 70vw;
  height: 70vw;
  max-width: 900px;
  max-height: 900px;
  background: radial-gradient(circle, rgba(255, 98, 71, 0.09) 0%, transparent 65%);
}

.hs-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--hs-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--hs-line) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.35;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, black 0%, transparent 75%);
}

.hs-bg-grain {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── Header ──────────────────────────────────────────────────── */

.hs-header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(18px, 3vw, 32px) clamp(18px, 5vw, 48px);
}

.hs-wordmark {
  font-family: var(--hs-font-display);
  font-weight: 600;
  font-size: clamp(15px, 2vw, 17px);
  letter-spacing: -0.01em;
  color: var(--hs-ink);
}

.hs-header-login {
  background: transparent;
  border: none;
  color: var(--hs-ink-dim);
  font-family: var(--hs-font-body);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 8px;
  transition: color 0.15s ease, background 0.15s ease;
}

.hs-header-login:hover {
  color: var(--hs-ink);
  background: rgba(243, 241, 236, 0.06);
}

.hs-header-login:focus-visible,
.hs-cta-primary:focus-visible,
.hs-cta-secondary:focus-visible {
  outline: 2px solid var(--hs-accent);
  outline-offset: 2px;
}

/* ── Layout ──────────────────────────────────────────────────── */

.hs-main {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  min-height: calc(100dvh - 76px);
  padding: clamp(8px, 4vw, 24px) clamp(18px, 5vw, 48px) clamp(48px, 8vw, 72px);
}

.hs-hero {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(40px, 7vw, 64px);
}

.hs-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: clamp(16px, 2.5vw, 22px);
  max-width: 560px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.hs-copy.is-in {
  opacity: 1;
  transform: translateY(0);
}

/* ── Badge ───────────────────────────────────────────────────── */

.hs-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px 6px 10px;
  border-radius: 99px;
  border: 1px solid var(--hs-line);
  background: var(--hs-bg-elevated);
  font-family: var(--hs-font-mono);
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--hs-ink-dim);
}

.hs-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hs-accent);
  animation: hs-pulse 2.2s ease-out infinite;
}

/* ── Headline ────────────────────────────────────────────────── */

.hs-headline {
  margin: 0;
  font-family: var(--hs-font-display);
  font-weight: 600;
  font-size: clamp(2.3rem, 5.4vw + 1rem, 4.6rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: var(--hs-ink);
}

.hs-headline-accent {
  color: var(--hs-accent);
  font-style: italic;
}

.hs-sub {
  margin: 0;
  font-size: clamp(14.5px, 1.6vw + 0.5rem, 17px);
  line-height: 1.65;
  color: var(--hs-ink-dim);
  max-width: 440px;
}

/* ── CTAs ────────────────────────────────────────────────────── */

.hs-cta-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 320px;
  margin-top: 4px;
}

.hs-cta-primary {
  display: block;
  width: 100%;
  padding: 15px 28px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-family: var(--hs-font-body);
  font-size: 15px;
  font-weight: 700;
  color: #0b0d10;
  background: var(--hs-accent);
  box-shadow: 0 8px 24px rgba(255, 98, 71, 0.25);
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.hs-cta-primary:hover {
  background: #ff7258;
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(255, 98, 71, 0.32);
}

.hs-cta-primary:active {
  transform: scale(0.98);
}

.hs-cta-secondary {
  display: block;
  width: 100%;
  padding: 15px 28px;
  border-radius: 12px;
  border: 1px solid var(--hs-line);
  cursor: pointer;
  font-family: var(--hs-font-body);
  font-size: 15px;
  font-weight: 600;
  color: var(--hs-ink);
  background: transparent;
  transition: background 0.15s ease, border-color 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.hs-cta-secondary:hover {
  background: rgba(243, 241, 236, 0.05);
  border-color: rgba(243, 241, 236, 0.2);
}

.hs-cta-secondary:active {
  transform: scale(0.98);
}

/* ── Social proof ────────────────────────────────────────────── */

.hs-proof {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 6px;
  font-size: 13px;
  color: var(--hs-ink-faint);
}

.hs-proof-item {
  display: flex;
  align-items: center;
  gap: 7px;
}

.hs-proof-item strong {
  color: var(--hs-ink-dim);
  font-weight: 700;
}

.hs-proof-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.18);
}

.hs-proof-sep {
  width: 1px;
  height: 12px;
  background: var(--hs-line);
}

/* ── Hero visual (signature element) ────────────────────────── */

.hs-visual {
  position: relative;
  width: min(100%, 380px);
  aspect-ratio: 1 / 0.95;
  flex-shrink: 0;
  opacity: 0;
  transform: translateY(18px) scale(0.96);
  transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s;
}

.hs-visual.is-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.hs-visual-line {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hs-visual-path {
  fill: none;
  stroke: var(--hs-line);
  stroke-width: 1;
  stroke-dasharray: 4 6;
  animation: hs-dash 26s linear infinite;
}

.hs-frame {
  position: absolute;
  width: 46%;
  aspect-ratio: 4 / 5;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(243, 241, 236, 0.1);
  background: var(--hs-bg-elevated);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45);
  animation: hs-float 7s ease-in-out infinite;
}

.hs-frame:nth-of-type(2) {
  animation-duration: 8.5s;
  animation-delay: 0.3s;
}

.hs-frame:nth-of-type(3) {
  animation-duration: 6.5s;
  animation-delay: 0.9s;
}

.hs-frame-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 100% at 30% 20%, var(--frame-to) 0%, var(--frame-from) 55%, #0b0d10 100%);
  opacity: 0.9;
}

.hs-frame-caption {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  border-radius: 9px;
  background: rgba(11, 13, 16, 0.55);
  backdrop-filter: blur(6px);
  font-family: var(--hs-font-mono);
  font-size: 10.5px;
  color: rgba(243, 241, 236, 0.85);
}

.hs-frame-city {
  font-weight: 500;
}

.hs-frame-time {
  margin-left: auto;
  color: rgba(243, 241, 236, 0.55);
}

.hs-frame-live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--hs-accent);
  animation: hs-pulse 2s ease-out infinite;
}

.hs-frame-live {
  border-color: rgba(255, 98, 71, 0.35);
}

/* ── Keyframes ───────────────────────────────────────────────── */

@keyframes hs-pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 98, 71, 0.5); }
  70% { box-shadow: 0 0 0 7px rgba(255, 98, 71, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 98, 71, 0); }
}

@keyframes hs-float {
  0%, 100% { margin-top: 0; }
  50% { margin-top: -8px; }
}

@keyframes hs-dash {
  to { stroke-dashoffset: -200; }
}

@media (prefers-reduced-motion: reduce) {
  .hs-badge-dot,
  .hs-frame-live-dot,
  .hs-frame,
  .hs-visual-path {
    animation: none !important;
  }
  .hs-copy,
  .hs-visual {
    transition-duration: 0.01ms !important;
  }
}

/* ── Breakpoints ─────────────────────────────────────────────── */

@media (min-width: 480px) {
  .hs-cta-row {
    flex-direction: row;
    max-width: none;
    width: auto;
  }
  .hs-cta-primary,
  .hs-cta-secondary {
    width: auto;
  }
}

@media (min-width: 900px) {
  .hs-hero {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    gap: clamp(32px, 5vw, 72px);
  }
  .hs-copy {
    align-items: flex-start;
    text-align: left;
    max-width: 520px;
  }
  .hs-sub {
    max-width: 460px;
  }
  .hs-proof {
    justify-content: flex-start;
  }
  .hs-visual {
    width: min(38vw, 420px);
  }
}

@media (min-width: 1440px) {
  .hs-copy {
    max-width: 580px;
  }
}

@media (max-width: 359px) {
  .hs-main {
    padding-left: 14px;
    padding-right: 14px;
  }
}
`;