import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { items, open, setOpen, updateQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 40;

  const checkout = () => { setOpen(false); navigate('/checkout'); };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md bg-[#F7F1E8] border-l border-[#E4D8C4] flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-[#E4D8C4]">
          <SheetTitle className="font-display text-2xl text-[#2F5741] flex items-center gap-2">
            <ShoppingBag size={22} /> Your Basket
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <div className="w-20 h-20 rounded-full checker-strip" />
            <p className="text-[#2F5741] font-semibold text-lg">Your basket is empty</p>
            <p className="text-sm text-[#6B6258]">Add some crunchy happiness to get started!</p>
            <button onClick={() => { setOpen(false); navigate('/shop'); }} className="mt-2 px-6 py-3 rounded-full bg-[#2F5741] text-white font-semibold hover:bg-[#264a37] transition-colors">Shop treats</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((i) => (
                <div key={i.id} className="flex gap-4 bg-white rounded-2xl p-3 shadow-sm">
                  <img src={i.img} alt={i.name} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="font-semibold text-[#2F5741] text-sm leading-tight">{i.name}</p>
                      <button onClick={() => removeItem(i.id)} className="text-[#B0A79A] hover:text-[#D97E90] transition-colors"><Trash2 size={16} /></button>
                    </div>
                    <p className="text-[#D97E90] font-bold mt-1">₹{i.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQty(i.id, i.qty - 1)} className="w-7 h-7 rounded-full bg-[#F2C9D1] text-[#2F5741] flex items-center justify-center hover:bg-[#E79AAA]"><Minus size={14} /></button>
                      <span className="w-6 text-center font-semibold text-[#2F5741]">{i.qty}</span>
                      <button onClick={() => updateQty(i.id, i.qty + 1)} className="w-7 h-7 rounded-full bg-[#F2C9D1] text-[#2F5741] flex items-center justify-center hover:bg-[#E79AAA]"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E4D8C4] px-6 py-5 space-y-3 bg-[#EFE7D6]">
              <div className="flex justify-between text-sm text-[#6B6258]"><span>Subtotal</span><span className="font-semibold text-[#2F5741]">₹{subtotal}</span></div>
              <div className="flex justify-between text-sm text-[#6B6258]"><span>Shipping</span><span className="font-semibold text-[#2F5741]">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              {subtotal > 0 && subtotal < 499 && (
                <p className="text-xs text-[#D97E90]">Add ₹{499 - subtotal} more for free shipping!</p>
              )}
              <div className="flex justify-between text-lg font-bold text-[#2F5741] pt-2 border-t border-[#E4D8C4]"><span>Total</span><span>₹{subtotal + shipping}</span></div>
              <button onClick={checkout} className="w-full py-3.5 rounded-full bg-[#2F5741] text-white font-semibold hover:bg-[#264a37] transition-colors">Checkout</button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
