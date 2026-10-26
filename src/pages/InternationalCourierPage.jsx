import React from 'react';
import { 
  CheckCircle2
} from 'lucide-react';
import { BRAND } from '../data/siteData';

export const InternationalCourierPage = ({ onOpenQuote }) => {
  const C2C_ITEMS = [
    { title: 'Sweets & Snacks', desc: 'Vacuum-sealed traditional Indian sweets, savory snacks & festive items delivered fresh.', icon: '/assets/sweet snacks.png' },
    { title: 'Homemade Masalas', desc: 'Hygienically packaged homemade spice blends, powders, sambar & curry powders.', icon: '/assets/home made masala.png' },
    { title: 'Household Items', desc: 'Decor, kitchen essentials, pooja items, books, and family belongings.', icon: '/assets/household.png' },
    { title: 'Imitation Jewellery', desc: 'Fashion ornaments, traditional temple jewellery, and bridal accessories.', icon: '/assets/imitation jewels.png' },
    { title: 'Clothes & Dresses', desc: 'Ethnic wear, sarees, stitched garments, suits, and daily apparel.', icon: '/assets/dress cloths.png' },
    { title: 'Gift Articles', desc: 'Birthday presents, wedding invitations, crafts, and festive mementos.', icon: '/assets/gifts.png' },
    { title: 'Utensils & Cookware', desc: 'Brass, copper, stainless steel, and traditional cooking vessels.', icon: '/assets/utensils.png' },
    { title: 'Legal & Educational Docs', desc: 'Degree certificates, marksheets, power of attorney, and contracts.', icon: '/assets/document.png' }
  ];

  const DELIVERABLES = [
    { title: 'University Documents', desc: 'WES transcripts, marksheets, university applications & student I-20 papers with tamper-proof envelopes.' },
    { title: 'Medicine Delivery', desc: 'Doctor-prescribed allopathic and ayurvedic medicines delivered with necessary customs clearance support.' },
    { title: 'Homemade Food', desc: 'Specialized vacuum packaging keeping homemade treats fresh to the USA, UK, Canada, Australia, and UAE.' },
    { title: 'Excess Baggage', desc: 'Ship your excess student luggage and personal travel belongings at up to 70% cheaper than airport excess rates.' },
    { title: 'Commercial Samples', desc: 'Garment samples, engineering prototypes, yarn, and business demonstration goods with commercial invoices.' }
  ];

  const STEPS = [
    { num: '01', title: 'Book a Pickup', desc: 'Schedule a doorstep collection at your home, factory, or office in Coimbatore, Chennai, or across Tamil Nadu.' },
    { num: '02', title: 'We Pack & Label', desc: 'Our team performs multi-layer corrugated, bubble, or vacuum sealing, along with destination compliant labelling.' },
    { num: '03', title: 'Global Air Transit', desc: 'Priority uplift via top international airline partners with full real-time milestone tracking.' },
    { num: '04', title: 'Doorstep Delivery', desc: 'Hassle-free customs clearance and direct delivery into the hands of the consignee with signature proof.' }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-blue-50/80 via-white to-slate-50 py-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-bold uppercase tracking-widest">
            Doorstep Express Service
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Fast, Reliable &amp; Global Courier Delivery
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Connecting families and businesses worldwide. B2B commercial dispatches, B2C e-commerce, and C2C personal packages delivered with speed and care.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenQuote('international-courier')}
              className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-red/25 transition-all cursor-pointer"
            >
              Get Courier Fare Rate
            </button>
          </div>
        </div>
      </section>

      {/* B2B & B2C Enterprise Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900">Any Size, Any Weight</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From small envelope documents of 0.5 kg to multi-carton commercial export consignments of 500+ kg.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900">Customs Formalities Handled</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete handling of shipping bills, export declarations, and destination country customs documentation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900">Origin &amp; Destination Norms</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strict adherence to FDA guidelines for USA, UK customs declarations, and Middle East import regulations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900">Complete Packaging Solution</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Heavy-duty corrugated boxes, moisture-proof wrapping, and custom wooden crating for fragile goods.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                05
              </div>
              <h3 className="text-sm font-bold text-slate-900">End-to-End Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track every milestone online with automated updates from doorstep pickup to destination delivery.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                06
              </div>
              <h3 className="text-sm font-bold text-slate-900">Free Doorstep Pickup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Convenient pickup from your doorstep in Coimbatore, Chennai, Tirupur, Erode, Salem, and surrounding regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* C2C Personal & Family Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
            Personal &amp; Family Care
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            C2C Express: Send Love to NRI Families
          </h2>
          <p className="text-xs text-slate-500">
            Send homemade food, festival sweets, traditional clothing, and gifts to your loved ones abroad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {C2C_ITEMS.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-brand-blue transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-50 p-2 border border-slate-200 flex items-center justify-center">
                  <img 
                    src={item.icon} 
                    alt={item.title} 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
              <span className="text-[11px] font-bold text-brand-blue">Vacuum Pack Available &rarr;</span>
            </div>
          ))}
        </div>
      </section>

      {/* Everything We Deliver */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              All Categories
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Everything We Deliver Safely
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DELIVERABLES.map((d, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <h3 className="text-sm font-bold text-slate-900">{d.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
            Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            How International Delivery Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 relative">
              <div className="text-3xl font-black font-mono text-brand-blue/30">
                {s.num}
              </div>
              <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Need an Express Pickup Today?</h2>
            <p className="text-xs sm:text-sm text-slate-200">
              Call our courier booking hotline or request an instant doorstep rate quote online.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onOpenQuote('international-courier')}
              className="px-7 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              Get Fare Rate Quote
            </button>
            <a
              href={`tel:${BRAND.primaryPhone}`}
              className="px-7 py-3 bg-white text-brand-blue hover:bg-slate-100 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Call {BRAND.primaryPhone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
