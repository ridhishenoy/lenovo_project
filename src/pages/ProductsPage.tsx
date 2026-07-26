import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header & Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Computer Hardware & Device Catalog
          </h1>
          <p className="text-xs text-slate-500">
            Showing {filteredProducts.length} of {products.length} genuine devices & components
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden px-3.5 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium hidden sm:inline">Sort By:</span>
            <select
              value={filter.sortBy}
              onChange={(e: any) => setFilter(prev => ({ ...prev, sortBy: e.target.value }))}
              className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-slate-900 dark:text-white"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount %</option>
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-400'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-400'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Filter Sidebar */}
        <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 sticky top-24`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Filter Hardware
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-bold text-rose-500 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Search filter input */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Search Keywords
            </label>
            <input
              type="text"
              value={filter.search}
              onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
              placeholder="e.g. RTX 4080, OLED..."
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
            />
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Categories
            </label>
            <div className="space-y-1.5 text-xs max-h-40 overflow-y-auto pr-1">
              {categoriesList.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={filter.categories.includes(cat)}
                    onChange={() => toggleCategoryFilter(cat)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Brands
            </label>
            <div className="space-y-1.5 text-xs max-h-40 overflow-y-auto pr-1">
              {brandsList.map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={filter.brands.includes(brand)}
                    onChange={() => toggleBrandFilter(brand)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-900 dark:text-white">
              <span>Max Price:</span>
              <span>${filter.maxPrice}</span>
            </div>
            <input
              type="range"
              min={100}
              max={5000}
              step={100}
              value={filter.maxPrice}
              onChange={(e) => setFilter(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[0, 4, 4.5].map(r => (
                <button
                  key={r}
                  onClick={() => setFilter(prev => ({ ...prev, minRating: r }))}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    filter.minRating === r
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {r === 0 ? 'All' : `${r}★+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Cards Container */}
        <main className="lg:col-span-3 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-3">
              <Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No products found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No hardware matches your active filters. Try adjusting price range or clearing keyword search.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
