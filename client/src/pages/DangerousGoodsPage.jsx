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
      <PageBanner eyebrow="IATA & IMDG certified" title="Expert handling of dangerous goods" description="Hazardous cargo logistics across air and sea with UN-certified packaging, DGD documentation and carrier-ready compliance." image="/assets/dg-hazmat-hd.jpg" action="Consult DG specialist" onAction={() => onOpenQuote('dg-shipping')} />

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

      {/* Capabilities & Value Proposition (2-Column Layout matching Ship Spares) */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
                Compliance Assurance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Why Choose Flymingo for Hazardous Shipments?
              </h2>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Certified DG Experts:</strong> In-house specialists certified under IATA DGR and IMDG codes to properly categorize, classify, and label cargo.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>UN-Certified Packaging:</strong> UN-specification 4G / 4GV packaging boxes, absorbent Vermiculite cushioning, and hazardous hazard labels.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Guaranteed Carrier Acceptance:</strong> Meticulous Dangerous Goods Declaration (DGD) paperwork guaranteeing zero carrier checklist rejections or flight hold-ups.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Emergency Response Protocol:</strong> 24/7 dedicated hazmat desk assisting with MSDS verification and multimodal DG routing.</span>
                </li>
              </ul>
            </div>

            {/* DG Handling Hubs Card */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Certified DG Gateways &amp; Air Terminals</h3>
              </div>
              <p className="text-xs text-slate-500">
                Approved dangerous goods packing stations and direct airline handling desks:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
                {[
                  'Chennai Air Cargo Complex (MAA)', 'Kempegowda Bangalore Cargo (BLR)',
                  'Coimbatore Air Cargo (CJB)', 'Tuticorin Port Hazmat Yard (VOC)',
                  'Cochin Special Cargo Terminal (COK)', 'Mumbai Air Cargo & JNPT (BOM)',
                  'Hyderabad Air Cargo (HYD)', 'Delhi Cargo Terminal (DEL)'
                ].map((hub, i) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>{hub}</span>
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Shipping Chemicals, Paints, or Batteries?</h2>
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
