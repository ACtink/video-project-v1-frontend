import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, KeyRound, CheckCircle2 } from "lucide-react";
import fetchData from "../utils/fetchData";

function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  show,
  onToggle,
  error,
}) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-white/40 uppercase tracking-widest mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 pr-11 text-[14px] text-white placeholder-white/20 outline-none transition-all duration-150
            focus:bg-white/[0.06]
            ${error ? "border-red-500/50 focus:border-red-500/80" : "border-white/10 focus:border-indigo-500/60"}`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-[12px] text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(null);

  const toggleShow = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const validate = () => {
    const e = {};
    if (!form.currentPassword) e.currentPassword = "Required";
    if (!form.newPassword) e.newPassword = "Required";
    else if (form.newPassword.length < 8)
      e.newPassword = "Must be at least 8 characters";
    else if (form.newPassword === form.currentPassword)
      e.newPassword = "New password must be different from current";
    if (!form.confirmPassword) e.confirmPassword = "Required";
    else if (form.confirmPassword !== form.newPassword)
      e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setServerError(null);
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    try {
      setLoading(true);
      setServerError(null);
      const res = await fetchData("/api/users/change-password", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Failed to change password");
      }

      setSuccess(true);
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
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
            Change Password
          </h1>
        </div>

        {/* Success state */}
        {success ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <CheckCircle2 size={28} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-white">
                Password updated
              </p>
              <p className="text-[13px] text-white/40 mt-1">
                Your password has been changed successfully.
              </p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="mt-2 px-6 py-2.5 text-[13px] font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150"
            >
              Back to Settings
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 space-y-5">
            {/* Icon */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-white/6 flex items-center justify-center">
                <KeyRound size={16} className="text-white/50" />
              </div>
              <p className="text-[13px] text-white/40 leading-relaxed">
                Choose a strong password at least 8 characters long.
              </p>
            </div>

            <PasswordInput
              label="Current Password"
              value={form.currentPassword}
              onChange={handleChange("currentPassword")}
              placeholder="Enter current password"
              show={show.currentPassword}
              onToggle={() => toggleShow("currentPassword")}
              error={errors.currentPassword}
            />

            <PasswordInput
              label="New Password"
              value={form.newPassword}
              onChange={handleChange("newPassword")}
              placeholder="Enter new password"
              show={show.newPassword}
              onToggle={() => toggleShow("newPassword")}
              error={errors.newPassword}
            />

            <PasswordInput
              label="Confirm New Password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder="Confirm new password"
              show={show.confirmPassword}
              onToggle={() => toggleShow("confirmPassword")}
              error={errors.confirmPassword}
            />

            {/* Server error */}
            {serverError && (
              <p className="text-[13px] text-red-400 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3">
                {serverError}
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 text-[14px] font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
