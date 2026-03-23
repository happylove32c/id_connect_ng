import React from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EducationPage from './pages/EducationPage';
import { Toaster } from 'react-hot-toast';
import LicensePage from './pages/LicensePage';

export default function App() {
    const licenseData = {
      name: "John Doe",
      number: "DL-1234-5678",
      expiry: "2026-02-03"
    };
  return (
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/records" element={<EducationPage />} />
        <Route path="/license" element={<LicensePage license={licenseData} />} />
      </Routes>
    </BrowserRouter>

  )
}
