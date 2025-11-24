import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, ShieldCheck, CreditCard, HelpCircle } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const PREDEFINED_QUESTIONS = [
    { id: 'security', text: "How does Eno protect my data?", icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'virtual_card', text: "What are virtual card numbers?", icon: <CreditCard className="w-4 h-4" /> },
    { id: 'alerts', text: "Show me recent alerts", icon: <MessageSquare className="w-4 h-4" /> },
];

const BOT_RESPONSES: Record<string, string> = {
    security: "I monitor your accounts 24/7 using machine learning to detect unusual activity. If I see something suspicious, I'll alert you immediately via push notification or text.",
    virtual_card: "Virtual card numbers allow you to shop online without exposing your actual credit card details. I can generate a unique number for each merchant to keep your real account safe.",
    alerts: "I've noticed a recurring charge that's higher than usual this month. Would you like me to investigate?",
    default: "I'm Eno, Capital One's intelligent assistant. I can help you manage your money, track spending, and keep your account secure. Select a topic below to learn more."
};

export const EnoAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleQuestionClick = (questionId: string, questionText: string) => {
        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: questionText,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Simulate bot response delay
        setTimeout(() => {
            const responseText = BOT_RESPONSES[questionId] || BOT_RESPONSES.default;
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-colors ${isOpen ? 'bg-slate-800 text-slate-400' : 'bg-gradient-to-r from-[#004879] to-[#D03027] text-white'
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
                        className="fixed bottom-24 right-4 md:right-8 z-50 w-[350px] max-w-[calc(100vw-32px)] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[600px]"
                    >
                        {/* Header */}
                        <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004879] to-[#D03027] flex items-center justify-center">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Eno</h3>
                                <p className="text-xs text-slate-400 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50 min-h-[300px]">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                                ? 'bg-cyan-600 text-white rounded-tr-none'
                                                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 flex gap-1">
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions / Input Area */}
                        <div className="p-4 bg-slate-900 border-t border-slate-700">
                            <p className="text-xs text-slate-500 mb-3 font-mono uppercase tracking-wider">Suggested Questions</p>
                            <div className="flex flex-col gap-2">
                                {PREDEFINED_QUESTIONS.map((q) => (
                                    <button
                                        key={q.id}
                                        onClick={() => handleQuestionClick(q.id, q.text)}
                                        disabled={isTyping}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors text-left text-sm text-slate-300 hover:text-cyan-400 group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="p-1.5 rounded-md bg-slate-800 group-hover:bg-slate-700 transition-colors text-slate-400 group-hover:text-cyan-400">
                                            {q.icon}
                                        </div>
                                        {q.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
