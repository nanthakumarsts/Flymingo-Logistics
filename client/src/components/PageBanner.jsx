import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { 
  Anchor, Plane, Package, ShieldCheck, AlertTriangle, Truck 
} from 'lucide-react';
import { FlightRouteMap } from './FlightRouteMap';
import { BannerSideMotif } from './BannerSideMotif';
import DEFAULT_BANNER_DATA from '../data/bannerData.json';

const ORBIT_SERVICES = [
  { id: 'ship-spares', short: 'Ship Spares', path: '/services/ship-spares-logistics', icon: Anchor },
  { id: 'freight-forwarding', short: 'Freight', path: '/services/freight-forwarding', icon: Plane },
  { id: 'international-courier', short: 'Courier', path: '/services/international-courier', icon: Package },
  { id: 'customs-clearance', short: 'Customs', path: '/services/customs-clearance', icon: ShieldCheck },
  { id: 'dg-shipping', short: 'DG Cargo', path: '/services/dangerous-goods-shipping', icon: AlertTriangle },
  { id: 'international-relocation', short: 'Relocation', path: '/services/international-relocation', icon: Truck },
];

const css = `
@keyframes bnr-spin { to { transform: rotate(360deg); } }
@keyframes bnr-spin-rev { to { transform: rotate(-360deg); } }
@keyframes bnr-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes bnr-pulse { 0% { box-shadow: 0 0 0 0 rgba(232,41,31,.45); } 100% { box-shadow: 0 0 0 24px rgba(232,41,31,0); } }

.bnr-orbit { animation: bnr-spin 36s linear infinite; }
.bnr-counter { animation: bnr-spin-rev 36s linear infinite; }
.bnr-slow { animation: bnr-spin 60s linear infinite; }
.bnr-float { animation: bnr-float 6s ease-in-out infinite; }
.bnr-pulse { animation: bnr-pulse 2.2s ease-out infinite; }
`;

export const ServicesOrbitVisual = () => (
  <div className="relative w-[250px] h-[250px] sm:w-[280px] sm:h-[280px] lg:w-[330px] lg:h-[330px] my-3 mx-auto select-none">
    <style>{css}</style>
    <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-blue/30 bnr-slow" aria-hidden="true" />
    <div className="absolute inset-8 sm:inset-10 rounded-full border border-brand-red/25" aria-hidden="true" />
    <div className="absolute inset-12 sm:inset-16 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-red/10 blur-md" aria-hidden="true" />

    {/* spinning wheel with six nodes (icons stay upright) */}
    <div className="bnr-orbit absolute inset-0">
      {ORBIT_SERVICES.map((c, i) => {
        const a = i * 60;
        const Icon = c.icon;
        return (
          <div key={c.id} className="absolute inset-0" style={{ transform: `rotate(${a}deg)` }}>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <div style={{ transform: `rotate(${-a}deg)` }}>
                <div className="bnr-counter">
                  <a
                    href={c.path}
                    title={c.short}
                    aria-label={c.short}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl border-2 border-white hover:scale-110 transition-transform cursor-pointer ${
                      i % 2 === 0 ? 'bg-brand-blue text-white shadow-brand-blue/30' : 'bg-brand-red text-white shadow-brand-red/30'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* hub */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bnr-pulse bnr-float w-26 h-26 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-white border border-slate-200 shadow-2xl shadow-brand-blue/25 flex flex-col items-center justify-center text-center">
        <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-brand-red leading-none">190+</span>
        <span className="mt-1 px-2 sm:px-3 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-700 leading-tight">Countries Delivered</span>
      </div>
    </div>
  </div>
);

/** 
 * Executive Image-Led Banner for Services & Inner Pages.
 * Compact height that fits comfortably within screen resolution.
 * Displays the signature services orbit wheel by default on service pages.
 * Supports dynamic loading from MySQL via `pageKey`.
 */
export function PageBanner({ 
  pageKey,
  eyebrow, 
  title, 
  highlight, 
  tagline, 
  description, 
  image, 
  action, 
  actionSlug,
  onAction, 
  secondaryAction, 
  variant = 'orbit', 
  sideVisual, 
  children 
}) {
  const [dbData, setDbData] = useState(null);

  useEffect(() => {
    if (!pageKey) return;
    fetch(`http://localhost:5000/api/page-banners/${pageKey}`)
      .then(res => res.ok ? res.json() : null)
      .then(res => {
        if (res && res.success && res.data) {
          setDbData(res.data);
        }
      })
      .catch(() => {});
  }, [pageKey]);

  const fallbackData = (pageKey && DEFAULT_BANNER_DATA?.pageBanners?.[pageKey]) || null;
  const data = dbData || fallbackData;

  const displayBadge = (data && data.badge !== undefined) ? data.badge : (eyebrow || 'ANY SIZE • ANY WEIGHT • ANYWHERE');
  const displayTitle = (data && data.title) ? data.title : title;
  const displayHighlight = (data && data.highlight !== undefined) ? data.highlight : highlight;
  const displayDesc = (data && data.description) ? data.description : description;
  const displayImage = (data && data.bgImage) ? data.bgImage : (image || '/assets/banner-marine-hd.jpg');
  const displayAction = (data && data.buttonLabel !== undefined) ? data.buttonLabel : action;
  const displaySlug = (data && data.buttonSlug !== undefined) ? data.buttonSlug : (actionSlug || '');

  const handleActionClick = () => {
    if (displaySlug) {
      if (displaySlug.startsWith('#') && onAction) {
        onAction();
        return;
      }
      window.location.href = displaySlug;
    } else if (onAction) {
      onAction();
    }
  };

  // Derive variant automatically if not explicitly passed
  const getVariant = () => {
    if (variant) return variant;
    return 'orbit';
  };

  const currentVariant = getVariant();

  return (
    <section className="relative isolate overflow-hidden bg-slate-50 text-slate-900 py-8 sm:py-10 lg:py-12 select-none border-b border-slate-200">
      {/* High-clarity background photo with bright luminous aesthetic */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <img 
          src={displayImage} 
          alt="" 
          onError={(e) => { e.currentTarget.src = '/assets/banner-marine-hd.jpg'; }}
          className="w-full h-full object-cover object-center opacity-65 contrast-[1.05] brightness-[1.05] scale-100 fm-kb-0" 
        />
      </div>

      {/* Directional light text scrim - high white on text side, clear view of image on right */}
      <div className="absolute inset-0 -z-15 bg-gradient-to-r from-white via-white/85 via-45% to-white/25 pointer-events-none" aria-hidden="true" />

      {/* Global flight route map overlay */}
      <FlightRouteMap className="opacity-15 stroke-brand-blue" />

      <div className="relative mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8 xl:px-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
            {/* Eyebrow badge - clean, no '//' */}
            {displayBadge && (
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-extrabold uppercase tracking-widest text-brand-red shadow-xs">
                  {displayBadge}
                </div>
              </div>
            )}

            {/* Main Title & Brand-Red Highlight */}
            <div className="space-y-1 sm:space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-slate-900">
                {displayTitle}{' '}
                {displayHighlight && (
                  <span className="text-brand-red font-black">
                    {displayHighlight}
                  </span>
                )}
              </h1>
            </div>

            {/* Descriptive narrative */}
            {displayDesc && (
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 max-w-2xl font-normal pt-0.5">
                {displayDesc}
              </p>
            )}

            {/* Action button */}
            {displayAction && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button 
                  type="button"
                  onClick={handleActionClick} 
                  className="group px-7 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-brand-red/20 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3"
                >
                  <span>{displayAction}</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="h-3.5 w-3.5 text-white" />
                  </span>
                </button>
              </div>
            )}

            {children}
          </div>

          {/* Right: Signature Side Design Motif (Services Orbit Wheel by default) */}
          <div className="lg:col-span-5 hidden sm:flex items-center justify-center">
            {sideVisual ? (
              sideVisual
            ) : currentVariant === 'orbit' || currentVariant === 'services' ? (
              <ServicesOrbitVisual />
            ) : (
              <BannerSideMotif variant={currentVariant} />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default PageBanner;
