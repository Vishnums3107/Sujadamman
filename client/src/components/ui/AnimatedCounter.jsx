import { useEffect, useState } from 'react';

const AnimatedCounter = ({ value = 0, suffix = '', duration = 1200, className = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const update = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(value * progress));
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [duration, value]);

  return <span className={className}>{count.toLocaleString()}{suffix}</span>;
};

export default AnimatedCounter;
