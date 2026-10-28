import React from 'react';
import {
  ShieldCheck, CheckCircle2, ArrowRight
} from 'lucide-react';
import { BRAND } from '../data/siteData';
import { PageBanner } from '../components/PageBanner';

const DG_CLASSES = [
  { classNo: 'Class 1', title: 'Explosives', desc: 'Ammunition, flares, fireworks, blasting agents, and pyrotechnics handled under strict security clearance.' },
  { classNo: 'Class 2', title: 'Gases', desc: 'Flammable gases, non-flammable non-toxic compressed air, helium, refrigerated liquid nitrogen, and toxic gases.' },
  { classNo: 'Class 3', title: 'Flammable Liquids', desc: 'Paints, varnishes, adhesives, thinners, ethanol, perfumery products, and flammable industrial solvents.' },
  { classNo: 'Class 4', title: 'Flammable Solids', desc: 'Solids liable to spontaneous combustion, matchsticks, metal powders, and water-reactive substances.' },
  { classNo: 'Class 5', title: 'Oxidizers & Peroxides', desc: 'Chemical bleaches, swimming pool chlorine, hydrogen peroxide, fertilizer nitrates, and organic peroxides.' },
  { classNo: 'Class 6', title: 'Toxic & Infectious', desc: 'Pesticides, cyanides, toxic laboratory reagents, and clinical diagnostic specimens.' },
  { classNo: 'Class 7', title: 'Radioactive Materials', desc: 'Medical isotopes, radiographic testing equipment, and industrial radioactive sources.' },
  { classNo: 'Class 8', title: 'Corrosives', desc: 'Sulfuric acid, hydrochloric acid, caustic soda, wet car batteries, and mercury instruments.' },
  { classNo: 'Class 9', title: 'Misc Dangerous Goods', desc: 'Lithium-ion / metal batteries, powerbanks, dry ice, magnetized materials, and marine pollutants.' }
];

const WHY_POINTS = [
  { t: 'Certified DG Experts:', d: 'In-house specialists certified under IATA DGR and IMDG codes to properly categorize, classify, and label cargo.' },
  { t: 'UN-Certified Packaging:', d: 'UN-specification 4G / 4GV packaging boxes, absorbent Vermiculite cushioning, and hazardous hazard labels.' },
  { t: 'Guaranteed Carrier Acceptance:', d: 'Meticulous Dangerous Goods Declaration (DGD) paperwork guaranteeing zero carrier checklist rejections or flight hold-ups.' },
  { t: 'Emergency Response Protocol:', d: '24/7 dedicated hazmat desk assisting with MSDS verification and multimodal DG routing.' }
];

const HUBS = [
  'Chennai Air Cargo Complex (MAA)', 'Kempegowda Bangalore Cargo (BLR)',
  'Coimbatore Air Cargo (CJB)', 'Tuticorin Port Hazmat Yard (VOC)',
  'Cochin Special Cargo Terminal (COK)', 'Mumbai Air Cargo & JNPT (BOM)',
  'Hyderabad Air Cargo (HYD)', 'Delhi Cargo Terminal (DEL)'
];

const splitHub = (s) => {
  const m = s.match(/^(.*)\s\((.*)\)$/);
  return m ? { name: m[1], code: m[2] } : { name: s, code: '' };
};

export const DangerousGoodsPage = ({ onOpenQuote }) => {
  return (
    <div className="space-y-20 pb-20">
      <PageBanner eyebrow="IATA & IMDG certified" title="Expert handling of dangerous goods" description="Hazardous cargo logistics across air and sea with UN-certified packaging, DGD documentation and carrier-ready compliance." image="/assets/dg-hazmat-hd.jpg" action="Consult DG specialist" onAction={() => onOpenQuote('dg-shipping')} />

      {/* ========================================================= */}
      {/* DG CLASSES: Clean numbered cards matching other services pages */}
      {/* ========================================================= */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Full Regulatory Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              We Handle All DG Classes
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Certified documentation and packaging matching precise IATA Dangerous Goods Regulations (DGR) and IMO IMDG codes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DG_CLASSES.map((dg, idx) => {
              const numStr = String(idx + 1).padStart(2, '0');
              return (
                <div
                  key={idx}
                  className="group relative p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50/70 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-blue/50 hover:-translate-y-1 transition-all duration-300 space-y-3.5 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                  
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-brand-blue-50 text-brand-blue border border-brand-blue-100/80 flex items-center justify-center font-extrabold text-sm shadow-2xs group-hover:bg-brand-blue group-hover:text-white transition-colors font-mono">
                      {numStr}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-mono">
                      {dg.classNo}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors">
                    {dg.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {dg.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* COMPLIANCE + GATEWAYS: light split card matching other services pages */}
      {/* ========================================================= */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-200/90 shadow-xl">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 p-7 sm:p-12">
            {/* Left: why choose */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue-50 border border-brand-blue-100 text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
                  Compliance Assurance
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Why Choose Flymingo for Hazardous Shipments?
                </h2>
                <span className="block h-1 w-14 rounded-full bg-brand-red" aria-hidden="true" />
              </div>

              <ul className="space-y-3">
                {WHY_POINTS.map((w, i) => (
                  <li
                    key={i}
                    className="group relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-brand-blue/40 hover:shadow-md hover:translate-x-1.5 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center shrink-0 font-mono font-black group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="relative text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-bold">{w.t}</strong> {w.d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: departure-board style gateways in light theme */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 shadow-md overflow-hidden self-start">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 bg-white">
                <div className="w-11 h-11 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-md shadow-brand-blue/20 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">Certified DG Gateways &amp; Air Terminals</h3>
                </div>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Approved
                </span>
              </div>

              <p className="px-6 pt-5 text-xs sm:text-sm text-slate-600">
                Approved dangerous goods packing stations and direct airline handling desks:
              </p>

              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {HUBS.map((hub, i) => {
                  const { name, code } = splitHub(hub);
                  return (
                    <div
                      key={i}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-brand-blue/40 hover:shadow-sm transition-all"
                    >
                      <span className="shrink-0 min-w-[52px] text-center px-2 py-1.5 rounded-lg bg-brand-blue/10 text-brand-blue text-xs font-black font-mono tracking-wider">
                        {code}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 leading-snug">{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CTA (Light Theme matching other service pages)           */}
      {/* ========================================================= */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-gradient-to-r from-brand-blue-50 via-white to-brand-blue-50/50 rounded-3xl p-8 sm:p-12 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-brand-blue-100">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Shipping Chemicals, Paints, or Batteries?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Share your Material Safety Data Sheet (MSDS) with our DG desk for instant classification and UN box packing quotes.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote('dg-shipping')}
            className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all cursor-pointer flex-shrink-0"
          >
            Submit DG Details
          </button>
        </div>
      </section>
    </div>
  );
};

export default DangerousGoodsPage;