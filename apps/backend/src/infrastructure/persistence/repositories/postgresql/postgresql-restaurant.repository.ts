import { Restaurant } from '@domain/entities/restaurant.entity'
import { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { DescriptionVO } from '@domain/value-objects/description.vo'
import { LocationVO } from '@domain/value-objects/location.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { RestaurantDB } from '@prisma/client'

import { PrismaRepository } from '../respository.prisma'

export class PostgreSQLRestaurantRepository
  extends PrismaRepository
  implements RestaurantRepository
{
  private domainToInfrastucture(domainEntity: Restaurant): RestaurantDB {
    return {
      id: domainEntity.id.value,
      name: domainEntity.name.value,
      domain: domainEntity.domain.value,
      location: domainEntity.location.value,
      description: domainEntity.description.value,
      ownerId: domainEntity.ownerId.value,
    }
  }

  private infrastuctureToDomain(infrastuctureEntity: RestaurantDB): Restaurant {
    return new Restaurant(
      new UuidVO(infrastuctureEntity.id),
      new NameVO(infrastuctureEntity.name),
      new SlugVO(infrastuctureEntity.domain),
      new LocationVO(infrastuctureEntity.location),
      new DescriptionVO(infrastuctureEntity.description),
      new UuidVO(infrastuctureEntity.ownerId)
    )
  }

  async findByOwner(owner: UuidVO): Promise<Restaurant[]> {
    const restaurant = await this.client.restaurantDB.findMany({
      where: { ownerId: owner.value },
    })
    return restaurant.map(r => this.infrastuctureToDomain(r))
  }

  async findBySlug(slug: SlugVO): Promise<Restaurant | null> {
    const restaurant = await this.client.restaurantDB.findUnique({
      where: { domain: slug.value },
    })
    return restaurant ? this.infrastuctureToDomain(restaurant) : null
  }

  async findById(id: UuidVO): Promise<Restaurant | null> {
    const restaurant = await this.client.restaurantDB.findUnique({
      where: { id: id.value },
    })
    return restaurant ? this.infrastuctureToDomain(restaurant) : null
  }

  async create(domainEntity: Restaurant): Promise<void> {
    await this.client.restaurantDB.create({
      data: this.domainToInfrastucture(domainEntity),
    })
  }

  async update(domainEntity: Restaurant): Promise<void> {
    await this.client.restaurantDB.update({
      where: { id: domainEntity.id.value },
      data: this.domainToInfrastucture(domainEntity),
    })
  }

  async remove(id: UuidVO): Promise<void> {
    await this.client.restaurantDB.delete({
      where: { id: id.value },
    })
  }
}
