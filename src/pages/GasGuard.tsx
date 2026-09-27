import { Wind, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';

export default function GasGuard() {
  const { demoState } = useAppContext();
  
  const gases = [
    { name: 'Methane (CH4)', value: demoState === 'DANGER' ? '2.5' : demoState === 'WARNING' ? '1.2' : '0.1', unit: '% LEL', status: demoState === 'DANGER' ? 'ABNORMAL' : demoState === 'WARNING' ? 'INVESTIGATE' : 'NORMAL' },
    { name: 'Carbon Monoxide (CO)', value: demoState === 'DANGER' ? '35' : '5', unit: 'ppm', status: demoState === 'DANGER' ? 'INVESTIGATE' : 'NORMAL' },
    { name: 'Hydrogen Sulfide (H2S)', value: '0.0', unit: 'ppm', status: 'NORMAL' },
    { name: 'Oxygen (O2)', value: demoState === 'DANGER' ? '19.0' : '20.9', unit: '%', status: demoState === 'DANGER' ? 'INVESTIGATE' : 'NORMAL' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center">
            <Wind className="w-6 h-6 mr-3 text-emerald-500" />
            SHAFTGUARD-G: Gas Detection
          </h1>
          <p className="text-slate-400 text-sm">Real-time monitoring of explosive and toxic gases.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {gases.map((gas, i) => (
          <div key={i} className={`glass-panel p-6 border-t-4 ${gas.status === 'ABNORMAL' ? 'border-t-red-500 bg-red-900/10' : gas.status === 'INVESTIGATE' ? 'border-t-amber-500 bg-amber-900/10' : 'border-t-emerald-500'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-slate-400 font-bold text-sm">{gas.name}</h3>
              {gas.status === 'ABNORMAL' ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <ShieldCheck className="w-5 h-5 text-emerald-500" />}
            </div>
            <div className="text-3xl font-black text-white mb-1">
              {gas.value} <span className="text-sm font-normal text-slate-500">{gas.unit}</span>
            </div>
            <StatusBadge status={gas.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
