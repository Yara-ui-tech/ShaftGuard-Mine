
import { useAppContext } from '../context/AppContext';
import SensorCard from '../components/SensorCard';
import DemoControls from '../components/DemoControls';
import { Wind, Flame, AlertTriangle, Gauge } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function AirGuard() {
  const { airData, demoState } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SHAFTGUARD-A (Air Guard)</h1>
          <p className="text-slate-400 text-sm">Monitoring air quality, dangerous gases, and ventilation conditions.</p>
        </div>
        <div className="bg-emerald-900/20 border border-emerald-500/30 px-3 py-1.5 rounded-md text-xs font-semibold text-emerald-400">
          NEW MODULE
        </div>
      </div>

      <DemoControls />

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <SensorCard title="Oxygen (O2)" value={airData.oxygen} unit="%" icon={Wind} status={airData.oxygen < 19.5 ? 'ABNORMAL' : 'NORMAL'} />
        <SensorCard title="Carbon Monoxide (CO)" value={airData.carbonMonoxide} unit="ppm" icon={Gauge} status={airData.carbonMonoxide > 50 ? 'ABNORMAL' : airData.carbonMonoxide > 20 ? 'INVESTIGATE' : 'NORMAL'} />
        <SensorCard title="Methane (CH4)" value={airData.methane} unit="% LEL" icon={Flame} status={airData.methane > 2.0 ? 'ABNORMAL' : airData.methane > 1.0 ? 'INVESTIGATE' : 'NORMAL'} />
        <SensorCard title="Hydrogen Sulfide (H2S)" value={airData.hydrogenSulfide} unit="ppm" icon={AlertTriangle} status={airData.hydrogenSulfide > 10 ? 'ABNORMAL' : airData.hydrogenSulfide > 5 ? 'INVESTIGATE' : 'NORMAL'} />
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        {/* Air Quality Screening */}
        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">ATMOSPHERIC STATUS</h2>
            <StatusBadge status={airData.airStatus} />
          </div>
          
          <div className="p-4 bg-slate-900/50 rounded-lg border border-border">
            <h4 className="text-sm font-bold text-slate-300 mb-2">Ventilation System Recommendation</h4>
            <div className={`p-4 rounded-lg border ${
              demoState === 'NORMAL' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
              demoState === 'WARNING' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
              'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              <span className="font-bold">
                {demoState === 'NORMAL' ? 'Standard ventilation sufficient. Air quality is safe.' :
                 demoState === 'WARNING' ? 'Increase ventilation speed. Monitoring elevated gas levels.' :
                 'CRITICAL: Evacuate area immediately. Hazardous atmosphere detected.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
