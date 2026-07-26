import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md text-sm font-medium ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/30 dark:bg-emerald-950/90 dark:border-emerald-500/40'
                : toast.type === 'error'
                ? 'bg-rose-950/90 text-rose-100 border-rose-500/30 dark:bg-rose-950/90 dark:border-rose-500/40'
                : 'bg-slate-900/90 text-slate-100 border-cyan-500/30 dark:bg-slate-900/90'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0" />}
            <span className="flex-1 leading-snug">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
