
import { useAppContext } from '../context/AppContext';
import DemoControls from '../components/DemoControls';
import { HardHat, MapPin, User, Activity, AlertCircle } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function Personnel() {
  const { workers } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Personnel Tracking</h1>
          <p className="text-slate-400 text-sm">Real-time worker locations and helmet sensor status.</p>
        </div>
        <div className="bg-purple-900/20 border border-purple-500/30 px-3 py-1.5 rounded-md text-xs font-semibold text-purple-400">
          SHAFTGUARD-H MODULE
        </div>
      </div>

      <DemoControls />

      <div className="glass-panel p-6 mt-8">
        <h2 className="text-xl font-bold text-white mb-6">WORKER STATUS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workers.map(worker => (
            <div key={worker.id} className={`bg-surface/50 rounded-xl p-5 border ${
              worker.areaStatus === 'DANGER' ? 'border-red-500/50 bg-red-900/10' : 
              worker.areaStatus === 'HIGH RISK' ? 'border-amber-500/50 bg-amber-900/10' : 
              'border-border'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${worker.helmetStatus === 'ONLINE' ? 'bg-emerald-900/30 text-emerald-400' : worker.helmetStatus === 'WARNING' ? 'bg-amber-900/30 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>
                    <HardHat className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{worker.name}</h3>
                    <p className="text-xs text-slate-400">{worker.role} | {worker.id}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    worker.helmetStatus === 'ONLINE' ? 'bg-emerald-500/20 text-emerald-400' : 
                    worker.helmetStatus === 'WARNING' ? 'bg-amber-500/20 text-amber-400' : 
                    'bg-slate-700 text-slate-400'
                  }`}>
                    {worker.helmetStatus}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 text-slate-500 mr-2" />
                  <span className="text-slate-300">Location: <span className="font-semibold text-white">{worker.location}</span></span>
                </div>
                <div className="flex items-center text-sm">
                  <Activity className="w-4 h-4 text-slate-500 mr-2" />
                  <span className="text-slate-300 mr-2">Area Status:</span>
                  <StatusBadge status={worker.areaStatus} />
                </div>
                <div className="flex items-center text-xs text-slate-500 mt-2">
                  <User className="w-3 h-3 mr-1" /> Last seen: {worker.lastSeen}
                </div>
              </div>
              
              {(worker.areaStatus === 'DANGER' || worker.areaStatus === 'HIGH RISK') && (
                <div className="mt-4 p-2 bg-red-900/20 border border-red-500/30 rounded text-xs text-red-400 flex items-start">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>Evacuation signal sent to helmet. Awaiting confirmation.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
