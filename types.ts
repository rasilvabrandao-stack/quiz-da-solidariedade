export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export type GameState = 'welcome' | 'inputName' | 'playing' | 'results' | 'leaderboard';

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answersHistory: boolean[]; // tracks if each question was answered correctly
}

export interface PlayerRecord {
  id: string;
  name: string;
  score: number;
  totalQuestions: number;
  date: string;
}