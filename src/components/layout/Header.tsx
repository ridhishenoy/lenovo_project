import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  ArrowLeftRight, 
  Sparkles, 
  Mic, 
  Camera, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck,
  Compass,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenVoiceSearch: () => void;
  onOpenImageSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenVoiceSearch, onOpenImageSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    theme, 
    toggleTheme, 
    cart, 
    wishlist, 
    compareList, 
    products,
    setFilter,
    setIsAiAdvisorOpen,
    setIsCartDrawerOpen,
    setIsCompareModalOpen,
    user,
    logout
  } = useApp();

  const [searchInputValue, setSearchInputValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products for search autocomplete preview
  const searchSuggestions = searchInputValue.trim().length > 1 
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchInputValue.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchInputValue.toLowerCase()) ||
        p.category.toLowerCase().includes(searchInputValue.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      setFilter(prev => ({ ...prev, search: searchInputValue.trim() }));
      setIsSearchOpen(false);
      navigate('/products');
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    // { label: 'Custom PC Builder', path: '/pc-builder', badge: 'Crafted' },
    { label: 'Services', path: '/services' },
    { label: 'Service Booking', path: '/booking' },
    { label: 'Track Repair', path: '/track' },
    { label: 'Trade-In', path: '/trade-in' },
    { label: 'Store Locator', path: '/stores' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#F7F3ED]/85 dark:bg-[#181512]/85 border-b border-[#D8CFC2] dark:border-[#4A433D] transition-colors duration-300">
      {/* Top Banner Announcement - Organic Earth Bar */}
      <div className="bg-[#2D241E] dark:bg-[#221D19] text-[#F5F2ED] text-xs py-2 px-4 border-b border-[#4A433D]/40 text-center font-medium flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-4 mx-auto sm:mx-0">
          <span className="flex items-center gap-2 text-[#C5BFB8]">
            <span className="w-2 h-2 rounded-full bg-[#708A58] animate-pulse"></span>
            <span className="font-bold text-[#8FAE83]">AUTHORIZED SHOWROOM</span> Official Laptop & Hardware Atelier
          </span>
          <span className="hidden md:inline-block text-[#4A433D]">•</span>
          <span className="hidden md:flex items-center gap-1.5 text-[#8FAE83]">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine Onsite Warranty Included
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => setIsAiAdvisorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold rounded-full bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] transition-all shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-[#D4AF5A]" /> AI Hardware Concierge
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img 
              src="/logo.png" 
              alt="Shenoy Computers" 
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform drop-shadow-sm rounded-lg grayscale-[0.3] sepia-[0.4] hue-rotate-180 saturate-150 mix-blend-multiply dark:mix-blend-screen opacity-90" 
            />
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#2D241E] dark:text-[#F5F2ED] flex items-center gap-1.5">
                SHENOY <span className="text-[#C56A43] dark:text-[#C97A4D] font-sans font-light text-lg">COMPUTERS</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#6F665F] dark:text-[#C5BFB8] block -mt-1">
                Luxury Hardware & Service Lab
              </span>
            </div>
          </Link>

          {/* Global Search Bar */}
          <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchInputValue}
                onChange={(e) => {
                  setSearchInputValue(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search laptops, workstations, repair services..."
                className="w-full pl-10 pr-24 py-2.5 text-xs font-medium bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED] placeholder-[#6F665F] dark:placeholder-[#C5BFB8] focus:outline-none focus:ring-2 focus:ring-[#3F5B43] dark:focus:ring-[#8FAE83] transition-all shadow-sm"
              />
              <Search className="w-4 h-4 text-[#6F665F] dark:text-[#C5BFB8] absolute left-3.5 pointer-events-none" />

              <div className="absolute right-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={onOpenVoiceSearch}
                  className="p-1.5 rounded-full hover:bg-[#EEE6DA] dark:hover:bg-[#352E28] text-[#6F665F] dark:text-[#C5BFB8] hover:text-[#3F5B43] dark:hover:text-[#8FAE83] transition-colors"
                  title="Voice Search"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onOpenImageSearch}
                  className="p-1.5 rounded-full hover:bg-[#EEE6DA] dark:hover:bg-[#352E28] text-[#6F665F] dark:text-[#C5BFB8] hover:text-[#3F5B43] dark:hover:text-[#8FAE83] transition-colors"
                  title="Image Search"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Search Autocomplete Dropdown */}
            {isSearchOpen && searchSuggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-2xl shadow-2xl overflow-hidden z-50 py-2">
                <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8]">
                  Suggested Products
                </div>
                {searchSuggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchInputValue('');
                      navigate(`/products/${product.id}`);
                    }}
                    className="px-4 py-2.5 hover:bg-[#EEE6DA]/60 dark:hover:bg-[#2B2520] cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-contain p-1 bg-[#EEE6DA] dark:bg-[#181512] rounded-xl shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#2D241E] dark:text-[#F5F2ED] truncate">
                        {product.name}
                      </div>
                      <div className="text-[11px] text-[#3F5B43] dark:text-[#8FAE83] font-bold">
                        ₹{product.price.toLocaleString()} • {product.brand}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Dark/Light Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520] transition-colors"
              title="Toggle Day/Night Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#D4AF5A]" /> : <Moon className="w-4 h-4 text-[#2D241E]" />}
            </button>

            {/* Compare Icon */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="relative p-2.5 rounded-full border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520] transition-colors"
              title="Compare Hardware"
            >
              <ArrowLeftRight className="w-4 h-4" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C56A43] dark:bg-[#C97A4D] text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <Link
              to="/dashboard?tab=wishlist"
              className="relative p-2.5 rounded-full border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520] transition-colors"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B54A30] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs shadow-sm transition-all active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#C56A43] dark:bg-[#C97A4D] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth */}
            <div className="relative">
              {user ? (
                <>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="p-1 rounded-full border border-[#D8CFC2] dark:border-[#4A433D] hover:ring-2 hover:ring-[#3F5B43] dark:hover:ring-[#8FAE83] transition-all"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-2xl shadow-xl py-2 z-50 text-xs font-medium">
                      <div className="px-4 py-2 border-b border-[#D8CFC2]/50 dark:border-[#4A433D]/50">
                        <p className="font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] truncate">{user.name}</p>
                        <p className="text-[#6F665F] dark:text-[#C5BFB8] text-[10px] truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-[#2D241E] dark:text-[#F5F2ED] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520]"
                      >
                        User Dashboard
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-[#2D241E] dark:text-[#F5F2ED] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520]"
                        >
                          Admin Portal
                        </Link>
                      )}
                      <Link
                        to="/track"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-[#2D241E] dark:text-[#F5F2ED] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520]"
                      >
                        Repair Status
                      </Link>
                      <div className="border-t border-[#D8CFC2]/50 dark:border-[#4A433D]/50 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left block px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-[#EEE6DA] hover:bg-[#D8CFC2] dark:bg-[#2B2520] dark:hover:bg-[#352E28] text-[#2D241E] dark:text-[#F5F2ED] font-semibold text-xs rounded-full shadow-sm transition-all flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#2D241E] dark:text-[#F5F2ED] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520] lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1.5 py-3 border-t border-[#D8CFC2]/60 dark:border-[#4A433D]/60 overflow-x-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-white bg-[#3F5B43] dark:bg-[#8FAE83] dark:text-[#181512] shadow-sm'
                    : 'text-[#6F665F] dark:text-[#C5BFB8] hover:text-[#2D241E] dark:hover:text-[#F5F2ED] hover:bg-[#EEE6DA]/60 dark:hover:bg-[#2B2520]'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#C56A43] text-white dark:bg-[#C97A4D] rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#D8CFC2] dark:border-[#4A433D] bg-[#FFFDF8] dark:bg-[#221D19] px-4 py-4 space-y-3"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                placeholder="Search products & repairs..."
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#EEE6DA] dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
              />
              <Search className="w-4 h-4 text-[#6F665F] dark:text-[#C5BFB8] absolute left-3 top-3" />
            </form>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 text-xs font-semibold rounded-2xl bg-[#EEE6DA]/60 dark:bg-[#2B2520] text-[#2D241E] dark:text-[#F5F2ED] hover:bg-[#3F5B43] hover:text-white dark:hover:bg-[#8FAE83] dark:hover:text-[#181512] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
