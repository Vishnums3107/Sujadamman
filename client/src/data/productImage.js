import { getAssetPath } from '../utils/assetPath';

const sanitizeText = (value) =>
  `${value || ''}`
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
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
  'modern l shape sofa': {
    main: 'https://images.unsplash.com/photo-vbPICMc4KCg?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-yxO8YG082v8?auto=format&fit=crop&w=1200&q=80',
  },
  'classic 3 seater sofa': {
    main: 'https://images.unsplash.com/photo-yxO8YG082v8?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-W2sIDTb3AeI?auto=format&fit=crop&w=1200&q=80',
  },
  'compact 2 seater fabric sofa': {
    main: 'https://images.unsplash.com/photo-ugIfsN9l_q4?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-Tk8ji91xeh0?auto=format&fit=crop&w=1200&q=80',
  },
  'recliner sofa set': {
    main: 'https://images.unsplash.com/photo-jkwKXLxTY_4?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
  },
  'everyday comfort 3 seater sofa': {
    main: 'https://images.unsplash.com/photo-W2sIDTb3AeI?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-en8fNXIPkZ0?auto=format&fit=crop&w=1200&q=80',
  },
  'premium italian leather sofa': {
    main: 'https://images.unsplash.com/photo-Tk8ji91xeh0?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-vbPICMc4KCg?auto=format&fit=crop&w=1200&q=80',
  },
  'king size wooden bed': {
    main: 'https://images.unsplash.com/photo-ySrGtQfQLjs?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  },
  'queen size platform bed': {
    main: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  },
  'hydraulic storage bed': {
    main: 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  },
  'minimalist single bed': {
    main: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-ySrGtQfQLjs?auto=format&fit=crop&w=1200&q=80',
  },
  'family storage bed queen': {
    main: 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80',
  },
  'compact hostel single bed': {
    main: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-ySrGtQfQLjs?auto=format&fit=crop&w=1200&q=80',
  },
  'memory foam mattress king': {
    main: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80',
  },
  'orthopedic mattress queen': {
    main: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
  },
  'latex comfort mattress double': {
    main: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
  },
  'pocket spring mattress queen': {
    main: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80',
  },
  'hotel grade mattress queen': {
    main: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
  },
  'economy foam mattress single': {
    main: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80',
  },
  'stainless steel water bottle 1l': {
    main: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80',
  },
  'glass water bottle 750ml': {
    main: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
  },
  'copper water bottle 900ml': {
    main: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
  },
  'kids flip top bottle 500ml': {
    main: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
  },
  'sports sipper bottle 1l': {
    main: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80',
  },
  'smart temperature bottle 500ml': {
    main: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
  },
  'stainless steel tiffin box 3 tier': {
    main: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?auto=format&fit=crop&w=1200&q=80',
  },
  'insulated lunch box': {
    main: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80',
  },
  'bento lunch box 4 compartment': {
    main: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?auto=format&fit=crop&w=1200&q=80',
  },
  'microwave safe meal prep box set': {
    main: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?auto=format&fit=crop&w=1200&q=80',
  },
  'office meal box duo pack': {
    main: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80',
  },
  'premium steel executive tiffin': {
    main: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?auto=format&fit=crop&w=1200&q=80',
  },
  'hammered steel water bottle set 4 pcs': {
    main: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80',
  },
  'pastel vacuum flask set 3 pcs': {
    main: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
  },
  'classic lunch box': {
    main: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80',
  },
  'kids mini bottle pair': {
    main: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
  },
  'designer ceramic mug set 2 pcs': {
    main: 'https://images.unsplash.com/photo-OmOvMdiaZZ0?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-7--lTmTpDFA?auto=format&fit=crop&w=1200&q=80',
  },
  'wooden finish casserole small': {
    main: 'https://images.unsplash.com/photo-1584990347449-a63f6f25d959?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?auto=format&fit=crop&w=1200&q=80',
  },
  'marbella casserole': {
    main: 'https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1584990347449-a63f6f25d959?auto=format&fit=crop&w=1200&q=80',
  },
  'morija casserole': {
    main: 'https://images.unsplash.com/photo-1584990347449-a63f6f25d959?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80',
  },
  'latina casserole': {
    main: 'https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80',
  },
  'wooden finish casserole medium': {
    main: 'https://images.unsplash.com/photo-1584990347449-a63f6f25d959?auto=format&fit=crop&w=1200&q=80',
    alt: 'https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?auto=format&fit=crop&w=1200&q=80',
  },
};

const GENERIC_SEED_IMAGE_BASES = new Set([
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e',
  'https://images.unsplash.com/photo-1484101403633-562f891dc89a',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
  'https://images.unsplash.com/photo-1505693314120-0d443867891c',
  'https://images.unsplash.com/photo-1571508601891-ca5e7a713859',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
  'https://images.unsplash.com/photo-1540574163026-643ea20ade25',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457',
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
  'https://images.unsplash.com/photo-1523362628745-0c100150b504',
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
  'https://images.unsplash.com/photo-1562095241-8c6714fd4178',
  'https://images.unsplash.com/photo-1621939514649-280e2ee25f60',
]);

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
  const normalizedName = sanitizeText(product?.name);
  const override = PRODUCT_NAME_OVERRIDES[normalizedName];
  const firstImage = typeof product?.images?.[0] === 'string' ? product.images[0].trim() : '';
  const firstImageBase = firstImage ? firstImage.split('?')[0] : '';
  const firstImageIsRelative = Boolean(
    firstImage && !/^(https?:)?\/\//i.test(firstImage) && !firstImage.startsWith('data:')
  );

  const shouldPreferOverride = Boolean(
    override &&
      (
        product?.isLocalCatalog ||
        !firstImage ||
        firstImageIsRelative ||
        GENERIC_SEED_IMAGE_BASES.has(firstImageBase)
      )
  );

  if (shouldPreferOverride) {
    return index > 0 ? override.alt : override.main;
  }

  const imageUrl = product?.images?.[index];
  if (imageUrl) {
    if (typeof imageUrl === 'string') {
      const normalizedImageUrl = imageUrl.trim();
      if (/^(https?:)?\/\//i.test(normalizedImageUrl) || normalizedImageUrl.startsWith('data:')) {
        return normalizedImageUrl;
      }
      return getAssetPath(normalizedImageUrl);
    }
    return imageUrl;
  }

  if (override) {
    return index > 0 ? override.alt : override.main;
  }

  const categoryName = product?.category?.name || product?.category?.type || product?.category;
  const variant = index > 0 ? 'alt' : 'main';
  return getProductNameFallbackImage(product?.name, categoryName, variant);
};
