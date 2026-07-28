import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../lib/utils';
import { ProductCard } from '../components/common/ProductCard';
import { Product, RepairOrder } from '../types';
import { 
  BarChart3, 
  Package, 
  Wrench, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  X,
  ShieldCheck,
  Award,
  Eye
} from 'lucide-react';
import { ProductFormModal } from '../components/admin/ProductFormModal';

export const AdminDashboardPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, repairOrders, setRepairOrders, showToast, partners, addPartner, removePartner, heroSlides, addHeroSlide, removeHeroSlide, updateHeroSlide } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'repairs' | 'partners' | 'slides'>('analytics');

  // Product Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Partner Modal State
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [newPartner, setNewPartner] = useState({ name: '', logo: '', imageUrl: '' });
  const [isDragging, setIsDragging] = useState(false);

  // Slide Modal State
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<any>(null);
  const [newSlide, setNewSlide] = useState({ id: '', title: '', subtitle: '', discount: '', ctaText: '', link: '', image: '' });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (product: Product) => {
    if (editingProduct) {
      await updateProduct(product);
    } else {
      await addProduct(product);
    }
  };

  const handleUpdateRepairStep = (repairId: string, stepDelta: number) => {
    setRepairOrders(prev => {
      const existing = prev[repairId];
      if (!existing) return prev;
      const newStep = Math.min(6, Math.max(0, existing.currentStepIndex + stepDelta));
      return {
        ...prev,
        [repairId]: {
          ...existing,
          currentStepIndex: newStep,
          status: newStep === 6 ? 'Delivered' : 'In Repair'
        }
      };
    });
    showToast(`Updated Repair #${repairId} stage`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#D8CFC2] dark:border-[#4A433D]">
        <div>
          <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C56A43] dark:text-[#C97A4D]">
            SHENOY COMPUTERS ATELIER MANAGEMENT
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
            Store & Service Command Center
          </h1>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-[#EEE6DA]/60 dark:bg-[#221D19] p-1.5 rounded-full border border-[#D8CFC2] dark:border-[#4A433D] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-5 py-2 rounded-full transition-all ${
              activeTab === 'analytics' 
                ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] shadow-sm' 
                : 'text-[#6F665F] dark:text-[#C5BFB8] hover:text-[#2D241E]'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2 rounded-full transition-all ${
              activeTab === 'products' 
                ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] shadow-sm' 
                : 'text-[#6F665F] dark:text-[#C5BFB8] hover:text-[#2D241E]'
            }`}
          >
            Catalog Items ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('repairs')}
            className={`px-5 py-2 rounded-full transition-all ${
              activeTab === 'repairs' 
                ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] shadow-sm' 
                : 'text-[#6F665F] dark:text-[#C5BFB8] hover:text-[#2D241E]'
            }`}
          >
            Bench Jobs
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-5 py-2 rounded-full transition-all ${
              activeTab === 'partners' 
                ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] shadow-sm' 
                : 'text-[#6F665F] dark:text-[#C5BFB8] hover:text-[#2D241E]'
            }`}
          >
            Partners
          </button>
          <button
            onClick={() => setActiveTab('slides')}
            className={`px-5 py-2 rounded-full transition-all ${
              activeTab === 'slides' 
                ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] shadow-sm' 
                : 'text-[#6F665F] dark:text-[#C5BFB8] hover:text-[#2D241E]'
            }`}
          >
            Slides
          </button>
        </div>
      </div>

      {/* Analytics Overview */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8]">Monthly Revenue</span>
              <div className="text-2xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">{formatCurrency(142850 * 83)}</div>
              <p className="text-[11px] text-[#5E8C61] dark:text-[#76A46E] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last month
              </p>
            </div>

            <div className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8]">Fulfilled Orders</span>
              <div className="text-2xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">1,240</div>
              <p className="text-[11px] text-[#5E8C61] dark:text-[#76A46E] font-semibold">100% White-Glove Delivery</p>
            </div>

            <div className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8]">Active Repair Bench Tickets</span>
              <div className="text-2xl font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">{Object.keys(repairOrders).length} Jobs</div>
              <p className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8]">Avg Turnaround: 24 Hours</p>
            </div>

            <div className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8]">Showroom Rating</span>
              <div className="text-2xl font-serif font-bold text-[#C79A3B] dark:text-[#D4AF5A]">4.9 / 5.0</div>
              <p className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8]">Based on 3,420 client reviews</p>
            </div>
          </div>
        </div>
      )}

      {/* Product Management */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Catalog Management</h2>
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Add Hardware Item
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 bg-white rounded-lg border border-[#D8CFC2] dark:border-[#4A433D] p-2 flex items-center justify-center">
                    {p.images[0] ? (
                      <img src={p.images[0]} alt={p.name} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <Package className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#2D241E] dark:text-[#F5F2ED] line-clamp-2">{p.name}</h3>
                    <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] mt-1">{p.brand} • {p.category}</p>
                    <div className="text-sm font-bold text-[#3F5B43] dark:text-[#8FAE83] mt-2">
                      {formatCurrency(p.price)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#D8CFC2]/50 dark:border-[#4A433D]/50">
                  <button onClick={() => window.open(`/product/${p.id}`, '_blank')} className="py-2 text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] hover:bg-black/5 dark:hover:bg-white/5 rounded-lg flex items-center justify-center gap-1 transition-colors">
                    <Eye className="w-4 h-4" /> View
                  </button>
                  <button onClick={() => handleOpenEditModal(p)} className="py-2 text-xs font-semibold text-[#2D241E] dark:text-[#F5F2ED] hover:bg-black/5 dark:hover:bg-white/5 rounded-lg flex items-center justify-center gap-1 transition-colors">
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                  <button onClick={() => { if(confirm('Are you sure you want to delete this product?')) deleteProduct(p.id); }} className="py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center justify-center gap-1 transition-colors">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render Product Modal if open */}
      {isModalOpen && (
        <ProductFormModal
          initialData={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}

      {/* Service Repair Jobs Management */}
      {activeTab === 'repairs' && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Active Technical Bench Jobs</h2>
          <div className="space-y-4">
            {(Object.values(repairOrders) as RepairOrder[]).map(order => (
              <div key={order.id} className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl shadow-sm space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 pb-3">
                  <div>
                    <span className="font-bold text-[#3F5B43] dark:text-[#8FAE83]">Job ID: #{order.id}</span>
                    <span className="text-[#6F665F] dark:text-[#C5BFB8] ml-3">• Client: {order.customerName}</span>
                  </div>
                  <span className="font-bold text-[#C79A3B] dark:text-[#D4AF5A]">Stage {order.currentStepIndex + 1} of 7</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] text-sm">{order.device}</p>
                    <p className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8]">{order.issue}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#2D241E] dark:text-[#F5F2ED]">Artisan: {order.assignedTechnician}</p>
                    <p className="text-[#C56A43] dark:text-[#C97A4D] font-bold text-sm">₹{order.estimatedCost.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#D8CFC2]/40 dark:border-[#4A433D]/40">
                  <button
                    onClick={() => handleUpdateRepairStep(order.id, -1)}
                    disabled={order.currentStepIndex === 0}
                    className="px-4 py-2 bg-[#EEE6DA] dark:bg-[#2B2520] text-[#2D241E] dark:text-[#F5F2ED] font-semibold rounded-full disabled:opacity-40"
                  >
                    ← Previous Stage
                  </button>
                  <button
                    onClick={() => handleUpdateRepairStep(order.id, 1)}
                    disabled={order.currentStepIndex === 6}
                    className="px-4 py-2 bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] font-semibold rounded-full disabled:opacity-40"
                  >
                    Advance Stage →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Partners Management */}
      {activeTab === 'partners' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Showroom Partners</h2>
            <button
              onClick={() => setIsPartnerModalOpen(true)}
              className="px-5 py-2.5 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Add Partner
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {partners.map(p => (
              <div key={p.name} className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm relative group">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="h-10 object-contain mb-2" />
                ) : (
                  <span className="text-xl sm:text-2xl font-serif font-bold tracking-widest text-[#2D241E] dark:text-[#F5F2ED] mb-2">{p.logo}</span>
                )}
                {p.name && !p.name.startsWith('Partner-') && (
                  <span className="text-[10px] sm:text-xs text-[#6F665F] dark:text-[#C5BFB8] text-center">{p.name}</span>
                )}
                
                <button
                  onClick={() => { if(confirm(`Remove partner ${p.name}?`)) removePartner(p.name); }}
                  className="absolute top-2 right-2 p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove Partner"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Partner Modal */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#FFFDF8] dark:bg-[#221D19] rounded-3xl w-full max-w-md p-6 shadow-xl border border-[#D8CFC2] dark:border-[#4A433D]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Add New Partner</h3>
              <button onClick={() => setIsPartnerModalOpen(false)} className="text-[#6F665F] hover:text-[#2D241E] dark:text-[#C5BFB8] dark:hover:text-[#F5F2ED]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1.5 uppercase">Partner Name (Optional)</label>
                <input
                  type="text"
                  value={newPartner.name}
                  onChange={e => setNewPartner({...newPartner, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] focus:outline-none focus:ring-2 focus:ring-[#3F5B43] dark:focus:ring-[#8FAE83]"
                  placeholder="e.g. Dell"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1.5 uppercase">Logo Text (Optional)</label>
                <input
                  type="text"
                  value={newPartner.logo}
                  onChange={e => setNewPartner({...newPartner, logo: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] focus:outline-none focus:ring-2 focus:ring-[#3F5B43] dark:focus:ring-[#8FAE83]"
                  placeholder="e.g. DELL"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1.5 uppercase">Partner Logo Image</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith('image/')) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewPartner(prev => ({ ...prev, imageUrl: reader.result as string }));
                      };
                      reader.readAsDataURL(file);
                    } else {
                      showToast('Please drop a valid image file', 'error');
                    }
                  }}
                  className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors ${isDragging ? 'border-[#3F5B43] bg-[#3F5B43]/10 dark:border-[#8FAE83] dark:bg-[#8FAE83]/10' : 'border-[#D8CFC2] dark:border-[#4A433D] hover:border-[#3F5B43] dark:hover:border-[#8FAE83]'}`}
                >
                  {newPartner.imageUrl && newPartner.imageUrl.startsWith('data:image') ? (
                    <div className="flex flex-col items-center">
                      <img src={newPartner.imageUrl} alt="Preview" className="h-16 object-contain mb-2" />
                      <button 
                        onClick={() => setNewPartner(prev => ({ ...prev, imageUrl: '' }))}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="py-2">
                      <p className="text-sm text-[#6F665F] dark:text-[#C5BFB8]">Drag & drop an image here</p>
                      <p className="text-xs text-[#6F665F]/70 dark:text-[#C5BFB8]/70 mt-1">or paste an image URL below</p>
                    </div>
                  )}
                </div>
                {(!newPartner.imageUrl || !newPartner.imageUrl.startsWith('data:image')) && (
                  <input
                    type="text"
                    value={newPartner.imageUrl}
                    onChange={e => setNewPartner({...newPartner, imageUrl: e.target.value})}
                    className="w-full mt-3 px-4 py-2.5 rounded-xl bg-white dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] focus:outline-none focus:ring-2 focus:ring-[#3F5B43] dark:focus:ring-[#8FAE83]"
                    placeholder="https://example.com/logo.png"
                  />
                )}
              </div>
              
              <button
                onClick={() => {
                  if (newPartner.imageUrl) {
                    const partnerToSave = {
                      ...newPartner,
                      name: newPartner.name || `Partner-${Math.floor(Math.random() * 100000)}`,
                      logo: newPartner.logo || ''
                    };
                    addPartner(partnerToSave);
                    setIsPartnerModalOpen(false);
                    setNewPartner({ name: '', logo: '', imageUrl: '' });
                  } else {
                    showToast('Please provide a Partner Logo Image', 'error');
                  }
                }}
                className="w-full py-3 mt-2 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold rounded-xl transition-colors"
              >
                Save Partner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slides Management */}
      {activeTab === 'slides' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">New Arrivals (Slides)</h2>
            <button
              onClick={() => {
                setEditingSlide(null);
                setNewSlide({ id: '', title: '', subtitle: '', discount: '', ctaText: '', link: '', image: '' });
                setIsSlideModalOpen(true);
              }}
              className="px-5 py-2.5 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Add Slide
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroSlides.map(slide => (
              <div key={slide.id} className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-2xl p-6 shadow-sm relative group flex flex-col">
                <img src={slide.image} alt={slide.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                <h3 className="text-lg font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] mb-1">{slide.title}</h3>
                <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8] line-clamp-2 mb-2">{slide.subtitle}</p>
                <div className="mt-auto pt-4 flex gap-2 border-t border-[#D8CFC2]/50 dark:border-[#4A433D]/50">
                  <button
                    onClick={() => {
                      setEditingSlide(slide);
                      setNewSlide(slide);
                      setIsSlideModalOpen(true);
                    }}
                    className="flex-1 py-2 bg-[#D8CFC2]/30 dark:bg-[#4A433D]/30 text-[#2D241E] dark:text-[#F5F2ED] rounded-xl text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#D8CFC2]/50 dark:hover:bg-[#4A433D]/50 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => { if(confirm(`Remove slide ${slide.title}?`)) removeHeroSlide(slide.id); }}
                    className="flex-1 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Slide Modal */}
      {isSlideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#FFFDF8] dark:bg-[#221D19] rounded-3xl w-full max-w-2xl p-6 shadow-xl border border-[#D8CFC2] dark:border-[#4A433D] my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">{editingSlide ? 'Edit Slide' : 'Add New Slide'}</h3>
              <button onClick={() => setIsSlideModalOpen(false)} className="text-[#6F665F] hover:text-[#2D241E] dark:text-[#C5BFB8] dark:hover:text-[#F5F2ED]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1.5 uppercase">Title</label>
                <input type="text" value={newSlide.title} onChange={e => setNewSlide({...newSlide, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] focus:outline-none focus:ring-2 focus:ring-[#3F5B43] dark:focus:ring-[#8FAE83]" placeholder="e.g. Crafted Workstations" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1.5 uppercase">Subtitle</label>
                <textarea value={newSlide.subtitle} onChange={e => setNewSlide({...newSlide, subtitle: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] focus:outline-none focus:ring-2 focus:ring-[#3F5B43] dark:focus:ring-[#8FAE83]" placeholder="Short description..." rows={2}></textarea>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1.5 uppercase">Discount Tagline</label>
                <input type="text" value={newSlide.discount} onChange={e => setNewSlide({...newSlide, discount: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] focus:outline-none focus:ring-2 focus:ring-[#3F5B43] dark:focus:ring-[#8FAE83]" placeholder="e.g. 20% Off" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1.5 uppercase">CTA Text</label>
                <input type="text" value={newSlide.ctaText} onChange={e => setNewSlide({...newSlide, ctaText: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] focus:outline-none focus:ring-2 focus:ring-[#3F5B43] dark:focus:ring-[#8FAE83]" placeholder="e.g. Shop Now" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1.5 uppercase">Link URL</label>
                <input type="text" value={newSlide.link} onChange={e => setNewSlide({...newSlide, link: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] focus:outline-none focus:ring-2 focus:ring-[#3F5B43] dark:focus:ring-[#8FAE83]" placeholder="e.g. /products?category=Laptops" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1.5 uppercase">Image URL (or Base64)</label>
                <input type="text" value={newSlide.image} onChange={e => setNewSlide({...newSlide, image: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] text-[#2D241E] dark:text-[#F5F2ED] focus:outline-none focus:ring-2 focus:ring-[#3F5B43] dark:focus:ring-[#8FAE83]" placeholder="/images/products/hero.png" />
                {newSlide.image && <img src={newSlide.image} alt="Preview" className="mt-2 h-20 object-contain rounded-lg border border-[#D8CFC2] dark:border-[#4A433D]" />}
              </div>
            </div>
            
            <button
              onClick={() => {
                if (newSlide.title && newSlide.image) {
                  if (editingSlide) {
                    updateHeroSlide(editingSlide.id, newSlide as any);
                  } else {
                    addHeroSlide({ ...newSlide, id: `hs-${Date.now()}` } as any);
                  }
                  setIsSlideModalOpen(false);
                } else {
                  showToast('Please provide at least a title and image URL', 'error');
                }
              }}
              className="w-full py-3 mt-6 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold rounded-xl transition-colors"
            >
              {editingSlide ? 'Update Slide' : 'Save Slide'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
