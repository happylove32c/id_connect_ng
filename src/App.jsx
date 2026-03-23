import React from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EducationPage from './pages/EducationPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/records" element={<EducationPage />} />
      </Routes>
    </BrowserRouter>

  )
}
