import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SliderAdmin } from '../admin/SliderAdmin';
import { LayoutDashboard, Sliders, ArrowLeft, ExternalLink, Shield } from 'lucide-react';
import { BRAND } from '../data/siteData';

export const AdminPage = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col md:min-h-screen shrink-0 border-r border-slate-800">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-red flex items-center justify-center font-black text-white text-lg">
              F
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">Flymingo Admin</h2>
              <p className="text-slate-400 text-xs">Content Management</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              location.pathname === '/admin' || location.pathname === '/admin/' || location.pathname.includes('/admin/slider')
                ? 'bg-brand-red text-white shadow-md shadow-brand-red/30' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Hero Slider</span>
          </Link>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            <span className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">↗</span>
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 text-slate-500 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-slate-400 font-semibold">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Secure Admin
            </span>
            <span className="font-mono text-[11px] text-slate-400">v1.2</span>
          </div>
          <p className="text-[11px] text-slate-500">Flymingo Express Cargo & Logistics</p>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-red transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Main Website
            </Link>
          </div>

          <SliderAdmin />
        </div>
      </main>
    </div>
  );
};