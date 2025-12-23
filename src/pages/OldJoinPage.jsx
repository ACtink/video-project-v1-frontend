import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";



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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;


    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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

    try {
      // 1️⃣ Create user with email & password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      console.log("User created:", user.uid);

      // Store extra user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        email: formData.email,
        age: Number(formData.age),
        country: formData.country,
        acceptedTerms: true,
        createdAt: new Date(),
      });

      console.log("User created & data saved");

      // 3️⃣ Redirect or move to next page
      // navigate("/chat");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Join the Conversation
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Meet new people anonymously
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Grid Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="username"
                placeholder="cool_stranger"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="password"
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="age"
                min="16"
                value={formData.age}
                onChange={handleChange}
                required
                placeholder="16+ only"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Country (full width on desktop for balance) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="Your country"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="acceptedTerms"
              id="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="acceptedTerms" className="text-sm text-gray-600">
              I confirm that I am at least 16 years old and agree to the{" "}
              <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
                Community Guidelines
              </span>
              .
            </label>
          </div>

          {/* Error */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={!formData.acceptedTerms}
            className={`w-full py-2 rounded-lg font-semibold transition
              ${
                formData.acceptedTerms
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Join Now
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already joined?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default JoinPage;
