import React from 'react';
import { Order } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { Printer, Download, X, Cpu, CheckCircle2 } from 'lucide-react';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Action bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 print:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Official Invoice #{order.id}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print Invoice
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="pt-6 space-y-6 text-xs text-slate-800 dark:text-slate-200">
          {/* Top Invoice Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 text-xl font-black text-slate-900 dark:text-white">
                <Cpu className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
                <span>NEXUSTECH</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                NexusTech Computer Store & Services Inc.<br />
                450 Tech Avenue, Silicon Quarter, NY 10001<br />
                Tax ID: US-9841203-NX
              </p>
            </div>

            <div className="text-right">
              <span className="text-lg font-bold text-blue-600 dark:text-cyan-400">INVOICE</span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white mt-1">
                Order ID: {order.id}
              </p>
              <p className="text-[11px] text-slate-500">Date: {order.date}</p>
              <p className="text-[11px] text-emerald-500 font-bold mt-1">STATUS: PAID</p>
            </div>
          </div>

          {/* Billing & Shipping Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div>
              <span className="font-bold uppercase text-[10px] text-slate-400 block mb-1">Billed To</span>
              <p className="font-bold text-slate-900 dark:text-white">Alex Morgan</p>
              <p className="text-[11px] text-slate-500">{order.shippingAddress}</p>
              <p className="text-[11px] text-slate-500">Payment: {order.paymentMethod}</p>
            </div>

            <div>
              <span className="font-bold uppercase text-[10px] text-slate-400 block mb-1">Fulfillment Info</span>
              <p className="text-[11px] text-slate-500">Carrier: Nexus Express Logistics</p>
              <p className="text-[11px] text-slate-500">Tracking: {order.trackingNumber}</p>
              <p className="text-[11px] text-slate-500">Estimated Delivery: 2 Business Days</p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase text-slate-400">
                  <th className="py-2">Item & Description</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 pr-2 font-bold text-slate-900 dark:text-white">
                      {item.product.name}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        Brand: {item.product.brand} • Warranty Included
                      </span>
                    </td>
                    <td className="py-3 text-center font-bold">{item.quantity}</td>
                    <td className="py-3 text-right">{formatCurrency(item.price)}</td>
                    <td className="py-3 text-right font-bold">{formatCurrency(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Breakdown */}
          <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.totalAmount + order.discountAmount)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-500">
                  <span>Voucher Discount:</span>
                  <span>-{formatCurrency(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Shipping & Handling:</span>
                <span className="text-emerald-500 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-sm font-black text-slate-900 dark:text-white">
                <span>Total Paid:</span>
                <span className="text-blue-600 dark:text-cyan-400">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-6 text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
            Thank you for shopping with NexusTech. For warranty or repair service, reference this order ID or call +1 (800) 555-NEXUS.
          </div>
        </div>
      </div>
    </div>
  );
};
