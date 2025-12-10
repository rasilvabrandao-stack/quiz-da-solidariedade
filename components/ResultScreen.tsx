import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Star, Trophy, Heart } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Dynamic feedback message
  const getFeedback = () => {
    if (percentage === 100) return { title: "Incrível!", text: "Você é um mestre da solidariedade!", icon: Trophy };
    if (percentage >= 70) return { title: "Parabéns!", text: "Você sabe muito sobre como ajudar o próximo.", icon: Star };
    if (percentage >= 40) return { title: "Bom começo!", text: "Continue aprendendo sobre a importância de doar.", icon: Heart };
    return { title: "Obrigado por jogar!", text: "O importante é participar e aprender!", icon: Heart };
  };

  const feedback = getFeedback();
  const Icon = feedback.icon;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full relative"
      >
        {/* Score Badge */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="bg-yellow-400 p-6 rounded-full border-4 border-white shadow-xl"
            >
                <Icon size={48} className="text-amber-900" />
            </motion.div>
        </div>

        <div className="mt-8 space-y-4">
            <h2 className="text-4xl font-extrabold text-amber-900">{feedback.title}</h2>
            
            <div className="py-6">
                <div className="text-6xl font-black text-orange-500 mb-2">
                    {percentage}%
                </div>
                <p className="text-gray-500 font-medium">
                    Você acertou {score} de {totalQuestions} perguntas
                </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed border-t border-gray-100 pt-6">
                {feedback.text}
            </p>
        </div>

        <div className="mt-8">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRestart}
                className="w-full bg-amber-900 text-white py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 hover:bg-amber-800 transition-colors"
            >
                <RefreshCcw size={22} /> Jogar Novamente
            </motion.button>
        </div>
      </motion.div>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-white/80 text-center max-w-md"
      >
        <p className="text-sm">Obrigado por visitar nossa exposição!</p>
        <p className="font-bold mt-1">Sua doação faz a diferença.</p>
      </motion.footer>
    </div>
  );
};

export default ResultScreen;