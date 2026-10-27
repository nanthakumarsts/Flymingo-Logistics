import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileDown, ShieldCheck, 
  ArrowUpRight, Clock, Anchor, MapPin
} from 'lucide-react';
import { BRAND, OFFICES, CORE_SERVICES } from '../data/siteData';

export const Footer = ({ onOpenQuote }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-700 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Action Card - Rendered ONLY on Home Page */}
        {isHomePage && (
          <div className="bg-[#002d4d] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-sm">
                <Anchor className="w-3.5 h-3.5 text-brand-red" />
                <span>Door-to-Deck Maritime &amp; Air Logistics</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Let's Move Your Cargo With Zero Gaps.
              </h3>
              <p className="text-sm text-slate-200 max-w-xl">
                Tell us what you need to move. Our specialized team designs the optimal route, mode, and timing with full accountability.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 z-10">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-red/30 transition-all cursor-pointer"
              >
                Get Instant Fare Quote
              </button>
              <Link
                to="/services"
                className="px-6 py-3 bg-white text-brand-blue hover:bg-slate-100 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                Explore All Services
              </Link>
            </div>

            {/* Decorative watermark */}
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none select-none text-white font-black text-9xl">
              FLY
            </div>
          </div>
        )}

        {/* Main Footer Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pt-4">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center group" aria-label="Flymingo Logistics">
              <img 
                src={BRAND.logoPath} 
                alt="Flymingo Logistics" 
                className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-105 duration-200" 
              />
            </Link>

            <p className="text-xs leading-relaxed text-slate-600 max-w-sm">
              Flymingo Logistics is an International Logistics company offering high-quality international courier services, ocean &amp; air freight forwarding, time-critical ship spares delivery, dangerous goods (DG) logistics, overseas household relocation, and customs clearance brokerage.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Clock className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span>24/7 Operations Desk for Vessel Spares &amp; Cargo Dispatches</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Licensed Customs Brokerage &amp; Certified DG Logistics</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/p/Cflbq4nOyzM/?igshid=YWZlMWU5YjI="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-brand-red hover:border-brand-red flex items-center justify-center transition-all shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100064629171267"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-brand-blue hover:border-brand-blue flex items-center justify-center transition-all shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={BRAND.brochurePath}
                download
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-brand-blue hover:border-brand-blue text-xs font-bold transition-all shadow-sm"
              >
                <FileDown className="w-3.5 h-3.5 text-brand-red" />
                <span>Download Brochure (PDF)</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link to="/" className="hover:text-brand-blue transition-colors flex items-center gap-1">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-blue transition-colors flex items-center gap-1">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-blue transition-colors flex items-center gap-1">
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <button onClick={onOpenQuote} className="hover:text-brand-blue transition-colors text-left cursor-pointer">
                  Request Cargo Quote
                </button>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-blue transition-colors flex items-center gap-1">
                  <span>Our Services</span>
                </Link>
              </li>
              <li>
                <a href={BRAND.brochurePath} download className="hover:text-brand-red transition-colors flex items-center gap-1">
                  <span>Company Brochure</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Logistics Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              {CORE_SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={s.path} className="hover:text-brand-blue transition-colors block">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Branch Offices */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
              Our Locations
            </h4>
            <div className="space-y-4 text-xs">
              {OFFICES.map((office) => (
                <div key={office.city} className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                    <span>{office.city} Office</span>
                  </div>
                  <p className="text-slate-600 leading-snug">{office.address}</p>
                  <div className="pt-1 border-t border-slate-100 flex flex-wrap gap-2 text-[11px]">
                    <a href={`tel:${office.phones[0]}`} className="font-bold text-brand-blue hover:underline">
                      {office.phones[0]}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Rights */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-slate-700">Flymingo Logistics</strong>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Maritime Logistics</span>
            <span>&bull;</span>
            <span>Air Freight</span>
            <span>&bull;</span>
            <span>Ocean Cargo</span>
            <span>&bull;</span>
            <span>Customs House Brokerage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
