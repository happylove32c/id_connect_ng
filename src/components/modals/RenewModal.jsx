import { useState } from "react";

function RenewModal({ onClose, setLicense }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const renewalFee = 10000;
  const serviceCharge = 500;
  const total = renewalFee + serviceCharge;

  const transactionRef = "TRX" + Math.floor(Math.random() * 1000000);

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(3);

      setLicense((prev) => ({
        ...prev,
        expiry: "2027-12-01",
      }));
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">

      <div className="bg-white w-full max-w-md rounded-2xl p-6">

        {/* CLOSE */}
        <button onClick={onClose} className="mb-4 text-sm text-gray-500">
          ✕ Close
        </button>

        {/* STEP 1 — CHECKOUT */}
        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              License Renewal Checkout
            </h2>

            <div className="bg-gray-100 p-4 rounded-lg mb-6 space-y-2">

              <div className="flex justify-between text-sm">
                <span>License Renewal</span>
                <span>₦{renewalFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Service Charge</span>
                <span>₦{serviceCharge.toLocaleString()}</span>
              </div>

              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-black text-white p-3 rounded-lg"
            >
              Proceed to Payment
            </button>
          </>
        )}

        {/* STEP 2 — PAYMENT */}
        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold mb-2">
              Payment
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Pay ₦{total.toLocaleString()} to renew your license.
            </p>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-black text-white p-3 rounded-lg"
            >
              {loading ? "Processing Payment..." : "Pay Now"}
            </button>
          </>
        )}

        {/* STEP 3 — RECEIPT */}
        {step === 3 && (
          <>
            <h2 className="text-lg font-semibold text-green-600 mb-4">
              Payment Successful ✅
            </h2>

            <div className="bg-gray-100 p-4 rounded-lg mb-6 space-y-2 text-sm">

              <div className="flex justify-between">
                <span>Transaction Ref</span>
                <span>{transactionRef}</span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>
                <span>{new Date().toDateString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Service</span>
                <span>License Renewal</span>
              </div>

              <div className="flex justify-between">
                <span>Amount Paid</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

            </div>

            <button
              onClick={onClose}
              className="w-full bg-black text-white p-3 rounded-lg"
            >
              Done
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default RenewModal;