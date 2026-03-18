// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // function LandingInfo() {
// //   const navigate = useNavigate();

// //   return (
// //     <main className="min-h-full flex items-center justify-center">
// //       <div className="px-6 md:px-10 max-w-3xl text-center fade-up">
// //         {/* HEADLINE */}
// //         <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-purple-300 via-indigo-300 to-slate-200 bg-clip-text text-transparent">
// //           Meet Strangers on
// //           <br className="hidden md:block" /> Live Video
// //         </h2>

// //         {/* DESCRIPTION */}
// //         <p className="text-white/70 text-base md:text-lg mb-10 leading-relaxed">
// //           HelloStranger brings people together through random video chats,
// //           available only to registered users. Accounts help us maintain a safer,
// //           more respectful space for genuine human connections.
// //         </p>

// //         {/* BUTTONS */}
// //         <div className="flex flex-col sm:flex-row gap-5 justify-center">
// //           <button
// //             onClick={() => navigate("/join")}
// //             className="
// //               px-10 py-3 rounded-xl
// //               text-base md:text-lg font-semibold
// //               text-white
// //               bg-gradient-to-r from-purple-700 to-indigo-800
// //               hover:scale-105
// //               transition-all duration-300
// //               shadow-xl
// //             "
// //           >
// //             Join Now
// //           </button>

// //           <button
// //             onClick={() => navigate("/login")}
// //             className="
// //               px-10 py-3 rounded-xl
// //               text-base md:text-lg font-medium
// //               border border-white/20
// //               bg-white/5 backdrop-blur-lg
// //               hover:bg-white/10
// //               transition-all duration-300
// //             "
// //           >
// //             Login
// //           </button>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }

// // export default LandingInfo;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Video, Shield, Users } from "lucide-react";

// function LandingInfo() {
//   const navigate = useNavigate();

//   return (
//     <main className="min-h-full flex items-center justify-center px-4 py-12">
//       <div className="w-full max-w-2xl text-center flex flex-col items-center gap-8">
//         {/* BADGE */}
//         <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
//           <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//           <span className="text-[12px] text-indigo-300 font-medium tracking-wide">
//             Live video chat — meet someone new
//           </span>
//         </div>

//         {/* HEADLINE */}
//         <div className="space-y-4">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
//             Meet Strangers
//             <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
//               on Live Video
//             </span>
//           </h1>
//           <p className="text-[15px] sm:text-base text-white/50 leading-relaxed max-w-lg mx-auto">
//             HelloStranger connects you with real people through random video
//             chats. Accounts help us keep the space safe and respectful.
//           </p>
//         </div>

//         {/* BUTTONS */}
//         <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//           <button
//             onClick={() => navigate("/join")}
//             className="
//               px-8 py-3 rounded-xl
//               text-[14px] font-semibold text-white tracking-wide
//               bg-indigo-600 hover:bg-indigo-500
//               shadow-[0_0_28px_rgba(99,102,241,0.35)]
//               hover:shadow-[0_0_36px_rgba(99,102,241,0.5)]
//               active:scale-[0.97] transition-all duration-200
//             "
//           >
//             Join Now
//           </button>
//           <button
//             onClick={() => navigate("/login")}
//             className="
//               px-8 py-3 rounded-xl
//               text-[14px] font-semibold text-white/70 hover:text-white tracking-wide
//               border border-white/10 hover:bg-white/8
//               active:scale-[0.97] transition-all duration-200
//             "
//           >
//             Login
//           </button>
//         </div>

//         {/* FEATURE PILLS */}
//         <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
//           {[
//             { icon: Video, label: "Random video chat" },
//             { icon: Shield, label: "Registered users only" },
//             { icon: Users, label: "Real connections" },
//           ].map(({ icon: Icon, label }) => (
//             <div
//               key={label}
//               className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/8"
//             >
//               <Icon size={12} className="text-white/40" />
//               <span className="text-[12px] text-white/40 tracking-wide">
//                 {label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

// export default LandingInfo;

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Shield, Users } from "lucide-react";

// ─── Canvas background ────────────────────────────────────────────────────────
function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let W,
      H,
      nodes = [];
    let animId;
    let mouse = { x: -999, y: -999 };

    const COUNT = 55;
    const MAX_DIST = 160;
    const COLORS = [
      [99, 102, 241], // indigo
      [167, 139, 250], // violet
      [244, 114, 182], // pink
      [79, 70, 229], // deep indigo
      [139, 92, 246], // purple
    ];

    const nebulae = [
      { x: 0.15, y: 0.2, rx: 0.3, ry: 0.25, c: [79, 46, 200] },
      { x: 0.85, y: 0.75, rx: 0.28, ry: 0.22, c: [120, 40, 160] },
      { x: 0.5, y: 0.5, rx: 0.2, ry: 0.15, c: [60, 60, 220] },
      { x: 0.3, y: 0.8, rx: 0.22, ry: 0.18, c: [180, 50, 120] },
    ];

    const rand = (a, b) => a + Math.random() * (b - a);

    function createNode() {
      const c = COLORS[Math.floor(Math.random() * COLORS.length)];
      const isFrame = Math.random() < 0.08;
      return {
        x: rand(0, W),
        y: rand(0, H),
        vx: rand(-0.25, 0.25) * (isFrame ? 0.4 : 1),
        vy: rand(-0.25, 0.25) * (isFrame ? 0.4 : 1),
        r: isFrame ? rand(16, 28) : rand(2, 5),
        color: c,
        alpha: rand(0.3, 0.9),
        pulseSpeed: rand(0.008, 0.02),
        pulsePhase: rand(0, Math.PI * 2),
        isFrame,
      };
    }

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function init() {
      resize();
      nodes = Array.from({ length: COUNT }, createNode);
    }

    function drawBg() {
      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, W, H);

      nebulae.forEach((nb) => {
        const gx = nb.x * W,
          gy = nb.y * H;
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, nb.rx * W);
        grad.addColorStop(0, `rgba(${nb.c[0]},${nb.c[1]},${nb.c[2]},0.13)`);
        grad.addColorStop(0.5, `rgba(${nb.c[0]},${nb.c[1]},${nb.c[2]},0.05)`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(gx, gy, nb.rx * W, nb.ry * H, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    let tick = 0;
    function draw() {
      tick++;
      drawBg();

      // Connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          if (a.isFrame || b.isFrame) continue;
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const t = 1 - dist / MAX_DIST;
            const cr = Math.round((a.color[0] + b.color[0]) / 2);
            const cg = Math.round((a.color[1] + b.color[1]) / 2);
            const cb = Math.round((a.color[2] + b.color[2]) / 2);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${t * 0.25})`;
            ctx.lineWidth = t * 1.2;
            ctx.stroke();
          }
        }
      }

      // Mouse connections
      nodes.forEach((n) => {
        if (n.isFrame) return;
        const dx = mouse.x - n.x,
          dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const t = 1 - dist / 180;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(167,139,250,${t * 0.4})`;
          ctx.lineWidth = t * 1.5;
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach((n) => {
        const pulse = Math.sin(tick * n.pulseSpeed + n.pulsePhase) * 0.3 + 0.7;
        const [r, g, b] = n.color;

        if (n.isFrame) {
          const fw = n.r * 4.5,
            fh = n.r * 3.5;
          ctx.save();
          ctx.globalAlpha = 0.18 * pulse;
          ctx.strokeStyle = `rgb(${r},${g},${b})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = `rgb(${r},${g},${b})`;
          ctx.shadowBlur = 12;
          const rr = 5;
          ctx.beginPath();
          ctx.moveTo(n.x - fw / 2 + rr, n.y - fh / 2);
          ctx.lineTo(n.x + fw / 2 - rr, n.y - fh / 2);
          ctx.quadraticCurveTo(
            n.x + fw / 2,
            n.y - fh / 2,
            n.x + fw / 2,
            n.y - fh / 2 + rr,
          );
          ctx.lineTo(n.x + fw / 2, n.y + fh / 2 - rr);
          ctx.quadraticCurveTo(
            n.x + fw / 2,
            n.y + fh / 2,
            n.x + fw / 2 - rr,
            n.y + fh / 2,
          );
          ctx.lineTo(n.x - fw / 2 + rr, n.y + fh / 2);
          ctx.quadraticCurveTo(
            n.x - fw / 2,
            n.y + fh / 2,
            n.x - fw / 2,
            n.y + fh / 2 - rr,
          );
          ctx.lineTo(n.x - fw / 2, n.y - fh / 2 + rr);
          ctx.quadraticCurveTo(
            n.x - fw / 2,
            n.y - fh / 2,
            n.x - fw / 2 + rr,
            n.y - fh / 2,
          );
          ctx.closePath();
          ctx.stroke();
          ctx.globalAlpha = 0.06 * pulse;
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fill();
          ctx.restore();
        } else {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
          glow.addColorStop(0, `rgba(${r},${g},${b},${0.6 * pulse * n.alpha})`);
          glow.addColorStop(
            0.4,
            `rgba(${r},${g},${b},${0.15 * pulse * n.alpha})`,
          );
          glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${0.9 * pulse})`;
          ctx.fill();
        }

        // Move & wrap
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -50) n.x = W + 50;
        if (n.x > W + 50) n.x = -50;
        if (n.y < -50) n.y = H + 50;
        if (n.y > H + 50) n.y = -50;
      });

      // Vignette
      const vig = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.72,
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,10,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    };
    const onResize = () => {
      resize();
      nodes.forEach((n) => {
        n.x = rand(0, W);
        n.y = rand(0, H);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("resize", onResize);

    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
function LandingInfo() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#050508",
        overflow: "hidden",
      }}
    >
      {/* Animated canvas background */}
      <AnimatedBackground />

      {/* Foreground content */}
      <main className="relative z-10 h-full flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl text-center flex flex-col items-center gap-8">
          {/* BADGE */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[12px] text-indigo-300 font-medium tracking-wide">
              Live video chat — meet someone new
            </span>
          </div>

          {/* HEADLINE */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
              Meet Strangers
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                on Live Video
              </span>
            </h1>
            <p className="text-[15px] sm:text-base text-white/50 leading-relaxed max-w-lg mx-auto">
              HelloStranger connects you with real people through random video
              chats. Accounts help us keep the space safe and respectful.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate("/join")}
              className="
                px-8 py-3 rounded-xl
                text-[14px] font-semibold text-white tracking-wide
                bg-indigo-600 hover:bg-indigo-500
                shadow-[0_0_28px_rgba(99,102,241,0.35)]
                hover:shadow-[0_0_36px_rgba(99,102,241,0.5)]
                active:scale-[0.97] transition-all duration-200
              "
            >
              Join Now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="
                px-8 py-3 rounded-xl
                text-[14px] font-semibold text-white/70 hover:text-white tracking-wide
                border border-white/10 hover:bg-white/8
                active:scale-[0.97] transition-all duration-200
              "
            >
              Login
            </button>
          </div>

          {/* FEATURE PILLS */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {[
              { icon: Video, label: "Random video chat" },
              { icon: Shield, label: "Registered users only" },
              { icon: Users, label: "Real connections" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/8"
              >
                <Icon size={12} className="text-white/40" />
                <span className="text-[12px] text-white/40 tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingInfo;