import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandLogo from '../components/common/BrandLogo';
import GlobeLeafIllustration from '../components/illustrations/GlobeLeafIllustration';
import Button from '../components/common/Button';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/ready-to-scan');
  };

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pt-5 pb-8 relative overflow-hidden">
        {/* Subtle background botanical foliage watermark (matching bottom edges in reference image) */}
        <div className="absolute -bottom-10 -left-10 w-44 h-44 pointer-events-none opacity-[0.09] text-emerald-800 -z-0">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M10 90C10 90 20 40 60 20C90 5 95 10 95 10C95 10 100 30 70 60C40 90 10 90 10 90Z" />
            <path d="M30 95C30 95 40 60 70 45C90 35 98 40 98 40C98 40 95 60 75 80C55 100 30 95 30 95Z" />
          </svg>
        </div>
        <div className="absolute -bottom-6 -right-8 w-40 h-40 pointer-events-none opacity-[0.09] text-emerald-800 -z-0 transform scale-x-[-1]">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M10 90C10 90 20 40 60 20C90 5 95 10 95 10C95 10 100 30 70 60C40 90 10 90 10 90Z" />
          </svg>
        </div>

        {/* Top: GreenCheck Branding & Subtitle */}
        <div className="pt-2 flex flex-col items-center z-10">
          <BrandLogo showTagline={true} size="default" />
        </div>

        {/* Center: Globe & Floating Leaves Illustration */}
        <div className="my-auto py-4 flex items-center justify-center z-10">
          <GlobeLeafIllustration />
        </div>

        {/* Bottom: Headings, Supporting Text & Action Button */}
        <div className="flex flex-col items-center text-center z-10 space-y-3.5">
          {/* Main Tagline: "Real Sustainability. Not Just a Label." */}
          <h1 className="text-[27px] sm:text-[29px] font-bold text-[#0F291E] tracking-tight leading-[1.2]">
            Real Sustainability.
            <br />
            Not Just a Label.
          </h1>

          {/* Supporting Text */}
          <p className="text-[14px] sm:text-[15px] text-slate-500 font-normal leading-relaxed max-w-[270px]">
            Scan any product, check its claims, and see what’s verified.
          </p>

          {/* Action Button */}
          <div className="w-full pt-4">
            <Button onClick={handleGetStarted} variant="primary" showArrow={true}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
