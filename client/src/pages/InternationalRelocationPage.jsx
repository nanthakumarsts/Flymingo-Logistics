import React from 'react';
import { 
  Truck, ShieldCheck, CheckCircle2, FileText, ArrowRight, 
  MapPin, Home, HelpCircle, PackageCheck, AlertCircle
} from 'lucide-react';
import { BRAND } from '../data/siteData';
import { PageBanner } from '../components/PageBanner';

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
      <PageBanner eyebrow="Packers & movers" title="International relocation & moving services" description="Stress-free overseas home moves with export-grade packing, all-risk marine insurance and Transfer of Residence customs support." image="/assets/movers.jpg" action="Request relocation survey" onAction={() => onOpenQuote('international-relocation')} />

      {/* 6 Step Moving Workflow */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
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

      {/* Transfer of Residence (TR) Guide (Light Split Card) */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-200/90 shadow-xl">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 p-7 sm:p-12">
            {/* Left: Eligibility Points */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue-50 border border-brand-blue-100 text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
                  Customs &amp; Duty Exemption Guide
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Transfer of Residency (TR) Rules &amp; Benefits
                </h2>
                <span className="block h-1 w-14 rounded-full bg-brand-red" aria-hidden="true" />
              </div>

              <ul className="space-y-3">
                {[
                  { t: 'Minimum Stay Period:', d: 'Must have stayed abroad continuously for at least 2 years with short visits not exceeding permitted duration.' },
                  { t: 'Used Personal Effects:', d: 'Used household articles, clothing, books, and kitchen utensils enter 100% duty-free under TR.' },
                  { t: 'Specified Durables:', d: 'Concessional duty rates applied to home appliances (TV, Refrigerator, Washing Machine, Home Theatre) subject to value limits.' },
                  { t: 'Arrival Window Protocol:', d: 'Goods must generally arrive within 1 month before or up to 6 months after the passenger\'s arrival in India.' },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="group relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-brand-blue/40 hover:shadow-md hover:translate-x-1.5 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center shrink-0 font-mono font-black group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="relative text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-bold">{item.t}</strong> {item.d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Required Documentation Checklist */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 shadow-md overflow-hidden self-start">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 bg-white">
                <div className="w-11 h-11 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-md shadow-brand-blue/20 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">Required TR Documentation Checklist</h3>
                </div>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Mandatory
                </span>
              </div>

              <p className="px-6 pt-5 text-xs sm:text-sm text-slate-600">
                Essential documents required by Indian Customs for hassle-free Transfer of Residence clearance:
              </p>

              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'Original Passport (All pages)', code: 'DOC-1' },
                  { name: 'Overseas Visa / Residence Cancel', code: 'DOC-2' },
                  { name: 'Air Ticket / Boarding Pass', code: 'DOC-3' },
                  { name: 'Itemized Packing Inventory List', code: 'DOC-4' },
                  { name: 'Original Bill of Lading / AWB', code: 'DOC-5' },
                  { name: 'Customs TR Baggage Declaration', code: 'DOC-6' },
                  { name: 'Authority Letter to Flymingo', code: 'DOC-7' },
                  { name: 'Indian Delivery Address Proof', code: 'DOC-8' },
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-brand-blue/40 hover:shadow-sm transition-all"
                  >
                    <span className="shrink-0 min-w-[52px] text-center px-2 py-1.5 rounded-lg bg-brand-blue/10 text-brand-blue text-xs font-black font-mono tracking-wider">
                      {doc.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 leading-snug">{doc.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box (Light Theme) */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-gradient-to-r from-brand-blue-50 via-white to-brand-blue-50/50 rounded-3xl p-8 sm:p-12 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-brand-blue-100">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Planning An Overseas Relocation?</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Schedule a free survey with our relocation consultant for custom volume calculation and paperwork assistance.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote('international-relocation')}
            className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all cursor-pointer flex-shrink-0"
          >
            Book Free Moving Survey
          </button>
        </div>
      </section>
    </div>
  );
};
