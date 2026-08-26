import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../mock';

const emojiless = {
  'chocolate-crackers': '#4A2A18',
  'sweet-crackers': '#D97E90',
  cakes: '#E79AAA',
  shakes: '#7FA06A',
  chocolates: '#4A2A18',
  packs: '#2F5741',
};

const CategoryStrip = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="font-poster text-sm tracking-[0.2em] text-[#D97E90] mb-1">EXPLORE THE MENU</p>
          <h2 className="font-display text-3xl md:text-4xl font-black text-[#2F5741]">Shop by category</h2>
        </div>
        <Link to="/shop" className="hidden sm:inline text-sm font-semibold text-[#2F5741] hover:text-[#D97E90] transition-colors">View all →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CATEGORIES.map((c, i) => (
          <Link
            key={c.id}
            to={`/shop/${c.id}`}
            className="group relative overflow-hidden rounded-3xl p-6 md:p-8 min-h-[150px] flex flex-col justify-end bg-white border border-[#EBE0CE] hover:border-[#D97E90] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-4 right-4 w-14 h-14 rounded-2xl checker-strip opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
            <span className="w-3 h-3 rounded-full mb-3" style={{ background: emojiless[c.id] }} />
            <h3 className="font-display text-xl md:text-2xl font-bold text-[#2F5741] group-hover:text-[#D97E90] transition-colors">{c.name}</h3>
            <p className="text-sm text-[#6B6258] mt-1">{c.blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryStrip;
