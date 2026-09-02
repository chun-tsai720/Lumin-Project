"use client";

import { motion } from "framer-motion";

// 可重複使用的淡入、縮放與模糊過場容器。
export function WarpTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
}
