import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import Button from '../components/common/Button';
import HerbalShampooIllustration from '../components/illustrations/HerbalShampooIllustration';
import { getProductByBarcode } from '../data/products';
import { Package, AlertCircle } from 'lucide-react';

export default function ProductFoundScreen() {
  const navigate = useNavigate();
  const { barcode } = useParams();
  const location = useLocation();

  // Get barcode from URL param or location state
  const activeBarcode = barcode || location.state?.barcode || '8901234567890';
  const product = getProductByBarcode(activeBarcode);

  const handleNextScanLabel = () => {
    navigate('/scan-label', {
      state: { product, barcode: activeBarcode, from: `/product/${activeBarcode}` },
    });
  };

  const handleBackToScan = () => {
    navigate('/ready-to-scan');
  };

  // If barcode is not in local database, render "Product Not Found" state
  if (!product) {
    return (
      <MobileContainer showStatusBar={true} theme="light">
        <div className="flex-1 flex flex-col justify-between px-6 pb-8">
          <div className="-mx-6">
            <BrandHeader
              showBack={true}
              backTo="/ready-to-scan"
              title="Product Lookup"
              showLogo={false}
            />
          </div>

          <div className="my-auto flex flex-col items-center text-center px-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 stroke-[2.2]" />
            </div>

            <h2 className="text-[22px] font-bold text-[#0F291E]">
              Product Not Found
            </h2>

            <p className="text-[14.5px] text-slate-500 max-w-[280px] leading-relaxed">
              This product isn't available in our demo database yet.
            </p>

            <div className="bg-slate-100 rounded-xl px-4 py-2 text-xs font-mono text-slate-700">
              Scanned Barcode: <strong>{activeBarcode}</strong>
            </div>
          </div>

          <div className="w-full space-y-3">
            <Button onClick={handleBackToScan} variant="primary" showArrow={false}>
              Try Again
            </Button>
          </div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 overflow-y-auto">
        {/* Header matching Reference Image Screen 3: "Product Found" */}
        <div className="-mx-6">
          <BrandHeader
            showBack={true}
            backTo="/ready-to-scan"
            title="Product Found"
            showLogo={false}
          />
        </div>

        {/* Content Container */}
        <div className="space-y-4 my-auto py-2">
          {/* Main Product Card (matching Screen 3 layout) */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 flex items-center gap-4">
            {/* Left: Product Bottle Visual */}
            <div className="w-24 h-40 flex-shrink-0 flex items-center justify-center bg-[#F7F9F7] rounded-2xl p-2 border border-slate-100">
              <HerbalShampooIllustration className="w-20 h-36" />
            </div>

            {/* Right: Product Metadata */}
            <div className="flex-1 min-w-0 space-y-2 text-left">
              <div>
                <h2 className="text-[19px] font-bold text-[#0F291E] leading-tight truncate">
                  {product.name}
                </h2>
                <p className="text-[13px] text-slate-500 font-medium">
                  {product.brand}
                </p>
              </div>

              <div className="space-y-1.5 text-[12.5px] pt-1">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">
                    GTIN (Barcode)
                  </span>
                  <span className="font-mono font-bold text-[#0F291E] text-[13px]">
                    {product.gtin}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">
                    Brand
                  </span>
                  <span className="text-slate-700 font-medium">
                    {product.brand}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">
                    Category
                  </span>
                  <span className="text-slate-700 font-medium truncate block">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information Card (matching Screen 3 bottom card) */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 text-left space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#16803D] border border-emerald-200/70 flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h3 className="text-[15px] font-bold text-[#0F291E]">
                Product Information
              </h3>
            </div>

            <ul className="space-y-1.5 text-[13.5px] text-slate-600 pl-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                <span>{product.name}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                <span>{product.size}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                <span>{product.brand}</span>
              </li>
            </ul>

            <p className="text-xs text-slate-500 pt-1 border-t border-slate-100 italic leading-relaxed">
              "{product.description}"
            </p>
          </div>
        </div>

        {/* Action Button: "Verify This Product" */}
        <div className="w-full pt-4 space-y-2">
          <Button
            onClick={() => navigate('/verification-results', { state: { barcode: activeBarcode } })}
            variant="primary"
            showArrow={true}
          >
            Verify This Product
          </Button>
          <button
            onClick={handleNextScanLabel}
            type="button"
            className="w-full py-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Preview Physical Label OCR →
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
