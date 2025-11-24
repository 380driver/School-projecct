import React, { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceDot
} from 'recharts';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

const data = [
    { year: '2016', price: 72, event: 'Election Year' },
    { year: '2017', price: 85, event: 'Tax Cuts Act' },
    { year: '2018', price: 95, event: 'Deregulation Push' },
    { year: '2019', price: 88, event: 'Data Breach' },
    { year: '2020', price: 65, event: 'Pandemic Crash' },
    { year: '2021', price: 110, event: 'Recovery' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg shadow-xl">
                <p className="text-cyan-400 font-bold mb-1">{label}</p>
                <p className="text-white text-lg font-mono">${payload[0].value}</p>
                <p className="text-slate-400 text-sm mt-2 italic">
                    {payload[0].payload.event}
                </p>
            </div>
        );
    }
    return null;
};

export const StockChart = () => {
    const [hoveredData, setHoveredData] = useState<any>(null);

    return (
        <section className="py-20 px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                        Market Performance
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Capital One's stock price volatility during the Trump administration,
                        highlighting key policy events and the 2019 breach impact.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="h-[500px] w-full bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-2 md:p-6 shadow-xl"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                            onMouseMove={(e) => {
                                if (e.activePayload) {
                                    setHoveredData(e.activePayload[0].payload);
                                }
                            }}
                            onMouseLeave={() => setHoveredData(null)}
                        >
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis
                                dataKey="year"
                                stroke="#94a3b8"
                                tick={{ fill: '#94a3b8' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                tick={{ fill: '#94a3b8' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke="#06b6d4"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorPrice)"
                            />
                            {data.map((entry, index) => (
                                <ReferenceDot
                                    key={index}
                                    x={entry.year}
                                    y={entry.price}
                                    r={6}
                                    fill="#06b6d4"
                                    stroke="#fff"
                                    strokeWidth={2}
                                />
                            ))}
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </section>
    );
};
