import { ActivitySquare, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';

export default function StructuralGuard() {
  const { demoState } = useAppContext();
  
  const metrics = [
    { name: 'Roof Convergence', value: demoState === 'DANGER' ? '12.5' : demoState === 'WARNING' ? '5.2' : '0.8', unit: 'mm/day', status: demoState === 'DANGER' ? 'ABNORMAL' : demoState === 'WARNING' ? 'INVESTIGATE' : 'NORMAL' },
    { name: 'Bolt Tension Loss', value: demoState === 'DANGER' ? '15' : '2', unit: '%', status: demoState === 'DANGER' ? 'INVESTIGATE' : 'NORMAL' },
    { name: 'Micro-Seismic Events', value: demoState === 'DANGER' ? '45' : '12', unit: 'events/hr', status: demoState === 'DANGER' ? 'ABNORMAL' : 'NORMAL' },
    { name: 'Extensometer Strain (Developments)', value: demoState === 'DANGER' ? '4.2' : '1.1', unit: 'mm/m', status: demoState === 'DANGER' ? 'ABNORMAL' : 'NORMAL' },
    { name: 'Pillar Stress (Developments)', value: demoState === 'WARNING' ? '28' : '15', unit: 'MPa', status: demoState === 'WARNING' ? 'INVESTIGATE' : 'NORMAL' },
    { name: 'Groundwater Pressure (Developments)', value: demoState === 'DANGER' ? '450' : '120', unit: 'kPa', status: demoState === 'DANGER' ? 'ABNORMAL' : 'NORMAL' },
    { name: 'Steel Support Deformation (Developments)', value: demoState === 'DANGER' ? '8.5' : '0.5', unit: 'mm', status: demoState === 'DANGER' ? 'INVESTIGATE' : 'NORMAL' },
    { name: 'Shotcrete Stress (Developments)', value: '4.2', unit: 'MPa', status: 'NORMAL' },
    { name: 'Cable Bolt Load (Developments)', value: demoState === 'WARNING' ? '185' : '110', unit: 'kN', status: demoState === 'WARNING' ? 'INVESTIGATE' : 'NORMAL' },
    { name: 'Surface Subsidence (Developments)', value: '0.2', unit: 'mm/month', status: 'NORMAL' },
    { name: 'Blast Vibration PPV (Developments)', value: demoState === 'WARNING' ? '45' : '12', unit: 'mm/s', status: demoState === 'WARNING' ? 'INVESTIGATE' : 'NORMAL' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center">
            <ActivitySquare className="w-6 h-6 mr-3 text-purple-500" />
            SHAFTGUARD-T: Structural Integrity
          </h1>
          <p className="text-slate-400 text-sm">Monitoring roof convergence and support tension.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, i) => (
          <div key={i} className={`glass-panel p-6 border-t-4 ${metric.status === 'ABNORMAL' ? 'border-t-red-500 bg-red-900/10' : metric.status === 'INVESTIGATE' ? 'border-t-amber-500 bg-amber-900/10' : 'border-t-emerald-500'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-slate-400 font-bold text-sm">{metric.name}</h3>
              {metric.status === 'ABNORMAL' ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <ShieldCheck className="w-5 h-5 text-emerald-500" />}
            </div>
            <div className="text-3xl font-black text-white mb-1">
              {metric.value} <span className="text-sm font-normal text-slate-500">{metric.unit}</span>
            </div>
            <StatusBadge status={metric.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
