'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export const NavItem = ({
  children,
  navItem,
}: {
  children: React.ReactNode;
  navItem: string;
}) => {
  const pathName = usePathname();
  return (
    <motion.button
      className='p-3 text-xl  hover:bg-theme-red text-theme-lightBlue hover:text-theme-white rounded-md relative'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className={`block relative z-10  ${navItem === pathName && 'text-theme-white transition-colors'}`}
      >
        {children}
      </span>
      <AnimatePresence>
        {navItem === pathName && (
          <motion.span
            className='absolute inset-0 rounded-md bg-theme-red z-0'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
