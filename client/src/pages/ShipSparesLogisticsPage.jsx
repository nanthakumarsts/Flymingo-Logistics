import React from 'react';
import { 
  Anchor, CheckCircle2, MapPin, Compass
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
      <PageBanner eyebrow="24/7 maritime logistics" title="Ship spares & on-board delivery" description="Time-critical marine replacement parts cleared through customs and delivered direct to the vessel deck, without port detention." image="/assets/any size.jpg" action="Request spares delivery" onAction={() => onOpenQuote('ship-spares')} secondaryAction={<a href={`tel:${BRAND.primaryPhone}`} className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-brand-blue">Call 24/7 port hotline</a>} />

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

      {/* Capabilities & Value Proposition */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
                Maritime Value Proposition
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Why Shipowners &amp; Technical Managers Choose Flymingo
              </h2>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Zero Demurrage Risk:</strong> We pre-clear documents before the cargo touched Indian soil, ensuring immediate dispatch upon flight arrival.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Bonded Warehousing:</strong> Consolidate multiple spare deliveries from Europe, Japan, and Korea in our bonded space until your vessel calls port.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Outer Anchorage Launch:</strong> Licensed supply boats and launch logistics for vessels taking bunkers or anchored off Chennai, Tuticorin, or Cochin.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Off-Landed / Landing Spares:</strong> Reverse logistics managing unserviceable equipment landed from the ship back to overseas OEMs for overhaul.</span>
                </li>
              </ul>
            </div>

            {/* Ports Network Card */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-brand-blue" />
                <h3 className="text-base font-bold text-slate-900">Active Port Network in India</h3>
              </div>
              <p className="text-xs text-slate-500">
                Direct port entry permissions and customs boarding desks at key maritime gateways:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
                {PORTS.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                    <span>{p}</span>
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
