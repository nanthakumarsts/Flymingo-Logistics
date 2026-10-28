import React from 'react';
import { CheckCircle2, Compass, MapPin, ShieldCheck } from 'lucide-react';
import { BRAND } from '../data/siteData';
import { PageBanner } from '../components/PageBanner';

export const InternationalCourierPage = ({ onOpenQuote }) => {
  return (
    <div className="space-y-20 pb-20">
      <PageBanner eyebrow="Doorstep express service" title="Fast, reliable global courier delivery" description="B2B commercial dispatches, B2C e-commerce and C2C personal packages delivered worldwide with speed and care." image="/assets/international_courier_banner.jpg" action="Get courier fare rate" onAction={() => onOpenQuote('international-courier')} />

      {/* B2B & B2C Enterprise Features */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Commercial Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              B2B &amp; B2C International Express
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Any size, any weight, we provide custom shipping solutions with end-to-end customs support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50/70 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-blue/50 hover:-translate-y-1 transition-all duration-300 space-y-3.5 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-brand-blue-50 text-brand-blue border border-brand-blue-100/80 flex items-center justify-center font-extrabold text-sm shadow-2xs group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  01
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">Flexible Capacity</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors">Any Size, Any Weight</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From small envelope documents of 0.5 kg to multi-carton commercial export consignments of 500+ kg.
              </p>
            </div>

            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50/70 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 space-y-3.5 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-extrabold text-sm shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  02
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">100% Compliant</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">Customs Formalities Handled</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete handling of shipping bills, export declarations, and destination country customs documentation.
              </p>
            </div>

            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50/70 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-red/50 hover:-translate-y-1 transition-all duration-300 space-y-3.5 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-rose-50 text-brand-red border border-rose-100 flex items-center justify-center font-extrabold text-sm shadow-2xs group-hover:bg-brand-red group-hover:text-white transition-colors">
                  03
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">FDA / Norms</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-red transition-colors">Origin &amp; Destination Norms</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strict adherence to FDA guidelines for USA, UK customs declarations, and Middle East import regulations.
              </p>
            </div>

            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50/70 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 space-y-3.5 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center font-extrabold text-sm shadow-2xs group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  04
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">Multi-Layer Safe</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">Complete Packaging Solution</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Heavy-duty corrugated boxes, moisture-proof wrapping, and custom wooden crating for fragile goods.
              </p>
            </div>

            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50/70 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-500/50 hover:-translate-y-1 transition-all duration-300 space-y-3.5 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center font-extrabold text-sm shadow-2xs group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  05
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">Live Milestone</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">End-to-End Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track every milestone online with automated updates from doorstep pickup to destination delivery.
              </p>
            </div>

            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50/70 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 space-y-3.5 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center font-extrabold text-sm shadow-2xs group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  06
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">Free Dispatch</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">Free Doorstep Pickup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Convenient pickup from your doorstep in Coimbatore, Chennai, Tirupur, Erode, Salem, and surrounding regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities & Value Proposition (2-Column Layout matching Ship Spares) */}
      {/* Capabilities & Value Proposition (Light Split Card) */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-200/90 shadow-xl">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 p-7 sm:p-12">
            {/* Left: Value Points */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue-50 border border-brand-blue-100 text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
                  Worldwide Express Value Proposition
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Why Global Senders &amp; Businesses Choose Flymingo
                </h2>
                <span className="block h-1 w-14 rounded-full bg-brand-red" aria-hidden="true" />
              </div>

              <ul className="space-y-3">
                {[
                  { t: 'Doorstep Pickup Guarantee:', d: 'Same-day doorstep collection across Coimbatore, Chennai, Tirupur, Erode, and all South India hubs.' },
                  { t: 'Food-Grade Protective Packing:', d: 'Specialized vacuum packaging maintaining freshness of homemade sweets, snacks, and masalas to USA, UK, UAE & Canada.' },
                  { t: 'Express Air Transit:', d: 'Priority uplift via top global airline partners with guaranteed 2 to 4 business days transit time.' },
                  { t: 'End-to-End Tracking:', d: 'Transparent live milestone tracking with automated WhatsApp & SMS delivery confirmations with signature proof.' },
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

            {/* Right: Global Destinations Network with Code Pills */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 shadow-md overflow-hidden self-start">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 bg-white">
                <div className="w-11 h-11 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-md shadow-brand-blue/20 shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">Active Global Courier Network</h3>
                </div>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  190+ Countries
                </span>
              </div>

              <p className="px-6 pt-5 text-xs sm:text-sm text-slate-600">
                Direct express air corridors with daily flights and prompt customs clearance at major destinations:
              </p>

              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'United States', code: 'USA' },
                  { name: 'United Kingdom', code: 'GBR' },
                  { name: 'United Arab Emirates', code: 'UAE' },
                  { name: 'Canada', code: 'CAN' },
                  { name: 'Australia & NZ', code: 'AUS' },
                  { name: 'Singapore & Malaysia', code: 'SGP' },
                  { name: 'Germany & Europe', code: 'DEU' },
                  { name: 'Saudi Arabia & Qatar', code: 'SAU' },
                  { name: 'Kuwait & Bahrain', code: 'KWT' },
                  { name: 'Sri Lanka & Maldives', code: 'LKA' },
                ].map((dest, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-brand-blue/40 hover:shadow-sm transition-all"
                  >
                    <span className="shrink-0 min-w-[52px] text-center px-2 py-1.5 rounded-lg bg-brand-blue/10 text-brand-blue text-xs font-black font-mono tracking-wider">
                      {dest.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 leading-snug">{dest.name}</span>
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Need an Express Pickup Today?</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Call our courier booking hotline or request an instant doorstep rate quote online.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onOpenQuote('international-courier')}
              className="px-7 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all cursor-pointer"
            >
              Get Fare Rate Quote
            </button>
            <a
              href={`tel:${BRAND.primaryPhone}`}
              className="px-7 py-3 bg-white border border-slate-300 text-slate-800 hover:text-brand-blue hover:border-brand-blue rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              Call {BRAND.primaryPhone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
