
import React, { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { TeamMember } from '../types';
import Modal from './Modal';

const TeamMembers: React.FC<{ user: User }> = ({ user }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const membersRef = collection(db, `users/${user.uid}/teamMembers`);
      const q = query(membersRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setMembers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember)));
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user.uid]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name.trim()) return;
    setIsSubmitting(true);
    try {
      const membersRef = collection(db, `users/${user.uid}/teamMembers`);
      await addDoc(membersRef, {
        ...newMember,
        createdAt: serverTimestamp(),
      });
      setNewMember({ name: '', role: '' });
      setIsModalOpen(false);
      fetchMembers();
    } catch (error) {
      console.error("Error adding member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 bg-slate-800/50 rounded-xl animate-pulse"></div>
          ))}
        </div>
      );
    }

    if (members.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed border-slate-800 rounded-2xl">
          <svg className="w-12 h-12 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <h3 className="text-lg font-semibold text-white">No team members yet</h3>
          <p className="text-slate-400 mt-1">Invite your first team member to collaborate.</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {members.map(member => (
          <div key={member.id} className="bg-slate-800/50 p-4 rounded-xl flex items-center justify-between hover:bg-slate-800 transition-colors">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center font-bold text-emerald-400">
                 {member.name.charAt(0).toUpperCase()}
               </div>
               <div>
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="text-sm text-slate-400">{member.role || 'Member'}</p>
               </div>
            </div>
            <button className="text-xs font-semibold text-slate-500 hover:text-white">Options</button>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Team Members</h2>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors">Add Member</button>
      </div>
      
      {renderContent()}

      <Modal title="Add Team Member" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleAddMember} className="space-y-4">
          <input
            type="text"
            value={newMember.name}
            onChange={(e) => setNewMember(prev => ({...prev, name: e.target.value}))}
            placeholder="Full Name"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            type="text"
            value={newMember.role}
            onChange={(e) => setNewMember(prev => ({...prev, role: e.target.value}))}
            placeholder="Role (e.g., Developer)"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold bg-slate-700 hover:bg-slate-600 rounded-lg">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 rounded-lg disabled:opacity-50">{isSubmitting ? 'Adding...' : 'Add Member'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeamMembers;
