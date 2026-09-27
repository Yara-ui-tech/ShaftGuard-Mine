
import { Layers, Cpu, BrainCircuit, Radio, LayoutDashboard, Users, ArrowDown, Battery, Sun, Zap, Info } from 'lucide-react';

export default function Architecture() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Architecture</h1>
          <p className="text-slate-400 text-sm">Technical overview of the SHAFTGUARD AI platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Layer Stack Diagram */}
        <div className="glass-panel p-6 sm:p-10 flex flex-col items-center">
          <div className="w-full max-w-md space-y-4">
            
            {/* User Layer */}
            <div className="w-full bg-surface border-2 border-slate-600 rounded-xl p-4 text-center relative z-10 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-slate-400 mr-2" />
                <h3 className="font-bold text-slate-300">6. User Layer</h3>
              </div>
              <p className="text-xs text-slate-400">Mine operators / supervisors / safety personnel</p>
            </div>
            
            <div className="flex justify-center -my-3 z-0 relative"><ArrowDown className="w-5 h-5 text-slate-600" /></div>
            
            {/* Platform Layer */}
            <div className="w-full bg-blue-900/20 border-2 border-blue-500/50 rounded-xl p-4 text-center relative z-10 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <div className="flex items-center justify-center mb-2">
                <LayoutDashboard className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="font-bold text-blue-300">5. Platform Layer</h3>
              </div>
              <p className="text-xs text-blue-200/70">SHAFTGUARD AI Dashboard + Database</p>
            </div>
            
            <div className="flex justify-center -my-3 z-0 relative"><ArrowDown className="w-5 h-5 text-slate-600" /></div>
            
            {/* Communication Layer */}
            <div className="w-full bg-surface border-2 border-slate-600 rounded-xl p-4 text-center relative z-10 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Radio className="w-5 h-5 text-slate-400 mr-2" />
                <h3 className="font-bold text-slate-300">4. Communication Layer</h3>
              </div>
              <p className="text-xs text-slate-400">GSM / LoRa / Wi-Fi</p>
            </div>
            
            <div className="flex justify-center -my-3 z-0 relative"><ArrowDown className="w-5 h-5 text-slate-600" /></div>
            
            {/* Intelligence Layer */}
            <div className="w-full bg-purple-900/20 border-2 border-purple-500/50 rounded-xl p-4 text-center relative z-10 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <div className="flex items-center justify-center mb-2">
                <BrainCircuit className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="font-bold text-purple-300">3. Intelligence Layer</h3>
              </div>
              <p className="text-xs text-purple-200/70">Rule-based detection + AI-assisted anomaly detection</p>
            </div>
            
            <div className="flex justify-center -my-3 z-0 relative"><ArrowDown className="w-5 h-5 text-slate-600" /></div>
            
            {/* Edge Layer */}
            <div className="w-full bg-emerald-900/20 border-2 border-emerald-500/50 rounded-xl p-4 text-center relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <div className="flex items-center justify-center mb-2">
                <Cpu className="w-5 h-5 text-emerald-400 mr-2" />
                <h3 className="font-bold text-emerald-300">2. Edge Layer</h3>
              </div>
              <p className="text-xs text-emerald-200/70">ESP32 Edge Processing Node</p>
            </div>
            
            <div className="flex justify-center -my-3 z-0 relative"><ArrowDown className="w-5 h-5 text-slate-600" /></div>
            
            {/* Sensor Layer */}
            <div className="w-full bg-surface border-2 border-slate-600 rounded-xl p-4 text-center relative z-10 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Layers className="w-5 h-5 text-slate-400 mr-2" />
                <h3 className="font-bold text-slate-300">1. Sensor Layer</h3>
              </div>
              <p className="text-xs text-slate-400">Physical sensor arrays</p>
            </div>
            
          </div>
        </div>

        {/* Details & AI Component */}
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-white mb-6">AI-ASSISTED RISK DETECTION</h2>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              The intelligence layer analyses sensor readings and combinations of changing conditions to identify abnormal patterns and assign a prototype risk level.
            </p>
            
            <div className="bg-surface border border-border rounded-xl p-5 relative overflow-hidden">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex space-x-2 mb-3">
                  <div className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded text-xs font-bold border border-blue-500/30">Water ↑</div>
                  <span className="text-slate-500 font-bold">+</span>
                  <div className="bg-amber-900/30 text-amber-400 px-3 py-1 rounded text-xs font-bold border border-amber-500/30">Vibration ↑</div>
                  <span className="text-slate-500 font-bold">+</span>
                  <div className="bg-orange-900/30 text-orange-400 px-3 py-1 rounded text-xs font-bold border border-orange-500/30">Tilt ↑</div>
                </div>
                
                <div className="w-full border-b-2 border-dashed border-slate-600 my-2"></div>
                <div className="text-sm font-bold text-slate-300 mb-3">Abnormal combination detected</div>
                
                <ArrowDown className="w-4 h-4 text-slate-500 mb-2" />
                <div className="text-xs font-bold text-purple-400 tracking-wider mb-1">RISK ENGINE</div>
                <ArrowDown className="w-4 h-4 text-slate-500 mb-2" />
                
                <div className="bg-red-500 text-white font-black px-6 py-2 rounded-lg text-lg mb-3 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  HIGH RISK (91)
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-xs font-bold text-red-400 bg-red-900/20 px-3 py-1 rounded border border-red-500/30">
                    <Zap className="w-3 h-3 mr-1" /> Local Alarm
                  </div>
                  <span className="text-slate-500 font-bold">+</span>
                  <div className="flex items-center text-xs font-bold text-amber-400 bg-amber-900/20 px-3 py-1 rounded border border-amber-500/30">
                    <Radio className="w-3 h-3 mr-1" /> Remote Alert
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-purple-900/10 border border-purple-500/20 rounded-lg flex items-start">
              <Info className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400">
                <strong className="text-slate-300">Prototype AI/risk model.</strong> Future field data will be used for calibration and validation.
              </p>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-white mb-6">LOCAL WARNING SYSTEM</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-32 h-40 bg-surface border-2 border-slate-600 rounded-xl flex flex-col justify-between p-3">
                <div className="w-full h-8 bg-blue-900/40 border border-blue-500/30 rounded flex items-center justify-center">
                  <Sun className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-center">
                  <div className="text-[8px] font-bold text-slate-500 mb-1">ESP32 NODE</div>
                  <div className="flex justify-center space-x-1 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div className="w-full h-6 bg-slate-800 rounded border border-slate-700 flex items-center justify-center">
                  <Battery className="w-4 h-4 text-emerald-500" />
                </div>
                
                {/* Sensors sticking out */}
                <div className="absolute -left-2 top-10 w-4 h-2 bg-slate-500 rounded-l"></div>
                <div className="absolute -left-2 top-20 w-4 h-2 bg-slate-500 rounded-l"></div>
                {/* Antenna */}
                <div className="absolute -top-4 right-4 w-1 h-6 bg-slate-400 rounded-t"></div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-300 mb-2">Autonomous Edge Node</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  The system is designed to provide local warnings via buzzers and LED indicators without depending entirely on a smartphone or internet connection.
                </p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li className="flex items-center"><Zap className="w-3 h-3 mr-2 text-primary" /> Solar panel + Charge controller</li>
                  <li className="flex items-center"><Zap className="w-3 h-3 mr-2 text-primary" /> Rechargeable battery</li>
                  <li className="flex items-center"><Zap className="w-3 h-3 mr-2 text-primary" /> ESP32 Microcontroller</li>
                  <li className="flex items-center"><Zap className="w-3 h-3 mr-2 text-primary" /> GSM/LoRa Communication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Validation Roadmap */}
      <div className="glass-panel p-6">
        <h2 className="text-xl font-bold text-white mb-8 text-center">VALIDATION ROADMAP</h2>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface -translate-y-1/2 hidden md:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mb-3 text-white font-bold text-sm shadow-[0_0_10px_rgba(59,130,246,0.5)]">1</div>
              <h4 className="text-xs font-bold text-primary mb-1">Stage 1</h4>
              <p className="text-[10px] text-slate-400">Simulated sensor data (Current)</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center opacity-70">
              <div className="w-8 h-8 rounded-full bg-surface border-2 border-border flex items-center justify-center mb-3 text-slate-400 font-bold text-sm">2</div>
              <h4 className="text-xs font-bold text-slate-300 mb-1">Stage 2</h4>
              <p className="text-[10px] text-slate-500">Controlled lab prototype</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center opacity-50">
              <div className="w-8 h-8 rounded-full bg-surface border-2 border-border flex items-center justify-center mb-3 text-slate-400 font-bold text-sm">3</div>
              <h4 className="text-xs font-bold text-slate-300 mb-1">Stage 3</h4>
              <p className="text-[10px] text-slate-500">Miniature mine test rig</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center opacity-40">
              <div className="w-8 h-8 rounded-full bg-surface border-2 border-border flex items-center justify-center mb-3 text-slate-400 font-bold text-sm">4</div>
              <h4 className="text-xs font-bold text-slate-300 mb-1">Stage 4</h4>
              <p className="text-[10px] text-slate-500">Controlled field testing</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center opacity-30">
              <div className="w-8 h-8 rounded-full bg-surface border-2 border-border flex items-center justify-center mb-3 text-slate-400 font-bold text-sm">5</div>
              <h4 className="text-xs font-bold text-slate-300 mb-1">Stage 5</h4>
              <p className="text-[10px] text-slate-500">Real mining environment</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center opacity-20">
              <div className="w-8 h-8 rounded-full bg-surface border-2 border-border flex items-center justify-center mb-3 text-slate-400 font-bold text-sm">6</div>
              <h4 className="text-xs font-bold text-slate-300 mb-1">Stage 6</h4>
              <p className="text-[10px] text-slate-500">Model calibration</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
