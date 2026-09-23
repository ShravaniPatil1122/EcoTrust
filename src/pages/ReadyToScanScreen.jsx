import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/common/MobileContainer';
import BrandHeader from '../components/common/BrandHeader';
import BarcodeScanIllustration from '../components/illustrations/BarcodeScanIllustration';
import Button from '../components/common/Button';
import { getProductByBarcode } from '../data/products';
import {
  Camera,
  Upload,
  Info,
  AlertCircle,
  XCircle,
  RefreshCw,
  X,
  FileImage,
} from 'lucide-react';

export default function ReadyToScanScreen() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Upload decoding state: 'idle' | 'analyzing' | 'not_found' | 'no_barcode'
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [detectedBarcode, setDetectedBarcode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Navigate to camera scanner
  const handleScanWithCamera = () => {
    navigate('/scan-barcode');
  };

  // Open file picker
  const handleOpenPicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Process selected file
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show preview and open modal
    const previewUrl = URL.createObjectURL(file);
    setImagePreviewUrl(previewUrl);
    setIsModalOpen(true);
    setUploadStatus('analyzing');
    setDetectedBarcode(null);

    try {
      // Dynamically load decoder module to keep bundle light
      const { decodeBarcodeFromImage } = await import('../utils/barcodeDecoder');
      const result = await decodeBarcodeFromImage(file, 'ready-screen-file-scanner');
      const rawBarcode = result.text.trim();
      setDetectedBarcode(rawBarcode);

      // Check product database
      const matchedProduct = getProductByBarcode(rawBarcode);

      if (matchedProduct) {
        // Barcode matched dummy product (e.g. 8901234567890 -> Herbal Shampoo)
        // Brief delay so user sees confirmed detection before navigation
        setTimeout(() => {
          setIsModalOpen(false);
          navigate(`/product/${matchedProduct.gtin}`);
        }, 500);
      } else {
        // Valid barcode detected, but product not in demo DB
        setUploadStatus('not_found');
      }
    } catch (err) {
      // No barcode detected in image
      console.log('Barcode decode failed on image:', err);
      setUploadStatus('no_barcode');
    }
  };

  // Quick loader for demo samples
  const handleTestDemoSample = async (samplePath) => {
    try {
      setUploadStatus('analyzing');
      setIsModalOpen(true);
      setImagePreviewUrl(samplePath);

      const response = await fetch(samplePath);
      const blob = await response.blob();
      const filename = samplePath.split('/').pop() || 'sample.png';
      const file = new File([blob], filename, { type: blob.type || 'image/png' });

      // Run real decoder on the file
      const { decodeBarcodeFromImage } = await import('../utils/barcodeDecoder');
      const result = await decodeBarcodeFromImage(file, 'ready-screen-file-scanner');
      const rawBarcode = result.text.trim();
      setDetectedBarcode(rawBarcode);

      const matchedProduct = getProductByBarcode(rawBarcode);
      if (matchedProduct) {
        setTimeout(() => {
          setIsModalOpen(false);
          navigate(`/product/${matchedProduct.gtin}`);
        }, 500);
      } else {
        setUploadStatus('not_found');
      }
    } catch (err) {
      setUploadStatus('no_barcode');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadStatus('idle');
    if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImagePreviewUrl(null);
  };

  const handleTryAgain = () => {
    handleCloseModal();
    handleOpenPicker();
  };

  return (
    <MobileContainer showStatusBar={true} theme="light">
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 relative overflow-hidden">
        {/* Hidden File Scanner Container element for Html5Qrcode Canvas */}
        <div id="ready-screen-file-scanner" className="hidden" />

        {/* Hidden File Input supporting JPG, JPEG, PNG, WEBP */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload Barcode Image"
        />

        {/* Header with back navigation to Home and EcoTrust branding */}
        <div className="-mx-6">
          <BrandHeader showBack={true} backTo="/home" showLogo={true} />
        </div>

        {/* Center: Barcode illustration with scan frame */}
        <div className="my-auto py-4 flex items-center justify-center z-10">
          <BarcodeScanIllustration />
        </div>

        {/* Bottom Content: Heading, Description, Helper Info & Action Buttons */}
        <div className="flex flex-col items-center text-center z-10 space-y-3">
          {/* Heading */}
          <h1 className="text-[25px] sm:text-[27px] font-bold text-[#0F291E] tracking-tight leading-[1.2]">
            Scan a Product
          </h1>

          {/* Supporting text */}
          <p className="text-[14px] text-slate-500 font-normal leading-relaxed max-w-[300px]">
            Scan a product barcode or upload its packaging label to verify its sustainability claims.
          </p>

          {/* Helper text badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[12px] font-medium select-none">
              <Info className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Both methods lead to the same verification report</span>
            </div>
          </div>

          {/* Action Options: 1. [ Scan Barcode ] & 2. [ Upload Product Label ] */}
          <div className="w-full space-y-2.5 pt-2">
            {/* Method 1: Scan Barcode */}
            <div className="space-y-1.5">
              <Button
                onClick={handleScanWithCamera}
                variant="primary"
                showArrow={true}
                className="gap-2.5 h-[52px] text-[15.5px] font-bold shadow-md"
              >
                <Camera className="w-5 h-5 stroke-[2.2]" />
                <span>Scan Barcode</span>
              </Button>
              <button
                type="button"
                onClick={handleOpenPicker}
                className="text-xs font-semibold text-slate-500 hover:text-emerald-800 transition-colors cursor-pointer py-0.5"
              >
                or upload barcode image
              </button>
            </div>

            {/* Visual 'or' separator */}
            <div className="flex items-center gap-3 py-0.5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Method 2: Upload Product Label */}
            <button
              onClick={() => navigate('/scan-label', { state: { from: '/ready-to-scan' } })}
              type="button"
              className="w-full h-[52px] sm:h-[54px] rounded-full border-2 border-emerald-700/25 hover:border-emerald-700/50 bg-white hover:bg-emerald-50/60 active:bg-emerald-100 text-[#166534] font-semibold text-[15.5px] tracking-wide flex items-center justify-center gap-2.5 shadow-xs transition-all duration-200 cursor-pointer select-none active:scale-[0.985]"
            >
              <Upload className="w-[19px] h-[19px] stroke-[2.4] text-emerald-700" />
              <span>Upload Product Label</span>
            </button>
          </div>

          {/* Demo Testing Shortcuts (makes testing required scenarios effortless) */}
          <div className="pt-2 w-full">
            <details className="text-left text-xs text-slate-400 group">
              <summary className="cursor-pointer text-center font-medium hover:text-emerald-700 select-none py-1">
                🧪 Quick Demo Samples (Click to test)
              </summary>
              <div className="mt-2 p-2.5 bg-slate-100/80 rounded-2xl border border-slate-200 space-y-1.5 text-[12px]">
                <button
                  type="button"
                  onClick={() => handleTestDemoSample('/sample-barcodes/herbal-shampoo-8901234567890.png')}
                  className="w-full text-left px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-medium flex items-center justify-between border border-emerald-100 cursor-pointer"
                >
                  <span>1. Herbal Shampoo (8901234567890)</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Matches DB</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTestDemoSample('/sample-barcodes/other-product-4006381333931.png')}
                  className="w-full text-left px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-slate-700 font-medium flex items-center justify-between border border-slate-200 cursor-pointer"
                >
                  <span>2. Unlisted Barcode (4006381333931)</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Not Found</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTestDemoSample('/sample-barcodes/scenery-no-barcode.png')}
                  className="w-full text-left px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 text-slate-700 font-medium flex items-center justify-between border border-slate-200 cursor-pointer"
                >
                  <span>3. Photo without Barcode</span>
                  <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-bold">No Barcode</span>
                </button>
              </div>
            </details>
          </div>
        </div>

        {/* Upload & Decoding Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-5">
            <div className="bg-white rounded-3xl p-6 max-w-[350px] w-full text-center space-y-4 shadow-2xl border border-slate-200 relative animate-fade-in">
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* State 1: Analyzing image */}
              {uploadStatus === 'analyzing' && (
                <div className="space-y-4 py-2">
                  <div className="relative w-44 h-32 mx-auto rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                    {imagePreviewUrl ? (
                      <img
                        src={imagePreviewUrl}
                        alt="Uploaded Barcode Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <FileImage className="w-10 h-10 text-slate-400" />
                    )}
                    {/* Scanning sweep overlay */}
                    <div className="absolute inset-0 bg-emerald-500/15 animate-pulse" />
                    <div className="absolute left-2 right-2 h-[2px] bg-emerald-500 shadow-[0_0_8px_#10B981] animate-scan-sweep" />
                  </div>

                  <div>
                    <h3 className="text-[18px] font-bold text-[#0F291E] flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                      <span>Decoding Barcode...</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Analyzing pixels and reading barcode patterns.
                    </p>
                  </div>
                </div>
              )}

              {/* State 2: Product Not Found (Valid Barcode, but not in DB) */}
              {uploadStatus === 'not_found' && (
                <div className="space-y-4 py-1">
                  <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8 stroke-[2.2]" />
                  </div>

                  <div>
                    <h3 className="text-[19px] font-bold text-[#0F291E]">
                      Product Not Found
                    </h3>
                    <p className="text-[13.5px] text-slate-500 mt-1 leading-relaxed">
                      This product isn't available in our demo database yet.
                    </p>
                  </div>

                  {/* Detected code pill */}
                  {detectedBarcode && (
                    <div className="bg-slate-100 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-700 inline-block">
                      Detected GTIN: <strong>{detectedBarcode}</strong>
                    </div>
                  )}

                  {/* Image thumbnail */}
                  {imagePreviewUrl && (
                    <div className="w-32 h-20 mx-auto rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img
                        src={imagePreviewUrl}
                        alt="Uploaded preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <Button onClick={handleTryAgain} variant="primary" showArrow={false}>
                      Upload Another Image
                    </Button>
                    <button
                      onClick={handleCloseModal}
                      className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* State 3: Barcode Not Detected (No barcode in image) */}
              {uploadStatus === 'no_barcode' && (
                <div className="space-y-4 py-1">
                  <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 border border-red-200 flex items-center justify-center mx-auto">
                    <XCircle className="w-8 h-8 stroke-[2.2]" />
                  </div>

                  <div>
                    <h3 className="text-[19px] font-bold text-[#0F291E]">
                      Barcode Not Detected
                    </h3>
                    <p className="text-[13.5px] text-slate-500 mt-1 leading-relaxed">
                      We couldn't detect a barcode in this image. Try uploading a clearer image.
                    </p>
                  </div>

                  {/* Image thumbnail */}
                  {imagePreviewUrl && (
                    <div className="w-32 h-20 mx-auto rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img
                        src={imagePreviewUrl}
                        alt="Uploaded preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <Button onClick={handleTryAgain} variant="primary" showArrow={false}>
                      Try Again
                    </Button>
                    <button
                      onClick={handleCloseModal}
                      className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
