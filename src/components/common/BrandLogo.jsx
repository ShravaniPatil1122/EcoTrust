import React from 'react';

export default function BrandLogo({ showTagline = true, size = 'default', tagline = 'Verify before you trust.' }) {
  const isLarge = size === 'large';

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-center gap-2.5">
        {/* Dual-leaf EcoTrust icon matching the reference design */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm"
          >
            {/* Primary left leaf */}
            <path
              d="M10 32C10 32 12 18 24 8C35 -1 38 1 38 1C38 1 40 6 30 18C20 30 8 36 8 36"
              stroke="#15803D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M38 1C38 1 25 3 14 14C3 25 6 36 6 36C6 36 18 34 29 23C40 12 38 1 38 1Z"
              fill="#16A34A"
            />
            {/* Secondary overlapping fresh leaf */}
            <path
              d="M18 24C18 24 22 15 29 10C35 5 37 6 37 6C37 6 38 9 32 16C26 23 18 27 18 27"
              fill="#4ADE80"
              fillOpacity="0.85"
            />
            {/* Center vein */}
            <path
              d="M21 11C16 16 13 23 11 30"
              stroke="#DCFCE7"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Brand name */}
        <span
          className={`font-bold tracking-tight text-[#0F291E] ${
            isLarge ? 'text-2xl' : 'text-[22px]'
          }`}
          style={{ letterSpacing: '-0.02em' }}
        >
          EcoTrust
        </span>
      </div>

      {/* Subtitle: "Verify before you trust." */}
      {showTagline && (
        <p className="text-[13px] font-medium text-slate-500 tracking-normal mt-1 flex items-center gap-1.5">
          {tagline}
        </p>
      )}
    </div>
  );
}
