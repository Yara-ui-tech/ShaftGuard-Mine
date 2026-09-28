import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import RiskCard from '../components/RiskCard';
import { Activity, Droplets, ShieldAlert, Wifi, Wind, HardHat, Cpu,
  Thermometer, Zap, Gauge, Clock, TrendingUp, TrendingDown, Minus,
  MapPin, Users, AlertTriangle, CheckCircle2, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import LiveMap from '../components/LiveMap';
import DemoControls from '../components/DemoControls';

// Sparkline using SVG
function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 80, h = 28;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="overflow-visible opacity-70">
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(values.length - 1) / (values.length - 1) * w} cy={h - ((values[values.length - 1] - min) / range) * h}
        r="2.5" fill={color} />
    </svg>
  );
}

// Animated radial gauge
function GaugeArc({ pct, color }: { pct: number; color: string }) {
  const r = 36, cx = 40, cy = 40, stroke = 8;
  const circ = Math.PI * r; // half circle
  const dash = (pct / 100) * circ;
  return (
    <svg width="80" height="46" viewBox="0 0 80 46">
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#1e293b" strokeWidth={stroke} strokeLinecap="round" />
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={`${dash} ${circ}`}
        style={{ transition: 'stroke-dasharray 1s ease' }} />
    </svg>
  );
}

// Live clock
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  return (
    <div className="text-right">
      <div className="text-2xl font-black font-mono text-white tabular-nums">{time.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</div>
      <div className="text-xs text-slate-400">{time.toLocaleDateString('en-ZA', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</div>
    </div>
  );
}

// Animated bar
function AnimBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
      <div className="h-1.5 rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

const TREND_ICONS = { up: TrendingUp, down: TrendingDown, stable: Minus };

export default function Dashboard() {
  const { sensorData, waterData, airData, workers, alerts, demoState, mineProfile } = useAppContext();
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(p => p + 1), 3000); return () => clearInterval(t); }, []);

  // Generate fluctuating sparkline values based on demoState
  const spark = (base: number, variance: number) =>
    Array.from({ length: 8 }, (_, i) => base + Math.sin((i + tick) * 0.8) * variance * (demoState === 'DANGER' ? 2 : demoState === 'WARNING' ? 1.2 : 0.5));

  const activeWorkers = workers.filter(w => w.helmetStatus !== 'OFFLINE').length;
  const dangerWorkers = workers.filter(w => w.areaStatus === 'DANGER').length;
  const onlineNodes   = 4;
  const totalNodes    = 4;

  const stateColor = demoState === 'DANGER' ? '#ef4444' : demoState === 'WARNING' ? '#f59e0b' : '#10b981';
  const stateGlow  = demoState === 'DANGER' ? 'shadow-[0_0_30px_rgba(239,68,68,0.2)]' : demoState === 'WARNING' ? 'shadow-[0_0_30px_rgba(245,158,11,0.15)]' : '';

  return (
    <div className="space-y-5">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <img src="/icon.png" alt="" className="w-7 h-7 opacity-80" />
            <h1 className="text-2xl font-black text-white tracking-tight">
              {mineProfile.mineName || 'ShaftGuard AI'} — Control Room
            </h1>
          </div>
          <p className="text-slate-400 text-sm">
            {mineProfile.operatorName ? `Operator: ${mineProfile.operatorName} · ` : ''}
            Live telemetry across all mine zones &amp; sensor nodes
          </p>
        </div>
        <div className="flex items-center gap-5">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
            demoState === 'DANGER' ? 'bg-red-900/30 border-red-500/40 animate-pulse' :
            demoState === 'WARNING' ? 'bg-amber-900/30 border-amber-500/40' :
            'bg-emerald-900/20 border-emerald-500/20'
          }`}>
            <span className={`relative flex h-2 w-2`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${demoState === 'DANGER' ? 'bg-red-400' : demoState === 'WARNING' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${demoState === 'DANGER' ? 'bg-red-500' : demoState === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            </span>
            <span className={`text-xs font-black tracking-wider ${demoState === 'DANGER' ? 'text-red-400' : demoState === 'WARNING' ? 'text-amber-400' : 'text-emerald-400'}`}>
              {demoState === 'NORMAL' ? 'ALL SYSTEMS NORMAL' : demoState === 'WARNING' ? 'ELEVATED ALERT' : '⚠ CRITICAL DANGER'}
            </span>
          </div>
          <LiveClock />
        </div>
      </div>

      <DemoControls />

      {/* ── Primary Risk + KPIs ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Risk Score — spans 2 cols */}
        <div className={`col-span-2 glass-panel p-5 border ${demoState === 'DANGER' ? 'border-red-500/50 bg-red-900/10' : demoState === 'WARNING' ? 'border-amber-500/40 bg-amber-900/10' : 'border-border'} ${stateGlow} flex items-center gap-5`}>
          <div className="relative">
            <GaugeArc pct={sensorData.riskScore} color={stateColor} />
            <div className="absolute inset-0 flex items-end justify-center pb-1">
              <span className="text-xl font-black text-white">{sensorData.riskScore}</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Overall Risk Score</div>
            <div className={`text-2xl font-black ${demoState === 'DANGER' ? 'text-red-400' : demoState === 'WARNING' ? 'text-amber-400' : 'text-emerald-400'}`}>{sensorData.riskStatus}</div>
            <Sparkline values={spark(sensorData.riskScore, 8)} color={stateColor} />
          </div>
        </div>

        {/* Other KPIs */}
        {[
          { label: 'Water Level',  value: `${sensorData.waterLevel}%`,         spark: spark(sensorData.waterLevel, 3), color: sensorData.waterLevel > 60 ? '#ef4444' : '#3b82f6', icon: Droplets },
          { label: 'Methane CH4', value: `${airData.methane}% LEL`,            spark: spark(airData.methane, 0.2),     color: airData.methane > 1 ? '#ef4444' : '#10b981',   icon: Wind },
          { label: 'Carbon CO',   value: `${airData.carbonMonoxide} ppm`,      spark: spark(airData.carbonMonoxide, 3), color: airData.carbonMonoxide > 20 ? '#f59e0b' : '#10b981', icon: Gauge },
          { label: 'Oxygen O₂',  value: `${airData.oxygen}%`,                 spark: spark(airData.oxygen, 0.2),      color: airData.oxygen < 19.5 ? '#ef4444' : '#10b981',  icon: Activity },
        ].map(({ label, value, spark: sv, color, icon: Icon }) => (
          <div key={label} className="glass-panel p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <Icon className="w-4 h-4 text-slate-400" />
              <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{label}</div>
            </div>
            <div className="text-xl font-black text-white mb-1">{value}</div>
            <Sparkline values={sv} color={color} />
          </div>
        ))}
      </div>

      {/* ── Inline summary strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Active Workers', value: `${activeWorkers}/${workers.length}`, icon: Users, color: 'text-purple-400', alert: dangerWorkers > 0 },
          { label: 'Sensor Nodes Online', value: `${onlineNodes}/${totalNodes}`, icon: Wifi, color: 'text-blue-400', alert: false },
          { label: 'Temperature',   value: `${sensorData.temperature}°C`,   icon: Thermometer, color: 'text-orange-400', alert: false },
          { label: 'Active Alerts', value: alerts.length, icon: ShieldAlert, color: alerts.length > 0 ? 'text-red-400' : 'text-emerald-400', alert: alerts.length > 0 },
        ].map(({ label, value, icon: Icon, color, alert }) => (
          <div key={label} className={`glass-panel p-4 flex items-center gap-3 ${alert ? 'border-red-500/30' : ''}`}>
            <div className={`p-2.5 rounded-xl ${alert ? 'bg-red-900/30 animate-pulse' : 'bg-slate-800'}`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <div className="text-lg font-black text-white">{value}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Live Map ── */}
      <LiveMap />

      {/* ── Module Overviews + Alerts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">

          {/* Shaft module */}
          <div className="glass-panel p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> SHAFTGUARD-S · Shaft Safety
              </h2>
              <Link to="/shaft" className="text-xs text-primary hover:text-blue-300 font-bold">Details →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Water Level', value: `${sensorData.waterLevel}%`, pct: sensorData.waterLevel, warn: sensorData.waterLevel > 60 },
                { label: 'Vibration', value: sensorData.vibration, pct: sensorData.vibration === 'HIGH' ? 80 : sensorData.vibration === 'MEDIUM' ? 50 : 15, warn: sensorData.vibration !== 'LOW' },
                { label: 'Shaft Tilt', value: `${sensorData.tilt}°`, pct: (sensorData.tilt / 5) * 100, warn: sensorData.tilt > 1.5 },
                { label: 'Humidity', value: `${sensorData.humidity}%`, pct: sensorData.humidity, warn: sensorData.humidity > 85 },
              ].map(({ label, value, pct, warn }) => (
                <div key={label} className={`rounded-xl p-3 border ${warn ? 'bg-red-950/40 border-red-500/30' : 'bg-slate-900/50 border-slate-800'}`}>
                  <div className="text-[10px] text-slate-400 font-black uppercase mb-1">{label}</div>
                  <div className={`text-lg font-black mb-2 ${warn ? 'text-red-400' : 'text-white'}`}>{value}</div>
                  <AnimBar pct={pct} color={warn ? '#ef4444' : '#3b82f6'} />
                </div>
              ))}
            </div>
          </div>

          {/* Air/Gas module */}
          <div className="glass-panel p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Wind className="w-4 h-4 text-emerald-400" /> SHAFTGUARD-A/G · Atmosphere
              </h2>
              <div className="flex gap-3">
                <Link to="/air" className="text-xs text-primary hover:text-blue-300 font-bold">Air →</Link>
                <Link to="/gas" className="text-xs text-primary hover:text-blue-300 font-bold">Gas →</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Oxygen O₂', value: `${airData.oxygen}%`, pct: ((airData.oxygen - 17) / (21 - 17)) * 100, warn: airData.oxygen < 19.5, inverted: true },
                { label: 'Methane CH4', value: `${airData.methane}% LEL`, pct: (airData.methane / 5) * 100, warn: airData.methane > 1 },
                { label: 'Carbon CO', value: `${airData.carbonMonoxide} ppm`, pct: (airData.carbonMonoxide / 200) * 100, warn: airData.carbonMonoxide > 25 },
                { label: 'H₂S', value: `${airData.hydrogenSulfide} ppm`, pct: (airData.hydrogenSulfide / 50) * 100, warn: airData.hydrogenSulfide > 10 },
              ].map(({ label, value, pct, warn }) => (
                <div key={label} className={`rounded-xl p-3 border ${warn ? 'bg-amber-950/40 border-amber-500/30' : 'bg-slate-900/50 border-slate-800'}`}>
                  <div className="text-[10px] text-slate-400 font-black uppercase mb-1">{label}</div>
                  <div className={`text-lg font-black mb-2 ${warn ? 'text-amber-400' : 'text-white'}`}>{value}</div>
                  <AnimBar pct={Math.min(pct, 100)} color={warn ? '#f59e0b' : '#10b981'} />
                </div>
              ))}
            </div>
          </div>

          {/* Personnel strip */}
          <div className="glass-panel p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <HardHat className="w-4 h-4 text-purple-400" /> Personnel Underground
              </h2>
              <Link to="/personnel" className="text-xs text-primary hover:text-blue-300 font-bold">All Workers →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {workers.map(w => (
                <div key={w.id} className={`rounded-xl p-3 border flex items-center justify-between ${
                  w.areaStatus === 'DANGER' ? 'border-red-500/40 bg-red-950/30' :
                  w.areaStatus === 'HIGH RISK' ? 'border-amber-500/30 bg-amber-950/20' : 'border-slate-800 bg-slate-900/40'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 ${
                      w.helmetStatus === 'ONLINE' ? 'bg-emerald-900/50 text-emerald-400' :
                      w.helmetStatus === 'WARNING' ? 'bg-amber-900/50 text-amber-400' : 'bg-slate-800 text-slate-500'
                    }`}>{w.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <div className="text-xs font-bold text-white">{w.name}</div>
                      <div className="text-[9px] text-slate-400 flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{w.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                      w.areaStatus === 'DANGER' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                      w.areaStatus === 'HIGH RISK' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>{w.areaStatus}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Active Alerts */}
          <div className="glass-panel p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" /> Active Alerts
              </h2>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${alerts.length > 0 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>{alerts.length}</span>
            </div>
            <div className="flex-1 space-y-3">
              {alerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-slate-500">
                  <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-500/30" />
                  <p className="text-sm font-bold text-emerald-400">All Clear</p>
                  <p className="text-xs mt-1">No active alerts</p>
                </div>
              ) : alerts.map(alert => (
                <div key={alert.id} className="p-4 rounded-xl bg-surface border border-border relative overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${alert.status === 'DANGER' || alert.status === 'ABNORMAL' ? 'bg-red-500' : 'bg-amber-500'}`} />
                  <div className="flex justify-between items-start mb-1 pl-3">
                    <span className="text-[10px] font-black text-slate-400">{alert.module}</span>
                    <span className="text-[9px] text-slate-500">{alert.timestamp}</span>
                  </div>
                  <h4 className="text-sm font-black text-white mb-1 pl-3">{alert.parameter}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2 pl-3">{alert.action}</p>
                </div>
              ))}
            </div>
            <Link to="/alerts" className="mt-4 block text-center py-2.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-border rounded-xl transition-colors font-bold">View All Alerts</Link>
          </div>

          {/* Quick navigation cards */}
          <div className="glass-panel p-5">
            <h2 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" /> Quick Access
            </h2>
            <div className="space-y-2">
              {[
                { label: 'Maintenance',  sub: `${2} tasks due`,   path: '/maintenance', color: 'text-orange-400', icon: Wrench },
                { label: 'Emergency',    sub: '4 protocols ready', path: '/emergency',   color: 'text-red-400',    icon: ShieldAlert },
                { label: 'AI Predictions', sub: 'Shift forecast',  path: '/ai-predictions', color: 'text-purple-400', icon: Cpu },
                { label: 'Training',     sub: '2 certs overdue',  path: '/training',    color: 'text-blue-400',   icon: Activity },
              ].map(({ label, sub, path, color, icon: Icon }) => (
                <Link key={path} to={path} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 transition-all group">
                  <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">{label}</div>
                    <div className="text-[10px] text-slate-500">{sub}</div>
                  </div>
                  <TrendingUp className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shift Info */}
          <div className="glass-panel p-5">
            <h2 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Shift Information
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Current Shift',   value: 'Day Shift (06:00 – 18:00)' },
                { label: 'Shift Supervisor', value: 'James Chuma (EMP-002)' },
                { label: 'Workers Underground', value: `${activeWorkers} personnel` },
                { label: 'Shift Started',   value: '06:04 AM today' },
                { label: 'Next Shift',      value: 'Night (18:00 – 06:00)' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-1.5 border-b border-border/40 last:border-0">
                  <span className="text-xs text-slate-400 font-bold">{label}</span>
                  <span className="text-xs text-white font-semibold text-right max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
