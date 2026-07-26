import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, MessageSquare, Send, Clock, CheckCircle2 } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to NexusTech support team.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase">
          24/7 Dedicated Support
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Get in Touch With NexusTech
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Have questions about a hardware order, custom PC build, or repair status? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Send Us a Direct Message</h3>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
            <input type="text" required className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input type="email" required className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Subject / Query</label>
            <input type="text" required placeholder="e.g. Custom PC Inquiry" className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Message</label>
            <textarea rows={4} required className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>

        {/* Contact Info Cards */}
        <div className="space-y-4 text-xs">
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl space-y-2">
            <Phone className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-slate-900 dark:text-white">Customer Support Hotline</h4>
            <p className="text-slate-500">+1 (800) 555-NEXUS (Toll Free)</p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl space-y-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-slate-900 dark:text-white">Email Inquiries</h4>
            <p className="text-slate-500">support@nexustechstore.com</p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl space-y-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-slate-900 dark:text-white">Headquarters</h4>
            <p className="text-slate-500">450 Tech Avenue, Silicon Quarter, NY 10001</p>
          </div>
        </div>

      </div>
    </div>
  );
};
