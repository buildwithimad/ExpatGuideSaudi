import type { ImageDTO } from '@/shared/dto'

export interface CategoryDTO {
  id: number

  name: string

  slug: string

  description: string | null

  icon: ImageDTO | null

  articleCount: number
}