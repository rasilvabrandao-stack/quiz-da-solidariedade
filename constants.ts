import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "O que é mais importante verificar antes de doar alimentos?",
    options: [
      "Se a embalagem é bonita",
      "A data de validade",
      "Se é de uma marca famosa",
      "Se eu gosto do sabor"
    ],
    correctAnswer: 1,
    explanation: "Segurança em primeiro lugar! Nunca doe alimentos vencidos."
  },
  {
    id: 2,
    text: "Doar roupas rasgadas ou sujas é uma boa atitude?",
    options: [
      "Sim, qualquer ajuda serve",
      "Sim, quem recebe dá um jeito",
      "Não, doação não é descarte de lixo",
      "Depende da marca da roupa"
    ],
    correctAnswer: 2,
    explanation: "Doação é um ato de carinho. As roupas devem estar limpas e em bom estado."
  },
  {
    id: 3,
    text: "Qual destas NÃO é uma forma de doação?",
    options: [
      "Doar tempo (voluntariado)",
      "Doar sangue",
      "Emprestar dinheiro com juros",
      "Doar conhecimentos e aulas"
    ],
    correctAnswer: 2,
    explanation: "Emprestar visando lucro não é doação. Doação é um ato gratuito e solidário."
  },
  {
    id: 4,
    text: "Quem ganha quando fazemos uma doação?",
    options: [
      "Apenas quem recebe",
      "Apenas a escola",
      "Ninguém ganha nada",
      "Quem recebe e quem doa"
    ],
    correctAnswer: 3,
    explanation: "A solidariedade faz bem para a comunidade e traz felicidade para quem pratica!"
  },
  {
    id: 5,
    text: "O que significa 'doação recorrente'?",
    options: [
      "Doar correndo",
      "Doar apenas uma vez na vida",
      "Contribuir regularmente (todo mês)",
      "Doar coisas quebradas"
    ],
    correctAnswer: 2,
    explanation: "A ajuda contínua permite que projetos sociais se planejem e ajudem mais pessoas."
  },
  {
    id: 6,
    text: "Posso doar brinquedos usados?",
    options: [
      "Sim, se estiverem em bom estado",
      "Não, só brinquedos novos",
      "Sim, mesmo quebrados",
      "Só se forem eletrônicos"
    ],
    correctAnswer: 0,
    explanation: "Brinquedos usados em bom estado levam alegria para muitas crianças!"
  },
  {
    id: 7,
    text: "Qual a melhor atitude ao ver uma campanha de doação na escola?",
    options: [
      "Ignorar e passar reto",
      "Criticar o cartaz",
      "Participar e convidar amigos",
      "Esperar alguém pedir diretamente"
    ],
    correctAnswer: 2,
    explanation: "Engajar e divulgar multiplica o impacto da solidariedade."
  },
  {
    id: 8,
    text: "Verdadeiro ou Falso: Doar sangue pode salvar até 4 vidas.",
    options: [
      "Falso, salva apenas 1",
      "Verdadeiro",
      "Falso, sangue não se doa",
      "Depende do tipo sanguíneo"
    ],
    correctAnswer: 1,
    explanation: "Uma única bolsa de sangue pode ser separada em componentes e salvar várias vidas."
  },
  {
    id: 9,
    text: "Se eu não tenho dinheiro, como posso ajudar?",
    options: [
      "Não posso ajudar em nada",
      "Posso doar meu tempo e habilidades",
      "Devo pedir dinheiro emprestado",
      "Só ricos podem fazer caridade"
    ],
    correctAnswer: 1,
    explanation: "O voluntariado e a divulgação de causas são formas valiosas e poderosas de doação!"
  },
  {
    id: 10,
    text: "Em uma campanha de alimentos 'não perecíveis', o que NÃO devo levar?",
    options: [
      "Arroz e Feijão",
      "Macarrão",
      "Sorvete e Iogurte",
      "Óleo e Açúcar"
    ],
    correctAnswer: 2,
    explanation: "Alimentos perecíveis (como sorvete) estragam rápido fora da geladeira e não servem para essas campanhas."
  }
];

export const COLORS = {
  primary: 'bg-orange-500',
  secondary: 'bg-amber-900',
  accent: 'bg-yellow-400',
  white: 'bg-white',
  gradient: 'bg-gradient-to-br from-orange-400 via-orange-500 to-amber-700'
};