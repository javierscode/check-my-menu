import { CategoryNotExistException } from '@application/exceptions/category/category-not-exist.exception'
import { DeleteCategoryUsecase } from '@application/use-cases/category/delete-category.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { DeleteCategoryRequestMother } from '@test/application/mothers/category/delete-category-request.mother'
import { CategoryMother } from '@test/domain/mothers/category.entity.mother'
import { CategoryRepositoryMock } from '@test/infrastructure/repositories/category-repository.mock'

let CategoryRepository: CategoryRepositoryMock
let usecase: DeleteCategoryUsecase

beforeEach(() => {
  CategoryRepository = new CategoryRepositoryMock()
  usecase = new DeleteCategoryUsecase(CategoryRepository)
})

describe('Delete Category - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should create a new Category', async () => {
      const expectedCategory = CategoryMother.random()
      CategoryRepository.setExpectedCategory(expectedCategory)
      const request = DeleteCategoryRequestMother.create(expectedCategory.id)

      await usecase.run(request)
      CategoryRepository.assertRemoveHaveBeenCalledWith(expectedCategory.id)
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedCategory = CategoryMother.random()
        CategoryRepository.setExpectedCategory(expectedCategory)
        const request = DeleteCategoryRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the Category doesnt exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedCategory = CategoryMother.random()
        const request = DeleteCategoryRequestMother.create(expectedCategory.id)
        await usecase.run(request)
      }).rejects.toThrow(CategoryNotExistException)
    })
  })
})
