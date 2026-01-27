/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";
import fetchData from "../utils/fetchData";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await fetchData("/api/auth/profile", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Not authenticated");

      const data = await res.json();
      setUser(data.user);
      console.log("Fetched user profile:", data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
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

      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, refreshUser: fetchProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
