import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { AlertTriangle, VolumeX, Volume2 } from 'lucide-react';

export default function GlobalAlarm() {
  const { demoState } = useAppContext();
  const [isMuted, setIsMuted] = useState(true); // Default muted to comply with browser autoplay policies
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (demoState === 'DANGER' && !isMuted) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const playSiren = () => {
        if (!audioCtxRef.current) return;
        
        const ctx = audioCtxRef.current;
        const gainNode = ctx.createGain();
        gainNode.connect(ctx.destination);
        
        // Master volume for the burst
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

        // Oscillator 1 - High pitch piercing sawtooth
        const osc1 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(900, ctx.currentTime);
        osc1.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.2);
        osc1.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.4);
        osc1.connect(gainNode);

        // Oscillator 2 - Dissonant square wave to make it grating
        const osc2 = ctx.createOscillator();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(945, ctx.currentTime); // Dissonant interval
        osc2.frequency.linearRampToValueAtTime(1470, ctx.currentTime + 0.2);
        osc2.frequency.linearRampToValueAtTime(945, ctx.currentTime + 0.4);
        osc2.connect(gainNode);
        
        // Oscillator 3 - Low rumble for urgency
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

      // Very fast pulsing siren
      intervalRef.current = window.setInterval(playSiren, 450);

      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }
  }, [demoState, isMuted]);

  if (demoState !== 'DANGER') return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[100] border-[8px] border-red-600/80 bg-red-900/10 animate-[pulse_1s_ease-in-out_infinite]"></div>
      
      <div className="fixed top-20 right-1/2 translate-x-1/2 z-[110] animate-bounce">
        <div className="bg-red-600 text-white px-6 py-3 rounded-full font-black text-xl flex items-center shadow-[0_0_30px_rgba(220,38,38,0.8)] border-2 border-red-400">
          <AlertTriangle className="w-8 h-8 mr-3 animate-pulse" />
          CRITICAL HAZARD DETECTED
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="ml-6 p-2 bg-red-800 rounded-full hover:bg-red-900 transition-colors pointer-events-auto"
            title={isMuted ? "Unmute Alarm" : "Mute Alarm"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </>
  );
}
