import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, Plane, Anchor, AlertTriangle, Truck, ShieldCheck, 
  ArrowRight, Calculator, CheckCircle2, MapPin, Clock, 
  ExternalLink, Sparkles, Navigation, Shield
} from 'lucide-react';
import { BRAND, CORE_SERVICES, STATS } from '../data/siteData';
import { FlightRouteMap } from '../components/FlightRouteMap';
import { BannerSideMotif } from '../components/BannerSideMotif';

export const ServicesPage = ({ onOpenQuote }) => {
  const CAPABILITIES = [
    {
      id: 'ship-spares',
      title: 'Ship Spares Logistics & 24/7 Port Berth Delivery',
      path: '/services/ship-spares-logistics',
      badge: 'Flagship Maritime Service',
      badgeColor: 'bg-brand-red-50 text-brand-red border-brand-red-200',
      icon: Anchor,
      image: '/assets/any size.jpg',
      lead: 'Time-critical marine equipment and engine parts delivered directly on board to vessel masters at outer anchorage berths across 10+ major Indian seaports.',
      features: [
        'Direct supply launch boat delivery to outer anchorage',
        'Customs boarding passes & bonded gate passes pre-cleared',
        'Emergency response mobilization in under 45 minutes',
        'Coverage: Chennai, Tuticorin, Cochin, Ennore, Kattupalli, JNPT'
      ],
      tagline: 'Zero Port Delay Guarantee'
    },
    {
      id: 'freight-forwarding',
      title: 'Ocean & Air Freight Forwarding',
      path: '/services/freight-forwarding',
      badge: 'FCL / LCL & Priority Air Charter',
      badgeColor: 'bg-brand-blue-50 text-brand-blue border-brand-blue-200',
      icon: Plane,
      image: '/assets/air cargo.jpg',
      lead: 'Comprehensive ocean container shipping (FCL/LCL) and expedited air cargo forwarding with aggressive airline and ocean liner contract pricing.',
      features: [
        'Full container load (FCL) & consolidated less container (LCL)',
        'Priority flight allocation with Next Flight Out (NFO) routing',
        'End-to-end multimodal transit from inland factory to destination dock',
        'Direct port-to-port and door-to-door global logistics'
      ],
      tagline: 'Direct Airline & Shipping Line Rates'
    },
    {
      id: 'international-courier',
      title: 'International Courier Express',
      path: '/services/international-courier',
      badge: 'B2B, B2C & NRI Parcels',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Package,
      image: '/assets/courier.jpg',
      lead: 'Door-to-door express worldwide courier delivery connecting Indian diaspora across 190+ countries for NRI food sweets, medicines, university luggage, and gifts.',
      features: [
        'Free doorstep pickup across Coimbatore, Chennai & Tamil Nadu',
        'Food-grade protective multi-layer packaging for homemade masalas',
        'Real-time milestone tracking with automated SMS/email alerts',
        'Express 2 to 4 business days transit to USA, UK, UAE & Europe'
      ],
      tagline: '190+ Countries Delivered'
    },
    {
      id: 'customs-clearance',
      title: 'Licensed Customs House Brokerage (CHA)',
      path: '/services/customs-clearance',
      badge: 'ICEGATE EDI Compliance',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: ShieldCheck,
      image: '/assets/customs clearance.jpg',
      lead: 'Fully licensed in-house customs house broker ensuring rapid tariff classification, ICEGATE EDI filing, and zero demurrage cargo release.',
      features: [
        'Seamless clearance at major air cargo complexes, seaports & ICDs',
        'Accurate HSN coding and duty assessment with zero penalties',
        'Export/import documentation & DGFT regulatory advisory',
        'In-transit bonded customs movement across Indian ports'
      ],
      tagline: 'Zero Demurrage Protocol'
    },
    {
      id: 'dg-shipping',
      title: 'Dangerous Goods (DG) Logistics',
      path: '/services/dangerous-goods-shipping',
      badge: 'IATA & IMO Certified',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: AlertTriangle,
      image: '/assets/certification.jpg',
      lead: 'IATA and IMDG certified hazardous cargo logistics covering Classes 1 through 9 with UN-certified protective packaging and DGD filing.',
      features: [
        'Complete coverage of Classes 1 to 9 (flammable, toxic, corrosive)',
        'UN-approved packaging certification and UN-spec labeling',
        "Shipper's Declaration for Dangerous Goods (DGD) preparation",
        'Dangerous goods trained personnel handling every shipment'
      ],
      tagline: '100% International Safety Compliance'
    },
    {
      id: 'international-relocation',
      title: 'International Household Relocation',
      path: '/services/international-relocation',
      badge: 'Packers & Movers',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      icon: Truck,
      image: '/assets/loading.jpg',
      lead: 'Turnkey overseas moving services for families, corporate transfers, and NRI returnees with custom wooden crating and destination customs clearance.',
      features: [
        'Specialized export-grade multi-layer packaging & custom crates',
        'Transfer of Residence (TR) customs facilitation and checklist',
        'Complete destination door-to-door unpacking and debris removal',
        'Comprehensive marine cargo transit insurance coverage'
      ],
      tagline: 'Zero-Damage Moving Guarantee'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-20 pb-20">
      {/* ========================================================= */}
      {/* 1. CINEMATIC MULTIMODAL TERMINAL BANNER HERO (LIGHT THEME) */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200 py-8 sm:py-10 lg:py-12 select-none">
        {/* Photographic Background Texture with continuous Ken Burns motion */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/assets/banner-courier-hd.jpg" 
            alt="Flymingo Logistics Global Multimodal Operations" 
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
                  Six Proven Channels.<br />
                  <span className="text-brand-red font-black">
                    Zero Cargo Gaps.
                  </span>
                </h1>

                <p className="text-sm sm:text-base font-bold text-slate-700 tracking-wide">
                  Connecting Businesses. Delivering Possibilities.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-0.5 max-w-2xl">
                From time-critical vessel spares delivery on-board at outer anchorage berths to worldwide express courier and heavy air/ocean freight forwarders, Flymingo Logistics handles every consignment with shipowner precision.
              </p>

              {/* Banner Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onOpenQuote()}
                  className="group px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-brand-red/30 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-3"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Request Instant Fare Quote</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="h-3.5 w-3.5 text-white" />
                  </span>
                </button>
                <a
                  href={`tel:${BRAND.primaryPhone}`}
                  className="px-6 py-3 bg-white border border-slate-300 text-slate-800 hover:text-brand-blue hover:border-brand-blue rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  <span>Speak To Logistics Desk</span>
                </a>
              </div>
            </div>

            {/* Right: Signature Side Design Motif */}
            <div className="lg:col-span-5 hidden sm:flex items-center justify-center">
              <BannerSideMotif variant="services" />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. STATS STRIP                                            */}
      {/* ========================================================= */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {STATS.map((st, i) => (
              <div key={i} className={`space-y-1 ${i > 0 ? 'pt-4 lg:pt-0' : ''}`}>
                <div className="text-3xl sm:text-4xl font-black text-brand-blue font-mono tracking-tight">
                  {st.value}
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-slate-800">
                  {st.label}
                </div>
                <p className="text-[11px] text-slate-500 max-w-[180px] mx-auto">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. COMPREHENSIVE 6 SERVICES SHOWCASE                       */}
      {/* ========================================================= */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
            Tailored Specialized Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Our Complete Service Portfolio
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Click on any service to explore detailed operational protocols, transit routes, and customs checklists.
          </p>
        </div>

        <div className="space-y-8">
          {CAPABILITIES.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 overflow-hidden"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visual / Media Container */}
                  <div className={`lg:col-span-5 relative overflow-hidden rounded-2xl h-64 sm:h-72 border border-slate-100 shadow-xs group ${isReversed ? 'lg:order-2' : ''}`}>
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/40" />
                    
                    {/* Floating Badge on Image */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <span className="text-xs font-mono font-bold bg-slate-950/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20">
                        {service.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className={`lg:col-span-7 space-y-4 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${service.badgeColor}`}>
                        {service.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {service.lead}
                      </p>
                    </div>

                    {/* Features Checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {service.features.map((feat, fi) => (
                        <div key={fi} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Triggers */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                      <Link
                        to={service.path}
                        className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-brand-blue/20"
                      >
                        <span>Explore Full Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => onOpenQuote(service.id)}
                        className="px-5 py-2.5 bg-white border border-slate-300 hover:border-brand-red text-slate-700 hover:text-brand-red rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        Get Free Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. BOTTOM ACTION STRIP (LIGHT THEME)                      */}
      {/* ========================================================= */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-gradient-to-r from-brand-blue-50 via-white to-brand-blue-50/50 rounded-3xl p-8 sm:p-10 text-slate-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-brand-blue-100">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-50 border border-brand-blue-200 px-3 py-1 rounded-full inline-block">
              Immediate Assistance
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Ready to move cargo with zero gaps?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Connect with our Coimbatore HQ or Chennai Port operations desk for immediate booking and rate guidance.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote()}
            className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 cursor-pointer flex-shrink-0"
          >
            Request Instant Quote
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
