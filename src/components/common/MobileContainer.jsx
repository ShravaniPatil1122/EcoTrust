import React from 'react';

export default function MobileContainer({
  children,
  className = '',
  showStatusBar = true,
  theme = 'light',
}) {
  const isDark = theme === 'dark';

  return (
    <div className="w-full min-h-screen bg-[#F0F4F0] flex justify-center items-start sm:py-6">
      {/* 
        Mobile-first natural application frame.
        Centers smoothly on desktop without an artificial bulky hardware device bezel.
        Fills 100% width on mobile screens.
      */}
      <div
        className={`w-full max-w-[430px] min-h-screen sm:min-h-[844px] sm:max-h-[920px] sm:rounded-[36px] flex flex-col relative overflow-hidden transition-colors duration-200 ${
          isDark
            ? 'bg-[#0F172A] text-white shadow-2xl sm:shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
            : 'bg-[#F8FAF8] text-[#0F291E] shadow-xl sm:shadow-[0_12px_40px_rgba(22,101,52,0.06)] sm:border sm:border-emerald-900/5'
        } ${className}`}
      >
        {/* Subtle iOS-style status bar for natural mobile feel */}
        {showStatusBar && (
          <div
            className={`w-full px-7 pt-3.5 pb-1 flex justify-between items-center text-[13px] font-semibold tracking-tight select-none z-20 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              {/* Cellular signal */}
              <svg className="w-4 h-3.5 fill-current" viewBox="0 0 16 12">
                <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
                <rect x="4" y="5.5" width="2.5" height="6.5" rx="0.5" />
                <rect x="8" y="3" width="2.5" height="9" rx="0.5" />
                <rect x="12" y="0.5" width="2.5" height="11.5" rx="0.5" />
              </svg>
              {/* Wifi */}
              <svg className="w-4 h-3.5 fill-current" viewBox="0 0 16 12">
                <path d="M8 2.5C10.7 2.5 13.1 3.6 14.9 5.3L16 4.1C13.9 2.1 11.1 0.9 8 0.9C4.9 0.9 2.1 2.1 0 4.1L1.1 5.3C2.9 3.6 5.3 2.5 8 2.5ZM8 6.2C9.7 6.2 11.3 6.9 12.5 8L13.6 6.8C12.1 5.4 10.2 4.6 8 4.6C5.8 4.6 3.9 5.4 2.4 6.8L3.5 8C4.7 6.9 6.3 6.2 8 6.2ZM8 9.9C8.8 9.9 9.6 10.2 10.2 10.8L8 13L5.8 10.8C6.4 10.2 7.2 9.9 8 9.9Z" />
              </svg>
              {/* Battery */}
              <div className="w-5 h-2.5 border border-current rounded-[3px] p-[1px] flex items-center">
                <div className="h-full w-3.5 bg-current rounded-[1.5px]" />
              </div>
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div className="flex-1 flex flex-col relative z-10">{children}</div>

        {/* Home indicator bar at bottom */}
        <div className="w-full flex justify-center pb-2 pt-1 select-none z-20">
          <div
            className={`w-32 h-1 rounded-full ${
              isDark ? 'bg-slate-700' : 'bg-slate-300'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
