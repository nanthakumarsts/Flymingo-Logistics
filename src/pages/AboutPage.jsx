import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Clock, Award, Users, Globe, ArrowRight, 
  CheckCircle2, HeartHandshake, Compass, Check,
  Anchor, Sparkles, MapPin, Shield, Plane, Boxes,
  TrendingUp, Ship, Truck
} from 'lucide-react';
import { BRAND } from '../data/siteData';
import { FlightRouteMap } from '../components/FlightRouteMap';

export const AboutPage = ({ onOpenQuote }) => {
  const [activeYear, setActiveYear] = useState('2024');

  /* Authentic Growth Journey from flamingonew.saitechnosolutions.in/about.php */
  const TIMELINE = [
    {
      year: '2018',
      title: 'Foundation',
      desc: 'Flymingo Logistics was established in Coimbatore with a vision to simplify international logistics for individuals and businesses.',
      image: '/assets/movers.jpg',
      icon: Compass,
      tag: 'Coimbatore Inception',
      metric: 'Coimbatore Hub Established',
      features: ['Personal Courier Focus', 'Doorstep Pickup In Coimbatore', 'Transparent Direct Pricing']
    },
    {
      year: '2019',
      title: 'Expanding Horizons',
      desc: 'Expanded our network to cover 50+ countries, partnering with major global carriers to offer seamless courier services.',
      image: '/assets/movers.jpg',
      icon: Globe,
      tag: 'Global Scale',
      metric: '50+ Countries Connected',
      features: ['Major Global Airline Partnerships', 'Commercial Samples Transit', 'Rapid Document Courier']
    },
    {
      year: '2021',
      title: 'Multi-Modal Logistics',
      desc: 'Launched dedicated Sea and Air Freight divisions, enabling us to handle heavy cargo and commercial shipments efficiently.',
      image: '/assets/sea cargo.jpg',
      icon: Boxes,
      tag: 'Intermodal Expansion',
      metric: 'Air & Ocean Freight Divisions',
      features: ['FCL & LCL Ocean Freight', 'Heavy Commercial Air Cargo', 'Multi-Layer Packing Standards']
    },
    {
      year: '2023',
      title: 'Technological Leap',
      desc: 'Implemented advanced tracking systems and automated customs clearance processes to ensure 99% on-time delivery.',
      image: '/assets/service banner.jpg',
      icon: ShieldCheck,
      tag: 'Digital Automation',
      metric: '99% On-Time Delivery Benchmark',
      features: ['Real-Time GPS Tracking', 'Direct Seaport EDI Clearance', 'Zero-Delay Clearance Protocol']
    },
    {
      year: '2024',
      title: 'Global Leader',
      desc: 'Now serving 220+ countries with specialized services like Ship Spares Logistics and DG Shipping, setting new industry standards.',
      image: '/assets/international_courier_banner.jpg',
      icon: Anchor,
      tag: 'Worldwide Maritime Leader',
      metric: '220+ Countries & Berth Services',
      features: ['24/7 Ship Spares Deck Delivery', 'IMO / IATA Certified DG Handling', 'Full International Network']
    }
  ];

  /* Authentic Pillars from original site */
  const PILLARS = [
    {
      title: 'Values',
      desc: 'Values us unit what bind us together to move towards our vision.',
      image: '/assets/value.jpg',
      badge: 'Core Identity'
    },
    {
      title: 'Quality',
      desc: 'Attention to detail and attributes of balanced perfection are accomplished from Quality. Quality could also be a true concern for finishing work well and is gained through education, training, and information. We, at Flymingo Logistics, lay durable stress on work our workers, as we tend to believe that the absolute best levels of consumer satisfaction and operational excellence unit achieved only with this worth.',
      image: '/assets/quality.jpg',
      badge: 'Zero Defect'
    },
    {
      title: 'Communication',
      desc: "Effective communication is the key for sustained business relationships. At Flymingo Logistics, we tend to trust that language supported effective listening; understanding other's points of browse, and applicable discretion would cause durable teams and partnerships.",
      image: '/assets/communication.jpg',
      badge: '24/7 Responsiveness'
    }
  ];

  const WHY_US_POINTS = [
    'We Carry anything globally',
    'Most Competitive Prices! Unmatched',
    'Door Pickup – Door delivery – Free Packing',
    'Your packages will be delivered in 4 to 6 business days',
    'We ship with DHL, FEDEX, TNT & ETC world renown companies',
    'You save up to 50% due to our high volume of shipping',
    'Each shipment carries insurance'
  ];

  const GOALS_POINTS = [
    'Rendering quality services at your door step',
    'We maintain genuineness with our service',
    'We maintain good rapport with our customer'
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 select-none">
      {/* ========================================================= */}
      {/* 1. CINEMATIC MARITIME EDITORIAL BANNER HERO               */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-brand-blue-dark text-white border-b border-white/10 py-8 sm:py-10 lg:py-12 select-none">
        {/* Full-bleed Photographic Background Texture with continuous Ken Burns motion */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/assets/banner-marine-hd.jpg" 
            alt="Flymingo Logistics Global Operations" 
            className="w-full h-full object-cover object-center opacity-95 contrast-[1.06] brightness-[1.0] scale-100 fm-kb-0"
          />
        </div>
        <div className="absolute inset-0 bg-[#001426]/40 z-0 pointer-events-none" aria-hidden="true" />
        <FlightRouteMap className="opacity-25 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3 sm:space-y-4 text-left">
            {/* Banner Eyebrow Badge - clean, no '//' */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono font-extrabold uppercase tracking-widest text-brand-red-light shadow-md">
                SOUTH INDIA &rarr; THE WORLD
              </div>
            </div>

            {/* Banner Title & Subtext */}
            <div className="space-y-1 sm:space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                We Are The Bridge Between You And Your Relations.<br />
                <span className="text-brand-red font-black">
                  Across Oceans &amp; Continents.
                </span>
              </h1>

              <p className="text-sm sm:text-base font-bold text-white/95 tracking-wide drop-shadow-md">
                Connecting Families. Empowering Global Trade.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Delivering uncompromised trust, maritime operational rigor, and door-to-door courier precision connecting South India's industrial and family roots to 190+ countries worldwide.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenQuote()}
                className="group px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-brand-red/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3"
              >
                <span>Explore Our Services</span>
                <span className="w-6 h-6 rounded-full bg-black/25 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </span>
              </button>
              <a
                href={`tel:${BRAND.primaryPhone}`}
                className="px-6 py-3 bg-black/40 backdrop-blur-md border border-white/25 hover:bg-white hover:text-brand-blue text-white rounded-full text-xs sm:text-sm font-bold transition-all shadow-md"
              >
                Speak To Logistics Desk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. AUTHENTIC WHO WE ARE SECTION (Original site text)      */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-xs font-bold uppercase tracking-widest text-brand-red">
              <Compass className="w-4 h-4" />
              <span>About Flymingo Logistics</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
              We Are The Bridge Between You And Your Relations
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Flymingo Logistics is an International Logistics company that offers high quality international courier services, packers and movers services and all mode international shipping within budget worldwide. Our primary objective is to provide quick delivery, clearance and door to door delivery worldwide. We are based out of Coimbatore.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Flymingo Logistics has an excellent track record of success in delivering packages both on time and damage free. We have partnered with leading international companies worldwide to reach each corner of the world. We are glad to mention that our services are best leading in position within the present market.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="text-2xl font-black text-brand-blue font-mono">220+</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">Countries Served</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Global air &amp; ocean routes</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="text-2xl font-black text-brand-red font-mono">99%</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">On-Time Clearance</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Zero damage track record</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
                <div className="text-2xl font-black text-slate-900 font-mono">2018</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">Year Established</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Founded in Coimbatore</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 group">
              <img 
                src="/assets/about page  first relation image.jpg" 
                alt="Flymingo Logistics Family Relations & Cargo Dispatch" 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = '/assets/about 2.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-brand-red-light">Delivering With Care</div>
                <div className="text-sm font-bold">Trusted Doorstep International Courier</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR JOURNEY OF GROWTH (Exact original years & data)    */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-mono font-bold tracking-wider uppercase">
            <TrendingUp className="w-3.5 h-3.5 text-brand-red" />
            <span>Milestone History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Our Journey of Growth
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Connecting the world, one shipment at a time.
          </p>
        </div>

        {/* Year Pills Navigation */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {TIMELINE.map((item) => {
            const isSelected = activeYear === item.year;
            return (
              <button
                key={item.year}
                type="button"
                onClick={() => setActiveYear(item.year)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2.5 border ${
                  isSelected
                    ? 'bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/25 scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-brand-blue/40 hover:bg-slate-50'
                }`}
              >
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-black ${
                  isSelected ? 'bg-black/25 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.year}
                </span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Timeline Bento Cards with Real Photographs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIMELINE.map((item) => {
            const Icon = item.icon;
            const isSelected = activeYear === item.year;
            const isFeatured = item.year === '2024';

            return (
              <div
                key={item.year}
                onClick={() => setActiveYear(item.year)}
                className={`group relative rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isFeatured
                    ? 'lg:col-span-2 bg-[#00243d] text-white border border-white/20 shadow-xl hover:border-brand-red/60'
                    : `bg-white border text-slate-800 ${
                        isSelected
                          ? 'border-brand-red ring-2 ring-brand-red/20 shadow-xl'
                          : 'border-slate-200 hover:border-brand-blue/40 shadow-sm hover:shadow-lg'
                      }`
                }`}
              >
                {/* Year Header Badge & Watermark */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                      isFeatured 
                        ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30' 
                        : 'bg-brand-blue/10 text-brand-blue group-hover:bg-brand-red group-hover:text-white transition-colors'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-2xl font-black font-mono tracking-tight ${
                        isFeatured ? 'text-brand-red-light' : 'text-brand-red'
                      }`}>
                        {item.year}
                      </div>
                      <div className={`text-[11px] font-bold uppercase tracking-wider ${
                        isFeatured ? 'text-white/70' : 'text-slate-500'
                      }`}>
                        {item.tag}
                      </div>
                    </div>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    isFeatured
                      ? 'bg-white/10 text-white border-white/20'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {item.metric}
                  </span>
                </div>

                {/* Milestone Image Thumbnail - Real Photography */}
                <div className="h-40 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/sea cargo.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Title & Authentic Description */}
                <div className="space-y-2 flex-1">
                  <h3 className={`text-lg sm:text-xl font-black tracking-tight ${
                    isFeatured ? 'text-white' : 'text-slate-900 group-hover:text-brand-blue transition-colors'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isFeatured ? 'text-white/85' : 'text-slate-600'
                  }`}>
                    {item.desc}
                  </p>
                </div>

                {/* Features Checkpoints */}
                <div className="pt-4 mt-4 border-t border-slate-100/20 space-y-1.5">
                  {item.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs">
                      <Check className={`w-3.5 h-3.5 shrink-0 ${isFeatured ? 'text-brand-red-light' : 'text-brand-red'}`} />
                      <span className={isFeatured ? 'text-white/90' : 'text-slate-700'}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. OUR GOALS (Low Cost and Quick Delivery)                */}
      {/* ========================================================= */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Mission Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white max-w-md w-full">
                <img 
                  src="/assets/mission statement.jpg" 
                  alt="Flymingo Logistics Goals and Mission" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/about 2.jpg';
                  }}
                />
              </div>
            </div>

            {/* Right: Goals Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-xs font-bold uppercase tracking-widest text-brand-blue">
                <Award className="w-4 h-4" />
                <span>Our Goals</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                Low Cost and Quick Delivery
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Our relentless focus is on ensuring your shipments travel swiftly across domestic and international borders with uncompromising safety and transparent, cost-effective pricing.
              </p>

              <div className="space-y-3 pt-2">
                {GOALS_POINTS.map((point, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                      <Ship className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. VALUES, QUALITY & COMMUNICATION                        */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
            The Flymingo Virtues
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Values, Quality &amp; Communication
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            The foundational pillars guiding every customer interaction and cargo movement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((p, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="h-52 overflow-hidden bg-slate-100 relative">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  onError={(e) => {
                    e.currentTarget.src = '/assets/about 2.jpg';
                  }}
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                  {p.badge}
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{p.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-brand-blue">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Flymingo Core Commitment</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. WHY US? (Exact 7 points & image from original site)    */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-xl max-w-sm w-full bg-slate-800">
                <img 
                  src="/assets/why_choose.jpg" 
                  alt="Why Choose Flymingo Logistics" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/about 2.jpg';
                  }}
                />
              </div>
            </div>

            {/* Right: Why Us 7 Points */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red/20 border border-brand-red/40 text-xs font-mono font-extrabold uppercase tracking-widest text-brand-red-light">
                Why Flymingo
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                Why Choose Us?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {WHY_US_POINTS.map((pt, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs hover:bg-white/10 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-md bg-brand-red/30 text-brand-red-light flex items-center justify-center shrink-0 mt-0.5">
                      <Ship className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-white/90 leading-snug">{pt}</span>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button
                  type="button"
                  onClick={() => onOpenQuote()}
                  className="px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-brand-red/30 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Request Fare Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`tel:${BRAND.primaryPhone}`}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-xs sm:text-sm font-bold transition-all"
                >
                  Call +91 95662 54488
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
