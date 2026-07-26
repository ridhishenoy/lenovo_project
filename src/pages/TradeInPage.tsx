import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../lib/utils';
import { 
  ArrowLeftRight, 
  Laptop, 
  Cpu, 
  CheckCircle2, 
  DollarSign, 
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
    let base = 250;
    if (brand === 'Apple') base += 200;
    if (brand === 'Dell' || brand === 'ASUS') base += 120;
    if (processor.includes('i9') || processor.includes('M2') || processor.includes('M3')) base += 220;
    if (ram === '32 GB+') base += 100;
    if (condition === 'Flawless') base += 100;
    if (condition === 'Fair') base -= 80;
    if (hasCharger) base += 30;

    return Math.max(100, base);
  };

  const estimatedValue = calculateValuation();

  const handleClaimVoucher = () => {
    const code = `NEXUS-TRADE-${Math.floor(1000 + Math.random() * 9000)}`;
    setClaimedVoucher(code);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    showToast(`Trade-in voucher generated: ${code}`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wider uppercase">
          E-Waste Reduction & Instant Credit
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Old Computer Trade-In Program
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Trade in your old laptop or workstation for instant NexusTech store credit toward a brand new flagship PC.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Interactive Device Valuation Form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Laptop className="w-4 h-4 text-blue-600" /> Device Specs & Condition
          </h3>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Device Type</label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold"
            >
              <option value="Laptop">Laptop / Ultrabook</option>
              <option value="Desktop">Desktop Tower Rig</option>
              <option value="MacBook">Apple MacBook Series</option>
              <option value="All-In-One">All-In-One PC</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold"
              >
                <option value="Apple">Apple</option>
                <option value="Dell">Dell</option>
                <option value="ASUS">ASUS</option>
                <option value="Lenovo">Lenovo</option>
                <option value="HP">HP</option>
                <option value="Custom">Custom Built</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Processor</label>
              <select
                value={processor}
                onChange={(e) => setProcessor(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold"
              >
                <option value="Intel Core i5 / Ryzen 5">Intel Core i5 / Ryzen 5</option>
                <option value="Intel Core i7 / Apple M1">Intel Core i7 / Apple M1</option>
                <option value="Intel Core i9 / Apple M2/M3">Intel Core i9 / Apple M2/M3</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Physical Condition</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Flawless', 'Good', 'Fair'] as const).map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCondition(c)}
                  className={`py-2 px-3 rounded-xl border font-bold text-center transition-all ${
                    condition === c
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={hasCharger}
              onChange={(e) => setHasCharger(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span>Original Power Adapter / Charger Included (+ $30)</span>
          </label>
        </div>

        {/* Estimated Valuation & Voucher Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
              Instant Estimated Trade-In Quote
            </span>
            <div className="text-4xl font-black text-white">{formatCurrency(estimatedValue)}</div>
            <p className="text-xs text-slate-300">
              Guaranteed minimum store credit upon in-store hardware inspection or mail-in appraisal.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Free Secure Storage Wipe Included
              </div>
              <p className="text-[11px] text-slate-400">
                DoD 5220.22-M military-grade data sanitization guaranteed on all traded-in hard drives & SSDs.
              </p>
            </div>

            {!claimedVoucher ? (
              <button
                onClick={handleClaimVoucher}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" /> Lock In Quote & Generate Voucher
              </button>
            ) : (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-center space-y-2">
                <span className="text-[10px] font-bold uppercase text-emerald-400">Your Trade-In Voucher Code</span>
                <div className="text-xl font-black tracking-widest text-white">{claimedVoucher}</div>
                <p className="text-[10px] text-slate-300">Present this code at any NexusTech store checkout!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
