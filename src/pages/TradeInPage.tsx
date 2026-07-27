import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../lib/utils';
import { 
  Laptop, 
  CheckCircle2, 
  Sparkles, 
  Ticket, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TradeInPage: React.FC = () => {
  const { showToast } = useApp();

  const [deviceType, setDeviceType] = useState('Laptop');
  const [brand, setBrand] = useState('Apple');
  const [processor, setProcessor] = useState('Intel Core i7 / Apple M1');
  const [ram, setRam] = useState('16 GB');
  const [condition, setCondition] = useState<'Flawless' | 'Good' | 'Fair'>('Good');
  const [hasCharger, setHasCharger] = useState(true);

  const [claimedVoucher, setClaimedVoucher] = useState<string | null>(null);

  // Valuation Calculation Logic
  const calculateValuation = () => {
    let base = 20750;
    if (brand === 'Apple') base += 16600;
    if (brand === 'Dell' || brand === 'ASUS' || brand === 'Lenovo') base += 9960;
    if (processor.includes('i9') || processor.includes('M2') || processor.includes('M3')) base += 18260;
    if (ram === '32 GB+') base += 8300;
    if (condition === 'Flawless') base += 8300;
    if (condition === 'Fair') base -= 6640;
    if (hasCharger) base += 2490;

    return Math.max(8300, base);
  };

  const estimatedValue = calculateValuation();

  const handleClaimVoucher = () => {
    const code = `SHENOY-TRADE-${Math.floor(1000 + Math.random() * 9000)}`;
    setClaimedVoucher(code);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    showToast(`Trade-in voucher generated: ${code}`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-[#5E8C61]/15 text-[#5E8C61] dark:text-[#76A46E] text-xs font-semibold tracking-wider uppercase">
          Sustainable Hardware Exchange Program
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
          Computer Trade-In Calculator
        </h1>
        <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">
          Exchange your pre-owned laptop or workstation for instant Shenoy Computers store credit toward a luxury flagship PC.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Interactive Device Valuation Form */}
        <div className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 sm:p-8 shadow-md space-y-6 text-xs">
          <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] flex items-center gap-2 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 pb-3">
            <Laptop className="w-4 h-4 text-[#3F5B43] dark:text-[#8FAE83]" /> Device Specifications & Condition
          </h3>

          <div>
            <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Device Type</label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED] font-semibold"
            >
              <option value="Laptop">Laptop / Ultrabook</option>
              <option value="Desktop">Desktop Tower Rig</option>
              <option value="MacBook">Apple MacBook Series</option>
              <option value="All-In-One">All-In-One PC</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED] font-semibold"
              >
                <option value="Apple">Apple</option>
                <option value="Dell">Dell</option>
                <option value="ASUS">ASUS</option>
                <option value="Lenovo">Lenovo</option>
                <option value="HP">HP</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">RAM Capacity</label>
              <select
                value={ram}
                onChange={(e) => setRam(e.target.value)}
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED] font-semibold"
              >
                <option value="8 GB">8 GB</option>
                <option value="16 GB">16 GB</option>
                <option value="32 GB+">32 GB+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Processor Class</label>
            <select
              value={processor}
              onChange={(e) => setProcessor(e.target.value)}
              className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED] font-semibold"
            >
              <option value="Intel Core i5 / AMD Ryzen 5">Intel Core i5 / AMD Ryzen 5</option>
              <option value="Intel Core i7 / Apple M1">Intel Core i7 / Apple M1</option>
              <option value="Intel Core i9 / Apple M2 / M3">Intel Core i9 / Apple M2 / M3</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-2">Physical Cosmetic Condition</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Flawless', 'Good', 'Fair'] as const).map((cond) => (
                <button
                  type="button"
                  key={cond}
                  onClick={() => setCondition(cond)}
                  className={`p-2.5 rounded-full border text-center font-semibold transition-all ${
                    condition === cond
                      ? 'border-[#3F5B43] dark:border-[#8FAE83] bg-[#3F5B43]/15 dark:bg-[#8FAE83]/15 text-[#3F5B43] dark:text-[#8FAE83]'
                      : 'border-[#D8CFC2] dark:border-[#4A433D] text-[#6F665F]'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#2D241E] dark:text-[#F5F2ED] pt-2">
            <input
              type="checkbox"
              checked={hasCharger}
              onChange={(e) => setHasCharger(e.target.checked)}
              className="rounded text-[#3F5B43]"
            />
            <span>Includes Original Power Adapter / Charger (+₹2,490)</span>
          </label>
        </div>

        {/* Valuation Result Card */}
        <div className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 sm:p-8 shadow-md space-y-6 text-xs text-center sticky top-24">
          <div className="p-6 bg-[#3F5B43] text-white rounded-3xl space-y-2 shadow-sm">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#F5F2ED]/80">Instant Valuation Credit</span>
            <div className="text-4xl font-serif font-bold text-[#D4AF5A]">{formatCurrency(estimatedValue)}</div>
            <p className="text-[11px] text-[#F5F2ED]/90">Guaranteed credit code applicable at checkout</p>
          </div>

          <div className="space-y-3 text-left border-t border-[#D8CFC2]/60 dark:border-[#4A433D]/60 pt-4">
            <div className="flex items-center gap-2 text-[#2D241E] dark:text-[#F5F2ED] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#5E8C61]" /> Valid for 14 calendar days
            </div>
            <div className="flex items-center gap-2 text-[#2D241E] dark:text-[#F5F2ED] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#3F5B43]" /> Free Class 100 Data Sanitization
            </div>
            <div className="flex items-center gap-2 text-[#2D241E] dark:text-[#F5F2ED] font-semibold">
              <Building2 className="w-4 h-4 text-[#C56A43]" /> Redeemable in-store or online
            </div>
          </div>

          {claimedVoucher ? (
            <div className="p-4 bg-[#5E8C61]/15 border border-[#5E8C61]/30 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#5E8C61]">Trade-In Credit Voucher</span>
              <div className="text-lg font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83] select-all">{claimedVoucher}</div>
              <p className="text-[10px] text-[#6F665F]">Use this code at checkout to claim {formatCurrency(estimatedValue)}</p>
            </div>
          ) : (
            <button
              onClick={handleClaimVoucher}
              className="w-full py-4 bg-[#C56A43] hover:bg-[#AA5A39] text-white font-semibold text-xs rounded-full shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" /> Claim Trade-In Store Credit Voucher
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
