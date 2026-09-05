import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Star, ArrowLeft, ShoppingBag, Leaf, Clock, Flame } from 'lucide-react';
import { toast } from 'sonner';
import { CATEGORIES, ADDONS } from '../mock';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { getProduct, byCategory, loading } = useProducts();
  const product = getProduct(id);
  const [qty, setQty] = useState(1);
  const [addons, setAddons] = useState([]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 text-center text-[#7A6A55]">Loading…</div>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 text-center">
        <h1 className="font-display text-3xl font-black text-[#3E2417]">Item not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-[#C8641E] font-semibold">Back to menu →</Link>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.id === product.category);
  const related = byCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);
  const addonTotal = addons.reduce((s, a) => s + a.price, 0);
  const total = (product.price + addonTotal) * qty;

  const toggleAddon = (a) => {
    setAddons((prev) => (prev.find((x) => x.id === a.id) ? prev.filter((x) => x.id !== a.id) : [...prev, a]));
  };

  const add = () => {
    const label = addons.length ? `${product.name} (+${addons.length} add-on${addons.length > 1 ? 's' : ''})` : product.name;
    addItem({ ...product, name: label, price: product.price + addonTotal }, qty);
    toast.success(`${label} added to your order ✦`);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-medium text-[#7A6A55] hover:text-[#C8641E] transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="relative">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#EFE2C9]">
            <div className="absolute inset-0 spice-dots opacity-20" />
            <img src={product.img} alt={product.name} className="relative w-full h-full object-cover" />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-[#3E2417] text-[#EDBE85] text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full">{product.tag}</span>
            )}
          </div>
        </div>

        <div>
          <Link to={`/shop/${product.category}`} className="text-sm font-semibold text-[#C8641E] uppercase tracking-wide">{cat?.name}</Link>
          <h1 className="font-display text-4xl md:text-5xl font-black text-[#3E2417] mt-2 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex gap-0.5 text-[#E7A33B]">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} fill="currentColor" />)}</div>
            <span className="text-sm text-[#7A6A55]">{product.rating} · {product.reviews} reviews</span>
          </div>
          <p className="mt-5 text-[#5A4636] text-lg leading-relaxed">{product.desc}</p>
          <div className="mt-6 font-display font-black text-4xl text-[#3E2417]">₹{product.price}</div>

          <div className="mt-7">
            <p className="font-semibold text-[#3E2417] mb-3">Make it your way</p>
            <div className="grid grid-cols-2 gap-2">
              {ADDONS.map((a) => {
                const on = addons.find((x) => x.id === a.id);
                return (
                  <button key={a.id} onClick={() => toggleAddon(a)} className={`text-left px-4 py-3 rounded-2xl border-2 transition-all ${on ? 'border-[#C8641E] bg-[#F6DCB8]/50' : 'border-[#E4D2B0] bg-white hover:border-[#C8641E]'}`}>
                    <span className="block text-sm font-medium text-[#3E2417]">{a.name}</span>
                    <span className="text-xs text-[#7A6A55]">+₹{a.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-[#E4D2B0] rounded-full px-3 py-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 rounded-full bg-[#F6DCB8] text-[#3E2417] flex items-center justify-center hover:bg-[#EDBE85]"><Minus size={16} /></button>
              <span className="w-8 text-center font-bold text-[#3E2417]">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 rounded-full bg-[#F6DCB8] text-[#3E2417] flex items-center justify-center hover:bg-[#EDBE85]"><Plus size={16} /></button>
            </div>
            <button onClick={add} className="flex-1 py-4 rounded-full bg-[#3E2417] text-white font-semibold hover:bg-[#2C1810] transition-colors flex items-center justify-center gap-2">
              <ShoppingBag size={18} /> Add to order · ₹{total}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[
              { i: <Clock size={20} />, t: 'Made fresh' },
              { i: <Leaf size={20} />, t: '100% veg' },
              { i: <Flame size={20} />, t: 'Nagpur spice' },
            ].map((v, i) => (
              <div key={i} className="bg-[#EFE2C9] rounded-2xl py-4 flex flex-col items-center gap-2">
                <span className="text-[#C8641E]">{v.i}</span>
                <span className="text-xs font-medium text-[#5A4636]">{v.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <h2 className="font-display text-3xl font-black text-[#3E2417] mb-8">You might also love</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
