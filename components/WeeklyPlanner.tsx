
import React from 'react';
import { DaySchedule } from '../types';

interface WeeklyPlannerProps {
  schedule: DaySchedule[];
}

const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({ schedule }) => {
  return (
    <div className="mt-20">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-bold font-outfit text-white mb-3">Seven-Day Roadmap</h2>
        <p className="text-slate-400">Your week structured for progressive momentum.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {schedule.map((item, idx) => (
          <div 
            key={idx} 
            className="group relative bg-slate-900/40 border border-slate-800 p-5 rounded-3xl hover:bg-slate-800/60 hover:border-indigo-500/50 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
            </div>
            
            <span className="block text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">
              {item.day}
            </span>
            
            <h4 className="text-slate-100 font-bold mb-3 leading-tight min-h-[40px]">
              {item.focus}
            </h4>
            
            <div className="pt-4 border-t border-slate-800/50">
              <p className="text-sm text-slate-400 leading-relaxed italic">
                "{item.keyTask}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPlanner;
