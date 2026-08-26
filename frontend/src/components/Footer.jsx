import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Heart, Leaf, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../mock';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="mt-24">
      {/* Values band */}
      <div className="checker-strip py-0.5" />
      <div className="bg-[#EFE7D6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Sparkles size={26} />, t: 'Made Fresh' },
            { icon: <Leaf size={26} />, t: 'No Artificial Colours' },
            { icon: <Heart size={26} />, t: 'Made with Love' },
            { icon: <Sparkles size={26} />, t: 'Finest Cocoa' },
          ].map((v, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#F2C9D1] text-[#2F5741] flex items-center justify-center">{v.icon}</div>
              <span className="text-sm font-semibold text-[#2F5741] uppercase tracking-wide">{v.t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#2F5741] text-[#F2E7DA]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={44} />
              <span className="font-display font-black text-lg leading-tight">Crackers <span className="italic text-[#F2C9D1] font-medium">and</span> Checkers</span>
            </div>
            <p className="text-sm text-[#CBD8C6] leading-relaxed">Crunch it. Love it. Repeat. Sweet moments, made for you — with the finest cocoa & lots of love.</p>
          </div>

          <div>
            <h4 className="font-poster text-sm tracking-widest mb-4 text-[#F2C9D1]">SHOP</h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.id}><Link to={`/shop/${c.id}`} className="text-[#CBD8C6] hover:text-white transition-colors">{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-poster text-sm tracking-widest mb-4 text-[#F2C9D1]">HELP</h4>
            <ul className="space-y-2.5 text-sm text-[#CBD8C6]">
              <li>Shipping & Returns</li>
              <li>Track your order</li>
              <li>Bulk & Corporate gifting</li>
              <li>Contact us</li>
            </ul>
          </div>

          <div>
            <h4 className="font-poster text-sm tracking-widest mb-4 text-[#F2C9D1]">STAY SWEET</h4>
            <p className="text-sm text-[#CBD8C6] mb-3">Join for treats, drops & offers.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="flex-1 px-3 py-2.5 rounded-lg text-sm text-[#2F5741] outline-none" />
              <button className="px-4 py-2.5 rounded-lg bg-[#F2C9D1] text-[#2F5741] text-sm font-semibold hover:bg-[#E79AAA] transition-colors">Join</button>
            </div>
            <div className="flex gap-3 mt-5">
              {[Instagram, Facebook, Twitter].map((I, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#3C6A52] hover:bg-[#F2C9D1] hover:text-[#2F5741] flex items-center justify-center transition-colors"><I size={18} /></a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[#3C6A52]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#CBD8C6]">
            <span>© {new Date().getFullYear()} Crackers and Checkers. All rights reserved.</span>
            <span>@crackersandcheckers • Made with love ♥</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
