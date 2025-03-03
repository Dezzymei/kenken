import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameContextType {
  completedPuzzles: Set<string>;
  markPuzzleCompleted: (levelId: string) => void;
  resetProgress: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedPuzzles, setCompletedPuzzles] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('kenken-completed-puzzles');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('kenken-completed-puzzles', JSON.stringify([...completedPuzzles]));
  }, [completedPuzzles]);

  const markPuzzleCompleted = (levelId: string) => {
    setCompletedPuzzles(prev => new Set([...prev, levelId]));
  };

  const resetProgress = () => {
    setCompletedPuzzles(new Set());
  };

  return (
    <GameContext.Provider value={{ completedPuzzles, markPuzzleCompleted, resetProgress }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 