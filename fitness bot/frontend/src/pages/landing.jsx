console.log("Landing Page Loaded");
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Background Image */}
      <img 
        src="bg fr.png" 
        alt="Background" 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Header Section */}
      <div className="w-full flex items-center justify-between bg-[#2D336B] py-4 px-8 shadow-md z-10">
        <Link to="/visualizationdashbaord"  className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-12 w-12 mr-3" />
          <span className="text-4xl font-bold text-white">SENSORY DASHBOARD</span>
        </Link>
        <div className="flex space-x-4">
          <Link to="/signin" className="bg-[#7FA1C3] text-white px-6 py-2 rounded-lg hover:bg-[#E2DAD6] font-semibold">
            Login
          </Link>
          <Link to="/signup" className="bg-[#7FA1C3] text-white px-6 py-2 rounded-lg hover:bg-[#E2DAD6] font-semibold">
            Register
          </Link>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-grow flex items-center justify-center relative z-10 text-center text-[#2D336B] px-8 py-16 bg-[#E2DAD6] rounded-xl border-4 border-[#7FA1C3] shadow-md mx-auto mt-20 mb-20" 
           style={{ width: "80%", maxWidth: "800px", minHeight: "200px" }}>
        <div>
          <h1 className="text-6xl font-extrabold">SENSORY DASHBOARD</h1>
          <p className="text-xl mt-4 max-w-3xl mx-auto">
            A powerful platform for visualizing and analyzing real-time sensor data, including RGB, gas, and spectral data, with an intuitive interface.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-[#2D336B] text-white py-4 text-center font-semibold z-10">
        <p className="text-sm">
          © {new Date().getFullYear()} Sensory Dashboard. All rights reserved.
        </p>
      </footer>
    </div>
  )}
