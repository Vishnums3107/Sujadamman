import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import OptimizedImage from './OptimizedImage';

const ParallaxImage = ({ src, alt, className = '', speed = 60, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ y }}>
        <OptimizedImage src={src} alt={alt} className={className} {...props} />
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
