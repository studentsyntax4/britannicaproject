import React, { useEffect, useState } from 'react';
import { IndianRupee, ShoppingCart, PackageCheck, Clock, Boxes, TrendingUp, Loader2 } from 'lucide-react';
import { getStats } from '../../lib/adminApi';

const StatCard = ({ icon, label, value, tint }) => (
  <div className="bg-white rounded-2xl border border-[#E7D6B4] p-5">
    <div className="flex items-center justify-between">
      <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${tint}`}>{icon}</span>
    </div>
    <div className="mt-4 font-display text-3xl font-black text-[#3E2417]">{value}</div>
    <div className="text-sm text-[#7A6A55] mt-0.5">{label}</div>
  </div>
);

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats().then(setStats).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-20 text-center text-[#7A6A55] flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={18} /> Loading stats…</div>;
  if (!stats) return <div className="py-20 text-center text-[#7A6A55]">Could not load stats.</div>;

  const maxRev = Math.max(...(stats.revenue_by_day.map((d) => d.revenue) || [1]), 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<IndianRupee size={22} className="text-[#C8641E]" />} tint="bg-[#F6DCB8]" label="Total revenue" value={`₹${stats.total_revenue}`} />
        <StatCard icon={<ShoppingCart size={22} className="text-[#C8641E]" />} tint="bg-[#F3E0BD]" label="Total orders" value={stats.total_orders} />
        <StatCard icon={<Clock size={22} className="text-[#C8641E]" />} tint="bg-[#F3E0BD]" label="Pending" value={stats.pending} />
        <StatCard icon={<PackageCheck size={22} className="text-[#C8641E]" />} tint="bg-[#F6DCB8]" label="Delivered" value={stats.delivered} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#E7D6B4] p-6">
          <h3 className="font-display text-xl font-bold text-[#3E2417] flex items-center gap-2 mb-5"><TrendingUp size={20} /> Revenue (last 7 days)</h3>
          {stats.revenue_by_day.length === 0 ? (
            <p className="text-sm text-[#7A6A55]">No revenue yet.</p>
          ) : (
            <div className="flex items-end gap-3 h-44">
              {stats.revenue_by_day.map((d) => (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-[#C8641E] rounded-t-lg transition-all" style={{ height: `${Math.max(6, (d.revenue / maxRev) * 100)}%` }} title={`₹${d.revenue}`} />
                  <span className="text-[10px] text-[#7A6A55]">{d.date.slice(5)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-[#E7D6B4] p-6">
          <h3 className="font-display text-xl font-bold text-[#3E2417] flex items-center gap-2 mb-5"><Boxes size={20} /> Bestsellers</h3>
          {stats.bestsellers.length === 0 ? (
            <p className="text-sm text-[#7A6A55]">No sales yet.</p>
          ) : (
            <ul className="space-y-3">
              {stats.bestsellers.map((b, i) => (
                <li key={b.name} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F6DCB8] text-[#3E2417] text-sm font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="flex-1 text-[#3E2417] font-medium">{b.name}</span>
                  <span className="text-sm text-[#7A6A55]">{b.qty} sold</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
