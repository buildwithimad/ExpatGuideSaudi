import type { CollectionConfig } from 'payload';

import { mediaAccess } from './access';
import { addPublicUrl } from './hooks/afterRead';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: [
      'filename',
      'alt',
      'mimeType',
      'updatedAt',
    ],
  },
hooks: {
  afterRead: [addPublicUrl],
},

  access: mediaAccess,
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
  upload: {
    mimeTypes: [
      'image/*',
      'application/pdf',
    ],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'center',
      },
      {
        name: 'card',
        width: 768,
        height: 432,
        position: 'center',
      },
      {
        name: 'hero',
        width: 1600,
        height: 900,
        position: 'center',
      },
    ],
  },
  timestamps: true,
}