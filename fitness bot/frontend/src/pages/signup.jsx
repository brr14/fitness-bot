import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response=await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        password,
        firstName,
        lastName,
      });
  
      localStorage.setItem("token", response.data.token);
      
      
      setTimeout(() => {
        console.log('Navigating to homepage...');
        navigate('/', { replace: true });
      }, 100);

    } catch (err) {
      console.log(err)
      setError("Something went wrong");
    }
  };
  
  

  return (
    <div className="relative flex flex-col min-h-screen">
      <img 
        src="bg fr.png" 
        alt="Background" 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="relative w-full flex items-center justify-between bg-[#2D336B] py-4 px-8 shadow-md z-10">
        
        <Link to="/visualizationdashbaord" className="flex items-center">
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
    <div className="flex-grow flex items-center justify-center relative z-10">
      

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md p-8 rounded-xl bg-[#6482AD]/80 shadow-lg border border-[#7FA1C3] backdrop-blur-md"
      >
        <h2 className="text-2xl font-semibold text-center text-[#2D336B] mb-6">
          Register
        </h2>

        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-center mb-4">{error}</motion.p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#7FA1C3] bg-[#F5EDED] text-[#2D336B] focus:outline-none focus:ring-2 focus:ring-[#7FA1C3] transition"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#7FA1C3] bg-[#F5EDED] text-[#2D336B] focus:outline-none focus:ring-2 focus:ring-[#7FA1C3] transition"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#7FA1C3] bg-[#F5EDED] text-[#2D336B] focus:outline-none focus:ring-2 focus:ring-[#7FA1C3] transition"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#7FA1C3] bg-[#F5EDED] text-[#2D336B] focus:outline-none focus:ring-2 focus:ring-[#7FA1C3] transition"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 bg-[#7FA1C3] text-white rounded-lg hover:bg-[#2D336B] transition font-semibold"
          >
            Register
          </motion.button>
        </form>

        <p className="text-center mt-4 text-[#2D336B]">
          Already have an account?{" "}
          <a href="/signin" className="font-medium hover:underline">
            Login
          </a>
        </p>
      </motion.div> 
    </div>
    </div>
  );
}
