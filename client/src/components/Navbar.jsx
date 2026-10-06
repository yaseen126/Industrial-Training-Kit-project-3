import React from 'react';
import { Database, ShieldCheck, Plus, DatabaseZap } from 'lucide-react';

export default function Navbar({ onOpenAdd, onSeed, itemCount }) {
  return (
    <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700/60 sticky top-0 z-30 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white tracking-tight">DecodeVault</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3 mr-1" /> Persistent DB
              </span>
            </div>
            <p className="text-xs text-slate-400">Industrial Training Kit — Project 3 (Database Integration)</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {itemCount === 0 && (
            <button
              onClick={onSeed}
              className="inline-flex items-center px-4 py-2 text-xs font-medium rounded-lg text-slate-300 bg-slate-700/70 hover:bg-slate-700 border border-slate-600 transition"
            >
              <DatabaseZap className="w-4 h-4 mr-1.5 text-amber-400" />
              Seed Sample Vault
            </button>
          )}

          <button
            onClick={onOpenAdd}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add New Item
          </button>
        </div>
      </div>
    </header>
  );
}
