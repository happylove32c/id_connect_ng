import { Bolt, Car, GraduationCap, Bell, Ticket } from "lucide-react";
import Navbar_dash from "../components/Navbar_dash";
import { useState } from "react";
import UtilityModal from "../components/modals/UtilityModal";
import LicensePage from "../components/LicensePage";
import { Link } from "react-router-dom";


function Dashboard() {
  const [openUtility, setOpenUtility] = useState(false);
  const [view, setView] = useState("dashboard");
  const [license, setLicense] = useState({
    name: "John Doe",
    number: "DL-1234-5678",
    expiry: "2026-02-03"
  });

  const expiryDate = new Date(license.expiry);
  const today = new Date();
  const diffInDays =
    (expiryDate - today) / (1000 * 60 * 60 * 24);
  const isExpiringSoon = diffInDays <= 60;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar_dash />
      <div className="p-6 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Welcome back, John 👋</h2>
          <p className="text-gray-600">
            Here’s what’s happening with your services
          </p>
        </div>


        {/* SERVICES */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Your Services</h3>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Utility */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <Bolt className="mb-3" />
              <h4 className="font-semibold text-lg">Utility Bills</h4>
              <p className="text-gray-600 text-sm mb-3">
                Last payment: ₦15,000
              </p>
              <button onClick={() => setOpenUtility(true)} className="text-sm text-black font-medium">
                View Details →
              </button>
            </div>

            {/* 
              
            */}

            {/* License */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <Car className="mb-3" />
              <h4 className="font-semibold text-lg">Driver’s License</h4>
              <p
                className={`text-sm mb-3 ${
                  isExpiringSoon ? "text-red-500" : "text-gray-600"
                }`}
              >
                Expires: {new Date(license.expiry).toDateString()}
              </p>

              {isExpiringSoon && (
                <p className="text-xs text-red-500 mb-2">
                  Expiring soon
                </p>
              )}

              <button onClick={() => setView("license")} className="text-sm text-black font-medium">
                View →
              </button>
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <GraduationCap className="mb-3" />
              <h4 className="font-semibold text-lg">Educational Records</h4>
              <p className="text-gray-600 text-sm mb-3">
                WAEC Verified ✅
              </p>
              <Link to="/records" className="text-sm text-black font-medium">
                View Details →
              </Link>
            </div>

          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>

          <div className="bg-white rounded-2xl shadow-sm divide-y">

            <div className="p-4 flex justify-between">
              <span>Electricity bill paid</span>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>

            <div className="p-4 flex justify-between">
              <span>Internet bill paid</span>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>

            <div className="p-4 flex justify-between">
              <span>Driver’s license renewal started</span>
              <span className="text-gray-500 text-sm">1 week ago</span>
            </div>

            <div className="p-4 flex justify-between">
              <span>JAMB result verified</span>
              <span className="text-gray-500 text-sm">2 weeks ago</span>
            </div>

            <div className="p-4 flex justify-between">
              <span>WAEC result uploaded ✓ </span>
              <span className="text-gray-500 text-sm">2 weeks ago</span>
            </div>

          </div>
        </div>

        

      </div>

        {openUtility && (
            <UtilityModal onClose={() => setOpenUtility(false)} />
        )}

        {view === "license" && (
          <LicensePage
            onBack={() => setView("dashboard")}
            license={license}
            setLicense={setLicense}
          />
        )}

        
    </div>
  );
}



export default Dashboard;