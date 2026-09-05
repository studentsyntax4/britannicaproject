import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../mock';

const dot = {
  'tarri-poha': '#C8641E',
  snacks: '#8A5A2B',
  barfi: '#EE9642',
};

const CategoryStrip = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="font-poster text-sm tracking-[0.2em] text-[#C8641E] mb-1">EXPLORE THE MENU</p>
          <h2 className="font-display text-3xl md:text-4xl font-black text-[#3E2417]">Shop by category</h2>
        </div>
        <Link to="/shop" className="hidden sm:inline text-sm font-semibold text-[#3E2417] hover:text-[#C8641E] transition-colors">View all →</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            to={`/shop/${c.id}`}
            className="group relative overflow-hidden rounded-3xl p-6 md:p-8 min-h-[160px] flex flex-col justify-end bg-white border border-[#E7D6B4] hover:border-[#C8641E] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-4 right-4 w-14 h-14 rounded-2xl spice-dots opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
            <span className="w-3 h-3 rounded-full mb-3" style={{ background: dot[c.id] }} />
            <h3 className="font-display text-xl md:text-2xl font-bold text-[#3E2417] group-hover:text-[#C8641E] transition-colors">{c.name}</h3>
            <p className="text-sm text-[#7A6A55] mt-1">{c.blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryStrip;
