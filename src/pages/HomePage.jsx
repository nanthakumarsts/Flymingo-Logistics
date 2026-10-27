import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Plane, Anchor, AlertTriangle, Truck, ShieldCheck,
  ArrowRight, Calculator, Check, Quote,
  Boxes, FileText, Coffee, Luggage, HeartPulse, Flame,
  Ship, Radio, Utensils, Atom, Activity, Car,
  ArrowUpRight, Globe, Clock, ChevronLeft, ChevronRight, Download
} from 'lucide-react';
import {
  BRAND, STATS, CORE_SERVICES, SIX_WAYS_CARGO,
  SPECIALIZED_EXPRESS, INDUSTRIES_SERVED, TESTIMONIALS
} from '../data/siteData';
import HERO_SLIDES from '../data/heroSlides.json';
import { FlightRouteMap } from '../components/FlightRouteMap';

/* Background photos. Swap any URL for your own file, e.g. '/images/process-bg.jpg' in /public.
   If an image fails to load, the section falls back to the dark brand blue behind it. */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=70',
  process: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=70',
  industries: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=70',
};



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
@keyframes fm-zoom { from { transform: scale(1.08); } to { transform: scale(1); } }
@keyframes fm-ping { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(2.6); opacity: 0; } }
@keyframes fm-dash { to { stroke-dashoffset: -64; } }
@keyframes fm-spin-slow { to { transform: rotate(360deg); } }
@keyframes fm-pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(232,41,31,.55); } 100% { box-shadow: 0 0 0 16px rgba(232,41,31,0); } }
@keyframes fm-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes fm-kb-zoom-in {
  0% { transform: scale(1.02) translate(0, 0); }
  50% { transform: scale(1.10) translate(-1.5%, -1%); }
  100% { transform: scale(1.18) translate(-3%, -2%); }
}
@keyframes fm-kb-zoom-out {
  0% { transform: scale(1.18) translate(0, 0); }
  50% { transform: scale(1.10) translate(1.5%, 1%); }
  100% { transform: scale(1.02) translate(3%, 1.5%); }
}
@keyframes fm-kb-pan-right {
  0% { transform: scale(1.08) translate(-3%, 0); }
  50% { transform: scale(1.12) translate(0%, -1%); }
  100% { transform: scale(1.16) translate(3%, -1.5%); }
}
@keyframes fm-slide-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }

.fm-hero-item { opacity: 0; animation: fm-rise .9s cubic-bezier(.2,.7,.2,1) forwards; }
.fm-wing { stroke-dasharray: 1200; stroke-dashoffset: 1200; animation: fm-draw 2.4s .2s cubic-bezier(.3,.6,.2,1) forwards; }
.fm-zoom { animation: fm-zoom 14s ease-out forwards; }
.fm-float { animation: fm-float 7s ease-in-out infinite; }
.fm-blob { animation: fm-blob 16s ease-in-out infinite; }
.fm-dash { stroke-dasharray: 8 12; animation: fm-dash 4s linear infinite; }
.fm-spin { animation: fm-spin-slow 40s linear infinite; }
.fm-pulse { animation: fm-pulse-ring 2s ease-out infinite; }

/* new hero slider */
.fm-bar { transform-origin: left; animation: fm-bar 6s linear forwards; }
.fm-bar-paused { animation-play-state: paused; }
.fm-kb-0 { animation: fm-kb-zoom-in 8s linear infinite alternate; will-change: transform; }
.fm-kb-1 { animation: fm-kb-zoom-out 8s linear infinite alternate; will-change: transform; }
.fm-kb-2 { animation: fm-kb-pan-right 8s linear infinite alternate; will-change: transform; }
.fm-s1 { opacity: 0; animation: fm-slide-in .7s .05s cubic-bezier(.2,.7,.2,1) forwards; }
.fm-s2 { opacity: 0; animation: fm-slide-in .7s .18s cubic-bezier(.2,.7,.2,1) forwards; }
.fm-s3 { opacity: 0; animation: fm-slide-in .7s .30s cubic-bezier(.2,.7,.2,1) forwards; }
.fm-s4 { opacity: 0; animation: fm-slide-in .7s .42s cubic-bezier(.2,.7,.2,1) forwards; }

/* photo backgrounds: parallax on desktop, normal scroll on touch devices */
.fm-parallax { background-image: var(--bg); background-size: cover; background-position: center; }
@media (min-width: 1024px) { .fm-parallax { background-attachment: fixed; } }

/* scroll reveal variants */
.fm-reveal { opacity: 0; transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1); will-change: transform, opacity; }
.fm-up    { transform: translateY(28px); }
.fm-left  { transform: translateX(-28px); }
.fm-right { transform: translateX(28px); }
.fm-scale { transform: scale(.94); }
.fm-reveal.fm-in { opacity: 1; transform: none; }

/* spotlight card */
.fm-spot { position: relative; isolation: isolate; }
.fm-spot::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; z-index: -1; opacity: 0;
  background-color: rgba(0,86,135,.04);
  transition: opacity .3s;
}
.fm-spot:hover::before { opacity: 1; }
.fm-spot-dark::before { background-color: rgba(232,41,31,.08); }

/* animated accent line on cards */
.fm-line { transform: scaleX(0); transform-origin: left; transition: transform .5s cubic-bezier(.2,.7,.2,1); }
.group:hover .fm-line { transform: scaleX(1); }

/* scroll progress bar */
.fm-progress { transform-origin: left; transform: scaleX(var(--p,0)); }

@media (prefers-reduced-motion: reduce) {
  .fm-hero-item, .fm-reveal, .fm-s1, .fm-s2, .fm-s3, .fm-s4 { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; filter: none !important; }
  .fm-wing { stroke-dashoffset: 0; animation: none; }
  .fm-zoom, .fm-kb-0, .fm-kb-1, .fm-kb-2, .fm-bar, .fm-float, .fm-blob, .fm-ping::after, .fm-dash, .fm-spin, .fm-pulse { animation: none; }
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


/* Curved edge that blends a dark section into the next one. Colour comes from text-* */
const Wave = ({ className = '', flip = false }) => (
  <svg
    viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"
    className={`absolute left-0 w-full h-10 sm:h-16 pointer-events-none ${flip ? '-top-[2px] rotate-180' : '-bottom-[2px]'} ${className}`}
  >
    <path fill="currentColor" d="M0 44 C 240 92 480 0 720 36 S 1200 84 1440 28 V80 H0 Z" />
  </svg>
);

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
  <Reveal className="max-w-3xl mx-auto text-center space-y-4 mb-14 sm:mb-16">
    <span className="mx-auto block h-1 w-12 rounded-full bg-brand-red" aria-hidden="true" />
    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    {text && <p className={`text-base sm:text-lg leading-relaxed ${light ? 'text-white/80' : 'text-slate-600'}`}>{text}</p>}
  </Reveal>
);

const STAT_ICONS = [Globe, Plane, ShieldCheck, Clock];

export const HomePage = ({ onOpenQuote }) => {
  const barRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = HERO_SLIDES.length;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slideCount]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  const activeSlide = HERO_SLIDES[currentSlide] || HERO_SLIDES[0] || {};

  /* Process slider state */
  const [processSlide, setProcessSlide] = useState(0);
  const [isProcessPaused, setIsProcessPaused] = useState(false);
  const processCount = SIX_WAYS_CARGO.length;

  useEffect(() => {
    if (isProcessPaused) return;
    const timer = setInterval(() => {
      setProcessSlide((prev) => (prev + 1) % processCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [isProcessPaused, processCount]);

  const nextProcess = () => setProcessSlide((prev) => (prev + 1) % processCount);
  const prevProcess = () => setProcessSlide((prev) => (prev - 1 + processCount) % processCount);

  /* Sectors slider state */
  const [sectorSlide, setSectorSlide] = useState(0);
  const [isSectorPaused, setIsSectorPaused] = useState(false);
  const sectorCount = INDUSTRIES_SERVED.length;

  useEffect(() => {
    if (isSectorPaused) return;
    const timer = setInterval(() => {
      setSectorSlide((prev) => (prev + 1) % sectorCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [isSectorPaused, sectorCount]);

  const nextSector = () => setSectorSlide((prev) => (prev + 1) % sectorCount);
  const prevSector = () => setSectorSlide((prev) => (prev - 1 + sectorCount) % sectorCount);

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

  return (
    <div className="bg-white text-slate-800 font-sans overflow-x-hidden">
      <style>{css}</style>

      {/* scroll progress */}
      <div ref={barRef} className="fm-progress fixed top-0 left-0 right-0 h-[3px] z-[60] bg-brand-red" />

      {/* ============ HERO SLIDER ============ */}
      <section
        className="relative overflow-hidden bg-brand-blue-dark text-white select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* full-bleed slide images - dynamic Ken Burns continuous camera moving effect */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          const kbClass = idx % 3 === 0 ? 'fm-kb-0' : idx % 3 === 1 ? 'fm-kb-1' : 'fm-kb-2';
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                key={isActive ? `${slide.id}-active` : `${slide.id}-idle`}
                src={slide.image}
                alt=""
                aria-hidden="true"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none ${
                  isActive ? `${kbClass} opacity-95` : 'scale-100 opacity-0'
                }`}
              />
            </div>
          );
        })}

        {/* Subtle dark film scrim - allows photo colors & motion to be clearly visible while guaranteeing 100% crisp text readability without any box */}
        <div className="absolute inset-0 bg-[#001426]/55 pointer-events-none" aria-hidden="true" />
        <FlightRouteMap className="opacity-40 z-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-10 lg:pt-8 lg:pb-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[340px] lg:min-h-[360px]">

            {/* LEFT: content (open, natural, high-end editorial layout - matching reference) */}
            <div 
              key={activeSlide.id} 
              className="lg:col-span-8 space-y-4 sm:space-y-5 text-left"
            >
              <div className="fm-s1 inline-flex items-center px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-400 shadow-md">
                {activeSlide.badge}
              </div>

              <div className="space-y-2">
                <h1 className="fm-s2 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  {activeSlide.titlePrefix}
                  <span className="text-emerald-400 font-black">
                    {activeSlide.highlight}
                  </span>
                  {activeSlide.titleSuffix}
                </h1>

                {activeSlide.tagline && (
                  <p className="fm-s2 text-base sm:text-xl font-bold text-white/95 tracking-wide drop-shadow-md">
                    {activeSlide.tagline}
                  </p>
                )}
              </div>

              <p className="fm-s3 text-sm sm:text-lg text-white/95 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                {activeSlide.desc}
              </p>

              <div className="fm-s4 flex flex-wrap items-center justify-start gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenQuote(activeSlide.serviceId)}
                  className="group px-7 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-emerald-500/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3"
                >
                  <span>{activeSlide.primaryCta}</span>
                  <span className="w-6 h-6 rounded-full bg-black/25 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </button>
                <Link
                  to={activeSlide.secondaryLink}
                  className="px-7 py-3.5 bg-black/35 backdrop-blur-md border border-white/30 hover:bg-white hover:text-brand-blue text-white rounded-full text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 flex items-center gap-2 shadow-lg"
                >
                  {activeSlide.secondaryCta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {activeSlide.highlights && activeSlide.highlights.length > 0 && (
                <ul className="fm-s4 flex flex-wrap items-center justify-start gap-2.5 pt-1.5">
                  {activeSlide.highlights.map((t) => (
                    <li key={t} className="flex items-center gap-2 pl-2 pr-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-md">
                      <span className="w-4 h-4 rounded-full bg-brand-red flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* RIGHT: slide selector rail (desktop) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-3">
              {HERO_SLIDES.map((slide, idx) => {
                const active = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}: ${slide.badge}`}
                    className={`group relative overflow-hidden flex items-center gap-3.5 p-3 rounded-2xl border text-left backdrop-blur-md transition-all duration-300 cursor-pointer ${
                      active
                        ? 'bg-black/55 border-brand-red/80 shadow-2xl ring-2 ring-brand-red/40 scale-[1.02]'
                        : 'bg-black/30 border-white/15 hover:bg-black/45 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className="w-14 h-14 rounded-xl object-cover bg-brand-blue shrink-0 border border-white/20 shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-mono tracking-widest text-brand-red-light font-bold uppercase">
                        {String(idx + 1).padStart(2, '0')} // Corridor
                      </div>
                      <div className={`text-xs sm:text-sm font-bold leading-snug truncate ${active ? 'text-white' : 'text-white/80'}`}>
                        {slide.badge}
                      </div>
                    </div>
                    {/* timer bar on the active card */}
                    {active && (
                      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white/20" aria-hidden="true">
                        <span
                          key={currentSlide}
                          className={`fm-bar block h-full bg-brand-red ${isPaused ? 'fm-bar-paused' : ''}`}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* bottom controls: Unified glass capsule arrows + counter, and stylish download brochure action */}
          <div className="mt-7 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-20">
            {/* Slide Navigation Capsule */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-3 text-xs font-mono font-bold tracking-wider text-white select-none">
                <span className="text-brand-red font-black text-sm">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="text-white/40"> / {String(slideCount).padStart(2, '0')}</span>
              </div>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Download Brochure Capsule */}
            <a
              href={BRAND.brochurePath}
              download
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/40 hover:bg-brand-red text-white border border-white/20 hover:border-brand-red backdrop-blur-md text-xs sm:text-sm font-bold transition-all shadow-lg group cursor-pointer hover:scale-105 active:scale-95"
            >
              <FileText className="w-4 h-4 text-brand-red group-hover:text-white transition-colors" />
              <span>Download Brochure (PDF)</span>
              <Download className="w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        <Wave className="text-white" />
      </section>

      {/* ============ STATS (Compact, Sleek Ribbon - Never Overlaps Controls) ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 mb-12 sm:mb-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/6 border border-slate-200/80 p-4 sm:p-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
            {STATS.map((st, i) => {
              const StatIcon = STAT_ICONS[i % STAT_ICONS.length];
              return (
                <div key={i} className={`flex items-center gap-3.5 sm:gap-4 ${i > 0 ? 'lg:pl-6' : ''} ${i >= 2 ? 'pt-3.5 sm:pt-0' : ''}`}>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center shrink-0 shadow-sm">
                    <StatIcon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900 leading-none">
                      <CountUp value={st.value} />
                    </div>
                    <div className="mt-1 text-xs font-bold text-slate-800 tracking-wide truncate">
                      {st.label}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CORE SERVICES ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-50/50" aria-hidden="true" />
        <div className="fm-blob absolute top-20 -left-24 w-80 h-80 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="fm-blob absolute bottom-10 -right-24 w-80 h-80 rounded-full bg-brand-red/10 blur-3xl pointer-events-none" style={{ animationDelay: '-7s' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <SectionHead
            title="Comprehensive logistics and maritime services"
            text="Built for reliability, transparent tracking and full compliance across worldwide corridors."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {CORE_SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[s.id] || Package;
              return (
                <Reveal key={s.id} delay={(i % 3) * 90}>
                  <div
                    onMouseMove={spot}
                    className="fm-spot group relative h-full bg-white rounded-3xl border border-slate-200 flex flex-col overflow-hidden shadow-lg shadow-brand-blue/5 hover:border-brand-blue/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-blue/15 transition-all duration-300"
                  >
                    {/* authentic photo header with badge and icon */}
                    <div className="relative h-40 bg-brand-blue-dark overflow-hidden">
                      <img
                        src={s.image || '/assets/service banner.jpg'}
                        alt={s.title}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-slate-950/40" />
                      <span className="absolute right-4 top-3 text-3xl font-black text-white/20 leading-none select-none font-mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <div className="absolute left-6 bottom-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-brand-red text-white flex items-center justify-center shadow-lg shadow-brand-red/40 group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-white tracking-wide drop-shadow-md bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">{s.badge}</span>
                      </div>
                    </div>

                    <div className="relative p-6 sm:p-7 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-5">{s.shortDesc}</p>
                      <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
                        {s.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2.5">
                            <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                              <Check className="w-3 h-3" />
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                        <Link to={s.path} className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Explore service <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button onClick={() => onOpenQuote(s.id)} className="px-4 py-1.5 rounded-full text-sm font-semibold text-brand-red border border-brand-red/30 hover:bg-brand-red hover:text-white transition-colors cursor-pointer">
                          Get quote
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SIX WAYS (pickup to delivery) SLIDER ============ */}
      <section 
        className="relative bg-brand-blue-dark text-white py-16 sm:py-24 overflow-hidden select-none"
        onMouseEnter={() => setIsProcessPaused(true)}
        onMouseLeave={() => setIsProcessPaused(false)}
      >
        {/* Dynamic moving photo background with Ken Burns camera movement */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/assets/loading and unloading.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-80 scale-105 fm-kb-1"
          />
        </div>
        <div className="absolute inset-0 bg-[#001426]/70 pointer-events-none" aria-hidden="true" />
        <FlightRouteMap className="opacity-35 z-0" />
        <Wave className="text-white" flip />
        <Wave className="text-white" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <SectionHead
            light
            title="From pickup to delivery, one clear process"
            text="A standard, transparent pipeline built around shipowner precision and door-to-door accountability."
          />

          {/* Quick Stage Stepper Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {SIX_WAYS_CARGO.map((item, idx) => {
              const active = idx === processSlide;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setProcessSlide(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                    active 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105' 
                      : 'bg-black/40 text-white/70 hover:text-white hover:bg-black/60 border border-white/15'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${active ? 'bg-black/25 text-white' : 'bg-white/10'}`}>
                    {item.step}
                  </span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Process Slider Stage Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[300px]">
            {/* LEFT: Active Step Detailed Feature */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-400 shadow-md">
                STAGE {SIX_WAYS_CARGO[processSlide].step} // TRANSPARENT PIPELINE
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                {SIX_WAYS_CARGO[processSlide].title}
              </h3>

              <p className="text-base sm:text-lg text-white/95 leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                {SIX_WAYS_CARGO[processSlide].desc}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-2 shadow-md">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Real-Time Milestone Logging</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-2 shadow-md">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Zero-Delay Customs Pre-Check</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Visual Selector Rail */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SIX_WAYS_CARGO.map((item, idx) => {
                const active = idx === processSlide;
                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setProcessSlide(idx)}
                    className={`text-left p-4 rounded-2xl border backdrop-blur-md transition-all cursor-pointer relative overflow-hidden ${
                      active
                        ? 'bg-black/60 border-emerald-400 shadow-xl ring-2 ring-emerald-400/30 scale-[1.02]'
                        : 'bg-black/30 border-white/15 hover:bg-black/45 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-extrabold text-emerald-400">{item.step}</span>
                      {active && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1 leading-snug">{item.title}</h4>
                    <p className="text-xs text-white/70 line-clamp-2">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slider Bottom Controls: Frosted Glass Capsule */}
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg">
              <button
                type="button"
                onClick={prevProcess}
                aria-label="Previous process stage"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-3 text-xs font-mono font-bold tracking-wider text-white select-none">
                <span className="text-emerald-400 font-black text-sm">{String(processSlide + 1).padStart(2, '0')}</span>
                <span className="text-white/40"> / {String(processCount).padStart(2, '0')}</span>
              </div>
              <button
                type="button"
                onClick={nextProcess}
                aria-label="Next process stage"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs font-mono text-white/70 tracking-wider">
              AUTO-CYCLE &bull; HOVER TO PAUSE
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROMISE ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-blue-dark border border-brand-blue/30 text-white p-7 sm:p-12 lg:p-16 shadow-2xl">
            <img
              src="/assets/service banner.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity pointer-events-none"
            />
            <div className="absolute inset-0 bg-[#00172b]/85" aria-hidden="true" />
            <div className="fm-blob absolute -top-20 -left-16 w-72 h-72 rounded-full bg-brand-red/30 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="fm-blob absolute -bottom-24 right-10 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" style={{ animationDelay: '-8s' }} aria-hidden="true" />
            <Quote className="absolute -right-4 -bottom-6 w-56 h-56 text-white/5" />
            <span className="absolute left-0 top-10 bottom-10 w-1.5 rounded-r-full bg-brand-red" aria-hidden="true" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="space-y-6">
                <span className="w-14 h-14 rounded-2xl bg-brand-red flex items-center justify-center shadow-xl shadow-brand-red/40 fm-float">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">We never break our promise.</h2>
                <p className="text-white/90 leading-relaxed text-base sm:text-lg">
                  At Flymingo Logistics, every consignment is treated as mission-critical. Whether it is an AOG spare part
                  for an aircraft, replacement machinery for a berthing vessel, or homemade sweets sent to family overseas,
                  we operate with intentional precision.
                </p>
              </div>
              <blockquote className="relative border-l-4 border-brand-red pl-6 pr-5 py-6 text-lg sm:text-xl leading-relaxed text-white bg-[#001e36]/85 rounded-r-2xl backdrop-blur-md border-y border-r border-y-white/15 border-r-white/15 shadow-xl shadow-black/20">
                <Quote className="w-8 h-8 text-brand-red mb-3" />
                &ldquo;Just because you are doing a lot more doesn&apos;t mean you are getting a lot done. Don&apos;t confuse movement with progress!&rdquo;
                <footer className="mt-4 text-sm text-white/70 font-semibold">Denzel Washington, our core inspiration</footer>
              </blockquote>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ SPECIALIZED EXPRESS (Distinct Horizontal Category Layout) ============ */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            title="Tailored express consignments"
            text="Special packaging and compliant customs clearance for specific categories."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SPECIALIZED_EXPRESS.map((item, idx) => {
              const Icon = EXPRESS_ICONS[item.icon] || Boxes;
              return (
                <Reveal key={idx} delay={(idx % 3) * 70}>
                  <div className="group relative flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-brand-red/50 hover:shadow-xl hover:shadow-brand-red/5 hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors">{item.title}</h3>
                        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ INDUSTRIES (Serving critical global sectors) SLIDER ============ */}
      <section 
        className="relative bg-brand-blue-dark py-16 sm:py-24 overflow-hidden text-white select-none"
        onMouseEnter={() => setIsSectorPaused(true)}
        onMouseLeave={() => setIsSectorPaused(false)}
      >
        {/* Dynamic moving maritime photo background with Ken Burns camera movement */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/assets/sea cargo.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-80 scale-105 fm-kb-2"
          />
        </div>
        <div className="absolute inset-0 bg-[#001426]/70 pointer-events-none" aria-hidden="true" />
        <FlightRouteMap className="opacity-35 z-0" />
        <Wave className="text-slate-50" flip />
        <Wave className="text-slate-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <SectionHead
            light
            title="Serving critical global sectors"
            text="Logistics workflows built to meet strict industry benchmarks."
          />

          {/* Sector Slider Showcase Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[300px]">
            {/* LEFT: Active Sector Spotlight */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-400 shadow-md">
                CORRIDOR {String(sectorSlide + 1).padStart(2, '0')} // SPECIALIZED SECTOR
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg">
                  {(() => {
                    const ActiveIcon = INDUSTRY_ICONS[INDUSTRIES_SERVED[sectorSlide].icon] || Ship;
                    return <ActiveIcon className="w-7 h-7" />;
                  })()}
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                  {INDUSTRIES_SERVED[sectorSlide].name}
                </h3>
              </div>

              <p className="text-base sm:text-lg text-white/95 leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                {INDUSTRIES_SERVED[sectorSlide].desc}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => onOpenQuote()}
                  className="group px-7 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-emerald-500/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3"
                >
                  <span>Request Industry Logistics Rate</span>
                  <span className="w-6 h-6 rounded-full bg-black/25 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="h-3.5 w-3.5 text-white" />
                  </span>
                </button>
              </div>
            </div>

            {/* RIGHT: Visual Sector Selector Rail */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INDUSTRIES_SERVED.map((ind, idx) => {
                const active = idx === sectorSlide;
                const Icon = INDUSTRY_ICONS[ind.icon] || Ship;
                return (
                  <button
                    key={ind.name}
                    type="button"
                    onClick={() => setSectorSlide(idx)}
                    className={`text-left p-4 rounded-2xl border backdrop-blur-md transition-all cursor-pointer relative overflow-hidden ${
                      active
                        ? 'bg-black/60 border-emerald-400 shadow-xl ring-2 ring-emerald-400/30 scale-[1.02]'
                        : 'bg-black/30 border-white/15 hover:bg-black/45 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-extrabold text-emerald-400">{String(idx + 1).padStart(2, '0')}</span>
                      <Icon className="w-5 h-5 text-white/70" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1 leading-snug">{ind.name}</h4>
                    <p className="text-xs text-white/70 line-clamp-2">{ind.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slider Bottom Controls: Frosted Glass Capsule */}
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg">
              <button
                type="button"
                onClick={prevSector}
                aria-label="Previous sector"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-3 text-xs font-mono font-bold tracking-wider text-white select-none">
                <span className="text-emerald-400 font-black text-sm">{String(sectorSlide + 1).padStart(2, '0')}</span>
                <span className="text-white/40"> / {String(sectorCount).padStart(2, '0')}</span>
              </div>
              <button
                type="button"
                onClick={nextSector}
                aria-label="Next sector"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs font-mono text-white/70 tracking-wider">
              AUTO-CYCLE &bull; HOVER TO PAUSE
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative overflow-hidden bg-slate-50">
        <Quote className="absolute left-4 top-24 w-56 h-56 text-brand-blue/[0.05] -rotate-6" aria-hidden="true" />
        <Quote className="absolute right-4 bottom-10 w-56 h-56 text-brand-red/[0.06] rotate-6" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <SectionHead title="Trusted by maritime fleets and global families" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <figure className="group relative h-full flex flex-col justify-between bg-white rounded-3xl border border-slate-200 p-7 overflow-hidden shadow-lg shadow-brand-blue/5 hover:-translate-y-2 hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-brand-blue/15 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                      <Quote className="w-6 h-6" />
                    </div>
                    <blockquote className="text-slate-700 leading-relaxed text-sm">{t.quote}</blockquote>
                  </div>
                  <figcaption className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-bold flex items-center justify-center text-sm ring-2 ring-brand-red/30 ring-offset-2 shrink-0">
                      {t.author.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">{t.author}</div>
                      <div className="text-xs text-slate-500 truncate">{t.role}, {t.company}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};