import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, Trash2 } from 'lucide-react';
import { PlayerRecord } from '../types';

interface LeaderboardScreenProps {
  records: PlayerRecord[];
  onBack: () => void;
  onClear: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ records, onBack, onClear }) => {
  // Sort records by score (descending), then by date (newest first)
  const sortedRecords = [...records].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
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
            <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3 drop-shadow-md">
                <Trophy className="text-yellow-300" /> Mural da Fama
            </h1>
            <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[50vh]">
            {sortedRecords.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <Trophy size={48} className="mb-4 opacity-20" />
                    <p className="text-lg">Nenhum registro ainda.</p>
                    <p className="text-sm">Seja o primeiro a jogar!</p>
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

        <div className="mt-8 flex justify-center">
            {sortedRecords.length > 0 && (
                <button 
                    onClick={() => {
                        if(window.confirm('Tem certeza que deseja apagar todo o histórico?')) {
                            onClear();
                        }
                    }}
                    className="text-white/50 hover:text-white text-sm flex items-center gap-2 transition-colors"
                >
                    <Trash2 size={14} /> Limpar Histórico
                </button>
            )}
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderboardScreen;