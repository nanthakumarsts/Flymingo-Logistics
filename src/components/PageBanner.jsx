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
    <section className="relative isolate overflow-hidden bg-slate-50 text-slate-900 py-8 sm:py-10 lg:py-12 select-none border-b border-slate-200">
      {/* High-clarity background photo with bright luminous aesthetic */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <img 
          src={image || '/assets/banner-marine-hd.jpg'} 
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
        <div className="max-w-3xl space-y-3 sm:space-y-4 text-left">
          
          {/* Eyebrow badge - clean, no '//' */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-extrabold uppercase tracking-widest text-brand-red shadow-xs">
              SOUTH INDIA &rarr; THE WORLD
            </div>
          </div>

          {/* Main Title & Brand-Red Highlight */}
          <div className="space-y-1 sm:space-y-1.5">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-slate-900">
              {title}{' '}
              {highlight && (
                <span className="text-brand-red font-black">
                  {highlight}
                </span>
              )}
            </h1>
            
            {tagline && (
              <p className="text-sm sm:text-base font-bold text-brand-blue tracking-wide">
                {tagline}
              </p>
            )}
          </div>

          {/* Descriptive narrative */}
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 max-w-2xl">
            {description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {action && (
              <button 
                type="button"
                onClick={onAction} 
                className="group px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-brand-red/20 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3"
              >
                <span>{action}</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
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
