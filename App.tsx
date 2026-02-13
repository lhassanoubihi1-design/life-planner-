
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TodoList from './components/TodoList';
import PlanForm from './components/PlanForm';
import PlanDisplay from './components/PlanDisplay';
import { generatePlan } from './services/aiService';
import { UserPreferences, LifePlan } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<LifePlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (prefs: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedPlan = await generatePlan(prefs);
      setPlan(generatedPlan);
      // Smooth scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while generating your plan.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden antialiased">
      <Header />
      
      <main className="relative">
        <Hero />
        
        {/* Quick Actions / Todo Section */}
        <TodoList />

        <div id="planner-section" className="relative pb-32">
          {/* Decorative background glow */}
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none"></div>
          
          <PlanForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {error && (
            <div className="max-w-4xl mx-auto px-6 mb-12 animate-in fade-in slide-in-from-top-4">
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-8 py-5 rounded-3xl flex items-center gap-4 shadow-lg shadow-red-500/5">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-red-300">Generation Error</p>
                  <p className="text-sm opacity-80">{error}</p>
                </div>
              </div>
            </div>
          )}

          {plan && <PlanDisplay plan={plan} />}
        </div>
      </main>

      <footer className="bg-slate-950 py-24 px-6 relative border-t border-slate-900">
        <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-600/20">L</div>
              <span className="font-outfit font-bold text-2xl text-white">LifePlanner.ai</span>
            </div>
            <p className="text-slate-500 max-w-sm text-center md:text-left font-light leading-relaxed">
              Leveraging neural intelligence to architect elite lifestyle protocols for the modern individual.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6 text-slate-500">
             <div className="flex gap-10 font-medium">
               <a href="#" className="hover:text-indigo-400 transition-colors">Framework</a>
               <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
               <a href="#" className="hover:text-indigo-400 transition-colors">Support</a>
             </div>
             <p className="text-sm">© {new Date().getFullYear()} AI Life Planner Labs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
