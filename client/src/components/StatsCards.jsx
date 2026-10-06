import React from 'react';
import { Package, AlertTriangle, XCircle, DollarSign } from 'lucide-react';

export default function StatsCards({ items }) {
  const totalItems = items.length;
  const lowStock = items.filter((i) => i.status === 'Low Stock').length;
  const outOfStock = items.filter((i) => i.status === 'Out of Stock').length;
  const totalValue = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Items</p>
          <p className="text-2xl font-bold text-white mt-1">{totalItems}</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
          <Package className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock Items</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{lowStock}</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Out of Stock</p>
          <p className="text-2xl font-bold text-rose-400 mt-1">{outOfStock}</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
          <XCircle className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Vault Value</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <DollarSign className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
