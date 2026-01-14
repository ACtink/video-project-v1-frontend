import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LandingInfo from "../components/LandingInfo";
import { useAuth } from "../hooks/useAuth";

import AppShell from "../components/AppShell";
import Layout from "../components/Layout";




function HomePage() {


const { user, loading } = useAuth();
  const [showHeader, setShowHeader] = useState(true);


  // const navigate = useNavigate();

  




  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 text-white flex flex-col">
      <Layout header={<Header />} showHeader={showHeader}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 animate-fade-in">
              {/* Spinner */}
              <div
                className="
        w-10 h-10
        rounded-full
        border-4 border-white/20
        border-t-cyan-400
        animate-spin
      "
              />

              {/* Text */}
              <span className="text-sm text-white/60 tracking-wide">
                Loading…
              </span>
            </div>
          </div>
        ) : user ? (
          <AppShell setShowHeader={setShowHeader} />
        ) : (
          <LandingInfo />
        )}
      </Layout>
    </div>
  );
}

export default HomePage;
