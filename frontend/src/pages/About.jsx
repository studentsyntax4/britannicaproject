import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Leaf, Clock, MapPin, ArrowRight, Flame } from 'lucide-react';
import Logo from '../components/Logo';
import { BRAND } from '../mock';

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#EFE2C9]">
        <div className="spice-dots absolute inset-0 opacity-[0.14]" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <div className="flex justify-center mb-6"><Logo size={72} /></div>
          <p className="font-poster text-sm tracking-[0.25em] text-[#C8641E] mb-3">OUR STORY</p>
          <h1 className="font-display text-4xl md:text-6xl font-black text-[#3E2417] leading-tight">
            Desi flavours,<br /><span className="italic font-medium text-[#C8641E]">sweet moments</span>
          </h1>
          <p className="mt-6 text-lg text-[#5A4636] max-w-2xl mx-auto">
            Tarri and Treacle serves the soul of Nagpur — fiery tarri poha, crispy street snacks and the city’s famous santra barfi. All made fresh, all pure veg, all made with love.
          </p>
        </div>
      </section>

      {/* Story split */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 checker-pink-green" />
          <img src="https://images.pexels.com/photos/13041628/pexels-photo-13041628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Tarri poha" className="absolute inset-6 w-[calc(100%-3rem)] h-[calc(100%-3rem)] object-cover rounded-3xl shadow-2xl" />
        </div>
        <div>
          <p className="font-poster text-sm tracking-[0.2em] text-[#C8641E] mb-2">FRESH POHA, ZESTY TARRI</p>
          <h2 className="font-display text-3xl md:text-4xl font-black text-[#3E2417]">Straight from Sitabuldi</h2>
          <p className="mt-4 text-[#5A4636] leading-relaxed">
            Our tarri is slow-cooked every morning with a secret Nagpuri spice blend, then ladled generously over soft, fluffy poha. Topped with crunchy sev, roasted peanuts, onion and a squeeze of lime — it’s comfort in a bowl.
          </p>
          <p className="mt-4 text-[#5A4636] leading-relaxed">
            And no meal is complete without our melt-in-mouth santra barfi, made with real orange zest — sweet moments to end on.
          </p>
          <Link to="/shop" className="mt-7 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#3E2417] text-white font-semibold hover:bg-[#2C1810] transition-all hover:gap-3">
            See the menu <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { i: <Clock size={26} />, t: 'Made Fresh', d: 'Cooked fresh every single day.' },
            { i: <Leaf size={26} />, t: '100% Vegetarian', d: 'Pure veg, always.' },
            { i: <Flame size={26} />, t: 'Nagpur Spice', d: 'Authentic tarri, secret blend.' },
            { i: <Heart size={26} />, t: 'Made with Love', d: 'Because sweet moments matter.' },
          ].map((v, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-[#E7D6B4] text-center">
              <div className="w-14 h-14 rounded-full bg-[#F6DCB8] text-[#C8641E] flex items-center justify-center mx-auto mb-4">{v.i}</div>
              <h3 className="font-semibold text-[#3E2417]">{v.t}</h3>
              <p className="text-sm text-[#7A6A55] mt-1">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Numbers band */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="rounded-[2rem] bg-[#3E2417] text-white grid grid-cols-2 md:grid-cols-4 gap-6 p-10 md:p-14 text-center">
          {[
            { n: 'Nagpur', l: 'Made locally' },
            { n: '14+', l: 'Menu items' },
            { n: '8AM–10PM', l: 'Open daily' },
            { n: '100%', l: 'Vegetarian' },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display text-3xl md:text-4xl font-black text-[#EDBE85]">{s.n}</div>
              <div className="text-sm text-[#C9B291] mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pb-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-black text-[#3E2417]">Craving some tarri poha?</h2>
        <p className="mt-3 text-[#5A4636] flex items-center justify-center gap-2"><MapPin size={16} /> {BRAND.location} • {BRAND.hours}</p>
        <Link to="/shop" className="mt-6 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C8641E] text-white font-semibold hover:bg-[#A9531A] transition-all hover:gap-3">
          Order now <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
};

export default About;
