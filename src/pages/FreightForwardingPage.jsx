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
      <PageBanner eyebrow="Multimodal global freight" title="Freight forwarding by sea & air" description="Seamless international ocean container shipping and expedited air cargo, backed by competitive freight rate negotiation." image="/assets/air cargo.jpg" action="Request freight rate" onAction={() => onOpenQuote('freight-forwarding')} />

      {/* Air Cargo Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Need Multi-Modal Ocean &amp; Air Logistics?</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Our freight desk coordinates container slots, vessel charters, and export/import customs paperwork.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote('freight-forwarding')}
            className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer flex-shrink-0"
          >
            Get Custom Freight Quote
          </button>
        </div>
      </section>
    </div>
  );
};
