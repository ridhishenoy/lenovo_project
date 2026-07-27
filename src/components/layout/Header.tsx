import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Cpu, 
  Search, 
  ShoppingCart, 
  Heart, 
  ArrowLeftRight, 
  Bot, 
  Mic, 
  Camera, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Wrench, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown,
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
    isAdminMode, 
    toggleAdminMode, 
    cart, 
    wishlist, 
    compareList, 
    products,
    filter,
    setFilter,
    setIsAiAdvisorOpen,
    setIsCartDrawerOpen,
    setIsCompareModalOpen,
    user
  } = useApp();

  const [searchInputValue, setSearchInputValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
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
    { label: 'Custom PC Builder', path: '/pc-builder', badge: 'Popular' },
    { label: 'Services', path: '/services' },
    { label: 'Service Booking', path: '/booking' },
    { label: 'Track Repair', path: '/track' },
    { label: 'Trade-In', path: '/trade-in' },
    { label: 'Store Locator', path: '/stores' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      {/* Top Banner Announcement - Lenovo Brand Style */}
      <div className="bg-lenovo-black text-white text-xs py-2 px-4 border-b border-neutral-800 text-center font-medium flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-4 mx-auto sm:mx-0">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-lenovo-red animate-pulse"></span>
            <span className="font-bold text-lenovo-red">AUTHORIZED PARTNER</span> Official Lenovo Sales & Service Hub
          </span>
          <span className="hidden md:inline-block text-neutral-700">•</span>
          <span className="hidden md:flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Official 100% Lenovo Warranty Included
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => setIsAiAdvisorOpen(true)}
            className="flex items-center gap-1 px-3 py-1 text-[11px] font-bold rounded bg-lenovo-red text-white hover:bg-lenovo-red-hover transition-colors shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-amber-300" /> AI Hardware Advisor
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo with Lenovo Red Tag */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="bg-lenovo-red text-white font-black text-xs tracking-widest px-2.5 py-1.5 shadow-md group-hover:bg-lenovo-red-hover transition-colors flex items-center gap-1">
              <span>LENOVO</span>
            </div>
            <div>
              <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-1">
                SHENOY <span className="text-lenovo-red">COMPUTERS</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400 block -mt-1">
                Authorized Lab & Retail
              </span>
            </div>
          </Link>

          {/* Global Search Bar */}
          <div ref={searchRef} className="relative flex-1 max-w-lg hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchInputValue}
                onChange={(e) => {
                  setSearchInputValue(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search laptops, RTX GPUs, printers, repair service..."
                className="w-full pl-10 pr-24 py-2 text-xs font-medium bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />

              <div className="absolute right-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={onOpenVoiceSearch}
                  className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors"
                  title="Voice Search"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onOpenImageSearch}
                  className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors"
                  title="Image Search"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Search Autocomplete Dropdown */}
            {isSearchOpen && searchSuggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 py-2">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Search Suggestions
                </div>
                {searchSuggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchInputValue('');
                      navigate(`/products/${product.id}`);
                    }}
                    className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-contain p-1 bg-slate-100 dark:bg-slate-950 rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {product.name}
                      </div>
                      <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                        ${product.price} • {product.brand}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Header Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Dark/Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Compare Badge Icon */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Compare Products"
            >
              <ArrowLeftRight className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Badge Icon */}
            <Link
              to="/dashboard?tab=wishlist"
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 p-2 sm:px-3.5 py-2 rounded-lg bg-lenovo-red hover:bg-lenovo-red-hover text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-lenovo-red text-[11px] font-extrabold flex items-center justify-center shadow">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-1.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover"
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 text-xs font-medium">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-slate-500 text-[10px] truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    User Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Admin Portal
                    </Link>
                  )}
                  <Link
                    to="/track"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Track Repair
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Main Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 py-2 overflow-x-auto border-t border-slate-100 dark:border-slate-900">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-white bg-lenovo-red'
                    : 'text-slate-600 dark:text-slate-300 hover:text-lenovo-red dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wide bg-slate-900 text-white rounded">
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
            className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                placeholder="Search products & repairs..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950"
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
