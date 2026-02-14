
import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { auth } from './services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Allow user if they exist and their email is verified, or if they signed in via a provider that doesn't require verification (like Google)
      if (currentUser && (currentUser.emailVerified || currentUser.providerData.some(p => p.providerId !== 'password'))) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? <Dashboard /> : <Auth />;
};

export default App;
