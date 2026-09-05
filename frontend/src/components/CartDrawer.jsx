import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { items, open, setOpen, updateQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal >= 300 || subtotal === 0 ? 0 : 30;

  const checkout = () => { setOpen(false); navigate('/checkout'); };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md bg-[#F5EBD6] border-l border-[#E4D2B0] flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-[#E4D2B0]">
          <SheetTitle className="font-display text-2xl text-[#3E2417] flex items-center gap-2">
            <ShoppingBag size={22} /> Your Order
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <div className="w-20 h-20 rounded-full spice-dots border-2 border-[#E4D2B0]" />
            <p className="text-[#3E2417] font-semibold text-lg">Your order is empty</p>
            <p className="text-sm text-[#7A6A55]">Add some zesty tarri poha to get started!</p>
            <button onClick={() => { setOpen(false); navigate('/shop'); }} className="mt-2 px-6 py-3 rounded-full bg-[#3E2417] text-white font-semibold hover:bg-[#2C1810] transition-colors">Browse menu</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((i) => (
                <div key={i.id} className="flex gap-4 bg-white rounded-2xl p-3 shadow-sm">
                  <img src={i.img} alt={i.name} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="font-semibold text-[#3E2417] text-sm leading-tight">{i.name}</p>
                      <button onClick={() => removeItem(i.id)} className="text-[#B0A79A] hover:text-[#C8641E] transition-colors"><Trash2 size={16} /></button>
                    </div>
                    <p className="text-[#C8641E] font-bold mt-1">₹{i.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQty(i.id, i.qty - 1)} className="w-7 h-7 rounded-full bg-[#F6DCB8] text-[#3E2417] flex items-center justify-center hover:bg-[#EDBE85]"><Minus size={14} /></button>
                      <span className="w-6 text-center font-semibold text-[#3E2417]">{i.qty}</span>
                      <button onClick={() => updateQty(i.id, i.qty + 1)} className="w-7 h-7 rounded-full bg-[#F6DCB8] text-[#3E2417] flex items-center justify-center hover:bg-[#EDBE85]"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E4D2B0] px-6 py-5 space-y-3 bg-[#EFE2C9]">
              <div className="flex justify-between text-sm text-[#7A6A55]"><span>Subtotal</span><span className="font-semibold text-[#3E2417]">₹{subtotal}</span></div>
              <div className="flex justify-between text-sm text-[#7A6A55]"><span>Delivery</span><span className="font-semibold text-[#3E2417]">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              {subtotal > 0 && subtotal < 300 && (
                <p className="text-xs text-[#C8641E]">Add ₹{300 - subtotal} more for free delivery!</p>
              )}
              <div className="flex justify-between text-lg font-bold text-[#3E2417] pt-2 border-t border-[#E4D2B0]"><span>Total</span><span>₹{subtotal + shipping}</span></div>
              <button onClick={checkout} className="w-full py-3.5 rounded-full bg-[#3E2417] text-white font-semibold hover:bg-[#2C1810] transition-colors">Checkout</button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
