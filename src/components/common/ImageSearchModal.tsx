import React, { useState } from 'react';
import { Camera, Upload, X, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageSearchModal: React.FC<ImageSearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { setFilter } = useApp();
  const [analyzing, setAnalyzing] = useState(false);
  const [detectedCategory, setDetectedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulatedUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setDetectedCategory('Laptops');
    }, 1800);
  };

  const handleApplyImageSearch = () => {
    if (detectedCategory) {
      setFilter(prev => ({ ...prev, categories: ['Laptops'] }));
      onClose();
      navigate('/products');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 p-0.5 mx-auto">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-purple-400">
            <Camera className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Visual Hardware Search</h3>
          <p className="text-xs text-slate-500 mt-1">
            Upload a photo of a laptop, motherboard, graphics card, or printer to find matching hardware or replacement parts.
          </p>
        </div>

        {!detectedCategory ? (
          <div
            onClick={handleSimulatedUpload}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-8 cursor-pointer transition-colors space-y-2 bg-slate-50 dark:bg-slate-950"
          >
            {analyzing ? (
              <div className="space-y-2">
                <Sparkles className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Scanning Image with Neural Network...
                </p>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Click to Upload or Drag & Drop Photo
                </p>
                <p className="text-[10px] text-slate-400">Supports JPG, PNG, WEBP up to 10MB</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl text-xs space-y-2 text-emerald-400">
              <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400" />
              <p className="font-bold">Device Identified: High Performance Laptop Series</p>
              <p className="text-[11px] text-slate-300">
                Matches found in <strong>Laptops & Workstations</strong> category.
              </p>
            </div>

            <button
              onClick={handleApplyImageSearch}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              View Matching Laptops in Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
