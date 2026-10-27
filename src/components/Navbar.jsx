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

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow duration-200">
      {/* Top Utility Bar */}
      <div className="bg-slate-50 border-b border-slate-200/80 text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
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
                  <span className="text-[10px] text-brand-blue font-bold">6 Dedicated Channels</span>
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="space-y-1 font-semibold text-slate-700">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-lg ${isActive('/') ? 'text-brand-blue bg-brand-blue-50 font-bold' : 'hover:bg-slate-50'}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-lg ${isActive('/about') ? 'text-brand-blue bg-brand-blue-50 font-bold' : 'hover:bg-slate-50'}`}
            >
              About Us
            </Link>

            <div className="py-1 border-t border-b border-slate-100 my-2">
              <div className="flex items-center justify-between px-3 py-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Services
                </span>
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-brand-blue hover:text-brand-red transition-colors inline-flex items-center gap-1"
                >
                  <span>Overview</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg mb-1 ${
                  location.pathname === '/services'
                    ? 'bg-brand-blue-50 text-brand-blue font-bold border-l-2 border-brand-red'
                    : 'bg-slate-50 text-brand-blue font-bold hover:bg-slate-100'
                }`}
              >
                <span>All 6 Services Hub</span>
                <span className="text-[10px] text-white bg-brand-red px-2 py-0.5 rounded-md font-bold uppercase">
                  All
                </span>
              </Link>

              {CORE_SERVICES.map((s) => (
                <Link
                  key={s.id}
                  to={s.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-slate-50"
                >
                  <span className="font-medium text-slate-800">{s.title}</span>
                  <span className="text-[10px] text-brand-blue bg-brand-blue-50 px-1.5 py-0.5 rounded font-semibold">
                    {s.badge}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-lg ${isActive('/contact') ? 'text-brand-blue bg-brand-blue-50 font-bold' : 'hover:bg-slate-50'}`}
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-3 space-y-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-brand-red text-white font-bold rounded-xl text-sm shadow-md cursor-pointer"
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
