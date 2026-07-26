import React from 'react';
import { STORE_LOCATIONS } from '../data/mockData';
import { MapPin, Phone, Clock, Navigation, CheckCircle2 } from 'lucide-react';

export const StoreLocatorPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase">
          Physical Flagship Hubs
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Store Locator & Service Centers
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Visit our modern retail experience centers for hands-on device demos, custom PC assembly, and instant repairs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STORE_LOCATIONS.map((loc) => (
          <div
            key={loc.id}
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{loc.name}</h3>
            </div>

            <p className="text-slate-600 dark:text-slate-300">{loc.address}</p>

            <div className="space-y-1 text-slate-500">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-500" /> {loc.phone}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-500" /> {loc.hours}
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">In-Store Services:</span>
              <div className="flex flex-wrap gap-1">
                {loc.servicesOffered.map((srv, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md font-semibold text-[10px]">
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`, '_blank')}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 mt-2"
            >
              <Navigation className="w-3.5 h-3.5" /> Get Directions
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
