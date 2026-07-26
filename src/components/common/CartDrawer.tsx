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
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Shopping Cart</h3>
              <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300">
                {cart.length} items
              </span>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingCart className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
                <p className="text-sm font-semibold text-slate-500">Your shopping cart is empty</p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/50 rounded-xl"
                >
                  Browse Hardware Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = calculateDiscountPrice(item.product.price, item.product.discount);
                return (
                  <div 
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl relative group"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-contain p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-slate-500">
                          {formatCurrency(itemPrice)} each
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                          {formatCurrency(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded-lg"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-4">
              
              {/* Coupon Form */}
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon Code (e.g. WELCOME50)"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-slate-900 dark:bg-slate-800 text-white font-semibold text-xs rounded-xl hover:bg-slate-800"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2.5 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-400">
                  <span>Coupon <strong>{appliedCoupon.code}</strong> Applied ({appliedCoupon.discountPercentage}% OFF)</span>
                  <button onClick={removeCoupon} className="text-rose-400 hover:underline text-[11px]">Remove</button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-500 font-medium">
                    <span>Discount ({appliedCoupon.code}):</span>
                    <span>-{formatCurrency(couponDiscountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Express Shipping:</span>
                  <span className="font-semibold text-emerald-500">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-sm font-extrabold text-slate-900 dark:text-white">
                  <span>Total Due:</span>
                  <span className="text-blue-600 dark:text-cyan-400">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutSubmit}
                disabled={isCheckingOut}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Proceed to Express Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Order Complete Success Modal */}
      {orderCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full text-center space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Order Confirmed!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your order <strong className="text-slate-900 dark:text-white">#{orderCompleteModal}</strong> has been received and sent for fulfillment.
            </p>
            <button
              onClick={() => {
                setOrderCompleteModal(null);
                setIsCartDrawerOpen(false);
              }}
              className="w-full py-3 bg-blue-600 text-white font-bold text-xs rounded-xl"
            >
              Done & Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
