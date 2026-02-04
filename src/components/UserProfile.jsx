import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileView from "./views/ProfileView";
import AppShell from "./AppShell";
import { Loader } from "lucide-react";
import Header from "./Header";
import fetchData from "../utils/fetchData";

function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(undefined); // undefined = loading
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        setNotFound(false);
        setUser(undefined); // trigger loading

        const res = await fetchData(`/api/users/profile/${username}`, {
          credentials: "include",
        });

        // ❌ User does not exist
        if (res.status === 404) {
          if (isMounted) {
            setNotFound(true);
            setUser(null);
          }
          return;
        }

        // ❌ Other error
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();

        if (isMounted) {
          setUser(data);
        }
      } catch (err) {
        console.error("Fetch user error:", err);
        if (isMounted) {
          setNotFound(true);
          setUser(null);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="shrink-0">
        <Header />
      </div>

      {/* CONTENT */}
      {user === undefined ? (
        // ⏳ LOADING STATE
        <div className="flex-1 bg-black text-white flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-white/70" />
        </div>
      ) : user ? (
        // ✅ USER FOUND
        <ProfileView user={user} />
      ) : (
        // ❌ USER NOT FOUND
        <div className="flex-1 bg-black text-white flex justify-center">
          <div className="w-full max-w-[935px] px-4 pt-10 pb-36 overflow-y-auto">
            {/* GO BACK BUTTON */}
            <div className="mb-6 flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm sm:text-base px-2 py-1 rounded-lg hover:bg-white/10 transition"
              >
                <span className="text-lg sm:text-xl">←</span>
                <span className="hidden sm:inline">Go back</span>
              </button>
            </div>

            {/* USER NOT FOUND CONTENT */}
            <div className="mt-20 flex flex-col items-center text-center gap-3">
              <p className="text-lg font-semibold text-white">User not found</p>
              <p className="text-sm text-white/60 max-w-sm">
                The profile you’re looking for doesn’t exist or may have been
                removed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
