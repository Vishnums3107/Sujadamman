import { memo } from 'react';

const Card = ({
  children,
  className = '',
  elevated = false,
  interactive = false,
}) => {
  const baseClass = elevated ? 'card-elevated' : 'card';
  const interactiveClass = interactive ? 'premium-interactive' : '';

  return <div className={`${baseClass} ${interactiveClass} ${className}`.trim()}>{children}</div>;
};

export default memo(Card);
