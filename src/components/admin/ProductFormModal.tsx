import React, { useState, useRef } from 'react';
import { Product } from '../../types';
import { ProductService } from '../../services/api';
import { X, Upload, Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';

interface ProductFormModalProps {
  initialData?: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const CATEGORIES = ['Laptops', 'Desktops', 'Printers', 'Components', 'Monitors', 'Storage', 'Accessories'];
const BRANDS = ['Lenovo', 'Dell', 'Apple', 'ASUS', 'HP', 'Razer', 'Other'];
const AVAILABILITY = ['In Stock', 'Low Stock', 'Out of Stock', 'Pre-Order'];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    initialData || {
      name: '',
      brand: 'Lenovo',
      category: 'Laptops',
      price: 0,
      discount: 0,
      rating: 5,
      reviewsCount: 0,
      availability: 'In Stock',
      badge: '',
      shortDesc: '',
      fullDesc: '',
      specs: { processor: '', ram: '', storage: '', gpu: '', display: '', os: '', warranty: '', screenSize: '', weight: '', color: '' },
      technicalDetails: {},
      warranty: '',
      images: [],
      featured: false,
      bestSeller: false,
      latestArrival: false
    }
  );

  const [techKeys, setTechKeys] = useState<string[]>(Object.keys(formData.technicalDetails || {}));
  const [techValues, setTechValues] = useState<string[]>(Object.values(formData.technicalDetails || {}));
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTechAdd = () => {
    setTechKeys([...techKeys, '']);
    setTechValues([...techValues, '']);
  };

  const handleTechRemove = (index: number) => {
    const newKeys = [...techKeys];
    const newValues = [...techValues];
    newKeys.splice(index, 1);
    newValues.splice(index, 1);
    setTechKeys(newKeys);
    setTechValues(newValues);
  };

  const handleTechChange = (index: number, key: string, value: string) => {
    const newKeys = [...techKeys];
    const newValues = [...techValues];
    newKeys[index] = key;
    newValues[index] = value;
    setTechKeys(newKeys);
    setTechValues(newValues);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFilesToUpload(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let finalImageUrls = [...(formData.images || [])];
      
      // Upload new files if any
      if (filesToUpload.length > 0) {
        const uploadedUrls = await ProductService.uploadImages(filesToUpload);
        finalImageUrls = [...finalImageUrls, ...uploadedUrls];
      }

      // Rebuild technical details
      const finalTechDetails: Record<string, string> = {};
      techKeys.forEach((key, index) => {
        if (key.trim() !== '') {
          finalTechDetails[key] = techValues[index];
        }
      });

      const finalProduct = {
        ...formData,
        images: finalImageUrls,
        technicalDetails: finalTechDetails
      } as Product;

      onSave(finalProduct);
      onClose();
    } catch (err) {
      console.error("Failed to save product", err);
      alert("Error saving product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FFFDF8] dark:bg-[#221D19] w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#D8CFC2] dark:border-[#4A433D]">
          <h2 className="text-2xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
            {initialData ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-[#6F665F] dark:text-[#C5BFB8]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="productForm" onSubmit={handleSubmit} className="space-y-10">
            
            {/* Section 1: Basic Info */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Product Name *</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none focus:border-[#3F5B43] dark:focus:border-[#8FAE83] text-[#2D241E] dark:text-[#F5F2ED]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Brand *</label>
                    <select value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value as any})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]">
                      {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Category *</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Price (₹) *</label>
                    <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Discount (%)</label>
                    <input type="number" value={formData.discount} onChange={e => setFormData({...formData, discount: Number(e.target.value)})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Rating</label>
                    <input type="number" step="0.1" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Reviews Count</label>
                    <input type="number" value={formData.reviewsCount} onChange={e => setFormData({...formData, reviewsCount: Number(e.target.value)})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]" />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Inventory & Settings */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">Inventory & Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Availability</label>
                  <select value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value as any})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]">
                    {AVAILABILITY.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Badge (Optional)</label>
                  <input placeholder="e.g. Featured, New" value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]" />
                </div>
              </div>
              <div className="flex gap-6 mt-4">
                <label className="flex items-center gap-2 text-sm text-[#2D241E] dark:text-[#F5F2ED] cursor-pointer">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 accent-[#3F5B43]" />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-[#2D241E] dark:text-[#F5F2ED] cursor-pointer">
                  <input type="checkbox" checked={formData.bestSeller} onChange={e => setFormData({...formData, bestSeller: e.target.checked})} className="w-4 h-4 accent-[#3F5B43]" />
                  Best Seller
                </label>
                <label className="flex items-center gap-2 text-sm text-[#2D241E] dark:text-[#F5F2ED] cursor-pointer">
                  <input type="checkbox" checked={formData.latestArrival} onChange={e => setFormData({...formData, latestArrival: e.target.checked})} className="w-4 h-4 accent-[#3F5B43]" />
                  Latest Arrival
                </label>
              </div>
            </section>

            {/* Section 3: Media */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">Media</h3>
              
              <div className="border-2 border-dashed border-[#D8CFC2] dark:border-[#4A433D] rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-[#3F5B43] transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <ImageIcon className="w-10 h-10 text-[#6F665F] dark:text-[#C5BFB8]" />
                <div className="text-center">
                  <p className="text-[#2D241E] dark:text-[#F5F2ED] font-semibold">Click to upload product images</p>
                  <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">PNG, JPG, WEBP up to 5MB</p>
                </div>
                <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              </div>

              {/* Previews */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {formData.images?.map((url, i) => (
                  <div key={`existing-${i}`} className="relative w-24 h-24 flex-shrink-0 bg-white rounded-xl border border-[#D8CFC2] dark:border-[#4A433D] overflow-hidden">
                    <img src={url} alt="Product" className="w-full h-full object-contain" />
                    <button type="button" onClick={() => setFormData({...formData, images: formData.images?.filter((_, idx) => idx !== i)})} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {filesToUpload.map((file, i) => (
                  <div key={`new-${i}`} className="relative w-24 h-24 flex-shrink-0 bg-white rounded-xl border border-[#D8CFC2] dark:border-[#4A433D] overflow-hidden">
                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-contain opacity-70" />
                    <span className="absolute bottom-0 w-full text-center bg-black/50 text-white text-[10px] py-0.5">New</span>
                    <button type="button" onClick={() => setFilesToUpload(filesToUpload.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Descriptions */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">Descriptions</h3>
              <div>
                <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Short Description (Catalog View) *</label>
                <textarea required rows={2} value={formData.shortDesc} onChange={e => setFormData({...formData, shortDesc: e.target.value})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Full Description (Product Page) *</label>
                <textarea required rows={4} value={formData.fullDesc} onChange={e => setFormData({...formData, fullDesc: e.target.value})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]" />
              </div>
            </section>

            {/* Section 5: Specifications */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">Core Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['processor', 'ram', 'storage', 'gpu', 'display', 'os', 'screenSize', 'weight', 'color'].map(specKey => (
                  <div key={specKey}>
                    <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1 capitalize">{specKey}</label>
                    <input value={(formData.specs as any)?.[specKey] || ''} onChange={e => setFormData({...formData, specs: {...(formData.specs as any), [specKey]: e.target.value}})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Warranty Overview</label>
                  <input value={formData.warranty} onChange={e => setFormData({...formData, warranty: e.target.value})} className="w-full bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]" />
                </div>
              </div>
            </section>

            {/* Section 6: Technical Details (Dynamic) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#C56A43] dark:text-[#C97A4D]">Additional Technical Details</h3>
                <button type="button" onClick={handleTechAdd} className="text-xs flex items-center gap-1 font-semibold text-[#3F5B43] dark:text-[#8FAE83] hover:underline">
                  <Plus className="w-4 h-4" /> Add Row
                </button>
              </div>
              
              <div className="space-y-3">
                {techKeys.map((key, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input placeholder="Key (e.g. Ports)" value={key} onChange={e => handleTechChange(index, e.target.value, techValues[index])} className="w-1/3 bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]" />
                    <input placeholder="Value (e.g. 2x USB-C)" value={techValues[index]} onChange={e => handleTechChange(index, key, e.target.value)} className="flex-1 bg-transparent border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED]" />
                    <button type="button" onClick={() => handleTechRemove(index)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {techKeys.length === 0 && <p className="text-sm text-[#6F665F] dark:text-[#C5BFB8]">No additional details added.</p>}
              </div>
            </section>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#D8CFC2] dark:border-[#4A433D] bg-[#F9F6F0] dark:bg-[#1E1915] flex justify-end gap-4">
          <button type="button" onClick={onClose} disabled={isSaving} className="px-6 py-2.5 rounded-full font-semibold text-[#6F665F] dark:text-[#C5BFB8] hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button form="productForm" type="submit" disabled={isSaving} className="px-8 py-2.5 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold rounded-full flex items-center gap-2 shadow-sm transition-all disabled:opacity-50">
            {isSaving ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isSaving ? 'Saving...' : 'Save Product'}
          </button>
        </div>

      </div>
    </div>
  );
};
