import type { Category } from '@/payload-types'
import type { Locale } from '@/shared/types'

export type CategoryDocument = Category

export interface GetCategoriesOptions {
  locale: Locale
}