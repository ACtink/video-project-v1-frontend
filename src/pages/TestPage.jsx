import React from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../utils/fetchData";

function TestPage() {
  const [userData, setUserData] = React.useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await fetchData("/api/auth/profile", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      console.log("Logged in user data:", data);

      setUserData(data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetchData("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      console.log("Logout response:", data);

      setUserData(null);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-2">User Dashboard</h1>
        <p className="text-center text-white/80 mb-6">
          Check your login status
        </p>

        {/* User Info */}
        {userData ? (
          <div className="bg-white/20 rounded-xl p-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">Logged-in User</h2>
            <p className="text-sm text-white/90">
              <span className="font-medium">Email:</span> {userData.email}
            </p>
          </div>
        ) : (
          <div className="bg-white/10 rounded-xl p-4 mb-6 text-center text-white/80">
            No user data loaded
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={getData}
            className="w-full py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 transition active:scale-[0.98]"
          >
            Check who is logged in
          </button>

          <button
            onClick={logout}
            className="w-full py-3 rounded-xl font-semibold bg-red-500 hover:bg-red-600 transition active:scale-[0.98]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
