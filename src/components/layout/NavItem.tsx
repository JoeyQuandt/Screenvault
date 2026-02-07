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
  const pathname = usePathname();

  const isActive = (navItem: string, pathname: string) => {
    if (navItem === '/' && pathname === '/') return true;
    if (navItem === '/') return false;

    if (
      navItem === '/movies' &&
      (pathname === '/movies' || pathname.startsWith('/details/movie'))
    ) {
      return true;
    }

    if (
      navItem === '/tv' &&
      (pathname === '/tv' || pathname.startsWith('/details/tv'))
    ) {
      return true;
    }

    if (
      navItem === '/people' &&
      (pathname === '/people' || pathname.startsWith('/details/person'))
    ) {
      return true;
    }

    return pathname.startsWith(navItem);
  };

  const active = isActive(navItem, pathname);

  return (
    <motion.button
      className='p-3 text-xl  hover:bg-theme-red text-theme-lightBlue hover:text-theme-white rounded-md relative'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className={`block relative z-10  ${active && 'text-theme-white transition-colors'}`}
      >
        {children}
      </span>
      <AnimatePresence>
        {active && (
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
