import React from 'react';
import { 
  Anchor, Plane, Package, ShieldCheck, Truck, AlertTriangle, 
  Phone, Compass, Globe, Sparkles, Clock, CheckCircle2, 
  MapPin, Award, Boxes, Shield, FileText, Check, Navigation
} from 'lucide-react';

/* Self-contained micro-animations for floating chips */
const css = `
@keyframes bsm-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes bsm-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.bsm-float { animation: bsm-float 5s ease-in-out infinite; }
.bsm-spin { animation: bsm-spin 35s linear infinite; }
`;

/**
 * BannerSideMotif
 * Renders distinct, bespoke photo collage compositions with floating metric chips
 * inspired by the acclaimed About Page hero design.
 * Each service & page gets its own unique framing, photos, and live highlights.
 */
export const BannerSideMotif = ({
  variant = 'services',
  className = ''
}) => {
  // 1. SERVICES PAGE - Multimodal Cargo Split Composition
  if (variant === 'services') {
    return (
      <div className={`relative w-full max-w-md h-[290px] lg:h-[330px] select-none ${className}`}>
        <style>{css}</style>
        {/* Decorative background dashed accent */}
        <div className="bsm-spin absolute -right-2 -top-2 w-40 h-40 rounded-full border-2 border-dashed border-brand-blue/30 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-8 top-12 w-28 h-28 rounded-full bg-brand-red/10 blur-xl pointer-events-none" aria-hidden="true" />

        {/* Main photo 1: Air Cargo loading */}
        <div className="absolute right-2 top-0 w-[58%] h-[82%]">
          <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-brand-blue/20 bg-slate-200">
            <img
              src="/assets/air cargo.jpg"
              alt="Air Cargo Freight"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/service banner.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Overlapping photo 2: Courier & Logistics delivery */}
        <div className="absolute left-1 bottom-1 w-[46%] h-[50%]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-black/15 -rotate-2 bg-slate-200">
            <img
              src="/assets/courier.jpg"
              alt="Express Logistics"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/why_choose.jpg'; }}
            />
          </div>
        </div>

        {/* Floating chip 1: Top Left - 6 Channels */}
        <div className="bsm-float absolute left-0 top-4" style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-brand-blue/15">
            <div className="w-9 h-9 rounded-xl bg-brand-blue text-white flex items-center justify-center">
              <Boxes className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-base font-black font-mono text-slate-900 leading-none">6 Proven</div>
              <div className="text-[10px] font-bold text-slate-500 mt-0.5">Cargo Channels</div>
            </div>
          </div>
        </div>

        {/* Floating chip 2: Bottom Right - 24/7 Desk */}
        <div className="bsm-float absolute right-1 -bottom-2 sm:right-3" style={{ animationDelay: '-2.5s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-brand-red text-white shadow-xl shadow-brand-red/35">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Clock className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="text-base font-black font-mono leading-none">24/7 Desk</div>
              <div className="text-[10px] font-bold text-white/90 mt-0.5">Zero Cargo Gaps</div>
            </div>
          </div>
        </div>

        {/* Floating badge 3: Multimodal badge */}
        <div className="bsm-float absolute left-[32%] top-[48%]" style={{ animationDelay: '-4s' }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold tracking-wider shadow-lg">
            <Plane className="w-3.5 h-3.5 text-brand-red" />
            AIR &bull; OCEAN &bull; LAND
          </div>
        </div>
      </div>
    );
  }

  // 2. CONTACT PAGE - Communications & Rapid Dispatch Desk
  if (variant === 'contact') {
    return (
      <div className={`relative w-full max-w-md h-[290px] lg:h-[330px] select-none ${className}`}>
        <style>{css}</style>
        <div className="bsm-spin absolute -left-2 -top-2 w-36 h-36 rounded-full border-2 border-dashed border-emerald-500/30 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-6 top-8 w-28 h-28 rounded-full bg-brand-blue/10 blur-xl pointer-events-none" aria-hidden="true" />

        {/* Main Photo: Operations & Communications Coordinator */}
        <div className="absolute right-3 top-2 w-[62%] h-[84%]">
          <div className="relative w-full h-full rounded-[32px] overflow-hidden border-4 border-white shadow-2xl shadow-brand-blue/20 bg-slate-200">
            <img
              src="/assets/communication.jpg"
              alt="Flymingo Operations Coordinator"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/about 2.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </div>
        </div>

        {/* Secondary Photo: Global Logistics Center */}
        <div className="absolute left-2 bottom-2 w-[42%] h-[48%]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-black/15 rotate-2 bg-slate-200">
            <img
              src="/assets/why_choose.jpg"
              alt="Flymingo Hub Office"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/about 2.jpg'; }}
            />
          </div>
        </div>

        {/* Floating chip 1: Top Left - Instant Quote Response */}
        <div className="bsm-float absolute left-0 top-3" style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-brand-blue/15">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Clock className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-base font-black font-mono text-slate-900 leading-none">&lt; 15 Mins</div>
              <div className="text-[10px] font-bold text-slate-500 mt-0.5">Quote Response</div>
            </div>
          </div>
        </div>

        {/* Floating chip 2: Bottom Right - Direct Lines */}
        <div className="bsm-float absolute right-1 -bottom-2 sm:right-4" style={{ animationDelay: '-2.5s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-brand-red text-white shadow-xl shadow-brand-red/35">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Phone className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="text-base font-black font-mono leading-none">24/7 Desk</div>
              <div className="text-[10px] font-bold text-white/90 mt-0.5">Always On Call</div>
            </div>
          </div>
        </div>

        {/* Floating badge 3: Hub location */}
        <div className="bsm-float absolute left-[30%] top-[46%]" style={{ animationDelay: '-4.5s' }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-blue text-white text-[10px] font-mono font-bold tracking-wider shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-brand-red-light" />
            TAMIL NADU HUBS
          </div>
        </div>
      </div>
    );
  }

  // 3. SHIP SPARES LOGISTICS - Maritime Anchorage & Outer Berth Delivery
  if (variant === 'ship-spares') {
    return (
      <div className={`relative w-full max-w-md h-[290px] lg:h-[330px] select-none ${className}`}>
        <style>{css}</style>
        <div className="bsm-spin absolute -right-2 -top-2 w-44 h-44 rounded-full border-2 border-dashed border-brand-red/40 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-6 top-10 w-28 h-28 rounded-full bg-brand-blue/15 blur-xl pointer-events-none" aria-hidden="true" />

        {/* Main Photo: Marine Vessel Spares & Deck Cargo */}
        <div className="absolute right-0 top-0 w-[62%] h-[88%]">
          <div className="relative w-full h-full rounded-t-[999px] rounded-b-3xl overflow-hidden border-4 border-white shadow-2xl shadow-brand-blue/30 bg-slate-200">
            <img
              src="/assets/ship-spares-hd.jpg"
              alt="Marine Equipment and Vessel Spares"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/banner-marine-hd.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* Secondary Photo: Sea Cargo & Supply Launch Boat */}
        <div className="absolute left-1 bottom-1 w-[44%] h-[48%]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-black/20 -rotate-3 bg-slate-200">
            <img
              src="/assets/sea cargo.jpg"
              alt="Supply Launch Boat Berth"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/banner-marine-hd.jpg'; }}
            />
          </div>
        </div>

        {/* Floating chip 1: Top Left - Emergency Mobilization */}
        <div className="bsm-float absolute left-0 top-4" style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-brand-blue/15">
            <div className="w-9 h-9 rounded-xl bg-brand-blue text-white flex items-center justify-center">
              <Anchor className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="text-base font-black font-mono text-slate-900 leading-none">&lt; 45 Mins</div>
              <div className="text-[10px] font-bold text-slate-500 mt-0.5">Port Mobilization</div>
            </div>
          </div>
        </div>

        {/* Floating chip 2: Bottom Right - On-Board Delivery */}
        <div className="bsm-float absolute right-2 -bottom-2 sm:right-4" style={{ animationDelay: '-2.5s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-brand-red text-white shadow-xl shadow-brand-red/35">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <CheckCircle2 className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="text-base font-black font-mono leading-none">10+ Seaports</div>
              <div className="text-[10px] font-bold text-white/90 mt-0.5">Direct Berth Delivery</div>
            </div>
          </div>
        </div>

        {/* Floating badge 3: Zero Port Delay */}
        <div className="bsm-float absolute left-[32%] top-[46%]" style={{ animationDelay: '-4s' }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-blue-dark text-white text-[10px] font-mono font-bold tracking-wider shadow-lg">
            <Navigation className="w-3.5 h-3.5 text-brand-red-light" />
            OUTER ANCHORAGE
          </div>
        </div>
      </div>
    );
  }

  // 4. FREIGHT FORWARDING - Ocean & Air Freight Forwarding
  if (variant === 'freight-forwarding') {
    return (
      <div className={`relative w-full max-w-md h-[290px] lg:h-[330px] select-none ${className}`}>
        <style>{css}</style>
        <div className="bsm-spin absolute -right-2 -top-2 w-40 h-40 rounded-full border-2 border-dashed border-sky-500/40 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-10 top-12 w-28 h-28 rounded-full bg-brand-blue/15 blur-xl pointer-events-none" aria-hidden="true" />

        {/* Main Photo: Air Cargo Aircraft */}
        <div className="absolute right-2 top-0 w-[60%] h-[82%]">
          <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-brand-blue/20 bg-slate-200">
            <img
              src="/assets/air cargo.jpg"
              alt="Air Freight Charter"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/banner-aircargo-hd.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Secondary Photo: Ocean Cargo Container Ship */}
        <div className="absolute left-1 bottom-1 w-[46%] h-[50%]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-black/15 rotate-2 bg-slate-200">
            <img
              src="/assets/sea cargo.jpg"
              alt="Ocean Container Freight FCL"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/banner-sectors-hd.jpg'; }}
            />
          </div>
        </div>

        {/* Floating chip 1: Top Left - Priority Air Charter */}
        <div className="bsm-float absolute left-0 top-3" style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-brand-blue/15">
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center">
              <Plane className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-base font-black font-mono text-slate-900 leading-none">NFO Priority</div>
              <div className="text-[10px] font-bold text-slate-500 mt-0.5">Air Cargo Rates</div>
            </div>
          </div>
        </div>

        {/* Floating chip 2: Bottom Right - FCL / LCL Container Cargo */}
        <div className="bsm-float absolute right-1 -bottom-2 sm:right-3" style={{ animationDelay: '-2.5s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-brand-red text-white shadow-xl shadow-brand-red/35">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Boxes className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="text-base font-black font-mono leading-none">FCL &bull; LCL</div>
              <div className="text-[10px] font-bold text-white/90 mt-0.5">Direct Line Contracts</div>
            </div>
          </div>
        </div>

        {/* Floating badge 3: Global Multimodal Route */}
        <div className="bsm-float absolute left-[32%] top-[46%]" style={{ animationDelay: '-4s' }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold tracking-wider shadow-lg">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            WORLDWIDE PORTS
          </div>
        </div>
      </div>
    );
  }

  // 5. INTERNATIONAL COURIER - Worldwide Door-to-Door Express
  if (variant === 'international-courier') {
    return (
      <div className={`relative w-full max-w-md h-[290px] lg:h-[330px] select-none ${className}`}>
        <style>{css}</style>
        <div className="bsm-spin absolute -right-2 -top-2 w-42 h-42 rounded-full border-2 border-dashed border-emerald-500/35 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-8 top-10 w-28 h-28 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" aria-hidden="true" />

        {/* Main Photo: International Courier Airport Logistics */}
        <div className="absolute right-1 top-0 w-[60%] h-[84%]">
          <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-emerald-600/15 bg-slate-200">
            <img
              src="/assets/international_courier_banner.jpg"
              alt="Flymingo International Courier Express"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/courier.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Secondary Photo: Doorstep Parcel Handover */}
        <div className="absolute left-1 bottom-1 w-[46%] h-[50%]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-black/15 -rotate-2 bg-slate-200">
            <img
              src="/assets/courier.jpg"
              alt="Doorstep Parcel Pickup"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/banner-courier-hd.jpg'; }}
            />
          </div>
        </div>

        {/* Floating chip 1: Top Left - 190+ Countries Delivered */}
        <div className="bsm-float absolute left-0 top-3" style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-brand-blue/15">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Package className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-base font-black font-mono text-slate-900 leading-none">190+</div>
              <div className="text-[10px] font-bold text-slate-500 mt-0.5">Countries Delivered</div>
            </div>
          </div>
        </div>

        {/* Floating chip 2: Bottom Right - Express 2 to 4 Days */}
        <div className="bsm-float absolute right-1 -bottom-2 sm:right-3" style={{ animationDelay: '-2.5s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-brand-red text-white shadow-xl shadow-brand-red/35">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Clock className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="text-base font-black font-mono leading-none">4 to 6 Days</div>
              <div className="text-[10px] font-bold text-white/90 mt-0.5">USA &bull; UK &bull; UAE</div>
            </div>
          </div>
        </div>

        {/* Floating badge 3: Free Doorstep Pickup */}
        <div className="bsm-float absolute left-[32%] top-[46%]" style={{ animationDelay: '-4s' }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-blue text-white text-[10px] font-mono font-bold tracking-wider shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            FREE PICKUP &bull; PACKING
          </div>
        </div>
      </div>
    );
  }

  // 6. CUSTOMS CLEARANCE - Licensed Customs House Brokerage (CHA)
  if (variant === 'customs-clearance') {
    return (
      <div className={`relative w-full max-w-md h-[290px] lg:h-[330px] select-none ${className}`}>
        <style>{css}</style>
        <div className="bsm-spin absolute -right-2 -top-2 w-40 h-40 rounded-full border-2 border-dashed border-purple-500/35 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-10 top-10 w-28 h-28 rounded-full bg-purple-500/10 blur-xl pointer-events-none" aria-hidden="true" />

        {/* Main Photo: Customs Clearance & Port Cargo Inspection */}
        <div className="absolute right-2 top-0 w-[60%] h-[84%]">
          <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-purple-600/15 bg-slate-200">
            <img
              src="/assets/customs clearance.jpg"
              alt="Licensed Customs House Brokerage"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/customs.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Secondary Photo: Customs Formalities & Documentation */}
        <div className="absolute left-1 bottom-1 w-[46%] h-[50%]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-black/15 rotate-2 bg-slate-200">
            <img
              src="/assets/custom formality.jpg"
              alt="ICEGATE EDI Formalities"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/custom image1.jpg'; }}
            />
          </div>
        </div>

        {/* Floating chip 1: Top Left - ICEGATE EDI Filing */}
        <div className="bsm-float absolute left-0 top-3" style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-brand-blue/15">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-base font-black font-mono text-slate-900 leading-none">ICEGATE EDI</div>
              <div className="text-[10px] font-bold text-slate-500 mt-0.5">Licensed In-House CHA</div>
            </div>
          </div>
        </div>

        {/* Floating chip 2: Bottom Right - Zero Demurrage */}
        <div className="bsm-float absolute right-1 -bottom-2 sm:right-3" style={{ animationDelay: '-2.5s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-brand-red text-white shadow-xl shadow-brand-red/35">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Check className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="text-base font-black font-mono leading-none">Zero Delay</div>
              <div className="text-[10px] font-bold text-white/90 mt-0.5">Rapid Cargo Release</div>
            </div>
          </div>
        </div>

        {/* Floating badge 3: Regulatory Compliance */}
        <div className="bsm-float absolute left-[32%] top-[46%]" style={{ animationDelay: '-4s' }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold tracking-wider shadow-lg">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            100% REGULATORY
          </div>
        </div>
      </div>
    );
  }

  // 7. DANGEROUS GOODS - IATA & IMO Certified Hazmat
  if (variant === 'dg-shipping') {
    return (
      <div className={`relative w-full max-w-md h-[290px] lg:h-[330px] select-none ${className}`}>
        <style>{css}</style>
        <div className="bsm-spin absolute -right-2 -top-2 w-40 h-40 rounded-full border-2 border-dashed border-amber-500/40 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-8 top-10 w-28 h-28 rounded-full bg-amber-500/15 blur-xl pointer-events-none" aria-hidden="true" />

        {/* Main Photo: DG Safety Certification and Crating */}
        <div className="absolute right-1 top-0 w-[60%] h-[84%]">
          <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-amber-600/20 bg-slate-200">
            <img
              src="/assets/dg-hazmat-hd.jpg"
              alt="Dangerous Goods Certification"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/banner-process-hd.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Secondary Photo: UN Protective Packaging */}
        <div className="absolute left-1 bottom-1 w-[46%] h-[50%]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-black/15 -rotate-2 bg-slate-200">
            <img
              src="/assets/packageing.jpg"
              alt="UN Certified Hazardous Crating"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/why_choose.jpg'; }}
            />
          </div>
        </div>

        {/* Floating chip 1: Top Left - IATA & IMO Certified */}
        <div className="bsm-float absolute left-0 top-3" style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-brand-blue/15">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center">
              <AlertTriangle className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-base font-black font-mono text-slate-900 leading-none">Class 1 to 9</div>
              <div className="text-[10px] font-bold text-slate-500 mt-0.5">IATA &bull; IMO Certified</div>
            </div>
          </div>
        </div>

        {/* Floating chip 2: Bottom Right - DGD Filing */}
        <div className="bsm-float absolute right-1 -bottom-2 sm:right-3" style={{ animationDelay: '-2.5s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-brand-red text-white shadow-xl shadow-brand-red/35">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Shield className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="text-base font-black font-mono leading-none">UN Spec</div>
              <div className="text-[10px] font-bold text-white/90 mt-0.5">Packaging &bull; DGD</div>
            </div>
          </div>
        </div>

        {/* Floating badge 3: 100% Safety Protocol */}
        <div className="bsm-float absolute left-[32%] top-[46%]" style={{ animationDelay: '-4s' }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold tracking-wider shadow-lg">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            ZERO DEFECT COMPLIANCE
          </div>
        </div>
      </div>
    );
  }

  // 8. INTERNATIONAL RELOCATION - Household Packers & Movers
  if (variant === 'international-relocation') {
    return (
      <div className={`relative w-full max-w-md h-[290px] lg:h-[330px] select-none ${className}`}>
        <style>{css}</style>
        <div className="bsm-spin absolute -right-2 -top-2 w-40 h-40 rounded-full border-2 border-dashed border-teal-500/40 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-8 top-10 w-28 h-28 rounded-full bg-teal-500/15 blur-xl pointer-events-none" aria-hidden="true" />

        {/* Main Photo: Household Packers & Movers survey and crating */}
        <div className="absolute right-1 top-0 w-[60%] h-[84%]">
          <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-teal-600/15 bg-slate-200">
            <img
              src="/assets/movers.jpg"
              alt="Flymingo Packers and Movers"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/pre move.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Secondary Photo: Container loading and crating */}
        <div className="absolute left-1 bottom-1 w-[46%] h-[50%]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-black/15 rotate-2 bg-slate-200">
            <img
              src="/assets/loading.jpg"
              alt="Overseas Container Loading"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/packer.jpg'; }}
            />
          </div>
        </div>

        {/* Floating chip 1: Top Left - Turnkey Moving */}
        <div className="bsm-float absolute left-0 top-3" style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-brand-blue/15">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Truck className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-base font-black font-mono text-slate-900 leading-none">Turnkey</div>
              <div className="text-[10px] font-bold text-slate-500 mt-0.5">Door-to-Door Moving</div>
            </div>
          </div>
        </div>

        {/* Floating chip 2: Bottom Right - Custom Wooden Crating */}
        <div className="bsm-float absolute right-1 -bottom-2 sm:right-3" style={{ animationDelay: '-2.5s' }}>
          <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-brand-red text-white shadow-xl shadow-brand-red/35">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Award className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="text-base font-black font-mono leading-none">Custom Crates</div>
              <div className="text-[10px] font-bold text-white/90 mt-0.5">Transfer of Residence</div>
            </div>
          </div>
        </div>

        {/* Floating badge 3: White Glove Service */}
        <div className="bsm-float absolute left-[32%] top-[46%]" style={{ animationDelay: '-4s' }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold tracking-wider shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            ZERO DAMAGE PACKING
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT / FALLBACK: Multimodal Gateway
  return (
    <div className={`relative w-full max-w-md h-[290px] lg:h-[330px] select-none ${className}`}>
      <style>{css}</style>
      <div className="bsm-spin absolute -right-2 -top-2 w-40 h-40 rounded-full border-2 border-dashed border-brand-red/40 pointer-events-none" aria-hidden="true" />
      <div className="absolute right-8 top-12 w-28 h-28 rounded-full bg-brand-blue/10 blur-xl pointer-events-none" aria-hidden="true" />

      <div className="absolute right-2 top-0 w-[58%] h-[82%]">
        <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-brand-blue/20 bg-slate-200">
          <img
            src="/assets/air cargo.jpg"
            alt="Flymingo Logistics Cargo"
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = '/assets/service banner.jpg'; }}
          />
        </div>
      </div>

      <div className="absolute left-1 bottom-1 w-[46%] h-[50%]">
        <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-black/15 -rotate-2 bg-slate-200">
          <img
            src="/assets/courier.jpg"
            alt="Express Cargo"
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = '/assets/why_choose.jpg'; }}
          />
        </div>
      </div>

      <div className="bsm-float absolute left-0 top-4">
        <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-brand-blue/15">
          <div className="w-9 h-9 rounded-xl bg-brand-blue text-white flex items-center justify-center">
            <Globe className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="text-base font-black font-mono text-slate-900 leading-none">190+</div>
            <div className="text-[10px] font-bold text-slate-500 mt-0.5">Countries Delivered</div>
          </div>
        </div>
      </div>

      <div className="bsm-float absolute right-1 -bottom-2 sm:right-3" style={{ animationDelay: '-2.5s' }}>
        <div className="flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-2xl bg-brand-red text-white shadow-xl shadow-brand-red/35">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <Clock className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <div className="text-base font-black font-mono leading-none">24/7 Desk</div>
            <div className="text-[10px] font-bold text-white/90 mt-0.5">On-Time Logistics</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSideMotif;
