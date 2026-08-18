import { adminRoles, anyoneWithRole, publicRead } from '@/access/roles'

export const globalAccess = {
  read: publicRead,
  update: anyoneWithRole([...adminRoles, 'editor']),
}