import React from 'react';

/**
 * BannerSideMotif
 * Pure geometric 3D isometric logistics art motif.
 * 100% free of text and 100% free of circles.
 * Features 3D isometric cargo containers, diagonal speed chevrons,
 * faceted aerospace & maritime vectors, and diamond navigation beacons.
 */
export const BannerSideMotif = ({
  className = ''
}) => {
  return (
    <div className={`relative w-full max-w-[440px] lg:max-w-[480px] mx-auto select-none pointer-events-none drop-shadow-lg ${className}`}>
      <svg
        viewBox="0 0 500 320"
        className="w-full h-auto overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Blue Container Gradients */}
          <linearGradient id="cube-blue-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#005687" />
          </linearGradient>
          <linearGradient id="cube-blue-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#005687" />
            <stop offset="100%" stopColor="#082846" />
          </linearGradient>
          <linearGradient id="cube-blue-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#003e61" />
            <stop offset="100%" stopColor="#041525" />
          </linearGradient>

          {/* Red Container Gradients */}
          <linearGradient id="cube-red-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff524f" />
            <stop offset="100%" stopColor="#ed2926" />
          </linearGradient>
          <linearGradient id="cube-red-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ed2926" />
            <stop offset="100%" stopColor="#a31412" />
          </linearGradient>
          <linearGradient id="cube-red-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c21916" />
            <stop offset="100%" stopColor="#6e0b0a" />
          </linearGradient>

          {/* Translucent Glass Gradients */}
          <linearGradient id="cube-glass-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="cube-glass-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="cube-glass-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
          </linearGradient>

          {/* Speed Vector Beams */}
          <linearGradient id="beam-red" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ed2926" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ed2926" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-blue" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#005687" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </linearGradient>

          {/* Drop Shadows */}
          <filter id="motif-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodOpacity="0.14" floodColor="#082846" />
          </filter>
        </defs>

        {/* 1. Isometric Navigation Matrix Grid (Dashed Angled Lines - NO Circles) */}
        <g opacity="0.35">
          <line x1="80" y1="260" x2="380" y2="80" stroke="#005687" strokeWidth="1.2" strokeDasharray="4 6" />
          <line x1="120" y1="290" x2="420" y2="110" stroke="#005687" strokeWidth="1" strokeDasharray="3 5" />
          <line x1="160" y1="320" x2="460" y2="140" stroke="#005687" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="140" y1="100" x2="440" y2="280" stroke="#005687" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.6" />
          <line x1="180" y1="70" x2="480" y2="250" stroke="#005687" strokeWidth="0.8" strokeDasharray="4 7" opacity="0.6" />
        </g>

        {/* 2. Dynamic Diagonal Speed Chevrons (Straight Sharp Polygons) */}
        <g opacity="0.75">
          <polygon points="120,240 135,230 145,236 130,246" fill="#005687" opacity="0.5" />
          <polygon points="145,225 160,215 170,221 155,231" fill="#005687" opacity="0.7" />
          <polygon points="170,210 185,200 195,206 180,216" fill="#ed2926" opacity="0.85" />
          <polygon points="410,90 425,80 435,86 420,96" fill="#ed2926" opacity="0.9" />
          <polygon points="435,75 450,65 460,71 445,81" fill="#0284c7" opacity="0.75" />
        </g>

        {/* 3. Ascending High-Speed Logistics Beams */}
        <polygon points="110,270 390,100 400,102 114,275" fill="url(#beam-blue)" />
        <polygon points="160,290 440,120 448,122 165,295" fill="url(#beam-red)" />

        {/* 4. 3D Isometric Cargo Fleet Geometry (Filtered for Depth) */}
        <g filter="url(#motif-shadow)">

          {/* --- BASE CONTAINER 1 (Deep Maritime Blue) --- */}
          <g>
            {/* Top Face */}
            <polygon points="210,180 275,142 340,180 275,218" fill="url(#cube-blue-top)" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.4" />
            {/* Left Face */}
            <polygon points="210,180 275,218 275,278 210,240" fill="url(#cube-blue-left)" />
            {/* Right Face */}
            <polygon points="275,218 340,180 340,240 275,278" fill="url(#cube-blue-right)" />
            {/* Front Rib Lines (Container texture) */}
            <line x1="225" y1="189" x2="225" y2="249" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.18" />
            <line x1="242" y1="199" x2="242" y2="259" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.18" />
            <line x1="258" y1="208" x2="258" y2="268" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.18" />
            <line x1="292" y1="208" x2="292" y2="268" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
            <line x1="308" y1="199" x2="308" y2="259" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
            <line x1="325" y1="189" x2="325" y2="249" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
          </g>

          {/* --- ACCENT CONTAINER 2 (Brand Red - Stacked at Top Right) --- */}
          <g>
            {/* Top Face */}
            <polygon points="285,115 338,84 391,115 338,146" fill="url(#cube-red-top)" stroke="#ff8f8d" strokeWidth="0.75" strokeOpacity="0.5" />
            {/* Left Face */}
            <polygon points="285,115 338,146 338,198 285,167" fill="url(#cube-red-left)" />
            {/* Right Face */}
            <polygon points="338,146 391,115 391,167 338,198" fill="url(#cube-red-right)" />
            {/* Rib Lines */}
            <line x1="298" y1="123" x2="298" y2="175" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
            <line x1="312" y1="131" x2="312" y2="183" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
            <line x1="325" y1="138" x2="325" y2="190" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
            <line x1="352" y1="138" x2="352" y2="190" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            <line x1="365" y1="131" x2="365" y2="183" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            <line x1="378" y1="123" x2="378" y2="175" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
          </g>

          {/* --- TRANSLUCENT GLASS CONTAINER 3 (Stacked at Left) --- */}
          <g>
            {/* Top Face */}
            <polygon points="145,130 195,101 245,130 195,159" fill="url(#cube-glass-top)" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8" />
            {/* Left Face */}
            <polygon points="145,130 195,159 195,205 145,176" fill="url(#cube-glass-left)" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.6" />
            {/* Right Face */}
            <polygon points="195,159 245,130 245,176 195,205" fill="url(#cube-glass-right)" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.5" />
          </g>

        </g>

        {/* 5. Ascending Modern Faceted Jet Vector (Top Right - Sharp Origami Wings) */}
        <g transform="translate(370, 42)">
          {/* Main Fuselage */}
          <polygon points="45,0 75,-16 55,-6 10,-2" fill="#005687" />
          {/* Wing Left */}
          <polygon points="45,0 15,-22 35,-6" fill="#0284c7" />
          {/* Wing Right */}
          <polygon points="45,0 30,16 50,4" fill="#ed2926" />
          {/* Tail Fin */}
          <polygon points="15,-2 5,-12 20,-5" fill="#ffffff" stroke="#005687" strokeWidth="0.5" />
          {/* Jet Speed Trail */}
          <polygon points="0,5 25,0 5,-2" fill="#ed2926" opacity="0.6" />
        </g>

        {/* 6. Precision Diamond Navigational Waypoints (Rhombuses - NO Circles) */}
        <polygon points="195,95 201,101 195,107 189,101" fill="#ed2926" />
        <polygon points="275,136 281,142 275,148 269,142" fill="#005687" />
        <polygon points="338,78 344,84 338,90 332,84" fill="#ffffff" stroke="#ed2926" strokeWidth="1.5" />
        <polygon points="415,114 421,120 415,126 409,120" fill="#0284c7" />
        <polygon points="110,264 116,270 110,276 104,270" fill="#005687" />
        <polygon points="340,234 346,240 340,246 334,240" fill="#ed2926" />

        {/* 7. Subtle Corner Crosshairs (Precision Target Markers) */}
        <g stroke="#005687" strokeWidth="1" opacity="0.4">
          <line x1="80" y1="50" x2="94" y2="50" />
          <line x1="87" y1="43" x2="87" y2="57" />
          <line x1="440" y1="260" x2="454" y2="260" />
          <line x1="447" y1="253" x2="447" y2="267" />
        </g>

      </svg>
    </div>
  );
};

export default BannerSideMotif;
