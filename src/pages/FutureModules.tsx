
import { Activity, Droplets, Wind, Cpu, Settings as SettingsIcon, ArrowDown } from 'lucide-react';

export default function FutureModules() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">SHAFTGUARD PLATFORM</h1>
        <p className="text-slate-400">Instead of developing one isolated device for one mining problem, SHAFTGUARD AI uses a common technology architecture. This allows additional sensor modules to be introduced as the needs of mining operations evolve.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
        
        {/* Module S */}
        <div className="glass-panel p-6 border-t-4 border-t-primary flex flex-col h-full relative overflow-hidden group hover:bg-surface/90 transition-colors">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity className="w-32 h-32" />
          </div>
          <div className="mb-4">
            <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">SHAFTGUARD-S</h3>
            <p className="text-sm text-slate-300 mb-2">Shaft Safety</p>
          </div>
          <div className="mb-6 flex-grow">
            <p className="text-xs text-slate-400 line-clamp-3">Intelligent monitoring of shaft conditions and early-warning indicators.</p>
          </div>
          <div className="mt-auto">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded text-xs font-bold w-full text-center">CURRENT PROTOTYPE</span>
          </div>
        </div>

        {/* Module W */}
        <div className="glass-panel p-6 border-t-4 border-t-cyan-500 flex flex-col h-full relative overflow-hidden group hover:bg-surface/90 transition-colors">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Droplets className="w-32 h-32" />
          </div>
          <div className="mb-4">
            <div className="w-12 h-12 bg-cyan-900/30 rounded-xl flex items-center justify-center mb-4">
              <Droplets className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">SHAFTGUARD-W</h3>
            <p className="text-sm text-slate-300 mb-2">Water & Flood</p>
          </div>
          <div className="mb-6 flex-grow">
            <p className="text-xs text-slate-400 line-clamp-3">Mine flooding, water levels and water-quality screening.</p>
          </div>
          <div className="mt-auto">
            <span className="inline-block px-3 py-1 bg-cyan-900/40 text-cyan-400 border border-cyan-500/30 rounded text-xs font-bold w-full text-center">NEXT MODULE</span>
          </div>
        </div>

        {/* Module E */}
        <div className="glass-panel p-6 border-t-4 border-t-emerald-500 flex flex-col h-full relative overflow-hidden group hover:bg-surface/90 transition-colors opacity-80 hover:opacity-100">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Wind className="w-32 h-32" />
          </div>
          <div className="mb-4">
            <div className="w-12 h-12 bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
              <Wind className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">SHAFTGUARD-E</h3>
            <p className="text-sm text-slate-300 mb-2">Environment</p>
          </div>
          <div className="mb-6 flex-grow">
            <p className="text-xs text-slate-400 line-clamp-3">Environmental and air-quality condition monitoring.</p>
          </div>
          <div className="mt-auto">
            <span className="inline-block px-3 py-1 bg-surface border border-border text-slate-400 rounded text-xs font-bold w-full text-center">PLANNED</span>
          </div>
        </div>

        {/* Module P */}
        <div className="glass-panel p-6 border-t-4 border-t-purple-500 flex flex-col h-full relative overflow-hidden group hover:bg-surface/90 transition-colors opacity-80 hover:opacity-100">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Cpu className="w-32 h-32" />
          </div>
          <div className="mb-4">
            <div className="w-12 h-12 bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">SHAFTGUARD-P</h3>
            <p className="text-sm text-slate-300 mb-2">Processing</p>
          </div>
          <div className="mb-6 flex-grow">
            <p className="text-xs text-slate-400 line-clamp-3">Monitoring selected processing-area conditions.</p>
          </div>
          <div className="mt-auto">
            <span className="inline-block px-3 py-1 bg-surface border border-border text-slate-400 rounded text-xs font-bold w-full text-center">PLANNED</span>
          </div>
        </div>

        {/* Module M */}
        <div className="glass-panel p-6 border-t-4 border-t-amber-500 flex flex-col h-full relative overflow-hidden group hover:bg-surface/90 transition-colors opacity-80 hover:opacity-100">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <SettingsIcon className="w-32 h-32" />
          </div>
          <div className="mb-4">
            <div className="w-12 h-12 bg-amber-900/30 rounded-xl flex items-center justify-center mb-4">
              <SettingsIcon className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">SHAFTGUARD-M</h3>
            <p className="text-sm text-slate-300 mb-2">Machinery</p>
          </div>
          <div className="mb-6 flex-grow">
            <p className="text-xs text-slate-400 line-clamp-3">Monitoring machinery condition and abnormal operating behaviour.</p>
          </div>
          <div className="mt-auto">
            <span className="inline-block px-3 py-1 bg-surface border border-border text-slate-400 rounded text-xs font-bold w-full text-center">PLANNED</span>
          </div>
        </div>

      </div>

      {/* Architecture Visual */}
      <div className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white text-center mb-16">MODULAR ARCHITECTURE</h2>
        
        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          {/* Modules Row */}
          <div className="flex justify-center flex-wrap gap-4 md:gap-8 w-full z-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-surface border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <span className="mt-2 text-xs font-bold text-slate-300">S</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-surface border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Droplets className="w-8 h-8 text-cyan-400" />
              </div>
              <span className="mt-2 text-xs font-bold text-slate-300">W</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-surface border-2 border-slate-600 rounded-full flex items-center justify-center">
                <Wind className="w-8 h-8 text-slate-400" />
              </div>
              <span className="mt-2 text-xs font-bold text-slate-400">E</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-surface border-2 border-slate-600 rounded-full flex items-center justify-center">
                <Cpu className="w-8 h-8 text-slate-400" />
              </div>
              <span className="mt-2 text-xs font-bold text-slate-400">P</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-surface border-2 border-slate-600 rounded-full flex items-center justify-center">
                <SettingsIcon className="w-8 h-8 text-slate-400" />
              </div>
              <span className="mt-2 text-xs font-bold text-slate-400">M</span>
            </div>
          </div>
          
          {/* Arrows Down */}
          <div className="flex justify-center w-full my-6 z-0">
            <div className="w-[80%] h-12 border-t-2 border-l-2 border-r-2 border-border rounded-t-xl relative">
               <div className="absolute left-1/2 bottom-0 w-0.5 h-full bg-border -translate-x-1/2"></div>
               <ArrowDown className="absolute left-1/2 -bottom-3 text-slate-500 -translate-x-1/2 w-6 h-6" />
            </div>
          </div>
          
          {/* Core Hub */}
          <div className="w-full max-w-sm bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6 text-center shadow-[0_0_30px_rgba(59,130,246,0.15)] z-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent"></div>
            <h2 className="text-2xl font-black text-white tracking-wider mb-2 relative z-10">SHAFTGUARD AI CORE</h2>
            <h3 className="text-sm font-bold text-blue-400 mb-6 relative z-10">COMMON PLATFORM</h3>
            
            <div className="grid grid-cols-2 gap-3 text-left relative z-10">
              <div className="bg-surface/80 p-3 rounded-lg border border-border">
                <span className="text-xs font-medium text-slate-300">Sensor Management</span>
              </div>
              <div className="bg-surface/80 p-3 rounded-lg border border-border">
                <span className="text-xs font-medium text-slate-300">Edge Processing</span>
              </div>
              <div className="bg-surface/80 p-3 rounded-lg border border-border">
                <span className="text-xs font-medium text-slate-300">Risk Engine</span>
              </div>
              <div className="bg-surface/80 p-3 rounded-lg border border-border">
                <span className="text-xs font-medium text-slate-300">Communication</span>
              </div>
              <div className="bg-surface/80 p-3 rounded-lg border border-border">
                <span className="text-xs font-medium text-slate-300">Dashboard UI</span>
              </div>
              <div className="bg-surface/80 p-3 rounded-lg border border-border">
                <span className="text-xs font-medium text-slate-300">Alerts System</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
