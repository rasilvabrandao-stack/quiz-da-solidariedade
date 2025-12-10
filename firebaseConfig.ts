import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Configuração do Firebase com as chaves do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyCzFTF-TcuC7jCyNTmZQflwjQ1y1aI30GY",
  authDomain: "quiz-solidariedade-4ffd9.firebaseapp.com",
  databaseURL: "https://quiz-solidariedade-4ffd9-default-rtdb.firebaseio.com",
  projectId: "quiz-solidariedade-4ffd9",
  storageBucket: "quiz-solidariedade-4ffd9.firebasestorage.app",
  messagingSenderId: "50046767800",
  appId: "1:50046767800:web:73c131b04f743546825a4d",
  measurementId: "G-8RJJCJYQPF"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Realtime Database
export const db = getDatabase(app);