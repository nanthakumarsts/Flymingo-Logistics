import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, Mail, FileDown, ChevronDown, Menu, X, 
  Search, Calculator, ArrowRight
} from 'lucide-react';
import { BRAND, CORE_SERVICES } from '../data/siteData.js';

export const Navbar = ({ onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('nav-drawer-open');
    } else {
      document.body.classList.remove('nav-drawer-open');
    }
    return () => {
      document.body.classList.remove('nav-drawer-open');
    };
  }, [mobileMenuOpen]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow duration-200">
      {/* Top Utility Bar - Hidden on mobile devices */}
      <div className="hidden md:block bg-slate-50 border-b border-slate-200/80 text-xs py-2">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-wrap items-center justify-between gap-3">
          {/* Contact details */}
          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <a 
              href={`tel:${BRAND.primaryPhone}`} 
              className="inline-flex items-center gap-1.5 hover:text-brand-blue font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-red" />
              <span>{BRAND.primaryPhone}</span>
            </a>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <a 
              href={`tel:${BRAND.supportPhones[0]}`} 
              className="inline-flex items-center gap-1.5 hover:text-brand-blue font-semibold transition-colors hidden md:inline-flex"
            >
              <Phone className="w-3.5 h-3.5 text-brand-blue" />
              <span>{BRAND.supportPhones[0]}</span>
            </a>
            <span className="text-slate-300 hidden md:inline">|</span>
            <a 
              href={`mailto:${BRAND.primaryEmail}`} 
              className="inline-flex items-center gap-1.5 hover:text-brand-blue transition-colors hidden sm:inline-flex"
            >
              <Mail className="w-3.5 h-3.5 text-brand-blue" />
              <span>{BRAND.primaryEmail}</span>
            </a>
          </div>

          {/* Quick utility actions */}
          <div className="flex items-center gap-3 ml-auto">
            <a
              href={BRAND.brochurePath}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-brand-red font-semibold transition-colors px-2 py-0.5 rounded hover:bg-slate-200/50"
            >
              <FileDown className="w-3.5 h-3.5 text-brand-red" />
              <span>Brochure</span>
            </a>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
              Coimbatore &bull; Chennai
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-2.5 flex items-center justify-between">
        {/* Brand Logo (Text removed as requested, keeping pure official logo) */}
        <Link to="/" className="flex items-center group py-0.5" aria-label="Flymingo Logistics">
          <img 
            src={BRAND.logoPath} 
            alt="Flymingo Logistics" 
            className="h-16 sm:h-20 md:h-22 w-auto object-contain transition-transform group-hover:scale-105 duration-200" 
          />
        </Link>

        {/* Desktop Menu with Active Bar and Refined Design */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold">
          <Link
            to="/"
            className={`relative px-4 py-2 rounded-xl transition-all duration-200 flex items-center group ${
              isActive('/') 
                ? 'text-brand-blue font-bold bg-brand-blue-50/70 shadow-2xs' 
                : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
            }`}
          >
            <span>Home</span>
            {isActive('/') ? (
              <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-brand-red rounded-full shadow-xs" />
            ) : (
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-blue/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Link>

          <Link
            to="/about"
            className={`relative px-4 py-2 rounded-xl transition-all duration-200 flex items-center group ${
              isActive('/about') 
                ? 'text-brand-blue font-bold bg-brand-blue-50/70 shadow-2xs' 
                : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
            }`}
          >
            <span>About Us</span>
            {isActive('/about') ? (
              <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-brand-red rounded-full shadow-xs" />
            ) : (
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-blue/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Link>

          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <Link
              to="/services"
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer group ${
                location.pathname.startsWith('/services') 
                  ? 'text-brand-blue font-bold bg-brand-blue-50/70 shadow-2xs' 
                  : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
              }`}
            >
              <span>Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-brand-blue' : 'text-slate-400 group-hover:text-brand-blue'}`} />
              {location.pathname.startsWith('/services') ? (
                <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-brand-red rounded-full shadow-xs" />
              ) : (
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-blue/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </Link>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 w-[580px] sm:w-[620px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-fade-in">
                <div className="px-3 py-1.5 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 flex items-center justify-between">
                  <span>Our Core Capabilities</span>
                  {/* <span className="text-[10px] text-brand-blue font-bold">6 Dedicated Channels</span> */}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {CORE_SERVICES.map((s) => {
                    const isCurrentService = location.pathname === s.path;
                    return (
                      <Link
                        key={s.id}
                        to={s.path}
                        onClick={() => setServicesDropdownOpen(false)}
                        className={`flex items-start justify-between p-2.5 rounded-xl group transition-all border-l-2 ${
                          isCurrentService 
                            ? 'bg-brand-blue-50/80 border-brand-red font-bold text-brand-blue' 
                            : 'border-transparent hover:border-brand-blue hover:bg-slate-50 text-slate-700 hover:text-brand-blue'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-bold truncate">
                            {s.title}
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal line-clamp-1 mt-0.5">
                            {s.shortDesc}
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-brand-blue bg-white px-1.5 py-0.5 rounded-md border border-brand-blue-100 shadow-2xs shrink-0">
                          {s.badge}
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <div className="pt-2.5 mt-2 border-t border-slate-100">
                  <Link
                    to="/services"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-brand-blue-50 text-brand-blue text-xs font-bold transition-all border border-brand-blue-100/70"
                  >
                    <span>View All 6 Services Overview</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className={`relative px-4 py-2 rounded-xl transition-all duration-200 flex items-center group ${
              isActive('/contact') 
                ? 'text-brand-blue font-bold bg-brand-blue-50/70 shadow-2xs' 
                : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
            }`}
          >
            <span>Contact</span>
            {isActive('/contact') ? (
              <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-brand-red rounded-full shadow-xs" />
            ) : (
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-blue/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onOpenQuote()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-brand-red/20 hover:shadow-brand-red/35 transition-all cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Get Fare Rate</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onOpenQuote()}
            className="px-3 py-1.5 bg-brand-red text-white rounded-lg text-xs font-bold md:hidden cursor-pointer"
          >
            Quote
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu - Full Screen (100dvh) Dedicated View */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col justify-between overflow-y-auto animate-fade-in">
          {/* Top Header inside Full Screen Menu with Logo, Quote & Close Button */}
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-10 shrink-0">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center" 
              aria-label="Flymingo Logistics"
            >
              <img 
                src={BRAND.logoPath} 
                alt="Flymingo Logistics" 
                className="h-14 sm:h-16 w-auto object-contain" 
              />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="px-3.5 py-1.5 bg-brand-red text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-brand-red-dark transition-colors"
              >
                Quote
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Links Area */}
          <div className="px-5 pt-5 pb-4 space-y-2 font-bold text-base text-slate-800">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors ${
                isActive('/') 
                  ? 'text-brand-blue bg-brand-blue-50/80 font-extrabold border-l-4 border-brand-red shadow-2xs' 
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span>Home</span>
              {isActive('/') && <span className="w-2.5 h-2.5 rounded-full bg-brand-red"></span>}
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors ${
                isActive('/about') 
                  ? 'text-brand-blue bg-brand-blue-50/80 font-extrabold border-l-4 border-brand-red shadow-2xs' 
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span>About Us</span>
              {isActive('/about') && <span className="w-2.5 h-2.5 rounded-full bg-brand-red"></span>}
            </Link>

            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors ${
                isActive('/services') 
                  ? 'text-brand-blue bg-brand-blue-50/80 font-extrabold border-l-4 border-brand-red shadow-2xs' 
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span>Services</span>
              {isActive('/services') && <span className="w-2.5 h-2.5 rounded-full bg-brand-red"></span>}
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors ${
                isActive('/contact') 
                  ? 'text-brand-blue bg-brand-blue-50/80 font-extrabold border-l-4 border-brand-red shadow-2xs' 
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span>Contact Us</span>
              {isActive('/contact') && <span className="w-2.5 h-2.5 rounded-full bg-brand-red"></span>}
            </Link>
          </div>

          {/* Social Media Links & Quote Action - Pinned Cleanly to Bottom */}
          <div className="px-5 pt-4 pb-8 space-y-3.5 border-t border-slate-100 bg-slate-50/50 mt-auto shrink-0">
            {/* Social Media Icons */}
            <div className="flex items-center justify-center gap-3 py-1">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919087924488?text=Hello%20Flymingo%20Logistics,%20I%20would%20like%20to%20inquire%20about%20cargo%20shipping"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/p/Cflbq4nOyzM/?igshid=YWZlMWU5YjI="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 text-pink-600 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=100064629171267"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-brand-blue hover:bg-brand-blue hover:text-white flex items-center justify-center transition-all shadow-xs"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Phone */}
              <a
                href={`tel:${BRAND.primaryPhone}`}
                className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-brand-red hover:bg-brand-red hover:text-white flex items-center justify-center transition-all shadow-xs"
                aria-label="Call Us"
              >
                <Phone className="w-5 h-5" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${BRAND.primaryEmail}`}
                className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 hover:bg-sky-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
                aria-label="Email Us"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-brand-red text-white font-bold rounded-xl text-sm shadow-md cursor-pointer hover:bg-brand-red-dark transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Get Fare Rate Quote</span>
            </button>
            <a
              href={BRAND.brochurePath}
              download
              className="w-full flex items-center justify-center gap-2 py-2 text-xs text-slate-600 font-semibold"
            >
              <FileDown className="w-4 h-4 text-brand-red" />
              <span>Download Official Brochure (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
