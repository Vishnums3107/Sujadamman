import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const TiltCard = ({ children, className = '' }) => {
  const reduceMotion = useReducedMotion();
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');

  const onMove = (event) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 8;
    const rotateX = (0.5 - py) * 8;
    setTransform(`rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => setTransform('rotateX(0deg) rotateY(0deg)')}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      style={{ transform }}
      className={`perspective-1200 preserve-3d gpu-transform transition-transform duration-200 ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
