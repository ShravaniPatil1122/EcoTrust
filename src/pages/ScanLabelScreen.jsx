import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import Button from '../components/common/Button';
import { ScanText, ArrowLeft, CheckCircle2, Shield } from 'lucide-react';

export default function ScanLabelScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 overflow-y-auto">
        {/* Header matching Reference Image Screen 4: "Scan Label" */}
        <div className="-mx-6">
          <BrandHeader
            showBack={true}
            backTo="/product/8901234567890"
            title="Scan Label"
            showLogo={false}
          />
        </div>

        {/* Center: Back-of-bottle Mockup with Highlighted Sustainability Claims */}
        <div className="space-y-4 my-auto py-2">
          <div className="relative bg-white rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 flex flex-col items-center">
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              Label Detection Preview
            </span>

            {/* Back of bottle simulation card */}
            <div className="w-full max-w-[260px] bg-[#F7FAF7] rounded-2xl p-4 border border-emerald-900/10 space-y-3">
              {/* Highlighted claims (matching Screen 4 bounding boxes) */}
              <div className="p-2 rounded-xl border border-emerald-500 bg-emerald-50/70 text-emerald-900 text-xs font-semibold flex items-center justify-between">
                <span>Natural ingredients</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>

              <div className="p-2 rounded-xl border border-emerald-500 bg-emerald-50/70 text-emerald-900 text-xs font-semibold flex items-center justify-between">
                <span>Eco-friendly packaging</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>

              <div className="p-2 rounded-xl border border-emerald-500 bg-emerald-50/70 text-emerald-900 text-xs font-semibold flex items-center justify-between">
                <span>Sustainably sourced</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>

              {/* Certification badges mock */}
              <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-200/60 text-slate-700">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border border-slate-400 flex items-center justify-center text-[8px] font-bold">
                    ECO<br/>CERT
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border border-slate-400 flex items-center justify-center text-[8px] font-bold">
                    FSC
                  </div>
                </div>
              </div>

              {/* Ingredients text */}
              <p className="text-[10px] text-slate-400 leading-tight pt-1">
                Ingredients: Aqua, Sodium Coco-Sulfate, Cocamidopropyl Betaine, Glycerin, Aloe Barbadensis Leaf Juice...
              </p>
            </div>
          </div>

          {/* OCR Extracted Card (matching bottom card of Screen 4 in reference image) */}
          <div className="bg-[#EBF7EE] rounded-2xl p-4 border border-emerald-200 flex items-start gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-white text-emerald-700 border border-emerald-300 flex items-center justify-center flex-shrink-0 shadow-xs">
              <ScanText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-[#0F291E]">
                OCR Extracted
              </h4>
              <p className="text-[12px] text-emerald-900/80 mt-0.5 leading-snug">
                Claims, ingredients & certification text detected.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Button: Proceed to Verification Results */}
        <div className="w-full pt-4 space-y-2">
          <Button
            onClick={() => navigate('/verification-results', { state: { barcode: product?.gtin || '8901234567890' } })}
            variant="primary"
            showArrow={true}
          >
            Verify Claims
          </Button>
          <button
            onClick={() => navigate('/ready-to-scan')}
            className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            Scan Another Product
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
