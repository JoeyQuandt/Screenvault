'use client';

import { motion } from 'framer-motion';
import React from 'react';

type TransitionProps = {
  children: React.ReactNode;
};

export default function Transition({ children }: TransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
