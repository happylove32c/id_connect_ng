import { ArrowRight, Bolt } from 'lucide-react'
import React, { useState } from 'react'
import UtilityModal from '../modals/UtilityModal';

function Utility() {
    const [open, setOpen] = useState(false)

    const lastPayment = {
        amount: 5000,
        date: "2024-05-01"
    };
    
  return (
    <>
        <div className="group border border-black/30 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                <Bolt className="text-blue-600" size={24} />
            </div>
            <h4 className="font-semibold text-xl mb-2 text-gray-900">Utility Bills</h4>
            <p className="text-gray-600 text-sm mb-4">
                Last payment: {lastPayment ? `₦${lastPayment.amount}` : "No payments yet"}
            </p>
            <button 
            onClick={() => setOpen(true)}
            className="text-sm text-blue-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all group-hover:text-blue-700"
            >
                View Details <ArrowRight size={14} />
            </button>
        </div>

        <UtilityModal open={open} onClose={() => setOpen(false)} lastPayment={lastPayment} />
    </>
  )
}

export default Utility