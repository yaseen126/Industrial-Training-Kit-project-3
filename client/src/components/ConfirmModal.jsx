import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, item }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-white">Delete Item Record?</h3>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          Are you sure you want to delete <span className="text-white font-medium">"{item.name}"</span>? This will permanently remove the record from the database vault.
        </p>

        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={onClose}
            className="w-1/2 py-2 text-xs font-medium rounded-lg text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-1/2 inline-flex items-center justify-center py-2 text-xs font-semibold rounded-lg text-white bg-rose-600 hover:bg-rose-500 transition shadow-lg shadow-rose-600/20"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Delete Record
          </button>
        </div>
      </div>
    </div>
  );
}
