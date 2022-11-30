import { Category } from '@domain/entities/category.entity'
import { CategoryRepository } from '@domain/repositories/category.repository'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { CategoryMother } from '@test/domain/mothers/category.entity.mother'

export class CategoryRepositoryMock implements CategoryRepository {
  private findByIdMock: jest.Mock<Promise<Category> | null, [id: UuidVO]>
  private findByRestaurantMock: jest.Mock<Promise<Category[]>, [id: UuidVO]>
  private findByOwnerMock: jest.Mock<Promise<Category[]>, [id: UuidVO]>
  private createMock: jest.Mock
  private updateMock: jest.Mock
  private removeMock: jest.Mock
  private expectedCategory?: Category

  constructor() {
    this.findByIdMock = jest.fn((id: UuidVO) => {
      if (!id || this.createMock.mock.calls.length <= 0) return null
      if (this.expectedCategory) return Promise.resolve(this.expectedCategory)
      else return Promise.resolve(CategoryMother.random())
    })
    this.findByRestaurantMock = jest.fn((id: UuidVO) => {
      if (!id || this.createMock.mock.calls.length <= 0) return Promise.resolve([])
      if (this.expectedCategory) return Promise.resolve([this.expectedCategory])
      else return Promise.resolve([CategoryMother.random()])
    })
    this.findByOwnerMock = jest.fn((id: UuidVO) => {
      if (!id || this.createMock.mock.calls.length <= 0) return Promise.resolve([] as Category[])
      if (this.expectedCategory) return Promise.resolve([this.expectedCategory])
      else return Promise.resolve([CategoryMother.random()])
    })
    this.createMock = jest.fn()
    this.updateMock = jest.fn()
    this.removeMock = jest.fn()
  }

  async findByRestaurant(id: UuidVO): Promise<Category[]> {
    return await this.findByRestaurantMock(id)
  }

  async findByOwner(id: UuidVO): Promise<Category[]> {
    return await this.findByOwnerMock(id)
  }

  async remove(id: UuidVO): Promise<void> {
    await Promise.resolve(this.removeMock(id))
  }

  async findById(id: UuidVO): Promise<Category | null> {
    return await this.findByIdMock(id)
  }

  async create(domainCategory: Category): Promise<void> {
    await Promise.resolve(this.createMock(domainCategory))
  }

  async update(domainCategory: Category): Promise<void> {
    await Promise.resolve(this.updateMock(domainCategory))
  }

  assertFindbyOnwerHaveBeenCalledWith(expected: UuidVO): void {
    expect(this.findByOwnerMock).toHaveBeenCalledWith(expected)
  }

  assertFindByIdHaveBeenCalledWith(expected: UuidVO): void {
    expect(this.findByIdMock).toHaveBeenCalledWith(expected)
  }

  assertFindByRestaurantHaveBeenCalledWith(expected: UuidVO): void {
    expect(this.findByRestaurantMock).toHaveBeenCalledWith(expected)
  }

  assertCreateHaveBeenCalledWith(expected: Category): void {
    expect(this.createMock).toHaveBeenCalledWith(expected)
  }

  assertUpdateHaveBeenCalledWith(expected: Category): void {
    expect(this.updateMock).toHaveBeenCalledWith(expected)
  }

  assertRemoveHaveBeenCalledWith(expected: UuidVO): void {
    expect(this.removeMock).toHaveBeenCalledWith(expected)
  }

  setExpectedCategory(expectedCategory: Category) {
    this.createMock(expectedCategory)
    this.expectedCategory = expectedCategory
  }
}
