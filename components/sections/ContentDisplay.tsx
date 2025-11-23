
import React, { useState } from 'react';
import { SectionData, HighlightItem } from '../../types';
import { Card } from '../ui/Card';
import { AnalysisCharts } from '../ui/AnalysisCharts';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cloud, Cpu, TrendingUp, Lock, Globe, X, Info, MousePointerClick } from 'lucide-react';

interface Props {
  data: SectionData;
  index: number;
}

export const ContentDisplay: React.FC<Props> = ({ data, index }) => {
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightItem | null>(null);
  const isEven = index % 2 === 0;

  const getIcon = (keyword: string) => {
    if (keyword.includes("Cyber") || keyword.includes("Security")) return <Lock className="w-6 h-6 text-red-400" />;
    if (keyword.includes("AI")) return <Cpu className="w-6 h-6 text-cyan-400" />;
    if (keyword.includes("Cloud")) return <Cloud className="w-6 h-6 text-blue-400" />;
    if (keyword.includes("SDG") || keyword.includes("Community") || keyword.includes("ESG")) return <Globe className="w-6 h-6 text-green-400" />;
    if (keyword.includes("Compliance") || keyword.includes("Regulatory")) return <ShieldCheck className="w-6 h-6 text-yellow-400" />;
    return <TrendingUp className="w-6 h-6 text-indigo-400" />;
  };

  return (
    <>
      <section id={data.id} className="min-h-screen flex items-center py-20 px-4 md:px-12 relative z-10 overflow-hidden">
        <div className={`max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
          
          {/* Text Side */}
          <motion.div 
            className={`space-y-6 ${isEven ? 'order-1' : 'order-2 lg:col-start-2'}`}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="h-[2px] w-12 bg-gradient-to-r from-red-500 to-transparent" />
              <span className="text-red-400 font-mono uppercase text-sm tracking-widest">0{index + 1} / {data.title}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {data.title}
            </h2>
            {data.subtitle && (
              <h3 className="text-2xl text-cyan-200/80 font-light">{data.subtitle}</h3>
            )}
            
            <div className="text-slate-300 text-lg space-y-4">
              {Array.isArray(data.content) ? (
                data.content.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>{data.content}</p>
              )}
            </div>
          </motion.div>

          {/* Graphic/Card Side */}
          <div className={`flex flex-col gap-6 ${isEven ? 'order-2' : 'order-1 lg:col-start-1'}`}>
            
            {/* Visual Asset: Chart or Image */}
            {data.id === 'analysis' ? (
              <AnalysisCharts />
            ) : (
              data.imageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotateY: isEven ? 10 : -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative group perspective-1000"
                >
                  {/* Glowing border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#004879] to-[#D03027] rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-slate-900">
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10" />
                    
                    <img
                      src={data.imageUrl}
                      alt={data.title}
                      className="w-full h-64 lg:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Floating badge */}
                    <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                      <Info className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono text-cyan-100">Visual Data Asset</span>
                    </div>
                  </div>
                </motion.div>
              )
            )}

            {/* Highlights Grid */}
            {data.highlights && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {data.highlights.map((highlight, idx) => (
                  <div key={idx} onClick={() => setSelectedHighlight(highlight)} className="cursor-pointer">
                    <Card delay={0.2 + (idx * 0.1)} className="h-full group hover:bg-slate-800/60 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300">
                          {getIcon(highlight.title)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors text-sm mb-1 flex items-center gap-2">
                            {highlight.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 group-hover:text-slate-400">
                            {highlight.description}
                          </p>
                          <div className="mt-2 flex items-center gap-1 text-[10px] text-cyan-500/70 font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                            <MousePointerClick className="w-3 h-3" />
                            <span>Read More</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Detailed Modal Popup */}
      <AnimatePresence>
        {selectedHighlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedHighlight(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f172a] border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#004879] via-cyan-500 to-[#D03027]" />
              
              <button 
                onClick={() => setSelectedHighlight(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 shadow-inner">
                    {getIcon(selectedHighlight.title)}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedHighlight.title}</h3>
                </div>
                
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-slate-300 leading-relaxed text-base">
                    {selectedHighlight.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Capital One Case Study</span>
                  <button 
                    onClick={() => setSelectedHighlight(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
