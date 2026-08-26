import React, { useEffect, useState } from 'react';
import { Loader2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { getAdminOrders, updateOrderStatus } from '../../lib/adminApi';

const STATUS = [
  { id: 'confirmed', label: 'Confirmed', cls: 'bg-[#F5E0A8] text-[#7A5B00]' },
  { id: 'packed', label: 'Packed', cls: 'bg-[#CFE0F5] text-[#1F4E79]' },
  { id: 'out_for_delivery', label: 'Out for delivery', cls: 'bg-[#F2C9D1] text-[#8A2E43]' },
  { id: 'delivered', label: 'Delivered', cls: 'bg-[#CDE0BE] text-[#2F5741]' },
  { id: 'cancelled', label: 'Cancelled', cls: 'bg-[#E7C4C4] text-[#8A2E2E]' },
];
const clsFor = (s) => (STATUS.find((x) => x.id === s) || STATUS[0]).cls;
const labelFor = (s) => (STATUS.find((x) => x.id === s) || {}).label || s;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);

  const load = () => {
    setLoading(true);
    getAdminOrders().then(setOrders).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const change = async (orderNumber, status) => {
    try {
      const updated = await updateOrderStatus(orderNumber, status);
      setOrders((prev) => prev.map((o) => (o.order_number === orderNumber ? { ...o, status: updated.status } : o)));
      toast.success(`Order ${orderNumber} → ${labelFor(status)}`);
    } catch {
      toast.error('Could not update status');
    }
  };

  if (loading) return <div className="py-20 text-center text-[#6B6258] flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={18} /> Loading orders…</div>;
  if (orders.length === 0) return <div className="py-20 text-center text-[#6B6258]">No orders yet.</div>;

  return (
    <div className="bg-white rounded-2xl border border-[#EBE0CE] overflow-hidden">
      <div className="hidden md:grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1.4fr] gap-4 px-6 py-4 bg-[#EFE7D6] text-xs font-bold uppercase tracking-wide text-[#6B6258]">
        <span>Order</span><span>Customer</span><span>Items</span><span>Total</span><span>Status</span>
      </div>
      <div className="divide-y divide-[#EFE7D6]">
        {orders.map((o) => (
          <div key={o.order_number}>
            <div className="grid md:grid-cols-[1.2fr_1.5fr_1fr_1fr_1.4fr] gap-2 md:gap-4 px-6 py-4 items-center">
              <div>
                <button onClick={() => setOpen(open === o.order_number ? null : o.order_number)} className="font-semibold text-[#2F5741] flex items-center gap-1 hover:text-[#D97E90]">
                  #{o.order_number} <ChevronDown size={15} className={`transition-transform ${open === o.order_number ? 'rotate-180' : ''}`} />
                </button>
                <div className="text-xs text-[#6B6258]">{new Date(o.created_at).toLocaleDateString()} · COD</div>
              </div>
              <div className="text-sm text-[#2F5741]">
                <div className="font-medium">{o.customer.name}</div>
                <div className="text-xs text-[#6B6258]">{o.customer.phone}</div>
              </div>
              <div className="text-sm text-[#6B6258]">{o.items.reduce((s, i) => s + i.qty, 0)} items</div>
              <div className="font-display font-bold text-[#2F5741]">₹{o.total}</div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${clsFor(o.status)}`}>{labelFor(o.status)}</span>
                <select value={o.status} onChange={(e) => change(o.order_number, e.target.value)} className="text-xs bg-white border border-[#E4D8C4] rounded-lg px-2 py-1.5 text-[#2F5741] outline-none focus:border-[#D97E90] cursor-pointer">
                  {STATUS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
            </div>
            {open === o.order_number && (
              <div className="px-6 pb-5 -mt-1">
                <div className="bg-[#F7F1E8] rounded-xl p-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#6B6258] mb-2">Items</p>
                    <ul className="space-y-1 text-sm text-[#2F5741]">
                      {o.items.map((i, idx) => (
                        <li key={idx} className="flex justify-between"><span>{i.qty} × {i.name}</span><span>₹{i.price * i.qty}</span></li>
                      ))}
                      <li className="flex justify-between border-t border-[#E4D8C4] pt-1 mt-1"><span>Shipping</span><span>{o.shipping === 0 ? 'FREE' : `₹${o.shipping}`}</span></li>
                      <li className="flex justify-between font-bold"><span>Total</span><span>₹{o.total}</span></li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#6B6258] mb-2">Delivery to</p>
                    <p className="text-sm text-[#2F5741]">{o.customer.name}</p>
                    <p className="text-sm text-[#6B6258]">{o.customer.address}{o.customer.city ? `, ${o.customer.city}` : ''} {o.customer.pin}</p>
                    <p className="text-sm text-[#6B6258]">{o.customer.phone} · {o.customer.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
