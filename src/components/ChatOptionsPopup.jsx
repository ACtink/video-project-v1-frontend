import { useEffect, useRef, useState } from "react";

const themes = [
  { id: "default", label: "Default", bg: "#0a0a0a" },
  { id: "midnight", label: "Midnight", bg: "#0d0d1a" },
  { id: "forest", label: "Forest", bg: "#0a120a" },
  { id: "wine", label: "Wine", bg: "#120a0e" },
  { id: "slate", label: "Slate", bg: "#0d1117" },
  { id: "sand", label: "Sand", bg: "#12100a" },
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
        .chat-popup {
          animation: popupFadeIn 0.18s ease forwards;
        }
        @keyframes themesSlideIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .themes-grid {
          animation: themesSlideIn 0.16s ease forwards;
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
          width: 210,
          borderRadius: 14,
          background: "#1a1a1a",
          border: "0.5px solid rgba(255,255,255,0.1)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
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
                <path d="M12 2a10 10 0 0 1 0 20" />
                <path d="M2 12h20" />
                <path d="M12 2c2.76 4 4 8 4 10s-1.24 6-4 10" />
                <path d="M12 2c-2.76 4-4 8-4 10s1.24 6 4 10" />
              </svg>
              Theme
            </div>
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
          </button>

          {/* Theme grid */}
          {showThemes && (
            <div
              className="themes-grid"
              style={{
                padding: "10px 14px 12px",
                borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme);
                    onClose();
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 5,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: theme.bg,
                      border:
                        currentTheme?.id === theme.id
                          ? "2px solid #a78bfa"
                          : "1.5px solid rgba(255,255,255,0.12)",
                      transition: "border 0.15s ease",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Mini chat bubble preview */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 8,
                        right: 6,
                        width: 22,
                        height: 7,
                        borderRadius: 4,
                        background: "#7c3aed",
                        opacity: 0.9,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 18,
                        left: 6,
                        width: 18,
                        height: 7,
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.15)",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.4)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {theme.label}
                  </span>
                </button>
              ))}
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
