export const getAssetPath = (assetPath = '') => {
  const normalizedPath = `${assetPath}`.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
};

