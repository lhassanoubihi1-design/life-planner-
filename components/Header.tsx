
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Plans', href: '#planner' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out px-6 py-4 ${
        isScrolled 
          ? 'py-3 bg-slate-950/40 backdrop-blur-[24px] border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform duration-300">
            <span className="text-xl">A</span>
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-[2px]"></div>
          </div>
          <span className="font-outfit font-bold text-xl md:text-2xl tracking-tight text-white flex flex-col md:flex-row md:items-center">
            AI Life <span className="text-indigo-400 md:ml-1.5">Planner</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className="relative text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block bg-white text-slate-950 px-7 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Get Started
          </button>
          
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-indigo-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-600/20 active:scale-95 transition-transform">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
