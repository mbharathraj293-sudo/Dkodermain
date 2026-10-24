import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function TiltCard({
  children,
  className = '',
  maxRotation = 8,
  glare = true,
  onClick
}) {
  const cardRef = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;

    setRotX(rotateX);
    setRotY(rotateY);

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.15
      });
    }
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1000,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 200,
        mass: 0.1
      }}
      className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {glare && !prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
