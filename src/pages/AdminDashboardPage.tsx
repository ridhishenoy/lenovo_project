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
  Award
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { products, setProducts, repairOrders, setRepairOrders, userOrders, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'repairs'>('analytics');

  // Add Product State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('Dell');
  const [newCategory, setNewCategory] = useState('Laptops');
  const [newPrice, setNewPrice] = useState('149900');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newName,
      brand: newBrand as any,
      category: newCategory as any,
      price: Number(newPrice),
      discount: 10,
      rating: 5,
      reviewsCount: 1,
      availability: 'In Stock',
      images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'],
      shortDesc: `${newName} high performance workstation.`,
      fullDesc: `${newName} delivers top tier performance with original OEM warranty.`,
      specs: { processor: 'Intel Core i9', ram: '32 GB', storage: '1 TB SSD' },
      technicalDetails: {},
      warranty: '3 Years Premium Onsite Warranty'
    };

    setProducts([newProd, ...products]);
    setIsAddingProduct(false);
    setNewName('');
    showToast(`Added ${newProd.name} to store catalog!`, 'success');
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
              onClick={() => setIsAddingProduct(true)}
              className="px-5 py-2.5 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Add Hardware Item
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
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

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181512]/75 backdrop-blur-md">
          <form onSubmit={handleAddProduct} className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60">
              <h3 className="font-serif font-bold text-base text-[#2D241E] dark:text-[#F5F2ED]">Add Product to Atelier</h3>
              <button type="button" onClick={() => setIsAddingProduct(false)} className="p-1 rounded-full text-[#6F665F] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Product Title</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Brand</label>
                <select
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
                >
                  <option value="Dell">Dell</option>
                  <option value="Apple">Apple</option>
                  <option value="ASUS">ASUS</option>
                  <option value="Lenovo">Lenovo</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
                >
                  <option value="Laptops">Laptops</option>
                  <option value="Desktops">Desktops</option>
                  <option value="Printers">Printers</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#2D241E] dark:text-[#F5F2ED] mb-1">Price (₹)</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                required
                className="w-full p-3 bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-full text-[#2D241E] dark:text-[#F5F2ED]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold rounded-full shadow-sm"
            >
              Publish Item
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
