import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';

const tagColor = {
  Bestseller: 'bg-[#2F5741] text-[#F2C9D1]',
  New: 'bg-[#E79AAA] text-white',
  Gift: 'bg-[#7FA06A] text-white',
  Popular: 'bg-[#D97E90] text-white',
};

const ProductCard = ({ product, index = 0 }) => {
  const { addItem } = useCart();

  const add = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to basket ♥`);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card group block bg-white rounded-3xl overflow-hidden fade-up"
      style={{ animationDelay: `${(index % 8) * 60}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-[#EFE7D6]">
        <img src={product.img} alt={product.name} loading="lazy" className="product-img w-full h-full object-cover" />
        {product.tag && (
          <span className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full ${tagColor[product.tag] || 'bg-[#2F5741] text-white'}`}>
            {product.tag}
          </span>
        )}
        <button
          onClick={add}
          aria-label="Add to basket"
          className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-[#F2C9D1] text-[#2F5741] flex items-center justify-center shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#E79AAA]"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 text-[#E7A33B] mb-1.5">
          <Star size={13} fill="currentColor" />
          <span className="text-xs text-[#6B6258] font-medium">{product.rating} · {product.reviews}</span>
        </div>
        <h3 className="font-semibold text-[#2F5741] leading-tight group-hover:text-[#D97E90] transition-colors">{product.name}</h3>
        <p className="text-sm text-[#6B6258] mt-1 line-clamp-2 min-h-[40px]">{product.desc}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-display font-bold text-lg text-[#2F5741]">₹{product.price}</span>
          <span className="text-xs font-semibold text-[#D97E90] opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
