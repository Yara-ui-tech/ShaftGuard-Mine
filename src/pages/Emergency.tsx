import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import DemoControls from '../components/DemoControls';
import {
  Phone, AlertTriangle, ShieldCheck, MapPin, ChevronRight,
  Siren, Users, Wind, Flame, Droplets, HardHat, FileText,
  CheckSquare, Square, Cpu
} from 'lucide-react';

const EMERGENCY_CONTACTS = [
  { name: 'Mine Captain',          person: 'James Chuma',     phone: '+263 77 123 4567', role: 'Primary Contact', available: true },
  { name: 'Safety Officer',        person: 'Grace Chirwa',    phone: '+263 77 234 5678', role: 'Safety', available: true },
  { name: 'Surface Control Room',  person: 'On Duty Ops',     phone: '+263 77 345 6789', role: 'Operations', available: true },
  { name: 'NSSA Mine Rescue',      person: 'Rescue Team',     phone: '+263 4 700 401',   role: 'External Rescue', available: true },
  { name: 'Ambulance (National)',  person: 'Emergency',       phone: '994',              role: 'Medical', available: true },
  { name: 'Fire Brigade',          person: 'Local Station',   phone: '993',              role: 'Fire', available: true },
  { name: 'Nearest Hospital',      person: 'Gwanda Hospital', phone: '+263 84 240 0244', role: 'Medical', available: true },
  { name: 'Mine Owner / Director', person: 'Confidential',    phone: '+263 77 456 7890', role: 'Management', available: true },
];

const PROTOCOLS = [
  {
    id: 'flood',
    icon: Droplets,
    color: 'blue',
    title: 'Mine Flooding Protocol',
    trigger: 'Water level >70% or rising >5%/min',
    steps: [
      'Alert all underground personnel via smart-helmet PA system.',
      'Activate main drainage pumps at maximum capacity.',
      'Seal lower level ventilation crosscuts to slow water spread.',
      'Evacuate all workers from Level 3 and below via emergency ladderways.',
      'Contact Mine Captain and surface rescue team immediately.',
      'Do NOT use electrical equipment in flooded areas.',
      'Establish headcount at surface muster point within 10 minutes.',
    ],
  },
  {
    id: 'gas',
    icon: Wind,
    color: 'amber',
    title: 'Gas / Explosive Atmosphere Protocol',
    trigger: 'CH4 >1% LEL, CO >25ppm, O2 <19.5%, or H2S >10ppm',
    steps: [
      'Sound continuous evacuation alarm throughout affected zones.',
      'Switch off all ignition sources and electrical equipment (except lights).',
      'Increase ventilation fans to maximum — open all ventilation doors.',
      'Evacuate personnel upwind from gas source immediately.',
      'Do NOT re-enter the area until gas levels are confirmed safe by sensor.',
      'Notify mine captain and contact NSSA Mine Rescue.',
      'Post guards at entry points to prevent unauthorized re-entry.',
    ],
  },
  {
    id: 'collapse',
    icon: AlertTriangle,
    color: 'red',
    title: 'Rockfall / Ground Collapse Protocol',
    trigger: 'High vibration + shaft tilt >2° or acoustic emission spike',
    steps: [
      'Halt all blasting and drilling operations in affected zone immediately.',
      'Ensure all personnel clear the affected area at least 50m.',
      'Account for all workers — check helmet tracking for any unresponsive.',
      'Notify mine captain and geologist for structural assessment.',
      'Do NOT enter collapse zone until supported by qualified engineer.',
      'Activate roof-support monitoring and install additional ground support.',
      'Contact NSSA Mine Rescue if any personnel are trapped.',
    ],
  },
  {
    id: 'fire',
    icon: Flame,
    color: 'orange',
    title: 'Underground Fire / Smoke Protocol',
    trigger: 'Smoke detected, temperature spike, or visual confirmation',
    steps: [
      'Sound general fire alarm — evacuate entire mine.',
      'Close all ventilation doors to limit oxygen to fire zone.',
      'Personnel must move upwind and uphill from fire source.',
      'Use CO2 or dry powder extinguishers only — not water on electrical fires.',
      'Do NOT use lifts/hoists until fire is confirmed extinguished.',
      'Contact surface for fire brigade dispatch immediately.',
      'Establish incident command at surface muster point.',
    ],
  },
];

const MUSTER_POINTS = [
  { id: 'MP-01', name: 'Main Surface Muster',  location: 'Surface — 100m north of shaft head', capacity: 50 },
  { id: 'MP-02', name: 'Level 1 Refuge Bay',   location: 'Level 1 — Main crosscut, 200m east', capacity: 20 },
  { id: 'MP-03', name: 'Level 2 Refuge Bay',   location: 'Level 2 — South heading, 150m',       capacity: 15 },
  { id: 'MP-04', name: 'Level 3 Refuge Bay',   location: 'Level 3 — East crosscut emergency bay', capacity: 12 },
];

export default function Emergency() {
  const { demoState } = useAppContext();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, number[]>>({});

  const toggleStep = (protocolId: string, idx: number) => {
    setCheckedSteps(prev => {
      const current = prev[protocolId] || [];
      return { ...prev, [protocolId]: current.includes(idx) ? current.filter(i => i !== idx) : [...current, idx] };
    });
  };

  const colorMap: Record<string, string> = {
    blue:   'border-blue-500/50  bg-blue-900/10  text-blue-400',
    amber:  'border-amber-500/50 bg-amber-900/10 text-amber-400',
    red:    'border-red-500/50   bg-red-900/10   text-red-400',
    orange: 'border-orange-500/50 bg-orange-900/10 text-orange-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Emergency Protocols</h1>
          <p className="text-slate-400 text-sm">Emergency response procedures, contacts, and muster points.</p>
        </div>
        <div className="bg-red-900/20 border border-red-500/30 px-3 py-1.5 rounded-md text-xs font-semibold text-red-400">SHAFTGUARD-E MODULE</div>
      </div>

      <DemoControls />

      {demoState !== 'NORMAL' && (
        <div className={`p-4 border-2 rounded-2xl flex items-center gap-4 animate-pulse ${demoState === 'DANGER' ? 'border-red-500 bg-red-900/25' : 'border-amber-500 bg-amber-900/20'}`}>
          <Siren className={`w-10 h-10 flex-shrink-0 ${demoState === 'DANGER' ? 'text-red-400' : 'text-amber-400'}`} />
          <div>
            <h3 className={`font-black text-xl uppercase tracking-wider ${demoState === 'DANGER' ? 'text-red-300' : 'text-amber-300'}`}>
              {demoState === 'DANGER' ? '🚨 Emergency Response Active — Follow DANGER Protocols Below' : '⚠ Elevated Alert — Review Relevant Protocols Below'}
            </h3>
            <p className="text-slate-300 text-sm mt-0.5">Initiate the appropriate protocol for current conditions. Check off steps as completed.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Protocols */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Emergency Response Protocols</h2>
          {PROTOCOLS.map(protocol => {
            const Icon = protocol.icon;
            const isOpen = expanded === protocol.id;
            const checked = checkedSteps[protocol.id] || [];
            const done = checked.length;
            const total = protocol.steps.length;

            return (
              <div key={protocol.id} className={`glass-panel border overflow-hidden transition-all ${colorMap[protocol.color]}`}>
                <button className="w-full flex items-center justify-between p-5" onClick={() => setExpanded(isOpen ? null : protocol.id)}>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${colorMap[protocol.color].split(' ')[2]}`} />
                    <div className="text-left">
                      <h3 className="font-bold text-white">{protocol.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Trigger: {protocol.trigger}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {done > 0 && <span className="text-xs font-black text-emerald-400">{done}/{total}</span>}
                    {isOpen ? <ChevronRight className="w-5 h-5 text-slate-400 rotate-90 transition-transform" /> : <ChevronRight className="w-5 h-5 text-slate-400 transition-transform" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-700/50 px-5 pb-5 pt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Progress bar */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 bg-slate-800 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${(done / total) * 100}%` }} />
                      </div>
                      <span className="text-xs text-slate-400 font-bold">{done}/{total} steps</span>
                    </div>
                    {protocol.steps.map((step, idx) => {
                      const isDone = checked.includes(idx);
                      return (
                        <button key={idx} onClick={() => toggleStep(protocol.id, idx)} className={`w-full flex items-start gap-3 text-left p-3 rounded-xl transition-all ${isDone ? 'bg-emerald-900/20 border border-emerald-500/20' : 'bg-slate-900/40 border border-slate-800 hover:border-slate-600'}`}>
                          {isDone ? <CheckSquare className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" /> : <Square className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />}
                          <span className={`text-sm font-medium ${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}><span className="font-black text-slate-400 mr-2">{idx + 1}.</span>{step}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Emergency Contacts */}
          <div className="glass-panel p-5">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-400" /> Emergency Contacts</h2>
            <div className="space-y-3">
              {EMERGENCY_CONTACTS.map((c, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                  <div>
                    <div className="text-sm font-bold text-white">{c.name}</div>
                    <div className="text-xs text-slate-400">{c.person}</div>
                  </div>
                  <a href={`tel:${c.phone}`} className="text-xs font-black text-primary hover:text-blue-300 transition-colors flex items-center gap-1">
                    <Phone className="w-3 h-3" />{c.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Muster Points */}
          <div className="glass-panel p-5">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400" /> Muster Points</h2>
            <div className="space-y-3">
              {MUSTER_POINTS.map(mp => (
                <div key={mp.id} className="bg-slate-900/50 rounded-xl p-3 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">{mp.name}</span>
                    <span className="text-[9px] font-black text-slate-400 border border-slate-700 px-2 py-0.5 rounded">{mp.id}</span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-start gap-1"><MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />{mp.location}</p>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Users className="w-3 h-3" /> Capacity: {mp.capacity} persons</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
