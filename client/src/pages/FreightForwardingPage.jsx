import React from 'react';
import { 
  Plane, Ship, CheckCircle2, ShieldCheck, ArrowRight, 
  Clock, Anchor, Globe, Boxes, Layers
} from 'lucide-react';
import { BRAND } from '../data/siteData';
import { PageBanner } from '../components/PageBanner';

export const FreightForwardingPage = ({ onOpenQuote }) => {
  const AIR_FEATURES = [
    { title: 'Airline Price Negotiation', desc: 'Direct contract rates with tier-1 international carriers to minimize your per-kilogram freight spend.' },
    { title: 'Optimal Flight Routing', desc: 'Direct and consolidated routing to minimize dwell times and bypass congested international hubs.' },
    { title: 'Certified DG Shipping', desc: 'Compliant air transport for lithium batteries, chemicals, perfumes, aerosols, and hazardous samples.' },
    { title: 'Fragile & High-Value Cargo', desc: 'Specially engineered shock-absorbing pallets and dedicated hold spaces for delicate avionics & electronics.' },
    { title: 'Unshaked Package Handling', desc: 'Rigid strapping, anti-vibration damping, and temperature-controlled cold chain air transport.' }
  ];

  const SEA_FEATURES = [
    { title: 'FCL (Full Container Load)', desc: 'Dedicated 20ft, 40ft, 40ft High Cube, Reefer, and Open Top containers with guaranteed carrier allocations.' },
    { title: 'LCL (Less than Container Load)', desc: 'Economical cargo consolidation services enabling small and medium shipments to move at container rates.' },
    { title: 'Global Liner Network', desc: 'Strong alliances with Maersk, MSC, CMA CGM, Hapag-Lloyd, and regional feeder vessels.' },
    { title: 'Inland CFS & Port Drayage', desc: 'Seamless transport from inland manufacturing centers in Tamil Nadu to Chennai and Tuticorin seaports.' },
    { title: 'Customs & Port Handover', desc: 'Complete bonded yard management, terminal handling oversight, and customs documentation.' }
  ];

  return (
    <div className="space-y-20 pb-20">
      <PageBanner pageKey="freight-forwarding" eyebrow="Multimodal global freight" title="Freight forwarding by sea & air" description="Seamless international ocean container shipping and expedited air cargo, backed by competitive freight rate negotiation." image="/assets/air cargo.jpg" action="Request freight rate" onAction={() => onOpenQuote('freight-forwarding')} />

      {/* Air Cargo Section */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center">
                <Plane className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">Priority Transit</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">AIR CARGO SOLUTIONS</h2>
              </div>
            </div>
            <button
              onClick={() => onOpenQuote('freight-forwarding')}
              className="px-5 py-2.5 bg-brand-blue-50 hover:bg-brand-blue hover:text-white text-brand-blue rounded-xl text-xs font-bold transition-all self-start sm:self-auto cursor-pointer"
            >
              Book Air Cargo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AIR_FEATURES.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sea Cargo Section */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center">
                <Ship className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">Ocean Containers</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">SEA CARGO SOLUTIONS</h2>
              </div>
            </div>
            <button
              onClick={() => onOpenQuote('freight-forwarding')}
              className="px-5 py-2.5 bg-brand-blue-50 hover:bg-brand-blue hover:text-white text-brand-blue rounded-xl text-xs font-bold transition-all self-start sm:self-auto cursor-pointer"
            >
              Book Sea Cargo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEA_FEATURES.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities & Value Proposition (Light Split Card) */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-200/90 shadow-xl">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 p-7 sm:p-12">
            {/* Left: Value Points */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue-50 border border-brand-blue-100 text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
                  Multi-Modal Value Proposition
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Why Exporters &amp; Importers Choose Flymingo Freight
                </h2>
                <span className="block h-1 w-14 rounded-full bg-brand-red" aria-hidden="true" />
              </div>

              <ul className="space-y-3">
                {[
                  { t: 'Direct Contract Pricing:', d: 'Direct volume contracts with top airline and ocean container alliances ensuring competitive landed costs.' },
                  { t: 'FCL & LCL Consolidation:', d: 'Flexible containerized solutions from single pallet groupage to multi-container factory projects.' },
                  { t: 'Priority Booking Desk:', d: 'Guaranteed space allocation during peak shipping seasons on both maritime and air cargo lanes.' },
                  { t: 'Zero Demurrage Risk:', d: 'Advance customs EDI filing and synchronized terminal drayage for instant port gate release.' },
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

            {/* Right: Global Corridors & Port Network Card with Code Pills */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 shadow-md overflow-hidden self-start">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 bg-white">
                <div className="w-11 h-11 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-md shadow-brand-blue/20 shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">Active Freight Corridors &amp; Hubs</h3>
                </div>
              </div>

              <p className="px-6 pt-5 text-xs sm:text-sm text-slate-600">
                Direct maritime and air cargo gateways connecting South India to global trade centers:
              </p>

              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'Chennai Port & Air Cargo', code: 'MAA' },
                  { name: 'V.O.C. Tuticorin Seaport', code: 'VOC' },
                  { name: 'Cochin ICTT Vallarpadam', code: 'COK' },
                  { name: 'Kattupalli & Ennore', code: 'KTP' },
                  { name: 'JNPT Mumbai Gateway', code: 'BOM' },
                  { name: 'Kempegowda Bangalore', code: 'BLR' },
                  { name: 'Rotterdam Port (EU)', code: 'RTM' },
                  { name: 'Hamburg Port (EU)', code: 'HAM' },
                  { name: 'Dubai Port (Jebel Ali)', code: 'DXB' },
                  { name: 'Singapore PSA Hub', code: 'SIN' },
                ].map((hub, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-brand-blue/40 hover:shadow-sm transition-all"
                  >
                    <span className="shrink-0 min-w-[52px] text-center px-2 py-1.5 rounded-lg bg-brand-blue/10 text-brand-blue text-xs font-black font-mono tracking-wider">
                      {hub.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 leading-snug">{hub.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action (Light Theme) */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-gradient-to-r from-brand-blue-50 via-white to-brand-blue-50/50 rounded-3xl p-8 sm:p-12 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-brand-blue-100">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Need Multi-Modal Ocean &amp; Air Logistics?</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our freight desk coordinates container slots, vessel charters, and export/import customs paperwork.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote('freight-forwarding')}
            className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all cursor-pointer flex-shrink-0"
          >
            Get Custom Freight Quote
          </button>
        </div>
      </section>
    </div>
  );
};
