
import { useAppContext } from '../context/AppContext';

export default function MineShaftVisualization() {
  const { demoState, sensorData } = useAppContext();
  
  // Dynamic colors based on state
  const getWaterColor = () => {
    if (demoState === 'NORMAL') return 'fill-blue-500/40';
    if (demoState === 'WARNING') return 'fill-amber-500/50';
    return 'fill-red-500/60';
  };
  
  const getSensorNodeColor = (status: string) => {
    if (status === 'NORMAL') return 'fill-emerald-500';
    if (status === 'HIGH RISK' || status === 'CAUTION') return 'fill-amber-500 text-amber-500';
    return 'fill-red-500 text-red-500';
  };
  
  const getVibrationAnimation = () => {
    if (demoState === 'DANGER') return 'animate-bounce';
    if (demoState === 'WARNING') return 'animate-pulse';
    return '';
  };
  
  // Water height based on percentage (max height of water area is 120, we calculate y position)
  const waterHeight = Math.min((sensorData.waterLevel / 100) * 120, 120);
  const waterY = 280 - waterHeight;

  return (
    <div className="w-full bg-surface/50 border border-border rounded-xl p-6 flex flex-col items-center">
      <div className="text-center mb-6">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Mine Shaft Schematic</h3>
        <p className="text-xs text-slate-500">Live sensor monitoring points</p>
      </div>
      
      <div className="relative w-full max-w-sm">
        <svg viewBox="0 0 300 320" className="w-full h-auto drop-shadow-2xl">
          {/* Ground Surface */}
          <path d="M 0 50 L 300 50" stroke="#334155" strokeWidth="4" />
          <path d="M 0 50 L 300 50 L 300 320 L 0 320 Z" fill="#0f172a" />
          
          <rect x="0" y="50" width="300" height="15" fill="#1e293b" />
          <text x="10" y="40" fill="#94a3b8" fontSize="12" fontWeight="bold">SURFACE LEVEL</text>
          
          {/* Shaft Entrance Structure */}
          <rect x="120" y="20" width="60" height="30" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <path d="M 110 20 L 190 20 L 150 0 Z" fill="#334155" />
          
          {/* Main Vertical Shaft */}
          <rect x="130" y="50" width="40" height="230" fill="#0a0f1c" stroke="#334155" strokeWidth="2" />
          
          {/* Wooden supports in shaft */}
          <line x1="130" y1="90" x2="170" y2="90" stroke="#475569" strokeWidth="2" />
          <line x1="130" y1="130" x2="170" y2="130" stroke="#475569" strokeWidth="2" />
          <line x1="130" y1="170" x2="170" y2="170" stroke="#475569" strokeWidth="2" />
          <line x1="130" y1="210" x2="170" y2="210" stroke="#475569" strokeWidth="2" />
          
          {/* Lateral Working Area */}
          <path d="M 170 230 L 250 230 L 250 270 L 170 270" fill="#0a0f1c" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
          
          {/* Supports in lateral area */}
          <line x1="190" y1="230" x2="190" y2="270" stroke="#475569" strokeWidth="2" />
          <line x1="220" y1="230" x2="220" y2="270" stroke="#475569" strokeWidth="2" />
          
          {/* Accumulated Water Area */}
          <rect x="130" y={waterY} width="40" height={waterHeight} className={`${getWaterColor()} transition-all duration-1000`} />
          <path d={`M 170 270 L 250 270 L 250 ${Math.max(230, 270 - (waterHeight/3))} L 170 ${Math.max(230, waterY)} Z`} className={`${getWaterColor()} transition-all duration-1000 opacity-50`} />
          
          {/* --- Sensors --- */}
          
          {/* Surface Comms Node */}
          <circle cx="100" cy="35" r="5" className={getSensorNodeColor(sensorData.riskStatus)} />
          <line x1="100" y1="35" x2="100" y2="15" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="100" cy="15" r="2" fill="#ef4444" className="animate-ping" />
          <text x="65" y="38" fill="#cbd5e1" fontSize="10">COMMS</text>
          
          {/* Connection Line to Underground */}
          <path d="M 100 40 L 100 60 L 135 60 L 135 240" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
          
          {/* Tilt Sensor (Upper Shaft) */}
          <g transform="translate(135, 100)">
            <rect x="-4" y="-4" width="8" height="8" className={getSensorNodeColor(sensorData.riskStatus)} />
            <text x="15" y="3" fill="#cbd5e1" fontSize="10">TILT {sensorData.tilt}°</text>
          </g>
          
          {/* Temp/Hum Sensor (Mid Shaft) */}
          <g transform="translate(135, 150)">
            <rect x="-4" y="-4" width="8" height="8" className={getSensorNodeColor(sensorData.riskStatus)} />
            <text x="-55" y="3" fill="#cbd5e1" fontSize="10">{sensorData.temperature}°C / {sensorData.humidity}%</text>
          </g>
          
          {/* Vibration Sensor (Lateral) */}
          <g transform="translate(200, 240)" className={getVibrationAnimation()}>
            <rect x="-4" y="-4" width="8" height="8" className={getSensorNodeColor(sensorData.riskStatus)} />
            <text x="-5" y="-10" fill="#cbd5e1" fontSize="10">VIB: {sensorData.vibration}</text>
          </g>
          
          {/* Water Sensor (Bottom Shaft) */}
          <g transform="translate(135, 260)">
            <rect x="-4" y="-4" width="8" height="8" className={getSensorNodeColor(sensorData.riskStatus)} />
            <text x="-40" y="15" fill="#cbd5e1" fontSize="10">H2O: {sensorData.waterLevel}%</text>
          </g>
          
        </svg>
      </div>
    </div>
  );
}
