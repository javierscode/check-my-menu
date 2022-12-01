import { Dish } from '@domain/entities/dish.entity'
import { UuidVO } from '@domain/value-objects/uuid.vo'

import { RootRepository } from './root.repository'

/**
 * Dish repository
 */
export interface DishRepository extends RootRepository<Dish> {
  /**
   * Finds a Dish by category id
   * @param id Dish category id
   * @returns Domain array of Dish
   */
  findByCategory(id: UuidVO): Promise<Dish[]>
}
