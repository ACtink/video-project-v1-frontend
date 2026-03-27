import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Sun,
  Moon,
  Monitor,
  ChevronRight,
  ArrowLeft,
  User,
  Bell,
  Shield,
  LogOut,
  Palette,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

// ── Theme helpers ──────────────────────────────────────────────
const THEME_KEY = "app-theme";

function getStoredTheme() {
  return localStorage.getItem(THEME_KEY) || "dark";
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    root.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    root.setAttribute("data-theme", theme);
  }
  localStorage.setItem(THEME_KEY, theme);
}

// ── Section wrapper ────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 px-1 mb-2">
        {title}
      </p>
      <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden divide-y divide-white/8">
        {children}
      </div>
    </div>
  );
}

// ── Row ────────────────────────────────────────────────────────
function Row({ icon: Icon, label, sublabel, right, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-150
        ${onClick ? "hover:bg-white/5 active:bg-white/8" : "cursor-default"}
        ${danger ? "hover:bg-red-500/5" : ""}
      `}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
        ${danger ? "bg-red-500/10" : "bg-white/6"}`}
      >
        <Icon size={15} className={danger ? "text-red-400" : "text-white/50"} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-[14px] font-medium ${danger ? "text-red-400" : "text-white/90"}`}
        >
          {label}
        </p>
        {sublabel && (
          <p className="text-[12px] text-white/35 mt-0.5">{sublabel}</p>
        )}
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </button>
  );
}

// ── Theme picker ───────────────────────────────────────────────
const themes = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

function ThemePicker({ current, onChange }) {
  return (
    <div className="px-5 py-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/6 flex-shrink-0">
          <Palette size={15} className="text-white/50" />
        </div>
        <p className="text-[14px] font-medium text-white/90">Theme</p>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {themes.map(({ id, label, icon: Icon }) => {
          const active = current === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`relative flex flex-col items-center gap-2 py-4 rounded-xl border transition-all duration-200
                ${
                  active
                    ? "border-indigo-500/60 bg-indigo-500/10 shadow-[0_0_16px_rgba(99,102,241,0.15)]"
                    : "border-white/8 bg-white/[0.02] hover:bg-white/6 hover:border-white/15"
                }`}
            >
              {/* Preview swatch */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center
                ${
                  id === "light"
                    ? "bg-white shadow-sm"
                    : id === "dark"
                      ? "bg-[#111] border border-white/10"
                      : "bg-gradient-to-br from-white to-[#111]"
                }`}
              >
                <Icon
                  size={16}
                  className={id === "light" ? "text-gray-700" : "text-white/70"}
                />
              </div>
              <span
                className={`text-[12px] font-semibold tracking-wide
                ${active ? "text-indigo-400" : "text-white/45"}`}
              >
                {label}
              </span>
              {active && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────
function SettingsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(getStoredTheme);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleThemeChange = (t) => {
    setTheme(t);
    applyTheme(t);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="bg-black text-white min-h-[calc(100vh-72px-56px)] md:min-h-[calc(100vh-80px-56px)] overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150 active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-[20px] font-bold text-white tracking-tight">
            Settings
          </h1>
        </div>

        {/* Account info card */}
        {user && (
          <div className="flex items-center gap-4 mb-8 px-5 py-4 rounded-2xl border border-white/8 bg-white/[0.03]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 ring-2 ring-white/10">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-[18px] font-bold text-white">
                  {user.username?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 truncate">
                @{user.username}
              </p>
              {user.fullName && (
                <p className="text-[13px] text-white/40 truncate">
                  {user.fullName}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Appearance */}
        <Section title="Appearance">
          <ThemePicker current={theme} onChange={handleThemeChange} />
        </Section>

        {/* Account */}
        <Section title="Account">
          <Row
            icon={User}
            label="Edit Profile"
            sublabel="Update your photo, name, and bio"
            right={<ChevronRight size={15} className="text-white/25" />}
            onClick={() => navigate("/edit-profile")}
          />
          <Row
            icon={Shield}
            label="Privacy"
            sublabel="Manage who can see your content"
            right={<ChevronRight size={15} className="text-white/25" />}
            onClick={() => navigate("/settings/privacy")}
          />
          <Row
            icon={Bell}
            label="Notifications"
            sublabel="Push, email, and in-app alerts"
            right={<ChevronRight size={15} className="text-white/25" />}
            onClick={() => navigate("/settings/notifications")}
          />
        </Section>

        {/* Danger */}
        <Section title="Session">
          <Row
            icon={LogOut}
            label="Log out"
            sublabel={`Signed in as @${user?.username}`}
            danger
            onClick={() => setShowLogoutConfirm(true)}
          />
        </Section>

        <p className="text-center text-[11px] text-white/15 mt-6 tracking-wide">
          v1.0.0
        </p>
      </div>

      {/* Logout confirm */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-[300px] overflow-hidden">
            <div className="px-6 py-5 border-b border-white/8 text-center">
              <p className="text-[15px] font-bold text-white">Log out?</p>
              <p className="text-[12px] text-white/45 mt-1.5 leading-relaxed">
                You'll need to sign in again to access your account.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-6 py-3.5 text-[13px] font-semibold text-red-400 hover:bg-white/6 transition-colors duration-100 border-b border-white/8"
            >
              Log out
            </button>
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="w-full px-6 py-3.5 text-[13px] font-medium text-white/60 hover:bg-white/6 transition-colors duration-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
