import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import Button from '../components/common/Button';
import { getProductByBarcode } from '../data/products';
import {
  CheckCircle2,
  Sparkles,
  Leaf,
  Award,
  Recycle,
  ShieldCheck,
} from 'lucide-react';

export default function SustainabilityJourneyScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeBarcode = location.state?.barcode || '8901234567890';
  const product = getProductByBarcode(activeBarcode);

  const handleScanAnother = () => {
    navigate('/ready-to-scan');
  };

  const handleBack = () => {
    navigate('/other-claims', { state: { barcode: activeBarcode } });
  };

  const handleReviewResults = () => {
    navigate('/verification-results', { state: { barcode: activeBarcode } });
  };

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 overflow-y-auto">
        {/* Header */}
        <div className="-mx-6">
          <BrandHeader
            showBack={true}
            onBack={handleBack}
            backTo="/other-claims"
            title="Sustainability Journey"
            showLogo={false}
          />
        </div>

        <div className="space-y-4 my-auto py-2 text-left">
          {/* Positive Completion Message Banner */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 stroke-[2.4]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verification Complete</span>
              </div>
              <h2 className="text-[21px] font-bold text-[#0F291E] tracking-tight">
                Product Journey Finished
              </h2>
              <p className="text-[13px] text-slate-500 max-w-[280px] mx-auto leading-relaxed mt-1">
                You've audited <strong className="text-slate-800 font-semibold">{product?.name || 'Herbal Shampoo'}</strong> against verified environmental and cosmetic standards.
              </p>
            </div>
          </div>

          {/* Verified Findings Summary Card */}
          <div className="space-y-2.5">
            <h3 className="text-[14px] font-bold text-[#0F291E] px-1">
              Verified Findings Summary
            </h3>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
              {/* Product Header & Score */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-5 h-5 text-emerald-700 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-[#0F291E]">
                      {product?.name || 'Herbal Shampoo'}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium">
                      {product?.brand || 'XYZ Naturals'} · {product?.size || '250 ml'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[17px] font-extrabold text-[#16803D] block leading-none">
                    {product?.score || 85}/100
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">
                    {product?.grade?.label || 'Well-backed'}
                  </span>
                </div>
              </div>

              {/* Checklist Breakdown */}
              <div className="space-y-2 text-xs divide-y divide-slate-50">
                <div className="flex items-center justify-between text-slate-700 pt-1">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    Certifications
                  </span>
                  <span className="font-semibold text-[#0F291E]">
                    ECOCERT & FSC Verified
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-700 pt-2">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    Ingredients
                  </span>
                  <span className="font-semibold text-[#0F291E]">
                    100% Plant & Mineral Derived
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-700 pt-2">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Recycle className="w-3.5 h-3.5 text-emerald-600" />
                    Packaging
                  </span>
                  <span className="font-semibold text-[#0F291E]">
                    75% Recyclable (HDPE + FSC)
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-700 pt-2">
                  <span className="flex items-center gap-2 text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Claims Checked
                  </span>
                  <span className="font-semibold text-[#0F291E]">
                    All Claims Substantiated
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shopper Assurance Note */}
          <div className="bg-[#EBF7EE] rounded-2xl p-3.5 border border-emerald-200/80 flex items-start gap-3 text-left">
            <div className="w-7 h-7 rounded-xl bg-white text-emerald-700 border border-emerald-300 flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
              <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
            </div>
            <p className="text-[12px] text-emerald-950 font-medium leading-relaxed">
              Every verified record on EcoTrust helps you make cleaner, greenwash-free shopping decisions.
            </p>
          </div>
        </div>

        {/* Primary CTA: Scan Another Product */}
        <div className="w-full pt-4 space-y-2">
          <Button onClick={handleScanAnother} variant="primary" showArrow={false}>
            Scan Another Product
          </Button>
          <button
            type="button"
            onClick={handleReviewResults}
            className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            ← Review Full Verification Results
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
