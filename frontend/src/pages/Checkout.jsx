import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, BadgeIndianRupee, Heart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { createOrder } from '../lib/api';

const Field = ({ label, ...props }) => (
  <label className="block">
    <span className="block text-sm font-medium text-[#2F5741] mb-1.5">{label}</span>
    <input {...props} className="w-full px-4 py-3 rounded-xl border border-[#E4D8C4] bg-white text-[#2F5741] outline-none focus:border-[#D97E90] transition-colors" />
  </label>
);

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pin: '' });

  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 40;
  const total = subtotal + shipping;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.phone) {
      toast.error('Please fill in your details');
      return;
    }
    setSubmitting(true);
    try {
      const order = await createOrder({
        customer: form,
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        subtotal,
        shipping,
      });
      setOrderRef(order.order_number);
      setPlaced(true);
      clearCart();
      window.scrollTo({ top: 0 });
    } catch (err) {
      toast.error('Could not place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (placed) {
    return (
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-[#7FA06A] text-white flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={44} />
        </div>
        <h1 className="font-display text-4xl font-black text-[#2F5741]">Order placed! ♥</h1>
        <p className="mt-3 text-[#5A5148]">Thank you for choosing crunchy happiness, {form.name.split(' ')[0] || 'friend'}! Pay with <span className="font-semibold text-[#2F5741]">Cash on Delivery</span> when your treats arrive.</p>
        <div className="mt-6 inline-block bg-[#EFE7D6] rounded-2xl px-6 py-4 text-left">
          <p className="text-sm text-[#6B6258]">Order reference</p>
          <p className="font-display font-bold text-xl text-[#2F5741]">#{orderRef}</p>
        </div>
        <div className="mt-8">
          <Link to="/shop" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#2F5741] text-white font-semibold hover:bg-[#264a37] transition-colors">Continue shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-24 text-center">
        <h1 className="font-display text-3xl font-black text-[#2F5741]">Your basket is empty</h1>
        <p className="mt-2 text-[#5A5148]">Add some treats before checking out.</p>
        <Link to="/shop" className="mt-6 inline-block px-7 py-4 rounded-full bg-[#2F5741] text-white font-semibold hover:bg-[#264a37] transition-colors">Shop treats</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <h1 className="font-display text-4xl font-black text-[#2F5741] mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
        {/* Form */}
        <form onSubmit={placeOrder} className="space-y-5">
          <div className="bg-white rounded-2xl border border-[#EBE0CE] p-6">
            <h2 className="font-display text-xl font-bold text-[#2F5741] mb-4">Contact</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" placeholder="Your name" value={form.name} onChange={set('name')} />
              <Field label="Phone" placeholder="Mobile number" value={form.phone} onChange={set('phone')} />
            </div>
            <div className="mt-4"><Field label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} /></div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EBE0CE] p-6">
            <h2 className="font-display text-xl font-bold text-[#2F5741] mb-4">Delivery address</h2>
            <Field label="Address" placeholder="House no, street, area" value={form.address} onChange={set('address')} />
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <Field label="City" placeholder="City" value={form.city} onChange={set('city')} />
              <Field label="PIN code" placeholder="000000" value={form.pin} onChange={set('pin')} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EBE0CE] p-6">
            <h2 className="font-display text-xl font-bold text-[#2F5741] mb-4">Payment method</h2>
            <div className="flex items-center gap-4 border-2 border-[#7FA06A] bg-[#7FA06A]/10 rounded-2xl px-4 py-4">
              <div className="w-11 h-11 rounded-full bg-[#7FA06A] text-white flex items-center justify-center shrink-0">
                <BadgeIndianRupee size={22} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#2F5741]">Cash on Delivery</p>
                <p className="text-sm text-[#6B6258]">Pay in cash when your treats arrive at your door.</p>
              </div>
              <span className="w-5 h-5 rounded-full border-[6px] border-[#2F5741]" />
            </div>
            <p className="mt-3 text-xs text-[#6B6258]">Cash on Delivery is currently the only accepted payment method.</p>
          </div>

          <button type="submit" disabled={submitting} className="w-full py-4 rounded-full bg-[#2F5741] text-white font-semibold hover:bg-[#264a37] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            {submitting ? <><Loader2 size={18} className="animate-spin" /> Placing order…</> : <><Heart size={18} /> Place order (COD) · ₹{total}</>}
          </button>
        </form>

        {/* Summary */}
        <div>
          <div className="bg-[#EFE7D6] rounded-2xl p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold text-[#2F5741] mb-4">Order summary</h2>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3 items-center">
                  <div className="relative">
                    <img src={i.img} alt={i.name} className="w-14 h-14 rounded-xl object-cover" />
                    <span className="absolute -top-2 -right-2 bg-[#2F5741] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{i.qty}</span>
                  </div>
                  <span className="flex-1 text-sm text-[#2F5741] font-medium leading-tight">{i.name}</span>
                  <span className="text-sm font-semibold text-[#2F5741]">₹{i.price * i.qty}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E4D8C4] mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-[#6B6258]"><span>Subtotal</span><span className="font-medium text-[#2F5741]">₹{subtotal}</span></div>
              <div className="flex justify-between text-[#6B6258]"><span>Shipping</span><span className="font-medium text-[#2F5741]">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              <div className="flex justify-between text-lg font-bold text-[#2F5741] pt-2 border-t border-[#E4D8C4]"><span>Total</span><span>₹{total}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
