
import React, { useState, useEffect } from 'react';
import { BackgroundScene } from './components/BackgroundScene';
import { Logo } from './components/ui/Logo';
import { Hero } from './components/sections/Hero';
import { ContentDisplay } from './components/sections/ContentDisplay';
import { RiskAssessment } from './components/sections/RiskAssessment';
import { Timeline } from './components/sections/Timeline';
import { EnoAssistant } from './components/ui/EnoAssistant';
import { QuizSection } from './components/sections/QuizSection';
import { ComparisonSlider } from './components/ui/ComparisonSlider';
import { PolicySimulator } from './components/sections/PolicySimulator';
import { TransformationSection } from './components/sections/TransformationSection';
import { HackerTerminal } from './components/sections/HackerTerminal';
import { StockChart } from './components/sections/StockChart';
import { CreditScoreSimulator } from './components/sections/CreditScoreSimulator';
import { CloudTechStack } from './components/sections/CloudTechStack';
import { PerspectiveToggle } from './components/ui/PerspectiveToggle';
import { PerspectiveProvider } from './context/PerspectiveContext';
import { CONTENT_SECTIONS, NAV_ITEMS } from './constants';
import { Menu, X, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <PerspectiveProvider>
      <div className="relative min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* 3D Background Layer */}
        <BackgroundScene />

        {/* Top Info Bar */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-[#020617] border-b border-slate-800 py-2 px-4 md:px-8 flex justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-3 h-3 md:w-4 md:h-4 text-cyan-500" />
            <span className="hidden md:inline">University of Coventry - </span>The Knowledge Hub
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400 font-bold">Mohamed Ahmed Farid Moaaz</span>
            <span className="w-[1px] h-3 bg-slate-700"></span>
            <span>Module: <span className="text-[#D03027]">KH5022FIN</span></span>
          </div>
        </div>

        {/* Main Header Section */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`fixed top-[33px] md:top-[34px] left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-[#020617]/90 backdrop-blur-xl border-b border-cyan-900/30 py-2 shadow-[0_0_30px_rgba(0,72,121,0.3)]'
            : 'bg-transparent border-transparent py-4'
            }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/5 to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center relative z-10">
            <div className="transform hover:scale-105 transition-transform duration-300 scale-90 origin-left">
              <Logo />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-6">
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
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
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
        <main className="pt-20">
          <Hero />
          <div className="relative">
            {/* Connecting Line with glow */}
            <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden md:block z-0 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

            {/* Comparison Slider */}
            <ComparisonSlider />

            {CONTENT_SECTIONS.map((section, index) => (
              section.id === 'explanation' ? (
                <Timeline key={section.id} />
              ) : (
                <ContentDisplay key={section.id} data={section} index={index} />
              )
            ))}

            {/* Policy Simulator */}
            <PolicySimulator />

            {/* Digital Transformation 3D Section */}
            <TransformationSection />

            {/* Hacker Terminal */}
            <HackerTerminal />

            {/* Stock Chart */}
            <StockChart />

            {/* Cloud Tech Stack */}
            <CloudTechStack />

            {/* Risk Assessment Section */}
            <RiskAssessment />

            {/* Credit Score Simulator */}
            <CreditScoreSimulator />
          </div>

          {/* Quiz Section */}
          <QuizSection />
        </main>

        {/* Footer */}
        <footer className="relative z-10 bg-[#01040f] border-t border-slate-800 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <p className="text-slate-500 mb-4 uppercase tracking-widest font-bold text-xs">
              Digital Transformation Case Study
            </p>
            <p className="text-slate-600 text-sm">
              &copy; 2025 Mohamed Ahmed Farid Moaaz. All Rights Reserved.
            </p>
          </div>
        </footer>

        {/* Eno AI Assistant */}
        <EnoAssistant />

        {/* Perspective Toggle */}
        <PerspectiveToggle />
      </div>
    </PerspectiveProvider>
  );
};

export default App;
