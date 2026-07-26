import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const faqs = [
    {
      q: 'Do you sell genuine brand laptops and computer components?',
      a: 'Yes, 100%! All devices, GPUs, CPUs, and accessories sold at NexusTech are brand-new, original sealed items sourced directly from Dell, Apple, ASUS, Lenovo, HP, NVIDIA, and Corsair with official manufacturer warranties.'
    },
    {
      q: 'How long does a laptop screen or battery replacement take?',
      a: 'Standard laptop screen and battery replacements are completed within 24 hours at our certified service centers. For urgent walk-in appointments, express 2-hour repairs are available.'
    },
    {
      q: 'How does the automated Custom PC Builder tool verify compatibility?',
      a: 'Our compatibility engine checks CPU socket matches (e.g., LGA1700 vs AM5), DDR4 vs DDR5 RAM generation, motherboard form-factor dimensions, and calculates total TDP wattage to ensure your PSU has adequate headroom.'
    },
    {
      q: 'What is your warranty policy on hardware repairs?',
      a: 'All micro-soldering, screen replacements, and hardware repairs conducted by NexusTech engineers include a 1-Year Comprehensive Service Warranty.'
    },
    {
      q: 'Can I trade in my old laptop for instant credit toward a new PC?',
      a: 'Yes! Use our online Trade-In Valuation tool to get an instant quote. You can claim a voucher code to apply store credit during checkout.'
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase">
          Help & Knowledge Base
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Find answers to common questions about products, shipping, custom PC builds, and repair service policies.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2 cursor-pointer transition-all"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIdx === idx ? 'rotate-180 text-blue-600' : ''}`} />
            </div>

            {openIdx === idx && (
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
