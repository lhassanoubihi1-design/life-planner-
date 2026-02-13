
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-48 pb-32 px-6 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-600/10 blur-[100px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-emerald-600/5 blur-[150px] rounded-full -z-10 rotate-12"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-300 font-bold text-[10px] tracking-[0.2em] uppercase">Powered by Gemini 3 Pro</span>
        </div>
        
        {/* Headline */}
        <h1 className="text-6xl md:text-9xl font-black font-outfit text-white mb-8 leading-[0.95] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000">
          DESIGN YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-teal-400 to-green-400 animate-gradient">ULTIMATE LIFE.</span>
        </h1>
        
        {/* Sub-headline */}
        <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-14 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          The first hyper-intelligent planner that translates your wildest ambitions into a high-performance daily protocol.
        </p>
        
        {/* Premium CTA Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <a 
            href="#planner" 
            className="group relative w-full sm:w-auto px-12 py-5 bg-white text-slate-950 rounded-2xl font-black text-lg shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <span className="relative flex items-center gap-3">
              Generate My Blueprint
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </span>
          </a>
          
          <button className="w-full sm:w-auto px-12 py-5 bg-slate-900/50 backdrop-blur-xl text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
            See Methodology
          </button>
        </div>
        
        {/* Product Visual */}
        <div className="mt-32 relative group max-w-5xl mx-auto">
          {/* Glass Card Container */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-green-500/50 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-slate-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl aspect-[16/8]">
             {/* Mock UI Elements */}
             <div className="absolute top-0 left-0 right-0 h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                <div className="ml-4 h-5 w-48 bg-white/5 rounded-full border border-white/10"></div>
             </div>
             
             <img 
               src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1600&h=800" 
               alt="Life Planning Interface" 
               className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-100 transition-transform duration-1000"
             />
             
             {/* Gradient Overlay for Depth */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
             
             {/* Floating Info Cards (Aesthetic) */}
             <div className="absolute bottom-12 left-12 p-6 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl hidden md:block animate-bounce shadow-2xl" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-xl shadow-lg shadow-emerald-500/20">⚡</div>
                  <div>
                    <p className="text-white font-bold text-sm">Deep Work Session</p>
                    <p className="text-emerald-300 text-xs font-medium">9:00 AM — 12:00 PM</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
