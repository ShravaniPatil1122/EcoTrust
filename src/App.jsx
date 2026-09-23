import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute, useAuth } from './context/AuthContext';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import ProfileScreen from './pages/ProfileScreen';
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

function IndexRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Main App Entry: / */}
          <Route path="/" element={<IndexRoute />} />
          <Route path="/welcome" element={<WelcomeScreen />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginScreen />} />

          {/* Main Home Hub */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />

          {/* User Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />

          {/* Barcode & Product Scanning Flow (Protected) */}
          <Route
            path="/ready-to-scan"
            element={
              <ProtectedRoute>
                <ReadyToScanScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scan-barcode"
            element={
              <ProtectedRoute>
                <Suspense fallback={<ScannerFallback />}>
                  <ScanBarcodeScreen />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:barcode"
            element={
              <ProtectedRoute>
                <ProductFoundScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-found"
            element={
              <ProtectedRoute>
                <ProductFoundScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scan-label"
            element={
              <ProtectedRoute>
                <ScanLabelScreen />
              </ProtectedRoute>
            }
          />

          {/* Verification Dashboard (Central Hub) */}
          <Route
            path="/verification-results/:barcode"
            element={
              <ProtectedRoute>
                <VerificationResultsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verification-results"
            element={
              <ProtectedRoute>
                <VerificationResultsScreen />
              </ProtectedRoute>
            }
          />

          {/* Verification Drill-down Pages */}
          <Route
            path="/ingredients"
            element={
              <ProtectedRoute>
                <IngredientsScreen />
              </ProtectedRoute>
            }
          />
          <Route path="/natural-ingredients" element={<Navigate to="/ingredients" replace />} />

          <Route
            path="/certification-details/:certId"
            element={
              <ProtectedRoute>
                <CertificationDetailsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certification-details"
            element={
              <ProtectedRoute>
                <CertificationDetailsScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path="/packaging"
            element={
              <ProtectedRoute>
                <PackagingVerificationScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/packaging-verification"
            element={
              <ProtectedRoute>
                <PackagingVerificationScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path="/other-claims"
            element={
              <ProtectedRoute>
                <OtherClaimsScreen />
              </ProtectedRoute>
            }
          />

          {/* Preserved Standalone Verification Reports */}
          <Route
            path="/sustainability-report"
            element={
              <ProtectedRoute>
                <SustainabilityReportScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sustainability-journey"
            element={
              <ProtectedRoute>
                <SustainabilityJourneyScreen />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
