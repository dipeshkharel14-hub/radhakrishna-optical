"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PrescriptionMatrix from '@/components/PrescriptionMatrix';
import FinanceStats from '@/components/FinanceStats';
import StockManager from '@/components/StockManager';
import BottomNav from '@/components/BottomNav';
import { db } from '@/lib/db';

export default function LuxuryDashboard() {
  const [activeTab, setActiveTab] = useState('billing');
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    await db.bills.add({ 
      ...data, 
      date: new Date().toISOString(),
      finance: { 
        total: Number(data.total || 0), 
        advance: Number(data.advance || 0), 
        balance: Number(data.total || 0) - Number(data.advance || 0) 
      } 
    });
    alert("Bill Saved Successfully!");
    reset();
  };

  return (
    <main className="max-w-4xl mx-auto p-4 pb-32 min-h-screen text-white bg-black">
      <header className="py-6 text-center">
        <h1 className="text-3xl font-black tracking-tighter uppercase">Radhakrishna <span className="text-emerald-500">Optical</span></h1>
      </header>

      <div className="space-y-6">
        {activeTab === 'billing' && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="glass p-5 rounded-3xl grid grid-cols-1 gap-4 border border-white/5">
              <input {...register("name")} placeholder="Customer Name" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-emerald-500" />
              <input {...register("phone")} placeholder="Phone Number" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-emerald-500" />
            </div>
            <PrescriptionMatrix register={register} />
            <button type="submit" className="w-full bg-emerald-500 text-black font-black py-5 rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">SAVE BILL</button>
          </form>
        )}

        {activeTab === 'finance' && <FinanceStats />}
        {activeTab === 'stock' && <StockManager />}
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}
