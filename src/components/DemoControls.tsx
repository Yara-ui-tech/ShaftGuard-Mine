
import { useAppContext } from '../context/AppContext';
import type { DemoState } from '../types';

export default function DemoControls() {
  const { demoState, setDemoState } = useAppContext();

  const handleStateChange = (state: DemoState) => {
    setDemoState(state);
  };

  return (
    <div className="glass-panel p-6 border-blue-500/30">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-white mb-1">DEMO CONTROL</h2>
          <p className="text-xs text-slate-400">Simulate sensor states for presentation</p>
        </div>
        <div className="bg-blue-900/30 border border-blue-500/30 px-3 py-1.5 rounded-md flex items-center">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-semibold text-blue-400 tracking-wider">ACTIVE</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => handleStateChange('NORMAL')}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
            demoState === 'NORMAL' 
              ? 'bg-emerald-900/40 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
              : 'bg-surface hover:bg-surface/80 border-border hover:border-emerald-500/30'
          }`}
        >
          <span className={`text-sm font-bold mb-2 ${demoState === 'NORMAL' ? 'text-emerald-400' : 'text-slate-300'}`}>NORMAL</span>
          <span className="text-xs text-center text-slate-500">Baseline conditions</span>
        </button>
        
        <button
          onClick={() => handleStateChange('WARNING')}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
            demoState === 'WARNING' 
              ? 'bg-amber-900/40 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
              : 'bg-surface hover:bg-surface/80 border-border hover:border-amber-500/30'
          }`}
        >
          <span className={`text-sm font-bold mb-2 ${demoState === 'WARNING' ? 'text-amber-400' : 'text-slate-300'}`}>SIMULATE WARNING</span>
          <span className="text-xs text-center text-slate-500">Elevated risk levels</span>
        </button>
        
        <button
          onClick={() => handleStateChange('DANGER')}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
            demoState === 'DANGER' 
              ? 'bg-red-900/40 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
              : 'bg-surface hover:bg-surface/80 border-border hover:border-red-500/30'
          }`}
        >
          <span className={`text-sm font-bold mb-2 ${demoState === 'DANGER' ? 'text-red-400' : 'text-slate-300'}`}>SIMULATE DANGER</span>
          <span className="text-xs text-center text-slate-500">Critical thresholds met</span>
        </button>
      </div>
    </div>
  );
}
