/**
 * Local Product Database for GreenCheck MVP
 * Contains verified product records for sustainability claim validation.
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
    sustainabilityHighlights: [
      'Natural ingredients certified',
      'Eco-friendly packaging',
      'Sustainably sourced botanicals',
    ],
    certifications: ['ECOCERT', 'FSC'],
    image: '/assets/herbal-shampoo.png',
  },
};

/**
 * Helper to query a product by GTIN / barcode string.
 * Strips whitespace and leading/trailing markers.
 * @param {string} barcode 
 * @returns {object|null}
 */
export function getProductByBarcode(barcode) {
  if (!barcode) return null;
  const sanitized = String(barcode).trim().replace(/[\s-]+/g, '');
  return PRODUCTS_DATABASE[sanitized] || null;
}
