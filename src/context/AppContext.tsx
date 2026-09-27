import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { DemoState, SensorData, WaterQualityData, Alert, AirQualityData, Worker, AiPrediction } from '../types';

interface AppContextType {
  demoState: DemoState;
  setDemoState: (state: DemoState) => void;
  sensorData: SensorData;
  waterData: WaterQualityData;
  airData: AirQualityData;
  workers: Worker[];
  predictions: AiPrediction[];
  alerts: Alert[];
  isPitchMode: boolean;
  setPitchMode: (mode: boolean) => void;
  isMqttLive: boolean;
  setMqttLive: (mode: boolean) => void;
  mqttStatus: string;
  isConfigured: boolean;
  setConfigured: (mode: boolean) => void;
}

const defaultSensorData: Record<DemoState, SensorData> = {
  NORMAL: {
    waterLevel: 23,
    vibration: 'LOW',
    tilt: 0.8,
    temperature: 28,
    humidity: 74,
    battery: 87,
    solarInput: 'ACTIVE',
    riskScore: 18,
    riskStatus: 'NORMAL',
  },
  WARNING: {
    waterLevel: 57,
    vibration: 'MEDIUM',
    tilt: 1.6,
    temperature: 29,
    humidity: 82,
    battery: 87,
    solarInput: 'ACTIVE',
    riskScore: 67,
    riskStatus: 'HIGH RISK',
  },
  DANGER: {
    waterLevel: 78,
    vibration: 'HIGH',
    tilt: 2.4,
    temperature: 30,
    humidity: 91,
    battery: 87,
    solarInput: 'ACTIVE',
    riskScore: 91,
    riskStatus: 'DANGER',
  }
};

const defaultWaterData: Record<DemoState, WaterQualityData> = {
  NORMAL: {
    waterLevel: 23,
    flowRate: 5,
    pH: 7.2,
    turbidity: 'LOW',
    conductivity: 'NORMAL',
    temperature: 22,
    waterStatus: 'NORMAL'
  },
  WARNING: {
    waterLevel: 57,
    flowRate: 12,
    pH: 6.5,
    turbidity: 'MEDIUM',
    conductivity: 'HIGH',
    temperature: 24,
    waterStatus: 'INVESTIGATE'
  },
  DANGER: {
    waterLevel: 78,
    flowRate: 25,
    pH: 5.8,
    turbidity: 'HIGH',
    conductivity: 'CRITICAL',
    temperature: 26,
    waterStatus: 'ABNORMAL'
  }
};

const defaultAirData: Record<DemoState, AirQualityData> = {
  NORMAL: {
    oxygen: 20.9,
    carbonMonoxide: 2,
    methane: 0.1,
    hydrogenSulfide: 0,
    airStatus: 'NORMAL'
  },
  WARNING: {
    oxygen: 19.5,
    carbonMonoxide: 25,
    methane: 1.2,
    hydrogenSulfide: 5,
    airStatus: 'INVESTIGATE'
  },
  DANGER: {
    oxygen: 18.0,
    carbonMonoxide: 60,
    methane: 2.5,
    hydrogenSulfide: 15,
    airStatus: 'ABNORMAL'
  }
};

const defaultWorkers: Record<DemoState, Worker[]> = {
  NORMAL: [
    { id: 'W-001', name: 'Tendai Mutasa', role: 'Miner', location: 'Level 2 - South', helmetStatus: 'ONLINE', areaStatus: 'NORMAL', lastSeen: 'Just now' },
    { id: 'W-002', name: 'James Chuma', role: 'Supervisor', location: 'Level 1 - Main', helmetStatus: 'ONLINE', areaStatus: 'NORMAL', lastSeen: 'Just now' },
    { id: 'W-003', name: 'Sarah Moyo', role: 'Ventilation Tech', location: 'Level 3 - East', helmetStatus: 'ONLINE', areaStatus: 'NORMAL', lastSeen: '2 min ago' },
    { id: 'W-004', name: 'Tafadzwa Ndlovu', role: 'Driller', location: 'Level 3 - East', helmetStatus: 'ONLINE', areaStatus: 'NORMAL', lastSeen: 'Just now' },
    { id: 'W-005', name: 'Grace Chirwa', role: 'Geologist', location: 'Level 3 - East', helmetStatus: 'ONLINE', areaStatus: 'NORMAL', lastSeen: '5 min ago' },
    { id: 'W-006', name: 'Peter Sibanda', role: 'Miner', location: 'Level 2 - South', helmetStatus: 'ONLINE', areaStatus: 'NORMAL', lastSeen: 'Just now' },
    { id: 'W-007', name: 'David Banda', role: 'Electrician', location: 'Level 1 - North', helmetStatus: 'ONLINE', areaStatus: 'NORMAL', lastSeen: '10 min ago' },
  ],
  WARNING: [
    { id: 'W-001', name: 'Tendai Mutasa', role: 'Miner', location: 'Level 2 - South', helmetStatus: 'WARNING', areaStatus: 'HIGH RISK', lastSeen: 'Just now' },
    { id: 'W-002', name: 'James Chuma', role: 'Supervisor', location: 'Level 1 - Main', helmetStatus: 'ONLINE', areaStatus: 'CAUTION', lastSeen: 'Just now' },
    { id: 'W-003', name: 'Sarah Moyo', role: 'Ventilation Tech', location: 'Level 3 - East', helmetStatus: 'WARNING', areaStatus: 'HIGH RISK', lastSeen: '5 min ago' },
    { id: 'W-004', name: 'Tafadzwa Ndlovu', role: 'Driller', location: 'Level 3 - East', helmetStatus: 'WARNING', areaStatus: 'HIGH RISK', lastSeen: 'Just now' },
    { id: 'W-005', name: 'Grace Chirwa', role: 'Geologist', location: 'Level 3 - East', helmetStatus: 'WARNING', areaStatus: 'HIGH RISK', lastSeen: '5 min ago' },
    { id: 'W-006', name: 'Peter Sibanda', role: 'Miner', location: 'Level 2 - South', helmetStatus: 'ONLINE', areaStatus: 'HIGH RISK', lastSeen: 'Just now' },
    { id: 'W-007', name: 'David Banda', role: 'Electrician', location: 'Level 1 - North', helmetStatus: 'ONLINE', areaStatus: 'NORMAL', lastSeen: '10 min ago' },
  ],
  DANGER: [
    { id: 'W-001', name: 'Tendai Mutasa', role: 'Miner', location: 'Level 2 - South', helmetStatus: 'WARNING', areaStatus: 'HIGH RISK', lastSeen: '1 min ago' },
    { id: 'W-002', name: 'James Chuma', role: 'Supervisor', location: 'Level 1 - Main', helmetStatus: 'ONLINE', areaStatus: 'HIGH RISK', lastSeen: 'Just now' },
    { id: 'W-003', name: 'Sarah Moyo', role: 'Ventilation Tech', location: 'Level 3 - East', helmetStatus: 'OFFLINE', areaStatus: 'DANGER', lastSeen: '15 min ago' },
    { id: 'W-004', name: 'Tafadzwa Ndlovu', role: 'Driller', location: 'Level 3 - East', helmetStatus: 'WARNING', areaStatus: 'DANGER', lastSeen: 'Just now' },
    { id: 'W-005', name: 'Grace Chirwa', role: 'Geologist', location: 'Level 3 - East', helmetStatus: 'WARNING', areaStatus: 'DANGER', lastSeen: '2 min ago' },
    { id: 'W-006', name: 'Peter Sibanda', role: 'Miner', location: 'Level 2 - South', helmetStatus: 'ONLINE', areaStatus: 'HIGH RISK', lastSeen: 'Just now' },
    { id: 'W-007', name: 'David Banda', role: 'Electrician', location: 'Level 1 - North', helmetStatus: 'ONLINE', areaStatus: 'NORMAL', lastSeen: '10 min ago' },
  ]
};

const defaultPredictions: Record<DemoState, AiPrediction[]> = {
  NORMAL: [
    { id: 'P-1', type: 'PRE-ENTRY', area: 'All Levels', prediction: 'Conditions stable. No immediate environmental risks detected.', confidence: 95, cautionMeasures: ['Proceed with standard safety checks', 'Ensure ventilation is active'], status: 'NORMAL' }
  ],
  WARNING: [
    { id: 'P-2', type: 'PRE-ENTRY', area: 'Level 2 - South', prediction: 'Rising CO levels and vibration suggest potential localized ground instability within 4-6 hours.', confidence: 78, cautionMeasures: ['Increase ventilation in Level 2', 'Limit personnel in South sector', 'Inspect supports'], status: 'HIGH RISK' }
  ],
  DANGER: [
    { id: 'P-3', type: 'PRE-ENTRY', area: 'Level 3 - East', prediction: 'Critical water level rise combined with methane accumulation. High probability of hazardous atmosphere.', confidence: 92, cautionMeasures: ['EVACUATE LEVEL 3 IMMEDIATELY', 'Halt all electrical equipment', 'Do not enter until cleared'], status: 'DANGER' }
  ]
};

const defaultAlerts: Record<DemoState, Alert[]> = {
  NORMAL: [],
  WARNING: [
    {
      id: 'alert-1',
      timestamp: new Date().toLocaleTimeString(),
      module: 'SHAFTGUARD-S',
      parameter: 'Multiple',
      reading: 'Various',
      riskScore: 67,
      status: 'HIGH RISK',
      action: 'Multiple abnormal sensor conditions detected. Investigation recommended.'
    }
  ],
  DANGER: [
    {
      id: 'alert-2',
      timestamp: new Date().toLocaleTimeString(),
      module: 'SHAFTGUARD-S',
      parameter: 'Water Level',
      reading: '78%',
      riskScore: 91,
      status: 'DANGER',
      action: 'Critical abnormal conditions detected. Follow established mine-safety procedures and investigate before underground access.'
    },
    {
      id: 'alert-3',
      timestamp: new Date(Date.now() - 300000).toLocaleTimeString(),
      module: 'SHAFTGUARD-W',
      parameter: 'pH & Turbidity',
      reading: '5.8 / HIGH',
      riskScore: 85,
      status: 'ABNORMAL',
      action: 'Investigate water quality. Source requires testing.'
    }
  ]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

import mqtt from 'mqtt';
import { useEffect } from 'react';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [demoState, setDemoState] = useState<DemoState>('NORMAL');
  const [isPitchMode, setPitchMode] = useState<boolean>(false);
  const [isConfigured, setConfigured] = useState<boolean>(false);
  
  // MQTT Integration
  const [isMqttLive, setMqttLive] = useState<boolean>(false);
  const [mqttStatus, setMqttStatus] = useState<'OFFLINE' | 'CONNECTING' | 'CONNECTED'>('OFFLINE');
  
  // Dynamic state that can be updated via MQTT
  const [liveSensorData, setLiveSensorData] = useState<SensorData>(defaultSensorData['NORMAL']);

  useEffect(() => {
    if (isMqttLive) {
      setMqttStatus('CONNECTING');
      const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

      client.on('connect', () => {
        setMqttStatus('CONNECTED');
        client.subscribe('shaftguard/sensor/#');
      });

      client.on('message', (topic, message) => {
        try {
          const payload = JSON.parse(message.toString());
          if (topic === 'shaftguard/sensor/telemetry') {
             // Expecting payload: { waterLevel, tilt, temperature, etc... }
             setLiveSensorData(prev => ({ ...prev, ...payload }));
          }
        } catch (e) {
          console.error("MQTT Message Parse Error", e);
        }
      });

      return () => {
        client.end();
        setMqttStatus('OFFLINE');
      };
    } else {
      setMqttStatus('OFFLINE');
      // Reset live sensor data to demo state when toggled off
      setLiveSensorData(defaultSensorData[demoState]);
    }
  }, [isMqttLive]);
  
  // Sync live data with demo state changes if not in live mode
  useEffect(() => {
    if (!isMqttLive) {
      setLiveSensorData(defaultSensorData[demoState]);
    }
  }, [demoState, isMqttLive]);

  const value = {
    demoState,
    setDemoState,
    sensorData: liveSensorData,
    waterData: defaultWaterData[demoState],
    airData: defaultAirData[demoState],
    workers: defaultWorkers[demoState],
    predictions: defaultPredictions[demoState],
    alerts: defaultAlerts[demoState],
    isPitchMode,
    setPitchMode,
    isMqttLive,
    setMqttLive,
    mqttStatus,
    isConfigured,
    setConfigured
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
