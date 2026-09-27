
import { useAppContext } from '../context/AppContext';
import MineShaftVisualization from '../components/MineShaftVisualization';
import SensorCard from '../components/SensorCard';
import DemoControls from '../components/DemoControls';
import { Droplets, Activity, Thermometer, Wind, Battery, Sun, Anchor, ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock chart data generator
const generateChartData = (baseValue: number, volatility: number, count: number = 20) => {
  const data = [];
  const now = new Date();
  for (let i = count; i >= 0; i--) {
    data.push({
      time: new Date(now.getTime() - i * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: Math.max(0, baseValue + (Math.random() * volatility - volatility / 2))
    });
  }
  return data;
};

export default function ShaftGuardS() {
  const { sensorData, demoState } = useAppContext();

  const getRiskInterpretation = () => {
    if (demoState === 'NORMAL') return "No significant abnormal combination detected in the simulated sensor data.";
    if (demoState === 'WARNING') return "Multiple abnormal sensor conditions detected. Investigation recommended.";
    return "Critical abnormal conditions detected. Follow established mine-safety procedures and investigate before underground access.";
  };

  const waterChartData = generateChartData(sensorData.waterLevel, demoState === 'NORMAL' ? 2 : 10);
  const tempChartData = generateChartData(sensorData.temperature, 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SHAFTGUARD-S</h1>
          <p className="text-slate-400 text-sm">Shaft Safety Monitoring Module</p>
        </div>
        <div className="bg-primary/20 border border-primary/30 px-3 py-1.5 rounded-md text-xs font-semibold text-primary">
          CURRENT PROTOTYPE
        </div>
      </div>

      <DemoControls />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization */}
        <div className="lg:col-span-1">
          <MineShaftVisualization />
        </div>

        {/* Risk Engine & Key Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 border-l-4 border-l-blue-500">
            <h2 className="text-xl font-bold text-white mb-6">SHAFTGUARD RISK ENGINE</h2>
            
            <div className="flex flex-col sm:flex-row gap-8 mb-6">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Risk Score</div>
                <div className="flex items-end">
                  <span className={`text-4xl font-black ${
                    sensorData.riskScore < 30 ? 'text-emerald-500' :
                    sensorData.riskScore < 50 ? 'text-amber-500' :
                    sensorData.riskScore < 75 ? 'text-orange-500' : 'text-red-500'
                  }`}>{sensorData.riskScore}</span>
                  <span className="text-lg text-slate-500 font-bold ml-1 mb-1">/ 100</span>
                </div>
                <div className="mt-2 text-sm font-bold text-white bg-surface inline-block px-3 py-1 rounded border border-border">
                  {sensorData.riskStatus}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Risk Scale</div>
                <div className="h-4 flex rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-emerald-500 w-[30%]" title="0-29: NORMAL"></div>
                  <div className="h-full bg-amber-500 w-[20%]" title="30-49: CAUTION"></div>
                  <div className="h-full bg-orange-500 w-[25%]" title="50-74: HIGH RISK"></div>
                  <div className="h-full bg-red-500 w-[25%]" title="75-100: DANGER"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-medium px-1">
                  <span>0</span>
                  <span>30</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
                <p className="text-[10px] text-slate-500 italic mt-2">
                  Prototype thresholds — subject to field validation and engineering calibration.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6 bg-surface/50 p-4 rounded-lg">
              <div>
                <div className="text-[10px] text-slate-400">Water Level</div>
                <div className={`text-sm font-bold ${sensorData.waterLevel > 70 ? 'text-red-400' : sensorData.waterLevel > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {sensorData.waterLevel > 70 ? 'HIGH' : sensorData.waterLevel > 50 ? 'ELEVATED' : 'LOW'}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Vibration</div>
                <div className={`text-sm font-bold ${sensorData.vibration === 'HIGH' ? 'text-red-400' : sensorData.vibration === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {sensorData.vibration}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Tilt</div>
                <div className={`text-sm font-bold ${sensorData.tilt > 2 ? 'text-red-400' : sensorData.tilt > 1 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {sensorData.tilt > 2 ? 'ABNORMAL' : sensorData.tilt > 1 ? 'ELEVATED' : 'NORMAL'}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Humidity</div>
                <div className={`text-sm font-bold ${sensorData.humidity > 90 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {sensorData.humidity > 90 ? 'HIGH' : 'NORMAL'}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Temperature</div>
                <div className={`text-sm font-bold ${sensorData.temperature > 29 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {sensorData.temperature > 29 ? 'ELEVATED' : 'NORMAL'}
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              demoState === 'NORMAL' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
              demoState === 'WARNING' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
              'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              <div className="flex items-start">
                {demoState === 'NORMAL' ? <ShieldCheck className="w-5 h-5 mr-3 mt-0.5" /> : 
                 demoState === 'WARNING' ? <AlertTriangle className="w-5 h-5 mr-3 mt-0.5" /> : 
                 <AlertCircle className="w-5 h-5 mr-3 mt-0.5" />}
                <div>
                  <h4 className="text-sm font-bold mb-1">Risk Interpretation</h4>
                  <p className="text-sm opacity-90">{getRiskInterpretation()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Cards */}
      <h3 className="text-lg font-bold text-white mt-8 mb-4 flex items-center">
        Live Sensor Telemetry
        <span className="ml-3 px-2 py-0.5 rounded text-[10px] bg-blue-900/40 text-blue-400 border border-blue-500/30">SIMULATED</span>
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="col-span-2"><SensorCard title="Water Level" value={sensorData.waterLevel} unit="%" icon={Droplets} status={sensorData.waterLevel > 70 ? 'ABNORMAL' : sensorData.waterLevel > 50 ? 'INVESTIGATE' : 'NORMAL'} /></div>
        <div className="col-span-2"><SensorCard title="Vibration" value={sensorData.vibration} icon={Activity} status={sensorData.vibration === 'HIGH' ? 'ABNORMAL' : sensorData.vibration === 'MEDIUM' ? 'INVESTIGATE' : 'NORMAL'} /></div>
        <div className="col-span-2"><SensorCard title="Shaft Tilt" value={sensorData.tilt} unit="°" icon={Anchor} status={sensorData.tilt > 2 ? 'ABNORMAL' : 'NORMAL'} /></div>
        <div className="col-span-2"><SensorCard title="Temperature" value={sensorData.temperature} unit="°C" icon={Thermometer} /></div>
        <div className="col-span-2"><SensorCard title="Humidity" value={sensorData.humidity} unit="%" icon={Wind} /></div>
        <div className="col-span-2"><SensorCard title="Ground Movement" value="NORMAL" icon={Activity} status="NORMAL" /></div>
        <div className="col-span-2"><SensorCard title="Battery" value={sensorData.battery} unit="%" icon={Battery} /></div>
        <div className="col-span-2"><SensorCard title="Solar Input" value="ACTIVE" icon={Sun} status="ACTIVE" /></div>
        <div className="col-span-2"><SensorCard title="Acoustic Emissions (Developments)" value={demoState === 'DANGER' ? 'HIGH' : 'LOW'} icon={Activity} status={demoState === 'DANGER' ? 'ABNORMAL' : 'NORMAL'} /></div>
        <div className="col-span-2"><SensorCard title="Ground Pressure (Developments)" value={demoState === 'WARNING' ? '12.5' : '4.2'} unit="MPa" icon={Activity} status={demoState === 'WARNING' ? 'INVESTIGATE' : 'NORMAL'} /></div>
        <div className="col-span-2"><SensorCard title="Laser Profiler (Developments)" value="OK" icon={Activity} status="NORMAL" /></div>
        <div className="col-span-2"><SensorCard title="Fiber Optic Strain (Developments)" value={demoState === 'DANGER' ? '3.5' : '0.2'} unit="με" icon={Activity} status={demoState === 'DANGER' ? 'INVESTIGATE' : 'NORMAL'} /></div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Water Level Trend</h3>
            <span className="text-[10px] font-bold tracking-wider text-blue-500/50 uppercase">LIVE SIMULATION</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={waterChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorWater)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Temperature Trend</h3>
            <span className="text-[10px] font-bold tracking-wider text-blue-500/50 uppercase">LIVE SIMULATION</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tempChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[20, 40]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#f59e0b' }}
                />
                <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
