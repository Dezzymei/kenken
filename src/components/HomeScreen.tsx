import React, { useState, useEffect } from 'react';
import { playHoverSound, playClickSound } from '../utils/sounds';

interface HomeScreenProps {
  onSizeSelect: (size: number, levelIndex: number) => void;
  completedPuzzles?: Set<string>;
}

interface PuzzleLevel {
  size: number;
  index: number;
  unlocked: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSizeSelect, completedPuzzles = new Set() }) => {
  const sizes = [3, 4, 5, 6];
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  const [hoveredSize, setHoveredSize] = useState<number | null>(null);
  const [soundsEnabled, setSoundsEnabled] = useState(false);
  const [levels, setLevels] = useState<PuzzleLevel[]>([]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  useEffect(() => {
    // Initialize levels
    const initialLevels: PuzzleLevel[] = [];
    sizes.forEach(size => {
      const puzzleCount = size === 3 ? 5 : // 5 puzzles for 3x3
                         size === 4 ? 5 : // 5 puzzles for 4x4
                         2; // 2 puzzles each for 5x5 and 6x6

      for (let i = 0; i < puzzleCount; i++) {
        initialLevels.push({
          size,
          index: i,
          unlocked: i === 0 ? (
            size === 3 || // First 3x3 is always unlocked
            completedPuzzles.has(`${size-1}-${puzzleCount-1}`) // Last puzzle of previous size completed
          ) : completedPuzzles.has(`${size}-${i-1}`) // Previous puzzle of same size completed
        });
      }
    });
    setLevels(initialLevels);
  }, [completedPuzzles]);

  useEffect(() => {
    const enableSounds = () => {
      setSoundsEnabled(true);
      document.removeEventListener('click', enableSounds);
    };
    document.addEventListener('click', enableSounds);
    return () => document.removeEventListener('click', enableSounds);
  }, []);

  const handleMouseEnter = (levelId: string) => {
    setHoveredLevel(levelId);
    if (soundsEnabled) {
      playHoverSound();
    }
  };

  const handleSizeMouseEnter = (size: number) => {
    setHoveredSize(size);
    if (soundsEnabled) {
      playHoverSound();
    }
  };

  const handleClick = (level: PuzzleLevel) => {
    if (!level.unlocked) return;
    
    if (soundsEnabled) {
      playClickSound();
    }
    onSizeSelect(level.size, level.index);
  };

  const handleSizeSelect = (size: number) => {
    if (soundsEnabled) {
      playClickSound();
    }
    setSelectedSize(size);
  };

  const handleBackToSizes = () => {
    setSelectedSize(null);
  };

  const renderDifficultyStars = (size: number) => {
    const maxStars = 4;
    const difficulty = size - 2;
    const filledStars = Array(difficulty).fill('★');
    const emptyStars = Array(maxStars - difficulty).fill('☆');
    
    return (
      <div className="flex items-center justify-center gap-1 mt-2">
        {filledStars.map((star, i) => (
          <span key={`filled-${i}`} className="text-cyber-blue text-xl">
            {star}
          </span>
        ))}
        {emptyStars.map((star, i) => (
          <span key={`empty-${i}`} className="text-cyber-blue text-xl opacity-30">
            {star}
          </span>
        ))}
      </div>
    );
  };

  const renderSizeSelection = () => (
    <div className="button-grid-container">
      <div className="button-grid">
        {sizes.map(size => {
          const completedCount = levels.filter(
            level => level.size === size && completedPuzzles.has(`${level.size}-${level.index}`)
          ).length;
          const totalLevels = levels.filter(level => level.size === size).length;
          
          return (
            <button
              key={size}
              onClick={() => handleSizeSelect(size)}
              onMouseEnter={() => handleSizeMouseEnter(size)}
              onMouseLeave={() => setHoveredSize(null)}
              className={`cyber-button ${hoveredSize === size ? 'cyber-button-hover' : ''}`}
            >
              <div className="cyber-button-glitch"></div>
              <span className="cyber-button-text">{size} × {size}</span>
              <div className="cyber-button-tag">
                MATRIX SIZE
                {renderDifficultyStars(size)}
                <div className="text-sm mt-2">
                  {completedCount}/{totalLevels} Completed
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderLevels = () => {
    const sizeLevels = levels.filter(level => level.size === selectedSize);

    return (
      <div className="levels-container w-full flex justify-center">
        <div className="flex flex-col max-w-3xl w-full px-4">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBackToSizes}
              className="cyber-button-small"
            >
              ← Back to Sizes
            </button>
            <h2 className="text-cyber-blue text-2xl">
              {selectedSize}×{selectedSize} Matrix Levels
            </h2>
          </div>
          <div className="button-grid-container">
            <div className="flex flex-col gap-8">
              {sizeLevels.map((level, idx) => {
                const levelId = `${level.size}-${level.index}`;
                return (
                  <button
                    key={levelId}
                    onClick={() => handleClick(level)}
                    onMouseEnter={() => handleMouseEnter(levelId)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    className={`cyber-button ${hoveredLevel === levelId ? 'cyber-button-hover' : ''} 
                              ${!level.unlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!level.unlocked}
                  >
                    <div className="cyber-button-glitch"></div>
                    <span className="cyber-button-text">Level {idx + 1}</span>
                    <div className="cyber-button-tag">
                      {level.unlocked ? (
                        completedPuzzles.has(levelId) ? 'COMPLETED' : 'UNLOCKED'
                      ) : (
                        'LOCKED'
                      )}
                      {renderDifficultyStars(level.size)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="home-container w-screen h-screen flex flex-col items-center justify-center overflow-y-auto">
      <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-8 py-12">
        <div className="cyber-header mb-16">
          <div className="cyber-logo">
            <img src="/kenken.svg" alt="KenKen Logo" className="w-32 h-32 animate-pulse mx-auto" />
            <div className="cyber-glitch" data-text="KenKen">KenKen</div>
          </div>
          <div className="cyber-subtitle">NEURAL NETWORK PUZZLE v2.0</div>
        </div>

        <div className="cyber-text-container mb-16 w-full">
          <p className="cyber-text text-2xl text-center max-w-3xl mx-auto">
            {selectedSize === null ? (
              "Initialize your neural pathways with KenKen's advanced arithmetic matrix. Select your matrix size:"
            ) : (
              "Complete each level to unlock new challenges:"
            )}
          </p>
        </div>

        {selectedSize === null ? renderSizeSelection() : renderLevels()}

        <div className="cyber-scanner"></div>
      </div>
    </div>
  );
};

export default HomeScreen; 