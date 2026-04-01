import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ open, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className={`w-full ${maxWidth} rounded-2xl bg-white border border-black/10 shadow-lg`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-black/10">
              <h3 className="text-xl font-bold">{title}</h3>
              <button onClick={onClose} aria-label="Close modal" className="p-2 rounded-lg hover:bg-black/5 transition-colors">
                <FaTimes />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
