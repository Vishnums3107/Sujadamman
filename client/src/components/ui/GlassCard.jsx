const GlassCard = ({ children, className = '' }) => {
  return <div className={`glass-card depth-card ${className}`.trim()}>{children}</div>;
};

export default GlassCard;
