import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PC_BUILDER_COMPONENTS } from '../data/mockData';
import { PCComponent, ComponentType } from '../types';
import { formatCurrency } from '../lib/utils';
import { 
  Cpu, 
  Zap, 
  HardDrive, 
  Monitor, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  ShoppingCart, 
  Printer, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PcBuilderPage: React.FC = () => {
  const { 
    selectedPCComponents, 
    selectPCComponent, 
    clearPCBuild, 
    addToCart, 
    showToast 
  } = useApp();

  const [activeModalType, setActiveModalType] = useState<ComponentType | null>(null);

  const componentSlots: { type: ComponentType; label: string; required: boolean }[] = [
    { type: 'cpu', label: 'Processor (CPU)', required: true },
    { type: 'motherboard', label: 'Motherboard', required: true },
    { type: 'ram', label: 'Memory (RAM)', required: true },
    { type: 'gpu', label: 'Graphics Card (GPU)', required: true },
    { type: 'psu', label: 'Power Supply (PSU)', required: true },
    { type: 'cabinet', label: 'PC Case / Cabinet', required: true },
    { type: 'ssd', label: 'Storage (SSD)', required: true },
    { type: 'cooling', label: 'CPU Liquid / Air Cooler', required: false },
    { type: 'monitor', label: 'Gaming Monitor', required: false },
    { type: 'keyboard', label: 'Mechanical Keyboard', required: false },
    { type: 'mouse', label: 'Gaming Mouse', required: false }
  ];

  // Price & Power Calculations
  const selectedList = Object.values(selectedPCComponents).filter(Boolean) as PCComponent[];

  const totalPrice = selectedList.reduce((acc, comp) => acc + comp.price, 0);
  const totalTdp = selectedList.reduce((acc, comp) => acc + comp.tdp, 0);

  const selectedPsu = selectedPCComponents.psu;
  const psuWattage = Number(selectedPsu?.specs?.wattage || 0);

  // Automated Compatibility Checks
  const cpu = selectedPCComponents.cpu;
  const mobo = selectedPCComponents.motherboard;
  const ram = selectedPCComponents.ram;

  const warnings: string[] = [];

  if (cpu && mobo && cpu.specs.socket !== mobo.specs.socket) {
    warnings.push(`Socket Mismatch! CPU (${cpu.specs.socket}) does not match Motherboard (${mobo.specs.socket}).`);
  }

  if (mobo && ram && mobo.specs.ramType !== ram.specs.ramType) {
    warnings.push(`RAM Generation Mismatch! Motherboard supports ${mobo.specs.ramType}, but selected RAM is ${ram.specs.ramType}.`);
  }

  if (selectedPsu && totalTdp > psuWattage - 100) {
    warnings.push(`Power Warning! Total estimated draw is ${totalTdp}W. Selected PSU is ${psuWattage}W. Recommended margin is at least +150W.`);
  }

  const isCompatible = warnings.length === 0;

  const handleAddAllToCart = () => {
    const selectedList = Object.values(selectedPCComponents).filter(Boolean) as PCComponent[];
    if (selectedList.length === 0) {
      showToast('Please select at least one component to add to cart', 'error');
      return;
    }

    selectedList.forEach(comp => {
      addToCart({
        id: comp.id,
        name: comp.name,
        brand: comp.brand as any,
        category: 'Components',
        price: comp.price,
        discount: 0,
        rating: 5,
        reviewsCount: 12,
        availability: 'In Stock',
        images: [comp.image],
        shortDesc: comp.name,
        fullDesc: comp.name,
        specs: {},
        technicalDetails: {},
        warranty: '3 Years Warranty'
      }, 1);
    });

    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    showToast(`Added ${selectedList.length} components to Shopping Cart!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-wider uppercase">
          Real-Time Compatibility Engine
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Custom PC Rig Builder
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Pick your high-performance hardware. Automated socket, RAM generation, and PSU wattage checks included.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Component Selector Slots */}
        <div className="lg:col-span-2 space-y-3">
          {componentSlots.map((slot) => {
            const comp = selectedPCComponents[slot.type];
            return (
              <div
                key={slot.type}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  comp
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                    : 'bg-slate-50/60 dark:bg-slate-950/40 border-dashed border-slate-300 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    comp ? 'bg-blue-500/10 text-blue-600 dark:text-cyan-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}>
                    <Cpu className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      {slot.label} {slot.required && <span className="text-rose-500">*</span>}
                    </span>
                    {comp ? (
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {comp.name}
                      </h4>
                    ) : (
                      <span className="text-xs text-slate-400 italic">No component selected</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {comp && (
                    <span className="text-xs font-extrabold text-blue-600 dark:text-cyan-400">
                      {formatCurrency(comp.price)}
                    </span>
                  )}

                  {comp ? (
                    <button
                      onClick={() => selectPCComponent(slot.type, null)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveModalType(slot.type)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Select
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Build Summary & Compatibility Sidebar */}
        <aside className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Rig Summary
            </h3>
            <button
              onClick={clearPCBuild}
              className="text-[11px] font-bold text-rose-500 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Clear
            </button>
          </div>

          {/* Price & Power Metrics */}
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Estimated Price</span>
              <div className="text-3xl font-black text-blue-600 dark:text-cyan-400">{formatCurrency(totalPrice)}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Est. TDP Draw</span>
                <span className="font-extrabold text-amber-500">{totalTdp} Watts</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 block">PSU Capacity</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{psuWattage} Watts</span>
              </div>
            </div>
          </div>

          {/* Compatibility Status Banner */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Compatibility Check
            </h4>
            {isCompatible ? (
              <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-bold">100% Compatible Component Selection!</span>
              </div>
            ) : (
              <div className="p-3.5 bg-rose-950/30 border border-rose-500/30 rounded-2xl text-xs text-rose-400 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 shrink-0" /> Conflict Detected:
                </div>
                {warnings.map((w, i) => (
                  <p key={i} className="text-[11px] text-slate-300">{w}</p>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleAddAllToCart}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" /> Add Complete Rig To Cart
            </button>

            <button
              onClick={() => window.print()}
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs rounded-2xl transition-all flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Export / Print Config
            </button>
          </div>
        </aside>
      </div>

      {/* Component Selection Modal */}
      {activeModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white capitalize">
                Select {activeModalType}
              </h3>
              <button
                onClick={() => setActiveModalType(null)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PC_BUILDER_COMPONENTS.filter(c => c.type === activeModalType).map(item => (
                <div
                  key={item.id}
                  onClick={() => {
                    selectPCComponent(activeModalType, item);
                    setActiveModalType(null);
                  }}
                  className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 cursor-pointer transition-all space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</h4>
                    <p className="text-[11px] text-slate-500">Brand: {item.brand} • {item.tdp}W TDP</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <span className="text-sm font-extrabold text-blue-600 dark:text-cyan-400">{formatCurrency(item.price)}</span>
                    <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-1 rounded-lg">Select</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
