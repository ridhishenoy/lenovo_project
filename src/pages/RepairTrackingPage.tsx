import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../lib/utils';
import { 
  Search, 
  Wrench, 
  CheckCircle2, 
  User, 
  Phone, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export const RepairTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { repairOrders, showToast } = useApp();

  const [searchId, setSearchId] = useState(searchParams.get('id') || 'REP-8921');
  const [activeOrder, setActiveOrder] = useState(() => repairOrders[searchId] || repairOrders['REP-8921']);

  useEffect(() => {
    const urlId = searchParams.get('id');
    if (urlId && repairOrders[urlId]) {
      setSearchId(urlId);
      setActiveOrder(repairOrders[urlId]);
    }
  }, [searchParams, repairOrders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    if (repairOrders[cleanId]) {
      setActiveOrder(repairOrders[cleanId]);
      showToast(`Tracking Repair ID: ${cleanId}`, 'success');
    } else {
      showToast(`Repair ID "${cleanId}" not found. Try REP-8921 or REP-3410`, 'error');
    }
  };

  const stepsList = [
    { title: 'Received', desc: 'Device checked in at lab' },
    { title: 'Diagnosis', desc: 'Hardware bench testing' },
    { title: 'Waiting Approval', desc: 'Awaiting customer quote signoff' },
    { title: 'Repair Started', desc: 'Components & Soldering in progress' },
    { title: 'Testing', desc: 'Stress & thermal validation' },
    { title: 'Ready for Pickup', desc: 'Service completed' },
    { title: 'Delivered', desc: 'Device handed over' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-[#3F5B43]/15 dark:bg-[#8FAE83]/15 text-[#3F5B43] dark:text-[#8FAE83] text-xs font-semibold tracking-wider uppercase">
          Real-Time Bench Status Tracker
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
          Live Repair Tracker
        </h1>
        <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">
          Enter your Repair Order ID (e.g., <button onClick={() => setSearchId('REP-8921')} className="text-[#3F5B43] dark:text-[#8FAE83] font-bold underline">REP-8921</button> or <button onClick={() => setSearchId('REP-3410')} className="text-[#3F5B43] dark:text-[#8FAE83] font-bold underline">REP-3410</button>)
        </p>
      </div>

      {/* Tracker Search Input */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Repair ID (e.g. REP-8921)"
            className="w-full pl-10 pr-4 py-3 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-xs font-semibold text-[#2D241E] dark:text-[#F5F2ED] shadow-sm"
          />
          <Search className="w-4 h-4 text-[#6F665F] dark:text-[#C5BFB8] absolute left-3.5 top-3.5" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full shadow-sm transition-all"
        >
          Track
        </button>
      </form>

      {/* Active Repair Card */}
      {activeOrder && (
        <div className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 sm:p-10 shadow-md space-y-8">
          
          {/* Order Details Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-[#EEE6DA]/40 dark:bg-[#181512] rounded-3xl border border-[#D8CFC2]/60 dark:border-[#4A433D]/60 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6F665F] dark:text-[#C5BFB8]">Device Model</span>
              <p className="font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] text-base">{activeOrder.device}</p>
              <p className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8]">SN: {activeOrder.serialNumber}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#6F665F] dark:text-[#C5BFB8]">Reported Issue</span>
              <p className="font-semibold text-[#2D241E] dark:text-[#F5F2ED]">{activeOrder.issue}</p>
              <p className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8]">Est. Cost: <span className="text-[#3F5B43] dark:text-[#8FAE83] font-bold">{formatCurrency(activeOrder.estimatedCost)}</span></p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#6F665F] dark:text-[#C5BFB8]">Assigned Artisan</span>
              <p className="font-semibold text-[#2D241E] dark:text-[#F5F2ED] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#3F5B43]" /> {activeOrder.assignedTechnician}
              </p>
              <p className="text-[11px] text-[#5E8C61] font-bold">Lab Bench Status: In Diagnostics</p>
            </div>
          </div>

          {/* Vertical/Horizontal Stepper */}
          <div className="space-y-4">
            <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Service Repair Stage Progress</h3>
            
            <div className="space-y-4">
              {stepsList.map((step, idx) => {
                const isDone = idx < activeOrder.currentStepIndex;
                const isCurrent = idx === activeOrder.currentStepIndex;

                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                      isDone 
                        ? 'bg-[#5E8C61] text-white' 
                        : isCurrent 
                          ? 'bg-[#3F5B43] text-white dark:bg-[#8FAE83] dark:text-[#181512] ring-4 ring-[#3F5B43]/20' 
                          : 'bg-[#EEE6DA] dark:bg-[#2B2520] text-[#6F665F]'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="flex-1 pb-2 border-b border-[#D8CFC2]/40 dark:border-[#4A433D]/40">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-serif font-bold ${isCurrent ? 'text-[#3F5B43] dark:text-[#8FAE83]' : 'text-[#2D241E] dark:text-[#F5F2ED]'}`}>
                          {step.title}
                        </h4>
                        {isCurrent && (
                          <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#C56A43] text-white rounded-full">
                            Active Stage
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8] mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
