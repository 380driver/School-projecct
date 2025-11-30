import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, ShieldCheck, CreditCard, HelpCircle, Gauge } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    action?: {
        label: string;
        targetId: string;
    };
}

const PREDEFINED_QUESTIONS = [
    { id: 'score', text: "Check my credit score", icon: <Gauge className="w-4 h-4" /> },
    { id: 'security', text: "How does Eno protect my data?", icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'virtual_card', text: "What are virtual card numbers?", icon: <CreditCard className="w-4 h-4" /> },
];

const BOT_RESPONSES: Record<string, any> = {
    security: {
        text: "I monitor your accounts 24/7 using machine learning to detect unusual activity. If I see something suspicious, I'll alert you immediately via push notification or text."
    },
    virtual_card: {
        text: "Virtual card numbers allow you to shop online without exposing your actual credit card details. I can generate a unique number for each merchant to keep your real account safe."
    },
    alerts: {
        text: "I've noticed a recurring charge that's higher than usual this month. Would you like me to investigate?"
    },
    score: {
        text: "Your credit score is a key indicator of your financial health. You can use our new Credit Score Simulator to see how different factors affect it.",
        action: {
            label: "Open Simulator",
            targetId: "credit-simulator"
        }
    },
    greeting: {
        text: "Hi there! I'm Eno. I can help you with your account, security, or understanding your credit score."
    },
    default: {
        text: "I'm not sure I understand that specific request yet. You can ask me about security, virtual cards, or your credit score."
    }
};

export const EnoAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: 'welcome', text: "Hi! I'm Eno. How can I help you today?", sender: 'bot', timestamp: new Date() }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const processInput = (text: string) => {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('score') || lowerText.includes('credit') || lowerText.includes('fico')) {
            return BOT_RESPONSES.score;
        } else if (lowerText.includes('security') || lowerText.includes('protect') || lowerText.includes('safe') || lowerText.includes('hack')) {
            return BOT_RESPONSES.security;
        } else if (lowerText.includes('virtual') || lowerText.includes('card') || lowerText.includes('number')) {
            return BOT_RESPONSES.virtual_card;
        } else if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
            return BOT_RESPONSES.greeting;
        }

        return BOT_RESPONSES.default;
    };

    const handleSend = (text: string = inputValue) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot response delay
        setTimeout(() => {
            const response = processInput(text);

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: response.text,
                sender: 'bot',
                timestamp: new Date(),
                action: response.action
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleActionClick = (targetId: string) => {
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-8 left-8 z-50 p-4 rounded-full shadow-2xl transition-colors ${isOpen ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' : 'bg-gradient-to-r from-[#004879] to-[#D03027] text-white'
                    }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-8 h-8" />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 left-4 md:left-8 z-50 w-[350px] max-w-[calc(100vw-32px)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[600px] h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3 shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004879] to-[#D03027] flex items-center justify-center">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Eno</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                            ? 'bg-cyan-600 text-white rounded-tr-none'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                    {msg.action && (
                                        <button
                                            onClick={() => handleActionClick(msg.action!.targetId)}
                                            className="mt-2 text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/50 px-3 py-1.5 rounded-full hover:bg-cyan-500/20 transition-colors flex items-center gap-1"
                                        >
                                            {msg.action.label} <Send className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 flex gap-1">
                                        <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shrink-0">
                            {/* Suggestions (only show if no input) */}
                            {messages.length < 3 && !inputValue && (
                                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                                    {PREDEFINED_QUESTIONS.map((q) => (
                                        <button
                                            key={q.id}
                                            onClick={() => handleSend(q.text)}
                                            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
                                        >
                                            {q.icon}
                                            {q.text}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
