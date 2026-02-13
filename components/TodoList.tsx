
import React, { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Define quarterly vision', completed: true },
    { id: '2', text: 'Optimize morning protocol', completed: false },
    { id: '3', text: 'Review weekly performance metrics', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 -mt-10 relative z-20">
      <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold font-outfit text-white">Daily Focus</h3>
            <p className="text-sm text-slate-400">High-priority tasks for today</p>
          </div>
          <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-widest">
            {todos.filter(t => t.completed).length} / {todos.length} Done
          </div>
        </div>

        <form onSubmit={addTodo} className="mb-8 flex gap-3">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new priority..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
          <button 
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-2xl transition-all active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </form>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-slate-500 py-4 italic">No tasks for today. Start fresh!</p>
          ) : (
            todos.map(todo => (
              <div 
                key={todo.id} 
                className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                  todo.completed 
                    ? 'bg-slate-950/20 border-white/5 opacity-50' 
                    : 'bg-white/5 border-white/5 hover:border-white/10'
                }`}
              >
                <button 
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${
                    todo.completed 
                      ? 'bg-emerald-500 border-emerald-500' 
                      : 'border-slate-700 hover:border-emerald-500/50'
                  }`}
                >
                  {todo.completed && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span className={`flex-1 text-slate-200 transition-all ${todo.completed ? 'line-through text-slate-500' : ''}`}>
                  {todo.text}
                </span>
                <button 
                  onClick={() => removeTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TodoList;
