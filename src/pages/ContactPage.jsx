import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, ArrowRight,
  Sparkles, Anchor, ShieldCheck, MessageSquare
} from 'lucide-react';
import { BRAND, OFFICES, CORE_SERVICES, COUNTRIES } from '../data/siteData';

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
      {/* 1. CINEMATIC COMMUNICATIONS DISPATCH BANNER HERO          */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-brand-blue-dark text-white border-b border-white/15 pt-12 pb-16 lg:pt-16 lg:pb-20">
        {/* Photographic Background Texture with Deep Maritime Scrim */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/assets/communication.jpg" 
            alt="Flymingo Logistics Global Communications Desk" 
            className="w-full h-full object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/98 via-brand-blue-dark/92 to-brand-blue-dark/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/95 via-transparent to-brand-blue-dark/85" />
          {/* Swiss Industrial Blueprint Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-brand-red/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-7">
          {/* Breadcrumb & Telemetry Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <nav className="flex items-center gap-2 text-white/70 font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-bold">Contact Us</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-mono text-[11px] text-white/90">
              <span>LIVE DESK ACTIVE &bull; COIMBATORE HQ &amp; CHENNAI PORT HUB</span>
            </div>
          </div>

          {/* Banner Title & Subtext */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-block px-3 py-1 rounded-md bg-brand-red/20 border border-brand-red/50 text-brand-red-light text-[11px] font-mono font-extrabold uppercase tracking-widest">
              [ 24/7 CARGO ASSISTANCE &amp; DISPATCH // DIRECT HOTLINES ]
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Direct Lines.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-brand-red-light">
                Immediate Logistics Response.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal pt-1 max-w-2xl">
              Reach our logistics coordinators directly for emergency vessel spare dispatches, international door courier pickups, dangerous goods compliance, and air cargo bookings.
            </p>
          </div>

          {/* Contact Fast-Response Quick Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
            <a 
              href={`tel:${BRAND.primaryPhone}`} 
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-red/25 border border-brand-red/40 text-brand-red-light flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono font-bold text-white/70 uppercase tracking-wider">Coimbatore HQ</div>
                <div className="text-sm font-black text-white hover:text-sky-300 transition-colors">{BRAND.primaryPhone}</div>
              </div>
            </a>

            <a 
              href={`tel:${BRAND.supportPhones[1]}`} 
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/25 border border-sky-400/40 text-sky-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono font-bold text-white/70 uppercase tracking-wider">Chennai Port Hub</div>
                <div className="text-sm font-black text-white hover:text-sky-300 transition-colors">{BRAND.supportPhones[1]}</div>
              </div>
            </a>

            <a 
              href={`https://wa.me/919087924488?text=${encodeURIComponent('Hello Flymingo Logistics, I need shipment assistance.')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono font-bold text-white/70 uppercase tracking-wider">WhatsApp 24/7</div>
                <div className="text-sm font-black text-emerald-300">Instant Chat Reply</div>
              </div>
            </a>

            <a 
              href={`mailto:${BRAND.primaryEmail}`}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono font-bold text-white/70 uppercase tracking-wider">Official Email</div>
                <div className="text-xs font-bold text-white truncate">{BRAND.primaryEmail}</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
