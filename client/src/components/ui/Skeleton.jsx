const Skeleton = ({ className = '' }) => {
  return <div className={`skeleton-shimmer ${className}`.trim()} />;
};

export default Skeleton;
