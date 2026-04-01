const SkeletonLoader = ({ className = '', dark = false }) => {
  return <div className={`${dark ? 'dark-skeleton' : 'skeleton-shimmer'} rounded-xl ${className}`.trim()} aria-hidden="true" />;
};

export default SkeletonLoader;
