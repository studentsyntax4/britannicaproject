import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';

const tagColor = {
  Bestseller: 'bg-[#3E2417] text-[#EDBE85]',
  New: 'bg-[#C8641E] text-white',
  Spicy: 'bg-[#B23A1A] text-white',
  Gift: 'bg-[#8A5A2B] text-white',
  Popular: 'bg-[#C8641E] text-white',
};

const ProductCard = ({ product, index = 0 }) => {
  const { addItem } = useCart();

  const add = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to your order ✦`);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card group block bg-white rounded-3xl overflow-hidden fade-up"
      style={{ animationDelay: `${(index % 8) * 60}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-[#EFE2C9]">
        <img src={product.img} alt={product.name} loading="lazy" className="product-img w-full h-full object-cover" />
        {product.tag && (
          <span className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full ${tagColor[product.tag] || 'bg-[#3E2417] text-white'}`}>
            {product.tag}
          </span>
        )}
        <button
          onClick={add}
          aria-label="Add to order"
          className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-[#C8641E] text-white flex items-center justify-center shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#A9531A]"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[#3E2417] leading-tight group-hover:text-[#C8641E] transition-colors">{product.name}</h3>
        <p className="text-sm text-[#7A6A55] mt-1 line-clamp-2 min-h-[40px]">{product.desc}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-display font-bold text-lg text-[#3E2417]">₹{product.price}</span>
          <span className="text-xs font-semibold text-[#C8641E] opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
