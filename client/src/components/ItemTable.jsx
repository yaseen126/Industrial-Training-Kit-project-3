import React from 'react';
import { Edit2, Trash2, Database, AlertCircle } from 'lucide-react';

export default function ItemTable({ items, onEdit, onDelete, loading }) {
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Low Stock':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Out of Stock':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 animate-spin">
          <Database className="w-6 h-6" />
        </div>
        <p className="text-slate-300 font-medium">Fetching records from Database Vault...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-12 text-center">
        <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white">No Inventory Items Found</h3>
        <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
          The database vault is currently empty or no items match your search filter.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/60 border-b border-slate-700/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-6">Item Name</th>
              <th className="py-3.5 px-6">Category</th>
              <th className="py-3.5 px-6">Quantity</th>
              <th className="py-3.5 px-6">Unit Price</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/40 text-sm">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-slate-700/20 transition">
                <td className="py-4 px-6 font-medium text-white">{item.name}</td>
                <td className="py-4 px-6 text-slate-300">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-700 text-xs">
                    {item.category}
                  </span>
                </td>
                <td className="py-4 px-6 font-semibold text-white">{item.quantity}</td>
                <td className="py-4 px-6 font-mono text-emerald-400">
                  ${Number(item.price).toFixed(2)}
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getBadgeStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
                      title="Edit Item (UPDATE)"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                      title="Delete Item (DELETE)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
