import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck, Award, Globe, ArrowRight, Compass, Check,
  Anchor, Boxes, TrendingUp, Ship, ArrowUpRight, Phone,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { BRAND } from '../data/siteData';
import { FlightRouteMap } from '../components/FlightRouteMap';
import DEFAULT_BANNER_DATA from '../data/bannerData.json';

/* ---------- local styles (self-contained, prefixed ab-) ---------- */
const css = `
@keyframes ab-kb { 0% { transform: scale(1.04) translate(0,0); } 100% { transform: scale(1.16) translate(-2.5%, -1.5%); } }
@keyframes ab-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes ab-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes ab-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes ab-blob { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(24px,-20px) scale(1.08); } }
@keyframes ab-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes ab-spin { to { transform: rotate(360deg); } }
@keyframes ab-pop { from { opacity: 0; transform: scale(.85) translateY(14px); } to { opacity: 1; transform: none; } }

.ab-kb { animation: ab-kb 14s ease-in-out infinite alternate; will-change: transform; }
.ab-float { animation: ab-float 6s ease-in-out infinite; }
.ab-blob { animation: ab-blob 16s ease-in-out infinite; }
.ab-spin { animation: ab-spin 40s linear infinite; }
.ab-swap { animation: ab-fade .55s cubic-bezier(.2,.7,.2,1) both; }
.ab-bar { transform-origin: left; animation: ab-bar 6s linear forwards; }
.ab-bar-paused { animation-play-state: paused; }
.ab-h1 { opacity: 0; animation: ab-rise .8s .05s cubic-bezier(.2,.7,.2,1) forwards; }
.ab-h2 { opacity: 0; animation: ab-rise .8s .18s cubic-bezier(.2,.7,.2,1) forwards; }
.ab-h3 { opacity: 0; animation: ab-rise .8s .30s cubic-bezier(.2,.7,.2,1) forwards; }
.ab-h4 { opacity: 0; animation: ab-rise .8s .42s cubic-bezier(.2,.7,.2,1) forwards; }
.ab-p1 { opacity: 0; animation: ab-pop .8s .25s cubic-bezier(.2,.7,.2,1) forwards; }
.ab-p2 { opacity: 0; animation: ab-pop .8s .45s cubic-bezier(.2,.7,.2,1) forwards; }
.ab-p3 { opacity: 0; animation: ab-pop .8s .65s cubic-bezier(.2,.7,.2,1) forwards; }
.ab-p4 { opacity: 0; animation: ab-pop .8s .85s cubic-bezier(.2,.7,.2,1) forwards; }

.ab-reveal { opacity: 0; transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1); }
.ab-up { transform: translateY(28px); }
.ab-left { transform: translateX(-30px); }
.ab-right { transform: translateX(30px); }
.ab-scale { transform: scale(.95); }
.ab-reveal.ab-in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .ab-kb, .ab-float, .ab-blob, .ab-swap, .ab-bar, .ab-spin { animation: none; }
  .ab-h1, .ab-h2, .ab-h3, .ab-h4, .ab-p1, .ab-p2, .ab-p3, .ab-p4, .ab-reveal { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; }
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
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`ab-reveal ab-${variant} ${shown ? 'ab-in' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

const SectionHead = ({ eyebrow, title, text, light = false, icon: Icon }) => (
  <Reveal className="max-w-2xl mx-auto text-center space-y-4">
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-widest border ${
      light ? 'bg-white/10 border-white/20 text-brand-red-light' : 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue'
    }`}>
      {Icon && <Icon className="w-3.5 h-3.5 text-brand-red" />}
      <span>{eyebrow}</span>
    </div>
    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${light ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
    <span className="mx-auto block h-1 w-14 rounded-full bg-brand-red" aria-hidden="true" />
    {text && <p className={`text-sm sm:text-base leading-relaxed ${light ? 'text-white/75' : 'text-slate-600'}`}>{text}</p>}
  </Reveal>
);

/* Hero right-side visual: photo collage + floating info chips (replaces the old 3D cubes motif) */
/* Hero right-side visual: single photo with floating info chips */
const HeroCollage = ({ sideImage }) => (
  <div className="relative w-full max-w-md h-[300px] lg:h-[340px]">
    {/* rotating dashed ring */}
    <div className="ab-spin absolute -right-3 -top-3 w-44 h-44 rounded-full border-2 border-dashed border-brand-red/40" aria-hidden="true" />
    <div className="absolute left-6 top-10 w-24 h-24 rounded-full bg-brand-blue/10 blur-xl" aria-hidden="true" />

    {/* single main arch photo */}
    <div className="ab-p1 absolute right-2 top-0 w-[76%] h-[92%]">
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-t-[999px] rounded-b-3xl border-2 border-brand-red/50" aria-hidden="true" />
      <div className="relative w-full h-full rounded-t-[999px] rounded-b-3xl overflow-hidden border-4 border-white shadow-2xl shadow-brand-blue/30 bg-slate-200">
        <img
          src={sideImage || "/assets/sea cargo.jpg"}
          alt="Flymingo sea cargo"
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = '/assets/about 2.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/50 via-transparent to-transparent" />
      </div>
    </div>

    {/* floating chip: countries */}
    <div className="ab-p3 absolute left-0 top-6">
      <div className="ab-float flex items-center gap-3 pl-2.5 pr-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-brand-blue/15">
        <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center">
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <div className="text-lg font-black font-mono text-slate-900 leading-none">220+</div>
          <div className="text-[11px] font-bold text-slate-500 mt-0.5">Countries Served</div>
        </div>
      </div>
    </div>

    {/* floating chip: on-time */}
    <div className="ab-p4 absolute right-0 -bottom-2 sm:right-2">
      <div className="ab-float flex items-center gap-3 pl-2.5 pr-4 py-2.5 rounded-2xl bg-brand-red text-white shadow-xl shadow-brand-red/40" style={{ animationDelay: '-3s' }}>
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="text-lg font-black font-mono leading-none">99%</div>
          <div className="text-[11px] font-bold text-white/85 mt-0.5">On-Time Clearance</div>
        </div>
      </div>
    </div>

    {/* est pill */}
    <div className="ab-p4 absolute left-[10%] bottom-[10%]">
      <div className="ab-float inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-blue-dark text-white text-[11px] font-mono font-bold tracking-wider shadow-lg" style={{ animationDelay: '-5s' }}>
        <Compass className="w-3.5 h-3.5 text-brand-red-light" />
        EST. 2018
      </div>
    </div>
  </div>
);

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

export const AboutPage = ({ onOpenQuote }) => {
  const [bannerData, setBannerData] = useState(null);
  const [activeYear, setActiveYear] = useState('2024');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/page-banners/about')
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (res && res.success && res.data) {
          setBannerData(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleBannerAction = () => {
    const slug = bannerData?.buttonSlug;
    if (slug) {
      if ((slug === '/quote' || slug === '#quote' || slug.startsWith('#')) && onOpenQuote) {
        onOpenQuote();
        return;
      }
      window.location.href = slug;
    } else if (onOpenQuote) {
      onOpenQuote();
    }
  };

  /* auto-cycle the journey, pause on hover */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActiveYear((cur) => {
        const i = TIMELINE.findIndex((x) => x.year === cur);
        return TIMELINE[(i + 1) % TIMELINE.length].year;
      });
    }, 6000);
    return () => clearInterval(t);
  }, [paused]);

  const activeIdx = Math.max(TIMELINE.findIndex((x) => x.year === activeYear), 0);
  const active = TIMELINE[activeIdx];
  const ActiveIcon = active.icon;

  /* Mobile scroll refs & handlers for Journey Year Rail and Virtues */
  const journeyScrollRef = useRef(null);
  const virtuesScrollRef = useRef(null);

  const prevJourney = () => {
    setActiveYear((cur) => {
      const i = TIMELINE.findIndex((x) => x.year === cur);
      const prevIdx = (i - 1 + TIMELINE.length) % TIMELINE.length;
      return TIMELINE[prevIdx].year;
    });
    if (journeyScrollRef.current) {
      journeyScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const nextJourney = () => {
    setActiveYear((cur) => {
      const i = TIMELINE.findIndex((x) => x.year === cur);
      const nextIdx = (i + 1) % TIMELINE.length;
      return TIMELINE[nextIdx].year;
    });
    if (journeyScrollRef.current) {
      journeyScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const scrollVirtues = (direction) => {
    if (virtuesScrollRef.current) {
      const scrollAmount = 300;
      virtuesScrollRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const fallback = DEFAULT_BANNER_DATA?.pageBanners?.about || {};
  const activeBanner = bannerData || fallback;
  const displayBadge = (activeBanner && activeBanner.badge !== undefined) ? activeBanner.badge : (fallback.badge || 'Any Size');
  const displayTitle = (activeBanner && activeBanner.title) ? activeBanner.title : (fallback.title || 'We Are The Bridge Between You And Your Relations.');
  const displayHighlight = (activeBanner && activeBanner.highlight !== undefined) ? activeBanner.highlight : (fallback.highlight || 'Across Oceans & Continents.');
  const displayDesc = (activeBanner && activeBanner.description) ? activeBanner.description : fallback.description;
  const displayImage = (activeBanner && activeBanner.bgImage) ? activeBanner.bgImage : (fallback.bgImage || '/assets/banner-marine-hd.jpg');
  const displayBtnLabel = (activeBanner && activeBanner.buttonLabel) ? activeBanner.buttonLabel : (fallback.buttonLabel || 'Explore Our Services');

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 select-none overflow-x-hidden">
      <style>{css}</style>

      {/* ========================================================= */}
      {/* 1. HERO                                                   */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200 py-8 sm:py-10 lg:py-12 select-none">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={displayImage}
            alt="Flymingo Logistics Global Operations"
            className="w-full h-full object-cover object-center opacity-65 contrast-[1.05] brightness-[1.05] ab-kb"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/85 via-45% to-white/25 pointer-events-none" aria-hidden="true" />
        <FlightRouteMap className="opacity-10 z-0" />
        <div className="ab-blob absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-brand-red/15 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

            {/* Left: Text Content */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
              {displayBadge && (
                <div className="ab-h1">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-extrabold uppercase tracking-widest text-brand-red shadow-sm">
                    {displayBadge}
                  </div>
                </div>
              )}

              <div className="ab-h2 space-y-1 sm:space-y-1.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {displayTitle}{' '}
                  {displayHighlight && (
                    <span className="text-brand-red font-black">
                      {displayHighlight}
                    </span>
                  )}
                </h1>
              </div>

              {displayDesc && (
                <p className="ab-h3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-0.5 max-w-2xl">
                  {displayDesc}
                </p>
              )}

              {displayBtnLabel && (
                <div className="ab-h4 flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleBannerAction}
                    className="group px-7 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-brand-red/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3"
                  >
                    <span>{displayBtnLabel}</span>
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="h-3.5 w-3.5 text-white" />
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Right: photo collage with floating info chips */}
            <div className="lg:col-span-5 hidden sm:flex items-center justify-center lg:justify-end pr-2 lg:pr-6">
              <HeroCollage sideImage={bannerData?.sideImage} />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. WHO WE ARE                                             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal variant="left" className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-xs font-bold uppercase tracking-widest text-brand-red">
              <Compass className="w-4 h-4" />
              <span>About Flymingo Logistics</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              We Are The Bridge Between You And <span className="text-brand-blue">Your Relations</span>
            </h2>
            <span className="block h-1 w-14 rounded-full bg-brand-red" aria-hidden="true" />

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Flymingo Logistics is an International Logistics company that offers high quality international courier services, packers and movers services and all mode international shipping within budget worldwide. Our primary objective is to provide quick delivery, clearance and door to door delivery worldwide. We are based out of Coimbatore.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Flymingo Logistics has an excellent track record of success in delivering packages both on time and damage free. We have partnered with leading international companies worldwide to reach each corner of the world. We are glad to mention that our services are best leading in position within the present market.
            </p>

            {/* Metrics: connected ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-brand-blue/10 overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {[
                { v: '220+', l: 'Countries Served', d: 'Global air & ocean routes', c: 'text-brand-blue' },
                { v: '99%', l: 'On-Time Clearance', d: 'Zero damage track record', c: 'text-brand-red' },
                { v: '2018', l: 'Year Established', d: 'Founded in Coimbatore', c: 'text-slate-900' },
              ].map((m) => (
                <div key={m.l} className="group relative p-5 hover:bg-slate-50 transition-colors">
                  <span className="absolute left-0 top-0 h-1 w-0 bg-brand-red group-hover:w-full transition-all duration-500" aria-hidden="true" />
                  <div className={`text-3xl font-black font-mono ${m.c}`}>{m.v}</div>
                  <div className="text-xs font-bold text-slate-800 mt-1">{m.l}</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{m.d}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="right" className="lg:col-span-5">
            <div className="relative px-3 pb-3">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2 border-brand-red/40" aria-hidden="true" />
              <div className="absolute -left-4 -top-4 w-28 h-28 rounded-3xl bg-brand-blue/10" aria-hidden="true" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-blue/20 bg-slate-100 group">
                <img
                  src="/assets/about page  first relation image.jpg"
                  alt="Flymingo Logistics Family Relations & Cargo Dispatch"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.src = '/assets/about 2.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute left-4 right-4 bottom-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 p-4 text-white">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-red-light">Delivering With Care</div>
                  <div className="text-sm font-bold">Trusted Doorstep International Courier</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR JOURNEY OF GROWTH: vertical years + feature stage  */}
      {/* ========================================================= */}
      <section className="relative bg-slate-50 border-y border-slate-200 py-16 sm:py-24 overflow-hidden">
        <div className="ab-blob absolute -top-24 -left-20 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="ab-blob absolute -bottom-24 -right-20 w-96 h-96 rounded-full bg-brand-red/10 blur-3xl pointer-events-none" style={{ animationDelay: '-8s' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex items-end justify-between">
            <SectionHead
              icon={TrendingUp}
              eyebrow="Milestone History"
              title="Our Journey of Growth"
              text="Connecting the world, one shipment at a time."
            />
            {/* Mobile-only year arrow controls */}
            <div className="flex lg:hidden items-center gap-2 shrink-0 pb-4">
              <button
                type="button"
                onClick={prevJourney}
                aria-label="Previous milestone"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextJourney}
                aria-label="Next milestone"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Year rail */}
            <div className="lg:col-span-4 relative">
              <span className="hidden lg:block absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-200" aria-hidden="true" />
              <span
                className="hidden lg:block absolute left-[27px] top-6 w-0.5 bg-brand-red transition-all duration-700"
                style={{ height: `calc((100% - 3rem) * ${activeIdx / (TIMELINE.length - 1)})` }}
                aria-hidden="true"
              />
              <div
                ref={journeyScrollRef}
                className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scroll-smooth scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
              >
                {TIMELINE.map((item, i) => {
                  const on = item.year === activeYear;
                  const passed = i <= activeIdx;
                  return (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => setActiveYear(item.year)}
                      className={`relative shrink-0 lg:shrink text-left flex items-center gap-3 sm:gap-4 px-4 py-3 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden snap-start ${
                        on
                          ? 'bg-brand-blue-dark text-white border-brand-blue-dark shadow-xl shadow-brand-blue/25 lg:translate-x-2'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-brand-blue/40 hover:shadow-md'
                      }`}
                    >
                      {/* Circle shown ONLY on desktop/tablet, hidden on mobile */}
                      <span className={`hidden sm:flex relative z-10 w-10 h-10 rounded-full items-center justify-center text-[11px] font-mono font-black shrink-0 border-2 transition-colors ${
                        on ? 'bg-brand-red border-white text-white' : passed ? 'bg-brand-red/10 border-brand-red text-brand-red' : 'bg-white border-slate-300 text-slate-500'
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0">
                        <span className={`block text-lg sm:text-xl font-black font-mono leading-none ${on ? 'text-brand-red-light' : 'text-brand-red'}`}>{item.year}</span>
                        <span className="block text-xs sm:text-sm font-bold mt-1 whitespace-nowrap lg:whitespace-normal">{item.title}</span>
                      </span>
                      {on && (
                        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white/20" aria-hidden="true">
                          <span key={activeYear} className={`ab-bar block h-full bg-brand-red ${paused ? 'ab-bar-paused' : ''}`} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feature stage */}
            <div className="lg:col-span-8">
              <div key={activeYear} className="ab-swap rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-brand-blue/10 overflow-hidden h-full flex flex-col">
                <div className="relative h-56 sm:h-72 bg-brand-blue-dark overflow-hidden">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/assets/sea cargo.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001426]/90 via-[#001426]/30 to-transparent pointer-events-none" />
                  <span className="absolute right-4 -bottom-6 sm:-bottom-10 text-[6rem] sm:text-[9rem] font-black font-mono leading-none text-white/15 select-none pointer-events-none" aria-hidden="true">
                    {active.year}
                  </span>
                  <div className="absolute left-5 right-5 bottom-5 flex flex-wrap items-end justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-brand-red text-white flex items-center justify-center shadow-xl shadow-brand-red/40">
                        <ActiveIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-3xl font-black font-mono text-white leading-none">{active.year}</div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-white/80 mt-1">{active.tag}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white">
                      {active.metric}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col">
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{active.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{active.desc}</p>
                  </div>
                  <div className="mt-auto grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 border-t border-slate-100">
                    {active.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                        <span className="text-xs font-semibold text-slate-700 leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. OUR GOALS                                              */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal variant="left" className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md px-4 py-4">
              <div className="absolute inset-0 -rotate-3 rounded-[2rem] bg-gradient-to-br from-brand-red to-brand-red-dark opacity-90" aria-hidden="true" />
              <div className="absolute -right-2 -bottom-2 w-32 h-32 rounded-3xl border-2 border-brand-blue/30" aria-hidden="true" />
              <div className="relative rotate-2 hover:rotate-0 transition-transform duration-500 rounded-[1.75rem] overflow-hidden border-4 border-white shadow-2xl bg-white">
                <img
                  src="/assets/mission statement.jpg"
                  alt="Flymingo Logistics Goals and Mission"
                  className="w-full h-auto object-cover"
                  onError={(e) => { e.currentTarget.src = '/assets/about 2.jpg'; }}
                />
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-xs font-bold uppercase tracking-widest text-brand-blue">
              <Award className="w-4 h-4" />
              <span>Our Goals</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Low Cost and <span className="text-brand-red">Quick Delivery</span>
            </h2>
            <span className="block h-1 w-14 rounded-full bg-brand-red" aria-hidden="true" />

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our relentless focus is on ensuring your shipments travel swiftly across domestic and international borders with uncompromising safety and transparent, cost-effective pricing.
            </p>

            <div className="space-y-3 pt-1">
              {GOALS_POINTS.map((point, idx) => (
                <div
                  key={idx}
                  className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-red/40 hover:translate-x-2 transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red scale-y-0 group-hover:scale-y-100 transition-transform duration-300" aria-hidden="true" />
                  <span className="text-3xl font-black font-mono text-slate-200 group-hover:text-brand-red/30 transition-colors w-10 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:text-white transition-colors">
                    <Ship className="w-5 h-5" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-800">{point}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. VALUES, QUALITY & COMMUNICATION                        */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        <div className="flex items-end justify-between">
          <SectionHead
            eyebrow="The Flymingo Virtues"
            title="Values, Quality & Communication"
            text="The foundational pillars guiding every customer interaction and cargo movement."
          />
          {/* Mobile-only arrow controls */}
          <div className="flex md:hidden items-center gap-2 shrink-0 pb-4">
            <button
              type="button"
              onClick={() => scrollVirtues('prev')}
              aria-label="Previous virtue"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollVirtues('next')}
              aria-label="Next virtue"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={virtuesScrollRef}
          className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        >
          {PILLARS.map((p, idx) => (
            <div key={idx} className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center h-full flex flex-col">
              <Reveal delay={idx * 100} variant="scale" className="h-full flex flex-col">
                <div className="group relative h-full bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl hover:shadow-brand-blue/15 hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden">
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.currentTarget.src = '/assets/about 2.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001426]/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-red text-white text-[11px] font-bold shadow-lg shadow-brand-red/40">
                      {p.badge}
                    </div>
                    <span className="absolute right-5 bottom-8 text-6xl font-black font-mono text-white/25 leading-none select-none" aria-hidden="true">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" className="absolute left-0 -bottom-[2px] w-full h-8 text-white pointer-events-none">
                      <path fill="currentColor" d="M0 44 C 240 92 480 0 720 36 S 1200 84 1440 28 V80 H0 Z" />
                    </svg>
                  </div>

                  <div className="relative p-6 sm:p-7 pt-3 space-y-3 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-slate-900">{p.title}</h3>
                      <span className="block h-1 w-10 rounded-full bg-brand-red group-hover:w-24 transition-all duration-500" aria-hidden="true" />
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="pt-4 mt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-brand-blue">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>Flymingo Core Commitment</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. WHY US                                                 */}
      {/* ========================================================= */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-brand-blue-50 via-white to-brand-blue-50/50 text-slate-900 p-7 sm:p-12 lg:p-14 border border-brand-blue-100 shadow-xl">
            <div className="ab-blob absolute -top-24 -left-16 w-80 h-80 rounded-full bg-brand-red/15 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="ab-blob absolute -bottom-28 right-0 w-80 h-80 rounded-full bg-brand-blue/20 blur-3xl pointer-events-none" style={{ animationDelay: '-8s' }} aria-hidden="true" />
            <Ship className="absolute -right-10 -bottom-10 w-72 h-72 text-brand-blue/[0.04] pointer-events-none" aria-hidden="true" />
            <span className="absolute left-0 top-10 bottom-10 w-1.5 rounded-r-full bg-brand-red" aria-hidden="true" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm">
                  <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-red/30 via-transparent to-brand-blue/30 blur-xl" aria-hidden="true" />
                  <div className="ab-float relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl bg-white">
                    <img
                      src="/assets/why_choose.jpg"
                      alt="Why Choose Flymingo Logistics"
                      className="w-full h-auto object-cover"
                      onError={(e) => { e.currentTarget.src = '/assets/about 2.jpg'; }}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue-50 border border-brand-blue-200 text-xs font-mono font-extrabold uppercase tracking-widest text-brand-blue">
                  Why Flymingo
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Why Choose Us?
                </h2>
                <span className="block h-1 w-14 rounded-full bg-brand-red" aria-hidden="true" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {WHY_US_POINTS.map((pt, idx) => (
                    <div
                      key={idx}
                      className={`group relative flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-brand-red/60 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                        idx === WHY_US_POINTS.length - 1 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <span className="absolute -right-1 -top-3 text-5xl font-black font-mono text-slate-900/[0.04] select-none" aria-hidden="true">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="relative w-8 h-8 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:text-white transition-colors">
                        <Ship className="w-4 h-4" />
                      </div>
                      <span className="relative text-xs sm:text-sm font-semibold text-slate-700 leading-snug pt-1">{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex flex-wrap gap-4 items-center">
                  <button
                    type="button"
                    onClick={() => onOpenQuote()}
                    className="group px-7 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-brand-red/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Request Fare Quote</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  <a
                    href={`tel:${BRAND.primaryPhone}`}
                    className="px-7 py-3.5 bg-white border border-slate-300 text-slate-800 hover:text-brand-blue hover:border-brand-blue rounded-full text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 flex items-center gap-2 shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call +91 95662 54488
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default AboutPage;