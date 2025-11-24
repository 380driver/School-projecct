import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';

export const ComparisonSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!containerRef.current) return;

        const { left, width } = containerRef.current.getBoundingClientRect();
        let clientX;

        if ('touches' in event) {
            clientX = event.touches[0].clientX;
        } else {
            clientX = (event as MouseEvent).clientX;
        }

        const position = ((clientX - left) / width) * 100;
        setSliderPosition(Math.min(100, Math.max(0, position)));
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging) {
                handleMove(e);
            }
        };

        const handleGlobalUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleGlobalMove);
            window.addEventListener('mouseup', handleGlobalUp);
            window.addEventListener('touchmove', handleGlobalMove);
            window.addEventListener('touchend', handleGlobalUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalUp);
            window.removeEventListener('touchmove', handleGlobalMove);
            window.removeEventListener('touchend', handleGlobalUp);
        };
    }, [isDragging]);

    return (
        <section className="py-24 px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">The Transformation</h2>
                    <p className="text-slate-400">Witness the shift from traditional banking to the digital era.</p>
                </motion.div>

                <div
                    ref={containerRef}
                    className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl select-none cursor-ew-resize"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                >
                    {/* Image 2 (Right - Digital) */}
                    <div className="absolute inset-0 bg-slate-900">
                        <img
                            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                            alt="Digital Banking"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
                        <div className="absolute top-1/2 right-12 -translate-y-1/2 text-right">
                            <h3 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-2">NOW</h3>
                            <p className="text-slate-200 text-lg font-mono">AI-Driven & Instant</p>
                        </div>
                    </div>

                    {/* Image 1 (Left - Traditional) - Clipped */}
                    <div
                        className="absolute inset-0 bg-slate-800 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                            alt="Traditional Banking"
                            className="w-full h-full object-cover grayscale opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-slate-900/80 to-transparent" />
                        <div className="absolute top-1/2 left-12 -translate-y-1/2">
                            <h3 className="text-4xl md:text-6xl font-bold text-slate-400 mb-2">THEN</h3>
                            <p className="text-slate-300 text-lg font-mono">Manual & Physical</p>
                        </div>
                    </div>

                    {/* Slider Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl">
                            <GripVertical className="w-5 h-5 text-slate-900" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
