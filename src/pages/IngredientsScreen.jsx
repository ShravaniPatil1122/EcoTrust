import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import Button from '../components/common/Button';
import { getProductByBarcode } from '../data/products';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Leaf,
  Info,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';

export default function IngredientsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeBarcode = location.state?.barcode || '8901234567890';
  const product = getProductByBarcode(activeBarcode);

  const handleBack = () => {
    navigate('/sustainability-report', { state: { barcode: activeBarcode } });
  };

  const handleScanAnother = () => {
    navigate('/ready-to-scan');
  };

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 overflow-y-auto">
        {/* Header */}
        <div className="-mx-6">
          <BrandHeader
            showBack={true}
            backTo="/sustainability-report"
            title="Natural Ingredients"
            showLogo={false}
          />
        </div>

        <div className="space-y-4 my-auto py-2 text-left">
          {/* Top Ingredients Summary Banner */}
          <div className="bg-white rounded-3xl p-5 border border-emerald-900/10 shadow-[0_4px_25px_rgba(22,101,52,0.05)] space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full Botanical Formula Transparency</span>
            </div>
            <h2 className="text-[20px] font-bold text-[#0F291E] leading-tight">
              Natural & Plant-Derived
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every ingredient in <strong>{product?.name || 'Herbal Shampoo'}</strong> has been audited against international cosmetic safety and sustainability registries.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ✓ 0 Synthetics
              </span>
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ✓ 0 Parabens
              </span>
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ✓ 100% Cruelty-Free
              </span>
            </div>
          </div>

          {/* Classification Legend (matching Kshitija's style) */}
          <div className="bg-[#F6FBF8] rounded-2xl p-3 border border-emerald-100 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Origin Key
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16803D]" />
                <span>Plant or Mineral</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                <span>Made from Natural Sources</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
                <span>Synthetic (0)</span>
              </div>
            </div>
          </div>

          {/* Ingredients Breakdown List */}
          <div className="space-y-2.5">
            <h3 className="text-[14px] font-bold text-[#0F291E] px-1">
              Ingredients in this Formula
            </h3>

            <div className="space-y-2.5">
              {product?.ingredients?.map((ing, idx) => {
                const isNatural = ing.cls === 'natural';
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                            isNatural ? 'bg-[#16803D]' : 'bg-[#0284C7]'
                          }`}
                        />
                        <h4 className="font-bold text-[14px] text-[#0F291E]">
                          {ing.name}
                        </h4>
                      </div>
                      <span
                        className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full border ${
                          isNatural
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-sky-50 text-sky-800 border-sky-200'
                        }`}
                      >
                        {ing.typeLabel}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 pl-4 space-y-0.5">
                      <p>
                        <span className="font-semibold text-slate-600">Source:</span>{' '}
                        {ing.origin}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-600">Purpose:</span>{' '}
                        {ing.purpose}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full pt-4 space-y-2">
          <Button onClick={handleScanAnother} variant="primary" showArrow={false}>
            Scan Another Product
          </Button>
          <button
            onClick={handleBack}
            className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sustainability Report</span>
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
