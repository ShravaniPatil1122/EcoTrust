/**
 * Local Product Database for GreenCheck MVP
 * Contains verified product records, claims, certifications, and ingredient breakdowns.
 */

export const PRODUCTS_DATABASE = {
  '8901234567890': {
    id: '8901234567890',
    gtin: '8901234567890',
    name: 'Herbal Shampoo',
    brand: 'XYZ Naturals',
    category: 'Personal Care → Hair Care',
    size: '250 ml',
    description: 'Herbal shampoo with aloe vera and plant-based ingredients.',
    score: 85,
    grade: {
      key: 'strong',
      label: 'Well-backed',
      color: '#16803D',
      summary: '3 of 3 claims backed by verified certificates or ingredients.',
    },
    claims: [
      {
        id: 'natural-ing',
        phrase: 'Natural ingredients',
        verdict: 'backed',
        verdictLabel: 'Backed up',
        reason: 'ECOCERT record found, and the ingredients read as plant-derived.',
      },
      {
        id: 'eco-pkg',
        phrase: 'Eco-friendly packaging',
        verdict: 'partial',
        verdictLabel: 'Partly backed',
        reason: 'FSC record covers carton/outer packaging. Bottle is recyclable HDPE.',
      },
      {
        id: 'sust-source',
        phrase: 'Sustainably sourced',
        verdict: 'partial',
        verdictLabel: 'Partly backed',
        reason: 'ECOCERT & FSC records found. Covers certified organic ingredients.',
      },
    ],
    certifications: [
      {
        id: 'ecocert',
        name: 'ECOCERT',
        status: 'verified',
        statusLabel: 'Verified',
        note: 'Organic and natural cosmetics standard record verified for XYZ Naturals.',
        covers: 'Natural and organic cosmetic formulation',
      },
      {
        id: 'fsc',
        name: 'FSC',
        status: 'verified',
        statusLabel: 'Verified',
        note: 'Forest Stewardship Council certified packaging materials.',
        covers: 'Sustainable forest-derived paper & packaging',
      },
    ],
    ingredients: [
      {
        name: 'Aloe Barbadensis Leaf Juice',
        cls: 'natural',
        typeLabel: 'Plant extract',
        origin: 'Organic Aloe Vera',
        purpose: 'Soothing scalp hydration and nourishment',
      },
      {
        name: 'Aqua (Purified Water)',
        cls: 'natural',
        typeLabel: 'Mineral / Water',
        origin: 'Natural purified water',
        purpose: 'Formulation base solvent',
      },
      {
        name: 'Glycerin',
        cls: 'natural',
        typeLabel: 'Plant extract',
        origin: 'Plant lipid extraction',
        purpose: 'Natural humectant moisture retention',
      },
      {
        name: 'Sodium Coco-Sulfate',
        cls: 'derived',
        typeLabel: 'Natural source',
        origin: 'Coconut oil fatty acids',
        purpose: 'Gentle, biodegradable cleansing lather',
      },
      {
        name: 'Cocamidopropyl Betaine',
        cls: 'derived',
        typeLabel: 'Natural source',
        origin: 'Renewable coconut',
        purpose: 'Foam conditioning and mild skin feel',
      },
    ],
    environmentalImpact: {
      packagingRecyclability: '75%',
      biodegradability: '94% OECD 301B',
      crueltyFree: true,
      carbonRating: 'Low emissions profile',
    },
    alternatives: [
      {
        gtin: '890445500123',
        name: 'Aloe & Neem Shampoo Bar',
        brand: 'Verdant Root',
        size: '90 g',
        score: 92,
        label: 'Zero-plastic packaging & 100% waterless',
      },
    ],
  },
};

/**
 * Helper to query a product by GTIN / barcode string.
 * @param {string} barcode 
 * @returns {object|null}
 */
export function getProductByBarcode(barcode) {
  if (!barcode) return null;
  const sanitized = String(barcode).trim().replace(/[\s-]+/g, '');
  return PRODUCTS_DATABASE[sanitized] || null;
}
