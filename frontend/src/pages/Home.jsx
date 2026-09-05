import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Leaf, Clock, MapPin, Flame } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import CategoryStrip from '../components/CategoryStrip';
import LocationMap from '../components/LocationMap';
import Logo from '../components/Logo';

const Home = () => {
  const { products, loading, bestsellers, byCategory } = useProducts();
  const heroImg = products.find((p) => p.name === 'Classic Tarri Poha')?.img || products[0]?.img;
  const barfiImg = products.find((p) => p.category === 'barfi')?.img;
  const featured = bestsellers();
  const poha = byCategory('tarri-poha').slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="spice-dots absolute inset-0 opacity-[0.10]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 bg-[#F6DCB8] text-[#3E2417] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <MapPin size={14} /> Nagpur
            </span>
            <h1 className="font-display font-black text-[#3E2417] leading-[0.92] text-5xl md:text-6xl xl:text-7xl">
              Tarri
              <span className="block italic font-medium text-[#C8641E] text-4xl md:text-5xl xl:text-6xl my-1">and</span>
              Treacle
            </h1>
            <p className="mt-5 text-lg text-[#5A4636] max-w-md">
              Zesty Nagpur tarri poha, crispy street snacks & melt-in-mouth santra barfi. <span className="font-semibold text-[#3E2417]">Desi flavours, sweet moments.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#3E2417] text-white font-semibold hover:bg-[#2C1810] transition-all hover:gap-3">
                Order now <ArrowRight size={18} />
              </Link>
              <Link to="/shop/tarri-poha" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-[#3E2417] text-[#3E2417] font-semibold hover:bg-[#F6DCB8] transition-colors">
                Our Tarri Poha
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-[#5A4636]">
              <span className="flex items-center gap-1.5"><Flame size={16} className="text-[#C8641E]" /> Made fresh</span>
              <span className="flex items-center gap-1.5"><Clock size={16} className="text-[#C8641E]" /> 8AM – 10PM</span>
              <span className="flex items-center gap-1.5"><Leaf size={16} className="text-[#C8641E]" /> Pure veg</span>
            </div>
          </div>

          <div className="relative fade-up" style={{ animationDelay: '120ms' }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-4 rounded-full checker-pink-green opacity-95" />
              <div className="absolute inset-8 rounded-full bg-[#F5EBD6]" />
              {heroImg && <img src={heroImg} alt="Tarri Poha" className="absolute inset-10 w-[calc(100%-5rem)] h-[calc(100%-5rem)] object-cover rounded-full shadow-2xl" />}
              <div className="absolute -top-2 -right-2 w-24 h-24 rounded-full bg-white shadow-xl flex flex-col items-center justify-center text-center float-slow">
                <Flame size={20} className="text-[#C8641E]" />
                <span className="text-[9px] font-bold text-[#3E2417] uppercase tracking-wide leading-tight mt-1">Freshly<br />Made</span>
              </div>
              <div className="absolute -bottom-2 -left-2 bg-[#3E2417] text-white px-5 py-3 rounded-2xl shadow-xl">
                <span className="font-display font-bold text-lg">from ₹50</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value ticker band */}
      <div className="checker-strip h-3" />
      <div className="bg-[#3E2417] text-[#EEC79A] py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm font-medium">
          {[
            { i: <Leaf size={18} />, t: '100% Vegetarian' },
            { i: <Clock size={18} />, t: 'Made Fresh Daily' },
            { i: <Heart size={18} />, t: 'Made with Love' },
            { i: <MapPin size={18} />, t: 'Nagpur Street Food' },
          ].map((v, i) => (
            <div key={i} className="flex items-center justify-center gap-2"><span className="text-[#EDBE85]">{v.i}</span>{v.t}</div>
          ))}
        </div>
      </div>

      <CategoryStrip />

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-poster text-sm tracking-[0.2em] text-[#C8641E] mb-1">CROWD FAVOURITES</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#3E2417]">Bestsellers & new arrivals</h2>
          </div>
          <Link to="/shop" className="hidden sm:inline text-sm font-semibold text-[#3E2417] hover:text-[#C8641E] transition-colors">Full menu →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {loading ? <ProductSkeleton count={8} /> : featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Signature banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="rounded-[2rem] overflow-hidden grid md:grid-cols-2 items-stretch bg-[#EFE2C9]">
          <div className="p-8 md:p-14 flex flex-col justify-center">
            <span className="font-poster text-sm tracking-[0.2em] text-[#C8641E] mb-2">OUR SIGNATURE</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#3E2417] leading-tight">The Legendary<br />Tarri Poha</h2>
            <p className="mt-4 text-[#5A4636] max-w-md">Fluffy poha drowned in fiery Nagpuri tarri, crowned with sev, peanuts, onion & a squeeze of lime. Classic, cheesy or extra-jhal — your call.</p>
            <Link to="/shop/tarri-poha" className="mt-7 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#3E2417] text-white font-semibold w-fit hover:bg-[#2C1810] transition-all hover:gap-3">
              Explore poha <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative min-h-[280px] checker-pink-green">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              {poha[0] && <img src={poha[0].img} alt="Signature tarri poha" className="w-full h-full object-cover rounded-3xl shadow-2xl float-slow" />}
            </div>
          </div>
        </div>
      </section>

      {/* Poha grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {poha.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Santra barfi promo */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="rounded-[2rem] bg-[#3E2417] text-white overflow-hidden grid md:grid-cols-2 items-center">
          <div className="relative min-h-[300px] order-2 md:order-1">
            {barfiImg && <img src={barfiImg} alt="Santra orange barfi" className="w-full h-full object-cover" />}
          </div>
          <div className="p-8 md:p-14 order-1 md:order-2">
            <Logo size={54} />
            <h2 className="font-display text-4xl md:text-5xl font-black mt-5 leading-tight">Sweet moments,<span className="text-[#EDBE85]"> santra barfi</span></h2>
            <p className="mt-4 text-[#C9B291] max-w-md">Nagpur’s beloved orange barfi — soft, melt-in-mouth and infused with fresh santra zest. Classic, pistachio, coconut or loaded with dry fruits.</p>
            <Link to="/shop/barfi" className="mt-7 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#C8641E] text-white font-semibold w-fit hover:bg-[#A9531A] transition-all hover:gap-3">
              Shop barfi <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Visit us / location map */}
      <LocationMap />
    </div>
  );
};

export default Home;
