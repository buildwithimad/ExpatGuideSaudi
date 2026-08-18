import type { PayloadRequest } from 'payload';

export function parseSearch(req: PayloadRequest) {
  const search = req.query.search;

  if (!search) {
    return undefined;
  }

  return String(search).trim();
}