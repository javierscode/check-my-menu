import { Category } from '@domain/entities/category'
import { CategoryService } from '@domain/services/category.service'

import { fakeCategories } from './constants'

export class MockCategoryService implements CategoryService {
  async createCategory(token: string, category: Omit<Category, 'id'>): Promise<Category> {
    const newCategory: Category = {
      id: Math.random().toString(36).substr(2, 9),
      ...category,
    }
    await Promise.resolve(fakeCategories.push(newCategory))
    return newCategory
  }

  async editCategory(token: string, category: Category): Promise<Category> {
    const foundCategory = fakeCategories.find(c => c.id === category.id)
    if (!foundCategory) throw new Error('Category not found')
    fakeCategories.splice(fakeCategories.indexOf(foundCategory), 1, category)
    return await Promise.resolve(category)
  }

  async deleteCategory(token: string, categoryId: string): Promise<void> {
    const foundCategory = fakeCategories.find(c => c.id === categoryId)
    if (!foundCategory) throw new Error('Category not found')
    fakeCategories.splice(fakeCategories.indexOf(foundCategory), 1)
    return await Promise.resolve()
  }

  async getCategoryById(categoryId: string): Promise<Category | null> {
    return await Promise.resolve(fakeCategories.find(c => c.id === categoryId) || null)
  }

  async getCategoriesByRestaurantId(restaurantId: string): Promise<Category[]> {
    return await Promise.resolve(fakeCategories.filter(c => c.restaurantId === restaurantId))
  }
}
