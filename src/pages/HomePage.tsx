import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { formatCurrency } from '../lib/utils';
import { SERVICES_LIST, BRAND_LOGOS } from '../data/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Cpu, 
  Laptop, 
  Printer, 
  HardDrive, 
  Monitor, 
  Wrench, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Truck, 
  Star, 
  ChevronRight, 
  Bot,
  SlidersHorizontal,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products, setFilter, setIsAiAdvisorOpen } = useApp();

  const heroSlides = [
    {
      title: 'Lenovo Legion Pro 7i & Legion Slim Series',
      subtitle: 'Unleash extreme RTX 4090 performance & Coldfront 5.0 cooling for competitive eSports gamers & creators.',
      discount: 'Official Lenovo Sale • Save Up To ₹37,350',
      ctaText: 'Explore Legion Laptops',
      link: '/products?category=Laptops',
      bgGradient: 'from-slate-950 via-slate-900 to-slate-950',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'ThinkPad X1 Carbon & Yoga Pro 9i',
      subtitle: 'Intel Core Ultra AI NPUs, 3.2K PureSight OLED displays, and legendary ThinkPad carbon-fiber durability.',
      discount: 'Lenovo Pro Member Perks Included',
      ctaText: 'Explore Business & Yoga',
      link: '/products?category=Laptops',
      bgGradient: 'from-neutral-900 via-neutral-950 to-black',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Build Your Custom Legion Monster Rig',
      subtitle: 'Real-time TDP wattage checking & component socket verification. Certified Lenovo hardware engineers.',
      discount: 'Free Liquid Cooling Upgrade',
      ctaText: 'Start Custom PC Builder',
      link: '/pc-builder',
      bgGradient: 'from-slate-950 via-slate-900 to-slate-950',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const categoriesList = [
    { name: 'Laptops', icon: Laptop, count: '120+ Models', color: 'text-blue-500' },
    { name: 'Desktops', icon: Cpu, count: '85+ Rigs', color: 'text-purple-500' },
    { name: 'Printers', icon: Printer, count: '45+ Printers', color: 'text-emerald-500' },
    { name: 'Components', icon: Zap, count: '300+ Parts', color: 'text-amber-500' },
    { name: 'Monitors', icon: Monitor, count: '60+ Displays', color: 'text-cyan-500' },
    { name: 'Storage', icon: HardDrive, count: '90+ SSDs', color: 'text-rose-500' }
  ];

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const bestSellers = products.filter(p => p.bestSeller).slice(0, 4);
  const latestArrivals = products.filter(p => p.latestArrival || p.discount > 10).slice(0, 4);

  const handleCategoryClick = (catName: string) => {
    setFilter(prev => ({ ...prev, categories: [catName as any] }));
    navigate('/products');
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[500px] flex items-center border-b border-slate-800">
        <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].bgGradient} opacity-90 transition-all duration-700`} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lenovo-red/20 border border-lenovo-red/40 text-white text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-lenovo-red"></span>
              <span>{heroSlides[currentSlide].discount}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to={heroSlides[currentSlide].link}
                className="px-6 py-3.5 bg-lenovo-red hover:bg-lenovo-red-hover text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2"
              >
                <span>{heroSlides[currentSlide].ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsAiAdvisorOpen(true)}
                className="px-6 py-3.5 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs sm:text-sm rounded-lg transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-lenovo-red" />
                <span>Ask AI Advisor</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            key={`img-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <div className="w-full max-w-lg h-72 sm:h-96 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl p-2 bg-neutral-900/80 backdrop-blur-md">
              <img
                src={heroSlides[currentSlide].image}
                alt="Banner Hero"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 transition-all ${
                currentSlide === idx ? 'w-8 bg-lenovo-red' : 'w-2 bg-neutral-700'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              Browse Store
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Explore Hardware Categories
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            All Products <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesList.map((cat) => {
            const IconComp = cat.icon;
            return (
              <motion.div
                key={cat.name}
                whileHover={{ y: -4 }}
                onClick={() => handleCategoryClick(cat.name)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md cursor-pointer text-center space-y-3 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform ${cat.color}`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{cat.name}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{cat.count}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              Handpicked Specs
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Featured Flagship Devices
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Custom PC Builder Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 p-8 sm:p-12 border border-slate-800 shadow-2xl text-white grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 rounded-full">
              Interactive Hardware Tool
            </span>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Build Your Ultimate Custom Gaming PC
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Select CPU, GPU, DDR5 RAM, Liquid Cooling, and PSU. Our automated compatibility engine detects socket mismatches, RAM generation errors, and calculates exact TDP wattage requirements!
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/pc-builder"
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2"
              >
                <Cpu className="w-4 h-4" /> Start Custom PC Builder
              </Link>
              <Link
                to="/trade-in"
                className="px-6 py-3.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl transition-all"
              >
                Trade-In Old Laptop
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
              alt="Custom PC Rig"
              referrerPolicy="no-referrer"
              className="w-full max-w-md h-64 object-cover rounded-2xl border border-slate-800 shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            Certified Service Center
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Computer & Device Repair Services
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Certified hardware engineers with micro-soldering station and Class 100 cleanroom data recovery facility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_LIST.slice(0, 3).map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {srv.description}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {srv.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Starts At</span>
                  <div className="text-lg font-black text-slate-900 dark:text-white">{formatCurrency(srv.startingPrice)}</div>
                </div>
                <Link
                  to="/booking"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  Book Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
          Authorized Retailer & Service Partner
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-75 grayscale hover:grayscale-0 transition-all">
          {BRAND_LOGOS.map((b) => (
            <span key={b.name} className="text-lg font-black tracking-widest text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors">
              {b.logo}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
};
