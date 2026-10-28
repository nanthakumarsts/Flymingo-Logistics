import React, { useState } from 'react';
import { 
  Sliders, LayoutTemplate, Info, Ship, MessageSquare, 
  HelpCircle, Home, LogOut, ExternalLink, Menu, X, 
  RotateCcw, ShieldCheck, UserCheck, Bell, ChevronRight 
} from 'lucide-react';
import { OverviewTab } from './tabs/OverviewTab';
import { SlidersBannersTab } from './tabs/SlidersBannersTab';
import { HomePageTab } from './tabs/HomePageTab';
import { AboutPageTab } from './tabs/AboutPageTab';
import { ServicesTab } from './tabs/ServicesTab';
import { TestimonialsTab } from './tabs/TestimonialsTab';
import { InquiriesTab } from './tabs/InquiriesTab';

export const AdminLayout = ({ data, onUpdate, auth, onLogout, onResetDefault }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const newInquiriesCount = data.inquiries?.filter(i => i.status === 'New').length || 0;

  const NAV_ITEMS = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutTemplate, badge: null },
    { id: 'sliders', label: 'Sliders & Banners', icon: Sliders, badge: data.heroSlides?.length },
    { id: 'home', label: 'Home Page Sections', icon: Home, badge: null },
    { id: 'about', label: 'About Page Content', icon: Info, badge: null },
    { id: 'services', label: 'Services & Channels', icon: Ship, badge: data.services?.length },
    { id: 'testimonials', label: 'Client Testimonials', icon: MessageSquare, badge: data.testimonials?.length },
    { id: 'inquiries', label: 'Customer Inquiries & Fares', icon: HelpCircle, badge: newInquiriesCount, badgeColor: 'bg-[#ed2926] text-white' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const handleResetConfirm = () => {
    if (window.confirm('Reset all dynamic content to default initial data?')) {
      onResetDefault();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 flex flex-col lg:flex-row font-sans">
      
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white p-1">
            <img src="/assets/FlymingoLogo.svg" alt="Flymingo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight">Flymingo Admin</span>
            <span className="block text-[9px] font-mono text-sky-400">MANAGEMENT PORTAL</span>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Left Sidebar (Desktop Fixed, Mobile Drawer) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#082846] via-[#004369] to-[#003050] text-white flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        
        {/* Top Branding Section */}
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center">
                <img 
                  src="/assets/FlymingoLogo.svg" 
                  alt="Flymingo Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div>
                <h2 className="font-black text-sm tracking-tight text-white leading-tight">Flymingo Logistics</h2>
                <span className="text-[10px] font-mono font-bold text-[#ed2926] tracking-wider uppercase block">
                  Admin Workspace
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-white/40">
              Content Management
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ed2926] to-[#c51614] text-white shadow-lg shadow-[#ed2926]/30'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-300'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge !== undefined && (
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-white/15 text-white/90')
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile & Actions */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-black/15">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs text-white">
                AD
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">
                  {auth.user?.username || 'Admin User'}
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Super Admin
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleResetConfirm}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white/90 flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title="Reset data to defaults"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
            <button
              onClick={onLogout}
              className="px-2.5 py-1.5 rounded-lg bg-[#ed2926]/20 hover:bg-[#ed2926] text-[11px] font-bold text-white flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Desktop Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              Admin Portal
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <h2 className="text-sm font-extrabold text-slate-900 capitalize">
              {NAV_ITEMS.find(n => n.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-[#005687] flex items-center gap-1.5 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">{auth.user?.username || 'admin'}</span>
              <button
                onClick={onLogout}
                className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-[#ed2926] rounded-lg transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Tab Content Display */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl mx-auto w-full">
          {activeTab === 'overview' && <OverviewTab data={data} onSelectTab={handleTabChange} />}
          {activeTab === 'sliders' && <SlidersBannersTab data={data} onUpdate={onUpdate} />}
          {activeTab === 'home' && <HomePageTab data={data} onUpdate={onUpdate} />}
          {activeTab === 'about' && <AboutPageTab data={data} onUpdate={onUpdate} />}
          {activeTab === 'services' && <ServicesTab data={data} onUpdate={onUpdate} />}
          {activeTab === 'testimonials' && <TestimonialsTab data={data} onUpdate={onUpdate} />}
          {activeTab === 'inquiries' && <InquiriesTab data={data} onUpdate={onUpdate} />}
        </main>
      </div>
    </div>
  );
};
