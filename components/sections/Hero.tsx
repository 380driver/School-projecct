import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center z-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6"
      >
        <span className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm">
          Module: KH5022FIN
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 mb-6 max-w-5xl"
      >
        Digital Disruption & <br/> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004879] to-[#D03027]">Banking Policies</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12"
      >
        Impact on U.S. Banking Services: A Case Study of <strong className="text-white">Capital One</strong> in the Trump-Era.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 animate-bounce"
      >
        <ArrowDown className="w-8 h-8 text-slate-500" />
      </motion.div>
    </section>
  );
};