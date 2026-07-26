import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, calculateDiscountPrice } from '../../lib/utils';
import { X, Trash2, ShoppingCart, Check, Star, ArrowLeftRight } from 'lucide-react';
import { motion } from 'motion/react';

export const CompareModal: React.FC = () => {
  const { 
    isCompareModalOpen, 
    setIsCompareModalOpen, 
    compareList, 
    toggleCompare, 
    clearCompare, 
    addToCart 
  } = useApp();

  if (!isCompareModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Product Comparison Matrix</h3>
            <span className="text-xs text-slate-500">({compareList.length} items)</span>
          </div>

          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-rose-500 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Matrix
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto py-6">
          {compareList.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ArrowLeftRight className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
              <p className="text-sm font-semibold text-slate-500">No products added for comparison</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Click the compare icon (<ArrowLeftRight className="w-3 h-3 inline" />) on any product card to compare specs side-by-side.
              </p>
            </div>
          ) : (
            <div className="min-w-[650px]">
              <div className="grid grid-cols-5 gap-4">
                <div className="font-bold text-xs uppercase tracking-wider text-slate-400 pt-8">
                  Specification
                </div>
                {compareList.map(product => (
                  <div key={product.id} className="relative bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-between">
                    <button
                      onClick={() => toggleCompare(product)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 object-contain mx-auto mb-2"
                    />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mb-1">
                      {product.name}
                    </h4>
                    <div className="text-sm font-extrabold text-blue-600 dark:text-cyan-400 mb-3">
                      {formatCurrency(calculateDiscountPrice(product.price, product.discount))}
                    </div>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full py-2 bg-blue-600 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                ))}
              </div>

              {/* Spec Rows */}
              <div className="mt-6 space-y-3 text-xs">
                <div className="grid grid-cols-5 gap-4 py-2 border-b border-slate-100 dark:border-slate-800 font-medium">
                  <span className="font-bold text-slate-500">Brand</span>
                  {compareList.map(p => <span key={p.id} className="text-slate-900 dark:text-slate-200 font-semibold">{p.brand}</span>)}
                </div>

                <div className="grid grid-cols-5 gap-4 py-2 border-b border-slate-100 dark:border-slate-800 font-medium">
                  <span className="font-bold text-slate-500">Rating</span>
                  {compareList.map(p => (
                    <span key={p.id} className="text-amber-500 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {p.rating}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-5 gap-4 py-2 border-b border-slate-100 dark:border-slate-800 font-medium">
                  <span className="font-bold text-slate-500">Processor</span>
                  {compareList.map(p => <span key={p.id} className="text-slate-800 dark:text-slate-300">{p.specs.processor || 'N/A'}</span>)}
                </div>

                <div className="grid grid-cols-5 gap-4 py-2 border-b border-slate-100 dark:border-slate-800 font-medium">
                  <span className="font-bold text-slate-500">RAM</span>
                  {compareList.map(p => <span key={p.id} className="text-slate-800 dark:text-slate-300">{p.specs.ram || 'N/A'}</span>)}
                </div>

                <div className="grid grid-cols-5 gap-4 py-2 border-b border-slate-100 dark:border-slate-800 font-medium">
                  <span className="font-bold text-slate-500">Storage</span>
                  {compareList.map(p => <span key={p.id} className="text-slate-800 dark:text-slate-300">{p.specs.storage || 'N/A'}</span>)}
                </div>

                <div className="grid grid-cols-5 gap-4 py-2 border-b border-slate-100 dark:border-slate-800 font-medium">
                  <span className="font-bold text-slate-500">GPU</span>
                  {compareList.map(p => <span key={p.id} className="text-slate-800 dark:text-slate-300">{p.specs.gpu || 'N/A'}</span>)}
                </div>

                <div className="grid grid-cols-5 gap-4 py-2 border-b border-slate-100 dark:border-slate-800 font-medium">
                  <span className="font-bold text-slate-500">Warranty</span>
                  {compareList.map(p => <span key={p.id} className="text-slate-800 dark:text-slate-300">{p.warranty}</span>)}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
