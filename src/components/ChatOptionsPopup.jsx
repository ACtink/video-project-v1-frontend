// import { useEffect, useRef, useState } from "react";

// const themes = [
//   { id: "default", label: "Default", bg: "#0a0a0a" },
//   { id: "midnight", label: "Midnight", bg: "#0d0d1a" },
//   { id: "forest", label: "Forest", bg: "#0a120a" },
//   { id: "wine", label: "Wine", bg: "#120a0e" },
//   { id: "slate", label: "Slate", bg: "#0d1117" },
//   { id: "sand", label: "Sand", bg: "#12100a" },
// ];

// function ChatOptionsPopup({
//   onClose,
//   onClearChat,
//   onBlock,
//   onThemeChange,
//   currentTheme,
//   anchorRef,
// }) {
//   const [showThemes, setShowThemes] = useState(false);
//   const popupRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(e.target) &&
//         anchorRef.current &&
//         !anchorRef.current.contains(e.target)
//       ) {
//         onClose();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       <style>{`
//         @keyframes popupFadeIn {
//           from { opacity: 0; transform: translateY(-6px) scale(0.97); }
//           to   { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         .chat-popup {
//           animation: popupFadeIn 0.18s ease forwards;
//         }
//         @keyframes themesSlideIn {
//           from { opacity: 0; transform: translateY(-4px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .themes-grid {
//           animation: themesSlideIn 0.16s ease forwards;
//         }
//       `}</style>

//       <div
//         ref={popupRef}
//         className="chat-popup"
//         style={{
//           position: "absolute",
//           right: 0,
//           top: 36,
//           zIndex: 9999,
//           width: 210,
//           borderRadius: 14,
//           background: "#1a1a1a",
//           border: "0.5px solid rgba(255,255,255,0.1)",
//           boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
//           overflow: "hidden",
//         }}
//       >
//         {/* Theme option */}
//         <div>
//           <button
//             onClick={() => setShowThemes((v) => !v)}
//             style={{
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               gap: 10,
//               padding: "11px 14px",
//               background: "transparent",
//               border: "none",
//               cursor: "pointer",
//               color: "rgba(255,255,255,0.8)",
//               fontSize: 13,
//               fontWeight: 500,
//               textAlign: "left",
//               transition: "background 0.15s ease",
//               borderBottom: "0.5px solid rgba(255,255,255,0.06)",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.background = "transparent")
//             }
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <svg
//                 width="15"
//                 height="15"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.8"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <circle cx="12" cy="12" r="10" />
//                 <path d="M12 2a10 10 0 0 1 0 20" />
//                 <path d="M2 12h20" />
//                 <path d="M12 2c2.76 4 4 8 4 10s-1.24 6-4 10" />
//                 <path d="M12 2c-2.76 4-4 8-4 10s1.24 6 4 10" />
//               </svg>
//               Theme
//             </div>
//             <svg
//               width="12"
//               height="12"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="rgba(255,255,255,0.3)"
//               strokeWidth="2"
//               strokeLinecap="round"
//               style={{
//                 transform: showThemes ? "rotate(180deg)" : "rotate(0deg)",
//                 transition: "transform 0.2s ease",
//               }}
//             >
//               <polyline points="6 9 12 15 18 9" />
//             </svg>
//           </button>

//           {/* Theme grid */}
//           {showThemes && (
//             <div
//               className="themes-grid"
//               style={{
//                 padding: "10px 14px 12px",
//                 borderBottom: "0.5px solid rgba(255,255,255,0.06)",
//                 display: "grid",
//                 gridTemplateColumns: "repeat(3, 1fr)",
//                 gap: 8,
//               }}
//             >
//               {themes.map((theme) => (
//                 <button
//                   key={theme.id}
//                   onClick={() => {
//                     onThemeChange(theme);
//                     onClose();
//                   }}
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     gap: 5,
//                     background: "transparent",
//                     border: "none",
//                     cursor: "pointer",
//                     padding: 0,
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: 44,
//                       height: 44,
//                       borderRadius: 10,
//                       background: theme.bg,
//                       border:
//                         currentTheme?.id === theme.id
//                           ? "2px solid #a78bfa"
//                           : "1.5px solid rgba(255,255,255,0.12)",
//                       transition: "border 0.15s ease",
//                       position: "relative",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {/* Mini chat bubble preview */}
//                     <div
//                       style={{
//                         position: "absolute",
//                         bottom: 8,
//                         right: 6,
//                         width: 22,
//                         height: 7,
//                         borderRadius: 4,
//                         background: "#7c3aed",
//                         opacity: 0.9,
//                       }}
//                     />
//                     <div
//                       style={{
//                         position: "absolute",
//                         bottom: 18,
//                         left: 6,
//                         width: 18,
//                         height: 7,
//                         borderRadius: 4,
//                         background: "rgba(255,255,255,0.15)",
//                       }}
//                     />
//                   </div>
//                   <span
//                     style={{
//                       fontSize: 10,
//                       color: "rgba(255,255,255,0.4)",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     {theme.label}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Clear chat */}
//         <button
//           onClick={() => {
//             onClearChat();
//             onClose();
//           }}
//           style={{
//             width: "100%",
//             display: "flex",
//             alignItems: "center",
//             gap: 10,
//             padding: "11px 14px",
//             background: "transparent",
//             border: "none",
//             cursor: "pointer",
//             color: "rgba(255,255,255,0.8)",
//             fontSize: 13,
//             fontWeight: 500,
//             textAlign: "left",
//             transition: "background 0.15s ease",
//             borderBottom: "0.5px solid rgba(255,255,255,0.06)",
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.background = "transparent")
//           }
//         >
//           <svg
//             width="15"
//             height="15"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.8"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <polyline points="3 6 5 6 21 6" />
//             <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//             <path d="M10 11v6M14 11v6M9 6V4h6v2" />
//           </svg>
//           Clear chat
//         </button>

//         {/* Block */}
//         <button
//           onClick={() => {
//             onBlock();
//             onClose();
//           }}
//           style={{
//             width: "100%",
//             display: "flex",
//             alignItems: "center",
//             gap: 10,
//             padding: "11px 14px",
//             background: "transparent",
//             border: "none",
//             cursor: "pointer",
//             color: "#f87171",
//             fontSize: 13,
//             fontWeight: 500,
//             textAlign: "left",
//             transition: "background 0.15s ease",
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.background = "rgba(248,113,113,0.06)")
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.background = "transparent")
//           }
//         >
//           <svg
//             width="15"
//             height="15"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.8"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="12" cy="12" r="10" />
//             <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//           </svg>
//           Block user
//         </button>
//       </div>
//     </>
//   );
// }

// export default ChatOptionsPopup;









import { useEffect, useRef, useState } from "react";

const themes = [
  {
    id: "default",
    label: "Default",
    bg: "#0a0a0a",
    bubble: "#4f46e5",
    preview: "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)",
  },
  {
    id: "midnight",
    label: "Midnight",
    bg: "linear-gradient(160deg, #0d0d2b 0%, #1a1040 100%)",
    bubble: "#7c3aed",
    preview: "linear-gradient(135deg, #0d0d2b 0%, #1a1040 100%)",
  },
  {
    id: "aurora",
    label: "Aurora",
    bg: "linear-gradient(160deg, #071a12 0%, #0a1628 100%)",
    bubble: "#059669",
    preview: "linear-gradient(135deg, #071a12 0%, #0a1628 100%)",
  },
  {
    id: "rose",
    label: "Rose",
    bg: "linear-gradient(160deg, #1a0a10 0%, #2a0d1a 100%)",
    bubble: "#e11d48",
    preview: "linear-gradient(135deg, #1a0a10 0%, #2a0d1a 100%)",
  },
  {
    id: "slate",
    label: "Slate",
    bg: "linear-gradient(160deg, #0d1117 0%, #161b22 100%)",
    bubble: "#0ea5e9",
    preview: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
  },
  {
    id: "amber",
    label: "Amber",
    bg: "linear-gradient(160deg, #12100a 0%, #1c1506 100%)",
    bubble: "#d97706",
    preview: "linear-gradient(135deg, #12100a 0%, #1c1506 100%)",
  },
];

function ChatOptionsPopup({
  onClose,
  onClearChat,
  onBlock,
  onThemeChange,
  currentTheme,
  anchorRef,
}) {
  const [showThemes, setShowThemes] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        @keyframes popupFadeIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-popup { animation: popupFadeIn 0.18s ease forwards; }

        @keyframes themesSlideIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .themes-grid { animation: themesSlideIn 0.16s ease forwards; }

        .theme-swatch {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .theme-swatch:hover {
          transform: scale(1.08);
        }
      `}</style>

      <div
        ref={popupRef}
        className="chat-popup"
        style={{
          position: "absolute",
          right: 0,
          top: 36,
          zIndex: 9999,
          width: 220,
          borderRadius: 16,
          background: "#161616",
          border: "0.5px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 16px 48px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.05) inset",
          overflow: "hidden",
        }}
      >
        {/* Theme option */}
        <div>
          <button
            onClick={() => setShowThemes((v) => !v)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              padding: "11px 14px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.8)",
              fontSize: 13,
              fontWeight: 500,
              textAlign: "left",
              transition: "background 0.15s ease",
              borderBottom: "0.5px solid rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Palette icon */}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
              </svg>
              Theme
            </div>
            {/* Current theme color dot */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: currentTheme?.bubble || "#4f46e5",
                  boxShadow: `0 0 6px ${currentTheme?.bubble || "#4f46e5"}80`,
                }}
              />
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  transform: showThemes ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </button>

          {/* Theme grid */}
          {showThemes && (
            <div
              className="themes-grid"
              style={{
                padding: "12px 14px 14px",
                borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {themes.map((theme) => {
                const isActive = currentTheme?.id === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme);
                      onClose();
                    }}
                    className="theme-swatch"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: theme.preview,
                        border: isActive
                          ? `2px solid ${theme.bubble}`
                          : "1.5px solid rgba(255,255,255,0.08)",
                        boxShadow: isActive
                          ? `0 0 12px ${theme.bubble}60`
                          : "none",
                        position: "relative",
                        overflow: "hidden",
                        transition: "border 0.15s ease, box-shadow 0.15s ease",
                      }}
                    >
                      {/* Received bubble */}
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 6,
                          width: 20,
                          height: 7,
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.14)",
                        }}
                      />
                      {/* Sent bubble */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 10,
                          right: 6,
                          width: 24,
                          height: 7,
                          borderRadius: 4,
                          background: theme.bubble,
                          opacity: 0.9,
                          boxShadow: `0 0 6px ${theme.bubble}80`,
                        }}
                      />
                      {/* Active checkmark */}
                      {isActive && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(0,0,0,0.25)",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={theme.bubble}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        color: isActive
                          ? "rgba(255,255,255,0.7)"
                          : "rgba(255,255,255,0.35)",
                        whiteSpace: "nowrap",
                        fontWeight: isActive ? 600 : 400,
                        transition: "color 0.15s ease",
                      }}
                    >
                      {theme.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Clear chat */}
        <button
          onClick={() => {
            onClearChat();
            onClose();
          }}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 14px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.8)",
            fontSize: 13,
            fontWeight: 500,
            textAlign: "left",
            transition: "background 0.15s ease",
            borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6M9 6V4h6v2" />
          </svg>
          Clear chat
        </button>

        {/* Block */}
        <button
          onClick={() => {
            onBlock();
            onClose();
          }}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 14px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#f87171",
            fontSize: 13,
            fontWeight: 500,
            textAlign: "left",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(248,113,113,0.06)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
          Block user
        </button>
      </div>
    </>
  );
}

export default ChatOptionsPopup;
