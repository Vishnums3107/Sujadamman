import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBoxes,
  FaCouch,
  FaBed,
  FaDraftingCompass,
  FaHotel,
  FaBuilding,
  FaTools,
  FaIndustry,
  FaTruck,
  FaTags,
  FaSchool,
  FaCheckCircle,
  FaHeadset,
  FaShieldAlt,
  FaShippingFast,
  FaPaintBrush,
  FaHandshake,
} from 'react-icons/fa';
import OptimizedImage from '../ui/OptimizedImage';

const iconMap = {
  FaBoxes,
  FaCouch,
  FaBed,
  FaDraftingCompass,
  FaHotel,
  FaBuilding,
  FaTools,
  FaIndustry,
  FaTruck,
  FaTags,
  FaSchool,
  FaCheckCircle,
  FaHeadset,
  FaShieldAlt,
  FaShippingFast,
  FaPaintBrush,
  FaHandshake,
};

const ServiceCard = ({ icon = 'FaBoxes', title, description, details, image }) => {
  const [open, setOpen] = useState(false);
  const Icon = iconMap[icon] || FaBoxes;

  return (
    <motion.div whileHover={{ y: -8, rotateY: -3 }} className="perspective-1200 preserve-3d render-auto">
      <div className="card-elevated overflow-hidden bg-white hover:border-primary-red/40 transition-all duration-300">
        {image && (
          <div className="relative h-48 w-full overflow-hidden">
            <OptimizedImage
              src={image}
              alt={title}
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-primary-red/90 border border-primary-red flex items-center justify-center">
              <Icon className="text-white text-lg" />
            </div>
          </div>
        )}
        <div className={image ? 'p-6 pt-4' : 'p-6'}>
          {!image && (
            <div className="w-12 h-12 rounded-full bg-primary-red/20 border border-primary-red/40 flex items-center justify-center mb-4">
              <Icon className="text-primary-red text-xl" />
            </div>
          )}
          <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <button onClick={() => setOpen((v) => !v)} className="mt-4 text-primary-red font-semibold hover:text-primary-red-hover transition-colors">
            {open ? 'Show Less' : 'Learn More'}
          </button>
          <AnimatePresence>
            {open ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="pt-3 text-sm text-gray-600">{details || description}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ServiceCard);
