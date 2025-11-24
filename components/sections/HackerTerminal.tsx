import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldAlert, Lock } from 'lucide-react';

interface Command {
    input: string;
    output: React.ReactNode;
}

export const HackerTerminal = () => {
    const [history, setHistory] = useState<Command[]>([
        { input: 'init_sequence', output: 'Initializing secure connection... [OK]' },
        { input: 'auth_check', output: 'Access Level: RESTRICTED. Breach detected.' }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();
        let output: React.ReactNode = '';

        switch (cmd) {
            case 'help':
                output = (
                    <div className="text-slate-400">
                        Available commands:
                        <br />- <span className="text-cyan-400">ls</span>: List files
                        <br />- <span className="text-cyan-400">cat [file]</span>: Read file content
                        <br />- <span className="text-cyan-400">whoami</span>: Display current user
                        <br />- <span className="text-cyan-400">clear</span>: Clear terminal
                    </div>
                );
                break;
            case 'ls':
                output = (
                    <div className="grid grid-cols-2 gap-4 text-cyan-300">
                        <span>breach_report_2019.txt</span>
                        <span>aws_bucket_config.json</span>
                        <span>paige_thompson_profile.dat</span>
                        <span>security_audit.log</span>
                    </div>
                );
                break;
            case 'cat breach_report_2019.txt':
                output = (
                    <div className="text-red-400 border-l-2 border-red-500 pl-2">
                        CRITICAL ALERT: 100+ Million records exposed.
                        <br />Cause: Misconfigured Web Application Firewall (WAF).
                        <br />Impact: Credit scores, balances, and social security numbers compromised.
                    </div>
                );
                break;
            case 'cat aws_bucket_config.json':
                output = <span className="text-yellow-400">Error: Permission Denied. Encrypted file.</span>;
                break;
            case 'whoami':
                output = "Guest User (Unverified)";
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            default:
                output = <span className="text-red-500">Command not found: {cmd}. Type 'help' for list.</span>;
        }

        setHistory([...history, { input: cmd, output }]);
        setInput('');
    };

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
                        Explore the technical details of the 2019 Capital One breach.
                    </p>
                </motion.div>

                <div className="bg-slate-950 border border-slate-800 rounded-lg shadow-2xl overflow-hidden">
                    {/* Terminal Header */}
                    <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="flex-1 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                            <Lock className="w-3 h-3" />
                            root@capitalone-server:~
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-4 h-[400px] overflow-y-auto font-mono text-sm md:text-base" onClick={() => document.getElementById('terminal-input')?.focus()}>
                        {history.map((entry, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex gap-2 text-slate-400">
                                    <span className="text-green-500">➜</span>
                                    <span className="text-cyan-300">~</span>
                                    <span>{entry.input}</span>
                                </div>
                                <div className="mt-1 text-slate-300 pl-4">
                                    {entry.output}
                                </div>
                            </div>
                        ))}

                        <form onSubmit={handleCommand} className="flex gap-2 items-center mt-4">
                            <span className="text-green-500">➜</span>
                            <span className="text-cyan-300">~</span>
                            <input
                                id="terminal-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="bg-transparent border-none outline-none text-slate-200 flex-1 focus:ring-0 p-0"
                                autoComplete="off"
                                autoFocus
                            />
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-4 bg-slate-400 block"
                            />
                        </form>
                        <div ref={bottomRef} />
                    </div>
                </div>
            </div>
        </section>
    );
};
