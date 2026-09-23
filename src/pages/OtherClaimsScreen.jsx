import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import Button from '../components/common/Button';
import { getProductByBarcode } from '../data/products';
import {
  CheckCircle2,
  AlertTriangle,
  Recycle,
  ChevronRight,
  Leaf,
} from 'lucide-react';

export default function OtherClaimsScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeBarcode = location.state?.barcode || '8901234567890';
  const product = getProductByBarcode(activeBarcode);

  const [expandedClaim, setExpandedClaim] = useState(null);

  const handleBack = () => {
    navigate('/verification-results', { state: { barcode: activeBarcode } });
  };

  const handleViewFscDetails = () => {
    navigate('/certification-details', {
      state: { barcode: activeBarcode, certId: 'fsc' },
    });
  };

  const toggleEcoDetails = () => {
    setExpandedClaim((prev) => (prev === 'eco' ? null : 'eco'));
  };

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 overflow-y-auto">
        {/* Header */}
        <div className="-mx-6">
          <BrandHeader
            showBack={true}
            onBack={handleBack}
            backTo={`/verification-results/${activeBarcode}`}
            title="Other Claims"
            showLogo={false}
          />
        </div>

        <div className="space-y-4 my-auto py-2 text-left">
          {/* Product Reference Header */}
          <div className="bg-white rounded-2xl p-3.5 shadow-2xs border border-slate-200/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
              <Leaf className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[14px] text-[#0F291E] truncate">
                {product?.name || 'Herbal Shampoo'}
              </h3>
              <p className="text-[11.5px] text-slate-500 font-medium">
                {product?.brand || 'XYZ Naturals'} · Secondary Claims Audit
              </p>
            </div>
          </div>

          {/* Section Heading */}
          <div className="px-1">
            <h2 className="text-[15px] font-bold text-[#0F291E]">
              Substantiation Breakdown
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Independent audit of additional environmental marketing claims.
            </p>
          </div>

          {/* Claim Card 1: Sustainable Packaging */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center flex-shrink-0">
                  <Recycle className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-[#0F291E] leading-tight">
                    Sustainable Packaging
                  </h3>
                  <span className="text-[11px] text-slate-400 font-semibold block mt-0.5">
                    Materials & Packaging Claim
                  </span>
                </div>
              </div>

              {/* Green "Verified" Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex-shrink-0 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.4]" />
                <span>Verified</span>
              </span>
            </div>

            <p className="text-[13px] text-slate-600 leading-relaxed pl-1">
              FSC certification found and valid for this product.
            </p>

            <div className="pt-1 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleViewFscDetails}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer group"
              >
                <span>View details</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <span className="text-[11px] text-slate-400">
                FSC Standard Check
              </span>
            </div>
          </div>

          {/* Claim Card 2: Eco-friendly Claim */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-[#0F291E] leading-tight">
                    Eco-friendly Claim
                  </h3>
                  <span className="text-[11px] text-slate-400 font-semibold block mt-0.5">
                    Broad Environmental Term
                  </span>
                </div>
              </div>

              {/* "Not Verified" Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex-shrink-0 shadow-2xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 stroke-[2.4]" />
                <span>Not Verified</span>
              </span>
            </div>

            <p className="text-[13px] text-slate-600 leading-relaxed pl-1">
              No matching certification or evidence found.
            </p>

            {/* Expandable details note */}
            {expandedClaim === 'eco' && (
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-[12px] text-amber-950 space-y-1">
                <p className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Unsubstantiated Marketing Claim</span>
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Broad terms like "Eco-friendly" without a third-party lifecycle assessment (LCA) do not meet EcoTrust verification standards under ISO 14021 guidelines.
                </p>
              </div>
            )}

            <div className="pt-1 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={toggleEcoDetails}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-900 cursor-pointer group"
              >
                <span>{expandedClaim === 'eco' ? 'Hide details' : 'View details'}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 text-amber-700 transition-transform ${
                    expandedClaim === 'eco' ? 'rotate-90' : 'group-hover:translate-x-0.5'
                  }`}
                />
              </button>
              <span className="text-[11px] text-slate-400">
                Greenwash Risk Alert
              </span>
            </div>
          </div>
        </div>

        {/* Action Button: Return to Dashboard */}
        <div className="w-full pt-4 space-y-2">
          <Button onClick={handleBack} variant="primary" showArrow={false}>
            Back to Verification Results
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
}
