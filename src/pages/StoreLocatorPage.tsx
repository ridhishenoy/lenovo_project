import React from 'react';
import { STORE_LOCATIONS } from '../data/mockData';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export const StoreLocatorPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-[#3F5B43]/15 dark:bg-[#8FAE83]/15 text-[#3F5B43] dark:text-[#8FAE83] text-xs font-semibold tracking-wider uppercase">
          Physical Flagship Showrooms
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
          Store Locator & Service Hubs
        </h1>
        <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">
          Visit our modern retail experience showrooms for hands-on device demos, custom PC assembly, and instant repairs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STORE_LOCATIONS.map((loc) => (
          <div
            key={loc.id}
            className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl shadow-sm space-y-4 text-xs"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#3F5B43] dark:text-[#8FAE83]" />
              <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">{loc.name}</h3>
            </div>

            <p className="text-[#6F665F] dark:text-[#C5BFB8]">{loc.address}</p>

            <div className="space-y-1 text-[#6F665F] dark:text-[#C5BFB8]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#3F5B43]" /> {loc.phone}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#3F5B43]" /> {loc.hours}
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8] block mb-1">In-Store Services:</span>
              <div className="flex flex-wrap gap-1">
                {loc.servicesOffered.map((srv, i) => (
                  <span key={i} className="px-2.5 py-0.5 bg-[#EEE6DA] dark:bg-[#2B2520] text-[#2D241E] dark:text-[#F5F2ED] rounded-full font-semibold text-[10px]">
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`, '_blank')}
              className="w-full py-2.5 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold rounded-full flex items-center justify-center gap-2 mt-2 shadow-sm transition-all"
            >
              <Navigation className="w-3.5 h-3.5" /> Get Directions
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
