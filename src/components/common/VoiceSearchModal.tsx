import React, { useState, useEffect } from 'react';
import { Mic, X, Check, Volume2 } from 'lucide-react';
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
      'Samsung Curved Monitor'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all ${
          listening 
            ? 'bg-blue-600/20 text-blue-600 animate-pulse scale-110' 
            : 'bg-emerald-500/20 text-emerald-500'
        }`}>
          <Mic className="w-10 h-10" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {listening ? 'Listening...' : 'Voice Query Detected'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {listening ? 'Speak the name of any laptop, GPU, or repair service...' : 'Recognized Speech:'}
          </p>
        </div>

        {spokenText && (
          <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl text-sm font-bold text-blue-600 dark:text-cyan-400">
            "{spokenText}"
          </div>
        )}

        {!listening && (
          <button
            onClick={handleApplyVoice}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            Search for "{spokenText}"
          </button>
        )}
      </div>
    </div>
  );
};
