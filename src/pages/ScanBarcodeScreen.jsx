import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import MobileContainer from '../components/common/MobileContainer';
import Button from '../components/common/Button';
import {
  ChevronLeft,
  Zap,
  ZapOff,
  Scan,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Camera,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

const SUPPORTED_BARCODE_FORMATS = [
  Html5QrcodeSupportedFormats.EAN_13,
  Html5QrcodeSupportedFormats.EAN_8,
  Html5QrcodeSupportedFormats.UPC_A,
  Html5QrcodeSupportedFormats.UPC_E,
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.CODE_39,
  Html5QrcodeSupportedFormats.QR_CODE,
];

export default function ScanBarcodeScreen() {
  const navigate = useNavigate();
  const html5QrCodeRef = useRef(null);
  const isStoppingRef = useRef(false);

  // Status: 'starting' | 'scanning' | 'detected' | 'error'
  const [status, setStatus] = useState('starting');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState('generic'); // 'permission' | 'notFound' | 'unsupported' | 'generic'

  // Detected state
  const [detectedData, setDetectedData] = useState(null);

  // Flash / Torch state
  const [torchSupported, setTorchSupported] = useState(false);
  const [torchActive, setTorchActive] = useState(false);
  const [showContinueModal, setShowContinueModal] = useState(false);

  // Safely stop all camera tracks
  const stopCamera = useCallback(async () => {
    if (isStoppingRef.current) return;
    isStoppingRef.current = true;

    try {
      if (html5QrCodeRef.current) {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        html5QrCodeRef.current.clear();
      }
    } catch (err) {
      console.warn('Error while stopping camera scanner:', err);
    } finally {
      // Also ensure any lingering video track is stopped
      try {
        const videoElem = document.querySelector('#barcode-scanner-viewport video');
        if (videoElem && videoElem.srcObject) {
          const stream = videoElem.srcObject;
          stream.getTracks().forEach((track) => track.stop());
          videoElem.srcObject = null;
        }
      } catch (e) {
        // ignored
      }
      isStoppingRef.current = false;
      setTorchActive(false);
    }
  }, []);

  // Handle successful barcode detection
  const handleScanSuccess = useCallback(
    async (decodedText, decodedResult) => {
      // Prevent repeated detection triggers while handling
      if (status === 'detected' || isStoppingRef.current) return;

      // Gentle haptic feedback on supported mobile devices
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate(120);
        } catch (e) {
          // Ignore vibrate errors on unsupported browsers
        }
      }

      await stopCamera();

      const formatName =
        decodedResult?.result?.format?.formatName || 'Barcode';

      setDetectedData({
        text: decodedText,
        format: formatName.replace('_', '-'),
      });
      setStatus('detected');
    },
    [status, stopCamera]
  );

  // Start the scanner
  const startScanner = useCallback(async () => {
    setStatus('starting');
    setErrorMessage('');
    setErrorType('generic');
    isStoppingRef.current = false;

    // Check browser mediaDevices support
    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setErrorType('unsupported');
      setErrorMessage(
        'Your browser or connection does not support camera access. Modern browsers require HTTPS or localhost to enable the camera.'
      );
      setStatus('error');
      return;
    }

    try {
      // Clean up previous instance if any
      await stopCamera();

      const scanner = new Html5Qrcode('barcode-scanner-viewport', {
        formatsToSupport: SUPPORTED_BARCODE_FORMATS,
        verbose: false,
      });

      html5QrCodeRef.current = scanner;

      // Scanner configuration
      const config = {
        fps: 15,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          // Optimize scan box for horizontal barcodes
          const width = Math.min(Math.floor(viewfinderWidth * 0.8), 280);
          const height = Math.min(Math.floor(viewfinderHeight * 0.45), 180);
          return {
            width: Math.max(width, 220),
            height: Math.max(height, 140),
          };
        },
        aspectRatio: 1.0,
      };

      // Prefer rear / environment camera
      await scanner.start(
        { facingMode: 'environment' },
        config,
        (decodedText, decodedResult) => {
          handleScanSuccess(decodedText, decodedResult);
        },
        () => {
          // Ongoing frame evaluation (no barcode in current frame)
        }
      );

      setStatus('scanning');

      // Check if device supports physical torch
      try {
        const capabilities = scanner.getRunningTrackCameraCapabilities();
        if (capabilities && capabilities.torchFeature().isSupported()) {
          setTorchSupported(true);
        } else {
          setTorchSupported(false);
        }
      } catch (torchErr) {
        setTorchSupported(false);
      }
    } catch (err) {
      console.error('Camera startup error:', err);

      const errorStr = String(err).toLowerCase();
      if (
        errorStr.includes('notallowederror') ||
        errorStr.includes('permission denied') ||
        errorStr.includes('denied')
      ) {
        setErrorType('permission');
        setErrorMessage(
          'Camera permission was denied. Please allow camera access in your browser settings to scan product barcodes.'
        );
      } else if (
        errorStr.includes('notfounderror') ||
        errorStr.includes('devicesnotfound') ||
        errorStr.includes('no camera')
      ) {
        setErrorType('notFound');
        setErrorMessage(
          'No camera detected on this device. Please use a device with an available camera.'
        );
      } else if (
        errorStr.includes('notsupportederror') ||
        errorStr.includes('insecure')
      ) {
        setErrorType('unsupported');
        setErrorMessage(
          'Camera access requires a secure connection (HTTPS) or localhost.'
        );
      } else {
        setErrorType('generic');
        setErrorMessage(
          'Unable to open camera. Please ensure no other application is using the camera and try again.'
        );
      }

      setStatus('error');
    }
  }, [handleScanSuccess, stopCamera]);

  // Toggle flash / torch
  const toggleTorch = async () => {
    if (!torchSupported || !html5QrCodeRef.current || status !== 'scanning') return;

    try {
      const nextTorchState = !torchActive;
      await html5QrCodeRef.current.applyVideoConstraints({
        advanced: [{ torch: nextTorchState }],
      });
      setTorchActive(nextTorchState);
    } catch (err) {
      console.warn('Failed to toggle torch:', err);
    }
  };

  // Rescan / restart
  const handleScanAgain = async () => {
    setDetectedData(null);
    setShowContinueModal(false);
    await startScanner();
  };

  // Back navigation
  const handleBack = async () => {
    await stopCamera();
    navigate('/ready-to-scan');
  };

  // Mount & cleanup effect
  useEffect(() => {
    startScanner();

    return () => {
      stopCamera();
    };
  }, [startScanner, stopCamera]);

  return (
    <MobileContainer showStatusBar={true} theme="dark">
      <div className="flex-1 flex flex-col justify-between relative overflow-hidden bg-[#0A0F1A]">
        {/* Top Camera Header */}
        <header className="w-full px-5 py-3 flex items-center justify-between z-30 select-none bg-gradient-to-b from-black/80 to-transparent">
          {/* Back button */}
          <button
            onClick={handleBack}
            aria-label="Back to Ready to Scan"
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.4]" />
          </button>

          {/* Screen Title */}
          <h1 className="text-[17px] font-semibold text-white tracking-tight">
            Scan Barcode
          </h1>

          {/* Flash / Torch button */}
          <div className="w-10 flex justify-end">
            {torchSupported ? (
              <button
                onClick={toggleTorch}
                aria-label="Toggle Flashlight"
                className={`w-10 h-10 -mr-2 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  torchActive
                    ? 'bg-amber-400/25 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                    : 'text-white/80 hover:bg-white/10 active:bg-white/20'
                }`}
              >
                {torchActive ? (
                  <Zap className="w-5 h-5 fill-current" />
                ) : (
                  <ZapOff className="w-5 h-5" />
                )}
              </button>
            ) : (
              <button
                disabled
                title="Torch not supported on this browser/device"
                className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-white/30 cursor-not-allowed"
              >
                <ZapOff className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {/* Live Camera Viewport (Target DOM element for Html5Qrcode) */}
        <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden">
          {/* Underlying HTML5 video container */}
          <div
            id="barcode-scanner-viewport"
            className="absolute inset-0 w-full h-full bg-black"
          />

          {/* Starting / Loading Overlay */}
          {status === 'starting' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0A0F1A]/90 backdrop-blur-sm px-6 text-center">
              <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mb-4" />
              <p className="text-white text-[16px] font-medium">
                Starting camera...
              </p>
              <p className="text-slate-400 text-xs mt-1 max-w-[240px]">
                Please allow camera permissions if prompted by your browser.
              </p>
            </div>
          )}

          {/* Error State Overlay */}
          {status === 'error' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0A0F1A] px-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
                <AlertCircle className="w-9 h-9 stroke-[2]" />
              </div>

              <h2 className="text-white text-[19px] font-bold tracking-tight">
                {errorType === 'permission'
                  ? 'Camera Access Denied'
                  : errorType === 'unsupported'
                  ? 'Camera Not Supported'
                  : errorType === 'notFound'
                  ? 'No Camera Detected'
                  : 'Unable to Start Camera'}
              </h2>

              <p className="text-slate-300 text-[13.5px] mt-2 max-w-[280px] leading-relaxed">
                {errorMessage}
              </p>

              {errorType === 'permission' && (
                <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-xl text-[12px] text-slate-300 text-left max-w-[280px]">
                  <p className="font-semibold text-emerald-300 mb-1">
                    How to enable:
                  </p>
                  <ol className="list-decimal pl-4 space-y-0.5 text-slate-300">
                    <li>Tap the site icon / padlock in your browser bar</li>
                    <li>Toggle <strong>Camera</strong> permission to <strong>Allow</strong></li>
                    <li>Tap "Try Again" below</li>
                  </ol>
                </div>
              )}

              <div className="mt-6 w-full max-w-[260px] space-y-3">
                <Button onClick={startScanner} variant="primary" showArrow={false}>
                  Try Again
                </Button>
                <button
                  onClick={handleBack}
                  className="w-full text-xs font-medium text-slate-400 hover:text-white py-2 cursor-pointer"
                >
                  Return to Ready to Scan
                </button>
              </div>
            </div>
          )}

          {/* Active Viewfinder Overlay (Screen 2 reference style) */}
          {status === 'scanning' && (
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center px-8">
              {/* GreenCheck Styled Viewfinder Box */}
              <div className="relative w-64 h-48 rounded-2xl flex items-center justify-center shadow-[0_0_0_9999px_rgba(10,15,26,0.55)]">
                {/* Mint Green Viewfinder Corner Brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-[3.5px] border-l-[3.5px] border-[#34D399] rounded-tl-xl drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-[3.5px] border-r-[3.5px] border-[#34D399] rounded-tr-xl drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3.5px] border-l-[3.5px] border-[#34D399] rounded-bl-xl drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3.5px] border-r-[3.5px] border-[#34D399] rounded-br-xl drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />

                {/* Animated Green Scanning Sweep Line */}
                <div className="absolute left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#34D399] to-transparent shadow-[0_0_12px_#34D399] animate-scan-sweep" />

                {/* Subtle center crosshairs */}
                <div className="w-4 h-0.5 bg-[#34D399]/40 rounded-full" />
              </div>
            </div>
          )}

          {/* Barcode Detected Success Card Overlay */}
          {status === 'detected' && detectedData && (
            <div className="absolute inset-0 z-30 flex flex-col justify-end bg-black/75 backdrop-blur-md p-6 animate-fade-in">
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-emerald-900/10 flex flex-col items-center text-center space-y-4">
                {/* Success Icon */}
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-[#16A34A] shadow-inner">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.4]" />
                </div>

                {/* Header */}
                <div>
                  <h2 className="text-[22px] font-bold text-[#0F291E] tracking-tight">
                    Barcode Detected!
                  </h2>
                  <p className="text-[13px] text-slate-500 mt-0.5">
                    Product identified and ready for verification.
                  </p>
                </div>

                {/* Barcode details card */}
                <div className="w-full bg-[#F4F7F4] rounded-2xl p-4 border border-emerald-800/10 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{detectedData.format}</span>
                  </div>

                  {/* Detected code number */}
                  <span className="text-[20px] font-mono font-bold tracking-[0.16em] text-[#0F291E]">
                    {detectedData.text}
                  </span>
                </div>

                {/* Actions */}
                <div className="w-full space-y-2.5 pt-2">
                  <Button
                    onClick={() => navigate(`/product/${detectedData.text}`)}
                    variant="primary"
                    showArrow={true}
                  >
                    Continue
                  </Button>

                  <button
                    onClick={handleScanAgain}
                    className="w-full h-[46px] rounded-full text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 text-[14px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Scan Another Barcode</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Helper Pill Badge (matching reference mockup) */}
        {status === 'scanning' && (
          <div className="w-full px-6 pb-6 pt-2 flex flex-col items-center z-20 select-none bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
            <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-[13px] font-medium shadow-lg">
              <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <Scan className="w-3.5 h-3.5 text-emerald-300" />
              </div>
              <span>Position the barcode within the frame</span>
            </div>
          </div>
        )}

        {/* Modal: Ready for Next Phase Notice */}
        {showContinueModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-6">
            <div className="bg-white rounded-3xl p-6 max-w-[340px] w-full text-center space-y-4 shadow-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <h3 className="text-[18px] font-bold text-[#0F291E]">
                  Barcode Saved
                </h3>
                <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">
                  Barcode <strong className="font-mono text-slate-800">{detectedData?.text}</strong> is ready. In the upcoming phase, this will automatically query the sustainability database and navigate to <strong>Product Found</strong>!
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  onClick={handleScanAgain}
                  variant="primary"
                  showArrow={false}
                >
                  Scan Another Product
                </Button>
                <button
                  onClick={handleBack}
                  className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Return to Ready to Scan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
