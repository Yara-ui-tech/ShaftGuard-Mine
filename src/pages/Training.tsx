import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import DemoControls from '../components/DemoControls';
import {
  BookOpen, GraduationCap, CheckCircle2, Clock, AlertTriangle,
  Star, Users, Calendar, Award, Loader2, Plus, Trash2, HardHat
} from 'lucide-react';

type TrainingStatus = 'CURRENT' | 'DUE SOON' | 'OVERDUE' | 'COMPLETED';

interface TrainingRecord {
  id: string;
  employeeName: string;
  employeeNum: string;
  course: string;
  category: string;
  completedDate: string;
  expiryDate: string;
  status: TrainingStatus;
  score?: number;
}

interface SafetyToolboxTalk {
  id: string;
  date: string;
  topic: string;
  presenter: string;
  attendees: number;
  notes: string;
}

const STATUS_COLORS: Record<TrainingStatus, string> = {
  CURRENT:    'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'DUE SOON': 'bg-amber-500/20  text-amber-400  border-amber-500/30',
  OVERDUE:    'bg-red-500/20    text-red-400    border-red-500/30',
  COMPLETED:  'bg-blue-500/20   text-blue-400   border-blue-500/30',
};

const TRAINING_RECORDS: TrainingRecord[] = [
  { id: 'tr1', employeeName: 'Tendai Mutasa',   employeeNum: 'EMP-001', course: 'Basic Mine Safety Induction',       category: 'Safety',       completedDate: '2026-03-15', expiryDate: '2027-03-15', status: 'CURRENT',    score: 91 },
  { id: 'tr2', employeeName: 'Tendai Mutasa',   employeeNum: 'EMP-001', course: 'Explosives Handling (Certificate)', category: 'Technical',    completedDate: '2025-09-01', expiryDate: '2026-09-01', status: 'OVERDUE',    score: 88 },
  { id: 'tr3', employeeName: 'James Chuma',     employeeNum: 'EMP-002', course: 'Mine Supervisors Competency',       category: 'Leadership',   completedDate: '2026-01-20', expiryDate: '2028-01-20', status: 'CURRENT',    score: 96 },
  { id: 'tr4', employeeName: 'James Chuma',     employeeNum: 'EMP-002', course: 'First Aid Level 3',                 category: 'Medical',      completedDate: '2025-07-10', expiryDate: '2026-07-10', status: 'OVERDUE',    score: 94 },
  { id: 'tr5', employeeName: 'Sarah Moyo',      employeeNum: 'EMP-003', course: 'Ventilation Engineer Cert.',        category: 'Technical',    completedDate: '2026-06-01', expiryDate: '2027-06-01', status: 'CURRENT',    score: 89 },
  { id: 'tr6', employeeName: 'Sarah Moyo',      employeeNum: 'EMP-003', course: 'Confined Space Entry',              category: 'Safety',       completedDate: '2026-05-15', expiryDate: '2026-11-15', status: 'DUE SOON',  score: 87 },
  { id: 'tr7', employeeName: 'Tafadzwa Ndlovu', employeeNum: 'EMP-004', course: 'Drilling & Blasting Operations',    category: 'Technical',    completedDate: '2026-02-28', expiryDate: '2027-02-28', status: 'CURRENT',    score: 82 },
  { id: 'tr8', employeeName: 'Grace Chirwa',    employeeNum: 'EMP-005', course: 'Rock Mechanics & Ground Control',   category: 'Technical',    completedDate: '2026-04-10', expiryDate: '2029-04-10', status: 'CURRENT',    score: 97 },
  { id: 'tr9', employeeName: 'Peter Sibanda',   employeeNum: 'EMP-006', course: 'Basic Mine Safety Induction',       category: 'Safety',       completedDate: '2026-01-10', expiryDate: '2027-01-10', status: 'CURRENT',    score: 85 },
  { id: 'tr10',employeeName: 'David Banda',     employeeNum: 'EMP-007', course: 'Electrical Safety Underground',     category: 'Technical',    completedDate: '2026-07-05', expiryDate: '2027-07-05', status: 'CURRENT',    score: 93 },
  { id: 'tr11',employeeName: 'David Banda',     employeeNum: 'EMP-007', course: 'Mine Rescue (NSSA Certified)',      category: 'Rescue',       completedDate: '2025-11-20', expiryDate: '2026-11-20', status: 'DUE SOON',  score: 90 },
];

const TOOLBOX_TALKS: SafetyToolboxTalk[] = [
  { id: 'tb1', date: '2026-09-25', topic: 'Methane Gas Recognition & Emergency Response',  presenter: 'James Chuma',  attendees: 12, notes: 'All workers attended. Gas meter calibration demo performed.' },
  { id: 'tb2', date: '2026-09-18', topic: 'Proper Use of Smart Helmets & Emergency Alerts', presenter: 'Grace Chirwa', attendees: 10, notes: 'ShaftGuard AI demo shown. Workers trained on helmet alert system.' },
  { id: 'tb3', date: '2026-09-11', topic: 'Emergency Evacuation Drill — Level 3 East',      presenter: 'James Chuma',  attendees: 15, notes: 'Full evacuation drill completed in 8 min 22 sec.' },
  { id: 'tb4', date: '2026-09-04', topic: 'Rockfall Prevention & Support Inspection',        presenter: 'Grace Chirwa', attendees: 12, notes: 'Weekly barring down procedures reviewed.' },
  { id: 'tb5', date: '2026-08-28', topic: 'Heat Stress & Hydration Underground',             presenter: 'Sarah Moyo',  attendees: 11, notes: 'August heat wave precautions. Water supply confirmed.' },
];

export default function Training() {
  const [filter, setFilter] = useState<string>('all');
  const [records] = useState(TRAINING_RECORDS);

  const overdue  = records.filter(r => r.status === 'OVERDUE').length;
  const dueSoon  = records.filter(r => r.status === 'DUE SOON').length;
  const current  = records.filter(r => r.status === 'CURRENT').length;
  const compRate = Math.round((current / records.length) * 100);

  const filtered = filter === 'all' ? records : records.filter(r => r.status.toLowerCase().replace(' ', '-') === filter || r.status.toLowerCase() === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Training & Compliance</h1>
          <p className="text-slate-400 text-sm">Employee training records, certifications, and safety toolbox talks.</p>
        </div>
        <div className="bg-purple-900/20 border border-purple-500/30 px-3 py-1.5 rounded-md text-xs font-semibold text-purple-400">SHAFTGUARD-TC MODULE</div>
      </div>

      <DemoControls />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Compliance Rate',    value: `${compRate}%`,   icon: Award,          color: compRate > 80 ? 'text-emerald-400' : 'text-amber-400', bg: 'border-emerald-500/30 bg-emerald-900/10' },
          { label: 'Certs Current',      value: current,          icon: CheckCircle2,   color: 'text-emerald-400', bg: 'border-emerald-500/30 bg-emerald-900/10' },
          { label: 'Due Soon (90 days)', value: dueSoon,          icon: Clock,          color: 'text-amber-400',   bg: 'border-amber-500/30 bg-amber-900/10' },
          { label: 'Overdue',            value: overdue,          icon: AlertTriangle,  color: 'text-red-400',     bg: 'border-red-500/30 bg-red-900/10' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`glass-panel p-5 border ${bg} flex items-center gap-4`}>
            <Icon className={`w-8 h-8 ${color} flex-shrink-0`} />
            <div>
              <div className={`text-3xl font-black ${color}`}>{value}</div>
              <div className="text-xs text-slate-400 font-bold uppercase">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {overdue > 0 && (
        <div className="p-4 bg-red-900/20 border border-red-500/40 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 animate-pulse" />
          <p className="text-sm font-bold text-red-300">
            {overdue} training certification{overdue > 1 ? 's are' : ' is'} OVERDUE. Regulatory compliance requires immediate renewal.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Training Records */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><GraduationCap className="w-5 h-5 text-purple-400" /> Certification Records</h2>
            <select value={filter} onChange={e => setFilter(e.target.value)} className="input-field !py-1.5 !w-auto text-xs">
              <option value="all">All Records</option>
              <option value="current">Current</option>
              <option value="due soon">Due Soon</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="glass-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">{['Employee', 'Course', 'Category', 'Completed', 'Expires', 'Score', 'Status'].map(h => <th key={h} className="text-left p-3 text-xs font-black text-slate-400 uppercase tracking-wider">{h}</th>)}</tr></thead>
                <tbody>
                  {filtered.map((rec, i) => (
                    <tr key={rec.id} className={`border-b border-border/40 hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                      <td className="p-3">
                        <div className="font-bold text-white text-xs">{rec.employeeName}</div>
                        <div className="text-[9px] font-mono text-slate-500">{rec.employeeNum}</div>
                      </td>
                      <td className="p-3 text-xs text-slate-300 max-w-[180px]">{rec.course}</td>
                      <td className="p-3"><span className="text-[9px] font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded">{rec.category}</span></td>
                      <td className="p-3 text-xs font-mono text-slate-400">{rec.completedDate}</td>
                      <td className="p-3 text-xs font-mono text-slate-400">{rec.expiryDate}</td>
                      <td className="p-3">
                        {rec.score && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400" />
                            <span className="text-xs font-black text-white">{rec.score}%</span>
                          </div>
                        )}
                      </td>
                      <td className="p-3"><span className={`text-[9px] font-black px-2 py-1 rounded-full border ${STATUS_COLORS[rec.status]}`}>{rec.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Toolbox Talks */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-400" /> Safety Toolbox Talks</h2>
          <div className="space-y-3">
            {TOOLBOX_TALKS.map(talk => (
              <div key={talk.id} className="glass-panel p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">{talk.date}</span>
                  <span className="text-[9px] text-slate-500 flex items-center gap-1"><Users className="w-2.5 h-2.5" />{talk.attendees} attended</span>
                </div>
                <p className="text-sm font-bold text-white mb-1">{talk.topic}</p>
                <p className="text-xs text-slate-400 mb-2">Presenter: {talk.presenter}</p>
                <p className="text-xs text-slate-500 bg-slate-900/50 rounded-lg px-3 py-2 border border-slate-800">{talk.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
