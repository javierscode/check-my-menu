import { CategoryIdAlreadyInUseException } from '@application/exceptions/category/category-id-already-in-use.exception'
import { CreateCategoryUsecase } from '@application/use-cases/category/create-category.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { CreateCategoryRequestMother } from '@test/application/mothers/category/create-category-request.mother'
import { CategoryMother } from '@test/domain/mothers/category.entity.mother'
import { CategoryRepositoryMock } from '@test/infrastructure/repositories/category-repository.mock'

let CategoryRepository: CategoryRepositoryMock
let usecase: CreateCategoryUsecase

beforeEach(() => {
  CategoryRepository = new CategoryRepositoryMock()
  usecase = new CreateCategoryUsecase(CategoryRepository)
})

describe('Create Category - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should create a new Category', async () => {
      const expectedCategory = CategoryMother.random()
      const request = CreateCategoryRequestMother.create(
        expectedCategory.id,
        expectedCategory.name,
        expectedCategory.description,
        expectedCategory.image,
        expectedCategory.restaurantId,
        expectedCategory.ownerId
      )

      await usecase.run(request)

      CategoryRepository.assertCreateHaveBeenCalledWith(expectedCategory)
    })
  })
  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const request = CreateCategoryRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When a the Category already exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedCategory = CategoryMother.random()
        CategoryRepository.setExpectedCategory(expectedCategory)

        const request = CreateCategoryRequestMother.create(
          expectedCategory.id,
          expectedCategory.name,
          expectedCategory.description,
          expectedCategory.image,
          expectedCategory.restaurantId,
          expectedCategory.ownerId
        )
        await usecase.run(request)
      }).rejects.toThrow(CategoryIdAlreadyInUseException)
    })
  })
})
