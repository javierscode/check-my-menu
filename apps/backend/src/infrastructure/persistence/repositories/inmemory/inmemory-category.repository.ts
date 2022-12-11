import { Category } from '@domain/entities/category.entity'
import { CategoryRepository } from '@domain/repositories/category.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { injectable } from 'inversify'

const CATEGORY_DDBB: Category[] = []

@injectable()
export class InMemoryCategoryRepository implements CategoryRepository {
  findByRestaurant(id: UuidVO): Promise<Category[]> {
    const foundCategories = CATEGORY_DDBB.filter(category => category.restaurantId.equals(id))
    return Promise.resolve(foundCategories)
  }

  findById(id: UuidVO): Promise<Category | null> {
    const foundCategory = CATEGORY_DDBB.find(category => category.id.equals(id))
    return Promise.resolve(foundCategory ?? null)
  }

  create(domainEntity: Category): Promise<void> {
    const foundCategory = CATEGORY_DDBB.find(category => category.id.equals(domainEntity.id))
    if (foundCategory) throw new Error('Category already exists')
    CATEGORY_DDBB.push(domainEntity)
    return Promise.resolve()
  }

  update(domainEntity: Category): Promise<void> {
    const foundIndex = CATEGORY_DDBB.findIndex(category => category.id.equals(domainEntity.id))
    if (foundIndex !== -1) CATEGORY_DDBB[foundIndex] = domainEntity
    return Promise.resolve()
  }

  remove(id: UuidVO): Promise<void> {
    const foundIndex = CATEGORY_DDBB.findIndex(category => category.id.equals(id))
    if (foundIndex) CATEGORY_DDBB.splice(foundIndex, 1)
    return Promise.resolve()
  }
}
