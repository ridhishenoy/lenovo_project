import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      showToast('Subscribed! Your ₹4,150 welcome voucher code is: WELCOME50', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#2D241E] dark:bg-[#181512] text-[#C5BFB8] pt-16 pb-12 border-t border-[#4A433D]/60 transition-colors duration-300">
      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#4A433D]/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#221D19] dark:bg-[#221D19] border border-[#4A433D]">
            <div className="w-12 h-12 rounded-2xl bg-[#3F5B43]/20 dark:bg-[#8FAE83]/20 text-[#8FAE83] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F5F2ED]">White-Glove Shipping</h4>
              <p className="text-xs text-[#C5BFB8]">Free on all orders over ₹12,450</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#221D19] dark:bg-[#221D19] border border-[#4A433D]">
            <div className="w-12 h-12 rounded-2xl bg-[#708A58]/20 text-[#8FAE83] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F5F2ED]">Genuine Warranty</h4>
              <p className="text-xs text-[#C5BFB8]">100% Certified Dell, Apple, ASUS</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#221D19] dark:bg-[#221D19] border border-[#4A433D]">
            <div className="w-12 h-12 rounded-2xl bg-[#C79A3B]/20 text-[#D4AF5A] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F5F2ED]">Master Artisans</h4>
              <p className="text-xs text-[#C5BFB8]">24-Hour Express Diagnostics</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#221D19] dark:bg-[#221D19] border border-[#4A433D]">
            <div className="w-12 h-12 rounded-2xl bg-[#C56A43]/20 text-[#C97A4D] flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F5F2ED]">Dedicated Concierge</h4>
              <p className="text-xs text-[#C5BFB8]">24/7 Expert Hardware Assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] flex items-center justify-center font-serif text-xl font-bold">
                S
              </div>
              <div>
                <span className="text-xl font-serif font-bold tracking-tight text-[#F5F2ED] flex items-center gap-1.5">
                  SHENOY <span className="text-[#C97A4D] font-sans font-light text-lg">COMPUTERS</span>
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#C5BFB8] leading-relaxed pr-4">
              Shenoy Computers is your premier authorized hardware retailer and certified service atelier for high-performance laptops, custom desktop workstations, precision printers, and micro-soldering hardware repairs.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-[#F5F2ED] mb-3">
                Subscribe for ₹4,150 Luxury Welcome Voucher
              </h5>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-2.5 text-xs bg-[#221D19] border border-[#4A433D] rounded-full text-[#F5F2ED] placeholder-[#C5BFB8]/60 focus:outline-none focus:ring-2 focus:ring-[#8FAE83]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C56A43] hover:bg-[#AA5A39] text-white font-semibold text-xs rounded-full shadow-sm transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#76A46E] mt-2 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Code <span className="font-bold underline text-[#D4AF5A]">WELCOME50</span> unlocked!
                </div>
              )}
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h5 className="text-xs font-serif font-bold tracking-wide uppercase text-[#F5F2ED]">Showroom Catalog</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=Laptops" className="hover:text-[#8FAE83] transition-colors">Luxury Laptops</Link></li>
              <li><Link to="/products?category=Laptops" className="hover:text-[#8FAE83] transition-colors">Ultrabooks & Workstations</Link></li>
              <li><Link to="/products?category=Desktops" className="hover:text-[#8FAE83] transition-colors">Pre-built Desktops</Link></li>
              <li><Link to="/products?category=Printers" className="hover:text-[#8FAE83] transition-colors">Laser & InkTank Printers</Link></li>
              <li><Link to="/products?category=Components" className="hover:text-[#8FAE83] transition-colors">GPUs & Processors</Link></li>
              <li><Link to="/products?category=Monitors" className="hover:text-[#8FAE83] transition-colors">Curved OLED Displays</Link></li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3">
            <h5 className="text-xs font-serif font-bold tracking-wide uppercase text-[#F5F2ED]">Services & Tools</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/services" className="hover:text-[#8FAE83] transition-colors">Precision Hardware Repair</Link></li>
              <li><Link to="/services" className="hover:text-[#8FAE83] transition-colors">Printer Maintenance</Link></li>
              <li><Link to="/services" className="hover:text-[#8FAE83] transition-colors">Cleanroom Data Recovery</Link></li>
              <li><Link to="/pc-builder" className="text-[#D4AF5A] font-semibold hover:underline transition-colors">Custom PC Studio</Link></li>
              <li><Link to="/trade-in" className="hover:text-[#8FAE83] transition-colors">Instant Trade-In Valuation</Link></li>
              <li><Link to="/track" className="hover:text-[#8FAE83] transition-colors">Live Repair Tracking</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Store */}
          <div className="space-y-3 text-xs">
            <h5 className="text-xs font-serif font-bold tracking-wide uppercase text-[#F5F2ED]">Flagship Atelier</h5>
            <div className="flex items-start gap-2.5 text-[#C5BFB8]">
              <MapPin className="w-4 h-4 text-[#8FAE83] shrink-0 mt-0.5" />
              <span>450 Grand Avenue, Silicon Quarter, NY 10001</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#C5BFB8]">
              <Phone className="w-4 h-4 text-[#8FAE83] shrink-0" />
              <span>+1 (800) 555-SHENOY</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#C5BFB8]">
              <Mail className="w-4 h-4 text-[#8FAE83] shrink-0" />
              <span>concierge@shenoycomputers.com</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#C5BFB8]">
              <Clock className="w-4 h-4 text-[#8FAE83] shrink-0" />
              <span>Mon - Sat: 9:00 AM - 9:00 PM EST</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#4A433D]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C5BFB8]/70">
        <div>
          © {new Date().getFullYear()} Shenoy Computers Luxury Retail & Service Atelier. All Rights Reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link to="/about" className="hover:text-[#F5F2ED]">About Us</Link>
          <Link to="/faq" className="hover:text-[#F5F2ED]">FAQs</Link>
          <Link to="/contact" className="hover:text-[#F5F2ED]">Contact</Link>
          <span className="text-[#4A433D]">|</span>
          <span className="hover:text-[#F5F2ED]">Privacy Policy</span>
          <span className="hover:text-[#F5F2ED]">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};
