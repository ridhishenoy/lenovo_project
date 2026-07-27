import React from 'react';
import { Order } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { Printer, X } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181512]/80 backdrop-blur-md">
      <div className="bg-[#FFFDF8] dark:bg-[#221D19] border border-[#D8CFC2] dark:border-[#4A433D] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Action bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D8CFC2]/60 dark:border-[#4A433D]/60 print:hidden">
          <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#6F665F] dark:text-[#C5BFB8]">
            Official Invoice #{order.id}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold text-xs rounded-full flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" /> Print Invoice
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#6F665F] hover:bg-[#EEE6DA] dark:hover:bg-[#2B2520]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="pt-6 space-y-6 text-xs text-[#2D241E] dark:text-[#F5F2ED]">
          {/* Top Invoice Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 text-xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
                <div className="w-8 h-8 rounded-xl bg-[#3F5B43] dark:bg-[#8FAE83] text-white dark:text-[#181512] flex items-center justify-center font-bold text-sm">S</div>
                <span>SHENOY COMPUTERS</span>
              </div>
              <p className="text-[11px] text-[#6F665F] dark:text-[#C5BFB8] mt-2 leading-relaxed">
                Shenoy Computers Hardware Retail & Service Atelier<br />
                450 Grand Avenue, Silicon Quarter, NY 10001<br />
                GSTIN / Tax ID: IN-9841203-SC
              </p>
            </div>

            <div className="text-right">
              <span className="text-xl font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83]">OFFICIAL INVOICE</span>
              <p className="text-xs font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED] mt-1">
                Invoice #: {order.id}<br />
                Date: {order.date}
              </p>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-[#EEE6DA]/30 dark:bg-[#181512] rounded-2xl border border-[#D8CFC2]/60 dark:border-[#4A433D]/60 text-xs">
            <div>
              <span className="font-bold text-[#6F665F] dark:text-[#C5BFB8] block mb-1">Billed To:</span>
              <p className="font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">Alex Morgan</p>
              <p className="text-[#6F665F] dark:text-[#C5BFB8]">{order.shippingAddress}</p>
            </div>
            <div>
              <span className="font-bold text-[#6F665F] dark:text-[#C5BFB8] block mb-1">Payment Method:</span>
              <p className="font-semibold text-[#2D241E] dark:text-[#F5F2ED]">{order.paymentMethod}</p>
              <p className="text-[11px] text-[#5E8C61] dark:text-[#76A46E] font-bold mt-1">Payment Status: Paid / Verified</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="divide-y divide-[#D8CFC2]/60 dark:divide-[#4A433D]/60 border-y border-[#D8CFC2]/60 dark:border-[#4A433D]/60 py-2">
            <div className="grid grid-cols-4 font-serif font-bold text-xs text-[#6F665F] dark:text-[#C5BFB8] py-2">
              <span className="col-span-2">Item Description</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Price</span>
            </div>

            {order.items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-4 text-xs py-3 items-center">
                <span className="col-span-2 font-serif font-semibold text-[#2D241E] dark:text-[#F5F2ED]">{item.product.name}</span>
                <span className="text-center font-bold text-[#2D241E] dark:text-[#F5F2ED]">{item.quantity}</span>
                <span className="text-right font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-1.5 text-right text-xs pt-2">
            <div className="flex justify-end gap-6 text-[#6F665F] dark:text-[#C5BFB8]">
              <span>Subtotal:</span>
              <span className="font-bold text-[#2D241E] dark:text-[#F5F2ED]">{formatCurrency(order.totalAmount + order.discountAmount)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-end gap-6 text-[#5E8C61]">
                <span>Discount / Voucher Applied:</span>
                <span className="font-bold">-{formatCurrency(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-end gap-6 text-base font-serif font-bold text-[#3F5B43] dark:text-[#8FAE83] pt-2 border-t border-[#D8CFC2]/60 dark:border-[#4A433D]/60">
              <span>Total Paid:</span>
              <span>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
