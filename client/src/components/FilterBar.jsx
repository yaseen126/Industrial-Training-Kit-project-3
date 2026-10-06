import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

export default function FilterBar({ search, setSearch, category, setCategory, categories, onRefresh, loading }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items by name..."
          className="w-full bg-slate-900/80 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
        />
      </div>

      <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
        <div className="relative flex-1 md:flex-initial">
          <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-48 bg-slate-900/80 border border-slate-700 rounded-lg pl-9 pr-8 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 appearance-none transition"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition disabled:opacity-50"
          title="Refresh database records"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
        </button>
      </div>
    </div>
  );
}
