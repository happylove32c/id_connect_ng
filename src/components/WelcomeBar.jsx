import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function WelcomeBar() {
  const [name, setName] = useState("User");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      const user = data?.user;

      if (user) {
        // Try to get name from Google or metadata
        const fullName =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email;

        // Optional: get first name only
        const firstName = fullName.split(" ")[0];

        setName(firstName);
      }
    };

    getUser();
  }, []);

  return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <span>Secure Dashboard</span>
          </div>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Welcome back, {name} 👋
          </h2>

          <p className="text-gray-600 mt-2">
            Here's what's happening with your services
          </p>
        </div>
      </div>
  );
}

export default WelcomeBar;