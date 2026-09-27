import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { AlertTriangle, VolumeX, Volume2, Cpu, ShieldAlert, Users, Wind, Info } from 'lucide-react';

export default function GlobalAlarm() {
  const { demoState, sensorData, airData, setDemoState } = useAppContext();
  const [isMuted, setIsMuted] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const warningIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (demoState === 'DANGER') {
      setCountdown(30);
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [demoState]);

  useEffect(() => {
    let speechInterval: number | null = null;
    
    if (demoState === 'DANGER' && countdown === 0) {
      const msg = new SpeechSynthesisUtterance("Critical conditions detected. Evacuate the mine immediately.");
      msg.rate = 0.9;
      msg.pitch = 0.8;
      
      const speak = () => {
        // Cancel any ongoing speech to prevent queuing up too many
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(msg);
      };
      
      speak(); // Speak immediately once it hits 0
      speechInterval = window.setInterval(speak, 6000); // Repeat every 6 seconds
    }
    
    return () => {
      if (speechInterval) clearInterval(speechInterval);
      window.speechSynthesis.cancel(); // Stop talking if state changes
    };
  }, [demoState, countdown]);

  useEffect(() => {
    // Clear any existing intervals
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    if (warningIntervalRef.current !== null) clearInterval(warningIntervalRef.current);

    if (demoState === 'NORMAL' || isMuted) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;

    const playSiren = () => {
      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(900, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.2);
      osc1.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.4);
      osc1.connect(gainNode);

      const osc2 = ctx.createOscillator();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(945, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(1470, ctx.currentTime + 0.2);
      osc2.frequency.linearRampToValueAtTime(945, ctx.currentTime + 0.4);
      osc2.connect(gainNode);
      
      const osc3 = ctx.createOscillator();
      osc3.type = 'sawtooth';
      osc3.frequency.setValueAtTime(150, ctx.currentTime);
      osc3.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.4);
      osc3.connect(gainNode);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc3.start(ctx.currentTime);
      
      osc1.stop(ctx.currentTime + 0.4);
      osc2.stop(ctx.currentTime + 0.4);
      osc3.stop(ctx.currentTime + 0.4);
    };

    const playWarningBeep = () => {
      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.connect(gainNode);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    };

    if (demoState === 'DANGER') {
      intervalRef.current = window.setInterval(playSiren, 450);
    } else if (demoState === 'WARNING') {
      // Play beep every 3 seconds for WARNING
      warningIntervalRef.current = window.setInterval(playWarningBeep, 3000);
      playWarningBeep(); // Play immediately once
    }

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      if (warningIntervalRef.current !== null) clearInterval(warningIntervalRef.current);
    };
  }, [demoState, isMuted]);

  if (demoState === 'NORMAL') return null;

  if (demoState === 'WARNING') {
    return (
      <div className="fixed top-24 right-8 z-[9000] w-96 animate-in slide-in-from-right-8 duration-300">
        <div className="bg-amber-950/90 border border-amber-500 rounded-xl p-5 shadow-[0_0_30px_rgba(245,158,11,0.3)] backdrop-blur-md">
          <div className="flex items-start mb-3">
            <AlertTriangle className="w-6 h-6 text-amber-500 mr-3 mt-0.5 animate-pulse" />
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg leading-tight">Elevated Hazard Level</h3>
              <p className="text-amber-400/80 text-sm font-medium">Please review parameters.</p>
            </div>
            <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-white transition-colors">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="bg-black/40 rounded-lg p-3 mb-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center mb-2">
              <Cpu className="w-3 h-3 mr-1 text-primary" /> AI Recommended Action
            </h4>
            <p className="text-sm text-slate-200">
              Increase ventilation in Level 2. Monitor structural convergence. Restrict personnel entry to affected zones.
            </p>
          </div>
          
          <button 
            onClick={() => setDemoState('NORMAL')}
            className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors text-sm"
          >
            ACKNOWLEDGE & RESOLVE
          </button>
        </div>
      </div>
    );
  }

  // DANGER Modal...
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-lg"></div>
      <div className="absolute inset-0 bg-red-900/20 animate-[pulse_1s_ease-in-out_infinite] border-[16px] border-red-600/60 pointer-events-none"></div>
      
      <div className="relative bg-surface border-2 border-red-500 rounded-3xl p-8 max-w-4xl w-full mx-4 shadow-[0_0_150px_rgba(220,38,38,0.5)]">
        <div className="flex flex-col items-center justify-center mb-8">
           <div className="bg-red-500/20 p-4 rounded-full mb-4 animate-bounce">
             <AlertTriangle className="w-20 h-20 text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,1)]" />
           </div>
           <h1 className="text-5xl md:text-6xl font-black text-center text-white mb-2 tracking-tighter">CRITICAL HAZARD</h1>
           <p className="text-center text-red-400 font-black tracking-widest uppercase text-xl">Immediate Evacuation Recommended</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
           <div className="bg-red-950/60 border border-red-500/50 p-4 rounded-xl text-center shadow-inner">
              <div className="text-xs text-red-300 font-bold mb-1 uppercase">Water Level</div>
              <div className="text-3xl font-black text-white">{sensorData.waterLevel}%</div>
           </div>
           <div className="bg-red-950/60 border border-red-500/50 p-4 rounded-xl text-center shadow-inner">
              <div className="text-xs text-red-300 font-bold mb-1 uppercase">Methane (CH4)</div>
              <div className="text-3xl font-black text-white">{airData.methane}%</div>
           </div>
           <div className="bg-red-950/60 border border-red-500/50 p-4 rounded-xl text-center shadow-inner">
              <div className="text-xs text-red-300 font-bold mb-1 uppercase">CO Level</div>
              <div className="text-3xl font-black text-white">{airData.carbonMonoxide}ppm</div>
           </div>
           <div className="bg-red-950/60 border border-red-500/50 p-4 rounded-xl text-center shadow-inner">
              <div className="text-xs text-red-300 font-bold mb-1 uppercase">Risk Score</div>
              <div className="text-3xl font-black text-red-500">{sensorData.riskScore}</div>
           </div>
        </div>

        <div className="bg-slate-900 border-2 border-amber-500/50 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-2 bg-amber-500 animate-pulse"></div>
            <div className="flex items-center text-amber-500 mb-4 md:mb-0 ml-4">
                <Cpu className="w-12 h-12 mr-5" />
                <div>
                   <h3 className="font-black text-white text-xl tracking-wide uppercase">AI Autonomous Override</h3>
                   <ul className="text-sm text-slate-300 mt-2 space-y-1 font-medium">
                     <li className="flex items-center"><Users className="w-4 h-4 mr-2 text-primary" /> Evacuation orders to all smart-helmets</li>
                     <li className="flex items-center"><Wind className="w-4 h-4 mr-2 text-primary" /> Maximum ventilation fan activation</li>
                     <li className="flex items-center"><ShieldAlert className="w-4 h-4 mr-2 text-primary" /> Surface command center notified</li>
                     <li className="flex items-center"><Cpu className="w-4 h-4 mr-2 text-primary" /> Isolate power to heavy machinery (prevent sparks)</li>
                     <li className="flex items-center"><ShieldAlert className="w-4 h-4 mr-2 text-primary" /> Seal off high-risk ventilation zones</li>
                     <li className="flex items-center"><Cpu className="w-4 h-4 mr-2 text-primary" /> Dispatch autonomous inspection drones</li>
                     <li className="flex items-center"><Users className="w-4 h-4 mr-2 text-primary" /> Summon emergency rescue services</li>
                   </ul>
                </div>
            </div>
            <div className="text-center md:text-right bg-black/50 p-4 rounded-xl border border-slate-700 w-full md:w-auto">
                <div className="text-5xl font-black text-amber-500 font-mono mb-1">{countdown}s</div>
                <div className="text-[10px] text-slate-400 font-black tracking-widest uppercase">Until Autonomous Action</div>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
           <button 
             onClick={() => setIsMuted(!isMuted)} 
             className="px-6 py-4 bg-red-950 border-2 border-red-800 hover:bg-red-900 text-white font-bold rounded-xl text-lg transition-colors flex items-center justify-center w-full sm:w-auto"
           >
              {isMuted ? <Volume2 className="w-6 h-6 mr-3" /> : <VolumeX className="w-6 h-6 mr-3" />} 
              {isMuted ? "UNMUTE SIREN" : "MUTE SIREN"}
           </button>
           <button 
             onClick={() => setDemoState('WARNING')}
             className="px-8 py-4 bg-surface border-2 border-slate-600 hover:border-slate-400 text-white font-bold rounded-xl text-lg transition-colors flex-1 shadow-lg"
           >
              ACKNOWLEDGE & DOWNGRADE TO WARNING
           </button>
        </div>
      </div>
    </div>
  );
}
