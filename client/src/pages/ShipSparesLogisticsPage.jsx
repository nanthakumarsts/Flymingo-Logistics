import React from 'react';
import { 
  Anchor, CheckCircle2, MapPin, Compass, ShieldCheck
} from 'lucide-react';
import { BRAND } from '../data/siteData';
import { PageBanner } from '../components/PageBanner';

export const ShipSparesLogisticsPage = ({ onOpenQuote }) => {
  const WORKFLOW = [
    {
      step: '01',
      title: 'Customs Provisions',
      desc: 'Executing specialized customs provisions for ship stores and in-transit spares to ensure zero customs duty and rapid gate release.'
    },
    {
      step: '02',
      title: 'Documentation Management',
      desc: 'Coordinating delivery orders (DO), vessel manifest amendments, customs bond filing, port security passes, and launch permissions.'
    },
    {
      step: '03',
      title: 'Secure Inland Transportation',
      desc: 'Dedicated GPS-tracked transport from Chennai / Bangalore / Mumbai international air cargo hubs directly to the designated seaport berth.'
    },
    {
      step: '04',
      title: 'Customs Clearance & Boarding',
      desc: 'Direct interface with customs boarding officers, preventive staff, and terminal security for priority clearance upon arrival.'
    },
    {
      step: '05',
      title: 'Direct On-Board Delivery',
      desc: 'Seamless deck delivery whether the vessel is berthed alongside quay or anchored at outer roads via licensed launch boat operations.'
    },
    {
      step: '06',
      title: 'Delivery Confirmation',
      desc: 'Immediate digital transmission of signed Master or Chief Engineer delivery receipts back to shipowners and technical managers.'
    }
  ];

  const PORTS = [
    'Chennai Port (ChPA)', 'Kattupalli Port', 'Kamarajar (Ennore) Port', 
    'V.O. Chidambaranar (Tuticorin) Port', 'Cochin Port', 'Jawaharlal Nehru Port (JNPT)',
    'Mumbai Port', 'Visakhapatnam Port', 'Mormugao Port (Goa)', 'New Mangalore Port'
  ];

  return (
    <div className="space-y-20 pb-20">
      <PageBanner eyebrow="24/7 maritime logistics" title="Ship spares & on-board delivery" description="Time-critical marine replacement parts cleared through customs and delivered direct to the vessel deck, without port detention." image="/assets/ship-spares-hd.jpg" action="Request spares delivery" onAction={() => onOpenQuote('ship-spares')} secondaryAction={<a href={`tel:${BRAND.primaryPhone}`} className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-brand-blue">Call 24/7 port hotline</a>} />

      {/* Integrated Import & Vessel Delivery Management */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            Operational Protocol
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Integrated Import &amp; Vessel Delivery Management
          </h2>
          <p className="text-xs text-slate-500">
            Synchronized logistics coordinating international air transit, bonded customs gate release, and launch boat operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKFLOW.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 hover:border-brand-blue transition-all">
              <div className="text-3xl font-black font-mono text-brand-blue/30">
                {item.step}
              </div>
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
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
                  Maritime Value Proposition
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Why Shipowners &amp; Technical Managers Choose Flymingo
                </h2>
                <span className="block h-1 w-14 rounded-full bg-brand-red" aria-hidden="true" />
              </div>

              <ul className="space-y-3">
                {[
                  { t: 'Zero Demurrage Risk:', d: 'We pre-clear documents before the cargo touched Indian soil, ensuring immediate dispatch upon flight arrival.' },
                  { t: 'Bonded Warehousing:', d: 'Consolidate multiple spare deliveries from Europe, Japan, and Korea in our bonded space until your vessel calls port.' },
                  { t: 'Outer Anchorage Launch:', d: 'Licensed supply boats and launch logistics for vessels taking bunkers or anchored off Chennai, Tuticorin, or Cochin.' },
                  { t: 'Off-Landed / Landing Spares:', d: 'Reverse logistics managing unserviceable equipment landed from the ship back to overseas OEMs for overhaul.' },
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

            {/* Right: Ports Network Card with Code Pills */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 shadow-md overflow-hidden self-start">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 bg-white">
                <div className="w-11 h-11 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-md shadow-brand-blue/20 shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">Active Port Network in India</h3>
                </div>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  24/7 Desk
                </span>
              </div>

              <p className="px-6 pt-5 text-xs sm:text-sm text-slate-600">
                Direct port entry permissions and customs boarding desks at key maritime gateways:
              </p>

              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'Chennai Port (ChPA)', code: 'MAA' },
                  { name: 'Kattupalli Port', code: 'KTP' },
                  { name: 'Kamarajar (Ennore)', code: 'ENR' },
                  { name: 'V.O.C. Tuticorin Seaport', code: 'VOC' },
                  { name: 'Cochin Seaport', code: 'COK' },
                  { name: 'Jawaharlal Nehru Port', code: 'JNP' },
                  { name: 'Mumbai Seaport', code: 'BOM' },
                  { name: 'Visakhapatnam Port', code: 'VTZ' },
                  { name: 'Mormugao Port (Goa)', code: 'GOI' },
                  { name: 'New Mangalore Port', code: 'IXE' },
                ].map((port, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-brand-blue/40 hover:shadow-sm transition-all"
                  >
                    <span className="shrink-0 min-w-[52px] text-center px-2 py-1.5 rounded-lg bg-brand-blue/10 text-brand-blue text-xs font-black font-mono tracking-wider">
                      {port.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 leading-snug">{port.name}</span>
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Vessel Arriving At Indian Port Soon?</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Send us your AWB details and vessel ETA for immediate customs pre-entry and launch planning.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote('ship-spares')}
            className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all cursor-pointer flex-shrink-0"
          >
            Dispatch Ship Spares
          </button>
        </div>
      </section>
    </div>
  );
};
