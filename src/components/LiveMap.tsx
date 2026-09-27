import { useAppContext } from '../context/AppContext';
import { MapPin, AlertCircle } from 'lucide-react';

export default function LiveMap() {
  const { demoState, workers } = useAppContext();

  return (
    <div className="glass-panel p-6 relative overflow-hidden flex flex-col h-[400px]">
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h2 className="text-lg font-bold text-white">Live Mine Map</h2>
        <span className="text-[10px] font-bold text-primary bg-primary/20 border border-primary/30 px-2 py-1 rounded">
          REAL-TIME TRACKING
        </span>
      </div>

      <div className="flex-1 relative bg-slate-900 rounded-lg border border-border overflow-hidden">
        {/* Simple SVG Map Representation */}
        <svg viewBox="0 0 800 400" className="w-full h-full object-cover opacity-30">
          <path d="M 100 0 L 100 350 L 700 350" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="10 5" />
          <path d="M 100 150 L 500 150" fill="none" stroke="#64748b" strokeWidth="6" />
          <path d="M 100 250 L 600 250" fill="none" stroke="#64748b" strokeWidth="6" />
        </svg>

        {/* Map Overlays (Zones) */}
        <div className="absolute inset-0 p-4 flex flex-col gap-8">
          <div className="relative h-1/3 flex items-center">
            <span className="absolute left-4 text-xs font-bold text-slate-500">LEVEL 1 - MAIN</span>
            <div className={`absolute left-32 w-1/2 h-full rounded-lg border-2 border-dashed ${demoState === 'DANGER' ? 'border-red-500/50 bg-red-900/10' : 'border-emerald-500/30 bg-emerald-900/10'}`}></div>
          </div>
          <div className="relative h-1/3 flex items-center">
            <span className="absolute left-4 text-xs font-bold text-slate-500">LEVEL 2 - SOUTH</span>
            <div className={`absolute left-32 w-3/4 h-full rounded-lg border-2 border-dashed ${demoState === 'WARNING' || demoState === 'DANGER' ? 'border-amber-500/50 bg-amber-900/10' : 'border-emerald-500/30 bg-emerald-900/10'}`}></div>
          </div>
          <div className="relative h-1/3 flex items-center">
            <span className="absolute left-4 text-xs font-bold text-slate-500">LEVEL 3 - EAST</span>
            <div className={`absolute left-32 w-full h-full rounded-lg border-2 border-dashed ${demoState === 'DANGER' ? 'border-red-500/50 bg-red-900/20' : 'border-emerald-500/30 bg-emerald-900/10'}`}></div>
          </div>
        </div>

        {/* Worker Markers */}
        <div className="absolute inset-0">
          {workers.map((worker, index) => {
            const topPositions = ['15%', '50%', '85%'];
            const leftPositions = ['30%', '45%', '70%'];
            
            return (
              <div 
                key={worker.id} 
                className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out"
                style={{ 
                  top: topPositions[index % topPositions.length], 
                  left: leftPositions[index % leftPositions.length] 
                }}
              >
                <div className={`relative ${worker.helmetStatus === 'ONLINE' ? 'animate-pulse' : ''}`}>
                  <MapPin className={`w-8 h-8 ${worker.helmetStatus === 'ONLINE' ? 'text-emerald-500' : worker.helmetStatus === 'WARNING' ? 'text-amber-500' : 'text-red-500'}`} />
                  {(worker.areaStatus === 'DANGER' || worker.areaStatus === 'HIGH RISK') && (
                    <AlertCircle className="w-4 h-4 text-red-500 absolute -top-2 -right-2 bg-background rounded-full animate-ping" />
                  )}
                </div>
                <div className="mt-1 bg-background/90 px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-lg border border-border whitespace-nowrap">
                  {worker.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
