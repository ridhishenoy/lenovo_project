import React from 'react';
import { SERVICES_LIST } from '../data/mockData';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  Laptop, 
  Monitor, 
  Printer, 
  HardDrive, 
  ShieldAlert, 
  Cpu, 
  Zap, 
  Building,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase">
          Certified Hardware Lab
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Computer, Laptop & Printer Repair Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          From screen replacements and motherboard micro-soldering to Class 100 cleanroom data recovery, our certified engineers deliver fast turnaround with 100% genuine OEM spare parts.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_LIST.map((srv) => (
          <div
            key={srv.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                <Wrench className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                  {srv.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {srv.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {srv.detailedDesc}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Service Highlights:</span>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {srv.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3.5 h-3.5" /> {srv.estimatedTime}
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white">
                  Starts at ${srv.startingPrice}
                </div>
              </div>

              <Link
                to="/booking"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Book Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
