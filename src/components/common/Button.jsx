import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  showArrow = true,
  disabled = false,
  className = '',
}) {
  const baseClasses =
    'relative w-full h-[52px] sm:h-[54px] rounded-full font-semibold text-[16px] tracking-wide flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer select-none active:scale-[0.985]';

  const variants = {
    primary:
      'bg-[#16803D] hover:bg-[#157337] active:bg-[#14532D] text-white shadow-md shadow-emerald-900/10 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'bg-emerald-50 hover:bg-emerald-100 text-[#166534] border border-emerald-200/80 active:bg-emerald-200/60',
    outline:
      'bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-300 active:bg-slate-200',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          className="w-[18px] h-[18px] stroke-[2.4] transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
