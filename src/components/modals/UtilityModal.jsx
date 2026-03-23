import { useState } from "react";
import { Bolt, Droplets, Wifi, ArrowRight, CheckCircle, X, CreditCard, Zap, Shield, Copy } from "lucide-react";
import toast from "react-hot-toast";

function UtilityModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [account, setAccount] = useState("");

  const SERVICE_FEE = 320;
  const [txnId, setTxnId] = useState("");
  const [reference, setReference] = useState("");

  const getServiceIcon = () => {
    switch(service) {
      case "Electricity": return <Bolt size={20} className="text-blue-600" />;
      case "Water": return <Droplets size={20} className="text-blue-600" />;
      case "Internet": return <Wifi size={20} className="text-blue-600" />;
      default: return <Zap size={20} className="text-blue-600" />;
    }
  };

  const getServiceAmount = () => {
    switch(service) {
      case "Electricity": return 15000;
      case "Water": return 8500;
      case "Internet": return 12000;
      default: return 15000;
    }
  };

  const formatAmount = (amount) => `₦${amount.toLocaleString()}`;
  const totalAmount = getServiceAmount() + SERVICE_FEE;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  const handlePayment = () => {
    setTxnId(`TXN${Math.floor(Math.random() * 1000000)}`);
    setReference(`REF${Math.floor(Math.random() * 100000000)}`);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 animate-in fade-in zoom-in duration-300">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex justify-between items-center">
            <h2 className="text-white font-semibold">
              {step === 1 && "Pay Utility Bill"}
              {step === 2 && "Enter Details"}
              {step === 3 && "Bill Summary"}
              {step === 4 && "Payment Successful"}
            </h2>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Steps */}
          <div className="p-6">

            {/* STEP 1 - Service Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-gray-600 text-sm mb-4">Choose the utility service you want to pay for</p>
                <div className="space-y-3">
                  {[
                    { name: "Electricity", icon: Bolt, color: "bg-yellow-50", textColor: "text-yellow-600" },
                    { name: "Water", icon: Droplets, color: "bg-blue-50", textColor: "text-blue-600" },
                    { name: "Internet", icon: Wifi, color: "bg-purple-50", textColor: "text-purple-600" }
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setService(item.name)}
                      className={`group w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                        service === item.name 
                          ? "border-blue-500 bg-blue-50 shadow-md" 
                          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <item.icon size={24} className={item.textColor} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">Pay bills instantly</p>
                      </div>
                      {service === item.name && <CheckCircle size={20} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => service && setStep(2)}
                  disabled={!service}
                  className={`mt-6 w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    service 
                      ? "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 2 - Account Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  {getServiceIcon()}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{service}</p>
                    <p className="text-xs text-gray-600">Enter your account details</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    {service === "Electricity" ? "Meter Number" : service === "Water" ? "Account Number" : "Customer ID"}
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter your ${service === "Electricity" ? "meter" : "account"} number`}
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500">We'll fetch your bill details instantly</p>
                </div>

                <button
                  onClick={() => account && setStep(3)}
                  disabled={!account}
                  className={`mt-6 w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    account 
                      ? "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Fetch Bill <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 3 - Bill Summary */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    {getServiceIcon()}
                    <p className="font-semibold text-gray-900">Bill Summary</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/50">
                      <span className="text-sm text-gray-600">Service:</span>
                      <span className="font-medium text-gray-900">{service}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/50">
                      <span className="text-sm text-gray-600">
                        {service === "Electricity" ? "Meter Number" : service === "Water" ? "Account Number" : "Customer ID"}:
                      </span>
                      <span className="font-mono text-sm text-gray-900">{account}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/50">
                      <span className="text-sm text-gray-600">Amount Due:</span>
                      <span className="font-bold text-gray-900">{formatAmount(getServiceAmount())}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/50">
                      <span className="text-sm text-gray-600">Service Fee:</span>
                      <span className="font-bold text-gray-900">{formatAmount(SERVICE_FEE)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-gray-600">Total:</span>
                      <span className="text-2xl font-bold text-gray-900">{formatAmount(totalAmount)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <Shield size={14} />
                  <span>Secure payment with 256-bit encryption</span>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Pay Now <CreditCard size={18} />
                </button>
              </div>
            )}

            {/* STEP 4 - Success */}
            {step === 4 && (
              <div className="text-center py-6 space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={40} className="text-green-600" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">Payment Successful! ✅</h3>

                <p className="text-gray-600">
                  You have successfully paid {formatAmount(totalAmount)} for your {service?.toLowerCase()} bill.
                </p>

                <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-mono text-gray-900 flex items-center gap-1">
                      {txnId}
                      <Copy size={14} className="cursor-pointer" onClick={() => copyToClipboard(txnId)} />
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="text-gray-900">{new Date().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono text-gray-900 flex items-center gap-1">
                      {reference}
                      <Copy size={14} className="cursor-pointer" onClick={() => copyToClipboard(reference)} />
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Done <CheckCircle size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UtilityModal;