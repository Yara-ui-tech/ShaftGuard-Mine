
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
        {demoState === 'DANGER' && (
          <div className="mb-8 p-4 bg-red-900/40 border-2 border-red-500 rounded-xl flex flex-col md:flex-row items-center justify-between shadow-[0_0_30px_rgba(220,38,38,0.3)] animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center text-red-400 mb-4 md:mb-0">
               <AlertCircle className="w-12 h-12 mr-5 animate-pulse" />
               <div>
                 <h2 className="text-xl font-black text-white uppercase tracking-wider">Critical Zone Identified: Level 3 - East</h2>
                 <p className="text-sm font-medium">AI has pinpointed Level 3 - East as the epicenter of the hazard. 3 workers detected in this sector.</p>
               </div>
            </div>
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black tracking-widest text-sm rounded-lg animate-pulse w-full md:w-auto shadow-lg shadow-red-500/20">
               BROADCAST EVACUATION OVERRIDE
            </button>
          </div>
        )}
        
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-primary" /> WORKER STATUS
        </h2>
        
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
