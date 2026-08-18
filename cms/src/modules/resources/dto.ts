import type { ImageDTO } from '@/shared/dto'

export interface ResourceDTO {
  id: number

  title: string

  description: string | null

  icon: ImageDTO | null

  category:
    | 'government-services'
    | 'useful-apps'
    | 'emergency-numbers'
    | 'public-services'

  url: string

  sortOrder: number
}