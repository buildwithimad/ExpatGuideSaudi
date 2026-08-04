import type { Access, FieldAccess } from 'payload'

export const roleOptions = [
  { label: 'Super Admin', value: 'super-admin' },
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
] as const

export type Role = (typeof roleOptions)[number]['value']

export const roleFieldOptions = [...roleOptions]

type UserWithRoles = {
  roles?: Role[] | null
}

export const allRoles = roleOptions.map((role) => role.value)

export const authenticated: Access = ({ req }) => Boolean(req.user)

export const publicRead: Access = () => true

export const hasRole = (user: unknown, roles: Role[]): boolean => {
  const assignedRoles = (user as UserWithRoles | undefined)?.roles

  return Boolean(
    assignedRoles?.some((role) => roles.includes(role))
  )
}

export const anyoneWithRole =
  (roles: Role[]): Access =>
  ({ req }) =>
    hasRole(req.user, roles)

export const fieldForRoles =
  (roles: Role[]): FieldAccess =>
  ({ req }) =>
    hasRole(req.user, roles)

/**
 * Role Helpers
 */
export const isSuperAdmin = (user: unknown): boolean =>
  hasRole(user, ['super-admin'])

export const isAdmin = (user: unknown): boolean =>
  hasRole(user, ['admin'])

export const isEditor = (user: unknown): boolean =>
  hasRole(user, ['editor'])

export const isAdminOrSuperAdmin = (user: unknown): boolean =>
  hasRole(user, ['super-admin', 'admin'])

/**
 * Role Groups
 */
export const editorialRoles: Role[] = [
  'super-admin',
  'admin',
  'editor',
]

export const publishRoles: Role[] = [
  'super-admin',
  'admin',
  'editor',
]

export const adminRoles: Role[] = [
  'super-admin',
  'admin',
]

/**
 * Default Collection Access
 */
export const collectionAccess = {
  create: anyoneWithRole(editorialRoles),
  read: publicRead,
  update: anyoneWithRole(editorialRoles),
  delete: anyoneWithRole(adminRoles),
}