import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function WarpTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen relative z-10 pointer-events-none"
    >
      <div className="pointer-events-auto w-full min-h-screen">
        {children}
      </div>
    </motion.div>
  );
}
