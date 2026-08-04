import {
  anyoneWithRole,
  publicRead
} from '@/access/roles';

export const mediaAccess = {
  create: anyoneWithRole(['super-admin']),
  read: publicRead,
  update: anyoneWithRole(['super-admin']),
  delete: anyoneWithRole(['super-admin']),
};