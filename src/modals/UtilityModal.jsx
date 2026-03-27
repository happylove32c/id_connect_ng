import React, { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { InterswitchClient } from "../../interswitchClient";

function UtilityModal({ open, onClose, lastPayment }) {
  const [view, setView] = useState("details");
  const [formData, setFormData] = useState({
    utility: "",
    email: "",
    phone: "",
    amount: ""
  });

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // ✅ now includes utility
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* BACK BUTTON */}
        {view === "pay" && (
          <button
            onClick={() => setView("details")}
            className="flex items-center gap-1 text-sm text-gray-600 mb-4"
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}

        {/* ================= */}
        {/* DETAILS VIEW */}
        {/* ================= */}
        {view === "details" && (
          <>
            <h3 className="text-xl font-semibold mb-4">
              Utility Details
            </h3>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600">Last Payment</p>
              <p className="text-lg font-semibold">
                ₦{lastPayment?.amount || 0}
              </p>
              <p className="text-xs text-gray-500">
                {lastPayment?.date}
              </p>
            </div>

            <button
              onClick={() => setView("pay")}
              className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
            >
              Pay Bill
            </button>
          </>
        )}

        {/* ================= */}
        {/* PAY VIEW */}
        {/* ================= */}
        {view === "pay" && (
          <>
            <h3 className="text-xl font-semibold mb-4">
              Pay Utility Bill
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* SELECT UTILITY */}
              <select
                name="utility"
                value={formData.utility}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Utility</option>
                <option value="electricity">Electricity</option>
                <option value="water">Water</option>
              </select>

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />

              {/* PHONE */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />

              {/* AMOUNT */}
              <input
                type="number"
                name="amount"
                placeholder="Amount (₦)"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
              >
                Continue Payment
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default UtilityModal;