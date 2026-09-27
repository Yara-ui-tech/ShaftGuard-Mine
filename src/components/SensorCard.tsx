
import type { LucideIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface SensorCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  status?: string;
  trend?: 'up' | 'down' | 'stable';
  isSimulated?: boolean;
}

export default function SensorCard({ title, value, unit, icon: Icon, status, trend, isSimulated = true }: SensorCardProps) {
  return (
    <div className="glass-panel p-5 relative overflow-hidden group hover:border-slate-700 transition-colors">
      <div className="absolute top-0 right-0 p-2">
        {isSimulated && (
          <span className="text-[9px] font-bold tracking-wider text-blue-500/50 uppercase">Simulated</span>
        )}
      </div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 bg-surface/80 rounded-lg border border-border">
          <Icon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
        </div>
        {status && <StatusBadge status={status} />}
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-slate-400 mb-1">{title}</h4>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-white">{value}</span>
          {unit && <span className="ml-1 text-sm text-slate-500 font-medium">{unit}</span>}
        </div>
      </div>
    </div>
  );
}
