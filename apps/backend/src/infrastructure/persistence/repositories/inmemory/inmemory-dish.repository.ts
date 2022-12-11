import { Dish } from '@domain/entities/dish.entity'
import { DishRepository } from '@domain/repositories/dish.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { injectable } from 'inversify'

const DISH_DDBB: Dish[] = []

@injectable()
export class InMemoryDishRepository implements DishRepository {
  findByCategory(id: UuidVO): Promise<Dish[]> {
    const foundDishes = DISH_DDBB.filter(dish =>
      dish.categoryIds.map(categoryId => categoryId.value).includes(id.value)
    )
    return Promise.resolve(foundDishes)
  }

  findById(id: UuidVO): Promise<Dish | null> {
    const foundDish = DISH_DDBB.find(dish => dish.id.equals(id))
    return Promise.resolve(foundDish ?? null)
  }

  create(domainEntity: Dish): Promise<void> {
    const foundDish = DISH_DDBB.find(dish => dish.id.equals(domainEntity.id))
    if (foundDish) throw new Error('Dish already exists')
    DISH_DDBB.push(domainEntity)
    return Promise.resolve()
  }

  update(domainEntity: Dish): Promise<void> {
    const foundIndex = DISH_DDBB.findIndex(dish => dish.id.equals(domainEntity.id))
    if (foundIndex !== -1) DISH_DDBB[foundIndex] = domainEntity
    return Promise.resolve()
  }

  remove(id: UuidVO): Promise<void> {
    const foundIndex = DISH_DDBB.findIndex(dish => dish.id.equals(id))
    if (foundIndex) DISH_DDBB.splice(foundIndex, 1)
    return Promise.resolve()
  }
}
