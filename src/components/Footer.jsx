import { Home, Video, MessageCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { path: "/", icon: Home },
  { path: "/video", icon: Video },
  { path: "/chat", icon: MessageCircle },
  { path: "/profile", icon: User },
];

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="fixed bottom-0 left-0 w-full z-50
                    bg-gradient-to-br from-purple-700 via-fuchsia-800 to-rose-900"
    >
      <div
        className="
        w-full flex justify-around px-2 py-3 bg-black/40

        sm:w-fit sm:mx-auto sm:gap-3 sm:px-6 sm:rounded-2xl sm:justify-center
      "
      >
        {tabs.map(({ path, icon: Icon }) => {
          const isActive =
            location.pathname === path ||
            (path === "/profile" && location.pathname.startsWith("/profile"));

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`
                p-3 rounded-xl

                ${
                  isActive
                    ? "text-fuchsia-700 bg-white"
                    : "text-white/80 hover:bg-white/10"
                }
              `}
            >
              <Icon size={22} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Footer;
