import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center p-6">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="bg-white p-6 rounded-full shadow-2xl mb-8"
      >
        <HeartHandshake size={80} className="text-orange-500" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-md"
      >
        Quiz da <br/>
        <span className="text-yellow-300">Solidariedade</span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl md:text-2xl text-white/90 max-w-lg mb-12 leading-relaxed font-light"
      >
        Teste seus conhecimentos sobre doação e descubra como você pode transformar o mundo ao seu redor!
      </motion.p>

      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group bg-white text-orange-600 px-10 py-5 rounded-full text-2xl font-bold shadow-xl hover:shadow-2xl flex items-center gap-3 transition-all"
      >
        Começar Agora
        <Play className="w-6 h-6 fill-current group-hover:translate-x-1 transition-transform" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 text-white/60 text-sm"
      >
        Projeto de Exposição Escolar
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;