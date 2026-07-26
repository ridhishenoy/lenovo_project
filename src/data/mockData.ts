import { 
  Product, 
  ServiceItem, 
  RepairOrder, 
  PCComponent, 
  Coupon, 
  Review,
  Order
} from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Dell XPS 16 Laptop (Intel Core Ultra 9, 32GB RAM, 1TB SSD, RTX 4070)',
    brand: 'Dell',
    category: 'Laptops',
    price: 2499,
    discount: 10,
    rating: 4.8,
    reviewsCount: 124,
    availability: 'In Stock',
    badge: 'Featured Hero',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Ultra-sleek 16-inch OLED laptop powered by Intel Core Ultra 9 processor and NVIDIA GeForce RTX 4070 graphics.',
    fullDesc: 'Crafted with machined aluminum and Corning Gorilla Glass 3, the Dell XPS 16 offers elite workstation performance in a breathtakingly thin profile. Experience vivid 4K OLED touch display, room-filling quad-speaker sound, and cutting-edge AI features.',
    specs: {
      processor: 'Intel Core Ultra 9 185H',
      ram: '32GB LPDDR5X',
      storage: '1TB M.2 PCIe NVMe SSD',
      gpu: 'NVIDIA GeForce RTX 4070 8GB',
      display: '16.3" 4K+ (3840x2400) OLED Touch',
      os: 'Windows 11 Pro',
      warranty: '2 Years Premium Onsite',
      screenSize: '16 inch',
      weight: '4.8 lbs',
      color: 'Graphite'
    },
    technicalDetails: {
      'Wireless': 'Intel Killer Wi-Fi 7 + Bluetooth 5.4',
      'Battery': '99.5 Whr 6-Cell',
      'Keyboard': 'Backlit Keyboard with Fingerprint Reader',
      'Ports': '3x Thunderbolt 4 (Type-C), 1x MicroSD Slot, 3.5mm Audio'
    },
    warranty: '2 Years Dell Premium Onsite Service with Accidental Damage Protection',
    featured: true,
    bestSeller: true,
    latestArrival: false
  },
  {
    id: 'prod-2',
    name: 'Apple MacBook Pro 16" M3 Max (36GB RAM, 1TB SSD, 30-core GPU)',
    brand: 'Apple',
    category: 'Laptops',
    price: 3499,
    discount: 5,
    rating: 4.9,
    reviewsCount: 210,
    availability: 'In Stock',
    badge: 'Pro Choice',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Mind-blowing performance with Apple Silicon M3 Max chip, Liquid Retina XDR display, and up to 22 hours battery life.',
    fullDesc: 'MacBook Pro blasts forward with the M3 Max chip. Built on 3-nanometer technology and featuring an all-new GPU architecture, it’s the most advanced chip ever built for a personal computer.',
    specs: {
      processor: 'Apple M3 Max (16-core CPU)',
      ram: '36GB Unified Memory',
      storage: '1TB Superfast SSD',
      gpu: '40-core GPU',
      display: '16.2" Liquid Retina XDR (3456 x 2234)',
      os: 'macOS Sequoia',
      warranty: '1 Year AppleCare Limited Warranty',
      screenSize: '16 inch',
      weight: '4.7 lbs',
      color: 'Space Black'
    },
    technicalDetails: {
      'Audio': 'High-fidelity six-speaker sound system with force-cancelling woofers',
      'Ports': '3x Thunderbolt 4, HDMI port, SDXC card slot, MagSafe 3 port',
      'Camera': '1080p FaceTime HD camera'
    },
    warranty: '1 Year AppleCare Official Warranty (Extendable via AppleCare+)',
    featured: true,
    bestSeller: true,
    latestArrival: false
  },
  {
    id: 'prod-3',
    name: 'ASUS ROG Strix G18 Gaming Laptop (i9-14900HX, 32GB RAM, RTX 4080)',
    brand: 'ASUS',
    category: 'Laptops',
    price: 2899,
    discount: 12,
    rating: 4.7,
    reviewsCount: 88,
    availability: 'In Stock',
    badge: 'Best Seller',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Dominate esports with an 18-inch 240Hz ROG Nebula Display, 14th Gen Intel Core i9, and RTX 4080.',
    fullDesc: 'Power through any modern game or heavy rendering workload with ROG Intelligent Cooling, Tri-Fan technology, and liquid metal Conductonaut Extreme thermal compound.',
    specs: {
      processor: 'Intel Core i9-14900HX',
      ram: '32GB DDR5 5600MHz',
      storage: '2TB PCIe 4.0 NVMe SSD',
      gpu: 'NVIDIA GeForce RTX 4080 12GB',
      display: '18" QHD+ 240Hz 3ms ROG Nebula Display',
      os: 'Windows 11 Home',
      warranty: '2 Years Global Warranty',
      screenSize: '18 inch',
      weight: '6.6 lbs',
      color: 'Eclipse Gray'
    },
    technicalDetails: {
      'Cooling': 'ROG Intelligent Cooling with Tri-Fan & Liquid Metal',
      'Lighting': 'Per-Key RGB Keyboard + Underglow Lightbar'
    },
    warranty: '2 Years Asus ROG Global Warranty',
    featured: true,
    bestSeller: true,
    latestArrival: true
  },
  {
    id: 'prod-4',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12 (Core Ultra 7, 32GB RAM, 1TB SSD)',
    brand: 'Lenovo',
    category: 'Laptops',
    price: 1999,
    discount: 15,
    rating: 4.8,
    reviewsCount: 95,
    availability: 'In Stock',
    badge: 'Business Essential',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Ultralight enterprise flagship with carbon-fiber chassis, haptic touchpad, and Military-grade durability.',
    fullDesc: 'Engineered for business leaders. Features an improved Communications Bar with 8MP AI camera, tactile TrackPoint, and Lenovo TrackPoint Quick Menu.',
    specs: {
      processor: 'Intel Core Ultra 7 155H',
      ram: '32GB LPDDR5X',
      storage: '1TB M.2 PCIe Gen4 SSD',
      gpu: 'Intel Arc Graphics',
      display: '14" 2.8K (2880x1800) OLED 120Hz',
      os: 'Windows 11 Pro',
      warranty: '3 Years Onsite Premier Support',
      screenSize: '14 inch',
      weight: '2.42 lbs',
      color: 'Deep Black'
    },
    technicalDetails: {
      'Security': 'Discrete TPM 2.0, Match-on-Chip Fingerprint Reader, AI Privacy Guard'
    },
    warranty: '3 Years Lenovo Premier Support Onsite',
    featured: false,
    bestSeller: true,
    latestArrival: false
  },
  {
    id: 'prod-5',
    name: 'Nexus Beast Extreme Gaming Desktop (i9-14900KS, RTX 4090 24GB, 64GB RAM, 4TB SSD)',
    brand: 'ASUS',
    category: 'Desktops',
    price: 4299,
    discount: 8,
    rating: 5.0,
    reviewsCount: 42,
    availability: 'In Stock',
    badge: 'Monster Rig',
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Ultimate workstation and 4K ultra gaming desktop. Hand-crafted, custom liquid-cooled, and stress-tested.',
    fullDesc: 'Pre-built and stress-tested by NexusTech master technicians. Includes ROG Strix Z790 Motherboard, 360mm AIO Liquid Cooling, 1000W Platinum PSU, and customized cable routing.',
    specs: {
      processor: 'Intel Core i9-14900KS (Up to 6.2 GHz)',
      ram: '64GB DDR5 6400MHz Corsair Vengeance RGB',
      storage: '4TB (2x 2TB NVMe PCIe 4.0 SSD in RAID 0)',
      gpu: 'NVIDIA GeForce RTX 4090 24GB GDDR6X',
      display: 'Supports up to 4x 4K/8K Displays',
      os: 'Windows 11 Pro Pre-installed & Activated',
      warranty: '3 Years Comprehensive Hardware Warranty'
    },
    technicalDetails: {
      'Power Supply': 'Corsair RM1000x Shift 1000W 80+ Gold Fully Modular',
      'Cooling': 'NZXT Kraken Elite 360 RGB LCD AIO Liquid Cooler'
    },
    warranty: '3 Years Parts & Lifetime Tech Support Guarantee',
    featured: true,
    bestSeller: false,
    latestArrival: true
  },
  {
    id: 'prod-6',
    name: 'HP Color LaserJet Pro Wireless All-In-One Printer (MFP 3301fdw)',
    brand: 'HP',
    category: 'Printers',
    price: 449,
    discount: 18,
    rating: 4.6,
    reviewsCount: 156,
    availability: 'In Stock',
    badge: 'Office Favorite',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Fast duplex color printing, scanning, copying, faxing, and high-speed auto-feeder for office productivity.',
    fullDesc: 'Designed for small-to-medium work teams. Print sharp color documents at speeds up to 26 ppm with dual-band Wi-Fi and HP Smart App integration.',
    specs: {
      printerType: 'Color Laser All-In-One',
      connectivity: 'Wi-Fi 6, Ethernet, USB 2.0, HP Smart App',
      warranty: '1 Year Commercial Warranty',
      color: 'White/Slate'
    },
    technicalDetails: {
      'Print Speed': 'Up to 26 ppm black & color',
      'Duplex': 'Automatic Two-Sided Printing',
      'Duty Cycle': 'Up to 40,000 pages per month'
    },
    warranty: '1 Year HP Onsite Replacement Warranty',
    featured: false,
    bestSeller: true,
    latestArrival: false
  },
  {
    id: 'prod-7',
    name: 'Epson EcoTank Pro ET-5850 Supertank All-in-One Printer',
    brand: 'Epson',
    category: 'Printers',
    price: 899,
    discount: 10,
    rating: 4.8,
    reviewsCount: 82,
    availability: 'In Stock',
    badge: 'Lowest Ink Cost',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Cartridge-free EcoTank printer delivering ultra-low-cost black and color prints with PrecisionCore Heat-Free technology.',
    fullDesc: 'Save up to 80% on ink with low-cost replacement ink bottles vs. standard capacity color laser cartridges. Includes 2 years of ink in the box.',
    specs: {
      printerType: 'SuperTank Inkjet All-In-One',
      connectivity: 'Wi-Fi, Ethernet, Direct Connect',
      warranty: '2 Years Epson Warranty'
    },
    technicalDetails: {
      'Paper Capacity': '500-sheet paper capacity (2x 250 trays)',
      'Display': '4.3" Color Touchscreen'
    },
    warranty: '2 Years Epson Limited Warranty with Registration',
    featured: true,
    bestSeller: false,
    latestArrival: false
  },
  {
    id: 'prod-8',
    name: 'Samsung Odyssey OLED G9 49" Curved Dual QHD Gaming Monitor (240Hz, 0.03ms)',
    brand: 'Samsung',
    category: 'Monitors',
    price: 1599,
    discount: 20,
    rating: 4.9,
    reviewsCount: 168,
    availability: 'In Stock',
    badge: 'Super Ultra-Wide',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Revolutionary 49-inch 1800R curved OLED panel with 240Hz refresh rate and lightning 0.03ms GTG response time.',
    fullDesc: 'Immerse yourself in infinite contrast ratio and quantum dot colors. Features Neo Quantum Processor Pro and Gaming Hub for standalone cloud gaming.',
    specs: {
      display: '49" Dual QHD (5120 x 1440) OLED 1800R Curved',
      screenSize: '49 inch',
      connectivity: 'HDMI 2.1, DisplayPort 1.4, USB Hub',
      warranty: '3 Years Burn-in Warranty'
    },
    technicalDetails: {
      'HDR': 'VESA DisplayHDR True Black 400',
      'Sync Technology': 'AMD FreeSync Premium Pro'
    },
    warranty: '3 Years Samsung Manufacturer Warranty including OLED Burn-in Protection',
    featured: true,
    bestSeller: true,
    latestArrival: false
  },
  {
    id: 'prod-9',
    name: 'NVIDIA GeForce RTX 4090 Founder Edition 24GB GDDR6X',
    brand: 'NVIDIA',
    category: 'Components',
    price: 1799,
    discount: 0,
    rating: 4.9,
    reviewsCount: 310,
    availability: 'Low Stock',
    badge: 'Apex GPU',
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'The ultimate GeForce GPU delivering massive leap in performance, DLSS 3 frame generation, and ray tracing.',
    fullDesc: 'Powered by NVIDIA Ada Lovelace architecture. 16,384 CUDA cores, 24GB GDDR6X VRAM, and 4th Gen Tensor Cores for AI acceleration.',
    specs: {
      gpu: 'RTX 4090 24GB',
      warranty: '3 Years Official Warranty'
    },
    technicalDetails: {
      'Boost Clock': '2.52 GHz',
      'Recommended PSU': '850W minimum'
    },
    warranty: '3 Years NVIDIA Limited Warranty',
    featured: true,
    bestSeller: true,
    latestArrival: false
  },
  {
    id: 'prod-10',
    name: 'Corsair Vengeance RGB 64GB (2x32GB) DDR5 6000MHz CL30 RAM',
    brand: 'Corsair',
    category: 'Components',
    price: 229,
    discount: 15,
    rating: 4.8,
    reviewsCount: 77,
    availability: 'In Stock',
    badge: 'High Speed Memory',
    images: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Optimized for Intel XMP 3.0 & AMD EXPO with dynamic ten-zone RGB lighting and tight CL30 timings.',
    fullDesc: 'Unlock unprecedented memory performance for high-end rendering and multi-threaded processing.',
    specs: {
      ram: '64GB (2x32GB) DDR5 6000MHz',
      warranty: 'Lifetime Warranty'
    },
    technicalDetails: {
      'Timing': '30-36-36-76',
      'Voltage': '1.40V'
    },
    warranty: 'Limited Lifetime Corsair Warranty',
    featured: false,
    bestSeller: false,
    latestArrival: true
  },
  {
    id: 'prod-11',
    name: 'Logitech MX Master 3S Performance Wireless Mouse',
    brand: 'Logitech',
    category: 'Accessories',
    price: 99,
    discount: 10,
    rating: 4.9,
    reviewsCount: 450,
    availability: 'In Stock',
    badge: 'Iconic Design',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Quiet clicks, 8K DPI track-on-glass sensor, MagSpeed electromagnetic scrolling wheel.',
    fullDesc: 'An iconic ergonomic master mouse redesigned for ultimate precision, tactile quiet clicks, and cross-computer flow control.',
    specs: {
      connectivity: 'Bluetooth + Logi Bolt USB Receiver',
      warranty: '1 Year Warranty',
      color: 'Pale Grey / Graphite'
    },
    technicalDetails: {
      'Battery Life': 'Up to 70 days on full charge',
      'DPI Range': '200 to 8000 DPI'
    },
    warranty: '1 Year Logitech Hardware Warranty',
    featured: true,
    bestSeller: true,
    latestArrival: false
  },
  {
    id: 'prod-12',
    name: 'Samsung 990 PRO 2TB PCIe 4.0 M.2 NVMe SSD (Up to 7,450 MB/s)',
    brand: 'Samsung',
    category: 'Storage',
    price: 169,
    discount: 22,
    rating: 4.9,
    reviewsCount: 280,
    availability: 'In Stock',
    badge: 'Speed Demon',
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Top-tier M.2 SSD for heavy gaming, 3D editing, and data transfer with smart thermal control.',
    fullDesc: 'Reach sequential read/write speeds up to 7,450/6,900 MB/s. DirectStorage support for instant game load times.',
    specs: {
      storage: '2TB PCIe Gen4 x4 NVMe 2.0',
      warranty: '5 Years Limited Warranty'
    },
    technicalDetails: {
      'Read Speed': '7,450 MB/s',
      'TBW Rating': '1,200 TBW'
    },
    warranty: '5 Years Samsung Limited Warranty',
    featured: false,
    bestSeller: true,
    latestArrival: false
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Laptop Repair & Component Replacement',
    category: 'Laptop',
    iconName: 'Laptop',
    description: 'Expert screen replacement, battery renewal, hinge repair, motherboard micro-soldering, and liquid damage recovery.',
    detailedDesc: 'Our certified engineers diagnose and resolve hardware failures for Dell, Apple MacBooks, Lenovo, ASUS, HP, and Razer laptops. Original OEM components used with up to 1-year warranty.',
    startingPrice: 49,
    estimatedTime: '24 - 48 Hours',
    features: ['Screen & Display Repair', 'Battery & Charging Port Service', 'Keyboard & Touchpad Replacement', 'Thermal Paste Re-pasting & Cleaning']
  },
  {
    id: 'srv-2',
    title: 'Desktop Repair & Diagnostics',
    category: 'Desktop',
    iconName: 'Monitor',
    description: 'No boot, blue screen of death (BSOD), power supply failure, GPU artifacts, and motherboard diagnostics.',
    detailedDesc: 'Complete bench testing and component swap testing to pinpoint performance bottlenecks or hardware failures in custom gaming rigs and workstation PCs.',
    startingPrice: 39,
    estimatedTime: 'Same Day Available',
    features: ['Hardware Failure Testing', 'Power Supply & GPU Diagnostics', 'BIOS Flashing & Recovery', 'Deep Thermal Dust Removal']
  },
  {
    id: 'srv-3',
    title: 'Printer Repair & Maintenance',
    category: 'Printer',
    iconName: 'Printer',
    description: 'Paper jams, printhead unclogging, wireless network setup, toner/ink system servicing for HP, Epson, Canon.',
    detailedDesc: 'Restores crisp print quality and eliminates paper feeder jams. Onsite commercial service available for office multi-function printers.',
    startingPrice: 45,
    estimatedTime: '24 Hours',
    features: ['Printhead Cleaning & Flush', 'Roller & Gear Repair', 'Toner & Drum Replacement', 'Network Scanner Setup']
  },
  {
    id: 'srv-4',
    title: 'Data Recovery & Forensics',
    category: 'Data Recovery',
    iconName: 'HardDrive',
    description: 'Class 100 cleanroom recovery for crashed hard drives, corrupted SSDs, RAID arrays, and formatted memory cards.',
    detailedDesc: 'No Data, No Fee guarantee. We extract valuable family photos, accounting databases, and project files safely without risking further drive damage.',
    startingPrice: 99,
    estimatedTime: '2 - 5 Days',
    features: ['No Data, No Fee Guarantee', 'Cleanroom Mechanical Recovery', 'RAID Array Reconstruction', 'Encrypted Drive Decryption']
  },
  {
    id: 'srv-5',
    title: 'Virus & Ransomware Removal',
    category: 'Security',
    iconName: 'ShieldAlert',
    description: 'Complete removal of malware, spyware, trojans, adware, and deep system rootkits with data preservation.',
    detailedDesc: 'Cleanse your operating system while keeping personal documents intact. Includes installation of premium security protection.',
    startingPrice: 49,
    estimatedTime: 'Same Day',
    features: ['Deep Rootkit & Ransomware Scan', 'Data Safeguard & Isolation', 'Browser Cleanup & Pop-up Removal', 'Commercial Antivirus License Included']
  },
  {
    id: 'srv-6',
    title: 'Windows OS & Software Installation',
    category: 'OS & Software',
    iconName: 'Cpu',
    description: 'Fresh Windows 11 / macOS install, driver optimization, software suite configuration, and license activation.',
    detailedDesc: 'Optimal setup with debloated OS configuration, latest GPU drivers, office software, and automated backup routines.',
    startingPrice: 35,
    estimatedTime: '2 - 4 Hours',
    features: ['Clean Windows 11 / macOS Restore', 'Latest Driver & Firmware Updates', 'Microsoft Office & Adobe Suite Setup', 'Data Migration from Old Drive']
  },
  {
    id: 'srv-7',
    title: 'Hardware Upgrade & Speed Boost',
    category: 'Hardware Upgrade',
    iconName: 'Zap',
    description: 'Upgrade to high-speed NVMe SSD, expand RAM capacity, or upgrade graphics card for maximum gaming FPS.',
    detailedDesc: 'Transform sluggish computers into ultra-fast workstations. Free OS clone from old HDD to high-speed SSD included.',
    startingPrice: 29,
    estimatedTime: '2 Hours',
    features: ['Seamless HDD to SSD Cloning', 'Dual-Channel RAM Speed Upgrades', 'Graphics Card & PSU Upgrades', 'Cooling System Overhaul']
  },
  {
    id: 'srv-8',
    title: 'Annual Maintenance Contract (AMC)',
    category: 'AMC',
    iconName: 'Building',
    description: 'Comprehensive IT support for corporate offices and home setups. Priority support, periodic checkups, and zero labor fee.',
    detailedDesc: 'Keep your business running smoothly with dedicated engineer visits, regular virus prevention, and unlimited remote tech assistance.',
    startingPrice: 299,
    estimatedTime: '1 Year Plan',
    features: ['Quarterly Onsite Checkups', 'Unlimited Remote Helpdesk Support', 'Zero Repair Labor Cost', 'Free Spare Parts Discount']
  }
];

export const MOCK_REPAIR_ORDERS: Record<string, RepairOrder> = {
  'REP-8921': {
    id: 'REP-8921',
    customerName: 'Alex Morgan',
    customerPhone: '+1 (555) 234-5678',
    device: 'Dell XPS 15 (2023)',
    serialNumber: 'DL-XPS-98412-US',
    issue: 'Screen flickering & overheating under load',
    estimatedCost: 185,
    currentStepIndex: 4, // Testing
    assignedTechnician: 'David Miller (Senior Hardware Tech)',
    lastUpdated: '10 minutes ago',
    timeline: [
      { step: 'Received', timestamp: 'Yesterday 09:30 AM', note: 'Device checked in at front desk.', completed: true },
      { step: 'Diagnosis', timestamp: 'Yesterday 02:15 PM', note: 'Thermal paste dried out; display flex cable loose.', completed: true },
      { step: 'Waiting Approval', timestamp: 'Yesterday 03:00 PM', note: 'Customer approved repair quote of $185.', completed: true },
      { step: 'Repair Started', timestamp: 'Today 10:00 AM', note: 'Replaced thermal pads, reapplied liquid metal, adjusted flex connector.', completed: true },
      { step: 'Testing', timestamp: 'Today 01:20 PM', note: 'Running 3DMark stress test and thermal monitoring.', completed: true },
      { step: 'Ready for Pickup', completed: false },
      { step: 'Delivered', completed: false }
    ]
  },
  'REP-3410': {
    id: 'REP-3410',
    customerName: 'Sarah Jenkins',
    customerPhone: '+1 (555) 876-5432',
    device: 'Apple MacBook Air M2',
    serialNumber: 'C02G901XMD6M',
    issue: 'Liquid spill on keyboard, won\'t power on',
    estimatedCost: 320,
    currentStepIndex: 2, // Waiting Approval
    assignedTechnician: 'Marcus Vance (Micro-soldering Lead)',
    lastUpdated: '1 hour ago',
    timeline: [
      { step: 'Received', timestamp: '2 days ago', note: 'Liquid damage protocol initiated.', completed: true },
      { step: 'Diagnosis', timestamp: 'Yesterday', note: 'Ultrasonic board clean completed. Requires 2 power IC chips replaced.', completed: true },
      { step: 'Waiting Approval', timestamp: 'Today 09:00 AM', note: 'Quotation sent via SMS & Email. Awaiting customer response.', completed: false },
      { step: 'Repair Started', completed: false },
      { step: 'Testing', completed: false },
      { step: 'Ready for Pickup', completed: false },
      { step: 'Delivered', completed: false }
    ]
  }
};

export const PC_BUILDER_COMPONENTS: PCComponent[] = [
  // CPUs
  {
    id: 'cpu-1',
    type: 'cpu',
    name: 'Intel Core i7-14700K (20 Cores, up to 5.6 GHz)',
    brand: 'Intel',
    price: 399,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80',
    specs: { socket: 'LGA1700', ramType: 'DDR5/DDR4', speed: '3.4 - 5.6 GHz' },
    tdp: 125
  },
  {
    id: 'cpu-2',
    type: 'cpu',
    name: 'AMD Ryzen 7 7800X3D (8 Cores, 3D V-Cache)',
    brand: 'AMD',
    price: 389,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80',
    specs: { socket: 'AM5', ramType: 'DDR5', speed: '4.2 - 5.0 GHz' },
    tdp: 120
  },
  {
    id: 'cpu-3',
    type: 'cpu',
    name: 'Intel Core i9-14900K (24 Cores, up to 6.0 GHz)',
    brand: 'Intel',
    price: 549,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80',
    specs: { socket: 'LGA1700', ramType: 'DDR5', speed: '3.2 - 6.0 GHz' },
    tdp: 150
  },

  // Motherboards
  {
    id: 'mb-1',
    type: 'motherboard',
    name: 'ASUS ROG Strix Z790-E Gaming WiFi',
    brand: 'ASUS',
    price: 449,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    specs: { socket: 'LGA1700', formFactor: 'ATX', ramType: 'DDR5', chipset: 'Intel Z790' },
    tdp: 30
  },
  {
    id: 'mb-2',
    type: 'motherboard',
    name: 'MSI MAG B650 Tomahawk WiFi AM5',
    brand: 'MSI',
    price: 219,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    specs: { socket: 'AM5', formFactor: 'ATX', ramType: 'DDR5', chipset: 'AMD B650' },
    tdp: 25
  },

  // RAM
  {
    id: 'ram-1',
    type: 'ram',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
    brand: 'Corsair',
    price: 129,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80',
    specs: { ramType: 'DDR5', capacity: '32GB', speed: '6000MHz' },
    tdp: 10
  },
  {
    id: 'ram-2',
    type: 'ram',
    name: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5 6400MHz',
    brand: 'G.Skill',
    price: 239,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80',
    specs: { ramType: 'DDR5', capacity: '64GB', speed: '6400MHz' },
    tdp: 15
  },

  // GPUs
  {
    id: 'gpu-1',
    type: 'gpu',
    name: 'NVIDIA GeForce RTX 4080 Super 16GB',
    brand: 'NVIDIA',
    price: 999,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80',
    specs: { vram: '16GB GDDR6X' },
    tdp: 320
  },
  {
    id: 'gpu-2',
    type: 'gpu',
    name: 'ASUS TUF Gaming RTX 4070 Ti Super 16GB',
    brand: 'ASUS',
    price: 799,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80',
    specs: { vram: '16GB GDDR6X' },
    tdp: 285
  },
  {
    id: 'gpu-3',
    type: 'gpu',
    name: 'NVIDIA GeForce RTX 4090 24GB GDDR6X',
    brand: 'NVIDIA',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80',
    specs: { vram: '24GB GDDR6X' },
    tdp: 450
  },

  // SSD
  {
    id: 'ssd-1',
    type: 'ssd',
    name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe SSD',
    brand: 'Samsung',
    price: 169,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80',
    specs: { capacity: '2TB', speed: '7450 MB/s' },
    tdp: 8
  },

  // Power Supplies (PSU)
  {
    id: 'psu-1',
    type: 'psu',
    name: 'Corsair RM850x 850W 80+ Gold Fully Modular',
    brand: 'Corsair',
    price: 139,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
    specs: { wattage: 850, rating: '80+ Gold' },
    tdp: 0
  },
  {
    id: 'psu-2',
    type: 'psu',
    name: 'Corsair RM1000x Shift 1000W 80+ Gold Modular',
    brand: 'Corsair',
    price: 189,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
    specs: { wattage: 1000, rating: '80+ Gold' },
    tdp: 0
  },

  // Cabinet / Case
  {
    id: 'cab-1',
    type: 'cabinet',
    name: 'NZXT H9 Flow Dual-Chamber Mid-Tower ATX Case',
    brand: 'NZXT',
    price: 159,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
    specs: { formFactor: 'ATX, Micro-ATX' },
    tdp: 0
  },

  // Cooling
  {
    id: 'cool-1',
    type: 'cooling',
    name: 'NZXT Kraken Elite 360 RGB LCD AIO Liquid Cooler',
    brand: 'NZXT',
    price: 279,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
    specs: { type: '360mm AIO' },
    tdp: 15
  },

  // Monitor
  {
    id: 'mon-1',
    type: 'monitor',
    name: 'ASUS ROG Swift 27" 1440P 240Hz OLED Gaming Monitor',
    brand: 'ASUS',
    price: 749,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80',
    specs: { screenSize: '27 inch', refreshRate: '240Hz' },
    tdp: 0
  },

  // Keyboard
  {
    id: 'kb-1',
    type: 'keyboard',
    name: 'Logitech G915 LIGHTSPEED Wireless RGB Mechanical Keyboard',
    brand: 'Logitech',
    price: 199,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80',
    specs: { switchType: 'GL Tactile Low Profile' },
    tdp: 0
  },

  // Mouse
  {
    id: 'ms-1',
    type: 'mouse',
    name: 'Logitech G Pro X Superlight 2 Wireless Gaming Mouse',
    brand: 'Logitech',
    price: 149,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80',
    specs: { weight: '60g', sensor: 'HERO 2 32K' },
    tdp: 0
  }
];

export const VALID_COUPONS: Coupon[] = [
  { code: 'NEXUS10', discountPercentage: 10, minPurchase: 100, description: '10% OFF on orders over $100' },
  { code: 'BUILDGamer20', discountPercentage: 15, minPurchase: 500, description: '15% OFF on Custom PCs & Components' },
  { code: 'WELCOME50', discountPercentage: 5, minPurchase: 50, description: '$50 flat value discount voucher' }
];

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userName: 'Jonathan Vance',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'July 14, 2026',
    title: 'Absolute powerhouse for video editing & 3D rendering',
    comment: 'The OLED screen on this Dell XPS 16 is unparalleled. Colors are 100% color-accurate for Premiere Pro and Blender. The thermal dissipation is super quiet even under heavy load.',
    verifiedPurchase: true,
    helpfulCount: 34
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 4.5,
    date: 'July 02, 2026',
    title: 'Great build quality and haptic trackpad',
    comment: 'Build quality rivals Apple MacBooks. The touchpad takes a day to get used to, but once you do, it feels smooth and responsive.',
    verifiedPurchase: true,
    helpfulCount: 18
  }
];

export const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ORD-94812',
    date: 'July 20, 2026',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        price: 2249
      }
    ],
    totalAmount: 2249,
    discountAmount: 250,
    status: 'Shipped',
    paymentMethod: 'Credit Card (Visa ending in 4242)',
    shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
    trackingNumber: '1Z9999999999999999'
  }
];

export const STORE_LOCATIONS = [
  {
    id: 'store-1',
    name: 'NexusTech Flagship Downtown Store',
    address: '450 Tech Avenue, Silicon Quarter, NY 10001',
    phone: '+1 (800) 555-NEXUS',
    hours: 'Mon - Sat: 9:00 AM - 9:00 PM, Sun: 10:00 AM - 6:00 PM',
    mapUrl: 'https://maps.google.com/?q=New+York+Tech+Store',
    lat: 40.7128,
    lng: -74.0060,
    hasServiceDesk: true,
    hasCustomPCBench: true,
    servicesOffered: ['Micro-soldering Lab', 'Express 2-Hour Repair', 'Custom PC Bench', 'Trade-In Appraisal']
  },
  {
    id: 'store-2',
    name: 'NexusTech Westside Experience Center',
    address: '1200 Innovation Parkway, Suite 100, San Jose, CA 95110',
    phone: '+1 (800) 555-9378',
    hours: 'Mon - Sun: 10:00 AM - 8:00 PM',
    mapUrl: 'https://maps.google.com/?q=San+Jose+Tech+Store',
    lat: 37.3382,
    lng: -121.8863,
    hasServiceDesk: true,
    hasCustomPCBench: true,
    servicesOffered: ['Cleanroom Data Recovery', 'Enterprise Server Care', 'Custom PC Bench', 'Trade-In Appraisal']
  }
];

export const BRAND_LOGOS = [
  { name: 'Dell', logo: 'DELL' },
  { name: 'Apple', logo: 'APPLE' },
  { name: 'ASUS', logo: 'ASUS' },
  { name: 'Lenovo', logo: 'LENOVO' },
  { name: 'HP', logo: 'HP' },
  { name: 'NVIDIA', logo: 'NVIDIA' },
  { name: 'Intel', logo: 'INTEL' },
  { name: 'AMD', logo: 'AMD' },
  { name: 'Samsung', logo: 'SAMSUNG' },
  { name: 'Epson', logo: 'EPSON' }
];
