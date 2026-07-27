import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-[#3F5B43]/15 dark:bg-[#8FAE83]/15 text-[#3F5B43] dark:text-[#8FAE83] text-xs font-semibold tracking-wider uppercase">
          Crafting Heritage & Technology Since 2012
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
          About Shenoy Computers & Technical Atelier
        </h1>
        <p className="text-xs sm:text-sm text-[#6F665F] dark:text-[#C5BFB8] leading-relaxed">
          Shenoy Computers is a premier authorized hardware retailer and certified technical repair facility specializing in high-performance laptops, custom desktop workstations, precision printers, and micro-soldering electronics repair.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl space-y-1 shadow-sm">
          <div className="text-3xl font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">14+</div>
          <p className="text-[11px] font-semibold text-[#6F665F] dark:text-[#C5BFB8]">Years of Craftsmanship</p>
        </div>

        <div className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl space-y-1 shadow-sm">
          <div className="text-3xl font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">50K+</div>
          <p className="text-[11px] font-semibold text-[#6F665F] dark:text-[#C5BFB8]">Discerning Clients</p>
        </div>

        <div className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl space-y-1 shadow-sm">
          <div className="text-3xl font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">18K+</div>
          <p className="text-[11px] font-semibold text-[#6F665F] dark:text-[#C5BFB8]">Devices Repaired</p>
        </div>

        <div className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl space-y-1 shadow-sm">
          <div className="text-3xl font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">100%</div>
          <p className="text-[11px] font-semibold text-[#6F665F] dark:text-[#C5BFB8]">Genuine OEM Warranty</p>
        </div>
      </div>

    </div>
  );
};
