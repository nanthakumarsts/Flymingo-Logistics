import React from 'react';
import { 
  Truck, ShieldCheck, CheckCircle2, FileText, ArrowRight, 
  MapPin, Home, HelpCircle, PackageCheck, AlertCircle
} from 'lucide-react';
import { BRAND } from '../data/siteData';

export const InternationalRelocationPage = ({ onOpenQuote }) => {
  const STEPS = [
    {
      step: '01',
      title: 'Pre-Move Survey',
      desc: 'Physical home visit or virtual survey to evaluate total cubic meter (CBM) volume, identify fragile antiques, and plan customized crating.'
    },
    {
      step: '02',
      title: 'Export-Grade Packing',
      desc: 'Multi-layer wrapping using heavy corrugated rolls, bubble cushioning, stretch film, edge protectors, and treated wooden crates for delicate goods.'
    },
    {
      step: '03',
      title: 'Marine Transit Insurance',
      desc: 'Comprehensive All-Risk marine cargo insurance coverage protecting your household appliances, furniture, and valuables against transit hazards.'
    },
    {
      step: '04',
      title: 'Customs Clearance (TR)',
      desc: 'Filing under Transfer of Residence rules to maximize customs duty exemptions and ensure full compliance with destination port regulations.'
    },
    {
      step: '05',
      title: 'Secure Loading & Transit',
      desc: 'Containerized ocean freight or priority air shipment with professional lashing, moisture-absorbent desiccant bags, and GPS tracking.'
    },
    {
      step: '06',
      title: 'Destination Unpacking',
      desc: 'Doorstep unloading, complete uncrating, room-by-room furniture assembly, and environmental debris removal at your new global home.'
    }
  ];

  const TR_DOCS = [
    'Original Passport with valid Overseas Visa / Residence Permit',
    'Old Passports verifying minimum 2 years continuous overseas residency',
    'Detailed Packing List signed by owner with estimated valuation',
    'Original Airway Bill (AWB) or Ocean Bill of Lading (BL)',
    'Transfer of Residence Declaration Form duly signed',
    'Termination of overseas employment or transfer letter from employer'
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-blue-50/80 via-white to-slate-50 py-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-bold uppercase tracking-widest">
            Packers &amp; Movers
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            International Relocation &amp; Moving Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Stress-free overseas home moving with multi-layer export packaging, all-risk marine insurance, and Transfer of Residence customs duty exemptions.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenQuote('international-relocation')}
              className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-red/25 transition-all cursor-pointer"
            >
              Request Relocation Survey
            </button>
          </div>
        </div>
      </section>

      {/* 6 Step Moving Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            Complete Moving Protocol
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            International Moving with Quality Packaging
          </h2>
          <p className="text-xs text-slate-500">
            From your current residence to your new doorstep across the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((s, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 hover:border-brand-blue transition-all">
              <div className="text-3xl font-black font-mono text-brand-blue/30">
                {s.step}
              </div>
              <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transfer of Residence (TR) Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
              Customs &amp; Duty Exemption Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Transfer of Residency (TR) Rules &amp; Documents
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Understanding Indian customs rules for returning NRIs and expats moving abroad to maximize duty concessions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Eligibility &amp; Exemption Highlights</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Minimum Stay:</strong> Must have stayed abroad continuously for at least 2 years with short visits not exceeding permitted duration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Used Personal Effects:</strong> Used household articles, clothing, books, and utensils enter 100% duty-free.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Specified Durables:</strong> Concessional duty rates applied to home appliances (TV, Refrigerator, Washing Machine, Home Theatre) subject to value limits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Arrival Window:</strong> Goods must generally arrive within 1 month before or up to 6 months after the passenger's arrival in India.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-blue" />
                <span>Required Documentation Checklist</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {TR_DOCS.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Planning An Overseas Relocation?</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Schedule a free survey with our relocation consultant for custom volume calculation and paperwork assistance.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote('international-relocation')}
            className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer flex-shrink-0"
          >
            Book Free Moving Survey
          </button>
        </div>
      </section>
    </div>
  );
};
