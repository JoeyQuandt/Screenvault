'use client';

import { motion as m } from 'framer-motion';
import React from 'react';

type transitionProps = {
  children: React.ReactNode;
};

export default function Transition({ children }: transitionProps) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      exit={{ opacity: 0 }}
    >
      {children}
    </m.div>
  );
}
