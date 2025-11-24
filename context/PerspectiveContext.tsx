import React, { createContext, useContext, useState, ReactNode } from 'react';

type PerspectiveType = 'banker' | 'customer';

interface PerspectiveContextType {
    perspective: PerspectiveType;
    togglePerspective: () => void;
    setPerspective: (p: PerspectiveType) => void;
}

const PerspectiveContext = createContext<PerspectiveContextType | undefined>(undefined);

export const PerspectiveProvider = ({ children }: { children: ReactNode }) => {
    const [perspective, setPerspective] = useState<PerspectiveType>('banker');

    const togglePerspective = () => {
        setPerspective(prev => prev === 'banker' ? 'customer' : 'banker');
    };

    return (
        <PerspectiveContext.Provider value={{ perspective, togglePerspective, setPerspective }}>
            {children}
        </PerspectiveContext.Provider>
    );
};

export const usePerspective = () => {
    const context = useContext(PerspectiveContext);
    if (context === undefined) {
        throw new Error('usePerspective must be used within a PerspectiveProvider');
    }
    return context;
};
