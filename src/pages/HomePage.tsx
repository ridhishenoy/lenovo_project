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
  CheckCircle2,
  PhoneCall,
  Award,
  Clock,
  Quote
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products, setFilter, setIsAiAdvisorOpen } = useApp();

  const heroSlides = [
    {
      title: 'Crafted Workstations & Artisan Laptops',
      subtitle: 'Experience extraordinary computing power housed in natural precision engineering. Certified Dell, Apple, Lenovo, and custom rigs.',
      discount: 'Curated Heritage Collection • Complimentary White-Glove Setup',
      ctaText: 'Explore Atelier Collection',
      link: '/products?category=Laptops',
      image: '/images/products/gaming-g15.png'
    },
    {
      title: 'Lenovo ThinkCentre & Dell Inspiron Series',
      subtitle: 'Seamless design, powerful performance, and industrial engineering for discerning professionals.',
      discount: 'Official Onsite Warranty Included',
      ctaText: 'View Executive PCs',
      link: '/products?category=Laptops',
      image: '/images/products/thinkcentre-neo.png'
    },
    // {
    //   title: 'Custom PC Studio & Precision Tuning',
    //   subtitle: 'Hand-assembled custom liquid-cooled workstations with real-time socket & TDP thermal load validation.',
    //   discount: 'Free Liquid Thermal Compound Upgrade',
    //   ctaText: 'Enter PC Studio',
    //   link: '/pc-builder',
    //   image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80'
    // }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const categoriesList = [
    { name: 'Laptops', icon: Laptop, count: '120+ Models' },
    { name: 'Desktops', icon: Cpu, count: '85+ Rigs' },
    { name: 'Printers', icon: Printer, count: '45+ Printers' },
    { name: 'Components', icon: Zap, count: '300+ Parts' },
    { name: 'Monitors', icon: Monitor, count: '60+ Displays' },
    { name: 'Storage', icon: HardDrive, count: '90+ SSDs' }
  ];

  const customerReviews = [
    {
      id: 'rev-1',
      name: 'Eleanor Vance',
      role: 'Architect & 3D Designer',
      comment: 'Shenoy Computers crafted a custom RTX workstation for my architecture firm. The attention to acoustics and thermal flow feels like a fine piece of Scandinavian furniture.',
      rating: 5,
      verified: true,
      product: 'Lenovo ThinkCentre Neo50T'
    },
    {
      id: 'rev-2',
      name: 'Dr. Marcus Sterling',
      role: 'Data Scientist',
      comment: 'The micro-soldering team recovered lost research data from my damaged motherboard in under 24 hours. White-glove service from start to finish.',
      rating: 5,
      verified: true,
      product: 'Cleanroom Recovery Service'
    },
    {
      id: 'rev-3',
      name: 'Sophia Thorne',
      role: 'Creative Director',
      comment: 'Purchasing my Dell laptop felt like visiting a luxury design showroom. Transparent pricing, expert guidance, and serene store environment.',
      rating: 5,
      verified: true,
      product: 'Dell Inspiron 15 DC 15260'
    }
  ];

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const latestProducts = products.filter(p => p.latestArrival || p.discount > 5).slice(0, 4);

  const handleCategoryClick = (catName: string) => {
    setFilter(prev => ({ ...prev, categories: [catName as any] }));
    navigate('/products');
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F7F3ED] to-[#E7DDCF] dark:from-[#181512] dark:to-[#2B2520] min-h-[560px] flex items-center border-b border-[#D8CFC2] dark:border-[#4A433D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFDF8]/80 dark:bg-[#221D19]/80 border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-xs font-semibold text-[#3F5B43] dark:text-[#8FAE83] shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#C56A43] dark:bg-[#C97A4D]"></span>
              <span>{heroSlides[currentSlide].discount}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] leading-[1.15] tracking-tight">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-sm sm:text-base text-[#6F665F] dark:text-[#C5BFB8] max-w-xl leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to={heroSlides[currentSlide].link}
                className="px-7 py-3.5 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs sm:text-sm rounded-full shadow-md hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>{heroSlides[currentSlide].ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsAiAdvisorOpen(true)}
                className="px-7 py-3.5 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520] text-[#2D241E] dark:text-[#F5F2ED] font-semibold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-[#C56A43] dark:text-[#C97A4D]" />
                <span>AI Hardware Advisor</span>
              </button>
            </div>
          </motion.div>

          {/* Hero Right Image Frame */}
          <motion.div
            key={`img-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <div className="w-full max-w-lg h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#D8CFC2] dark:border-[#4A433D] shadow-2xl p-3 bg-[#FFFDF8]/70 dark:bg-[#221D19]/70 backdrop-blur-md">
              <img
                src={heroSlides[currentSlide].image}
                alt="Banner Hero"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx 
                  ? 'w-8 bg-[#3F5B43] dark:bg-[#8FAE83]' 
                  : 'w-2 bg-[#D8CFC2] dark:bg-[#4A433D]'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Brands Showcase Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] shadow-sm">
          <div className="text-center text-xs font-serif font-bold uppercase tracking-widest text-[#6F665F] dark:text-[#C5BFB8] mb-6">
            Authorized Showroom Partner & Certified Atelier
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-80">
            {BRAND_LOGOS.map((b) => (
              <span key={b.name} className="text-xl font-serif font-bold tracking-widest text-[#2D241E] dark:text-[#F5F2ED] hover:text-[#3F5B43] dark:hover:text-[#8FAE83] transition-colors cursor-pointer">
                {b.logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">
              Organic Selection
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] mt-1">
              Explore Hardware Categories
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-semibold text-[#3F5B43] dark:text-[#8FAE83] hover:underline flex items-center gap-1"
          >
            Browse Full Atelier <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesList.map((cat) => {
            const IconComp = cat.icon;
            return (
              <motion.div
                key={cat.name}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => handleCategoryClick(cat.name)}
                className="p-6 rounded-3xl bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] shadow-sm hover:shadow-md cursor-pointer text-center space-y-3 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EEE6DA] dark:bg-[#2B2520] text-[#3F5B43] dark:text-[#8FAE83] flex items-center justify-center mx-auto group-hover:bg-[#3F5B43] group-hover:text-white dark:group-hover:bg-[#8FAE83] dark:group-hover:text-[#181512] transition-colors">
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">{cat.name}</h3>
                  <p className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8]">{cat.count}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">
              Handcrafted Hardware
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] mt-1">
              Featured Flagship Devices
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-semibold text-[#3F5B43] dark:text-[#8FAE83] hover:underline flex items-center gap-1"
          >
            View All Products <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Custom PC Studio Banner CTA */}
      {/* 
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#3F5B43] to-[#708A58] p-8 sm:p-14 shadow-xl text-white grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#FFFDF8]/20 backdrop-blur-md text-white rounded-full inline-block">
              Architectural Hardware Builder
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">
              Design Your Custom Workstation
            </h2>
            <p className="text-xs sm:text-sm text-[#F5F2ED]/90 leading-relaxed max-w-xl">
              Configure CPU, GPU, DDR5 memory, silent liquid cooling, and certified power supplies. Our real-time TDP thermal engine calculates exact wattage, socket compatibility, and acoustic profiles.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/pc-builder"
                className="px-7 py-3.5 bg-[#FFFDF8] text-[#2D241E] hover:bg-[#EEE6DA] font-semibold text-xs sm:text-sm rounded-full shadow-md transition-all flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-[#3F5B43]" /> Launch PC Studio
              </Link>
              <Link
                to="/trade-in"
                className="px-7 py-3.5 bg-transparent border border-white/40 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm rounded-full transition-all"
              >
                Instant Trade-In Calculator
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md h-72 rounded-2xl overflow-hidden border border-white/20 shadow-2xl p-2 bg-white/10 backdrop-blur-md">
              <img
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
                alt="Custom PC Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Services Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">
            Certified Technical Atelier
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
            Precision Hardware Services & Repairs
          </h2>
          <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">
            Master hardware artisans equipped with optical micro-soldering stations and Class 100 cleanroom data recovery facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_LIST.slice(0, 3).map((srv) => (
            <div
              key={srv.id}
              className="p-8 rounded-3xl bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#3F5B43]/15 dark:bg-[#8FAE83]/15 text-[#3F5B43] dark:text-[#8FAE83] flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] leading-relaxed mb-4">
                  {srv.description}
                </p>
                <ul className="space-y-2 text-xs text-[#2D241E] dark:text-[#F5F2ED]">
                  {srv.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5E8C61] dark:text-[#76A46E] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#D8CFC2]/60 dark:border-[#4A433D]/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6F665F] dark:text-[#C5BFB8]">Starting At</span>
                  <div className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">{formatCurrency(srv.startingPrice)}</div>
                </div>
                <Link
                  to="/booking"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] dark:text-[#181512] rounded-full shadow-sm"
                >
                  Book Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">
            Client Testimonials
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
            Endorsed by Professionals & Creators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] shadow-sm flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#C56A43]/20 dark:text-[#C97A4D]/20 absolute top-6 right-6" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#C79A3B] dark:text-[#D4AF5A]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C79A3B] dark:fill-[#D4AF5A]" />
                  ))}
                </div>

                <p className="text-xs text-[#2D241E] dark:text-[#F5F2ED] italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#D8CFC2]/60 dark:border-[#4A433D]/60 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">{rev.name}</h4>
                  <p className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8]">{rev.role}</p>
                </div>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-white bg-[#4F7A57] rounded-full">
                    Verified Client
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">
              New Arrivals
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] mt-1">
              Latest Hardware Release
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-semibold text-[#3F5B43] dark:text-[#8FAE83] hover:underline flex items-center gap-1"
          >
            Explore Catalog <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-[#EEE6DA]/40 dark:bg-[#2B2520] border border-[#D8CFC2] dark:border-[#4A433D]">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">
              Pillars of Excellence
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
              Why Choose Shenoy Computers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <div className="w-10 h-10 rounded-2xl bg-[#3F5B43] text-white flex items-center justify-center mx-auto sm:mx-0">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Master Technicians</h3>
              <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] leading-relaxed">
                Certified hardware engineers with decades of combined experience in micro-electronics repair.
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-10 h-10 rounded-2xl bg-[#708A58] text-white flex items-center justify-center mx-auto sm:mx-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Genuine OEM Parts</h3>
              <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] leading-relaxed">
                100% original manufacturer components sourced directly from official brand partners.
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-10 h-10 rounded-2xl bg-[#C56A43] text-white flex items-center justify-center mx-auto sm:mx-0">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Express Turnaround</h3>
              <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] leading-relaxed">
                24-hour diagnostic turnaround with live repair tracking at every stage.
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-10 h-10 rounded-2xl bg-[#C79A3B] text-white flex items-center justify-center mx-auto sm:mx-0">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">White-Glove Support</h3>
              <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] leading-relaxed">
                Dedicated concierge service with on-site deployment and setup assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
