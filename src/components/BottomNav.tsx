"use client"
import React from 'react';

export default function BottomNav({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const tabs = [
    { id: 'billing', icon: '📄', label: 'Billing' },
    { id: 'finance', icon: '📈', label: 'Finance' },
    { id: 'stock', icon: '📦', label: 'Stock' }
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md glass rounded-full border border-white/10 p-2 flex justify-between items-center shadow-2xl z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 flex flex-col items-center py-2 transition-all duration-300 rounded-full ${
            activeTab === tab.id ? 'bg-emerald-500 text-black font-bold scale-105' : 'text-slate-400'
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          <span className="text-[10px] uppercase tracking-tighter">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
