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
  Plus,
  Minus
} from 'lucide-react';

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
        <h2 className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Hardware Model Not Found</h2>
        <Link to="/products" className="px-6 py-2.5 bg-[#3F5B43] text-white rounded-full text-xs font-semibold">Back to Atelier</Link>
      </div>
    );
  }

  const finalPrice = calculateDiscountPrice(product.price, product.discount);
  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Bundle calculations
  const mousePrice = 7400;
  const sleevePrice = 3200;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top Product Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative w-full h-80 sm:h-96 bg-[#FFFDF8] dark:bg-[#221D19] rounded-3xl p-8 border border-[#D8CFC2] dark:border-[#4A433D] shadow-sm flex items-center justify-center overflow-hidden">
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white bg-[#3F5B43] dark:bg-[#8FAE83] dark:text-[#181512] rounded-full shadow-sm">
                {product.badge}
              </span>
            )}
            {product.discount > 0 && (
              <span className="absolute top-4 right-4 z-10 px-3 py-1 text-xs font-bold text-white bg-[#B54A30] rounded-full shadow-sm">
                -{product.discount}% OFF
              </span>
            )}
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-105"
            />
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-20 rounded-2xl border p-2 bg-[#FFFDF8] dark:bg-[#221D19] shrink-0 transition-all ${
                  activeImageIndex === idx 
                    ? 'border-[#3F5B43] dark:border-[#8FAE83] ring-2 ring-[#3F5B43]/20 shadow-md' 
                    : 'border-[#D8CFC2] dark:border-[#4A433D] opacity-60 hover:opacity-100'
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
              <span className="px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-[#C56A43] bg-[#C56A43]/15 dark:bg-[#C97A4D]/15 dark:text-[#C97A4D] rounded-full">
                {product.brand}
              </span>
              <span className="text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8]">• {product.category}</span>
              <span className="ml-auto text-xs font-bold text-[#5E8C61] dark:text-[#76A46E] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> {product.availability}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-[#C79A3B] dark:text-[#D4AF5A] text-sm font-bold">
                <Star className="w-4 h-4 fill-[#C79A3B] dark:fill-[#D4AF5A]" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">({product.reviewsCount} Client Reviews)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 bg-[#FFFDF8] dark:bg-[#221D19] rounded-3xl border border-[#D8CFC2] dark:border-[#4A433D] flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
              {formatCurrency(finalPrice)}
            </span>
            {product.discount > 0 && (
              <span className="text-base text-[#6F665F] dark:text-[#C5BFB8] line-through">
                {formatCurrency(product.price)}
              </span>
            )}
            <span className="ml-auto text-xs text-[#6F665F] dark:text-[#C5BFB8] font-medium">
              GST Included • White-Glove Shipping
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#6F665F] dark:text-[#C5BFB8] leading-relaxed">
            {product.fullDesc}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-3 p-5 bg-[#EEE6DA]/40 dark:bg-[#181512] rounded-3xl text-xs font-medium border border-[#D8CFC2]/60 dark:border-[#4A433D]/60">
            {product.specs.processor && (
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#3F5B43] dark:text-[#8FAE83] shrink-0" />
                <span className="text-[#2D241E] dark:text-[#F5F2ED] font-bold">{product.specs.processor}</span>
              </div>
            )}
            {product.specs.ram && (
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#C79A3B] shrink-0" />
                <span className="text-[#2D241E] dark:text-[#F5F2ED] font-bold">{product.specs.ram}</span>
              </div>
            )}
            {product.specs.storage && (
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-[#708A58] shrink-0" />
                <span className="text-[#2D241E] dark:text-[#F5F2ED] font-bold">{product.specs.storage}</span>
              </div>
            )}
            {product.specs.gpu && (
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C56A43] shrink-0" />
                <span className="text-[#2D241E] dark:text-[#F5F2ED] font-bold">{product.specs.gpu}</span>
              </div>
            )}
          </div>

          {/* Quantity & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#2D241E] dark:text-[#F5F2ED]">Quantity:</span>
              <div className="flex items-center gap-2 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-[#6F665F] hover:text-[#2D241E] dark:hover:text-[#F5F2ED]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-xs font-bold text-[#2D241E] dark:text-[#F5F2ED]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-[#6F665F] hover:text-[#2D241E] dark:hover:text-[#F5F2ED]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 px-6 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-6 bg-[#C56A43] hover:bg-[#AA5A39] text-white font-semibold text-xs rounded-full shadow-sm transition-all"
              >
                Buy Now
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-full border transition-all ${
                  isWishlisted ? 'bg-[#B54A30] border-[#B54A30] text-white' : 'border-[#D8CFC2] dark:border-[#4A433D] text-[#6F665F]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>

              <button
                onClick={() => toggleCompare(product)}
                className={`p-3.5 rounded-full border transition-all ${
                  isCompared ? 'bg-[#3F5B43] dark:bg-[#8FAE83] border-transparent text-white dark:text-[#181512]' : 'border-[#D8CFC2] dark:border-[#4A433D] text-[#6F665F]'
                }`}
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 sm:p-10 space-y-6">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 overflow-x-auto pb-3">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-5 py-2.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
              activeTab === 'specs' 
                ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] shadow-sm' 
                : 'text-[#6F665F] dark:text-[#C5BFB8] hover:bg-[#EEE6DA]/50'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('warranty')}
            className={`px-5 py-2.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
              activeTab === 'warranty' 
                ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] shadow-sm' 
                : 'text-[#6F665F] dark:text-[#C5BFB8] hover:bg-[#EEE6DA]/50'
            }`}
          >
            Warranty & Coverage
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-2.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
              activeTab === 'reviews' 
                ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] shadow-sm' 
                : 'text-[#6F665F] dark:text-[#C5BFB8] hover:bg-[#EEE6DA]/50'
            }`}
          >
            Client Reviews ({reviewsList.length})
          </button>
          <button
            onClick={() => setActiveTab('bundle')}
            className={`px-5 py-2.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
              activeTab === 'bundle' 
                ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] shadow-sm' 
                : 'text-[#6F665F] dark:text-[#C5BFB8] hover:bg-[#EEE6DA]/50'
            }`}
          >
            Frequently Bought Together
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'specs' && (
          <div className="space-y-4">
            <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Hardware Details Specification</h3>
            <div className="divide-y divide-[#D8CFC2]/60 dark:divide-[#4A433D]/60 text-xs">
              {Object.entries(product.specs).map(([key, val]) => val && (
                <div key={key} className="py-3 grid grid-cols-3 gap-4">
                  <span className="font-semibold text-[#6F665F] dark:text-[#C5BFB8] capitalize">{key}:</span>
                  <span className="col-span-2 font-bold text-[#2D241E] dark:text-[#F5F2ED]">{val}</span>
                </div>
              ))}
              {Object.entries(product.technicalDetails).map(([key, val]) => (
                <div key={key} className="py-3 grid grid-cols-3 gap-4">
                  <span className="font-semibold text-[#6F665F] dark:text-[#C5BFB8]">{key}:</span>
                  <span className="col-span-2 font-bold text-[#2D241E] dark:text-[#F5F2ED]">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'warranty' && (
          <div className="space-y-4 text-xs">
            <div className="p-5 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-[#3F5B43] dark:text-[#8FAE83] shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] text-sm">Official Manufacturer Warranty Included</h4>
                <p className="text-[#6F665F] dark:text-[#C5BFB8]">{product.warranty}</p>
              </div>
            </div>
            <p className="text-[#6F665F] dark:text-[#C5BFB8] leading-relaxed">
              All devices purchased from Shenoy Computers come sealed in original OEM packaging with standard manufacturer warranty. In case of hardware issues, bring the device to any Shenoy Computers flagship showroom or authorized service lab for priority service.
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="space-y-4">
              {reviewsList.map(rev => (
                <div key={rev.id} className="p-5 bg-[#EEE6DA]/40 dark:bg-[#181512] rounded-3xl border border-[#D8CFC2]/60 dark:border-[#4A433D]/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={rev.userAvatar} alt={rev.userName} className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-bold text-xs text-[#2D241E] dark:text-[#F5F2ED]">{rev.userName}</span>
                      {rev.verified && <span className="text-[10px] bg-[#4F7A57] text-white px-2 py-0.5 rounded-full font-bold">Verified Client</span>}
                    </div>
                    <span className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8]">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#C79A3B] dark:text-[#D4AF5A] text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#C79A3B] dark:fill-[#D4AF5A]' : 'text-[#D8CFC2]'}`} />
                    ))}
                  </div>
                  <h5 className="font-serif font-bold text-xs text-[#2D241E] dark:text-[#F5F2ED]">{rev.title}</h5>
                  <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Write Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-6 bg-[#EEE6DA]/30 dark:bg-[#181512] rounded-3xl border border-[#D8CFC2] dark:border-[#4A433D] space-y-4 text-xs">
              <h4 className="font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] text-sm">Write a Review</h4>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#2D241E] dark:text-[#F5F2ED]">Rating:</span>
                {[1, 2, 3, 4, 5].map(r => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setNewRating(r)}
                    className="p-1 text-[#C79A3B]"
                  >
                    <Star className={`w-5 h-5 ${r <= newRating ? 'fill-[#C79A3B]' : 'text-[#D8CFC2]'}`} />
                  </button>
                ))}
              </div>
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Review Headline (e.g. Outstanding performance for rendering)"
                  required
                  className="w-full p-3 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
                />
              </div>
              <div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your experience with thermals, display, acoustics..."
                  rows={3}
                  required
                  className="w-full p-3 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-2xl text-[#2D241E] dark:text-[#F5F2ED]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#3F5B43] text-white font-semibold rounded-full hover:bg-[#2F4734]"
              >
                Submit Verified Review
              </button>
            </form>
          </div>
        )}

        {activeTab === 'bundle' && (
          <div className="space-y-6">
            <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
              Frequently Bought Together (Save 10% Extra)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Product 1 */}
              <div className="p-6 bg-[#EEE6DA]/40 dark:bg-[#181512] rounded-3xl border border-[#D8CFC2] dark:border-[#4A433D] text-center space-y-2">
                <img src={product.images[0]} alt={product.name} className="w-24 h-24 object-contain mx-auto" />
                <h4 className="text-xs font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] truncate">{product.name}</h4>
                <div className="text-xs font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">{formatCurrency(finalPrice)}</div>
              </div>

              {/* Accessories */}
              <div className="p-6 bg-[#EEE6DA]/40 dark:bg-[#181512] rounded-3xl border border-[#D8CFC2] dark:border-[#4A433D] space-y-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#2D241E] dark:text-[#F5F2ED]">
                  <input
                    type="checkbox"
                    checked={bundleIncludeMouse}
                    onChange={(e) => setBundleIncludeMouse(e.target.checked)}
                    className="rounded text-[#3F5B43]"
                  />
                  <span>Logitech MX Master Mouse (+₹{mousePrice.toLocaleString()})</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#2D241E] dark:text-[#F5F2ED]">
                  <input
                    type="checkbox"
                    checked={bundleIncludeSleeve}
                    onChange={(e) => setBundleIncludeSleeve(e.target.checked)}
                    className="rounded text-[#3F5B43]"
                  />
                  <span>Waterproof Laptop Sleeve (+₹{sleevePrice.toLocaleString()})</span>
                </label>
              </div>

              {/* Bundle Checkout */}
              <div className="p-6 bg-[#3F5B43] text-white rounded-3xl text-center space-y-3 shadow-md">
                <div className="text-xs text-[#F5F2ED]/80">Bundle Discounted Total:</div>
                <div className="text-3xl font-serif font-bold text-[#D4AF5A]">{formatCurrency(bundleDiscountedPrice)}</div>
                <button
                  onClick={() => {
                    addToCart(product, 1);
                    showToast('Bundle added to cart with 10% discount!', 'success');
                  }}
                  className="w-full py-3 bg-[#C56A43] hover:bg-[#AA5A39] text-white font-semibold text-xs rounded-full shadow-sm"
                >
                  Buy Bundle Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recommended / Similar Products */}
      {similarProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Recommended Similar Devices</h2>
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
