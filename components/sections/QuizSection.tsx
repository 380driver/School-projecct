import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, RefreshCw, BrainCircuit } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        question: "When did Capital One migrate to the public cloud (AWS)?",
        options: ["2010", "2015", "2018", "2020"],
        correctAnswer: 1,
        explanation: "Capital One became the first major US bank to announce a full migration to the public cloud in 2015."
    },
    {
        id: 2,
        question: "What is the name of Capital One's AI assistant?",
        options: ["Siri", "Alexa", "Eno", "Cortana"],
        correctAnswer: 2,
        explanation: "Eno is Capital One's intelligent assistant that monitors accounts and provides virtual card numbers."
    },
    {
        id: 3,
        question: "Which strategy did Capital One pioneer in 1994?",
        options: ["Information-Based Strategy (IBS)", "Brick-and-Mortar Expansion", "Crypto Trading", "High-Frequency Trading"],
        correctAnswer: 0,
        explanation: "Capital One pioneered the Information-Based Strategy (IBS), using data analytics to tailor credit offers."
    },
    {
        id: 4,
        question: "What is a key risk associated with digital transformation mentioned in the case study?",
        options: ["Too many customers", "Cybersecurity Threats", "Lower profits", "Slower transactions"],
        correctAnswer: 1,
        explanation: "As banks digitize, the attack surface grows, making cybersecurity and data privacy critical risks."
    }
];

export const QuizSection = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswer = (optionIndex: number) => {
        if (isAnswered) return;

        setSelectedOption(optionIndex);
        setIsAnswered(true);

        if (optionIndex === QUESTIONS[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
            if (currentQuestion === QUESTIONS.length - 1) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResults(false);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    return (
        <section className="py-24 px-4 relative z-10 bg-slate-100/30 dark:bg-slate-900/30">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                        <BrainCircuit className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-indigo-600 dark:text-indigo-400 font-mono tracking-wider text-sm uppercase">Knowledge Check</span>
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Test Your Knowledge</h2>
                    <p className="text-slate-600 dark:text-slate-400">See how much you've learned about Capital One's digital transformation.</p>
                </motion.div>

                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
                    {/* Background Gradient */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                    <AnimatePresence mode="wait">
                        {!showResults ? (
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="w-full max-w-2xl mx-auto"
                            >
                                <div className="flex justify-between items-center mb-8 text-sm font-mono text-slate-500">
                                    <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                                    <span>Score: {score}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 leading-relaxed">
                                    {QUESTIONS[currentQuestion].question}
                                </h3>

                                <div className="space-y-4">
                                    {QUESTIONS[currentQuestion].options.map((option, index) => {
                                        let buttonStyle = "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300";
                                        if (isAnswered) {
                                            if (index === QUESTIONS[currentQuestion].correctAnswer) {
                                                buttonStyle = "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400";
                                            } else if (index === selectedOption) {
                                                buttonStyle = "bg-red-500/20 border-red-500 text-red-600 dark:text-red-400";
                                            } else {
                                                buttonStyle = "bg-slate-100/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 opacity-50";
                                            }
                                        } else if (selectedOption === index) {
                                            buttonStyle = "bg-indigo-600 border-indigo-500 text-white";
                                        }

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswer(index)}
                                                disabled={isAnswered}
                                                className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${buttonStyle}`}
                                            >
                                                <span className="font-medium">{option}</span>
                                                {isAnswered && index === QUESTIONS[currentQuestion].correctAnswer && (
                                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                )}
                                                {isAnswered && index === selectedOption && index !== QUESTIONS[currentQuestion].correctAnswer && (
                                                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {isAnswered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8 p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700"
                                    >
                                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                                            <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">Explanation:</span>
                                            {QUESTIONS[currentQuestion].explanation}
                                        </p>
                                        <button
                                            onClick={nextQuestion}
                                            className="mt-4 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors"
                                        >
                                            {currentQuestion < QUESTIONS.length - 1 ? "Next Question" : "See Results"}
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
                                    <Trophy className="w-12 h-12 text-white" />
                                </div>

                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Quiz Complete!</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-8">You scored {score} out of {QUESTIONS.length}</p>

                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={resetQuiz}
                                        className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-semibold"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Try Again
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
