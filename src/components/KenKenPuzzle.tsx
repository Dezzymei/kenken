import React, { useState, useEffect } from 'react';

interface Cage {
  cells: [number, number][];
  target: number;
  operation: '+' | '-' | '×' | '÷' | '';
}

interface KenKenPuzzleProps {
  size: number;
  levelIndex: number;
  onComplete: () => void;
  onBack: () => void;
}

const puzzleConfigurations: Record<number, Cage[][]> = {
  3: [
    // Puzzle 1 (Original)
    [
      {
        cells: [[0, 0], [1, 0]] as [number, number][],
        target: 3,
        operation: '×'
      },
      {
        cells: [[0, 1], [0, 2]] as [number, number][],
        target: 5,
        operation: '+'
      },
      {
        cells: [[1, 1], [2, 1]] as [number, number][],
        target: 3,
        operation: '×'
      },
      {
        cells: [[1, 2], [2, 2]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[2, 0]] as [number, number][],
        target: 2,
        operation: ''
      }
    ],
    // Puzzle 2 (3×3)
    [
      {
        cells: [[0, 0], [0, 1]] as [number, number][],
        target: 5,
        operation: '+'
      },
      {
        cells: [[0, 2]] as [number, number][],
        target: 1,
        operation: ''
      },
      {
        cells: [[1, 0]] as [number, number][],
        target: 3,
        operation: ''
      },
      {
        cells: [[1, 1], [1, 2]] as [number, number][],
        target: 3,
        operation: '+'
      },
      {
        cells: [[2, 0], [2, 1]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[2, 2]] as [number, number][],
        target: 2,
        operation: ''
      }
    ],
    // Puzzle 3
    [
      {
        cells: [[0, 0], [1, 0]] as [number, number][],
        target: 6,
        operation: '×'
      },
      {
        cells: [[0, 1]] as [number, number][],
        target: 1,
        operation: ''
      },
      {
        cells: [[0, 2], [1, 2]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[1, 1], [2, 1]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[2, 0], [2, 2]] as [number, number][],
        target: 4,
        operation: '+'
      }
    ],
    // Puzzle 4
    [
      {
        cells: [[0, 0], [0, 1]] as [number, number][],
        target: 3,
        operation: '+'
      },
      {
        cells: [[0, 2]] as [number, number][],
        target: 2,
        operation: ''
      },
      {
        cells: [[1, 0], [2, 0]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[1, 1], [1, 2]] as [number, number][],
        target: 4,
        operation: '+'
      },
      {
        cells: [[2, 1], [2, 2]] as [number, number][],
        target: 3,
        operation: '×'
      }
    ],
    // Puzzle 5
    [
      {
        cells: [[0, 0]] as [number, number][],
        target: 3,
        operation: ''
      },
      {
        cells: [[0, 1], [0, 2]] as [number, number][],
        target: 3,
        operation: '+'
      },
      {
        cells: [[1, 0], [2, 0]] as [number, number][],
        target: 3,
        operation: '÷'
      },
      {
        cells: [[1, 1], [1, 2]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[2, 1], [2, 2]] as [number, number][],
        target: 5,
        operation: '+'
      }
    ]
  ],
  4: [
    // Puzzle 1 (Original)
    [
      {
        cells: [[0, 0], [0, 1]] as [number, number][],
        target: 3,
        operation: '+'
      },
      {
        cells: [[0, 2], [0, 3]] as [number, number][],
        target: 4,
        operation: '×'
      },
      {
        cells: [[1, 0]] as [number, number][],
        target: 1,
        operation: ''
      },
      {
        cells: [[1, 1], [1, 2], [2, 1]] as [number, number][],
        target: 6,
        operation: '×'
      },
      {
        cells: [[1, 3], [2, 3]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[2, 0], [3, 0]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[2, 2], [3, 2], [3, 3]] as [number, number][],
        target: 3,
        operation: '+'
      },
      {
        cells: [[3, 1]] as [number, number][],
        target: 4,
        operation: ''
      }
    ],
    // Puzzle 2
    [
      {
        cells: [[0, 0], [1, 0]] as [number, number][],
        target: 7,
        operation: '+'
      },
      {
        cells: [[0, 1], [0, 2]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[0, 3]] as [number, number][],
        target: 4,
        operation: ''
      },
      {
        cells: [[1, 1], [2, 1]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[1, 2], [1, 3]] as [number, number][],
        target: 6,
        operation: '×'
      },
      {
        cells: [[2, 0], [3, 0]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[2, 2], [2, 3]] as [number, number][],
        target: 4,
        operation: '+'
      },
      {
        cells: [[3, 1], [3, 2], [3, 3]] as [number, number][],
        target: 6,
        operation: '+'
      }
    ],
    // Puzzle 3
    [
      {
        cells: [[0, 0]] as [number, number][],
        target: 1,
        operation: ''
      },
      {
        cells: [[0, 1], [0, 2], [0, 3]] as [number, number][],
        target: 9,
        operation: '+'
      },
      {
        cells: [[1, 0], [2, 0]] as [number, number][],
        target: 8,
        operation: '×'
      },
      {
        cells: [[1, 1], [1, 2]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[1, 3], [2, 3]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[2, 1]] as [number, number][],
        target: 2,
        operation: ''
      },
      {
        cells: [[2, 2], [3, 2]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[3, 0], [3, 1]] as [number, number][],
        target: 6,
        operation: '×'
      },
      {
        cells: [[3, 3]] as [number, number][],
        target: 4,
        operation: ''
      }
    ],
    // Puzzle 4
    [
      {
        cells: [[0, 0], [0, 1], [1, 0]] as [number, number][],
        target: 7,
        operation: '+'
      },
      {
        cells: [[0, 2], [0, 3]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[1, 1]] as [number, number][],
        target: 2,
        operation: ''
      },
      {
        cells: [[1, 2], [2, 2]] as [number, number][],
        target: 6,
        operation: '×'
      },
      {
        cells: [[1, 3], [2, 3]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[2, 0], [2, 1]] as [number, number][],
        target: 4,
        operation: '+'
      },
      {
        cells: [[3, 0]] as [number, number][],
        target: 3,
        operation: ''
      },
      {
        cells: [[3, 1], [3, 2], [3, 3]] as [number, number][],
        target: 9,
        operation: '+'
      }
    ],
    // Puzzle 5
    [
      {
        cells: [[0, 0], [1, 0]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[0, 1], [0, 2]] as [number, number][],
        target: 8,
        operation: '×'
      },
      {
        cells: [[0, 3], [1, 3]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[1, 1]] as [number, number][],
        target: 1,
        operation: ''
      },
      {
        cells: [[1, 2], [2, 2]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[2, 0], [2, 1]] as [number, number][],
        target: 6,
        operation: '×'
      },
      {
        cells: [[2, 3], [3, 3]] as [number, number][],
        target: 4,
        operation: '+'
      },
      {
        cells: [[3, 0], [3, 1], [3, 2]] as [number, number][],
        target: 7,
        operation: '+'
      }
    ]
  ],
  5: [
    // Puzzle 1 (Original)
    [
      {
        cells: [[0, 0], [0, 1]] as [number, number][],
        target: 5,
        operation: '+'
      },
      {
        cells: [[0, 2], [0, 3], [0, 4]] as [number, number][],
        target: 12,
        operation: '×'
      },
      {
        cells: [[1, 0], [2, 0]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[1, 1], [1, 2]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[1, 3], [1, 4]] as [number, number][],
        target: 3,
        operation: '+'
      },
      {
        cells: [[2, 1], [2, 2], [2, 3]] as [number, number][],
        target: 10,
        operation: '×'
      },
      {
        cells: [[2, 4], [3, 4]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[3, 0], [3, 1], [3, 2]] as [number, number][],
        target: 9,
        operation: '+'
      },
      {
        cells: [[3, 3], [4, 3]] as [number, number][],
        target: 4,
        operation: '×'
      },
      {
        cells: [[4, 0], [4, 1]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[4, 2]] as [number, number][],
        target: 1,
        operation: ''
      },
      {
        cells: [[4, 4]] as [number, number][],
        target: 5,
        operation: ''
      }
    ],
    // Puzzle 2
    [
      {
        cells: [[0, 0], [1, 0]] as [number, number][],
        target: 6,
        operation: '×'
      },
      {
        cells: [[0, 1], [0, 2]] as [number, number][],
        target: 5,
        operation: '+'
      },
      {
        cells: [[0, 3], [0, 4]] as [number, number][],
        target: 4,
        operation: '-'
      },
      {
        cells: [[1, 1]] as [number, number][],
        target: 5,
        operation: ''
      },
      {
        cells: [[1, 2], [1, 3], [1, 4]] as [number, number][],
        target: 10,
        operation: '+'
      },
      {
        cells: [[2, 0], [2, 1]] as [number, number][],
        target: 9,
        operation: '+'
      },
      {
        cells: [[2, 2]] as [number, number][],
        target: 2,
        operation: ''
      },
      {
        cells: [[2, 3], [2, 4]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[3, 0], [4, 0]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[3, 1], [3, 2], [3, 3]] as [number, number][],
        target: 12,
        operation: '×'
      },
      {
        cells: [[3, 4], [4, 4]] as [number, number][],
        target: 5,
        operation: '+'
      },
      {
        cells: [[4, 1], [4, 2], [4, 3]] as [number, number][],
        target: 6,
        operation: '+'
      }
    ]
  ],
  6: [
    // Puzzle 1 (Original)
    [
      {
        cells: [[0, 0], [0, 1]] as [number, number][],
        target: 11,
        operation: '+'
      },
      {
        cells: [[0, 2], [0, 3]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[0, 4], [0, 5]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[1, 0]] as [number, number][],
        target: 2,
        operation: ''
      },
      {
        cells: [[1, 1], [1, 2], [2, 1]] as [number, number][],
        target: 6,
        operation: '×'
      },
      {
        cells: [[1, 3], [1, 4], [1, 5]] as [number, number][],
        target: 12,
        operation: '×'
      },
      {
        cells: [[2, 0], [3, 0]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[2, 2], [2, 3]] as [number, number][],
        target: 5,
        operation: '+'
      },
      {
        cells: [[2, 4], [2, 5]] as [number, number][],
        target: 3,
        operation: '÷'
      },
      {
        cells: [[3, 1], [3, 2]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[3, 3], [3, 4], [3, 5]] as [number, number][],
        target: 8,
        operation: '+'
      },
      {
        cells: [[4, 0], [4, 1], [5, 0]] as [number, number][],
        target: 7,
        operation: '+'
      },
      {
        cells: [[4, 2], [4, 3]] as [number, number][],
        target: 3,
        operation: '÷'
      },
      {
        cells: [[4, 4], [4, 5]] as [number, number][],
        target: 2,
        operation: '-'
      },
      {
        cells: [[5, 1], [5, 2]] as [number, number][],
        target: 3,
        operation: '×'
      },
      {
        cells: [[5, 3], [5, 4], [5, 5]] as [number, number][],
        target: 6,
        operation: '+'
      }
    ],
    // Puzzle 2
    [
      {
        cells: [[0, 0], [0, 1], [1, 0]] as [number, number][],
        target: 11,
        operation: '+'
      },
      {
        cells: [[0, 2], [0, 3]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[0, 4], [0, 5]] as [number, number][],
        target: 4,
        operation: '-'
      },
      {
        cells: [[1, 1], [1, 2]] as [number, number][],
        target: 7,
        operation: '+'
      },
      {
        cells: [[1, 3], [1, 4], [1, 5]] as [number, number][],
        target: 9,
        operation: '+'
      },
      {
        cells: [[2, 0], [2, 1]] as [number, number][],
        target: 8,
        operation: '×'
      },
      {
        cells: [[2, 2], [2, 3]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[2, 4], [2, 5]] as [number, number][],
        target: 2,
        operation: '÷'
      },
      {
        cells: [[3, 0], [3, 1]] as [number, number][],
        target: 5,
        operation: '+'
      },
      {
        cells: [[3, 2], [4, 2]] as [number, number][],
        target: 4,
        operation: '×'
      },
      {
        cells: [[3, 3], [3, 4], [3, 5]] as [number, number][],
        target: 10,
        operation: '+'
      },
      {
        cells: [[4, 0], [4, 1]] as [number, number][],
        target: 3,
        operation: '-'
      },
      {
        cells: [[4, 3]] as [number, number][],
        target: 6,
        operation: ''
      },
      {
        cells: [[4, 4], [4, 5], [5, 4]] as [number, number][],
        target: 7,
        operation: '+'
      },
      {
        cells: [[5, 0], [5, 1], [5, 2]] as [number, number][],
        target: 6,
        operation: '+'
      },
      {
        cells: [[5, 3], [5, 5]] as [number, number][],
        target: 5,
        operation: '+'
      }
    ]
  ]
};

const generateCages = (size: number, levelIndex: number): Cage[] => {
  const puzzleSet = puzzleConfigurations[size];
  if (!puzzleSet || levelIndex >= puzzleSet.length) return [];
  return puzzleSet[levelIndex];
};

const KenKenPuzzle: React.FC<KenKenPuzzleProps> = ({ 
  size = 4, 
  levelIndex, 
  onComplete,
  onBack 
}) => {
  const [grid, setGrid] = useState<number[][]>(Array(size).fill(0).map(() => Array(size).fill(0)));
  const [cages, setCages] = useState<Cage[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    // Reset grid and cages when size or level changes
    setGrid(Array(size).fill(0).map(() => Array(size).fill(0)));
    setCages(generateCages(size, levelIndex));
    setShowCompletion(false);
  }, [size, levelIndex]);

  const handleCellChange = (row: number, col: number, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value);
    if (numValue >= 0 && numValue <= size) {
      const newGrid = [...grid];
      newGrid[row][col] = numValue;
      setGrid(newGrid);
      
      // Check completion after each valid move
      if (isPuzzleComplete()) {
        setShowCompletion(true);
        onComplete();
      }
    }
  };

  const validateCage = (cage: Cage): boolean => {
    const values = cage.cells.map(([row, col]) => grid[row][col]);
    if (values.includes(0)) return false;

    switch (cage.operation) {
      case '+':
        return values.reduce((a, b) => a + b) === cage.target;
      case '-':
        return Math.abs(values[0] - values[1]) === cage.target;
      case '×':
        return values.reduce((a, b) => a * b) === cage.target;
      case '÷':
        return (values[0] / values[1] === cage.target) || (values[1] / values[0] === cage.target);
      default:
        // For single cell cages (no operation)
        return values[0] === cage.target;
    }
  };

  const validateRow = (row: number): boolean => {
    const numbers = grid[row].filter(n => n !== 0);
    // Check if we have all numbers from 1 to size
    return numbers.length === size && new Set(numbers).size === size &&
           numbers.every(n => n >= 1 && n <= size);
  };

  const validateColumn = (col: number): boolean => {
    const numbers = grid.map(row => row[col]).filter(n => n !== 0);
    // Check if we have all numbers from 1 to size
    return numbers.length === size && new Set(numbers).size === size &&
           numbers.every(n => n >= 1 && n <= size);
  };

  const isPuzzleComplete = (): boolean => {
    // Check if all cells are filled with valid numbers
    if (grid.some(row => row.some(cell => cell < 1 || cell > size))) return false;

    // Check rows and columns
    for (let i = 0; i < size; i++) {
      if (!validateRow(i) || !validateColumn(i)) return false;
    }

    // Check all cages
    return cages.every(validateCage);
  };

  const shouldHaveRightBorder = (rowIndex: number, colIndex: number): boolean => {
    if (colIndex === size - 1) return false;
    const currentCage = cages.find(c => c.cells.some(([r, c]) => r === rowIndex && c === colIndex));
    const rightCage = cages.find(c => c.cells.some(([r, c]) => r === rowIndex && c === colIndex + 1));
    return currentCage !== rightCage;
  };

  const shouldHaveBottomBorder = (rowIndex: number, colIndex: number): boolean => {
    if (rowIndex === size - 1) return false;
    const currentCage = cages.find(c => c.cells.some(([r, c]) => r === rowIndex && c === colIndex));
    const bottomCage = cages.find(c => c.cells.some(([r, c]) => r === rowIndex + 1 && c === colIndex));
    return currentCage !== bottomCage;
  };

  return (
    <div className="puzzle-container">
      <div className="flex items-center justify-between gap-3 mb-12">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="cyber-button-small"
          >
            ← Back
          </button>
          <img src="/kenken/kenken.svg" alt="KenKen Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            {size} × {size} Level {levelIndex + 1}
          </h1>
        </div>
      </div>
      <div className={`kenken-grid size-${size}`}>
        {Array.from({ length: size * size }).map((_, index) => {
          const rowIndex = Math.floor(index / size);
          const colIndex = index % size;
          const cell = grid[rowIndex][colIndex];
          
          const cage = cages.find(c => 
            c.cells.some(([r, c]) => r === rowIndex && c === colIndex)
          );
          const isFirstInCage = cage && 
            cage.cells[0][0] === rowIndex && 
            cage.cells[0][1] === colIndex;

          const cellClasses = [
            'kenken-cell',
            shouldHaveRightBorder(rowIndex, colIndex) ? 'cage-border-right' : '',
            shouldHaveBottomBorder(rowIndex, colIndex) ? 'cage-border-bottom' : '',
          ].filter(Boolean).join(' ');

          return (
            <div key={`${rowIndex}-${colIndex}`} className={cellClasses}>
              {isFirstInCage && (
                <div className="kenken-cage-label">
                  {cage.target}{cage.cells.length === 1 ? '' : cage.operation}
                </div>
              )}
              <input
                type="number"
                min="1"
                max={size}
                value={cell || ''}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                className="kenken-input"
              />
            </div>
          );
        })}
      </div>
      {showCompletion && (
        <div className="completion-message">
          🎉 Congratulations! You've solved the puzzle!
        </div>
      )}
    </div>
  );
};

export default KenKenPuzzle; 