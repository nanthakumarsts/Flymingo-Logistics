import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Clock, Award, Users, Globe, ArrowRight, 
  CheckCircle2, HeartHandshake, Compass, Check,
  Anchor, Sparkles, MapPin, Shield
} from 'lucide-react';
import { BRAND } from '../data/siteData';

export const AboutPage = ({ onOpenQuote }) => {
  const TIMELINE = [
    {
      year: 'Phase 1',
      title: 'Foundation',
      desc: 'Flymingo Logistics established as a trusted bridge connecting South India to NRI diaspora across the globe with reliable international courier dispatches.'
    },
    {
      year: 'Phase 2',
      title: 'Expanding Horizons',
      desc: 'Extended dedicated commercial air express lanes to the UK, United States, Canada, Australia, UAE, Singapore, and Europe with streamlined customs handoffs.'
    },
    {
      year: 'Phase 3',
      title: 'Multi-Modal Logistics',
      desc: 'Incorporated sea freight forwarding (FCL & LCL) and international relocation packers & movers with door-to-door unpack solutions.'
    },
    {
      year: 'Phase 4',
      title: 'Technological Leap',
      desc: 'Implemented real-time digital milestone tracking, instant fare calculation desks, and automated export paperwork processing.'
    },
    {
      year: 'Phase 5',
      title: 'Global Maritime Leader',
      desc: 'Launched specialized 24/7 Ship Spares Logistics & launch boat on-board deck deliveries across major Indian ports alongside certified Dangerous Goods (DG) compliance.'
    }
  ];

  const PILLARS = [
    {
      title: 'Our Values',
      desc: 'Uncompromising integrity, transparent customer service, and treating every single parcel as if it belongs to our own family.',
      image: '/assets/value.jpg'
    },
    {
      title: 'Certified Quality',
      desc: 'Multi-layer industrial grade packaging, shock-proof containers, and zero-defect compliance with international airline & port authorities.',
      image: '/assets/quality.jpg'
    },
    {
      title: 'Transparent Communication',
      desc: 'Direct WhatsApp and 24/7 desk access. You are never left in the dark about cargo transit, customs reviews, or vessel delivery timings.',
      image: '/assets/communication.jpg'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* ========================================================= */}
      {/* 1. CINEMATIC MARITIME EDITORIAL BANNER HERO               */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-brand-blue-dark text-white border-b border-white/15 pt-12 pb-16 lg:pt-16 lg:pb-20">
        {/* Full-bleed Photographic Background Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/assets/sea cargo.jpg" 
            alt="Flymingo Logistics Global Operations" 
            className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/98 via-brand-blue-dark/92 to-brand-blue-dark/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/95 via-transparent to-brand-blue-dark/85" />
          {/* Swiss Industrial Blueprint Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-brand-red/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-7">
          {/* Breadcrumb & Telemetry Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <nav className="flex items-center gap-2 text-white/70 font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-bold">About Us</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-mono text-[11px] text-white/90">
              <span>11°00'N 76°58'E — COIMBATORE HQ &bull; CHENNAI PORT HUB</span>
            </div>
          </div>

          {/* Banner Title & Subtext */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-block px-3 py-1 rounded-md bg-brand-red/20 border border-brand-red/50 text-brand-red-light text-[11px] font-mono font-extrabold uppercase tracking-widest">
              [ OUR MISSION &amp; HERITAGE // ESTABLISHED SOUTH INDIA ]
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              We Are The Bridge Between You And Your Relations.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-brand-red-light">
                Across Oceans &amp; Continents.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal pt-1 max-w-2xl">
              Delivering uncompromised trust, maritime operational rigor, and door-to-door courier precision connecting South India's industrial and family roots to 190+ countries worldwide.
            </p>
          </div>

          {/* High-Contrast Trust Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
            <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg transition-all flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <div className="text-sm font-black text-white">190+ Countries</div>
                <div className="text-[11px] text-white/70">Global Reach</div>
              </div>
            </div>

            <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg transition-all flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-red/25 border border-brand-red/40 flex items-center justify-center flex-shrink-0">
                <Anchor className="w-5 h-5 text-brand-red-light" />
              </div>
              <div>
                <div className="text-sm font-black text-white">10+ Major Ports</div>
                <div className="text-[11px] text-white/70">Berth Logistics</div>
              </div>
            </div>

            <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg transition-all flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="text-sm font-black text-white">24/7 Operations</div>
                <div className="text-[11px] text-white/70">Continuous Support</div>
              </div>
            </div>

            <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg transition-all flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <div className="text-sm font-black text-white">100% Licensed</div>
                <div className="text-[11px] text-white/70">Customs Brokerage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red">
              <Compass className="w-4 h-4" />
              <span>Who We Are</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              A Dedicated Team with Deep Maritime &amp; Air Freight Heritage
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Flymingo Logistics is an International Logistics company that offers high-quality international courier services, professional packers and movers, ocean &amp; air freight forwarding, time-critical ship spares logistics, licensed customs clearance brokerage, and certified dangerous goods handling.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Headquartered in Coimbatore with our major seaport and airport logistics operations based in Chennai, we bridge local manufacturers, international traders, maritime fleet managers, and families worldwide with speed, security, and competitive rates.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-bold text-brand-blue font-mono">100%</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">Customs Compliance</div>
                <p className="text-[11px] text-slate-500 mt-1">Exact HS code classification &amp; legal document filing</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-bold text-brand-red font-mono">24/7</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">Vessel &amp; Air Support</div>
                <p className="text-[11px] text-slate-500 mt-1">Direct coordination with port authorities &amp; airlines</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
              <img 
                src="/assets/international_courier_banner.jpg" 
                alt="Flymingo Logistics Global Operations" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Goals */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Our Core Mission
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Low Cost and Quick Delivery
            </h2>
            <p className="text-xs text-slate-500">
              Delivering unbeatable freight rates without compromising packaging integrity or transit speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Economical Pricing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aggressive bulk volume discounts negotiated directly with major commercial airlines and international container shipping lines passed on to you.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-red-50 text-brand-red flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Express Rapid Transit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Priority uplift agreements with cargo carriers ensure your parcels and urgent spares fly on the next immediate flight out (NFO).
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Surprise Fees</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transparent, upfront itemized quotations including export paperwork, packaging materials, and delivery without hidden surcharges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values, Quality & Communication (With original assets) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
            The Flymingo Virtues
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Values, Quality &amp; Communication
          </h2>
          <p className="text-xs text-slate-500">
            The foundational pillars guiding every customer interaction and cargo movement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((p, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col"
            >
              <div className="h-48 overflow-hidden bg-slate-100">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-brand-blue">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Guaranteed Standard</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Growth Journey Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            Milestones
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Our Journey of Growth
          </h2>
          <p className="text-xs text-slate-500">
            From our founding to a globally respected freight &amp; maritime logistics partner.
          </p>
        </div>

        <div className="relative pl-8 sm:pl-10 space-y-8 before:absolute before:left-3.5 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {TIMELINE.map((item, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              <div className="absolute -left-8 sm:-left-10 top-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-blue text-white text-xs font-bold flex items-center justify-center ring-4 ring-white shadow-xs">
                {idx + 1}
              </div>
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <span className="text-xs font-bold text-brand-red bg-brand-red/10 px-2.5 py-0.5 rounded-full">
                    {item.year}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Ready To Ship With Flymingo Logistics?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Get in touch with our operations team today for customized quotations, vessel logistics planning, or courier pickup.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenQuote}
              className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-sm font-bold shadow-lg transition-all cursor-pointer"
            >
              Get Fare Rate Quote
            </button>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-sm font-bold transition-all"
            >
              Contact Our Offices
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
