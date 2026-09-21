import React from 'react';

export default function GlobeLeafIllustration({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Soft ambient green radial glow */}
      <div className="absolute w-56 h-56 rounded-full bg-emerald-200/35 blur-2xl pointer-events-none -z-10" />

      {/* Main SVG Graphic */}
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-56 h-56 max-w-full drop-shadow-[0_8px_20px_rgba(22,101,52,0.12)] animate-float"
      >
        {/* Definitions for gradients and shadows */}
        <defs>
          <radialGradient
            id="globeGradient"
            cx="35%"
            cy="30%"
            r="70%"
            fx="30%"
            fy="25%"
          >
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </radialGradient>

          <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>

          <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>

          <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#166534" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Globe Base Sphere */}
        <circle
          cx="120"
          cy="120"
          r="60"
          fill="url(#globeGradient)"
          filter="url(#softGlow)"
        />

        {/* Globe Continents (America / Europe / Africa stylized shapes) */}
        {/* Americas stylized */}
        <path
          d="M86 85C92 82 99 88 98 94C97 101 92 104 88 108C84 112 87 122 93 125C99 128 102 135 99 142C96 148 91 154 85 158C80 152 74 142 71 133C67 122 68 111 74 98C77 92 81 87 86 85Z"
          fill="#4ADE80"
        />
        <path
          d="M94 130C99 135 106 142 108 152C104 156 99 160 93 162C90 156 90 148 92 140C93 136 93 133 94 130Z"
          fill="#22C55E"
        />

        {/* Eurasia & Africa stylized */}
        <path
          d="M128 72C138 72 147 78 153 85C158 91 161 97 165 103C158 104 151 100 144 98C138 96 133 99 129 104C126 108 127 115 131 120C135 125 142 127 146 133C148 136 147 143 143 147C137 153 129 157 122 158C120 154 118 147 119 140C120 132 116 126 111 122C106 118 107 108 112 103C117 98 122 93 124 85C125 80 125 75 128 72Z"
          fill="#4ADE80"
        />

        {/* Subtle Globe Atmosphere Specular Highlight */}
        <path
          d="M72 90C80 74 98 63 118 63C124 63 130 64 136 67C124 66 110 70 98 78C86 86 78 97 74 110C72 103 71 96 72 90Z"
          fill="white"
          fillOpacity="0.4"
        />

        {/* Floating Leaves Surrounding Globe (matching reference orientation & scale) */}
        
        {/* Leaf 1: Top Left */}
        <g transform="translate(68, 62) rotate(-35)">
          <path
            d="M0 24C0 24 6 12 16 6C26 0 28 2 28 2C28 2 29 8 20 18C12 28 0 24 0 24Z"
            fill="url(#leafGrad1)"
          />
          <path d="M0 24C10 18 18 10 28 2" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Leaf 2: Top Right */}
        <g transform="translate(160, 52) rotate(25)">
          <path
            d="M0 22C0 22 5 11 15 5C24 0 26 2 26 2C26 2 27 7 19 16C11 25 0 22 0 22Z"
            fill="url(#leafGrad2)"
          />
          <path d="M0 22C9 16 16 9 26 2" stroke="#DCFCE7" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Leaf 3: Far Left */}
        <g transform="translate(42, 112) rotate(-70)">
          <path
            d="M0 20C0 20 4 10 14 5C22 0 24 1 24 1C24 1 25 6 17 15C10 23 0 20 0 20Z"
            fill="url(#leafGrad1)"
          />
        </g>

        {/* Leaf 4: Bottom Left */}
        <g transform="translate(62, 168) rotate(-120)">
          <path
            d="M0 22C0 22 5 11 15 5C24 0 26 2 26 2C26 2 27 7 19 16C11 25 0 22 0 22Z"
            fill="url(#leafGrad2)"
          />
        </g>

        {/* Leaf 5: Far Right */}
        <g transform="translate(182, 108) rotate(45)">
          <path
            d="M0 24C0 24 6 12 16 6C25 0 27 2 27 2C27 2 28 8 20 18C12 27 0 24 0 24Z"
            fill="url(#leafGrad1)"
          />
          <path d="M0 24C10 18 18 10 27 2" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Leaf 6: Bottom Right */}
        <g transform="translate(168, 172) rotate(115)">
          <path
            d="M0 20C0 20 5 10 13 4C22 0 24 2 24 2C24 2 25 6 17 15C10 23 0 20 0 20Z"
            fill="url(#leafGrad2)"
          />
        </g>

        {/* Leaf 7: Tiny Accent Top */}
        <g transform="translate(112, 38) rotate(-10)">
          <path
            d="M0 14C0 14 3 7 9 3C15 0 16 1 16 1C16 1 17 4 12 10C7 16 0 14 0 14Z"
            fill="#86EFAC"
          />
        </g>
      </svg>
    </div>
  );
}
