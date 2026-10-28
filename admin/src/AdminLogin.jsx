import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('flamingo2024');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (!username.trim() || !password.trim()) {
        setError('Please enter both username and password.');
        setLoading(false);
        return;
      }
      const res = onLogin(username, password, remember);
      if (!res.success) {
        setError(res.error || 'Authentication failed');
      }
      setLoading(false);
    }, 400);
  };

  const handleQuickDemo = () => {
    setUsername('admin');
    setPassword('flamingo2024');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background ambient lighting in logo colors */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#005687]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#ed2926]/25 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#005687_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10">
        {/* Top Header Banner with Logo Colors */}
        <div className="bg-gradient-to-r from-[#005687] via-[#004369] to-[#082846] p-8 text-center text-white relative">
          <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-2xl p-2.5 shadow-lg flex items-center justify-center">
            <img 
              src="/assets/FlymingoLogo.svg" 
              alt="Flymingo Logistics" 
              className="w-full h-full object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Flymingo Logistics
          </h1>
          <p className="text-xs font-mono font-bold text-sky-200 mt-1 uppercase tracking-widest">
            Executive Admin Portal
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ed2926]" />
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="text-center space-y-1">
            <h2 className="text-lg font-extrabold text-slate-800">
              Sign In to Your Workspace
            </h2>
            <p className="text-xs text-slate-500">
              Manage banners, dynamic pages, services, and live customer inquiries.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ed2926]" />
              {error}
            </div>
          )}

          {/* Username Field */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-slate-700 tracking-wide">
              Username / Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#005687] focus:ring-2 focus:ring-[#005687]/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-slate-700 tracking-wide">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#005687] focus:ring-2 focus:ring-[#005687]/20 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600 select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded text-[#005687] focus:ring-[#005687] border-slate-300"
              />
              <span>Remember this session</span>
            </label>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-xs font-bold text-[#005687] hover:text-[#ed2926] transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Demo Fill</span>
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#005687] to-[#004369] hover:from-[#ed2926] hover:to-[#c51614] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#005687]/20 hover:shadow-[#ed2926]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Footer note */}
          <div className="pt-2 text-center text-[11px] text-slate-400 font-medium">
            Protected Admin Environment &bull; Authorized Personnel Only
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
