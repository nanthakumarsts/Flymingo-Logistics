import React from 'react';
import { 
  AlertTriangle, ShieldCheck, CheckCircle2, Flame, 
  Atom, Zap, FileCheck, ArrowRight, Skull, BatteryCharging
} from 'lucide-react';
import { BRAND } from '../data/siteData';
import { PageBanner } from '../components/PageBanner';

export const DangerousGoodsPage = ({ onOpenQuote }) => {
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

  return (
    <div className="space-y-20 pb-20">
      <PageBanner eyebrow="IATA & IMDG certified" title="Expert handling of dangerous goods" description="Hazardous cargo logistics across air and sea with UN-certified packaging, DGD documentation and carrier-ready compliance." image="/assets/certification.jpg" action="Consult DG specialist" onAction={() => onOpenQuote('dg-shipping')} />

      {/* DG Classes Grid */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            Full Regulatory Scope
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            We Handle All DG Classes (1 through 9)
          </h2>
          <p className="text-xs text-slate-500">
            Certified documentation and packaging matching precise IATA Dangerous Goods Regulations (DGR) and IMO IMDG codes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DG_CLASSES.map((dg, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-amber-400 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-mono font-bold">
                  {dg.classNo}
                </span>
                <Flame className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{dg.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{dg.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us for DG */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
              Compliance Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Choose Flymingo for Hazardous Shipments?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Certified DG Experts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In-house specialists certified under IATA DGR and IMDG codes to properly categorize, classify, and label cargo.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">UN-Certified Packaging</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                UN-specification 4G / 4GV packaging boxes, absorbent Vermiculite cushioning, and hazardous hazard labels.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Guaranteed Carrier Acceptance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Meticulous Dangerous Goods Declaration (DGD) paperwork guaranteeing zero carrier checklist rejections or flight hold-ups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Shipping Chemicals, Paints, or Batteries?</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Share your Material Safety Data Sheet (MSDS) with our DG desk for instant classification and UN box packing quotes.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote('dg-shipping')}
            className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer flex-shrink-0"
          >
            Submit DG Details
          </button>
        </div>
      </section>
    </div>
  );
};
