import type { CollectionAfterReadHook } from 'payload';

type MediaSize = {
  filename?: string | null;
  url?: string | null;
};

export const addPublicUrl: CollectionAfterReadHook = ({
  doc,
}) => {
  const baseUrl =
    process.env.SUPABASE_PUBLIC_URL;

  if (!baseUrl || !doc.filename) {
    return doc;
  }

  const prefix = doc.prefix
    ? `${doc.prefix}/`
    : '';

  doc.url = `${baseUrl}/${prefix}${doc.filename}`;

  if (doc.sizes) {
    Object.values(doc.sizes).forEach((size) => {
      const mediaSize = size as MediaSize;

      if (mediaSize.filename) {
        mediaSize.url = `${baseUrl}/${prefix}${mediaSize.filename}`;
      }
    });
  }

  return doc;
};