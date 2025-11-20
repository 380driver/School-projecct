import React, { useState, useEffect } from 'react';
import { BackgroundScene } from './components/BackgroundScene';
import { Logo } from './components/ui/Logo';
import { Hero } from './components/sections/Hero';
import { ContentDisplay } from './components/sections/ContentDisplay';
import { CONTENT_SECTIONS, NAV_ITEMS } from './constants';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3D Background Layer */}
      <BackgroundScene />

      {/* Stylish Header Section */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-[#020617]/90 backdrop-blur-xl border-cyan-900/30 py-2 shadow-[0_0_30px_rgba(0,72,121,0.3)]' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center relative z-10">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <Logo />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative group px-2 py-1 text-sm font-bold text-slate-300 hover:text-white transition-colors uppercase tracking-widest"
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#004879] to-[#D03027] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </button>
            ))}
            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-slate-600 to-transparent mx-2"></div>
             <div className="text-xs text-slate-400 text-right font-mono leading-tight">
                <span className="text-cyan-400">DEV:</span> M. Moaaz<br/>
                <span className="text-[#D03027]">DATE:</span> 11/12/25
             </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-[#020617] pt-32 px-6 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-6 items-center">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => scrollTo(item.id)}
                  className="text-3xl font-bold text-slate-300 hover:text-white hover:tracking-wider transition-all duration-300 border-b border-slate-800/50 pb-4 w-full text-center"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        <Hero />
        <div className="relative">
            {/* Connecting Line with glow */}
            <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden md:block z-0 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            
            {CONTENT_SECTIONS.map((section, index) => (
            <ContentDisplay key={section.id} data={section} index={index} />
            ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-[#01040f] border-t border-slate-800 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-slate-500 mb-4 uppercase tracking-widest font-bold text-xs">
            University of Coventry - The Knowledge Hub
          </p>
          <p className="text-slate-600 text-sm">
            Digital Disruption and Trump-Era Banking Policies &copy; 2025 Mohamed Ahmed Farid Moaaz
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;