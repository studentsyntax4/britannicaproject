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
      <div className="relative overflow-hidden bg-[#EFE7D6]">
        <div className="checker-strip absolute inset-0 opacity-[0.15]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex items-center gap-2 text-sm text-[#6B6258] mb-3">
            <Link to="/" className="hover:text-[#D97E90]">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#D97E90]">Shop</Link>
            {activeCat && (<><span>/</span><span className="text-[#2F5741] font-medium">{activeCat.name}</span></>)}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-[#2F5741]">{activeCat ? activeCat.name : 'Shop All Treats'}</h1>
          <p className="mt-2 text-[#5A5148] max-w-lg">{activeCat ? activeCat.blurb : 'Every crunchy, creamy, chocolatey thing we make — all in one place.'}</p>
        </div>
      </div>

      {/* Category chips */}
      <div className="sticky top-[70px] z-30 bg-[#F7F1E8]/95 backdrop-blur border-b border-[#E4D8C4]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-3 overflow-x-auto">
          <Link to="/shop" className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category ? 'bg-[#2F5741] text-white' : 'bg-white text-[#2F5741] border border-[#E4D8C4] hover:border-[#D97E90]'}`}>All</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/shop/${c.id}`} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === c.id ? 'bg-[#2F5741] text-white' : 'bg-white text-[#2F5741] border border-[#E4D8C4] hover:border-[#D97E90]'}`}>{c.name}</Link>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-[#6B6258]"><span className="font-semibold text-[#2F5741]">{loading ? '…' : products.length && base.length}</span> treats</p>
        <div className="flex items-center gap-2 text-sm">
          <SlidersHorizontal size={16} className="text-[#6B6258]" />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-white border border-[#E4D8C4] rounded-full px-4 py-2 text-[#2F5741] font-medium outline-none focus:border-[#D97E90] cursor-pointer">
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {loading ? (
          <ProductSkeleton count={8} />
        ) : sorted.length === 0 ? (
          <p className="text-center text-[#6B6258] py-16">No treats found here yet.</p>
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
