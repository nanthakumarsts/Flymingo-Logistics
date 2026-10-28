import React from 'react';
import { 
  ShieldCheck, CheckCircle2, FileText, ArrowRight, 
  MapPin, Clock, Award, Building, Landmark
} from 'lucide-react';
import { BRAND } from '../data/siteData';
import { PageBanner } from '../components/PageBanner';

export const CustomsClearancePage = ({ onOpenQuote }) => {
  const PILLARS = [
    {
      title: 'Accurate HS Code Classification',
      desc: 'Expert harmonization of complex industrial, electrical, chemical, and consumer goods under current Indian Customs Tariffs to avoid fines or detention.'
    },
    {
      title: 'Duty Optimization & Exemption Schemes',
      desc: 'Maximizing legitimate duty savings under EPCG, Advance Authorization, Project Imports, and FTA concessions for machinery and raw materials.'
    },
    {
      title: 'Bill of Entry & Shipping Bill Filing',
      desc: 'Fast electronic filing through ICEGATE EDI system with advance entry capabilities before the carrying vessel or aircraft arrives.'
    },
    {
      title: 'Physical Examination & Officer Sign-off',
      desc: 'On-ground operational staff present at port terminals and air cargo complexes to facilitate swift customs inspection and out-of-charge (OOC).'
    },
    {
      title: 'Bonded Warehouse Management',
      desc: 'In-bond and ex-bond customs clearances for deferred duty payments when storing goods in public or private bonded facilities.'
    },
    {
      title: 'Post-Clearance Logistics & Delivery',
      desc: 'Immediate container drayage or closed truck dispatch from port gates directly to your factory or warehouse floor.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      <PageBanner eyebrow="Licensed customs brokerage" title="Import & export customs clearance" description="Precise HS classification, duty valuation and rapid out-of-charge by an experienced customs house brokerage team." image="/assets/customs clearance.jpg" action="Consult customs broker" onAction={() => onOpenQuote('customs-clearance')} />

      {/* Main Content */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            Clearance Expertise
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Seamless Port &amp; Airport Customs Process
          </h2>
          <p className="text-xs text-slate-500">
            From finding the exact Harmonized System (HS) code to completing prompt assessment and release.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((p, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 hover:border-brand-blue transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                {idx + 1}
              </div>
              <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
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
                  Customs Value Proposition
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Why Importers &amp; Exporters Choose Flymingo CHA
                </h2>
                <span className="block h-1 w-14 rounded-full bg-brand-red" aria-hidden="true" />
              </div>

              <ul className="space-y-3">
                {[
                  { t: 'Zero Demurrage Protocol:', d: 'Advance bill of entry filing and prior inspection coordination preventing costly port demurrage and container detention.' },
                  { t: 'Accurate HS Classification:', d: 'Specialized tariff classification across machinery, electronics, and chemicals with zero misdeclaration risk.' },
                  { t: 'Government Scheme Benefits:', d: 'Maximizing duty exemptions under EPCG, Advance Authorization, and MOOWR bonded schemes.' },
                  { t: 'On-Ground Field Staff:', d: 'Experienced customs brokers stationed full-time at all major port gates and air cargo complexes.' },
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

            {/* Right: Licensed Port Coverage with Code Pills */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 shadow-md overflow-hidden self-start">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 bg-white">
                <div className="w-11 h-11 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-md shadow-brand-blue/20 shrink-0">
                  <Landmark className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">Licensed Port &amp; Airport Coverage</h3>
                </div>
              </div>

              <p className="px-6 pt-5 text-xs sm:text-sm text-slate-600">
                Direct licensed customs representation across South India and primary maritime entry gates:
              </p>

              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'Chennai Seaport & Air Cargo', code: 'MAA' },
                  { name: 'Coimbatore ICD & Airport', code: 'CJB' },
                  { name: 'V.O.C. Tuticorin Seaport', code: 'VOC' },
                  { name: 'Cochin Port & Airport', code: 'COK' },
                  { name: 'Kempegowda Bangalore Cargo', code: 'BLR' },
                  { name: 'Kattupalli Port & CFS', code: 'KTP' },
                  { name: 'Ennore Port (Kamarajar)', code: 'ENR' },
                  { name: 'Jawaharlal Nehru Port', code: 'JNP' },
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Need Urgent Customs Clearance Assistance?</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Contact our customs brokers today with your invoice and packing list for immediate HS code and duty analysis.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote('customs-clearance')}
            className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all cursor-pointer flex-shrink-0"
          >
            Request Customs Support
          </button>
        </div>
      </section>
    </div>
  );
};
