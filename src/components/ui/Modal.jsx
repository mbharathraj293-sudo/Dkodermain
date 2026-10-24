import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl'
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Content Box */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${maxWidth} bg-white border border-[#E8E4F0] rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col`}
          >
            {/* Header */}
            <div className="shrink-0 flex items-start justify-between p-6 border-b border-[#E8E4F0] bg-[#FAF9FF]">
              <div>
                {title && (
                  <h3 id="modal-title" className="text-xl font-display font-bold text-[#17152B] flex items-center gap-2">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-sm text-[#625F72] mt-1 font-sans">{subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-1.5 rounded-lg text-[#625F72] hover:text-[#17152B] hover:bg-[#E8E4F0]/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B21B6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body - max-height: 90vh independent scroll */}
            <div className="p-6 flex-1 min-h-0 overflow-y-auto space-y-4 custom-scrollbar text-[#17152B]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
