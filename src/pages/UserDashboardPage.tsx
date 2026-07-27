import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { formatCurrency } from '../lib/utils';
import { InvoiceModal } from '../components/common/InvoiceModal';
import { 
  Package, 
  Wrench, 
  Heart, 
  FileText, 
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserDashboardPage: React.FC = () => {
  const { user, userOrders, serviceBookings, wishlist, logout } = useApp();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'repairs' | 'wishlist'>('orders');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* User Header Profile Card */}
      <div className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#3F5B43] dark:bg-[#8FAE83] p-0.5 shadow-sm overflow-hidden">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'User'}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
                {user?.name || 'Alex Morgan'}
              </h1>
              <span className="px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#C79A3B]/15 text-[#C79A3B] dark:bg-[#D4AF5A]/15 dark:text-[#D4AF5A] border border-[#C79A3B]/30 rounded-full">
                VIP Patron
              </span>
            </div>
            <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">{user?.email || 'alex.morgan@example.com'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-5 py-2.5 bg-[#EEE6DA] dark:bg-[#2B2520] hover:bg-[#B54A30] hover:text-white dark:hover:bg-[#B54A30] text-[#2D241E] dark:text-[#F5F2ED] font-semibold text-xs rounded-full flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 overflow-x-auto pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-full transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'orders' ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] shadow-sm' : 'text-[#6F665F] dark:text-[#C5BFB8] hover:bg-[#EEE6DA]/50'
          }`}
        >
          <Package className="w-4 h-4" /> Hardware Purchases ({userOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('repairs')}
          className={`px-5 py-2.5 rounded-full transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'repairs' ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] shadow-sm' : 'text-[#6F665F] dark:text-[#C5BFB8] hover:bg-[#EEE6DA]/50'
          }`}
        >
          <Wrench className="w-4 h-4" /> Service Appointments ({serviceBookings.length})
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-5 py-2.5 rounded-full transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'wishlist' ? 'bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] shadow-sm' : 'text-[#6F665F] dark:text-[#C5BFB8] hover:bg-[#EEE6DA]/50'
          }`}
        >
          <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-lg font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Purchase History & Invoices</h2>
          {userOrders.length === 0 ? (
            <p className="text-xs text-[#6F665F] dark:text-[#C5BFB8]">No previous hardware purchases recorded.</p>
          ) : (
            <div className="space-y-4">
              {userOrders.map(order => (
                <div key={order.id} className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 text-xs">
                    <div>
                      <span className="font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">Order #{order.id}</span>
                      <span className="text-[#6F665F] dark:text-[#C5BFB8] ml-3">• Date: {order.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-[#5E8C61]/15 text-[#5E8C61] dark:text-[#76A46E] font-semibold text-[10px] rounded-full">
                        {order.status}
                      </span>
                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="px-3.5 py-1.5 bg-[#EEE6DA] dark:bg-[#2B2520] hover:bg-[#E5DDD0] text-[#2D241E] dark:text-[#F5F2ED] font-semibold text-[11px] rounded-full flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#C56A43]" /> Invoice
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.product.id} className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#2D241E] dark:text-[#F5F2ED]">{item.product.name} (x{item.quantity})</span>
                        <span className="font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">{formatCurrency(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#D8CFC2]/40 dark:border-[#4A433D]/40 flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#6F665F] dark:text-[#C5BFB8]">Total Amount Paid</span>
                    <span className="text-base font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">{formatCurrency(order.totalAmount)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Service Appointments Tab */}
      {activeTab === 'repairs' && (
        <div className="space-y-4">
          <h2 className="text-lg font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Active & Historical Appointments</h2>
          <div className="space-y-4">
            {serviceBookings.map(bk => (
              <div key={bk.id} className="p-6 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl shadow-sm space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 pb-3">
                  <span className="font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">Booking #{bk.id}</span>
                  <span className="px-3 py-1 bg-[#C79A3B]/15 text-[#C79A3B] dark:text-[#D4AF5A] font-semibold rounded-full">{bk.status}</span>
                </div>
                <div>
                  <p className="font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">{bk.deviceModel}</p>
                  <p className="text-[#6F665F] dark:text-[#C5BFB8]">{bk.serviceType}</p>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#6F665F] dark:text-[#C5BFB8] pt-2 border-t border-[#D8CFC2]/40 dark:border-[#4A433D]/40">
                  <span>Scheduled: {bk.preferredDate} ({bk.preferredTime})</span>
                  <Link to={`/track?id=${bk.id}`} className="text-[#3F5B43] dark:text-[#8FAE83] font-bold underline">Track Status →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wishlist Tab */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <h2 className="text-lg font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Saved Hardware Wishlist</h2>
          {wishlist.length === 0 ? (
            <p className="text-xs text-[#6F665F]">Your wishlist is currently empty.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map(p => (
                <div key={p.id} className="p-5 bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl space-y-3">
                  <img src={p.images[0]} alt={p.name} className="w-full h-40 object-contain" />
                  <h4 className="font-serif font-bold text-xs text-[#2D241E] dark:text-[#F5F2ED] truncate">{p.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-bold text-sm text-[#3F5B43] dark:text-[#8FAE83]">{formatCurrency(p.price)}</span>
                    <Link to={`/products/${p.id}`} className="px-4 py-2 bg-[#3F5B43] text-white rounded-full text-xs font-semibold">View</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal order={selectedInvoiceOrder} onClose={() => setSelectedInvoiceOrder(null)} />
      )}

    </div>
  );
};
