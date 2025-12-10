import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ArrowRight } from 'lucide-react';

interface NameInputScreenProps {
  onNameSubmit: (name: string) => void;
  onBack: () => void;
}

const NameInputScreen: React.FC<NameInputScreenProps> = ({ onNameSubmit, onBack }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full relative"
      >
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 text-gray-400 hover:text-amber-900 font-bold text-sm"
        >
          Voltar
        </button>

        <div className="text-center mb-8">
          <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
            <User size={40} />
          </div>
          <h2 className="text-3xl font-bold text-amber-900">Identifique-se</h2>
          <p className="text-gray-500 mt-2">Digite seu nome para registrar sua pontuação no nosso mural.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
              Seu Nome ou Apelido
            </label>
            <input
              type="text"
              id="playerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 outline-none transition-all text-lg text-gray-800 placeholder-gray-300"
              placeholder="Ex: Maria Silva"
              autoFocus
              required
              maxLength={20}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Começar o Jogo <ArrowRight size={22} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default NameInputScreen;