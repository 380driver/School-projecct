import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gauge, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const CreditScoreSimulator = () => {
    const [paymentHistory, setPaymentHistory] = useState(100); // 35%
    const [utilization, setUtilization] = useState(10); // 30% (lower is better)
    const [creditAge, setCreditAge] = useState(5); // 15% (years)
    const [totalAccounts, setTotalAccounts] = useState(5); // 10%
    const [inquiries, setInquiries] = useState(0); // 10% (lower is better)

    const [score, setScore] = useState(750);
    const [rating, setRating] = useState('Excellent');
    const [color, setColor] = useState('text-green-500');

    useEffect(() => {
        // Simplified FICO-like calculation
        // Base score: 300
        // Max add: 550 (Total 850)

        let calculatedScore = 300;

        // Payment History (35%) - Max 192.5 points
        calculatedScore += (paymentHistory / 100) * 192.5;

        // Utilization (30%) - Max 165 points
        // 0-10%: Max points, >90%: Min points
        const utilScore = Math.max(0, 165 - (utilization * 1.65));
        calculatedScore += utilScore;

        // Credit Age (15%) - Max 82.5 points
        // Cap at 25 years for max points
        const ageScore = Math.min(82.5, (creditAge / 25) * 82.5);
        calculatedScore += ageScore;

        // Total Accounts (10%) - Max 55 points
        // Cap at 20 accounts
        const accountScore = Math.min(55, (totalAccounts / 20) * 55);
        calculatedScore += accountScore;

        // Inquiries (10%) - Max 55 points
        // 0 inquiries = max, 10+ = 0
        const inquiryScore = Math.max(0, 55 - (inquiries * 5.5));
        calculatedScore += inquiryScore;

        const finalScore = Math.round(calculatedScore);
        setScore(finalScore);

        if (finalScore >= 800) {
            setRating('Exceptional');
            setColor('text-emerald-400');
        } else if (finalScore >= 740) {
            setRating('Very Good');
            setColor('text-green-400');
        } else if (finalScore >= 670) {
            setRating('Good');
            setColor('text-blue-400');
        } else if (finalScore >= 580) {
            setRating('Fair');
            setColor('text-yellow-400');
        } else {
            setRating('Poor');
            setColor('text-red-400');
        }

    }, [paymentHistory, utilization, creditAge, totalAccounts, inquiries]);

    return (
        <section id="credit-simulator" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-950/50" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        Credit Score Simulator
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        See how different financial decisions impact your credit score in real-time.
                        This interactive tool demonstrates the key factors used in credit scoring models.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-2 space-y-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">

                        {/* Payment History */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="flex items-center gap-2 font-semibold text-slate-200">
                                    <CheckCircle className="w-4 h-4 text-cyan-500" />
                                    On-Time Payments
                                </label>
                                <span className="text-cyan-400 font-mono">{paymentHistory}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={paymentHistory}
                                onChange={(e) => setPaymentHistory(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                            <p className="text-xs text-slate-500 mt-1">Impact: High (35%) - The most important factor.</p>
                        </div>

                        {/* Utilization */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="flex items-center gap-2 font-semibold text-slate-200">
                                    <TrendingUp className="w-4 h-4 text-purple-500" />
                                    Credit Utilization
                                </label>
                                <span className="text-purple-400 font-mono">{utilization}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={utilization}
                                onChange={(e) => setUtilization(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                            <p className="text-xs text-slate-500 mt-1">Impact: High (30%) - Keep below 30% for best results.</p>
                        </div>

                        {/* Credit Age */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="flex items-center gap-2 font-semibold text-slate-200">
                                    <Info className="w-4 h-4 text-blue-500" />
                                    Average Credit Age
                                </label>
                                <span className="text-blue-400 font-mono">{creditAge} Years</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="25"
                                value={creditAge}
                                onChange={(e) => setCreditAge(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                            <p className="text-xs text-slate-500 mt-1">Impact: Medium (15%) - Longer history is better.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Total Accounts */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="flex items-center gap-2 font-semibold text-slate-200">
                                        <Info className="w-4 h-4 text-emerald-500" />
                                        Total Accounts
                                    </label>
                                    <span className="text-emerald-400 font-mono">{totalAccounts}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="30"
                                    value={totalAccounts}
                                    onChange={(e) => setTotalAccounts(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                                <p className="text-xs text-slate-500 mt-1">Impact: Low (10%) - Mix of credit types.</p>
                            </div>

                            {/* Inquiries */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="flex items-center gap-2 font-semibold text-slate-200">
                                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                                        Hard Inquiries
                                    </label>
                                    <span className="text-orange-400 font-mono">{inquiries}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    value={inquiries}
                                    onChange={(e) => setInquiries(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                />
                                <p className="text-xs text-slate-500 mt-1">Impact: Low (10%) - Too many can hurt.</p>
                            </div>
                        </div>

                    </div>

                    {/* Score Display */}
                    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-transparent rounded-2xl pointer-events-none" />

                        <motion.div
                            key={score}
                            initial={{ scale: 0.9, opacity: 0.8 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative z-10 text-center"
                        >
                            <Gauge className={`w-24 h-24 mx-auto mb-4 ${color} opacity-80`} />
                            <div className={`text-6xl font-bold mb-2 ${color} font-mono tracking-tighter`}>
                                {score}
                            </div>
                            <div className={`text-xl font-semibold uppercase tracking-widest ${color}`}>
                                {rating}
                            </div>
                        </motion.div>

                        <div className="mt-8 w-full space-y-2">
                            <div className="flex justify-between text-xs text-slate-500 uppercase tracking-wider">
                                <span>Poor</span>
                                <span>Exceptional</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${color.replace('text-', 'bg-')}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((score - 300) / 550) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                />
                            </div>
                            <div className="flex justify-between text-xs font-mono text-slate-600">
                                <span>300</span>
                                <span>850</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
