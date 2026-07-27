import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to Shenoy Computers concierge.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-[#3F5B43]/15 dark:bg-[#8FAE83]/15 text-[#3F5B43] dark:text-[#8FAE83] text-xs font-semibold tracking-wider uppercase">
          Dedicated Concierge Assistance
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
          Get in Touch With Shenoy Computers
        </h1>
        <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">
          Have inquiries regarding custom PC builds, corporate orders, or repair status? We are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 sm:p-8 shadow-md space-y-4 text-xs">
          <h3 className="font-serif font-bold text-base text-[#2D241E] dark:text-[#F5F2ED] mb-2">Send Direct Concierge Inquiry</h3>

          <div>
            <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Your Full Name</label>
            <input type="text" required className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]" />
          </div>

          <div>
            <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Email Address</label>
            <input type="email" required className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]" />
          </div>

          <div>
            <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Subject / Query</label>
            <input type="text" required placeholder="e.g. Custom PC Studio Consultation" className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]" />
          </div>

          <div>
            <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Message</label>
            <textarea rows={4} required className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-2xl text-[#2D241E] dark:text-[#F5F2ED]" />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold rounded-full shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Send Concierge Message
          </button>
        </form>

        {/* Contact Info Cards */}
        <div className="space-y-4 text-xs">
          <div className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl space-y-2">
            <Phone className="w-5 h-5 text-[#3F5B43] dark:text-[#8FAE83]" />
            <h4 className="font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Concierge Support Line</h4>
            <p className="text-[#6F665F] dark:text-[#C5BFB8]">+1 (800) 555-SHENOY (Toll Free)</p>
          </div>

          <div className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl space-y-2">
            <Mail className="w-5 h-5 text-[#3F5B43] dark:text-[#8FAE83]" />
            <h4 className="font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Email Inquiries</h4>
            <p className="text-[#6F665F] dark:text-[#C5BFB8]">concierge@shenoycomputers.com</p>
          </div>

          <div className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl space-y-2">
            <MapPin className="w-5 h-5 text-[#3F5B43] dark:text-[#8FAE83]" />
            <h4 className="font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Flagship Atelier</h4>
            <p className="text-[#6F665F] dark:text-[#C5BFB8]">450 Grand Avenue, Silicon Quarter, NY 10001</p>
          </div>
        </div>

      </div>
    </div>
  );
};
