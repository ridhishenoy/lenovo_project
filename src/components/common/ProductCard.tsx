import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatCurrency, calculateDiscountPrice } from '../../lib/utils';
import { 
  Heart, 
  ShoppingCart, 
  ArrowLeftRight, 
  Star, 
  Eye, 
  Check, 
  Cpu, 
  HardDrive, 
  Zap,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare,
    addRecentlyViewed
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const finalPrice = calculateDiscountPrice(product.price, product.discount);
  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleCardClick = () => {
    addRecentlyViewed(product);
    navigate(`/products/${product.id}`);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="group relative flex flex-col md:flex-row bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      >
        {/* Left image column */}
        <div 
          onClick={handleCardClick}
          className="relative md:w-72 h-56 bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 cursor-pointer overflow-hidden shrink-0"
        >
          {product.badge && (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="absolute top-3 right-3 z-10 px-2 py-0.5 text-xs font-bold text-rose-600 bg-rose-100 dark:bg-rose-950/80 dark:text-rose-400 rounded-md">
              -{product.discount}%
            </span>
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content column */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {product.brand} • {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount})</span>
              </div>
            </div>

            <h3 
              onClick={handleCardClick}
              className="text-base font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer line-clamp-1 mb-2 transition-colors"
            >
              {product.name}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
              {product.shortDesc}
            </p>

            {/* Spec tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.specs.processor && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
                  <Cpu className="w-3 h-3 text-blue-500" /> {product.specs.processor}
                </span>
              )}
              {product.specs.ram && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
                  <Zap className="w-3 h-3 text-amber-500" /> {product.specs.ram}
                </span>
              )}
              {product.specs.storage && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
                  <HardDrive className="w-3 h-3 text-emerald-500" /> {product.specs.storage}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {formatCurrency(finalPrice)}
              </span>
              {product.discount > 0 && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2 rounded-xl border transition-colors ${
                  isWishlisted 
                    ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400' 
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                onClick={() => toggleCompare(product)}
                className={`p-2 rounded-xl border transition-colors ${
                  isCompared 
                    ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-400' 
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Compare"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => addToCart(product, 1)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-sm transition-all"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (Default)
  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      >
        {/* Image Frame */}
        <div className="relative w-full h-52 bg-slate-50 dark:bg-slate-950/60 p-4 flex items-center justify-center overflow-hidden">
          {/* Top badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
            {product.badge && (
              <span className="px-2.5 py-0.5 text-[10px] font-black tracking-wide uppercase text-white bg-lenovo-red shadow-sm">
                {product.badge}
              </span>
            )}
            {product.availability === 'Low Stock' && (
              <span className="px-2 py-0.5 text-[10px] font-semibold text-amber-700 bg-amber-100 dark:bg-amber-950/80 dark:text-amber-300 rounded-md">
                Low Stock
              </span>
            )}
          </div>

          {product.discount > 0 && (
            <span className="absolute top-3 right-3 z-10 px-2 py-0.5 text-xs font-black text-white bg-lenovo-red">
              -{product.discount}%
            </span>
          )}

          {/* Quick action buttons floating on hover */}
          <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-4">
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2 rounded-xl shadow-md border backdrop-blur-md transition-transform hover:scale-110 ${
                isWishlisted
                  ? 'bg-rose-600 text-white border-rose-500'
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={() => setQuickViewOpen(true)}
              className="p-2 rounded-xl shadow-md bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 backdrop-blur-md transition-transform hover:scale-110"
              title="Quick Preview"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleCompare(product)}
              className={`p-2 rounded-xl shadow-md border backdrop-blur-md transition-transform hover:scale-110 ${
                isCompared
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
              title="Compare Product"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          <img
            src={product.images[activeImageIndex] || product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            onClick={handleCardClick}
            className="w-full h-full object-contain cursor-pointer group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-bold text-lenovo-red uppercase tracking-wider text-[11px]">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
              </div>
            </div>

            <h3 
              onClick={handleCardClick}
              className="text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-lenovo-red dark:hover:text-lenovo-red cursor-pointer line-clamp-2 min-h-[2.5rem] mb-2 leading-snug transition-colors"
            >
              {product.name}
            </h3>

            {/* Micro specs */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.specs.processor && (
                <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                  {product.specs.processor.split('(')[0]}
                </span>
              )}
              {product.specs.ram && (
                <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                  {product.specs.ram.split(' ')[0]} RAM
                </span>
              )}
              {product.specs.gpu && (
                <span className="px-2 py-0.5 text-[10px] font-medium bg-neutral-900 text-white rounded-md">
                  {product.specs.gpu.split(' ')[0]} {product.specs.gpu.split(' ')[1]}
                </span>
              )}
            </div>
          </div>

          {/* Pricing & Add Button */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mt-2 flex items-center justify-between">
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white leading-none">
                {formatCurrency(finalPrice)}
              </div>
              {product.discount > 0 && (
                <div className="text-[11px] text-slate-400 line-through mt-0.5">
                  {formatCurrency(product.price)}
                </div>
              )}
            </div>

            <button
              onClick={() => addToCart(product, 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold text-white bg-lenovo-red hover:bg-lenovo-red-hover rounded-lg shadow-sm transition-all active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setQuickViewOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl flex items-center justify-center">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="max-h-64 object-contain"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{product.brand}</span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">{product.name}</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">{product.shortDesc}</p>

                  <div className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                    {formatCurrency(finalPrice)}
                    {product.discount > 0 && (
                      <span className="text-sm text-slate-400 line-through ml-2">
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 mb-6">
                    {Object.entries(product.specs).map(([key, val]) => val && (
                      <div key={key} className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                        <span className="capitalize font-medium text-slate-500">{key}:</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-200">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      setQuickViewOpen(false);
                    }}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Shopping Cart
                  </button>
                  <button
                    onClick={() => {
                      setQuickViewOpen(false);
                      handleCardClick();
                    }}
                    className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold rounded-xl"
                  >
                    Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
