import { Hand } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function TutorialOverlay() {
  const { demoState, isPitchMode } = useAppContext();
  
  // Hide if not normal state or if in pitch mode
  if (demoState !== 'NORMAL' || isPitchMode) return null;

  return (
    <div className="fixed left-64 top-32 z-[100] pointer-events-none hidden lg:block">
       <div className="relative">
          {/* Floating box */}
          <div className="bg-blue-600 text-white p-4 rounded-xl shadow-2xl max-w-xs animate-bounce ml-16 border-2 border-blue-400">
             <h3 className="font-bold text-lg mb-1">Try the Demo!</h3>
             <p className="text-sm text-blue-100">
               Judges: Click <strong>WARNING</strong> or <strong>DANGER</strong> here in the sidebar to simulate a live hazard and watch the AI autonomous system react.
             </p>
             {/* Left pointing triangle */}
             <div className="absolute top-6 -left-4 w-0 h-0 border-t-[12px] border-t-transparent border-r-[18px] border-r-blue-600 border-b-[12px] border-b-transparent"></div>
          </div>
          {/* Pointing Hand */}
          <div className="absolute top-8 -left-4 text-white animate-pulse">
             <Hand className="w-16 h-16 -rotate-90 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" fill="currentColor" />
          </div>
       </div>
    </div>
  );
}
