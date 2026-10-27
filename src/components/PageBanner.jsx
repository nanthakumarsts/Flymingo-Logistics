import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

/** A consistent, image-led masthead for the detailed service pages. */
export function PageBanner({ eyebrow, title, description, image, action, onAction, secondaryAction, children }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/15 bg-brand-blue-dark text-white pt-12 pb-16 lg:pt-16 lg:pb-20">
      <img 
        src={image || '/assets/sea cargo.jpg'} 
        alt="" 
        onError={(e) => { e.currentTarget.src = '/assets/sea cargo.jpg'; }}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25 scale-105" 
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-blue-dark/98 via-brand-blue-dark/92 to-brand-blue-dark/80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-blue-dark/95 via-transparent to-brand-blue-dark/85" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-brand-red/25 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/70 font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">/</span>
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-bold">{eyebrow}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-mono text-[11px] text-white/90">
              <span>ACTIVE CORRIDORS &bull; 24/7 DESK</span>
            </div>
          </div>

          <div className="space-y-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-md border border-brand-red/50 bg-brand-red/20 px-3 py-1 text-[11px] font-mono font-extrabold uppercase tracking-widest text-brand-red-light">
              [ {eyebrow} // TIME-CRITICAL DISPATCH ]
            </span>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {action && (
              <button 
                onClick={onAction} 
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-brand-red-dark px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-brand-red/40 transition hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
              >
                {action} <ArrowRight className="h-4 w-4" />
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
