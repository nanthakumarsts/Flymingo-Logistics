import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Plane, Anchor, AlertTriangle, Truck, ShieldCheck,
  ArrowRight, Calculator, Check, Quote,
  Boxes, FileText, Coffee, Luggage, HeartPulse, Flame,
  Ship, Radio, Utensils, Atom, Activity, Car,
  ArrowUpRight, Globe, Clock, ChevronLeft, ChevronRight, Download,
  Star, X, CheckCircle2
} from 'lucide-react';
import {
  BRAND, STATS, CORE_SERVICES, SIX_WAYS_CARGO,
  SPECIALIZED_EXPRESS, INDUSTRIES_SERVED, TESTIMONIALS
} from '../data/siteData';
import HERO_SLIDES from '../data/heroSlides.json';
import DEFAULT_BANNER_DATA from '../data/bannerData.json';
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
@keyframes fm-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
@keyframes fm-draw { to { stroke-dashoffset: 0; } }
@keyframes fm-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes fm-blob { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-24px) scale(1.08); } 66% { transform: translate(-22px,18px) scale(.95); } }
@keyframes fm-shine { to { background-position: 200% center; } }
@keyframes fm-zoom { from { transform: scale(1.04); } to { transform: scale(1); } }
@keyframes fm-ping { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(2.6); opacity: 0; } }
@keyframes fm-dash { to { stroke-dashoffset: -64; } }
@keyframes fm-spin-slow { to { transform: rotate(360deg); } }
@keyframes fm-pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(232,41,31,.55); } 100% { box-shadow: 0 0 0 16px rgba(232,41,31,0); } }
@keyframes fm-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes fm-kb-zoom-in {
  0% { transform: scale(1.0) translate3d(0, 0, 0); }
  100% { transform: scale(1.04) translate3d(-1%, -0.5%, 0); }
}
@keyframes fm-kb-zoom-out {
  0% { transform: scale(1.04) translate3d(0, 0, 0); }
  100% { transform: scale(1.0) translate3d(1%, 0.5%, 0); }
}
@keyframes fm-kb-pan-right {
  0% { transform: scale(1.02) translate3d(-1%, 0, 0); }
  100% { transform: scale(1.02) translate3d(1%, -0.5%, 0); }
}
@keyframes fm-slide-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes fm-fade-in { from { opacity: 0; } to { opacity: 1; } }

.fm-hero-item { opacity: 0; animation: fm-rise .9s cubic-bezier(.2,.7,.2,1) forwards; }
.fm-wing { stroke-dasharray: 1200; stroke-dashoffset: 1200; animation: fm-draw 2.4s .2s cubic-bezier(.3,.6,.2,1) forwards; }
.fm-zoom { animation: fm-zoom 14s ease-out forwards; }
.fm-float { animation: fm-float 7s ease-in-out infinite; }
.fm-blob { animation: fm-blob 16s ease-in-out infinite; }
.fm-dash { stroke-dasharray: 8 12; animation: fm-dash 4s linear infinite; }
.fm-spin { animation: fm-spin-slow 40s linear infinite; }
.fm-pulse { animation: fm-pulse-ring 2s ease-out infinite; }
.fm-fade { animation: fm-fade-in .6s ease forwards; }

/* hero slider - maximum hardware clarity */
.fm-bar { transform-origin: left; animation: fm-bar 6s linear forwards; }
.fm-bar-paused { animation-play-state: paused; }
.fm-kb-0 { animation: fm-kb-zoom-in 10s ease-in-out infinite alternate; will-change: transform; backface-visibility: hidden; transform: translateZ(0); image-rendering: -webkit-optimize-contrast; }
.fm-kb-1 { animation: fm-kb-zoom-out 10s ease-in-out infinite alternate; will-change: transform; backface-visibility: hidden; transform: translateZ(0); image-rendering: -webkit-optimize-contrast; }
.fm-kb-2 { animation: fm-kb-pan-right 10s ease-in-out infinite alternate; will-change: transform; backface-visibility: hidden; transform: translateZ(0); image-rendering: -webkit-optimize-contrast; }
.fm-s1 { opacity: 0; animation: fm-slide-in .7s .05s cubic-bezier(.2,.7,.2,1) forwards; }
.fm-s2 { opacity: 0; animation: fm-slide-in .7s .18s cubic-bezier(.2,.7,.2,1) forwards; }
.fm-s3 { opacity: 0; animation: fm-slide-in .7s .30s cubic-bezier(.2,.7,.2,1) forwards; }
.fm-s4 { opacity: 0; animation: fm-slide-in .7s .42s cubic-bezier(.2,.7,.2,1) forwards; }

@keyframes fm-ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.fm-ticker { display: flex; width: max-content; animation: fm-ticker 26s linear infinite; will-change: transform; }
.fm-ticker:hover { animation-play-state: paused; }

/* vertical text for collapsed sector panels (desktop only) */
@media (min-width: 1024px) { .fm-vert { writing-mode: vertical-rl; transform: rotate(180deg); white-space: nowrap; } }

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
  .fm-hero-item, .fm-reveal, .fm-s1, .fm-s2, .fm-s3, .fm-s4, .fm-fade { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; filter: none !important; }
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
  const [slides, setSlides] = useState(HERO_SLIDES);
  const [bannerVideo, setBannerVideo] = useState('/assets/fliqmarine-hero.mov');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = slides.length || 1;

  const DEFAULT_TICKER = DEFAULT_BANNER_DATA?.homeSections?.tickerItems || [
    { id: '1', text: 'ANY SIZE • ANY WEIGHT • ANYWHERE', isHighlight: true },
    { id: '2', text: '190+ COUNTRIES CONNECTED', isHighlight: false },
    { id: '3', text: '24/7 SHIP SPARES MARITIME BERTH', isHighlight: false },
    { id: '4', text: 'FREE DOORSTEP PICKUP IN COIMBATORE & CHENNAI', isHighlight: false },
    { id: '5', text: 'ZERO DEMURRAGE PROTOCOL', isHighlight: false }
  ];

  const [tickerItems, setTickerItems] = useState(DEFAULT_TICKER);
  const [statsList, setStatsList] = useState(DEFAULT_BANNER_DATA?.homeSections?.stats || STATS);
  const [processSteps, setProcessSteps] = useState(DEFAULT_BANNER_DATA?.homeSections?.pickupToDeliverySteps || SIX_WAYS_CARGO);
  const [sectorsList, setSectorsList] = useState(() => {
    if (DEFAULT_BANNER_DATA?.homeSections?.criticalSectors?.length) {
      return DEFAULT_BANNER_DATA.homeSections.criticalSectors.map((s, idx) => ({
        name: s.title,
        desc: s.desc,
        image: s.image,
        icon: INDUSTRIES_SERVED[idx]?.icon || 'Ship',
        buttonLabel: s.buttonLabel || 'Request industry rate',
        buttonSlug: s.buttonSlug || '/quote'
      }));
    }
    return INDUSTRIES_SERVED;
  });

  const [servicesList, setServicesList] = useState(() => {
    try {
      const local = localStorage.getItem('flamingo_admin_data_v1');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.services?.length) return parsed.services;
      }
    } catch (e) {}
    return CORE_SERVICES;
  });

  // Testimonials moderation state & review modal
  const [testimonialsList, setTestimonialsList] = useState(() => {
    try {
      const local = localStorage.getItem('flamingo_admin_data_v1');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.testimonials?.length) return parsed.testimonials;
      }
    } catch (e) {}
    return TESTIMONIALS.map((t, idx) => ({
      id: `t-init-${idx}`,
      name: t.author,
      role: t.role,
      company: t.company,
      quote: t.quote,
      rating: 5,
      status: 'approved'
    }));
  });

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    position: '',
    rating: 5,
    review: ''
  });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.review.trim()) {
      alert('Please fill out your name and review.');
      return;
    }
    const newReview = {
      id: 't-' + Date.now(),
      name: reviewForm.name.trim(),
      role: reviewForm.position.trim() || 'Verified Client',
      company: reviewForm.position.trim() || 'Client',
      rating: Number(reviewForm.rating) || 5,
      quote: reviewForm.review.trim(),
      date: 'Just Now',
      status: 'pending' // STRICTLY PENDING UNTIL ADMIN APPROVES!
    };

    // 1. Post to API
    try {
      await fetch('http://localhost:5000/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
    } catch (err) {}

    // 2. Local storage sync for instant reflection in admin
    try {
      const local = localStorage.getItem('flamingo_admin_data_v1');
      const parsed = local ? JSON.parse(local) : {};
      const currentList = parsed.testimonials || [];
      const updatedList = [newReview, ...currentList];
      localStorage.setItem('flamingo_admin_data_v1', JSON.stringify({ ...parsed, testimonials: updatedList }));
    } catch (err) {}

    setReviewSubmitted(true);
    setReviewForm({ name: '', position: '', rating: 5, review: '' });
  };

  // Fetch banner & homeSections data from backend API
  useEffect(() => {
    // Check localStorage fallback for instant client/admin reflection
    try {
      const local = localStorage.getItem('flamingo_admin_data_v1');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.homeSections?.tickerItems?.length) setTickerItems(parsed.homeSections.tickerItems);
        if (parsed.homeSections?.stats?.length) setStatsList(parsed.homeSections.stats);
        if (parsed.homeSections?.pickupToDeliverySteps?.length) {
          setProcessSteps(parsed.homeSections.pickupToDeliverySteps);
        }
        if (parsed.homeSections?.criticalSectors?.length) {
          setSectorsList(parsed.homeSections.criticalSectors.map((s, idx) => ({
            name: s.title,
            desc: s.desc,
            image: s.image,
            icon: INDUSTRIES_SERVED[idx]?.icon || 'Ship',
            buttonLabel: s.buttonLabel || 'Request industry rate',
            buttonSlug: s.buttonSlug || '/quote'
          })));
        }
        if (parsed.testimonials?.length) {
          setTestimonialsList(parsed.testimonials);
        }
        if (parsed.services?.length) {
          setServicesList(parsed.services);
        }
      }
    } catch (e) {}

    // Fetch live services from MySQL API
    fetch('http://localhost:5000/api/services')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json && json.success && Array.isArray(json.services) && json.services.length > 0) {
          setServicesList(json.services);
        }
      })
      .catch(() => {});

    fetch('http://localhost:5000/api/banner')
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (res && res.success && res.data) {
          if (res.data.bannerVideo) setBannerVideo(res.data.bannerVideo);
          if (res.data.heroSlides && res.data.heroSlides.length > 0) {
            setSlides(res.data.heroSlides.filter((s) => s.isActive !== false));
          }
          if (res.data.homeSections) {
            const hs = res.data.homeSections;
            if (hs.tickerItems?.length) setTickerItems(hs.tickerItems);
            if (hs.stats?.length) setStatsList(hs.stats);
            if (hs.pickupToDeliverySteps?.length) setProcessSteps(hs.pickupToDeliverySteps);
            if (hs.criticalSectors?.length) {
              setSectorsList(hs.criticalSectors.map((s, idx) => ({
                name: s.title,
                desc: s.desc,
                image: s.image,
                icon: INDUSTRIES_SERVED[idx]?.icon || 'Ship',
                buttonLabel: s.buttonLabel || 'Request industry rate',
                buttonSlug: s.buttonSlug || '/quote'
              })));
            }
          }
        }
      })
      .catch(() => {});

    // Fetch live testimonials from API
    fetch('http://localhost:5000/api/testimonials')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json && json.success && json.testimonials) {
          setTestimonialsList(json.testimonials);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slideCount]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  const activeSlide = slides[currentSlide] || slides[0] || {};

  /* Process (pickup to delivery) state */
  const [processSlide, setProcessSlide] = useState(0);
  const [isProcessPaused, setIsProcessPaused] = useState(false);
  const processCount = processSteps.length;

  useEffect(() => {
    if (isProcessPaused) return;
    const timer = setInterval(() => {
      setProcessSlide((prev) => (prev + 1) % processCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [isProcessPaused, processCount]);

  const nextProcess = () => setProcessSlide((prev) => (prev + 1) % processCount);
  const prevProcess = () => setProcessSlide((prev) => (prev - 1 + processCount) % processCount);
  const processPct = processCount > 1 ? (processSlide / (processCount - 1)) * 100 : 0;
  const activeStep = processSteps[processSlide] || processSteps[0] || {};

  /* Sectors state */
  const [sectorSlide, setSectorSlide] = useState(0);
  const [isSectorPaused, setIsSectorPaused] = useState(false);
  const sectorCount = sectorsList.length;

  useEffect(() => {
    if (isSectorPaused) return;
    const timer = setInterval(() => {
      setSectorSlide((prev) => (prev + 1) % sectorCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [isSectorPaused, sectorCount]);

  const nextSector = () => setSectorSlide((prev) => (prev + 1) % sectorCount);
  const prevSector = () => setSectorSlide((prev) => (prev - 1 + sectorCount) % sectorCount);

  /* Mobile scroll refs & controls for Services and Testimonials */
  const servicesScrollRef = useRef(null);
  const testimonialsScrollRef = useRef(null);

  const scrollServices = (direction) => {
    if (servicesScrollRef.current) {
      const scrollAmount = 300;
      servicesScrollRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollTestimonials = (direction) => {
    if (testimonialsScrollRef.current) {
      const scrollAmount = 300;
      testimonialsScrollRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
        className="relative overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200 select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Continuous cinematic logistics motion video - 1 single video across all slides */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            key={bannerVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center opacity-90 contrast-[1.08] brightness-[1.02]"
          >
            <source src={bannerVideo} type="video/mp4" />
            <source src={bannerVideo} type="video/quicktime" />
            <source src="/assets/fliqmarine-hero.mov" type="video/mp4" />
          </video>
        </div>

        {/* Directional light text scrim: protective white on left for text, completely clear on center/right for video */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/70 sm:bg-gradient-to-r sm:from-white sm:via-white/80 sm:via-42% sm:to-transparent pointer-events-none z-[1]" aria-hidden="true" />
        <FlightRouteMap className="opacity-10 z-[1]" />

        <div className="relative max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-4 pb-6 sm:pt-6 sm:pb-7 lg:pt-7 lg:pb-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center min-h-[220px] sm:min-h-[240px] lg:min-h-[260px]">

            {/* Content Section */}
            <div
              key={activeSlide.id}
              className="lg:col-span-10 xl:col-span-8 space-y-3 sm:space-y-3.5 text-left"
            >
              <div>
                <h1 className="fm-s2 text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-slate-900">
                  {activeSlide.titlePrefix}
                  <span className="text-brand-red font-black">
                    {activeSlide.highlight}
                  </span>
                  {activeSlide.titleSuffix}
                </h1>
              </div>

              <p className="fm-s3 text-xs sm:text-base text-slate-800 sm:text-slate-600 font-medium sm:font-normal leading-relaxed max-w-2xl bg-white/70 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none p-2 sm:p-0 rounded-xl border border-white/80 sm:border-transparent shadow-xs sm:shadow-none">
                {activeSlide.desc}
              </p>

              <div className="fm-s4 flex flex-wrap items-center justify-start gap-3 pt-0.5">
                {/* Button 1 */}
                {(activeSlide.primarySlug === '/quote' || activeSlide.primarySlug === 'quote') ? (
                  <button
                    type="button"
                    onClick={() => onOpenQuote && onOpenQuote(activeSlide.serviceId)}
                    className="group px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-brand-red/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <span>{activeSlide.primaryCta || 'Explore Services'}</span>
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </span>
                  </button>
                ) : (
                  <Link
                    to={activeSlide.primarySlug || '/services'}
                    className="group px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-brand-red/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <span>{activeSlide.primaryCta || 'Explore Services'}</span>
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </span>
                  </Link>
                )}

                {/* Button 2 */}
                {(activeSlide.secondarySlug === '/quote' || activeSlide.secondarySlug === 'quote') ? (
                  <button
                    type="button"
                    onClick={() => onOpenQuote && onOpenQuote(activeSlide.serviceId)}
                    className="px-6 py-3 bg-white border border-slate-300 hover:border-brand-blue hover:text-brand-blue text-slate-800 rounded-full text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>{activeSlide.secondaryCta || 'Get Fare Rate'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    to={activeSlide.secondarySlug || '/contact'}
                    className="px-6 py-3 bg-white border border-slate-300 hover:border-brand-blue hover:text-brand-blue text-slate-800 rounded-full text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 flex items-center gap-2 shadow-sm"
                  >
                    <span>{activeSlide.secondaryCta || 'Get Fare Rate'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* bottom controls */}
          <div className="mt-4 sm:mt-5 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 relative z-20">
            <div className="flex items-center gap-2 p-1 rounded-full bg-white border border-slate-200 shadow-sm">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-red text-slate-700 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-2.5 text-xs font-mono font-bold tracking-wider text-slate-900 select-none">
                <span className="text-brand-red font-black text-xs sm:text-sm">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="text-slate-400"> / {String(slideCount).padStart(2, '0')}</span>
              </div>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-red text-slate-700 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href={BRAND.brochurePath}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-brand-red text-slate-800 hover:text-white border border-slate-200 hover:border-brand-red text-xs sm:text-sm font-bold transition-all shadow-sm group cursor-pointer hover:scale-105 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5 text-brand-red group-hover:text-white transition-colors" />
              <span>Download Brochure (PDF)</span>
              <Download className="w-3 h-3 text-slate-500 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ============ BRAND MOTTO MARQUEE / TICKER RIBBON ============ */}
      <section className="bg-gradient-to-r from-slate-900 via-[#001d36] to-slate-900 text-white py-3 border-y border-slate-800 overflow-hidden select-none relative z-20 shadow-md">
        <div className="fm-ticker flex items-center gap-8 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-300">
              {tickerItems.map((it, itIdx) => (
                <React.Fragment key={`${i}-${it.id || itIdx}`}>
                  {it.isHighlight ? (
                    <span className="inline-flex items-center gap-2 text-white font-black bg-brand-red/20 px-3 py-1 rounded-full border border-brand-red/30">
                      <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                      {it.text}
                    </span>
                  ) : (
                    <span>{it.text}</span>
                  )}
                  <span className="text-brand-red font-mono">★</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-4 sm:mt-6 mb-12 sm:mb-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/6 border border-slate-200/80 p-4 sm:p-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
            {statsList.map((st, i) => {
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

        <div className="relative max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28">
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <SectionHead
              title="Comprehensive logistics and maritime services"
              text="Built for reliability, transparent tracking and full compliance across worldwide corridors."
            />
            {/* Carousel arrow controls visible on all screen sizes */}
            <div className="flex items-center gap-2 shrink-0 pb-6">
              <button
                type="button"
                onClick={() => scrollServices('prev')}
                aria-label="Previous services"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollServices('next')}
                aria-label="Next services"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={servicesScrollRef}
            className="flex flex-nowrap gap-6 lg:gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
          >
            {servicesList.map((s, i) => {
              const bullets = Array.isArray(s.bullets) && s.bullets.length ? s.bullets : (Array.isArray(s.features) ? s.features : []);
              const shortDesc = s.shortDesc || s.short_desc || s.lead || '';
              const path = s.path || `/services/${s.id || s.service_id}`;
              const serviceId = s.id || s.service_id;

              return (
                <div key={serviceId || i} className="w-[85vw] sm:w-[350px] lg:w-[380px] shrink-0 snap-start h-full flex flex-col">
                  <Reveal delay={(i % 4) * 90} className="h-full flex flex-col">
                    <div
                      onMouseMove={spot}
                      className="fm-spot group relative h-full bg-white rounded-3xl border border-slate-200 flex flex-col overflow-hidden shadow-lg shadow-brand-blue/5 hover:border-brand-blue/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-blue/15 transition-all duration-300"
                    >
                      <div className="relative h-44 bg-brand-blue-dark overflow-hidden">
                        <img
                          src={s.image || '/assets/service banner.jpg'}
                          alt={s.title}
                          className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-slate-950/40" />
                        <span className="absolute right-4 top-3 text-3xl font-black text-white/20 leading-none select-none font-mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        <div className="absolute left-6 bottom-4 flex items-center gap-3">
                          <span className="text-xs font-bold text-white tracking-wide drop-shadow-md bg-black/50 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-white/15">{s.badge || 'SPECIALIZED'}</span>
                        </div>
                      </div>

                      <div className="relative p-6 sm:p-7 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-5">{shortDesc}</p>
                        <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
                          {bullets.slice(0, 4).map((b, bi) => (
                            <li key={bi} className="flex items-start gap-2.5">
                              <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                <Check className="w-3 h-3" />
                              </span>
                              <span className="text-xs sm:text-sm">{b}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                          <Link to={path} className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            Explore service <ArrowRight className="w-4 h-4" />
                          </Link>
                          <button onClick={() => onOpenQuote(serviceId)} className="px-4 py-1.5 rounded-full text-sm font-semibold text-brand-red border border-brand-red/30 hover:bg-brand-red hover:text-white transition-colors cursor-pointer">
                            Get quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PICKUP TO DELIVERY: "Flight path" journey tracker (clean light mode) ============ */}
      <section
        className="relative bg-slate-50 text-slate-900 py-20 sm:py-28 overflow-hidden select-none border-y border-slate-200"
        onMouseEnter={() => setIsProcessPaused(true)}
        onMouseLeave={() => setIsProcessPaused(false)}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/assets/banner-process-hd.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-60 contrast-[1.05] brightness-[1.05] scale-100 fm-kb-1"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-slate-50/55 to-white/80 pointer-events-none" aria-hidden="true" />
        <FlightRouteMap className="opacity-15 z-0" />
        <Wave className="text-white" flip />
        <Wave className="text-slate-50" />

        <div className="relative max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 z-10">
          <SectionHead
            title="From pickup to delivery, one clear process"
            text="A standard, transparent pipeline built around shipowner precision and door-to-door accountability."
          />

          {/* journey track: a plane flies along the line to the active stage */}
          <div className="relative mx-6 sm:mx-10 h-24 sm:h-32 mb-6">
            {/* pickup / delivery end labels */}
            <span className="absolute -left-3 sm:-left-6 -top-1 text-[10px] sm:text-xs font-mono font-extrabold tracking-widest text-slate-500 uppercase">Pickup</span>
            <span className="absolute -right-3 sm:-right-6 -top-1 text-[10px] sm:text-xs font-mono font-extrabold tracking-widest text-slate-500 uppercase">Delivery</span>

            {/* base line + progress fill */}
            <div className="absolute left-0 right-0 top-[56px] h-1 rounded-full bg-slate-200" aria-hidden="true" />
            <div
              className="absolute left-0 top-[56px] h-1 rounded-full bg-brand-red shadow-[0_0_14px_rgba(232,41,31,0.6)] transition-all duration-700 ease-out"
              style={{ width: `${processPct}%` }}
              aria-hidden="true"
            />

            {/* the plane */}
            <div
              className="absolute top-3 -translate-x-1/2 transition-all duration-700 ease-out pointer-events-none"
              style={{ left: `${processPct}%` }}
              aria-hidden="true"
            >
              <div className="fm-float w-9 h-9 rounded-full bg-white text-brand-red flex items-center justify-center shadow-lg border border-slate-200">
                <Plane className="w-5 h-5 rotate-45" />
              </div>
            </div>

            {/* stage nodes */}
            {processSteps.map((item, idx) => {
              const done = idx < processSlide;
              const active = idx === processSlide;
              const left = processCount > 1 ? (idx / (processCount - 1)) * 100 : 0;
              return (
                <div
                  key={idx}
                  className="absolute top-[56px] -translate-x-1/2"
                  style={{ left: `${left}%` }}
                >
                  <button
                    type="button"
                    onClick={() => setProcessSlide(idx)}
                    aria-label={`Stage ${idx + 1}: ${item.title}`}
                    className={`-translate-y-1/2 flex items-center justify-center rounded-full font-black text-xs sm:text-sm border-2 transition-all duration-300 cursor-pointer ${
                      active
                        ? 'w-10 h-10 sm:w-12 sm:h-12 bg-brand-red border-white text-white fm-pulse scale-110 shadow-lg shadow-brand-red/30'
                        : done
                        ? 'w-8 h-8 sm:w-10 sm:h-10 bg-brand-red border-brand-red text-white'
                        : 'w-8 h-8 sm:w-10 sm:h-10 bg-white border-slate-300 text-slate-600 hover:border-brand-blue hover:text-brand-blue shadow-sm'
                    }`}
                  >
                    {done ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                  </button>
                  <span
                    className={`hidden sm:block absolute left-1/2 -translate-x-1/2 top-9 w-28 text-center text-[11px] font-bold leading-tight transition-colors ${
                      active ? 'text-slate-900 font-extrabold' : 'text-slate-500'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* active stage detail card */}
          <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl p-6 sm:p-10">
            <span
              className="absolute -right-2 -top-8 sm:-top-14 text-[9rem] sm:text-[15rem] font-black leading-none text-slate-900/[0.04] select-none pointer-events-none"
              aria-hidden="true"
            >
              {String(processSlide + 1).padStart(2, '0')}
            </span>
            <span className="absolute left-0 top-8 bottom-8 w-1.5 rounded-r-full bg-brand-red" aria-hidden="true" />

            <div key={processSlide} className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              <div className="lg:col-span-8 space-y-4 text-left">
                <h3 className="fm-s2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900">
                  {activeStep.title}
                </h3>
                <p className="fm-s3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {activeStep.desc}
                </p>
                <div className="fm-s4 flex flex-wrap gap-2.5 pt-1">
                  <span className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-red" /> {activeStep.tick1 || 'Real-time milestone logging'}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-red" /> {activeStep.tick2 || 'Zero-delay customs pre-check'}
                  </span>
                </div>
              </div>

              {/* controls */}
              <div className="lg:col-span-4 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4">
                <div className="flex items-center gap-2 p-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                  <button
                    type="button"
                    onClick={prevProcess}
                    aria-label="Previous stage"
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextProcess}
                    aria-label="Next stage"
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROMISE: executive clean light card ============ */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-brand-blue-50 via-white to-brand-blue-50/50 border border-brand-blue-100 text-slate-900 p-7 sm:p-12 lg:p-16 shadow-xl">
            <img
              src="/assets/service banner.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-multiply pointer-events-none"
            />
            <div className="fm-blob absolute -top-20 -left-16 w-72 h-72 rounded-full bg-brand-red/15 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="fm-blob absolute -bottom-24 right-10 w-72 h-72 rounded-full bg-brand-blue/15 blur-3xl pointer-events-none" style={{ animationDelay: '-8s' }} aria-hidden="true" />
            <Quote className="absolute -right-4 -bottom-6 w-56 h-56 text-brand-blue/5" />
            <span className="absolute left-0 top-10 bottom-10 w-1.5 rounded-r-full bg-brand-red" aria-hidden="true" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="space-y-6">
                <span className="w-14 h-14 rounded-2xl bg-brand-red flex items-center justify-center shadow-xl shadow-brand-red/30 fm-float">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">We never break our promise.</h2>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  At Flymingo Logistics, every consignment is treated as mission-critical. Whether it is an AOG spare part
                  for an aircraft, replacement machinery for a berthing vessel, or homemade sweets sent to family overseas,
                  we operate with intentional precision.
                </p>
              </div>
              <blockquote className="relative border-l-4 border-brand-red pl-6 pr-5 py-6 text-lg sm:text-xl leading-relaxed text-slate-800 bg-white rounded-r-2xl border-y border-r border-slate-200 shadow-md">
                <Quote className="w-8 h-8 text-brand-red mb-3" />
                &ldquo;Just because you are doing a lot more doesn&apos;t mean you are getting a lot done. Don&apos;t confuse movement with progress!&rdquo;
                <footer className="mt-4 text-sm text-slate-500 font-semibold">Denzel Washington, our core inspiration</footer>
              </blockquote>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ SECTORS: light, expanding accordion panels ============ */}
      <section
        className="relative bg-brand-blue-50 py-20 sm:py-28 overflow-hidden"
        onMouseEnter={() => setIsSectorPaused(true)}
        onMouseLeave={() => setIsSectorPaused(false)}
      >
        <div className="fm-blob absolute -top-24 -left-20 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="fm-blob absolute -bottom-24 -right-20 w-96 h-96 rounded-full bg-brand-red/10 blur-3xl pointer-events-none" style={{ animationDelay: '-9s' }} aria-hidden="true" />

        <div className="relative max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHead
            title="Serving critical global sectors"
            text="Logistics workflows built to meet strict industry benchmarks."
          />

          <div className="flex flex-col lg:flex-row gap-3 lg:h-[460px]">
            {sectorsList.map((ind, idx) => {
              const active = idx === sectorSlide;
              const Icon = INDUSTRY_ICONS[ind.icon] || Ship;
              return (
                <div
                  key={ind.name}
                  role="button"
                  tabIndex={0}
                  aria-label={ind.name}
                  aria-expanded={active}
                  onClick={() => setSectorSlide(idx)}
                  onMouseEnter={() => setSectorSlide(idx)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSectorSlide(idx); } }}
                  className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
                    active
                      ? 'lg:flex-[5] bg-gradient-to-br from-brand-blue-50/90 via-white to-brand-blue-50/60 text-slate-900 border-2 border-brand-blue-200 shadow-xl'
                      : 'lg:flex-[1] bg-white border border-slate-200 shadow-sm hover:border-brand-blue/40 hover:shadow-md'
                  }`}
                >
                  {active ? (
                    <>
                      <img
                        src={ind.image || '/assets/banner-sectors-hd.jpg'}
                        alt={ind.name}
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 contrast-[1.05] brightness-[1.05] pointer-events-none"
                        onError={(e) => { e.currentTarget.src = '/assets/banner-sectors-hd.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 via-48% to-transparent pointer-events-none" aria-hidden="true" />
                      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand-red/15 blur-3xl pointer-events-none" aria-hidden="true" />
                      <Icon className="absolute -right-8 -bottom-8 w-64 h-64 text-brand-blue/[0.05] pointer-events-none" aria-hidden="true" />
                      <span className="absolute right-6 top-4 text-7xl font-black font-mono text-brand-blue/15 leading-none select-none" aria-hidden="true">
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div className="fm-fade relative p-6 sm:p-8 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[490px] lg:p-10 flex flex-col justify-end gap-4 z-10">
                        <div className="w-14 h-14 rounded-2xl bg-brand-red flex items-center justify-center shadow-lg shadow-brand-red/30">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-slate-900">{ind.name}</h3>
                        <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">{ind.desc}</p>
                        {ind.buttonSlug && !ind.buttonSlug.startsWith('http') && !ind.buttonSlug.startsWith('tel') && !ind.buttonSlug.startsWith('mailto') && ind.buttonSlug !== '/quote' ? (
                          <Link
                            to={ind.buttonSlug}
                            onClick={(e) => e.stopPropagation()}
                            className="group/btn self-start mt-1 px-6 py-3 bg-[#ed2926] hover:bg-[#cc1e1b] text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-brand-red/25 transition-all cursor-pointer flex items-center gap-2"
                          >
                            <span>{ind.buttonLabel || 'Request industry rate'}</span>
                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (ind.buttonSlug && (ind.buttonSlug.startsWith('http') || ind.buttonSlug.startsWith('tel') || ind.buttonSlug.startsWith('mailto'))) {
                                window.location.href = ind.buttonSlug;
                              } else {
                                onOpenQuote();
                              }
                            }}
                            className="group/btn self-start mt-1 px-6 py-3 bg-[#ed2926] hover:bg-[#cc1e1b] text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-brand-red/25 transition-all cursor-pointer flex items-center gap-2"
                          >
                            <span>{ind.buttonLabel || 'Request industry rate'}</span>
                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex lg:flex-col items-center lg:justify-between gap-4 p-4 lg:py-7 lg:px-2 h-full">
                      <span className="font-mono text-xs font-bold text-slate-400">{String(idx + 1).padStart(2, '0')}</span>
                      <div className="w-11 h-11 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center group-hover:bg-brand-red group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="fm-vert flex-1 lg:flex-none font-bold text-slate-800 text-sm sm:text-base leading-tight">
                        {ind.name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* controls */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white border border-slate-200 shadow-md">
              <button
                type="button"
                onClick={prevSector}
                aria-label="Previous sector"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-3 text-xs font-mono font-bold tracking-wider text-slate-500 select-none">
                <span className="text-brand-red font-black text-sm">{String(sectorSlide + 1).padStart(2, '0')}</span>
                <span> / {String(sectorCount).padStart(2, '0')}</span>
              </div>
              <button
                type="button"
                onClick={nextSector}
                aria-label="Next sector"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative overflow-hidden bg-slate-50">
        <Quote className="absolute left-4 top-24 w-56 h-56 text-brand-blue/[0.05] -rotate-6" aria-hidden="true" />
        <Quote className="absolute right-4 bottom-10 w-56 h-56 text-brand-red/[0.06] rotate-6" aria-hidden="true" />
        <div className="relative max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <SectionHead title="Trusted by maritime fleets and global families" />
            <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 pb-4 sm:pb-0">
              <button
                type="button"
                onClick={() => { setIsReviewModalOpen(true); setReviewSubmitted(false); }}
                className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 shrink-0"
              >
                <Star className="w-4 h-4 fill-white" />
                <span>Write a Review</span>
              </button>
              {/* Carousel arrow controls visible on all screen sizes */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollTestimonials('prev')}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTestimonials('next')}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={testimonialsScrollRef}
            className="flex flex-nowrap gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
          >
            {testimonialsList
              .filter((t) => t.status === 'approved' || (!t.status && t.status !== 'pending'))
              .map((t, idx) => {
                const authorName = t.name || t.author || 'Client';
                const roleText = t.role || 'Verified Customer';
                const companyText = t.company || '';
                return (
                  <div key={t.id || idx} className="w-[85vw] sm:w-[350px] md:w-[380px] shrink-0 snap-start h-full flex flex-col">
                    <Reveal delay={idx * 80} className="h-full flex flex-col">
                      <figure className="group relative h-full flex flex-col justify-between bg-white rounded-3xl border border-slate-200 p-7 overflow-hidden shadow-lg shadow-brand-blue/5 hover:-translate-y-2 hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-brand-blue/15 transition-all duration-300">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                              <Quote className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-1 text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < (t.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <blockquote className="text-slate-700 leading-relaxed text-sm">
                            {t.quote || t.review}
                          </blockquote>
                        </div>
                        <figcaption className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-bold flex items-center justify-center text-sm ring-2 ring-brand-red/30 ring-offset-2 shrink-0">
                            {authorName.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-slate-900 truncate">{authorName}</div>
                            <div className="text-xs text-slate-500 truncate">
                              {roleText}{companyText && roleText !== companyText ? `, ${companyText}` : ''}
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </Reveal>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* ============ WRITE A REVIEW MODAL ============ */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-black">
                  <Star className="w-5 h-5 fill-brand-red" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Share Your Experience</h3>
                  <p className="text-xs text-slate-500">Your feedback helps us maintain global logistics excellence</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Thank You For Your Review!</h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Your feedback has been submitted successfully and is pending administrator verification. Once approved, it will be displayed on our homepage.
                </p>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-6 py-2.5 bg-brand-blue hover:bg-brand-red text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Company / Designation / Location *</label>
                  <input
                    type="text"
                    required
                    value={reviewForm.position}
                    onChange={(e) => setReviewForm({ ...reviewForm, position: e.target.value })}
                    placeholder="e.g. Operations Manager, Chennai Ports or NRI Family, UK"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Overall Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-hidden"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewForm.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300 hover:text-amber-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold text-slate-600 ml-2">
                      {reviewForm.rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Your Review / Testimonial *</label>
                  <textarea
                    rows="4"
                    required
                    value={reviewForm.review}
                    onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                    placeholder="Describe your delivery speed, cargo handling, customs clearance, or customer service experience..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:border-brand-blue focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red-dark text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};