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
  Cpu, 
  HardDrive, 
  Zap,
  ShieldCheck,
  Check
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

  // Helper for badge color mapping according to prompt specifications
  const getBadgeStyle = (badgeName?: string) => {
    if (!badgeName) return 'bg-[#3F5B43] text-white';
    const b = badgeName.toLowerCase();
    if (b.includes('discount') || b.includes('sale')) return 'bg-[#B54A30] text-white';
    if (b.includes('best seller') || b.includes('pro choice')) return 'bg-[#D4AF5A] text-[#181512]';
    if (b.includes('new') || b.includes('featured')) return 'bg-[#8FAE83] text-[#181512]';
    return 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512]';
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.25 }}
        className="group relative flex flex-col md:flex-row bg-[#EEE6DA]/40 dark:bg-[#2B2520] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      >
        {/* Left image column */}
        <div 
          onClick={handleCardClick}
          className="relative md:w-72 h-60 bg-[#FFFDF8] dark:bg-[#221D19] flex items-center justify-center p-6 cursor-pointer overflow-hidden shrink-0 border-r border-[#D8CFC2]/60 dark:border-[#4A433D]/60"
        >
          {product.badge && (
            <span className={`absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm ${getBadgeStyle(product.badge)}`}>
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="absolute top-4 right-4 z-10 px-2.5 py-0.5 text-xs font-bold text-white bg-[#B54A30] rounded-full shadow-sm">
              -{product.discount}%
            </span>
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content column */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">
                {product.brand} • {product.category}
              </span>
              <div className="flex items-center gap-1 text-[#C79A3B] dark:text-[#D4AF5A] text-xs font-medium">
                <Star className="w-3.5 h-3.5 fill-[#C79A3B] dark:fill-[#D4AF5A]" />
                <span className="font-bold text-[#2D241E] dark:text-[#F5F2ED]">{product.rating}</span>
                <span className="text-[#6F665F] dark:text-[#C5BFB8] text-[11px]">({product.reviewsCount})</span>
              </div>
            </div>

            <h3 
              onClick={handleCardClick}
              className="text-lg font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] hover:text-[#3F5B43] dark:hover:text-[#8FAE83] cursor-pointer line-clamp-1 mb-2 transition-colors"
            >
              {product.name}
            </h3>

            <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] line-clamp-2 mb-4 leading-relaxed">
              {product.shortDesc}
            </p>

            {/* Spec tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.specs.processor && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-medium bg-[#FFFDF8] dark:bg-[#181512] text-[#2D241E] dark:text-[#F5F2ED] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full">
                  <Cpu className="w-3 h-3 text-[#3F5B43] dark:text-[#8FAE83]" /> {product.specs.processor}
                </span>
              )}
              {product.specs.ram && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-medium bg-[#FFFDF8] dark:bg-[#181512] text-[#2D241E] dark:text-[#F5F2ED] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full">
                  <Zap className="w-3 h-3 text-[#C79A3B]" /> {product.specs.ram}
                </span>
              )}
              {product.specs.storage && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-medium bg-[#FFFDF8] dark:bg-[#181512] text-[#2D241E] dark:text-[#F5F2ED] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full">
                  <HardDrive className="w-3 h-3 text-[#708A58]" /> {product.specs.storage}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#D8CFC2]/60 dark:border-[#4A433D]/60 pt-4 mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
                {formatCurrency(finalPrice)}
              </span>
              {product.discount > 0 && (
                <span className="text-xs text-[#6F665F] dark:text-[#C5BFB8] line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-full border transition-all ${
                  isWishlisted 
                    ? 'bg-[#B54A30] border-[#B54A30] text-white' 
                    : 'border-[#D8CFC2] dark:border-[#4A433D] text-[#6F665F] dark:text-[#C5BFB8] hover:bg-[#FFFDF8] dark:hover:bg-[#221D19]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>

              <button
                onClick={() => toggleCompare(product)}
                className={`p-2.5 rounded-full border transition-all ${
                  isCompared 
                    ? 'bg-[#3F5B43] dark:bg-[#8FAE83] border-transparent text-white dark:text-[#181512]' 
                    : 'border-[#D8CFC2] dark:border-[#4A433D] text-[#6F665F] dark:text-[#C5BFB8] hover:bg-[#FFFDF8] dark:hover:bg-[#221D19]'
                }`}
                title="Compare"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => addToCart(product, 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] dark:text-[#181512] rounded-full shadow-sm transition-all"
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
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.25 }}
        className="group relative bg-[#EEE6DA]/40 dark:bg-[#2B2520] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      >
        {/* Image Frame */}
        <div className="relative w-full h-56 bg-[#FFFDF8] dark:bg-[#221D19] p-6 flex items-center justify-center overflow-hidden border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60">
          {/* Top badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 items-start">
            {product.badge && (
              <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm ${getBadgeStyle(product.badge)}`}>
                {product.badge}
              </span>
            )}
            {product.availability === 'Low Stock' && (
              <span className="px-2.5 py-0.5 text-[10px] font-bold text-[#C56A43] bg-[#C56A43]/15 rounded-full border border-[#C56A43]/30">
                Low Stock
              </span>
            )}
          </div>

          {product.discount > 0 && (
            <span className="absolute top-4 right-4 z-10 px-2.5 py-0.5 text-xs font-bold text-white bg-[#B54A30] rounded-full shadow-sm">
              -{product.discount}%
            </span>
          )}

          {/* Quick action buttons floating on hover */}
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2.5 rounded-full shadow-md border backdrop-blur-md transition-transform hover:scale-110 ${
                isWishlisted
                  ? 'bg-[#B54A30] text-white border-[#B54A30]'
                  : 'bg-[#FFFDF8]/90 dark:bg-[#221D19]/90 text-[#2D241E] dark:text-[#F5F2ED] border-[#D8CFC2] dark:border-[#4A433D]'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={() => setQuickViewOpen(true)}
              className="p-2.5 rounded-full shadow-md bg-[#FFFDF8]/90 dark:bg-[#221D19]/90 text-[#2D241E] dark:text-[#F5F2ED] border border-[#D8CFC2] dark:border-[#4A433D] backdrop-blur-md transition-transform hover:scale-110"
              title="Quick Preview"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleCompare(product)}
              className={`p-2.5 rounded-full shadow-md border backdrop-blur-md transition-transform hover:scale-110 ${
                isCompared
                  ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] border-transparent'
                  : 'bg-[#FFFDF8]/90 dark:bg-[#221D19]/90 text-[#2D241E] dark:text-[#F5F2ED] border-[#D8CFC2] dark:border-[#4A433D]'
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
            className="w-full h-full object-contain cursor-pointer group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-[#C56A43] dark:text-[#C97A4D] uppercase tracking-wider text-[11px]">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-[#C79A3B] dark:text-[#D4AF5A] font-medium">
                <Star className="w-3.5 h-3.5 fill-[#C79A3B] dark:fill-[#D4AF5A]" />
                <span className="font-bold text-[#2D241E] dark:text-[#F5F2ED]">{product.rating}</span>
                <span className="text-[#6F665F] dark:text-[#C5BFB8] text-[10px]">({product.reviewsCount})</span>
              </div>
            </div>

            <h3 
              onClick={handleCardClick}
              className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] hover:text-[#3F5B43] dark:hover:text-[#8FAE83] cursor-pointer line-clamp-2 min-h-[2.8rem] mb-2 leading-snug transition-colors"
            >
              {product.name}
            </h3>

            {/* Micro specs */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.specs.processor && (
                <span className="px-2.5 py-0.5 text-[10px] font-medium bg-[#FFFDF8] dark:bg-[#181512] text-[#6F665F] dark:text-[#C5BFB8] border border-[#D8CFC2]/60 dark:border-[#4A433D]/60 rounded-full">
                  {product.specs.processor.split('(')[0]}
                </span>
              )}
              {product.specs.ram && (
                <span className="px-2.5 py-0.5 text-[10px] font-medium bg-[#FFFDF8] dark:bg-[#181512] text-[#6F665F] dark:text-[#C5BFB8] border border-[#D8CFC2]/60 dark:border-[#4A433D]/60 rounded-full">
                  {product.specs.ram.split(' ')[0]} RAM
                </span>
              )}
              {product.specs.gpu && (
                <span className="px-2.5 py-0.5 text-[10px] font-medium bg-[#3F5B43]/15 dark:bg-[#8FAE83]/15 text-[#3F5B43] dark:text-[#8FAE83] rounded-full">
                  {product.specs.gpu.split(' ')[0]} {product.specs.gpu.split(' ')[1]}
                </span>
              )}
            </div>
          </div>

          {/* Pricing & Add Button */}
          <div className="border-t border-[#D8CFC2]/60 dark:border-[#4A433D]/60 pt-3.5 mt-2 flex items-center justify-between">
            <div>
              <div className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] leading-none">
                {formatCurrency(finalPrice)}
              </div>
              {product.discount > 0 && (
                <div className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8] line-through mt-1">
                  {formatCurrency(product.price)}
                </div>
              )}
            </div>

            <button
              onClick={() => addToCart(product, 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] dark:text-[#181512] rounded-full shadow-sm transition-all active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181512]/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#FFFDF8] dark:bg-[#221D19] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8CFC2] dark:border-[#4A433D] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setQuickViewOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#EEE6DA] dark:bg-[#2B2520] text-[#2D241E] dark:text-[#F5F2ED] hover:scale-105 transition-transform"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-[#EEE6DA]/40 dark:bg-[#181512] p-6 rounded-2xl flex items-center justify-center border border-[#D8CFC2]/60 dark:border-[#4A433D]/60">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="max-h-64 object-contain"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">{product.brand}</span>
                  <h2 className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] mt-1 mb-2 leading-tight">{product.name}</h2>
                  <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] mb-4 leading-relaxed">{product.shortDesc}</p>

                  <div className="text-2xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] mb-4">
                    {formatCurrency(finalPrice)}
                    {product.discount > 0 && (
                      <span className="text-sm text-[#6F665F] dark:text-[#C5BFB8] line-through ml-2">
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs text-[#6F665F] dark:text-[#C5BFB8] mb-6">
                    {Object.entries(product.specs).map(([key, val]) => val && (
                      <div key={key} className="flex justify-between border-b border-[#D8CFC2]/40 dark:border-[#4A433D]/40 pb-1">
                        <span className="capitalize font-medium text-[#6F665F] dark:text-[#C5BFB8]">{key}:</span>
                        <span className="font-semibold text-[#2D241E] dark:text-[#F5F2ED]">{val}</span>
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
                    className="flex-1 py-3 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Shopping Cart
                  </button>
                  <button
                    onClick={() => {
                      setQuickViewOpen(false);
                      handleCardClick();
                    }}
                    className="px-5 py-3 bg-[#EEE6DA] dark:bg-[#2B2520] hover:bg-[#E5DDD0] dark:hover:bg-[#352E28] text-[#2D241E] dark:text-[#F5F2ED] text-xs font-semibold rounded-full border border-[#D8CFC2] dark:border-[#4A433D]"
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
