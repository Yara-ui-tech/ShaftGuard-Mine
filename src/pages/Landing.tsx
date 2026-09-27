import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Activity, Droplets, Wind, Cpu, Settings as SettingsIcon, Play, ArrowRight, ActivitySquare } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-slate-200">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-white tracking-wide">SHAFTGUARD<span className="text-primary">AI</span></span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#problem" className="text-sm font-medium hover:text-white transition-colors">The Problem</a>
          <a href="#solution" className="text-sm font-medium hover:text-white transition-colors">Platform</a>
          <a href="#modules" className="text-sm font-medium hover:text-white transition-colors">Modules</a>
        </nav>
        <Link to="/dashboard" className="px-6 py-2.5 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
          Demo Mode
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider">Prototype Demonstration Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Detect the danger <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">before the shaft fails.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            An affordable modular mining monitoring platform designed to provide early warnings, environmental intelligence and operational visibility for Zimbabwean mining communities.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center justify-center">
              Explore Dashboard <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/architecture" className="w-full sm:w-auto px-8 py-4 bg-surface hover:bg-border text-white border border-border rounded-xl font-bold transition-all flex items-center justify-center">
              View Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 bg-surface/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">The Challenge</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Monitoring in small-scale mining</h3>
            <p className="text-lg text-slate-400">
              Small-scale mining operations can face changing underground conditions, flooding, ground movement, equipment hazards and environmental monitoring challenges. Traditional monitoring may be limited by cost, electricity availability, connectivity, and access to specialised equipment.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">The Solution</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">A Modular Intelligence Platform</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-panel p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-900/30 flex items-center justify-center mb-6 text-blue-400">
                <ActivitySquare className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Edge Computing</h4>
              <p className="text-slate-400 text-sm">Local processing of sensor data enables rapid risk detection without requiring constant cloud connectivity.</p>
            </div>
            <div className="glass-panel p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-900/30 flex items-center justify-center mb-6 text-emerald-400">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Early Warnings</h4>
              <p className="text-slate-400 text-sm">Local alarms and remote alerts trigger when abnormal combinations of conditions are detected.</p>
            </div>
            <div className="glass-panel p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-900/30 flex items-center justify-center mb-6 text-purple-400">
                <Cpu className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Modular Design</h4>
              <p className="text-slate-400 text-sm">A common platform architecture allowing new sensor modules to be added as mining needs evolve.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer / CTA */}
      <section className="py-24 border-t border-border bg-surface/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-2">ONE PLATFORM.</h2>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-12">MULTIPLE MINING INTELLIGENCE MODULES.</h3>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="px-6 py-3 rounded-full border border-border bg-background/50 text-sm text-slate-300"><span className="font-bold text-white">SHAFTGUARD-S</span> Protect the shaft.</div>
            <div className="px-6 py-3 rounded-full border border-border bg-background/50 text-sm text-slate-300"><span className="font-bold text-white">SHAFTGUARD-W</span> Monitor the water.</div>
            <div className="px-6 py-3 rounded-full border border-border bg-background/50 text-sm text-slate-300"><span className="font-bold text-white">SHAFTGUARD-A</span> Monitor air quality.</div>
            <div className="px-6 py-3 rounded-full border border-border bg-background/50 text-sm text-slate-300"><span className="font-bold text-white">SHAFTGUARD-H</span> Personnel tracking.</div>
            <div className="px-6 py-3 rounded-full border border-border bg-background/50 text-sm text-slate-300"><span className="font-bold text-white">SHAFTGUARD-E</span> Understand the environment.</div>
          </div>
          
          <h4 className="text-xl font-bold text-white mb-2">SHAFTGUARD AI</h4>
          <p className="text-primary font-medium">Detect the danger before the shaft fails.</p>
        </div>
      </section>
    </div>
  );
}
