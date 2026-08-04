import {
  generateSlug,
  updateAuditFields,
} from '@/hooks'

export const authorBeforeValidate = [
  generateSlug('fullName'),
]

export const authorBeforeChange = [
  updateAuditFields,
]