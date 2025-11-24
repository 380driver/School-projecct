import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { DigitalObject } from '../3d/DigitalObject';

export const TransformationSection = () => {
    return (
        <section className="h-[600px] relative w-full overflow-hidden bg-slate-950">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 6] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <DigitalObject />
                    <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
            </div>

            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-slate-900/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-800/50"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                            The Digital Transformation
                        </h2>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                            Witness the shift from brick-and-mortar banking to cloud-native infrastructure.
                            <br />
                            <span className="text-cyan-400 text-sm font-mono mt-2 block">
                                Click the object to toggle between states
                            </span>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
