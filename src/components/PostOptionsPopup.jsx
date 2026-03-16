import { useEffect } from "react";

function PostOptionsPopup({ post, onClose, isOwner, anchorRef }) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = isOwner
    ? [
        {
          label: "Delete post",
          color: "#f87171",
          icon: (
            <svg
              width="14"
              height="14"
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
          ),
          action: onClose,
        },
      ]
    : [
        {
          label: "Not interested",
          color: "rgba(255,255,255,0.8)",
          icon: (
            <svg
              width="14"
              height="14"
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
          action: onClose,
        },
        {
          label: "Report post",
          color: "#f87171",
          icon: (
            <svg
              width="14"
              height="14"
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
          action: onClose,
        },
      ];

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 36,
        zIndex: 50,
        width: 180,
        borderRadius: 12,
        background: "#1f1f1f",
        border: "0.5px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        overflow: "hidden",
        animation: "fadeSlideInOption 0.18s ease forwards",
      }}
    >
      {options.map((opt, i) => (
        <button
          key={opt.label}
          onClick={opt.action}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: opt.color,
            fontSize: 13,
            fontWeight: 500,
            textAlign: "left",
            transition: "background 0.15s ease",
            borderBottom:
              i < options.length - 1
                ? "0.5px solid rgba(255,255,255,0.06)"
                : "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}


export default PostOptionsPopup;