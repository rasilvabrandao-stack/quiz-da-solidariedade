export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export type GameState = 'welcome' | 'playing' | 'results';

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answersHistory: boolean[]; // tracks if each question was answered correctly
}