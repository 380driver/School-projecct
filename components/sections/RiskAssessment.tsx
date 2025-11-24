
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldAlert, Cpu, Gavel, Activity, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface RiskItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  expertRating: number;
  insight: string;
}

const RISKS: RiskItem[] = [
  {
    id: 'cyber',
    title: 'Cybersecurity Threats',
    description: 'Risk of data breaches and quantum attacks on cloud infrastructure.',
    icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
    expertRating: 5,
    insight: "High Risk: As Capital One expands cloud infrastructure, the attack surface grows. The essay highlights the critical need for 'Quantum-Resistant Cybersecurity' and zero-trust frameworks."
  },
  {
    id: 'regulatory',
    title: 'Deregulation Impact',
    description: 'Reduced federal oversight leading to potential predatory practices.',
    icon: <Gavel className="w-6 h-6 text-yellow-400" />,
    expertRating: 4,
    insight: "High Risk: Trump-era deregulation weakens the CFPB. While this aids innovation, it shifts the burden of consumer protection entirely to internal bank governance."
  },
  {
    id: 'ai_ethics',
    title: 'AI Bias & Ethics',
    description: 'Algorithmic discrimination in automated lending decisions.',
    icon: <Cpu className="w-6 h-6 text-cyan-400" />,
    expertRating: 4,
    insight: "High Risk: Automated lending can inadvertently perpetuate bias. The essay emphasizes the need for 'fairness audits' and 'explainable AI' to mitigate this."
  },
  {
    id: 'operational',
    title: 'Operational Resilience',
    description: 'System failures due to rapid digital transformation speed.',
    icon: <Activity className="w-6 h-6 text-orange-400" />,
    expertRating: 3,
    insight: "Moderate Risk: Capital One was an early cloud adopter (2015), giving them a mature infrastructure compared to competitors, though rapid updates always carry stability risks."
  }
];

export const RiskAssessment = () => {
  const [ratings, setRatings] = useState<Record<string, number>>({
    cyber: 3,
    regulatory: 3,
    ai_ethics: 3,
    operational: 3
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  const handleRate = (id: string, rating: number) => {
    if (!isSubmitted) {
      setRatings(prev => ({ ...prev, [id]: rating }));
    }
  };

  const calculateScore = (currentRatings: Record<string, number>) => {
    return Object.values(currentRatings).reduce((a: number, b: number) => a + b, 0) / RISKS.length;
  };

  const userAverage = calculateScore(ratings);
  const expertAverage = calculateScore(RISKS.reduce((acc, risk) => ({ ...acc, [risk.id]: risk.expertRating }), {}));

  const getRiskLevel = (score: number) => {
    if (score < 2) return { label: 'LOW', color: 'text-green-400', borderColor: 'border-green-500' };
    if (score < 3.5) return { label: 'MODERATE', color: 'text-yellow-400', borderColor: 'border-yellow-500' };
    return { label: 'CRITICAL', color: 'text-red-500', borderColor: 'border-red-500' };
  };

  const userStatus = getRiskLevel(userAverage);
  const expertStatus = getRiskLevel(expertAverage);

  const toggleInsight = (id: string) => {
    if (expandedInsight === id) {
      setExpandedInsight(null);
    } else {
      setExpandedInsight(id);
    }
  };

  return (
    <section id="risk-assessment" className="py-24 px-4 relative z-10 overflow-hidden bg-slate-900/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-red-400 font-mono tracking-wider text-sm uppercase">Interactive Lab</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-500">
            Risk Assessment Protocol
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Rate the severity of risks facing Capital One. Then, compare your assessment with the case study findings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Cards */}
          <div className="lg:col-span-2 grid gap-6">
            {RISKS.map((risk) => {
              const isMatch = ratings[risk.id] === risk.expertRating;

              return (
                <motion.div
                  key={risk.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true }}
                  className={`bg-slate-900/50 backdrop-blur-md border rounded-xl p-6 transition-all group ${isSubmitted && !isMatch ? 'border-red-500/30' : 'border-slate-700/50 hover:border-cyan-500/30'
                    }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-lg bg-slate-800/80 shadow-inner">
                        {risk.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-slate-100">
                            {risk.title}
                          </h3>
                          {isSubmitted && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${isMatch
                                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                                  : 'bg-red-500/10 border-red-500/40 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                                }`}
                            >
                              {isMatch ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                              <span>{isMatch ? 'Accurate' : 'Deviation'}</span>
                            </motion.div>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mt-1 max-w-md">
                          {risk.description}
                        </p>
                      </div>
                    </div>

                    {/* Rating Selector */}
                    <div className="flex flex-col gap-2 items-end">
                      <div className="flex items-center gap-2 bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            disabled={isSubmitted}
                            onClick={() => handleRate(risk.id, num)}
                            className={`w-8 h-8 rounded-md text-sm font-bold transition-all duration-200 ${ratings[risk.id] >= num
                                ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(8,145,178,0.5)]'
                                : 'bg-slate-800 text-slate-600'
                              } ${isSubmitted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-700'}`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      {isSubmitted && (
                        <div className="text-xs font-mono text-slate-500">
                          Expert Rating: <span className="text-red-400 font-bold">{risk.expertRating}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Insight for Analyst Mode */}
                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden border-t border-slate-700/50 pt-4"
                      >
                        <div className="flex gap-3 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <p>{risk.insight}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              className="sticky top-24 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center"
              layout
            >
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-6">
                {isSubmitted ? 'Analysis Comparison' : 'Your Assessment'}
              </h3>

              <div className="flex justify-center gap-8 mb-6">
                {/* User Score */}
                <div className="text-center">
                  <div className="relative w-32 h-32 flex items-center justify-center mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                      <circle
                        cx="64" cy="64" r="58"
                        stroke={userAverage > 3.5 ? '#ef4444' : userAverage > 2 ? '#eab308' : '#22c55e'}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={364}
                        strokeDashoffset={364 - (364 * userAverage) / 5}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-white">{userAverage.toFixed(1)}</span>
                      <span className="text-[10px] text-slate-500 font-mono">USER</span>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${userStatus.color}`}>{userStatus.label}</div>
                </div>

                {/* Expert Score (Hidden until submitted) */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="relative w-32 h-32 flex items-center justify-center mb-2">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="58" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                        <circle
                          cx="64" cy="64" r="58"
                          stroke={expertAverage > 3.5 ? '#ef4444' : expertAverage > 2 ? '#eab308' : '#22c55e'}
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={364}
                          strokeDashoffset={364 - (364 * expertAverage) / 5}
                          className="transition-all duration-1000 ease-out"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-white">{expertAverage.toFixed(1)}</span>
                        <span className="text-[10px] text-slate-500 font-mono">EXPERT</span>
                      </div>
                    </div>
                    <div className={`text-sm font-bold ${expertStatus.color}`}>{expertStatus.label}</div>
                  </motion.div>
                )}
              </div>

              {!isSubmitted ? (
                <button
                  onClick={() => setIsSubmitted(true)}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg shadow-cyan-900/20 transition-all transform hover:scale-105"
                >
                  Run Analysis
                </button>
              ) : (
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-colors"
                >
                  Reset Simulation
                </button>
              )}

              <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                {isSubmitted
                  ? "Comparison complete. Review the insights in the left panel to understand the discrepancy between perceived and actual risk based on the Capital One case study."
                  : "Rate the risks based on your understanding. Click 'Run Analysis' to reveal the case study's findings."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
