import { Bolt, Car, GraduationCap, Bell, Ticket, Shield, CheckCircle, ArrowRight, User } from "lucide-react";
import Navbar_dash from "../components/Navbar_dash";
import { useState } from "react";
import UtilityModal from "../components/modals/UtilityModal";
import LicensePage from "./LicensePage";
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
  const diffInDays = (expiryDate - today) / (1000 * 60 * 60 * 24);
  const isExpiringSoon = diffInDays <= 60;

  if (view === "license") {
    return (
      <LicensePage
        onBack={() => setView("dashboard")}
        license={license}
        setLicense={setLicense}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar_dash />
      <div className="p-6 max-w-6xl mx-auto">
        {/* HEADER - Enhanced with gradient, trust badge, and profile image */}
        <div className="mb-8 flex justify-between items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Shield size={14} />
              <span>Secure Dashboard</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Welcome back, John 👋
            </h2>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your services
            </p>
          </div>
          
          {/* Profile Image Placeholder */}
          <div className="relative group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
              <User size={32} className="text-white" />
            </div>
            {/* Optional: Online status indicator */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </div>

        {/* SERVICES - Updated cards to match home page styling */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Your Services</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Utility - Matches home page card style */}
            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                <Bolt className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold text-xl mb-2 text-gray-900">Utility Bills</h4>
              <p className="text-gray-600 text-sm mb-4">
                Last payment: ₦15,000
              </p>
              <button 
                onClick={() => setOpenUtility(true)} 
                className="text-sm text-blue-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all group-hover:text-blue-700"
              >
                View Details <ArrowRight size={14} />
              </button>
            </div>

            {/* License - Updated with expiry in one line */}
            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                <Car className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold text-xl mb-2 text-gray-900">Driver's License</h4>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Expires: {new Date(license.expiry).toDateString()}
                  {isExpiringSoon && (
                    <span className="ml-2 text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
                      Expiring soon
                    </span>
                  )}
                </p>
              </div>
              <button 
                onClick={() => setView("license")} 
                className="text-sm text-blue-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all group-hover:text-blue-700"
              >
                View Details <ArrowRight size={14} />
              </button>
            </div>

            {/* Education - Updated with consistent styling */}
            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                <GraduationCap className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold text-xl mb-2 text-gray-900">Educational Records</h4>
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 inline-flex px-2 py-1 rounded-full">
                  <CheckCircle size={14} />
                  <span className="text-xs font-medium">WAEC Verified</span>
                </div>
              </div>
              <Link to="/records" className="text-sm text-blue-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all group-hover:text-blue-700">
                View Details <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY - Enhanced with better styling */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Recent Activity</h3>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {[
              { activity: "Electricity bill paid", date: "2 days ago", icon: Bolt },
              { activity: "Internet bill paid", date: "2 days ago", icon: Bolt },
              { activity: "Driver's license renewal started", date: "1 week ago", icon: Car },
              { activity: "JAMB result verified", date: "2 weeks ago", icon: GraduationCap },
              { activity: "WAEC result uploaded ✓", date: "2 weeks ago", icon: CheckCircle }
            ].map((item, idx) => (
              <div key={idx} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <item.icon size={16} className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">{item.activity}</span>
                </div>
                <span className="text-gray-500 text-sm">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS - New section matching home page */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Need Assistance?</h3>
                <p className="text-gray-300 text-sm">Get help with any of your services</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-200 border border-white/20">
                  Contact Support
                </button>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-200">
                  View FAQ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* POWERED BY INTERSWITCH - Enhanced */}
        <div className="text-center pt-6 border-t border-gray-200">
          <div className="inline-flex items-center gap-2 text-xs text-gray-400">
            <Shield size={12} />
            <span>Secured by</span>
            <span className="font-medium text-gray-500">Interswitch</span>
            <span>•</span>
            <span>256-bit Encryption</span>
          </div>
        </div>
      </div>

      {openUtility && (
        <UtilityModal onClose={() => setOpenUtility(false)} />
      )}
    </div>
  );
}

export default Dashboard;