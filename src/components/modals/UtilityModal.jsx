import { useState } from "react";

function UtilityModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [account, setAccount] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl p-6">

        {/* CLOSE */}
        <button onClick={onClose} className="mb-4 text-sm">
          ✕ Close
        </button>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Pay Utility Bill
            </h2>

            <div className="space-y-2">
              {["Electricity", "Water", "Internet"].map((item) => (
                <button
                  key={item}
                  onClick={() => setService(item)}
                  className={`block w-full text-left p-3 rounded-lg border ${
                    service === item ? "border-black" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-4 w-full bg-black text-white p-3 rounded-lg"
            >
              Continue
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Enter Details
            </h2>

            <input
              type="text"
              placeholder="Meter / Account Number"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <button
              onClick={() => setStep(3)}
              className="w-full bg-black text-white p-3 rounded-lg"
            >
              Fetch Bill
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Bill Summary
            </h2>

            <p className="mb-2">Service: {service}</p>
            <p className="mb-2">Account: {account}</p>
            <p className="mb-2 font-semibold">Amount: ₦15,000</p>

            <button
              onClick={() => setStep(4)}
              className="mt-4 w-full bg-black text-white p-3 rounded-lg"
            >
              Pay Now
            </button>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-green-600">
              Payment Successful ✅
            </h2>

            <p className="mb-4">₦15,000 paid successfully</p>

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

export default UtilityModal;