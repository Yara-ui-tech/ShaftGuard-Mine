import { useEffect, useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import DemoControls from '../components/DemoControls';
import { BrainCircuit, RefreshCw, Loader2, TrendingUp, AlertTriangle, CheckCircle2, Cpu, Clock, ShieldCheck, Zap } from 'lucide-react';
import { getAiPredictions } from '../services/openai';

interface PredictionResult {
  text: string;
  timestamp: string;
  state: string;
  confidence: number;
}

function RiskBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-slate-300 font-medium">{label}</span>
        <span className="text-xs font-black" style={{ color }}>{pct}%</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function AiPredictions() {
  const { predictions, demoState, sensorData, airData, workers } = useAppContext();
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const runPrediction = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const text = await getAiPredictions({
        waterLevel: sensorData.waterLevel,
        methane: airData.methane,
        carbonMonoxide: airData.carbonMonoxide,
        oxygen: airData.oxygen,
        hydrogenSulfide: airData.hydrogenSulfide,
        vibration: sensorData.vibration,
        tilt: sensorData.tilt,
        temperature: sensorData.temperature,
        humidity: sensorData.humidity,
        riskScore: sensorData.riskScore,
        state: demoState,
      });
      setPrediction({
        text,
        timestamp: new Date().toLocaleTimeString(),
        state: demoState,
        confidence: demoState === 'DANGER' ? 91 : demoState === 'WARNING' ? 76 : 94,
      });
    } catch {
      setError('Unable to reach AI engine. Check API key and network connectivity.');
    } finally {
      setLoading(false);
    }
  }, [sensorData, airData, demoState]);

  // Auto-run on state change
  useEffect(() => { runPrediction(); }, [demoState]); // eslint-disable-line

  // Risk factor bars
  const riskFactors = [
    { label: 'Gas Accumulation Risk',     pct: demoState === 'DANGER' ? 85 : demoState === 'WARNING' ? 48 : 12,  color: '#ef4444' },
    { label: 'Water Ingress Risk',        pct: demoState === 'DANGER' ? 78 : demoState === 'WARNING' ? 57 : 23,  color: '#3b82f6' },
    { label: 'Ground Stability Risk',     pct: demoState === 'DANGER' ? 62 : demoState === 'WARNING' ? 38 : 10,  color: '#f59e0b' },
    { label: 'Ventilation Failure Risk',  pct: demoState === 'DANGER' ? 55 : demoState === 'WARNING' ? 30 : 5,   color: '#a855f7' },
    { label: 'Equipment Failure Risk',    pct: demoState === 'DANGER' ? 44 : demoState === 'WARNING' ? 25 : 8,   color: '#f97316' },
    { label: 'Personnel Exposure Risk',   pct: demoState === 'DANGER' ? 90 : demoState === 'WARNING' ? 50 : 15,  color: '#ec4899' },
  ];

  const dangerWorkers = workers.filter(w => w.areaStatus === 'DANGER' || w.areaStatus === 'HIGH RISK');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <BrainCircuit className="w-7 h-7 text-purple-400" /> AI Hazard Predictions
          </h1>
          <p className="text-slate-400 text-sm mt-1">GPT-4o powered real-time hazard forecasting &amp; pre-shift analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-purple-900/20 border border-purple-500/30 px-3 py-1.5 rounded-md text-xs font-semibold text-purple-400">SHAFTGUARD-AI ENGINE</div>
        </div>
      </div>

      <DemoControls />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Risk Factor Analysis */}
        <div className="space-y-5">
          <div className="glass-panel p-6">
            <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Risk Factor Analysis
            </h2>
            <div className="space-y-4">
              {riskFactors.map(rf => (
                <RiskBar key={rf.label} label={rf.label} pct={rf.pct} color={rf.color} />
              ))}
            </div>
          </div>

          {/* Pre-entry scan summary */}
          <div className="glass-panel p-6">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Pre-Entry Scan
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Gas Levels',       ok: demoState === 'NORMAL' },
                { label: 'Water Level',      ok: demoState === 'NORMAL' },
                { label: 'Ground Stability', ok: demoState !== 'DANGER' },
                { label: 'Ventilation',      ok: true },
                { label: 'Structural Tilt',  ok: sensorData.tilt < 2 },
                { label: 'All Helmets Active', ok: workers.every(w => w.helmetStatus !== 'OFFLINE') },
              ].map(({ label, ok }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{label}</span>
                  <div className={`flex items-center gap-1.5 text-xs font-bold ${ok ? 'text-emerald-400' : 'text-red-400'}`}>
                    {ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    {ok ? 'CLEAR' : 'ALERT'}
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-4 p-3 rounded-xl text-center font-black text-sm ${
              demoState === 'NORMAL' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30' :
              demoState === 'WARNING' ? 'bg-amber-900/30 text-amber-400 border border-amber-500/30' :
              'bg-red-900/30 text-red-400 border border-red-500/30'
            }`}>
              {demoState === 'NORMAL' ? '✓ SAFE TO ENTER' : demoState === 'WARNING' ? '⚠ CAUTION — RESTRICTED ENTRY' : '✗ DO NOT ENTER — EVACUATE'}
            </div>
          </div>
        </div>

        {/* Center: GPT-4o Prediction */}
        <div className="lg:col-span-2 space-y-5">
          <div className={`glass-panel p-6 border-2 transition-all ${
            demoState === 'DANGER' ? 'border-red-500/50 bg-red-900/5' :
            demoState === 'WARNING' ? 'border-amber-500/40 bg-amber-900/5' :
            'border-purple-500/30'
          }`}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${demoState === 'DANGER' ? 'bg-red-900/40' : 'bg-purple-900/30'}`}>
                  <BrainCircuit className={`w-6 h-6 ${demoState === 'DANGER' ? 'text-red-400' : 'text-purple-400'}`} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">GPT-4o Hazard Forecast</h2>
                  <p className="text-xs text-slate-400">Live analysis based on current sensor readings</p>
                </div>
              </div>
              <button
                onClick={runPrediction}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/30 text-purple-400 font-bold rounded-xl transition-all text-sm disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                {loading ? 'Analyzing...' : 'Re-analyze'}
              </button>
            </div>

            {/* Confidence meter */}
            {prediction && (
              <div className="flex items-center gap-4 mb-5 p-3 bg-slate-900/50 rounded-xl border border-slate-700">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">AI Confidence</span>
                    <span className="text-xs font-black text-purple-400">{prediction.confidence}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-1000" style={{ width: `${prediction.confidence}%` }} />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[9px] text-slate-500 font-black uppercase">Last Updated</div>
                  <div className="text-xs text-white font-mono">{prediction.timestamp}</div>
                </div>
              </div>
            )}

            {/* AI output */}
            <div className={`min-h-[160px] p-5 rounded-2xl border ${
              demoState === 'DANGER' ? 'bg-red-950/40 border-red-500/30' :
              demoState === 'WARNING' ? 'bg-amber-950/30 border-amber-500/20' :
              'bg-slate-900/50 border-slate-700'
            }`}>
              {loading ? (
                <div className="flex flex-col items-center justify-center h-40 gap-4">
                  <div className="relative">
                    <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
                    <div className="absolute inset-0 animate-ping rounded-full border border-purple-400/30" />
                  </div>
                  <p className="text-slate-400 text-sm font-medium">ShaftGuard AI is analyzing {Object.keys(sensorData).length}+ parameters...</p>
                </div>
              ) : error ? (
                <div className="flex items-start gap-3 text-red-400">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm mb-1">AI Engine Unreachable</p>
                    <p className="text-xs text-slate-400">{error}</p>
                  </div>
                </div>
              ) : prediction ? (
                <div>
                  <div className={`inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-full border mb-4 ${
                    prediction.state === 'DANGER' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                    prediction.state === 'WARNING' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    <Zap className="w-3 h-3" /> LIVE PREDICTION · {prediction.state} STATE
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{prediction.text}</p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Static predictions from context */}
          <div className="glass-panel p-6">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" /> Contextual Hazard Models
            </h2>
            <div className="space-y-4">
              {predictions.map(pred => (
                <div key={pred.id} className={`p-4 rounded-xl border ${pred.status === 'DANGER' ? 'border-red-500/40 bg-red-950/20' : pred.status === 'HIGH RISK' ? 'border-amber-500/30 bg-amber-950/15' : 'border-slate-700 bg-slate-900/30'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black px-2 py-0.5 rounded border bg-blue-900/30 text-blue-400 border-blue-500/30">{pred.type}</span>
                      <span className="text-xs text-slate-400 font-medium">{pred.area}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-black text-slate-400">
                      <TrendingUp className="w-3 h-3" />{pred.confidence}% confidence
                    </div>
                  </div>
                  <p className="text-sm text-slate-200 font-medium mb-3">{pred.prediction}</p>
                  <div className="space-y-1">
                    {pred.cautionMeasures.map((m, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-blue-400 flex-shrink-0 mt-0.5" />{m}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workers at risk */}
          {dangerWorkers.length > 0 && (
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-2xl">
              <h3 className="text-sm font-black text-red-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 animate-pulse" /> {dangerWorkers.length} Workers in Elevated-Risk Zones
              </h3>
              <div className="flex flex-wrap gap-2">
                {dangerWorkers.map(w => (
                  <div key={w.id} className="text-xs font-bold bg-red-950/50 border border-red-700/40 text-red-300 px-3 py-1.5 rounded-xl">
                    {w.name} · <span className="text-red-400">{w.location}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
