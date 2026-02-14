
import React, { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { Folder, File } from '../types';
import Modal from './Modal';

const MyFiles: React.FC<{ user: User }> = ({ user }) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileData, setNewFileData] = useState({ name: '', size: '', folderId: '' });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const foldersRef = collection(db, `users/${user.uid}/folders`);
      const filesRef = collection(db, `users/${user.uid}/files`);
      
      const foldersQuery = query(foldersRef, orderBy('createdAt', 'desc'));
      const filesQuery = query(filesRef, orderBy('createdAt', 'desc'));

      const [foldersSnapshot, filesSnapshot] = await Promise.all([
        getDocs(foldersQuery),
        getDocs(filesQuery),
      ]);
      
      setFolders(foldersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Folder)));
      setFiles(filesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as File)));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user.uid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    setIsSubmitting(true);
    try {
      const foldersRef = collection(db, `users/${user.uid}/folders`);
      await addDoc(foldersRef, {
        name: newFolderName,
        createdAt: serverTimestamp(),
      });
      setNewFolderName('');
      setIsFolderModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error adding folder:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileData.name.trim() || !newFileData.size) return;
    setIsSubmitting(true);
    try {
      const filesRef = collection(db, `users/${user.uid}/files`);
      await addDoc(filesRef, {
        name: newFileData.name,
        size: parseFloat(newFileData.size),
        folderId: newFileData.folderId || null,
        createdAt: serverTimestamp(),
      });
      setNewFileData({ name: '', size: '', folderId: '' });
      setIsFileModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error adding file:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-slate-800/50 rounded-xl animate-pulse"></div>
          ))}
        </div>
      );
    }

    if (folders.length === 0 && files.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed border-slate-800 rounded-2xl">
          <svg className="w-12 h-12 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
          <h3 className="text-lg font-semibold text-white">No files or folders yet</h3>
          <p className="text-slate-400 mt-1">Get started by creating a folder or adding a file.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {folders.map(folder => (
          <div key={folder.id} className="bg-slate-800/50 p-5 rounded-xl flex items-center gap-4 hover:bg-slate-800 transition-colors">
            <svg className="w-8 h-8 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path></svg>
            <p className="font-semibold text-white truncate">{folder.name}</p>
          </div>
        ))}
        {files.map(file => (
          <div key={file.id} className="bg-slate-800/50 p-5 rounded-xl flex items-center gap-4 hover:bg-slate-800 transition-colors">
            <svg className="w-8 h-8 text-slate-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
            <div>
              <p className="font-semibold text-white truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{file.size} MB</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">My Files</h2>
        <div className="flex gap-2">
          <button onClick={() => setIsFolderModalOpen(true)} className="px-4 py-2 text-sm font-semibold bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">New Folder</button>
          <button onClick={() => setIsFileModalOpen(true)} className="px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors">Add File</button>
        </div>
      </div>
      
      {renderContent()}

      <Modal title="New Folder" isOpen={isFolderModalOpen} onClose={() => setIsFolderModalOpen(false)}>
        <form onSubmit={handleAddFolder}>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder Name"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsFolderModalOpen(false)} className="px-4 py-2 text-sm font-semibold bg-slate-700 hover:bg-slate-600 rounded-lg">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 rounded-lg disabled:opacity-50">{isSubmitting ? 'Creating...' : 'Create'}</button>
          </div>
        </form>
      </Modal>

      <Modal title="Add File" isOpen={isFileModalOpen} onClose={() => setIsFileModalOpen(false)}>
        <form onSubmit={handleAddFile} className="space-y-4">
          <input
            type="text"
            value={newFileData.name}
            onChange={(e) => setNewFileData(prev => ({...prev, name: e.target.value}))}
            placeholder="File Name"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            type="number"
            value={newFileData.size}
            onChange={(e) => setNewFileData(prev => ({...prev, size: e.target.value}))}
            placeholder="Size (MB)"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
            step="0.1"
          />
           <select 
              name="folderId"
              value={newFileData.folderId}
              onChange={(e) => setNewFileData(prev => ({...prev, folderId: e.target.value}))}
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-white appearance-none cursor-pointer"
            >
              <option value="">Select a folder (optional)</option>
              {folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)}
            </select>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsFileModalOpen(false)} className="px-4 py-2 text-sm font-semibold bg-slate-700 hover:bg-slate-600 rounded-lg">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 rounded-lg disabled:opacity-50">{isSubmitting ? 'Adding...' : 'Add File'}</button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default MyFiles;
