import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// AVISO: Você precisa pegar as chaves restantes no Console do Firebase:
// 1. Clique na Engrenagem ⚙️ -> Configurações do Projeto.
// 2. Role até o final em "Seus aplicativos" (se não tiver, crie um clicando no ícone </>).
// 3. Copie as chaves que faltam abaixo.

const firebaseConfig = {
  // --- PREENCHA ESTES 3 CAMPOS COM O QUE ESTÁ NO SITE DO FIREBASE ---
  apiKey: "SUA_API_KEY_AQUI",            // <--- Copie do Firebase e cole aqui
  messagingSenderId: "SEU_SENDER_ID",    // <--- Copie do Firebase e cole aqui
  appId: "SEU_APP_ID",                   // <--- Copie do Firebase e cole aqui

  // --- JÁ PREENCHI ESTES COM BASE NO SEU LINK ---
  databaseURL: "https://quiz-solidariedade-4ffd9-default-rtdb.firebaseio.com",
  projectId: "quiz-solidariedade-4ffd9",
  authDomain: "quiz-solidariedade-4ffd9.firebaseapp.com",
  storageBucket: "quiz-solidariedade-4ffd9.appspot.com",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Realtime Database
export const db = getDatabase(app);