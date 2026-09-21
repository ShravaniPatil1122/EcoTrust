import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import Button from '../components/common/Button';
import { getProductByBarcode } from '../data/products';
import {
  Leaf,
  Recycle,
  Droplets,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export default function SustainabilityReportScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeBarcode = location.state?.barcode || '8901234567890';
  const product = getProductByBarcode(activeBarcode);

  const handleToIngredients = () => {
    navigate('/ingredients', { state: { barcode: activeBarcode } });
  };

  const handleBack = () => {
    navigate('/verification-results', { state: { barcode: activeBarcode } });
  };

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 overflow-y-auto">
        {/* Header */}
        <div className="-mx-6">
          <BrandHeader
            showBack={true}
            backTo="/verification-results"
            title="Sustainability Report"
            showLogo={false}
          />
        </div>

        <div className="space-y-4 my-auto py-2 text-left">
          {/* Top Overall Rating Banner */}
          <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-5 shadow-lg space-y-2 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Full Life-Cycle Assessment
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 font-bold">
                Score: {product?.score || 85}/100
              </span>
            </div>
            <h2 className="text-[20px] font-bold tracking-tight">
              {product?.name || 'Herbal Shampoo'}
            </h2>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Independently verified metrics based on packaging materials, ingredient origins, and carbon stewardship.
            </p>
          </div>

          {/* Key Impact Pillar Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Metric 1: Recyclability */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs space-y-1">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Recycle className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-400 font-semibold block">
                Packaging
              </span>
              <span className="text-[17px] font-bold text-[#0F291E] block leading-tight">
                75% Recyclable
              </span>
              <p className="text-[11px] text-slate-500 leading-tight">
                HDPE bottle body with FSC certified box.
              </p>
            </div>

            {/* Metric 2: Formula Safety */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs space-y-1">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Droplets className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-400 font-semibold block">
                Biodegradability
              </span>
              <span className="text-[17px] font-bold text-[#0F291E] block leading-tight">
                94% OECD 301B
              </span>
              <p className="text-[11px] text-slate-500 leading-tight">
                Rapid aquatic degradation rate.
              </p>
            </div>
          </div>

          {/* Featured Ingredients Card (Links to Screen 3) */}
          <button
            onClick={handleToIngredients}
            type="button"
            className="w-full text-left bg-gradient-to-r from-emerald-50 to-teal-50/60 rounded-3xl p-4 border border-emerald-200/80 shadow-xs flex items-center justify-between hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                <Leaf className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    Ingredient Breakdown
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <h3 className="font-bold text-[15px] text-[#0F291E]">
                  Natural / Plant-derived Ingredients
                </h3>
                <p className="text-xs text-slate-500 leading-snug">
                  5 of 5 ingredients categorized: 100% plant & mineral derived.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-emerald-700 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Verified Eco Alternatives Section */}
          <div className="space-y-2 pt-1">
            <h3 className="text-[14px] font-bold text-[#0F291E] px-1">
              Top-Rated Eco Alternatives
            </h3>

            {product?.alternatives?.map((alt) => (
              <div
                key={alt.gtin}
                className="bg-white rounded-2xl p-3.5 border border-slate-200/80 flex items-center justify-between shadow-xs"
              >
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[14px] text-[#0F291E]">
                    {alt.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {alt.brand} · {alt.size}
                  </p>
                  <span className="text-[11px] font-medium text-emerald-700 block">
                    ★ {alt.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center">
                    {alt.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button: Navigate to Natural Ingredients */}
        <div className="w-full pt-4 space-y-2">
          <Button onClick={handleToIngredients} variant="primary" showArrow={true}>
            Natural / Plant-derived Ingredients
          </Button>
          <button
            onClick={handleBack}
            className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            ← Back to Verification Results
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
