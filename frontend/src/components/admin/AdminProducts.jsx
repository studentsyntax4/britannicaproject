import React, { useEffect, useMemo, useState } from 'react';
import { Loader2, Plus, Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { fetchProducts } from '../../lib/api';
import { createProduct, updateProduct, deleteProduct } from '../../lib/adminApi';
import { CATEGORIES } from '../../mock';

const EMPTY = { name: '', category: 'chocolate-crackers', price: '', img: '', tag: '', desc: '', rating: 4.7, reviews: 50 };

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [editing, setEditing] = useState(null); // product id or 'new'
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    fetchProducts().then(setProducts).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const visible = useMemo(
    () => (filter === 'all' ? products : products.filter((p) => p.category === filter)),
    [products, filter]
  );

  const openNew = () => { setForm(EMPTY); setEditing('new'); };
  const openEdit = (p) => {
    setForm({ name: p.name, category: p.category, price: p.price, img: p.img, tag: p.tag || '', desc: p.desc || '', rating: p.rating, reviews: p.reviews });
    setEditing(p.id);
  };
  const close = () => { setEditing(null); setForm(EMPTY); };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    if (!form.name || !form.img || form.price === '') { toast.error('Name, price and image are required'); return; }
    const payload = { ...form, price: Number(form.price), reviews: Number(form.reviews), rating: Number(form.rating), tag: form.tag || null };
    setBusy(true);
    try {
      if (editing === 'new') {
        const created = await createProduct(payload);
        setProducts((prev) => [...prev, created]);
        toast.success('Product added');
      } else {
        const updated = await updateProduct(editing, payload);
        setProducts((prev) => prev.map((p) => (p.id === editing ? updated : p)));
        toast.success('Product updated');
      }
      close();
    } catch {
      toast.error('Could not save product');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.name}"?`)) return;
    try {
      await deleteProduct(p.id);
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
      toast.success('Product deleted');
    } catch {
      toast.error('Could not delete');
    }
  };

  if (loading) return <div className="py-20 text-center text-[#6B6258] flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={18} /> Loading products…</div>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button onClick={() => setFilter('all')} className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-medium ${filter === 'all' ? 'bg-[#2F5741] text-white' : 'bg-white text-[#2F5741] border border-[#E4D8C4]'}`}>All ({products.length})</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setFilter(c.id)} className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-medium ${filter === c.id ? 'bg-[#2F5741] text-white' : 'bg-white text-[#2F5741] border border-[#E4D8C4]'}`}>{c.name}</button>
          ))}
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#D97E90] text-white font-semibold hover:bg-[#c96a7d] transition-colors"><Plus size={18} /> Add product</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-[#EBE0CE] overflow-hidden flex">
            <img src={p.img} alt={p.name} className="w-24 h-24 object-cover shrink-0" />
            <div className="p-3 flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-[#2F5741] text-sm truncate">{p.name}</p>
                  <p className="text-xs text-[#6B6258] capitalize">{p.category.replace(/-/g, ' ')}</p>
                </div>
                <span className="font-display font-bold text-[#2F5741]">₹{p.price}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEdit(p)} className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-medium py-1.5 rounded-lg bg-[#EFE7D6] text-[#2F5741] hover:bg-[#e3d6bf]"><Pencil size={13} /> Edit</button>
                <button onClick={() => remove(p)} className="inline-flex items-center justify-center gap-1 text-xs font-medium py-1.5 px-3 rounded-lg bg-[#F2C9D1] text-[#8A2E43] hover:bg-[#e9b3bd]"><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40" onClick={close}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={save} className="bg-white rounded-3xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-2xl font-black text-[#2F5741]">{editing === 'new' ? 'Add product' : 'Edit product'}</h3>
              <button type="button" onClick={close} className="p-2 rounded-full hover:bg-[#EFE7D6] text-[#6B6258]"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <Input label="Name" value={form.name} onChange={set('name')} />
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-sm font-medium text-[#2F5741] mb-1.5">Category</span>
                  <select value={form.category} onChange={set('category')} className="w-full px-3 py-3 rounded-xl border border-[#E4D8C4] bg-white text-[#2F5741] outline-none focus:border-[#D97E90]">
                    {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </label>
                <Input label="Price (₹)" type="number" value={form.price} onChange={set('price')} />
              </div>
              <Input label="Image URL" value={form.img} onChange={set('img')} />
              {form.img && <img src={form.img} alt="preview" className="w-full h-36 object-cover rounded-xl" />}
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-sm font-medium text-[#2F5741] mb-1.5">Tag (optional)</span>
                  <select value={form.tag} onChange={set('tag')} className="w-full px-3 py-3 rounded-xl border border-[#E4D8C4] bg-white text-[#2F5741] outline-none focus:border-[#D97E90]">
                    <option value="">None</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="New">New</option>
                    <option value="Popular">Popular</option>
                    <option value="Gift">Gift</option>
                  </select>
                </label>
                <Input label="Reviews" type="number" value={form.reviews} onChange={set('reviews')} />
              </div>
              <label className="block">
                <span className="block text-sm font-medium text-[#2F5741] mb-1.5">Description</span>
                <textarea value={form.desc} onChange={set('desc')} rows={2} className="w-full px-3 py-3 rounded-xl border border-[#E4D8C4] bg-white text-[#2F5741] outline-none focus:border-[#D97E90] resize-none" />
              </label>
            </div>
            <button type="submit" disabled={busy} className="w-full mt-6 py-3.5 rounded-full bg-[#2F5741] text-white font-semibold hover:bg-[#264a37] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {busy ? <><Loader2 size={18} className="animate-spin" /> Saving…</> : 'Save product'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <label className="block">
    <span className="block text-sm font-medium text-[#2F5741] mb-1.5">{label}</span>
    <input {...props} className="w-full px-3 py-3 rounded-xl border border-[#E4D8C4] bg-white text-[#2F5741] outline-none focus:border-[#D97E90] transition-colors" />
  </label>
);

export default AdminProducts;
