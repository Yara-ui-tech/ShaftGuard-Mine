import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';

export default function SensorData() {
  const { sensorData } = useAppContext();
  const [viewMode, setViewMode] = useState<'PROCESSED' | 'RAW'>('PROCESSED');

  const processedData = [
    { sensor: 'Water Level', value: sensorData.waterLevel, unit: '%', status: sensorData.waterLevel > 70 ? 'ABNORMAL' : sensorData.waterLevel > 50 ? 'INVESTIGATE' : 'NORMAL' },
    { sensor: 'Vibration', value: sensorData.vibration === 'HIGH' ? 0.85 : sensorData.vibration === 'MEDIUM' ? 0.45 : 0.12, unit: 'g', status: sensorData.vibration === 'HIGH' ? 'ABNORMAL' : sensorData.vibration === 'MEDIUM' ? 'INVESTIGATE' : 'NORMAL' },
    { sensor: 'Shaft Tilt', value: sensorData.tilt, unit: '°', status: sensorData.tilt > 2 ? 'ABNORMAL' : 'NORMAL' },
    { sensor: 'Temperature', value: sensorData.temperature, unit: '°C', status: sensorData.temperature > 29 ? 'INVESTIGATE' : 'NORMAL' },
    { sensor: 'Humidity', value: sensorData.humidity, unit: '%', status: sensorData.humidity > 90 ? 'INVESTIGATE' : 'NORMAL' },
  ];

  const rawData = [
    { sensor: 'ADC_WTR_01', value: Math.floor(sensorData.waterLevel * 40.95), unit: 'RAW_12B', status: 'OK' },
    { sensor: 'I2C_MPU_AX', value: sensorData.vibration === 'HIGH' ? 850 : sensorData.vibration === 'MEDIUM' ? 450 : 120, unit: 'mg', status: 'OK' },
    { sensor: 'I2C_MPU_AY', value: Math.floor(sensorData.tilt * 100), unit: 'mg', status: 'OK' },
    { sensor: 'DHT_T_01', value: sensorData.temperature, unit: 'C', status: 'OK' },
    { sensor: 'DHT_H_01', value: sensorData.humidity, unit: 'RH', status: 'OK' },
  ];

  const displayData = viewMode === 'PROCESSED' ? processedData : rawData;
  const timestamp = new Date().toISOString();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Technical Sensor Data</h1>
          <p className="text-slate-400 text-sm">Raw and processed telemetry from edge nodes.</p>
        </div>
      </div>

      <div className="glass-panel p-0 overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center bg-surface/30">
          <div className="flex space-x-2 bg-surface p-1 rounded-lg border border-border">
            <button 
              onClick={() => setViewMode('PROCESSED')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${viewMode === 'PROCESSED' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
            >
              PROCESSED DATA
            </button>
            <button 
              onClick={() => setViewMode('RAW')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${viewMode === 'RAW' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
            >
              RAW DATA
            </button>
          </div>
          <span className="text-[10px] font-bold tracking-wider text-blue-500/50 uppercase">SIMULATED DATA</span>
        </div>
        
        <div className="p-4 bg-slate-900/50 border-b border-border flex flex-wrap gap-4 text-xs font-mono text-slate-400">
          <div><span className="text-slate-500">DEVICE_ID:</span> SG-S-001</div>
          <div><span className="text-slate-500">CONNECTION:</span> SIMULATED ONLINE</div>
          <div><span className="text-slate-500">LAST_PACKET:</span> {timestamp}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono">
            <thead className="bg-surface/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Sensor</th>
                <th className="px-6 py-4 font-medium">Value</th>
                <th className="px-6 py-4 font-medium">Unit</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-slate-300">
              {displayData.map((row, index) => (
                <tr key={index} className="hover:bg-surface/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-blue-400">{row.sensor}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-white">{row.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">{row.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={row.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">{timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
