import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import Button from '../components/common/Button';
import HerbalShampooIllustration from '../components/illustrations/HerbalShampooIllustration';
import { getProductByBarcode } from '../data/products';
import {
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Leaf,
  Award,
  Recycle,
} from 'lucide-react';

export default function VerificationResultsScreen() {
  const navigate = useNavigate();
  const { barcode } = useParams();
  const location = useLocation();

  const activeBarcode = barcode || location.state?.barcode || '8901234567890';
  const product = getProductByBarcode(activeBarcode);

  // Animated ring state
  const [animatedOffset, setAnimatedOffset] = useState(301.6);
  const score = product?.score || 85;
  const radius = 48;
  const circumference = 2 * Math.PI * radius; // ~301.59

  useEffect(() => {
    // Animate circular progress ring smoothly on mount
    const timer = setTimeout(() => {
      const targetOffset = circumference * (1 - score / 100);
      setAnimatedOffset(targetOffset);
    }, 150);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  if (!product) {
    return (
      <MobileContainer showStatusBar={true} theme="light">
        <div className="flex-1 flex flex-col justify-between px-6 pb-8">
          <BrandHeader showBack={true} backTo="/ready-to-scan" title="Verification" />
          <div className="my-auto text-center space-y-3">
            <h2 className="text-xl font-bold text-slate-800">Product Not Found</h2>
            <p className="text-sm text-slate-500">Could not retrieve verification records.</p>
          </div>
          <Button onClick={() => navigate('/ready-to-scan')}>Back to Scan</Button>
        </div>
      </MobileContainer>
    );
  }

  // Four verification categories for the central dashboard
  const verificationCategories = [
    {
      id: 'ingredients',
      title: 'Natural Ingredients',
      status: 'verified',
      badgeText: '✓ Verified',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      description: '100% Plant & Mineral Derived',
      ctaText: 'View verification',
      ctaColor: 'text-emerald-700',
      icon: Leaf,
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      route: '/ingredients',
      routeState: { barcode: activeBarcode },
    },
    {
      id: 'certifications',
      title: 'Certifications',
      status: 'verified',
      badgeText: '✓ Verified',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      description: 'ECOCERT — Valid till 2027',
      ctaText: 'View verification',
      ctaColor: 'text-emerald-700',
      icon: Award,
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      route: '/certification-details',
      routeState: { barcode: activeBarcode, certId: 'ecocert' },
    },
    {
      id: 'packaging',
      title: 'Packaging',
      status: 'verified',
      badgeText: '✓ Verified',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      description: '75% Recyclable',
      ctaText: 'View verification',
      ctaColor: 'text-emerald-700',
      icon: Recycle,
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      route: '/packaging',
      routeState: { barcode: activeBarcode },
    },
    {
      id: 'other-claims',
      title: 'Other Claims',
      status: 'review',
      badgeText: '⚠ Needs Review',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      description: 'Some claims need additional evidence',
      ctaText: 'View details',
      ctaColor: 'text-amber-800',
      icon: AlertTriangle,
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
      route: '/other-claims',
      routeState: { barcode: activeBarcode },
    },
  ];

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 overflow-y-auto">
        {/* Header */}
        <div className="-mx-6">
          <BrandHeader
            showBack={true}
            backTo={`/product/${activeBarcode}`}
            title="Verification Dashboard"
            showLogo={false}
          />
        </div>

        <div className="space-y-4 my-auto py-2 text-left">
          {/* Top Product Mini Header */}
          <div className="bg-white rounded-2xl p-3.5 shadow-2xs border border-slate-200/80 flex items-center gap-3.5">
            <div className="w-10 h-14 bg-[#F5F8F5] rounded-xl flex items-center justify-center p-1 border border-slate-100 flex-shrink-0">
              <HerbalShampooIllustration className="w-8 h-12" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-[16px] text-[#0F291E] truncate">
                {product.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {product.brand} · {product.size}
              </p>
            </div>
          </div>

          {/* Overall Verification Score Card with Animated Ring */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 flex items-center gap-5">
            {/* Circular Progress Ring */}
            <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="9"
                />
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  fill="none"
                  stroke="#16803D"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={circumference.toFixed(1)}
                  strokeDashoffset={animatedOffset}
                  style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[26px] font-extrabold text-[#16803D] leading-none">
                  {score}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
                  out of 100
                </span>
              </div>
            </div>

            {/* Score Text */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wide">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>{product.grade?.label || 'Well-backed'}</span>
              </div>
              <h3 className="text-[17px] font-bold text-[#0F291E] leading-tight">
                Authenticity Verified
              </h3>
              <p className="text-[12.5px] text-slate-500 leading-snug">
                {product.grade?.summary || 'Claims substantiated against verification standards.'}
              </p>
            </div>
          </div>

          {/* Verification Areas Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[14px] font-bold text-[#0F291E]">
                Verification Areas
              </h3>
              <span className="text-[11px] font-medium text-slate-400">
                Tap to inspect details
              </span>
            </div>

            {/* 4 Separate Tappable Verification Cards */}
            <div className="space-y-2.5">
              {verificationCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.id}
                    onClick={() =>
                      navigate(category.route, { state: category.routeState })
                    }
                    className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer group space-y-2"
                  >
                    {/* Top Row: Icon, Title & Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 ${category.iconBg}`}
                        >
                          <IconComponent className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <h4 className="font-bold text-[14.5px] text-[#0F291E] group-hover:text-emerald-800 transition-colors">
                          {category.title}
                        </h4>
                      </div>

                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${category.badgeClass}`}
                      >
                        {category.badgeText}
                      </span>
                    </div>

                    {/* Middle: Description */}
                    <p className="text-[13px] text-slate-600 pl-10 leading-snug font-medium">
                      {category.description}
                    </p>

                    {/* Bottom Row: CTA Link */}
                    <div className="pl-10 pt-1 flex items-center justify-between border-t border-slate-50">
                      <span
                        className={`text-xs font-semibold flex items-center gap-1 ${category.ctaColor}`}
                      >
                        <span>{category.ctaText}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Button: Scan Another Product */}
        <div className="w-full pt-4 space-y-2">
          <Button
            onClick={() => navigate('/ready-to-scan')}
            variant="primary"
            showArrow={false}
          >
            Scan Another Product
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
}
