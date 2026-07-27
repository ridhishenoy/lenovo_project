import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, calculateDiscountPrice } from '../../lib/utils';
import { X, Trash2, ShoppingCart, ArrowLeftRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181512]/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-5xl bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 shrink-0">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-[#3F5B43] dark:text-[#8FAE83]" />
            <h3 className="text-lg font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Hardware Comparison Matrix</h3>
            <span className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">({compareList.length} items)</span>
          </div>

          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-[#B54A30] hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Matrix
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-1 rounded-full text-[#6F665F] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto py-6">
          {compareList.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ArrowLeftRight className="w-12 h-12 text-[#6F665F]/40 mx-auto" />
              <p className="text-sm font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">No products added for comparison</p>
              <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] max-w-sm mx-auto">
                Click the compare icon (<ArrowLeftRight className="w-3 h-3 inline text-[#3F5B43]" />) on any product card to compare specs side-by-side.
              </p>
            </div>
          ) : (
            <div className="min-w-[650px]">
              <div className="grid grid-cols-5 gap-4">
                <div className="font-serif font-bold text-xs uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8] pt-8">
                  Specification
                </div>
                {compareList.map(product => (
                  <div key={product.id} className="relative bg-[#EEE6DA]/40 dark:bg-[#181512] p-4 rounded-3xl border border-[#D8CFC2]/60 dark:border-[#4A433D]/60 text-center flex flex-col justify-between">
                    <button
                      onClick={() => toggleCompare(product)}
                      className="absolute top-3 right-3 p-1 text-[#6F665F] hover:text-[#B54A30]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 object-contain mx-auto mb-2"
                    />
                    <h4 className="text-xs font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] line-clamp-2">{product.name}</h4>
                    <div className="text-sm font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83] mt-1">
                      {formatCurrency(calculateDiscountPrice(product.price, product.discount))}
                    </div>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="mt-3 w-full py-2 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-[11px] rounded-full shadow-sm flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                ))}
              </div>

              {/* Specs Rows */}
              <div className="divide-y divide-[#D8CFC2]/40 dark:divide-[#4A433D]/40 text-xs mt-6">
                {['processor', 'ram', 'storage', 'gpu', 'display', 'os', 'warranty'].map(specKey => (
                  <div key={specKey} className="grid grid-cols-5 gap-4 py-3 items-center">
                    <span className="font-semibold text-[#6F665F] dark:text-[#C5BFB8] capitalize">{specKey}:</span>
                    {compareList.map(p => (
                      <span key={p.id} className="text-center font-medium text-[#2D241E] dark:text-[#F5F2ED]">
                        {(p.specs as any)[specKey] || 'N/A'}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
