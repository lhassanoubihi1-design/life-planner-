
import React from 'react';
import { LifePlan, RoutineTask } from '../types';
import WeeklyPlanner from './WeeklyPlanner';

interface PlanDisplayProps {
  plan: LifePlan;
}

const RoutineCard: React.FC<{ title: string; tasks: RoutineTask[]; icon: string; accentColor: string }> = ({ title, tasks, icon, accentColor }) => (
  <div className="bg-slate-900/40 backdrop-blur-sm rounded-[2rem] border border-slate-800 p-8 shadow-sm flex flex-col h-full hover:border-slate-700 transition-colors">
    <div className={`w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-8 text-2xl shadow-inner`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold font-outfit text-slate-100 mb-8">{title}</h3>
    <div className="space-y-6 flex-1">
      {tasks.map((task, idx) => (
        <div key={idx} className="flex gap-5 group">
          <div className="flex flex-col items-center pt-1">
            <span className={`text-[10px] font-black ${accentColor} font-outfit uppercase tracking-widest whitespace-nowrap bg-slate-800 px-2 py-0.5 rounded-md mb-1`}>{task.time}</span>
            <div className="w-[1px] flex-1 bg-slate-800 group-last:hidden mt-2"></div>
          </div>
          <div className="flex-1 pb-4 group-last:pb-0">
            <h4 className="font-bold text-slate-200 text-base leading-tight group-hover:text-white transition-colors">{task.activity}</h4>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed font-light">{task.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan }) => {
  return (
    <section id="results" className="max-w-7xl mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <div className="inline-block px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            Analysis Complete
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-outfit text-white mb-3 tracking-tight">Your Optimized Blueprint</h2>
          <p className="text-slate-400 text-lg font-light">Engineered for sustainable growth and peak performance.</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="px-8 py-3 bg-slate-800 text-slate-100 border border-slate-700 rounded-2xl font-semibold hover:bg-slate-700 transition-all flex items-center gap-3 group"
        >
          <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
          Export Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        <RoutineCard title="AM Foundations" tasks={plan.morningRoutine} icon="🌅" accentColor="text-amber-400" />
        <RoutineCard title="Peak Momentum" tasks={plan.afternoonRoutine} icon="🔥" accentColor="text-indigo-400" />
        <RoutineCard title="PM Restoration" tasks={plan.eveningRoutine} icon="🌙" accentColor="text-fuchsia-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 overflow-hidden relative group shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <svg className="w-40 h-40 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            
            <h3 className="text-2xl font-bold font-outfit text-white mb-8 relative flex items-center gap-3">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Core Growth Habits
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {plan.habits.map((h, i) => (
                <div key={i} className="flex flex-col gap-3 bg-slate-800/30 p-6 rounded-3xl border border-slate-800/50 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-indigo-300 text-lg">{h.habit}</h4>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{h.frequency}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{h.benefit}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/10 rounded-[2rem] p-8 border border-emerald-800/30 backdrop-blur-sm">
             <div className="flex items-center gap-4 mb-5">
               <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
               </div>
               <h3 className="text-xl font-bold font-outfit text-emerald-100">Mindset Catalyst</h3>
             </div>
             <p className="text-emerald-300 italic leading-relaxed text-lg font-light">"{plan.growthMindsetTip}"</p>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900/80 rounded-[2.5rem] p-10 border border-slate-800 shadow-xl flex flex-col backdrop-blur-md">
          <h3 className="text-2xl font-bold font-outfit text-white mb-10 flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center text-lg">📅</span>
            Weekly Milestones
          </h3>
          <div className="space-y-5 flex-1">
            {plan.weeklyGoals.map((goal, i) => (
              <div key={i} className="flex items-center gap-5 p-5 rounded-2xl border border-slate-800/50 hover:bg-slate-800/40 hover:border-slate-700 transition-all group">
                <div className="relative">
                  <input type="checkbox" className="w-6 h-6 rounded-lg border-slate-700 bg-slate-950 text-indigo-500 focus:ring-indigo-600 focus:ring-offset-slate-900 cursor-pointer peer" />
                  <div className="absolute inset-0 pointer-events-none rounded-lg ring-1 ring-slate-700 group-hover:ring-slate-500 transition-all"></div>
                </div>
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors peer-checked:line-through peer-checked:text-slate-600">{goal}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 rounded-[1.5rem] bg-indigo-500/5 border border-indigo-500/10 text-center">
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em] mb-2">Systems Status</p>
            <p className="text-slate-400 font-medium text-sm">Synchronized with your Core Mission.</p>
          </div>
        </div>
      </div>

      <WeeklyPlanner schedule={plan.weeklySchedule} />
    </section>
  );
};

export default PlanDisplay;
