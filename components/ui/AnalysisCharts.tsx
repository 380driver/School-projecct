import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';

const cloudData = [
  { year: '2015', legacy: 85, cloud: 15, innovation: 20 },
  { year: '2017', legacy: 65, cloud: 35, innovation: 45 },
  { year: '2019', legacy: 40, cloud: 60, innovation: 70 },
  { year: '2021', legacy: 20, cloud: 80, innovation: 85 },
  { year: '2023', legacy: 10, cloud: 90, innovation: 92 },
  { year: '2025', legacy: 5, cloud: 95, innovation: 98 },
];

const efficiencyData = [
  { metric: 'Deploy Speed', traditional: 30, capitalOne: 95 },
  { metric: 'Cost Efficiency', traditional: 45, capitalOne: 88 },
  { metric: 'Fraud Detection', traditional: 60, capitalOne: 98 },
  { metric: 'Cust. Retention', traditional: 70, capitalOne: 92 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-slate-700 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="font-bold text-cyan-400 mb-2">{label}</p>
        {payload.map((p: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span>{p.name}: </span>
            <span className="font-mono font-bold">{p.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const AnalysisCharts = () => {
  return (
    <div className="space-y-6 w-full">
      {/* Chart 1: Cloud Transition */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 md:p-6 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#004879] to-[#D03027]" />
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-[#D03027] rounded-sm"/>
            Infrastructure Transition
          </h3>
          <p className="text-xs text-slate-400">Legacy Systems vs. Cloud Adoption (2015-2025)</p>
        </div>
        
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cloudData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCloud" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLegacy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="year" stroke="#475569" tick={{fontSize: 10}} />
              <YAxis stroke="#475569" tick={{fontSize: 10}} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="legacy" 
                name="Legacy Data Centers" 
                stroke="#64748b" 
                fillOpacity={1} 
                fill="url(#colorLegacy)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="cloud" 
                name="Cloud Infrastructure" 
                stroke="#06b6d4" 
                fillOpacity={1} 
                fill="url(#colorCloud)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Chart 2: Efficiency Comparison */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 md:p-6 shadow-xl relative overflow-hidden"
      >
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-[#004879] rounded-sm"/>
            Operational Efficiency
          </h3>
          <p className="text-xs text-slate-400">Capital One vs. Traditional Banks Benchmarks</p>
        </div>
        
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={efficiencyData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" stroke="#475569" tick={{fontSize: 10}} domain={[0, 100]} />
              <YAxis dataKey="metric" type="category" stroke="#94a3b8" tick={{fontSize: 10}} width={80} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} content={<CustomTooltip />} />
              <Legend wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
              <Bar dataKey="traditional" name="Traditional Banks" fill="#334155" radius={[0, 4, 4, 0]} barSize={12} />
              <Bar dataKey="capitalOne" name="Capital One" fill="#D03027" radius={[0, 4, 4, 0]} barSize={12}>
                 {efficiencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#06b6d4' : '#D03027'} />
                 ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
