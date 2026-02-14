
import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { signOut, User } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import MyFiles from './MyFiles';
import MyNotes from './MyNotes';
import TeamMembers from './TeamMembers';

const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800 p-5 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-400 uppercase tracking-wider">{title}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [activeTab, setActiveTab] = useState('files');
  const [counts, setCounts] = useState({ files: 0, notes: 0, members: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);

    const fetchCounts = async () => {
      if (currentUser) {
        setLoading(true);
        try {
          const filesRef = collection(db, `users/${currentUser.uid}/files`);
          const notesRef = collection(db, `users/${currentUser.uid}/notes`);
          const membersRef = collection(db, `users/${currentUser.uid}/teamMembers`);

          const [filesSnap, notesSnap, membersSnap] = await Promise.all([
            getDocs(filesRef),
            getDocs(notesRef),
            getDocs(membersRef),
          ]);
          
          setCounts({
            files: filesSnap.size,
            notes: notesSnap.size,
            members: membersSnap.size,
          });
        } catch (error) {
          console.error("Error fetching counts:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCounts();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'files':
        return <MyFiles user={user!} />;
      case 'notes':
        return <MyNotes user={user!} />;
      case 'members':
        return <TeamMembers user={user!} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 antialiased">
      <header className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold">V</div>
            <span className="font-outfit font-bold text-xl text-white">VaultFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">{user?.displayName || user?.email}</p>
              <p className="text-xs text-slate-400">Standard Plan</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
              title="Logout"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold font-outfit text-white mb-4">Dashboard</h1>
        <p className="text-slate-400 mb-8">Welcome back! Here's your workspace overview.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-slate-900/40 rounded-2xl p-5 h-24 animate-pulse"></div>
            ))
          ) : (
            <>
              <StatCard title="Files" value={counts.files} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>} />
              <StatCard title="Notes" value={counts.notes} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>} />
              <StatCard title="Team Members" value={counts.members} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>} />
            </>
          )}
        </div>

        <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-[1.5rem] p-2 flex items-center gap-2 self-start mb-8">
          <button onClick={() => setActiveTab('files')} className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${activeTab === 'files' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>My Files</button>
          <button onClick={() => setActiveTab('notes')} className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${activeTab === 'notes' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>My Notes</button>
          <button onClick={() => setActiveTab('members')} className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${activeTab === 'members' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>Team Members</button>
        </div>

        <div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
