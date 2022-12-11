import { Dish } from '@domain/entities/dish.entity'
import { DishRepository } from '@domain/repositories/dish.repository'
import { AllergenVO } from '@domain/value-objects/allergen.vo'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { PriceVO } from '@domain/value-objects/price.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { CategoriesOndishs, DishDB } from '@prisma/client'

import { PrismaRepository } from '../respository.prisma'

type DishDBWithCategories = DishDB & {
  categories: CategoriesOndishs[]
}

export class PostgreSQLDishRepository extends PrismaRepository implements DishRepository {
  private domainToInfrastucture(domainEntity: Dish): DishDB {
    return {
      id: domainEntity.id.value,
      name: domainEntity.name.value,
      description: domainEntity.description.value,
      image: domainEntity.image.value,
      price: domainEntity.price.value,
      allergens: domainEntity.allergens.map(a => a.value),
      restaurantId: domainEntity.restaurantId.value,
      ownerId: domainEntity.ownerId.value,
    }
  }

  private infrastuctureToDomain(infrastuctureEntity: DishDBWithCategories): Dish {
    return new Dish(
      new UuidVO(infrastuctureEntity.id),
      new NameVO(infrastuctureEntity.name),
      new DescriptionVO(infrastuctureEntity.description),
      new ImageVO(infrastuctureEntity.image),
      new PriceVO(infrastuctureEntity.price),
      infrastuctureEntity.allergens.map(a => new AllergenVO(a)),
      infrastuctureEntity.categories.map(c => new UuidVO(c.categoryId)),
      new UuidVO(infrastuctureEntity.restaurantId),
      new UuidVO(infrastuctureEntity.ownerId)
    )
  }

  async findByRestaurant(id: UuidVO): Promise<Dish[]> {
    const dishes = await this.client.dishDB.findMany({
      where: {
        restaurantId: id.value,
      },
      include: {
        categories: true,
      },
    })

    return dishes.map(dish => this.infrastuctureToDomain(dish))
  }

  async findByCategory(id: UuidVO): Promise<Dish[]> {
    const dishes = await this.client.dishDB.findMany({
      where: {
        categories: {
          some: {
            categoryId: id.value,
          },
        },
      },
      include: {
        categories: true,
      },
    })

    return dishes.map(dish => this.infrastuctureToDomain(dish))
  }

  async findById(id: UuidVO): Promise<Dish | null> {
    const dish = await this.client.dishDB.findUnique({
      where: { id: id.value },
      include: {
        categories: true,
      },
    })

    return dish ? this.infrastuctureToDomain(dish) : null
  }

  async create(domainEntity: Dish): Promise<void> {
    await this.client.dishDB.create({
      data: {
        ...this.domainToInfrastucture(domainEntity),
        categories: {
          createMany: {
            data: domainEntity.categoryIds.map(id => ({
              categoryId: id.value,
            })),
          },
        },
      },
    })
  }

  async update(domainEntity: Dish): Promise<void> {
    await this.client.dishDB.update({
      where: { id: domainEntity.id.value },
      data: {
        ...this.domainToInfrastucture(domainEntity),
        categories: {
          connectOrCreate: domainEntity.categoryIds.map(id => ({
            where: { dishId_categoryId: { dishId: domainEntity.id.value, categoryId: id.value } },
            create: { categoryId: id.value },
          })),
          deleteMany: {
            NOT: {
              categoryId: {
                in: domainEntity.categoryIds.map(id => id.value),
              },
            },
          },
        },
      },
    })
  }

  async remove(id: UuidVO): Promise<void> {
    await this.client.dishDB.delete({
      where: { id: id.value },
    })
  }
}
