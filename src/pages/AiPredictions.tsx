
import { useAppContext } from '../context/AppContext';
import DemoControls from '../components/DemoControls';
import { BrainCircuit, Search, ArrowRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function AiPredictions() {
  const { predictions, demoState } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Predictions & Pre-Entry</h1>
          <p className="text-slate-400 text-sm">Pre-shift monitoring and predictive hazard analysis.</p>
        </div>
      </div>

      <DemoControls />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Search className="w-5 h-5 mr-2 text-primary" /> Pre-Entry Scan
              </h2>
              <span className="text-[10px] bg-blue-900/40 text-blue-400 px-2 py-1 rounded font-bold border border-blue-500/30 animate-pulse">
                SCANNING
              </span>
            </div>
            
            <p className="text-sm text-slate-400 mb-6">
              The system analyzes baseline sensor data before personnel enter the mine, generating predictions for the upcoming 8-hour shift based on current trends.
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Gas Accumulation</span>
                <span className="text-emerald-400">Clear</span>
              </div>
              <div className="w-full bg-surface rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }}></div></div>
              
              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-slate-300">Water Seepage Rate</span>
                <span className={demoState === 'DANGER' ? 'text-red-400' : demoState === 'WARNING' ? 'text-amber-400' : 'text-emerald-400'}>
                  {demoState === 'NORMAL' ? 'Stable' : demoState === 'WARNING' ? 'Elevated' : 'Critical'}
                </span>
              </div>
              <div className="w-full bg-surface rounded-full h-1.5"><div className={`h-1.5 rounded-full ${demoState === 'DANGER' ? 'bg-red-500 w-[90%]' : demoState === 'WARNING' ? 'bg-amber-500 w-[60%]' : 'bg-emerald-500 w-[20%]'}`}></div></div>
              
              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-slate-300">Ground Stability</span>
                <span className={demoState === 'NORMAL' ? 'text-emerald-400' : 'text-amber-400'}>
                  {demoState === 'NORMAL' ? 'Stable' : 'Micro-tremors detected'}
                </span>
              </div>
              <div className="w-full bg-surface rounded-full h-1.5"><div className={`h-1.5 rounded-full ${demoState === 'NORMAL' ? 'bg-emerald-500 w-[10%]' : 'bg-amber-500 w-[70%]'}`}></div></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-panel p-6 h-full border-t-4 border-purple-500">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <BrainCircuit className="w-6 h-6 mr-3 text-purple-400" /> AI Hazard Predictions
            </h2>
            
            <div className="space-y-6">
              {predictions.map(pred => (
                <div key={pred.id} className="bg-surface/50 border border-border rounded-xl p-5 relative overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    pred.status === 'DANGER' ? 'bg-red-500' : 
                    pred.status === 'HIGH RISK' ? 'bg-amber-500' : 
                    'bg-emerald-500'
                  }`}></div>
                  
                  <div className="flex justify-between items-start mb-4 pl-3">
                    <div>
                      <div className="text-xs font-bold text-purple-400 mb-1">{pred.type} ANALYSIS</div>
                      <h3 className="text-lg font-bold text-white">{pred.area}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 uppercase">Confidence</div>
                      <div className="text-lg font-bold text-white">{pred.confidence}%</div>
                    </div>
                  </div>
                  
                  <div className="pl-3 mb-5">
                    <p className="text-slate-300 text-sm leading-relaxed">{pred.prediction}</p>
                  </div>
                  
                  <div className="pl-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Caution Measures</h4>
                    <ul className="space-y-2">
                      {pred.cautionMeasures.map((measure, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-300">
                          <ArrowRight className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-5 pl-3 flex items-center pt-4 border-t border-border">
                    <span className="text-xs font-bold text-slate-500 mr-3">RECOMMENDED STATUS:</span>
                    <StatusBadge status={pred.status} />
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
