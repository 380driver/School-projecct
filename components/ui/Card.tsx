import React, { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends PropsWithChildren {
  title?: string;
  delay?: number;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={`bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 shadow-xl hover:shadow-cyan-900/20 hover:border-cyan-500/30 transition-colors duration-300 group ${className}`}
    >
      {title && (
        <h3 className="text-xl font-bold mb-3 text-cyan-100 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
      )}
      <div className="text-slate-300 leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
};