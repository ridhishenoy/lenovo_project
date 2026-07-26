import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { formatCurrency } from '../lib/utils';
import { InvoiceModal } from '../components/common/InvoiceModal';
import { 
  User, 
  Package, 
  Wrench, 
  Heart, 
  FileText, 
  MapPin, 
  CreditCard, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserDashboardPage: React.FC = () => {
  const { user, userOrders, serviceBookings, wishlist, logout } = useApp();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'repairs' | 'wishlist' | 'settings'>('orders');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* User Header Profile Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'User'}
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 dark:text-white">
                {user?.name || 'Alex Morgan'}
              </h1>
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full">
                VIP Gold Member
              </span>
            </div>
            <p className="text-xs text-slate-500">{user?.email || 'alex.morgan@example.com'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'orders' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Package className="w-4 h-4" /> Hardware Orders ({userOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('repairs')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'repairs' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Wrench className="w-4 h-4" /> Service Appointments ({serviceBookings.length})
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'wishlist' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Order History & Invoices</h2>
          {userOrders.length === 0 ? (
            <p className="text-xs text-slate-500">No previous hardware orders.</p>
          ) : (
            <div className="space-y-4">
              {userOrders.map(order => (
                <div key={order.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Order #{order.id}</span>
                      <span className="text-slate-400 ml-2">• Date: {order.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                        {order.status}
                      </span>
                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 hover:bg-blue-100 rounded-xl font-bold flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" /> View Invoice
                      </button>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 object-contain rounded-lg border p-1" />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.product.name}</p>
                            <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-extrabold text-slate-900 dark:text-white">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-500">Tracking: <strong className="text-slate-900 dark:text-white">{order.trackingNumber}</strong></span>
                    <div className="text-sm font-black text-blue-600 dark:text-cyan-400">Total: {formatCurrency(order.totalAmount)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'repairs' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Active & Past Service Appointments</h2>
          {serviceBookings.length === 0 ? (
            <p className="text-xs text-slate-500">No service bookings registered yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceBookings.map(b => (
                <div key={b.id} className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-600 dark:text-cyan-400">Booking ID: {b.id}</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">{b.status}</span>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white">{b.serviceType}</p>
                  <p className="text-slate-500">Device: {b.deviceModel}</p>
                  <p className="text-slate-500">Date: {b.preferredDate} ({b.preferredTime})</p>
                  <Link
                    to={`/track?id=${b.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-cyan-400 underline pt-1"
                  >
                    Open Live Timeline Tracker <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Invoice Modal Handler */}
      <InvoiceModal
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
      />

    </div>
  );
};
