import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// AVISO: Você precisa criar um projeto no Firebase (https://console.firebase.google.com)
// 1. Crie um novo projeto.
// 2. Vá em "Criação" -> "Firestore Database" e crie um banco de dados.
// 3. Nas regras do Firestore, mude para: allow read, write: if true; (apenas para este projeto escolar).
// 4. Vá nas configurações do projeto, adicione um app Web e copie as configurações abaixo.

const firebaseConfig = {
  // Substitua as strings vazias abaixo pelas chaves que o Firebase te der
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJECT_ID.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore (Banco de dados)
export const db = getFirestore(app);