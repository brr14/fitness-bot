import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";



export default function Button({ title, path, onClick }) {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={onClick ? onClick : () => path && navigate(path)}
      className="min-h-8 xl:min-h-8 px-6 bg-[#7FA1C3] rounded-xl border border-[#d1d5db] text-[#eeeeff] text-sm md:text-base 2xl:text-xl cursor-pointer transition-transform transform hover:scale-105"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {title}
    </motion.button>
  );
}
