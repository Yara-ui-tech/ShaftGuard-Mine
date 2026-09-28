import { useState } from 'react';
import DemoControls from '../components/DemoControls';
import {
  Wrench, CheckCircle2, AlertTriangle, Clock, Plus, Calendar,
  Cpu, Zap, Wind, Droplets, ChevronDown, ChevronUp, Trash2
} from 'lucide-react';

type EquipStatus = 'OPERATIONAL' | 'MAINTENANCE DUE' | 'UNDER REPAIR' | 'DECOMMISSIONED';

interface Equipment {
  id: string;
  name: string;
  category: string;
  zone: string;
  lastService: string;
  nextService: string;
  hoursRun: number;
  status: EquipStatus;
  notes: string;
}

interface Task {
  id: string;
  equipment: string;
  task: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
  assignedTo: string;
  done: boolean;
}

const STATUS_COLORS: Record<EquipStatus, string> = {
  'OPERATIONAL':       'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'MAINTENANCE DUE':   'bg-amber-500/20  text-amber-400  border-amber-500/30',
  'UNDER REPAIR':      'bg-red-500/20    text-red-400    border-red-500/30',
  'DECOMMISSIONED':    'bg-slate-700     text-slate-400  border-slate-600',
};

const DEFAULT_EQUIPMENT: Equipment[] = [
  { id: 'eq1', name: 'Main Ventilation Fan A', category: 'Ventilation', zone: 'Ventilation Chamber', lastService: '2026-08-15', nextService: '2026-10-15', hoursRun: 2840, status: 'OPERATIONAL', notes: 'Running at 95% capacity.' },
  { id: 'eq2', name: 'Water Pump P-01',        category: 'Pumping',      zone: 'Level 3 - East',  lastService: '2026-09-01', nextService: '2026-10-01', hoursRun: 1200, status: 'MAINTENANCE DUE', notes: 'Bearing noise detected. Schedule inspection.' },
  { id: 'eq3', name: 'Hoist Motor HM-001',     category: 'Hoisting',    zone: 'Shaft Head',       lastService: '2026-07-20', nextService: '2026-10-20', hoursRun: 4580, status: 'OPERATIONAL', notes: '' },
  { id: 'eq4', name: 'Drill Rig DR-003',       category: 'Drilling',    zone: 'Level 2 - South',  lastService: '2026-09-10', nextService: '2026-10-10', hoursRun: 890,  status: 'OPERATIONAL', notes: '' },
  { id: 'eq5', name: 'Compressor C-02',        category: 'Compressed Air', zone: 'Level 1 - Main', lastService: '2026-06-30', nextService: '2026-09-30', hoursRun: 3100, status: 'UNDER REPAIR', notes: 'Pressure regulator fault. Parts ordered.' },
  { id: 'eq6', name: 'Backup Generator G-01', category: 'Power',        zone: 'Surface Control Room', lastService: '2026-09-15', nextService: '2026-12-15', hoursRun: 450, status: 'OPERATIONAL', notes: 'Monthly test passed.' },
];

const DEFAULT_TASKS: Task[] = [
  { id: 't1', equipment: 'Water Pump P-01',      task: 'Bearing inspection & lubrication',    priority: 'HIGH',   dueDate: '2026-10-01', assignedTo: 'David Banda',    done: false },
  { id: 't2', equipment: 'Compressor C-02',       task: 'Replace pressure regulator',           priority: 'HIGH',   dueDate: '2026-09-30', assignedTo: 'David Banda',    done: false },
  { id: 't3', equipment: 'Main Ventilation Fan A', task: 'Quarterly belt tension check',       priority: 'MEDIUM', dueDate: '2026-10-15', assignedTo: 'Sarah Moyo',     done: false },
  { id: 't4', equipment: 'Hoist Motor HM-001',    task: 'Annual brake pad inspection',         priority: 'MEDIUM', dueDate: '2026-10-20', assignedTo: 'David Banda',    done: true  },
  { id: 't5', equipment: 'Drill Rig DR-003',      task: 'Bit replacement & drill string check', priority: 'LOW',  dueDate: '2026-10-10', assignedTo: 'Tafadzwa Ndlovu', done: false },
];

export default function Maintenance() {
  const [equipment, setEquipment] = useState<Equipment[]>(DEFAULT_EQUIPMENT);
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [activeTab, setActiveTab] = useState<'equipment' | 'tasks' | 'log'>('equipment');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({ priority: 'MEDIUM', done: false });

  const operational   = equipment.filter(e => e.status === 'OPERATIONAL').length;
  const due           = equipment.filter(e => e.status === 'MAINTENANCE DUE').length;
  const repair        = equipment.filter(e => e.status === 'UNDER REPAIR').length;
  const pendingTasks  = tasks.filter(t => !t.done).length;

  const addTask = () => {
    if (!newTask.equipment || !newTask.task) return;
    setTasks(p => [...p, { id: `t${Date.now()}`, equipment: newTask.equipment!, task: newTask.task!, priority: newTask.priority as any || 'MEDIUM', dueDate: newTask.dueDate || '', assignedTo: newTask.assignedTo || 'Unassigned', done: false }]);
    setNewTask({ priority: 'MEDIUM', done: false });
    setShowAddTask(false);
  };

  const toggleTask = (id: string) => setTasks(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const priorityColors = { HIGH: 'text-red-400 bg-red-500/10 border-red-500/30', MEDIUM: 'text-amber-400 bg-amber-500/10 border-amber-500/30', LOW: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Maintenance & Equipment</h1>
          <p className="text-slate-400 text-sm">Track equipment health, service schedules, and maintenance tasks.</p>
        </div>
        <div className="bg-orange-900/20 border border-orange-500/30 px-3 py-1.5 rounded-md text-xs font-semibold text-orange-400">SHAFTGUARD-M MODULE</div>
      </div>

      <DemoControls />

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Operational',       value: operational, color: 'text-emerald-400', bg: 'border-emerald-500/30 bg-emerald-900/10', icon: CheckCircle2 },
          { label: 'Maintenance Due',   value: due,         color: 'text-amber-400',   bg: 'border-amber-500/30 bg-amber-900/10',     icon: Clock },
          { label: 'Under Repair',      value: repair,      color: 'text-red-400',     bg: 'border-red-500/30 bg-red-900/10',         icon: Wrench },
          { label: 'Pending Tasks',     value: pendingTasks,color: 'text-blue-400',    bg: 'border-blue-500/30 bg-blue-900/10',       icon: Calendar },
        ].map(({ label, value, color, bg, icon: Icon }) => (
          <div key={label} className={`glass-panel p-5 border ${bg} flex items-center gap-4`}>
            <Icon className={`w-8 h-8 ${color} flex-shrink-0`} />
            <div>
              <div className={`text-3xl font-black ${color}`}>{value}</div>
              <div className="text-xs text-slate-400 font-bold uppercase">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {(['equipment', 'tasks', 'log'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-3 text-sm font-bold border-b-2 capitalize transition-all ${activeTab === tab ? 'border-primary text-white' : 'border-transparent text-slate-400 hover:text-white'}`}>{tab === 'log' ? 'Service Log' : tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
        ))}
      </div>

      {/* Equipment tab */}
      {activeTab === 'equipment' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipment.map(eq => (
            <div key={eq.id} className={`glass-panel p-5 border-l-4 ${eq.status === 'OPERATIONAL' ? 'border-l-emerald-500' : eq.status === 'MAINTENANCE DUE' ? 'border-l-amber-500' : eq.status === 'UNDER REPAIR' ? 'border-l-red-500' : 'border-l-slate-600'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white">{eq.name}</h3>
                  <p className="text-xs text-slate-400">{eq.category} · {eq.zone}</p>
                </div>
                <span className={`text-[9px] font-black px-2 py-1 rounded-full border ${STATUS_COLORS[eq.status]}`}>{eq.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                <div><div className="text-slate-500 font-bold uppercase">Hours Run</div><div className="text-white font-black mt-0.5">{eq.hoursRun.toLocaleString()}h</div></div>
                <div><div className="text-slate-500 font-bold uppercase">Last Service</div><div className="text-white font-mono mt-0.5">{eq.lastService}</div></div>
                <div><div className="text-slate-500 font-bold uppercase">Next Service</div><div className={`font-mono mt-0.5 ${eq.status === 'MAINTENANCE DUE' ? 'text-amber-400 font-black' : 'text-white'}`}>{eq.nextService}</div></div>
              </div>
              {eq.notes && (
                <div className="bg-slate-900/50 rounded-lg px-3 py-2 text-xs text-slate-300 border border-slate-700 flex items-start gap-2">
                  <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />{eq.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tasks tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowAddTask(true)} className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-colors text-sm"><Plus className="w-4 h-4" /> Add Task</button>
          </div>
          {showAddTask && (
            <div className="glass-panel p-5 border-primary/30 animate-in slide-in-from-top duration-300">
              <h3 className="font-bold text-white mb-4">New Maintenance Task</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div><label className="label-sm">Equipment</label><select value={newTask.equipment || ''} onChange={e => setNewTask(p => ({...p, equipment: e.target.value}))} className="input-field"><option value="">Select equipment...</option>{equipment.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}</select></div>
                <div><label className="label-sm">Task Description</label><input type="text" value={newTask.task || ''} onChange={e => setNewTask(p => ({...p, task: e.target.value}))} className="input-field" placeholder="Describe the maintenance task..." /></div>
                <div><label className="label-sm">Priority</label><select value={newTask.priority} onChange={e => setNewTask(p => ({...p, priority: e.target.value as any}))} className="input-field"><option value="HIGH">High</option><option value="MEDIUM">Medium</option><option value="LOW">Low</option></select></div>
                <div><label className="label-sm">Due Date</label><input type="date" value={newTask.dueDate || ''} onChange={e => setNewTask(p => ({...p, dueDate: e.target.value}))} className="input-field" /></div>
                <div><label className="label-sm">Assign To</label><input type="text" value={newTask.assignedTo || ''} onChange={e => setNewTask(p => ({...p, assignedTo: e.target.value}))} className="input-field" placeholder="Employee name..." /></div>
              </div>
              <div className="flex gap-3"><button onClick={() => setShowAddTask(false)} className="px-5 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors text-sm">Cancel</button><button onClick={addTask} disabled={!newTask.equipment || !newTask.task} className="flex-1 py-2.5 bg-primary disabled:bg-slate-800 disabled:text-slate-500 hover:bg-blue-600 text-white font-bold rounded-xl text-sm">Add Task</button></div>
            </div>
          )}
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className={`glass-panel p-4 flex items-start gap-4 transition-all ${task.done ? 'opacity-50' : ''}`}>
                <button onClick={() => toggleTask(task.id)} className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${task.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 hover:border-primary'}`}>
                  {task.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}>{task.priority}</span>
                    <span className="text-xs text-slate-400">{task.equipment}</span>
                  </div>
                  <p className={`text-sm font-semibold ${task.done ? 'line-through text-slate-500' : 'text-white'}`}>{task.task}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span>Due: {task.dueDate}</span>
                    <span>Assigned: {task.assignedTo}</span>
                  </div>
                </div>
                <button onClick={() => setTasks(p => p.filter(t => t.id !== task.id))} className="text-slate-700 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Log tab */}
      {activeTab === 'log' && (
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border"><th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Date</th><th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Equipment</th><th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Work Done</th><th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Technician</th><th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Result</th></tr></thead>
              <tbody>
                {[
                  { date: '2026-09-15', equip: 'Backup Generator G-01', work: 'Monthly load test & fuel check', tech: 'David Banda', result: 'PASSED' },
                  { date: '2026-09-10', equip: 'Drill Rig DR-003',       work: 'Drill bit replacement (bit #7)', tech: 'Tafadzwa Ndlovu', result: 'COMPLETED' },
                  { date: '2026-09-01', equip: 'Water Pump P-01',        work: 'Routine service & oil change', tech: 'David Banda', result: 'COMPLETED' },
                  { date: '2026-08-15', equip: 'Main Ventilation Fan A', work: 'Belt tension check & bearing lube', tech: 'Sarah Moyo', result: 'COMPLETED' },
                  { date: '2026-07-20', equip: 'Hoist Motor HM-001',     work: 'Annual brake & safety check', tech: 'David Banda', result: 'PASSED' },
                  { date: '2026-06-30', equip: 'Compressor C-02',        work: 'Quarterly filter change & inspection', tech: 'David Banda', result: 'WARNING NOTED' },
                ].map((log, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-slate-400">{log.date}</td>
                    <td className="p-4 font-semibold text-white text-xs">{log.equip}</td>
                    <td className="p-4 text-slate-300 text-xs">{log.work}</td>
                    <td className="p-4 text-slate-400 text-xs">{log.tech}</td>
                    <td className="p-4"><span className={`text-[9px] font-black px-2 py-1 rounded-full border ${log.result === 'PASSED' || log.result === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>{log.result}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
