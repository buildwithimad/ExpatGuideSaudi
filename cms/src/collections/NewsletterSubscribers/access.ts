import { adminRoles, anyoneWithRole, publicRead } from '@/access/roles'

export const newsletterSubscribersAccess = {
  create: publicRead,
  read: anyoneWithRole(adminRoles),
  update: anyoneWithRole(adminRoles),
  delete: anyoneWithRole(adminRoles),
}
