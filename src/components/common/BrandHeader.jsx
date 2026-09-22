import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function BrandHeader({
  showBack = false,
  backTo = null,
  onBack = null,
  title = null,
  showLogo = true,
  rightAction = null,
  isDark = false,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="w-full px-5 py-3 flex items-center justify-between select-none relative z-30">
      {/* Left section: Back button or spacer */}
      <div className="w-10 flex items-center">
        {showBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className={`w-10 h-10 -ml-2 rounded-full flex items-center justify-center transition-colors cursor-pointer active:scale-95 ${
              isDark
                ? 'text-white hover:bg-white/10 active:bg-white/20'
                : 'text-slate-700 hover:bg-slate-200/60 active:bg-slate-200'
            }`}
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.4]" />
          </button>
        )}
      </div>

      {/* Center: Brand Logo or Title */}
      <div className="flex-1 flex justify-center items-center">
        {title ? (
          <h1
            className={`text-[17px] font-bold tracking-tight text-center ${
              isDark ? 'text-white' : 'text-[#0F291E]'
            }`}
          >
            {title}
          </h1>
        ) : showLogo ? (
          <BrandLogo showTagline={false} size="default" />
        ) : null}
      </div>

      {/* Right action or spacer to keep center balanced */}
      <div className="w-10 flex items-center justify-end">
        {rightAction || <div className="w-6" />}
      </div>
    </header>
  );
}
