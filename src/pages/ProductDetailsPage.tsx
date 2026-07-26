import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatCurrency, calculateDiscountPrice } from '../lib/utils';
import { ProductCard } from '../components/common/ProductCard';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ArrowLeftRight, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  HardDrive, 
  Calendar,
  Plus,
  Minus,
  MessageSquare,
  ThumbsUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare,
    showToast 
  } = useApp();

  const product = products.find(p => p.id === id) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'warranty' | 'reviews' | 'bundle'>('specs');

  // Review submission state
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      userName: 'Jonathan Vance',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      date: 'July 14, 2026',
      title: 'Absolute powerhouse for video editing & 3D rendering',
      comment: 'The OLED screen on this laptop is unparalleled. Colors are 100% color-accurate for Premiere Pro and Blender. Thermal dissipation is super quiet.',
      verified: true,
      helpful: 34
    }
  ]);

  // Frequently Bought Together Bundle state
  const [bundleIncludeMouse, setBundleIncludeMouse] = useState(true);
  const [bundleIncludeSleeve, setBundleIncludeSleeve] = useState(true);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">Product not found</h2>
        <Link to="/products" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">Back to Store</Link>
      </div>
    );
  }

  const finalPrice = calculateDiscountPrice(product.price, product.discount);
  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Bundle calculations
  const mousePrice = 89;
  const sleevePrice = 39;
  const bundleSubtotal = finalPrice + (bundleIncludeMouse ? mousePrice : 0) + (bundleIncludeSleeve ? sleevePrice : 0);
  const bundleDiscountedPrice = Math.round(bundleSubtotal * 0.9); // 10% bundle discount

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/products');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && newTitle.trim()) {
      setReviewsList(prev => [
        {
          id: Date.now().toString(),
          userName: 'Alex Morgan',
          userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          rating: newRating,
          date: 'Just now',
          title: newTitle,
          comment: newComment,
          verified: true,
          helpful: 0
        },
        ...prev
      ]);
      setNewTitle('');
      setNewComment('');
      showToast('Thank you! Your product review has been published.', 'success');
    }
  };

  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Product Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative w-full h-80 sm:h-96 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md flex items-center justify-center overflow-hidden">
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md">
                {product.badge}
              </span>
            )}
            {product.discount > 0 && (
              <span className="absolute top-4 right-4 z-10 px-2.5 py-1 text-xs font-bold text-rose-600 bg-rose-100 dark:bg-rose-950/80 dark:text-rose-400 rounded-lg">
                -{product.discount}% OFF
              </span>
            )}
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-105 cursor-zoom-in"
            />
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-20 rounded-2xl border p-2 bg-white dark:bg-slate-900 shrink-0 transition-all ${
                  activeImageIndex === idx 
                    ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md' 
                    : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumb" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Title, Specs Summary, Pricing & Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400 rounded-md">
                {product.brand}
              </span>
              <span className="text-xs font-bold text-slate-400">• {product.category}</span>
              <span className="ml-auto text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {product.availability}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-slate-400">({product.reviewsCount} Customer Reviews)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {formatCurrency(finalPrice)}
            </span>
            {product.discount > 0 && (
              <span className="text-base text-slate-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
            <span className="ml-auto text-xs text-slate-500 font-medium">
              Tax Included • Free Express Delivery
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.fullDesc}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-100/60 dark:bg-slate-950/60 rounded-2xl text-xs font-medium border border-slate-200/60 dark:border-slate-800">
            {product.specs.processor && (
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-bold">{product.specs.processor}</span>
              </div>
            )}
            {product.specs.ram && (
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-bold">{product.specs.ram}</span>
              </div>
            )}
            {product.specs.storage && (
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-bold">{product.specs.storage}</span>
              </div>
            )}
            {product.specs.gpu && (
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-500 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-bold">{product.specs.gpu}</span>
              </div>
            )}
          </div>

          {/* Quantity & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity:</span>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-xs font-bold text-slate-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
              >
                Buy Now
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition-colors ${
                  isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-slate-200 text-slate-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                onClick={() => toggleCompare(product)}
                className={`p-3.5 rounded-2xl border transition-colors ${
                  isCompared ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-slate-200 text-slate-600'
                }`}
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specs, Warranty, Reviews, Bundle */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'specs' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('warranty')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'warranty' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Warranty & Coverage
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'reviews' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Customer Reviews ({reviewsList.length})
          </button>
          <button
            onClick={() => setActiveTab('bundle')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'bundle' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Frequently Bought Together
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'specs' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hardware Details Table</h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {Object.entries(product.specs).map(([key, val]) => val && (
                <div key={key} className="py-2.5 grid grid-cols-3 gap-4">
                  <span className="font-bold text-slate-400 capitalize">{key}:</span>
                  <span className="col-span-2 font-semibold text-slate-900 dark:text-white">{val}</span>
                </div>
              ))}
              {Object.entries(product.technicalDetails).map(([key, val]) => (
                <div key={key} className="py-2.5 grid grid-cols-3 gap-4">
                  <span className="font-bold text-slate-400">{key}:</span>
                  <span className="col-span-2 font-semibold text-slate-900 dark:text-white">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'warranty' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-cyan-400 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Official Manufacturer Warranty Included</h4>
                <p className="text-slate-600 dark:text-slate-300">{product.warranty}</p>
              </div>
            </div>
            <p className="text-slate-500 leading-relaxed">
              All devices purchased from NexusTech come sealed in original OEM packaging with standard manufacturer warranty. In case of any hardware malfunction, you can bring the device to any NexusTech store or authorized service hub for immediate replacement or repair.
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Reviews List */}
            <div className="space-y-4">
              {reviewsList.map(rev => (
                <div key={rev.id} className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={rev.userAvatar} alt={rev.userName} className="w-7 h-7 rounded-full object-cover" />
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{rev.userName}</span>
                      {rev.verified && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">Verified Buyer</span>}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">{rev.title}</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Write Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-6 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Write a Customer Review</h4>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Rating:</span>
                {[1, 2, 3, 4, 5].map(r => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setNewRating(r)}
                    className="p-1 text-amber-400"
                  >
                    <Star className={`w-5 h-5 ${r <= newRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Review Headline (e.g. Outstanding performance for gaming)"
                  required
                  className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>
              <div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your experience with build quality, battery life, thermals..."
                  rows={3}
                  required
                  className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
              >
                Submit Verified Review
              </button>
            </form>
          </div>
        )}

        {activeTab === 'bundle' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Bundle & Save 10% Extra On Accessories
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Product 1 */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
                <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-contain mx-auto" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{product.name}</h4>
                <div className="text-xs font-extrabold text-blue-600">{formatCurrency(finalPrice)}</div>
              </div>

              {/* Plus Accessories */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={bundleIncludeMouse}
                    onChange={(e) => setBundleIncludeMouse(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span>Logitech MX Master Mouse (+${mousePrice})</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={bundleIncludeSleeve}
                    onChange={(e) => setBundleIncludeSleeve(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span>Waterproof Laptop Sleeve (+${sleevePrice})</span>
                </label>
              </div>

              {/* Bundle Checkout */}
              <div className="p-4 bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl text-center space-y-3">
                <div className="text-xs text-slate-300">Bundle Discounted Total:</div>
                <div className="text-2xl font-black text-cyan-400">{formatCurrency(bundleDiscountedPrice)}</div>
                <button
                  onClick={() => {
                    addToCart(product, 1);
                    showToast('Bundle added to shopping cart with 10% discount!', 'success');
                  }}
                  className="w-full py-2.5 bg-cyan-400 hover:brightness-110 text-slate-950 font-bold text-xs rounded-xl"
                >
                  Buy Bundle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recommended / Similar Products */}
      {similarProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recommended Similar Devices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
