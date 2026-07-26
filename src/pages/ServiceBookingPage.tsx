import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Upload, 
  Home, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ServiceBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { addServiceBooking, showToast } = useApp();

  const [customerName, setCustomerName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [address, setAddress] = useState('742 Evergreen Terrace, Springfield, OR');
  
  const [serviceType, setServiceType] = useState('Laptop Screen & Micro-soldering Repair');
  const [deviceModel, setDeviceModel] = useState('Dell XPS 15 (2023)');
  const [problemDescription, setProblemDescription] = useState('Screen flickers under GPU load and battery drains rapidly.');
  const [preferredDate, setPreferredDate] = useState('2026-07-28');
  const [preferredTime, setPreferredTime] = useState('10:00 AM - 12:00 PM');
  const [serviceLocation, setServiceLocation] = useState<'Home Visit' | 'Store Visit'>('Store Visit');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUploadSim = () => {
    setUploadedImages([
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80'
    ]);
    showToast('Device damage photo attached successfully', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = addServiceBooking({
        customerName,
        email,
        phone,
        address,
        serviceType,
        deviceModel,
        problemDescription,
        uploadedImages,
        preferredDate,
        preferredTime,
        serviceLocation
      });

      setIsSubmitting(false);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      navigate(`/track?id=${newBooking.id}`);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase">
          Online Appointment Portal
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Book Computer & Device Service
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Schedule an in-store appointment or request a certified technician home visit.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 text-xs">
        
        {/* Step 1: Customer Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <User className="w-4 h-4 text-blue-600" /> 1. Customer Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Address (For Home Visit)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Service & Device Description */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Wrench className="w-4 h-4 text-blue-600" /> 2. Device & Issue Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Service Type</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold"
              >
                <option value="Laptop Screen & Micro-soldering Repair">Laptop Screen & Micro-soldering Repair</option>
                <option value="Desktop Power & GPU Diagnostics">Desktop Power & GPU Diagnostics</option>
                <option value="Printer Maintenance & Unclogging">Printer Maintenance & Unclogging</option>
                <option value="Data Recovery (Hard Drive/SSD)">Data Recovery (Hard Drive/SSD)</option>
                <option value="Virus & Ransomware Removal">Virus & Ransomware Removal</option>
                <option value="Windows 11 Restore & Driver Tuning">Windows 11 Restore & Driver Tuning</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Device Model & Serial</label>
              <input
                type="text"
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                placeholder="e.g. MacBook Pro 16 / Dell XPS 15"
                required
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Problem Description</label>
            <textarea
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              rows={3}
              placeholder="Describe what happens when you turn on the computer or printer..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
            />
          </div>

          {/* Photo Attachment */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Upload Device Photo (Optional)
            </label>
            <button
              type="button"
              onClick={handleImageUploadSim}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl flex items-center gap-2 font-bold"
            >
              <Upload className="w-4 h-4 text-blue-500" />
              <span>{uploadedImages.length > 0 ? 'Photo Attached ✓' : 'Attach Photo of Broken Screen / Error'}</span>
            </button>
          </div>
        </div>

        {/* Step 3: Preferred Date & Location */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Calendar className="w-4 h-4 text-blue-600" /> 3. Schedule & Location
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Time Slot</label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold"
              >
                <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">Service Location Mode</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setServiceLocation('Store Visit')}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  serviceLocation === 'Store Visit'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Building2 className="w-5 h-5 shrink-0" />
                <div>
                  <div className="font-bold">Store Visit</div>
                  <div className="text-[10px] text-slate-500">Bring device to flagship lab</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setServiceLocation('Home Visit')}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  serviceLocation === 'Home Visit'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Home className="w-5 h-5 shrink-0" />
                <div>
                  <div className="font-bold">Home/Office Visit</div>
                  <div className="text-[10px] text-slate-500">Certified tech visits your doorstep</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>Creating Repair Booking...</span>
          ) : (
            <>
              <span>Submit Appointment Request & Get Repair ID</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
