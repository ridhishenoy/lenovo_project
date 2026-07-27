import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  User, 
  Calendar, 
  Upload, 
  Home, 
  Building2, 
  ArrowRight
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
        <span className="px-3.5 py-1 rounded-full bg-[#3F5B43]/15 dark:bg-[#8FAE83]/15 text-[#3F5B43] dark:text-[#8FAE83] text-xs font-semibold tracking-wider uppercase">
          Online Concierge Booking Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
          Book Technical Service & Diagnostics
        </h1>
        <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">
          Schedule a flagship showroom appointment or request a certified artisan home visit.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 sm:p-10 shadow-md space-y-8 text-xs">
        
        {/* Step 1: Customer Information */}
        <div className="space-y-4">
          <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] flex items-center gap-2 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 pb-3">
            <User className="w-4 h-4 text-[#3F5B43] dark:text-[#8FAE83]" /> 1. Client Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Full Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Address (For Home Visit)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Service & Device Description */}
        <div className="space-y-4">
          <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] flex items-center gap-2 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 pb-3">
            <Wrench className="w-4 h-4 text-[#3F5B43] dark:text-[#8FAE83]" /> 2. Device & Issue Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Service Category</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED] font-semibold"
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
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Device Model & Serial</label>
              <input
                type="text"
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                placeholder="e.g. MacBook Pro 16 / Dell XPS 15"
                required
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Problem Description</label>
            <textarea
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              rows={3}
              placeholder="Describe symptoms, error codes, or thermal behavior..."
              className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-2xl text-[#2D241E] dark:text-[#F5F2ED]"
            />
          </div>

          {/* Photo Attachment */}
          <div>
            <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">
              Upload Device Photo (Optional)
            </label>
            <button
              type="button"
              onClick={handleImageUploadSim}
              className="px-5 py-2.5 bg-[#EEE6DA] dark:bg-[#2B2520] hover:bg-[#E5DDD0] text-[#2D241E] dark:text-[#F5F2ED] rounded-full flex items-center gap-2 font-semibold"
            >
              <Upload className="w-4 h-4 text-[#C56A43]" />
              <span>{uploadedImages.length > 0 ? 'Photo Attached ✓' : 'Attach Photo of Physical Damage'}</span>
            </button>
          </div>
        </div>

        {/* Step 3: Preferred Date & Location */}
        <div className="space-y-4">
          <h3 className="text-base font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] flex items-center gap-2 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 pb-3">
            <Calendar className="w-4 h-4 text-[#3F5B43] dark:text-[#8FAE83]" /> 3. Schedule & Appointment Mode
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Preferred Date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED] font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Preferred Time Slot</label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED] font-semibold"
              >
                <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-2">Location Preference</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setServiceLocation('Store Visit')}
                className={`p-4 rounded-3xl border text-left flex items-center gap-3 transition-all ${
                  serviceLocation === 'Store Visit'
                    ? 'border-[#3F5B43] dark:border-[#8FAE83] bg-[#3F5B43]/10 dark:bg-[#8FAE83]/10 text-[#3F5B43] dark:text-[#8FAE83]'
                    : 'border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED]'
                }`}
              >
                <Building2 className="w-5 h-5 shrink-0" />
                <div>
                  <div className="font-serif font-bold">Showroom Visit</div>
                  <div className="text-[10px] text-[#6F665F] dark:text-[#C5BFB8]">Bring device to flagship lab</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setServiceLocation('Home Visit')}
                className={`p-4 rounded-3xl border text-left flex items-center gap-3 transition-all ${
                  serviceLocation === 'Home Visit'
                    ? 'border-[#3F5B43] dark:border-[#8FAE83] bg-[#3F5B43]/10 dark:bg-[#8FAE83]/10 text-[#3F5B43] dark:text-[#8FAE83]'
                    : 'border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED]'
                }`}
              >
                <Home className="w-5 h-5 shrink-0" />
                <div>
                  <div className="font-serif font-bold">Doorstep Visit</div>
                  <div className="text-[10px] text-[#6F665F] dark:text-[#C5BFB8]">Master technician visit</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full shadow-sm transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>Processing Booking Request...</span>
          ) : (
            <>
              <span>Confirm Appointment & Generate Repair Ticket</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
