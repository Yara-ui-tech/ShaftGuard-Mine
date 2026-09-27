import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ShieldAlert, Pickaxe, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SetupWizard() {
  const { setConfigured } = useAppContext();
  const [step, setStep] = useState(1);
  const [selectedMinerals, setSelectedMinerals] = useState<string[]>([]);

  const minerals = [
    'Gold (Au)', 'Coal', 'Copper (Cu)', 'Platinum (Pt)', 
    'Diamonds', 'Lithium', 'Chrome', 'Iron Ore'
  ];

  const handleMineralToggle = (mineral: string) => {
    setSelectedMinerals(prev => 
      prev.includes(mineral) ? prev.filter(m => m !== mineral) : [...prev, mineral]
    );
  };

  const getAiRecommendations = () => {
    let recommendations = [
      { name: 'Basic Shaft Safety (Tilt, Vibration)', required: true },
      { name: 'Water Level Monitoring', required: true }
    ];

    if (selectedMinerals.includes('Coal')) {
      recommendations.push({ name: 'Methane (CH4) Detection', required: true });
      recommendations.push({ name: 'Coal Dust Particulates (PM10)', required: true });
      recommendations.push({ name: 'Carbon Monoxide (CO)', required: true });
    }
    
    if (selectedMinerals.includes('Gold (Au)')) {
      recommendations.push({ name: 'Hydrogen Sulfide (H2S) Detection', required: true });
      recommendations.push({ name: 'Structural Convergence (Rockburst Risk)', required: true });
      recommendations.push({ name: 'Heavy Metals (Arsenic, Cyanide) in Water', required: true });
    }

    if (selectedMinerals.includes('Lithium') || selectedMinerals.includes('Copper (Cu)')) {
      recommendations.push({ name: 'Acid Mine Drainage (pH)', required: true });
      recommendations.push({ name: 'Groundwater Pressure', required: true });
    }

    if (recommendations.length === 2) {
       recommendations.push({ name: 'Explosive Gases (General)', required: true });
       recommendations.push({ name: 'Roof Support Tension', required: true });
    }

    return recommendations;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
       {/* Background */}
       <div 
         className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] mix-blend-plus-lighter"
         style={{ backgroundImage: 'url(/icon.png)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '50%' }}
       />
       <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>
       
       <div className="relative z-10 max-w-2xl w-full bg-surface/80 backdrop-blur-xl border border-border p-8 md:p-12 rounded-3xl shadow-2xl">
          
          <div className="flex items-center justify-center mb-8">
            <ShieldAlert className="w-10 h-10 text-primary mr-3" />
            <span className="text-3xl font-black text-white tracking-wide">SHAFTGUARD<span className="text-primary">AI</span></span>
          </div>

          {step === 1 && (
            <div className="text-center animate-in fade-in zoom-in duration-500">
               <h1 className="text-3xl font-black text-white mb-4">The Universal Mining Intelligence Platform</h1>
               <p className="text-slate-400 mb-8 leading-relaxed">
                 Whether you operate a sprawling large-scale commercial mine or a focused small-scale artisanal shaft, SHAFTGUARD AI dynamically adapts to secure your specific operation. 
               </p>
               <button 
                 onClick={() => setStep(2)}
                 className="px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl flex items-center mx-auto transition-all shadow-lg hover:shadow-blue-500/25"
               >
                 CONFIGURE YOUR MINE <ArrowRight className="ml-2 w-5 h-5" />
               </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in slide-in-from-right duration-500">
               <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                 <Pickaxe className="w-6 h-6 mr-3 text-amber-500" /> What are you mining?
               </h2>
               <p className="text-slate-400 mb-6 text-sm">Select your primary target minerals so the AI can build your custom safety profile.</p>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {minerals.map(mineral => (
                    <button
                      key={mineral}
                      onClick={() => handleMineralToggle(mineral)}
                      className={`p-3 rounded-lg border-2 text-sm font-bold transition-all ${
                        selectedMinerals.includes(mineral) 
                        ? 'border-amber-500 bg-amber-500/20 text-amber-400' 
                        : 'border-slate-700 bg-surface text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      {mineral}
                    </button>
                  ))}
               </div>

               <button 
                 onClick={() => setStep(3)}
                 disabled={selectedMinerals.length === 0}
                 className="w-full px-8 py-4 bg-primary disabled:bg-slate-800 disabled:text-slate-500 hover:bg-blue-600 text-white font-bold rounded-xl flex justify-center items-center transition-all"
               >
                 ANALYZE HAZARDS <Cpu className="ml-2 w-5 h-5" />
               </button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in slide-in-from-right duration-500">
               <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                 <Cpu className="w-6 h-6 mr-3 text-purple-500" /> AI Parameter Recommendations
               </h2>
               <p className="text-slate-400 mb-6 text-sm">Based on your selection of <strong className="text-white">{selectedMinerals.join(', ')}</strong>, the AI prescribes the following mandatory sensor modules for your operation.</p>
               
               <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 mb-8 space-y-3">
                 {getAiRecommendations().map((rec, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-slate-800">
                     <span className="text-sm font-semibold text-slate-200">{rec.name}</span>
                     <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                   </div>
                 ))}
               </div>

               <button 
                 onClick={() => setConfigured(true)}
                 className="w-full px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex justify-center items-center transition-all shadow-lg hover:shadow-emerald-500/25"
               >
                 DEPLOY DASHBOARD <ArrowRight className="ml-2 w-5 h-5" />
               </button>
            </div>
          )}

       </div>
    </div>
  );
}
