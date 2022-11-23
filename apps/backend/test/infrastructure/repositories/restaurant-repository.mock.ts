import { Restaurant } from '@domain/entities/restaurant.entity'
import { RestaurantRepository } from '@domain/repositories/restaurant.repository'
import { SlugVO } from '@domain/value-objects/slug.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'

export class RestaurantRepositoryMock implements RestaurantRepository {
  private findByIdMock: jest.Mock<Promise<Restaurant> | null, [id: UuidVO]>
  private findBySlugMock: jest.Mock<Promise<Restaurant> | null, [slug: SlugVO]>
  private findByOwnerMock: jest.Mock<Promise<Restaurant[]>, [id: UuidVO]>
  private createMock: jest.Mock
  private updateMock: jest.Mock
  private removeMock: jest.Mock
  private expectedRestaurant?: Restaurant

  constructor() {
    this.findByIdMock = jest.fn((id: UuidVO) => {
      if (!id || this.createMock.mock.calls.length <= 0) return null
      if (this.expectedRestaurant) return Promise.resolve(this.expectedRestaurant)
      else return Promise.resolve(RestaurantMother.random())
    })
    this.findBySlugMock = jest.fn((slug: SlugVO) => {
      if (!slug || this.createMock.mock.calls.length <= 0) return null
      if (this.expectedRestaurant) return Promise.resolve(this.expectedRestaurant)
      else return Promise.resolve(RestaurantMother.random())
    })
    this.findByOwnerMock = jest.fn((id: UuidVO) => {
      if (!id || this.createMock.mock.calls.length <= 0) return Promise.resolve([] as Restaurant[])
      if (this.expectedRestaurant) return Promise.resolve([this.expectedRestaurant])
      else return Promise.resolve([RestaurantMother.random()])
    })
    this.createMock = jest.fn()
    this.updateMock = jest.fn()
    this.removeMock = jest.fn()
  }

  async findByOwner(id: UuidVO): Promise<Restaurant[]> {
    return await this.findByOwnerMock(id)
  }

  async remove(id: UuidVO): Promise<void> {
    await Promise.resolve(this.removeMock(id))
  }

  async findById(id: UuidVO): Promise<Restaurant | null> {
    return await this.findByIdMock(id)
  }

  async findBySlug(slug: SlugVO): Promise<Restaurant | null> {
    return await this.findBySlugMock(slug)
  }

  async create(domainRestaurant: Restaurant): Promise<void> {
    await Promise.resolve(this.createMock(domainRestaurant))
  }

  async update(domainRestaurant: Restaurant): Promise<void> {
    await Promise.resolve(this.updateMock(domainRestaurant))
  }

  assertFindbyOnwerHaveBeenCalledWith(expected: UuidVO): void {
    expect(this.findByOwnerMock).toHaveBeenCalledWith(expected)
  }

  assertFindByIdHaveBeenCalledWith(expected: UuidVO): void {
    expect(this.findByIdMock).toHaveBeenCalledWith(expected)
  }

  assertFindBySlugHaveBeenCalledWith(expected: SlugVO): void {
    expect(this.findBySlugMock).toHaveBeenCalledWith(expected)
  }

  assertCreateHaveBeenCalledWith(expected: Restaurant): void {
    expect(this.createMock).toHaveBeenCalledWith(expected)
  }

  assertUpdateHaveBeenCalledWith(expected: Restaurant): void {
    expect(this.updateMock).toHaveBeenCalledWith(expected)
  }

  assertRemoveHaveBeenCalledWith(expected: UuidVO): void {
    expect(this.removeMock).toHaveBeenCalledWith(expected)
  }

  setExpectedRestaurant(expectedRestaurant: Restaurant) {
    this.createMock(expectedRestaurant)
    this.expectedRestaurant = expectedRestaurant
  }
}
