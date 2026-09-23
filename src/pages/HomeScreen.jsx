import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandLogo from '../components/common/BrandLogo';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import {
  Camera,
  Upload,
  User,
  Scan,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayName = user?.name || 'Shravani';

  const handleScanProduct = () => {
    navigate('/ready-to-scan');
  };

  const handleUploadLabel = () => {
    // Navigate to existing label upload / OCR preview
    navigate('/scan-label', {
      state: { barcode: '8901234567890' },
    });
  };

  const handleGoProfile = () => {
    navigate('/profile');
  };

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pt-4 pb-8 overflow-y-auto text-left">
        {/* Custom Home Header */}
        <header className="w-full flex items-center justify-between pb-3 border-b border-slate-200/60 select-none">
          {/* Brand Logo on Left */}
          <div className="flex items-center">
            <BrandLogo showTagline={false} size="default" />
          </div>

          {/* Profile Icon on Right */}
          <button
            onClick={handleGoProfile}
            type="button"
            aria-label="User Profile"
            className="w-10 h-10 rounded-full bg-emerald-100/80 hover:bg-emerald-200/90 text-emerald-800 border border-emerald-300/80 flex items-center justify-center font-bold text-sm shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            {displayName.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
          </button>
        </header>

        <div className="space-y-6 my-auto py-2">
          {/* Welcome Greeting Banner */}
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verify before you trust</span>
            </div>
            <h1 className="text-[27px] font-extrabold text-[#0F291E] tracking-tight leading-tight">
              Welcome back 👋
            </h1>
            <p className="text-[14px] text-slate-500 leading-relaxed">
              Check the evidence behind sustainability claims.
            </p>
          </div>

          {/* Action Box: Primary [ Scan a Product ] & Secondary [ Upload Label ] */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_8px_30px_rgba(22,101,52,0.06)] space-y-4 text-center">
            {/* Primary Action */}
            <div className="space-y-2">
              <Button
                onClick={handleScanProduct}
                variant="primary"
                showArrow={true}
                className="h-[54px] text-[16px] font-bold shadow-md gap-2"
              >
                <Camera className="w-5 h-5 stroke-[2.2]" />
                <span>Scan a Product</span>
              </Button>
            </div>

            {/* Secondary Alternative */}
            <div className="pt-2 border-t border-slate-100 flex flex-col items-center">
              <span className="text-[12px] text-slate-500 font-medium">
                Have a product label instead?
              </span>
              <button
                onClick={handleUploadLabel}
                type="button"
                className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-700 hover:text-emerald-900 py-1 px-3 rounded-full hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4 stroke-[2.2]" />
                <span>Upload Label</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* How EcoTrust Works Section (Compact 3-Step: Scan -> Verify -> Understand) */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[13.5px] font-bold text-[#0F291E]">
                How EcoTrust Works
              </h3>
              <span className="text-[11px] font-semibold text-emerald-700">
                3 Simple Steps
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Step 1: Scan */}
              <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <Scan className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-[11.5px] font-extrabold text-[#0F291E] block">
                  1. Scan
                </span>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Barcode or label
                </p>
              </div>

              {/* Step 2: Verify */}
              <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-[11.5px] font-extrabold text-[#0F291E] block">
                  2. Verify
                </span>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Audit registry records
                </p>
              </div>

              {/* Step 3: Understand */}
              <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-[11.5px] font-extrabold text-[#0F291E] block">
                  3. Understand
                </span>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Clear claim breakdown
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info pill */}
        <div className="pt-2 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            EcoTrust · Verify before you trust
          </p>
        </div>
      </div>
    </MobileContainer>
  );
}
