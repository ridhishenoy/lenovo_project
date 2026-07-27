import React, { useState, useEffect } from 'react';
import { Mic, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { setFilter } = useApp();
  const [listening, setListening] = useState(true);
  const [spokenText, setSpokenText] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    setListening(true);
    setSpokenText('');

    const phrases = [
      'Dell XPS 16 Laptop',
      'Gaming Laptop RTX 4080',
      'HP LaserJet Printer',
      'Core i9 Processor',
      'Curved OLED Monitor'
    ];

    const chosen = phrases[Math.floor(Math.random() * phrases.length)];

    const timer = setTimeout(() => {
      setSpokenText(chosen);
      setListening(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApplyVoice = () => {
    if (spokenText) {
      setFilter(prev => ({ ...prev, search: spokenText }));
      onClose();
      navigate('/products');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181512]/80 backdrop-blur-md">
      <div className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6F665F] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520] p-1 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all ${
          listening 
            ? 'bg-[#3F5B43]/20 text-[#3F5B43] dark:text-[#8FAE83] animate-pulse scale-110' 
            : 'bg-[#5E8C61]/20 text-[#5E8C61]'
        }`}>
          <Mic className="w-10 h-10" />
        </div>

        <div>
          <h3 className="text-lg font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
            {listening ? 'Listening...' : 'Voice Query Detected'}
          </h3>
          <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] mt-1">
            {listening ? 'Speak the name of any laptop, GPU, or repair service...' : 'Recognized Speech:'}
          </p>
        </div>

        {spokenText && (
          <div className="p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] rounded-2xl text-sm font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">
            "{spokenText}"
          </div>
        )}

        {!listening && (
          <button
            onClick={handleApplyVoice}
            className="w-full py-3 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full shadow-sm transition-all"
          >
            Search for "{spokenText}"
          </button>
        )}
      </div>
    </div>
  );
};
