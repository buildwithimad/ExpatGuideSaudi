import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import path from 'path';

import { supabase } from './supabase';

export async function uploadImage(
  filePath: string,
  fileName: string,
) {
  const file = await fs.readFile(filePath);

  const extension =
    path.extname(fileName);

  const storageName =
    `${randomUUID()}${extension}`;

  const { error } =
    await supabase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .upload(storageName, file, {
        upsert: false,
      });

  if (error) {
    throw error;
  }

  const {
    data,
  } = supabase.storage
    .from(process.env.SUPABASE_BUCKET!)
    .getPublicUrl(storageName);

  return data.publicUrl;
}