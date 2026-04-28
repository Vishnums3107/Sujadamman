import { getAssetPath } from '../utils/assetPath';

const sanitizeText = (value) =>
  `${value || ''}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const IMAGE_CATALOG = [
  {
    keywords: ['sofa', 'recliner', 'couch', 'seater'],
    main: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['bed', 'platform', 'storage bed'],
    main: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['mattress', 'foam', 'spring', 'orthopedic', 'latex'],
    main: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['bottle', 'sipper', 'copper', 'steel bottle', 'glass bottle'],
    main: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['lunch box', 'tiffin', 'bento', 'meal prep', 'box set'],
    main: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80',
  },
];

const DEFAULT_MAIN_IMAGE =
  'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=80';
const DEFAULT_ALT_IMAGE =
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80';

const PRODUCT_NAME_OVERRIDES = {
  'insulated lunch box': {
    main: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80',
  },
};

const getSvgFallback = (label) => {
  const safeLabel = `${label || 'Product Image'}`.slice(0, 40);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1f2937"/><stop offset="100%" stop-color="#111827"/></linearGradient></defs><rect width="1200" height="900" fill="url(#g)"/><text x="50%" y="50%" fill="#f3f4f6" font-size="54" font-family="Arial" text-anchor="middle" dominant-baseline="middle">${safeLabel}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const getCatalogEntry = (productName, categoryName) => {
  const searchable = `${sanitizeText(productName)} ${sanitizeText(categoryName)}`;
  return IMAGE_CATALOG.find((entry) => entry.keywords.some((keyword) => searchable.includes(keyword)));
};

export const getProductNameFallbackImage = (productName, categoryName, variant = 'main') => {
  const match = getCatalogEntry(productName, categoryName);
  if (match) return variant === 'alt' ? match.alt : match.main;
  if (!productName && !categoryName) return variant === 'alt' ? DEFAULT_ALT_IMAGE : DEFAULT_MAIN_IMAGE;
  return getSvgFallback(productName || categoryName);
};

export const getProductImage = (product, index = 0) => {
  const imageUrl = product?.images?.[index];
  if (imageUrl) {
    if (typeof imageUrl === 'string' && imageUrl.startsWith('/')) {
      return getAssetPath(imageUrl);
    }
    return imageUrl;
  }

  const normalizedName = sanitizeText(product?.name);
  const override = PRODUCT_NAME_OVERRIDES[normalizedName];
  if (override) {
    return index > 0 ? override.alt : override.main;
  }

  const categoryName = product?.category?.name || product?.category?.type || product?.category;
  const variant = index > 0 ? 'alt' : 'main';
  return getProductNameFallbackImage(product?.name, categoryName, variant);
};
