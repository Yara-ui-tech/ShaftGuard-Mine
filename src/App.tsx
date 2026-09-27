import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Activity, Droplets, Wind, ShieldAlert, Cpu, Settings as SettingsIcon, Map, BarChart3, Info, LayoutDashboard, Menu, X, PlayCircle } from 'lucide-react';
import { useAppContext } from './context/AppContext';

// Placeholder Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ShaftGuardS from './pages/ShaftGuardS';
import ShaftGuardW from './pages/ShaftGuardW';
import FutureModules from './pages/FutureModules';
import Alerts from './pages/Alerts';
import SensorData from './pages/SensorData';
import Reports from './pages/Reports';
import Architecture from './pages/Architecture';
import About from './pages/About';
import Settings from './pages/Settings';
import AirGuard from './pages/AirGuard';
import Personnel from './pages/Personnel';
import AiPredictions from './pages/AiPredictions';
import GlobalAlarm from './components/GlobalAlarm';

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) => {
  const location = useLocation();
  const { demoState, setDemoState, isPitchMode, setPitchMode } = useAppContext();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Shaft Safety', path: '/shaft', icon: Activity },
    { name: 'Water Monitoring', path: '/water', icon: Droplets },
    { name: 'Air Guard', path: '/air', icon: Wind },
    { name: 'Personnel', path: '/personnel', icon: Activity },
    { name: 'AI Predictions', path: '/ai-predictions', icon: Activity },
    { name: 'Environmental', path: '/modules', icon: Wind },
    { name: 'Processing', path: '/modules', icon: Cpu },
    { name: 'Alerts', path: '/alerts', icon: ShieldAlert },
    { name: 'Sensor Data', path: '/data', icon: BarChart3 },
    { name: 'Architecture', path: '/architecture', icon: Map },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
    { name: 'About', path: '/about', icon: Info },
  ];

  if (isPitchMode) {
    return (
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border transition-transform transform">
         <div className="flex flex-col h-full p-4">
           <h2 className="text-xl font-bold text-white mb-8">PITCH MODE</h2>
           <button onClick={() => setPitchMode(false)} className="px-4 py-2 bg-primary rounded-lg text-white font-medium hover:bg-blue-600 transition-colors">
             Exit Pitch Mode
           </button>
           <div className="mt-auto">
             <div className="text-xs text-secondary">
               Simplified view for rapid demonstration.
             </div>
           </div>
         </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <ShieldAlert className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold text-white tracking-wide">SHAFTGUARD<span className="text-primary">AI</span></span>
          </Link>
          <button className="lg:hidden text-secondary hover:text-white" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-6 p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg">
            <div className="text-xs font-semibold text-blue-400 mb-1 flex items-center">
              <PlayCircle className="w-3 h-3 mr-1" />
              DEMO MODE: ON
            </div>
            <div className="text-[10px] text-secondary">SIMULATED SENSOR DATA</div>
            
            <div className="mt-3 space-y-2">
              <button 
                onClick={() => setDemoState('NORMAL')}
                className={`w-full text-xs py-1.5 rounded transition-colors ${demoState === 'NORMAL' ? 'bg-success/20 text-success border border-success/30' : 'bg-surface hover:bg-border text-slate-300'}`}
              >
                NORMAL
              </button>
              <button 
                onClick={() => setDemoState('WARNING')}
                className={`w-full text-xs py-1.5 rounded transition-colors ${demoState === 'WARNING' ? 'bg-warning/20 text-warning border border-warning/30' : 'bg-surface hover:bg-border text-slate-300'}`}
              >
                WARNING
              </button>
              <button 
                onClick={() => setDemoState('DANGER')}
                className={`w-full text-xs py-1.5 rounded transition-colors ${demoState === 'DANGER' ? 'bg-danger/20 text-danger border border-danger/30' : 'bg-surface hover:bg-border text-slate-300'}`}
              >
                DANGER
              </button>
            </div>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-slate-400 hover:bg-surface hover:text-white'
                }`}
              >
                <item.icon className={`w-4 h-4 mr-3 ${location.pathname === item.path ? 'text-primary' : 'text-slate-500'}`} />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

const Header = ({ setIsSidebarOpen }: { setIsSidebarOpen: (val: boolean) => void }) => {
  const { demoState, setPitchMode } = useAppContext();
  
  return (
    <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-30 px-4 flex items-center justify-between lg:justify-end">
      <button 
        className="lg:hidden text-secondary hover:text-white"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${demoState === 'NORMAL' ? 'bg-success' : demoState === 'WARNING' ? 'bg-warning' : 'bg-danger'}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${demoState === 'NORMAL' ? 'bg-success' : demoState === 'WARNING' ? 'bg-warning' : 'bg-danger'}`}></span>
          </span>
          <span className="text-sm font-medium text-slate-300">SYSTEM: ONLINE</span>
        </div>
        <div className="h-6 w-px bg-border hidden sm:block"></div>
        <button 
          onClick={() => setPitchMode(true)}
          className="text-sm font-medium text-secondary hover:text-white transition-colors"
        >
          Engineering Demo
        </button>
      </div>
    </header>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col lg:pl-64 transition-all">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
        <footer className="mt-auto py-6 border-t border-border px-6">
          <p className="text-xs text-secondary text-center">
            SHAFTGUARD AI is a prototype monitoring and early-warning system. Sensor thresholds and risk classifications require engineering validation and field calibration. The system does not replace certified mine-safety procedures, professional inspections or laboratory environmental testing.
          </p>
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <GlobalAlarm />
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shaft" element={<ShaftGuardS />} />
          <Route path="/water" element={<ShaftGuardW />} />
          <Route path="/air" element={<AirGuard />} />
          <Route path="/personnel" element={<Personnel />} />
          <Route path="/ai-predictions" element={<AiPredictions />} />
          <Route path="/modules" element={<FutureModules />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/data" element={<SensorData />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
