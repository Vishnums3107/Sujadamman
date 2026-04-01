import { motion } from 'framer-motion';

const SectionWrapper = ({ children, className = '', dark = false, id }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35 }}
      className={`${dark ? 'bg-[#0E0E0E] text-white' : 'bg-white text-black'} ${className}`.trim()}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
