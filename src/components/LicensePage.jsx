import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import RenewModal from "./modals/RenewModal";

function LicensePage({ onBack, license }) {
  const [showRenew, setShowRenew] = useState(false);

  const expiryDate = new Date(license.expiry);
  const today = new Date();

  const diffInDays =
    (expiryDate - today) / (1000 * 60 * 60 * 24);

  const isExpiringSoon = diffInDays <= 60;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">

      <div className="p-6 max-w-3xl mx-auto">

        {/* BACK */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          Driver’s License
        </h2>

        {/* WARNING */}
        {isExpiringSoon && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
            Your license is about to expire. Renew now.
          </div>
        )}

        {/* CARD */}
        <div className="bg-gray-100 rounded-2xl p-6 flex gap-6 items-center">

          <div className="w-20 h-20 bg-gray-300 rounded-full" />

          <div>
            <h3 className="text-lg font-semibold">{license.name}</h3>

            <p className="text-gray-600 text-sm">
            License No: {license.number}
            </p>

            <p className="text-gray-600 text-sm">
            Expires: {new Date(license.expiry).toDateString()}
            </p>

            <p className={`text-sm mt-2 ${isExpiringSoon ? "text-red-500" : "text-green-600"}`}>
              {isExpiringSoon ? "Expiring soon" : "Valid"}
            </p>
          </div>
        </div>

        {/* ACTION */}
        {isExpiringSoon && (
          <button
            onClick={() => setShowRenew(true)}
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
          >
            Renew License
          </button>
        )}

      </div>

      {/* RENEW MODAL */}
      {showRenew && (
        <RenewModal onClose={() => setShowRenew(false)} />
      )}

    </div>
  );
}

export default LicensePage;