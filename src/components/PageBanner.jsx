import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ShieldCheck, Compass } from 'lucide-react';
import { FlightRouteMap } from './FlightRouteMap';

/** 
 * Executive Image-Led Banner for Services & Inner Pages.
 * Built with authentic Flymingo brand colors (brand-red #E8291F and brand-blue #005687).
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
    <section className="relative isolate overflow-hidden bg-brand-blue-dark text-white py-12 sm:py-16 lg:py-20 select-none border-b border-white/10">
      {/* High-clarity background photo with continuous Ken Burns camera glide */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <img 
          src={image || '/assets/sea cargo.jpg'} 
          alt="" 
          onError={(e) => { e.currentTarget.src = '/assets/sea cargo.jpg'; }}
          className="w-full h-full object-cover object-center opacity-80 scale-105 fm-kb-0" 
        />
      </div>

      {/* Solid balanced film scrim - gives maximum text contrast without pitch-black darkening */}
      <div className="absolute inset-0 -z-15 bg-[#001426]/60 pointer-events-none" aria-hidden="true" />

      {/* Global flight route map overlay */}
      <FlightRouteMap className="opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-3xl space-y-5 text-left">
          
          {/* Breadcrumbs & Route Telemetry */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/80 font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">/</span>
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <span className="text-white/40">/</span>
              <span className="text-brand-red-light font-bold">{eyebrow}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 font-mono text-[11px] text-white/90 shadow-md">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span>ACTIVE CORRIDORS &bull; 24/7 DESK</span>
            </div>
          </div>

          {/* Eyebrow badge matching brand color */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono font-extrabold uppercase tracking-widest text-brand-red-light shadow-md">
              SOUTH INDIA &rarr; THE WORLD // {eyebrow ? eyebrow.toUpperCase() : 'EXPRESS LOGISTICS'}
            </div>
          </div>

          {/* Main Title & Brand-Red Highlight */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              {title}{' '}
              {highlight && (
                <span className="text-brand-red font-black">
                  {highlight}
                </span>
              )}
            </h1>
            
            {tagline && (
              <p className="text-base sm:text-xl font-bold text-white/95 tracking-wide drop-shadow-md">
                {tagline}
              </p>
            )}
          </div>

          {/* Descriptive narrative */}
          <p className="text-sm sm:text-base leading-relaxed text-white/90 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {description}
          </p>

          {/* Action buttons with brand-red primary styling */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {action && (
              <button 
                type="button"
                onClick={onAction} 
                className="group px-7 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-brand-red/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3"
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
