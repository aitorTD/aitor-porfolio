import { motion, AnimatePresence } from 'framer-motion';

export default function FadeTransition({ children, mode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode} // Al cambiar el modo, Framer Motion sabe que debe animar
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}