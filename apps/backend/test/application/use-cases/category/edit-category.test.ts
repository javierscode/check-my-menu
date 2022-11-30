import { CategoryNotExistException } from '@application/exceptions/category/category-not-exist.exception'
import { EditCategoryUsecase } from '@application/use-cases/category/edit-category.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { EditCategoryRequestMother } from '@test/application/mothers/category/edit-category-request.mother'
import { CategoryMother } from '@test/domain/mothers/category.entity.mother'
import { CategoryRepositoryMock } from '@test/infrastructure/repositories/category-repository.mock'

let CategoryRepository: CategoryRepositoryMock
let usecase: EditCategoryUsecase

beforeEach(() => {
  CategoryRepository = new CategoryRepositoryMock()
  usecase = new EditCategoryUsecase(CategoryRepository)
})

describe('Edit Category - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should create a new Category', async () => {
      const expectedCategory = CategoryMother.random()
      CategoryRepository.setExpectedCategory(expectedCategory)
      const request = EditCategoryRequestMother.create(
        expectedCategory.id,
        expectedCategory.name,
        expectedCategory.description,
        expectedCategory.image
      )

      await usecase.run(request)
      CategoryRepository.assertUpdateHaveBeenCalledWith(expectedCategory)
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedCategory = CategoryMother.random()
        CategoryRepository.setExpectedCategory(expectedCategory)
        const request = EditCategoryRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the Category doesnt exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedCategory = CategoryMother.random()
        const request = EditCategoryRequestMother.create(
          expectedCategory.id,
          expectedCategory.name,
          expectedCategory.description,
          expectedCategory.image
        )
        await usecase.run(request)
      }).rejects.toThrow(CategoryNotExistException)
    })
  })
})
