import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT_SECTIONS } from '../../constants';
import { ChevronRight, Calendar, ArrowRight } from 'lucide-react';

export const Timeline = () => {
    // Get the evolution data
    const evolutionData = CONTENT_SECTIONS.find(s => s.id === 'explanation');
    const events = evolutionData?.highlights || [];
    const [activeEvent, setActiveEvent] = useState(0);

    if (!evolutionData) return null;

    return (
        <section id="explanation" className="py-24 px-4 relative z-10 overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                        <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        <span className="text-cyan-600 dark:text-cyan-400 font-mono tracking-wider text-sm uppercase">Historical Timeline</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        {evolutionData.title}
                    </h2>
                    <p className="text-xl text-cyan-700 dark:text-cyan-200/80 font-light max-w-2xl mx-auto">
                        {evolutionData.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Timeline Navigation (Left Side) */}
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 hidden md:block" />

                        <div className="space-y-8 relative z-10">
                            {events.map((event, index) => {
                                const isActive = activeEvent === index;
                                const year = event.title.split(':')[0]; // Extract year assuming format "YYYY: Title"

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setActiveEvent(index)}
                                        className={`group cursor-pointer flex items-center gap-6 p-4 rounded-xl transition-all duration-300 ${isActive
                                            ? 'bg-white/50 dark:bg-slate-800/50 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                                            : 'hover:bg-slate-100/30 dark:hover:bg-slate-800/30 border border-transparent'
                                            }`}
                                    >
                                        {/* Dot Indicator */}
                                        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex-shrink-0 ${isActive
                                            ? 'bg-cyan-500 border-cyan-400 scale-125 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                                            : 'bg-slate-200 dark:bg-slate-900 border-slate-300 dark:border-slate-600 group-hover:border-cyan-500/50'
                                            }`} />

                                        <div className="flex-1">
                                            <span className={`font-mono text-sm font-bold tracking-wider transition-colors ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-500 group-hover:text-cyan-600/70 dark:group-hover:text-cyan-500/70'
                                                }`}>
                                                {year}
                                            </span>
                                            <h3 className={`text-lg font-bold transition-colors ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                                                }`}>
                                                {event.title.split(':')[1] || event.title}
                                            </h3>
                                        </div>

                                        <ChevronRight className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-cyan-600 dark:text-cyan-400 opacity-100 translate-x-0' : 'text-slate-400 dark:text-slate-600 opacity-0 -translate-x-4 group-hover:opacity-50'
                                            }`} />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Display (Right Side) */}
                    <div className="relative h-[400px] md:h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeEvent}
                                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0"
                            >
                                <div className="h-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col justify-center relative overflow-hidden">
                                    {/* Background Decoration */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                                    <div className="relative z-10">
                                        <span className="inline-block px-3 py-1 rounded bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-sm mb-6">
                                            {events[activeEvent].title.split(':')[0]}
                                        </span>

                                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                            {events[activeEvent].title.split(':')[1] || events[activeEvent].title}
                                        </h3>

                                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                                            {events[activeEvent].description}
                                        </p>

                                        {events[activeEvent].link ? (
                                            <a
                                                href={events[activeEvent].link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm uppercase tracking-widest group cursor-pointer hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                                            >
                                                <span>Learn more</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm uppercase tracking-widest group cursor-pointer hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors">
                                                <span>Learn more</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
