import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Star, ArrowLeft, Heart, Truck, Leaf, ShieldCheck } from 'lucide-react';
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
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 text-center text-[#6B6258]">Loading treat…</div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 text-center">
        <h1 className="font-display text-3xl font-black text-[#2F5741]">Treat not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-[#D97E90] font-semibold">Back to shop →</Link>
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
    toast.success(`${label} added to basket ♥`);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-medium text-[#6B6258] hover:text-[#D97E90] transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="relative">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#EFE7D6]">
            <div className="absolute inset-0 checker-strip opacity-20" />
            <img src={product.img} alt={product.name} className="relative w-full h-full object-cover" />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-[#2F5741] text-[#F2C9D1] text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full">{product.tag}</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <Link to={`/shop/${product.category}`} className="text-sm font-semibold text-[#D97E90] uppercase tracking-wide">{cat?.name}</Link>
          <h1 className="font-display text-4xl md:text-5xl font-black text-[#2F5741] mt-2 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex gap-0.5 text-[#E7A33B]">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} fill="currentColor" />)}</div>
            <span className="text-sm text-[#6B6258]">{product.rating} · {product.reviews} reviews</span>
          </div>
          <p className="mt-5 text-[#5A5148] text-lg leading-relaxed">{product.desc}</p>
          <div className="mt-6 font-display font-black text-4xl text-[#2F5741]">₹{product.price}</div>

          {/* Add-ons */}
          <div className="mt-7">
            <p className="font-semibold text-[#2F5741] mb-3">Make it extra special</p>
            <div className="grid grid-cols-2 gap-2">
              {ADDONS.map((a) => {
                const on = addons.find((x) => x.id === a.id);
                return (
                  <button key={a.id} onClick={() => toggleAddon(a)} className={`text-left px-4 py-3 rounded-2xl border-2 transition-all ${on ? 'border-[#D97E90] bg-[#F2C9D1]/40' : 'border-[#E4D8C4] bg-white hover:border-[#D97E90]'}`}>
                    <span className="block text-sm font-medium text-[#2F5741]">{a.name}</span>
                    <span className="text-xs text-[#6B6258]">+₹{a.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Qty + add */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-[#E4D8C4] rounded-full px-3 py-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 rounded-full bg-[#F2C9D1] text-[#2F5741] flex items-center justify-center hover:bg-[#E79AAA]"><Minus size={16} /></button>
              <span className="w-8 text-center font-bold text-[#2F5741]">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 rounded-full bg-[#F2C9D1] text-[#2F5741] flex items-center justify-center hover:bg-[#E79AAA]"><Plus size={16} /></button>
            </div>
            <button onClick={add} className="flex-1 py-4 rounded-full bg-[#2F5741] text-white font-semibold hover:bg-[#264a37] transition-colors flex items-center justify-center gap-2">
              <Heart size={18} /> Add to basket · ₹{total}
            </button>
          </div>

          {/* Assurance */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[
              { i: <Truck size={20} />, t: 'Free over ₹499' },
              { i: <Leaf size={20} />, t: 'No artificial colours' },
              { i: <ShieldCheck size={20} />, t: 'Made fresh' },
            ].map((v, i) => (
              <div key={i} className="bg-[#EFE7D6] rounded-2xl py-4 flex flex-col items-center gap-2">
                <span className="text-[#2F5741]">{v.i}</span>
                <span className="text-xs font-medium text-[#5A5148]">{v.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <h2 className="font-display text-3xl font-black text-[#2F5741] mb-8">You might also love</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
