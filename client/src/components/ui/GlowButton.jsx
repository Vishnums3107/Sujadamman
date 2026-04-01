import { motion } from 'framer-motion';

const GlowButton = ({ children, className = '', variant = 'primary', ...props }) => {
  const base = variant === 'outline'
    ? 'border border-white/40 text-white hover:bg-white/10'
    : 'bg-primary-red text-white hover:bg-primary-red-hover shadow-[0_12px_30px_-16px_rgba(179,0,0,0.9)]';

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${base} ${className}`.trim()}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlowButton;
