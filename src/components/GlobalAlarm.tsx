import { useEffect, useRef, useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import {
  AlertTriangle, VolumeX, Volume2, Cpu, ShieldAlert,
  Users, Wind, Loader2, RefreshCw, MapPin, Thermometer,
  Droplets, Activity, Zap
} from 'lucide-react';
import { getAiWarningActions } from '../services/openai';

// ─── helpers ──────────────────────────────────────────────────────────────────

function speakFull(text: string): Promise<void> {
  return new Promise(resolve => {
    // Cancel anything currently playing then wait a tick
    window.speechSynthesis.cancel();
    setTimeout(() => {
      const voices = window.speechSynthesis.getVoices();
      const voice =
        voices.find(v => v.lang.startsWith('en') && /male/i.test(v.name)) ||
        voices.find(v => v.lang.startsWith('en-GB')) ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices[0];

      const utt = new SpeechSynthesisUtterance(text);
      utt.rate   = 0.8;   // slower = clearer
      utt.pitch  = 0.65;  // low authority
      utt.volume = 1.0;
      if (voice) utt.voice = voice;
      utt.onend   = () => resolve();
      utt.onerror = () => resolve();
      window.speechSynthesis.speak(utt);
    }, 80);
  });
}

/** Repeat speaking text with `gap` ms between each utterance. Returns a cancel fn. */
function repeatSpeak(text: string, gapMs: number): () => void {
  let cancelled = false;
  async function loop() {
    while (!cancelled) {
      await speakFull(text);
      if (cancelled) break;
      await new Promise(r => setTimeout(r, gapMs));
    }
  }
  loop();
  return () => { cancelled = true; window.speechSynthesis.cancel(); };
}

/** Warning repeat: two different messages alternating */
function repeatSpeakWarning(msg1: string, msg2: string, gapMs: number): () => void {
  let cancelled = false;
  let toggle = false;
  async function loop() {
    while (!cancelled) {
      const msg = toggle ? msg2 : msg1;
      toggle = !toggle;
      await speakFull(msg);
      if (cancelled) break;
      await new Promise(r => setTimeout(r, gapMs));
    }
  }
  loop();
  return () => { cancelled = true; window.speechSynthesis.cancel(); };
}

// ─── component ────────────────────────────────────────────────────────────────

export default function GlobalAlarm() {
  const { demoState, sensorData, airData, workers, setDemoState } = useAppContext();
  const [isMuted, setIsMuted]       = useState(true);
  const [countdown, setCountdown]   = useState(15);
  const [aiActivated, setAiActivated] = useState(false);
  const [aiActions, setAiActions]   = useState<string[]>([]);
  const [aiLoading, setAiLoading]   = useState(false);

  const audioCtxRef    = useRef<AudioContext | null>(null);
  const sirenRef       = useRef<number | null>(null);
  const beepRef        = useRef<number | null>(null);
  const countdownRef   = useRef<number | null>(null);
  const cancelSpeakRef = useRef<(() => void) | null>(null);

  // Derived: workers in danger zones
  const dangerWorkers  = workers.filter(w => w.areaStatus === 'DANGER');
  const warningWorkers = workers.filter(w => w.areaStatus === 'HIGH RISK' || w.areaStatus === 'CAUTION');
  const criticalZones  = [...new Set(dangerWorkers.map(w => w.location))];

  const stopAll = useCallback(() => {
    if (sirenRef.current)     { clearInterval(sirenRef.current); sirenRef.current = null; }
    if (beepRef.current)      { clearInterval(beepRef.current);  beepRef.current  = null; }
    if (countdownRef.current) { clearInterval(countdownRef.current); countdownRef.current = null; }
    if (cancelSpeakRef.current) { cancelSpeakRef.current(); cancelSpeakRef.current = null; }
  }, []);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed')
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  const playSiren = useCallback(() => {
    const ctx = getCtx();
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.42);
    const osc = (type: OscillatorType, f1: number, f2: number) => {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.setValueAtTime(f1, ctx.currentTime);
      o.frequency.linearRampToValueAtTime(f2, ctx.currentTime + 0.21);
      o.frequency.linearRampToValueAtTime(f1, ctx.currentTime + 0.42);
      o.connect(gain); o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.45);
    };
    osc('sawtooth', 900, 1400);
    osc('square', 945, 1470);
    osc('sawtooth', 150, 100);
  }, [getCtx]);

  const playBeep = useCallback(() => {
    const ctx = getCtx();
    [0, 0.28].forEach(off => {
      const g = ctx.createGain();
      g.connect(ctx.destination);
      g.gain.setValueAtTime(0.28, ctx.currentTime + off);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + off + 0.16);
      const o = ctx.createOscillator();
      o.type = 'sine'; o.frequency.value = 880;
      o.connect(g); o.start(ctx.currentTime + off); o.stop(ctx.currentTime + off + 0.18);
    });
  }, [getCtx]);

  const fetchAiActions = useCallback(async (state: 'WARNING' | 'DANGER') => {
    setAiLoading(true);
    try {
      const actions = await getAiWarningActions({
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
        state,
      });
      setAiActions(actions);
    } catch {
      setAiActions(['Unable to reach AI. Apply standard mine emergency protocols immediately.']);
    } finally {
      setAiLoading(false);
    }
  }, [sensorData, airData]);

  // ── Danger voice message
  const dangerMsg = [
    'CRITICAL ALERT. CRITICAL ALERT.',
    `Dangerous conditions detected in the mine.`,
    criticalZones.length
      ? `Critical zones identified: ${criticalZones.join(', ')}.`
      : '',
    dangerWorkers.length
      ? `${dangerWorkers.length} workers are in danger. Evacuation is mandatory.`
      : '',
    `Water level is at ${sensorData.waterLevel} percent.`,
    `Methane concentration is at ${airData.methane} percent of lower explosive limit.`,
    `Carbon monoxide is at ${airData.carbonMonoxide} parts per million.`,
    `Risk score is ${sensorData.riskScore} out of 100.`,
    'ALL WORKERS MUST EVACUATE THE MINE IMMEDIATELY. This is not a drill. Exit through the nearest emergency shaft now.',
  ].filter(Boolean).join(' ');

  const warningMsg1 =
    `Warning! Elevated hazard conditions detected underground. ` +
    `Water level at ${sensorData.waterLevel} percent. ` +
    `Methane at ${airData.methane} percent. ` +
    `Risk score ${sensorData.riskScore}. ` +
    `Supervisors: review sensor readings and take immediate action.`;

  const warningMsg2 =
    `Attention all personnel. Abnormal sensor readings detected. ` +
    `Carbon monoxide level is ${airData.carbonMonoxide} parts per million. ` +
    `Oxygen level is ${airData.oxygen} percent. ` +
    `Restrict entry to high-risk zones and notify the mine captain immediately.`;

  // ── Main effect on demoState change
  useEffect(() => {
    stopAll();
    setAiActivated(false);
    setAiActions([]);

    if (demoState === 'DANGER') {
      setCountdown(15);
      fetchAiActions('DANGER');
      countdownRef.current = window.setInterval(() => {
        setCountdown(prev => {
          const next = prev - 1;
          if (next <= 0) {
            clearInterval(countdownRef.current!);
            countdownRef.current = null;
            setAiActivated(true);
            return 0;
          }
          return next;
        });
      }, 1000);
      if (!isMuted) sirenRef.current = window.setInterval(playSiren, 450);

    } else if (demoState === 'WARNING') {
      fetchAiActions('WARNING');
      if (!isMuted) {
        playBeep();
        beepRef.current = window.setInterval(playBeep, 4500);
        cancelSpeakRef.current = repeatSpeakWarning(warningMsg1, warningMsg2, 2000);
      }
    }

    return stopAll;
  }, [demoState]); // eslint-disable-line

  // ── When mute toggles
  useEffect(() => {
    if (isMuted) {
      if (sirenRef.current)  { clearInterval(sirenRef.current); sirenRef.current = null; }
      if (beepRef.current)   { clearInterval(beepRef.current);  beepRef.current  = null; }
      if (cancelSpeakRef.current) { cancelSpeakRef.current(); cancelSpeakRef.current = null; }
    } else {
      if (demoState === 'DANGER' && !aiActivated) {
        sirenRef.current = window.setInterval(playSiren, 450);
      } else if (demoState === 'DANGER' && aiActivated) {
        if (cancelSpeakRef.current) cancelSpeakRef.current();
        cancelSpeakRef.current = repeatSpeak(dangerMsg, 2500);
      } else if (demoState === 'WARNING') {
        playBeep();
        beepRef.current = window.setInterval(playBeep, 4500);
        cancelSpeakRef.current = repeatSpeakWarning(warningMsg1, warningMsg2, 2000);
      }
    }
  }, [isMuted]); // eslint-disable-line

  // ── When AI activates (countdown hit 0)
  useEffect(() => {
    if (!aiActivated || demoState !== 'DANGER') return;
    if (sirenRef.current) { clearInterval(sirenRef.current); sirenRef.current = null; }
    if (!isMuted) {
      if (cancelSpeakRef.current) cancelSpeakRef.current();
      cancelSpeakRef.current = repeatSpeak(dangerMsg, 2500);
    }
  }, [aiActivated]); // eslint-disable-line

  if (demoState === 'NORMAL') return null;

  // ═══════════════════════════════════════════════════════════════
  // WARNING TOAST
  // ═══════════════════════════════════════════════════════════════
  if (demoState === 'WARNING') {
    return (
      <div className="fixed top-24 right-6 z-[9000] w-[440px] animate-in slide-in-from-right-8 duration-300">
        <div className="bg-amber-950/96 border-2 border-amber-500 rounded-2xl p-5 shadow-[0_0_40px_rgba(245,158,11,0.4)] backdrop-blur-md">
          {/* Header */}
          <div className="flex items-start mb-4">
            <AlertTriangle className="w-7 h-7 text-amber-400 mr-3 mt-0.5 animate-pulse flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-white font-black text-lg leading-tight uppercase tracking-wider">⚠ Elevated Hazard Level</h3>
              <p className="text-amber-300/90 text-xs mt-0.5 font-medium">Act immediately — do not ignore this alert.</p>
            </div>
            <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-white transition-colors ml-2 flex-shrink-0">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-amber-400 animate-pulse" />}
            </button>
          </div>

          {/* Quick parameter summary */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { icon: Droplets, label: 'Water', value: `${sensorData.waterLevel}%`, warn: sensorData.waterLevel > 50 },
              { icon: Wind,     label: 'CH4',   value: `${airData.methane}%`,        warn: airData.methane > 0.5 },
              { icon: Activity, label: 'CO',    value: `${airData.carbonMonoxide}ppm`, warn: airData.carbonMonoxide > 20 },
              { icon: Zap,      label: 'O₂',    value: `${airData.oxygen}%`,         warn: airData.oxygen < 20 },
              { icon: Thermometer, label: 'Temp', value: `${sensorData.temperature}°C`, warn: false },
              { icon: ShieldAlert,  label: 'Risk', value: `${sensorData.riskScore}/100`, warn: true },
            ].map(({ icon: Icon, label, value, warn }) => (
              <div key={label} className={`text-center p-2 rounded-lg border ${warn ? 'border-amber-500/60 bg-amber-900/30' : 'border-slate-700 bg-slate-900/40'}`}>
                <Icon className={`w-3 h-3 mx-auto mb-0.5 ${warn ? 'text-amber-400' : 'text-slate-400'}`} />
                <div className="text-[9px] text-slate-500 uppercase font-bold">{label}</div>
                <div className={`text-sm font-black ${warn ? 'text-amber-300' : 'text-slate-300'}`}>{value}</div>
              </div>
            ))}
          </div>

          {/* Workers at risk */}
          {warningWorkers.length > 0 && (
            <div className="mb-4 p-2.5 bg-amber-900/20 border border-amber-500/30 rounded-lg">
              <p className="text-xs font-bold text-amber-400 flex items-center mb-1">
                <Users className="w-3 h-3 mr-1" /> {warningWorkers.length} Workers in Elevated-Risk Zones
              </p>
              <div className="flex flex-wrap gap-1">
                {warningWorkers.map(w => (
                  <span key={w.id} className="text-[10px] bg-amber-900/40 text-amber-300 border border-amber-700/40 px-2 py-0.5 rounded-full">{w.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* AI Actions */}
          <div className="bg-black/40 rounded-xl p-3 mb-4 border border-slate-700 min-h-[90px]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center">
                <Cpu className="w-3 h-3 mr-1" /> AI Recommended Actions
              </h4>
              <button onClick={() => fetchAiActions('WARNING')} className="text-slate-500 hover:text-amber-400 transition-colors">
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
            {aiLoading ? (
              <div className="flex items-center text-slate-400 text-sm">
                <Loader2 className="w-4 h-4 mr-2 animate-spin text-amber-500" /> Analyzing conditions...
              </div>
            ) : (
              <ul className="text-sm text-slate-200 space-y-1">
                {aiActions.length > 0 ? aiActions.map((a, i) => (
                  <li key={i} className="flex items-start text-xs">
                    <span className="text-amber-400 mr-1.5 font-black flex-shrink-0">{i + 1}.</span>{a}
                  </li>
                )) : <li className="text-slate-500 italic text-xs">Awaiting AI analysis...</li>}
              </ul>
            )}
          </div>

          <button
            onClick={() => { setDemoState('NORMAL'); stopAll(); }}
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-xl transition-colors text-sm tracking-widest uppercase"
          >
            Acknowledge & Resolve
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // DANGER FULL-SCREEN
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto overflow-y-auto py-4 px-4">
      <div className="absolute inset-0 bg-black/93 backdrop-blur-lg" />
      <div className="absolute inset-0 animate-[pulse_0.8s_ease-in-out_infinite] border-[10px] border-red-600/70 pointer-events-none" />

      <div className="relative bg-[#0f0a0a] border-2 border-red-600 rounded-3xl p-6 md:p-8 max-w-5xl w-full shadow-[0_0_200px_rgba(220,38,38,0.6)]">

        {/* ── Title ── */}
        <div className="flex flex-col items-center mb-6">
          <div className={`p-3 rounded-full mb-3 ${aiActivated ? 'bg-red-500/30 animate-[pulse_0.5s_ease-in-out_infinite]' : 'bg-red-500/20 animate-bounce'}`}>
            <AlertTriangle className="w-16 h-16 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,1)]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-center text-white tracking-tighter mb-1">CRITICAL HAZARD</h1>
          {aiActivated ? (
            <div className="flex items-center gap-2 animate-pulse">
              <Volume2 className="w-5 h-5 text-red-400" />
              <p className="text-red-300 font-black tracking-widest uppercase text-lg">AI BROADCASTING — EVACUATION IN PROGRESS</p>
            </div>
          ) : (
            <p className="text-red-400 font-black tracking-widest uppercase text-lg">Immediate Evacuation Required</p>
          )}
        </div>

        {/* ── All Critical Sensor Parameters ── */}
        <div className="mb-5">
          <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Critical Parameters</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { label: 'Water Level',  value: `${sensorData.waterLevel}%`,          level: 'critical' },
              { label: 'Methane CH4',  value: `${airData.methane}% LEL`,             level: 'critical' },
              { label: 'CO',           value: `${airData.carbonMonoxide} ppm`,        level: 'critical' },
              { label: 'Oxygen O₂',   value: `${airData.oxygen}%`,                  level: airData.oxygen < 19.5 ? 'critical' : 'warn' },
              { label: 'H₂S',         value: `${airData.hydrogenSulfide} ppm`,       level: airData.hydrogenSulfide > 10 ? 'critical' : 'warn' },
              { label: 'Vibration',   value: sensorData.vibration,                   level: sensorData.vibration === 'HIGH' ? 'critical' : 'warn' },
              { label: 'Shaft Tilt',  value: `${sensorData.tilt}°`,                  level: sensorData.tilt > 2 ? 'critical' : 'warn' },
              { label: 'Temperature', value: `${sensorData.temperature}°C`,          level: 'normal' },
              { label: 'Humidity',    value: `${sensorData.humidity}%`,              level: sensorData.humidity > 85 ? 'warn' : 'normal' },
              { label: 'Risk Score',  value: `${sensorData.riskScore}/100`,          level: 'critical' },
              { label: 'Flow Rate',   value: 'SURGE',                                level: 'critical' },
              { label: 'pH',          value: `${5.8}`,                               level: 'warn' },
            ].map(p => {
              const bg    = p.level === 'critical' ? 'bg-red-950/70 border-red-500/70' : p.level === 'warn' ? 'bg-amber-950/50 border-amber-600/50' : 'bg-slate-900/50 border-slate-700';
              const color = p.level === 'critical' ? 'text-red-400' : p.level === 'warn' ? 'text-amber-300' : 'text-slate-300';
              return (
                <div key={p.label} className={`border rounded-xl p-2.5 text-center ${bg}`}>
                  <div className="text-[9px] text-slate-500 font-bold uppercase mb-0.5">{p.label}</div>
                  <div className={`text-base font-black ${color}`}>{p.value}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Critical Zones & Workers ── */}
        {(criticalZones.length > 0 || dangerWorkers.length > 0) && (
          <div className="mb-5 p-4 bg-red-900/25 border border-red-600/50 rounded-2xl">
            <h3 className="text-[10px] text-red-400 font-black uppercase tracking-widest mb-3 flex items-center">
              <MapPin className="w-3 h-3 mr-1" /> Critical Zones &amp; Personnel at Risk
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-slate-400 font-bold mb-1.5">Danger Zones</p>
                {criticalZones.length > 0 ? criticalZones.map(z => (
                  <div key={z} className="flex items-center text-sm text-red-300 font-bold mb-1">
                    <MapPin className="w-3.5 h-3.5 mr-2 flex-shrink-0 text-red-500 animate-pulse" />{z}
                  </div>
                )) : <p className="text-slate-500 text-xs">All zones elevated</p>}
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold mb-1.5">{dangerWorkers.length} Workers in Danger Zone{dangerWorkers.length !== 1 ? 's' : ''}</p>
                <div className="flex flex-wrap gap-1.5">
                  {dangerWorkers.map(w => (
                    <div key={w.id} className="flex items-center bg-red-900/50 border border-red-700/50 px-2 py-1 rounded-lg">
                      <Users className="w-3 h-3 mr-1.5 text-red-400" />
                      <span className="text-xs font-bold text-white">{w.name}</span>
                      <span className="text-[9px] text-red-400 ml-1.5 font-medium">({w.location})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── AI Actions + Countdown ── */}
        <div className="mb-5 bg-slate-900/80 border-2 border-amber-500/60 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-amber-500 animate-pulse" />
          <div className="flex items-center justify-between mb-3 ml-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-white text-base uppercase tracking-wide">AI Autonomous Actions</h3>
              <button onClick={() => fetchAiActions('DANGER')} className="text-slate-600 hover:text-amber-400 transition-colors">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="bg-black/60 px-5 py-2 rounded-xl border border-slate-700 text-center">
              <div className={`text-3xl font-black font-mono ${
                countdown === 0 ? 'text-red-500 animate-pulse' : countdown <= 5 ? 'text-red-400 animate-pulse' : 'text-amber-500'
              }`}>{countdown === 0 ? 'AI ON' : `${countdown}s`}</div>
              <div className="text-[9px] text-slate-400 font-black tracking-widest">
                {countdown === 0 ? 'BROADCASTING' : 'Until Override'}
              </div>
            </div>
          </div>
          <div className="ml-4 min-h-[70px]">
            {aiLoading ? (
              <div className="flex items-center text-slate-400 text-sm gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-500" /> ShaftGuard AI analyzing critical conditions...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {(aiActions.length > 0 ? aiActions : [
                  'Evacuation orders sent to all smart-helmets',
                  'Maximum ventilation fans activated',
                  'Surface command centre alerted',
                  'Heavy machinery power isolated',
                  'High-risk ventilation zones sealed',
                  'Autonomous inspection drones dispatched',
                  'Emergency rescue services summoned',
                  'Gas suppression system engaged',
                ]).map((action, i) => (
                  <div key={i} className={`flex items-start text-sm ${aiActivated ? 'text-emerald-400' : 'text-slate-300'}`}>
                    <span className="text-amber-400 mr-2 font-black flex-shrink-0">{i + 1}.</span>
                    <span className="font-medium">{action}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="px-5 py-3.5 bg-red-950 border-2 border-red-700 hover:bg-red-900 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isMuted ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            {isMuted ? 'UNMUTE AI BROADCAST' : 'MUTE'}
          </button>
          <button
            onClick={() => { setDemoState('WARNING'); stopAll(); }}
            className="px-6 py-3.5 bg-slate-800 border-2 border-slate-600 hover:border-amber-500 text-white font-bold rounded-xl transition-colors flex-1"
          >
            ACKNOWLEDGE — TAKE MANUAL CONTROL
          </button>
        </div>
        <p className="text-center mt-4 text-[9px] text-slate-700 font-black tracking-widest uppercase">
          SHAFTGUARD AI · GPT-4o AUTONOMOUS RESPONSE ENGINE
        </p>
      </div>
    </div>
  );
}
