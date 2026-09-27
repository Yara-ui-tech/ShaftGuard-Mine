
import { FileText, Download, TrendingUp, ShieldAlert, Activity, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Reports() {
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Reports</h1>
          <p className="text-slate-400 text-sm">Generate and view system analytics.</p>
        </div>
        <div className="bg-blue-900/30 border border-blue-500/30 px-3 py-1.5 rounded-md flex items-center">
          <span className="text-xs font-semibold text-blue-400 tracking-wider">DEMO DATA</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6">
          <div className="flex items-center mb-4 text-slate-400">
            <TrendingUp className="w-5 h-5 mr-2" />
            <h3 className="font-bold">Average Risk</h3>
          </div>
          <div className="text-4xl font-black text-amber-500 mb-2">32<span className="text-xl text-slate-500">/100</span></div>
          <p className="text-xs text-slate-500">Last 24 hours</p>
        </div>
        
        <div className="glass-panel p-6">
          <div className="flex items-center mb-4 text-slate-400">
            <ShieldAlert className="w-5 h-5 mr-2" />
            <h3 className="font-bold">Highest Risk</h3>
          </div>
          <div className="text-4xl font-black text-red-500 mb-2">91<span className="text-xl text-slate-500">/100</span></div>
          <p className="text-xs text-slate-500">Recorded at 14:32 today</p>
        </div>
        
        <div className="glass-panel p-6">
          <div className="flex items-center mb-4 text-slate-400">
            <Activity className="w-5 h-5 mr-2" />
            <h3 className="font-bold">Total Alerts</h3>
          </div>
          <div className="text-4xl font-black text-white mb-2">8</div>
          <p className="text-xs text-slate-500">Requires review</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-bold text-white mb-6">Alert Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Water Level Alerts</span>
              <span className="font-bold text-white">3</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '37.5%' }}></div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-300">Vibration Alerts</span>
              <span className="font-bold text-white">2</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-300">Tilt Alerts</span>
              <span className="font-bold text-white">1</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '12.5%' }}></div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-300">Environmental Alerts</span>
              <span className="font-bold text-white">2</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Generate Reports</h3>
          
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between p-4 bg-surface/50 border border-border rounded-lg hover:border-slate-600 transition-colors cursor-pointer">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-slate-400 mr-3" />
                <div>
                  <div className="font-bold text-slate-300">Daily Risk Summary</div>
                  <div className="text-xs text-slate-500">PDF Format</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-primary" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-surface/50 border border-border rounded-lg hover:border-slate-600 transition-colors cursor-pointer">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-slate-400 mr-3" />
                <div>
                  <div className="font-bold text-slate-300">Raw Sensor Log (24h)</div>
                  <div className="text-xs text-slate-500">CSV Format</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-primary" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-surface/50 border border-border rounded-lg hover:border-slate-600 transition-colors cursor-pointer">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-slate-400 mr-3" />
                <div>
                  <div className="font-bold text-slate-300">Water Quality Report</div>
                  <div className="text-xs text-slate-500">PDF Format</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-primary" />
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-900/10 border border-blue-500/20 rounded-lg flex items-start">
            <Info className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400">
              Report generation is simulated in this prototype. Buttons serve as UI placeholders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
