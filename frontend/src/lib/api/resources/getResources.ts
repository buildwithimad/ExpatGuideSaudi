import { apiClient } from '../client'

export interface Resource {
  id: number
  title: string
  description: string | null
  icon: any
  category:
    | 'government-services'
    | 'useful-apps'
    | 'emergency-numbers'
    | 'public-services'
  url: string
  sortOrder: number
}

export async function getResources(
  locale = 'en',
  category?: Resource['category'],
): Promise<Resource[]> {
  const params = new URLSearchParams({
    locale,
  })

  if (category) {
    params.set('category', category)
  }

  return apiClient<Resource[]>(
    `/resources?${params.toString()}`,
  )
}