import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, Info, Zap } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status.toUpperCase()) {
      case 'NORMAL':
        return {
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-500',
          border: 'border-emerald-500/20',
          icon: ShieldCheck
        };
      case 'CAUTION':
      case 'INVESTIGATE':
      case 'HIGH RISK':
        return {
          bg: 'bg-amber-500/10',
          text: 'text-amber-500',
          border: 'border-amber-500/20',
          icon: AlertTriangle
        };
      case 'DANGER':
      case 'ABNORMAL':
      case 'CRITICAL':
        return {
          bg: 'bg-red-500/10',
          text: 'text-red-500',
          border: 'border-red-500/20',
          icon: AlertCircle
        };
      case 'ACTIVE':
      case 'ONLINE':
      case 'MONITORED':
        return {
          bg: 'bg-blue-500/10',
          text: 'text-blue-500',
          border: 'border-blue-500/20',
          icon: Zap
        };
      default:
        return {
          bg: 'bg-slate-500/10',
          text: 'text-slate-400',
          border: 'border-slate-500/20',
          icon: Info
        };
    }
  };

  const style = getStatusStyles();
  const Icon = style.icon;

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider border ${style.bg} ${style.text} ${style.border} ${className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status}
    </div>
  );
}
