import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../lib/utils';
import { 
  Search, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  User, 
  Phone, 
  ShieldCheck, 
  DollarSign, 
  AlertCircle,
  MessageSquare
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
    { title: 'Testing', desc: '3DMark stress & thermal test' },
    { title: 'Ready for Pickup', desc: 'Service completed' },
    { title: 'Delivered', desc: 'Device handed over' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase">
          Real-Time Hardware Status
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Live Repair Tracker
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter your Repair Order ID (e.g., <button onClick={() => setSearchId('REP-8921')} className="text-blue-600 dark:text-cyan-400 font-bold underline">REP-8921</button> or <button onClick={() => setSearchId('REP-3410')} className="text-blue-600 dark:text-cyan-400 font-bold underline">REP-3410</button>)
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
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-md transition-all"
        >
          Track
        </button>
      </form>

      {/* Active Repair Card */}
      {activeOrder && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          
          {/* Order Details Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Device Model</span>
              <p className="font-extrabold text-slate-900 dark:text-white text-sm">{activeOrder.device}</p>
              <p className="text-[11px] text-slate-500">SN: {activeOrder.serialNumber}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Assigned Engineer</span>
              <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-blue-500" /> {activeOrder.assignedTechnician}
              </p>
              <p className="text-[11px] text-slate-500">Customer: {activeOrder.customerName}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Estimated Cost</span>
              <p className="font-black text-blue-600 dark:text-cyan-400 text-sm">{formatCurrency(activeOrder.estimatedCost)}</p>
              <p className="text-[11px] text-slate-500">Updated: {activeOrder.lastUpdated}</p>
            </div>
          </div>

          {/* Issue Note */}
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl text-xs text-amber-900 dark:text-amber-300">
            <span className="font-bold">Reported Issue: </span>
            {activeOrder.issue}
          </div>

          {/* Interactive 7-Step Timeline */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6">
              Repair Progress Timeline
            </h3>

            <div className="space-y-6 relative before:absolute before:left-4 sm:before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {stepsList.map((stepItem, idx) => {
                const isCompleted = idx <= activeOrder.currentStepIndex;
                const isCurrent = idx === activeOrder.currentStepIndex;
                const timelineLog = activeOrder.timeline?.[idx];

                return (
                  <div key={idx} className="relative flex items-start gap-4 pl-10 sm:pl-14">
                    {/* Circle icon */}
                    <div className={`absolute left-1.5 sm:left-3.5 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 animate-pulse'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex-1 bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-xs">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${isCurrent ? 'text-blue-600 dark:text-cyan-400' : isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                          Step {idx + 1}: {stepItem.title}
                        </span>
                        {timelineLog?.timestamp && (
                          <span className="text-[10px] text-slate-400 font-medium">{timelineLog.timestamp}</span>
                        )}
                      </div>

                      <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                        {stepItem.desc}
                      </p>

                      {timelineLog?.note && (
                        <div className="mt-2 p-2 bg-white dark:bg-slate-900 rounded-xl text-[11px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                          Note: {timelineLog.note}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => showToast('Technician notified. They will call you shortly.', 'info')}
            className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-blue-500" /> Request Callback From Technician
          </button>
        </div>
      )}
    </div>
  );
};
