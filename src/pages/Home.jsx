import { Bolt, CreditCard, Car, GraduationCap, ArrowRight, CheckCircle, Shield, Zap, Building2 } from "lucide-react";
import logo from "/interswitch_logo.png";

function Home() {
  return (
    <div className="bg-white text-gray-900">
      {/* HERO - Enhanced with gradient and better spacing */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-gray-50/50 -z-10" />
        
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield size={16} />
            <span>Powered by Interswitch • Secure Payments</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            IDConnect
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            One dashboard for essential government services. Simple, fast, and secure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium inline-flex items-center gap-2 group">
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
              Learn More
            </button>
          </div>

          {/* Trust indicators with Interswitch */}
          <div className="mt-12 flex flex-wrap gap-6 justify-center items-center text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>Powered by Interswitch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>24/7 Access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>Verified Services</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - Enhanced with better cards and animations */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need, unified in a single, intuitive platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Utility Bills */}
            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-gray-200">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                <Bolt className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Utility Bills</h3>
              <p className="text-gray-600 leading-relaxed">
                Pay electricity and water bills seamlessly, track usage patterns, and receive smart reminders before due dates.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-blue-600 font-medium inline-flex items-center gap-1">
                  Learn more <ArrowRight size={14} />
                </span>
              </div>
            </div>

            {/* Driver's License */}
            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-gray-200">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                <Car className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Driver's License</h3>
              <p className="text-gray-600 leading-relaxed">
                Renew licenses instantly, track application status, and get proactive expiry notifications to stay compliant.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-blue-600 font-medium inline-flex items-center gap-1">
                  Learn more <ArrowRight size={14} />
                </span>
              </div>
            </div>

            {/* Educational Records */}
            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-gray-200">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                <GraduationCap className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Educational Records</h3>
              <p className="text-gray-600 leading-relaxed">
                Verify academic credentials, securely store certificates, and share verified records with institutions instantly.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-blue-600 font-medium inline-flex items-center gap-1">
                  Learn more <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERSWITCH PARTNERSHIP SECTION - New featured section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                  <Building2 size={16} />
                  <span>Official Payment Partner</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Secure Payments with Interswitch</h2>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  All transactions on IDConnect are powered by Interswitch, Africa's leading integrated payments and digital commerce company. Your payments are secure, instant, and fully compliant with industry standards.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Shield size={18} />
                    <span className="text-sm">PCI DSS Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard size={18} />
                    <span className="text-sm">Multiple Payment Methods</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={18} />
                    <span className="text-sm">Real-time Processing</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                <div className="flex justify-center items-center">
                    <img src={logo} alt="Logo" className="h-32" />
                </div>
                {/* <img src={logo} alt="Logo" className="h-24 items-center" /> */}
                {/* <Building2 size={48} className="mx-auto mb-4 opacity-80" /> */}
                <p className="text-2xl font-bold mb-2">Interswitch</p>
                <p className="text-blue-100 text-sm">Official Payment Gateway Partner</p>
                <div className="mt-6 flex justify-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">2.5B+</p>
                    <p className="text-xs text-blue-100">Transactions Yearly</p>
                  </div>
                  <div className="w-px bg-white/30" />
                  <div className="text-center">
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-xs text-blue-100">Secure Encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL FEATURE - Security & Trust */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Security</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Your data is protected with 256-bit encryption. All services are officially integrated with government databases and Interswitch's secure payment infrastructure for real-time accuracy.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Shield size={18} />
                    <span className="text-sm">256-bit Encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} />
                    <span className="text-sm">Verified Partners</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Zap size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Real-time Processing</p>
                    <p className="text-sm text-gray-300">Instant verification & updates</p>
                  </div>
                </div>
                <div className="h-px bg-white/20 my-4" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Interswitch Secure Payments</p>
                    <p className="text-sm text-gray-300">PCI DSS compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Enhanced with Interswitch mention */}
      <section className="py-24 px-6 text-center bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full text-sm text-gray-600 mb-6">
            <img src="../../public/inter_normal-removebg-preview.png" alt="" className="h-6" />
            <span>Secured by Interswitch</span>
            <Zap size={14} className="text-blue-600" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Access Everything in One Place
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who've simplified their government service experience with IDConnect, powered by Interswitch for secure, seamless payments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium inline-flex items-center gap-2 group">
              Try Demo Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 font-medium">
              Contact Support
            </button>
          </div>

          {/* Footer note with Interswitch */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center text-xs text-gray-400">
            <span>✓ Interswitch Secure Payments</span>
            <span>•</span>
            <span>No credit card required for demo</span>
            <span>•</span>
            <span>Free demo access</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;