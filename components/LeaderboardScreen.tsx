import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, Globe } from 'lucide-react';
import { PlayerRecord } from '../types';

interface LeaderboardScreenProps {
  records: PlayerRecord[];
  onBack: () => void;
  onClear?: () => void; // Tornando opcional e removendo o uso
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ records, onBack }) => {
  // A ordenação já vem do Firebase, mas mantemos aqui por segurança visual
  const sortedRecords = [...records].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Se empatar na pontuação, o mais recente (data maior) pode ficar em cima ou embaixo.
    // Geralmente em rankings, quem chegou primeiro fica na frente, ou usamos a data.
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="flex flex-col items-center justify-start h-full w-full p-4 md:p-8 overflow-y-auto">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="flex items-center justify-between mb-8">
            <button 
                onClick={onBack}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
            >
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3 drop-shadow-md text-center">
                <Trophy className="text-yellow-300" /> Mural Global
            </h1>
            <div className="w-10"></div> {/* Spacer for centering */}
        </div>
        
        <p className="text-white/70 text-center mb-4 flex items-center justify-center gap-2">
           <Globe size={16} /> Atualizado em tempo real
        </p>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[50vh]">
            {sortedRecords.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <Trophy size={48} className="mb-4 opacity-20" />
                    <p className="text-lg">Carregando placar global...</p>
                    <p className="text-sm">Se demorar, verifique a conexão.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50 border-b border-orange-100 text-amber-900">
                                <th className="p-4 font-extrabold text-sm uppercase tracking-wider">#</th>
                                <th className="p-4 font-extrabold text-sm uppercase tracking-wider">Nome</th>
                                <th className="p-4 font-extrabold text-sm uppercase tracking-wider text-right">Pontos</th>
                                <th className="p-4 font-extrabold text-sm uppercase tracking-wider text-right hidden md:table-cell">Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedRecords.map((record, index) => (
                                <tr 
                                    key={record.id} 
                                    className={`
                                        border-b border-gray-50 hover:bg-orange-50/50 transition-colors
                                        ${index === 0 ? 'bg-yellow-50/80' : ''}
                                        ${index === 1 ? 'bg-gray-50/80' : ''}
                                        ${index === 2 ? 'bg-orange-50/50' : ''}
                                    `}
                                >
                                    <td className="p-4 text-gray-500 font-mono font-bold">
                                        {index + 1}
                                        {index === 0 && <span className="ml-2">👑</span>}
                                    </td>
                                    <td className="p-4 font-bold text-gray-800 truncate max-w-[150px] md:max-w-none">
                                        {record.name}
                                    </td>
                                    <td className="p-4 text-right font-bold text-orange-600">
                                        {record.score} <span className="text-gray-400 text-xs font-normal">/ {record.totalQuestions}</span>
                                    </td>
                                    <td className="p-4 text-right text-gray-400 text-sm hidden md:table-cell">
                                        {new Date(record.date).toLocaleDateString('pt-BR')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderboardScreen;