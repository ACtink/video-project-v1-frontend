import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { websocketContext } from "../context/WebSocket";
import {
  LogOut,
  Wifi,
  WifiOff,
  Bell,
  ChevronDown,
  Settings,
  User,
} from "lucide-react";
import fetchData from "../utils/fetchData";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, logout } = useAuth();
  const { wsConnected } = useContext(websocketContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef(null);

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  // ── Unread notifications ───────────────────────────────────────────────────
  const fetchUnreadCount = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetchData("/api/notifications/unread-count", {
        credentials: "include",
      });
      const data = await res.json();
      setUnreadCount(data.count ?? 0);
    } catch {
      /* silent — badge simply won't show */
    }
  }, [user]);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount, location.pathname]);

  useEffect(() => {
    const handler = () => setUnreadCount(0);
    window.addEventListener("notifications:read-all", handler);
    return () => window.removeEventListener("notifications:read-all", handler);
  }, []);

  // ── Close menu on outside click ────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading) return null;

  return (
    <>
      <style>{`
        /* Dropdown fade-slide animation */
        @keyframes hdr-drop-in {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .hdr-dropdown { animation: hdr-drop-in 0.15s ease forwards; }

        /* Ensure the bell badge never wraps */
        .hdr-bell { position: relative; flex-shrink: 0; }

        /* Logo text: hide on very small screens */
        @media (max-width: 359px) { .hdr-logo-text { display: none !important; } }

        /*
         * All text in the header uses clamp(min, fluid-vw, max).
         * min  = smallest readable size on a 320px phone
         * mid  = scales proportionally with viewport width
         * max  = caps at a comfortable desktop size
         */

        /* Logo wordmark: 13px → 15px */
        .hdr-logo-text       { font-size: clamp(13px, 3.5vw, 15px) !important; }

        /* Auth buttons (Login / Join Now): 12px → 14px */
        .hdr-btn-auth        { font-size: clamp(12px, 3vw, 14px) !important; }

        /* Status chip username (≥520px): 11px → 12px */
        .hdr-chip-username   { font-size: clamp(11px, 2.8vw, 12px) !important; }

        /* Mobile dot chip username: 10px → 11px */
        .hdr-dot-username    { font-size: clamp(10px, 2.5vw, 11px) !important; }

        /* Notification badge count: fixed 9px — must stay tiny, no scaling */
        .hdr-badge-count     { font-size: 9px !important; }

        /* Avatar initial inside button circle: fixed 9px */
        .hdr-avatar-initial  { font-size: 9px !important; }

        /* Dropdown username header: 11px → 13px */
        .hdr-drop-username   { font-size: clamp(11px, 2.8vw, 13px) !important; }

        /* Dropdown menu items (Profile, Settings, Log out): 12px → 13px */
        .hdr-drop-item       { font-size: clamp(12px, 3vw, 13px) !important; }

        /* Logo icon "QC" text: fixed 10px — fits inside 28px box */
        .hdr-logo-icon-text  { font-size: 10px !important; }
      `}</style>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 998,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px clamp(12px, 4vw, 40px)",
          background: "rgba(6,6,16,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxSizing: "border-box",
          gap: 8,
        }}
      >
        {/* ── Logo ────────────────────────────────────────────────────────── */}
        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              flexShrink: 0,
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(99,102,241,0.35)",
            }}
          >
            {/* fixed 10px — must fit inside 28px box, no scaling needed */}
            <span
              className="hdr-logo-icon-text"
              style={{
                color: "#fff",
                fontWeight: 900,
                letterSpacing: "-0.03em",
              }}
            >
              QC
            </span>
          </div>
          <span
            className="hdr-logo-text"
            style={{
              fontWeight: 700,
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            quikchat
          </span>
        </div>

        {/* ── Right side ──────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(6px,2vw,12px)",
            flexShrink: 0,
          }}
        >
          {/* ── LOGGED OUT ── */}
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hdr-btn-auth"
                style={{
                  padding: "8px clamp(10px,2.5vw,18px)",
                  borderRadius: 11,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.65)",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/join")}
                className="hdr-btn-auth"
                style={{
                  padding: "8px clamp(10px,2.5vw,18px)",
                  borderRadius: 11,
                  border: "none",
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: "0 0 20px rgba(99,102,241,0.35)",
                  transition: "all 0.15s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 28px rgba(99,102,241,0.55)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(99,102,241,0.35)")
                }
              >
                Join Now
              </button>
            </>
          ) : (
            <>
              {/* ── WS / username chip — hidden on very small screens ── */}
              <div
                style={{
                  display: "none",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 10px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  maxWidth: 130,
                }}
                className="hdr-status-chip"
              >
                {wsConnected ? (
                  <Wifi size={11} color="#34d399" style={{ flexShrink: 0 }} />
                ) : (
                  <WifiOff
                    size={11}
                    color="rgba(255,255,255,0.2)"
                    style={{ flexShrink: 0 }}
                  />
                )}
                <span
                  className="hdr-chip-username"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.username}
                </span>
              </div>

              {/* ── Mobile status dot (always visible) ── */}
              <div
                style={{ display: "flex", alignItems: "center", gap: 5 }}
                className="hdr-dot-chip"
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: wsConnected
                      ? "#22c55e"
                      : "rgba(255,255,255,0.2)",
                    boxShadow: wsConnected
                      ? "0 0 0 2px rgba(34,197,94,0.2)"
                      : "none",
                  }}
                />
                <span
                  className="hdr-dot-username"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 500,
                    maxWidth: 80,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.username}
                </span>
              </div>

              {/* ── Bell ── */}
              <div className="hdr-bell">
                <button
                  onClick={() => navigate("/notifications")}
                  aria-label="Notifications"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.09)",
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.55)",
                    transition: "all 0.15s ease",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Bell size={15} />
                </button>
                {unreadCount > 0 && (
                  <span
                    className="hdr-badge-count"
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      minWidth: 16,
                      height: 16,
                      padding: "0 3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#ef4444",
                      color: "#fff",
                      fontWeight: 800,
                      borderRadius: 99,
                      border: "2px solid #060610",
                      lineHeight: 1,
                      pointerEvents: "none",
                    }}
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </div>

              {/* ── Single unified dropdown ── */}
              <div
                ref={menuRef}
                style={{ position: "relative", flexShrink: 0 }}
              >
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label="Account menu"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "5px 8px 5px 5px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.09)",
                    background: menuOpen
                      ? "rgba(255,255,255,0.07)"
                      : "transparent",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.65)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.07)")
                  }
                  onMouseLeave={(e) => {
                    if (!menuOpen)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  {/* Avatar circle */}
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      /* fixed 9px — must fit inside 24px circle */
                      <span
                        className="hdr-avatar-initial"
                        style={{
                          color: "#fff",
                          fontWeight: 800,
                          textTransform: "uppercase",
                        }}
                      >
                        {user.username?.[0] ?? "U"}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    size={12}
                    style={{
                      transition: "transform 0.2s ease",
                      transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                      flexShrink: 0,
                    }}
                  />
                </button>

                {menuOpen && (
                  <div
                    className="hdr-dropdown"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 8px)",
                      width: 172,
                      background: "#111118",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow:
                        "0 12px 40px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
                      zIndex: 999,
                    }}
                  >
                    {/* Username header inside dropdown */}
                    <div
                      style={{
                        padding: "11px 14px 9px",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div
                        className="hdr-drop-username"
                        style={{
                          fontWeight: 700,
                          color: "#e2e8f0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user.username}
                      </div>
                    </div>

                    {/* Menu items */}
                    {[
                      {
                        icon: <User size={12} />,
                        label: "Profile",
                        path: "/profile",
                      },
                      {
                        icon: <Settings size={12} />,
                        label: "Settings",
                        path: "/settings",
                      },
                    ].map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          setMenuOpen(false);
                          navigate(item.path);
                        }}
                        className="hdr-drop-item"
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 9,
                          padding: "10px 14px",
                          background: "transparent",
                          border: "none",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.6)",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.12s ease",
                          fontFamily: "inherit",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.05)";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogOut();
                      }}
                      className="hdr-drop-item"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 9,
                        padding: "10px 14px",
                        background: "transparent",
                        border: "none",
                        fontWeight: 500,
                        color: "#f87171",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.12s ease",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(239,68,68,0.08)";
                        e.currentTarget.style.color = "#fca5a5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#f87171";
                      }}
                    >
                      <LogOut size={12} />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Responsive helpers — show/hide chips based on screen width */}
      <style>{`
        .hdr-status-chip { display: none !important; }
        .hdr-dot-chip    { display: flex  !important; }
        @media (min-width: 520px) {
          .hdr-status-chip { display: flex !important; }
          .hdr-dot-chip    { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default Header;