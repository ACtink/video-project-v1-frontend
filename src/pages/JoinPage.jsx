import { useState } from "react";
import { joinUser } from "../api/auth";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { COUNTRIES } from "../data/countries";
import CountrySelect from "../components/CountrySelect";
import GenderSelect from "../components/GenderSelect";

const JoinPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    country: "",
    acceptedTerms: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.age) < 16) {
      setError("You must be at least 16 years old to use this platform.");
      return;
    }

    if (!formData.acceptedTerms) {
      setError("You must agree to the Terms & Conditions to continue.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await joinUser({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        age: Number(formData.age),
        country: formData.country.trim(),
        gender: formData.gender,
        acceptedTerms: formData.acceptedTerms,
        
      });

      setSuccess(true);

      setFormData({
        username: "",
        email: "",
        password: "",
        age: "",
        country: "",
        gender: "",
        acceptedTerms: false,
      });
    } catch (err) {
      console.log(err.message);
      setError(err.message || "Failed to create account");
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
          w-full max-w-2xl
          rounded-2xl
          p-2 sm:p-8
          bg-white/20
          backdrop-blur-2xl
          border border-white/30
          shadow-[0_20px_50px_rgba(0,0,0,0.25)]
        "
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white">
            Join the Community
          </h2>
          <p className="text-center text-white/80 mt-2">
            Sign up to connect, share, and engage in real conversations
          </p>

          {success && (
            <p className="mt-4 text-green-300 text-center font-medium">
              Account created successfully 🎉
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="cool_stranger"
                  autoComplete="username"
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-500 border border-white/40 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
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
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-500 border border-white/40 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  min="16"
                  value={formData.age}
                  placeholder="16+ only"
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-500 border border-white/40 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* ===================== COUNTRY ===================== */}
  <div>
    <label className="block text-sm font-medium text-white">
      Country
    </label>

    <CountrySelect
      value={formData.country}
      countries={COUNTRIES}
      onChange={(code) =>
        setFormData((prev) => ({ ...prev, country: code }))
      }
    />
  </div>

  {/* ===================== GENDER ===================== */}
  <div>
    <label className="block text-sm font-medium text-white">
      Gender
    </label>

    <GenderSelect
      value={formData.gender}
      onChange={(val) =>
        setFormData((prev) => ({ ...prev, gender: val }))
      }
    />
  </div>
</div>

              </div>
     

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                required
                id="acceptedTerms"
                className="mt-1"
              />
              <label htmlFor="acceptedTerms" className="text-sm text-white/90">
                I confirm that I am at least 16 years old and agree to the{" "}
                <span className="text-indigo-200 font-medium hover:underline cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-indigo-200 font-medium hover:underline cursor-pointer">
                  Community Guidelines
                </span>
                .
              </label>
            </div>

            {error && (
              <p className="text-red-300 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={!formData.acceptedTerms || loading}
              className={`w-full py-3 rounded-xl font-semibold text-lg transition-all
              ${
                !loading && formData.acceptedTerms
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
                  : "bg-white/40 text-white/60 cursor-not-allowed"
              }`}
            >
              {loading ? "Creating account..." : "Join Now"}
            </button>
          </form>
          <p className="text-center text-sm text-white mt-6">
            Already joined?{" "}
            <span className="text-indigo-200 font-medium cursor-pointer sm:hover:underline">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default JoinPage;
