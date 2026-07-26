import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Sparkles, Send, X, Cpu, IndianRupee, Briefcase, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AiAdvisorModal: React.FC = () => {
  const { isAiAdvisorOpen, setIsAiAdvisorOpen } = useApp();

  const [query, setQuery] = useState('');
  const [budget, setBudget] = useState('1500');
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
        advice: `Based on your budget of ₹${budget} for ${useCase}, we recommend considering high-performance laptops with Intel Core Ultra or AMD Ryzen 7, 32GB RAM, and RTX 4070 GPU.`,
        suggestedSpecs: ['32GB LPDDR5X RAM', '1TB PCIe 4.0 NVMe SSD', 'RTX 4070 8GB GPU', '2.8K OLED 120Hz Screen'],
        topMatchCategory: 'High Performance Laptop',
        tips: 'Make sure to select at least a 2-year manufacturer onsite warranty for peace of mind.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-lenovo-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-lenovo-red text-white font-black text-xs px-2.5 py-1.5 shadow-md flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                NexusTech AI Advisor <Sparkles className="w-4 h-4 text-lenovo-red" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Powered by Gemini AI • Lenovo Legion, ThinkPad & Custom Hardware Assistant
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAiAdvisorOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {!responseResult ? (
            <form onSubmit={handleConsult} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  What are you looking for or trying to solve?
                </label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. I need a laptop for 4K video editing and college engineering, or my computer is making beep sounds on startup..."
                  rows={3}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-500" /> Estimated Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-blue-500" /> Primary Workload
                  </label>
                  <select
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-semibold"
                  >
                    <option value="Gaming & Esports">Gaming & Esports</option>
                    <option value="Gaming & Video Editing">Gaming & Video Editing</option>
                    <option value="Software Dev & AI Workstation">Software Dev & AI Workstation</option>
                    <option value="Business & Office Productivity">Business & Office Productivity</option>
                    <option value="Graphic Design & 3D Rendering">Graphic Design & 3D Rendering</option>
                    <option value="College / Student">College / Student</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-purple-500" /> Preferred Brand
                  </label>
                  <select
                    value={preferredBrand}
                    onChange={(e) => setPreferredBrand(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-semibold"
                  >
                    <option value="Any Top Brand">Any Top Brand</option>
                    <option value="Dell">Dell</option>
                    <option value="Apple">Apple</option>
                    <option value="ASUS">ASUS</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="HP">HP</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:brightness-110 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Requirements with Gemini AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Get AI Advisor Recommendations
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-2xl text-xs space-y-3">
                <div className="flex items-center gap-2 font-bold text-cyan-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  Recommended Setup: {responseResult.topMatchCategory || 'Custom Hardware Match'}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {responseResult.advice || responseResult.recommendation}
                </p>
              </div>

              {responseResult.suggestedSpecs && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Specs To Target</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {responseResult.suggestedSpecs.map((spec: string, idx: number) => (
                      <div key={idx} className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {responseResult.tips && (
                <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-amber-500">Pro Tip: </span>
                  {responseResult.tips}
                </div>
              )}

              <button
                onClick={() => setResponseResult(null)}
                className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs rounded-xl transition-colors"
              >
                Ask Another Question
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
