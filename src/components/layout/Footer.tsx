import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
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
      showToast('Subscribed! Your $50 welcome voucher code is: WELCOME50', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
              <p className="text-xs text-slate-400">On all orders over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Official Brand Warranty</h4>
              <p className="text-xs text-slate-400">100% Genuine Dell, Apple, ASUS</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Certified Technicians</h4>
              <p className="text-xs text-slate-400">24-Hour Express Repair Service</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Tech Support</h4>
              <p className="text-xs text-slate-400">AI Advisor & Expert Helpdesk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-lenovo-red text-white font-black text-xs tracking-widest px-2.5 py-1.5 shadow-md">
                <span>LENOVO</span>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                NEXUS<span className="text-lenovo-red">TECH</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              NexusTech is your premier authorized hardware retailer and certified service center for Lenovo Legion, ThinkPad, Yoga, high-performance desktops, printers, and precision micro-soldering repairs.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Subscribe for $50 Discount Voucher
              </h5>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lenovo-red"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-lenovo-red hover:bg-lenovo-red-hover text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Code <span className="font-bold underline">WELCOME50</span> unlocked!
                </div>
              )}
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Store Catalog</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=Laptops" className="hover:text-cyan-400 transition-colors">Gaming Laptops</Link></li>
              <li><Link to="/products?category=Laptops" className="hover:text-cyan-400 transition-colors">Ultrabooks & MacBooks</Link></li>
              <li><Link to="/products?category=Desktops" className="hover:text-cyan-400 transition-colors">Pre-built Desktops</Link></li>
              <li><Link to="/products?category=Printers" className="hover:text-cyan-400 transition-colors">Laser & InkTank Printers</Link></li>
              <li><Link to="/products?category=Components" className="hover:text-cyan-400 transition-colors">RTX GPUs & Processors</Link></li>
              <li><Link to="/products?category=Monitors" className="hover:text-cyan-400 transition-colors">Curved OLED Monitors</Link></li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Services & Tools</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Laptop & Desktop Repair</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Printer Maintenance</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Class 100 Data Recovery</Link></li>
              <li><Link to="/pc-builder" className="hover:text-cyan-400 font-bold text-amber-400 transition-colors">Custom PC Rig Builder</Link></li>
              <li><Link to="/trade-in" className="hover:text-cyan-400 transition-colors">Instant Trade-In Calculator</Link></li>
              <li><Link to="/track" className="hover:text-cyan-400 transition-colors">Live Repair Tracker</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Store */}
          <div className="space-y-3 text-xs">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Flagship Store</h5>
            <div className="flex items-start gap-2 text-slate-400">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>450 Tech Avenue, Silicon Quarter, NY 10001</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>+1 (800) 555-NEXUS</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>support@nexustech.com</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Mon - Sat: 9am - 9pm EST</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} NexusTech Computers & Service Hub. All Rights Reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link to="/about" className="hover:text-slate-300">About Us</Link>
          <Link to="/faq" className="hover:text-slate-300">FAQs</Link>
          <Link to="/contact" className="hover:text-slate-300">Contact</Link>
          <span className="text-slate-700">|</span>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};
