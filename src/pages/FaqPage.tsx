import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const faqs = [
    {
      q: 'Do you sell genuine brand laptops and computer components?',
      a: 'Yes, 100%! All devices, GPUs, CPUs, and accessories sold at Shenoy Computers are brand-new, original sealed items sourced directly from Dell, Apple, ASUS, Lenovo, HP, NVIDIA, and Corsair with official manufacturer warranties.'
    },
    {
      q: 'How long does a laptop screen or battery replacement take?',
      a: 'Standard laptop screen and battery replacements are completed within 24 hours at our certified service labs. For urgent appointments, express 2-hour repairs are available.'
    },
    {
      q: 'How does the automated Custom PC Studio tool verify compatibility?',
      a: 'Our compatibility engine checks CPU socket matches (e.g., LGA1700 vs AM5), DDR4 vs DDR5 RAM generation, motherboard form-factor dimensions, and calculates total TDP wattage to ensure your PSU has adequate headroom.'
    },
    {
      q: 'What is your warranty policy on hardware repairs?',
      a: 'All micro-soldering, screen replacements, and hardware repairs conducted by Shenoy Computers engineers include a 1-Year Comprehensive Service Warranty.'
    },
    {
      q: 'Can I trade in my old laptop for instant credit toward a new PC?',
      a: 'Yes! Use our online Trade-In Valuation calculator to get an instant valuation. You can claim a voucher code to apply store credit during checkout.'
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-[#3F5B43]/15 dark:bg-[#8FAE83]/15 text-[#3F5B43] dark:text-[#8FAE83] text-xs font-semibold tracking-wider uppercase">
          Client Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">
          Find answers to common questions about showroom products, shipping, custom PC builds, and repair service policies.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-5 shadow-sm space-y-2 cursor-pointer transition-all"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xs font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#3F5B43] dark:text-[#8FAE83] shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <ChevronDown className={`w-4 h-4 text-[#6F665F] transition-transform ${openIdx === idx ? 'rotate-180 text-[#3F5B43] dark:text-[#8FAE83]' : ''}`} />
            </div>

            {openIdx === idx && (
              <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] leading-relaxed pt-2 border-t border-[#D8CFC2]/60 dark:border-[#4A433D]/60">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
