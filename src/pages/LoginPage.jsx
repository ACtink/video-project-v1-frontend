import { useState } from "react";
import { loginUser } from "../api/auth"; // adjust path if needed

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("Login successful:", response);
      setFormData({
        email: "",
        password: "",
      });   

      await refreshUser();

      navigate('/');

      // handle redirect after login if needed
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
      <div
        className="
          w-full max-w-md
          rounded-2xl
          p-6 sm:p-8
          bg-white/20
          backdrop-blur-2xl
          sm:mx-6
          md:mx-2
          
          border border-white/30
          shadow-[0_20px_50px_rgba(0,0,0,0.25)]
        "
      >
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white">
          Welcome Back
        </h2>
        <p className="text-center text-white/80 mt-2">
          Log in to continue the conversation
        </p>

        {/* Error */}
        {error && (
          <p className="mt-4 text-red-300 text-sm text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email */}
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

          {/* Password */}
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

          {/* Submit */}
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
