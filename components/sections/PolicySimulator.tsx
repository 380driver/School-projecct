import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign } from 'lucide-react';

export const PolicySimulator = () => {
    const [deregulation, setDeregulation] = useState(50);
    const [interestRate, setInterestRate] = useState(50);

    // Calculated metrics
    const [bankProfit, setBankProfit] = useState(50);
    const [consumerRisk, setConsumerRisk] = useState(50);
    const [marketStability, setMarketStability] = useState(50);

    useEffect(() => {
        // Simulation logic
        // Higher deregulation = Higher profit, Higher risk, Lower stability
        // Higher interest rates = Higher profit (initially), Higher risk (defaults), Lower stability

        const newProfit = (deregulation * 0.8) + (interestRate * 0.5);
        const newRisk = (deregulation * 0.9) + (interestRate * 0.3);
        const newStability = 100 - ((deregulation * 0.6) + (interestRate * 0.4));

        setBankProfit(Math.min(100, Math.max(0, newProfit)));
        setConsumerRisk(Math.min(100, Math.max(0, newRisk)));
        setMarketStability(Math.min(100, Math.max(0, newStability)));
    }, [deregulation, interestRate]);

    const getColor = (value: number, isGoodHigh: boolean) => {
        if (isGoodHigh) {
            return value > 70 ? 'bg-green-500' : value > 40 ? 'bg-yellow-500' : 'bg-red-500';
        } else {
            return value > 70 ? 'bg-red-500' : value > 40 ? 'bg-yellow-500' : 'bg-green-500';
        }
    };

    return (
        <section className="py-20 px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                        Policy Impact Simulator
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Adjust the parameters to see how banking policies affect different stakeholders.
                        Notice the trade-off between corporate profits and consumer protection.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Controls */}
                    <Card title="Policy Controls" className="h-full">
                        <div className="space-y-8 mt-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-slate-300 font-semibold">Deregulation Level</label>
                                    <span className="text-cyan-400">{deregulation}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={deregulation}
                                    onChange={(e) => setDeregulation(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Reducing restrictions on banking activities and capital requirements.
                                </p>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-slate-300 font-semibold">Interest Rate Environment</label>
                                    <span className="text-cyan-400">{interestRate}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Base rates set by the Federal Reserve affecting borrowing costs.
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Results */}
                    <div className="space-y-4">
                        <Card className="!p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="text-green-400 w-5 h-5" />
                                    <span className="font-semibold text-slate-200">Bank Profitability</span>
                                </div>
                                <span className="text-slate-400">{Math.round(bankProfit)}%</span>
                            </div>
                            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${getColor(bankProfit, true)}`}
                                    animate={{ width: `${bankProfit}%` }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                />
                            </div>
                        </Card>

                        <Card className="!p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="text-red-400 w-5 h-5" />
                                    <span className="font-semibold text-slate-200">Consumer Risk</span>
                                </div>
                                <span className="text-slate-400">{Math.round(consumerRisk)}%</span>
                            </div>
                            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${getColor(consumerRisk, false)}`}
                                    animate={{ width: `${consumerRisk}%` }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                />
                            </div>
                        </Card>

                        <Card className="!p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="text-blue-400 w-5 h-5" />
                                    <span className="font-semibold text-slate-200">Market Stability</span>
                                </div>
                                <span className="text-slate-400">{Math.round(marketStability)}%</span>
                            </div>
                            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${getColor(marketStability, true)}`}
                                    animate={{ width: `${marketStability}%` }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
