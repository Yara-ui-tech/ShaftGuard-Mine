
import { ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import type { RiskStatus } from '../types';

interface RiskCardProps {
  score: number;
  status: RiskStatus;
}

export default function RiskCard({ score, status }: RiskCardProps) {
  const getRiskColor = () => {
    if (score < 30) return 'text-emerald-500';
    if (score < 50) return 'text-amber-500';
    if (score < 75) return 'text-orange-500';
    return 'text-red-500';
  };

  const getRiskBg = () => {
    if (score < 30) return 'from-emerald-900/40 to-transparent';
    if (score < 50) return 'from-amber-900/40 to-transparent';
    if (score < 75) return 'from-orange-900/40 to-transparent';
    return 'from-red-900/40 to-transparent';
  };
  
  const getIcon = () => {
    if (score < 30) return ShieldCheck;
    if (score < 75) return AlertTriangle;
    return AlertCircle;
  };

  const Icon = getIcon();

  return (
    <div className={`glass-panel p-6 relative overflow-hidden bg-gradient-to-br ${getRiskBg()} border-l-4 ${score < 30 ? 'border-l-emerald-500' : score < 50 ? 'border-l-amber-500' : score < 75 ? 'border-l-orange-500' : 'border-l-red-500'}`}>
      <div className="absolute top-4 right-4">
        <Icon className={`w-12 h-12 opacity-20 ${getRiskColor()}`} />
      </div>
      
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Risk</h3>
      <div className="flex items-end mb-2">
        <span className={`text-5xl font-black ${getRiskColor()}`}>{score}</span>
        <span className="text-xl text-slate-500 font-bold ml-1 mb-1">/ 100</span>
      </div>
      
      <div className="mt-4 inline-flex items-center px-3 py-1.5 rounded-md bg-surface/50 border border-border">
        <span className="text-xs text-slate-400 mr-2">STATUS:</span>
        <span className={`text-sm font-bold ${getRiskColor()}`}>{status}</span>
      </div>
    </div>
  );
}
