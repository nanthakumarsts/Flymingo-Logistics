import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Plane, Anchor, AlertTriangle, Truck, ShieldCheck,
  ArrowRight, Search, Calculator, Check, Quote,
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

const css = `
@keyframes fm-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes fm-draw { to { stroke-dashoffset: 0; } }
@keyframes fm-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.fm-hero-item { opacity: 0; animation: fm-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
.fm-wing { stroke-dasharray: 1200; stroke-dashoffset: 1200; animation: fm-draw 2.2s .2s cubic-bezier(.3,.6,.2,1) forwards; }
.fm-float { animation: fm-float 7s ease-in-out infinite; }
.fm-reveal { opacity: 0; transform: translateY(16px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
.fm-reveal.fm-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .fm-hero-item, .fm-reveal { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; }
  .fm-wing { stroke-dashoffset: 0; animation: none; }
  .fm-float { animation: none; }
}
`;

/* Reveal on scroll */
const Reveal = ({ children, delay = 0, className = '' }) => {
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
      className={`fm-reveal ${shown ? 'fm-in' : ''} ${className}`}
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
        const p = Math.min((t - t0) / 1200, 1);
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

const SectionHead = ({ title, text }) => (
  <Reveal className="max-w-2xl mx-auto text-center space-y-3 mb-12">
    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{title}</h2>
    {text && <p className="text-base text-slate-600 leading-relaxed">{text}</p>}
  </Reveal>
);

const fieldCls =
  'w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 ' +
  'focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition';
const labelCls = 'block text-sm font-medium text-slate-700 mb-1.5';

export const HomePage = ({ onOpenQuote }) => {
  const [heroFromCountry, setHeroFromCountry] = useState('India');
  const [heroToCountry, setHeroToCountry] = useState('United States');
  const [heroService, setHeroService] = useState('international-courier');
  const [heroWeight, setHeroWeight] = useState('10');

  const handleHeroQuoteSubmit = (e) => {
    e.preventDefault();
    onOpenQuote(heroService);
  };

  return (
    <div className="bg-white text-slate-800 font-sans">
      <style>{css}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-blue-50 to-white">
        {/* Wing line echoing the logo */}
        <svg
          className="absolute -top-6 right-0 w-[70%] max-w-[900px] pointer-events-none hidden md:block"
          viewBox="0 0 900 400" fill="none" aria-hidden="true"
        >
          <path className="fm-wing" d="M20 360 C 220 340, 420 220, 560 120 C 640 62, 760 30, 880 20"
            stroke="#E8291F" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
          <path className="fm-wing" style={{ animationDelay: '.5s' }}
            d="M60 380 C 260 360, 460 250, 600 160 C 680 108, 780 70, 880 60"
            stroke="#005687" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              <p className="fm-hero-item text-sm font-semibold text-brand-blue" style={{ animationDelay: '.05s' }}>
                Global marine logistics &amp; freight forwarding
              </p>

              <h1 className="fm-hero-item text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
                style={{ animationDelay: '.15s' }}>
                Six ways we get your cargo from origin to destination.
              </h1>

              <p className="fm-hero-item text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                style={{ animationDelay: '.3s' }}>
                From ship spares delivered on board at global anchorages to overseas courier,
                personal relocation and certified dangerous goods air cargo.
              </p>

              <div className="fm-hero-item flex flex-wrap items-center justify-center lg:justify-start gap-3"
                style={{ animationDelay: '.45s' }}>
                <button
                  onClick={() => onOpenQuote()}
                  className="px-6 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-sm font-semibold shadow-lg shadow-brand-red/20 hover:-translate-y-0.5 transition cursor-pointer flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" /> Get fare rate
                </button>
                <Link
                  to="/services"
                  className="px-6 py-3.5 bg-white border border-slate-200 hover:border-brand-blue text-brand-blue rounded-xl text-sm font-semibold transition cursor-pointer flex items-center gap-2"
                >
                  <Package className="w-4 h-4" /> Explore services
                </Link>
                <a href={BRAND.brochurePath} download
                  className="px-3 py-3.5 text-sm font-semibold text-slate-600 hover:text-brand-blue transition inline-flex items-center gap-1.5">
                  Download brochure <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <ul className="fm-hero-item flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-slate-500"
                style={{ animationDelay: '.6s' }}>
                {['Customs house brokerage', 'IATA / IMO certified DG', '24/7 port deck delivery'].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-brand-blue" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick action card */}
            <div className="lg:col-span-5 fm-hero-item" style={{ animationDelay: '.35s' }}>
              <div className="fm-float">
                <div className="bg-white rounded-3xl shadow-xl shadow-brand-blue/10 border border-slate-100 p-6 sm:p-8">
                  <div className="mb-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-red">
                        Fare Rate Calculator
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">
                        Cargo Request Quote
                      </h3>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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
                      className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2">
                      Continue with full details <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-center text-slate-400">Instant quote. Direct operational rates.</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 py-10 border-y border-slate-100">
            {STATS.map((st, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-4xl lg:text-5xl font-extrabold text-brand-blue tracking-tight">
                  <CountUp value={st.value} />
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{st.label}</div>
                <p className="mt-1 text-sm text-slate-500 max-w-[220px] mx-auto">{st.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ CORE SERVICES ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <SectionHead
          title="Comprehensive logistics and maritime services"
          text="Built for reliability, transparent tracking and full compliance across worldwide corridors."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((s, i) => {
            const Icon = SERVICE_ICONS[s.id] || Package;
            return (
              <Reveal key={s.id} delay={(i % 3) * 80}>
                <div className="group h-full bg-white rounded-2xl border border-slate-200 p-7 flex flex-col hover:border-brand-blue/50 hover:shadow-lg hover:shadow-brand-blue/5 transition-all duration-300">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">{s.badge}</span>
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
                    <button onClick={() => onOpenQuote(s.id)} className="text-sm font-semibold text-brand-red hover:underline cursor-pointer">
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
      <section className="bg-brand-blue-50/60 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            title="From pickup to delivery, one clear process"
            text="A standard, transparent pipeline built around shipowner precision and door-to-door accountability."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {SIX_WAYS_CARGO.map((item, idx) => (
              <Reveal key={idx} delay={(idx % 3) * 80}>
                <div className="border-l-2 border-brand-blue/30 pl-5 hover:border-brand-red transition-colors duration-300">
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROMISE ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand-blue text-white p-8 sm:p-14">
            <Quote className="absolute -right-4 -bottom-6 w-48 h-48 text-white/5" />
            <div className="relative max-w-3xl space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">We never break our promise.</h2>
              <blockquote className="border-l-4 border-brand-red pl-5 text-lg leading-relaxed text-white/90">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <SectionHead
          title="Tailored express consignments"
          text="Special packaging and compliant customs clearance for specific categories."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPECIALIZED_EXPRESS.map((item, idx) => {
            const Icon = EXPRESS_ICONS[item.icon] || Boxes;
            return (
              <Reveal key={idx} delay={(idx % 3) * 80}>
                <div className="h-full flex items-start gap-4 p-6 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-md transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-white text-brand-blue flex items-center justify-center flex-shrink-0 shadow-sm">
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
      <section className="bg-brand-blue-50/60 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            title="Serving critical global sectors"
            text="Logistics workflows built to meet strict industry benchmarks."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES_SERVED.map((ind, idx) => {
              const Icon = INDUSTRY_ICONS[ind.icon] || Ship;
              return (
                <Reveal key={idx} delay={(idx % 3) * 80}>
                  <div className="h-full bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-blue/50 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-blue-50 text-brand-blue flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-slate-900 leading-snug">{ind.name}</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <SectionHead title="Trusted by maritime fleets and global families" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <figure className="h-full flex flex-col justify-between bg-white rounded-2xl border border-slate-200 p-7 hover:shadow-lg hover:shadow-brand-blue/5 transition-shadow duration-300">
                <div className="space-y-4">
                  <Quote className="w-7 h-7 text-brand-red/60" />
                  <blockquote className="text-slate-700 leading-relaxed">{t.quote}</blockquote>
                </div>
                <figcaption className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-bold flex items-center justify-center">
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