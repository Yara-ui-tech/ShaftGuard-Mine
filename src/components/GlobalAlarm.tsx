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

      const playBeep = () => {
        if (!audioCtxRef.current) return;
        
        const osc = audioCtxRef.current.createOscillator();
        const gainNode = audioCtxRef.current.createGain();
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, audioCtxRef.current.currentTime);
        osc.frequency.setValueAtTime(1200, audioCtxRef.current.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.3);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);
        
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.3);
      };

      intervalRef.current = window.setInterval(playBeep, 500);

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
