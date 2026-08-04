import { adminRoles, anyoneWithRole, authenticated } from '@/access/roles'

export const usersAccess = {
  create: anyoneWithRole(adminRoles),
  read: authenticated,
  update: anyoneWithRole(adminRoles),
  delete: anyoneWithRole(adminRoles),
}
