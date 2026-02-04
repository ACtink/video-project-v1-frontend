import { useState } from "react";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      setFormData({ email: "", password: "" });
      await refreshUser();
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white flex flex-col relative overflow-hidden">
      <Header />

      {/* Soft glow behind card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-6 sm:px-0 sm:py-0 relative z-10">
        <div
          className="
            w-full max-w-md
            rounded-2xl
            p-6 sm:p-8
            bg-white/20
            backdrop-blur-2xl
            border border-white/30
            shadow-[0_20px_50px_rgba(0,0,0,0.25)]
            max-h-[85vh] overflow-y-auto
          "
        >
          {/* Header */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-purple-300 via-indigo-300 to-white bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-center text-white/60 mt-2 tracking-wide">
            Log in to continue the conversation
          </p>

          {/* Error */}
          {error && (
            <p className="mt-4 text-red-300 text-sm text-center">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                autoComplete="email"
                className="mt-1 w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-500 border border-white/40 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                autoComplete="current-password"
                className="mt-1 w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-500 border border-white/40 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-lg transition-all
                ${
                  !loading
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
                    : "bg-white/40 text-white/60 cursor-not-allowed"
                }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-white/80 text-sm">
            Don’t have an account?{" "}
            <span className="text-indigo-200 font-medium cursor-pointer hover:underline">
              <Link to="/join"> Join Now </Link>
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
