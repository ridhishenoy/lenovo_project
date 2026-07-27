import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const AiAdvisorModal: React.FC = () => {
  const { isAiAdvisorOpen, setIsAiAdvisorOpen } = useApp();

  const [query, setQuery] = useState('');
  const [budget, setBudget] = useState('150000');
  const [useCase, setUseCase] = useState('Gaming & Video Editing');
  const [preferredBrand, setPreferredBrand] = useState('Any Top Brand');

  const [isLoading, setIsLoading] = useState(false);
  const [responseResult, setResponseResult] = useState<any>(null);

  if (!isAiAdvisorOpen) return null;

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseResult(null);

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: query,
          budget,
          useCase,
          preferredBrand
        })
      });

      const data = await res.json();
      if (data.data) {
        setResponseResult(data.data);
      } else {
        setResponseResult(data);
      }
    } catch (err) {
      setResponseResult({
        advice: `Based on your budget of ₹${budget} for ${useCase}, we recommend considering high-performance workstations with Intel Core Ultra or AMD Ryzen 7, 32GB RAM, and RTX GPU.`,
        suggestedSpecs: ['32GB LPDDR5X RAM', '1TB PCIe 4.0 NVMe SSD', 'RTX 4070 8GB GPU', '2.8K OLED 120Hz Screen'],
        topMatchCategory: 'High Performance Laptop',
        tips: 'Make sure to select at least a 2-year manufacturer onsite warranty for peace of mind.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181512]/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-2xl bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] flex items-center gap-2">
                AI Hardware Concierge <Sparkles className="w-4 h-4 text-[#C79A3B]" />
              </h3>
              <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">
                Powered by Gemini AI • Personalized Hardware Advisory
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAiAdvisorOpen(false)}
            className="p-1 rounded-full text-[#6F665F] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6 text-xs">
          <form onSubmit={handleConsult} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Budget Limit (₹)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Primary Workload</label>
                <select
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value)}
                  className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED] font-semibold"
                >
                  <option value="Gaming & Video Editing">Gaming & Video Editing</option>
                  <option value="3D Rendering & CAD">3D Rendering & CAD</option>
                  <option value="Business & Office Productivity">Business & Office Productivity</option>
                  <option value="Programming & AI Development">Programming & AI Development</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Specific Hardware Requirements</label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Need lightweight OLED laptop with silent thermals..."
                rows={2}
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-2xl text-[#2D241E] dark:text-[#F5F2ED]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              {isLoading ? (
                <span>Analyzing Hardware Database...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#D4AF5A]" />
                  <span>Generate Concierge Recommendation</span>
                </>
              )}
            </button>
          </form>

          {/* AI Response Box */}
          {responseResult && (
            <div className="p-6 bg-[#EEE6DA]/50 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-[#3F5B43] dark:text-[#8FAE83] font-serif font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> Recommendation Summary
              </div>
              <p className="text-xs text-[#2D241E] dark:text-[#F5F2ED] leading-relaxed">
                {responseResult.advice}
              </p>

              {responseResult.suggestedSpecs && (
                <div className="space-y-1.5 pt-2 border-t border-[#D8CFC2]/60 dark:border-[#4A433D]/60">
                  <span className="font-bold text-[#6F665F] dark:text-[#C5BFB8]">Suggested Specifications:</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {responseResult.suggestedSpecs.map((spec: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] rounded-full text-[11px] font-semibold">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
