import Button from "./button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type MenuItem = {
  title: string;
  path: string;
};

// Updated buttons here
const menuItems: MenuItem[] = [
  { title: "HOME", path: "/" },
  { title: "CHATBOT", path: "/chatbot" },
  { title: "PROGRESS", path: "/progress" },
  { title: "MEAL PLAN", path: "/mealplan" },
  { title: "ABOUT US", path: "/aboutus" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.div
      className={`h-[90px] w-full bg-[#2D336B] flex items-center justify-between border-b border-[#d1d5db] fixed z-50 shadow-lg px-4 lg:px-8 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo and Title */}
      <Link to="/home" className="flex items-center space-x-3">
        <img src="/logo.jpeg" alt="Logo" className="h-16 w-16" />
        <div className="text-2xl font-bold text-[#F5EDED] lg:text-3xl">
          CORELY
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden 2xl:flex space-x-6">
        {menuItems.map((item, index) => (
          <Button key={index} title={item.title} path={item.path} />
        ))}
        <motion.button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/visualizationdashbaord");
          }}
          className="min-h-8 px-6 bg-[#7FA1C3] rounded-xl border border-[#d1d5db] text-[#eeeeff] text-xl cursor-pointer transition-transform transform hover:scale-105"
        >
          Log Out
        </motion.button>
      </div>

      {/* Mobile Toggle */}
      <div className="2xl:hidden">
        <button onClick={handleMenuToggle} className="text-[#F5EDED]">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      
      {menuOpen && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="2xl:hidden absolute top-16 left-0 w-full bg-[#2D336B] text-white flex flex-col text-center py-4"
        >
          {menuItems.map((item, index) => (
            <Button key={index} title={item.title} path={item.path} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
