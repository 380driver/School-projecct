
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Hash } from 'lucide-react';
import { CONTENT_SECTIONS } from '../../constants';
import { SectionData } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SectionData[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = CONTENT_SECTIONS.filter(section => {
      const titleMatch = section.title.toLowerCase().includes(lowerQuery);
      const subtitleMatch = section.subtitle?.toLowerCase().includes(lowerQuery);
      const contentMatch = Array.isArray(section.content)
        ? section.content.some(c => c.toLowerCase().includes(lowerQuery))
        : section.content.toLowerCase().includes(lowerQuery);
      
      const highlightMatch = section.highlights?.some(h => 
        h.title.toLowerCase().includes(lowerQuery) || h.description.toLowerCase().includes(lowerQuery)
      );

      return titleMatch || subtitleMatch || contentMatch || highlightMatch;
    });

    setResults(filtered);
  }, [query]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#020617]/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
        >
          {/* Header / Input */}
          <div className="p-4 border-b border-slate-700 flex items-center gap-3 bg-slate-900/50">
            <Search className="w-5 h-5 text-cyan-400" />
            <input
              autoFocus
              type="text"
              placeholder="Search case study topics (e.g., 'Cloud', 'Risk', 'AI')..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              onClick={onClose}
              className="p-1 hover:bg-slate-800 rounded-md text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto flex-1 p-2">
            {query === '' ? (
              <div className="text-center py-12 text-slate-500">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Type to search across the Capital One analysis.</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p>No matches found for "{query}"</p>
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      onNavigate(section.id);
                      onClose();
                    }}
                    className="w-full text-left p-4 rounded-xl hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all group flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono uppercase tracking-wider border border-cyan-900">
                          {section.id}
                        </span>
                        <h4 className="text-slate-200 font-bold group-hover:text-cyan-400 transition-colors">
                          {section.title}
                        </h4>
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-1">
                        {section.subtitle || (Array.isArray(section.content) ? section.content[0] : section.content)}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between uppercase tracking-wider font-mono">
            <span>Local Content Search</span>
            <div className="flex gap-4">
               <span>ESC to Close</span>
               <span>Enter to Select</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
