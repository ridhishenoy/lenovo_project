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
  X
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { products, setProducts, repairOrders, setRepairOrders, userOrders, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'repairs'>('analytics');

  // Add Product State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('Dell');
  const [newCategory, setNewCategory] = useState('Laptops');
  const [newPrice, setNewPrice] = useState('1499');

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
      warranty: '3 Years Warranty'
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[10px] uppercase font-black tracking-widest text-blue-600 dark:text-cyan-400">
            NexusTech Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Store & Service Command Center
          </h1>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'analytics' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'}`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'products' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'}`}
          >
            Manage Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('repairs')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'repairs' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'}`}
          >
            Manage Service Jobs
          </button>
        </div>
      </div>

      {/* Analytics Overview */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Monthly Revenue</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(142850 * 83)}</div>
              <p className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last month
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Orders Fulfilled</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">1,240</div>
              <p className="text-[11px] text-emerald-500 font-bold">100% On-Time Delivery</p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">Active Repair Lab Tickets</span>
              <div className="text-2xl font-black text-blue-600 dark:text-cyan-400">{Object.keys(repairOrders).length} Jobs</div>
              <p className="text-[11px] text-slate-500">Avg Turnaround: 24 Hours</p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">Store Rating</span>
              <div className="text-2xl font-black text-amber-500">4.9 / 5.0</div>
              <p className="text-[11px] text-slate-500">Based on 3,420 reviews</p>
            </div>
          </div>
        </div>
      )}

      {/* Product Management */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Store Catalog Items</h2>
            <button
              onClick={() => setIsAddingProduct(true)}
              className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add New Hardware Item
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
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Bench Repair Jobs</h2>
          <div className="space-y-4">
            {(Object.values(repairOrders) as RepairOrder[]).map(order => (
              <div key={order.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="font-black text-blue-600 dark:text-cyan-400">ID: #{order.id}</span>
                    <span className="text-slate-400 ml-2">• Customer: {order.customerName}</span>
                  </div>
                  <span className="font-extrabold text-amber-500">Stage {order.currentStepIndex + 1} of 7</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{order.device}</p>
                    <p className="text-[11px] text-slate-500">{order.issue}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 dark:text-white">Tech: {order.assignedTechnician}</p>
                    <p className="text-blue-600 font-extrabold">${order.estimatedCost}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => handleUpdateRepairStep(order.id, -1)}
                    disabled={order.currentStepIndex === 0}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl disabled:opacity-50"
                  >
                    ← Previous Stage
                  </button>
                  <button
                    onClick={() => handleUpdateRepairStep(order.id, 1)}
                    disabled={order.currentStepIndex === 6}
                    className="px-3 py-1.5 bg-blue-600 text-white font-bold rounded-xl disabled:opacity-50"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <form onSubmit={handleAddProduct} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Add New Product to Store</h3>
              <button type="button" onClick={() => setIsAddingProduct(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Product Title</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Brand</label>
                <select
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                >
                  <option value="Dell">Dell</option>
                  <option value="Apple">Apple</option>
                  <option value="ASUS">ASUS</option>
                  <option value="Lenovo">Lenovo</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                >
                  <option value="Laptops">Laptops</option>
                  <option value="Desktops">Desktops</option>
                  <option value="Printers">Printers</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Price (₹)</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md"
            >
              Publish Item
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
