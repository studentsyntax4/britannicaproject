import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, LogOut, ExternalLink } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import Logo from '../../components/Logo';
import AdminOverview from '../../components/admin/AdminOverview';
import AdminOrders from '../../components/admin/AdminOrders';
import AdminProducts from '../../components/admin/AdminProducts';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'products', label: 'Menu Items', icon: Package },
];

const AdminDashboard = () => {
  const { isAuthed, logout } = useAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');

  if (!isAuthed) return <Navigate to="/admin/login" replace />;

  const doLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-[#F5EBD6] flex flex-col lg:flex-row">
      <aside className="lg:w-64 bg-[#3E2417] text-white lg:min-h-screen flex lg:flex-col">
        <div className="p-5 flex items-center gap-3 border-b border-[#5A3A26]">
          <Logo size={40} />
          <span className="font-display font-black leading-tight hidden lg:block text-[#F5EBD6]">Tarri <span className="italic text-[#EDBE85] font-medium">and</span> Treacle</span>
        </div>
        <nav className="flex lg:flex-col gap-1 p-3 flex-1 overflow-x-auto">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${tab === t.id ? 'bg-[#EDBE85] text-[#3E2417]' : 'text-[#C9B291] hover:bg-[#5A3A26]'}`}>
                <Icon size={18} /> {t.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 hidden lg:block space-y-1">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#C9B291] hover:bg-[#5A3A26]"><ExternalLink size={18} /> View store</button>
          <button onClick={doLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#EDBE85] hover:bg-[#5A3A26]"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      <main className="flex-1 p-5 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-black text-[#3E2417] capitalize">{tab === 'products' ? 'Menu Items' : tab}</h1>
            <p className="text-sm text-[#7A6A55]">Manage your Nagpur kitchen</p>
          </div>
          <button onClick={doLogout} className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3E2417] text-white text-sm font-medium"><LogOut size={16} /> Logout</button>
        </div>
        {tab === 'overview' && <AdminOverview />}
        {tab === 'orders' && <AdminOrders />}
        {tab === 'products' && <AdminProducts />}
      </main>
    </div>
  );
};

export default AdminDashboard;
