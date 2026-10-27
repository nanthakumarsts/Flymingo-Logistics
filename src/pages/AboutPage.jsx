import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Clock, Award, Users, Globe, ArrowRight, 
  CheckCircle2, HeartHandshake, Compass, Check,
  Anchor, Sparkles, MapPin, Shield, Plane, Boxes,
  TrendingUp, ArrowUpRight, ChevronRight
} from 'lucide-react';
import { BRAND } from '../data/siteData';
import { FlightRouteMap } from '../components/FlightRouteMap';

export const AboutPage = ({ onOpenQuote }) => {
  const [activePhase, setActivePhase] = useState(0);

  const TIMELINE = [
    {
      phase: '01',
      stage: 'Phase 1 // Inception',
      title: 'Foundation & NRI Express Network',
      desc: 'Established in Coimbatore as a dependable logistics bridge connecting South Indian families, businesses, and expatriates to 190+ global destinations with personal care.',
      icon: Globe,
      badge: 'Cross-Border Personal Express',
      metric: 'Coimbatore & South India Hub',
      features: ['Dedicated NRI Family Support', 'Door-to-Door International Courier', 'Strict Document Security']
    },
    {
      phase: '02',
      stage: 'Phase 2 // Network Scale',
      title: 'Global Commercial Air Express Corridors',
      desc: 'Expanded direct commercial air priority lanes into the UK, United States, Canada, Australia, UAE, Singapore, and Europe with express customs handoffs.',
      icon: Plane,
      badge: 'Priority Air Transit Corridors',
      metric: 'Direct Airport Hub Clearances',
      features: ['IATA Priority Routing', 'Rapid Transit Commercial Samples', 'Customs Formalities Pre-Check']
    },
    {
      phase: '03',
      stage: 'Phase 3 // Multi-Modal',
      title: 'Ocean Freight & International Relocation',
      desc: 'Scaled into full-container (FCL) and consolidated (LCL) ocean freight forwarding alongside dedicated overseas household packers & movers with turnkey relocation.',
      icon: Boxes,
      badge: 'Intermodal Freight Operations',
      metric: 'Ocean & Land Intermodal',
      features: ['Turnkey Household Relocation', 'FCL & LCL Container Solutions', 'Industrial Multi-Layer Packing']
    },
    {
      phase: '04',
      stage: 'Phase 4 // Modernization',
      title: 'Digital EDI & Automated Customs Filing',
      desc: 'Deployed real-time cargo milestone tracking, online fare estimation calculators, and direct electronic data interchange (EDI) filings with Indian customs.',
      icon: ShieldCheck,
      badge: 'Digital Clearing Infrastructure',
      metric: 'Zero-Demurrage Protocol',
      features: ['Direct Customs Seaport EDI', 'Live GPS Tracking Visibility', 'Automated Export Billing']
    },
    {
      phase: '05',
      stage: 'Phase 5 // Offshore Leadership',
      title: 'Maritime Berth Spares & Certified DG Handling',
      desc: 'Launched 24/7 dedicated Ship Spares Logistics with offshore launch boat deck deliveries across major Indian ports, paired with certified IMO/IATA Dangerous Goods operations.',
      icon: Anchor,
      badge: '24/7 Port Deck Delivery',
      metric: 'All Major Indian Seaports',
      features: ['Outer Anchorage Boat Hand-over', 'IMO Certified Dangerous Goods (DG)', '24/7 Dedicated Ops Command Desk']
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
      <section className="relative overflow-hidden bg-brand-blue-dark text-white border-b border-white/10 py-12 sm:py-16 lg:py-20 select-none">
        {/* Full-bleed Photographic Background Texture with continuous Ken Burns motion */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/assets/sea cargo.jpg" 
            alt="Flymingo Logistics Global Operations" 
            className="w-full h-full object-cover object-center opacity-80 scale-105 fm-kb-0"
          />
        </div>
        <div className="absolute inset-0 bg-[#001426]/60 z-0 pointer-events-none" aria-hidden="true" />
        <FlightRouteMap className="opacity-40 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Breadcrumb & Telemetry Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <nav className="flex items-center gap-2 text-white/80 font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">/</span>
              <span className="text-brand-red-light font-bold">About Us</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 font-mono text-[11px] text-white/90 shadow-md">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span>11°00'N 76°58'E — COIMBATORE HQ &bull; CHENNAI PORT HUB</span>
            </div>
          </div>

          {/* Banner Title & Subtext */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono font-extrabold uppercase tracking-widest text-brand-red-light shadow-md">
              SOUTH INDIA &rarr; THE WORLD // OUR MISSION &amp; HERITAGE
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              We Are The Bridge Between You And Your Relations.<br />
              <span className="text-brand-red font-black">
                Across Oceans &amp; Continents.
              </span>
            </h1>

            <p className="text-base sm:text-xl font-bold text-white/95 tracking-wide drop-shadow-md">
              Connecting Families. Empowering Global Trade.
            </p>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Delivering uncompromised trust, maritime operational rigor, and door-to-door courier precision connecting South India's industrial and family roots to 190+ countries worldwide.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={() => onOpenQuote()}
              className="group px-7 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-brand-red/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3"
            >
              <span>Explore Our Services</span>
              <span className="w-6 h-6 rounded-full bg-black/25 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-3.5 w-3.5 text-white" />
              </span>
            </button>
            <a
              href={`tel:${BRAND.primaryPhone}`}
              className="px-6 py-3.5 bg-black/40 backdrop-blur-md border border-white/25 hover:bg-white hover:text-brand-blue text-white rounded-full text-xs sm:text-sm font-bold transition-all shadow-md"
            >
              Speak To Logistics Desk
            </a>
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

      {/* ========================================================= */}
      {/* 4. MILESTONES: OUR JOURNEY OF GROWTH (UI/UX PRO MAX)       */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-mono font-bold tracking-wider uppercase">
            <TrendingUp className="w-3.5 h-3.5 text-brand-red" />
            <span>Evolutionary Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Our Journey of Continuous Growth
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From our founding roots in Coimbatore connecting families to the world, to an internationally recognized multi-modal freight and offshore maritime logistics leader.
          </p>
        </div>

        {/* Phase Stepper Pills (Desktop & Mobile) */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2">
          {TIMELINE.map((item, idx) => (
            <button
              key={item.phase}
              type="button"
              onClick={() => setActivePhase(idx)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                activePhase === idx
                  ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-brand-blue/50 hover:bg-slate-50'
              }`}
            >
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-black ${
                activePhase === idx ? 'bg-white text-brand-blue' : 'bg-slate-100 text-slate-600'
              }`}>
                {item.phase}
              </span>
              <span>{item.stage.split(' // ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Bento Milestones Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {TIMELINE.map((item, idx) => {
            const Icon = item.icon;
            const isFeatured = idx === 4; // Phase 5: Maritime Leader
            const isSelected = activePhase === idx;

            return (
              <div
                key={item.phase}
                onClick={() => setActivePhase(idx)}
                className={`group relative rounded-3xl p-6 sm:p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isFeatured
                    ? 'lg:col-span-2 bg-[#00243d] text-white border border-white/20 shadow-xl hover:border-brand-red/60'
                    : `bg-white border text-slate-800 ${
                        isSelected
                          ? 'border-brand-blue ring-2 ring-brand-blue/20 shadow-xl'
                          : 'border-slate-200/90 hover:border-brand-blue/40 shadow-sm hover:shadow-lg'
                      }`
                }`}
              >
                {/* Background Watermark Number */}
                <span className={`absolute right-6 top-4 text-6xl sm:text-7xl font-black select-none pointer-events-none transition-opacity ${
                  isFeatured ? 'text-white/[0.04]' : 'text-slate-100 group-hover:text-brand-blue/[0.08]'
                }`}>
                  {item.phase}
                </span>

                <div className="space-y-4 relative z-10">
                  {/* Top Bar: Icon, Phase Badge, Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                        isFeatured
                          ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                          : 'bg-brand-blue-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className={`text-[11px] font-mono font-extrabold uppercase tracking-widest ${
                          isFeatured ? 'text-brand-red-light' : 'text-brand-red'
                        }`}>
                          {item.stage}
                        </span>
                        <div className={`text-xs font-semibold ${isFeatured ? 'text-white/70' : 'text-slate-500'}`}>
                          {item.metric}
                        </div>
                      </div>
                    </div>

                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                      isFeatured
                        ? 'bg-white/10 text-white border-white/20'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 pt-1">
                    <h3 className={`text-xl sm:text-2xl font-black tracking-tight leading-snug ${
                      isFeatured ? 'text-white' : 'text-slate-900 group-hover:text-brand-blue transition-colors'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      isFeatured ? 'text-white/85' : 'text-slate-600'
                    }`}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Feature Checkpoints */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    {item.features.map((feat) => (
                      <div
                        key={feat}
                        className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 ${
                          isFeatured
                            ? 'bg-white/10 text-white/90 border border-white/15'
                            : 'bg-slate-50 text-slate-700 border border-slate-200'
                        }`}
                      >
                        <Check className={`w-3.5 h-3.5 flex-shrink-0 ${isFeatured ? 'text-brand-red-light' : 'text-brand-blue'}`} />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Link / Verification Indicator */}
                <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-bold ${
                  isFeatured ? 'border-white/15 text-white/80' : 'border-slate-100 text-slate-500'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className={`w-4 h-4 ${isFeatured ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    Operational Benchmark Verified
                  </span>
                  <span className={`inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform ${
                    isFeatured ? 'text-brand-red-light' : 'text-brand-blue'
                  }`}>
                    Phase {item.phase} Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Achievement Metrics Strip */}
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-brand-red font-mono">15+</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Years Logistics Heritage</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">190+</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Global Destinations</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-sky-400 font-mono">10+</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Major Indian Seaports</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">24/7</div>
            <div className="text-xs font-bold text-slate-300 mt-1">Berth &amp; Spares Boats</div>
          </div>
        </div>
      </section>
    </div>
  );
};
