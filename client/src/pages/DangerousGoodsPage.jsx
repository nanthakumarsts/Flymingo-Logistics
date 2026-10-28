import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle, ShieldCheck, CheckCircle2, Flame,
  Atom, Zap, FileCheck, ArrowRight, Skull, BatteryCharging,
  Bomb, Wind, Droplets, FlaskConical, Droplet, ArrowUpRight
} from 'lucide-react';
import { BRAND } from '../data/siteData';
import { PageBanner } from '../components/PageBanner';

/* ---------- local styles (self-contained, prefixed hz-) ---------- */
const css = `
@keyframes hz-blob { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(24px,-20px) scale(1.08); } }
@keyframes hz-blink { 0%,100% { opacity: 1; } 50% { opacity: .25; } }
@keyframes hz-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

.hz-blob { animation: hz-blob 16s ease-in-out infinite; }
.hz-blink { animation: hz-blink 1.6s ease-in-out infinite; }
.hz-float { animation: hz-float 6s ease-in-out infinite; }

.hz-reveal { opacity: 0; transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1); }
.hz-up { transform: translateY(28px); }
.hz-left { transform: translateX(-30px); }
.hz-right { transform: translateX(30px); }
.hz-scale { transform: scale(.95); }
.hz-reveal.hz-in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .hz-stripe-move, .hz-blob, .hz-blink, .hz-float { animation: none; }
  .hz-reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
}
`;

const Reveal = ({ children, delay = 0, className = '', variant = 'up' }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`hz-reveal hz-${variant} ${shown ? 'hz-in' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

/* Placard colours follow the real UN hazard-class diamond colours */
const PLACARD = {
  1: { bg: '#f97316', fg: '#ffffff', icon: Bomb },
  2: { bg: '#16a34a', fg: '#ffffff', icon: Wind },
  3: { bg: '#dc2626', fg: '#ffffff', icon: Droplets },
  4: { bg: '#ef4444', fg: '#ffffff', icon: Flame },
  5: { bg: '#facc15', fg: '#1f2937', icon: FlaskConical },
  6: { bg: '#1f2937', fg: '#ffffff', icon: Skull },
  7: { bg: '#eab308', fg: '#1f2937', icon: Atom },
  8: { bg: '#334155', fg: '#ffffff', icon: Droplet },
  9: { bg: '#64748b', fg: '#ffffff', icon: BatteryCharging },
};

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
    <div className="space-y-20 pb-20 overflow-x-hidden">
      <style>{css}</style>

      <PageBanner eyebrow="IATA & IMDG certified" title="Expert handling of dangerous goods" description="Hazardous cargo logistics across air and sea with UN-certified packaging, DGD documentation and carrier-ready compliance." image="/assets/dg-hazmat-hd.jpg" action="Consult DG specialist" onAction={() => onOpenQuote('dg-shipping')} />

      {/* ========================================================= */}
      {/* DG CLASSES: hazard placard cards                          */}
      {/* ========================================================= */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
        <Reveal className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-xs font-extrabold uppercase tracking-widest text-amber-900">
            <AlertTriangle className="w-3.5 h-3.5" />
            Full Regulatory Scope
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            We Handle All DG Classes (1 through 9)
          </h2>
          <span className="mx-auto block h-1 w-14 rounded-full bg-brand-red" aria-hidden="true" />
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Certified documentation and packaging matching precise IATA Dangerous Goods Regulations (DGR) and IMO IMDG codes.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DG_CLASSES.map((dg, idx) => {
            const p = PLACARD[idx + 1];
            const Icon = p.icon;
            return (
              <Reveal key={idx} delay={(idx % 3) * 90} variant="scale" className="h-full">
                <div className="group relative h-full bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl hover:shadow-amber-500/15 hover:border-amber-400 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <span
                    className="absolute -right-2 -bottom-6 text-[8rem] font-black font-mono leading-none text-slate-900/[0.04] select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </span>

                  <div className="relative p-6 sm:p-7 flex items-start gap-5">
                    {/* diamond placard */}
                    <div className="relative shrink-0 w-[76px] h-[76px] flex items-center justify-center">
                      <div
                        className="absolute w-14 h-14 rotate-45 rounded-lg shadow-lg border-2 border-white ring-1 ring-slate-300 group-hover:rotate-[135deg] transition-transform duration-700"
                        style={{ background: p.bg }}
                        aria-hidden="true"
                      />
                      <Icon className="relative w-6 h-6" style={{ color: p.fg }} />
                    </div>

                    <div className="space-y-2 min-w-0">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-mono font-bold">
                        {dg.classNo}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 leading-snug">{dg.title}</h3>
                    </div>
                  </div>

                  <div className="relative px-6 sm:px-7 pb-7 -mt-1">
                    <p className="text-sm text-slate-600 leading-relaxed">{dg.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* COMPLIANCE + GATEWAYS: light split card with airport code pills */}
      {/* ========================================================= */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-200/90 shadow-xl">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 p-7 sm:p-12">
              {/* Left: why choose */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-extrabold uppercase tracking-widest text-amber-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
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
                      className="group relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-amber-400 hover:shadow-md hover:translate-x-1.5 transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-mono font-black group-hover:bg-amber-500 group-hover:text-white transition-colors">
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
                  <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
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
                        className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-sm transition-all"
                      >
                        <span className="shrink-0 min-w-[52px] text-center px-2 py-1.5 rounded-lg bg-amber-400 text-slate-900 text-sm font-black font-mono tracking-wider">
                          {code || <AlertTriangle className="w-4 h-4 mx-auto" />}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 leading-snug">{name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ========================================================= */}
      {/* CTA                                                       */}
      {/* ========================================================= */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-amber-50/70 via-white to-brand-blue-50/60 border border-slate-200 shadow-xl">
            <div className="relative p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <FileCheck className="absolute right-6 -bottom-8 w-56 h-56 text-slate-900/[0.04] -rotate-6 pointer-events-none" aria-hidden="true" />
              <div className="relative flex items-start gap-5 text-center md:text-left">
                <div className="hidden sm:flex hz-float w-16 h-16 rounded-2xl bg-amber-400 text-slate-900 items-center justify-center shadow-lg shadow-amber-500/25 shrink-0">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    Shipping Chemicals, Paints, or Batteries?
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                    Share your Material Safety Data Sheet (MSDS) with our DG desk for instant classification and UN box packing quotes.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenQuote('dg-shipping')}
                className="group relative shrink-0 px-9 py-4 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xl shadow-brand-red/30 transition-all hover:-translate-y-1 cursor-pointer flex items-center gap-2"
              >
                Submit DG Details
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default DangerousGoodsPage;