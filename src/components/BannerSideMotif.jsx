import React from 'react';
import { 
  Anchor, Plane, Package, ShieldCheck, Truck, AlertTriangle, 
  Phone, Compass, Globe 
} from 'lucide-react';

/**
 * BannerSideMotif
 * Executive interlocking rings and concentric radar orbit motif
 * inspired by Oneloop Logistics (from user reference screenshot), customized with 
 * Flymingo's maritime blue (#005687) and high-energy red (#ed2926) with category icons.
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
      primary: '#005687',
      secondary: '#ed2926',
      badge: 'SINCE 2018',
      nodePos: { cx: 168, cy: 118 }
    },
    services: {
      Icon: CustomIcon || Globe,
      primary: '#005687',
      secondary: '#ed2926',
      badge: '6 CHANNELS',
      nodePos: { cx: 168, cy: 118 }
    },
    contact: {
      Icon: CustomIcon || Phone,
      primary: '#005687',
      secondary: '#ed2926',
      badge: '24/7 DESK',
      nodePos: { cx: 352, cy: 118 }
    },
    'ship-spares': {
      Icon: CustomIcon || Anchor,
      primary: '#005687',
      secondary: '#ed2926',
      badge: 'ON-BOARD BERTH',
      nodePos: { cx: 168, cy: 118 }
    },
    'freight-forwarding': {
      Icon: CustomIcon || Plane,
      primary: '#005687',
      secondary: '#0284c7',
      badge: 'AIR & OCEAN',
      nodePos: { cx: 352, cy: 118 }
    },
    'international-courier': {
      Icon: CustomIcon || Package,
      primary: '#005687',
      secondary: '#ed2926',
      badge: '190+ COUNTRIES',
      nodePos: { cx: 168, cy: 118 }
    },
    'customs-clearance': {
      Icon: CustomIcon || ShieldCheck,
      primary: '#005687',
      secondary: '#7c3aed',
      badge: 'ICEGATE EDI',
      nodePos: { cx: 352, cy: 118 }
    },
    'dg-shipping': {
      Icon: CustomIcon || AlertTriangle,
      primary: '#005687',
      secondary: '#d97706',
      badge: 'CLASS 1-9 DG',
      nodePos: { cx: 168, cy: 118 }
    },
    'international-relocation': {
      Icon: CustomIcon || Truck,
      primary: '#005687',
      secondary: '#0d9488',
      badge: 'PACKERS & MOVERS',
      nodePos: { cx: 168, cy: 118 }
    }
  };

  const cfg = configs[variant] || configs.about;
  const ActiveIcon = cfg.Icon;
  const c1 = primaryColor || cfg.primary;
  const c2 = secondaryColor || cfg.secondary;
  const displayBadge = badge || cfg.badge;

  return (
    <div className={`relative w-full max-w-[420px] lg:max-w-[460px] mx-auto select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 540 340"
        className="w-full h-auto drop-shadow-sm overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`loop-grad-1-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor="#0b2545" />
          </linearGradient>
          <linearGradient id={`loop-grad-2-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c2} />
            <stop offset="100%" stopColor="#c51614" />
          </linearGradient>
          <filter id={`shadow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.16" floodColor="#000000" />
          </filter>
        </defs>

        {/* Concentric Radar Navigation Rings */}
        <g opacity="0.28">
          <circle cx="260" cy="180" r="70" fill="none" stroke="#005687" strokeWidth="1" strokeDasharray="3 5" />
          <circle cx="260" cy="180" r="115" fill="none" stroke="#005687" strokeWidth="1.2" strokeDasharray="4 6" />
          <circle cx="260" cy="180" r="160" fill="none" stroke="#005687" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="260" cy="180" r="205" fill="none" stroke="#005687" strokeWidth="1" strokeDasharray="5 7" />
          <circle cx="260" cy="180" r="250" fill="none" stroke="#005687" strokeWidth="0.8" strokeDasharray="4 8" />
          
          <line x1="260" y1="20" x2="260" y2="340" stroke="#005687" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.5" />
          <line x1="10" y1="180" x2="510" y2="180" stroke="#005687" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.5" />
        </g>

        {/* Signature Interlocking Rings */}
        <circle
          cx="200"
          cy="180"
          r="86"
          fill="none"
          stroke={`url(#loop-grad-1-${variant})`}
          strokeWidth="28"
          strokeLinecap="round"
        />

        <circle
          cx="330"
          cy="180"
          r="86"
          fill="none"
          stroke={`url(#loop-grad-2-${variant})`}
          strokeWidth="28"
          strokeLinecap="round"
        />

        {/* Interlocking overlap arc (Ring 1 loop over Ring 2) */}
        <path
          d="M 200 94 A 86 86 0 0 1 278 142"
          fill="none"
          stroke={`url(#loop-grad-1-${variant})`}
          strokeWidth="28"
          strokeLinecap="round"
        />

        {/* Floating Node Badge Indicator on Loop */}
        <g transform={`translate(${cfg.nodePos.cx}, ${cfg.nodePos.cy})`} filter={`url(#shadow-${variant})`}>
          <circle cx="0" cy="0" r="24" fill="#ffffff" stroke={c1} strokeWidth="3" />
          <circle cx="0" cy="0" r="27" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.4" strokeDasharray="2 3" />
        </g>

        {/* Telemetry Badge */}
        <g transform="translate(330, 285)">
          <rect x="-75" y="-11" width="150" height="22" rx="11" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" filter={`url(#shadow-${variant})`} />
          <circle cx="-60" cy="0" r="3.5" fill={c2} />
          <text x="-48" y="3" fill="#1e293b" fontSize="9" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.06em">
            {displayBadge}
          </text>
        </g>
      </svg>

      {/* Center Icon inside white node */}
      <div 
        className="absolute w-9 h-9 rounded-full flex items-center justify-center pointer-events-auto"
        style={{
          left: `${(cfg.nodePos.cx / 540) * 100}%`,
          top: `${(cfg.nodePos.cy / 340) * 100}%`,
          transform: 'translate(-50%, -50%)'
        }}
        title={displayBadge}
      >
        <ActiveIcon className="w-4.5 h-4.5 text-brand-blue" strokeWidth={2.4} />
      </div>
    </div>
  );
};

export default BannerSideMotif;
