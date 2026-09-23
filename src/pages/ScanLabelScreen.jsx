import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import Button from '../components/common/Button';
import { getProductByBarcode } from '../data/products';
import { ScanText, CheckCircle2, Upload, Sparkles } from 'lucide-react';

export default function ScanLabelScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const activeBarcode = location.state?.barcode || '8901234567890';
  const product = location.state?.product || getProductByBarcode(activeBarcode);

  const [uploadedLabelUrl, setUploadedLabelUrl] = useState(null);

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/ready-to-scan');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedLabelUrl(URL.createObjectURL(file));
    }
  };

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 overflow-y-auto">
        {/* Hidden file input for uploading label */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload label image"
        />

        {/* Header matching Reference Image Screen 4: "Scan Label" */}
        <div className="-mx-6">
          <BrandHeader
            showBack={true}
            onBack={handleBack}
            backTo={location.state?.from || '/ready-to-scan'}
            title="Scan Label"
            showLogo={false}
          />
        </div>

        {/* Center: Back-of-bottle Mockup with Highlighted Sustainability Claims */}
        <div className="space-y-4 my-auto py-2">
          <div className="relative bg-white rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-3">
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Label Detection Preview
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer bg-slate-50 hover:bg-emerald-50 px-2.5 py-1 rounded-full border border-slate-200"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
              </button>
            </div>

            {/* Back of bottle simulation card or uploaded photo preview */}
            <div className="w-full max-w-[270px] bg-[#F7FAF7] rounded-2xl p-4 border border-emerald-900/10 space-y-3">
              {uploadedLabelUrl ? (
                <div className="relative rounded-xl overflow-hidden border border-emerald-300 max-h-48 mb-2">
                  <img
                    src={uploadedLabelUrl}
                    alt="Uploaded Label"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>User Photo Analyzed</span>
                  </div>
                </div>
              ) : null}

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
                    ECO<br />CERT
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
            onClick={() =>
              navigate('/verification-results', {
                state: { barcode: product?.gtin || activeBarcode },
              })
            }
            variant="primary"
            showArrow={true}
          >
            View Verification
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
