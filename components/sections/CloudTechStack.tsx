import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Cloud, ArrowRight, Database, Shield, Cpu } from 'lucide-react';
import { Card } from '../ui/Card';

export const CloudTechStack = () => {
    const [migrationProgress, setMigrationProgress] = useState(50);

    // Calculate stats based on progress
    const dataCentersClosed = Math.floor((migrationProgress / 100) * 8);
    const cloudApps = Math.floor(migrationProgress);
    const innovationSpeed = 1 + (migrationProgress / 25); // 1x to 5x

    return (
        <section className="py-20 px-4 relative z-10 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                        The Cloud Pioneer
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Capital One was the first major U.S. bank to exit legacy data centers and go all-in on the public cloud.
                        <br />
                        <span className="text-cyan-600 dark:text-cyan-400 text-sm mt-2 block">Drag the slider to visualize the migration (2014 - 2020)</span>
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 items-center">
                    {/* Legacy Side */}
                    <Card className="relative overflow-hidden min-h-[300px] flex flex-col items-center justify-center border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50">
                        <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50 z-0" />
                        <h3 className="relative z-10 text-slate-500 dark:text-slate-400 font-bold mb-6 uppercase tracking-widest">Legacy On-Prem</h3>
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={`server-${i}`}
                                    initial={false}
                                    animate={{
                                        opacity: i < (8 - dataCentersClosed) ? 1 : 0.1,
                                        scale: i < (8 - dataCentersClosed) ? 1 : 0.8,
                                        filter: i < (8 - dataCentersClosed) ? 'grayscale(0%)' : 'grayscale(100%)'
                                    }}
                                    className="p-3 bg-slate-200 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700"
                                >
                                    <Server className={`w-8 h-8 ${i < (8 - dataCentersClosed) ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-700'}`} />
                                </motion.div>
                            ))}
                        </div>
                        <p className="relative z-10 mt-6 text-slate-600 dark:text-slate-500 font-mono text-sm">
                            Data Centers Active: <span className="text-slate-900 dark:text-white">{8 - dataCentersClosed}</span>/8
                        </p>
                    </Card>

                    {/* Controls & Stats */}
                    <div className="flex flex-col gap-6 text-center">
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                                <span>2014</span>
                                <span>Migration Timeline</span>
                                <span>2020</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={migrationProgress}
                                onChange={(e) => setMigrationProgress(Number(e.target.value))}
                                className="w-full h-3 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 mb-4"
                            />
                            <div className="flex items-center justify-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xl">
                                <span>{migrationProgress}%</span>
                                <span className="text-slate-500 text-sm font-normal">Cloud Native</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <motion.div
                                className="bg-slate-200/50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-300 dark:border-slate-700"
                                animate={{ scale: innovationSpeed >= 3 ? 1.05 : 1 }}
                            >
                                <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">{innovationSpeed.toFixed(1)}x</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">Dev Velocity</div>
                            </motion.div>

                            <div className="bg-slate-200/50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-300 dark:border-slate-700">
                                <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">AWS</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">Infrastructure</div>
                            </div>
                        </div>
                    </div>

                    {/* Cloud Side */}
                    <Card className="relative overflow-hidden min-h-[300px] flex flex-col items-center justify-center border-cyan-500/30 bg-cyan-50/10 dark:bg-cyan-950/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 z-0" />
                        <h3 className="relative z-10 text-cyan-600 dark:text-cyan-400 font-bold mb-6 uppercase tracking-widest">Public Cloud</h3>

                        <div className="relative z-10 h-[200px] w-full flex items-center justify-center">
                            <div className="relative w-32 h-32">
                                {/* Central Cloud Node */}
                                <motion.div
                                    animate={{
                                        scale: 0.5 + (migrationProgress / 100),
                                        filter: `drop-shadow(0 0 ${migrationProgress / 5}px rgba(6,182,212,0.5))`
                                    }}
                                    className="absolute inset-0 flex items-center justify-center z-20"
                                >
                                    <Cloud className="w-20 h-20 text-cyan-500 dark:text-cyan-400 fill-cyan-100 dark:fill-cyan-950" />
                                </motion.div>

                                {/* Orbiting Nodes */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={`node-${i}`}
                                        className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 flex items-center justify-center bg-white dark:bg-slate-900 border border-cyan-500/50 rounded-full z-10"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: migrationProgress > (i * 15) ? 1 : 0,
                                            scale: migrationProgress > (i * 15) ? 1 : 0,
                                            rotate: 360,
                                            x: Math.cos(i) * 60 * (migrationProgress / 100),
                                            y: Math.sin(i) * 60 * (migrationProgress / 100),
                                        }}
                                        transition={{ rotate: { duration: 10 + i, repeat: Infinity, ease: "linear" } }}
                                    >
                                        <Database className="w-4 h-4 text-cyan-600 dark:text-cyan-300" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <p className="relative z-10 mt-6 text-cyan-700 dark:text-cyan-600 font-mono text-sm">
                            Applications Migrated: <span className="text-cyan-600 dark:text-cyan-400">{cloudApps}%</span>
                        </p>
                    </Card>
                </div>
            </div>
        </section>
    );
};
