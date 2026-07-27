import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PC_BUILDER_COMPONENTS } from '../data/mockData';
import { PCComponent, ComponentType } from '../types';
import { formatCurrency } from '../lib/utils';
import { 
  Cpu, 
  Zap, 
  HardDrive, 
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
        <span className="px-3.5 py-1 rounded-full bg-[#3F5B43]/15 dark:bg-[#8FAE83]/15 text-[#3F5B43] dark:text-[#8FAE83] text-xs font-semibold tracking-wider uppercase">
          Architectural Thermal & Socket Verification Engine
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
          Custom PC Studio Builder
        </h1>
        <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">
          Select certified hardware. Real-time TDP wattage, RAM architecture, and CPU socket validation.
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
                className={`p-4 sm:p-5 rounded-3xl border transition-all flex items-center justify-between gap-4 ${
                  comp
                    ? 'bg-[#FFFDF8] dark:bg-[#221D19] border-[#D8CFC2] dark:border-[#4A433D] shadow-sm'
                    : 'bg-[#EEE6DA]/30 dark:bg-[#181512]/60 border-dashed border-[#D8CFC2] dark:border-[#4A433D]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                    comp ? 'bg-[#3F5B43]/15 text-[#3F5B43] dark:bg-[#8FAE83]/15 dark:text-[#8FAE83]' : 'bg-[#EEE6DA] dark:bg-[#2B2520] text-[#6F665F]'
                  }`}>
                    <Cpu className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#6F665F] dark:text-[#C5BFB8] block">
                      {slot.label} {slot.required && <span className="text-[#B54A30]">*</span>}
                    </span>
                    {comp ? (
                      <h4 className="text-xs font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] truncate">
                        {comp.name}
                      </h4>
                    ) : (
                      <span className="text-xs text-[#6F665F] dark:text-[#C5BFB8] italic">No component selected</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {comp && (
                    <span className="text-xs font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">
                      {formatCurrency(comp.price)}
                    </span>
                  )}

                  {comp ? (
                    <button
                      onClick={() => selectPCComponent(slot.type, null)}
                      className="p-2 text-[#6F665F] hover:text-[#B54A30] rounded-full hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520]"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveModalType(slot.type)}
                      className="px-4 py-2 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full shadow-sm transition-all flex items-center gap-1"
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
        <aside className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 shadow-md space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60">
            <h3 className="text-sm font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C79A3B]" /> Custom Build Summary
            </h3>
            <button
              onClick={clearPCBuild}
              className="text-[11px] font-semibold text-[#B54A30] hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Clear
            </button>
          </div>

          {/* Price & Power Metrics */}
          <div className="space-y-3">
            <div className="p-4 bg-[#EEE6DA]/40 dark:bg-[#181512] rounded-2xl border border-[#D8CFC2]/60 dark:border-[#4A433D]/60 text-center">
              <span className="text-[10px] uppercase font-bold text-[#6F665F] dark:text-[#C5BFB8]">Total Estimated Investment</span>
              <div className="text-3xl font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">{formatCurrency(totalPrice)}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] rounded-2xl border border-[#D8CFC2]/60 dark:border-[#4A433D]/60">
                <span className="text-[10px] text-[#6F665F] dark:text-[#C5BFB8] block">Est. TDP Draw</span>
                <span className="font-bold text-[#C56A43]">{totalTdp} Watts</span>
              </div>
              <div className="p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] rounded-2xl border border-[#D8CFC2]/60 dark:border-[#4A433D]/60">
                <span className="text-[10px] text-[#6F665F] dark:text-[#C5BFB8] block">PSU Capacity</span>
                <span className="font-bold text-[#2D241E] dark:text-[#F5F2ED]">{psuWattage} Watts</span>
              </div>
            </div>
          </div>

          {/* Compatibility Status Banner */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8] mb-2">
              Hardware Compatibility Check
            </h4>
            {isCompatible ? (
              <div className="p-4 bg-[#5E8C61]/15 border border-[#5E8C61]/30 rounded-2xl text-xs text-[#5E8C61] dark:text-[#76A46E] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-semibold">100% Compatible Hardware Selection!</span>
              </div>
            ) : (
              <div className="p-4 bg-[#B54A30]/15 border border-[#B54A30]/30 rounded-2xl text-xs text-[#B54A30] space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 shrink-0" /> Conflict Detected:
                </div>
                {warnings.map((w, i) => (
                  <p key={i} className="text-[11px] text-[#2D241E] dark:text-[#F5F2ED]">{w}</p>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleAddAllToCart}
              className="w-full py-3.5 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" /> Add Complete Rig to Cart
            </button>

            <button
              onClick={() => window.print()}
              className="w-full py-2.5 bg-[#EEE6DA] dark:bg-[#2B2520] hover:bg-[#E5DDD0] dark:hover:bg-[#352E28] text-[#2D241E] dark:text-[#F5F2ED] font-semibold text-xs rounded-full transition-all flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Export Specs / Print PDF
            </button>
          </div>
        </aside>
      </div>

      {/* Component Selection Modal */}
      {activeModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181512]/75 backdrop-blur-md">
          <div className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60">
              <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] capitalize">
                Select {activeModalType}
              </h3>
              <button
                onClick={() => setActiveModalType(null)}
                className="p-1 rounded-full text-[#6F665F] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520]"
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
                  className="p-4 bg-[#EEE6DA]/40 dark:bg-[#181512] rounded-2xl border border-[#D8CFC2]/60 dark:border-[#4A433D]/60 hover:border-[#3F5B43] dark:hover:border-[#8FAE83] cursor-pointer transition-all space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">{item.name}</h4>
                    <p className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8]">Brand: {item.brand} • {item.tdp}W TDP</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#D8CFC2]/40 dark:border-[#4A433D]/40">
                    <span className="text-sm font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">{formatCurrency(item.price)}</span>
                    <span className="text-[10px] font-bold text-white bg-[#3F5B43] dark:bg-[#8FAE83] dark:text-[#181512] px-3 py-1 rounded-full">Select</span>
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
