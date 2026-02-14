
import React, { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { Note } from '../types';
import Modal from './Modal';

const MyNotes: React.FC<{ user: User }> = ({ user }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const notesRef = collection(db, `users/${user.uid}/notes`);
      const q = query(notesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setNotes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Note)));
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user.uid]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title.trim()) return;
    setIsSubmitting(true);
    try {
      const notesRef = collection(db, `users/${user.uid}/notes`);
      await addDoc(notesRef, {
        ...newNote,
        createdAt: serverTimestamp(),
      });
      setNewNote({ title: '', content: '' });
      setIsModalOpen(false);
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 bg-slate-800/50 rounded-xl animate-pulse"></div>
          ))}
        </div>
      );
    }

    if (notes.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed border-slate-800 rounded-2xl">
          <svg className="w-12 h-12 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          <h3 className="text-lg font-semibold text-white">No notes yet</h3>
          <p className="text-slate-400 mt-1">Click "New Note" to jot down your thoughts.</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <div key={note.id} className="bg-slate-800/50 p-6 rounded-xl flex flex-col hover:bg-slate-800 transition-colors">
            <h3 className="font-bold text-lg text-white mb-2 truncate">{note.title}</h3>
            <p className="text-slate-400 text-sm flex-grow line-clamp-3">{note.content || 'No content'}</p>
            <p className="text-xs text-slate-500 mt-4">{new Date(note.createdAt?.toDate()).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">My Notes</h2>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors">New Note</button>
      </div>

      {renderContent()}

      <Modal title="New Note" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleAddNote} className="space-y-4">
          <input
            type="text"
            value={newNote.title}
            onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Note Title"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <textarea
            value={newNote.content}
            onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Note Content (optional)"
            rows={4}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          ></textarea>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold bg-slate-700 hover:bg-slate-600 rounded-lg">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 rounded-lg disabled:opacity-50">{isSubmitting ? 'Saving...' : 'Save Note'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyNotes;
