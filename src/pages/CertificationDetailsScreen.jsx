import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import Button from '../components/common/Button';
import { getProductByBarcode } from '../data/products';
import {
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Check,
} from 'lucide-react';

export default function CertificationDetailsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { certId: paramCertId } = useParams();

  // Retrieve state or default to demo Herbal Shampoo & ECOCERT
  const activeBarcode = location.state?.barcode || '8901234567890';
  const activeCertId = location.state?.certId || paramCertId || 'ecocert';
  const product = getProductByBarcode(activeBarcode);

  // Look up certification in product or fall back to default ECOCERT details
  const matchedCert = product?.certifications?.find(
    (c) => c.id.toLowerCase() === activeCertId.toLowerCase()
  );

  const certData = {
    name: matchedCert?.name || 'ECOCERT',
    standard: matchedCert?.standard || 'Organic & Natural Cosmetics',
    statusBadge: matchedCert?.statusBadge || 'Valid',
    validTill: matchedCert?.validTill || '2027',
    supportNote:
      matchedCert?.supportNote ||
      'This certification supports natural and organic claims for cosmetics.',
    brand: product?.brand || 'XYZ Naturals',
    productName: product?.name || 'Herbal Shampoo',
  };

  const verificationChecks = [
    { id: 1, label: 'Certificate body exists', passed: true },
    { id: 2, label: 'Credible / trusted', passed: true },
    { id: 3, label: 'Certificate exists', passed: true },
    { id: 4, label: 'Valid (not expired)', passed: true },
    { id: 5, label: 'Applies to this product/brand', passed: true },
    { id: 6, label: 'Covers this claim type', passed: true },
  ];

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
            onBack={handleBack}
            backTo={`/verification-results/${activeBarcode}`}
            title="Certification Details"
            showLogo={false}
          />
        </div>

        <div className="space-y-4 my-auto py-2 text-left">
          {/* Main Certification Card */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5">
                {/* Round Stamp / Badge */}
                <div className="w-13 h-13 rounded-full border-2 border-emerald-800 text-emerald-900 bg-emerald-50/60 flex items-center justify-center text-[10px] font-extrabold text-center leading-tight tracking-wider flex-shrink-0 shadow-xs">
                  {certData.name === 'ECOCERT' ? (
                    <>
                      ECO
                      <br />
                      CERT
                    </>
                  ) : (
                    certData.name
                  )}
                </div>

                {/* Certification Title & Subtitle */}
                <div>
                  <h2 className="text-[18px] font-bold text-[#0F291E] leading-tight">
                    {certData.name} certification
                  </h2>
                  <p className="text-[13px] text-slate-500 font-medium mt-0.5">
                    {certData.standard}
                  </p>
                </div>
              </div>

              {/* Green "Valid" Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex-shrink-0 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>{certData.statusBadge}</span>
              </span>
            </div>

            {/* Validity and Product Meta */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  Valid till: <strong className="text-slate-800 font-bold">{certData.validTill}</strong>
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium truncate max-w-[150px]">
                {certData.brand} · {certData.productName}
              </span>
            </div>
          </div>

          {/* Section: Verification Checks */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[15px] font-bold text-[#0F291E]">
                Verification Checks
              </h3>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                All Passed
              </span>
            </div>

            {/* Checklist items */}
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

          {/* Bottom Information Card */}
          <div className="bg-[#EBF7EE] rounded-2xl p-4 border border-emerald-200/80 flex items-start gap-3 text-left shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-white text-emerald-700 border border-emerald-300 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
              <ShieldCheck className="w-4.5 h-4.5 stroke-[2.2]" />
            </div>
            <p className="text-[12.5px] text-emerald-950 font-medium leading-relaxed">
              {certData.supportNote}
            </p>
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
