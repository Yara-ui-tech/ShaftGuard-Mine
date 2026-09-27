import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Save, Settings as SettingsIcon, AlertTriangle, MonitorSmartphone, Bell, Sliders } from 'lucide-react';

export default function Settings() {
  const { demoState } = useAppContext();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Configuration</h1>
          <p className="text-slate-400 text-sm">Manage prototype settings and thresholds.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center p-3 rounded-lg bg-primary/20 text-primary border border-primary/30 font-medium text-sm">
            <MonitorSmartphone className="w-4 h-4 mr-3" /> General
          </button>
          <button className="w-full flex items-center p-3 rounded-lg bg-surface text-slate-400 hover:bg-surface/80 hover:text-slate-300 font-medium text-sm transition-colors">
            <Sliders className="w-4 h-4 mr-3" /> Thresholds
          </button>
          <button className="w-full flex items-center p-3 rounded-lg bg-surface text-slate-400 hover:bg-surface/80 hover:text-slate-300 font-medium text-sm transition-colors">
            <Bell className="w-4 h-4 mr-3" /> Notifications
          </button>
          <button className="w-full flex items-center p-3 rounded-lg bg-surface text-slate-400 hover:bg-surface/80 hover:text-slate-300 font-medium text-sm transition-colors">
            <SettingsIcon className="w-4 h-4 mr-3" /> Hardware
          </button>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-lg font-bold text-white mb-6 border-b border-border pb-4">General Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System Name</label>
                <input type="text" defaultValue="SHAFTGUARD AI Prototype" className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Device ID</label>
                <input type="text" defaultValue="SG-S-001" disabled className="w-full bg-surface/50 border border-border rounded-lg px-4 py-2 text-slate-500 cursor-not-allowed" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
                <div>
                  <div className="font-bold text-slate-300">Demo Mode</div>
                  <div className="text-xs text-slate-500">Enable simulated data generation</div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
              <h2 className="text-lg font-bold text-white">Alert Thresholds</h2>
              <span className="text-[10px] bg-blue-900/40 text-blue-400 px-2 py-1 rounded font-bold">PROTOTYPE CONFIG</span>
            </div>
            
            <div className="space-y-6">
              <div className="p-3 bg-amber-900/10 border border-amber-500/20 rounded-lg flex items-start mb-6">
                <AlertTriangle className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-400">
                  <strong className="text-slate-300">Warning:</strong> Thresholds require field validation and engineering calibration before real-world deployment.
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Water Level Critical (%)</label>
                  <span className="text-xs text-slate-300">75%</span>
                </div>
                <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-primary" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tilt Warning (°)</label>
                  <span className="text-xs text-slate-300">1.5°</span>
                </div>
                <input type="range" min="0" max="5" step="0.1" defaultValue="1.5" className="w-full accent-primary" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="flex items-center px-6 py-2.5 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
              <Save className="w-4 h-4 mr-2" /> Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
