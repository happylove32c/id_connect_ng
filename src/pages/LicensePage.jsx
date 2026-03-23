import { ArrowLeft, Car, Calendar, IdCard, AlertTriangle, Shield, CheckCircle, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RenewModal from "../components/modals/RenewModal";

function LicensePage({ license, onBack }) {
  const [showRenew, setShowRenew] = useState(false);
  const navigate = useNavigate();

  const expiryDate = new Date(license.expiry);
  const today = new Date();
  const diffInDays = (expiryDate - today) / (1000 * 60 * 60 * 24);
  const isExpiringSoon = diffInDays <= 60;
  const isExpired = diffInDays <= 0;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const getStatusDetails = () => {
    if (isExpired) {
      return {
        text: "Expired",
        color: "text-red-600",
        bg: "bg-red-50",
        icon: AlertTriangle,
        message: "Your license has expired. Please renew immediately to stay compliant."
      };
    } else if (isExpiringSoon) {
      return {
        text: "Expiring Soon",
        color: "text-orange-600",
        bg: "bg-orange-50",
        icon: AlertTriangle,
        message: `Your license expires in ${Math.ceil(diffInDays)} days. Renew now to avoid disruption.`
      };
    } else {
      return {
        text: "Valid",
        color: "text-green-600",
        bg: "bg-green-50",
        icon: CheckCircle,
        message: "Your license is valid and in good standing."
      };
    }
  };

  const status = getStatusDetails();
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        
        {/* BACK BUTTON - Enhanced */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-all duration-200"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>

        {/* PAGE HEADER */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Shield size={14} />
            <span>Official Document</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Driver's License
          </h2>
          <p className="text-gray-600 mt-2">
            View and manage your driver's license information
          </p>
        </div>

        {/* STATUS ALERT - Enhanced */}
        {(isExpiringSoon || isExpired) && (
          <div className={`${status.bg} border-l-4 ${
            isExpired ? "border-red-500" : "border-orange-500"
          } rounded-xl p-4 mb-6 flex items-start gap-3`}>
            <StatusIcon size={20} className={status.color} />
            <div className="flex-1">
              <p className={`font-semibold ${status.color}`}>
                {status.text}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {status.message}
              </p>
            </div>
          </div>
        )}

        {/* LICENSE CARD - Redesigned to match home page styling */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden mb-8">
          {/* Card Header with Gradient */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
            <div className="flex items-center gap-2">
              <Car size={20} className="text-white" />
              <h3 className="text-white font-semibold">License Information</h3>
            </div>
          </div>
          
          {/* Card Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              
              {/* Avatar/Photo Placeholder */}
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300">
                  <User size={40} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              
              {/* License Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{license.name}</h3>
                  <p className="text-sm text-gray-500">License Holder</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <IdCard size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">License Number</p>
                      <p className="text-sm font-mono font-semibold text-gray-900">{license.number}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Expiry Date</p>
                      <p className={`text-sm font-semibold ${
                        isExpired ? "text-red-600" : isExpiringSoon ? "text-orange-600" : "text-gray-900"
                      }`}>
                        {new Date(license.expiry).toDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mt-2" style={{
                  backgroundColor: status.bg,
                  color: status.color
                }}>
                  <StatusIcon size={14} />
                  <span className="text-xs font-medium">{status.text}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ADDITIONAL INFO CARDS - New section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Driving Classes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Car size={20} className="text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Driving Classes</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Class A (Motorcycle)</span>
                <span className="text-green-600 font-medium">✓ Authorized</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Class B (Car)</span>
                <span className="text-green-600 font-medium">✓ Authorized</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Class C (Truck)</span>
                <span className="text-gray-400">Not Authorized</span>
              </div>
            </div>
          </div>

          {/* Restrictions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Restrictions</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-green-600" />
                <span>Corrective lenses required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-green-600" />
                <span>Daylight driving only</span>
              </div>
            </div>
          </div>
        </div>

        {/* RENEWAL INFO - Enhanced */}
        {(isExpiringSoon || isExpired) && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Ready to Renew?</h4>
                <p className="text-sm text-gray-600">
                  Renewal process takes less than 5 minutes. Have your documents ready.
                </p>
              </div>
              <button
                onClick={() => setShowRenew(true)}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group"
              >
                Renew License Now
                <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* VALID LICENSE ACTION */}
        {!isExpiringSoon && !isExpired && (
          <div className="bg-green-50 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">License Status: Active</h4>
                <p className="text-sm text-gray-600">
                  Your license is valid. You'll receive a renewal reminder 60 days before expiry.
                </p>
              </div>
              <button
                onClick={() => setShowRenew(true)}
                className="bg-white text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 border border-gray-200 flex items-center gap-2"
              >
                View Renewal Options
              </button>
            </div>
          </div>
        )}

        {/* POWERED BY INTERSWITCH */}
        <div className="text-center pt-8 mt-4 border-t border-gray-200">
          <div className="inline-flex items-center gap-2 text-xs text-gray-400">
            <Shield size={12} />
            <span>Secured by</span>
            <span className="font-medium text-gray-500">Interswitch</span>
            <span>•</span>
            <span>Official Government Portal</span>
          </div>
        </div>
      </div>

      {/* RENEW MODAL */}
      {showRenew && (
        <RenewModal onClose={() => setShowRenew(false)} />
      )}
    </div>
  );
}

export default LicensePage;