import React from 'react';
import {
  Sliders, Home, Info, Ship, MessageSquare,
  HelpCircle, ArrowRight
} from 'lucide-react';

export const OverviewTab = ({ data, onSelectTab }) => {
  const newInquiriesCount = data.inquiries?.filter(i => i.status === 'New').length || 0;

  const SECTIONS = [
    {
      id: 'sliders',
      label: 'Sliders & Banners',
      desc: 'Manage homepage hero carousel, headline copy, background images & CTAs',
      icon: Sliders,
      badge: `${data.heroSlides?.length || 0} Slides`,
      color: 'text-[#005687]',
      bg: 'bg-[#005687]/10',
      border: 'hover:border-[#005687]'
    },
    {
      id: 'home',
      label: 'Home Page Sections',
      desc: 'Edit stats counters, 6-step flight journey, and industry sectors',
      icon: Home,
      badge: 'Active',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'hover:border-indigo-500'
    },
    {
      id: 'about',
      label: 'About Page Content',
      desc: 'Manage milestone growth timeline, company mission, values & goals',
      icon: Info,
      badge: 'Active',
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      border: 'hover:border-sky-500'
    },
    {
      id: 'services',
      label: 'Services & Channels',
      desc: 'Update 6 core multimodal logistics services, descriptions & bullet points',
      icon: Ship,
      badge: `${data.services?.length || 0} Services`,
      color: 'text-[#ed2926]',
      bg: 'bg-[#ed2926]/10',
      border: 'hover:border-[#ed2926]'
    },
    {
      id: 'testimonials',
      label: 'Client Testimonials',
      desc: 'Manage client reviews, ratings, corporate quotes & testimonials',
      icon: MessageSquare,
      badge: `${data.testimonials?.length || 0} Reviews`,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'hover:border-amber-500'
    },
    {
      id: 'inquiries',
      label: 'Customer Inquiries & Fares',
      desc: 'Review incoming doorstep quotes, customer messages & rate requests',
      icon: HelpCircle,
      badge: newInquiriesCount > 0 ? `${newInquiriesCount} New Leads` : `${data.inquiries?.length || 0} Total`,
      badgeColor: newInquiriesCount > 0 ? 'bg-[#ed2926] text-white' : 'bg-slate-100 text-slate-700',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'hover:border-emerald-500'
    }
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Select any section below to manage your website content and customer inquiries.
        </p>
      </div>

      {/* Main Grid: All Sidebar Sections as Clickable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          return (
            <div
              key={sec.id}
              onClick={() => onSelectTab(sec.id)}
              className={`group bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${sec.border} hover:-translate-y-1`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${sec.bg} ${sec.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${sec.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                    {sec.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-slate-900 group-hover:text-[#005687] transition-colors">
                    {sec.label}
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                    {sec.desc}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#005687]">
                <span>Manage {sec.label}</span>
                <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#005687] group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};