import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import fetchData from "../utils/fetchData";
import { COUNTRIES } from "../data/countries";
import CountrySelect from "../components/CountrySelect";

function EditProfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [bio, setBio] = useState(user?.bio || "");

  const countriesList = Object.values(COUNTRIES);

  // Convert country name -> code (for CountrySelect)
  const getCountryCode = (name) => {
    const c = countriesList.find((c) => c.name === name);
    return c ? c.code : "";
  };

  // Convert code -> name (for backend storage)
  const getCountryName = (code) => {
    const c = countriesList.find((c) => c.code === code);
    return c ? c.name : "";
  };

  const [country, setCountry] = useState(getCountryCode(user?.country));

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await fetchData("/api/users/edit-profile", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          bio,
          country: getCountryName(country), // store name in DB
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updatedUser = await res.json();

      setUser(updatedUser);

      navigate(`/profile`);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex justify-center">
      <div className="w-full max-w-xl px-6 py-10 space-y-6">
        <h1 className="text-xl font-semibold">Edit Profile</h1>

        {/* USERNAME */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-white/60">Username</label>
          <input
            value={user?.username}
            disabled
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/60"
          />
        </div>

        {/* FULL NAME */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-white/60">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-white/30"
          />
        </div>

        {/* BIO */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-white/60">Bio</label>
          <textarea
            value={bio}
            maxLength={150}
            onChange={(e) => setBio(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-white/30"
            rows={3}
          />
          <span className="text-xs text-white/40">{bio.length}/150</span>
        </div>

        {/* COUNTRY */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-white/60">Country</label>

          <CountrySelect
            value={country}
            onChange={setCountry}
            countries={countriesList}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 border border-white/20 rounded-lg py-2 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg py-2 transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
