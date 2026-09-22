import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from './pages/WelcomeScreen';
import ReadyToScanScreen from './pages/ReadyToScanScreen';
import ProductFoundScreen from './pages/ProductFoundScreen';
import ScanLabelScreen from './pages/ScanLabelScreen';
import VerificationResultsScreen from './pages/VerificationResultsScreen';
import SustainabilityReportScreen from './pages/SustainabilityReportScreen';
import IngredientsScreen from './pages/IngredientsScreen';
import CertificationDetailsScreen from './pages/CertificationDetailsScreen';
import OtherClaimsScreen from './pages/OtherClaimsScreen';
import SustainabilityJourneyScreen from './pages/SustainabilityJourneyScreen';
import PackagingVerificationScreen from './pages/PackagingVerificationScreen';

// Lazy-load camera scanner to keep initial bundle ultra-light
const ScanBarcodeScreen = lazy(() => import('./pages/ScanBarcodeScreen'));

function ScannerFallback() {
  return (
    <div className="w-full min-h-screen bg-[#0A0F1A] flex flex-col items-center justify-center text-white">
      <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-sm font-medium text-slate-300">Loading camera scanner...</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Screen 1: Welcome */}
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/welcome" element={<Navigate to="/" replace />} />

        {/* Screen 2: Ready to Scan */}
        <Route path="/ready-to-scan" element={<ReadyToScanScreen />} />

        {/* Screen 3: Functional Camera Barcode Scanner */}
        <Route
          path="/scan-barcode"
          element={
            <Suspense fallback={<ScannerFallback />}>
              <ScanBarcodeScreen />
            </Suspense>
          }
        />

        {/* Screen 4: Product Found */}
        <Route path="/product/:barcode" element={<ProductFoundScreen />} />
        <Route path="/product-found" element={<ProductFoundScreen />} />

        {/* Screen 5: Optional Physical Label OCR Preview */}
        <Route path="/scan-label" element={<ScanLabelScreen />} />

        {/* Screen 6: Verification Results */}
        <Route path="/verification-results/:barcode" element={<VerificationResultsScreen />} />
        <Route path="/verification-results" element={<VerificationResultsScreen />} />

        {/* Screen 7: Sustainability Report */}
        <Route path="/sustainability-report" element={<SustainabilityReportScreen />} />

        {/* Screen 8: Natural / Plant-derived Ingredients */}
        <Route path="/ingredients" element={<IngredientsScreen />} />
        <Route path="/natural-ingredients" element={<Navigate to="/ingredients" replace />} />

        {/* Screen: Certification Details */}
        <Route path="/certification-details/:certId" element={<CertificationDetailsScreen />} />
        <Route path="/certification-details" element={<CertificationDetailsScreen />} />

        {/* Screen 9: Other Claims */}
        <Route path="/other-claims" element={<OtherClaimsScreen />} />

        {/* Packaging Verification */}
        <Route path="/packaging" element={<PackagingVerificationScreen />} />
        <Route path="/packaging-verification" element={<PackagingVerificationScreen />} />

        {/* Screen 10: Sustainability Journey */}
        <Route path="/sustainability-journey" element={<SustainabilityJourneyScreen />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
