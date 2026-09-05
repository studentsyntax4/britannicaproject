import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../mock';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'low', label: 'Price: Low to High' },
  { id: 'high', label: 'Price: High to Low' },
  { id: 'name', label: 'Name A–Z' },
];

const Shop = () => {
  const { category } = useParams();
  const [sort, setSort] = useState('featured');
  const { products, loading, byCategory } = useProducts();

  const activeCat = CATEGORIES.find((c) => c.id === category);
  const base = category ? byCategory(category) : products;

  const sorted = useMemo(() => {
    const arr = [...base];
    if (sort === 'low') arr.sort((a, b) => a.price - b.price);
    if (sort === 'high') arr.sort((a, b) => b.price - a.price);
    if (sort === 'name') arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [base, sort]);

  return (
    <div>
      {/* Header banner */}
      <div className="relative overflow-hidden bg-[#EFE2C9]">
        <div className="spice-dots absolute inset-0 opacity-[0.14]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex items-center gap-2 text-sm text-[#7A6A55] mb-3">
            <Link to="/" className="hover:text-[#C8641E]">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#C8641E]">Menu</Link>
            {activeCat && (<><span>/</span><span className="text-[#3E2417] font-medium">{activeCat.name}</span></>)}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-[#3E2417]">{activeCat ? activeCat.name : 'Full Menu'}</h1>
          <p className="mt-2 text-[#5A4636] max-w-lg">{activeCat ? activeCat.blurb : 'Every zesty, crispy and sweet thing we make — all in one place.'}</p>
        </div>
      </div>

      {/* Category chips */}
      <div className="sticky top-[70px] z-30 bg-[#F5EBD6]/95 backdrop-blur border-b border-[#E4D2B0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-3 overflow-x-auto">
          <Link to="/shop" className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category ? 'bg-[#3E2417] text-white' : 'bg-white text-[#3E2417] border border-[#E4D2B0] hover:border-[#C8641E]'}`}>All</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/shop/${c.id}`} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === c.id ? 'bg-[#3E2417] text-white' : 'bg-white text-[#3E2417] border border-[#E4D2B0] hover:border-[#C8641E]'}`}>{c.name}</Link>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-[#7A6A55]"><span className="font-semibold text-[#3E2417]">{loading ? '…' : base.length}</span> items</p>
        <div className="flex items-center gap-2 text-sm">
          <SlidersHorizontal size={16} className="text-[#7A6A55]" />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-white border border-[#E4D2B0] rounded-full px-4 py-2 text-[#3E2417] font-medium outline-none focus:border-[#C8641E] cursor-pointer">
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {loading ? (
          <ProductSkeleton count={8} />
        ) : sorted.length === 0 ? (
          <p className="text-center text-[#7A6A55] py-16">No items found here yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sorted.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
