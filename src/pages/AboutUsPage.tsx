import React from 'react';
import { Cpu, ShieldCheck, Award, Users, CheckCircle2 } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase">
          Empowering Next-Gen Computing Since 2012
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          About NexusTech Computer Store & Lab
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          NexusTech is a premier authorized hardware retailer and certified repair facility specializing in high-performance laptops, custom gaming desktops, printers, enterprise server components, and micro-soldering electronics repair.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-400">12+</div>
          <p className="text-[11px] font-bold text-slate-500">Years Experience</p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-400">50K+</div>
          <p className="text-[11px] font-bold text-slate-500">Happy Customers</p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-400">18K+</div>
          <p className="text-[11px] font-bold text-slate-500">Devices Repaired</p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-400">100%</div>
          <p className="text-[11px] font-bold text-slate-500">Genuine OEM Parts</p>
        </div>
      </div>

    </div>
  );
};
