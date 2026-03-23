import { Bell } from 'lucide-react'
import React from 'react'

function Navbar_dash() {
  return (
    <>
        <nav className="bg-white/50 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex justify-between items-center shadow-sm">
            <h1 className="font-bold text-xl">IDconnect</h1>

            <div className="flex items-center gap-4">
            <Bell />
            <img
                src="https://via.placeholder.com/40"
                alt="profile"
                className="w-10 h-10 rounded-full"
            />
            </div>
        </nav>

    </>
  )
}

export default Navbar_dash