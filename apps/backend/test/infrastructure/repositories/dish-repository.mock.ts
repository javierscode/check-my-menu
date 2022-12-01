import { Dish } from '@domain/entities/dish.entity'
import { DishRepository } from '@domain/repositories/dish.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { DishMother } from '@test/domain/mothers/dish.entity.mother'

export class DishRepositoryMock implements DishRepository {
  private findByIdMock: jest.Mock<Promise<Dish> | null, [id: UuidVO]>
  private findByCategoryMock: jest.Mock<Promise<Dish[]>, [id: UuidVO]>
  private createMock: jest.Mock
  private updateMock: jest.Mock
  private removeMock: jest.Mock
  private expectedDish?: Dish

  constructor() {
    this.findByIdMock = jest.fn((id: UuidVO) => {
      if (!id || this.createMock.mock.calls.length <= 0) return null
      if (this.expectedDish) return Promise.resolve(this.expectedDish)
      else return Promise.resolve(DishMother.random())
    })
    this.findByCategoryMock = jest.fn((id: UuidVO) => {
      if (!id || this.createMock.mock.calls.length <= 0) return Promise.resolve([] as Dish[])
      if (this.expectedDish) return Promise.resolve([this.expectedDish])
      else return Promise.resolve([DishMother.random()])
    })
    this.createMock = jest.fn()
    this.updateMock = jest.fn()
    this.removeMock = jest.fn()
  }

  async findById(id: UuidVO): Promise<Dish | null> {
    return await this.findByIdMock(id)
  }

  async findByCategory(id: UuidVO): Promise<Dish[]> {
    return await this.findByCategoryMock(id)
  }

  create(domainEntity: Dish): Promise<void> {
    this.createMock(domainEntity)
    return Promise.resolve()
  }

  update(domainEntity: Dish): Promise<void> {
    this.updateMock(domainEntity)
    return Promise.resolve()
  }

  remove(id: UuidVO): Promise<void> {
    this.removeMock(id)
    return Promise.resolve()
  }

  assertFindByIdHaveBeenCalledWith(expected: UuidVO): void {
    expect(this.findByIdMock).toHaveBeenCalledWith(expected)
  }

  assertFindbyCategoryHaveBeenCalledWith(expected: UuidVO): void {
    expect(this.findByCategoryMock).toHaveBeenCalledWith(expected)
  }

  assertCreateHaveBeenCalledWith(expected: Dish): void {
    expect(this.createMock).toHaveBeenCalledWith(expected)
  }

  assertUpdateHaveBeenCalledWith(expected: Dish): void {
    expect(this.updateMock).toHaveBeenCalledWith(expected)
  }

  assertRemoveHaveBeenCalledWith(expected: UuidVO): void {
    expect(this.removeMock).toHaveBeenCalledWith(expected)
  }

  setExpectedDish(expectedDish: Dish) {
    this.createMock(expectedDish)
    this.expectedDish = expectedDish
  }
}
