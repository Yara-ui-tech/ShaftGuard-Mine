import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import {
  Save, HardHat, Plus, Trash2, Building2, User, Hash,
  Cpu, MapPin, Settings as SettingsIcon, AlertTriangle,
  Sliders, CheckCircle2, Radio, Edit3
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Employee {
  id: string;
  employeeNumber: string;
  name: string;
  role: string;
  location: string;
  helmetId: string;
  status: 'ACTIVE' | 'OFF-SHIFT';
}

interface SensorNode {
  id: string;
  nodeId: string;
  name: string;
  location: string;
  type: string;
  sensors: string[];
  status: 'ONLINE' | 'OFFLINE' | 'FAULT';
}

const LOCATIONS = [
  'Level 1 - Main', 'Level 1 - North', 'Level 2 - South',
  'Level 2 - East', 'Level 3 - East', 'Level 3 - West',
  'Surface Control Room', 'Ventilation Chamber', 'Shaft Head'
];

const SENSOR_TYPES = [
  'Gas & Atmosphere', 'Structural & Seismic', 'Water & Hydrology',
  'Air Quality & Ventilation', 'Environmental', 'Multi-Parameter'
];

const ALL_SENSORS = [
  'Methane (CH4)', 'Carbon Monoxide (CO)', 'Oxygen (O2)', 'Hydrogen Sulfide (H2S)',
  'Carbon Dioxide (CO2)', 'Nitrogen Dioxide (NO2)', 'Sulfur Dioxide (SO2)', 'Ammonia (NH3)',
  'Radon', 'Volatile Organic Compounds (VOCs)', 'Water Level', 'pH', 'Turbidity', 'Flow Rate',
  'Temperature', 'Humidity', 'Barometric Pressure', 'Vibration/Seismic', 'Shaft Tilt',
  'Acoustic Emissions', 'PM2.5 Dust', 'PM10 Dust', 'Ground Pressure', 'Cable Bolt Load',
];

const ROLES = ['Miner', 'Supervisor', 'Geologist', 'Driller', 'Electrician', 'Ventilation Tech', 'Safety Officer', 'Blasting Technician'];

// ─── default data ─────────────────────────────────────────────────────────

const defaultEmployees: Employee[] = [
  { id: 'e1', employeeNumber: 'EMP-001', name: 'Tendai Mutasa',    role: 'Miner',           location: 'Level 2 - South', helmetId: 'HLM-001', status: 'ACTIVE' },
  { id: 'e2', employeeNumber: 'EMP-002', name: 'James Chuma',      role: 'Supervisor',      location: 'Level 1 - Main',  helmetId: 'HLM-002', status: 'ACTIVE' },
  { id: 'e3', employeeNumber: 'EMP-003', name: 'Sarah Moyo',       role: 'Ventilation Tech',location: 'Level 3 - East',  helmetId: 'HLM-003', status: 'ACTIVE' },
  { id: 'e4', employeeNumber: 'EMP-004', name: 'Tafadzwa Ndlovu',  role: 'Driller',         location: 'Level 3 - East',  helmetId: 'HLM-004', status: 'ACTIVE' },
  { id: 'e5', employeeNumber: 'EMP-005', name: 'Grace Chirwa',     role: 'Geologist',       location: 'Level 3 - East',  helmetId: 'HLM-005', status: 'ACTIVE' },
  { id: 'e6', employeeNumber: 'EMP-006', name: 'Peter Sibanda',    role: 'Miner',           location: 'Level 2 - South', helmetId: 'HLM-006', status: 'ACTIVE' },
  { id: 'e7', employeeNumber: 'EMP-007', name: 'David Banda',      role: 'Electrician',     location: 'Level 1 - North', helmetId: 'HLM-007', status: 'ACTIVE' },
];

const defaultNodes: SensorNode[] = [
  { id: 'n1', nodeId: 'SG-NODE-001', name: 'Main Shaft Node',   location: 'Level 1 - Main',  type: 'Multi-Parameter',    sensors: ['Water Level', 'Vibration/Seismic', 'Shaft Tilt', 'Temperature', 'Humidity'], status: 'ONLINE' },
  { id: 'n2', nodeId: 'SG-NODE-002', name: 'South Gas Node',    location: 'Level 2 - South', type: 'Gas & Atmosphere',   sensors: ['Methane (CH4)', 'Carbon Monoxide (CO)', 'Oxygen (O2)', 'Hydrogen Sulfide (H2S)'], status: 'ONLINE' },
  { id: 'n3', nodeId: 'SG-NODE-003', name: 'East Level Node',   location: 'Level 3 - East',  type: 'Multi-Parameter',    sensors: ['Water Level', 'pH', 'Turbidity', 'Methane (CH4)', 'Carbon Monoxide (CO)'], status: 'ONLINE' },
  { id: 'n4', nodeId: 'SG-NODE-004', name: 'Ventilation Node',  location: 'Ventilation Chamber', type: 'Air Quality & Ventilation', sensors: ['PM2.5 Dust', 'PM10 Dust', 'Barometric Pressure', 'Temperature', 'Humidity'], status: 'ONLINE' },
];

// ─── Component ─────────────────────────────────────────────────────────────

export default function Settings() {
  const { mineProfile, setMineProfile } = useAppContext();
  const [activeTab, setActiveTab] = useState<'general' | 'employees' | 'nodes' | 'thresholds'>('general');

  // General
  const [operatorName, setOperatorName] = useState(mineProfile.operatorName);
  const [mineName, setMineName] = useState(mineProfile.mineName);

  // Employees
  const [employees, setEmployees] = useState<Employee[]>(defaultEmployees);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [newEmp, setNewEmp] = useState<Partial<Employee>>({ status: 'ACTIVE' });

  // Nodes
  const [nodes, setNodes] = useState<SensorNode[]>(defaultNodes);
  const [showAddNode, setShowAddNode] = useState(false);
  const [newNode, setNewNode] = useState<Partial<SensorNode>>({ sensors: [], status: 'ONLINE' });
  const [savedMsg, setSavedMsg] = useState('');

  const showSaved = () => { setSavedMsg('Saved!'); setTimeout(() => setSavedMsg(''), 2500); };

  const addEmployee = () => {
    if (!newEmp.name || !newEmp.role || !newEmp.location) return;
    const id = `e${Date.now()}`;
    const num = `EMP-${String(employees.length + 1).padStart(3, '0')}`;
    const hlm = `HLM-${String(employees.length + 1).padStart(3, '0')}`;
    setEmployees(prev => [...prev, { id, employeeNumber: newEmp.employeeNumber || num, name: newEmp.name!, role: newEmp.role!, location: newEmp.location!, helmetId: newEmp.helmetId || hlm, status: 'ACTIVE' }]);
    setNewEmp({ status: 'ACTIVE' });
    setShowAddEmployee(false);
  };

  const removeEmployee = (id: string) => setEmployees(prev => prev.filter(e => e.id !== id));

  const addNode = () => {
    if (!newNode.name || !newNode.location) return;
    const id = `n${Date.now()}`;
    const nodeId = `SG-NODE-${String(nodes.length + 1).padStart(3, '0')}`;
    setNodes(prev => [...prev, { id, nodeId: newNode.nodeId || nodeId, name: newNode.name!, location: newNode.location!, type: newNode.type || 'Multi-Parameter', sensors: newNode.sensors || [], status: 'ONLINE' }]);
    setNewNode({ sensors: [], status: 'ONLINE' });
    setShowAddNode(false);
  };

  const removeNode = (id: string) => setNodes(prev => prev.filter(n => n.id !== id));

  const toggleSensor = (sensor: string) => {
    setNewNode(prev => ({
      ...prev,
      sensors: prev.sensors?.includes(sensor)
        ? prev.sensors.filter(s => s !== sensor)
        : [...(prev.sensors || []), sensor]
    }));
  };

  const tabs = [
    { id: 'general',    label: 'General',    icon: SettingsIcon },
    { id: 'employees',  label: 'Employees & Helmets', icon: HardHat },
    { id: 'nodes',      label: 'Sensor Nodes', icon: Radio },
    { id: 'thresholds', label: 'Thresholds', icon: Sliders },
  ] as const;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Configuration</h1>
          <p className="text-slate-400 text-sm">Manage your mine profile, personnel, sensor nodes, and alert thresholds.</p>
        </div>
        {savedMsg && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold bg-emerald-900/30 border border-emerald-500/30 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4" />{savedMsg}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-0 overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === id
                ? 'border-primary text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-4 h-4" />{label}
          </button>
        ))}
      </div>

      {/* ── GENERAL TAB ── */}
      {activeTab === 'general' && (
        <div className="glass-panel p-6 space-y-5">
          <h2 className="text-lg font-bold text-white border-b border-border pb-4">Mine Profile</h2>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><User className="w-3 h-3" /> Control Room Operator</label>
            <input type="text" value={operatorName} onChange={e => setOperatorName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Building2 className="w-3 h-3" /> Mine / Operation Name</label>
            <input type="text" value={mineName} onChange={e => setMineName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Target Minerals</label>
            <p className="text-sm text-slate-300 bg-slate-900 rounded-xl px-4 py-3 border border-slate-700">{mineProfile.minerals.join(', ') || 'Not specified'}</p>
          </div>
          <button
            onClick={() => { setMineProfile({ ...mineProfile, operatorName, mineName }); showSaved(); }}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold transition-colors"
          >
            <Save className="w-4 h-4" /> Save Profile
          </button>
        </div>
      )}

      {/* ── EMPLOYEES & HELMETS TAB ── */}
      {activeTab === 'employees' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-slate-400 text-sm"><span className="font-bold text-white">{employees.length}</span> employees registered</p>
            <button onClick={() => setShowAddEmployee(true)} className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-colors text-sm">
              <Plus className="w-4 h-4" /> Add Employee
            </button>
          </div>

          {/* Add Employee form */}
          {showAddEmployee && (
            <div className="glass-panel p-6 border-primary/40 animate-in slide-in-from-top duration-300">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-primary" /> Register New Employee</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-sm">Full Name *</label>
                  <input type="text" placeholder="e.g. Chidi Okafor" value={newEmp.name || ''} onChange={e => setNewEmp(p => ({...p, name: e.target.value}))}
                    className="input-field" />
                </div>
                <div>
                  <label className="label-sm">Employee Number</label>
                  <input type="text" placeholder={`EMP-${String(employees.length + 1).padStart(3,'0')}`} value={newEmp.employeeNumber || ''} onChange={e => setNewEmp(p => ({...p, employeeNumber: e.target.value}))}
                    className="input-field" />
                </div>
                <div>
                  <label className="label-sm">Role *</label>
                  <select value={newEmp.role || ''} onChange={e => setNewEmp(p => ({...p, role: e.target.value}))} className="input-field">
                    <option value="">Select role...</option>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-sm">Assigned Zone *</label>
                  <select value={newEmp.location || ''} onChange={e => setNewEmp(p => ({...p, location: e.target.value}))} className="input-field">
                    <option value="">Select zone...</option>
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-sm">Smart Helmet ID</label>
                  <input type="text" placeholder={`HLM-${String(employees.length + 1).padStart(3,'0')}`} value={newEmp.helmetId || ''} onChange={e => setNewEmp(p => ({...p, helmetId: e.target.value}))}
                    className="input-field" />
                </div>
                <div className="flex items-end">
                  <label className="label-sm w-full">Status</label>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => { setShowAddEmployee(false); setNewEmp({ status: 'ACTIVE' }); }} className="px-5 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors text-sm">Cancel</button>
                <button onClick={addEmployee} disabled={!newEmp.name || !newEmp.role || !newEmp.location}
                  className="flex-1 py-2.5 bg-primary disabled:bg-slate-800 disabled:text-slate-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors text-sm flex justify-center items-center gap-2">
                  <HardHat className="w-4 h-4" /> Register &amp; Assign Helmet
                </button>
              </div>
            </div>
          )}

          {/* Employee table */}
          <div className="glass-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Employee</th>
                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Emp No.</th>
                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Role</th>
                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Zone</th>
                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Helmet ID</th>
                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, i) => (
                    <tr key={emp.id} className={`border-b border-border/50 hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                      <td className="p-4 font-bold text-white flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs flex-shrink-0">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {emp.name}
                      </td>
                      <td className="p-4 text-slate-300 font-mono text-xs">{emp.employeeNumber}</td>
                      <td className="p-4 text-slate-300">{emp.role}</td>
                      <td className="p-4 text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{emp.location}</td>
                      <td className="p-4 font-mono text-xs text-emerald-400">{emp.helmetId}</td>
                      <td className="p-4">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${emp.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button onClick={() => removeEmployee(emp.id)} className="text-slate-600 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── SENSOR NODES TAB ── */}
      {activeTab === 'nodes' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-slate-400 text-sm"><span className="font-bold text-white">{nodes.length}</span> sensor nodes deployed</p>
            <button onClick={() => setShowAddNode(true)} className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-colors text-sm">
              <Plus className="w-4 h-4" /> Add Sensor Node
            </button>
          </div>

          {/* Add Node form */}
          {showAddNode && (
            <div className="glass-panel p-6 border-primary/40 animate-in slide-in-from-top duration-300">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Cpu className="w-5 h-5 text-primary" /> Add New Sensor Node</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label-sm">Node Name *</label>
                  <input type="text" placeholder="e.g. North Shaft Node" value={newNode.name || ''} onChange={e => setNewNode(p => ({...p, name: e.target.value}))} className="input-field" />
                </div>
                <div>
                  <label className="label-sm">Node ID</label>
                  <input type="text" placeholder={`SG-NODE-${String(nodes.length + 1).padStart(3,'0')}`} value={newNode.nodeId || ''} onChange={e => setNewNode(p => ({...p, nodeId: e.target.value}))} className="input-field" />
                </div>
                <div>
                  <label className="label-sm">Deployment Zone *</label>
                  <select value={newNode.location || ''} onChange={e => setNewNode(p => ({...p, location: e.target.value}))} className="input-field">
                    <option value="">Select zone...</option>
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-sm">Node Type</label>
                  <select value={newNode.type || ''} onChange={e => setNewNode(p => ({...p, type: e.target.value}))} className="input-field">
                    <option value="">Select type...</option>
                    {SENSOR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="label-sm mb-2">Sensor Parameters to Monitor</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-3 bg-slate-900/50 rounded-xl border border-slate-700">
                  {ALL_SENSORS.map(sensor => (
                    <label key={sensor} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={newNode.sensors?.includes(sensor) || false}
                        onChange={() => toggleSensor(sensor)}
                        className="accent-primary"
                      />
                      <span className={`text-xs transition-colors ${newNode.sensors?.includes(sensor) ? 'text-primary font-bold' : 'text-slate-400 group-hover:text-slate-200'}`}>{sensor}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-1">{newNode.sensors?.length || 0} sensors selected</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setShowAddNode(false); setNewNode({ sensors: [], status: 'ONLINE' }); }} className="px-5 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors text-sm">Cancel</button>
                <button onClick={addNode} disabled={!newNode.name || !newNode.location}
                  className="flex-1 py-2.5 bg-primary disabled:bg-slate-800 disabled:text-slate-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors text-sm flex justify-center items-center gap-2">
                  <Radio className="w-4 h-4" /> Deploy Node
                </button>
              </div>
            </div>
          )}

          {/* Node cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nodes.map(node => (
              <div key={node.id} className="glass-panel p-5 relative group">
                <button onClick={() => removeNode(node.id)} className="absolute top-4 right-4 text-slate-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${node.status === 'ONLINE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      <Radio className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{node.name}</h3>
                      <p className="text-xs font-mono text-slate-500">{node.nodeId}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-1 rounded-full border ${
                    node.status === 'ONLINE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                    node.status === 'FAULT'  ? 'bg-amber-500/10  text-amber-400  border-amber-500/30' :
                                               'bg-red-500/10    text-red-400    border-red-500/30'
                  }`}>{node.status}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-3">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />{node.location}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {node.sensors.map(s => (
                    <span key={s} className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-medium">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── THRESHOLDS TAB ── */}
      {activeTab === 'thresholds' && (
        <div className="glass-panel p-6 space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-border pb-4">Alert Thresholds</h2>
          <div className="p-3 bg-amber-900/10 border border-amber-500/20 rounded-lg flex items-start">
            <AlertTriangle className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400"><strong className="text-slate-300">Note:</strong> Thresholds require field validation and engineering calibration before real-world deployment.</p>
          </div>
          {[
            { label: 'Water Level Critical (%)', min: 0, max: 100, step: 1, def: 75 },
            { label: 'Methane Warning (% LEL)', min: 0, max: 5, step: 0.1, def: 1.0 },
            { label: 'CO Warning (ppm)', min: 0, max: 200, step: 5, def: 25 },
            { label: 'O₂ Low Alarm (%)', min: 16, max: 21, step: 0.1, def: 19.5 },
            { label: 'H₂S Alarm (ppm)', min: 0, max: 50, step: 1, def: 10 },
            { label: 'Tilt Warning (°)', min: 0, max: 5, step: 0.1, def: 1.5 },
          ].map(({ label, min, max, step, def }) => {
            const [val, setVal] = useState(def);
            return (
              <div key={label}>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider">{label}</label>
                  <span className="text-sm font-black text-primary">{val}</span>
                </div>
                <input type="range" min={min} max={max} step={step} value={val} onChange={e => setVal(Number(e.target.value))} className="w-full accent-primary" />
              </div>
            );
          })}
          <button onClick={showSaved} className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold transition-colors">
            <Save className="w-4 h-4" /> Save Thresholds
          </button>
        </div>
      )}
    </div>
  );
}
