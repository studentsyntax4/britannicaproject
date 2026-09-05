import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Heart, Leaf, Clock, MapPin, Phone } from 'lucide-react';
import { CATEGORIES, BRAND } from '../mock';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="mt-24">
      {/* Values band */}
      <div className="checker-strip py-1" />
      <div className="bg-[#EFE2C9]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Leaf size={26} />, t: '100% Vegetarian' },
            { icon: <Clock size={26} />, t: 'Made Fresh Daily' },
            { icon: <Heart size={26} />, t: 'Made with Love' },
            { icon: <MapPin size={26} />, t: 'Nagpur Street Food' },
          ].map((v, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#F6DCB8] text-[#C8641E] flex items-center justify-center">{v.icon}</div>
              <span className="text-sm font-semibold text-[#3E2417] uppercase tracking-wide">{v.t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#3E2417] text-[#E8D2B2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={44} />
              <span className="font-display font-black text-lg leading-tight text-[#F5EBD6]">Tarri <span className="italic text-[#EDBE85] font-medium">and</span> Treacle</span>
            </div>
            <p className="text-sm text-[#C9B291] leading-relaxed">Desi flavours, sweet moments. Fresh poha, zesty tarri and melt-in-mouth santra barfi — straight from the heart of Nagpur.</p>
            <p className="text-xs text-[#A98F6E] mt-3">{BRAND.est}</p>
          </div>

          <div>
            <h4 className="font-poster text-sm tracking-widest mb-4 text-[#EDBE85]">MENU</h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.id}><Link to={`/shop/${c.id}`} className="text-[#C9B291] hover:text-white transition-colors">{c.name}</Link></li>
              ))}
              <li><Link to="/shop" className="text-[#C9B291] hover:text-white transition-colors">Full Menu</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-poster text-sm tracking-widest mb-4 text-[#EDBE85]">VISIT US</h4>
            <ul className="space-y-3 text-sm text-[#C9B291]">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> {BRAND.location}</li>
              <li className="flex items-start gap-2"><Clock size={16} className="mt-0.5 shrink-0" /> {BRAND.hours}</li>
              <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5 shrink-0" /> {BRAND.phone}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-poster text-sm tracking-widest mb-4 text-[#EDBE85]">DAILY SPECIALS</h4>
            <p className="text-sm text-[#C9B291] mb-3">Join for fresh drops & offers.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="flex-1 px-3 py-2.5 rounded-lg text-sm text-[#3E2417] outline-none" />
              <button className="px-4 py-2.5 rounded-lg bg-[#C8641E] text-white text-sm font-semibold hover:bg-[#A9531A] transition-colors">Join</button>
            </div>
            <div className="flex gap-3 mt-5">
              {[Instagram, Facebook, Twitter].map((I, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#5A3A26] hover:bg-[#C8641E] hover:text-white flex items-center justify-center transition-colors"><I size={18} /></a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[#5A3A26]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#C9B291]">
            <span>© {new Date().getFullYear()} Tarri and Treacle. All rights reserved.</span>
            <span>{BRAND.instagram} • Made with love ♥</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
