import React from 'react';
import { 
  Anchor, Plane, Package, ShieldCheck, Truck, AlertTriangle, 
  Phone, Compass, Globe, ArrowUpRight, Zap, CheckCircle2 
} from 'lucide-react';

/**
 * BannerSideMotif
 * Ultra-modern, executive geometric logistics dispatch card.
 * Completely free of circles - uses sharp rectangular bento cards,
 * angled route vectors, diamond waypoints, and real-time operational telemetry.
 */
export const BannerSideMotif = ({
  variant = 'about',
  icon: CustomIcon,
  primaryColor = '#005687',
  secondaryColor = '#ed2926',
  badge,
  className = ''
}) => {
  const configs = {
    about: {
      Icon: CustomIcon || Compass,
      title: 'Global Gateway Desk',
      hub: 'COIMBATORE &bull; WORLDWIDE',
      tag: 'ESTABLISHED 2018',
      stat1: { val: '190+', label: 'Countries' },
      stat2: { val: '24/7', label: 'Port Berth' },
      stat3: { val: '4-6d', label: 'Express Delivery' },
      routes: [
        { from: 'COIMBATORE HUB', to: 'MAA / CHENNAI PORT', time: 'SAME DAY' },
        { from: 'CHENNAI / TUTICORIN', to: 'GLOBAL DESTINATIONS', time: 'DIRECT FLIGHT & SEA' }
      ]
    },
    services: {
      Icon: CustomIcon || Globe,
      title: 'Multimodal Freight Grid',
      hub: 'AIR &bull; OCEAN &bull; SURFACE',
      tag: '6 PROVEN CHANNELS',
      stat1: { val: '6', label: 'Channels' },
      stat2: { val: '0', label: 'Port Delay' },
      stat3: { val: '100%', label: 'Transit Insured' },
      routes: [
        { from: 'BERTH & ANCHORAGE', to: 'OUTER ROADS LAUNCH', time: '45 MIN MOBILIZATION' },
        { from: 'ICEGATE EDI / DG', to: 'DOOR-TO-DOOR GLOBAL', time: 'PRIORITY ROUTING' }
      ]
    },
    contact: {
      Icon: CustomIcon || Phone,
      title: 'Direct Dispatch Control',
      hub: 'TAMIL NADU TO GLOBAL',
      tag: 'OPERATIONS DESK',
      stat1: { val: '< 15m', label: 'Quote Response' },
      stat2: { val: '24/7', label: 'Emergency Deck' },
      stat3: { val: 'Direct', label: 'Logistics Manager' },
      routes: [
        { from: 'COIMBATORE HEAD OFFICE', to: 'CHENNAI PORT DESK', time: 'INSTANT CONNECT' },
        { from: 'DUTY COORDINATOR', to: 'VESSEL MASTER DISPATCH', time: 'ROUND-THE-CLOCK' }
      ]
    },
    'ship-spares': {
      Icon: CustomIcon || Anchor,
      title: 'Berth Delivery Control',
      hub: '10+ INDIAN SEAPORTS',
      tag: 'CRITICAL MARITIME',
      stat1: { val: '45m', label: 'Mobilization' },
      stat2: { val: '10+', label: 'Major Ports' },
      stat3: { val: '0', label: 'Demurrage Delay' },
      routes: [
        { from: 'AIR CARGO CUSTOMS', to: 'BONDED GATE PASS', time: 'PRE-CLEARED' },
        { from: 'LAUNCH BOAT PIER', to: 'VESSEL ON-BOARD DECK', time: 'DIRECT DELIVERY' }
      ]
    },
    'freight-forwarding': {
      Icon: CustomIcon || Plane,
      title: 'Ocean & Air Forwarding',
      hub: 'FCL &bull; LCL &bull; CHARTER',
      tag: 'PRIORITY CARGO',
      stat1: { val: 'FCL/LCL', label: 'Full Options' },
      stat2: { val: 'NFO', label: 'Next Flight Out' },
      stat3: { val: 'Direct', label: 'Liner Contracts' },
      routes: [
        { from: 'ORIGIN INLAND WAREHOUSE', to: 'PORT OF LOADING', time: 'SCHEDULED' },
        { from: 'INTERNATIONAL AIRPORT', to: 'DESTINATION AIRPORT', time: 'EXPRESS TRACK' }
      ]
    },
    'international-courier': {
      Icon: CustomIcon || Package,
      title: 'Worldwide Express Courier',
      hub: '190+ DESTINATIONS',
      tag: 'DOOR-TO-DOOR',
      stat1: { val: '190+', label: 'Countries' },
      stat2: { val: 'Free', label: 'Doorstep Pickup' },
      stat3: { val: '4-6d', label: 'Transit Days' },
      routes: [
        { from: 'DOORSTEP PICKUP (TN)', to: 'EXPORT CONSOLIDATION', time: 'FREE PACKING' },
        { from: 'GLOBAL AIR HUB', to: 'DESTINATION DOORSTEP', time: 'LIVE MILESTONES' }
      ]
    },
    'customs-clearance': {
      Icon: CustomIcon || ShieldCheck,
      title: 'Licensed CHA Brokerage',
      hub: 'ICEGATE EDI FILING',
      tag: 'REGULATORY DESK',
      stat1: { val: '100%', label: 'EDI Compliant' },
      stat2: { val: 'Zero', label: 'Tariff Penalty' },
      stat3: { val: 'Licensed', label: 'Customs House' },
      routes: [
        { from: 'BILL OF ENTRY SUBMISSION', to: 'HSN CLASSIFICATION', time: 'INSTANT EDI' },
        { from: 'EXAMINATION DOCK', to: 'OUT OF CHARGE RELEASE', time: 'RAPID CLEAR' }
      ]
    },
    'dg-shipping': {
      Icon: CustomIcon || AlertTriangle,
      title: 'Dangerous Goods Hazmat',
      hub: 'IATA &bull; IMO CERTIFIED',
      tag: 'CLASS 1 TO 9 DG',
      stat1: { val: 'Class 1-9', label: 'All Hazmat' },
      stat2: { val: 'UN Spec', label: 'Packaging' },
      stat3: { val: 'DGD', label: 'Filing Ready' },
      routes: [
        { from: 'UN CERTIFIED CRATING', to: 'SHIPPERS DECLARATION', time: 'INSPECTED' },
        { from: 'HAZMAT AIRWAYBILL', to: 'SPECIALIZED VESSEL DECK', time: 'CERTIFIED' }
      ]
    },
    'international-relocation': {
      Icon: CustomIcon || Truck,
      title: 'Overseas Relocation Desk',
      hub: 'PACKERS &bull; MOVERS',
      tag: 'TURNKEY MOVING',
      stat1: { val: 'Turnkey', label: 'Door-to-Door' },
      stat2: { val: 'TR', label: 'Customs Exemption' },
      stat3: { val: 'Custom', label: 'Wooden Crating' },
      routes: [
        { from: 'ORIGIN RESIDENCE SURVEY', to: 'EXPORT WOODEN CRATING', time: 'WHITE GLOVE' },
        { from: 'DESTINATION PORT', to: 'ROOM-BY-ROOM SETUP', time: 'UNPACK & PLACED' }
      ]
    }
  };

  const cfg = configs[variant] || configs.about;
  const ActiveIcon = cfg.Icon;

  return (
    <div className={`w-full max-w-[460px] lg:max-w-[490px] mx-auto select-none ${className}`}>
      {/* Modern Executive Bento Specimen Card - NO circles */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 p-5 sm:p-6 space-y-4">
        
        {/* Card Header: Live Status + Service Identity */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
              <ActiveIcon className="w-5 h-5 text-brand-blue" />
            </div>
            <div>
              <div className="text-xs font-black tracking-wider text-slate-900 uppercase">
                {cfg.title}
              </div>
              <div 
                className="text-[10px] font-bold text-slate-500 tracking-wide uppercase"
                dangerouslySetInnerHTML={{ __html: cfg.hub }}
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>LIVE DESK</span>
          </div>
        </div>

        {/* Center: Geometric Vector Route Corridor (Rectangular / Angled Line Art - NO Circles) */}
        <div className="bg-slate-50/80 rounded-xl border border-slate-200/70 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500">
            <span className="text-brand-red font-black tracking-wider uppercase">{cfg.tag}</span>
            <span>LAT 11.01°N &bull; LON 76.95°E</span>
          </div>

          {/* Clean Route Corridors */}
          <div className="space-y-2">
            {cfg.routes.map((rt, i) => (
              <div key={i} className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
                  <div className="w-1.5 h-3 bg-brand-red rounded-xs" />
                  <span className="truncate max-w-[130px] sm:max-w-[150px]">{rt.from}</span>
                  <span className="text-slate-400 font-normal">&rarr;</span>
                  <span className="text-brand-blue truncate max-w-[110px] sm:max-w-[130px]">{rt.to}</span>
                </div>
                <span className="text-[9.5px] font-mono font-black text-brand-blue bg-brand-blue/5 border border-brand-blue/15 px-1.5 py-0.5 rounded">
                  {rt.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bento Metric Strip: 3 Rectangular Metric Tiles */}
        <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 hover:border-brand-red/30 transition-colors">
            <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {cfg.stat1.val}
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {cfg.stat1.label}
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 hover:border-brand-blue/30 transition-colors">
            <div className="text-base sm:text-lg font-black text-brand-red tracking-tight">
              {cfg.stat2.val}
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {cfg.stat2.label}
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 hover:border-brand-blue/30 transition-colors">
            <div className="text-base sm:text-lg font-black text-brand-blue tracking-tight">
              {cfg.stat3.val}
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {cfg.stat3.label}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BannerSideMotif;
