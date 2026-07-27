import React from 'react';
import { SERVICES_LIST } from '../data/mockData';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../lib/utils';
import { 
  Wrench, 
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-[#3F5B43]/15 dark:bg-[#8FAE83]/15 text-[#3F5B43] dark:text-[#8FAE83] text-xs font-semibold tracking-wider uppercase">
          Certified Technical Lab & Atelier
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
          Computer, Workstation & Printer Services
        </h1>
        <p className="text-xs sm:text-sm text-[#6F665F] dark:text-[#C5BFB8] leading-relaxed">
          From screen replacements and motherboard micro-soldering to Class 100 cleanroom data recovery, our certified artisans deliver 24-hour diagnostic turnaround with 100% genuine OEM spare parts.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_LIST.map((srv) => (
          <div
            key={srv.id}
            className="p-8 rounded-3xl bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] shadow-sm hover:shadow-md transition-all space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] flex items-center justify-center shadow-sm">
                <Wrench className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">
                  {srv.category}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] mt-1">
                  {srv.title}
                </h3>
              </div>

              <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] leading-relaxed">
                {srv.detailedDesc}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-[#6F665F] dark:text-[#C5BFB8] uppercase tracking-wider">Service Highlights:</span>
                <ul className="space-y-2 text-xs text-[#2D241E] dark:text-[#F5F2ED]">
                  {srv.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5E8C61] dark:text-[#76A46E] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D8CFC2]/60 dark:border-[#4A433D]/60 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1 text-[11px] text-[#6F665F] dark:text-[#C5BFB8]">
                  <Clock className="w-3.5 h-3.5 text-[#8FAE83]" /> {srv.estimatedTime}
                </div>
                <div className="text-lg font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
                  Starts at {formatCurrency(srv.startingPrice)}
                </div>
              </div>

              <Link
                to="/booking"
                className="px-5 py-2.5 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full shadow-sm transition-all flex items-center gap-1.5"
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
