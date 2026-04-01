import SkeletonLoader from './ui/SkeletonLoader';

const ProductSkeleton = () => {
  return (
    <div className="card overflow-hidden bg-[#111111] border-white/10">
      <SkeletonLoader dark className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <SkeletonLoader dark className="h-4 w-3/4" />
        <SkeletonLoader dark className="h-3 w-1/2" />
        <SkeletonLoader dark className="h-6 w-1/3" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
