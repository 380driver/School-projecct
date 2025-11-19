import React from 'react';
import { motion } from 'framer-motion';

export const Logo = () => {
  return (
    <div className="flex items-center select-none relative group">
      <div className="relative h-14 w-auto overflow-visible">
        <motion.svg 
          viewBox="0 0 340 100" 
          height="100%" 
          width="auto"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <defs>
            <linearGradient id="swoosh-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D03027" />
              <stop offset="100%" stopColor="#E8453C" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Swoosh Animation */}
          <motion.path 
            d="M80 30 C 180 10, 250 10, 290 40 C 305 55, 290 80, 280 85 L 290 90 C 320 70, 340 30, 290 10 C 230 -10, 120 10, 80 30 Z" 
            fill="url(#swoosh-gradient)"
            initial={{ pathLength: 0, opacity: 0, filter: "url(#glow)" }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          
          {/* Text: Capital */}
          <motion.text 
            x="10" 
            y="85" 
            fill="#ffffff" 
            fontFamily="'Inter', sans-serif" 
            fontWeight="900" 
            fontSize="62" 
            letterSpacing="-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 10 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="drop-shadow-md"
          >
            Capital
          </motion.text>
          
          {/* Text: One */}
          <motion.text 
            x="220" 
            y="85" 
            fill="#ffffff" 
            fontFamily="'Times New Roman', serif" 
            fontStyle="italic" 
            fontWeight="400" 
            fontSize="62"
            initial={{ opacity: 0, x: 240 }}
            animate={{ opacity: 1, x: 220 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="drop-shadow-md"
          >
            One
          </motion.text>
        </motion.svg>
        
        {/* Flash effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%]"
          animate={{ translateX: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, repeatDelay: 5, duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};