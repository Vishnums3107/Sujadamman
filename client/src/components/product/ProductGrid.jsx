import { memo } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onQuickView }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onQuickView={onQuickView} />
      ))}
    </div>
  );
};

export default memo(ProductGrid);
