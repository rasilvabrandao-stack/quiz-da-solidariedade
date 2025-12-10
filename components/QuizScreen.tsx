import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, HelpCircle, Loader2 } from 'lucide-react';
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
  const timerRef = useRef<any>(null);
  const feedbackRef = useRef<HTMLDivElement>(null); // Ref para a área de feedback

  // Lógica do avanço automático
  useEffect(() => {
    if (isAnswered) {
      // 1. Rola a tela automaticamente para mostrar a resposta
      // Um pequeno delay garante que o elemento já foi renderizado pelo React/Framer Motion
      setTimeout(() => {
        if (feedbackRef.current) {
          feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 100);

      // 2. Espera 5 segundos (aumentado de 3s) para ler a explicação e avança
      timerRef.current = setTimeout(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isAnswered]);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return; // Impede clicar duas vezes
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const isCorrect = selectedOption === question.correctAnswer;
    
    // Pequeno delay para animação
    setTimeout(() => {
        onAnswer(isCorrect);
        setSelectedOption(null);
        setIsAnswered(false);
    }, 200);
  };

  // Estilização dos botões
  const getOptionClass = (index: number) => {
    const baseClass =
      "w-full p-4 md:p-5 text-left rounded-2xl border-2 transition-all duration-300 text-lg md:text-xl font-semibold relative overflow-hidden";
    
    // Estado inicial (não respondido)
    if (!isAnswered) {
      return `${baseClass} bg-white/90 border-transparent text-amber-900 hover:bg-white hover:scale-[1.02] hover:shadow-lg cursor-pointer`;
    }

    // Se for a correta (sempre mostra a correta em verde no final)
    if (index === question.correctAnswer) {
      return `${baseClass} bg-green-500 border-green-600 text-white shadow-lg scale-[1.02]`;
    }

    // Se selecionou errado (mostra em vermelho)
    if (index === selectedOption && index !== question.correctAnswer) {
      return `${baseClass} bg-red-500 border-red-600 text-white opacity-90`;
    }

    // As outras opções ficam transparentes
    return `${baseClass} bg-white/40 border-transparent text-gray-500 opacity-50 cursor-not-allowed`;
  };

  return (
    // 'overflow-y-auto' permite rolar a tela se a explicação for grande
    // 'pb-32' adiciona um espaço extra no final para nada ficar cortado
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col h-full overflow-y-auto justify-start md:justify-center pt-6 pb-32 scroll-smooth">
      
      {/* Barra de Progresso */}
      <div className="w-full bg-black/20 h-3 rounded-full mb-6 overflow-hidden backdrop-blur-sm shrink-0">
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
          {/* Fundo decorativo */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100 rounded-full opacity-50 z-0" />

          {/* Cabeçalho da Pergunta */}
          <div className="relative z-10 mb-6">
            <div className="flex justify-between items-center mb-3">
                <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold tracking-wide">
                PERGUNTA {currentQuestionIndex + 1} / {totalQuestions}
                </span>
                {/* Timer Visual apenas para mostrar que NÃO tem pressa antes de responder */}
                {!isAnswered && (
                    <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">
                        Sem tempo limite
                    </span>
                )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              {question.text}
            </h2>
          </div>

          {/* Lista de Alternativas */}
          <div className="relative z-10 grid grid-cols-1 gap-3">
            {question.options.map((option, index) => {
              const letter = String.fromCharCode(65 + index); // A, B, C, D
              
              return (
                <motion.button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={getOptionClass(index)}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  disabled={isAnswered}
                >
                  <div className="flex items-center justify-between w-full gap-2">
                      <div className="flex items-center gap-3 text-left">
                          <span className={`font-black text-xl w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                              !isAnswered 
                                ? 'border-orange-200 text-orange-600 bg-orange-50' 
                                : 'border-white/30 text-inherit bg-transparent'
                          }`}>
                            {letter}
                          </span>
                          <span className="leading-snug flex-1">{option}</span>
                      </div>
                      
                      {/* Ícones de Feedback */}
                      <div className="shrink-0">
                        {isAnswered && index === question.correctAnswer && <CheckCircle className="w-6 h-6" />}
                        {isAnswered && index === selectedOption && index !== question.correctAnswer && <XCircle className="w-6 h-6" />}
                      </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Área de Explicação / Feedback */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                ref={feedbackRef} // Referência para scroll automático
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 overflow-hidden border-t border-gray-100 pt-6"
              >
                <div className={`p-4 rounded-xl flex items-start gap-4 ${
                  selectedOption === question.correctAnswer ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'
                }`}>
                    <div className="mt-1 shrink-0">
                         <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-bold text-lg mb-1">
                            {selectedOption === question.correctAnswer ? 'Resposta Certa!' : 'Ops!'}
                        </p>
                        <p className="text-base leading-relaxed opacity-90">
                            {question.explanation}
                        </p>
                    </div>
                </div>
                
                {/* Barra de progresso do avanço automático */}
                <div className="mt-6 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Avançando automaticamente...
                    </div>
                    <motion.div 
                        className="h-1 bg-gray-200 w-full rounded-full overflow-hidden"
                    >
                        <motion.div 
                            className="h-full bg-orange-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5, ease: "linear" }} // Tempo ajustado para 5s
                        />
                    </motion.div>
                    
                    <button
                        onClick={handleNext}
                        className="mt-2 text-orange-600 text-sm font-bold hover:underline"
                    >
                        Ir agora <ArrowRight className="inline w-4 h-4" />
                    </button>
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