import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, calculateDiscountPrice } from '../../lib/utils';
import { ShoppingCart, X, Trash2, Plus, Minus, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    addOrder,
    user
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleteModal, setOrderCompleteModal] = useState<string | null>(null);

  if (!isCartDrawerOpen) return null;

  // Subtotal calculation
  const subtotal = cart.reduce((acc, item) => {
    const unitPrice = calculateDiscountPrice(item.product.price, item.product.discount);
    return acc + unitPrice * item.quantity;
  }, 0);

  const couponDiscountAmount = appliedCoupon 
    ? Math.round((subtotal * appliedCoupon.discountPercentage) / 100) 
    : 0;

  const totalAmount = Math.max(0, subtotal - couponDiscountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  const handleCheckoutSubmit = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);

    setTimeout(() => {
      const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      addOrder({
        id: orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: cart.map(i => ({ product: i.product, quantity: i.quantity, price: calculateDiscountPrice(i.product.price, i.product.discount) })),
        totalAmount,
        discountAmount: couponDiscountAmount,
        status: 'Processing',
        paymentMethod: 'Credit Card (Visa ending in 4242)',
        shippingAddress: `${user.addresses[0]?.street || '123 Main St'}, ${user.addresses[0]?.city || 'Springfield'}`,
        trackingNumber: `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      });

      setIsCheckingOut(false);
      setOrderCompleteModal(orderId);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-[#181512]/75 backdrop-blur-md transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-[#FFFDF8] dark:bg-[#221D19] shadow-2xl flex flex-col justify-between border-l border-[#D8CFC2] dark:border-[#4A433D]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#3F5B43] dark:text-[#8FAE83]" />
              <h3 className="text-lg font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Shopping Cart</h3>
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-[#EEE6DA] dark:bg-[#2B2520] rounded-full text-[#2D241E] dark:text-[#F5F2ED]">
                {cart.length} items
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 rounded-full text-[#6F665F] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingCart className="w-12 h-12 text-[#6F665F]/40 mx-auto" />
                <h4 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Your Shopping Cart is Empty</h4>
                <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">Explore our hardware atelier to add products.</p>
              </div>
            ) : (
              cart.map((item) => {
                const unitPrice = calculateDiscountPrice(item.product.price, item.product.discount);
                return (
                  <div
                    key={item.product.id}
                    className="p-4 bg-[#EEE6DA]/30 dark:bg-[#181512] rounded-3xl border border-[#D8CFC2]/60 dark:border-[#4A433D]/60 flex items-center gap-4"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain p-1 bg-[#FFFDF8] dark:bg-[#221D19] rounded-2xl shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-xs font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-xs font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">
                        {formatCurrency(unitPrice)}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2 border border-[#D8CFC2] dark:border-[#4A433D] rounded-full px-2 py-0.5 bg-[#FFFDF8] dark:bg-[#221D19]">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="text-[#6F665F]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#2D241E] dark:text-[#F5F2ED] px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="text-[#6F665F]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#B54A30] hover:scale-110 transition-transform p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#D8CFC2]/60 dark:border-[#4A433D]/60 space-y-4 bg-[#FFFDF8] dark:bg-[#221D19]">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Voucher Code (e.g. WELCOME50)"
                  className="flex-1 px-4 py-2 text-xs bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C56A43] hover:bg-[#AA5A39] text-white text-xs font-semibold rounded-full shrink-0"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-[#5E8C61] font-semibold bg-[#5E8C61]/15 px-3 py-1.5 rounded-full">
                  <span>Voucher ({appliedCoupon.code}) -{appliedCoupon.discountPercentage}%</span>
                  <button onClick={removeCoupon} className="text-[#B54A30]">✕</button>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-[#6F665F] dark:text-[#C5BFB8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#2D241E] dark:text-[#F5F2ED]">{formatCurrency(subtotal)}</span>
                </div>
                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-[#5E8C61]">
                    <span>Discount</span>
                    <span className="font-bold">-{formatCurrency(couponDiscountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] pt-2 border-t border-[#D8CFC2]/40 dark:border-[#4A433D]/40">
                  <span>Total Amount</span>
                  <span className="text-[#3F5B43] dark:text-[#8FAE83]">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutSubmit}
                disabled={isCheckingOut}
                className="w-full py-4 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                {isCheckingOut ? (
                  <span>Processing White-Glove Order...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout ({formatCurrency(totalAmount)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Order Completion Modal */}
      {orderCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181512]/80 backdrop-blur-md">
          <div className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#5E8C61]/20 text-[#5E8C61] flex items-center justify-center mx-auto">
              ✓
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Order Successfully Placed!</h3>
            <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">
              Your order <span className="font-bold text-[#3F5B43] dark:text-[#8FAE83]">#{orderCompleteModal}</span> is being processed with White-Glove inspection.
            </p>
            <button
              onClick={() => {
                setOrderCompleteModal(null);
                setIsCartDrawerOpen(false);
                clearCart();
              }}
              className="w-full py-3 bg-[#3F5B43] text-white font-semibold text-xs rounded-full"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
