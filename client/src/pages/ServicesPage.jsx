import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Plane, Anchor, AlertTriangle, Truck, ShieldCheck,
  ArrowRight, Calculator, CheckCircle2, ChevronLeft, ChevronRight, ArrowUpRight
} from 'lucide-react';
import { BRAND, STATS } from '../data/siteData';
import { FlightRouteMap } from '../components/FlightRouteMap';
import { BannerSideMotif } from '../components/BannerSideMotif';
import DEFAULT_BANNER_DATA from '../data/bannerData.json';

/* ---------- local styles (self-contained, prefixed sv-) ---------- */
const css = `
@keyframes sv-kb { 0% { transform: scale(1.04) translate(0,0); } 100% { transform: scale(1.16) translate(-2.5%, -1.5%); } }
@keyframes sv-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes sv-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@keyframes sv-pop { from { opacity: 0; transform: scale(.8); } to { opacity: 1; transform: none; } }
@keyframes sv-spin { to { transform: rotate(360deg); } }
@keyframes sv-spin-rev { to { transform: rotate(-360deg); } }
@keyframes sv-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes sv-blob { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(24px,-20px) scale(1.08); } }
@keyframes sv-ring { 0% { box-shadow: 0 0 0 0 rgba(232,41,31,.45); } 100% { box-shadow: 0 0 0 26px rgba(232,41,31,0); } }

.sv-kb { animation: sv-kb 14s ease-in-out infinite alternate; will-change: transform; }
.sv-orbit { animation: sv-spin 36s linear infinite; }
.sv-counter { animation: sv-spin-rev 36s linear infinite; }
.sv-slow { animation: sv-spin 60s linear infinite; }
.sv-float { animation: sv-float 6s ease-in-out infinite; }
.sv-blob { animation: sv-blob 16s ease-in-out infinite; }
.sv-pulse { animation: sv-ring 2.2s ease-out infinite; }
.sv-swap { animation: sv-fade .55s cubic-bezier(.2,.7,.2,1) both; }
.sv-h1 { opacity: 0; animation: sv-rise .8s .05s cubic-bezier(.2,.7,.2,1) forwards; }
.sv-h2 { opacity: 0; animation: sv-rise .8s .18s cubic-bezier(.2,.7,.2,1) forwards; }
.sv-h3 { opacity: 0; animation: sv-rise .8s .30s cubic-bezier(.2,.7,.2,1) forwards; }
.sv-h4 { opacity: 0; animation: sv-rise .8s .42s cubic-bezier(.2,.7,.2,1) forwards; }
.sv-pop { opacity: 0; animation: sv-pop .8s .3s cubic-bezier(.2,.7,.2,1) forwards; }

.sv-reveal { opacity: 0; transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1); }
.sv-up { transform: translateY(28px); }
.sv-scale { transform: scale(.95); }
.sv-reveal.sv-in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .sv-kb, .sv-orbit, .sv-counter, .sv-slow, .sv-float, .sv-blob, .sv-pulse, .sv-swap { animation: none; }
  .sv-h1, .sv-h2, .sv-h3, .sv-h4, .sv-pop, .sv-reveal { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; }
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
      className={`sv-reveal sv-${variant} ${shown ? 'sv-in' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

/* Count-up for stats like "15+", "24/7", "500" */
const CountUp = ({ value }) => {
  const str = String(value);
  const m = str.match(/^(\d[\d,]*)(.*)$/);
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!m) return;
    const target = parseInt(m[1].replace(/,/g, ''), 10);
    const el = ref.current;
    let raf;
    const run = () => {
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1400, 1);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === 'undefined') { setN(target); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { run(); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [str]);
  if (!m) return <span ref={ref}>{str}</span>;
  return <span ref={ref}>{n.toLocaleString()}{m[2]}</span>;
};

const CAPABILITIES = [
  {
    id: 'ship-spares',
    title: 'Ship Spares Logistics & 24/7 Port Berth Delivery',
    short: 'Ship Spares',
    path: '/services/ship-spares-logistics',
    badge: 'Flagship Maritime Service',
    badgeColor: 'bg-brand-red-50 text-brand-red border-brand-red-200',
    icon: Anchor,
    image: '/assets/ship-spares-hd.jpg',
    lead: 'Time-critical marine equipment and engine parts delivered directly on board to vessel masters at outer anchorage berths across 10+ major Indian seaports.',
    features: [
      'Direct supply launch boat delivery to outer anchorage',
      'Customs boarding passes & bonded gate passes pre-cleared',
      'Emergency response mobilization in under 45 minutes',
      'Coverage: Chennai, Tuticorin, Cochin, Ennore, Kattupalli, JNPT'
    ],
    tagline: 'Zero Port Delay Guarantee'
  },
  {
    id: 'freight-forwarding',
    title: 'Ocean & Air Freight Forwarding',
    short: 'Freight Forwarding',
    path: '/services/freight-forwarding',
    badge: 'FCL / LCL & Priority Air Charter',
    badgeColor: 'bg-brand-blue-50 text-brand-blue border-brand-blue-200',
    icon: Plane,
    image: '/assets/air cargo.jpg',
    lead: 'Comprehensive ocean container shipping (FCL/LCL) and expedited air cargo forwarding with aggressive airline and ocean liner contract pricing.',
    features: [
      'Full container load (FCL) & consolidated less container (LCL)',
      'Priority flight allocation with Next Flight Out (NFO) routing',
      'End-to-end multimodal transit from inland factory to destination dock',
      'Direct port-to-port and door-to-door global logistics'
    ],
    tagline: 'Direct Airline & Shipping Line Rates'
  },
  {
    id: 'international-courier',
    title: 'International Courier Express',
    short: 'Courier Express',
    path: '/services/international-courier',
    badge: 'B2B, B2C & NRI Parcels',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Package,
    image: '/assets/courier.jpg',
    lead: 'Door-to-door express worldwide courier delivery connecting Indian diaspora across 190+ countries for NRI food sweets, medicines, university luggage, and gifts.',
    features: [
      'Free doorstep pickup across Coimbatore, Chennai & Tamil Nadu',
      'Food-grade protective multi-layer packaging for homemade masalas',
      'Real-time milestone tracking with automated SMS/email alerts',
      'Express 2 to 4 business days transit to USA, UK, UAE & Europe'
    ],
    tagline: '190+ Countries Delivered'
  },
  {
    id: 'customs-clearance',
    title: 'Licensed Customs House Brokerage (CHA)',
    short: 'Customs Clearance',
    path: '/services/customs-clearance',
    badge: 'ICEGATE EDI Compliance',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: ShieldCheck,
    image: '/assets/customs clearance.jpg',
    lead: 'Fully licensed in-house customs house broker ensuring rapid tariff classification, ICEGATE EDI filing, and zero demurrage cargo release.',
    features: [
      'Seamless clearance at major air cargo complexes, seaports & ICDs',
      'Accurate HSN coding and duty assessment with zero penalties',
      'Export/import documentation & DGFT regulatory advisory',
      'In-transit bonded customs movement across Indian ports'
    ],
    tagline: 'Zero Demurrage Protocol'
  },
  {
    id: 'dg-shipping',
    title: 'Dangerous Goods (DG) Logistics',
    short: 'DG Logistics',
    path: '/services/dangerous-goods-shipping',
    badge: 'IATA & IMO Certified',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: AlertTriangle,
    image: '/assets/dg-hazmat-hd.jpg',
    lead: 'IATA and IMDG certified hazardous cargo logistics covering Classes 1 through 9 with UN-certified protective packaging and DGD filing.',
    features: [
      'Complete coverage of Classes 1 to 9 (flammable, toxic, corrosive)',
      'UN-approved packaging certification and UN-spec labeling',
      "Shipper's Declaration for Dangerous Goods (DGD) preparation",
      'Dangerous goods trained personnel handling every shipment'
    ],
    tagline: '100% International Safety Compliance'
  },
  {
    id: 'international-relocation',
    title: 'International Household Relocation',
    short: 'Relocation',
    path: '/services/international-relocation',
    badge: 'Packers & Movers',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    icon: Truck,
    image: '/assets/loading.jpg',
    lead: 'Turnkey overseas moving services for families, corporate transfers, and NRI returnees with custom wooden crating and destination customs clearance.',
    features: [
      'Specialized export-grade multi-layer packaging & custom crates',
      'Transfer of Residence (TR) customs facilitation and checklist',
      'Complete destination door-to-door unpacking and debris removal',
      'Comprehensive marine cargo transit insurance coverage'
    ],
    tagline: 'Zero-Damage Moving Guarantee'
  }
];

/* Hero right-side visual: rotating orbit of the six service icons around a hub */
/* Hero right-side visual: rotating orbit of the service nodes around a hub */
const OrbitVisual = ({ services = [], onPick }) => {
  const displayNodes = services.length ? services.slice(0, 6) : CAPABILITIES;
  return (
    <div className="sv-pop relative w-[250px] h-[250px] sm:w-[280px] sm:h-[280px] lg:w-[330px] lg:h-[330px] my-4 mx-auto select-none">
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-blue/30 sv-slow" aria-hidden="true" />
      <div className="absolute inset-8 sm:inset-10 rounded-full border border-brand-red/25" aria-hidden="true" />
      <div className="absolute inset-12 sm:inset-16 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-red/10 blur-md" aria-hidden="true" />

      {/* spinning wheel with nodes */}
      <div className="sv-orbit absolute inset-0">
        {displayNodes.map((c, i) => {
          const a = i * (360 / displayNodes.length);
          return (
            <div key={c.id || i} className="absolute inset-0" style={{ transform: `rotate(${a}deg)` }}>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div style={{ transform: `rotate(${-a}deg)` }}>
                  <div className="sv-counter">
                    <button
                      type="button"
                      onClick={() => onPick(i)}
                      title={c.short || c.title}
                      aria-label={c.short || c.title}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl border-2 border-white hover:scale-110 transition-transform cursor-pointer font-mono font-black text-xs sm:text-sm ${
                        i % 2 === 0 ? 'bg-brand-blue text-white shadow-brand-blue/30' : 'bg-brand-red text-white shadow-brand-red/30'
                      }`}
                    >
                      <span>{String(i + 1).padStart(2, '0')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="sv-pulse sv-float w-26 h-26 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-white border border-slate-200 shadow-2xl shadow-brand-blue/25 flex flex-col items-center justify-center text-center">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-brand-red leading-none">190+</span>
          <span className="mt-1 px-2 sm:px-3 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-700 leading-tight">Countries Delivered</span>
        </div>
      </div>
    </div>
  );
};

export const ServicesPage = ({ onOpenQuote }) => {
  const [bannerData, setBannerData] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [servicesList, setServicesList] = useState(() => {
    try {
      const local = localStorage.getItem('flamingo_admin_data_v1');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.services?.length) return parsed.services;
      }
    } catch (e) {}
    return CAPABILITIES;
  });

  const stageRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/page-banners/services')
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (res && res.success && res.data) {
          setBannerData(res.data);
        }
      })
      .catch(() => {});

    // Fetch live services from MySQL API
    fetch('http://localhost:5000/api/services')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json && json.success && Array.isArray(json.services) && json.services.length > 0) {
          setServicesList(json.services);
        }
      })
      .catch(() => {});
  }, []);

  const effectiveServices = (servicesList && servicesList.length > 0) ? servicesList.map((s, idx) => ({
    ...s,
    id: s.id || s.service_id,
    short: s.short || s.title?.split(' ')[0] + ' ' + (s.title?.split(' ')[1] || ''),
    badgeColor: s.badgeColor || s.badge_color || 'bg-brand-blue-50 text-brand-blue border-brand-blue-200',
    lead: s.lead || s.shortDesc || s.short_desc || s.title,
    tagline: s.tagline || '100% Reliable Delivery',
    features: (Array.isArray(s.features) && s.features.length) ? s.features : ((Array.isArray(s.bullets) && s.bullets.length) ? s.bullets : ['Standard Logistics Handling']),
    path: s.path || `/services/${s.id || s.service_id}`
  })) : CAPABILITIES;

  const active = effectiveServices[Math.min(activeIdx, effectiveServices.length - 1)] || effectiveServices[0];

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

  const pick = (i, scroll = false) => {
    setActiveIdx(i);
    if (scroll && stageRef.current) stageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const next = () => setActiveIdx((p) => (p + 1) % effectiveServices.length);
  const prev = () => setActiveIdx((p) => (p - 1 + effectiveServices.length) % effectiveServices.length);

  const fallback = DEFAULT_BANNER_DATA?.pageBanners?.services || {};
  const activeBanner = bannerData || fallback;
  const displayBadge = (activeBanner && activeBanner.badge !== undefined) ? activeBanner.badge : (fallback.badge || 'Any Weight');
  const displayTitle = (activeBanner && activeBanner.title) ? activeBanner.title : (fallback.title || 'Six Proven Channels.');
  const displayHighlight = (activeBanner && activeBanner.highlight !== undefined) ? activeBanner.highlight : (fallback.highlight || 'Zero Cargo Gaps.');
  const displayDesc = (activeBanner && activeBanner.description) ? activeBanner.description : fallback.description;
  const displayImage = (activeBanner && activeBanner.bgImage) ? activeBanner.bgImage : (fallback.bgImage || '/assets/banner-courier-hd.jpg');
  const displayBtnLabel = (activeBanner && activeBanner.buttonLabel !== undefined) ? activeBanner.buttonLabel : (fallback.buttonLabel || 'Request Instant Fare Quote');

  return (
    <div className="space-y-16 lg:space-y-24 pb-20 overflow-x-hidden">
      <style>{css}</style>

      {/* ========================================================= */}
      {/* 1. HERO                                                   */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200 py-8 sm:py-10 lg:py-12 select-none">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={displayImage}
            alt="Flymingo Logistics Global Multimodal Operations"
            className="w-full h-full object-cover object-center opacity-65 contrast-[1.05] brightness-[1.05] sv-kb"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-45% to-white/25 z-0 pointer-events-none" aria-hidden="true" />
        <FlightRouteMap className="opacity-10 z-0" />
        <div className="sv-blob absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-brand-red/15 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

            {/* Left: Text Content */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
              {displayBadge && (
                <div className="sv-h1">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-extrabold uppercase tracking-widest text-brand-red shadow-sm">
                    {displayBadge}
                  </div>
                </div>
              )}

              <div className="sv-h2 space-y-1 sm:space-y-1.5">
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
                <p className="sv-h3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-0.5 max-w-2xl">
                  {displayDesc}
                </p>
              )}

              {displayBtnLabel && (
                <div className="sv-h4 flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={handleBannerAction}
                    className="group px-7 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-brand-red/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>{displayBtnLabel}</span>
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="h-3.5 w-3.5 text-white" />
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Right: orbit of the channels */}
            <div className="lg:col-span-5 hidden sm:flex items-center justify-center">
              <OrbitVisual services={effectiveServices} onPick={(i) => pick(i, true)} />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. STATS BAND (dark)                                      */}
      {/* ========================================================= */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#00172b] via-brand-blue-dark to-[#002a47] text-white shadow-2xl shadow-brand-blue/25 border border-white/10">
            <div className="sv-blob absolute -top-20 -left-10 w-64 h-64 rounded-full bg-brand-red/25 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="relative grid grid-cols-2 lg:grid-cols-4 divide-white/10 lg:divide-x">
              {STATS.map((st, i) => (
                <div
                  key={i}
                  className={`group relative p-6 sm:p-8 text-center hover:bg-white/5 transition-colors ${i >= 2 ? 'border-t border-white/10 lg:border-t-0' : ''} ${i % 2 === 1 ? 'border-l border-white/10 lg:border-l-0' : ''}`}
                >
                  <span className="absolute left-1/2 -translate-x-1/2 top-0 h-1 w-0 rounded-b-full bg-brand-red group-hover:w-16 transition-all duration-500" aria-hidden="true" />
                  <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white">
                    <CountUp value={st.value} />
                  </div>
                  <div className="mt-2 text-xs font-black uppercase tracking-wider text-brand-red-light">
                    {st.label}
                  </div>
                  <p className="mt-1 text-[11px] sm:text-xs text-white/65 max-w-[200px] mx-auto">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ========================================================= */}
      {/* 3. SERVICE SHOWCASE: tab pills + feature stage            */}
      {/* ========================================================= */}
      <section ref={stageRef} className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10 scroll-mt-24">
        <Reveal className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-xs font-extrabold uppercase tracking-widest text-brand-red">
            Tailored Specialized Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Our Complete Service Portfolio
          </h2>
          <span className="mx-auto block h-1 w-14 rounded-full bg-brand-red" aria-hidden="true" />
          <p className="text-sm sm:text-base text-slate-600">
            Click on any service to explore detailed operational protocols, transit routes, and customs checklists.
          </p>
        </Reveal>

        {/* tab pills - Clean without icons */}
        <div className="flex items-stretch lg:justify-center gap-3 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-none">
          {effectiveServices.map((c, i) => {
            const on = i === activeIdx;
            return (
              <button
                key={c.id || i}
                type="button"
                onClick={() => pick(i)}
                className={`group shrink-0 flex items-center gap-2.5 pl-3 pr-5 py-2.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  on
                    ? 'bg-brand-blue-dark border-brand-blue-dark text-white shadow-xl shadow-brand-blue/30 -translate-y-1'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-brand-blue/40 hover:shadow-md'
                }`}
              >
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs transition-colors ${
                  on ? 'bg-brand-red text-white shadow-sm' : 'bg-slate-100 text-slate-600 group-hover:bg-brand-blue group-hover:text-white'
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block text-xs sm:text-sm font-bold leading-tight whitespace-nowrap">{c.short || c.title}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* feature stage */}
        <div key={active.id || activeIdx} className="sv-swap relative rounded-[2rem] bg-white border border-slate-200 shadow-2xl shadow-brand-blue/10 overflow-hidden">
          <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-red z-10" aria-hidden="true" />
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* image side */}
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[560px] bg-brand-blue-dark overflow-hidden group">
              <img
                src={active.image}
                alt={active.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001426]/85 via-[#001426]/25 to-transparent" />
              <span className="absolute right-4 top-2 text-[7rem] sm:text-[9rem] font-black font-mono leading-none text-white/15 select-none pointer-events-none" aria-hidden="true">
                {String(activeIdx + 1).padStart(2, '0')}
              </span>
              <div className="absolute left-5 right-5 bottom-5 flex items-center gap-3">
                <span className="text-xs sm:text-sm font-mono font-bold text-white bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/25 shadow-lg">
                  {active.tagline}
                </span>
              </div>
            </div>

            {/* content side */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider border ${active.badgeColor}`}>
                  {active.badge}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {active.title}
                </h3>
                <span className="block h-1 w-12 rounded-full bg-brand-red" aria-hidden="true" />
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {active.lead}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {active.features.map((feat, fi) => (
                  <div
                    key={fi}
                    className="group/f flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-brand-blue/30 hover:shadow-md transition-all"
                  >
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover/f:bg-emerald-500 group-hover/f:text-white transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                    <span className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-snug">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to={active.path}
                    className="group px-6 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-blue/25 hover:-translate-y-0.5"
                  >
                    <span>Explore Full Service</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <button
                    onClick={() => onOpenQuote(active.id)}
                    className="px-6 py-3 bg-white border border-slate-300 hover:border-brand-red text-slate-700 hover:text-brand-red rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer hover:-translate-y-0.5"
                  >
                    Get Free Quote
                  </button>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-100 border border-slate-200">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous service"
                    className="w-9 h-9 rounded-full bg-white hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="px-2 text-xs font-mono font-bold text-slate-500 select-none">
                    <span className="text-brand-red font-black text-sm">{String(activeIdx + 1).padStart(2, '0')}</span> / {String(CAPABILITIES.length).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next service"
                    className="w-9 h-9 rounded-full bg-white hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. BOTTOM ACTION BAND                                     */}
      {/* ========================================================= */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-blue-dark text-white p-8 sm:p-12 shadow-2xl shadow-brand-blue/30 border border-white/10">
            <img
              src="/assets/banner-courier-hd.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity pointer-events-none"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00172b]/95 via-[#00172b]/80 to-brand-blue-dark/60 pointer-events-none" aria-hidden="true" />
            <div className="sv-blob absolute -top-24 -right-10 w-80 h-80 rounded-full bg-brand-red/30 blur-3xl pointer-events-none" aria-hidden="true" />
            <Plane className="absolute right-10 bottom-4 w-40 h-40 text-white/[0.06] -rotate-12 pointer-events-none" aria-hidden="true" />
            <span className="absolute left-0 top-10 bottom-10 w-1.5 rounded-r-full bg-brand-red" aria-hidden="true" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red-light bg-white/10 border border-white/20 px-3.5 py-1 rounded-full inline-block">
                  Immediate Assistance
                </span>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  Ready to move cargo with zero gaps?
                </h3>
                <p className="text-sm sm:text-base text-white/80 max-w-xl">
                  Connect with our Coimbatore HQ or Chennai Port operations desk for immediate booking and rate guidance.
                </p>
              </div>
              <button
                onClick={() => onOpenQuote()}
                className="group shrink-0 px-9 py-4 bg-brand-red hover:bg-white hover:text-brand-red text-white rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xl shadow-brand-red/40 transition-all hover:-translate-y-1 cursor-pointer flex items-center gap-2"
              >
                Request Instant Quote
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default ServicesPage;