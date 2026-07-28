import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  ProductFilter, 
  CartItem, 
  ServiceBooking, 
  RepairOrder, 
  PCComponent, 
  TradeInQuote, 
  UserProfile, 
  Order, 
  Coupon,
  Partner,
  HeroSlide
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  SERVICES_LIST, 
  MOCK_REPAIR_ORDERS, 
  PC_BUILDER_COMPONENTS, 
  VALID_COUPONS, 
  SAMPLE_ORDERS, 
  SAMPLE_REVIEWS,
  BRAND_LOGOS,
  INITIAL_HERO_SLIDES
} from '../data/mockData';
import { AuthService, ProductService } from '../services/api';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // Theme & Mode
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isAdminMode: boolean;
  toggleAdminMode: () => void;

  // Products
  products: Product[];
  filter: ProductFilter;
  setFilter: React.Dispatch<React.SetStateAction<ProductFilter>>;
  resetFilters: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart & Wishlist & Compare
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedWarranty?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  compareList: Product[];
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;

  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;

  // Bookings & Repairs
  serviceBookings: ServiceBooking[];
  addServiceBooking: (booking: Omit<ServiceBooking, 'id' | 'createdAt' | 'status'>) => ServiceBooking;
  repairOrders: Record<string, RepairOrder>;
  updateRepairOrder: (order: RepairOrder) => void;

  // Custom PC Builder
  selectedPCComponents: Record<string, PCComponent | null>; // key: component type (cpu, gpu, etc)
  selectPCComponent: (type: string, component: PCComponent | null) => void;
  clearPCBuild: () => void;

  // Trade-In
  tradeInQuotes: TradeInQuote[];
  addTradeInQuote: (quote: Omit<TradeInQuote, 'id' | 'createdAt' | 'voucherCode'>) => TradeInQuote;

  // User & Orders
  user: UserProfile | null;
  login: (credentials: any) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;

  // Toasts & Modals
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // AI & Search
  isAiAdvisorOpen: boolean;
  setIsAiAdvisorOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  
  partners: Partner[];
  addPartner: (partner: Partner) => void;
  removePartner: (name: string) => void;

  // Hero Slides (New Arrivals)
  heroSlides: HeroSlide[];
  addHeroSlide: (slide: HeroSlide) => void;
  removeHeroSlide: (id: string) => void;
  updateHeroSlide: (id: string, updatedSlide: HeroSlide) => void;
}

const DEFAULT_FILTER: ProductFilter = {
  search: '',
  brands: [],
  categories: [],
  minPrice: 0,
  maxPrice: 415000,
  processors: [],
  ramSizes: [],
  storageTypes: [],
  gpus: [],
  screenSizes: [],
  printerTypes: [],
  availability: [],
  minRating: 0,
  sortBy: 'popularity'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('nexustech_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Products & Filter
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductService.getProducts()
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  const [filter, setFilter] = useState<ProductFilter>(DEFAULT_FILTER);

  // Cart & Wishlist & Compare
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nexustech_cart_inr');
    return saved ? JSON.parse(saved) : [];
  });
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nexustech_wishlist_inr');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Bookings & Repairs
  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>(() => {
    const saved = localStorage.getItem('nexustech_bookings_inr');
    return saved ? JSON.parse(saved) : [];
  });

  const [repairOrders, setRepairOrders] = useState<Record<string, RepairOrder>>(() => {
    const saved = localStorage.getItem('nexustech_repairs_inr');
    return saved ? JSON.parse(saved) : MOCK_REPAIR_ORDERS;
  });

  // Custom PC Builder components selection
  const [selectedPCComponents, setSelectedPCComponents] = useState<Record<string, PCComponent | null>>({
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    psu: null,
    cabinet: null,
    ssd: null,
    cooling: null,
    monitor: null,
    keyboard: null,
    mouse: null
  });

  // Trade-In Quotes
  const [tradeInQuotes, setTradeInQuotes] = useState<TradeInQuote[]>([]);

  // Partners
  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('nexustech_partners');
    return saved ? JSON.parse(saved) : BRAND_LOGOS;
  });

  useEffect(() => {
    localStorage.setItem('nexustech_partners', JSON.stringify(partners));
  }, [partners]);

  // Hero Slides
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('nexustech_heroslides');
    return saved ? JSON.parse(saved) : INITIAL_HERO_SLIDES;
  });

  useEffect(() => {
    localStorage.setItem('nexustech_heroslides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  // User & Orders
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nexustech_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (credentials: any) => {
    try {
      const userData = await AuthService.login(credentials);
      setUser(userData);
      localStorage.setItem('nexustech_user', JSON.stringify(userData));
      showToast('Logged in successfully!', 'success');
    } catch (e: any) {
      showToast(e.message || 'Login failed', 'error');
      throw e;
    }
  };

  const signup = async (userData: any) => {
    try {
      const newUserData = await AuthService.signup(userData);
      setUser(newUserData);
      localStorage.setItem('nexustech_user', JSON.stringify(newUserData));
      showToast('Account created successfully!', 'success');
    } catch (e: any) {
      showToast(e.message || 'Signup failed', 'error');
      throw e;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexustech_user');
    showToast('Logged out successfully', 'info');
  };

  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // UI Modals & Drawers
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState<boolean>(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Save changes to localStorage
  // Removed products from localStorage persistence as it's now managed by the backend


  useEffect(() => {
    localStorage.setItem('nexustech_cart_inr', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nexustech_wishlist_inr', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('nexustech_bookings_inr', JSON.stringify(serviceBookings));
  }, [serviceBookings]);

  useEffect(() => {
    localStorage.setItem('nexustech_repairs_inr', JSON.stringify(repairOrders));
  }, [repairOrders]);

  // Apply dark mode class to root document element
  useEffect(() => {
    localStorage.setItem('nexustech_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleAdminMode = () => {
    setIsAdminMode(prev => !prev);
    showToast(!isAdminMode ? 'Switched to Admin Dashboard Mode' : 'Switched to Customer View Mode', 'info');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const resetFilters = () => {
    setFilter(DEFAULT_FILTER);
  };

  const addProduct = async (newProduct: Product) => {
    try {
      const savedProd = await ProductService.createProduct(newProduct);
      setProducts(prev => [savedProd, ...prev]);
      showToast(`Product "${savedProd.name}" added successfully!`, 'success');
    } catch (e) {
      showToast(`Failed to add product`, 'error');
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      const savedProd = await ProductService.updateProduct(updatedProduct.id, updatedProduct);
      setProducts(prev => prev.map(p => p.id === savedProd.id ? savedProd : p));
      showToast(`Product "${savedProd.name}" updated`, 'success');
    } catch (e) {
      showToast(`Failed to update product`, 'error');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await ProductService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast(`Product deleted`, 'info');
    } catch (e) {
      showToast(`Failed to delete product`, 'error');
    }
  };

  const addToCart = (product: Product, quantity: number = 1, selectedWarranty?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedWarranty }];
    });
    showToast(`Added ${product.name.slice(0, 30)}... to Cart`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast(`Item removed from cart`, 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const found = VALID_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (found) {
      setAppliedCoupon(found);
      showToast(`Coupon "${found.code}" applied! (${found.discountPercentage}% OFF)`, 'success');
      return true;
    }
    showToast(`Invalid or expired coupon code`, 'error');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast(`Coupon removed`, 'info');
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`, 'info');
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast(`Saved to Wishlist`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed from Compare`, 'info');
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          showToast(`You can compare up to 4 products at once`, 'error');
          return prev;
        }
        showToast(`Added to Compare List`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInCompare = (productId: string) => {
    return compareList.some(p => p.id === productId);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  const addServiceBooking = (bookingData: Omit<ServiceBooking, 'id' | 'createdAt' | 'status'>): ServiceBooking => {
    const newId = `SBOOK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: ServiceBooking = {
      ...bookingData,
      id: newId,
      status: 'Submitted',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setServiceBookings(prev => [newBooking, ...prev]);

    // Also auto-create a tracking record for the service booking
    const newRepair: RepairOrder = {
      id: newId,
      customerName: bookingData.customerName,
      customerPhone: bookingData.phone,
      device: bookingData.deviceModel || bookingData.serviceType,
      serialNumber: 'SN-PENDING',
      issue: bookingData.problemDescription,
      estimatedCost: 6225,
      currentStepIndex: 0,
      assignedTechnician: 'Assigned upon arrival',
      lastUpdated: 'Just now',
      timeline: [
        { step: 'Received', timestamp: 'Just now', note: 'Booking request registered in portal.', completed: true },
        { step: 'Diagnosis', completed: false },
        { step: 'Waiting Approval', completed: false },
        { step: 'Repair Started', completed: false },
        { step: 'Testing', completed: false },
        { step: 'Ready for Pickup', completed: false },
        { step: 'Delivered', completed: false }
      ]
    };

    setRepairOrders(prev => ({ ...prev, [newId]: newRepair }));
    showToast(`Booking Created! Repair ID: ${newId}`, 'success');
    return newBooking;
  };

  const updateRepairOrder = (updatedOrder: RepairOrder) => {
    setRepairOrders(prev => ({ ...prev, [updatedOrder.id]: updatedOrder }));
    showToast(`Repair status updated for ${updatedOrder.id}`, 'success');
  };

  const selectPCComponent = (type: string, component: PCComponent | null) => {
    setSelectedPCComponents(prev => ({ ...prev, [type]: component }));
  };

  const clearPCBuild = () => {
    setSelectedPCComponents({
      cpu: null,
      motherboard: null,
      ram: null,
      gpu: null,
      psu: null,
      cabinet: null,
      ssd: null,
      cooling: null,
      monitor: null,
      keyboard: null,
      mouse: null
    });
    showToast(`Custom build cleared`, 'info');
  };

  const addTradeInQuote = (quoteData: Omit<TradeInQuote, 'id' | 'createdAt' | 'voucherCode'>): TradeInQuote => {
    const voucherCode = `TRADE-${Math.floor(1000 + Math.random() * 9000)}-${quoteData.brand.toUpperCase().slice(0, 3)}`;
    const newQuote: TradeInQuote = {
      ...quoteData,
      id: `TRD-${Date.now().toString().slice(-6)}`,
      voucherCode,
      createdAt: new Date().toLocaleDateString()
    };
    setTradeInQuotes(prev => [newQuote, ...prev]);
    showToast(`Trade-in quote generated! Code: ${voucherCode}`, 'success');
    return newQuote;
  };

  const addOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${newOrder.id} placed successfully!`, 'success');
  };

  const addPartner = (partner: Partner) => {
    setPartners(prev => [...prev, partner]);
    showToast(`Partner added successfully`, 'success');
  };

  const removePartner = (name: string) => {
    setPartners(prev => prev.filter(p => p.name !== name));
    showToast(`Partner removed successfully`, 'info');
  };

  const addHeroSlide = (slide: HeroSlide) => {
    setHeroSlides(prev => [...prev, slide]);
    showToast(`Slide added successfully`, 'success');
  };

  const removeHeroSlide = (id: string) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));
    showToast(`Slide removed successfully`, 'info');
  };

  const updateHeroSlide = (id: string, updatedSlide: HeroSlide) => {
    setHeroSlides(prev => prev.map(s => s.id === id ? updatedSlide : s));
    showToast(`Slide updated successfully`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isAdminMode,
        toggleAdminMode,
        products,
        filter,
        setFilter,
        resetFilters,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        recentlyViewed,
        addRecentlyViewed,
        serviceBookings,
        addServiceBooking,
        repairOrders,
        updateRepairOrder,
        selectedPCComponents,
        selectPCComponent,
        clearPCBuild,
        tradeInQuotes,
        addTradeInQuote,
        user,
        login,
        signup,
        logout,
        orders,
        addOrder,
        toasts,
        showToast,
        removeToast,
        isAiAdvisorOpen,
        setIsAiAdvisorOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCompareModalOpen,
        setIsCompareModalOpen,
        partners,
        addPartner,
        removePartner,
        heroSlides,
        addHeroSlide,
        removeHeroSlide,
        updateHeroSlide
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
