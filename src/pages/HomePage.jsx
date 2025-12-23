import React from "react";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LandingInfo from "../components/LandingInfo";
import { useAuth } from "../hooks/useAuth";

import AppShell from "../components/AppShell";
import Layout from "../components/Layout";




function HomePage() {


  const { user } = useAuth();

  const navigate = useNavigate();

  




  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 text-white flex flex-col">
      

      <Layout header={<Header />}>
        {!user ? <LandingInfo /> : <AppShell />}
      </Layout>

    
    </div>
  );
}

export default HomePage;
