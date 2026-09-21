import React from 'react';

export default function HerbalShampooIllustration({ className = 'w-24 h-40' }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 120 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          {/* Bottle shadow and body gradient */}
          <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EDEFE8" />
            <stop offset="25%" stopColor="#FAFAF7" />
            <stop offset="75%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E0E3DA" />
          </linearGradient>

          {/* Green Cap Gradient */}
          <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#65A30D" />
            <stop offset="40%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#4D7C0F" />
          </linearGradient>

          <filter id="softShadow" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F291E" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Green Cap */}
        <path
          d="M44 26C44 23.8 45.8 22 48 22H72C74.2 22 76 23.8 76 26V36H44V26Z"
          fill="url(#capGrad)"
        />
        <rect x="42" y="34" width="36" height="4" rx="2" fill="#4D7C0F" />

        {/* Bottle Body */}
        <path
          d="M48 38C48 38 34 46 32 64C30 82 31 168 32 188C32.5 198 42 204 60 204C78 204 87.5 198 88 188C89 168 90 82 88 64C86 46 72 38 72 38H48Z"
          fill="url(#bottleGrad)"
          filter="url(#softShadow)"
        />

        {/* Bottle Specular Highlight */}
        <path
          d="M38 68C37 85 38 175 39 188C40 194 44 198 52 200C44 196 42 190 42 182C41 168 40 85 41 68C42 58 48 48 52 44C44 48 39 58 38 68Z"
          fill="white"
          fillOpacity="0.7"
        />

        {/* Label Background */}
        <rect
          x="40"
          y="74"
          width="40"
          height="86"
          rx="5"
          fill="#FFFFFF"
          fillOpacity="0.9"
          stroke="#E5E7EB"
          strokeWidth="0.8"
        />

        {/* Label Content: "Herbal Shampoo" text */}
        <text
          x="60"
          y="94"
          textAnchor="middle"
          fill="#0F291E"
          fontSize="5.5"
          fontFamily="system-ui, sans-serif"
          fontWeight="bold"
        >
          Herbal
        </text>
        <text
          x="60"
          y="102"
          textAnchor="middle"
          fill="#0F291E"
          fontSize="5.5"
          fontFamily="system-ui, sans-serif"
          fontWeight="bold"
        >
          Shampoo
        </text>

        {/* Botanical 5-Leaf Emblem on Label */}
        <g transform="translate(60, 122) scale(0.65)">
          {/* Center Leaf */}
          <path d="M0 -14C-4 -8 -4 0 0 4C4 0 4 -8 0 -14Z" fill="#16A34A" />
          {/* Left Leaves */}
          <path d="M-2 -8C-8 -11 -12 -5 -8 0C-4 1 -2 -3 -2 -8Z" fill="#22C55E" />
          <path d="M-1 -1C-7 -1 -10 5 -5 8C-1 8 0 4 -1 -1Z" fill="#15803D" />
          {/* Right Leaves */}
          <path d="M2 -8C8 -11 12 -5 8 0C4 1 2 -3 2 -8Z" fill="#22C55E" />
          <path d="M1 -1C7 -1 10 5 5 8C1 8 0 4 1 -1Z" fill="#15803D" />
          {/* Stem */}
          <line x1="0" y1="2" x2="0" y2="10" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* XYZ Naturals & 250ml */}
        <text
          x="60"
          y="142"
          textAnchor="middle"
          fill="#15803D"
          fontSize="4"
          fontFamily="system-ui, sans-serif"
          fontWeight="600"
        >
          XYZ Naturals
        </text>
        <text
          x="60"
          y="152"
          textAnchor="middle"
          fill="#64748B"
          fontSize="3.8"
          fontFamily="monospace"
        >
          250 ml
        </text>
      </svg>
    </div>
  );
}
