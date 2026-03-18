"use client"
import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

export default function FinanceStats() {
  const [range, setRange] = useState({ start: '', end: '' });

  const report = useLiveQuery(async () => {
    if (!range.start || !range.end) return null;
    const bills = await db.bills
      .where('date')
      .between(range.start, range.end, true, true)
      .toArray();

    const revenue = bills.reduce((acc, b) => acc + (Number(b.finance.total) || 0), 0);
    const cost = bills.reduce((acc, b) => acc + (Number(b.finance.cost) || 0), 0);
    const profit = revenue - cost;

    return { revenue, cost, profit, count: bills.length };
  }, [range]);

  return (
    <div className="p-6 glass rounded-[2rem] space-y-6 border border-emerald-500/20 shadow-2xl shadow-emerald-500/5">
      <div className="flex justify-between items-center">
        <h2 className="text-emerald-400 font-bold tracking-tighter text-xl uppercase">Finance Intel</h2>
        <div className="flex gap-2">
          <input type="date" onChange={e => setRange({...range, start: e.target.value})} className="bg-black/50 border border-white/10 rounded-lg p-2 text-[10px] outline-none focus:border-emerald-500" />
          <input type="date" onChange={e => setRange({...range, end: e.target.value})} className="bg-black/50 border border-white/10 rounded-lg p-2 text-[10px] outline-none focus:border-emerald-500" />
        </div>
      </div>

      {report ? (
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center">
            <p className="text-[10px] uppercase text-emerald-500 font-bold tracking-widest mb-1">Net Profit</p>
            <p className="text-4xl font-black text-white">Rs. {report.profit.toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-[10px] text-slate-500 uppercase">Total Revenue</p>
              <p className="text-lg font-bold">Rs. {report.revenue}</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-[10px] text-slate-500 uppercase">Total Cost</p>
              <p className="text-lg font-bold">Rs. {report.cost}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-40 flex items-center justify-center border border-dashed border-white/10 rounded-2xl">
          <p className="text-slate-600 text-xs italic">Select date range for analytics...</p>
        </div>
      )}
    </div>
  );
}
