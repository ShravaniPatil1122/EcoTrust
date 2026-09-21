import React from 'react';

export default function BarcodeScanIllustration({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Soft emerald ambient glow */}
      <div className="absolute w-64 h-64 rounded-full bg-emerald-100/50 blur-2xl pointer-events-none -z-10" />

      {/* Main Barcode Card / Viewfinder Container */}
      <div className="relative w-64 h-56 bg-white/95 rounded-3xl p-6 shadow-[0_8px_30px_rgba(22,101,52,0.08)] border border-emerald-900/5 flex flex-col items-center justify-center">
        {/* Mint green rounded viewfinder corner brackets (matching reference image screen 2) */}
        {/* Top-Left */}
        <div className="absolute top-3.5 left-3.5 w-7 h-7 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl" />
        {/* Top-Right */}
        <div className="absolute top-3.5 right-3.5 w-7 h-7 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl" />
        {/* Bottom-Left */}
        <div className="absolute bottom-3.5 left-3.5 w-7 h-7 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl" />
        {/* Bottom-Right */}
        <div className="absolute bottom-3.5 right-3.5 w-7 h-7 border-b-4 border-r-4 border-emerald-400 rounded-br-xl" />

        {/* Animated Green Scanning Laser Line */}
        <div className="absolute left-6 right-6 h-[2.5px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_12px_#10B981] animate-scan-sweep pointer-events-none z-10" />

        {/* Barcode SVG Artwork */}
        <div className="flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 170 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-44 h-22 text-slate-800"
          >
            {/* Barcode lines */}
            <rect x="0" y="0" width="3" height="64" fill="currentColor" rx="1" />
            <rect x="6" y="0" width="2" height="64" fill="currentColor" rx="0.5" />
            <rect x="11" y="0" width="4" height="64" fill="currentColor" rx="1" />
            <rect x="18" y="0" width="2" height="64" fill="currentColor" rx="0.5" />
            <rect x="23" y="0" width="5" height="64" fill="currentColor" rx="1" />
            <rect x="31" y="0" width="2" height="64" fill="currentColor" rx="0.5" />
            <rect x="36" y="0" width="4" height="64" fill="currentColor" rx="1" />
            <rect x="43" y="0" width="2" height="64" fill="currentColor" rx="0.5" />
            <rect x="48" y="0" width="3" height="64" fill="currentColor" rx="1" />
            <rect x="54" y="0" width="6" height="64" fill="currentColor" rx="1" />
            <rect x="63" y="0" width="2" height="64" fill="currentColor" rx="0.5" />
            <rect x="68" y="0" width="4" height="64" fill="currentColor" rx="1" />
            
            {/* Center guard bars */}
            <rect x="76" y="0" width="2.5" height="68" fill="#166534" rx="0.5" />
            <rect x="81" y="0" width="2.5" height="68" fill="#166534" rx="0.5" />

            {/* Right side bars */}
            <rect x="88" y="0" width="5" height="64" fill="currentColor" rx="1" />
            <rect x="96" y="0" width="2" height="64" fill="currentColor" rx="0.5" />
            <rect x="101" y="0" width="4" height="64" fill="currentColor" rx="1" />
            <rect x="108" y="0" width="3" height="64" fill="currentColor" rx="1" />
            <rect x="114" y="0" width="6" height="64" fill="currentColor" rx="1" />
            <rect x="123" y="0" width="2" height="64" fill="currentColor" rx="0.5" />
            <rect x="128" y="0" width="4" height="64" fill="currentColor" rx="1" />
            <rect x="135" y="0" width="2" height="64" fill="currentColor" rx="0.5" />
            <rect x="140" y="0" width="5" height="64" fill="currentColor" rx="1" />
            <rect x="148" y="0" width="2" height="64" fill="currentColor" rx="0.5" />
            <rect x="153" y="0" width="3" height="64" fill="currentColor" rx="1" />
            <rect x="159" y="0" width="4" height="64" fill="currentColor" rx="1" />
            <rect x="166" y="0" width="3" height="64" fill="currentColor" rx="1" />
          </svg>

          {/* Barcode number string (matching GTIN from reference image mock) */}
          <span className="text-[13px] font-mono tracking-[0.22em] text-slate-600 font-semibold mt-1">
            8 901234 567890
          </span>
        </div>

        {/* Small eco leaf badge in corner */}
        <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M10 2C5 2 2 7 2 12C2 17 6 18 10 18C14 18 18 14 18 8C18 3 14 2 10 2ZM10 16C7.5 16 4.5 14 4.1 11C6.5 11 9 9.5 10.5 7.5C12 9.5 14.5 11 16.9 11C16.5 14 13.5 16 10 16Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
