import React from 'react';
import { SectionData } from '../../types';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { ShieldCheck, Cloud, Cpu, TrendingUp, Lock, Globe } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface Props {
  data: SectionData;
  index: number;
}

export const ContentDisplay: React.FC<Props> = ({ data, index }) => {
  const isEven = index % 2 === 0;

  const getIcon = (keyword: string) => {
    if (keyword.includes("Cyber")) return <Lock className="w-6 h-6 text-red-400" />;
    if (keyword.includes("AI")) return <Cpu className="w-6 h-6 text-cyan-400" />;
    if (keyword.includes("Cloud")) return <Cloud className="w-6 h-6 text-blue-400" />;
    if (keyword.includes("SDG") || keyword.includes("Globe")) return <Globe className="w-6 h-6 text-green-400" />;
    if (keyword.includes("Compliance")) return <ShieldCheck className="w-6 h-6 text-yellow-400" />;
    return <TrendingUp className="w-6 h-6 text-indigo-400" />;
  };

  return (
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
          
          {/* Image Container with Cool Effects */}
          {data.imageUrl && (
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

                {/* Tech overlay pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] pointer-events-none z-20" />
                
                {/* Floating Logo Watermark */}
                <div className="absolute top-4 right-4 z-20 opacity-50">
                  <div className="w-8 h-8 rounded-full border-2 border-white/30" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Highlights Cards */}
          {data.highlights && (
            <div className="grid gap-4">
              {data.highlights.map((highlight, idx) => (
                <Card key={idx} delay={idx * 0.1} className="border-l-4 border-l-cyan-500 backdrop-blur-xl bg-slate-900/60">
                  <div className="flex gap-4 items-center">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 shadow-inner">
                      {getIcon(highlight)}
                    </div>
                    <p className="font-medium text-slate-100">{highlight}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {/* Fallback if no highlights or image (though we added images to all) */}
          {!data.highlights && !data.imageUrl && (
             <Card className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900/50">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-slate-500 mb-2">Data Visualization</h4>
                  <div className="flex gap-2 justify-center mt-4">
                    <div className="w-2 h-16 bg-red-500/50 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-24 bg-cyan-500/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-12 bg-blue-500/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
             </Card>
          )}
        </div>

      </div>
    </section>
  );
};