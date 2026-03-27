import React, { useEffect } from "react";
import { supabase } from "../../supabaseClient";
import WelcomeBar from "../components/WelcomeBar";
import { ArrowRight, Bolt } from "lucide-react";
import Utility from "../components/Utility";

function Dashboard() {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <WelcomeBar />

      <div className="p-6 max-w-6xl mx-auto">

        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Your Services</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <Utility />
          </div>
        </div>

      </div>


    </div>
      {/* <h1>Dashboard</h1> */}
      {/* <button onClick={handleLogout}>Logout</button> */}
    </>
  );
}

export default Dashboard;