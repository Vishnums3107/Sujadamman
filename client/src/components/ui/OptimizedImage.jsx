import { useEffect, useState } from 'react';

const FALLBACK_IMAGE = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23111111'/%3E%3Ctext x='50%25' y='50%25' fill='%23d4af37' font-size='20' font-family='Arial' text-anchor='middle' dominant-baseline='middle'%3EImage Unavailable%3C/text%3E%3C/svg%3E`;

const getUnsplashRetryUrl = (value) => {
  if (typeof value !== 'string') return '';

  const trimmed = value.trim();
  if (!trimmed.includes('images.unsplash.com/')) return '';

  const base = trimmed.split('?')[0];
  return `${base}?auto=format&fit=crop&w=1200&q=80`;
};

const OptimizedImage = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  loading = 'lazy',
  onClick,
}) => {
  const normalizedSrc = typeof src === 'string' ? src.trim() : '';
  const [imageSrc, setImageSrc] = useState(normalizedSrc || FALLBACK_IMAGE);
  const [hasRetried, setHasRetried] = useState(false);

  useEffect(() => {
    setImageSrc(normalizedSrc || FALLBACK_IMAGE);
    setHasRetried(false);
  }, [normalizedSrc]);

  const handleError = () => {
    const retryUrl = getUnsplashRetryUrl(imageSrc);

    if (!hasRetried && retryUrl && retryUrl !== imageSrc) {
      setImageSrc(retryUrl);
      setHasRetried(true);
      return;
    }

    if (imageSrc !== FALLBACK_IMAGE) {
      setImageSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-gray-900 ${wrapperClassName}`}>
      <img
        src={imageSrc}
        alt={alt || 'Product image'}
        loading={loading}
        onError={handleError}
        onClick={onClick}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
};

export default OptimizedImage;
