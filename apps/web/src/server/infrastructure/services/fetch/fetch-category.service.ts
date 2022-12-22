import { CategoryService } from '@server/domain/services/category.service'
import { Category } from '@shared/domain/entities/category'
import { BACKEND_URL } from '@shared/infrastructure/constants'
import { Fetcher } from '@shared/infrastructure/fetcher'
import uuid from 'uuid-random'

export class FetchCategoryService implements CategoryService {
  async getCategoriesByRestaurantId(restaurantId: string): Promise<Category[]> {
    const { error, data } = await Fetcher.get<Category[]>(
      BACKEND_URL + `/category/restaurantId/${restaurantId}`
    )
    if (error || !data) throw new Error('Error fetching categories')
    return data
  }

  async getCategoryById(categoryId: string): Promise<Category | null> {
    const { error, data } = await Fetcher.get<Category>(BACKEND_URL + `/category/${categoryId}`)
    if (error || !data) throw new Error('Error fetching category')
    return data
  }

  async createCategory(token: string, category: Omit<Category, 'id'>): Promise<Category> {
    const newCategory = {
      ...category,
      id: uuid(),
    }
    const { error } = await Fetcher.post<void>(BACKEND_URL + `/category/`, {
      body: newCategory,
      authToken: token,
    })
    if (error) throw new Error('Error creating category')
    return newCategory
  }

  async editCategory(token: string, category: Category): Promise<Category> {
    const { restaurantId: _, ...rest } = category
    const { error } = await Fetcher.put<void>(BACKEND_URL + `/category/`, {
      body: rest,
      authToken: token,
    })
    console.log('error', error)

    if (error) throw new Error('Error editing category')
    return category
  }

  async deleteCategory(token: string, categoryId: string): Promise<void> {
    const { error } = await Fetcher.delete<void>(BACKEND_URL + `/category/${categoryId}`, {
      authToken: token,
    })
    if (error) throw new Error('Error deleting category')
  }
}
