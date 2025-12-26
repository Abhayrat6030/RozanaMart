// frontend/src/components/AnimationsSetup.jsx
// Copy-paste ready animations for your website

import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// 1. PAGE FADE IN ANIMATION
export function PageFadeIn({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// 2. PRODUCT CARD ANIMATION
export function AnimatedProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
    >
      <motion.img
        whileHover={{ scale: 1.1 }}
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-3">
        <h3 className="font-bold text-sm">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-green-600 font-bold">₹{product.price}</span>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#15803d" }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-3 py-1 rounded text-sm font-bold"
          >
            ADD
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// 3. BUTTON ANIMATIONS
export function AnimatedButton({ children, onClick, className }) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// 4. LOADING ANIMATION (Spinner)
export function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto my-8"
    />
  );
}

// 5. FLOATING ANIMATION
export function FloatingCard({ children }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

// 6. SLIDE IN ANIMATION (from left)
export function SlideInLeft({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// 7. SLIDE IN ANIMATION (from right)
export function SlideInRight({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// 8. BOUNCE ANIMATION
export function BounceAnimation({ children }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ 
        duration: 0.6, 
        repeat: Infinity,
        type: "spring"
      }}
    >
      {children}
    </motion.div>
  );
}

// 9. CART ANIMATION (ADD TO CART)
export function CartAddAnimation({ onComplete }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-20 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
      onAnimationComplete={onComplete}
    >
      ✅ Added to cart!
    </motion.div>
  );
}

// 10. PULSE ANIMATION (Urgency/Attention)
export function PulseAnimation({ children }) {
  return (
    <motion.div
      animate={{ opacity: [1, 0.7, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

// 11. STAGGER CHILDREN ANIMATION
export function StaggerContainer({ children }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// 12. SHAKE ANIMATION (Error)
export function ShakeAnimation({ children }) {
  return (
    <motion.div
      animate={{ x: [-5, 5, -5, 0] }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

// 13. GLOW EFFECT (Special Items)
export function GlowEffect({ children }) {
  return (
    <motion.div
      className="relative"
      animate={{ 
        boxShadow: [
          "0 0 10px rgba(34, 197, 94, 0.3)",
          "0 0 20px rgba(34, 197, 94, 0.6)",
          "0 0 10px rgba(34, 197, 94, 0.3)"
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

// 14. SCROLL REVEAL (Appear on scroll)
import { useInView } from 'react-intersection-observer';

export function ScrollReveal({ children }) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

// 15. PRICE ANIMATION (Countdown/Update)
export function PriceAnimation({ price }) {
  return (
    <motion.div
      key={price}
      initial={{ scale: 1.2, color: "#ff0000" }}
      animate={{ scale: 1, color: "#22c55e" }}
      transition={{ duration: 0.3 }}
      className="font-bold text-lg"
    >
      ₹{price}
    </motion.div>
  );
}

// Export all components for use
export {
  PageFadeIn,
  AnimatedProductCard,
  AnimatedButton,
  LoadingSpinner,
  FloatingCard,
  SlideInLeft,
  SlideInRight,
  BounceAnimation,
  CartAddAnimation,
  PulseAnimation,
  StaggerContainer,
  ShakeAnimation,
  GlowEffect,
  ScrollReveal,
  PriceAnimation
};
