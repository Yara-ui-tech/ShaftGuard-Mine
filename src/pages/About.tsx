
import { Info, Tag, MapPin, Settings as SettingsIcon } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">ABOUT SHAFTGUARD AI</h1>
        <p className="text-slate-400">An early-warning, monitoring and decision-support platform.</p>
      </div>

      <div className="glass-panel p-8">
        <h2 className="text-xl font-bold text-white mb-6 border-b border-border pb-4">MINE PROFILE</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="text-xs text-slate-500 font-bold tracking-wider uppercase mb-1">Mine ID</div>
              <div className="text-lg text-white font-medium flex items-center">
                <Tag className="w-4 h-4 mr-2 text-primary" /> SG-S-001
              </div>
            </div>
            
            <div>
              <div className="text-xs text-slate-500 font-bold tracking-wider uppercase mb-1">Operation Type</div>
              <div className="text-lg text-white font-medium">Artisanal & Small-Scale Mining</div>
            </div>
            
            <div>
              <div className="text-xs text-slate-500 font-bold tracking-wider uppercase mb-1">Location</div>
              <div className="text-lg text-white font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" /> Demo Mine, Zimbabwe
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="text-xs text-slate-500 font-bold tracking-wider uppercase mb-1">Monitoring Module</div>
              <div className="text-lg text-white font-medium">SHAFTGUARD-S</div>
            </div>
            
            <div>
              <div className="text-xs text-slate-500 font-bold tracking-wider uppercase mb-1">System Status</div>
              <div className="inline-flex items-center px-3 py-1 rounded bg-blue-900/30 text-blue-400 text-sm font-bold border border-blue-500/30 mt-1">
                Simulation Mode Active
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-primary" /> Project Information
          </h2>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-slate-500 block mb-1">Project Type</span>
              <span className="text-sm text-slate-300">Mining Safety & Monitoring Technology</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block mb-1">Current Focus</span>
              <span className="text-sm text-slate-300">SHAFTGUARD-S</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block mb-1">Target Context</span>
              <span className="text-sm text-slate-300">Zimbabwean artisanal and small-scale mining</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block mb-1">Development Stage</span>
              <span className="text-sm text-slate-300 font-bold text-primary">Initial Design / Prototype Development</span>
            </div>
          </div>
        </div>
        
        <div className="glass-panel p-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2 text-primary" /> Technology Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-surface border border-border px-3 py-1.5 rounded-lg text-xs text-slate-300">Embedded Systems</span>
            <span className="bg-surface border border-border px-3 py-1.5 rounded-lg text-xs text-slate-300">IoT</span>
            <span className="bg-surface border border-border px-3 py-1.5 rounded-lg text-xs text-slate-300">Sensors</span>
            <span className="bg-surface border border-border px-3 py-1.5 rounded-lg text-xs text-slate-300">Edge Computing</span>
            <span className="bg-surface border border-border px-3 py-1.5 rounded-lg text-xs text-slate-300">AI-assisted Risk Detection</span>
            <span className="bg-surface border border-border px-3 py-1.5 rounded-lg text-xs text-slate-300">Wireless Communication</span>
            <span className="bg-surface border border-border px-3 py-1.5 rounded-lg text-xs text-slate-300">Solar Power</span>
          </div>
        </div>
      </div>
    </div>
  );
}
