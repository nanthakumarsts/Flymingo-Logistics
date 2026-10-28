import React from 'react';
import { 
  Sliders, LayoutTemplate, Info, Ship, MessageSquare, 
  HelpCircle, ArrowUpRight, TrendingUp, Users, CheckCircle, 
  Clock, AlertCircle, Eye, ExternalLink, Sparkles 
} from 'lucide-react';

export const OverviewTab = ({ data, onSelectTab }) => {
  const stats = [
    {
      title: 'Active Hero Sliders',
      val: data.heroSlides?.filter(s => s.isActive).length || 0,
      total: data.heroSlides?.length || 0,
      icon: Sliders,
      color: 'text-[#005687]',
      bg: 'bg-[#005687]/10',
      tab: 'sliders'
    },
    {
      title: 'Core Services Listed',
      val: data.services?.length || 0,
      total: '6 Active',
      icon: Ship,
      color: 'text-[#ed2926]',
      bg: 'bg-[#ed2926]/10',
      tab: 'services'
    },
    {
      title: 'Client Reviews',
      val: data.testimonials?.length || 0,
      total: '5.0 Avg Rating',
      icon: MessageSquare,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      tab: 'testimonials'
    },
    {
      title: 'Recent Inquiries',
      val: data.inquiries?.length || 0,
      total: `${data.inquiries?.filter(i => i.status === 'New').length || 0} New Leads`,
      icon: HelpCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      tab: 'inquiries'
    }
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#005687] via-[#004369] to-[#082846] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-[#005687]/15">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-[#ed2926]/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-sky-200 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#ed2926]" />
            Control Center Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome to Flymingo Admin Portal
          </h1>
          <p className="text-sm text-white/80 leading-relaxed font-normal">
            Manage your homepage sliders, page banners, multimodal cargo channels, about page milestones, client testimonials, and incoming customer fare rate inquiries in one unified dashboard.
          </p>
        </div>
      </div>

      {/* Top Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div 
              key={idx}
              onClick={() => onSelectTab(s.tab)}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#005687] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{s.title}</span>
                <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div className="text-2xl font-black text-slate-900">{s.val}</div>
                <div className="text-xs font-bold text-slate-500">{s.total}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Inquiries */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Recent Customer Inquiries</h2>
              <p className="text-xs text-slate-500">Live incoming fare rate quotes and direct message submissions</p>
            </div>
            <button
              onClick={() => onSelectTab('inquiries')}
              className="text-xs font-bold text-[#005687] hover:text-[#ed2926] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View All Inquiries</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            {data.inquiries?.slice(0, 4).map((inq) => (
              <div key={inq.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">{inq.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      inq.status === 'New' ? 'bg-red-50 text-red-600 border border-red-200' :
                      inq.status === 'Contacted' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    {inq.service} &bull; <span className="text-slate-400">{inq.origin} &rarr; {inq.destination}</span>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-400 font-mono shrink-0">
                  {inq.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Navigation Shortcuts */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-slate-900">Quick Portal Shortcuts</h2>
          <div className="space-y-2">
            {[
              { label: 'Edit Hero Sliders & Banners', tab: 'sliders', desc: 'Update homepage banners & headings' },
              { label: 'Update About Page Pillars', tab: 'about', desc: 'Growth timeline, values & goals' },
              { label: 'Edit Services & Capabilities', tab: 'services', desc: '6 multimodal cargo channels' },
              { label: 'Manage Client Testimonials', tab: 'testimonials', desc: 'Add or edit customer reviews' },
              { label: 'Home Page 6-Step Journey', tab: 'home', desc: 'Pickup to delivery cargo steps' }
            ].map((shortcut, i) => (
              <button
                key={i}
                onClick={() => onSelectTab(shortcut.tab)}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-[#005687]/5 hover:border-[#005687]/30 border border-slate-100 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-[#005687] transition-colors">
                    {shortcut.label}
                  </div>
                  <div className="text-[10px] text-slate-500">{shortcut.desc}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#005687] transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
