import { AnimatePresence, motion } from 'framer-motion';

export const NavItem = ({
  children,
  selected,
  id,
  setSelected,
}: {
  children: React.ReactNode;
  selected: boolean;
  id: number;
  setSelected: (id: number) => void;
}) => {
  return (
    <motion.button
      className='p-3 text-xl  hover:bg-theme-red text-theme-lightBlue hover:text-theme-white rounded-md relative'
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className={`block relative z-10  ${selected && 'text-theme-white transition-colors'}`}
      >
        {children}
      </span>
      <AnimatePresence>
        {selected && (
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
