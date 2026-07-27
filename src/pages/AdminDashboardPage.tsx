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
  const { products, addProduct, updateProduct, deleteProduct, repairOrders, setRepairOrders, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'repairs'>('analytics');

  // Product Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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


    </div>
  );
};
