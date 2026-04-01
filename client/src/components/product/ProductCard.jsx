import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import Badge from '../ui/Badge';
import OptimizedImage from '../ui/OptimizedImage';
import TiltCard from '../ui/TiltCard';

const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const primaryImage = product.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image';
  const hasSecondaryImage = Boolean(product.images?.[1]);
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <TiltCard className="group">
      <motion.div 
        whileHover={{ y: -8 }} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-[#121212] rounded-2xl border border-white/10 shadow-[0_20px_45px_-24px_rgba(0,0,0,0.85)] hover:shadow-[0_28px_55px_-24px_rgba(0,0,0,0.95)] transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(179,0,0,0.45)' }} />

        <div className="relative h-56 bg-gray-900 overflow-hidden">
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-14 rounded-full bg-black/60 blur-xl" />
          
          <div className="absolute inset-0">
            <OptimizedImage
              src={primaryImage}
              alt={product.name}
              loading="eager"
              wrapperClassName="w-full h-full"
              className={`transition-opacity duration-500 ${isHovered && hasSecondaryImage ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>

          {hasSecondaryImage && (
            <div className="absolute inset-0">
              <OptimizedImage
                src={secondaryImage}
                alt={`${product.name} - alternate view`}
                loading="eager"
                wrapperClassName="w-full h-full"
                className={`transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          )}

          {product.featured && (
            <div className="absolute top-0 left-0 px-3 py-1 bg-gold-500 text-black text-xs font-bold rounded-br-lg z-10">
              Featured
            </div>
          )}

          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="absolute bottom-3 right-3 px-3 py-2 rounded-lg bg-primary-red text-white text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <FaEye /> Quick View
            </button>
          )}
        </div>

        <div className="p-4 text-white">
          <h3 className="font-bold text-lg line-clamp-1 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-300 line-clamp-2 mb-3">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-black text-primary-red">₹{product.price?.toLocaleString?.() || product.price}</p>
            {product.stock > 0 ? <Badge tone="success">In Stock</Badge> : <Badge tone="danger">Out</Badge>}
          </div>
          <Link to={`/products/${product._id}`} className="mt-4 btn-primary w-full text-center opacity-90 group-hover:opacity-100 transition-opacity block">
            View Details
          </Link>
        </div>
      </motion.div>
    </TiltCard>
  );
};

export default memo(ProductCard);
