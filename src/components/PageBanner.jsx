import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FlightRouteMap } from './FlightRouteMap';

/** 
 * Executive Image-Led Banner for Services & Inner Pages.
 * Compact height that fits comfortably within screen resolution.
 * Clean badge without '//', and no breadcrumb/location telemetry.
 */
export function PageBanner({ 
  eyebrow, 
  title, 
  highlight,
  tagline,
  description, 
  image, 
  action, 
  onAction, 
  secondaryAction, 
  children 
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-blue-dark text-white py-8 sm:py-10 lg:py-12 select-none border-b border-white/10">
      {/* High-clarity background photo with continuous Ken Burns camera glide */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <img 
          src={image || '/assets/banner-marine-hd.jpg'} 
          alt="" 
          onError={(e) => { e.currentTarget.src = '/assets/banner-marine-hd.jpg'; }}
          className="w-full h-full object-cover object-center opacity-95 contrast-[1.06] brightness-[1.0] scale-100 fm-kb-0" 
        />
      </div>

      {/* Solid balanced film scrim - gives maximum text contrast without pitch-black darkening */}
      <div className="absolute inset-0 -z-15 bg-[#001426]/40 pointer-events-none" aria-hidden="true" />

      {/* Global flight route map overlay */}
      <FlightRouteMap className="opacity-25" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-3xl space-y-3 sm:space-y-4 text-left">
          
          {/* Eyebrow badge - clean, no '//' */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono font-extrabold uppercase tracking-widest text-brand-red-light shadow-md">
              SOUTH INDIA &rarr; THE WORLD
            </div>
          </div>

          {/* Main Title & Brand-Red Highlight */}
          <div className="space-y-1 sm:space-y-1.5">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              {title}{' '}
              {highlight && (
                <span className="text-brand-red font-black">
                  {highlight}
                </span>
              )}
            </h1>
            
            {tagline && (
              <p className="text-sm sm:text-base font-bold text-white/95 tracking-wide drop-shadow-md">
                {tagline}
              </p>
            )}
          </div>

          {/* Descriptive narrative */}
          <p className="text-xs sm:text-sm leading-relaxed text-white/90 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {action && (
              <button 
                type="button"
                onClick={onAction} 
                className="group px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-brand-red/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3"
              >
                <span>{action}</span>
                <span className="w-6 h-6 rounded-full bg-black/25 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </span>
              </button>
            )}
            {secondaryAction}
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}

export default PageBanner;
