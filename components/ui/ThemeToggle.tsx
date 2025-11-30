import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 left-8 z-50 p-3 rounded-full bg-slate-900/90 dark:bg-slate-900/90 bg-white/90 border border-slate-200 dark:border-slate-700 shadow-xl backdrop-blur-md text-slate-800 dark:text-slate-200"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6 text-amber-500" />}
            </motion.div>
        </motion.button>
    );
};
