import { motion, useReducedMotion } from 'framer-motion';

const Card3D = ({ children, className = '', hoverLift = 8 }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -hoverLift, rotateX: 2, rotateY: -2 }}
      transition={{ duration: 0.25 }}
      className={`perspective-1200 preserve-3d rounded-2xl ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
};

export default Card3D;
