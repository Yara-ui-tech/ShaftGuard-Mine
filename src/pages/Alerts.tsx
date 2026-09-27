
import { useAppContext } from '../context/AppContext';
import { ShieldAlert, AlertTriangle, AlertCircle, Info, Clock } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import DemoControls from '../components/DemoControls';

export default function Alerts() {
  const { alerts, demoState } = useAppContext();

  // Mock historical alerts
  const historicalAlerts = [
    { id: 'hist-1', time: '14:32:18', module: 'SHAFTGUARD-S', param: 'Water Level', reading: '78%', risk: 91, status: 'DANGER', action: 'Investigate shaft water conditions' },
    { id: 'hist-2', time: '13:48:05', module: 'SHAFTGUARD-S', param: 'Vibration', reading: 'HIGH', risk: 67, status: 'HIGH RISK', action: 'Abnormal conditions detected' },
    { id: 'hist-3', time: '12:20:44', module: 'SHAFTGUARD-S', param: 'Tilt', reading: '1.6°', risk: 67, status: 'HIGH RISK', action: 'Elevated ground movement' },
    { id: 'hist-4', time: '09:15:22', module: 'SHAFTGUARD-W', param: 'pH Level', reading: '5.2', risk: 75, status: 'ABNORMAL', action: 'Water quality screening warning' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Alerts</h1>
          <p className="text-slate-400 text-sm">Active warnings and historical event log.</p>
        </div>
      </div>

      <DemoControls />

      {/* Active Alerts */}
      <h2 className="text-lg font-bold text-white mt-8 mb-4 flex items-center">
        ACTIVE ALERTS
        <span className="ml-3 px-2 py-0.5 rounded text-[10px] bg-blue-900/40 text-blue-400 border border-blue-500/30">SIMULATED</span>
      </h2>
      
      {alerts.length === 0 ? (
        <div className="glass-panel p-12 flex flex-col items-center justify-center text-center">
          <ShieldAlert className="w-16 h-16 text-emerald-500/20 mb-4" />
          <h3 className="text-xl font-bold text-slate-300 mb-2">No Active Alerts</h3>
          <p className="text-slate-500">System is currently operating within normal parameters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className={`glass-panel p-6 border-l-4 ${
              alert.status === 'DANGER' || alert.status === 'ABNORMAL' ? 'border-l-red-500 bg-gradient-to-r from-red-900/20 to-transparent' : 'border-l-amber-500 bg-gradient-to-r from-amber-900/20 to-transparent'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center">
                  {alert.status === 'DANGER' || alert.status === 'ABNORMAL' ? (
                    <AlertCircle className="w-8 h-8 text-red-500 mr-4 flex-shrink-0 animate-pulse" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-amber-500 mr-4 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-wide">{alert.parameter} DETECTED</h3>
                    <div className="text-xs text-slate-400 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" /> {alert.timestamp} | Source: {alert.module}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Reading</div>
                    <div className="text-lg font-bold text-white">{alert.reading}</div>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Risk Score</div>
                    <div className={`text-lg font-black ${
                      alert.riskScore >= 75 ? 'text-red-500' : 'text-amber-500'
                    }`}>{alert.riskScore}/100</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface/50 border border-border rounded-lg p-4 flex items-start">
                <Info className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-1">Recommended Action</h4>
                  <p className="text-sm text-white">{alert.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Communication Simulation */}
      <div className="glass-panel p-6 mt-8">
        <h2 className="text-lg font-bold text-white mb-6">COMMUNICATION SIMULATION</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface border border-border p-4 rounded-lg flex items-center justify-between">
            <span className="text-sm font-bold text-slate-300">GSM Network</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded">AVAILABLE IN DEMO</span>
          </div>
          <div className="bg-surface border border-border p-4 rounded-lg flex items-center justify-between">
            <span className="text-sm font-bold text-slate-300">LoRa</span>
            <span className="text-xs font-bold text-slate-400 bg-surface px-2 py-1 rounded">FUTURE OPTION</span>
          </div>
          <div className="bg-surface border border-border p-4 rounded-lg flex items-center justify-between">
            <span className="text-sm font-bold text-slate-300">Wi-Fi</span>
            <span className="text-xs font-bold text-primary bg-primary/20 px-2 py-1 rounded">DEMO ACTIVE</span>
          </div>
        </div>

        {demoState !== 'NORMAL' && (
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-surface border border-slate-700 rounded-3xl p-4 shadow-2xl relative">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-800 rounded-full"></div>
              <div className="text-center text-[10px] text-slate-500 mb-4 mt-2">SMS SIMULATION — NO MESSAGE SENT</div>
              
              <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tl-sm text-sm mb-2 shadow-sm">
                <div className="font-bold mb-1">SHAFTGUARD ALERT</div>
                <div className="text-xs space-y-1 opacity-90">
                  <p>Location: SG-S-001</p>
                  <p>Risk Level: {demoState === 'DANGER' ? 'DANGER' : 'HIGH'}</p>
                  <p>Water Level: {demoState === 'DANGER' ? '78%' : '57%'}</p>
                  <p>Vibration: {demoState === 'DANGER' ? 'HIGH' : 'MEDIUM'}</p>
                </div>
                <div className="mt-2 text-xs font-medium">Investigate conditions before underground access.</div>
                <div className="mt-2 text-[10px] opacity-70 italic">SIMULATED ALERT</div>
              </div>
              <div className="text-[9px] text-slate-500 ml-2">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
          </div>
        )}
      </div>

      {/* Historical Log */}
      <div className="glass-panel p-0 overflow-hidden mt-8">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">ALERT HISTORY</h2>
          <span className="text-[10px] font-bold tracking-wider text-blue-500/50 uppercase">DEMO DATA</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Module</th>
                <th className="px-6 py-4 font-medium">Parameter</th>
                <th className="px-6 py-4 font-medium">Reading</th>
                <th className="px-6 py-4 font-medium">Risk</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-slate-300">
              {historicalAlerts.map((log) => (
                <tr key={log.id} className="hover:bg-surface/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">{log.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{log.module}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.param}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.reading}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${log.risk >= 75 ? 'bg-red-900/20 text-red-400' : 'bg-amber-900/20 text-amber-400'}`}>
                      {log.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={log.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
