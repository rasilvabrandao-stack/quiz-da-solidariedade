import React, { useState } from 'react';
import { QUESTIONS } from './constants';
import { GameState } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

// Main Gradient Background style is applied here
const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState('playing');
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < QUESTIONS.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setGameState('results');
    }
  };

  const restartGame = () => {
    setGameState('welcome');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-500 via-orange-400 to-amber-700 text-gray-800 font-sans overflow-hidden relative">
      
      {/* Background Decorative Pattern (Subtle) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {gameState === 'welcome' && (
          <WelcomeScreen onStart={startGame} />
        )}

        {gameState === 'playing' && (
          <QuizScreen
            question={QUESTIONS[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={QUESTIONS.length}
            onAnswer={handleAnswer}
          />
        )}

        {gameState === 'results' && (
          <ResultScreen
            score={score}
            totalQuestions={QUESTIONS.length}
            onRestart={restartGame}
          />
        )}
      </div>
    </div>
  );
};

export default App;