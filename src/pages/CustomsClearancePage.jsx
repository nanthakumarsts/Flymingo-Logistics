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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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

      {/* Ports Handled */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
              Coverage Gateways
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Airports, Seaports &amp; Inland Container Depots (ICD)
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct licensed customs representation across South India and primary maritime entry gates:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold text-slate-800">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-brand-blue font-bold">Chennai Seaport &amp; Airport</div>
              <p className="text-[11px] font-normal text-slate-500">Customs House Chennai, Meenambakkam Air Cargo Complex &amp; Port Terminals</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-brand-blue font-bold">Coimbatore ICD &amp; Airport</div>
              <p className="text-[11px] font-normal text-slate-500">Irugur Inland Container Depot &amp; Peelamedu Air Cargo</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-brand-blue font-bold">V.O.C. Tuticorin Seaport</div>
              <p className="text-[11px] font-normal text-slate-500">Tuticorin Custom House &amp; all container freight stations (CFS)</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-brand-blue font-bold">Cochin &amp; Bangalore Hubs</div>
              <p className="text-[11px] font-normal text-slate-500">Vallarpadam ICTT Cochin &amp; Kempegowda Bangalore Air Cargo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Need Urgent Customs Clearance Assistance?</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Contact our customs brokers today with your invoice and packing list for immediate HS code and duty analysis.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote('customs-clearance')}
            className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer flex-shrink-0"
          >
            Request Customs Support
          </button>
        </div>
      </section>
    </div>
  );
};
