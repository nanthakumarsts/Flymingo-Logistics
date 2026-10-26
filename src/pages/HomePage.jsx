import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Plane, Anchor, AlertTriangle, Truck, ShieldCheck,
  ArrowRight, Calculator, Check, Quote,
  Boxes, FileText, Coffee, Luggage, HeartPulse, Flame,
  Ship, Radio, Utensils, Atom, Activity, Car
} from 'lucide-react';
import {
  BRAND, STATS, CORE_SERVICES, SIX_WAYS_CARGO,
  SPECIALIZED_EXPRESS, INDUSTRIES_SERVED, TESTIMONIALS, COUNTRIES
} from '../data/siteData';

const SERVICE_ICONS = {
  'international-courier': Package,
  'freight-forwarding': Plane,
  'ship-spares': Anchor,
  'dg-shipping': AlertTriangle,
  'international-relocation': Truck,
  'customs-clearance': ShieldCheck,
};
const EXPRESS_ICONS = { FileText, Coffee, Luggage, HeartPulse, Flame, Boxes };
const INDUSTRY_ICONS = { Ship, Radio, Utensils, Atom, Activity, Car };

/* Logo colours: red #E8291F, blue #005687 */
const css = `
@keyframes fm-rise { from { opacity: 0; transform: translateY(26px); filter: blur(6px); } to { opacity: 1; transform: none; filter: blur(0); } }
@keyframes fm-draw { to { stroke-dashoffset: 0; } }
@keyframes fm-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes fm-blob { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-24px) scale(1.08); } 66% { transform: translate(-22px,18px) scale(.95); } }
@keyframes fm-shine { to { background-position: 200% center; } }
@keyframes fm-ping { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(2.6); opacity: 0; } }

.fm-hero-item { opacity: 0; animation: fm-rise .9s cubic-bezier(.2,.7,.2,1) forwards; }
.fm-wing { stroke-dasharray: 1200; stroke-dashoffset: 1200; animation: fm-draw 2.4s .2s cubic-bezier(.3,.6,.2,1) forwards; }
.fm-float { animation: fm-float 7s ease-in-out infinite; }
.fm-blob { animation: fm-blob 16s ease-in-out infinite; }
.fm-ping::after { content:''; position:absolute; inset:0; border-radius:9999px; background:#10b981; animation: fm-ping 1.8s ease-out infinite; }

.fm-gradient-text {
  background: linear-gradient(90deg, #005687 0%, #E8291F 50%, #005687 100%);
  background-size: 200% auto; -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
  animation: fm-shine 6s linear infinite;
}
.fm-grid-bg {
  background-image: linear-gradient(to right, rgba(0,86,135,.07) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0,86,135,.07) 1px, transparent 1px);
  background-size: 44px 44px;
  -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 25%, transparent 75%);
          mask-image: radial-gradient(ellipse at 50% 40%, #000 25%, transparent 75%);
}

/* scroll reveal variants */
.fm-reveal { opacity: 0; transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1); will-change: transform, opacity; }
.fm-up    { transform: translateY(28px); }
.fm-left  { transform: translateX(-28px); }
.fm-scale { transform: scale(.94); }
.fm-reveal.fm-in { opacity: 1; transform: none; }

/* spotlight card: glow follows the cursor */
.fm-spot { position: relative; isolation: isolate; }
.fm-spot::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; z-index: -1; opacity: 0;
  background: radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(0,86,135,.10), transparent 60%);
  transition: opacity .3s;
}
.fm-spot:hover::before { opacity: 1; }

/* animated accent line on cards */
.fm-line { transform: scaleX(0); transform-origin: left; transition: transform .5s cubic-bezier(.2,.7,.2,1); }
.group:hover .fm-line { transform: scaleX(1); }

/* scroll progress bar */
.fm-progress { transform-origin: left; transform: scaleX(var(--p,0)); }

@media (prefers-reduced-motion: reduce) {
  .fm-hero-item, .fm-reveal { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; filter: none !important; }
  .fm-wing { stroke-dashoffset: 0; animation: none; }
  .fm-float, .fm-blob, .fm-gradient-text, .fm-ping::after { animation: none; }
}
`;

/* Reveal on scroll */
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
      className={`fm-reveal fm-${variant} ${shown ? 'fm-in' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

/* Cursor-follow glow handler */
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
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

const SectionHead = ({ title, text, light = false }) => (
  <Reveal className="max-w-2xl mx-auto text-center space-y-4 mb-14">
    <span className="mx-auto block h-1 w-12 rounded-full bg-gradient-to-r from-brand-red to-brand-blue" />
    <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    {text && <p className={`text-base leading-relaxed ${light ? 'text-white/70' : 'text-slate-600'}`}>{text}</p>}
  </Reveal>
);

const fieldCls =
  'w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-800 ' +
  'focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue focus:bg-white transition';
const labelCls = 'block text-sm font-medium text-slate-700 mb-1.5';

export const HomePage = ({ onOpenQuote }) => {
  const [heroFromCountry, setHeroFromCountry] = useState('India');
  const [heroToCountry, setHeroToCountry] = useState('United States');
  const [heroService, setHeroService] = useState('international-courier');
  const [heroWeight, setHeroWeight] = useState('10');
  const barRef = useRef(null);

  /* scroll progress */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1);
      if (barRef.current) barRef.current.style.setProperty('--p', p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleHeroQuoteSubmit = (e) => {
    e.preventDefault();
    onOpenQuote(heroService);
  };

  return (
    <div className="bg-white text-slate-800 font-sans overflow-x-hidden">
      <style>{css}</style>

      {/* scroll progress */}
      <div ref={barRef} className="fm-progress fixed top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-brand-red via-brand-red to-brand-blue" />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-blue-50 via-white to-white">
        <div className="absolute inset-0 fm-grid-bg pointer-events-none" aria-hidden="true" />
        <div className="fm-blob absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-brand-blue/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="fm-blob absolute top-1/3 -right-20 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-brand-red/15 blur-3xl pointer-events-none" style={{ animationDelay: '-6s' }} aria-hidden="true" />

        {/* Wing line echoing the logo */}
        <svg
          className="absolute -top-6 right-0 w-[70%] max-w-[900px] pointer-events-none hidden md:block"
          viewBox="0 0 900 400" fill="none" aria-hidden="true"
        >
          <path className="fm-wing" d="M20 360 C 220 340, 420 220, 560 120 C 640 62, 760 30, 880 20"
            stroke="#E8291F" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path className="fm-wing" style={{ animationDelay: '.5s' }}
            d="M60 380 C 260 360, 460 250, 600 160 C 680 108, 780 70, 880 60"
            stroke="#005687" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              <p className="fm-hero-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-brand-blue/15 text-sm font-semibold text-brand-blue shadow-sm"
                style={{ animationDelay: '.05s' }}>
                <span className="w-2 h-2 rounded-full bg-brand-red" />
                Global marine logistics &amp; freight forwarding
              </p>

              <h1 className="fm-hero-item text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
                style={{ animationDelay: '.15s' }}>
                Six ways we get your cargo from <span className="fm-gradient-text">origin to destination.</span>
              </h1>

              <p className="fm-hero-item text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                style={{ animationDelay: '.3s' }}>
                From ship spares delivered on board at global anchorages to overseas courier,
                personal relocation and certified dangerous goods air cargo.
              </p>

              <div className="fm-hero-item flex flex-wrap items-center justify-center lg:justify-start gap-3"
                style={{ animationDelay: '.45s' }}>
                <button
                  onClick={() => onOpenQuote()}
                  className="group px-6 py-3.5 bg-gradient-to-r from-brand-red to-brand-red-dark text-white rounded-xl text-sm font-semibold shadow-lg shadow-brand-red/30 hover:shadow-xl hover:shadow-brand-red/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Get fare rate
                </button>
                <Link
                  to="/services"
                  className="px-6 py-3.5 bg-white/80 backdrop-blur border border-slate-200 hover:border-brand-blue hover:bg-white text-brand-blue rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <Package className="w-4 h-4" /> Explore services
                </Link>
                <a href={BRAND.brochurePath} download
                  className="group px-3 py-3.5 text-sm font-semibold text-slate-600 hover:text-brand-blue transition inline-flex items-center gap-1.5">
                  Download brochure <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <ul className="fm-hero-item flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-slate-500"
                style={{ animationDelay: '.6s' }}>
                {['Customs house brokerage', 'IATA / IMO certified DG', '24/7 port deck delivery'].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-brand-blue" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick action card */}
            <div className="lg:col-span-5 fm-hero-item" style={{ animationDelay: '.35s' }}>
              <div className="fm-float">
                <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-brand-red/60 via-white to-brand-blue/60 shadow-2xl shadow-brand-blue/15">
                  <div className="bg-white/95 backdrop-blur rounded-[22px] p-6 sm:p-8">
                    <div className="mb-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-red">
                          Fare Rate Calculator
                        </span>
                        <h3 className="text-lg font-bold text-slate-900">
                          Cargo Request Quote
                        </h3>
                      </div>
                      <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500 fm-ping" />
                    </div>

                    <form onSubmit={handleHeroQuoteSubmit} className="space-y-4">
                      <div>
                        <label className={labelCls}>Service</label>
                        <select value={heroService} onChange={(e) => setHeroService(e.target.value)} className={fieldCls}>
                          {CORE_SERVICES.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>From</label>
                          <select value={heroFromCountry} onChange={(e) => setHeroFromCountry(e.target.value)} className={fieldCls}>
                            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>To</label>
                          <select value={heroToCountry} onChange={(e) => setHeroToCountry(e.target.value)} className={fieldCls}>
                            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Cargo weight (kg)</label>
                        <input type="number" min="1" value={heroWeight}
                          onChange={(e) => setHeroWeight(e.target.value)} placeholder="e.g. 15" className={fieldCls} />
                      </div>
                      <button type="submit"
                        className="group w-full py-3.5 bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white rounded-xl text-sm font-semibold shadow-lg shadow-brand-blue/25 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2">
                        Continue with full details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <p className="text-xs text-center text-slate-400">Instant quote. Direct operational rates.</p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white shadow-xl shadow-brand-blue/20">
            <div className="fm-blob absolute -top-16 -right-10 w-56 h-56 rounded-full bg-brand-red/30 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-y-8 py-10 px-2 sm:px-6 divide-white/10 lg:divide-x">
              {STATS.map((st, i) => (
                <div key={i} className="text-center px-4">
                  <div className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                    <CountUp value={st.value} />
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">{st.label}</div>
                  <p className="mt-1 text-sm text-white/65 max-w-[220px] mx-auto">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ CORE SERVICES ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <SectionHead
          title="Comprehensive logistics and maritime services"
          text="Built for reliability, transparent tracking and full compliance across worldwide corridors."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((s, i) => {
            const Icon = SERVICE_ICONS[s.id] || Package;
            return (
              <Reveal key={s.id} delay={(i % 3) * 90}>
                <div
                  onMouseMove={spot}
                  className="fm-spot group relative h-full bg-white rounded-2xl border border-slate-200 p-7 flex flex-col overflow-hidden hover:border-brand-blue/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-blue/10 transition-all duration-300"
                >
                  <span className="fm-line absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-red to-brand-blue" />
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-brand-blue group-hover:to-brand-blue-dark group-hover:text-white group-hover:rotate-[-6deg] group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-red/10 text-brand-red">{s.badge}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">{s.shortDesc}</p>
                  <ul className="space-y-2 text-sm text-slate-600 mb-6">
                    {s.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" /> <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                    <Link to={s.path} className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore service <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button onClick={() => onOpenQuote(s.id)} className="text-sm font-semibold text-brand-red hover:underline underline-offset-4 cursor-pointer">
                      Get quote
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ SIX WAYS ============ */}
      <section className="relative bg-brand-blue-50/70 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 fm-grid-bg opacity-60 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            title="From pickup to delivery, one clear process"
            text="A standard, transparent pipeline built around shipowner precision and door-to-door accountability."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SIX_WAYS_CARGO.map((item, idx) => (
              <Reveal key={idx} delay={(idx % 3) * 90} variant="left">
                <div className="group relative h-full bg-white/80 backdrop-blur rounded-2xl border border-white p-6 pl-7 shadow-sm hover:shadow-lg hover:shadow-brand-blue/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue/30 group-hover:bg-brand-red group-hover:w-1.5 transition-all duration-300" />
                  <span className="absolute right-4 top-1 text-6xl font-black text-brand-blue/[0.07] group-hover:text-brand-red/10 transition-colors select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="relative text-lg font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="relative text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROMISE ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-dark text-white p-7 sm:p-14">
            <div className="fm-blob absolute -top-20 -left-16 w-72 h-72 rounded-full bg-brand-red/30 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="fm-blob absolute -bottom-24 right-10 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" style={{ animationDelay: '-8s' }} aria-hidden="true" />
            <Quote className="absolute -right-4 -bottom-6 w-48 h-48 text-white/5" />
            <div className="relative max-w-3xl space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">We never break our promise.</h2>
              <blockquote className="border-l-4 border-brand-red pl-5 py-1 text-base sm:text-lg leading-relaxed text-white/90 bg-white/5 rounded-r-xl backdrop-blur-sm">
                &ldquo;Just because you are doing a lot more doesn&apos;t mean you are getting a lot done. Don&apos;t confuse movement with progress!&rdquo;
                <footer className="mt-2 text-sm text-white/60">Denzel Washington, our core inspiration</footer>
              </blockquote>
              <p className="text-white/80 leading-relaxed">
                At Flymingo Logistics, every consignment is treated as mission-critical. Whether it is an AOG spare part
                for an aircraft, replacement machinery for a berthing vessel, or homemade sweets sent to family overseas,
                we operate with intentional precision.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ SPECIALIZED EXPRESS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <SectionHead
          title="Tailored express consignments"
          text="Special packaging and compliant customs clearance for specific categories."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPECIALIZED_EXPRESS.map((item, idx) => {
            const Icon = EXPRESS_ICONS[item.icon] || Boxes;
            return (
              <Reveal key={idx} delay={(idx % 3) * 90} variant="scale">
                <div className="group h-full flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-brand-red/30 hover:shadow-lg hover:shadow-brand-red/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-white text-brand-blue flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-slate-100 group-hover:bg-brand-red group-hover:text-white group-hover:ring-brand-red group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="relative bg-gradient-to-b from-slate-900 to-brand-blue-dark py-20 sm:py-28 overflow-hidden">
        <div className="fm-blob absolute top-10 left-1/4 w-80 h-80 rounded-full bg-brand-blue/40 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            light
            title="Serving critical global sectors"
            text="Logistics workflows built to meet strict industry benchmarks."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES_SERVED.map((ind, idx) => {
              const Icon = INDUSTRY_ICONS[ind.icon] || Ship;
              return (
                <Reveal key={idx} delay={(idx % 3) * 90}>
                  <div
                    onMouseMove={spot}
                    className="fm-spot group h-full bg-white/[0.06] backdrop-blur rounded-2xl p-6 border border-white/10 hover:border-brand-red/50 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center group-hover:bg-brand-red transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-white leading-snug">{ind.name}</h3>
                    </div>
                    <p className="text-sm text-white/65 leading-relaxed">{ind.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <SectionHead title="Trusted by maritime fleets and global families" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <figure className="group relative h-full flex flex-col justify-between bg-white rounded-2xl border border-slate-200 p-7 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-blue/10 transition-all duration-300">
                <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-red to-brand-blue" />
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-brand-red/70 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300" />
                  <blockquote className="text-slate-700 leading-relaxed">{t.quote}</blockquote>
                </div>
                <figcaption className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white font-bold flex items-center justify-center ring-2 ring-brand-red/30 ring-offset-2">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{t.author}</div>
                    <div className="text-xs text-slate-500">{t.role}, {t.company}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
