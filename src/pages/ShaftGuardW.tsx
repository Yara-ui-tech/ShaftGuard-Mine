import React from 'react';
import { useAppContext } from '../context/AppContext';
import SensorCard from '../components/SensorCard';
import DemoControls from '../components/DemoControls';
import { Droplets, Activity, Thermometer, FlaskConical, AlertTriangle, ArrowRight, ShieldCheck, Beaker } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function ShaftGuardW() {
  const { waterData, demoState } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SHAFTGUARD-W</h1>
          <p className="text-slate-400 text-sm">Monitoring mine water levels, flooding conditions and selected water-quality indicators.</p>
        </div>
        <div className="bg-cyan-900/20 border border-cyan-500/30 px-3 py-1.5 rounded-md text-xs font-semibold text-cyan-400">
          NEXT MODULE
        </div>
      </div>

      <DemoControls />

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
        <SensorCard title="Water Level" value={waterData.waterLevel} unit="%" icon={Droplets} status={waterData.waterLevel > 70 ? 'ABNORMAL' : waterData.waterLevel > 50 ? 'INVESTIGATE' : 'NORMAL'} />
        <SensorCard title="Flow Rate" value={waterData.flowRate} unit="L/min" icon={Activity} />
        <SensorCard title="pH" value={waterData.pH} icon={FlaskConical} status={waterData.pH < 6 || waterData.pH > 8.5 ? 'ABNORMAL' : 'NORMAL'} />
        <SensorCard title="Turbidity" value={waterData.turbidity} icon={Droplets} status={waterData.turbidity === 'HIGH' ? 'ABNORMAL' : waterData.turbidity === 'MEDIUM' ? 'INVESTIGATE' : 'NORMAL'} />
        <SensorCard title="Conductivity" value={waterData.conductivity} icon={Zap} status={waterData.conductivity !== 'NORMAL' ? (waterData.conductivity === 'CRITICAL' ? 'ABNORMAL' : 'INVESTIGATE') : 'NORMAL'} />
        <SensorCard title="Temperature" value={waterData.temperature} unit="°C" icon={Thermometer} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Water Quality Screening */}
        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">WATER QUALITY SCREENING</h2>
            <StatusBadge status={waterData.waterStatus} />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg border border-border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-900/30 rounded-lg mr-4">
                  <FlaskConical className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-300">pH Level</h4>
                  <p className="text-xs text-slate-500">Acidity indicator</p>
                </div>
              </div>
              <div className="text-right flex items-center">
                <span className="text-xl font-bold text-white mr-4">{waterData.pH}</span>
                <StatusBadge status={waterData.pH < 6 || waterData.pH > 8.5 ? 'ABNORMAL' : 'NORMAL'} />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg border border-border">
              <div className="flex items-center">
                <div className="p-2 bg-amber-900/30 rounded-lg mr-4">
                  <Droplets className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-300">Turbidity</h4>
                  <p className="text-xs text-slate-500">Clarity/suspended solids</p>
                </div>
              </div>
              <div className="text-right flex items-center">
                <span className="text-xl font-bold text-white mr-4">{waterData.turbidity}</span>
                <StatusBadge status={waterData.turbidity === 'HIGH' ? 'ABNORMAL' : waterData.turbidity === 'MEDIUM' ? 'INVESTIGATE' : 'NORMAL'} />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg border border-border">
              <div className="flex items-center">
                <div className="p-2 bg-emerald-900/30 rounded-lg mr-4">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-300">Conductivity/TDS</h4>
                  <p className="text-xs text-slate-500">Dissolved solids proxy</p>
                </div>
              </div>
              <div className="text-right flex items-center">
                <span className="text-xl font-bold text-white mr-4">{waterData.conductivity}</span>
                <StatusBadge status={waterData.conductivity !== 'NORMAL' ? (waterData.conductivity === 'CRITICAL' ? 'ABNORMAL' : 'INVESTIGATE') : 'NORMAL'} />
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg flex items-start">
            <AlertTriangle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              SHAFTGUARD-W provides sensor-based screening and monitoring. It does not replace laboratory analysis or certified environmental testing. Specific contaminants require appropriate validated sensors and/or laboratory confirmation.
            </p>
          </div>
        </div>

        {/* Mine Water Discharge Flow */}
        <div className="glass-panel p-6 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-8">MINE WATER DISCHARGE MONITORING</h2>
          
          <div className="flex-1 flex flex-col justify-center items-center relative py-8">
            {/* Background connecting line */}
            <div className="absolute top-12 bottom-12 w-1 bg-border z-0"></div>
            
            <div className="z-10 flex flex-col items-center w-full max-w-sm space-y-6">
              <div className="w-full bg-surface border border-border p-3 rounded-lg text-center shadow-lg">
                <h4 className="text-sm font-bold text-slate-300">MINE</h4>
              </div>
              
              <ArrowRight className="w-5 h-5 text-slate-500 rotate-90" />
              
              <div className="w-full bg-surface border border-border p-3 rounded-lg text-center shadow-lg">
                <h4 className="text-sm font-bold text-slate-300">WATER COLLECTION</h4>
              </div>
              
              <ArrowRight className="w-5 h-5 text-slate-500 rotate-90" />
              
              <div className="w-full bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg shadow-lg">
                <div className="text-center mb-2">
                  <h4 className="text-sm font-bold text-blue-400">SENSOR NODE</h4>
                </div>
                <div className="flex justify-center flex-wrap gap-2">
                  <span className="text-[10px] bg-background px-2 py-1 rounded text-slate-400">pH</span>
                  <span className="text-[10px] bg-background px-2 py-1 rounded text-slate-400">Turbidity</span>
                  <span className="text-[10px] bg-background px-2 py-1 rounded text-slate-400">Conductivity</span>
                  <span className="text-[10px] bg-background px-2 py-1 rounded text-slate-400">Temp</span>
                  <span className="text-[10px] bg-background px-2 py-1 rounded text-slate-400">Flow</span>
                </div>
              </div>
              
              <ArrowRight className="w-5 h-5 text-slate-500 rotate-90" />
              
              <div className="w-full bg-surface border border-border p-4 rounded-lg text-center shadow-lg flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-300">WATER QUALITY STATUS</h4>
                <StatusBadge status={waterData.waterStatus} />
              </div>
            </div>
          </div>
          
          <div className={`mt-4 p-4 rounded-lg border ${
            demoState === 'NORMAL' ? 'bg-emerald-500/10 border-emerald-500/20' :
            demoState === 'WARNING' ? 'bg-amber-500/10 border-amber-500/20' :
            'bg-red-500/10 border-red-500/20'
          }`}>
            <h4 className="text-sm font-bold text-white mb-2">DISCHARGE STATUS</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <div><span className="text-[10px] text-slate-400 block">Flow</span><span className="text-sm font-semibold text-slate-200">{waterData.flowRate} L/m</span></div>
              <div><span className="text-[10px] text-slate-400 block">pH</span><span className="text-sm font-semibold text-slate-200">{waterData.pH}</span></div>
              <div><span className="text-[10px] text-slate-400 block">Turbidity</span><span className="text-sm font-semibold text-slate-200">{waterData.turbidity}</span></div>
              <div><span className="text-[10px] text-slate-400 block">Cond.</span><span className="text-sm font-semibold text-slate-200">{waterData.conductivity}</span></div>
            </div>
            <div className="flex items-center pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-slate-400 mr-2">ACTION:</span>
              <span className={`text-xs font-bold ${
                demoState === 'NORMAL' ? 'text-emerald-400' :
                demoState === 'WARNING' ? 'text-amber-400' :
                'text-red-400'
              }`}>
                {demoState === 'NORMAL' ? 'NORMAL OPERATION' :
                 demoState === 'WARNING' ? 'INVESTIGATION REQUIRED' :
                 'IMMEDIATE ACTION REQUIRED'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
