
import React, { useState } from 'react';
import { UserPreferences } from '../types';

interface PlanFormProps {
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

const PlanForm: React.FC<PlanFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserPreferences>({
    name: '',
    mainGoal: '',
    currentStruggle: '',
    energyLevel: 'moderate',
    tone: 'gentle'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.mainGoal) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div id="planner" className="max-w-4xl mx-auto px-6 py-24 relative">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-fuchsia-500/20 blur-[100px] rounded-full -z-10"></div>
      
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 border border-slate-800 shadow-2xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold font-outfit text-white mb-3 tracking-tight">Build Your Blueprint</h2>
          <p className="text-slate-400 text-lg">Tell us about your aspirations and we'll handle the logistics.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-300 ml-1 uppercase tracking-widest">Name</label>
              <input 
                required
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="How shall we address you?"
                className="w-full px-6 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-slate-600"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-300 ml-1 uppercase tracking-widest">Core Mission</label>
              <input 
                required
                type="text" 
                name="mainGoal"
                value={formData.mainGoal}
                onChange={handleChange}
                placeholder="e.g. Master React in 3 months"
                className="w-full px-6 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300 ml-1 uppercase tracking-widest">Current Resistance</label>
            <textarea 
              required
              name="currentStruggle"
              value={formData.currentStruggle}
              onChange={handleChange}
              rows={4}
              placeholder="What's holding you back from your potential?"
              className="w-full px-6 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-slate-600 resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-300 ml-1 uppercase tracking-widest">Energy Profile</label>
              <select 
                name="energyLevel"
                value={formData.energyLevel}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white appearance-none cursor-pointer"
              >
                <option value="low" className="bg-slate-900">Low (Conservation Mode)</option>
                <option value="moderate" className="bg-slate-900">Moderate (Sustainable)</option>
                <option value="high" className="bg-slate-900">High (Peak Output)</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-300 ml-1 uppercase tracking-widest">Coach Archetype</label>
              <select 
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white appearance-none cursor-pointer"
              >
                <option value="gentle" className="bg-slate-900">The Nurturer (Gentle)</option>
                <option value="motivational" className="bg-slate-900">The Visionary (Motivational)</option>
                <option value="disciplined" className="bg-slate-900">The Strategist (Disciplined)</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] ${
              isLoading 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-indigo-500/25'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-6 w-6 text-indigo-400" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Intentions...
              </>
            ) : 'Architect My Plan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlanForm;
