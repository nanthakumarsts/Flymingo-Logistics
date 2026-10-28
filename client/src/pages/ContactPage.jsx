import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, ArrowRight,
  Sparkles, Anchor, ShieldCheck, MessageSquare
} from 'lucide-react';
import { BRAND, OFFICES, CORE_SERVICES, COUNTRIES } from '../data/siteData';
import { FlightRouteMap } from '../components/FlightRouteMap';
import { BannerSideMotif } from '../components/BannerSideMotif';

export const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('international-courier');
  const [country, setCountry] = useState('India');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* ========================================================= */}
      {/* 1. CINEMATIC COMMUNICATIONS DISPATCH BANNER HERO (LIGHT)   */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200 py-8 sm:py-10 lg:py-12 select-none">
        {/* Photographic Background Texture with continuous Ken Burns motion */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/assets/banner-contact-hd.jpg" 
            alt="Flymingo Logistics Global Operations Desk" 
            className="w-full h-full object-cover object-center opacity-65 contrast-[1.05] brightness-[1.05] scale-100 fm-kb-0"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-45% to-white/25 z-0 pointer-events-none" aria-hidden="true" />
        <FlightRouteMap className="opacity-10 z-0" />

        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left: Text Content */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
              {/* Banner Eyebrow Badge - clean, no '//' */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-extrabold uppercase tracking-widest text-brand-red shadow-sm">
                  SOUTH INDIA &rarr; THE WORLD
                </div>
              </div>

              {/* Banner Title & Subtext */}
              <div className="space-y-1 sm:space-y-1.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Direct Lines.<br />
                  <span className="text-brand-red font-black">
                    Immediate Logistics Response.
                  </span>
                </h1>

                <p className="text-sm sm:text-base font-bold text-slate-700 tracking-wide">
                  Always On Call. Ready For Rapid Dispatch.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-0.5 max-w-2xl">
                Reach our logistics coordinators directly for emergency vessel spare dispatches, international door courier pickups, dangerous goods compliance, and air cargo bookings.
              </p>
            </div>

            {/* Right: Signature Side Design Motif */}
            <div className="lg:col-span-5 hidden sm:flex items-center justify-center">
              <BannerSideMotif variant="contact" />
            </div>

          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Office Locations & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
                Our Branch Centers
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Operational Hubs in Tamil Nadu
              </h2>
            </div>

            {OFFICES.map((office) => (
              <div 
                key={office.city} 
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-brand-blue transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{office.city} Office</h3>
                    <p className="text-[11px] text-slate-500 font-semibold">{office.title}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pl-13">
                  {office.address}
                </p>

                <div className="pl-13 space-y-1.5 text-xs pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                    {office.phones.map((p, i) => (
                      <a key={i} href={`tel:${p}`} className="font-bold text-slate-800 hover:text-brand-blue mr-2">
                        {p}
                      </a>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-brand-blue hover:underline">
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Clock className="w-4 h-4 text-brand-blue" />
                <span>Working Hours</span>
              </div>
              <p>Monday &ndash; Saturday: 09:00 AM to 08:30 PM IST</p>
              <p>Sunday: Dedicated Maritime &amp; Emergency Dispatch Only</p>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-md">
              <div className="mb-6 space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Send An Official Inquiry</h3>
                <p className="text-xs text-slate-500">Fill out your cargo or service requirements below.</p>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Inquiry Dispatched Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you <strong className="text-slate-800">{name}</strong>. Our logistics officer will contact you within 30 minutes with pricing and collection details.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-sm hover:bg-brand-blue-dark transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. S. Murugesan"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 90879 24488"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. contact@domain.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Destination Country *
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Required Service *
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold"
                    >
                      {CORE_SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Consignment Specifications / Message *
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe items, weight, pickup location, or any urgent timelines..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
                      required
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Direct 24/7 routing to operations desk
                    </span>
                    <button
                      type="submit"
                      className="px-7 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/25 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Submit Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Coimbatore Headquarters Map Location</h3>
              <p className="text-xs text-slate-500">1, Kondasamy Naidu Layout, Peelamedu, Lakshmipuram, Hopes College, Coimbatore - 641004</p>
            </div>
            <a
              href="https://maps.google.com/?q=Peelamedu,+Coimbatore+641004"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline"
            >
              <span>Open in Google Maps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="w-full h-80 bg-slate-100">
            <iframe
              title="Flymingo Logistics Headquarters Location"
              src="https://maps.google.com/maps?q=Peelamedu%20Coimbatore%20641004&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
