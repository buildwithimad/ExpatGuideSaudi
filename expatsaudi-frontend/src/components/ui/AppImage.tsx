'use client';

import Image, { ImageProps } from 'next/image';
import { memo, useCallback, useMemo, useState } from 'react';

interface AppImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fill?: boolean;
  sizes?: string;
  onClick?: () => void;
  onLoad?: NonNullable<ImageProps['onLoad']>;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  unoptimized?: boolean;
}

const AppImage = memo(function AppImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  sizes,
  onClick,
  onLoad,
  fallbackSrc = '/assets/images/no_image.png',
  loading = 'lazy',
  unoptimized = false,
}: AppImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback(() => {
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }

    setIsLoading(false);
  }, [imageSrc, fallbackSrc]);

  const handleLoad = useCallback(
  (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    onLoad?.(e);
  },
  [onLoad]
);

  const imageClassName = useMemo(() => {
    return [
      className,
      isLoading && 'bg-gray-200',
      onClick &&
        'cursor-pointer hover:opacity-90 transition-opacity duration-200',
    ]
      .filter(Boolean)
      .join(' ');
  }, [className, isLoading, onClick]);

  const imageProps = {
    src: imageSrc,
    alt,
    quality,
    className: imageClassName,
    placeholder,
    blurDataURL,
    onError: handleError,
    onLoad: handleLoad,
    onClick,
    unoptimized,
  };

  if (fill) {
    return (
      <div
        className="relative"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          {...imageProps}
          fill
          priority={priority}
          loading={priority ? undefined : loading}
          sizes={
            sizes ??
            '(max-width:768px)100vw,(max-width:1200px)50vw,33vw'
          }
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    );
  }

  return (
    <Image
      {...imageProps}
      width={width ?? 400}
      height={height ?? 300}
      priority={priority}
      loading={priority ? undefined : loading}
      sizes={sizes}
    />
  );
});

AppImage.displayName = 'AppImage';

export default AppImage;