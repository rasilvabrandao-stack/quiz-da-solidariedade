import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, HelpCircle, Timer } from 'lucide-react';
import { Question } from '../types';

interface QuizScreenProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const timerRef = useRef<any>(null); // Ref para guardar o timer do avanço automático

  // Efeito para avanço automático
  useEffect(() => {
    if (isAnswered) {
      // Espera 3.5 segundos e avança automaticamente
      timerRef.current = setTimeout(() => {
        handleNext();
      }, 3500);
    }

    // Limpa o timer se o componente desmontar ou mudar
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isAnswered]);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const handleNext = () => {
    // Se o usuário clicar no botão, cancelamos o timer automático para não pular 2x
    if (timerRef.current) clearTimeout(timerRef.current);

    if (selectedOption === null) return;
    const isCorrect = selectedOption === question.correctAnswer;
    
    // Pequeno delay visual para a animação de saída
    setTimeout(() => {
        onAnswer(isCorrect);
        setSelectedOption(null);
        setIsAnswered(false);
    }, 200);
  };

  const getOptionClass = (index: number) => {
    const baseClass =
      "w-full p-4 md:p-5 text-left rounded-2xl border-2 transition-all duration-300 text-lg md:text-xl font-semibold relative overflow-hidden";
    
    if (!isAnswered) {
      return `${baseClass} bg-white/90 border-transparent text-amber-900 hover:bg-white hover:scale-[1.02] hover:shadow-lg cursor-pointer`;
    }

    if (index === question.correctAnswer) {
      return `${baseClass} bg-green-500 border-green-600 text-white shadow-lg scale-[1.02]`;
    }

    if (index === selectedOption && index !== question.correctAnswer) {
      return `${baseClass} bg-red-500 border-red-600 text-white opacity-80`;
    }

    return `${baseClass} bg-white/50 border-transparent text-gray-500 opacity-50 cursor-not-allowed`;
  };

  return (
    // Alterado: h-full mantido, mas overflow-y-auto adicionado e justify ajustado para mobile
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col h-full overflow-y-auto justify-start md:justify-center pt-8 pb-20 scroll-smooth">
      {/* Progress Bar */}
      <div className="w-full bg-black/20 h-3 rounded-full mb-6 md:mb-8 overflow-hidden backdrop-blur-sm shrink-0">
        <motion.div
          className="h-full bg-yellow-400"
          initial={{ width: `${((currentQuestionIndex) / totalQuestions) * 100}%` }}
          animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 relative overflow-hidden shrink-0"
        >
          {/* Decorative background circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100 rounded-full opacity-50 z-0" />

          {/* Question Header */}
          <div className="relative z-10 mb-6 md:mb-8">
            <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold tracking-wide mb-3">
              PERGUNTA {currentQuestionIndex + 1} DE {totalQuestions}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              {question.text}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {question.options.map((option, index) => {
              // Generate a) b) c) d)
              const letter = String.fromCharCode(97 + index); 
              
              return (
                <motion.button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={getOptionClass(index)}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-between w-full gap-2">
                      <div className="flex items-center gap-3 text-left">
                          <span className={`font-black text-xl uppercase opacity-70 ${!isAnswered ? 'text-orange-600' : 'text-inherit'}`}>
                            {letter})
                          </span>
                          <span className="leading-snug">{option}</span>
                      </div>
                      
                      {/* Icons */}
                      <div className="shrink-0">
                        {isAnswered && index === question.correctAnswer && <CheckCircle className="w-6 h-6" />}
                        {isAnswered && index === selectedOption && index !== question.correctAnswer && <XCircle className="w-6 h-6" />}
                      </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback Section */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 overflow-hidden"
              >
                <div className={`p-4 rounded-xl flex items-start gap-4 ${
                  selectedOption === question.correctAnswer ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'
                }`}>
                    <div className="mt-1">
                         <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-bold mb-1">
                            {selectedOption === question.correctAnswer ? 'Muito bem!' : 'Ops, não foi dessa vez!'}
                        </p>
                        <p className="text-sm md:text-base leading-relaxed">
                            {question.explanation}
                        </p>
                    </div>
                </div>
                
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-400 flex items-center gap-2 animate-pulse">
                        <Timer size={16} /> Próxima em 3 segundos...
                    </div>
                    <motion.button
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={handleNext}
                        className="w-full md:w-auto bg-amber-900 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-amber-800 flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                        Próxima Agora <ArrowRight size={20} />
                    </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizScreen;