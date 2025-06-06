import { motion } from "framer-motion";
import { ReactNode } from "react";


export default function Card({ children }) {
  return (
    
      <motion.div
        className="h-full w-full bg-[#E2DAD6] rounded-3xl flex flex-col justify-center items-center inset-shadow-zinc-800  "
        // whileHover={{ scale: 1.02 }}
      >
        {children}
      </motion.div>
  
  );
}
