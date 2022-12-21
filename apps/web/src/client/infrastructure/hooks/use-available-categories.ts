import { Category } from '@shared/domain/entities/category'
import { useEffect, useState } from 'react'

import { getAvailableCategories } from '../api/category/get-available-categories.fetch'

export function useAvailableCategories(restaurantId: string) {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    const fetch = async () => {
      const availableCategories: Category[] = await getAvailableCategories(restaurantId)
      setCategories(availableCategories)
    }
    if (categories.length > 0 || !restaurantId) return
    fetch()
  }, [restaurantId, categories.length])
  return categories
}
