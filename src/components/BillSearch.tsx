"use client"
import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

export default function BillSearch() {
  const [query, setQuery] = useState('');
  const results = useLiveQuery(() => 
    db.bills.filter(b => b.name.toLowerCase().includes(query.toLowerCase())).toArray()
  , [query]);

  return (
    <div className="space-y-4">
      <input 
        placeholder="Search Patient Name..." 
        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:ring-2 ring-emerald-500/50 transition-all font-medium"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="space-y-3">
        {results?.map(bill => (
          <div key={bill.id} className="p-4 glass rounded-2xl border-l-4 border-emerald-500 flex justify-between items-center">
            <div>
              <p className="font-bold text-white">{bill.name}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{new Date(bill.date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 font-mono font-bold">Rs. {bill.finance.total}</p>
              <p className="text-[10px] text-slate-600">Bal: Rs. {bill.finance.balance}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
