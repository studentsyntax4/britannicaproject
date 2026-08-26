import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Leaf, Sparkles, Truck, Gift, Star } from 'lucide-react';
import { PRODUCTS, bestsellers, byCategory } from '../mock';
import ProductCard from '../components/ProductCard';
import CategoryStrip from '../components/CategoryStrip';
import Logo from '../components/Logo';

const Home = () => {
  const heroImg = PRODUCTS.find((p) => p.name === 'Classic Chocolate').img;
  const packImg = PRODUCTS.find((p) => p.name === 'Premium Gift Box (72 pcs)').img;
  const featured = bestsellers();
  const crackers = byCategory('chocolate-crackers').slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="checker-strip absolute inset-0 opacity-[0.12]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 bg-[#F2C9D1] text-[#2F5741] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Sparkles size={14} /> Now available online
            </span>
            <h1 className="font-display font-black text-[#2F5741] leading-[0.92] text-5xl md:text-6xl xl:text-7xl">
              Crackers
              <span className="block italic font-medium text-[#D97E90] text-4xl md:text-5xl xl:text-6xl my-1">and</span>
              Checkers
            </h1>
            <p className="mt-5 text-lg text-[#5A5148] max-w-md">
              Chocolate-coated crackers, dreamy cakes & creamy shakes. <span className="font-semibold text-[#2F5741]">Crunch it. Love it. Repeat.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#2F5741] text-white font-semibold hover:bg-[#264a37] transition-all hover:gap-3">
                Shop treats <ArrowRight size={18} />
              </Link>
              <Link to="/shop/chocolate-crackers" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-[#2F5741] text-[#2F5741] font-semibold hover:bg-[#F2C9D1] transition-colors">
                Our signature crackers
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-[#5A5148]">
              <span className="flex items-center gap-1.5"><Star size={16} className="text-[#E7A33B]" fill="currentColor" /> 4.8 rating</span>
              <span className="flex items-center gap-1.5"><Truck size={16} className="text-[#7FA06A]" /> Free over ₹499</span>
              <span className="flex items-center gap-1.5"><Leaf size={16} className="text-[#7FA06A]" /> No artificial colours</span>
            </div>
          </div>

          <div className="relative fade-up" style={{ animationDelay: '120ms' }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-4 rounded-full checker-pink-green opacity-90" />
              <div className="absolute inset-8 rounded-full bg-[#F7F1E8]" />
              <img src={heroImg} alt="Chocolate crackers" className="absolute inset-10 w-[calc(100%-5rem)] h-[calc(100%-5rem)] object-cover rounded-full shadow-2xl" />
              <div className="absolute -top-2 -right-2 w-24 h-24 rounded-full bg-white shadow-xl flex flex-col items-center justify-center text-center float-slow">
                <span className="font-poster text-[#D97E90] text-lg leading-none">100%</span>
                <span className="text-[9px] font-bold text-[#2F5741] uppercase tracking-wide leading-tight mt-1">Crunch<br />Happiness</span>
              </div>
              <div className="absolute -bottom-2 -left-2 bg-[#2F5741] text-white px-5 py-3 rounded-2xl shadow-xl">
                <span className="font-display font-bold text-lg">from ₹35</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value ticker band */}
      <div className="checker-strip h-3" />
      <div className="bg-[#2F5741] text-[#F2C9D1] py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm font-medium">
          {[
            { i: <Sparkles size={18} />, t: 'Made Fresh Daily' },
            { i: <Leaf size={18} />, t: 'No Preservatives' },
            { i: <Heart size={18} />, t: 'Made with Love' },
            { i: <Gift size={18} />, t: 'Perfect for Gifting' },
          ].map((v, i) => (
            <div key={i} className="flex items-center justify-center gap-2"><span className="text-[#F2C9D1]">{v.i}</span>{v.t}</div>
          ))}
        </div>
      </div>

      <CategoryStrip />

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-poster text-sm tracking-[0.2em] text-[#D97E90] mb-1">CROWD FAVOURITES</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#2F5741]">Bestsellers & new drops</h2>
          </div>
          <Link to="/shop" className="hidden sm:inline text-sm font-semibold text-[#2F5741] hover:text-[#D97E90] transition-colors">Shop all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Signature banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="rounded-[2rem] overflow-hidden grid md:grid-cols-2 items-stretch bg-[#EFE7D6]">
          <div className="p-8 md:p-14 flex flex-col justify-center">
            <span className="font-poster text-sm tracking-[0.2em] text-[#D97E90] mb-2">OUR SIGNATURE</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#2F5741] leading-tight">Chocolate<br />Coated Crackers</h2>
            <p className="mt-4 text-[#5A5148] max-w-md">Crispy crackers dunked in rich chocolate, in 10 dreamy flavours — from Classic Chocolate to Matcha Crunch. Crunch outside, sweet inside.</p>
            <Link to="/shop/chocolate-crackers" className="mt-7 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#2F5741] text-white font-semibold w-fit hover:bg-[#264a37] transition-all hover:gap-3">
              Explore flavours <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative min-h-[280px] checker-pink-green">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <img src={crackers[0].img} alt="Signature crackers" className="w-full h-full object-cover rounded-3xl shadow-2xl float-slow" />
            </div>
          </div>
        </div>
      </section>

      {/* Flavour grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {crackers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Gift box promo */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="rounded-[2rem] bg-[#2F5741] text-white overflow-hidden grid md:grid-cols-2 items-center">
          <div className="relative min-h-[300px] order-2 md:order-1">
            <img src={packImg} alt="Premium gift box" className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-14 order-1 md:order-2">
            <Logo size={54} />
            <h2 className="font-display text-4xl md:text-5xl font-black mt-5 leading-tight">Gift the crunch<span className="text-[#F2C9D1]"> happiness</span></h2>
            <p className="mt-4 text-[#CBD8C6] max-w-md">Beautiful checkerboard boxes packed with treats. From Single Packs to the Premium Gift Box of 72 — perfect for every celebration.</p>
            <Link to="/shop/packs" className="mt-7 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#F2C9D1] text-[#2F5741] font-semibold w-fit hover:bg-[#E79AAA] transition-all hover:gap-3">
              Shop gift boxes <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-20">
        <div className="text-center mb-10">
          <p className="font-poster text-sm tracking-[0.2em] text-[#D97E90] mb-1">SWEET WORDS</p>
          <h2 className="font-display text-3xl md:text-4xl font-black text-[#2F5741]">Loved by crunch lovers</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: 'Ananya R.', t: 'The Salted Caramel crackers are dangerously addictive. Crunchy, sweet, perfect!' },
            { n: 'Rohan M.', t: 'Ordered the Premium Gift Box for a birthday — the checkerboard packaging is gorgeous.' },
            { n: 'Priya S.', t: 'Strawberry Blush + a Cold Coffee = my new happy place. Fresh and delicious every time.' },
          ].map((r, i) => (
            <div key={i} className="bg-white rounded-3xl p-7 border border-[#EBE0CE]">
              <div className="flex gap-1 text-[#E7A33B] mb-3">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} fill="currentColor" />)}</div>
              <p className="text-[#5A5148] leading-relaxed">“{r.t}”</p>
              <p className="mt-4 font-semibold text-[#2F5741]">{r.n}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
