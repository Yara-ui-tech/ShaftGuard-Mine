
import { useAppContext } from '../context/AppContext';
import RiskCard from '../components/RiskCard';
import SensorCard from '../components/SensorCard';
import { Activity, Droplets, ShieldAlert, Wifi, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
import LiveMap from '../components/LiveMap';

export default function Dashboard() {
  const { sensorData, waterData, airData, workers, alerts } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Dashboard</h1>
          <p className="text-slate-400 text-sm">Real-time overview of connected modules.</p>
        </div>
        <div className="bg-blue-900/30 border border-blue-500/30 px-3 py-1.5 rounded-md flex items-center">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-semibold text-blue-400 tracking-wider">SIMULATED DATA</span>
        </div>
      </div>

      {/* Top Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="xl:col-span-2">
          <RiskCard score={sensorData.riskScore} status={sensorData.riskStatus} />
        </div>
        
        <SensorCard 
          title="Shaft Status" 
          value="MONITORED" 
          icon={Activity} 
          status={sensorData.riskStatus === 'NORMAL' ? 'NORMAL' : 'ABNORMAL'}
        />
        
        <SensorCard 
          title="Water Status" 
          value={waterData.waterStatus} 
          icon={Droplets} 
          status={waterData.waterStatus}
        />
        
        <SensorCard 
          title="Connectivity" 
          value="ONLINE" 
          icon={Wifi} 
          status="NORMAL"
        />
        
        <SensorCard 
          title="Air Quality" 
          value={airData.airStatus} 
          icon={Wind} 
          status={airData.airStatus}
        />
        
        <SensorCard 
          title="Personnel" 
          value={`${workers.filter(w => w.helmetStatus !== 'OFFLINE').length} Active`} 
          icon={Activity} 
          status="NORMAL"
        />
      </div>

      {/* Live Map */}
      <div className="mb-6">
        <LiveMap />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Statuses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary" />
                SHAFTGUARD-S Overview
              </h2>
              <Link to="/shaft" className="text-sm text-primary hover:text-blue-400 font-medium">View Details →</Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-surface/50 p-4 rounded-lg border border-border">
                <div className="text-xs text-slate-400 mb-1">Water Level</div>
                <div className="text-lg font-bold text-white">{sensorData.waterLevel}%</div>
              </div>
              <div className="bg-surface/50 p-4 rounded-lg border border-border">
                <div className="text-xs text-slate-400 mb-1">Vibration</div>
                <div className="text-lg font-bold text-white">{sensorData.vibration}</div>
              </div>
              <div className="bg-surface/50 p-4 rounded-lg border border-border">
                <div className="text-xs text-slate-400 mb-1">Tilt</div>
                <div className="text-lg font-bold text-white">{sensorData.tilt}°</div>
              </div>
              <div className="bg-surface/50 p-4 rounded-lg border border-border">
                <div className="text-xs text-slate-400 mb-1">Movement</div>
                <div className="text-lg font-bold text-emerald-500">NORMAL</div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Wind className="w-5 h-5 mr-2 text-emerald-400" />
                SHAFTGUARD-A Overview
              </h2>
              <Link to="/air" className="text-sm text-primary hover:text-blue-400 font-medium">View Details →</Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-surface/50 p-4 rounded-lg border border-border">
                <div className="text-xs text-slate-400 mb-1">O2 Level</div>
                <div className="text-lg font-bold text-white">{airData.oxygen}%</div>
              </div>
              <div className="bg-surface/50 p-4 rounded-lg border border-border">
                <div className="text-xs text-slate-400 mb-1">CO</div>
                <div className="text-lg font-bold text-white">{airData.carbonMonoxide} ppm</div>
              </div>
              <div className="bg-surface/50 p-4 rounded-lg border border-border">
                <div className="text-xs text-slate-400 mb-1">CH4</div>
                <div className="text-lg font-bold text-white">{airData.methane}% LEL</div>
              </div>
              <div className="bg-surface/50 p-4 rounded-lg border border-border">
                <div className="text-xs text-slate-400 mb-1">Status</div>
                <div className={`text-lg font-bold ${airData.airStatus === 'NORMAL' ? 'text-emerald-500' : 'text-red-500'}`}>{airData.airStatus}</div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-400" />
                Personnel Tracking
              </h2>
              <Link to="/personnel" className="text-sm text-primary hover:text-blue-400 font-medium">View Details →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {workers.slice(0, 2).map(w => (
                 <div key={w.id} className="bg-surface/50 p-4 rounded-lg border border-border flex justify-between items-center">
                    <div>
                      <div className="text-sm font-bold text-white">{w.name}</div>
                      <div className="text-xs text-slate-400">{w.location}</div>
                    </div>
                    <div className={`text-xs font-bold px-2 py-1 rounded ${w.helmetStatus === 'ONLINE' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'}`}>
                      {w.helmetStatus}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Alerts Sidebar */}
        <div className="space-y-6">
          <div className="glass-panel p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white flex items-center">
                <ShieldAlert className="w-5 h-5 mr-2 text-warning" />
                Active Alerts ({alerts.length})
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {alerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-slate-500">
                  <ShieldAlert className="w-10 h-10 mb-2 opacity-20" />
                  <p className="text-sm">No active alerts</p>
                </div>
              ) : (
                alerts.map((alert) => (
                  <div key={alert.id} className="p-4 rounded-lg bg-surface border border-border relative overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${alert.status === 'DANGER' || alert.status === 'ABNORMAL' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-slate-400">{alert.module}</span>
                      <span className="text-xs text-slate-500">{alert.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{alert.parameter}</h4>
                    <p className="text-xs text-slate-300 line-clamp-2">{alert.action}</p>
                  </div>
                ))
              )}
            </div>
            
            <Link to="/alerts" className="mt-4 block w-full text-center py-2 text-sm text-slate-400 hover:text-white bg-surface hover:bg-border border border-border rounded transition-colors">
              View All Alerts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
