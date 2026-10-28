import React from 'react';
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
