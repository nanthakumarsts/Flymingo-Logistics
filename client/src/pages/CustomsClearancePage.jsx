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

      {/* Capabilities & Value Proposition (2-Column Layout matching Ship Spares) */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
                Customs Value Proposition
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Why Importers &amp; Exporters Choose Flymingo CHA
              </h2>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Zero Demurrage Protocol:</strong> Advance bill of entry filing and prior inspection coordination preventing costly port demurrage and container detention.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Accurate HS Classification:</strong> Specialized tariff classification across machinery, electronics, and chemicals with zero misdeclaration risk.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Government Scheme Benefits:</strong> Maximizing duty exemptions under EPCG, Advance Authorization, and MOOWR bonded schemes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span><strong>On-Ground Field Staff:</strong> Experienced customs brokers stationed full-time at all major port gates and air cargo complexes.</span>
                </li>
              </ul>
            </div>

            {/* Ports Handled Card */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-brand-blue" />
                <h3 className="text-base font-bold text-slate-900">Licensed Port &amp; Airport Coverage</h3>
              </div>
              <p className="text-xs text-slate-500">
                Direct licensed customs representation across South India and primary maritime entry gates:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
                {[
                  'Chennai Seaport & Air Cargo (MAA)', 'Coimbatore ICD & Airport (CJB)',
                  'V.O.C. Tuticorin Seaport (VOC)', 'Cochin Port & Airport (COK)',
                  'Kempegowda Bangalore Cargo (BLR)', 'Kattupalli Port & CFS',
                  'Ennore Port (Kamarajar)', 'Jawaharlal Nehru Port (JNPT)'
                ].map((port, i) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                    <span>{port}</span>
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
