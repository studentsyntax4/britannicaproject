import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, User } from 'lucide-react';
import { toast } from 'sonner';
import { useAdmin } from '../../context/AdminContext';
import Logo from '../../components/Logo';

const AdminLogin = () => {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(username, password);
      toast.success('Welcome back, admin ♥');
      navigate('/admin');
    } catch (err) {
      toast.error('Invalid username or password');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F7F1E8] relative overflow-hidden">
      <div className="checker-strip absolute inset-0 opacity-[0.1]" />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#EBE0CE] p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <Logo size={56} />
          <h1 className="font-display text-3xl font-black text-[#2F5741] mt-4">Admin Login</h1>
          <p className="text-sm text-[#6B6258] mt-1">Crackers and Checkers dashboard</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-[#2F5741] mb-1.5">Username</span>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0A79A]" />
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4D8C4] bg-white text-[#2F5741] outline-none focus:border-[#D97E90] transition-colors" />
            </div>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-[#2F5741] mb-1.5">Password</span>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0A79A]" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4D8C4] bg-white text-[#2F5741] outline-none focus:border-[#D97E90] transition-colors" />
            </div>
          </label>
          <button type="submit" disabled={busy} className="w-full py-3.5 rounded-full bg-[#2F5741] text-white font-semibold hover:bg-[#264a37] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            {busy ? <><Loader2 size={18} className="animate-spin" /> Signing in…</> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
