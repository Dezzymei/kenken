import React, { useState } from 'react'
import KenKenPuzzle from './components/KenKenPuzzle'
import HomeScreen from './components/HomeScreen'
import { GameProvider, useGame } from './contexts/GameContext'

interface GameState {
  size: number | null;
  levelIndex: number | null;
}

const AppContent: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    size: null,
    levelIndex: null
  });
  const { completedPuzzles, markPuzzleCompleted } = useGame();

  const handlePuzzleComplete = () => {
    if (gameState.size !== null && gameState.levelIndex !== null) {
      markPuzzleCompleted(`${gameState.size}-${gameState.levelIndex}`);
    }
  };

  const handleSizeSelect = (size: number, levelIndex: number) => {
    setGameState({ size, levelIndex });
  };

  const handleBackToHome = () => {
    setGameState({ size: null, levelIndex: null });
  };

  return (
    <div className="min-h-screen h-screen w-screen cyber-background">
      <div className="cyber-grid"></div>
      <div className="w-full h-full flex items-center justify-center relative z-10">
        {gameState.size === null ? (
          <HomeScreen 
            onSizeSelect={handleSizeSelect} 
            completedPuzzles={completedPuzzles}
          />
        ) : (
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-8">
            <button
              onClick={handleBackToHome}
              className="cyber-back-button mb-8 flex items-center gap-2 self-start"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Return to Base
            </button>
            <KenKenPuzzle 
              size={gameState.size}
              levelIndex={gameState.levelIndex!}
              onComplete={handlePuzzleComplete}
              onBack={handleBackToHome}
            />
          </div>
        )}
      </div>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App
