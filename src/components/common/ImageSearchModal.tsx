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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181512]/80 backdrop-blur-md">
      <div className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6F665F] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520] p-1 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] flex items-center justify-center mx-auto shadow-sm">
          <Camera className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-lg font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Visual Hardware Recognition</h3>
          <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] mt-1">
            Upload a photo of a laptop, workstation, motherboard, or printer to find matching products or replacement parts.
          </p>
        </div>

        {!detectedCategory ? (
          <div
            onClick={handleSimulatedUpload}
            className="border-2 border-dashed border-[#D8CFC2] dark:border-[#4A433D] hover:border-[#3F5B43] rounded-3xl p-8 cursor-pointer transition-colors space-y-2 bg-[#EEE6DA]/40 dark:bg-[#181512]"
          >
            {analyzing ? (
              <div className="space-y-2">
                <Sparkles className="w-8 h-8 text-[#C79A3B] animate-spin mx-auto" />
                <p className="text-xs font-semibold text-[#2D241E] dark:text-[#F5F2ED]">
                  Scanning Image with Neural Network...
                </p>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-[#6F665F] mx-auto" />
                <p className="text-xs font-semibold text-[#2D241E] dark:text-[#F5F2ED]">
                  Click to Upload or Drag & Drop Photo
                </p>
                <p className="text-[10px] text-[#6F665F]">Supports JPG, PNG, WEBP up to 10MB</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-[#5E8C61]/15 border border-[#5E8C61]/30 rounded-2xl text-xs space-y-2 text-[#5E8C61] dark:text-[#76A46E]">
              <CheckCircle2 className="w-6 h-6 mx-auto text-[#5E8C61]" />
              <p className="font-serif font-bold">Device Identified: High Performance Laptop Series</p>
              <p className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8]">
                Matches found in <strong>Laptops & Workstations</strong> catalog.
              </p>
            </div>

            <button
              onClick={handleApplyImageSearch}
              className="w-full py-3 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full shadow-sm transition-all"
            >
              View Matching Laptops in Atelier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
