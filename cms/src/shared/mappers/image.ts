import type { Media } from '@/payload-types';
import type { ImageDTO } from '@/shared/dto';

export function mapImage(
  media: Media | number | null | undefined,
): ImageDTO | null {
  if (!media || typeof media !== 'object') {
    return null;
  }

  return {
    url: media.url ?? '',
    alt: media.alt ?? '',
    width: media.width ?? null,
    height: media.height ?? null,
    sizes: Object.fromEntries(
      Object.entries(media.sizes ?? {}).map(
        ([key, value]) => [
          key,
          value &&
          typeof value === 'object' &&
          'url' in value
            ? value.url ?? null
            : null,
        ],
      ),
    ),
  };
}