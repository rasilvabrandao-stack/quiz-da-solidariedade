import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { GameState, PlayerRecord } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import NameInputScreen from './components/NameInputScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import LeaderboardScreen from './components/LeaderboardScreen';

const STORAGE_KEY = 'quiz_solidariedade_db';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [records, setRecords] = useState<PlayerRecord[]>([]);

  // Load records from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse records", e);
      }
    }
  }, []);

  const goToNameInput = () => {
    setGameState('inputName');
  };

  const startGame = (name: string) => {
    setPlayerName(name);
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState('playing');
  };

  const handleAnswer = (isCorrect: boolean) => {
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < QUESTIONS.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      finishGame(newScore);
    }
  };

  const finishGame = (finalScore: number) => {
    // Save to "Database" (LocalStorage)
    const newRecord: PlayerRecord = {
      id: Date.now().toString(),
      name: playerName,
      score: finalScore,
      totalQuestions: QUESTIONS.length,
      date: new Date().toISOString()
    };

    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    
    setGameState('results');
  };

  const restartGame = () => {
    setGameState('welcome');
    setPlayerName('');
  };

  const clearRecords = () => {
    setRecords([]);
    localStorage.removeItem(STORAGE_KEY);
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
          <WelcomeScreen 
            onStart={goToNameInput} 
            onViewLeaderboard={() => setGameState('leaderboard')}
          />
        )}

        {gameState === 'inputName' && (
          <NameInputScreen 
            onNameSubmit={startGame} 
            onBack={() => setGameState('welcome')}
          />
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
            playerName={playerName}
            onRestart={restartGame}
            onViewLeaderboard={() => setGameState('leaderboard')}
          />
        )}

        {gameState === 'leaderboard' && (
          <LeaderboardScreen 
            records={records}
            onBack={() => setGameState('welcome')}
            onClear={clearRecords}
          />
        )}
      </div>
    </div>
  );
};

export default App;