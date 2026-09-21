import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import Button from '../components/common/Button';
import HerbalShampooIllustration from '../components/illustrations/HerbalShampooIllustration';
import { getProductByBarcode } from '../data/products';
import {
  CheckCircle2,
  AlertTriangle,
  Award,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Sparkles,
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

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 overflow-y-auto">
        {/* Header */}
        <div className="-mx-6">
          <BrandHeader
            showBack={true}
            backTo={`/product/${activeBarcode}`}
            title="Verification Results"
            showLogo={false}
          />
        </div>

        <div className="space-y-4 my-auto py-2">
          {/* Top Product Mini Header */}
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80 flex items-center gap-3.5">
            <div className="w-10 h-14 bg-[#F5F8F5] rounded-xl flex items-center justify-center p-1 border border-slate-100 flex-shrink-0">
              <HerbalShampooIllustration className="w-8 h-12" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[15px] text-[#0F291E] truncate">
                {product.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {product.brand} · {product.size}
              </p>
            </div>
          </div>

          {/* Verification Score Card with Animated Ring */}
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
              <h2 className="text-[17px] font-bold text-[#0F291E] leading-tight">
                Authenticity Verified
              </h2>
              <p className="text-[12.5px] text-slate-500 leading-snug">
                {product.grade?.summary || 'Claims substantiated against verification standards.'}
              </p>
            </div>
          </div>

          {/* Claims on the Label Section */}
          <div className="space-y-2.5 text-left">
            <h3 className="text-[14px] font-bold text-[#0F291E] px-1">
              Claims on the Label
            </h3>

            <div className="space-y-2">
              {product.claims?.map((claim) => {
                const isBacked = claim.verdict === 'backed';
                return (
                  <div
                    key={claim.id}
                    className="bg-white rounded-2xl p-3.5 border border-slate-200/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[14px] text-[#0F291E]">
                        {claim.phrase}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isBacked
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isBacked ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{claim.verdictLabel}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {claim.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Marks & Certifications Section */}
          <div className="space-y-2.5 text-left">
            <h3 className="text-[14px] font-bold text-[#0F291E] px-1">
              Marks & Certifications
            </h3>

            <div className="space-y-2">
              {product.certifications?.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200/80 flex items-start gap-3"
                >
                  {/* Round Seal Icon */}
                  <div className="w-10 h-10 rounded-full border-2 border-slate-700 text-slate-800 flex items-center justify-center text-[9px] font-extrabold text-center flex-shrink-0 leading-tight">
                    {cert.name}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[14px] text-[#0F291E]">
                        {cert.name}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10.5px] font-bold border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>{cert.statusLabel}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">
                      {cert.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button: Navigate to Sustainability Report */}
        <div className="w-full pt-4 space-y-2">
          <Button
            onClick={() => navigate('/sustainability-report', { state: { barcode: activeBarcode } })}
            variant="primary"
            showArrow={true}
          >
            View Sustainability Report
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
}
