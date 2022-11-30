import { Category } from '@domain/entities/category.entity'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { RootRepository } from './root.repository'

/**
 * Category repository
 */
export interface CategoryRepository extends RootRepository<Category> {
  /**
   * Finds a Category by restaurant id
   * @param id Category restaurant id
   * @returns Domain array of Category
   */
  findByRestaurant(id: UuidVO): Promise<Category[]>
}
