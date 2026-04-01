import { motion } from 'framer-motion';

const FloatingPanel = ({ children, className = '' }) => {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className={`glass-card depth-card ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
};

export default FloatingPanel;
