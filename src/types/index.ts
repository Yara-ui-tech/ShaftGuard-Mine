export type RiskStatus = 'NORMAL' | 'CAUTION' | 'HIGH RISK' | 'DANGER';
export type ComponentStatus = 'NORMAL' | 'INVESTIGATE' | 'ABNORMAL' | 'ACTIVE';

export interface SensorData {
  waterLevel: number;
  vibration: 'LOW' | 'MEDIUM' | 'HIGH';
  tilt: number;
  temperature: number;
  humidity: number;
  battery: number;
  solarInput: ComponentStatus;
  riskScore: number;
  riskStatus: RiskStatus;
}

export interface WaterQualityData {
  waterLevel: number;
  flowRate: number;
  pH: number;
  turbidity: 'LOW' | 'MEDIUM' | 'HIGH';
  conductivity: 'NORMAL' | 'HIGH' | 'CRITICAL';
  temperature: number;
  waterStatus: ComponentStatus;
}

export interface Alert {
  id: string;
  timestamp: string;
  module: string;
  parameter: string;
  reading: string;
  riskScore: number;
  status: RiskStatus | ComponentStatus;
  action: string;
}

export interface AirQualityData {
  oxygen: number; // %
  carbonMonoxide: number; // ppm
  methane: number; // % LEL
  hydrogenSulfide: number; // ppm
  airStatus: ComponentStatus;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  location: string;
  helmetStatus: 'ONLINE' | 'OFFLINE' | 'WARNING';
  areaStatus: RiskStatus;
  lastSeen: string;
}

export interface AiPrediction {
  id: string;
  type: 'PRE-ENTRY' | 'CONTINUOUS';
  area: string;
  prediction: string;
  confidence: number;
  cautionMeasures: string[];
  status: RiskStatus;
}

export type DemoState = 'NORMAL' | 'WARNING' | 'DANGER';
