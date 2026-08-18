export type ImageSize =
  | 'original'
  | 'thumbnail'
  | 'card'
  | 'hero'
  | 'articleAuthor'

export function getImageUrl(
  image: unknown,
  size: ImageSize = 'card',
): string {
  if (!image) return ''

  if (typeof image === 'string') {
    return image
  }

  if (typeof image !== 'object') {
    return ''
  }

  const img = image as {
    url?: string
    sizes?: Partial<Record<Exclude<ImageSize, 'original'>, string>>
  }

  // Always use original source when requested
  if (size === 'original') {
    return img.url || ''
  }

  return img.sizes?.[size] || img.url || ''
}