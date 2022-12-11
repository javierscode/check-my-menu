import { Category } from '@domain/entities/category.entity'
import { CategoryRepository } from '@domain/repositories/category.repository'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { ImageVO } from '@domain/value-objects/image.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { CategoryDB } from '@prisma/client'

import { PrismaRepository } from '../respository.prisma'

export class PostgreSQLCategoryRepository extends PrismaRepository implements CategoryRepository {
  private domainToInfrastucture(domainEntity: Category): CategoryDB {
    return {
      id: domainEntity.id.value,
      name: domainEntity.name.value,
      description: domainEntity.description.value,
      image: domainEntity.image.value,
      restaurantId: domainEntity.restaurantId.value,
      ownerId: domainEntity.ownerId.value,
    }
  }

  private infrastuctureToDomain(infrastuctureEntity: CategoryDB): Category {
    return new Category(
      new UuidVO(infrastuctureEntity.id),
      new NameVO(infrastuctureEntity.name),
      new DescriptionVO(infrastuctureEntity.description),
      new ImageVO(infrastuctureEntity.image),
      new UuidVO(infrastuctureEntity.restaurantId),
      new UuidVO(infrastuctureEntity.ownerId)
    )
  }

  async findByRestaurant(id: UuidVO): Promise<Category[]> {
    const categories = await this.client.categoryDB.findMany({
      where: { restaurantId: id.value },
    })
    return categories.map(c => this.infrastuctureToDomain(c))
  }

  async findById(id: UuidVO): Promise<Category | null> {
    const category = await this.client.categoryDB.findUnique({
      where: { id: id.value },
    })
    return category ? this.infrastuctureToDomain(category) : null
  }

  async create(domainEntity: Category): Promise<void> {
    await this.client.categoryDB.create({
      data: this.domainToInfrastucture(domainEntity),
    })
  }

  async update(domainEntity: Category): Promise<void> {
    await this.client.categoryDB.update({
      where: { id: domainEntity.id.value },
      data: this.domainToInfrastucture(domainEntity),
    })
  }

  async remove(id: UuidVO): Promise<void> {
    await this.client.categoryDB.delete({
      where: { id: id.value },
    })
  }
}
