export type ProductCategory = 
  | 'Laptops' 
  | 'Desktops' 
  | 'Printers' 
  | 'Components' 
  | 'Accessories' 
  | 'Monitors' 
  | 'Storage' 
  | 'Networking';

export type ProductBrand = 
  | 'Dell' 
  | 'Lenovo' 
  | 'Apple' 
  | 'ASUS' 
  | 'HP' 
  | 'MSI' 
  | 'Acer' 
  | 'Epson' 
  | 'Corsair' 
  | 'NVIDIA' 
  | 'AMD' 
  | 'Intel' 
  | 'Logitech'
  | 'Samsung'
  | 'Razer';

export interface ProductSpecs {
  processor?: string;
  ram?: string;
  storage?: string;
  gpu?: string;
  display?: string;
  os?: string;
  warranty?: string;
  printerType?: string;
  connectivity?: string;
  color?: string;
  weight?: string;
  screenSize?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  brand: ProductBrand;
  category: ProductCategory;
  price: number;
  discount: number; // percentage, e.g. 15 for 15% off
  rating: number;
  reviewsCount: number;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Pre-Order';
  images: string[];
  badge?: string;
  shortDesc: string;
  fullDesc: string;
  specs: ProductSpecs;
  technicalDetails: Record<string, string>;
  warranty: string;
  featured?: boolean;
  bestSeller?: boolean;
  latestArrival?: boolean;
}

export interface ProductFilter {
  search: string;
  brands: ProductBrand[];
  categories: ProductCategory[];
  minPrice: number;
  maxPrice: number;
  processors: string[];
  ramSizes: string[];
  storageTypes: string[];
  gpus: string[];
  screenSizes: string[];
  printerTypes: string[];
  availability: string[];
  minRating: number;
  sortBy: 'price-low' | 'price-high' | 'popularity' | 'rating' | 'newest' | 'discount';
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  iconName: string;
  description: string;
  detailedDesc: string;
  startingPrice: number;
  estimatedTime: string;
  features: string[];
}

export interface ServiceBooking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  deviceModel: string;
  problemDescription: string;
  uploadedImages: string[];
  preferredDate: string;
  preferredTime: string;
  serviceLocation: 'Home Visit' | 'Store Visit';
  status: 'Submitted' | 'Confirmed' | 'In Progress' | 'Completed';
  createdAt: string;
}

export interface RepairTimelineStep {
  step: string;
  timestamp?: string;
  note?: string;
  completed: boolean;
}

export interface RepairOrder {
  id: string; // e.g. REP-8921
  customerName: string;
  customerPhone: string;
  device: string;
  serialNumber: string;
  issue: string;
  estimatedCost: number;
  currentStepIndex: number; // 0-6
  timeline: RepairTimelineStep[];
  assignedTechnician: string;
  lastUpdated: string;
}

export type ComponentType = 
  | 'cpu' 
  | 'motherboard' 
  | 'ram' 
  | 'gpu' 
  | 'psu' 
  | 'cabinet' 
  | 'ssd' 
  | 'cooling' 
  | 'monitor' 
  | 'keyboard' 
  | 'mouse';

export interface PCComponent {
  id: string;
  type: ComponentType;
  name: string;
  brand: string;
  price: number;
  image: string;
  specs: {
    socket?: string; // e.g. AM5, LGA1700
    formFactor?: string; // ATX, Micro-ATX
    wattage?: number; // 750
    ramType?: string; // DDR5, DDR4
    speed?: string;
    capacity?: string;
    chipset?: string;
    vram?: string;
    [key: string]: any;
  };
  tdp: number; // Watts required/generated
}

export interface TradeInQuote {
  id: string;
  deviceType: 'Laptop' | 'Desktop' | 'Printer';
  brand: string;
  model: string;
  specs: string;
  condition: 'Flawless' | 'Good' | 'Fair' | 'Has Issues';
  estimatedValue: number;
  voucherCode: string;
  createdAt: string;
}

export interface UserAddress {
  id: string;
  title: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  avatar: string;
  addresses: UserAddress[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWarranty?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minPurchase: number;
  description: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  shippingAddress: string;
  trackingNumber: string;
}
