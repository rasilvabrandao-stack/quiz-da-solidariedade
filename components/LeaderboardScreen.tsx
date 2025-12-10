import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, Globe, Timer } from 'lucide-react';
import { PlayerRecord } from '../types';

interface LeaderboardScreenProps {
  records: PlayerRecord[];
  onBack: () => void;
  onClear?: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ records, onBack }) => {
  
  // Lógica de ordenação: 
  // 1. Maior Pontuação
  // 2. Menor Tempo (Desempate)
  const sortedRecords = [...records].sort((a, b) => {
    // Se a pontuação for diferente, quem tem mais pontos ganha
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Se a pontuação for igual, quem fez em menos tempo ganha
    // Tratamos 0 ou null como um tempo muito alto para jogar pro final
    const timeA = a.timeTaken || 999999;
    const timeB = b.timeTaken || 999999;
    
    return timeA - timeB;
  });

  const formatTime = (seconds: number) => {
    if (!seconds || seconds > 9000) return "--"; // Registros antigos
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  return (
    <div className="flex flex-col items-center justify-start h-full w-full p-4 md:p-8 overflow-y-auto">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-3xl"
      >
        <div className="flex items-center justify-between mb-8">
            <button 
                onClick={onBack}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
            >
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3 drop-shadow-md text-center">
                <Trophy className="text-yellow-300" /> Ranking Global
            </h1>
            <div className="w-10"></div> {/* Spacer for centering */}
        </div>
        
        <p className="text-white/80 text-center mb-6 flex flex-col md:flex-row items-center justify-center gap-2 text-sm bg-white/10 p-3 rounded-xl backdrop-blur-md">
           <span className="flex items-center gap-1"><Globe size={16} /> Atualizado em tempo real</span>
           <span className="hidden md:inline text-white/40">|</span>
           <span className="flex items-center gap-1 text-yellow-200"><Timer size={16} /> Desempate: quem responde mais rápido vence!</span>
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
                                <th className="p-4 font-extrabold text-sm uppercase tracking-wider text-center w-16">Pos</th>
                                <th className="p-4 font-extrabold text-sm uppercase tracking-wider">Nome</th>
                                <th className="p-4 font-extrabold text-sm uppercase tracking-wider text-center">Tempo</th>
                                <th className="p-4 font-extrabold text-sm uppercase tracking-wider text-right">Pontos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedRecords.map((record, index) => (
                                <tr 
                                    key={record.id} 
                                    className={`
                                        border-b border-gray-50 hover:bg-orange-50/50 transition-colors
                                        ${index === 0 ? 'bg-yellow-100/50' : ''}
                                        ${index === 1 ? 'bg-gray-100/50' : ''}
                                        ${index === 2 ? 'bg-orange-100/40' : ''}
                                    `}
                                >
                                    <td className="p-4 text-center">
                                        {index === 0 && <span className="text-2xl">🥇</span>}
                                        {index === 1 && <span className="text-2xl">🥈</span>}
                                        {index === 2 && <span className="text-2xl">🥉</span>}
                                        {index > 2 && <span className="font-mono font-bold text-gray-400">#{index + 1}</span>}
                                    </td>
                                    <td className="p-4 font-bold text-gray-800 truncate max-w-[150px] md:max-w-none">
                                        {record.name}
                                    </td>
                                    <td className="p-4 text-center text-gray-500 font-mono text-sm">
                                        {formatTime(record.timeTaken)}
                                    </td>
                                    <td className="p-4 text-right font-bold text-orange-600 text-lg">
                                        {record.score}
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