import { useEffect, useRef, useState } from "react";


function PostOptionsSheet({ post, onClose, isOwner }) {
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  const handleTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (dragStartY.current === null) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    if (delta > 0) setDragY(delta);
  };

  const handleTouchEnd = () => {
    if (dragY > 80) handleClose();
    else setDragY(0);
    setIsDragging(false);
    dragStartY.current = null;
  };

  const options = isOwner
    ? [
        {
          label: "Delete post",
          icon: (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          ),
          color: "#f87171",
          action: () => {
            handleClose();
          },
        },
      ]
    : [
        {
          label: "Not interested",
          icon: (
            <svg
              width="18"
              height="18"
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
          ),
          color: "rgba(255,255,255,0.8)",
          action: () => {
            handleClose();
          },
        },
        {
          label: "Report post",
          icon: (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
          ),
          color: "#f87171",
          action: () => {
            handleClose();
          },
        },
      ];

  return (
    <>
      <style>{`
        @keyframes fadeSlideInOption {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .post-option-row {
          opacity: 0;
          animation: fadeSlideInOption 0.22s ease forwards;
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        className="fixed inset-0 bg-black/60 z-[100] md:hidden backdrop-blur-[2px]"
      />

      {/* Sheet */}
      <div
        className="fixed inset-x-0 bottom-0 z-[101] flex justify-center md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div
          style={{
            transform: visible ? `translateY(${dragY}px)` : "translateY(100%)",
            transition: isDragging
              ? "none"
              : "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
            width: "100%",
            maxWidth: 470,
            background: "#141414",
            borderRadius: "16px 16px 0 0",
            borderTop: "0.5px solid rgba(255,255,255,0.08)",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
            overflow: "hidden",
          }}
        >
          {/* Drag handle */}
          <div
            style={{
              padding: "12px 16px 0",
              cursor: "grab",
              userSelect: "none",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 99,
                  background: "rgba(255,255,255,0.15)",
                }}
              />
            </div>
          </div>

          {/* Options */}
          <div style={{ padding: "0 8px 16px" }}>
            {options.map((opt, i) => (
              <button
                key={opt.label}
                className="post-option-row"
                onClick={opt.action}
                style={{
                  animationDelay: `${i * 50}ms`,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: opt.color,
                  textAlign: "left",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {opt.icon}
                <span style={{ fontSize: 15, fontWeight: 500 }}>
                  {opt.label}
                </span>
              </button>
            ))}

            {/* Cancel */}
            <button
              onClick={handleClose}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "13px 16px",
                marginTop: 4,
                borderRadius: 12,
                background: "rgba(255,255,255,0.05)",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.4)",
                fontSize: 14,
                fontWeight: 500,
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}



export default PostOptionsSheet