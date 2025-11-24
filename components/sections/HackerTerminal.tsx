import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Lock, FileText, Unlock } from 'lucide-react';

const FILES = [
    {
        id: 'breach_report',
        name: 'breach_report_2019.txt',
        type: 'text',
        content: (
            <div className="text-red-400">
                <strong className="block text-red-500 mb-2">CRITICAL INCIDENT REPORT</strong>
                <p>Date: July 29, 2019</p>
                <p>Subject: Unauthorized Access</p>
                <br />
                <p>Summary: A hacker gained access to 100 million credit card applications.</p>
                <p>Method: Server-Side Request Forgery (SSRF) vulnerability in the WAF.</p>
                <p>Impact: Social Security numbers and bank account numbers compromised.</p>
            </div>
        )
    },
    {
        id: 'aws_config',
        name: 'aws_bucket_config.json',
        type: 'json',
        content: (
            <div className="text-yellow-400 font-mono text-xs">
                {`{
  "bucket": "capitalone-data",
  "permissions": "public-read",
  "encryption": false,
  "waf-status": "misconfigured"
}`}
            </div>
        )
    },
    {
        id: 'audit_log',
        name: 'security_audit.log',
        type: 'log',
        content: (
            <div className="text-slate-400 font-mono text-xs">
                <p>[ERROR] WAF Rule Set 403 Bypass detected</p>
                <p>[WARN] IAM Role 'WAF-Role' has excessive permissions</p>
                <p>[ALERT] Metadata service accessed from external IP</p>
            </div>
        )
    }
];

export const HackerTerminal = () => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    return (
        <section className="py-20 px-4 bg-black font-mono relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <div className="inline-flex items-center gap-2 text-red-500 mb-2 border border-red-500/30 px-3 py-1 rounded-full bg-red-950/20">
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-xs font-bold tracking-widest uppercase">Security Incident Simulation</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2">
                        The Data Breach Terminal
                    </h2>
                    <p className="text-slate-500 text-sm">
                        Access the server files to uncover the truth about the breach.
                    </p>
                </motion.div>

                <div className="bg-slate-950 border border-slate-800 rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px]">
                    {/* Sidebar / File List */}
                    <div className="w-full md:w-1/3 bg-slate-900 border-r border-slate-800 p-4">
                        <div className="flex items-center gap-2 text-slate-400 mb-4 text-xs uppercase tracking-wider font-bold">
                            <Lock className="w-3 h-3" />
                            Encrypted Files
                        </div>
                        <div className="space-y-2">
                            {FILES.map((file) => (
                                <button
                                    key={file.id}
                                    onClick={() => setSelectedFile(file.id)}
                                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all ${selectedFile === file.id
                                            ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-500/30'
                                            : 'hover:bg-slate-800 text-slate-400 border border-transparent'
                                        }`}
                                >
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm font-mono truncate">{file.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-slate-950 p-6 relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {selectedFile ? (
                                <motion.div
                                    key={selectedFile}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full"
                                >
                                    <div className="flex items-center gap-2 text-green-500 mb-4 border-b border-green-900/30 pb-2">
                                        <Unlock className="w-4 h-4" />
                                        <span className="text-xs font-mono uppercase">Decryption Successful</span>
                                    </div>
                                    <div className="font-mono text-sm leading-relaxed">
                                        {FILES.find(f => f.id === selectedFile)?.content}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-slate-600"
                                >
                                    <Lock className="w-12 h-12 mb-4 opacity-50" />
                                    <p className="text-sm font-mono">Select a file to decrypt contents...</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Scanline effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
