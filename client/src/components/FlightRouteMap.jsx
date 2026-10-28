import React from 'react';

/**
 * World flight route and nautical corridor overlay.
 * Recreates the subtle illuminated global route arcs and node grid with Flymingo brand colors.
 */
export const FlightRouteMap = ({ className = '' }) => (
  <svg
    viewBox="0 0 1440 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
    className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    {/* Flight Route Arcs radiating from South India hub (x: 880, y: 320) - crisp lines, no blur/gradient */}
    <g stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="5 7">
      {/* Route: South India -> London / Frankfurt (Europe) */}
      <path d="M 880 320 Q 760 170 560 190" className="opacity-60" />
      {/* Route: South India -> New York / Chicago (North America) */}
      <path d="M 880 320 Q 580 80 280 210" className="opacity-50" />
      {/* Route: South India -> Dubai (Middle East) */}
      <path d="M 880 320 Q 800 280 730 260" className="opacity-70" stroke="#E8291F" />
      {/* Route: South India -> Singapore & Tokyo (East Asia) */}
      <path d="M 880 320 Q 980 330 1100 270" className="opacity-60" />
      {/* Route: South India -> Sydney / Melbourne (Australia) */}
      <path d="M 880 320 Q 1060 410 1220 480" className="opacity-55" />
    </g>

    {/* Major Airport / Port Terminal Nodes */}
    <g fill="#38bdf8">
      {/* Europe */}
      <circle cx="560" cy="190" r="3.5" opacity="0.8" />
      {/* North America */}
      <circle cx="280" cy="210" r="3.5" opacity="0.8" />
      <circle cx="180" cy="230" r="3" opacity="0.6" />
      {/* Middle East */}
      <circle cx="730" cy="260" r="4" opacity="0.9" />
      {/* East Asia / Singapore */}
      <circle cx="1100" cy="270" r="3.5" opacity="0.8" />
      <circle cx="1020" cy="350" r="3" opacity="0.7" />
      {/* Australia */}
      <circle cx="1220" cy="480" r="3.5" opacity="0.8" />
    </g>

    {/* South India Primary Operations Hub (Coimbatore / Chennai / Tuticorin) */}
    <g transform="translate(880, 320)">
      <circle cx="0" cy="0" r="14" stroke="#E8291F" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" className="animate-spin" style={{ animationDuration: '12s' }} />
      <circle cx="0" cy="0" r="8" fill="#E8291F" opacity="0.25" />
      <circle cx="0" cy="0" r="4.5" fill="#E8291F" />
      <circle cx="0" cy="0" r="2" fill="#ffffff" />
    </g>
  </svg>
);

export default FlightRouteMap;
