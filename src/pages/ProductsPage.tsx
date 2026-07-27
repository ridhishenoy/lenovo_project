import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { formatCurrency } from '../lib/utils';
import { ProductBrand, ProductCategory } from '../types';
import { 
  SlidersHorizontal, 
  Grid, 
  List, 
  RotateCcw, 
  Search, 
  Star, 
  X,
  ChevronDown
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, filter, setFilter, resetFilters } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const brandsList: ProductBrand[] = ['Dell', 'Apple', 'ASUS', 'Lenovo', 'HP', 'NVIDIA', 'Epson', 'Corsair', 'Logitech', 'Samsung'];
  const categoriesList: ProductCategory[] = ['Laptops', 'Desktops', 'Printers', 'Components', 'Accessories', 'Monitors', 'Storage'];

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search
      if (filter.search) {
        const query = filter.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesSpec = Object.values(product.specs).some(val => typeof val === 'string' && val.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesSpec) return false;
      }

      // Brands
      if (filter.brands.length > 0 && !filter.brands.includes(product.brand)) {
        return false;
      }

      // Categories
      if (filter.categories.length > 0 && !filter.categories.includes(product.category)) {
        return false;
      }

      // Price Range
      const effectivePrice = Math.round(product.price * (1 - product.discount / 100));
      if (effectivePrice < filter.minPrice || effectivePrice > filter.maxPrice) {
        return false;
      }

      // Rating
      if (filter.minRating > 0 && product.rating < filter.minRating) {
        return false;
      }

      // Availability
      if (filter.availability.length > 0 && !filter.availability.includes(product.availability)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = Math.round(a.price * (1 - a.discount / 100));
      const priceB = Math.round(b.price * (1 - b.discount / 100));

      if (filter.sortBy === 'price-low') return priceA - priceB;
      if (filter.sortBy === 'price-high') return priceB - priceA;
      if (filter.sortBy === 'rating') return b.rating - a.rating;
      if (filter.sortBy === 'discount') return b.discount - a.discount;
      return b.reviewsCount - a.reviewsCount; // Popularity default
    });
  }, [products, filter]);

  const toggleBrandFilter = (brand: ProductBrand) => {
    setFilter(prev => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists ? prev.brands.filter(b => b !== brand) : [...prev.brands, brand]
      };
    });
  };

  const toggleCategoryFilter = (cat: ProductCategory) => {
    setFilter(prev => {
      const exists = prev.categories.includes(cat);
      return {
        ...prev,
        categories: exists ? prev.categories.filter(c => c !== cat) : [...prev.categories, cat]
      };
    });
  };

  const SidebarContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 pb-4">
        <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#C56A43] dark:text-[#C97A4D]" /> Filter Atelier
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs text-[#6F665F] dark:text-[#C5BFB8] hover:text-[#3F5B43] dark:hover:text-[#8FAE83] font-semibold flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8] mb-2">Keyword Search</label>
        <div className="relative">
          <input
            type="text"
            value={filter.search}
            onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
            placeholder="Search specs or model..."
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED] focus:outline-none focus:ring-2 focus:ring-[#3F5B43] dark:focus:ring-[#8FAE83]"
          />
          <Search className="w-3.5 h-3.5 text-[#6F665F] dark:text-[#C5BFB8] absolute left-3 top-3" />
        </div>
      </div>

      {/* Categories Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8] mb-2">Categories</label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {categoriesList.map(cat => {
            const isChecked = filter.categories.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-xl hover:bg-[#EEE6DA]/50 dark:hover:bg-[#2B2520] transition-colors"
              >
                <span className={`font-medium ${isChecked ? 'text-[#3F5B43] dark:text-[#8FAE83] font-bold' : 'text-[#2D241E] dark:text-[#F5F2ED]'}`}>
                  {cat}
                </span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCategoryFilter(cat)}
                  className="rounded text-[#3F5B43] focus:ring-[#3F5B43]"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Brands Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8] mb-2">Manufacturer</label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {brandsList.map(b => {
            const isChecked = filter.brands.includes(b);
            return (
              <label
                key={b}
                className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-xl hover:bg-[#EEE6DA]/50 dark:hover:bg-[#2B2520] transition-colors"
              >
                <span className={`font-medium ${isChecked ? 'text-[#3F5B43] dark:text-[#8FAE83] font-bold' : 'text-[#2D241E] dark:text-[#F5F2ED]'}`}>
                  {b}
                </span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleBrandFilter(b)}
                  className="rounded text-[#3F5B43] focus:ring-[#3F5B43]"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8]">Price Limit</span>
          <span className="font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">{formatCurrency(filter.maxPrice)}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="400000"
          step="5000"
          value={filter.maxPrice}
          onChange={(e) => setFilter(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-[#3F5B43] dark:accent-[#8FAE83]"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header & Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#D8CFC2] dark:border-[#4A433D]">
        <div>
          <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C56A43] dark:text-[#C97A4D]">
            Curated Showroom Collection
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
            Hardware Atelier & Catalog
          </h1>
          <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] mt-1">
            Showing {filteredProducts.length} of {products.length} luxury laptops, workstations, and components.
          </p>
        </div>

        {/* View Mode & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden px-4 py-2.5 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] text-xs font-semibold text-[#2D241E] dark:text-[#F5F2ED] rounded-full flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C56A43]" /> Filters
          </button>

          {/* Sort Selector */}
          <div className="relative flex-1 md:flex-initial">
            <select
              value={filter.sortBy}
              onChange={(e) => setFilter(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="w-full pl-4 pr-10 py-2.5 text-xs font-semibold bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED] focus:outline-none focus:ring-2 focus:ring-[#3F5B43] shadow-sm appearance-none cursor-pointer"
            >
              <option value="popular">Sort: Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Savings</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#6F665F] absolute right-3 top-3 pointer-events-none" />
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center gap-1 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] p-1 rounded-full shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512]' : 'text-[#6F665F] dark:text-[#C5BFB8]'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-colors ${viewMode === 'list' ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512]' : 'text-[#6F665F] dark:text-[#C5BFB8]'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1 p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl shadow-sm h-fit sticky top-28">
          <SidebarContent />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-8 space-y-4">
              <Search className="w-12 h-12 text-[#C56A43] mx-auto opacity-60" />
              <h3 className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">No Hardware Matches Found</h3>
              <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] max-w-md mx-auto">
                Try relaxing your search terms or resetting filters to explore our full hardware collection.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] text-white dark:text-[#181512] font-semibold text-xs rounded-full shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#181512]/75 backdrop-blur-md">
          <div className="w-full max-w-xs bg-[#FFFDF8] dark:bg-[#221D19] h-full p-6 overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#D8CFC2] dark:border-[#4A433D] pb-3">
              <h3 className="font-serif font-bold text-base text-[#2D241E] dark:text-[#F5F2ED]">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 rounded-full text-[#6F665F]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

    </div>
  );
};
