import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ShieldAlert, Pickaxe, Cpu, ArrowRight, CheckCircle2, User, Building2 } from 'lucide-react';

export default function SetupWizard() {
  const { setConfigured, setMineProfile } = useAppContext();
  const [step, setStep] = useState(1);
  const [operatorName, setOperatorName] = useState('');
  const [mineName, setMineName] = useState('');
  const [selectedMinerals, setSelectedMinerals] = useState<string[]>([]);

  const minerals = [
    'Gold (Au)', 'Coal', 'Copper (Cu)', 'Platinum (Pt)',
    'Diamonds', 'Lithium', 'Chrome', 'Iron Ore',
    'Nickel', 'Manganese', 'Cobalt', 'Tin (Sn)'
  ];

  const handleMineralToggle = (mineral: string) => {
    setSelectedMinerals(prev =>
      prev.includes(mineral) ? prev.filter(m => m !== mineral) : [...prev, mineral]
    );
  };

  const getAiRecommendations = () => {
    const recs: string[] = [
      'Basic Shaft Safety (Tilt, Vibration)',
      'Water Level & Flood Detection',
    ];
    if (selectedMinerals.includes('Coal')) {
      recs.push('Methane (CH4) Detection', 'Coal Dust Particulates (PM10)', 'Carbon Monoxide (CO)');
    }
    if (selectedMinerals.includes('Gold (Au)')) {
      recs.push('Hydrogen Sulfide (H2S) Detection', 'Structural Convergence (Rockburst Risk)', 'Heavy Metals (Arsenic, Cyanide) in Water');
    }
    if (selectedMinerals.includes('Lithium') || selectedMinerals.includes('Copper (Cu)')) {
      recs.push('Acid Mine Drainage (pH)', 'Groundwater Pressure Monitoring');
    }
    if (selectedMinerals.includes('Platinum (Pt)') || selectedMinerals.includes('Chrome')) {
      recs.push('Silica Dust (Respirable)', 'Radon Gas Monitoring');
    }
    if (selectedMinerals.includes('Diamonds')) {
      recs.push('Explosive Fumes (NOx/CO2)', 'Ground Penetrating Radar (GPR)');
    }
    if (recs.length === 2) {
      recs.push('Explosive Gas Detection (General)', 'Roof Support Load Monitoring');
    }
    return recs;
  };

  const stepIndicator = (n: number) => (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all ${
      step === n ? 'border-primary bg-primary text-white' :
      step > n  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' :
                  'border-slate-700 bg-surface text-slate-500'
    }`}>{step > n ? '✓' : n}</div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] mix-blend-plus-lighter"
        style={{ backgroundImage: 'url(/icon.png)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '50%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/5 pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full bg-surface/80 backdrop-blur-xl border border-border p-8 md:p-10 rounded-3xl shadow-2xl">

        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src="/icon.png" alt="ShaftGuard" className="w-10 h-10 mr-3 opacity-90" />
          <span className="text-3xl font-black text-white tracking-wide">SHAFTGUARD<span className="text-primary">AI</span></span>
        </div>

        {/* Step progress bar */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {stepIndicator(1)}
          <div className={`flex-1 h-0.5 rounded-full max-w-[60px] ${step > 1 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          {stepIndicator(2)}
          <div className={`flex-1 h-0.5 rounded-full max-w-[60px] ${step > 2 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          {stepIndicator(3)}
          <div className={`flex-1 h-0.5 rounded-full max-w-[60px] ${step > 3 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          {stepIndicator(4)}
        </div>

        {/* ── Step 1: Operator & Mine ── */}
        {step === 1 && (
          <div className="animate-in fade-in zoom-in duration-400">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-white mb-2">Welcome to ShaftGuard AI</h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                The universal mine safety platform for all scales of operation. Let's configure your mine profile to get started.
              </p>
            </div>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                  <User className="w-3 h-3 mr-1.5" /> Operator / Control Room Officer Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. James Chuma"
                  value={operatorName}
                  onChange={e => setOperatorName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                  <Building2 className="w-3 h-3 mr-1.5" /> Mine / Operation Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zvishavane Gold Mine"
                  value={mineName}
                  onChange={e => setMineName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!operatorName.trim() || !mineName.trim()}
              className="w-full py-4 bg-primary disabled:bg-slate-800 disabled:text-slate-500 hover:bg-blue-600 text-white font-bold rounded-xl flex justify-center items-center transition-all gap-2"
            >
              NEXT: SELECT MINERALS <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ── Step 2: Minerals ── */}
        {step === 2 && (
          <div className="animate-in slide-in-from-right duration-400">
            <h2 className="text-2xl font-bold text-white mb-1 flex items-center">
              <Pickaxe className="w-6 h-6 mr-3 text-amber-500" /> What are you mining?
            </h2>
            <p className="text-slate-400 mb-5 text-sm">Select your primary target minerals. The AI will customize your sensor profile accordingly.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {minerals.map(mineral => (
                <button
                  key={mineral}
                  onClick={() => handleMineralToggle(mineral)}
                  className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${
                    selectedMinerals.includes(mineral)
                      ? 'border-amber-500 bg-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                      : 'border-slate-700 bg-surface/50 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {mineral}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors">Back</button>
              <button
                onClick={() => setStep(3)}
                disabled={selectedMinerals.length === 0}
                className="flex-1 py-3 bg-primary disabled:bg-slate-800 disabled:text-slate-500 hover:bg-blue-600 text-white font-bold rounded-xl flex justify-center items-center gap-2 transition-all"
              >
                ANALYZE HAZARDS <Cpu className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: AI Recommendations ── */}
        {step === 3 && (
          <div className="animate-in slide-in-from-right duration-400">
            <h2 className="text-2xl font-bold text-white mb-1 flex items-center">
              <Cpu className="w-6 h-6 mr-3 text-purple-500" /> AI Parameter Recommendations
            </h2>
            <p className="text-slate-400 mb-5 text-sm">
              Based on your selection of <strong className="text-amber-400">{selectedMinerals.join(', ')}</strong>, the AI prescribes these sensor modules for <strong className="text-white">{mineName}</strong>.
            </p>

            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 mb-6 max-h-60 overflow-y-auto space-y-2">
              {getAiRecommendations().map((rec, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-surface rounded-lg border border-slate-800">
                  <span className="text-sm font-semibold text-slate-200">{rec}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors">Back</button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl flex justify-center items-center gap-2 transition-all"
              >
                CONFIGURE HARDWARE <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Summary ── */}
        {step === 4 && (
          <div className="animate-in slide-in-from-right duration-400">
            <h2 className="text-2xl font-bold text-white mb-1">🎉 Configuration Complete</h2>
            <p className="text-slate-400 mb-6 text-sm">Your SHAFTGUARD AI instance is ready. You can add employees, helmets, and sensor nodes from the Settings page after deployment.</p>

            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-5 mb-6 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-slate-400">Operator</span><span className="font-bold text-white">{operatorName}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">Mine Name</span><span className="font-bold text-amber-400">{mineName}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">Target Minerals</span><span className="font-bold text-white text-right max-w-[60%]">{selectedMinerals.join(', ')}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">Sensor Modules</span><span className="font-bold text-emerald-400">{getAiRecommendations().length} Configured</span></div>
            </div>

            <button
              onClick={() => { setMineProfile({ operatorName, mineName, minerals: selectedMinerals }); setConfigured(true); }}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
            >
              DEPLOY SHAFTGUARD AI DASHBOARD <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
