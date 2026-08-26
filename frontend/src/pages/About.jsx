import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Leaf, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#EFE7D6]">
        <div className="checker-strip absolute inset-0 opacity-[0.15]" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <div className="flex justify-center mb-6"><Logo size={72} /></div>
          <p className="font-poster text-sm tracking-[0.25em] text-[#D97E90] mb-3">OUR STORY</p>
          <h1 className="font-display text-4xl md:text-6xl font-black text-[#2F5741] leading-tight">
            Sweet moments,<br /><span className="italic font-medium text-[#D97E90]">made for you</span>
          </h1>
          <p className="mt-6 text-lg text-[#5A5148] max-w-2xl mx-auto">
            Crackers and Checkers began with a simple idea — that a little crunch can make any moment sweeter. We craft chocolate-coated crackers, dreamy cakes and creamy shakes with the finest cocoa and lots of love.
          </p>
        </div>
      </section>

      {/* Story split */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 checker-pink-green" />
          <img src="https://images.unsplash.com/photo-1633997455043-434ee7ca3e1a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" alt="Chocolate crackers" className="absolute inset-6 w-[calc(100%-3rem)] h-[calc(100%-3rem)] object-cover rounded-3xl shadow-2xl" />
        </div>
        <div>
          <p className="font-poster text-sm tracking-[0.2em] text-[#D97E90] mb-2">CRUNCH IT. LOVE IT. REPEAT.</p>
          <h2 className="font-display text-3xl md:text-4xl font-black text-[#2F5741]">Crafted for crunch lovers</h2>
          <p className="mt-4 text-[#5A5148] leading-relaxed">
            Every treat is made fresh, with no artificial colours and no preservatives. From our signature Chocolate Coated Crackers in ten dreamy flavours to celebration-ready gift boxes, we obsess over that perfect crunchy-outside, sweet-inside bite.
          </p>
          <p className="mt-4 text-[#5A5148] leading-relaxed">
            Our playful pink-and-green checkerboard is more than a look — it’s a promise of joy in every pack.
          </p>
          <Link to="/shop" className="mt-7 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#2F5741] text-white font-semibold hover:bg-[#264a37] transition-all hover:gap-3">
            Shop our treats <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { i: <Sparkles size={26} />, t: 'Made Fresh', d: 'Baked and packed in small batches.' },
            { i: <Leaf size={26} />, t: 'No Artificial Colours', d: 'Only real, honest ingredients.' },
            { i: <ShieldCheck size={26} />, t: 'Finest Cocoa', d: 'Rich, premium chocolate throughout.' },
            { i: <Heart size={26} />, t: 'Made with Love', d: 'Because sweet moments matter.' },
          ].map((v, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-[#EBE0CE] text-center">
              <div className="w-14 h-14 rounded-full bg-[#F2C9D1] text-[#2F5741] flex items-center justify-center mx-auto mb-4">{v.i}</div>
              <h3 className="font-semibold text-[#2F5741]">{v.t}</h3>
              <p className="text-sm text-[#6B6258] mt-1">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Numbers band */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="rounded-[2rem] bg-[#2F5741] text-white grid grid-cols-2 md:grid-cols-4 gap-6 p-10 md:p-14 text-center">
          {[
            { n: '35+', l: 'Delicious treats' },
            { n: '10', l: 'Cracker flavours' },
            { n: '4.8★', l: 'Average rating' },
            { n: '100%', l: 'Crunch happiness' },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display text-4xl md:text-5xl font-black text-[#F2C9D1]">{s.n}</div>
              <div className="text-sm text-[#CBD8C6] mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pb-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-black text-[#2F5741]">Ready for some crunch happiness?</h2>
        <p className="mt-3 text-[#5A5148]">Order online — pay easily with Cash on Delivery.</p>
        <Link to="/shop" className="mt-6 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#D97E90] text-white font-semibold hover:bg-[#c96a7d] transition-all hover:gap-3">
          Start shopping <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
};

export default About;
