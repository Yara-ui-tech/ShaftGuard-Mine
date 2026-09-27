import { useEffect, useRef, useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { AlertTriangle, VolumeX, Volume2, Cpu, ShieldAlert, Users, Wind } from 'lucide-react';

export default function GlobalAlarm() {
  const { demoState, sensorData, airData, setDemoState } = useAppContext();
  const [isMuted, setIsMuted] = useState(true);
  const [countdown, setCountdown] = useState(15);
  const [aiActivated, setAiActivated] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sirenIntervalRef = useRef<number | null>(null);
  const warningBeepIntervalRef = useRef<number | null>(null);
  const speechIntervalRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);

  const stopAllAudio = useCallback(() => {
    if (sirenIntervalRef.current) { clearInterval(sirenIntervalRef.current); sirenIntervalRef.current = null; }
    if (warningBeepIntervalRef.current) { clearInterval(warningBeepIntervalRef.current); warningBeepIntervalRef.current = null; }
    if (speechIntervalRef.current) { clearInterval(speechIntervalRef.current); speechIntervalRef.current = null; }
    if (countdownRef.current) { clearInterval(countdownRef.current); countdownRef.current = null; }
    window.speechSynthesis?.cancel();
  }, []);

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playSiren = useCallback(() => {
    const ctx = getAudioCtx();
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    const makeOsc = (type: OscillatorType, f1: number, f2: number) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(f1, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(f2, ctx.currentTime + 0.2);
      osc.frequency.linearRampToValueAtTime(f1, ctx.currentTime + 0.4);
      osc.connect(gain);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.45);
    };
    makeOsc('sawtooth', 900, 1400);
    makeOsc('square', 945, 1470);
    makeOsc('sawtooth', 150, 100);
  }, [getAudioCtx]);

  const playWarningBeep = useCallback(() => {
    const ctx = getAudioCtx();
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 880;
    osc.connect(gain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
    // Double beep
    const gain2 = ctx.createGain();
    gain2.connect(ctx.destination);
    gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.25);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 880;
    osc2.connect(gain2);
    osc2.start(ctx.currentTime + 0.25);
    osc2.stop(ctx.currentTime + 0.4);
  }, [getAudioCtx]);

  const speakEvacuation = useCallback(() => {
    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();
    // prefer a "male" english voice for authority
    const preferred = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('male'))
                   || voices.find(v => v.lang.startsWith('en'))
                   || voices[0];
    
    const msgs = [
      'CRITICAL ALERT! CRITICAL ALERT! Dangerous conditions detected. All workers must evacuate the mine immediately. This is not a drill.',
      'EVACUATE NOW! EVACUATE NOW! Hazardous atmosphere and structural risk detected. Exit through the nearest emergency shaft immediately.'
    ];
    const text = msgs[Math.floor(Math.random() * msgs.length)];
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.85;
    utt.pitch = 0.7;
    utt.volume = 1.0;
    if (preferred) utt.voice = preferred;
    window.speechSynthesis.speak(utt);
  }, []);

  const speakWarning = useCallback(() => {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(
      'Warning! Elevated hazard conditions detected underground. Supervisors please review sensor readings and take immediate action.'
    );
    utt.rate = 0.9;
    utt.pitch = 1.0;
    utt.volume = 1.0;
    window.speechSynthesis.speak(utt);
  }, []);

  // Reset + drive all state changes from demoState
  useEffect(() => {
    stopAllAudio();
    setAiActivated(false);

    if (demoState === 'DANGER') {
      setCountdown(15);
      // Start countdown
      countdownRef.current = window.setInterval(() => {
        setCountdown(prev => {
          const next = prev - 1;
          if (next <= 0) {
            // AI Activates
            clearInterval(countdownRef.current!);
            countdownRef.current = null;
            setAiActivated(true);
            return 0;
          }
          return next;
        });
      }, 1000);

      // Start siren immediately if unmuted
      if (!isMuted) {
        sirenIntervalRef.current = window.setInterval(playSiren, 450);
      }
    } else if (demoState === 'WARNING') {
      // Start warning beep + speech immediately if unmuted
      if (!isMuted) {
        playWarningBeep();
        warningBeepIntervalRef.current = window.setInterval(playWarningBeep, 4000);
        // Speak warning immediately then repeat
        speakWarning();
        speechIntervalRef.current = window.setInterval(speakWarning, 12000);
      }
    }

    return stopAllAudio;
  }, [demoState]); // eslint-disable-line

  // Handle mute toggle reactively
  useEffect(() => {
    if (isMuted) {
      if (sirenIntervalRef.current) { clearInterval(sirenIntervalRef.current); sirenIntervalRef.current = null; }
      if (warningBeepIntervalRef.current) { clearInterval(warningBeepIntervalRef.current); warningBeepIntervalRef.current = null; }
      if (speechIntervalRef.current) { clearInterval(speechIntervalRef.current); speechIntervalRef.current = null; }
      window.speechSynthesis?.cancel();
    } else if (demoState === 'DANGER' && !aiActivated) {
      sirenIntervalRef.current = window.setInterval(playSiren, 450);
    } else if (demoState === 'WARNING') {
      playWarningBeep();
      warningBeepIntervalRef.current = window.setInterval(playWarningBeep, 4000);
      speakWarning();
      speechIntervalRef.current = window.setInterval(speakWarning, 12000);
    }
  }, [isMuted]); // eslint-disable-line

  // AI activation: switch from siren to voice announcements  
  useEffect(() => {
    if (!aiActivated || demoState !== 'DANGER') return;
    // Stop beep siren, start voice loop
    if (sirenIntervalRef.current) { clearInterval(sirenIntervalRef.current); sirenIntervalRef.current = null; }
    if (!isMuted) {
      speakEvacuation();
      speechIntervalRef.current = window.setInterval(speakEvacuation, 9000);
    }
  }, [aiActivated]); // eslint-disable-line

  if (demoState === 'NORMAL') return null;

  // ------ WARNING TOAST ------
  if (demoState === 'WARNING') {
    return (
      <div className="fixed top-24 right-8 z-[9000] w-96 animate-in slide-in-from-right-8 duration-300">
        <div className="bg-amber-950/95 border-2 border-amber-500 rounded-xl p-5 shadow-[0_0_40px_rgba(245,158,11,0.4)] backdrop-blur-md">
          <div className="flex items-start mb-3">
            <AlertTriangle className="w-7 h-7 text-amber-400 mr-3 mt-0.5 animate-pulse" />
            <div className="flex-1">
              <h3 className="text-white font-black text-lg leading-tight uppercase tracking-wider">Elevated Hazard Level</h3>
              <p className="text-amber-300/90 text-sm font-medium mt-0.5">Review parameters and take action.</p>
            </div>
            <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-white transition-colors ml-2">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-amber-400 animate-pulse" />}
            </button>
          </div>
          
          <div className="bg-black/40 rounded-lg p-3 mb-4 border border-slate-700">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center mb-2">
              <Cpu className="w-3 h-3 mr-1" /> AI Recommended Actions
            </h4>
            <ul className="text-sm text-slate-200 space-y-1.5">
              <li>• Increase ventilation output in Level 3 - East</li>
              <li>• Restrict personnel entry to affected zones</li>
              <li>• Inspect structural supports in Level 2 - South</li>
              <li>• Notify mine captain and surface safety officer</li>
              <li>• Prepare emergency rescue team for standby</li>
            </ul>
          </div>
          
          <button 
            onClick={() => { setDemoState('NORMAL'); stopAllAudio(); }}
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-lg transition-colors text-sm tracking-widest uppercase"
          >
            Acknowledge & Resolve
          </button>
        </div>
      </div>
    );
  }

  // ------ DANGER FULL-SCREEN ------
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto overflow-y-auto py-4">
      <div className="absolute inset-0 bg-black/92 backdrop-blur-lg"></div>
      <div className="absolute inset-0 animate-[pulse_0.8s_ease-in-out_infinite] border-[12px] border-red-600/70 pointer-events-none"></div>
      
      <div className="relative bg-[#0f0a0a] border-2 border-red-500 rounded-3xl p-6 md:p-8 max-w-4xl w-full mx-4 shadow-[0_0_150px_rgba(220,38,38,0.6)]">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-6">
           <div className={`p-4 rounded-full mb-4 ${aiActivated ? 'bg-red-500/30 animate-[pulse_0.5s_ease-in-out_infinite]' : 'bg-red-500/20 animate-bounce'}`}>
             <AlertTriangle className="w-16 md:w-20 h-16 md:h-20 text-red-500" />
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-center text-white mb-1 tracking-tighter">CRITICAL HAZARD</h1>
           {aiActivated ? (
             <p className="text-center text-red-300 font-black tracking-widest uppercase text-lg animate-pulse">
               🔊 AI BROADCASTING — EVACUATION IN PROGRESS
             </p>
           ) : (
             <p className="text-center text-red-400 font-black tracking-widest uppercase text-lg">Immediate Evacuation Required</p>
           )}
        </div>
        
        {/* Critical Parameters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Water Level', value: `${sensorData.waterLevel}%` },
            { label: 'Methane CH4', value: `${airData.methane}% LEL` },
            { label: 'CO Level', value: `${airData.carbonMonoxide} ppm` },
            { label: 'Risk Score', value: String(sensorData.riskScore), danger: true },
          ].map(p => (
            <div key={p.label} className="bg-red-950/60 border border-red-500/50 p-3 md:p-4 rounded-xl text-center">
              <div className="text-[10px] text-red-300 font-bold mb-1 uppercase">{p.label}</div>
              <div className={`text-2xl md:text-3xl font-black ${p.danger ? 'text-red-500' : 'text-white'}`}>{p.value}</div>
            </div>
          ))}
        </div>

        {/* AI Action Panel */}
        <div className="bg-slate-900/80 border-2 border-amber-500/60 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-amber-500 animate-pulse"></div>
          <div className="flex items-start ml-4 mb-4 md:mb-0 flex-1">
            <Cpu className="w-10 h-10 text-amber-400 mr-4 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-black text-white text-lg tracking-wide uppercase mb-2">AI Autonomous Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {[
                  [Users, 'Evacuation orders sent to all smart-helmets'],
                  [Wind, 'Maximum ventilation fans activated'],
                  [ShieldAlert, 'Surface command centre alerted'],
                  [Cpu, 'Heavy machinery power isolated'],
                  [ShieldAlert, 'High-risk ventilation zones sealed'],
                  [Cpu, 'Autonomous inspection drones dispatched'],
                  [Users, 'Emergency rescue services summoned'],
                  [Wind, 'Gas suppression system engaged'],
                ].map(([Icon, text], i) => (
                  <div key={i} className={`flex items-center text-xs font-medium ${aiActivated ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {/* @ts-ignore */}
                    <Icon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                    <span>{text as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center bg-black/60 p-4 rounded-xl border border-slate-700 w-full md:w-36 md:ml-4">
            <div className={`text-5xl font-black font-mono mb-1 ${
              countdown === 0 ? 'text-red-500 animate-pulse' : 
              countdown <= 5 ? 'text-red-400' : 'text-amber-500'
            }`}>{countdown === 0 ? 'AI ON' : `${countdown}s`}</div>
            <div className="text-[9px] text-slate-400 font-black tracking-widest uppercase">
              {countdown === 0 ? 'Broadcasting' : 'Until Autonomous Action'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="px-5 py-3 bg-red-950 border-2 border-red-800 hover:bg-red-900 text-white font-bold rounded-xl text-base transition-colors flex items-center justify-center"
          >
            {isMuted ? <Volume2 className="w-5 h-5 mr-2" /> : <VolumeX className="w-5 h-5 mr-2" />}
            {isMuted ? 'UNMUTE SIREN' : 'MUTE SIREN'}
          </button>
          <button 
            onClick={() => { setDemoState('WARNING'); stopAllAudio(); }}
            className="px-6 py-3 bg-slate-800 border-2 border-slate-600 hover:border-slate-400 text-white font-bold rounded-xl text-base transition-colors flex-1"
          >
            ACKNOWLEDGE — TAKE MANUAL CONTROL
          </button>
        </div>

        <p className="text-center mt-4 text-[10px] text-slate-600 font-black tracking-widest uppercase">
          SHAFTGUARD AI · AUTONOMOUS RESPONSE ENGINE
        </p>
      </div>
    </div>
  );
}
