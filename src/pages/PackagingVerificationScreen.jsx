import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import Button from '../components/common/Button';
import { getProductByBarcode } from '../data/products';
import {
  CheckCircle2,
  Recycle,
  Check,
  Layers,
} from 'lucide-react';

export default function PackagingVerificationScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeBarcode = location.state?.barcode || '8901234567890';
  const product = getProductByBarcode(activeBarcode);

  const handleBack = () => {
    navigate('/verification-results', { state: { barcode: activeBarcode } });
  };

  const compositionItems = [
    { name: 'HDPE bottle', description: 'Curbside recyclable high-density polyethylene container body' },
    { name: 'FSC-certified packaging component', description: 'Forest Stewardship Council certified outer carton materials' },
  ];

  const verificationChecks = [
    { id: 1, label: 'Packaging material identified', passed: true },
    { id: 2, label: 'Recyclability information checked', passed: true },
    { id: 3, label: 'FSC certification verified', passed: true },
    { id: 4, label: 'Packaging claim supported', passed: true },
  ];

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 overflow-y-auto">
        {/* Header */}
        <div className="-mx-6">
          <BrandHeader
            showBack={true}
            onBack={handleBack}
            backTo={`/verification-results/${activeBarcode}`}
            title="Packaging Verification"
            showLogo={false}
          />
        </div>

        <div className="space-y-4 my-auto py-2 text-left">
          {/* Main Packaging Card */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Recycle className="w-7 h-7 stroke-[2.2]" />
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-[#0F291E] leading-tight">
                    {product?.name || 'Herbal Shampoo'}
                  </h2>
                  <p className="text-[13px] text-slate-500 font-medium mt-0.5">
                    {product?.brand || 'XYZ Naturals'}
                  </p>
                </div>
              </div>

              {/* Green Verified Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex-shrink-0 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>VERIFIED</span>
              </span>
            </div>

            {/* Recyclability Highlight */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Recyclability Rate
                </span>
                <span className="text-[22px] font-extrabold text-[#16803D] leading-tight">
                  75% Recyclable
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  FSC & HDPE
                </span>
              </div>
            </div>
          </div>

          {/* Section: Packaging Composition */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 px-1">
              <Layers className="w-4 h-4 text-emerald-700" />
              <h3 className="text-[15px] font-bold text-[#0F291E]">
                Packaging Composition
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2.5">
              {compositionItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-[13.5px] font-bold text-[#0F291E]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 leading-snug mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Verification Checks */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[15px] font-bold text-[#0F291E]">
                Verification Checks
              </h3>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                4 of 4 Passed
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
              {verificationChecks.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                    </div>
                    <span className="text-[13.5px] font-medium text-slate-700 leading-snug">
                      {item.label}
                    </span>
                  </div>

                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold flex-shrink-0">
                    Yes
                  </span>
                </div>
              ))}
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
