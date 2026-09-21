import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

const SUPPORTED_FORMATS = [
  Html5QrcodeSupportedFormats.EAN_13,
  Html5QrcodeSupportedFormats.EAN_8,
  Html5QrcodeSupportedFormats.UPC_A,
  Html5QrcodeSupportedFormats.UPC_E,
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.CODE_39,
  Html5QrcodeSupportedFormats.QR_CODE,
];

/**
 * Decodes a barcode from a user-uploaded image file (JPG, PNG, WEBP).
 * Uses native BarcodeDetector API if available, with Html5Qrcode ZXing engine
 * as a comprehensive cross-browser fallback.
 * 
 * @param {File} file - The uploaded image file
 * @param {string} containerId - Target DOM element ID for Html5Qrcode canvas context
 * @returns {Promise<{ text: string, format: string }>}
 */
export async function decodeBarcodeFromImage(file, containerId = 'file-scanner-container') {
  if (!file || !(file instanceof File)) {
    throw new Error('Invalid file provided.');
  }

  // 1. Primary Attempt: Native browser BarcodeDetector API (fast & hardware-accelerated on Chrome/Android)
  if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
    try {
      const supportedFormats = await window.BarcodeDetector.getSupportedFormats();
      const targetFormats = ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'qr_code'].filter(
        (f) => supportedFormats.includes(f)
      );

      if (targetFormats.length > 0) {
        const detector = new window.BarcodeDetector({ formats: targetFormats });
        const imgBitmap = await createImageBitmap(file);
        const barcodes = await detector.detect(imgBitmap);
        if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
          return {
            text: barcodes[0].rawValue,
            format: (barcodes[0].format || 'BARCODE').toUpperCase().replace('_', '-'),
          };
        }
      }
    } catch (nativeErr) {
      console.warn('Native BarcodeDetector pass failed or was not matching, trying Html5Qrcode engine:', nativeErr);
    }
  }

  // 2. Comprehensive Secondary Attempt: html5-qrcode's scanFile (ZXing engine)
  let html5Scanner = null;
  try {
    // Ensure target container exists in DOM
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.style.display = 'none';
      document.body.appendChild(container);
    }

    html5Scanner = new Html5Qrcode(containerId, {
      formatsToSupport: SUPPORTED_FORMATS,
      verbose: false,
    });

    const decodedText = await html5Scanner.scanFile(file, false);
    if (decodedText) {
      return {
        text: String(decodedText).trim(),
        format: 'EAN/UPC',
      };
    }
  } catch (err) {
    // html5-qrcode rejects if no barcode was detected in the image
    console.log('html5-qrcode scanFile result:', err);
    throw new Error('NO_BARCODE_DETECTED');
  } finally {
    if (html5Scanner) {
      try {
        html5Scanner.clear();
      } catch (e) {
        // cleanup ignore
      }
    }
  }

  throw new Error('NO_BARCODE_DETECTED');
}
