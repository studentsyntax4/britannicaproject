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
      <div className="bg-[#3E2417] text-[#EEC79A] text-xs md:text-sm py-2 overflow-hidden font-medium">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex">
              {['DESI FLAVOURS, SWEET MOMENTS', 'Nagpur Street Food • Made Fresh Daily', 'Fresh Poha, Zesty Tarri, Sweet Memories!', '100% Vegetarian • Takeaway & Dine-In'].map((t, i) => (
                <span key={i} className="mx-8 whitespace-nowrap">✦ {t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F5EBD6]/95 backdrop-blur shadow-[0_6px_24px_-16px_rgba(62,36,23,0.6)]' : 'bg-[#F5EBD6]'}`}>
        <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-[70px]">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo size={42} />
            <span className="font-display font-black text-[#3E2417] leading-none text-lg md:text-xl hidden sm:block">
              Tarri <span className="text-[#C8641E] italic font-medium">and</span> Treacle
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#3E2417]">
            <Link to="/shop" className="hover:text-[#C8641E] transition-colors">Menu</Link>
            {CATEGORIES.map((c) => (
              <Link key={c.id} to={`/shop/${c.id}`} className="hover:text-[#C8641E] transition-colors">{c.name}</Link>
            ))}
            <Link to="/about" className="hover:text-[#C8641E] transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="relative p-2.5 rounded-full bg-[#F6DCB8] text-[#3E2417] hover:bg-[#EDBE85] transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8641E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button className="lg:hidden p-2.5 rounded-full bg-[#F6DCB8] text-[#3E2417]" onClick={() => setMenu((m) => !m)} aria-label="Menu">
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {menu && (
          <div className="lg:hidden border-t border-[#E4D2B0] bg-[#F5EBD6] px-4 py-3 flex flex-col gap-1">
            <button onClick={() => go('/shop')} className="text-left py-2.5 px-3 rounded-lg hover:bg-[#F6DCB8] font-medium text-[#3E2417]">Full Menu</button>
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => go(`/shop/${c.id}`)} className="text-left py-2.5 px-3 rounded-lg hover:bg-[#F6DCB8] text-[#3E2417]">{c.name}</button>
            ))}
            <button onClick={() => go('/about')} className="text-left py-2.5 px-3 rounded-lg hover:bg-[#F6DCB8] font-medium text-[#3E2417]">About</button>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
