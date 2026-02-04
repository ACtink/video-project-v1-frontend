import React from 'react'

import {useNavigate} from 'react-router-dom' 
import { useAuth } from '../hooks/useAuth';

function Header() {
  const navigate = useNavigate();

  const { user, loading, logout } = useAuth();


  
    const handleLogOut =() => {
      logout();
      navigate("/");
    } 

  if (loading) return null; // or spinner
  return (
    <header
      className="
  flex text-white justify-between items-center
  px-6 md:px-10 py-5 md:py-6
bg-gradient-to-br from-purple-700 via-fuchsia-800 to-rose-900
"
    >
      <h1 className="text-xl md:text-2xl font-bold tracking-wide">
        <span
          className="cursor-pointer"
          onClick={() => {
            localStorage.setItem("activeTab", "home");
            window.location.href = "/";

            //  navigate("/")
          }}
        >
          HelloStranger
        </span>
      </h1>

      <div className="flex gap-3 md:gap-4">
        {!user ? (
          <div className="flex gap-3">
            {" "}
            <button
              className="px-3 md:px-4 py-2 rounded-md border border-white/30 hover:bg-white/10 transition text-sm md:text-base"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-3 md:px-4 py-2 rounded-md  text-base 
              md:text-lg 
              font-semibold
              text-white
              bg-gradient-to-r from-purple-700 to-indigo-800
              hover:scale-105
              transition-all 
              duration-300
              shadow-xl
              text-sm
               md:text-base"
              onClick={() => navigate("/join")}
            >
              Join Now
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogOut}
            className="
    px-3 md:px-4 py-2 rounded-md
    text-sm md:text-base font-semibold
    text-white
    bg-gradient-to-r from-purple-700 to-indigo-800
    hover:scale-105
    transition-all duration-300
    shadow-xl
  "
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
} 

export default Header