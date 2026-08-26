import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../mock';
import Logo from './Logo';

const Navbar = () => {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (path) => { setMenu(false); navigate(path); };

  return (
    <>
      {/* Announcement marquee */}
      <div className="bg-[#2F5741] text-[#F2C9D1] text-xs md:text-sm py-2 overflow-hidden font-medium">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex">
              {['CRUNCH IT. LOVE IT. REPEAT.', 'Free gift wrap on orders over ₹499', 'Sweet moments, made for you', 'Made with the finest cocoa • No artificial colours'].map((t, i) => (
                <span key={i} className="mx-8 whitespace-nowrap">♥ {t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F7F1E8]/95 backdrop-blur shadow-[0_6px_24px_-16px_rgba(47,87,65,0.5)]' : 'bg-[#F7F1E8]'}`}>
        <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-[70px]">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo size={40} />
            <span className="font-display font-black text-[#2F5741] leading-none text-lg md:text-xl hidden sm:block">
              Crackers <span className="text-[#D97E90] italic font-medium">and</span> Checkers
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#2F5741]">
            <Link to="/shop" className="hover:text-[#D97E90] transition-colors">Shop All</Link>
            {CATEGORIES.slice(0, 3).map((c) => (
              <Link key={c.id} to={`/shop/${c.id}`} className="hover:text-[#D97E90] transition-colors">{c.name}</Link>
            ))}
            <Link to="/about" className="hover:text-[#D97E90] transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="relative p-2.5 rounded-full bg-[#F2C9D1] text-[#2F5741] hover:bg-[#E79AAA] transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2F5741] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button className="lg:hidden p-2.5 rounded-full bg-[#F2C9D1] text-[#2F5741]" onClick={() => setMenu((m) => !m)} aria-label="Menu">
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {menu && (
          <div className="lg:hidden border-t border-[#E4D8C4] bg-[#F7F1E8] px-4 py-3 flex flex-col gap-1">
            <button onClick={() => go('/shop')} className="text-left py-2.5 px-3 rounded-lg hover:bg-[#F2C9D1] font-medium text-[#2F5741]">Shop All</button>
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => go(`/shop/${c.id}`)} className="text-left py-2.5 px-3 rounded-lg hover:bg-[#F2C9D1] text-[#2F5741]">{c.name}</button>
            ))}
            <button onClick={() => go('/about')} className="text-left py-2.5 px-3 rounded-lg hover:bg-[#F2C9D1] font-medium text-[#2F5741]">About</button>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
